import postsResolver from './posts';
import authResolver from './auth';

export default {
  ...postsResolver,
  ...authResolver,
};
