export default {
  posts: async (data, { collections: { Users } }) => {
    try {
      return await Users.find({}).toArray();
    } catch (err) {
      return console.error(err);
    }
  },
  createPost: async (data, { collections: { Users } }) => {
    try {
      const post = await Users.insertOne({
        title: data.postInput.title,
        description: data.postInput.description,
      });
      return { _id: post.insertedId, ...data.postInput };
    } catch (err) {
      return console.error(err);
    }
  },
};
