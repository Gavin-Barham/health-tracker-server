module.exports = {
  development: {
    url: "postgres://gnbprwhdcafhoc:defbfc60046b86f46e4b01718fd30d1b1fa648c34bf60badfb3ea274b5063e55@ec2-34-226-11-94.compute-1.amazonaws.com:5432/dfsq1hc4lc6mst",
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false
      }
    }
  },
  test: {
    url: "127.0.0.1",
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false
      }
    }
  },
  production: {
    host: process.env.DATABASE_URL,
    dialect: "postgres"
  }
}
