<template>
  <div class="blog">
    <section class="introduction">
        This blog is the result of a school project. It's build with VueJS and
        gets its data from a MongoDB database which is accessed by a GraphQL-API.
    </section>
    <section class="articles-wrapper">
      <ArticlePreview/>
    </section>
  </div>
</template>

<script>
import ArticlePreview from '@/components/ArticlePreview.vue';

export default {
  name: 'Blog',
  components: {
    ArticlePreview,
  },
};
</script>

<style scoped lang="scss">
  .introduction {
    grid-area: introduction;
    color: $color-secondary;
    font-size: $font-size-medium;
    background-color: $color-light;
    padding: $space-medium;
    border-radius: 5px;
    margin-bottom: $space-large;
  }
</style>
