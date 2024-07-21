import { postings } from '../store';
import { get } from 'svelte/store';
import type { RequestResponse } from '.';

/**
 * Handler to interact with postings API
 */
export class PostingsHandler {
	// posting data
	postings: Posting[] = [];

	/**
	 * Create a new posting handler instance.
	 */
	constructor() {
		this.postings = get(postings);
		postings.subscribe(() => (this.postings = get(postings)));
	}

	/**
	 * Write posting data to Svelte store.
	 */
	public store(): void {
		postings.set(this.postings);
	}

	/**
	 * Call callback when posting data changes.
	 * @param callback function to call when data changes
	 */
	public subscribe(callback: (value: any) => void): void {
		postings.subscribe(callback);
	}

	/**
	 * Get bookmarked postings.
	 * @returns request response
	 */
	public async getBookmarked() {}

	/**
	 * Get a specific posting by its ID.
	 * @param id posting ID
	 * @returns request response
	 */
	public postingById(id: number | null) {}

	/**
	 * Get all postings that were fetched today.
	 * @returns postings
	 */
	public getTodaysPostings() {
	}

	/**
	 * Fetch postings.
	 * @param useCached whether cached postings should be returned, or postings should be scraped from sources.
	 * @param source_id [optional] ID of source to get postings for
	 * @returns request response
	 */
	public refresh(
		useCached: boolean = true,
		source_id: number | null = null
	) {
		
	}

	/**
	 * Group postings by source ID.
	 * @returns
	 */
	public postingsBySource(): Partial<Record<number, Posting[]>> {
		return Object.groupBy(this.postings, (p: Posting) => p.source_id as number);
	}

	/**
	 * Mark specific posts as seen.
	 * @param ids IDs of posts that should be marked as seen.
	 * @returns request response
	 */
	public markAsRead(ids: number[]) {
	}

	/**
	 * Bookmark a specific posting
	 * @param id ID of posting to bookmark
	 * @returns request response
	 */
	public bookmarkPosting(id: number | null) {
		
	}

	/**
	 * Mark a specific posting as "liked".
	 * @param id ID of posting
	 * @returns request response
	 */
	public likePosting(id: number | null) {
		
	}

	/**
	 * Mark as specific posting as disliked.
	 * @param id ID of posting
	 * @returns request response
	 */
	public dislikePosting(id: number | null) {
		
	}

	/**
	 * Get all postings of a specific source that were seen before.
	 * @param sourceId ID of source
	 * @returns request response
	 */
	public getReadPostingsOfSource(sourceId: number | null | string) {

	}
}

/**
 * Data container for a posting.
 */
export class Posting {
	id: number | null = null;
	title: string = '';
	description: string = '';
	url: string = '';
	seen: boolean = false;
	source_id: number | null = null;
	created_at: Date = new Date();
	bookmarked: boolean = false;
	content: string = '';
	is_match: boolean | null = null;
	match_similarity: number | null = null;
}
