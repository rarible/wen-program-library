import { Program, AnchorProvider, Wallet } from "@coral-xyz/anchor";
import { Keypair, Connection, PublicKey } from "@solana/web3.js";
import { WenNewStandard } from "../../target/types/wen_new_standard";
import WNSIdl from "../../target/idl/wen_new_standard.json";
import { config } from "dotenv";
import fs from "fs";

let isDevnet = true;
export const MANAGER_SEED = Buffer.from("manager");
config({ path: ".env" });

// Function to create manager account
export async function createManagerAccount() {
  try {
    const DEVNET_URL = process.env.DEVNET_URL;
    const MAINNET_URL = process.env.MAINNET_URL;
    const keyfile = JSON.parse(fs.readFileSync(process.env.KEYPAIR, "utf8"));
    const keypair = Keypair.fromSecretKey(new Uint8Array(keyfile));
    
    console.log(`Signing Address: ${keypair.publicKey.toString()}`);
    const connection = new Connection(isDevnet ? DEVNET_URL : MAINNET_URL, {
      commitment: "confirmed",
    });

    const wallet = new Wallet(keypair);
    const provider = new AnchorProvider(connection, wallet, {
      skipPreflight: true,
      commitment: "confirmed",
      preflightCommitment: "confirmed",
    });

    const wnsProgram = new Program(WNSIdl as WenNewStandard, provider) as Program<WenNewStandard>;
    
    console.log(`Program ID: ${wnsProgram.programId.toString()}`);

    const [managerPublicKey, managerBump] = await PublicKey.findProgramAddressSync(
      [MANAGER_SEED],
      wnsProgram.programId
    );
    
    console.log(`Manager Public Key: ${managerPublicKey.toString()}`);
    console.log(`Manager Bump: ${managerBump}`);

    const tx = await wnsProgram.methods.initManagerAccount()
      .accounts({
        payer: wallet.publicKey,
      })
      .signers([wallet.payer])
      .rpc();

    console.log('Manager account created successfully', tx, managerPublicKey.toString());
    return managerPublicKey;
  } catch (error) {
    console.error('Error creating manager account:', error);
    throw error;
  }
}

createManagerAccount().catch(e => {
  console.log(e)
})