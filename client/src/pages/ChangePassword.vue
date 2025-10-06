<template>
  <div class="container">
    <div class="row justify-content-center my-5 mx-1">
      <div>
        <div class="card">
          <div class="card-body">
            <form @submit.prevent="onSubmit">
              <api-provided-form
                form-name="changePassword"
                @change="onFormChange"
                :data="data"
              />
              <div class="mb-0 d-flex justify-content-between">
                <button type="submit" class="btn btn-primary">
                  <icon name="paper-plane" /> Submit password change
                </button>
              </div>
            </form>
          </div>
        </div>
        <ul class="mt-3">
          <li>
            Don't want to change your password?
            <router-link :to="{ name: 'account' }">Go back</router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ApiProvidedForm from '../components/ApiProvidedForm.vue';
import Icon from '../components/Icon.vue';
import { useForm } from '../compositions/useForm';
import { api } from '../modules/api';
import { toaster } from '../modules/toaster';
import { killSession } from '../store/actions/session.actions';
import { $passwordValidator } from '../_legacy/passwordValidator';
import { useSeoMeta } from '@unhead/vue';

export default defineComponent({
  name: 'ChangePasswordPage',
  components: { ApiProvidedForm, Icon },
  setup(_props, ctx) {
    useSeoMeta({
      title: 'Change your password',
    });

    return useForm(ctx);
  },
  mounted() {
    $passwordValidator();
  },
  methods: {
    async onSubmit() {
      const { currentPassword, password, passwordConfirm } = this.data;
      if (
        await api.changePassword(currentPassword, password, passwordConfirm)
      ) {
        toaster.success(`<b>Your password was updated!</b><br/>
                                 You have to login again!`);
        await killSession();
        await this.$router.push({ name: 'signIn' });
      }
    },
  },
});
</script>
