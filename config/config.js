var config = {};

config.db = {};

config.db.url = process.env.CONNECTIONSTRING || 'mongodb://localhost/pas-trop-dinfos';


module.exports = config;
