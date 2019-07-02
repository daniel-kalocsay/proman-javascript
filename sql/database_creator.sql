create table if not exists boards
(
	id serial not null
		constraint boards_pk
			primary key,
	title varchar
);

alter table boards owner to dani;

create unique index if not exists boards_id_uindex
	on boards (id);

create unique index if not exists boards_title_uindex
	on boards (title);

create table if not exists statuses
(
	id serial not null
		constraint statuses_pk
			primary key,
	title varchar
);

alter table statuses owner to dani;

create table if not exists cards
(
	id serial not null
		constraint cards_pk
			primary key,
	board_id integer
		constraint board_id
			references boards
				on update cascade on delete cascade,
	title varchar not null,
	status_id integer not null
		constraint status_id
			references statuses
				on update cascade on delete cascade,
	"order" integer default 0 not null
);

alter table cards owner to dani;

create unique index if not exists cards_id_uindex
	on cards (id);

create unique index if not exists statuses_id_uindex
	on statuses (id);

INSERT INTO statuses (title)
VALUES ('New');

INSERT INTO statuses (title)
VALUES ('In progress');

INSERT INTO statuses (title)
VALUES ('Testing');

INSERT INTO statuses (title)
VALUES ('Done');