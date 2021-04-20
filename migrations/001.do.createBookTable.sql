create type current_condition as enum ('like new', 'used', 'worn down', 'unusable/lost');

create table if not exists books (
    book_id serial primary key,
    title varchar not null,
    author varchar not null,
    book_condition current_condition default 'used',
    available boolean default false,
    return_date timestamptz default NOW() + interval '2 weeks'
);