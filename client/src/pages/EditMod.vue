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
    v-if="routeLeaveConfirm.showModal.value"
    title="Are you sure you want to leave?"
    message="You have unsaved Changes"
    btn-confirm="Yes"
    btn-cancel="No"
    @confirm="routeLeaveConfirm.onRouteLeaveConfirm"
    @cancel="routeLeaveConfirm.onRouteLeaveCancel"
  />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

import { api } from '../modules/api';
import { toaster } from '../modules/toaster';

import ApiProvidedForm from '../components/ApiProvidedForm.vue';
import Icon from '../components/Icon.vue';
import ConfirmModal from '../components/modals/ConfirmModal.vue';
import ModDangerZone from '../components/ModDangerZoner.vue';
import ModDetails from '../components/ModDetails.vue';
import { useSeoMeta } from '@unhead/vue';
import { useRoute, useRouter } from 'vue-router';
import { useRouteLeaveConfirm } from '../compositions/useRouteLeaveConfirm';
import _ from 'lodash';
import { getMod, UpdateModData } from '../api';
import { ModDto } from '../../../shared/dto/ModDto';

const router = useRouter();
const modId = useRoute().params.id as string; // routing ensures this value is present

type EditModFormData = Partial<ModDto> & { id: string; };
const mod = ref<EditModFormData>({
  id: modId,
});

const loading = ref(false);
const showErrors = ref(false);
const ready = ref(false);
const hasErrors = ref(false);

const routeLeaveConfirm = useRouteLeaveConfirm();
const meta = useSeoMeta({
  title: `Edit ${mod.value.title}`,
});

watch(
  () => mod.value.title,
  (title) => {
    meta.patch({ title: `Edit ${title}` });
  },
);

function onChange(event: { data: EditModFormData; errors: any[] }) {
  if (!_.isEqual(event.data, mod.value)) {
    routeLeaveConfirm.hasUnsavedChanges.value = true;
  }

  mod.value = event.data;
  hasErrors.value = event.errors.length > 0;
}

async function onSubmit() {
  if (!loading.value) {
    loading.value = true;
    showErrors.value = true;
    delete mod.value.versions;
    const updatedMod = await api.updateMod(mod.value);
    if (!!updatedMod) {
      routeLeaveConfirm.hasUnsavedChanges.value = false;
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

async function loadFormData() {
  ready.value = false;

  const { data, error } = await getMod({ path: { id: modId } });
  if (error !== undefined) {
    throw new Error(); // TODO
  }
  mod.value = data as EditModFormData; // TODO better typing

  ready.value = true;
}
loadFormData();
</script>
