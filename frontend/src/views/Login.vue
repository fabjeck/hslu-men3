<template>
  <div class="login">
   <section class="auth-wrapper">
     <h1>Login</h1>
     <form @submit.prevent="submitHandler">
        <FormInput
          v-model.trim="email.value"
          :error="email.error"
          :label="email.label"
          type="text"
          id="email"/>
        <FormInput
          v-model.trim="password.value"
          :error="password.error"
          :label="password.label"
          type="password"
          id="password"/>
        <FormButton label="Login"/>
        <FormLink>
          <template>
            No account yet? <router-link to="/signup">Sign up</router-link> to become a publisher.
          </template>
        </FormLink>
     </form>
   </section>
  </div>
</template>

<script>
import FormInput from '@/components/form-elements/FormInput.vue';
import FormButton from '@/components/form-elements/FormButton.vue';
import FormLink from '@/components/form-elements/FormLink.vue';

import Store from '@/scripts/Store';

export default {
  name: 'Login',
  components: {
    FormInput,
    FormButton,
    FormLink,
  },
  data: () => ({
    email: {
      value: null,
      error: null,
      label: 'Email',
    },
    password: {
      value: null,
      error: null,
      label: 'Password',
    },
  }),
  methods: {
    async submitHandler() {
      // Define request body
      const requestBody = {
        query: `
          query {
            login(email: "${this.email.value}", password: "${this.password.value}") {
              user {
                _id
              }
              token
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
        if (!res.ok) {
          this.email.error = resData.errors[0].message;
          this.password.error = resData.errors[0].message;
          return false;
        }
        // Save userId and token in store
        Store.id = resData.data.login.user._id;
        Store.token = resData.data.login.token;
        // Redirect to "home"
        this.$router.push('/');
        return true;
      } catch (err) {
        return err;
      }
    },
  },
};
</script>

<style scoped lang="scss">
  .login {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1 1 auto;
  }
</style>
