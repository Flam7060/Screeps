var roleRepairer = {
    /** @param {Creep} creep **/
    run: function(creep) {
        // Проверяем, что крип находится в режиме ремонта и у него есть энергия
        if (creep.memory.repairing && creep.store[RESOURCE_ENERGY] > 0) {
            // Ищем структуры, которые нуждаются в ремонте и их здоровье меньше 50%
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.hits < 40000 // Ремонтируем только если здоровье меньше 50%
                }
            });

            // Если есть структуры, которые нуждаются в ремонте и их здоровье меньше 50%
            if (targets.length > 0) {
                // Ремонтируем первую структуру из списка
                if (creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
                }
            } else {
                // Если нет структур для ремонта или их здоровье более 50%, крип переходит к сбору энергии
                roleRepairer.harvestEnergy(creep);
            }
        } else {
            // Если крип не в режиме ремонта или у него нет энергии, он собирает её
            roleRepairer.harvestEnergy(creep);
        }

        // Проверяем, что у крипа закончилась энергия и он был в режиме ремонта
        if (!creep.memory.repairing && creep.store.getFreeCapacity() == 0) {
            creep.memory.repairing = true;
            creep.say('🔧 repair');
        }

        // Если крип в режиме ремонта, но нет энергии
        if (creep.memory.repairing && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.repairing = false;
            creep.say('🔄 harvest');
        }
    },

    // Функция для сбора энергии
    harvestEnergy: function(creep) {
        // Находим все источники энергии в комнате крипа
        var sources = creep.room.find(FIND_SOURCES);

        // Если есть доступные источники энергии
        if (sources.length > 0) {
            // Крип идёт к ближайшему источнику энергии и добывает её
            if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        }
    }
};

module.exports = roleRepairer; // Экспортируем объект roleRepairer
