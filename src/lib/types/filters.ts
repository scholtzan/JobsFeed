import { filters } from '../store';
import { get } from 'svelte/store';
import type { RequestResponse } from '.';

/**
 * Handler for interacting with the filters API.
 */
export class FiltersHandler {
	// filters data
	filters: Filter[] = [];

	/**
	 * Create a new filters handler instance.
	 */
	constructor() {
		this.filters = get(filters);

		filters.subscribe((_) => {
			this.filters = get(filters);
		});
	}

	/**
	 * Write the filters data to the Svelte store.
	 */
	public store(): void {
		filters.set(this.filters);
	}

	/**
	 * Subscribe to filter data changes.
	 * @param callback function to call when filters data changes
	 */
	public subscribe(callback: (value: any) => void): void {
		filters.subscribe(callback);
	}

	/**
	 * Fetch filters data from the server.
	 * @returns request response
	 */
	public refresh() {}

	/**
	 * Update the filters data.
	 * @param filters updated filters data
	 * @returns request response
	 */
	public updateFilters(filters: Filter[]) {

	}
}

/**
 * Data container for a single filter.
 */
export class Filter {
	id: number | null = null;
	name: string = '';
	value: string = '';
}
