import bcrypt from 'bcryptjs';

export default {
  createUser: async (data, { collections: { Users } }) => {
    try {
      const existingUser = await Users.findOne({ email: data.userInput.email });
      if (existingUser) {
        return new Error('User exists already.');
      }
      const hashedPassword = await bcrypt.hash(data.userInput.password, 12);
      try {
        const user = await Users.insertOne({
          email: data.userInput.email,
          password: hashedPassword,
        });
        return { _id: user.insertedId, ...user.ops[0], password: null };
      } catch (err) {
        return console.error(err);
      }
    } catch (err) {
      return console.error(err);
    }
  },
};
