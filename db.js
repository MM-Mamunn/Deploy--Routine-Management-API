import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: '1234',
  port: 5432,
  database: 'Routine Management'
});

export default pool;



// import pg from "pg";

// const { Pool } = pg;

// const pool = new Pool({
//   connectionString:
//     "postgresql://neondb_owner:npg_RNDL5TwtKCo1@ep-raspy-dawn-ad5fix8j-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
//   ssl: { rejectUnauthorized: false }, // Needed for Neon
// });

// export default pool;
// // 