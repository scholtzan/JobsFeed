import { defineConfig } from 'drizzle-kit'
import * as dotenv from 'dotenv';
dotenv.config();
const { DATABASE_URL } = process.env;
if (!DATABASE_URL) {
	throw new Error('No url');
}

export default defineConfig({
    schema: './src/lib/server/database/schemas.ts',
	out: './src/lib/server/database/migrations',
    dialect: 'postgresql',
    dbCredentials: {
        url: DATABASE_URL,
    },
    verbose: true,
    strict: true,
})