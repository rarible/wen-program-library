/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/kinobi-so/kinobi
 */

/** ListingAmountMismatch: Buy amount mismatch with listing amount */
export const WEN_WNS_MARKETPLACE_ERROR__LISTING_AMOUNT_MISMATCH = 0x1770; // 6000
/** PaymentTokenAccountNotExistant: SPL Payment token account required */
export const WEN_WNS_MARKETPLACE_ERROR__PAYMENT_TOKEN_ACCOUNT_NOT_EXISTANT = 0x1771; // 6001
/** InvalidPaymentTokenAccount: Invalid SPL Payment token account */
export const WEN_WNS_MARKETPLACE_ERROR__INVALID_PAYMENT_TOKEN_ACCOUNT = 0x1772; // 6002
/** ArithmeticError: Arithmetic error */
export const WEN_WNS_MARKETPLACE_ERROR__ARITHMETIC_ERROR = 0x1773; // 6003

export type WenWnsMarketplaceError =
  | typeof WEN_WNS_MARKETPLACE_ERROR__ARITHMETIC_ERROR
  | typeof WEN_WNS_MARKETPLACE_ERROR__INVALID_PAYMENT_TOKEN_ACCOUNT
  | typeof WEN_WNS_MARKETPLACE_ERROR__LISTING_AMOUNT_MISMATCH
  | typeof WEN_WNS_MARKETPLACE_ERROR__PAYMENT_TOKEN_ACCOUNT_NOT_EXISTANT;

let wenWnsMarketplaceErrorMessages:
  | Record<WenWnsMarketplaceError, string>
  | undefined;
if (process.env.NODE_ENV !== 'production') {
  wenWnsMarketplaceErrorMessages = {
    [WEN_WNS_MARKETPLACE_ERROR__ARITHMETIC_ERROR]: `Arithmetic error`,
    [WEN_WNS_MARKETPLACE_ERROR__INVALID_PAYMENT_TOKEN_ACCOUNT]: `Invalid SPL Payment token account`,
    [WEN_WNS_MARKETPLACE_ERROR__LISTING_AMOUNT_MISMATCH]: `Buy amount mismatch with listing amount`,
    [WEN_WNS_MARKETPLACE_ERROR__PAYMENT_TOKEN_ACCOUNT_NOT_EXISTANT]: `SPL Payment token account required`,
  };
}

export function getWenWnsMarketplaceErrorMessage(
  code: WenWnsMarketplaceError
): string {
  if (process.env.NODE_ENV !== 'production') {
    return (
      wenWnsMarketplaceErrorMessages as Record<WenWnsMarketplaceError, string>
    )[code];
  }

  return 'Error message not available in production bundles.';
}
