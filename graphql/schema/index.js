import { buildSchema } from 'graphql';

export default buildSchema(`
    type Post {
      _id: ID!
      title: String!
      description: String!
      date: String!
      creator: User!
    }

    type User {
      _id: ID! 
      firstName: String!
      lastName: String!
      email: String!
      createdPosts: [Post!]
    } 

    type AuthPayload {
      user: User!
      token: String!
    }

    input PostInput {
      title: String!
      description: String!
      date: String!
    }

    input UserInput {
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    }

    type Query {
      posts: [Post!]!
      login(email: String!, password: String!): AuthPayload!
    }

    type Mutation {
      createPost(postInput: PostInput): Post
      createUser(userInput: UserInput): AuthPayload!
    }

    schema {
      query: Query
      mutation: Mutation
    }
`);
