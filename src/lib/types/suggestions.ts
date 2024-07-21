import type { RequestResponse } from '.';

/**
 * Handler to call the suggestions API.
 */
export class SuggestionsHandler {

	/**
	 * Create a new suggestion handler instance.
	 */
	constructor() {

	}

	/**
	 * Get all suggestions.
	 * @returns request response
	 */
	public getSuggestions() {

	}

	/**
	 * Get suggestions similar to a specific source.
	 * @param sourceId ID of source to get suggestions for
	 * @returns request response
	 */
	public getSourceSuggestions(sourceId: number | string | null) {

	}

	/**
	 * Refresh suggestions for a specific source.
	 * @param sourceId ID of source to refresh suggestions for
	 * @returns request response
	 */
	public refreshSourceSuggestions(sourceId: number | string | null) {

	}
}

/**
 * Data container for a source suggestion.
 */
export class Suggestion {
	id: number | null = null;
	name: string = '';
	url: string = '';
	source_id: number | null = null;
}
