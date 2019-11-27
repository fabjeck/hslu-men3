import { GraphQLError } from 'graphql';

export default class ValidationError extends GraphQLError {
  constructor(msg, key) {
    super(msg);
    this.key = key;
  }
}
