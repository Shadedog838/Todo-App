CREATE DATABASE todo;

CREATE TABLE users (
  user_id uuid DEFAULT uuid_generate_v4(),
  user_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL UNIQUE,
  user_password VARCHAR(255) NOT NULL,
  PRIMARY KEY(user_id)
);

CREATE TABLE todo(
  todo_id SERIAL,
  user_id UUID,
  description VARCHAR(255),
  PRIMARY KEY (todo_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);


insert into users(user_name, user_email, user_password) values ('Jacob', 'jacob@gmail.com', 'kth18822');

insert into todos(user_id, description) values ('2700e72a-ee55-4a8f-b8c7-524b653a2dcf', 'clean room');