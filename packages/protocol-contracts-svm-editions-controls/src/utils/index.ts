import { PublicKey } from "@solana/web3.js";
import { PROGRAM_ID_EDITIONS } from "@rarible_int/protocol-contracts-svm-core/src/program"
import { PROGRAM_ID_EDITIONS_CONTROLS } from "@rarible_int/protocol-contracts-svm-core/src/program"

export const getHashlistPda = (deployment: PublicKey) => {
  return PublicKey.findProgramAddressSync(
    [Buffer.from("hashlist"), deployment.toBuffer()],
    new PublicKey(PROGRAM_ID_EDITIONS)
  );
};

export const getEditionsPda = (symbol: string) => {
  return PublicKey.findProgramAddressSync(
    [Buffer.from("editions_deployment"), Buffer.from(symbol)],
    new PublicKey(PROGRAM_ID_EDITIONS)
  )[0];
};


export const getHashlistMarkerPda = (editionsDeployment: PublicKey, mint: PublicKey) => {
  return PublicKey.findProgramAddressSync(
    [Buffer.from("hashlist_marker"), editionsDeployment.toBuffer(), mint.toBuffer()],
    new PublicKey(PROGRAM_ID_EDITIONS)
  );
};


export const getEditionsControlsPda = (editionsDeployment: PublicKey) => {
  return PublicKey.findProgramAddressSync(
    [Buffer.from("editions_controls"), editionsDeployment.toBuffer()],
    new PublicKey(PROGRAM_ID_EDITIONS_CONTROLS)
  )[0];
};
