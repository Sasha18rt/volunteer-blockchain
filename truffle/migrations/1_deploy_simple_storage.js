const VolunteerEvents = artifacts.require("VolunteerEvents");

module.exports = function (deployer) {
  deployer.deploy(VolunteerEvents);
};
