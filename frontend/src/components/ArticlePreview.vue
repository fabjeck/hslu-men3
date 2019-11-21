<template>
  <article class="article-wrapper">
    <h2>A title</h2>
    <p class="description">A sfsdlfksdjf sölks sdölks ösdlk aöölsafk
      ölsfak ö ösadfl klö sfns alefksök alfk lkas sd ö lasdö sdlö.
    </p>
    <p class="author">Fabien Jeckelmann</p>
    <p class="released">Oct 8 2019</p>
  </article>
</template>

<script>
export default {
  name: 'ArticlePreview',
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
