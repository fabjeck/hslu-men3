<template>
  <div class="blog-form">
    <h1>Create post</h1>
    <form @submit.prevent="submitHandler">
      <FormInput
        v-model.trim="title.value"
        :error="title.error"
        :label="title.label"
        type="text"
        id="title"/>
      <FormTextarea
        v-model.trim="description.value"
        :error="description.error"
        :label="description.label"
        id="description"/>
      <FormButton label="Publish"/>
    </form>
  </div>
</template>

<script>
import FormInput from '@/components/form-elements/FormInput.vue';
import FormTextarea from '@/components/form-elements/FormTextarea.vue';
import FormButton from '@/components/form-elements/FormButton.vue';

export default {
  name: 'CreatePost',
  components: {
    FormInput,
    FormTextarea,
    FormButton,
  },
  data: () => ({
    title: {
      value: null,
      error: null,
      label: 'Title',
    },
    description: {
      value: null,
      error: null,
      label: 'Description',
    },
  }),
  methods: {
    async submitHandler() {
      // Perform form validation
      if (this.checkForm()) {
        // Define request body
        const requestBody = {
          query: `
            mutation {
              createPost(postInput: {title: "${this.title.value}", description: "${this.description.value}", date: "${new Date().toISOString()}"}) {
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
            return false;
          }
          // Save userId and token in localStorage
          localStorage.setItem('_id', resData.data.createUser.user._id);
          localStorage.setItem('token', resData.data.createUser.token);
          // Redirect to "home"
          this.$router.push('/');
          return true;
        } catch (err) {
          return err;
        }
      } else {
        return false;
      }
    },
    checkForm() {
      // Check title
      if (!this.title.value) {
        this.title.error = `${this.title.label} can't be blank.`;
      } else {
        this.title.error = null;
      }

      // Check description
      if (!this.description.value) {
        this.description.error = `${this.description.label} can't be blank.`;
      } else {
        this.description.error = null;
      }

      // Check if any errors occured
      if (
        !this.firstName.error
        && !this.lastName.error
      ) {
        return true;
      }
      return false;
    },
  },
};
</script>
