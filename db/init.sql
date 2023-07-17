-- CREATE DATABASE IF NOT EXISTS fibodb --
SELECT 'CREATE DATABASE fibodb'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'fibodb')\gexec
