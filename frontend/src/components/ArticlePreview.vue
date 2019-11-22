<template>
  <article class="article-wrapper">
    <h2>{{ title }}</h2>
    <p class="description">
      {{ description }}
    </p>
    <p class="author">{{ author }}</p>
    <p class="released">{{ formattedDate }}</p>
  </article>
</template>

<script>
export default {
  name: 'ArticlePreview',
  props: {
    title: String,
    description: String,
    author: String,
    date: String,
  },
  data() {
    return {
      rawDate: this.date,
    };
  },
  computed: {
    formattedDate() {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const date = new Date(Date.parse(this.rawDate));
      return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
    },
  },
};
</script>

<style scoped lang="scss">
.article-wrapper {
  padding: $space-large;
  border-bottom: 1px solid $color-secondary;
  h2 {
    color: $color-primary;
  }
  .description {
    color: $color-secondary;
    margin: 0 0 $space-base 0;
    max-width: 60%;
  }
  .author {
    font-size: $font-size-small;
    margin: 0;
  }
  .released {
    font-size: $font-size-small;
    color: $color-secondary;
    margin: 0;
  }
}
</style>
