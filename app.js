/* eslint-disable no-console */
const express = require('express');
const passport = require('passport');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:admin@cluster0-kdhxs.mongodb.net/Cluster0?retryWrites=true&w=majority', { useNewUrlParser: true })
  .then(
    () => { console.log('MongoDB connection successful'); },
    (err) => { console.log('MongoDB connection error: ', err); },
  );

const app = express();
app.listen(4000);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

app.use(require('./routes/auth-routes.js'));
app.use(require('./routes/user-routes.js'));

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// The root provides a resolver function for each API endpoint
const root = {
  hello: () => 'Hello world!',
};
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
}));
