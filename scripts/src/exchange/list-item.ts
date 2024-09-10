import * as anchor from "@coral-xyz/anchor";
import { Program, AnchorProvider, Wallet } from "@coral-xyz/anchor";
import { Connection } from '@solana/web3.js';

import { config } from 'dotenv';
import fs from 'fs';

import WWMIdl from "../../target/idl/wen_wns_marketplace.json";
import { WenWnsMarketplace } from "../../target/types/wen_wns_marketplace";

import { WenNewStandard } from "../../target/types/wen_new_standard";
import WNSIdl from "../../target/idl/wen_new_standard.json";

import {

  Transaction,
} from "@solana/web3.js";

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
const keyfile = JSON.parse(fs.readFileSync(process.env.KEYPAIR, "utf8"));
const keypair = Keypair.fromSecretKey(new Uint8Array(keyfile));
const wallet = new Wallet(keypair);
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

// Function to list an NFT
async function listNFT(wallet: Wallet, args: ListNFTArgs, seller: PublicKey, mint: PublicKey, mintTokenAccount: PublicKey, sellerTokenAccount: PublicKey, manager: PublicKey) {
  console.log('Listing NFT...');
  const wnsProgram = new Program(WNSIdl as WenNewStandard, provider) as Program<WenNewStandard>;
  const marketplaceProgram = new Program(WWMIdl as WenWnsMarketplace, provider) as Program<WenWnsMarketplace>;

  console.log('Approve NFT...');
  const mintAuthPublicKey = wallet.publicKey;

  let tx = new Transaction().add(
    createApproveCheckedInstruction(
      mint,
      mintTokenAccount,
      mintAuthPublicKey,
      mintAuthPublicKey,
      1,
      0,
      [],
      TOKEN_2022_PROGRAM_ID,
    )
  );
  const resTx = await provider.sendAndConfirm(tx)
  console.log("tx hash", resTx)
  console.log('Approve NFT... done');


  console.log('Approve NFT manager...');

  let txMAp = new Transaction().add(
    createApproveCheckedInstruction(
      mint,
      mintTokenAccount,
      manager,
      mintAuthPublicKey,
      1,
      0,
      [],
      TOKEN_2022_PROGRAM_ID,
    )
  );
  const resTxMAp = await provider.sendAndConfirm(txMAp)
  console.log("txMAp hash", resTxMAp)
  console.log('Approve NFT manager... done');

  // Step 1: Delegate Freeze Authority

  const memberMintKeypair = Keypair.generate();
  const memberMintPublickey = memberMintKeypair.publicKey;

  const listing = getListingAccountPda(
    wallet.publicKey,
    mintTokenAccount,
    marketplaceProgram.programId,
  );

  console.log('Calling list function on the program...', listing.toBase58());
  const txList = await marketplaceProgram.methods.list({
    listingAmount: new anchor.BN(args.listingAmount),
    paymentMint: args.paymentMint
  })
  .accountsStrict({
    listing: listing,
    manager: manager,
    payer: wallet.publicKey,
    seller: seller,
    mint: mintTokenAccount,
    sellerTokenAccount: mint,
    systemProgram: SystemProgram.programId,
    wnsProgram: wnsProgram.programId,
    tokenProgram: TOKEN_2022_PROGRAM_ID,
  })    
  .signers([wallet.payer])
  .rpc();

  console.log('NFT listed successfully', txList);
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
    const mint = new PublicKey("4QmLSPs9VZfRjxMTSCkQ16GmnXHhJJfBjYx1qjZuHLt3"); // Replace with actual mint address
    const mintTokenAccount = new PublicKey("BtQepx3Syy2ZeFJ6vHgAXycaDdyrDKX27reNE3QvYRDA"); // Replace with actual mint address
    const sellerTokenAccount = wallet.publicKey;
    const manager = new PublicKey(process.env.MANAGER_PUBLIC_KEY); // Replace with actual manager public key
    const args: ListNFTArgs = {
      listingAmount: 1000000, // Example amount
      paymentMint: seller // Replace with actual payment mint address
    };

    // Call the listNFT function
    await listNFT(wallet, args, seller, mint, mintTokenAccount, sellerTokenAccount, manager);
  } catch (error) {
    console.error('Error running main function:', error);
  }
}

// Run the main function
main().catch(console.error);
