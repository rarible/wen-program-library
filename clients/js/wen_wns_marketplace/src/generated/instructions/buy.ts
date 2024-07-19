/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/kinobi-so/kinobi
 */

import {
  combineCodec,
  fixDecoderSize,
  fixEncoderSize,
  getAddressEncoder,
  getBytesDecoder,
  getBytesEncoder,
  getProgramDerivedAddress,
  getStructDecoder,
  getStructEncoder,
  getU64Decoder,
  getU64Encoder,
  transformEncoder,
  type Address,
  type Codec,
  type Decoder,
  type Encoder,
  type IAccountMeta,
  type IAccountSignerMeta,
  type IInstruction,
  type IInstructionWithAccounts,
  type IInstructionWithData,
  type ReadonlyAccount,
  type ReadonlyUint8Array,
  type TransactionSigner,
  type WritableAccount,
  type WritableSignerAccount,
} from '@solana/web3.js';
import { WEN_WNS_MARKETPLACE_PROGRAM_ADDRESS } from '../programs';
import {
  expectAddress,
  getAccountMetaFactory,
  type ResolvedAccount,
} from '../shared';

export type BuyInstruction<
  TProgram extends string = typeof WEN_WNS_MARKETPLACE_PROGRAM_ADDRESS,
  TAccountPayer extends string | IAccountMeta<string> = string,
  TAccountListing extends string | IAccountMeta<string> = string,
  TAccountPaymentMint extends string | IAccountMeta<string> = string,
  TAccountBuyer extends string | IAccountMeta<string> = string,
  TAccountDistribution extends string | IAccountMeta<string> = string,
  TAccountMint extends string | IAccountMeta<string> = string,
  TAccountSellerTokenAccount extends string | IAccountMeta<string> = string,
  TAccountBuyerTokenAccount extends string | IAccountMeta<string> = string,
  TAccountSeller extends string | IAccountMeta<string> = string,
  TAccountManager extends string | IAccountMeta<string> = string,
  TAccountExtraMetasAccount extends string | IAccountMeta<string> = string,
  TAccountApproveAccount extends string | IAccountMeta<string> = string,
  TAccountWnsProgram extends
    | string
    | IAccountMeta<string> = 'wns1gDLt8fgLcGhWi5MqAqgXpwEP1JftKE9eZnXS1HM',
  TAccountDistributionProgram extends
    | string
    | IAccountMeta<string> = 'diste3nXmK7ddDTs1zb6uday6j4etCa9RChD8fJ1xay',
  TAccountAssociatedTokenProgram extends
    | string
    | IAccountMeta<string> = 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
  TAccountTokenProgram extends
    | string
    | IAccountMeta<string> = 'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb',
  TAccountPaymentTokenProgram extends string | IAccountMeta<string> = string,
  TAccountSystemProgram extends
    | string
    | IAccountMeta<string> = '11111111111111111111111111111111',
  TAccountSellerPaymentTokenAccount extends
    | string
    | IAccountMeta<string> = string,
  TAccountBuyerPaymentTokenAccount extends
    | string
    | IAccountMeta<string> = string,
  TAccountDistributionPaymentTokenAccount extends
    | string
    | IAccountMeta<string> = string,
  TRemainingAccounts extends readonly IAccountMeta<string>[] = [],
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountPayer extends string
        ? WritableSignerAccount<TAccountPayer> &
            IAccountSignerMeta<TAccountPayer>
        : TAccountPayer,
      TAccountListing extends string
        ? WritableAccount<TAccountListing>
        : TAccountListing,
      TAccountPaymentMint extends string
        ? ReadonlyAccount<TAccountPaymentMint>
        : TAccountPaymentMint,
      TAccountBuyer extends string
        ? WritableSignerAccount<TAccountBuyer> &
            IAccountSignerMeta<TAccountBuyer>
        : TAccountBuyer,
      TAccountDistribution extends string
        ? WritableAccount<TAccountDistribution>
        : TAccountDistribution,
      TAccountMint extends string
        ? WritableAccount<TAccountMint>
        : TAccountMint,
      TAccountSellerTokenAccount extends string
        ? WritableAccount<TAccountSellerTokenAccount>
        : TAccountSellerTokenAccount,
      TAccountBuyerTokenAccount extends string
        ? WritableAccount<TAccountBuyerTokenAccount>
        : TAccountBuyerTokenAccount,
      TAccountSeller extends string
        ? WritableAccount<TAccountSeller>
        : TAccountSeller,
      TAccountManager extends string
        ? ReadonlyAccount<TAccountManager>
        : TAccountManager,
      TAccountExtraMetasAccount extends string
        ? ReadonlyAccount<TAccountExtraMetasAccount>
        : TAccountExtraMetasAccount,
      TAccountApproveAccount extends string
        ? WritableAccount<TAccountApproveAccount>
        : TAccountApproveAccount,
      TAccountWnsProgram extends string
        ? ReadonlyAccount<TAccountWnsProgram>
        : TAccountWnsProgram,
      TAccountDistributionProgram extends string
        ? ReadonlyAccount<TAccountDistributionProgram>
        : TAccountDistributionProgram,
      TAccountAssociatedTokenProgram extends string
        ? ReadonlyAccount<TAccountAssociatedTokenProgram>
        : TAccountAssociatedTokenProgram,
      TAccountTokenProgram extends string
        ? ReadonlyAccount<TAccountTokenProgram>
        : TAccountTokenProgram,
      TAccountPaymentTokenProgram extends string
        ? ReadonlyAccount<TAccountPaymentTokenProgram>
        : TAccountPaymentTokenProgram,
      TAccountSystemProgram extends string
        ? ReadonlyAccount<TAccountSystemProgram>
        : TAccountSystemProgram,
      TAccountSellerPaymentTokenAccount extends string
        ? WritableAccount<TAccountSellerPaymentTokenAccount>
        : TAccountSellerPaymentTokenAccount,
      TAccountBuyerPaymentTokenAccount extends string
        ? WritableAccount<TAccountBuyerPaymentTokenAccount>
        : TAccountBuyerPaymentTokenAccount,
      TAccountDistributionPaymentTokenAccount extends string
        ? WritableAccount<TAccountDistributionPaymentTokenAccount>
        : TAccountDistributionPaymentTokenAccount,
      ...TRemainingAccounts,
    ]
  >;

