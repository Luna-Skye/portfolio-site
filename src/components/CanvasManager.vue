//* ------------------------------------------------------- *//
//  ------------------- HTML TEMPLATING -------------------  //
<template>
<div id="canvas-manager"></div>
</template>

//* ------------------------------------------------------- *//
//  --------------------- VUE SCRIPT ----------------------  //
<script lang="ts">
import P5 from 'p5'
import { getEvent, EventObject } from '@/utils/eventHandler'

import { Component, Vue } from 'vue-property-decorator'
@Component({})
export default class Home extends Vue {
  // ------------------------------------------------------ *//
  // P5 Canvas List
  p5Canvas: P5[] = []

  // ------------------------------------------------------ *//
  // COMPUTED | Get EventObject
  get event (): EventObject { return getEvent() }

  // ------------------------------------------------------ *//
  // LIFECYCLE | Created
  created () {
    // Create P5 Canvases
    for (const i in getEvent().p5) this.p5Canvas.push(new P5(getEvent().p5[i]))
  }

  // LIFECYCLE | Destroyed
  beforeDestroy () {
    // Remove All P5 Canvases
    for (const i in this.p5Canvas) this.p5Canvas[i].remove()
  }
}
</script>
