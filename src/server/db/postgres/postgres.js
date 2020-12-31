import { Pool } from 'pg';
import settings from 'settings';

export const postgresPool = new Pool({
  connectionString: settings.POSTGRES_URI,
});
