'use strict';

const req = require('superagent');
  

module.exports = function(context, cb) {
  let limit = +context.data.limit || 5; // default
  limit = Math.min(limit, 50); // don't get greedy
  
  req.get(context.secrets.cars_api)
    .query({ filter: { 
      where: { type: context.data.type || 'pickup' }, 
      limit, 
      fields: ['url', 'images', 'content']
    }})
    .set('X-API-Key', context.secrets.api_key)
    .set('accept', 'application/json')
    .end((err, res) => {
      cb(null, { cars: JSON.parse(res.text) });
    });
};

