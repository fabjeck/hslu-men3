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
      <router-view/>
    </Modal>
    <router-link
      v-if="loggedIn"
      tag="button"
      class="addBtn"
      to="/CreatePost">
    </router-link>
  </div>
</template>

<script>
import ArticlePreview from '@/components/ArticlePreview.vue';
import Modal from '@/components/Modal.vue';

import Store from '@/scripts/Store';

export default {
  name: 'Blog',
  components: {
    ArticlePreview,
    Modal,
  },
  data: () => ({
    posts: [],
  }),
  computed: {
    loggedIn() {
      return Store.id;
    },
  },
  async mounted() {
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
      /* eslint quote-props: ["error", "as-needed",
      { "keywords": true, "unnecessary": false }] */
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
};
</script>

<style scoped lang="scss">

  .addBtn {
    width: 80px;
    height: 80px;
    border-radius: 100%;
    position: absolute;
    bottom: 0;
    right: $space-large;
    display: flex;
    justify-content: center;
    align-items: center;
    &::after {
      content: '\002b';
      font-size: 3rem;
    }
  }
</style>
