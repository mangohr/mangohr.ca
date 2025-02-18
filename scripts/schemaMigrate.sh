# source .env.prod;
source ../.env;


psql -d $DATABASE_URL < schema_dump.sql;

echo 'Schema Migrated!';

