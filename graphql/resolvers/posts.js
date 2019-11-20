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
  createPost: async (data, { collections: { Posts, Users } }, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated');
    }
    const input = data.map((prop) => prop.postInput);
    try {
      const post = await Posts.insertOne({
        title: input.title,
        description: input.description,
        text: input.text,
        date: input.date,
        creator: new ObjectID(req.userId),
      });
      try {
        await Users.updateOne(
          { _id: new ObjectID(req.userId) },
          { $push: { createdPosts: new ObjectID(post.insertedId) } },
        );
        return {
          _id: post.insertedId,
          ...post.ops[0],
          date: new Date(post.ops[0].date).toISOString(),
          creator: await populateUser(Users, Posts, post.ops[0].creator),
        };
      } catch (err) {
        return err;
      }
    } catch (err) {
      return err;
    }
  },
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
};
