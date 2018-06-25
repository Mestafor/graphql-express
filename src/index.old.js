const {
  GraphQLServer
} = require('graphql-yoga')

let links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
}];

let idCount = links.length;

const options = {
  port: 8000,
  endpoint: '/graphql',
  subscriptions: '/subscriptions',
  playground: '/playground',
}

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
    link: (id) => {
      console.log('--id: ', id);
      return links.filter(l => {
        console.log(l);
        return l.id === id
      })[0]
    }
  },
  // 3
  Link: {
    id: (root) => root.id,
    description: (root) => root.description,
    url: (root) => root.url,
  },
  Mutation: {
    post: (root, args) => {
      const link = {
        id: `link-${idCount++}`,
        url: args.url,
        description: args.description
      };
      links.push(link);
      return link;
    },
    updateLink: (root, args) => {
      const link = links.filter(link => link.id === args.id)[0];
      if(!link) {
        return null;
      }
      link.description = args.description;
      link.url = args.url;
      return link;
    },
    deleteLink: (id, args) => {
      let linkIndex = null;
      const link = links.filter((link, index) => {
        if(link.id === args.id) {
          linkIndex = index;
          return true;
        }

        return false;
      })[0];
      linkIndex != null ? links.splice(linkIndex,1) : null;
      return link;
    }
  }
}


// 3
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  options
});



server.start(() => console.log(`Server is running on http://localhost:4000`));
