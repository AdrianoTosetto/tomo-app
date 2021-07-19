CREATE TYPE gender_t AS ENUM('male', 'female');

create table if not exists users(
  id uuid default gen_random_uuid() primary key,
  name character varying(100),
  email character varying(100),
  bio character varying(500),
  gender gender_t
);

create table if not exists interests(
  id uuid default gen_random_uuid() primary key,
  name character varying(50)
);

create table if not exists users_interests(
  user_id uuid references interests(id),
  interest_id uuid references users(id)
);
