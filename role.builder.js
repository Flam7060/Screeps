var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if (creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            // creep.say('🔄 harvest');
        }
        if (!creep.memory.building && creep.store.getFreeCapacity() == 0) {
            creep.memory.building = true;
            // creep.say('🚧 build');
        }

        if (creep.memory.building) {
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if (targets.length) {
                if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}, reusePath: 3});
                }
            } else {
                // If no construction sites, switch to supplying spawn/extensions
                var targetsToSupply = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_EXTENSION) &&
                                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
                });

                if (targetsToSupply.length > 0) {
                    if (creep.transfer(targetsToSupply[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targetsToSupply[0], {visualizePathStyle: {stroke: '#ffffff'}, reusePath: 3});
                    }
                } else {
                    // If no targets to supply, switch to harvesting mode
                    creep.memory.building = false;
                    creep.say('🔄 harvest');
                }
            }
        } else {
            // Check for dropped energy
            var droppedEnergy = creep.room.find(FIND_DROPPED_RESOURCES, {
                filter: (resource) => resource.resourceType == RESOURCE_ENERGY
            });

            if (droppedEnergy.length > 0) {
                if (creep.pickup(droppedEnergy[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(droppedEnergy[0], {visualizePathStyle: {stroke: '#ffaa00'}, reusePath: 3});
                }
            } else {
                // Check for ruins with energy
                var ruins = creep.room.find(FIND_RUINS, {
                    filter: (ruin) => ruin.store.getUsedCapacity(RESOURCE_ENERGY) > 0
                });

                if (ruins.length > 0) {
                    if (creep.withdraw(ruins[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(ruins[0], {visualizePathStyle: {stroke: '#ffaa00'}, reusePath: 3});
                    }
                } else {
                    // Check for tombstones with energy
                    var tombstones = creep.room.find(FIND_TOMBSTONES, {
                        filter: (tombstone) => tombstone.store.getUsedCapacity(RESOURCE_ENERGY) > 0
                    });

                    if (tombstones.length > 0) {
                        if (creep.withdraw(tombstones[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(tombstones[0], {visualizePathStyle: {stroke: '#ffaa00'}, reusePath: 3});
                        }
                    } else {
                        // If no containers with energy, harvest from sources
                        var containers = creep.room.find(FIND_STRUCTURES, {
                            filter: (structure) => {
                                return (structure.structureType == STRUCTURE_CONTAINER || 
                                        structure.structureType == STRUCTURE_STORAGE) &&
                                        structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0;
                            }
                        });

                        if (containers.length > 0) {
                            if (creep.withdraw(containers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(containers[0], {visualizePathStyle: {stroke: '#ffaa00'}, reusePath: 3});
                            }
                        } else {
                            // // If no containers with energy, harvest from sources
                            // var sources = creep.room.find(FIND_SOURCES);
                            // if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                            //     creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                            creep.moveTo(42,29)
                        }
                    }
                }
            }
        }
    }
};

module.exports = roleBuilder;
