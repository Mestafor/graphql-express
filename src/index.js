var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

let links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
}];

const path = require('path');
const fs = require('fs');
const graphQlSchema = fs.readFileSync(path.resolve('./src/schema.graphql'), 'utf8');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(graphQlSchema);

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return 'Hello world!';
  },
};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');