/// Community — per-lesson comment index for the Polkadot Product Builders Tutorial.
///
/// Comment content (text, resources) is stored on Bulletin Chain.
/// This contract stores only the CID pointers, metadata, and upvote counts —
/// acting as a permanent, queryable index.
#[ink::contract]
mod community {
    use ink::prelude::{string::String, vec::Vec};
    use ink::storage::Mapping;

    #[derive(scale::Decode, scale::Encode, Clone)]
    #[cfg_attr(
        feature = "std",
        derive(scale_info::TypeInfo, ink::storage::traits::StorageLayout)
    )]
    pub struct CommentEntry {
        pub author: AccountId,
        /// CID of the comment JSON on Bulletin Chain
        pub cid: String,
        /// 0=question 1=tip 2=resource 3=correction 4=experience
        pub comment_type: u8,
        pub timestamp: u64,
        pub upvotes: u32,
    }

    #[ink(storage)]
    pub struct Community {
        /// lesson_id → list of comment entries
        comments: Mapping<String, Vec<CommentEntry>>,
        /// author → total contribution count (posts + upvotes received)
        contributions: Mapping<AccountId, u32>,
    }

    #[ink(event)]
    pub struct CommentPosted {
        #[ink(topic)]
        lesson_id: String,
        #[ink(topic)]
        author: AccountId,
        cid: String,
    }

    impl Community {
        #[ink(constructor)]
        pub fn new() -> Self {
            Self {
                comments: Mapping::default(),
                contributions: Mapping::default(),
            }
        }

        /// Post a comment (CID of content already uploaded to Bulletin).
        /// Returns the index of the new comment.
        #[ink(message)]
        pub fn post(&mut self, lesson_id: String, cid: String, comment_type: u8) -> u32 {
            let caller = self.env().caller();
            let mut entries = self.comments.get(&lesson_id).unwrap_or_default();
            let index = entries.len() as u32;
            entries.push(CommentEntry {
                author: caller,
                cid: cid.clone(),
                comment_type,
                timestamp: self.env().block_timestamp(),
                upvotes: 0,
            });
            self.comments.insert(lesson_id.clone(), &entries);

            // Track contribution
            let count = self.contributions.get(caller).unwrap_or(0);
            self.contributions.insert(caller, &(count + 1));

            self.env().emit_event(CommentPosted { lesson_id, author: caller, cid });
            index
        }

        /// Upvote a comment by index. Awards XP to the author.
        #[ink(message)]
        pub fn upvote(&mut self, lesson_id: String, index: u32) {
            let mut entries = self.comments.get(&lesson_id).unwrap_or_default();
            if let Some(entry) = entries.get_mut(index as usize) {
                entry.upvotes += 1;
                let author = entry.author;
                self.comments.insert(lesson_id, &entries);
                // Award contribution point to author
                let count = self.contributions.get(author).unwrap_or(0);
                self.contributions.insert(author, &(count + 1));
            }
        }

        /// Get all comments for a lesson (sorted by insertion order; sort by upvotes client-side).
        #[ink(message)]
        pub fn get_comments(&self, lesson_id: String) -> Vec<CommentEntry> {
            self.comments.get(&lesson_id).unwrap_or_default()
        }

        /// Get the contribution count for an author.
        #[ink(message)]
        pub fn get_contributions(&self, author: AccountId) -> u32 {
            self.contributions.get(author).unwrap_or(0)
        }
    }
}
