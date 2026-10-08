const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgresql://app:fnND856mJ6q-TpRGYVrb6Q@lisistec-34832.j77.aws-us-east-2.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full'
});

async function run() {
  await client.connect();
  console.log('Connected to CockroachDB');

  // Check existing tables
  const res = await client.query(
    "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'"
  );
  console.log('Existing tables:', res.rows.map(r => r.table_name));

  // Unlock tables that may be schema-locked
  const tables = ['blog_posts', 'contact_messages', 'projects', 'newsletter_subscribers'];
  for (const table of tables) {
    try {
      await client.query(`ALTER TABLE IF EXISTS ${table} SET (schema_locked = false)`);
      console.log(`Unlocked ${table}`);
    } catch(e) {
      console.log(`${table} unlock note:`, e.message);
    }
  }

  await client.end();
  console.log('Done!');
}

run().catch(console.error);
