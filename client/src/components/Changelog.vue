<script setup lang="ts">
import dayjs from 'dayjs';
import { computed } from 'vue';
import { DATETIME_FORMAT, DATE_FORMAT } from '../const/formats.const';
import TheSupportLabelModal from './modals/TheSupportLabelModal.vue';
import Icon from './Icon.vue';
import Markdown from 'vue3-markdown-it';

interface ChangelogProps {
  version: string;
  readme: string;
  releaseDate: Date | string;
  softwareName: string;
  downloadUrl?: string;
  lastUpdate: Date | string;
  preview?: boolean;
};

const {
  version,
  readme,
  releaseDate,
  softwareName,
  downloadUrl,
  lastUpdate,
  preview = false,
} = defineProps<ChangelogProps>();


const vReleaseDate = computed<Date|string>(() => preview ? new Date() : String(releaseDate));
const vLastUpdate = computed<Date|string>(() => preview ? new Date() : String(lastUpdate));
const fullReleaseDateStr = computed<string>(() => dayjs(vReleaseDate.value).format(DATETIME_FORMAT));
const releaseDateStr = computed<string>(() => dayjs(vReleaseDate.value).format(DATE_FORMAT));
const fullLastUpdateDateStr = computed<string>(() => dayjs(vLastUpdate.value).format(DATETIME_FORMAT));
const lastUpdateDateStr = computed<string>(() => dayjs(vLastUpdate.value).format(DATE_FORMAT));
</script>

<template>
  <div class="container">
    <section class="my-3">
      <h1>{{ softwareName }} v{{ version }}</h1>
      <div class="row">
        <div class="col-sm-8 my-3">
          <div class="card">
            <div class="card-body">
              <div class="card-text mod-readme">
                <markdown :source="readme" />
              </div>
              <p class="card-text">
                <small class="text-muted" :title="fullLastUpdateDateStr"
                  ><i class="far fa-clock me-1"></i> Changelog last updated on
                  {{ lastUpdateDateStr }}</small
                >
              </p>
            </div>
          </div>
        </div>
        <div class="col-sm-4 my-3">
          <ul class="list-group">
            <li class="list-group-item">
              <i class="fas fa-hashtag"></i> Version <b>{{ version }}</b>
            </li>
            <li class="list-group-item" :title="fullReleaseDateStr">
              <i class="fas fa-clock"></i> Released on
              <b>{{ releaseDateStr }}</b>
            </li>
            <li v-if="downloadUrl" class="list-group-item download">
              <i class="fas fa-arrow-alt-circle-down me-2"></i>
              <b>
                <a :href="preview ? '#preview' : downloadUrl">Download</a>
              </b>
            </li>
          </ul>
          <ul class="list-group my-4">
            <li class="list-group-item bg-success">
              <icon
                name="download"
                type="s"
                size="lg"
                class="me-2 text-white"
              />
              <b>
                <router-link
                  :to="{ name: 'download' }"
                  class="text-white stretched-link"
                  >Download launcher
                </router-link>
              </b>
            </li>
          </ul>
          <ul class="list-group my-4">
            <li class="list-group-item bg-primary">
              <icon
                name="question-circle"
                type="r"
                size="lg"
                class="me-2 text-white"
              />
              <b>
                <a
                  class="text-white stretched-link"
                  href="/discord"
                  :data-bs-toggle="preview ? '' : 'modal'"
                  :data-bs-target="preview ? '' : '#support-modal'"
                  >Need support?</a
                >
              </b>
            </li>
          </ul>
        </div>
      </div>
    </section>
    <the-support-label-modal />
  </div>
</template>
