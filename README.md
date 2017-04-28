## A simple app with signup and auth using React, Redux and Express
Following [this tutorial](https://www.youtube.com/watch?v=yoJuOs-niIc) by [Remchi](https://github.com/Remchi)

**Original repo**: https://github.com/Remchi/reddice

## Run the project locally
Make sure you have `postgresql`, `yarn`, and `node 6.9.5` installed.

```
createdb reddice
yarn
yarn run server
```

## Entry points
- Server: 
  - Express server: `/server/index.js` 
- Client: 
  - React: `/client/index.js` 
- Database:
  - Knex migrations for PostgreSQL: `/migrations`
  - Knex configuration: `/knexfile.js`
  - Bookshelf file: `/server/bookshelf.js`
