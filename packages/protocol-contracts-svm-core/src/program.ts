import { AnchorProvider, Program } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";

import RaribleEditionsControlsIdlJson from "@rarible_int/protocol-contracts-svm-idl/lib/types/idl/rarible_editions_controls.json";
import { RaribleEditionsControls } from "@rarible_int/protocol-contracts-svm-idl/lib/types/types/rarible_editions_controls";

export const RaribleEditionsControlsIdl: RaribleEditionsControls = JSON.parse(
  JSON.stringify(RaribleEditionsControlsIdlJson)
);

export const PROGRAM_ID_EDITIONS_CONTROLS = new PublicKey(RaribleEditionsControlsIdl.address)

export function getRaribleEditionsControlsProgram(
  provider: AnchorProvider
): Program<RaribleEditionsControls> {
  return new Program<RaribleEditionsControls>(
    RaribleEditionsControlsIdl,
    provider
  );
}

import RaribleEditionsIdlJson from "@rarible_int/protocol-contracts-svm-idl/lib/types/idl/rarible_editions.json";
import { RaribleEditions } from "@rarible_int/protocol-contracts-svm-idl/lib/types/types/rarible_editions";


export const RaribleEditionsIdl: RaribleEditions = JSON.parse(
  JSON.stringify(RaribleEditionsIdlJson)
);


export const PROGRAM_ID_EDITIONS = new PublicKey(RaribleEditionsIdl.address)

export function getRaribleEditionsProgram(
  provider: AnchorProvider
): Program<RaribleEditions> {
  return new Program<RaribleEditions>(RaribleEditionsIdl, provider);
}

export const PROGRAM_ID_GROUP_EXTENSIONS = new PublicKey("5hx15GaPPqsYA61v6QpcGPpo125v7rfvEfZQ4dJErG5V")