export type BuyInstructionData = {
  discriminator: ReadonlyUint8Array;
  buyAmount: bigint;
};

export type BuyInstructionDataArgs = { buyAmount: number | bigint };

export function getBuyInstructionDataEncoder(): Encoder<BuyInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([
      ['discriminator', fixEncoderSize(getBytesEncoder(), 8)],
      ['buyAmount', getU64Encoder()],
    ]),
    (value) => ({
      ...value,
      discriminator: new Uint8Array([102, 6, 61, 18, 1, 218, 235, 234]),
    })
  );
}

export function getBuyInstructionDataDecoder(): Decoder<BuyInstructionData> {
  return getStructDecoder([
    ['discriminator', fixDecoderSize(getBytesDecoder(), 8)],
    ['buyAmount', getU64Decoder()],
  ]);
}

export function getBuyInstructionDataCodec(): Codec<
  BuyInstructionDataArgs,
  BuyInstructionData
> {
  return combineCodec(
    getBuyInstructionDataEncoder(),
    getBuyInstructionDataDecoder()
  );
}

export type BuyAsyncInput<
  TAccountPayer extends string = string,
  TAccountListing extends string = string,
  TAccountPaymentMint extends string = string,
  TAccountBuyer extends string = string,
  TAccountDistribution extends string = string,
  TAccountMint extends string = string,
  TAccountSellerTokenAccount extends string = string,
  TAccountBuyerTokenAccount extends string = string,
  TAccountSeller extends string = string,
  TAccountManager extends string = string,
  TAccountExtraMetasAccount extends string = string,
  TAccountApproveAccount extends string = string,
  TAccountWnsProgram extends string = string,
  TAccountDistributionProgram extends string = string,
  TAccountAssociatedTokenProgram extends string = string,
  TAccountTokenProgram extends string = string,
  TAccountPaymentTokenProgram extends string = string,
  TAccountSystemProgram extends string = string,
  TAccountSellerPaymentTokenAccount extends string = string,
  TAccountBuyerPaymentTokenAccount extends string = string,
  TAccountDistributionPaymentTokenAccount extends string = string,
