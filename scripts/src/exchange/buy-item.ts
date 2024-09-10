import * as anchor from "@coral-xyz/anchor";
import { Program, AnchorProvider, Wallet } from "@coral-xyz/anchor";
import { Connection } from '@solana/web3.js';

import { config } from 'dotenv';
import fs from 'fs';

import WWMIdl from "../../target/idl/wen_wns_marketplace.json";
import { WenWnsMarketplace } from "../../target/types/wen_wns_marketplace";

import { WenNewStandard } from "../../target/types/wen_new_standard";
import WNSIdl from "../../target/idl/wen_new_standard.json";

import WRDIdl from "../../target/idl/wen_royalty_distribution.json";
import { WenRoyaltyDistribution } from "../../target/types/wen_royalty_distribution";

import {
  Keypair,
  AccountInfo,
  PublicKey,
  SystemProgram,
  LAMPORTS_PER_SOL,
  TransactionInstruction,
} from "@solana/web3.js";
import {
  TOKEN_2022_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  getAssociatedTokenAddressSync,
  getMint,
  getAccount,
  getMetadataPointerState,
  Mint,
  Account,
  MetadataPointer,
  getTokenMetadata,
  createApproveCheckedInstruction,
  createAssociatedTokenAccountInstruction,
  createTransferCheckedInstruction,
  createSetAuthorityInstruction,
  AuthorityType
} from "@solana/spl-token";
import { getApproveAccountPda, getDistributionAccountPda, getMemberAccountPda } from "../utils";

// Load environment variables
config({ path: '.env' });

// Define the program IDs and the network to connect to
const NETWORK = process.env.DEVNET_URL; // Or MAINNET_URL for mainnet

// Define the interface for the arguments of the list function
interface ListNFTArgs {
  listingAmount: number;
  paymentMint: PublicKey;
}

// Initialize the provider to interact with the Solana blockchain
const keyfile = JSON.parse(fs.readFileSync(process.env.KEYPAIR_BUYER, "utf8"));
const keypair = Keypair.fromSecretKey(new Uint8Array(keyfile));
const wallet = new Wallet(keypair);

const keyfile_seller = JSON.parse(fs.readFileSync(process.env.KEYPAIR, "utf8"));
const keypair_seller = Keypair.fromSecretKey(new Uint8Array(keyfile_seller));
const wallet_seller = new Wallet(keypair_seller);

const connection = new Connection(NETWORK, { commitment: "confirmed" });
const provider = new AnchorProvider(connection, wallet, { commitment: "confirmed" });

export const MARKETPLACE = Buffer.from("marketplace");
export const SALE = Buffer.from("sale");
export const LISTING = Buffer.from("listing");

export const getListingAccountPda = (
  seller: PublicKey,
  mint: PublicKey,
  programId: PublicKey,
) => {
  const [listingAccount] = PublicKey.findProgramAddressSync(
    [MARKETPLACE, LISTING, seller.toBuffer(), mint.toBuffer()],
    programId,
  );
  return listingAccount;
};

export const getExtraMetasAccountPda = (
    mint: PublicKey,
    programId: PublicKey,
  ) => {
    const [extraMetasAccount] = PublicKey.findProgramAddressSync(
      [Buffer.from("extra-account-metas"), mint.toBuffer()],
      programId,
    );
    return extraMetasAccount;
  };

  export const getByNameAccountPda = (
    mint: PublicKey,
    programId: PublicKey,
    name: string
  ) => {
    const [extraMetasAccount] = PublicKey.findProgramAddressSync(
      [Buffer.from(name), mint.toBuffer()],
      programId,
    );
    return extraMetasAccount;
  };
  
  

