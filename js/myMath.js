var Matrix4 = {
    init: function () {
        this.a = new Float32Array([
            1.0, 0.0, 0.0, 0.0,
            0.0, 1.0, 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            0.0, 0.0, 0.0, 1.0
        ]);
        return this;
    },
    getArrayOfElements: function () {
        return this.a;
    },
    setTranslateMatrix: function (x, y, z) {
        this.a[0] = 1; this.a[4] = 0; this.a[8]  = 0; this.a[12] = x;
        this.a[1] = 0; this.a[5] = 1; this.a[9]  = 0; this.a[13] = y;
        this.a[2] = 0; this.a[6] = 0; this.a[10] = 1; this.a[14] = z;
        this.a[3] = 0; this.a[7] = 0; this.a[11] = 0; this.a[15] = 1;
    },
    setScaleMatrix: function (sx, sy, sz) {
        this.a[0] = sx; this.a[4] = 0;  this.a[8]  = 0;  this.a[12] = 0;
        this.a[1] = 0;  this.a[5] = sy; this.a[9]  = 0;  this.a[13] = 0;
        this.a[2] = 0;  this.a[6] = 0;  this.a[10] = sz; this.a[14] = 0;
        this.a[3] = 0;  this.a[7] = 0;  this.a[11] = 0;  this.a[15] = 1;
    },
    setRotateMatrix: function (angleDeg, x, y, z) {

    }
};

var Vector4 = {
    init: function () {
        this.a = new Float32Array([0,0,0,1]);
        return this;
    },
    getArrayOfElements: function () {
        return this.a;
    },
    getX: function () {
        return this.a[0];
    },
    getY: function () {
        return this.a[1];
    },
    getZ: function () {
        return this.a[2];
    },
    getW: function () {
        return this.a[3];
    }
};