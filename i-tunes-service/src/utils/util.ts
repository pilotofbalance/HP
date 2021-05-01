import { Search } from "../interfaces/search.interface";

export const filterAlboms = (data: any): Search[] => {
  const mappedData: Search = data.results.reduce((acc, item) => {
    const {collectionName: title, artistName: artist, artworkUrl100: url, artistId: id} = item;
    acc[title] = {id, artist, url, title};
    return acc;
  },{});
  return Object.values(mappedData);
};
