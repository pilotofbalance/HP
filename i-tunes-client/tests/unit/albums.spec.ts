import { shallowMount } from "@vue/test-utils";
import Albums from "@/components/Albums.vue";
import { Album } from "@/interfaces/album.interface";

describe("Albums.vue", () => {
  it("renders props.albums when passed", () => {
    const albums: Album[] = [];
    const wrapper = shallowMount(Albums, {
      props: { albums },
    });
    expect(wrapper.props().albums.length).toBe(0);
  });
});
