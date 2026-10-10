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
  const tables = res.rows.map(r => r.table_name);
  console.log('Existing tables in CockroachDB:', tables);

  // Also include newly defined tables if any
  const targetTables = Array.from(new Set([
    ...tables,
    'admin_users',
    'contact_messages',
    'lead_notes',
    'lead_activities',
    'clients',
    'blog_posts',
    'projects',
    'newsletter_subscribers'
  ]));

  for (const table of targetTables) {
    try {
      await client.query(`ALTER TABLE IF EXISTS "${table}" SET (schema_locked = false)`);
      console.log(`Unlocked table: ${table}`);
    } catch(e) {
      console.log(`Table ${table} unlock info:`, e.message);
    }
  }

  await client.end();
  console.log('All tables unlocked successfully!');
}

run().catch(console.error);
