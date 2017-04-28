import bookshelf from '../bookshelf'; // import our initialized Bookshelf file, not the Bookshelf package

// Here we define the schema for our a user to be equivalent to that of our users table, as defined in our knex migration

export default bookshelf.Model.extend({
  tableName: 'users'
});
