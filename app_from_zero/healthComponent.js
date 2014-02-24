var healthComponent = function (initialHealt) {
	this.health = initialHealt;
	this.getHit = function(amount) {
		health -= amount;
	}
	return this;
}
module.exports = healthComponent;