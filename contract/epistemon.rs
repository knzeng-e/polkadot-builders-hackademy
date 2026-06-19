/// Epistemon — on-chain evolving builder NFT for the Polkadot Product Builders Tutorial.
///
/// Each account can own multiple Epistemon generations (one per full tutorial run).
/// Traits are derived client-side from the stored seed; the contract stores only
/// the seed + completion count to minimise on-chain storage.
#[ink::contract]
mod epistemon {
    use ink::prelude::vec::Vec;
    use ink::storage::Mapping;

    #[derive(scale::Decode, scale::Encode, Clone)]
    #[cfg_attr(
        feature = "std",
        derive(scale_info::TypeInfo, ink::storage::traits::StorageLayout)
    )]
    pub struct EpistemonRecord {
        pub generation: u32,
        pub trait_seed: u64,
        pub lessons_completed: u32,
        /// 0=Dormant 1=Curious 2=Explorer 3=Architect 4=Enlightened
        pub stage: u8,
        pub minted_at: u64,
    }

    #[ink(storage)]
    pub struct Epistemon {
        collections: Mapping<AccountId, Vec<EpistemonRecord>>,
    }

    #[ink(event)]
    pub struct Minted {
        #[ink(topic)]
        owner: AccountId,
        generation: u32,
        trait_seed: u64,
    }

    #[ink(event)]
    pub struct Evolved {
        #[ink(topic)]
        owner: AccountId,
        generation: u32,
        new_stage: u8,
    }

    impl Epistemon {
        #[ink(constructor)]
        pub fn new() -> Self {
            Self { collections: Mapping::default() }
        }

        /// Mint a new Epistemon for the caller.
        /// `trait_seed` is computed client-side as djb2(address + ":" + generation).
        #[ink(message)]
        pub fn mint(&mut self, trait_seed: u64) -> u32 {
            let caller = self.env().caller();
            let mut col = self.collections.get(caller).unwrap_or_default();
            let generation = col.len() as u32;
            col.push(EpistemonRecord {
                generation,
                trait_seed,
                lessons_completed: 0,
                stage: 0,
                minted_at: self.env().block_timestamp(),
            });
            self.collections.insert(caller, &col);
            self.env().emit_event(Minted { owner: caller, generation, trait_seed });
            generation
        }

        /// Update lesson count and stage for a given generation.
        #[ink(message)]
        pub fn evolve(&mut self, generation: u32, lessons_completed: u32, stage: u8) {
            let caller = self.env().caller();
            let mut col = self.collections.get(caller).unwrap_or_default();
            if let Some(rec) = col.get_mut(generation as usize) {
                rec.lessons_completed = lessons_completed;
                rec.stage = stage;
                self.collections.insert(caller, &col);
                self.env().emit_event(Evolved { owner: caller, generation, new_stage: stage });
            }
        }

        /// Read all Epistemons for an account.
        #[ink(message)]
        pub fn get_collection(&self, owner: AccountId) -> Vec<EpistemonRecord> {
            self.collections.get(owner).unwrap_or_default()
        }

        /// Get a single Epistemon by generation index.
        #[ink(message)]
        pub fn get_record(&self, owner: AccountId, generation: u32) -> Option<EpistemonRecord> {
            self.collections.get(owner)?.into_iter().nth(generation as usize)
        }
    }
}
