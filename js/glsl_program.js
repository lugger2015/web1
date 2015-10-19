var GLSLProgram = {
    init: function (gl) {
        this.gl = gl;
        this.handle = this.gl.createProgram();
        this.uniformLocation = {};
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
    },
    setUniform4f: function (uniformName,x,y,z,w) {
        if (this.uniformLocation.hasOwnProperty(uniformName)) {
            this.gl.uniform4f(this.uniformLocation[uniformName],x,y,z,w);
        } else {
            var u_location = this.gl.getUniformLocation(this.handle, uniformName);
            if (!u_location) {
                console.log('невозможно получить uniform с именем '+u_location);
                return null;
            }
            this.uniformLocation[uniformName] = u_location;
            this.gl.uniform4f(u_location,x,y,z,w);
        }
    }
};