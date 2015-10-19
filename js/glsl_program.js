var GLSLprogram_ = function (gl) {
    this.gl = gl;
    this.linked = false;
    this.uniformLocation = {};
    this.handle = this.gl.createProgram();
    if (!this.handle) {
        return null;
    }
};

GLSLprogram_.prototype.getUniformLocation = function (uniformName) {
    if (this.uniformLocation.hasOwnProperty(uniformName)) {
        return this.uniformLocation[uniformName];
    }
};

GLSLprogram_.prototype.compileShader = function (shaderText, shaderType) {
    var shader = this.gl.createShader(shaderType);
    if (!shader) {
        console.log('невозможно создать шейдер');
        return null;
    }
    this.gl.shaderSource(shader, shaderText);
    this.gl.compileShader(shader);
    var compiled = this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS);
    if (!compiled) {
        var error = this.gl.getShaderInfoLog(shader);
        console.log('Ошибки при компиляции шейдера:' + error);
        this.gl.deleteShader(shader);
        return null;
    }
    this.gl.attachShader(this.handle, shader);
};

GLSLprogram_.prototype.link = function () {
    this.gl.linkProgram(this.handle);
    var linkStatus = this.gl.getProgramParameter(this.handle, this.gl.LINK_STATUS);
    if (!linkStatus) {
        var error = this.gl.getProgramInfoLog(this.handle);
        console.log('Ошибки при сборке программы' + error);
        this.gl.deleteProgram(this.handle);
        // this.gl.deleteShader(vertexShader);
        // this.gl.deleteShader(fragmentShader);
        return null;
    }
    return this.handle;
};

var GLSLProgram = {
    init: function (gl) {
        this.gl = gl;
        this.handle = this.gl.createProgram();
    },
    compileShader: function (shaderText, shaderType) {
        var shader = this.gl.createShader(shaderType);
        if (!shader) {
            console.log('невозможно создать шейдер');
            return null;
        }
        this.gl.shaderSource(shader, shaderText);
        this.gl.compileShader(shader);
        var compiled = this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS);
        if (!compiled) {
            var error = this.gl.getShaderInfoLog(shader);
            console.log('Ошибки при компиляции шейдера:' + error);
            this.gl.deleteShader(shader);
            return null;
        }
        this.gl.attachShader(this.handle, shader);
    },
    link: function () {
        this.gl.linkProgram(this.handle);
        var linkStatus = this.gl.getProgramParameter(this.handle, this.gl.LINK_STATUS);
        if (!linkStatus) {
            var error = this.gl.getProgramInfoLog(this.handle);
            console.log('Ошибки при сборке программы' + error);
            this.gl.deleteProgram(this.handle);
            // this.gl.deleteShader(vertexShader);
            // this.gl.deleteShader(fragmentShader);
            return null;
        }
        return this.handle;
    }

};

// var program = new GLSLprogram_();
// program.uniformLocation.hello = "world";
// console.log(program.getUniformLocation("hello"));