import { ObjectID } from 'mongodb';

const populatePosts = async (Posts, Users, postIds) => {
  try {
    const posts = await Posts.find({ _id: { $in: postIds } }).toArray();
    return posts.map(async (post) => ({
      ...post,
      date: new Date(post.date).toISOString(),
      // eslint-disable-next-line no-use-before-define
      creator: await populateUser(Users, Posts, post.creator),
    }));
  } catch (err) {
    return err;
  }
};

const populateUser = async (Users, Posts, userId) => {
  try {
    const user = await Users.findOne({ _id: userId }, { projection: { password: 0 } });
    return {
      ...user,
      createdPosts: await populatePosts(Posts, Users, user.createdPosts),
    };
  } catch (err) {
    return err;
  }
};

export default {
  posts: async (data, { collections: { Posts, Users } }) => {
    try {
      const posts = await Posts.find({}).toArray();
      return posts.map(async (post) => ({
        ...post,
        date: new Date(post.date).toISOString(),
        creator: await populateUser(Users, Posts, post.creator),
      }));
    } catch (err) {
      return err;
    }
  },
  createPost: async (data, { collections: { Posts, Users } }) => {
    try {
      const post = await Posts.insertOne({
        title: data.postInput.title,
        description: data.postInput.description,
        text: data.postInput.text,
        date: data.postInput.date,
        creator: new ObjectID('5dcc1525970d1219f66cf859'),
      });
      await Users.updateOne(
        { _id: new ObjectID('5dcc1525970d1219f66cf859') },
        { $push: { createdPosts: new ObjectID(post.insertedId) } },
      ).catch((err) => err);
      return { _id: post.insertedId, ...post.ops[0] };
    } catch (err) {
      return err;
    }
  },
};
