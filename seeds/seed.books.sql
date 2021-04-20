begin;

insert into books (title, author, book_condition, available)
values
    ("JavaScript & jQuery", "Jon Duckett", "like new", true),
    ("HTML & CSS", "Jon Duckett", "like new", true),
    ("REACT Explained", "Zac Gordon", "used", true),
    ("JavaScript for impatient programmers", "Dr. Axel Rauschmayer", "used", true);

commit;