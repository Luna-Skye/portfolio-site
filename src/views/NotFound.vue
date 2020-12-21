<template>
  <div id="not-found" class="view acrylic" @mousemove="mouseParallax.calc">
    <!-- LOGO HEADER -->
    <div id="header" class="no-select">
      <img
        src="@/assets/logo.svg"
        alt="Sepshun Logo"
        :style="{
          marginTop: `${mouseParallax.y / 60}px`,
          marginLeft: `${mouseParallax.x / 60}px`
        }"
      >
    </div>

    <!-- TEXT -->
    <div class="grid fit-v">
      <div class="position-relative grid-align-v-center grid-align-h-center">
        <p
          class="text-h2 col-black no-select --overlay"
          :style="{
            top: `${mouseParallax.y / 60}px`,
            left: `${mouseParallax.x / 60}px`
          }"
        >UH OH</p>
        <p
          class="text-h2 col-white no-select --overlay"
          :style="{
            top: `${mouseParallax.y / 40}px`,
            left: `${mouseParallax.x / 40}px`
          }"
        >PAGE NOT FOUND</p>
      </div>
    </div>

    <!-- SOCIAL LINKS -->
    <div id="social" class="no-select">
      <!-- HEADER TITLE -->
      <p class="text-panelheader text-center col-midgray">In the Meantime</p>
      <!-- LINK LIST -->
      <div id="icon-list">
        <a class="icon" target="_blank" href="https://twitter.com/SepshunOfficial">
          <img src="@/assets/mdi_twitter.svg" alt="Twitter Logo">
        </a>

        <a class="icon" target="_blank" href="https://open.spotify.com/artist/7MKfDpwEb7kBWTF7ZN2cIg?si=yXaePJkRSGqgAkrzDzaB3g">
          <img src="@/assets/mdi_spotify.svg" alt="Spotify Logo">
        </a>

        <a class="icon" target="_blank" href="https://github.com/Sepshun">
          <img src="@/assets/mdi_github.svg" alt="GitHub Logo">
        </a>

        <a class="icon" target="_blank" href="https://codepen.io/Sepshun">
          <img src="@/assets/mdi_codepen.svg" alt="Codepen Logo">
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { MouseParallax } from '@/utils/parallax'

import { Component, Vue } from 'vue-property-decorator'
@Component({})
export default class NotFound extends Vue {
  mouseParallax = new MouseParallax()
}
</script>
