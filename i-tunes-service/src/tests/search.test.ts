import supertest from 'supertest';
import request from 'superagent';
import App from '../app';
import SearchRoute from '../routes/search.route';
import { filterAlboms } from '../utils/util';
import config from './superagent-mock-config';

let superagentMock;

beforeAll(async () => {
  superagentMock = require('superagent-mock')(request, config);
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

afterAll(async () => {
  superagentMock.unset();
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Search', () => {
  describe('[GET] /search/:artist', () => {
    it('response statusCode 200 / findOne', async () => {
      const artist = 'Michael';
      const usersRoute = new SearchRoute();
      const app = new App([usersRoute]);
      return supertest(app.getServer())
        .get(`${usersRoute.path}/${artist}`)
        .expect(200, {
          data: [{
            id: 111,
            artist: 'Michael Jackson',
            url: 'http://example.com',
            title: 'Number Ones',
          }],
          message: 'findOne',
        });
    });

    it('response statusCode 409 / Artist not found', async () => {
      const artist = 'John';
      const usersRoute = new SearchRoute();
      const app = new App([usersRoute]);
      return supertest(app.getServer())
        .get(`${usersRoute.path}/${artist}`)
        .expect(409, {message:'Artist not found'});
    });
  });

  describe('utils filter duplicated alboms', () => {
    it('returns eliminated results', () => {
      const data = {
        resultCount: 6,
        results: [
          { collectionName: 'test1', artistName: 'ploni 1', artworkUrl100: 'http://example.com', artistId: 111 },
          { collectionName: 'test2', artistName: 'ploni 2', artworkUrl100: 'http://example.com', artistId: 222 },
          { collectionName: 'test1', artistName: 'ploni 1', artworkUrl100: 'http://example.com', artistId: 111 },
          { collectionName: 'test1', artistName: 'ploni 1', artworkUrl100: 'http://example.com', artistId: 111 },
          { collectionName: 'test2', artistName: 'ploni 2', artworkUrl100: 'http://example.com', artistId: 222 },
          { collectionName: 'test3', artistName: 'ploni 3', artworkUrl100: 'http://example.com', artistId: 333 },
        ],
      };
      const result = filterAlboms(data);
      return expect(result.length).toBe(3);
    });
  });
});