> = {
  payer: TransactionSigner<TAccountPayer>;
  listing: Address<TAccountListing>;
  paymentMint: Address<TAccountPaymentMint>;
  buyer: TransactionSigner<TAccountBuyer>;
  distribution: Address<TAccountDistribution>;
  mint: Address<TAccountMint>;
  sellerTokenAccount: Address<TAccountSellerTokenAccount>;
  buyerTokenAccount?: Address<TAccountBuyerTokenAccount>;
  seller: Address<TAccountSeller>;
  manager: Address<TAccountManager>;
  extraMetasAccount: Address<TAccountExtraMetasAccount>;
  approveAccount: Address<TAccountApproveAccount>;
  wnsProgram?: Address<TAccountWnsProgram>;
  distributionProgram?: Address<TAccountDistributionProgram>;
  associatedTokenProgram?: Address<TAccountAssociatedTokenProgram>;
  tokenProgram?: Address<TAccountTokenProgram>;
  paymentTokenProgram?: Address<TAccountPaymentTokenProgram>;
  systemProgram?: Address<TAccountSystemProgram>;
  sellerPaymentTokenAccount?: Address<TAccountSellerPaymentTokenAccount>;
  buyerPaymentTokenAccount?: Address<TAccountBuyerPaymentTokenAccount>;
  distributionPaymentTokenAccount?: Address<TAccountDistributionPaymentTokenAccount>;
  buyAmount: BuyInstructionDataArgs['buyAmount'];
};

export async function getBuyInstructionAsync<
  TAccountPayer extends string,
  TAccountListing extends string,
  TAccountPaymentMint extends string,
  TAccountBuyer extends string,
  TAccountDistribution extends string,
  TAccountMint extends string,
  TAccountSellerTokenAccount extends string,
  TAccountBuyerTokenAccount extends string,
  TAccountSeller extends string,
  TAccountManager extends string,
  TAccountExtraMetasAccount extends string,
  TAccountApproveAccount extends string,
  TAccountWnsProgram extends string,
  TAccountDistributionProgram extends string,
  TAccountAssociatedTokenProgram extends string,
  TAccountTokenProgram extends string,
  TAccountPaymentTokenProgram extends string,
  TAccountSystemProgram extends string,
  TAccountSellerPaymentTokenAccount extends string,
  TAccountBuyerPaymentTokenAccount extends string,
  TAccountDistributionPaymentTokenAccount extends string,
>(
  input: BuyAsyncInput<
    TAccountPayer,
    TAccountListing,
    TAccountPaymentMint,
    TAccountBuyer,
    TAccountDistribution,
    TAccountMint,
    TAccountSellerTokenAccount,
    TAccountBuyerTokenAccount,
    TAccountSeller,
    TAccountManager,
    TAccountExtraMetasAccount,
    TAccountApproveAccount,
    TAccountWnsProgram,
    TAccountDistributionProgram,
    TAccountAssociatedTokenProgram,
    TAccountTokenProgram,
    TAccountPaymentTokenProgram,
    TAccountSystemProgram,
    TAccountSellerPaymentTokenAccount,
    TAccountBuyerPaymentTokenAccount,
    TAccountDistributionPaymentTokenAccount
  >
): Promise<
  BuyInstruction<
    typeof WEN_WNS_MARKETPLACE_PROGRAM_ADDRESS,
    TAccountPayer,
    TAccountListing,
    TAccountPaymentMint,
    TAccountBuyer,
    TAccountDistribution,
    TAccountMint,
    TAccountSellerTokenAccount,
    TAccountBuyerTokenAccount,
    TAccountSeller,
    TAccountManager,
    TAccountExtraMetasAccount,
    TAccountApproveAccount,
    TAccountWnsProgram,
    TAccountDistributionProgram,
    TAccountAssociatedTokenProgram,
    TAccountTokenProgram,
    TAccountPaymentTokenProgram,
    TAccountSystemProgram,
    TAccountSellerPaymentTokenAccount,
    TAccountBuyerPaymentTokenAccount,
    TAccountDistributionPaymentTokenAccount
  >
