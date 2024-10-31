import {
    Transaction,
    PublicKey,
    SystemProgram,
    ComputeBudgetProgram,
  } from "@solana/web3.js";
  
  import { getProgramInstanceEditions } from "../../anchor/editions/getProgramInstanceEditions";
  import { IExecutorParams } from "../../cli/IExecutorParams";
  import { sendSignedTransaction } from "../tx_utils";
  import { TOKEN_2022_PROGRAM_ID } from "spl-token-4";
  import { getProgramInstanceEditionsControls } from "anchor/controls/getProgramInstanceEditionsControls";
  import { getEditionsControlsPda } from "anchor/controls/pdas/getEditionsControlsPda";
  import BN from "bn.js";
  
  // Arguments for modifying platform fee
  export interface IModifyPlatformFee {
    editionsId: string;
    platformFeeValue: BN; // Should be BN if required
    isFeeFlat: boolean;
    recipients: { address: PublicKey; share: number }[];
  }
  
  export const modifyPlatformFee = async ({
    wallet,
    params,
    connection,
  }: IExecutorParams<IModifyPlatformFee>) => {
    const { editionsId, platformFeeValue, isFeeFlat, recipients } = params;
  
    const raribleEditionsProgram = getProgramInstanceEditions(connection);
    const editionsControlsProgram = getProgramInstanceEditionsControls(connection);
  
    const editions = new PublicKey(editionsId);
    const editionsData = await connection.getAccountInfo(editions);
    const editionsControlsPda = getEditionsControlsPda(editions);
  
    if (!editionsData) {
      throw Error("Editions not found");
    }
  
    const editionsObj = await raribleEditionsProgram.account.editionsDeployment.fetch(editions);
  
    // Create the instruction to modify the platform fee
    const instruction = await editionsControlsProgram.methods
      .modifyPlatformFee({
        platformFeeValue: new BN(platformFeeValue), // Convert to BN if necessary
        isFeeFlat,
        recipients,
      })
      .accountsStrict({
        editionsControls: editionsControlsPda,
        editionsDeployment: editions,
        payer: wallet.publicKey,
        creator: wallet.publicKey,
      })
      .signers([])
      .instruction();
  
    // Create the transaction and add the instruction
    const tx = new Transaction();
  
    // Optionally, add compute budget instruction if needed
    tx.add(
      ComputeBudgetProgram.setComputeUnitLimit({
        units: 850_000,
      })
    );
  
    tx.add(instruction);
  
    // Set recent blockhash and fee payer
    tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
    tx.feePayer = wallet.publicKey;
  
    // Sign and send the transaction
    await wallet.signTransaction(tx);
  
    const txid = await sendSignedTransaction({
      signedTransaction: tx,
      connection,
      skipPreflight: false,
    });
  
    return { editions, txid };
  };
  