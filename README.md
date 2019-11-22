# vue-graphql-mongodb-blog
First steps with vanilla GraphQL and MongoDB...

## Usage

### Frontend
```bash
# Start Vue frontend (localhost:8080)
npm run serve
```

### API
```bash
# Start GraphQL-Server (localhost:3000)
npm run start
```

### Backend
Create nodemon.json to save your credentials for MongoDB
```json
 {
   "env": {
     "MONGO_USER": "<username>",
     "MONGO_PASSWORD": "<password>",
     "MONGO_DB": "<db>"
   }
 }
```
## Technology
[`VueJS`](https://vuejs.org/) - SPA Framework

[`bcrypt`](https://github.com/dcodeIO/bcrypt.js/) - Authentication

[`JWT`](https://jwt.io/) - Authorization

[`ExpressJS`](https://expressjs.com/) - API-Server

[`GraphQL`](https://graphql.org/) - Query Language

[`mongoDB`](https://www.mongodb.com/) - Database

[`Atlas`](https://www.mongodb.com/cloud/atlas) - Database hosting

## License
[MIT](https://choosealicense.com/licenses/mit/)
