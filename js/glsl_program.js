var GLSLprogram = function () {
	this.handle = 0;
	this.linked = false;
	this.uniformLocation = {};
};

GLSLprogram.prototype.getUniformLocation = function (name) {
	for (var location in this.uniformLocation) {
		if (this.uniformLocation.hasOwnProperty(location)) {

		}
	}
};