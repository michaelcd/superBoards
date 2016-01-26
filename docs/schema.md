# Schema Information

## boards
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
author_id   | integer   | not null, foreign key (references users), indexed
title       | string    | not null
archived    | boolean   | not null, default: false

## board shares
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
board_id    | text      | not null
user_id     | integer   | not null, foreign key (references users), indexed

## lists
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
ord         | integer   | not null
title       | string    | not null
board_id    | integer   | not null, foreign key (references board), indexed
archived    | boolean   | not null, default: false

## cards
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
ord         | integer   | not null
title       | string    | not null
body        | text      | not null
author_id   | integer   | not null, foreign key (references users), indexed
list_id     | integer   | not null, foreign key (references lists), indexed
archived    | boolean   | not null, default: false

## comments
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
body        | text      | not null
author_id   | integer   | not null, foreign key (references users), indexed
card_id     | integer   | not null, foreign key (references lists), indexed

## tags
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
name        | string    | not null

## taggings
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
name        | string    | not null
card_id     | integer   | not null, foreign key (references cards), indexed, unique [card_id]
tag_id      | integer   | not null, foreign key (references tags), indexed

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
username        | string    | not null, indexed, unique
password_digest | string    | not null
session_token   | string    | not null, indexed, unique
