#!/bin/bash
set -e

# Create additional databases for different environments if needed
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    -- Create test database
    CREATE DATABASE diquis_test;
    GRANT ALL PRIVILEGES ON DATABASE diquis_test TO $POSTGRES_USER;

    -- Create additional databases for cache, queue, and cable if needed in production
    -- These will be created automatically by Rails migrations in development
EOSQL

echo "Database initialization completed successfully!"