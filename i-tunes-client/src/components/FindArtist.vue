<template>
  <div class="add-form">
    <div class="form-control">
      <label>Artist Name</label>
      <input placeholder="Input Artist Name" type="text" v-model.trim="artist" />
    </div>
    <button class="btn btn-block" @click="this.$emit('search-click', artist)">
      Search
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "FindArtist",
  data() {
    return {
      artist: ""
    };
  }
});
</script>
