import knex from 'knex';
import bookshelf from 'bookshelf';
import knexConfig from '../knexfile';

// This file initializes bookshelf using our knex configuration options, so we can import and use it later

// Bookshelf is an ORM (Object-Relational Mapping tool) for node.js, which lets us do common tasks when querying databases in JavaScript.
// We are using it to interface with PostgreSQL from node.

export default bookshelf(knex(knexConfig.development));