> {
  // Program address.
  const programAddress = WEN_WNS_MARKETPLACE_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    payer: { value: input.payer ?? null, isWritable: true },
    listing: { value: input.listing ?? null, isWritable: true },
    paymentMint: { value: input.paymentMint ?? null, isWritable: false },
    buyer: { value: input.buyer ?? null, isWritable: true },
    distribution: { value: input.distribution ?? null, isWritable: true },
    mint: { value: input.mint ?? null, isWritable: true },
    sellerTokenAccount: {
      value: input.sellerTokenAccount ?? null,
      isWritable: true,
    },
    buyerTokenAccount: {
      value: input.buyerTokenAccount ?? null,
      isWritable: true,
    },
    seller: { value: input.seller ?? null, isWritable: true },
    manager: { value: input.manager ?? null, isWritable: false },
    extraMetasAccount: {
      value: input.extraMetasAccount ?? null,
      isWritable: false,
    },
    approveAccount: { value: input.approveAccount ?? null, isWritable: true },
    wnsProgram: { value: input.wnsProgram ?? null, isWritable: false },
    distributionProgram: {
      value: input.distributionProgram ?? null,
      isWritable: false,
    },
    associatedTokenProgram: {
      value: input.associatedTokenProgram ?? null,
      isWritable: false,
    },
    tokenProgram: { value: input.tokenProgram ?? null, isWritable: false },
    paymentTokenProgram: {
      value: input.paymentTokenProgram ?? null,
      isWritable: false,
    },
    systemProgram: { value: input.systemProgram ?? null, isWritable: false },
    sellerPaymentTokenAccount: {
      value: input.sellerPaymentTokenAccount ?? null,
      isWritable: true,
    },
    buyerPaymentTokenAccount: {
      value: input.buyerPaymentTokenAccount ?? null,
      isWritable: true,
    },
    distributionPaymentTokenAccount: {
      value: input.distributionPaymentTokenAccount ?? null,
      isWritable: true,
    },
  };
  const accounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >;

  // Original args.
  const args = { ...input };

  // Resolve default values.
  if (!accounts.buyerTokenAccount.value) {
    accounts.buyerTokenAccount.value = await getProgramDerivedAddress({
      programAddress,
      seeds: [
        getAddressEncoder().encode(expectAddress(accounts.buyer.value)),
        getBytesEncoder().encode(
          new Uint8Array([
            6, 221, 246, 225, 215, 101, 161, 147, 217, 203, 225, 70, 206, 235,
            121, 172, 28, 180, 133, 237, 95, 91, 55, 145, 58, 140, 245, 133,
            126, 255, 0, 169,
          ])
        ),
        getAddressEncoder().encode(expectAddress(accounts.mint.value)),
      ],
    });
  }
  if (!accounts.wnsProgram.value) {
    accounts.wnsProgram.value =
      'wns1gDLt8fgLcGhWi5MqAqgXpwEP1JftKE9eZnXS1HM' as Address<'wns1gDLt8fgLcGhWi5MqAqgXpwEP1JftKE9eZnXS1HM'>;
  }
  if (!accounts.distributionProgram.value) {
    accounts.distributionProgram.value =
      'diste3nXmK7ddDTs1zb6uday6j4etCa9RChD8fJ1xay' as Address<'diste3nXmK7ddDTs1zb6uday6j4etCa9RChD8fJ1xay'>;
  }
  if (!accounts.associatedTokenProgram.value) {
    accounts.associatedTokenProgram.value =
      'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL' as Address<'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL'>;
  }
  if (!accounts.tokenProgram.value) {
    accounts.tokenProgram.value =
      'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb' as Address<'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb'>;
  }
  if (!accounts.systemProgram.value) {
    accounts.systemProgram.value =
      '11111111111111111111111111111111' as Address<'11111111111111111111111111111111'>;
  }

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [
      getAccountMeta(accounts.payer),
      getAccountMeta(accounts.listing),
      getAccountMeta(accounts.paymentMint),
      getAccountMeta(accounts.buyer),
      getAccountMeta(accounts.distribution),
      getAccountMeta(accounts.mint),
      getAccountMeta(accounts.sellerTokenAccount),
      getAccountMeta(accounts.buyerTokenAccount),
      getAccountMeta(accounts.seller),
      getAccountMeta(accounts.manager),
      getAccountMeta(accounts.extraMetasAccount),
      getAccountMeta(accounts.approveAccount),
      getAccountMeta(accounts.wnsProgram),
      getAccountMeta(accounts.distributionProgram),
      getAccountMeta(accounts.associatedTokenProgram),
      getAccountMeta(accounts.tokenProgram),
      getAccountMeta(accounts.paymentTokenProgram),
      getAccountMeta(accounts.systemProgram),
      getAccountMeta(accounts.sellerPaymentTokenAccount),
      getAccountMeta(accounts.buyerPaymentTokenAccount),
      getAccountMeta(accounts.distributionPaymentTokenAccount),
    ],
    programAddress,
    data: getBuyInstructionDataEncoder().encode(args as BuyInstructionDataArgs),
  } as BuyInstruction<
    typeof WEN_WNS_MARKETPLACE_PROGRAM_ADDRESS,
    TAccountPayer,
    TAccountListing,
    TAccountPaymentMint,
    TAccountBuyer,
    TAccountDistribution,
    TAccountMint,
    TAccountSellerTokenAccount,
    TAccountBuyerTokenAccount,
    TAccountSeller,
    TAccountManager,
    TAccountExtraMetasAccount,
    TAccountApproveAccount,
    TAccountWnsProgram,
    TAccountDistributionProgram,
    TAccountAssociatedTokenProgram,
    TAccountTokenProgram,
    TAccountPaymentTokenProgram,
    TAccountSystemProgram,
    TAccountSellerPaymentTokenAccount,
    TAccountBuyerPaymentTokenAccount,
    TAccountDistributionPaymentTokenAccount
  >;

  return instruction;
}

