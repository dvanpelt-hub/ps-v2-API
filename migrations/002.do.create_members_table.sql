CREATE TABLE members_list (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  member_email VARCHAR(40) NOT NULL UNIQUE,
  member_password VARCHAR(24) NOT NULL,
  date_joined NUMERIC NOT NULL
)