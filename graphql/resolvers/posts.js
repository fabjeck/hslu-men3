import { ObjectID } from 'mongodb';

const populatePosts = async (Posts, Users, postIds) => {
  try {
    // Find all posts from one user
    const posts = await Posts.find({ _id: { $in: postIds } }).toArray();
    // Return posts
    return await Promise.all(
      posts.map(async (post) => ({
        ...post,
        date: new Date(post.date).toISOString(),
        // eslint-disable-next-line no-use-before-define
        creator: await populateUser.bind(this, Users, Posts, post.creator),
      })),
    );
  } catch (err) {
    return err;
  }
};

const populateUser = async (Users, Posts, userId) => {
  try {
    // Find user by id, exclude password from query
    const user = await Users.findOne({ _id: userId }, { projection: { password: 0 } });
    // Return user
    return {
      ...user,
      createdPosts: await populatePosts.bind(this, Posts, Users, user.createdPosts),
    };
  } catch (err) {
    return err;
  }
};

export default {
  createPost: async ({ postInput }, { collections: { Posts, Users }, req }) => {
    // Check if user is authenticated
    if (!req.isAuth) {
      throw new Error('Unauthenticated');
    }
    try {
      // Insert post to MongoDB
      const post = await Posts.insertOne({
        title: postInput.title,
        description: postInput.description,
        date: postInput.date,
        creator: new ObjectID(req.userId),
      });
      try {
        // Post reference to creator
        await Users.updateOne(
          { _id: new ObjectID(req.userId) },
          { $push: { createdPosts: new ObjectID(post.insertedId) } },
        );
        // return post
        return {
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
      // Get all posts from MongoDB
      const posts = await Posts.find({}).sort({ date: -1 }).toArray();
      // Return posts
      return await Promise.all(
        posts.map(async (post) => ({
          ...post,
          date: new Date(post.date).toISOString(),
          creator: await populateUser(Users, Posts, post.creator),
        })),
      );
    } catch (err) {
      return err;
    }
  },
};
