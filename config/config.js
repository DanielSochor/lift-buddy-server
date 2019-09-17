let config = {
    local:{
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

module.exports = config[process.env.NODE_ENV || 'local'];