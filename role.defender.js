var roleDefender = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var targets = creep.room.find(FIND_HOSTILE_CREEPS);
        if(targets.length > 0) {
            if(creep.attack(targets[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ff0000'}});
            }
            creep.say(anamy)
        } else {
            // Optional: Move to a designated guard post if no enemies are found
            var guardPost = new RoomPosition(20, 22, creep.room.name); // Example position
            creep.moveTo(guardPost, {visualizePathStyle: {stroke: '#00ff00'}});
        }
    }
};

module.exports = roleDefender;