export type BuyInput<
  TAccountPayer extends string = string,
  TAccountListing extends string = string,
  TAccountPaymentMint extends string = string,
  TAccountBuyer extends string = string,
  TAccountDistribution extends string = string,
  TAccountMint extends string = string,
  TAccountSellerTokenAccount extends string = string,
  TAccountBuyerTokenAccount extends string = string,
  TAccountSeller extends string = string,
  TAccountManager extends string = string,
  TAccountExtraMetasAccount extends string = string,
  TAccountApproveAccount extends string = string,
  TAccountWnsProgram extends string = string,
  TAccountDistributionProgram extends string = string,
  TAccountAssociatedTokenProgram extends string = string,
  TAccountTokenProgram extends string = string,
  TAccountPaymentTokenProgram extends string = string,
  TAccountSystemProgram extends string = string,
  TAccountSellerPaymentTokenAccount extends string = string,
  TAccountBuyerPaymentTokenAccount extends string = string,
  TAccountDistributionPaymentTokenAccount extends string = string,
> = {
  payer: TransactionSigner<TAccountPayer>;
  listing: Address<TAccountListing>;
  paymentMint: Address<TAccountPaymentMint>;
  buyer: TransactionSigner<TAccountBuyer>;
  distribution: Address<TAccountDistribution>;
  mint: Address<TAccountMint>;
  sellerTokenAccount: Address<TAccountSellerTokenAccount>;
  buyerTokenAccount: Address<TAccountBuyerTokenAccount>;
  seller: Address<TAccountSeller>;
  manager: Address<TAccountManager>;
  extraMetasAccount: Address<TAccountExtraMetasAccount>;
  approveAccount: Address<TAccountApproveAccount>;
  wnsProgram?: Address<TAccountWnsProgram>;
  distributionProgram?: Address<TAccountDistributionProgram>;
  associatedTokenProgram?: Address<TAccountAssociatedTokenProgram>;
  tokenProgram?: Address<TAccountTokenProgram>;
  paymentTokenProgram?: Address<TAccountPaymentTokenProgram>;
  systemProgram?: Address<TAccountSystemProgram>;
  sellerPaymentTokenAccount?: Address<TAccountSellerPaymentTokenAccount>;
  buyerPaymentTokenAccount?: Address<TAccountBuyerPaymentTokenAccount>;
  distributionPaymentTokenAccount?: Address<TAccountDistributionPaymentTokenAccount>;
  buyAmount: BuyInstructionDataArgs['buyAmount'];
};

