//! This code was AUTOGENERATED using the kinobi library.
//! Please DO NOT EDIT THIS FILE, instead use visitors
//! to add features, then rerun kinobi to update it.
//!
//! <https://github.com/kinobi-so/kinobi>
//!

use crate::generated::types::Creator;
use borsh::BorshDeserialize;
use borsh::BorshSerialize;
use solana_program::pubkey::Pubkey;

#[derive(BorshSerialize, BorshDeserialize, Clone, Debug, Eq, PartialEq)]
#[cfg_attr(feature = "serde", derive(serde::Serialize, serde::Deserialize))]
pub struct DistributionAccount {
    pub discriminator: [u8; 8],
    /// distribution version
    pub version: u8,
    /// group to which the distribution account belongs to
    #[cfg_attr(
        feature = "serde",
        serde(with = "serde_with::As::<serde_with::DisplayFromStr>")
    )]
    pub group_mint: Pubkey,
    /// payment mint for the distribution account
    #[cfg_attr(
        feature = "serde",
        serde(with = "serde_with::As::<serde_with::DisplayFromStr>")
    )]
    pub payment_mint: Pubkey,
    pub claim_data: Vec<Creator>,
}

impl DistributionAccount {
    #[inline(always)]
    pub fn from_bytes(data: &[u8]) -> Result<Self, std::io::Error> {
        let mut data = data;
        Self::deserialize(&mut data)
    }
}

impl<'a> TryFrom<&solana_program::account_info::AccountInfo<'a>> for DistributionAccount {
    type Error = std::io::Error;

    fn try_from(
        account_info: &solana_program::account_info::AccountInfo<'a>,
    ) -> Result<Self, Self::Error> {
        let mut data: &[u8] = &(*account_info.data).borrow();
        Self::deserialize(&mut data)
    }
}

#[cfg(feature = "anchor")]
impl anchor_lang::AccountDeserialize for DistributionAccount {
    fn try_deserialize_unchecked(buf: &mut &[u8]) -> anchor_lang::Result<Self> {
        Ok(Self::deserialize(buf)?)
    }
}

#[cfg(feature = "anchor")]
impl anchor_lang::AccountSerialize for DistributionAccount {}

#[cfg(feature = "anchor")]
impl anchor_lang::Owner for DistributionAccount {
    fn owner() -> Pubkey {
        crate::WEN_ROYALTY_DISTRIBUTION_ID
    }
}

#[cfg(feature = "anchor-idl-build")]
impl anchor_lang::IdlBuild for DistributionAccount {}

#[cfg(feature = "anchor-idl-build")]
impl anchor_lang::Discriminator for DistributionAccount {
    const DISCRIMINATOR: [u8; 8] = [0; 8];
}