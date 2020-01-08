const quiz = artifacts.require("quiz");

module.exports = function(deployer) {
  deployer.deploy(quiz);
};
