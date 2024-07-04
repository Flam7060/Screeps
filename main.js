var roleHarvester = require('role.harvester');
var roleBuilder = require('role.builder');
var roleUpgrader = require('role.upgrader');
var roleDefender = require('role.defender');
var roleRepairer = require('role.repairer'); 
var utils = require('utils'); 

module.exports.loop = function () {
    // console.log('tik')
    // очистка памяти
    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    
    var spawn = Game.spawns['Spawn1'];
    var desiredHarvesterCount = 6;
    var desiredUpgraderCount = 4;
    var desiredBuilderCount = 2;
    var desiredDefenderCount = 2; 
    var desiredRepairerCount = 1;
    

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var defenders = _.filter(Game.creeps, (creep) => creep.memory.role == 'defender');
    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
    
    var totalEnergy = utils.getTotalEnergyInRoom(spawn.room);
    // console.log('Total energy in room:', totalEnergy);
    
    var harvester_body = [MOVE, MOVE, WORK, WORK, CARRY, CARRY];
    var upgrader_body  = [MOVE, MOVE, WORK, WORK, CARRY, CARRY];
    var builder_body  = [MOVE, MOVE, WORK, WORK, CARRY, CARRY];
    var defender_body  = [ATTACK,ATTACK, ATTACK, MOVE, MOVE]
    var repairer_body  = [MOVE, MOVE, WORK, WORK, CARRY, CARRY];


    var harver_body_cost = utils.calculateCreepCost(harvester_body);
    var upgrader_body_cost = utils.calculateCreepCost(upgrader_body);
    var builder_body_cost = utils.calculateCreepCost(builder_body);
    var defender_body_cost = utils.calculateCreepCost(defender_body);
    var repairer_body_cost = utils.calculateCreepCost(repairer_body);

    

    if (harvesters.length < desiredHarvesterCount) {
        console.log('harvesters', harvesters.length,'desired',desiredHarvesterCount);
        if (totalEnergy >= harver_body_cost){
            spawn.spawnCreep(harvester_body, 'Harvester' + Game.time, { memory: { role: 'harvester' } });
            console.log('new_harvester')
        }else{
            console.log('Not enough energy to spawn harvester',totalEnergy - harver_body_cost);
        }

    }else{
        
        if (upgraders.length < desiredUpgraderCount)  {
            console.log('upgraders', upgraders.length,'desired',desiredUpgraderCount);
            if (totalEnergy >= upgrader_body_cost){
                spawn.spawnCreep(upgrader_body, 'Upgrader' + Game.time, { memory: { role: 'upgrader' } });
                console.log('new_upgrader')
            }else{
                console.log('Not enough energy to spawn upgrader',totalEnergy - harver_body_cost);
            }

        }
    
        if (builders.length < desiredBuilderCount) {
            console.log('builders', builders.length,'desired',desiredBuilderCount);
            if (totalEnergy >= builder_body_cost){
                spawn.spawnCreep(builder_body, 'Builder' + Game.time, { memory: { role: 'builder' } });
                console.log('new_builder');
            }else{
                console.log('Not enough energy to spawn builder',totalEnergy - harver_body_cost);
            }
        }
    
        if (defenders.length < desiredDefenderCount) {
            console.log('defenders', defenders.length,'desired',desiredDefenderCount);
            if (totalEnergy >= defender_body_cost){
                spawn.spawnCreep(defender_body, 'Defender' + Game.time, { memory: { role: 'defender' } });
                console.log('new_defender')
            }else{
                console.log('Not enough energy to spawn defender',totalEnergy - harver_body_cost);
            }
        }
    
        if (repairers.length < desiredRepairerCount) {
            console.log('repairers', repairers.length,'desired',desiredRepairerCount);
            if (totalEnergy >= repairer_body_cost){
                spawn.spawnCreep(repairer_body, 'Repairer' + Game.time, { memory: { role: 'repairer' } });
                console.log('new_repairer')
            }else{
                console.log('Not enough energy to spawn repairer',totalEnergy - harver_body_cost);
            }
        }
    }

    
    for (var name in Game.creeps) {
        var creep_ = Game.creeps[name];

        if (creep_.memory.role == 'harvester') {
            roleHarvester.run(creep_);
        }

        if (creep_.memory.role == 'upgrader') {
            roleUpgrader.run(creep_);
        }

        if (creep_.memory.role == 'builder') {
            roleBuilder.run(creep_);
        }

        if (creep_.memory.role == 'defender') {
            roleDefender.run(creep_);
        }

        if (creep_.memory.role == 'repairer') {
            roleRepairer.run(creep_); 
        }
    }
};
