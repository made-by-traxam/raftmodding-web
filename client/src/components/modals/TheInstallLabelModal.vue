<template>
  <div
    class="modal fade"
    tabindex="-1"
    role="dialog"
    aria-labelledby="install-modal-label"
    aria-hidden="true"
    id="install-modal"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content border-0">
        <div class="modal-header border-bottom-0">
          <h4 class="modal-title" id="install-modal-label">
            Installation will begin shortly!
          </h4>
          <button
            class="btn-close"
            type="button"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <p>
            The Raft Mod Loader Launcher should open shortly and ask you whether
            to install this mod. If the Launcher does not open, make sure to
            install the latest version from our
            <router-link
              :to="{ name: 'download' }"
              aria-label="Close"
            >
              <span data-bs-dismiss="modal">downloads</span>
            </router-link>
            page.
          </p>
        </div>
        <div
          class="modal-footer border-top-0 pt-0 d-flex justify-content-between align-items-center"
        >
          <router-link
            :to="{ name: 'contact' }"
            class="btn btn-sm btn-outline-secondary"
            aria-label="Close"
          >
            <span data-bs-dismiss="modal"><i class="far fa-envelope me-2"></i> Contact us</span>
          </router-link>
          <a
            class="btn btn-primary border-0 px-3 py-2"
            href="/discord"
            target="_blank"
            style="background-color: #7289da"
            id="support-discord-link"
          >
            <span data-bs-dismiss="modal"><i class="fab fa-discord me-2"></i> Join our <b>Discord server</b></span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TheInstallLabelModal',
});
</script>
