//* ------------------------------------------------------- *//
//  ------------------- HTML TEMPLATING -------------------  //
<template>
  <div id="app">
    <CanvasManager />
    <router-view />
  </div>
</template>

<script lang="ts">
import CanvasManager from '@/components/CanvasManager.vue'

import { Component, Vue } from 'vue-property-decorator'
@Component({ components: { CanvasManager } })
export default class Home extends Vue {}
</script>

<style lang="scss">
@import './styles/styles.scss';
</style>
