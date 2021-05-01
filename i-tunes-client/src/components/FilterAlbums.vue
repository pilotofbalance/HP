<template>
  <div class="add-form">
    <div class="form-control">
    <label>Search Albums</label>
    <input placeholder="Input Albom Name" @input="this.$emit('filter-change', album)" v-model.trim="album"/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "FilterAlbums",
  data() {
    return {
      album: ""
    };
  }
});
</script>
