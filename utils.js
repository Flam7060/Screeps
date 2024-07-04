const { find } = require("lodash");

const bodyPartCosts = {
  'move': 50,
  'work': 100,
  'carry': 50,
  'attack': 80,
  'ranger_attack': 150,
  'heal': 250,
  'tough': 10,
  'claim': 600,
};

function getTotalEnergyInRoom(room) {
  var structures = room.find(FIND_MY_STRUCTURES, {
    filter: (structure) =>
      structure.structureType == STRUCTURE_SPAWN ||
      structure.structureType == STRUCTURE_EXTENSION ||
      structure.structureType == STRUCTURE_CONTAINER ||
      structure.structureType == STRUCTURE_STORAGE,
  });

  var totalEnergy = structures.reduce((sum, structure) => {
    return sum + structure.store.getUsedCapacity(RESOURCE_ENERGY);
  }, 0);

  return totalEnergy;
}

function calculateCreepCost(body) {
  var cost = 0;
  for (var i = 0; i < body.length; i++) {
    cost += bodyPartCosts[body[i]];
  }
  return cost;
}

module.exports = {
  getTotalEnergyInRoom,
  calculateCreepCost,
};
