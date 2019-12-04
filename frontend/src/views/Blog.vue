<template>
  <div class="blog">
    <section class="articles-wrapper">
      <ArticlePreview
        v-for="post in posts"
        :key="post._id"
        :title="post.title"
        :description="post.description"
        :author="post.creator.firstName + ' ' + post.creator.lastName"
        :date="post.date"
      />
    </section>
    <Modal v-if="$route.meta.showModal">
      <router-view @add-post="prependPost"/>
    </Modal>
    <router-link
      v-if="this.$root.globalState.token"
      tag="button"
      class="addBtn"
      to="/CreatePost">
    </router-link>
  </div>
</template>

<script>
import ArticlePreview from '@/components/ArticlePreview.vue';
import Modal from '@/components/Modal.vue';

export default {
  name: 'Blog',
  components: {
    ArticlePreview,
    Modal,
  },
  data: () => ({
    posts: [],
  }),
  created() {
    this.fetchPosts();
  },
  methods: {
    async fetchPosts() {
      // Define request body
      const requestBody = {
        query: `
        query {
          posts {
            _id
            title
            description
            date
            creator {
              firstName
              lastName
            }
          }
        }
      `,
      };

      // Execute request
      try {
        const res = await fetch('http://localhost:3000/graphql', {
          method: 'POST',
          body: JSON.stringify(requestBody),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        // Request response
        const resData = await res.json();
        if (resData.errors) {
          throw new Error('Failed');
        }
        this.posts = resData.data.posts;
        return true;
      } catch (err) {
        return err;
      }
    },
    prependPost(post) {
      this.posts.unshift(post);
    },
  },
};
</script>

<style scoped lang="scss">
.addBtn {
  width: 80px;
  height: 80px;
  border-radius: 100%;
  position: fixed;
  bottom: 100px;
  right: calc(((100vw - 960px)/ 2) + #{$space-large});
  display: flex;
  justify-content: center;
  align-items: center;
  &::after {
    content: "\002b";
    font-size: 3rem;
  }
}
</style>
