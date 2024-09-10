import { createHash } from "crypto";
import { Connection, PublicKey } from "@solana/web3.js";

export async function sleep(ms: number) {
  return new Promise((res) => {
    setTimeout(res, ms);
  });
}

export function getType(data: Buffer) {
  const managerDiscriminator = Buffer.from(
    createHash("sha256").update("account:Manager").digest(),
  ).subarray(0, 8);

  const groupDiscriminator = Buffer.from(
    createHash("sha256").update("account:TokenGroup").digest(),
  ).subarray(0, 8);

  const memberDiscriminator = Buffer.from(
    createHash("sha256").update("account:TokenGroupMember").digest(),
  ).subarray(0, 8);

  const approveDiscriminator = Buffer.from(
    createHash("sha256").update("account:ApproveAccount").digest(),
  ).subarray(0, 8);

  const distributionDiscriminator = Buffer.from(
    createHash("sha256").update("account:DistributionAccount").digest(),
  ).subarray(0, 8);

  const dataFirst8Bytes = data.subarray(0, 8);

  if (dataFirst8Bytes.equals(managerDiscriminator)) {
    return "manager";
  } else if (dataFirst8Bytes.equals(groupDiscriminator)) {
    return "tokenGroup";
  } else if (dataFirst8Bytes.equals(memberDiscriminator)) {
    return "tokenGroupMember";
  } else if (dataFirst8Bytes.equals(approveDiscriminator)) {
    return "approveAccount";
  } else if (dataFirst8Bytes.equals(distributionDiscriminator)) {
    return "distributionAccount";
  } else {
    return "unknown";
  }
}

export async function filterAvailableAccounts(
  connection: Connection,
  accounts: Record<
    string,
    { pubkey: string; type: string; account: { data: string[] } }
  >,
): Promise<
  Record<string, { pubkey: string; type: string; account: { data: string[] } }>
> {
  const finalAccounts: Record<
    string,
    { pubkey: string; type: string; account: { data: string[] } }
  > = {};
  for (const account of Object.keys(accounts)) {
    const accountPubkey = new PublicKey(account);
    const accountInfo = await connection.getAccountInfo(
      accountPubkey,
      "confirmed",
    );
    if (accountInfo) {
      finalAccounts[account] = {
        ...accounts[account],
        account: {
          ...accounts[account].account,
          data: [accountInfo.data.toString("base64"), "base64"],
        },
      };
    }
  }

  return finalAccounts;
}


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

export const getApproveAccountPda = (mint: PublicKey, programId: PublicKey) => {
  const [approveAccount] = PublicKey.findProgramAddressSync(
    [Buffer.from("approve-account"), mint.toBuffer()],
    programId,
  );

  return approveAccount;
};

export const getManagerAccountPda = (programId: PublicKey) => {
  const [managerAccount] = PublicKey.findProgramAddressSync(
    [Buffer.from("manager")],
    programId,
  );
  return managerAccount;
};

export const getGroupAccountPda = (mint: PublicKey, programId: PublicKey) => {
  const [groupAccount] = PublicKey.findProgramAddressSync(
    [Buffer.from("group"), mint.toBuffer()],
    programId,
  );
  return groupAccount;
};

export const getMemberAccountPda = (mint: PublicKey, programId: PublicKey) => {
  const [memberAccount] = PublicKey.findProgramAddressSync(
    [Buffer.from("member"), mint.toBuffer()],
    programId,
  );
  return memberAccount;
};

export const getDistributionAccountPda = (
  group: PublicKey,
  paymentMint: PublicKey,
  programId: PublicKey,
) => {
  const [distributionAccount] = PublicKey.findProgramAddressSync(
    [group.toBuffer(), paymentMint.toBuffer()],
    programId,
  );
  return distributionAccount;
};