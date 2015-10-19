var GLSLProgram = {
    init: function (gl) {
        this._gl = gl;
        this._handle = this._gl.createProgram();
        this._uniformLocation = {};
    },
    compileShader: function (shaderText, shaderType) {
        var shader = this._gl.createShader(shaderType);
        if (!shader) {
            console.log('невозможно создать шейдер');
            return null;
        }
        this._gl.shaderSource(shader, shaderText);
        this._gl.compileShader(shader);
        var compiled = this._gl.getShaderParameter(shader, this._gl.COMPILE_STATUS);
        if (!compiled) {
            var error = this._gl.getShaderInfoLog(shader);
            console.log('Ошибки при компиляции шейдера:' + error);
            this._gl.deleteShader(shader);
            return null;
        }
        this._gl.attachShader(this._handle, shader);
    },
    link: function () {
        this._gl.linkProgram(this._handle);
        var linkStatus = this._gl.getProgramParameter(this._handle, this._gl.LINK_STATUS);
        if (!linkStatus) {
            var error = this._gl.getProgramInfoLog(this._handle);
            console.log('Ошибки при сборке программы' + error);
            this._gl.deleteProgram(this._handle);
            // this._gl.deleteShader(vertexShader);
            // this._gl.deleteShader(fragmentShader);
            return null;
        }
        return this._handle;
    },
    setUniform4f: function (uniformName,x,y,z,w) {
        if (this._uniformLocation.hasOwnProperty(uniformName)) {
            this._gl.uniform4f(this._uniformLocation[uniformName],x,y,z,w);
        } else {
            var u_location = this._gl.getUniformLocation(this._handle, uniformName);
            if (!u_location) {
                console.log('невозможно получить uniform с именем '+ uniformName);
                return null;
            }
            this._uniformLocation[uniformName] = u_location;
            this._gl.uniform4f(u_location,x,y,z,w);
        }
    }
};