# Seeds folder

## Add your sql seed data here for your database
- ex: users
> BEGIN;

> INSERT INTO "user" ("id", "username", "name", "password")
>
> VALUES
> 
> (
    1,
    'admin',
    'Dunder Mifflin Admin',
    -- [using bcrypt... password = "pass"]
    '$2a$10$fCWkaGbt7ZErxaxclioLteLUgg4Q3Rp09WW0s/wSLxDKYsaGYUpjG'
> ); 

> SELECT setval('user_id_seq', (SELECT MAX(id) from "user"));

> COMMIT;