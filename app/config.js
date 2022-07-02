/*
 * Create and export configuration variables
 *
 */

// Container for environments

var environments = {};

// staging (default) environment

environments.staging = {
  port: 3000,
  envName: "staging",
};

// Production environment

environments.production = {
  port: 5000,
  envName: "production",
};

// Determine which environment was passed as a command line argument.

var curentEnvironment =
  typeof process.env.NODE_ENV == "string"
    ? process.env.NODE_ENV.toLocaleLowerCase()
    : "";

// check that the current environment is one of the environments above, if not, default to staging.
var environmentToExport =
  typeof environments[curentEnvironment] == "object"
    ? environments[current]
    : environments.staging;

// EXport the module
module.exports = environmentToExport;
