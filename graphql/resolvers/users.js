import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default {
  createUser: async (data, { collections: { Users } }) => {
    try {
      const userExists = await Users.findOne({ email: data.userInput.email });
      if (userExists) {
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
        return err;
      }
    } catch (err) {
      return err;
    }
  },
  login: async ({ email, password }, { collections: { Users } }) => {
    try {
      const user = await Users.findOne({ email });
      if (!user) {
        throw new Error('User does not exist.');
      }
      const isEqual = await bcrypt.compare(password, user.password);
      if (!isEqual) {
        throw new Error('Wrong password.');
      }
      // eslint-disable-next-line no-underscore-dangle
      const token = jwt.sign({ userId: user._id, email: user.email }, 'privateKey', {
        expiresIn: '1h',
      });
      // eslint-disable-next-line no-underscore-dangle
      return { userId: user._id, token, tokenExpiration: 1 };
    } catch (err) {
      return err;
    }
  },
};
