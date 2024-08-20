-- Create schema for organizations
CREATE SCHEMA orgs;

-- Define invitation status enum type
CREATE TYPE orgs.invitation_status AS ENUM ('pending', 'accepted', 'rejected');

-- Table for organization details
CREATE TABLE orgs.list (
    id bigserial PRIMARY KEY,
    name text not null,
    slug text unique not null,
    picture text,
    website text,
    industry text,
    phone text,
    email text,
    bio text,
    "owner" bigint NOT null REFERENCES auth.user(id) ON DELETE CASCADE,
    established_on timestamptz,
    created_at timestamptz DEFAULT CURRENT_TIMESTAMP
);
ALTER SEQUENCE orgs.list_id_seq RESTART WITH 11200;

-- Table for departments within organizations
CREATE TABLE orgs.department (
    id bigserial PRIMARY KEY,
    org_id bigint NOT NULL REFERENCES orgs.list(id) ON DELETE CASCADE,
    name text NOT NULL,
    created_at timestamptz DEFAULT CURRENT_TIMESTAMP
);
ALTER SEQUENCE orgs.department_id_seq RESTART WITH 12000;

-- Table for offices within organizations
CREATE TABLE orgs.offices (
    id bigserial PRIMARY KEY,
    org_id bigint NOT null REFERENCES orgs.list(id) ON DELETE CASCADE,
    name text NOT NULL,
    location text,
    phone text,
    email text,
    active boolean DEFAULT true,
    created_at timestamptz DEFAULT CURRENT_TIMESTAMP
);
ALTER SEQUENCE orgs.offices_id_seq RESTART WITH 12000;

-- Table for employee work schedules
CREATE TABLE orgs.work_schedule (
    id bigserial PRIMARY KEY,
    org_id bigint NOT null REFERENCES orgs.list(id) ON DELETE CASCADE,
    name text NOT NULL,
    type text,
    active boolean DEFAULT true,
    work_hrs numeric,
    total_hrs numeric,
    daily_hrs numeric[],
    created_at timestamptz DEFAULT CURRENT_TIMESTAMP
);
ALTER SEQUENCE orgs.work_schedule_id_seq RESTART WITH 12000;

-- Table for employees within organizations
CREATE TABLE orgs.employee (
    id bigserial PRIMARY KEY,
    org_id bigint NOT null REFERENCES orgs.list(id) ON DELETE CASCADE,
    user_id bigint NOT NULL REFERENCES auth.user(id) ON DELETE CASCADE,
    scopes text[],
    department text,
    office text,
    reports_to bigint REFERENCES auth.user(id) ON DELETE CASCADE,
    hired_at timestamp DEFAULT CURRENT_TIMESTAMP
);
ALTER SEQUENCE orgs.employee_id_seq RESTART WITH 12000;

-- Table for invitations to join organizations
CREATE TABLE orgs.invitation (
    id bigserial PRIMARY KEY,
    email text NOT NULL,
    status orgs.invitation_status NOT NULL,
    org_id bigint NOT NULL REFERENCES orgs.list(id) ON DELETE CASCADE,
    invited_by bigint NOT NULL REFERENCES auth.user(id) ON DELETE CASCADE,
    invited_at timestamp DEFAULT CURRENT_TIMESTAMP
);
ALTER SEQUENCE orgs.invitation_id_seq RESTART WITH 12000;
