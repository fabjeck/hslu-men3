<template>
  <div id="app">
    <header>
      <nav id="nav">
        <div class="logo">
          <router-link to="/">The Blog</router-link>
        </div>
        <div v-if="showAccount" class="account">
          <router-link to="/login">Login</router-link>
          <span> | </span>
          <router-link to="/signup">Sign up</router-link>
        </div>
      </nav>
    </header>
    <main>
      <router-view/>
    </main>
    <footer>
      <p class="author"><b>Fabien Jeckelmann</b> | BSc in Digital Ideation | Hochschule Luzern</p>
    </footer>
  </div>
</template>


<script>
export default {
  computed: {
    showAccount() {
      return this.$route.path !== '/login' && this.$route.path !== '/signup';
    },
  },
};
</script>

<style lang="scss">
  #app {
    width: 960px;
    margin: 0 auto;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  #nav {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding: $space-medium $space-large;
    .logo {
      flex: 1 1 auto;
      a {
        font-weight: $font-weight-bold;
        font-size: 1.8rem;
        text-transform: uppercase;
      }
    }
    .account {
      flex: 0 0 auto;
      a {
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
</style>
