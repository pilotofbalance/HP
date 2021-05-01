import { Router } from 'express';
import SearchController from '../controllers/search.controller';
import { CreateSearchDto } from '../dtos/search.dto';
import Route from '../interfaces/routes.interface';
import validationMiddleware from '../middlewares/validation.middleware';

class SearchRoute implements Route {
  public path = '/search';
  public router = Router();
  public searchController = new SearchController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:artist`, validationMiddleware(CreateSearchDto, 'params'), this.searchController.getArtistByName);
  }
}

export default SearchRoute;
