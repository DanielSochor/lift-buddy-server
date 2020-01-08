let config = {
   development:{
       mysql:{
           url: process.env.DB_URL
       },
       apiKeys:{}
   },
   prod:{
       mysql:{
           url: process.env.JAWSDB_URL
       },
       apiKeys:{}
   }
};

module.exports = config[process.env.APP_ENV || 'development'];

// let config = {
// // module.exports = {
//     'development': {
//         'host': process.env.DB_HOST,
//         'username': process.env.DB_USER,
//         'password': process.env.DB_PASSWORD,
//         'database': process.env.DB_DATABASE,
//         'port': process.env.DB_PORT,
//         'DB_URL': 'mysql://root:root@127.0.0.1:8889/lift_buddy'
//     },
//     'production': {
//         'use_ENV_variable': process.env.JAWSDB_URL
//     },
//     'local': {
//         mysql: {
//             url: process.env.DB_URL
//         },
//         apiKeys: {}
//     },
// }

// module.exports = config

