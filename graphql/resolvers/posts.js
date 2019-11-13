import { ObjectID } from 'mongodb';

export default {
  posts: async (data, { collections: { Posts } }) => {
    try {
      return await Posts.find({}).toArray();
    } catch (err) {
      return console.error(err);
    }
  },
  createPost: async (data, { collections: { Posts, Users } }) => {
    try {
      const post = await Posts.insertOne({
        title: data.postInput.title,
        description: data.postInput.description,
        text: data.postInput.text,
        date: data.postInput.date,
        creator: new ObjectID('5dcbca140814360cb9d0abe8'),
      });
      const creator = await Users.updateOne(
        { _id: new ObjectID('5dcbca140814360cb9d0abe8') },
        { $push: { createdPosts: new ObjectID(post.insertedId) } },
      );
      if (!creator) {
        return new Error('User not found.');
      }
      return { _id: post.insertedId, ...post.ops[0] };
    } catch (err) {
      return console.error(err);
    }
  },
};
