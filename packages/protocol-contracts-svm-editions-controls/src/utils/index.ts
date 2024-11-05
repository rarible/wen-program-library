import { PublicKey } from "@solana/web3.js";
import { PROGRAM_ID_EDITIONS } from "@rarible_int/protocol-contracts-svm-core"
import { PROGRAM_ID_EDITIONS_CONTROLS } from "@rarible_int/protocol-contracts-svm-core"
import { toBufferLE } from "bigint-buffer";


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

export const getMinterStatsPda = (deployment: PublicKey, minter: PublicKey) => {
  return PublicKey.findProgramAddressSync(
    [Buffer.from("minter_stats"), deployment.toBuffer(), minter.toBuffer()],
    new PublicKey(PROGRAM_ID_EDITIONS_CONTROLS)
  );
};

export const getMinterStatsPhasePda = (deployment: PublicKey, minter: PublicKey, phaseIndex: number) => {
  return PublicKey.findProgramAddressSync(
    [Buffer.from("minter_stats_phase"), deployment.toBuffer(), minter.toBuffer(), toBufferLE(BigInt(phaseIndex), 4)],
    new PublicKey(PROGRAM_ID_EDITIONS_CONTROLS)
  );
};


export const getBase64FromDatabytes = (dataBytes: Buffer, dataType: string) => {
  const base = dataBytes.toString("base64");
  return `data:${dataType};base64,${base}`;
};