export function getBuyInstruction<
  TAccountPayer extends string,
  TAccountListing extends string,
  TAccountPaymentMint extends string,
  TAccountBuyer extends string,
  TAccountDistribution extends string,
  TAccountMint extends string,
  TAccountSellerTokenAccount extends string,
  TAccountBuyerTokenAccount extends string,
  TAccountSeller extends string,
  TAccountManager extends string,
  TAccountExtraMetasAccount extends string,
  TAccountApproveAccount extends string,
  TAccountWnsProgram extends string,
  TAccountDistributionProgram extends string,
  TAccountAssociatedTokenProgram extends string,
  TAccountTokenProgram extends string,
  TAccountPaymentTokenProgram extends string,
  TAccountSystemProgram extends string,
  TAccountSellerPaymentTokenAccount extends string,
  TAccountBuyerPaymentTokenAccount extends string,
  TAccountDistributionPaymentTokenAccount extends string,
>(
  input: BuyInput<
    TAccountPayer,
    TAccountListing,
    TAccountPaymentMint,
    TAccountBuyer,
    TAccountDistribution,
    TAccountMint,
    TAccountSellerTokenAccount,
    TAccountBuyerTokenAccount,
    TAccountSeller,
    TAccountManager,
    TAccountExtraMetasAccount,
    TAccountApproveAccount,
    TAccountWnsProgram,
    TAccountDistributionProgram,
    TAccountAssociatedTokenProgram,
    TAccountTokenProgram,
    TAccountPaymentTokenProgram,
    TAccountSystemProgram,
    TAccountSellerPaymentTokenAccount,
    TAccountBuyerPaymentTokenAccount,
    TAccountDistributionPaymentTokenAccount
  >
): BuyInstruction<
  typeof WEN_WNS_MARKETPLACE_PROGRAM_ADDRESS,
  TAccountPayer,
  TAccountListing,
  TAccountPaymentMint,
  TAccountBuyer,
  TAccountDistribution,
  TAccountMint,
  TAccountSellerTokenAccount,
  TAccountBuyerTokenAccount,
  TAccountSeller,
  TAccountManager,
  TAccountExtraMetasAccount,
  TAccountApproveAccount,
  TAccountWnsProgram,
  TAccountDistributionProgram,
  TAccountAssociatedTokenProgram,
  TAccountTokenProgram,
  TAccountPaymentTokenProgram,
  TAccountSystemProgram,
  TAccountSellerPaymentTokenAccount,
  TAccountBuyerPaymentTokenAccount,
  TAccountDistributionPaymentTokenAccount
