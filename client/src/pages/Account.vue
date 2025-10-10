<template>
  <div class="container">
    <section class="my-3">
      <h1>Account</h1>
      <div class="card my-3 mx-1">
        <div class="card-body">
          <div class="card-text">
            <form>
              <div class="mb-3 row">
                <label class="col-sm-2" for="username"
                  >Username</label
                >
                <div class="col-sm-10">
                  <div class="w-100">
                    <input
                      type="text"
                      aria-describedby="usernameHelp"
                      id="username"
                      :value="user?.username"
                      class="form-control"
                      disabled
                    />
                  </div>
                  <small class="text-muted" id="usernameHelp">
                    This name will be used in URLs and is shown on your account
                    and mod pages.
                  </small>
                </div>
              </div>
              <div class="mb-3 row">
                <label class="col-sm-2" for="email"
                  >E-Mail</label
                >
                <div class="col-sm-10">
                  <div class="w-100">
                    <input
                      type="text"
                      aria-describedby="emailHelp"
                      id="email"
                      :value="user?.email"
                      class="form-control"
                      disabled
                    />
                  </div>
                  <small class="text-muted" id="emailHelp">
                    This address will be used to contact you. It's
                    <u>not</u> public!
                  </small>
                </div>
              </div>
              <div class="mb-3 row">
                <label class="col-sm-2" for="email"
                  >Password:</label
                >
                <div class="col-sm-7">
                  <input
                    type="password"
                    id="password"
                    value="Oh no, you found me!"
                    class="form-control col-sm-8"
                    disabled
                  />
                </div>
                <div class="col-sm-3">
                  <router-link
                    :to="{ name: 'changePassword' }"
                    class="btn btn-primary w-100"
                  >
                    Change password
                  </router-link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ul>
        <li>
          Go to your
          <router-link v-if="loadingState === 'ready'"
            :to="{ name: 'user', params: { username: user!.username } }"
          >
            public profile
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'contact' }">Contact us</router-link>
          if you have any questions or want to have your account deleted
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useSeoMeta } from '@unhead/vue';
import { ref } from 'vue';
import { LoadingState } from '../utils';
import { getSelfUser, UserDto } from '../api';
import { getPersistedAuthtoken } from '../store/persistence.store';

useSeoMeta({
  title: 'Account',
});

// session is required for this route, as defined in the router action
const authtoken = getPersistedAuthtoken()!;

const user = ref<UserDto>();
const loadingState = ref<LoadingState>('loading');
async function loadSelfUser() {
  loadingState.value = 'loading';
  const { data, error } = await getSelfUser({ headers: { authtoken: `Bearer: ${authtoken}` } }); // TODO: move authentication to some more general place
  if (error !== undefined) {
    console.error('Error while fetching self user:', error);
    loadingState.value = 'error';
  } else {
    user.value = data;
    loadingState.value = 'ready';
  }
}
loadSelfUser();
</script>

<style scoped lang="scss">
@use '../assets/styles/variables';

body {
  label.btn.btn-outline-secondary {
    opacity: 1;
    color: #000;
    transition: color variables.$dark-mode-transition-duration variables.$dark-mode-transition-type;
  }

  &[data-theme='dark'] {
    label.btn.btn-outline-secondary {
      color: #fff;
    }
  }
}
</style>
