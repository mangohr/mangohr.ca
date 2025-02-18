--
-- PostgreSQL database dump
--

-- Dumped from database version 16.6
-- Dumped by pg_dump version 16.7 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: auth; Type: SCHEMA; Schema: -; Owner: neondb_owner
--

CREATE SCHEMA auth;


ALTER SCHEMA auth OWNER TO neondb_owner;

--
-- Name: orgs; Type: SCHEMA; Schema: -; Owner: neondb_owner
--

CREATE SCHEMA orgs;


ALTER SCHEMA orgs OWNER TO neondb_owner;

--
-- Name: invitation_status; Type: TYPE; Schema: orgs; Owner: neondb_owner
--

CREATE TYPE orgs.invitation_status AS ENUM (
    'pending',
    'accepted',
    'rejected'
);


ALTER TYPE orgs.invitation_status OWNER TO neondb_owner;

--
-- Name: time_off_status; Type: TYPE; Schema: public; Owner: neondb_owner
--

CREATE TYPE public.time_off_status AS ENUM (
    'pending',
    'approved',
    'rejected'
);


ALTER TYPE public.time_off_status OWNER TO neondb_owner;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: account; Type: TABLE; Schema: auth; Owner: neondb_owner
--

CREATE TABLE auth.account (
    id bigint NOT NULL,
    "userId" bigint NOT NULL,
    type text NOT NULL,
    provider text NOT NULL,
    "providerAccountId" text NOT NULL,
    refresh_token text,
    access_token text,
    expires_at bigint,
    token_type text,
    scope text,
    id_token text,
    session_state text,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE auth.account OWNER TO neondb_owner;

--
-- Name: account_id_seq; Type: SEQUENCE; Schema: auth; Owner: neondb_owner
--

CREATE SEQUENCE auth.account_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE auth.account_id_seq OWNER TO neondb_owner;

--
-- Name: account_id_seq; Type: SEQUENCE OWNED BY; Schema: auth; Owner: neondb_owner
--

ALTER SEQUENCE auth.account_id_seq OWNED BY auth.account.id;


--
-- Name: session; Type: TABLE; Schema: auth; Owner: neondb_owner
--

CREATE TABLE auth.session (
    id bigint NOT NULL,
    "userId" bigint NOT NULL,
    "sessionToken" text NOT NULL,
    expires timestamp with time zone NOT NULL
);


ALTER TABLE auth.session OWNER TO neondb_owner;

--
-- Name: session_id_seq; Type: SEQUENCE; Schema: auth; Owner: neondb_owner
--

CREATE SEQUENCE auth.session_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE auth.session_id_seq OWNER TO neondb_owner;

--
-- Name: session_id_seq; Type: SEQUENCE OWNED BY; Schema: auth; Owner: neondb_owner
--

ALTER SEQUENCE auth.session_id_seq OWNED BY auth.session.id;


--
-- Name: user; Type: TABLE; Schema: auth; Owner: neondb_owner
--

CREATE TABLE auth."user" (
    id bigint NOT NULL,
    name text,
    email text NOT NULL,
    username text NOT NULL,
    "emailVerified" timestamp with time zone,
    image text,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE auth."user" OWNER TO neondb_owner;

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: auth; Owner: neondb_owner
--

CREATE SEQUENCE auth.user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE auth.user_id_seq OWNER TO neondb_owner;

--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: auth; Owner: neondb_owner
--

ALTER SEQUENCE auth.user_id_seq OWNED BY auth."user".id;


--
-- Name: verification_token; Type: TABLE; Schema: auth; Owner: neondb_owner
--

CREATE TABLE auth.verification_token (
    identifier text NOT NULL,
    token text NOT NULL,
    expires timestamp with time zone NOT NULL
);


ALTER TABLE auth.verification_token OWNER TO neondb_owner;

--
-- Name: attendance; Type: TABLE; Schema: orgs; Owner: neondb_owner
--

CREATE TABLE orgs.attendance (
    id bigint NOT NULL,
    org_id bigint,
    employee_id bigint,
    login timestamp with time zone DEFAULT now() NOT NULL,
    logout timestamp with time zone
);


ALTER TABLE orgs.attendance OWNER TO neondb_owner;

--
-- Name: attendance_id_seq; Type: SEQUENCE; Schema: orgs; Owner: neondb_owner
--

CREATE SEQUENCE orgs.attendance_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE orgs.attendance_id_seq OWNER TO neondb_owner;

--
-- Name: attendance_id_seq; Type: SEQUENCE OWNED BY; Schema: orgs; Owner: neondb_owner
--

ALTER SEQUENCE orgs.attendance_id_seq OWNED BY orgs.attendance.id;


--
-- Name: department; Type: TABLE; Schema: orgs; Owner: neondb_owner
--

CREATE TABLE orgs.department (
    id bigint NOT NULL,
    org_id bigint NOT NULL,
    name text NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE orgs.department OWNER TO neondb_owner;

--
-- Name: department_id_seq; Type: SEQUENCE; Schema: orgs; Owner: neondb_owner
--

CREATE SEQUENCE orgs.department_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE orgs.department_id_seq OWNER TO neondb_owner;

--
-- Name: department_id_seq; Type: SEQUENCE OWNED BY; Schema: orgs; Owner: neondb_owner
--

ALTER SEQUENCE orgs.department_id_seq OWNED BY orgs.department.id;


--
-- Name: employee; Type: TABLE; Schema: orgs; Owner: neondb_owner
--

CREATE TABLE orgs.employee (
    id bigint NOT NULL,
    org_id bigint NOT NULL,
    user_id bigint NOT NULL,
    scopes text[],
    hired_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    role text DEFAULT 'employee'::text,
    current_job bigint,
    first_name text,
    last_name text,
    gender text,
    date_of_birth text,
    work_email text,
    phone text,
    marital_status text,
    emergency_contacts jsonb[],
    address jsonb,
    middle_name text,
    department bigint,
    office bigint,
    roles text[] DEFAULT '{user}'::text[] NOT NULL
);


ALTER TABLE orgs.employee OWNER TO neondb_owner;

--
-- Name: COLUMN employee.emergency_contacts; Type: COMMENT; Schema: orgs; Owner: neondb_owner
--

COMMENT ON COLUMN orgs.employee.emergency_contacts IS '@type:Array<{name:string, phone:string, relation:string}>;';


--
-- Name: COLUMN employee.address; Type: COMMENT; Schema: orgs; Owner: neondb_owner
--

COMMENT ON COLUMN orgs.employee.address IS '@type:{ line1?: string, line2?:string, city?:string, state?:string, country?:string, zip_code?:string };';


--
-- Name: employee_id_seq; Type: SEQUENCE; Schema: orgs; Owner: neondb_owner
--

CREATE SEQUENCE orgs.employee_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE orgs.employee_id_seq OWNER TO neondb_owner;

--
-- Name: employee_id_seq; Type: SEQUENCE OWNED BY; Schema: orgs; Owner: neondb_owner
--

ALTER SEQUENCE orgs.employee_id_seq OWNED BY orgs.employee.id;


--
-- Name: invitation; Type: TABLE; Schema: orgs; Owner: neondb_owner
--

CREATE TABLE orgs.invitation (
    id bigint NOT NULL,
    email text NOT NULL,
    status orgs.invitation_status NOT NULL,
    org_id bigint NOT NULL,
    invited_by bigint NOT NULL,
    invited_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    data jsonb
);


ALTER TABLE orgs.invitation OWNER TO neondb_owner;

--
-- Name: invitation_id_seq; Type: SEQUENCE; Schema: orgs; Owner: neondb_owner
--

CREATE SEQUENCE orgs.invitation_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE orgs.invitation_id_seq OWNER TO neondb_owner;

--
-- Name: invitation_id_seq; Type: SEQUENCE OWNED BY; Schema: orgs; Owner: neondb_owner
--

ALTER SEQUENCE orgs.invitation_id_seq OWNED BY orgs.invitation.id;


--
-- Name: job; Type: TABLE; Schema: orgs; Owner: neondb_owner
--

CREATE TABLE orgs.job (
    id bigint NOT NULL,
    title text NOT NULL,
    type text NOT NULL,
    org_id bigint,
    reports_to bigint,
    employee_id bigint,
    start_date timestamp with time zone NOT NULL,
    end_date timestamp with time zone,
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE orgs.job OWNER TO neondb_owner;

--
-- Name: jobs_id_seq; Type: SEQUENCE; Schema: orgs; Owner: neondb_owner
--

CREATE SEQUENCE orgs.jobs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE orgs.jobs_id_seq OWNER TO neondb_owner;

--
-- Name: jobs_id_seq; Type: SEQUENCE OWNED BY; Schema: orgs; Owner: neondb_owner
--

ALTER SEQUENCE orgs.jobs_id_seq OWNED BY orgs.job.id;


--
-- Name: list; Type: TABLE; Schema: orgs; Owner: neondb_owner
--

CREATE TABLE orgs.list (
    id bigint NOT NULL,
    name text NOT NULL,
    slug text NOT NULL,
    picture text,
    website text,
    industry text,
    phone text,
    email text,
    bio text,
    owner bigint NOT NULL,
    established_on timestamp with time zone,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    location text
);


ALTER TABLE orgs.list OWNER TO neondb_owner;

--
-- Name: list_id_seq; Type: SEQUENCE; Schema: orgs; Owner: neondb_owner
--

CREATE SEQUENCE orgs.list_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE orgs.list_id_seq OWNER TO neondb_owner;

--
-- Name: list_id_seq; Type: SEQUENCE OWNED BY; Schema: orgs; Owner: neondb_owner
--

ALTER SEQUENCE orgs.list_id_seq OWNED BY orgs.list.id;


--
-- Name: office; Type: TABLE; Schema: orgs; Owner: neondb_owner
--

CREATE TABLE orgs.office (
    id bigint NOT NULL,
    org_id bigint NOT NULL,
    name text NOT NULL,
    location text,
    phone text,
    email text,
    active boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE orgs.office OWNER TO neondb_owner;

--
-- Name: offices_id_seq; Type: SEQUENCE; Schema: orgs; Owner: neondb_owner
--

CREATE SEQUENCE orgs.offices_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE orgs.offices_id_seq OWNER TO neondb_owner;

--
-- Name: offices_id_seq; Type: SEQUENCE OWNED BY; Schema: orgs; Owner: neondb_owner
--

ALTER SEQUENCE orgs.offices_id_seq OWNED BY orgs.office.id;


--
-- Name: onboarding; Type: TABLE; Schema: orgs; Owner: neondb_owner
--

CREATE TABLE orgs.onboarding (
    id bigint NOT NULL,
    full_name text NOT NULL,
    company_name text NOT NULL,
    designation text NOT NULL,
    referral text,
    total_employees integer,
    onboarded_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT onboarding_total_employees_check CHECK ((total_employees >= 1))
);


ALTER TABLE orgs.onboarding OWNER TO neondb_owner;

--
-- Name: storage; Type: TABLE; Schema: orgs; Owner: neondb_owner
--

CREATE TABLE orgs.storage (
    id uuid NOT NULL,
    name text NOT NULL,
    size integer NOT NULL,
    type text NOT NULL,
    location text NOT NULL,
    org_id bigint NOT NULL,
    employee_id bigint,
    uploaded_by bigint NOT NULL,
    uploaded_at timestamp with time zone,
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE orgs.storage OWNER TO neondb_owner;

--
-- Name: time_off; Type: TABLE; Schema: orgs; Owner: neondb_owner
--

CREATE TABLE orgs.time_off (
    id bigint NOT NULL,
    org_id bigint,
    employee_id bigint,
    status public.time_off_status DEFAULT 'pending'::public.time_off_status NOT NULL,
    type text NOT NULL,
    request_reason text,
    action_message text,
    start_date timestamp with time zone NOT NULL,
    end_date timestamp with time zone NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    cost numeric NOT NULL,
    action_by bigint
);


ALTER TABLE orgs.time_off OWNER TO neondb_owner;

--
-- Name: time_offs_id_seq; Type: SEQUENCE; Schema: orgs; Owner: neondb_owner
--

CREATE SEQUENCE orgs.time_offs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE orgs.time_offs_id_seq OWNER TO neondb_owner;

--
-- Name: time_offs_id_seq; Type: SEQUENCE OWNED BY; Schema: orgs; Owner: neondb_owner
--

ALTER SEQUENCE orgs.time_offs_id_seq OWNED BY orgs.time_off.id;


--
-- Name: work_schedule; Type: TABLE; Schema: orgs; Owner: neondb_owner
--

CREATE TABLE orgs.work_schedule (
    id bigint NOT NULL,
    org_id bigint NOT NULL,
    name text NOT NULL,
    type text,
    active boolean DEFAULT true,
    work_hrs numeric,
    total_hrs numeric,
    daily_hrs numeric[],
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    effective_from timestamp with time zone
);


ALTER TABLE orgs.work_schedule OWNER TO neondb_owner;

--
-- Name: work_schedule_id_seq; Type: SEQUENCE; Schema: orgs; Owner: neondb_owner
--

CREATE SEQUENCE orgs.work_schedule_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE orgs.work_schedule_id_seq OWNER TO neondb_owner;

--
-- Name: work_schedule_id_seq; Type: SEQUENCE OWNED BY; Schema: orgs; Owner: neondb_owner
--

ALTER SEQUENCE orgs.work_schedule_id_seq OWNED BY orgs.work_schedule.id;


--
-- Name: kysely_migration; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.kysely_migration (
    name character varying(255) NOT NULL,
    "timestamp" character varying(255) NOT NULL
);


ALTER TABLE public.kysely_migration OWNER TO neondb_owner;

--
-- Name: kysely_migration_lock; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.kysely_migration_lock (
    id character varying(255) NOT NULL,
    is_locked integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.kysely_migration_lock OWNER TO neondb_owner;

--
-- Name: account id; Type: DEFAULT; Schema: auth; Owner: neondb_owner
--

ALTER TABLE ONLY auth.account ALTER COLUMN id SET DEFAULT nextval('auth.account_id_seq'::regclass);


--
-- Name: session id; Type: DEFAULT; Schema: auth; Owner: neondb_owner
--

ALTER TABLE ONLY auth.session ALTER COLUMN id SET DEFAULT nextval('auth.session_id_seq'::regclass);


--
-- Name: user id; Type: DEFAULT; Schema: auth; Owner: neondb_owner
--

ALTER TABLE ONLY auth."user" ALTER COLUMN id SET DEFAULT nextval('auth.user_id_seq'::regclass);


--
-- Name: attendance id; Type: DEFAULT; Schema: orgs; Owner: neondb_owner
--

ALTER TABLE ONLY orgs.attendance ALTER COLUMN id SET DEFAULT nextval('orgs.attendance_id_seq'::regclass);


--
-- Name: department id; Type: DEFAULT; Schema: orgs; Owner: neondb_owner
--

ALTER TABLE ONLY orgs.department ALTER COLUMN id SET DEFAULT nextval('orgs.department_id_seq'::regclass);


--
-- Name: employee id; Type: DEFAULT; Schema: orgs; Owner: neondb_owner
--

ALTER TABLE ONLY orgs.employee ALTER COLUMN id SET DEFAULT nextval('orgs.employee_id_seq'::regclass);


--
-- Name: invitation id; Type: DEFAULT; Schema: orgs; Owner: neondb_owner
--

ALTER TABLE ONLY orgs.invitation ALTER COLUMN id SET DEFAULT nextval('orgs.invitation_id_seq'::regclass);


--
-- Name: job id; Type: DEFAULT; Schema: orgs; Owner: neondb_owner
--

ALTER TABLE ONLY orgs.job ALTER COLUMN id SET DEFAULT nextval('orgs.jobs_id_seq'::regclass);


--
-- Name: list id; Type: DEFAULT; Schema: orgs; Owner: neondb_owner
--

ALTER TABLE ONLY orgs.list ALTER COLUMN id SET DEFAULT nextval('orgs.list_id_seq'::regclass);


--
-- Name: office id; Type: DEFAULT; Schema: orgs; Owner: neondb_owner
--

ALTER TABLE ONLY orgs.office ALTER COLUMN id SET DEFAULT nextval('orgs.offices_id_seq'::regclass);


--
-- Name: time_off id; Type: DEFAULT; Schema: orgs; Owner: neondb_owner
--

ALTER TABLE ONLY orgs.time_off ALTER COLUMN id SET DEFAULT nextval('orgs.time_offs_id_seq'::regclass);


--
-- Name: work_schedule id; Type: DEFAULT; Schema: orgs; Owner: neondb_owner
--

ALTER TABLE ONLY orgs.work_schedule ALTER COLUMN id SET DEFAULT nextval('orgs.work_schedule_id_seq'::regclass);


--
-- Name: account account_pkey; Type: CONSTRAINT; Schema: auth; Owner: neondb_owner
--

ALTER TABLE ONLY auth.account
    ADD CONSTRAINT account_pkey PRIMARY KEY (id);


--
-- Name: session session_pkey; Type: CONSTRAINT; Schema: auth; Owner: neondb_owner
--

ALTER TABLE ONLY auth.session
    ADD CONSTRAINT session_pkey PRIMARY KEY (id);


--
-- Name: session session_sessionToken_key; Type: CONSTRAINT; Schema: auth; Owner: neondb_owner
--

ALTER TABLE ONLY auth.session
    ADD CONSTRAINT "session_sessionToken_key" UNIQUE ("sessionToken");


--
-- Name: user user_email_key; Type: CONSTRAINT; Schema: auth; Owner: neondb_owner
--

ALTER TABLE ONLY auth."user"
    ADD CONSTRAINT user_email_key UNIQUE (email);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: auth; Owner: neondb_owner
--

ALTER TABLE ONLY auth."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: user user_username_key; Type: CONSTRAINT; Schema: auth; Owner: neondb_owner
--

ALTER TABLE ONLY auth."user"
    ADD CONSTRAINT user_username_key UNIQUE (username);


--
-- Name: verification_token verification_token_token_key; Type: CONSTRAINT; Schema: auth; Owner: neondb_owner
--

ALTER TABLE ONLY auth.verification_token
    ADD CONSTRAINT verification_token_token_key UNIQUE (token);


--
-- Name: attendance attendance_pkey; Type: CONSTRAINT; Schema: orgs; Owner: neondb_owner
--

ALTER TABLE ONLY orgs.attendance
    ADD CONSTRAINT attendance_pkey PRIMARY KEY (id);


--
-- Name: department department_pkey; Type: CONSTRAINT; Schema: orgs; Owner: neondb_owner
--

ALTER TABLE ONLY orgs.department
    ADD CONSTRAINT department_pkey PRIMARY KEY (id);


--
-- Name: employee employee_pkey; Type: CONSTRAINT; Schema: orgs; Owner: neondb_owner
--

ALTER TABLE ONLY orgs.employee
    ADD CONSTRAINT employee_pkey PRIMARY KEY (id);


--
-- Name: invitation invitation_pkey; Type: CONSTRAINT; Schema: orgs; Owner: neondb_owner
--

ALTER TABLE ONLY orgs.invitation
    ADD CONSTRAINT invitation_pkey PRIMARY KEY (id);


--
-- Name: job jobs_pkey; Type: CONSTRAINT; Schema: orgs; Owner: neondb_owner
--

ALTER TABLE ONLY orgs.job
    ADD CONSTRAINT jobs_pkey PRIMARY KEY (id);


--
-- Name: list list_pkey; Type: CONSTRAINT; Schema: orgs; Owner: neondb_owner
--

ALTER TABLE ONLY orgs.list
    ADD CONSTRAINT list_pkey PRIMARY KEY (id);


--
-- Name: list list_slug_key; Type: CONSTRAINT; Schema: orgs; Owner: neondb_owner
--

ALTER TABLE ONLY orgs.list
    ADD CONSTRAINT list_slug_key UNIQUE (slug);


--
-- Name: office offices_pkey; Type: CONSTRAINT; Schema: orgs; Owner: neondb_owner
--

ALTER TABLE ONLY orgs.office
    ADD CONSTRAINT offices_pkey PRIMARY KEY (id);


--
-- Name: onboarding onboarding_pkey; Type: CONSTRAINT; Schema: orgs; Owner: neondb_owner
--

ALTER TABLE ONLY orgs.onboarding
    ADD CONSTRAINT onboarding_pkey PRIMARY KEY (id);


--
-- Name: storage storage_pkey; Type: CONSTRAINT; Schema: orgs; Owner: neondb_owner
--

ALTER TABLE ONLY orgs.storage
    ADD CONSTRAINT storage_pkey PRIMARY KEY (id);


--
-- Name: time_off time_offs_pkey; Type: CONSTRAINT; Schema: orgs; Owner: neondb_owner
--

ALTER TABLE ONLY orgs.time_off
    ADD CONSTRAINT time_offs_pkey PRIMARY KEY (id);


--
-- Name: work_schedule work_schedule_pkey; Type: CONSTRAINT; Schema: orgs; Owner: neondb_owner
--

ALTER TABLE ONLY orgs.work_schedule
    ADD CONSTRAINT work_schedule_pkey PRIMARY KEY (id);


--
-- Name: kysely_migration_lock kysely_migration_lock_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.kysely_migration_lock
    ADD CONSTRAINT kysely_migration_lock_pkey PRIMARY KEY (id);


--
-- Name: kysely_migration kysely_migration_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.kysely_migration
    ADD CONSTRAINT kysely_migration_pkey PRIMARY KEY (name);


--
-- Name: account_userid_index; Type: INDEX; Schema: auth; Owner: neondb_owner
--

CREATE INDEX account_userid_index ON auth.account USING btree ("userId");


--
-- Name: session_userid_index; Type: INDEX; Schema: auth; Owner: neondb_owner
--

CREATE INDEX session_userid_index ON auth.session USING btree ("userId");


--
-- Name: account account_userId_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: neondb_owner
--

ALTER TABLE ONLY auth.account
    ADD CONSTRAINT "account_userId_fkey" FOREIGN KEY ("userId") REFERENCES auth."user"(id) ON DELETE CASCADE;


--
-- Name: session session_userId_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: neondb_owner
--

ALTER TABLE ONLY auth.session
    ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES auth."user"(id) ON DELETE CASCADE;


--
-- Name: attendance attendance_employee_id_fkey; Type: FK CONSTRAINT; Schema: orgs; Owner: neondb_owner
--

ALTER TABLE ONLY orgs.attendance
    ADD CONSTRAINT attendance_employee_id_fkey FOREIGN KEY (employee_id) REFERENCES orgs.employee(id) ON DELETE CASCADE;


--
-- Name: attendance attendance_org_id_fkey; Type: FK CONSTRAINT; Schema: orgs; Owner: neondb_owner
--

ALTER TABLE ONLY orgs.attendance
    ADD CONSTRAINT attendance_org_id_fkey FOREIGN KEY (org_id) REFERENCES orgs.list(id) ON DELETE CASCADE;


--
-- Name: department department_org_id_fkey; Type: FK CONSTRAINT; Schema: orgs; Owner: neondb_owner
--

ALTER TABLE ONLY orgs.department
    ADD CONSTRAINT department_org_id_fkey FOREIGN KEY (org_id) REFERENCES orgs.list(id) ON DELETE CASCADE;


--
-- Name: employee employee_current_job_fkey; Type: FK CONSTRAINT; Schema: orgs; Owner: neondb_owner
--

ALTER TABLE ONLY orgs.employee
    ADD CONSTRAINT employee_current_job_fkey FOREIGN KEY (current_job) REFERENCES orgs.job(id) ON DELETE SET NULL;


--
-- Name: employee employee_department_fkey; Type: FK CONSTRAINT; Schema: orgs; Owner: neondb_owner
--

ALTER TABLE ONLY orgs.employee
    ADD CONSTRAINT employee_department_fkey FOREIGN KEY (department) REFERENCES orgs.department(id);


--
-- Name: employee employee_office_fkey; Type: FK CONSTRAINT; Schema: orgs; Owner: neondb_owner
--

ALTER TABLE ONLY orgs.employee
    ADD CONSTRAINT employee_office_fkey FOREIGN KEY (office) REFERENCES orgs.office(id);


--
-- Name: employee employee_org_id_fkey; Type: FK CONSTRAINT; Schema: orgs; Owner: neondb_owner
--

ALTER TABLE ONLY orgs.employee
    ADD CONSTRAINT employee_org_id_fkey FOREIGN KEY (org_id) REFERENCES orgs.list(id) ON DELETE CASCADE;


--
-- Name: employee employee_user_id_fkey; Type: FK CONSTRAINT; Schema: orgs; Owner: neondb_owner
--

ALTER TABLE ONLY orgs.employee
    ADD CONSTRAINT employee_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth."user"(id) ON DELETE CASCADE;


--
-- Name: invitation invitation_invited_by_fkey; Type: FK CONSTRAINT; Schema: orgs; Owner: neondb_owner
--

ALTER TABLE ONLY orgs.invitation
    ADD CONSTRAINT invitation_invited_by_fkey FOREIGN KEY (invited_by) REFERENCES auth."user"(id) ON DELETE CASCADE;


--
-- Name: invitation invitation_org_id_fkey; Type: FK CONSTRAINT; Schema: orgs; Owner: neondb_owner
--

ALTER TABLE ONLY orgs.invitation
    ADD CONSTRAINT invitation_org_id_fkey FOREIGN KEY (org_id) REFERENCES orgs.list(id) ON DELETE CASCADE;


--
-- Name: job jobs_employee_id_fkey; Type: FK CONSTRAINT; Schema: orgs; Owner: neondb_owner
--

ALTER TABLE ONLY orgs.job
    ADD CONSTRAINT jobs_employee_id_fkey FOREIGN KEY (employee_id) REFERENCES orgs.employee(id) ON DELETE CASCADE;


--
-- Name: job jobs_org_id_fkey; Type: FK CONSTRAINT; Schema: orgs; Owner: neondb_owner
--

ALTER TABLE ONLY orgs.job
    ADD CONSTRAINT jobs_org_id_fkey FOREIGN KEY (org_id) REFERENCES orgs.list(id) ON DELETE CASCADE;


--
-- Name: job jobs_responds_to_fkey; Type: FK CONSTRAINT; Schema: orgs; Owner: neondb_owner
--

ALTER TABLE ONLY orgs.job
    ADD CONSTRAINT jobs_responds_to_fkey FOREIGN KEY (reports_to) REFERENCES orgs.employee(id) ON DELETE SET NULL;


--
-- Name: list list_owner_fkey; Type: FK CONSTRAINT; Schema: orgs; Owner: neondb_owner
--

ALTER TABLE ONLY orgs.list
    ADD CONSTRAINT list_owner_fkey FOREIGN KEY (owner) REFERENCES auth."user"(id) ON DELETE CASCADE;


--
-- Name: office offices_org_id_fkey; Type: FK CONSTRAINT; Schema: orgs; Owner: neondb_owner
--

ALTER TABLE ONLY orgs.office
    ADD CONSTRAINT offices_org_id_fkey FOREIGN KEY (org_id) REFERENCES orgs.list(id) ON DELETE CASCADE;


--
-- Name: onboarding onboarding_id_fkey; Type: FK CONSTRAINT; Schema: orgs; Owner: neondb_owner
--

ALTER TABLE ONLY orgs.onboarding
    ADD CONSTRAINT onboarding_id_fkey FOREIGN KEY (id) REFERENCES auth."user"(id) ON DELETE CASCADE;


--
-- Name: storage storage_employee_id_fkey; Type: FK CONSTRAINT; Schema: orgs; Owner: neondb_owner
--

ALTER TABLE ONLY orgs.storage
    ADD CONSTRAINT storage_employee_id_fkey FOREIGN KEY (employee_id) REFERENCES orgs.employee(id) ON DELETE CASCADE;


--
-- Name: storage storage_org_id_fkey; Type: FK CONSTRAINT; Schema: orgs; Owner: neondb_owner
--

ALTER TABLE ONLY orgs.storage
    ADD CONSTRAINT storage_org_id_fkey FOREIGN KEY (org_id) REFERENCES orgs.list(id) ON DELETE CASCADE;


--
-- Name: storage storage_uploaded_by_fkey; Type: FK CONSTRAINT; Schema: orgs; Owner: neondb_owner
--

ALTER TABLE ONLY orgs.storage
    ADD CONSTRAINT storage_uploaded_by_fkey FOREIGN KEY (uploaded_by) REFERENCES auth."user"(id) ON DELETE SET NULL;


--
-- Name: time_off time_off_action_by_fkey; Type: FK CONSTRAINT; Schema: orgs; Owner: neondb_owner
--

ALTER TABLE ONLY orgs.time_off
    ADD CONSTRAINT time_off_action_by_fkey FOREIGN KEY (action_by) REFERENCES auth."user"(id) ON DELETE CASCADE;


--
-- Name: time_off time_offs_employee_id_fkey; Type: FK CONSTRAINT; Schema: orgs; Owner: neondb_owner
--

ALTER TABLE ONLY orgs.time_off
    ADD CONSTRAINT time_offs_employee_id_fkey FOREIGN KEY (employee_id) REFERENCES orgs.employee(id) ON DELETE CASCADE;


--
-- Name: time_off time_offs_org_id_fkey; Type: FK CONSTRAINT; Schema: orgs; Owner: neondb_owner
--

ALTER TABLE ONLY orgs.time_off
    ADD CONSTRAINT time_offs_org_id_fkey FOREIGN KEY (org_id) REFERENCES orgs.list(id) ON DELETE CASCADE;


--
-- Name: work_schedule work_schedule_org_id_fkey; Type: FK CONSTRAINT; Schema: orgs; Owner: neondb_owner
--

ALTER TABLE ONLY orgs.work_schedule
    ADD CONSTRAINT work_schedule_org_id_fkey FOREIGN KEY (org_id) REFERENCES orgs.list(id) ON DELETE CASCADE;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO neon_superuser WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON TABLES TO neon_superuser WITH GRANT OPTION;


--
-- PostgreSQL database dump complete
--

