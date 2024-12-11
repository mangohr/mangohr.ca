import type { ColumnType } from "kysely";

export type ArrayType<T> = ArrayTypeImpl<T> extends (infer U)[]
  ? U[]
  : ArrayTypeImpl<T>;

export type ArrayTypeImpl<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S[], I[], U[]>
  : T[];

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export type Int8 = ColumnType<string, bigint | number | string, bigint | number | string>;

export type Json = JsonValue;

export type JsonArray = JsonValue[];

export type JsonObject = {
  [K in string]?: JsonValue;
};

export type JsonPrimitive = boolean | number | string | null;

export type JsonValue = JsonArray | JsonObject | JsonPrimitive;

export type Numeric = ColumnType<string, number | string, number | string>;

export type OrgsInvitationStatus = "accepted" | "pending" | "rejected";

export type TimeOffStatus = "approved" | "pending" | "rejected";

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export interface AuthAccount {
  access_token: string | null;
  created_at: Generated<Timestamp | null>;
  expires_at: Int8 | null;
  id: Generated<Int8>;
  id_token: string | null;
  provider: string;
  providerAccountId: string;
  refresh_token: string | null;
  scope: string | null;
  session_state: string | null;
  token_type: string | null;
  type: string;
  userId: Int8;
}

export interface AuthSession {
  expires: Timestamp;
  id: Generated<Int8>;
  sessionToken: string;
  userId: Int8;
}

export interface AuthUser {
  created_at: Generated<Timestamp | null>;
  email: string;
  emailVerified: Timestamp | null;
  id: Generated<Int8>;
  image: string | null;
  name: string | null;
  username: string;
}

export interface AuthVerificationToken {
  expires: Timestamp;
  identifier: string;
  token: string;
}

export interface OrgsAttendance {
  employee_id: Int8 | null;
  id: Generated<Int8>;
  login: Generated<Timestamp>;
  logout: Timestamp | null;
  org_id: Int8 | null;
}

export interface OrgsDepartment {
  created_at: Generated<Timestamp | null>;
  id: Generated<Int8>;
  name: string;
  org_id: Int8;
}

export interface OrgsEmployee {
  /**
   * @type:{ line1?: string, line2?:string, city?:string, state?:string, country?:string, zip_code?:string };
   */
  address: { line1?: string, line2?:string, city?:string, state?:string, country?:string, zip_code?:string };
  current_job: Int8 | null;
  date_of_birth: string | null;
  department: Int8 | null;
  /**
   * @type:Array<{name:string, phone:string, relation:string}>;
   */
  emergency_contacts: Array<{name:string, phone:string, relation:string}>;
  first_name: string | null;
  gender: string | null;
  hired_at: Generated<Timestamp | null>;
  id: Generated<Int8>;
  last_name: string | null;
  marital_status: string | null;
  middle_name: string | null;
  office: Int8 | null;
  org_id: Int8;
  phone: string | null;
  role: Generated<string | null>;
  roles: Generated<string[]>;
  scopes: string[] | null;
  user_id: Int8;
  work_email: string | null;
}

export interface OrgsInvitation {
  data: Json | null;
  email: string;
  id: Generated<Int8>;
  invited_at: Generated<Timestamp | null>;
  invited_by: Int8;
  org_id: Int8;
  status: OrgsInvitationStatus;
}

export interface OrgsJob {
  created_at: Generated<Timestamp | null>;
  employee_id: Int8 | null;
  end_date: Timestamp | null;
  id: Generated<Int8>;
  org_id: Int8 | null;
  reports_to: Int8 | null;
  start_date: Timestamp;
  title: string;
  type: string;
}

export interface OrgsList {
  bio: string | null;
  created_at: Generated<Timestamp | null>;
  email: string | null;
  established_on: Timestamp | null;
  id: Generated<Int8>;
  industry: string | null;
  location: string | null;
  name: string;
  owner: Int8;
  phone: string | null;
  picture: string | null;
  slug: string;
  website: string | null;
}

export interface OrgsOffice {
  active: Generated<boolean | null>;
  created_at: Generated<Timestamp | null>;
  email: string | null;
  id: Generated<Int8>;
  location: string | null;
  name: string;
  org_id: Int8;
  phone: string | null;
}

export interface OrgsStorage {
  created_at: Generated<Timestamp | null>;
  employee_id: Int8 | null;
  id: string;
  location: string;
  name: string;
  org_id: Int8;
  size: number;
  type: string;
  uploaded_at: Timestamp | null;
  uploaded_by: Int8;
}

export interface OrgsTimeOff {
  action_by: Int8 | null;
  action_message: string | null;
  cost: Numeric;
  created_at: Generated<Timestamp>;
  employee_id: Int8 | null;
  end_date: Timestamp;
  id: Generated<Int8>;
  org_id: Int8 | null;
  request_reason: string | null;
  start_date: Timestamp;
  status: Generated<TimeOffStatus>;
  type: string;
}

export interface OrgsWorkSchedule {
  active: Generated<boolean | null>;
  created_at: Generated<Timestamp | null>;
  daily_hrs: ArrayType<Numeric> | null;
  effective_from: Timestamp | null;
  id: Generated<Int8>;
  name: string;
  org_id: Int8;
  total_hrs: Numeric | null;
  type: string | null;
  work_hrs: Numeric | null;
}

export interface DB {
  "auth.account": AuthAccount;
  "auth.session": AuthSession;
  "auth.user": AuthUser;
  "auth.verification_token": AuthVerificationToken;
  "orgs.attendance": OrgsAttendance;
  "orgs.department": OrgsDepartment;
  "orgs.employee": OrgsEmployee;
  "orgs.invitation": OrgsInvitation;
  "orgs.job": OrgsJob;
  "orgs.list": OrgsList;
  "orgs.office": OrgsOffice;
  "orgs.storage": OrgsStorage;
  "orgs.time_off": OrgsTimeOff;
  "orgs.work_schedule": OrgsWorkSchedule;
}
