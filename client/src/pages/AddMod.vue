<template>
  <div class="container">
    <section class="my-5 mx-1 with-json-forms">
      <div class="card mb-3">
        <div class="card-body">
          <h5 class="card-title">Add a Mod</h5>
          <form class="form" @submit.prevent="onSubmit" novalidate>
            <api-provided-form
              v-if="ready"
              :data="mod"
              form-name="addMod"
              :show-errors="showErrors"
              @change="onChange"
            />
            <hr />
            <div
              class="action-row row d-flex flex-md-row flex-column align-items-sm-strech"
            >
              <button
                type="submit"
                class="btn btn-success submit-button m-2"
                :disabled="loading"
                :class="{ disabled: loading }"
              >
                <icon v-if="!loading" name="paper-plane" />
                <div
                  v-else
                  class="spinner-grow spinner-grow-sm mx-1"
                  role="status"
                >
                  <span class="sr-only">Loading...</span>
                </div>
                Submit mod
              </button>
              <button
                type="button"
                class="btn btn-outline-primary m-2"
                :disabled="loading"
                :class="{ disabled: loading }"
                data-bs-toggle="collapse"
                data-bs-target="#preview"
                aria-expanded="false"
                aria-controls="preview"
              >
                <icon name="eye" />
                show preview
              </button>
              <router-link
                :to="{ name: 'home' }"
                class="btn btn-outline-danger m-2"
                :class="{ disabled: loading }"
                :disabled="loading"
              >
                <icon name="times" />
                Cancel
              </router-link>
            </div>
          </form>
        </div>
      </div>
      <ul>
        <li>
          Just want to find some existing mods?
          <router-link :to="{ name: 'mods' }">Browse the directory</router-link>
        </li>
      </ul>
    </section>
    <section class="collapse my-3 mx-1" id="preview">
      <mod-details :mod="mod" :preview="true" />
    </section>
  </div>
  <confirm-modal
    v-if="showModal"
    title="Are you sure you want to leave?"
    message="You have unsaved Changes"
    btn-confirm="Yes"
    btn-cancel="No"
    @confirm="onRouteLeaveConfirm"
    @cancel="onRouteLeaveCancel"
  />
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ModDto } from '../../../shared/dto/ModDto';
import ApiProvidedForm from '../components/ApiProvidedForm.vue';
import Icon from '../components/Icon.vue';
import ConfirmModal from '../components/modals/ConfirmModal.vue';
import ModDetails from '../components/ModDetails.vue';
import { useModEditing } from '../compositions/useModEditing';
import { TOAST_FORM_INVALID } from '../const/toasts.const';
import { api } from '../modules/api';
import { toaster } from '../modules/toaster';
import { useSeoMeta } from '@unhead/vue';

useSeoMeta({
  title: 'Add a mod',
});
const router = useRouter();

const {
  answer,
  errorCount,
  errors,
  hasUnsavedChanges,
  loading,
  mod,
  onChange,
  onRouteLeaveCancel,
  onRouteLeaveConfirm,
  ready,
  showErrors,
  showModal
} = useModEditing(true);

async function onSubmit(): Promise<void> {
  if (!loading.value) {
    showErrors.value = true;

    if (errorCount.value <= 0) {
      loading.value = true;
      const newMod = await api.addMod(mod.value as ModDto);
      if (!!newMod) {
        hasUnsavedChanges.value = false;
        await router.push({ name: 'mod', params: { id: newMod.id } });
        toaster.success(
          `Your new mod <b>"${newMod.title}"</b> has been created!`, // TODO: arbitrary HTML? Is this vulnerable to XSS?
        );
      }
      loading.value = false;
    }
  } else {
    if (errorCount.value > 0) {
      toaster.error(TOAST_FORM_INVALID);
    }
  }
}
</script>
