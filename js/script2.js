
shaderSources = {
    vShaderSource : null,
    fShaderSource : null
};

function loadShader(gl, type, source) {
    var shader = gl.createShader(type);
    if ( !shader ) {
        console.log('невозможно создать шейдер');
        return null;
    }
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    var compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if ( !compiled ) {
        var error = gl.getShaderInfoLog(shader);
        console.log('Ошибки при компиляции шейдера:' + error);
        gl.deleteShader(shader);
        return null;
    }
    return shader;
}

function createProgram(gl, vShaderSource, fShaderSource) {
    var vertexShader = loadShader(gl, gl.VERTEX_SHADER, vShaderSource);
    var fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fShaderSource);
    if ( !vertexShader || !fragmentShader) {
        return null;
    }
    var program = gl.createProgram();
    if ( !program ) {
        return null;
    }
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    var linkStatus = gl.getProgramParameter(program, gl.LINK_STATUS);
    if ( !linkStatus ) {
        var error = gl.getProgramInfoLog(program);
        console.log('Ошибки при сборке программы' + error);
        gl.deleteProgram(program);
        gl.deleteShader(vertexShader);
        gl.deleteShader(fragmentShader);
        return null;
    }
    return program;
}

function init () {
    getSource("shader.vert",shaderSources,'vShaderSource');
    getSource("shader.frag",shaderSources,'fShaderSource');
}

function main() {
    var canvas = document.getElementById('canvas');
    var gl = canvas.getContext('webgl');
    if ( !gl ) {
        console.log('не возможно получить контекст');
        return;
    }
    gl.clearColor(0.0,0.0,1.0,1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    var program = createProgram(gl, shaderSources.vShaderSource, shaderSources.fShaderSource);
    var a_Position = gl.getAttribLocation(program, 'a_Position');

    if ( a_Position < 0 ) {
        console.log('невозможно получить a_Position');
        return null;
    }
    var u_FragColor = gl.getUniformLocation(program, 'u_FragColor');
    if (!u_FragColor) {
        console.log('невозможно получить u_FragColor');
        return;
    }
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(program);
    gl.uniform4f(u_FragColor,Math.random(),Math.random(),Math.random(),1.0);
    
    var vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    var vertices = new Float32Array([0.0,0.5,-0.5,-0.5,0.5,-0,5]);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Position);
    gl.drawArrays(gl.TRIANGLES, 0, 3);

}

function getSource (filename,sources,name) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status !== 404) { 
            sources[name] = request.responseText;
            initStatus.change();
        }
    };
    request.open('GET',filename,true);
    request.send();
}

initStatus = {
    change: function() {
        for (var item in shaderSources) {
            if (shaderSources.hasOwnProperty(item)) {
                if (!shaderSources[item]) return;
            }
        }
        main();
    }
};