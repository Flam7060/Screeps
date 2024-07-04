var roleHarvester = {
    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.store.getFreeCapacity() > 0) {
            // Ищем руины с энергией
            var ruinsWithEnergy = creep.room.find(FIND_RUINS, {
                filter: (ruin) => ruin.store.getUsedCapacity(RESOURCE_ENERGY) > 0
            });
            
            if (ruinsWithEnergy.length > 0) {
                creep.say('🔄 Looting Ruin');
                if (creep.withdraw(ruinsWithEnergy[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(ruinsWithEnergy[0], {visualizePathStyle: {stroke: '#ffaa00'}, reusePath: 3});
                }
            } else {
                // Если нет руин с энергией, ищем ближайший источник энергии
                // creep.say('🔄 Harvesting');
                var sources = creep.room.find(FIND_SOURCES);
                if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}, reusePath: 3});
                }
            }
        } else {
            // Проверяем наличие строительных площадок в комнате
            var constructionSites = creep.room.find(FIND_CONSTRUCTION_SITES);

            if (constructionSites.length > 0) {
                // Если есть строительные площадки, крипы направляются к спавну или экстеншенам для передачи энергии
                var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_EXTENSION) &&
                               structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
                });

                if (targets.length > 0) {
                    if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}, reusePath: 3});
                    }
                } else {
                    var containers = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_CONTAINER || 
                                    structure.structureType == STRUCTURE_STORAGE) &&
                                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                        }
                    });
                    if (containers.length > 0) {
                        if (creep.transfer(containers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(containers[0], {visualizePathStyle: {stroke: '#ffaa00'}, reusePath: 3});
                        }
                    } else {
                        creep.moveTo(40, 33); // Действие по умолчанию, если нет контейнеров с энергией
                    }
                }
            } else {
                // Если нет строительных площадок, крипы направляются к контейнеру для передачи энергии
                var containers = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return structure.structureType == STRUCTURE_CONTAINER &&
                               structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
                });

                if (containers.length > 0) {
                    if (creep.transfer(containers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(containers[0], {visualizePathStyle: {stroke: '#ffffff'}, reusePath: 3});
                    }
                }
            }
        }
    }
};

module.exports = roleHarvester;
