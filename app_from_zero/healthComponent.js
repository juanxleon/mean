var health = 10;

var getHit = function(amount) {
	health -= amount;
}

module.exports.health = health;
module.exports.getHit = getHit;