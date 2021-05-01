<template>
  <div class="container">
    <FindArtist @search-click="searchArtist"/>
    <FilterAlbums @filter-change="filterByAlbum"/>
    <Albums :albums="albums"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FindArtist from "./components/FindArtist.vue";
import FilterAlbums from "./components/FilterAlbums.vue";
import Albums from "./components/Albums.vue";
import { Album } from "./interfaces/album.interface";

export default defineComponent({
  name: "App",
  components: {
    FindArtist,
    FilterAlbums,
    Albums,
  },
  methods: {
    async searchArtist(artist: string) {
      const res = await fetch(`${process.env.VUE_APP_SERVICE}/search/${artist}`);
      const { data } = await res.json();
      this.source = data;
      this.albums = data;
    },
    filterByAlbum(search: string) {
      this.albums = this.source.filter(album => album.title.toLowerCase().includes(search.toLowerCase()));
    }
  },
  data(): {source: Album[], albums: Album[]} {
    return {
      source: [],
      albums: [],
    }
  },
});
</script>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400&display=swap");
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  body {
    font-family: "Poppins", sans-serif;
  }
  .container {
    max-width: 90%; 
    margin: 30px auto;
    overflow: auto;
    border: 1px solid steelblue;
    padding: 30px;
    border-radius: 5px;
  }
  .btn {
    display: inline-block;
    background: #000;
    color: #fff;
    border: none;
    padding: 10px 20px;
    margin: 5px;
    border-radius: 5px;
    cursor: pointer;
    text-decoration: none;
    font-size: 15px;
    font-family: inherit;
  }
  .btn:focus {
    outline: none;
  }
  .btn:active {
    transform: scale(0.98);
  }
  .btn-block {
    display: block;
    width: 100%;
  }
  .add-form {
    margin-bottom: 10px;
    width: 20rem;
  }
  .form-control {
    margin: 20px 0;
  }
  .form-control label {
    display: block;
  }
  .form-control input {
    width: 100%;
    height: 40px;
    margin: 5px;
    padding: 3px 7px;
    font-size: 17px;
  }
</style>
