import { settings } from '../store';
import { get } from 'svelte/store';
import type { RequestResponse } from '.';

/**
 * Handler to interact with the settings API.
 */
export class SettingsHandler {
	// settings data
	settings: Settings;

	/**
	 * Create a new settings handler instance.
	 */
	constructor() {
		this.settings = get(settings);

		settings.subscribe((_) => {
			this.settings = get(settings);
		});
	}

	/**
	 * Write current settings data to store.
	 */
	public store(): void {
		settings.set(this.settings);
	}

	/**
	 * Allow to subscribe for settings changes.
	 * @param callback Function called when settings change.
	 */
	public subscribe(callback: (value: any) => void): void {
		settings.subscribe(callback);
	}

	/**
	 * Fetch settings data from the server
	 * @returns request response
	 */
	public refresh() {

	}

	/**
	 * Update the settings
	 * @param settings updated settings
	 * @returns request response
	 */
	public updateSettings(settings: Settings) {
		
	}

	/**
	 * Get available OpenAI models.
	 * @returns request response
	 */
	public getModels() {

	}
}

export class Settings {
	id: number | null = null;
	api_key: string | null = null;
	model: string | null = null;
}
