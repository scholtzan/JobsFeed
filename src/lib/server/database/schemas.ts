import { pgTable, text, timestamp, boolean } from 'drizzle-orm/pg-core';
import { sql } from "drizzle-orm";

export const userTable = pgTable('users', {
	id: text('id').notNull().default(sql`md5(random()::text)`).unique(),
	email: text('email').notNull().unique(),
	verified: boolean('verified').notNull().default(false),
	password: text('password'),
	token: text('token').unique(),
	createdAt: timestamp('created_at', {
		withTimezone: true,
		mode: 'date'
	}).notNull(),
	updatedAt: timestamp('updated_at', {
		withTimezone: true,
		mode: 'date'
	}).notNull()
});

export type User = typeof userTable.$inferInsert;
export type UpdateUser = Partial<typeof userTable.$inferInsert>;
export type SelectUser = typeof userTable.$inferSelect;

export const sessionTable = pgTable('sessions', {
	id: text('id').notNull().default(sql`md5(random()::text)`).unique(),
	userId: text('user_id')
		.notNull()
		.references(() => userTable.id),
	expiresAt: timestamp('expires_at', {
		withTimezone: true,
		mode: 'date'
	}).notNull()
});

export type Session = typeof sessionTable.$inferInsert;

export const sourceTable = pgTable('sources', {
	id: text('id').notNull().default(sql`md5(random()::text)`).unique(),
	userId: text('user_id')
		.notNull()
		.references(() => userTable.id),
	name: text('name').notNull(),
	url: text('url').notNull(),
	createdAt: timestamp('created_at', {
		withTimezone: true,
		mode: 'date'
	}).notNull().defaultNow(),
	updatedAt: timestamp('updated_at', {
		withTimezone: true,
		mode: 'date'
	}).notNull().defaultNow(),
	favicon: text('favicon'),
	cachedContent: text('cachedContent'),
	unreachable: boolean('unreachable').default(false),
	pagination: text('pagination'),
	selector: text('selector'),
	deleted: boolean('deleted').default(false).notNull()
});

export type Source = typeof sourceTable.$inferInsert;
export type SelectSource = typeof sourceTable.$inferInsert;
export type UpdateSource = typeof sourceTable.$inferSelect;

export const filterTable = pgTable('filters', {
	id: text('id').notNull().default(sql`md5(random()::text)`).unique(),
	userId: text('user_id')
		.notNull()
		.references(() => userTable.id),
	name: text('name').notNull(),
	value: text('value').notNull(),
	createdAt: timestamp('created_at', {
		withTimezone: true,
		mode: 'date'
	}).notNull().defaultNow()
});

export type Filter = typeof filterTable.$inferInsert;
export type SelectFilter = typeof filterTable.$inferInsert
export type UpdateFilter = typeof filterTable.$inferSelect;

export const settingsTable = pgTable('settings', {
	userId: text('user_id')
		.notNull()
		.references(() => userTable.id),
	apiKey: text('api_key').notNull()
});

export type Settings = typeof settingsTable.$inferInsert;
export type SelectSettings = typeof settingsTable.$inferInsert;
export type UpdateSettings = typeof settingsTable.$inferSelect;

export const postingTable = pgTable('postings', {
	id: text('id').notNull().default(sql`md5(random()::text)`).unique(),
	userId: text('user_id')
		.notNull()
		.references(() => userTable.id),
	sourceId: text('source_id')
		.notNull()
		.references(() => sourceTable.id),
	title: text('title').notNull(),
	description: text('description'),
	url: text('url'),
	createdAt: timestamp('created_at', {
		withTimezone: true,
		mode: 'date'
	}).notNull().defaultNow(),
	seen: boolean('seen').default(false),
	bookmarked: boolean('bookmarked').default(false),
	content: text('content'),
	isMatch: boolean('is_match')
});

export type Posting = typeof postingTable.$inferInsert;
export type SelectPosting = typeof postingTable.$inferInsert;
export type UpdatePosting = typeof postingTable.$inferSelect;

export const sourceSuggestionTable = pgTable('source_suggestions', {
	id: text('id').notNull().default(sql`md5(random()::text)`).unique(),
	sourceId: text('source_id')
		.notNull()
		.references(() => sourceTable.id),
	userId: text('user_id')
		.notNull()
		.references(() => userTable.id),
	name: text('name').notNull(),
	url: text('url').notNull(),
	createdAt: timestamp('created_at', {
		withTimezone: true,
		mode: 'date'
	}).notNull().defaultNow()
});

export type SourceSuggestion = typeof sourceSuggestionTable.$inferInsert;
export type SelectSourceSuggestion = typeof sourceSuggestionTable.$inferInsert;


// todo embeddings and similarity