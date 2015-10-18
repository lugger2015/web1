
shaderSources = {
    vShaderSource : null,
    fShaderSource : null
};


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
    var program = new GLSLprogram(gl);
    // var program = createProgram(gl, shaderSources.vShaderSource, shaderSources.fShaderSource);
    program.compileShader(shaderSources.vShaderSource,gl.VERTEX_SHADER);
    program.compileShader(shaderSources.fShaderSource,gl.FRAGMENT_SHADER);
    program.link();
    var a_Position = gl.getAttribLocation(program.handle, 'a_Position');

    if ( a_Position < 0 ) {
        console.log('невозможно получить a_Position');
        return null;
    }
    var u_FragColor = gl.getUniformLocation(program.handle, 'u_FragColor');
    if (!u_FragColor) {
        console.log('невозможно получить u_FragColor');
        return;
    }
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(program.handle);
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