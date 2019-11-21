<template>
  <div class="blog">
    <section class="articles-wrapper">
      <ArticlePreview/>
    </section>
    <Modal v-if="showModal" @close="handleClose">
      <router-view/>
    </Modal>
    <router-link
      tag="button"
      class="addBtn"
      @click.native="showModal = true"
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
  data: () => ({ showModal: false }),
  methods: {
    handleClose() {
      this.showModal = false;
      this.$router.go(-1);
    },
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
