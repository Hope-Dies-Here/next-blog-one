import { Pool } from 'pg';

// Initialize connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

// Handle connection errors
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

// Schema creation function
async function initializeSchema() {
  try {
    // Create posts table if it doesn't exist
    await pool.query(`
      CREATE TABLE IF NOT EXISTS posts (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create update_timestamp function if it doesn't exist
    // await pool.query(`
    //   DO $$
    //   BEGIN
    //     IF NOT EXISTS (
    //       SELECT FROM pg_proc WHERE proname = 'update_timestamp'
    //     ) THEN
    //       CREATE FUNCTION update_timestamp()
    //       RETURNS TRIGGER AS $$
    //       BEGIN
    //         NEW.updated_at = CURRENT_TIMESTAMP;
    //         RETURN NEW;
    //       END;
    //       $$ language 'plpgsql';
    //     END IF;
    //   END $$;
    // `);

    // Create trigger if it doesn't exist
    // await pool.query(`
    //   DO $$
    //   BEGIN
    //     IF NOT EXISTS (
    //       SELECT FROM pg_trigger WHERE tgname = 'update_posts_timestamp'
    //     ) THEN
    //       CREATE TRIGGER update_posts_timestamp
    //       BEFORE UPDATE ON posts
    //       FOR EACH ROW
    //       EXECUTE FUNCTION update_timestamp();
    //     END IF;
    //   END $$;
    // `);

    console.log('Database schema initialized successfully');
  } catch (error) {
    console.error('Error initializing schema:', error);
    throw error;
  }
}

// Run schema initialization on startup
initializeSchema().catch((err) => {
  console.error('Failed to initialize database schema:', err);
  process.exit(1);
});

export default pool;