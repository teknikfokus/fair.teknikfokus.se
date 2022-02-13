<template>
  <div v-if="src" class="video-container">
    <iframe width="560" height="315" :src="src" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  </div>
</template>

<script>
export default {
  name:"youtubeiFrame",
  props: {
    src: String,
  }
}
</script>

<style>
.video-container { 
  position: relative; 
  padding-bottom: 56.25%; 
  padding-top: 0; 
  height: 0; 
  overflow: hidden; 
}

.video-container iframe, .video-container object, .video-container embed { 
  position: absolute; 
  top: 0; 
  left: 0; 
  width: 100%; 
  height: 100%; 
  }
</style>