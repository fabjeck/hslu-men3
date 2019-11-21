<template>
  <div id="app">
    <header>
      <nav id="nav">
        <div class="logo">
          <router-link to="/">The Blog</router-link>
        </div>
        <div v-if="$route.meta.authOptions" class="auth-options">
          <template v-if="loggedIn">
            <router-link to="/" @click.native="logout">Logout</router-link>
          </template>
          <template v-else>
            <router-link to="/login">Login</router-link>
            <span> | </span>
            <router-link to="/signup">Sign up</router-link>
          </template>
        </div>
      </nav>
    </header>
    <main>
      <router-view/>
    </main>
    <footer>
      <p class="author">
        <strong>Fabien Jeckelmann</strong>
         | BSc in Digital Ideation | Hochschule Luzern
      </p>
    </footer>
  </div>
</template>


<script>
import Store from '@/scripts/Store';

export default {
  methods: {
    logout() {
      Store.clear();
    },
  },
  computed: {
    loggedIn() {
      return Store.id;
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
    align-items: flex-end;
    .logo {
      flex: 1 1 auto;
      a {
        font-weight: $font-weight-bold;
        font-size: 1.3rem;
        text-transform: uppercase;
      }
    }
    .auth-options {
      flex: 0 0 auto;
      a {
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
</style>