// Function to list an NFT
async function buyNFT(wallet: Wallet, args: ListNFTArgs, seller: PublicKey, mint: PublicKey, mintTokenAccount: PublicKey, sellerTokenAccount: PublicKey, manager: PublicKey) {
  console.log('Buying NFT...');
  const wnsProgram = new Program(WNSIdl as WenNewStandard, provider) as Program<WenNewStandard>;
  const marketplaceProgram = new Program(WWMIdl as WenWnsMarketplace, provider) as Program<WenWnsMarketplace>;
  const distributionProgram = new Program(WRDIdl as WenRoyaltyDistribution, provider) as Program<WenRoyaltyDistribution>;
  const wnsProgramId = wnsProgram.programId;
  console.log('Approve NFT...');
  const mintAuthPublicKey = wallet.publicKey;
  const mintPublicKey = mintTokenAccount;

  const listing = getListingAccountPda(
    wallet_seller.publicKey,
    mint,
    marketplaceProgram.programId,
  );
  // should be 4b1oFZsWr9zNgwUTxFgqfJ3cA3mMdbWxk9A2jeYmpeas
  // token 

  // Token Balances
// Address	Token	Change	Post Balance
// 4QmLSPs9VZfRjxMTSCkQ16GmnXHhJJfBjYx1qjZuHLt3
// BtQepx3Syy2ZeFJ6vHgAXycaDdyrDKX27reNE3QvYRDA

  // const mintProgram = new PublicKey("5o8jcdnEGboQEJqGZftU5Gx1xG8gJ5CXZgN9ykXehMtA")
  // const member = getMemberAccountPda(mint, mintProgram);
  // const extraMetasAccount = getExtraMetasAccountPda(
  //   mint,
  //   mintProgram,
  // );
  // const approveAccount = getApproveAccountPda(
  //   mint,
  //   mintProgram,
  // );

  const distribution = getDistributionAccountPda(
    mint,
    PublicKey.default,
    distributionProgram.programId,
  );

   

//   const approveAccount = getApproveAccountPda(
//     mint,
//     wnsProgram.programId,
//   );
  const buyerMemberMintKeypair = Keypair.generate();
  const buyerMemberMintTokenAccount = buyerMemberMintKeypair.publicKey;

  // Define the accounts
const accounts = {
  approveAccount: mint,
  //listing,
  payer: wallet.publicKey,
  buyer: wallet.publicKey,
  seller: wallet_seller.publicKey,
  mint: mint,
  paymentMint: PublicKey.default,
  buyerTokenAccount: buyerMemberMintTokenAccount,
  sellerTokenAccount: mintTokenAccount,
  associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
  tokenProgram: TOKEN_2022_PROGRAM_ID,
  systemProgram: SystemProgram.programId,
};

  // Log all accounts
  console.log('Accounts being used in the transaction:');
  Object.entries(accounts).forEach(([key, value]) => {
    console.log(`${key}: ${value ? value.toString() : 'null'}`);
  });

  // Execute the transaction
  // todo understnad how to pass mint and bayer mint
  // const buyerMemberMintTokenAccount = getAssociatedTokenAddressSync(
  //   memberMintPublickey,
  //   buyer.publicKey,
  //   false,
  //   TOKEN_2022_PROGRAM_ID,
  // );
  const txBuy = await marketplaceProgram.methods
  .buy({
    buyAmount: new anchor.BN(args.listingAmount),
  })
  .accountsStrict({
    //listing,
    payer: wallet.publicKey,
    buyer: wallet.publicKey,
    //seller: wallet_seller.publicKey,
    mint: mint,
    //paymentMint: PublicKey.default,
    buyerTokenAccount: buyerMemberMintTokenAccount,
    //sellerTokenAccount: mintTokenAccount,
    associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
    tokenProgram: TOKEN_2022_PROGRAM_ID,
    systemProgram: SystemProgram.programId,
  })
  .signers([wallet.payer])
  .rpc();

  console.log('Buying NFT completed successfully', txBuy);
}

// Address	Token	Change	Post Balance
// EvRt2zNn9Sy5itKvQbR1TSsVyLw4ZjcmD8sVF1SBwsus
// 5hjA5qJKesCzVL19qZYBhk2yA1kRjoW9aL1W9WAAGpac
// +1	1 tokens
// FaodtMHPwH2kDg7RLe7r7xJNVtBx1bPshjhXQfS7f8Ge
// HaTfseRJ9Hb752si7ymZVJaCdYTJc89pPgkWEyQEgaiT
// +1	1 tokens


// Token Balances
// Address	Token	Change	Post Balance
// 4QmLSPs9VZfRjxMTSCkQ16GmnXHhJJfBjYx1qjZuHLt3
// BtQepx3Syy2ZeFJ6vHgAXycaDdyrDKX27reNE3QvYRDA
// +1	1 tokens
// 6iHgd3YPzPz8rQ4QzpHFPg7XFP4vZ1NWKViDjt3X6aWz
// 6gPVN5qEKkcPbKFdCtrEwTg2DZtyTmukggJSWqFpjabQ
// +1	1 tokens



// Define the main function to run the listNFT function
async function main() {
  try {
    // Setup wallet and arguments
    const seller = wallet.publicKey;
    
    const mint = new PublicKey("BtQepx3Syy2ZeFJ6vHgAXycaDdyrDKX27reNE3QvYRDA"); // Replace with actual mint address
    const mintTokenAccount = new PublicKey("4QmLSPs9VZfRjxMTSCkQ16GmnXHhJJfBjYx1qjZuHLt3"); // Replace with actual mint address
    const sellerTokenAccount = wallet.publicKey;
    const manager = new PublicKey(process.env.MANAGER_PUBLIC_KEY); // Replace with actual manager public key
    const args: ListNFTArgs = {
      listingAmount: 1000000, // Example amount
      paymentMint: seller // Replace with actual payment mint address
    };

    // Call the listNFT function
    await buyNFT(wallet, args, seller, mint, mintTokenAccount, sellerTokenAccount, manager);
  } catch (error) {
    console.error('Error running main function:', error);
  }
}

// Run the main function
main().catch(console.error);