> {
  // Program address.
  const programAddress = WEN_WNS_MARKETPLACE_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    payer: { value: input.payer ?? null, isWritable: true },
    listing: { value: input.listing ?? null, isWritable: true },
    paymentMint: { value: input.paymentMint ?? null, isWritable: false },
    buyer: { value: input.buyer ?? null, isWritable: true },
    distribution: { value: input.distribution ?? null, isWritable: true },
    mint: { value: input.mint ?? null, isWritable: true },
    sellerTokenAccount: {
      value: input.sellerTokenAccount ?? null,
      isWritable: true,
    },
    buyerTokenAccount: {
      value: input.buyerTokenAccount ?? null,
      isWritable: true,
    },
    seller: { value: input.seller ?? null, isWritable: true },
    manager: { value: input.manager ?? null, isWritable: false },
    extraMetasAccount: {
      value: input.extraMetasAccount ?? null,
      isWritable: false,
    },
    approveAccount: { value: input.approveAccount ?? null, isWritable: true },
    wnsProgram: { value: input.wnsProgram ?? null, isWritable: false },
    distributionProgram: {
      value: input.distributionProgram ?? null,
      isWritable: false,
    },
    associatedTokenProgram: {
      value: input.associatedTokenProgram ?? null,
      isWritable: false,
    },
    tokenProgram: { value: input.tokenProgram ?? null, isWritable: false },
    paymentTokenProgram: {
      value: input.paymentTokenProgram ?? null,
      isWritable: false,
    },
    systemProgram: { value: input.systemProgram ?? null, isWritable: false },
    sellerPaymentTokenAccount: {
      value: input.sellerPaymentTokenAccount ?? null,
      isWritable: true,
    },
    buyerPaymentTokenAccount: {
      value: input.buyerPaymentTokenAccount ?? null,
      isWritable: true,
    },
    distributionPaymentTokenAccount: {
      value: input.distributionPaymentTokenAccount ?? null,
      isWritable: true,
    },
  };
  const accounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >;

  // Original args.
  const args = { ...input };

  // Resolve default values.
  if (!accounts.wnsProgram.value) {
    accounts.wnsProgram.value =
      'wns1gDLt8fgLcGhWi5MqAqgXpwEP1JftKE9eZnXS1HM' as Address<'wns1gDLt8fgLcGhWi5MqAqgXpwEP1JftKE9eZnXS1HM'>;
  }
  if (!accounts.distributionProgram.value) {
    accounts.distributionProgram.value =
      'diste3nXmK7ddDTs1zb6uday6j4etCa9RChD8fJ1xay' as Address<'diste3nXmK7ddDTs1zb6uday6j4etCa9RChD8fJ1xay'>;
  }
  if (!accounts.associatedTokenProgram.value) {
    accounts.associatedTokenProgram.value =
      'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL' as Address<'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL'>;
  }
  if (!accounts.tokenProgram.value) {
    accounts.tokenProgram.value =
      'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb' as Address<'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb'>;
  }
  if (!accounts.systemProgram.value) {
    accounts.systemProgram.value =
      '11111111111111111111111111111111' as Address<'11111111111111111111111111111111'>;
  }

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [
      getAccountMeta(accounts.payer),
      getAccountMeta(accounts.listing),
      getAccountMeta(accounts.paymentMint),
      getAccountMeta(accounts.buyer),
      getAccountMeta(accounts.distribution),
      getAccountMeta(accounts.mint),
      getAccountMeta(accounts.sellerTokenAccount),
      getAccountMeta(accounts.buyerTokenAccount),
      getAccountMeta(accounts.seller),
      getAccountMeta(accounts.manager),
      getAccountMeta(accounts.extraMetasAccount),
      getAccountMeta(accounts.approveAccount),
      getAccountMeta(accounts.wnsProgram),
      getAccountMeta(accounts.distributionProgram),
      getAccountMeta(accounts.associatedTokenProgram),
      getAccountMeta(accounts.tokenProgram),
      getAccountMeta(accounts.paymentTokenProgram),
      getAccountMeta(accounts.systemProgram),
      getAccountMeta(accounts.sellerPaymentTokenAccount),
      getAccountMeta(accounts.buyerPaymentTokenAccount),
      getAccountMeta(accounts.distributionPaymentTokenAccount),
    ],
    programAddress,
    data: getBuyInstructionDataEncoder().encode(args as BuyInstructionDataArgs),
  } as BuyInstruction<
    typeof WEN_WNS_MARKETPLACE_PROGRAM_ADDRESS,
    TAccountPayer,
    TAccountListing,
    TAccountPaymentMint,
    TAccountBuyer,
    TAccountDistribution,
    TAccountMint,
    TAccountSellerTokenAccount,
    TAccountBuyerTokenAccount,
    TAccountSeller,
    TAccountManager,
    TAccountExtraMetasAccount,
    TAccountApproveAccount,
    TAccountWnsProgram,
    TAccountDistributionProgram,
    TAccountAssociatedTokenProgram,
    TAccountTokenProgram,
    TAccountPaymentTokenProgram,
    TAccountSystemProgram,
    TAccountSellerPaymentTokenAccount,
    TAccountBuyerPaymentTokenAccount,
    TAccountDistributionPaymentTokenAccount
  >;

  return instruction;
}

