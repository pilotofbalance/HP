import { shallowMount, mount } from "@vue/test-utils";
import App from "@/App.vue";
import FindArtist from "@/components/FindArtist.vue";
import { Album } from "@/interfaces/album.interface";
import fetchMock from "fetch-mock";
import flushPromises from "flush-promises";

describe("App.vue", () => {

  beforeAll(() => {
    fetchMock.get("/search/Michael", {data: [
      { id: 1, artist: "Michael", title: "Test", url: "http://test.com" },
    ]});
  });

  it("check filterByAlbum method filtrates source results", () => {
    const albums: Album[] = [
      {
        id: 1,
        artist: "test",
        title: "My test",
        url: "http://test.com",
      },
      {
        id: 2,
        artist: "test 2",
        title: "Something else",
        url: "http://test2.com",
      },
    ];
    const wrapper = shallowMount(App);
    wrapper.setData({ source: albums, albums });
    wrapper.vm.filterByAlbum("My test");
    expect(wrapper.vm.source.length).toBe(2);
    expect(wrapper.vm.albums.length).toBe(1);
  });

  it("check searchArtist method API request", async () => {
    const wrapper = shallowMount(App);
    wrapper.vm.searchArtist("Michael");
    await flushPromises();
    expect(wrapper.vm.source.length).toBe(1);
    expect(wrapper.vm.albums.length).toBe(1);
  });

  it("emit searchArtist method from FindArtist component", async () => {
    const wrapper = mount(App);
    wrapper.findComponent(FindArtist).vm.$emit('search-click', 'Michael');
    await flushPromises();
    expect(wrapper.vm.source.length).toBe(1);
    expect(wrapper.vm.albums.length).toBe(1);
  });  

  it("emit filterByAlbum method from FilterAlbums component", async () => {
    const wrapper = mount(App);
    wrapper.findComponent(FindArtist).vm.$emit('search-click', 'Michael');
    wrapper.findComponent(FindArtist).vm.$emit('filter-change', 'Test');
    await flushPromises();
    expect(wrapper.vm.source.length).toBe(1);
    expect(wrapper.vm.albums.length).toBe(1);
  }); 

  afterAll(() => {
    fetchMock.restore();
  });
});
