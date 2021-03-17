require('dotenv').config();

module.exports = {
	development: {
		username: process.env.DB_USER,
		password: process.env.DB_PASS,
		database: process.env.DB_NAME,
		host: process.env.DB_HOST,
		dialect: process.env.DB_DRIVER,
		pool: {
			max: parseInt(process.env.POOL_MAX),
	    min: parseInt(process.env.POOL_MIN),
	    acquire: parseInt(process.env.POOL_IDLE),
	    idle: parseInt(process.env.POOL_ACQUIRE)
		}
	},
	test: {
		username: process.env.DB_USER,
		password: process.env.DB_PASS,
		database: process.env.DB_NAME,
		host: process.env.DB_HOST,
		dialect: process.env.DB_DRIVER,
		pool: {
			max: parseInt(process.env.POOL_MAX),
	    min: parseInt(process.env.POOL_MIN),
	    acquire: parseInt(process.env.POOL_IDLE),
	    idle: parseInt(process.env.POOL_ACQUIRE)
		}
	},
	poduction: {
		username: process.env.DB_USER,
		password: process.env.DB_PASS,
		database: process.env.DB_NAME,
		host: process.env.DB_HOST,
		dialect: process.env.DB_DRIVER,
		pool: {
			max: parseInt(process.env.POOL_MAX),
	    min: parseInt(process.env.POOL_MIN),
	    acquire: parseInt(process.env.POOL_IDLE),
	    idle: parseInt(process.env.POOL_ACQUIRE)
		}
	}
}
