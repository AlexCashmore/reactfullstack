require("dotenv-flow").config({
    node_env: "test",
    silent: true,
    purge_dotenv: true,
});
require("babel-register");
require("babel-polyfill");