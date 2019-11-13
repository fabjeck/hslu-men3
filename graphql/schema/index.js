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
    }

    type Mutation {
      createPost(postInput: PostInput): Post
      createUser(userInput: UserInput): User
    }
`);
