import { NextFunction, Request, Response } from 'express';
import { Search } from '../interfaces/search.interface';
import SearchService from '../services/search.service';

class SearchController {
  public searchService = new SearchService();

  public getArtistByName = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const artistName = req.params.artist;
      const findOneUserData: Search[] = await this.searchService.findArtistByName(artistName);
      res.status(200).json({ data: findOneUserData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };
}

export default SearchController;
