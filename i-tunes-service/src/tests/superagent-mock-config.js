module.exports = [
  {
    pattern: 'https://itunes.apple.com(.*)',
    fixtures: function (match, params, headers, context) {
      if (match[1] === '/search?term=Michael&entity=album') {
        return JSON.stringify({
          resultCount: 1,
          results: [{ collectionName: 'Number Ones', artistName: 'Michael Jackson', artworkUrl100: 'http://example.com', artistId: 111 }],
        });
      } else {
        return JSON.stringify({
          resultCount: 0,
          results: [],
        });
      }
    },
    get: function (match, data) {
      return {
        text: data,
      };
    },
  },
];
