//* ------------------------------------------------------- *//
//  ------------------- HTML TEMPLATING -------------------  //
<template>
  <div id="home" class="view acrylic" @mousemove="calculateParallax">
    <!-- LOGO HEADER -->
    <div id="header" class="no-select">
      <img
        src="@/assets/logo.svg"
        alt="Sepshun Logo"
        :style="{
          marginLeft: `${parallaxX / 60}px`,
          marginTop: `${parallaxY / 60}px`
        }"
      >
    </div>

    <!-- TEXT -->
    <div class="grid fit-v">
      <div class="position-relative grid-align-v-center grid-align-h-center">
        <p
          class="text-h2 col-black no-select --overlay"
          :style="{
            top: `${parallaxY / 60}px`,
            left: `${parallaxX / 60}px`
          }"
        >{{ eventName === 'CHRISTMAS' ? 'MERRY CHRISTMAS' : 'SEPSHUN' }}</p>
        <p
          class="text-h2 col-white no-select --overlay"
          :style="{
            top: `${parallaxY / 40}px`,
            left: `${parallaxX / 40}px`
          }"
        >{{
          eventName === 'CHRISTMAS' ? 'MERRY CHRISTMAS' : 'SOMEDAY'
        }}</p>
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

//* ------------------------------------------------------- *//
//  --------------------- VUE SCRIPT ----------------------  //
<script lang="ts">
import P5 from 'p5'
import { getEventName, getEventP5 } from '@/utils/eventHandler'

import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class Home extends Vue {
  // Parallax Offsets
  parallaxX = 0
  parallaxY = 0
  calculateParallax (event: MouseEvent) {
    this.parallaxX = (event.clientX - (document.body.clientWidth) / 2)
    this.parallaxY = (event.clientY - (document.body.clientHeight) / 2)
  }

  // Get EventName
  get eventName (): string {
    return getEventName()
  }

  // On Component Created
  created () {
    const canvas = new P5(getEventP5()) // Create P5 Canvas
  }
}
</script>

//* ------------------------------------------------------- *//
//  -------------------- SCSS STYLING ---------------------  //
<style lang="scss">
@import '../styles/styles.scss';

#header {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  img { width: 256px; }
}

.--overlay {
  margin: 0;
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(-50%, -50%);
  text-align: center;
  width: 320px;
}

#social {
  position: absolute;
  bottom: 32px;
  left: 50%;
  transform: translate(-50%, 0);

  #icon-list {
    margin: auto;
    display: grid;
    grid-template-columns: repeat(4, 53px);
    grid-gap: 32px;
  }
}
</style>