export type ParsedBuyInstruction<
  TProgram extends string = typeof WEN_WNS_MARKETPLACE_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    payer: TAccountMetas[0];
    listing: TAccountMetas[1];
    paymentMint: TAccountMetas[2];
    buyer: TAccountMetas[3];
    distribution: TAccountMetas[4];
    mint: TAccountMetas[5];
    sellerTokenAccount: TAccountMetas[6];
    buyerTokenAccount: TAccountMetas[7];
    seller: TAccountMetas[8];
    manager: TAccountMetas[9];
    extraMetasAccount: TAccountMetas[10];
    approveAccount: TAccountMetas[11];
    wnsProgram: TAccountMetas[12];
    distributionProgram: TAccountMetas[13];
    associatedTokenProgram: TAccountMetas[14];
    tokenProgram: TAccountMetas[15];
    paymentTokenProgram?: TAccountMetas[16] | undefined;
    systemProgram: TAccountMetas[17];
    sellerPaymentTokenAccount?: TAccountMetas[18] | undefined;
    buyerPaymentTokenAccount?: TAccountMetas[19] | undefined;
    distributionPaymentTokenAccount?: TAccountMetas[20] | undefined;
  };
  data: BuyInstructionData;
};

export function parseBuyInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedBuyInstruction<TProgram, TAccountMetas> {
  if (instruction.accounts.length < 21) {
    // TODO: Coded error.
    throw new Error('Not enough accounts');
  }
  let accountIndex = 0;
  const getNextAccount = () => {
    const accountMeta = instruction.accounts![accountIndex]!;
    accountIndex += 1;
    return accountMeta;
  };
  const getNextOptionalAccount = () => {
    const accountMeta = getNextAccount();
    return accountMeta.address === WEN_WNS_MARKETPLACE_PROGRAM_ADDRESS
      ? undefined
      : accountMeta;
  };
  return {
    programAddress: instruction.programAddress,
    accounts: {
      payer: getNextAccount(),
      listing: getNextAccount(),
      paymentMint: getNextAccount(),
      buyer: getNextAccount(),
      distribution: getNextAccount(),
      mint: getNextAccount(),
      sellerTokenAccount: getNextAccount(),
      buyerTokenAccount: getNextAccount(),
      seller: getNextAccount(),
      manager: getNextAccount(),
      extraMetasAccount: getNextAccount(),
      approveAccount: getNextAccount(),
      wnsProgram: getNextAccount(),
      distributionProgram: getNextAccount(),
      associatedTokenProgram: getNextAccount(),
      tokenProgram: getNextAccount(),
      paymentTokenProgram: getNextOptionalAccount(),
      systemProgram: getNextAccount(),
      sellerPaymentTokenAccount: getNextOptionalAccount(),
      buyerPaymentTokenAccount: getNextOptionalAccount(),
      distributionPaymentTokenAccount: getNextOptionalAccount(),
    },
    data: getBuyInstructionDataDecoder().decode(instruction.data),
  };
}