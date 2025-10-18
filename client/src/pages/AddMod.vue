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
      <mod-details :mod="modPreview" :preview="true" />
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
import { useRouter } from 'vue-router';
import { ModCreateDto, ModDto } from '../../../shared/dto/ModDto';
import ApiProvidedForm from '../components/ApiProvidedForm.vue';
import Icon from '../components/Icon.vue';
import ConfirmModal from '../components/modals/ConfirmModal.vue';
import ModDetails from '../components/ModDetails.vue';
import { TOAST_FORM_INVALID } from '../const/toasts.const';
import { api } from '../modules/api';
import { toaster } from '../modules/toaster';
import { useSeoMeta } from '@unhead/vue';
import { useRouteLeaveConfirm } from '../compositions/useRouteLeaveConfirm';
import { computed, ref, watch } from 'vue';
import { slugify } from '../utils';
import _ from 'lodash';
import { CreateModData, listRaftVersions, RaftVersion } from '../api';
import { state } from '../store/store';

useSeoMeta({
  title: 'Add a mod',
});
const router = useRouter();
const routeLeaveConfirm = useRouteLeaveConfirm();

const loading = ref(false);
type AddModFormData = Partial<CreateModData["body"]> & {
  id?: string;
}
const mod = ref<AddModFormData>({});
const ready = ref(false);
const showErrors = ref(false);
const hasErrors = ref(false);

const modPreview = computed<ModDto>(() => ({
  createdAt: new Date(),
  updatedAt: new Date(),
  id: mod.value.id || '(missing slug)',
  title: mod.value.title || '(missing title)',
  description: mod.value.description || '(missing description)',
  readme: mod.value.readme || '(missing readme)',
  category: mod.value.category || '(???)',
  author: state.jwt!.username, // user must be logged in on this route
  bannerImageUrl: mod.value.bannerImageUrl,
  iconImageUrl: mod.value.iconImageUrl,
  repositoryUrl: mod.value.repositoryUrl,
  versions: [
    {
      id: -1,
      modId: mod.value.id || '(missing slug)',
      version: mod.value.version,
      changelog: 'This is the first version.',
      downloadUrl: '#',
      downloadCount: 9001,
      minRaftVersionId: mod.value.minRaftVersionId,
      maxRaftVersionId: mod.value.maxRaftVersionId,
      definiteMaxRaftVersion: mod.value.definiteMaxRaftVersion,
    }
  ],
  likes: 42
}));

watch(
  () => mod.value.title,
  (title) => {
    if (!ready.value) return;

    mod.value.id = title ? slugify(title) : '';
  },
);

function onChange(event: { data: AddModFormData; errors: any[] }) {
  if (!_.isEqual(event.data, mod.value)) {
    routeLeaveConfirm.hasUnsavedChanges.value = true;
  }

  mod.value = event.data;
  hasErrors.value = event.errors.length > 0;
}

async function onSubmit(): Promise<void> {
  if (!loading.value) {
    showErrors.value = true;

    if (!hasErrors.value) {
      loading.value = true;
      const newMod = await api.addMod(mod.value as ModDto);
      if (!!newMod) {
        routeLeaveConfirm.hasUnsavedChanges.value = false;
        await router.push({ name: 'mod', params: { id: newMod.id } });
        toaster.success(
          `Your new mod <b>"${newMod.title}"</b> has been created!`, // TODO: arbitrary HTML? Is this vulnerable to XSS?
        );
      }
      loading.value = false;
    }
  } else {
    if (hasErrors.value) {
      toaster.error(TOAST_FORM_INVALID);
    }
  }
}

async function loadFormData() {
  ready.value = false;

  const { data, error } = await listRaftVersions();
  if (error !== undefined) {
    throw new Error(); // TODO
  }

  const castedRaftVersion = data as RaftVersion[]; // TODO better typing
  mod.value.minRaftVersionId = castedRaftVersion[castedRaftVersion.length - 1].id;
  mod.value.maxRaftVersionId = castedRaftVersion[0].id; // TODO check if nonempty
  
  ready.value = true;
}
loadFormData();
</script>
