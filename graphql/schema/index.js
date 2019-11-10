import { buildSchema } from 'graphql';

export default buildSchema(`
    type Post {
      _id: ID!
      title: String!
      description: String!
    }

    input PostInput {
      title: String!
      description: String!
    }

    type Query {
      posts: [Post!]!
    }

    type Mutation {
      createPost(postInput: PostInput): Post
    }
`);
