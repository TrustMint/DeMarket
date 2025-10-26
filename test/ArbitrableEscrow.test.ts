// FIX: Import "mocha" to make TypeScript aware of global test functions like describe(), it(), and beforeEach().
import "mocha";
import { expect } from "chai";
// FIX: Use a named import for `ethers` to correctly access Hardhat's ethers helper functions.
import { ethers } from "hardhat";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { ArbitrableEscrow, IERC20 } from "../typechain-types";

describe("ArbitrableEscrow", function () {
    let seller: HardhatEthersSigner, buyer: HardhatEthersSigner, arbitrator: HardhatEthersSigner, other: HardhatEthersSigner;
    let token: IERC20;
    let escrow: ArbitrableEscrow;
    const price = ethers.parseUnits("100", 6);

    beforeEach(async function () {
        [seller, buyer, arbitrator, other] = await ethers.getSigners();

        // Deploy a mock ERC20 token
        const MockERC20 = await ethers.getContractFactory("UtilityToken", other); // Using UtilityToken as a mock
        token = await MockERC20.deploy(other.address);
        
        // Transfer some tokens to the buyer
        await token.connect(other).transfer(buyer.address, ethers.parseUnits("1000", 18));
        const tokenAddress = await token.getAddress();
        
        const EscrowFactory = await ethers.getContractFactory("ArbitrableEscrow");
        escrow = await EscrowFactory.deploy(arbitrator.address, tokenAddress, seller.address, price);

        // Buyer approves the escrow contract to spend tokens
        // Note: token decimals are 18, price is 6. Adjusting for test.
        const priceInTokenDecimals = ethers.parseUnits("100", 18);
        await token.connect(buyer).approve(await escrow.getAddress(), priceInTokenDecimals);
    });

    it("should allow the buyer to fund the escrow", async function () {
        const priceInTokenDecimals = ethers.parseUnits("100", 18);
        await expect(escrow.connect(buyer).fund(buyer.address))
            .to.emit(escrow, "Funded");
        
        expect(await escrow.status()).to.equal(1); // AwaitingDelivery
        expect(await token.balanceOf(await escrow.getAddress())).to.equal(priceInTokenDecimals);
    });

    it("should allow the buyer to confirm delivery and release funds", async function () {
        const priceInTokenDecimals = ethers.parseUnits("100", 18);
        await escrow.connect(buyer).fund(buyer.address);

        const sellerInitialBalance = await token.balanceOf(seller.address);
        
        await expect(escrow.connect(buyer).confirmDelivery())
            .to.emit(escrow, "Completed");

        expect(await escrow.status()).to.equal(3); // Complete
        expect(await token.balanceOf(await escrow.getAddress())).to.equal(0);
        expect(await token.balanceOf(seller.address)).to.equal(sellerInitialBalance + priceInTokenDecimals);
    });

});