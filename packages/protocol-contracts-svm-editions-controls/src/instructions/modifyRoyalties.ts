import {
    Transaction,
    TransactionInstruction,
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
  
  // Arguments for modifying royalties
  export interface IModifyRoyalties {
    editionsId: string;
    royaltyBasisPoints: number;
    creators: { address: PublicKey; share: number }[];
  }
  
  // Max number of updates per transaction
  const MAX_UPDATES_PER_TRANSACTION = 5;
  
  export const modifyRoyalties = async ({
    wallet,
    params,
    connection,
  }: IExecutorParams<IModifyRoyalties>) => {
    const { editionsId, royaltyBasisPoints, creators } = params;
  
    const raribleEditionsProgram = getProgramInstanceEditions(connection);
    const editionsControlsProgram = getProgramInstanceEditionsControls(connection);

    const editions = new PublicKey(editionsId);
    const editionsData = await connection.getAccountInfo(editions);
    const editionsControlsPda = getEditionsControlsPda(editions);
    if (!editionsData) {
      throw Error("Editions not found");
    }
  
    const editionsObj = await raribleEditionsProgram.account.editionsDeployment.fetch(editions);
  
    let remainingUpdates = creators.length;
    let txs: Transaction[] = [];
  

    const instructions: TransactionInstruction[] = [];
    
    instructions.push(
      ComputeBudgetProgram.setComputeUnitLimit({
        units: 850_000,
      })
    );

    const updatesForTx = Math.min(MAX_UPDATES_PER_TRANSACTION, remainingUpdates);

    let creators_to_push = []
    for (let i = 0; i < updatesForTx; i++) {
      const creator = creators[i];
      creators_to_push.push(creator);
    }

    instructions.push(
      await editionsControlsProgram.methods
        .modifyRoyalties({
          royaltyBasisPoints,
          creators: creators_to_push,
        })
        .accountsStrict({
          editionsControls: editionsControlsPda,
          editionsDeployment: editions,
          payer: wallet.publicKey,
          mint: editionsObj.groupMint,
          systemProgram: SystemProgram.programId,
          tokenProgram: TOKEN_2022_PROGRAM_ID,
          creator: wallet.publicKey,
          raribleEditionsProgram: raribleEditionsProgram.programId
        })
        .signers([])
        .instruction()
    );

    const tx = new Transaction().add(...instructions);
    tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
    tx.feePayer = wallet.publicKey;
    txs.push(tx);
    
  
    await wallet.signAllTransactions(txs);
  
    const promises = txs.map((item) =>
      sendSignedTransaction({
        signedTransaction: item,
        connection,
        skipPreflight: false,
      })
    );
  
    await Promise.all(promises);
  
    return { editions };
  };
  