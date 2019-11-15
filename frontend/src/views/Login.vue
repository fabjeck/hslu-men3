<template>
  <div class="login">
   <section class="auth-modal">
     <form>
        <FormInput label="Username" type="text" id="username"/>
        <FormInput label="Password" type="password" id="password"/>
        <FormButton label="Login"/>
        <FormLink name="signup">
          <template v-slot:signup>
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

export default {
  name: 'Login',
  components: {
    FormInput,
    FormButton,
    FormLink,
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
