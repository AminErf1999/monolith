CREATE DATABASE backpack
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'English_United States.1252'
    LC_CTYPE = 'English_United States.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

CREATE SCHEMA backpack2
    AUTHORIZATION postgres;

CREATE TABLE IF NOT EXISTS backpack2.device
(
    id integer NOT NULL DEFAULT nextval('backpack2.device_id_seq'::regclass),
    name character varying(100) COLLATE pg_catalog."default" NOT NULL,
    brand character varying(100) COLLATE pg_catalog."default",
    is_free boolean NOT NULL DEFAULT true,
    CONSTRAINT device_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS backpack2.message
(
    id integer NOT NULL DEFAULT nextval('backpack2.message_id_seq'::regclass),
    content character varying(500) COLLATE pg_catalog."default" NOT NULL,
    sender_id integer NOT NULL,
    reply_to integer,
    ticket_id integer NOT NULL,
    CONSTRAINT message_pkey PRIMARY KEY (id),
    CONSTRAINT reply_message FOREIGN KEY (reply_to)
        REFERENCES backpack2.message (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT sender_message FOREIGN KEY (sender_id)
        REFERENCES backpack2."user" (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT ticket_message FOREIGN KEY (ticket_id)
        REFERENCES backpack2.ticket (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS backpack2.ticket
(
    id integer NOT NULL DEFAULT nextval('backpack2.ticket_id_seq'::regclass),
    title character varying COLLATE pg_catalog."default" NOT NULL,
    description character varying(500) COLLATE pg_catalog."default" NOT NULL,
    author integer NOT NULL,
    status integer NOT NULL DEFAULT 1,
    device_id integer NOT NULL,
    created_at date NOT NULL DEFAULT now(),
    CONSTRAINT ticket_pkey PRIMARY KEY (id),
    CONSTRAINT device_ticket FOREIGN KEY (device_id)
        REFERENCES backpack2.device (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT user_ticket FOREIGN KEY (author)
        REFERENCES backpack2."user" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

CREATE TABLE IF NOT EXISTS backpack2.ticket_assign
(
    id integer NOT NULL DEFAULT nextval('backpack2.ticket_assign_id_seq'::regclass),
    ticket_id integer NOT NULL,
    assignee_id integer NOT NULL,
    created_at date NOT NULL DEFAULT now(),
    is_active boolean NOT NULL DEFAULT false,
    CONSTRAINT ticket_assign_pkey PRIMARY KEY (id),
    CONSTRAINT supporter_ticket FOREIGN KEY (assignee_id)
        REFERENCES backpack2."user" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT ticket_assign_id FOREIGN KEY (ticket_id)
        REFERENCES backpack2.ticket (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS backpack2."user"
(
    id integer NOT NULL DEFAULT nextval('backpack2.user_id_seq'::regclass),
    username character varying(25) COLLATE pg_catalog."default" NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    role integer NOT NULL DEFAULT 3,
    password character varying(500) COLLATE pg_catalog."default" NOT NULL DEFAULT '1'::character varying,
    CONSTRAINT user_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS backpack2.user_device
(
    id integer NOT NULL DEFAULT nextval('backpack2.user_device_id_seq'::regclass),
    user_id integer NOT NULL,
    device_id integer NOT NULL,
    CONSTRAINT id PRIMARY KEY (id),
    CONSTRAINT fk1 FOREIGN KEY (user_id)
        REFERENCES backpack2."user" (id) MATCH FULL
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk2 FOREIGN KEY (device_id)
        REFERENCES backpack2.device (id) MATCH FULL
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);



