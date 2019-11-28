import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import ValidationError from '../errors/ValidationError';
import secretKey from '../../middleware/secret-key';

const generateToken = (uid) => jwt.sign(
  { userId: uid },
  secretKey.KEY,
  { algorithm: secretKey.ALGORITHM },
);

export default {
  createUser: async ({ userInput }, { collections: { Users } }) => {
    try {
      // Check for existing users with same email
      const userExists = await Users.findOne({ email: userInput.email });
      if (userExists) {
        throw new ValidationError('User exists already.', 'email');
      }
      // Hash password with 12-digit salt
      const hashedPassword = await bcrypt.hash(userInput.password, 12);
      try {
        // Create user in MongoDB
        const callback = await Users.insertOne({
          firstName: userInput.firstName,
          lastName: userInput.lastName,
          email: userInput.email,
          password: hashedPassword,
        });
        // Create user object which matches GraphQL schema
        const user = {
          _id: callback.ops[0]._id,
          firstName: callback.ops[0].firstName,
          lastName: callback.ops[0].lastName,
          email: callback.ops[0].email,
        };
        // Create JWT-token
        const token = generateToken(user._id);
        // Return props which correspond to GrapQL schema
        return {
          user,
          token,
        };
      } catch (err) {
        return err;
      }
    } catch (err) {
      return err;
    }
  },
  login: async ({ email, password }, { collections: { Users } }) => {
    try {
      // Find user account in MongoDV
      const user = await Users.findOne({ email });
      if (!user) {
        // throw new Error('User does not exist.');
        throw new ValidationError('User does not exist.', 'email');
      }
      // Compare typed password with saved password
      const isEqual = await bcrypt.compare(password, user.password);
      if (!isEqual) {
        throw new ValidationError('Wrong password.', 'password');
      }
      // Remove password from user object, to meet GrapQL schema definitions
      delete user.password;
      // Create JWT-token
      const token = generateToken(user._id);
      // Return props which correspond to GrapQL schema
      return {
        user,
        token,
      };
    } catch (err) {
      return err;
    }
  },
};
