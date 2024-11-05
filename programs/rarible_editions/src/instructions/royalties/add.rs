use anchor_lang::{prelude::*, solana_program::entrypoint::ProgramResult};
use anchor_spl::token_interface::{
    spl_token_metadata_interface::state::Field, token_metadata_update_field, transfer_hook_update,
    Mint, Token2022, TokenMetadataUpdateField, TransferHookUpdate,
};

use crate::{EditionsDeployment, UpdateRoyaltiesArgs, ROYALTY_BASIS_POINTS_FIELD};
use crate::errors::MetadataErrors;
use crate::utils::{update_account_lamports_to_minimum_balance};

#[derive(Accounts)]
#[instruction(args: UpdateRoyaltiesArgs)]
pub struct AddRoyalties<'info> {
    #[account(mut,
        seeds = ["editions_deployment".as_ref(), editions_deployment.symbol.as_ref()], bump)]
    pub editions_deployment: Account<'info, EditionsDeployment>,
    #[account(mut)]
    pub payer: Signer<'info>,

    // when deployment.require_creator_cosign is true, this must be equal to the creator
    // of the deployment otherwise, can be any signer account
    #[account(mut,
        constraint = signer.key() == editions_deployment.creator)]
    pub signer: Signer<'info>,
    #[account(mut)]
    pub mint: Signer<'info>,
    // /// CHECK: This account's data is a buffer of TLV data
    // #[account(
    //     init,
    //     space = get_meta_list_size(get_approve_account_pda(mint.key())),
    //     seeds = [META_LIST_ACCOUNT_SEED, mint.key().as_ref()],
    //     bump,
    //     payer = payer,
    // )]
    // pub extra_metas_account: UncheckedAccount<'info>,
    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token2022>,
}

impl<'info> AddRoyalties<'info> {
    fn update_token_metadata_field(&self, field: Field, value: String, bump_edition: u8) -> ProgramResult {
        let deployment_seeds: &[&[u8]] = &[
            "editions_deployment".as_bytes(),
            self.editions_deployment.symbol.as_ref(),
            &[bump_edition],
        ];
        let signer_seeds: &[&[&[u8]]] = &[deployment_seeds];

        let cpi_accounts = TokenMetadataUpdateField {
            token_program_id: self.token_program.to_account_info(),
            metadata: self.mint.to_account_info(),
            update_authority: self.editions_deployment.to_account_info(),
        };
        let cpi_ctx = CpiContext::new_with_signer(self.token_program.to_account_info(), cpi_accounts, signer_seeds);
        token_metadata_update_field(cpi_ctx, field, value)?;
        Ok(())
    }

    // TODO add hook later
    // fn update_transfer_hook_program_id(&self) -> Result<()> {
    //     let cpi_accounts = TransferHookUpdate {
    //         token_program_id: self.token_program.to_account_info(),
    //         mint: self.mint.to_account_info(),
    //         authority: self.authority.to_account_info(),
    //     };
    //     let cpi_ctx = CpiContext::new(self.token_program.to_account_info(), cpi_accounts);
    //     transfer_hook_update(cpi_ctx, Some(crate::id()))?;
    //     Ok(())
    // }
}

pub fn handler(ctx: Context<AddRoyalties>, args: UpdateRoyaltiesArgs) -> Result<()> {
    // validate that the fee_basis_point is less than 10000 (100%)
    require!(
        args.royalty_basis_points <= 10000,
        MetadataErrors::RoyaltyBasisPointsInvalid
    );

    // add royalty basis points to metadata
    ctx.accounts.update_token_metadata_field(
        Field::Key(ROYALTY_BASIS_POINTS_FIELD.to_owned()),
        args.royalty_basis_points.to_string(),
        ctx.bumps.editions_deployment,
    )?;

    let mut total_share: u8 = 0;
    // add creators and their respective shares to metadata
    for creator in args.creators {
        total_share = total_share
            .checked_add(creator.share)
            .ok_or(MetadataErrors::CreatorShareInvalid)?;
        ctx.accounts.update_token_metadata_field(
            Field::Key(creator.address.to_string()),
            creator.share.to_string(),
            ctx.bumps.editions_deployment,
        )?;
    }

    if total_share != 100 {
        return Err(MetadataErrors::CreatorShareInvalid.into());
    }

    // initialize the extra metas account
    // let extra_metas_account = &ctx.accounts.extra_metas_account;
    // let metas = get_meta_list(get_approve_account_pda(ctx.accounts.mint.key()));
    // let mut data = extra_metas_account.try_borrow_mut_data()?;
    // ExtraAccountMetaList::init::<ExecuteInstruction>(&mut data, &metas)?;

    // add metadata program as the transfer hook program
    // ctx.accounts.update_transfer_hook_program_id()?;

    // transfer minimum rent to mint account
    update_account_lamports_to_minimum_balance(
        ctx.accounts.mint.to_account_info(),
        ctx.accounts.payer.to_account_info(),
        ctx.accounts.system_program.to_account_info(),
    )?;

    Ok(())
}
