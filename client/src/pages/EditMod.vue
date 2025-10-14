<template>
  <div class="container">
    <section class="my-5 mx-1 with-json-forms">
      <div class="card mb-3">
        <div class="card-body">
          <h5 class="card-title">Edit mod "{{ mod.title }}"</h5>
          <form class="form" @submit.prevent="onSubmit" novalidate>
            <api-provided-form
              v-if="ready"
              :data="mod"
              form-name="editMod"
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
                Submit changes
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
              <button
                class="btn btn-outline-danger m-2"
                :class="{ disabled: loading }"
                :disabled="loading"
                @click.prevent="$router.go(-1)"
              >
                <icon name="times" />
                Discard changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
    <section class="collapse my-3 mx-1" id="preview">
      <mod-details :mod="mod" :preview="true" />
    </section>
    <section class="my-5 mx-1">
      <mod-danger-zone :mod="mod" />
      <ul>
        <li>
          You can edit the changelogs of this mod on it's
          <router-link :to="{ name: 'modVersions', params: { id: mod.id } }">
            versions page
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'mod', params: { id: mod.id } }"
            >Go back to the mod's page
          </router-link>
        </li>
        <li>
          Want to publish an update for this mod?
          <router-link :to="{ name: 'addModVersion', params: { id: mod.id } }">
            Add a new version
          </router-link>
        </li>
      </ul>
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
import { watch } from 'vue';

import { useModEditing } from '../compositions/useModEditing';
import { api } from '../modules/api';
import { toaster } from '../modules/toaster';

import ApiProvidedForm from '../components/ApiProvidedForm.vue';
import Icon from '../components/Icon.vue';
import ConfirmModal from '../components/modals/ConfirmModal.vue';
import ModDangerZone from '../components/ModDangerZoner.vue';
import ModDetails from '../components/ModDetails.vue';
import { useSeoMeta } from '@unhead/vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const modEditingProps = useModEditing();
const {
  mod,
  loading,
  showErrors,
  hasUnsavedChanges,
  showModal,
  onRouteLeaveCancel,
  onRouteLeaveConfirm,
  ready,
  onChange
} = modEditingProps;
const meta = useSeoMeta({
  title: `Edit ${mod.value.title}`,
});

watch(
  () => mod.value.title,
  (title) => {
    meta.patch({ title: `Edit ${title}` });
  },
);

async function onSubmit() {
  if (!loading.value) {
    loading.value = true;
    showErrors.value = true;
    delete mod.value.versions;
    const updatedMod = await api.updateMod(mod.value);
    if (!!updatedMod) {
      hasUnsavedChanges.value = false;
      await router.push({
        name: 'mod',
        params: { id: updatedMod.id },
      });
      toaster.success(
        `Your mod <b>"${updatedMod.title}"</b> has been updated!`,
      );
    }
    loading.value = false;
  }
}
</script>
