-- Create schema
CREATE SCHEMA IF NOT EXISTS auth;

-- Create 'auth.user' table
CREATE TABLE auth.user (
    id BIGSERIAL PRIMARY KEY,
    name TEXT,
    email TEXT UNIQUE NOT NULL,
    username TEXT UNIQUE NOT NULL,
    "emailVerified" TIMESTAMPTZ,
    image TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

ALTER SEQUENCE auth.user_id_seq RESTART WITH 112580;


-- Create 'auth.account' table
CREATE TABLE auth.account (
    id BIGSERIAL PRIMARY KEY,
    "userId" BIGINT NOT NULL REFERENCES auth.user(id) ON DELETE CASCADE,
    type TEXT NOT NULL,
    provider TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    refresh_token TEXT,
    access_token TEXT,
    expires_at BIGINT,
    token_type TEXT,
    scope TEXT,
    id_token TEXT,
    session_state TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
ALTER SEQUENCE auth.user_id_seq RESTART WITH 13000;

-- Create 'auth.session' table
CREATE TABLE auth.session (
    id BIGSERIAL PRIMARY KEY,
    "userId" BIGINT NOT NULL REFERENCES auth.user(id) ON DELETE CASCADE,
    "sessionToken" TEXT NOT NULL UNIQUE,
    expires TIMESTAMPTZ NOT NULL
);
ALTER SEQUENCE auth.session_id_seq RESTART WITH 13000;

-- Create 'auth.verification_token' table
CREATE TABLE auth.verification_token (
    identifier TEXT NOT NULL,
    token TEXT NOT NULL UNIQUE,
    expires TIMESTAMPTZ NOT NULL
);
ALTER SEQUENCE auth.verification_token_id_seq RESTART WITH 13000;

-- Create indexes
CREATE INDEX Account_userId_index ON auth.account("userId");
CREATE INDEX Session_userId_index ON auth.session("userId");
