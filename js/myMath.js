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

    setRotateMatrix: function (angleDeg, vector3) {
        var angleRad = Math.PI * angleDeg / 180;

        var s = Math.sin(angleRad);
        var c = Math.cos(angleRad);

        if (0 !== vector3.x && 0 === vector3.y && 0 === vector3.z) {
            if (vector3.x < 0) {
                s = -s;
            }
            this.a[0] = 1;  this.a[4] = 0;  this.a[ 8] = 0;  this.a[12] = 0;
            this.a[1] = 0;  this.a[5] = c;  this.a[ 9] =-s;  this.a[13] = 0;
            this.a[2] = 0;  this.a[6] = s;  this.a[10] = c;  this.a[14] = 0;
            this.a[3] = 0;  this.a[7] = 0;  this.a[11] = 0;  this.a[15] = 1;
        } else if (0 === vector3.x && 0 !== vector3.y && 0 === vector3.z) {
            if (vector3.y < 0) {
                s = -s;
            }
            this.a[0] = c;  this.a[4] = 0;  this.a[ 8] = s;  this.a[12] = 0;
            this.a[1] = 0;  this.a[5] = 1;  this.a[ 9] = 0;  this.a[13] = 0;
            this.a[2] =-s;  this.a[6] = 0;  this.a[10] = c;  this.a[14] = 0;
            this.a[3] = 0;  this.a[7] = 0;  this.a[11] = 0;  this.a[15] = 1;
        } else if (0 === vector3.x && 0 === vector3.y && 0 !== vector3.z) {
            if (vector3.z < 0) {
                s = -s;
            }
            this.a[0] = c;  this.a[4] =-s;  this.a[ 8] = 0;  this.a[12] = 0;
            this.a[1] = s;  this.a[5] = c;  this.a[ 9] = 0;  this.a[13] = 0;
            this.a[2] = 0;  this.a[6] = 0;  this.a[10] = 1;  this.a[14] = 0;
            this.a[3] = 0;  this.a[7] = 0;  this.a[11] = 0;  this.a[15] = 1;
        } else {
            vector3.normalize();
            var nc = 1 - c;
            var xy = vector3.x * vector3.y;
            var yz = vector3.y * vector3.z;
            var zx = vector3.z * vector3.x;
            var xs = vector3.x * s;
            var ys = vector3.y * s;
            var zs = vector3.z * s;

            this.a[0] = vector3.x * vector3.x * nc + c;
            this.a[1] = xy * nc + zs;
            this.a[2] = zx * nc - ys;
            this.a[3] = 0;

            this.a[4] = xy * nc - zs;
            this.a[5] = vector3.y * vector3.y * nc + c;
            this.a[6] = yz * nc + xs;
            this.a[7] = 0;

            this.a[8] = zx * nc + ys;
            this.a[9] = yz * nc - xs;
            this.a[10] = vector3.z * vector3.z * nc + c;
            this.a[11] = 0;

            this.a[12] = 0;
            this.a[13] = 0;
            this.a[14] = 0;
            this.a[15] = 1;
        }
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

var Vector3 = {
    init: function(x,y,z) {
        if(x !== undefined) {
            this.x = x;
        } else {
            this.x = 0;
        }
        if(y !== undefined) {
            this.y = y;
        } else {
            this.y = 0;
        }
        if(z !== undefined) {
            this.z = z;
        } else {
            this.z = 0;
        }
        return this;
    },
    normalize: function () {
        var len = Math.sqrt(this.x*this.x + this.y*this.y + this.z*this.z);
        if (len !== 1) {
            var rlen = 1 / len;
            this.x *= rlen;
            this.y *= rlen;
            this.z *= rlen;
        }
    }
};