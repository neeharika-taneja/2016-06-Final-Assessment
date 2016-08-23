var Map = require('./mapModel.js');
    Q = require('q');
    util = require('../config/utils.js');


    var createMapKey = Q.nbind(Map.create, Map);
    var findLink = Q.nbind(Map.findOne, Map);

    module.exports = {
      saveLink: function (req, res, next) {
        console.log('saveLink: ', req.body)
        var keyword = req.body.keyword;
        findLink({searchKeyword: keyword})
          .then(function (match) {
            if (match) {
              res.send(match);
            } else {
              return keyword;
            }
          })
          .then(function (keyword) {
            if (keyword) {
              var newKeyword = {
                keyword: keyword,
                userid: req.session.user
              };
              return createMapKey(newKeyword);
            }
          })
          .then(function (createMapKey) {
            if (createMapKey) {
              res.json(createMapKey);
            }
          })
          .fail(function (error) {
            next(error);
          });
      }
}
