-- user database
CREATE TABLE IF NOT EXISTS "user"
(
    id SERIAL NOT NULL,
    username character varying(25) COLLATE pg_catalog."default" NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    role integer NOT NULL DEFAULT 3,
    password character varying(500) COLLATE pg_catalog."default" NOT NULL DEFAULT '1'::character varying,
    CONSTRAINT user_pkey PRIMARY KEY (id)
);

-- user-manager database
CREATE TABLE IF NOT EXISTS device
(
    id SERIAL NOT NULL,
    name character varying(100) COLLATE pg_catalog."default" NOT NULL,
    brand character varying(100) COLLATE pg_catalog."default",
    is_free boolean NOT NULL DEFAULT true,
    CONSTRAINT device_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS user_device
(
    id SERIAL NOT NULL,
    user_id integer NOT NULL,
    device_id integer NOT NULL,
    CONSTRAINT id PRIMARY KEY (id)
);


-- ticket database
CREATE TABLE IF NOT EXISTS ticket
(
    id SERIAL NOT NULL,
    title character varying COLLATE pg_catalog."default" NOT NULL,
    author integer NOT NULL,
    device_id integer NOT NULL,
    description character varying(500) COLLATE pg_catalog."default" NOT NULL,
    status integer NOT NULL DEFAULT 1,
    created_at date NOT NULL DEFAULT now(),
    CONSTRAINT ticket_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS ticket_assign
(
    id SERIAL NOT NULL,
    ticket_id integer NOT NULL,
    assignee_id integer NOT NULL,
    created_at date NOT NULL DEFAULT now(),
    is_active boolean NOT NULL DEFAULT false,
    CONSTRAINT ticket_assign_pkey PRIMARY KEY (id),
    CONSTRAINT ticket_assign_id FOREIGN KEY (ticket_id)
        REFERENCES ticket (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
);

-- message database
CREATE TABLE IF NOT EXISTS message
(
    id SERIAL NOT NULL,
    content character varying(500) COLLATE pg_catalog."default" NOT NULL,
    sender_id integer NOT NULL,
    reply_to integer,
    ticket_id integer NOT NULL,
    CONSTRAINT message_pkey PRIMARY KEY (id),
    CONSTRAINT reply_message FOREIGN KEY (reply_to)
        REFERENCES message (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);







