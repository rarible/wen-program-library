#![allow(ambiguous_glob_reexports)]

use anchor_lang::prelude::*;

pub mod constants;
pub mod errors;
pub mod instructions;
pub mod state;
pub mod utils;

pub use instructions::*;

declare_id!("8xBBKGGihbs318FzGLR2pS7YdMnuL3uuF7T92YtF3wu7");

#[program]
pub mod wen_wns_marketplace {
    use super::*;

    /* region LISTING INSTRUCTIONS (CORE LOGIC) */
    pub fn list(ctx: Context<ListNFT>, args: ListNFTArgs) -> Result<()> {
        listing::list::handler(ctx, args)
    }

    pub fn unlist(ctx: Context<UnlistNFT>) -> Result<()> {
        listing::unlist::handler(ctx)
    }

    pub fn buy(ctx: Context<FulfillListing>, args: FulfillListingArgs) -> Result<()> {
        listing::buy::handler(ctx, args)
    }
    /* endregion */

    /* region CLAIM ROYALTY */
    pub fn claim_royalty(ctx: Context<ClaimRoyalty>) -> Result<()> {
        listing::royalty::handler(ctx)
    }
    /* endregion */
}
