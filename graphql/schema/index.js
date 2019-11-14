import { buildSchema } from 'graphql';

export default buildSchema(`
    type Post {
      _id: ID!
      title: String!
      description: String!
      text: String!
      date: String!
      creator: User!
    }

    type User {
      _id: ID! 
      email: String!
      password: String
      createdPosts: [Post!]
    } 

    type AuthData {
      userId: ID!
      token: String!
      tokenExpiration: Int!
    }

    input PostInput {
      title: String!
      description: String!
      text: String!
      date: String!
    }

    input UserInput {
      email: String!
      password: String!
    }

    type Query {
      posts: [Post!]!
      login(email: String!, password: String!): AuthData!
    }

    type Mutation {
      createPost(postInput: PostInput): Post
      createUser(userInput: UserInput): User
    }

    schema {
      query: Query
      mutation: Mutation
    }
`);
