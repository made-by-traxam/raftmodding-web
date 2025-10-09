<script setup lang="ts">
import TheSupportLabelModal from './modals/TheSupportLabelModal.vue';
import Icon from './Icon.vue';

interface ChangelogPlaceholderProps {
  withDownload?: boolean
}

const { withDownload = true } = defineProps<ChangelogPlaceholderProps>();
</script>

<template>
  <div class="container">
    <section class="my-3">
      <h1>Loading RML version...</h1>
      <div class="row placeholder-glow">
        <div class="col-sm-8 my-3">
          <div class="card">
            <div class="card-body">
              <div class="card-text mod-readme">
                <p>
                    <span class="placeholder col-7"></span>{{' '}}
                    <span class="placeholder col-4"></span>{{' '}}
                    <span class="placeholder col-3"></span>{{' '}}
                    <span class="placeholder col-7"></span>{{' '}}
                    <span class="placeholder col-2"></span>{{' '}}
                    <span class="placeholder col-2"></span>{{' '}}
                    <span class="placeholder col-7"></span>{{' '}}
                    <span class="placeholder col-11"></span>{{' '}}
                    <span class="placeholder col-6"></span>{{' '}}
                    <span class="placeholder col-3"></span>{{' '}}
                    <span class="placeholder col-2"></span>
                </p>
              </div>
              <p class="card-text">
                <small class="text-muted" ><i class="far fa-clock me-1"></i><span class="placeholder col-4"></span></small>
              </p>
            </div>
          </div>
        </div>
        <div class="col-sm-4 my-3">
          <ul class="list-group">
            <li class="list-group-item">
              <icon name="hashtag"/>
              <span class="placeholder col-7"></span>
            </li>
            <li class="list-group-item">
              <icon name="clock" />
              <span class="placeholder col-5"></span>
            </li>
            <li v-if="withDownload" class="list-group-item download">
              <icon name="arrow-alt-circle-down" />
              <span class="placeholder col-6"></span>
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
                  data-bs-toggle="modal"
                  data-bs-target="#support-modal"
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
