//let config = {
//    local:{
//        mysql:{
//            url: process.env.DB_URL
//        },
//        apiKeys:{}
//    },
//    prod:{
//        mysql:{
//            url: process.env.JAWSDB_URL
//        },
//        apiKeys:{}
//    }
//};

//module.exports = config[process.env.APP_ENV || 'local'];

module.exports = {
    'development':{
        'host': process.env.DB_HOST,
        'username': process.env.DB_USER,
        'password': process.env.DB_PASSWORD,
        'database': process.env.DB_DATABASE,
        'port': process.env.DB_PORT
    },
    'production':{
        'use_ENV_variable': process.env.JAWSDB_URL
    }
}