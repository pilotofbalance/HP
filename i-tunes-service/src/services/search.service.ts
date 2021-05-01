import HttpException from '../exceptions/HttpException';
import { Search } from '../interfaces/search.interface';
import * as request from 'superagent';
import { logger } from '../utils/logger';
import { filterAlboms } from '../utils/util';

class SearchService {

  private ITUNES_URI = 'https://itunes.apple.com';

  public async findArtistByName(artistName: string): Promise<Search[]> {
    // make request to iTunes service
    const url = new URL(`${this.ITUNES_URI}/search?term=${artistName}&entity=album`);
    const { text } = await request.get(url.toString());
    // parse result
    const data = JSON.parse(text);
    logger.debug('findArtistByName response: ', data);
    if (data.resultCount === 0 ) {
      logger.error('Artist not found');
      throw new HttpException(409, 'Artist not found');
    }
    // eliminate duplicated results
    const result: Search[] = filterAlboms(data);
    return result;
  }
}

export default SearchService;
