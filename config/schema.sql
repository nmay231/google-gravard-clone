create table Killed (
  slug varchar(60) not null primary key,
  dateClose varchar(40) not null,
  dateOpen varchar(40) not null,
  description text not null,
  link text not null,
  name varchar(60) not null,
  type varchar(40) not null
);