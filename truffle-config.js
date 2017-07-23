module.exports = {
  migrations_directory: "./migrations",
  networks: {
    development: {
      host: "localhost",
      port: 8546,
      network_id: "*" // Match any network id
    },
    ropsten: {
      host: "localhost",
      port: 8545,
      gas: 4612388,
      network_id: "3"
    },
    //When "npm start build",  process.env.NODE_ENV == production
    production: {
      host: "localhost",
      port: 8545,
      gas: 4612388,
      network_id: "3"
    }
  }
};
