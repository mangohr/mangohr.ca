#!/bin/bash

source ../.env;

pg_dump -d $DATABASE_URL --schema-only -f schema_dump.sql 

echo 'Schema Dumpped!';

