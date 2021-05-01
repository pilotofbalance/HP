<template>
  <div class="gallery">
    <div :key="album.title" v-for="album in albums" class="card">
      <img :src="album.url" />
      <div class="info">
        <h4>{{ album.title }}</h4>
        <small><b>Artist:</b> {{ album.artist }}</small>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Albums",
  props: {
    albums: Array,
  },
});
</script>

<style scoped>
.gallery {
  display: flex;
  flex-wrap: wrap;
}

.card {
  display: flex;
  flex-direction: row;
  flex: 25%;
  padding: 5px 5px;
  margin: 5px;
  background-color: rgb(231, 233, 235);
  height: 8rem;
}

.class {
  display: flex;
  flex-direction: column;
}

img {
  max-height: 100%;
  object-fit: cover;
  vertical-align: bottom;
  margin-right: 5px;
}
</style>
