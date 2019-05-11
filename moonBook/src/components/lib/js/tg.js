!function(t) {
    "use strict";
    void 0 === Number.EPSILON && (Number.EPSILON = Math.pow(2, -52)),
    void 0 === Number.isInteger && (Number.isInteger = function(t) {
        return "number" == typeof t && isFinite(t) && Math.floor(t) === t
    }
    ),
    void 0 === Math.sign && (Math.sign = function(t) {
        return 0 > t ? -1 : t > 0 ? 1 : +t
    }
    ),
    void 0 === Function.prototype.name && Object.defineProperty(Function.prototype, "name", {
        get: function() {
            return this.toString().match(/^\s*function\s*([^\(\s]*)/)[1]
        }
    }),
    void 0 === Object.assign && !function() {
        Object.assign = function(t) {
            if (void 0 === t || null === t)
                throw new TypeError("Cannot convert undefined or null to object");
            for (var e = Object(t), i = 1; i < arguments.length; i++) {
                var n = arguments[i];
                if (void 0 !== n && null !== n)
                    for (var s in n)
                        Object.prototype.hasOwnProperty.call(n, s) && (e[s] = n[s])
            }
            return e
        }
    }();
    var e = function(t, e) {
        if (!(t instanceof e))
            throw new TypeError("Cannot call a class as a function")
    }
      , i = function() {
        function t(t, e) {
            for (var i = 0; i < e.length; i++) {
                var n = e[i];
                n.enumerable = n.enumerable || !1,
                n.configurable = !0,
                "value"in n && (n.writable = !0),
                Object.defineProperty(t, n.key, n)
            }
        }
        return function(e, i, n) {
            return i && t(e.prototype, i),
            n && t(e, n),
            e
        }
    }()
      , n = function P(t, e, i) {
        null === t && (t = Function.prototype);
        var n = Object.getOwnPropertyDescriptor(t, e);
        if (void 0 === n) {
            var s = Object.getPrototypeOf(t);
            return null === s ? void 0 : P(s, e, i)
        }
        if ("value"in n)
            return n.value;
        var r = n.get;
        return void 0 === r ? void 0 : r.call(i)
    }
      , s = function(t, e) {
        if ("function" != typeof e && null !== e)
            throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }),
        e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }
      , r = function(t, e) {
        if (!t)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !e || "object" != typeof e && "function" != typeof e ? t : e
    }
      , a = function D() {
        var t = this;
        e(this, D);
        var i = document.createDocumentFragment();
        ["addEventListener", "dispatchEvent", "removeEventListener"].forEach(function(e) {
            return t[e] = function() {
                return i[e].apply(i, arguments)
            }
        })
    }
      , h = function() {
        function t(i, n, s, r, a, h) {
            e(this, t),
            this.setValues(i, n, s, r, a, h)
        }
        return i(t, [{
            key: "setValues",
            value: function(t, e, i, n, s, r) {
                return this.a = null == t ? 1 : t,
                this.b = e || 0,
                this.c = i || 0,
                this.d = null == n ? 1 : n,
                this.tx = s || 0,
                this.ty = r || 0,
                this
            }
        }, {
            key: "append",
            value: function(t, e, i, n, s, r) {
                var a = this.a
                  , h = this.b
                  , o = this.c
                  , u = this.d;
                return (1 != t || 0 != e || 0 != i || 1 != n) && (this.a = a * t + o * e,
                this.b = h * t + u * e,
                this.c = a * i + o * n,
                this.d = h * i + u * n),
                this.tx = a * s + o * r + this.tx,
                this.ty = h * s + u * r + this.ty,
                this
            }
        }, {
            key: "prepend",
            value: function(t, e, i, n, s, r) {
                var a = this.a
                  , h = this.c
                  , o = this.tx;
                return this.a = t * a + i * this.b,
                this.b = e * a + n * this.b,
                this.c = t * h + i * this.d,
                this.d = e * h + n * this.d,
                this.tx = t * o + i * this.ty + s,
                this.ty = e * o + n * this.ty + r,
                this
            }
        }, {
            key: "appendMatrix",
            value: function(t) {
                return this.append(t.a, t.b, t.c, t.d, t.tx, t.ty)
            }
        }, {
            key: "prependMatrix",
            value: function(t) {
                return this.prepend(t.a, t.b, t.c, t.d, t.tx, t.ty)
            }
        }, {
            key: "appendTransform",
            value: function(e, i, n, s, r, a, h, o, u) {
                if (r % 360)
                    var l = r * t.DEG_TO_RAD
                      , c = Math.cos(l)
                      , d = Math.sin(l);
                else
                    c = 1,
                    d = 0;
                return a || h ? (a *= t.DEG_TO_RAD,
                h *= t.DEG_TO_RAD,
                this.append(Math.cos(h), Math.sin(h), -Math.sin(a), Math.cos(a), e, i),
                this.append(c * n, d * n, -d * s, c * s, 0, 0)) : this.append(c * n, d * n, -d * s, c * s, e, i),
                (o || u) && (this.tx -= o * this.a + u * this.c,
                this.ty -= o * this.b + u * this.d),
                this
            }
        }, {
            key: "prependTransform",
            value: function(e, i, n, s, r, a, h, o, u) {
                if (r % 360)
                    var l = r * t.DEG_TO_RAD
                      , c = Math.cos(l)
                      , d = Math.sin(l);
                else
                    c = 1,
                    d = 0;
                return (o || u) && (this.tx -= o,
                this.ty -= u),
                a || h ? (a *= t.DEG_TO_RAD,
                h *= t.DEG_TO_RAD,
                this.prepend(c * n, d * n, -d * s, c * s, 0, 0),
                this.prepend(Math.cos(h), Math.sin(h), -Math.sin(a), Math.cos(a), e, i)) : this.prepend(c * n, d * n, -d * s, c * s, e, i),
                this
            }
        }, {
            key: "rotate",
            value: function(e) {
                e *= t.DEG_TO_RAD;
                var i = Math.cos(e)
                  , n = Math.sin(e)
                  , s = this.a
                  , r = this.b;
                return this.a = s * i + this.c * n,
                this.b = r * i + this.d * n,
                this.c = -s * n + this.c * i,
                this.d = -r * n + this.d * i,
                this
            }
        }, {
            key: "skew",
            value: function(e, i) {
                return e *= t.DEG_TO_RAD,
                i *= t.DEG_TO_RAD,
                this.append(Math.cos(i), Math.sin(i), -Math.sin(e), Math.cos(e), 0, 0),
                this
            }
        }, {
            key: "scale",
            value: function(t, e) {
                return this.a *= t,
                this.b *= t,
                this.c *= e,
                this.d *= e,
                this
            }
        }, {
            key: "translate",
            value: function(t, e) {
                return this.tx += this.a * t + this.c * e,
                this.ty += this.b * t + this.d * e,
                this
            }
        }, {
            key: "identity",
            value: function() {
                return this.a = this.d = 1,
                this.b = this.c = this.tx = this.ty = 0,
                this
            }
        }, {
            key: "invert",
            value: function() {
                var t = this.a
                  , e = this.b
                  , i = this.c
                  , n = this.d
                  , s = this.tx
                  , r = t * n - e * i;
                return this.a = n / r,
                this.b = -e / r,
                this.c = -i / r,
                this.d = t / r,
                this.tx = (i * this.ty - n * s) / r,
                this.ty = -(t * this.ty - e * s) / r,
                this
            }
        }, {
            key: "isIdentity",
            value: function() {
                return 0 === this.tx && 0 === this.ty && 1 === this.a && 0 === this.b && 0 === this.c && 1 === this.d
            }
        }, {
            key: "equals",
            value: function(t) {
                return this.tx === t.tx && this.ty === t.ty && this.a === t.a && this.b === t.b && this.c === t.c && this.d === t.d
            }
        }, {
            key: "transformPoint",
            value: function(t, e, i) {
                return i = i || {},
                i.x = t * this.a + e * this.c + this.tx,
                i.y = t * this.b + e * this.d + this.ty,
                i
            }
        }, {
            key: "decompose",
            value: function(e) {
                null == e && (e = {}),
                e.x = this.tx,
                e.y = this.ty,
                e.scaleX = Math.sqrt(this.a * this.a + this.b * this.b),
                e.scaleY = Math.sqrt(this.c * this.c + this.d * this.d);
                var i = Math.atan2(-this.c, this.d)
                  , n = Math.atan2(this.b, this.a)
                  , s = Math.abs(1 - i / n);
                return 1e-5 > s ? (e.rotation = n / t.DEG_TO_RAD,
                this.a < 0 && this.d >= 0 && (e.rotation += e.rotation <= 0 ? 180 : -180),
                e.skewX = e.skewY = 0) : (e.skewX = i / t.DEG_TO_RAD,
                e.skewY = n / t.DEG_TO_RAD),
                e
            }
        }, {
            key: "copy",
            value: function(t) {
                return this.setValues(t.a, t.b, t.c, t.d, t.tx, t.ty)
            }
        }, {
            key: "clone",
            value: function() {
                return new t(this.a,this.b,this.c,this.d,this.tx,this.ty)
            }
        }, {
            key: "toString",
            value: function() {
                return "[Matrix2D (a=" + this.a + " b=" + this.b + " c=" + this.c + " d=" + this.d + " tx=" + this.tx + " ty=" + this.ty + ")]"
            }
        }]),
        t
    }();
    h.DEG_TO_RAD = Math.PI / 180,
    h.identity = null;
    var o = function() {
        function t(i, n, s, r, a) {
            e(this, t),
            this.setValues(i, n, s, r, a)
        }
        return i(t, [{
            key: "setValues",
            value: function(t, e, i, n, s) {
                return this.visible = null == t ? !0 : !!t,
                this.alpha = null == e ? 1 : e,
                this.matrix = s || this.matrix && this.matrix.identity() || new h,
                this
            }
        }, {
            key: "append",
            value: function(t, e, i, n, s) {
                return this.alpha *= e,
                this.visible = this.visible && t,
                s && this.matrix.appendMatrix(s),
                this
            }
        }, {
            key: "prepend",
            value: function(t, e, i, n, s) {
                return this.alpha *= e,
                this.shadow = this.shadow || i,
                this.compositeOperation = this.compositeOperation || n,
                this.visible = this.visible && t,
                s && this.matrix.prependMatrix(s),
                this
            }
        }, {
            key: "identity",
            value: function() {
                return this.visible = !0,
                this.alpha = 1,
                this.shadow = this.compositeOperation = null,
                this.matrix.identity(),
                this
            }
        }, {
            key: "clone",
            value: function() {
                return new t(this.alpha,null,null,this.visible,this.matrix.clone())
            }
        }]),
        t
    }()
      , u = function(t, e) {
        var i = 1e4
          , n = "matrix3d(" + (e.a * i | 0) / i + "," + (e.b * i | 0) / i + ",0,0," + (e.c * i | 0) / i + "," + (e.d * i | 0) / i + ",0,0,0,0,1,0," + (e.tx + .5 | 0) + "," + (e.ty + .5 | 0) + ",0,1)";
        t.transform = t.WebkitTransform = t.OTransform = t.msTransform = n
    }
      , l = function(t) {
        function n(t) {
            e(this, n);
            var i = r(this, (n.__proto__ || Object.getPrototypeOf(n)).call(this));
            return i.id = ++n.UIN,
            i._matrix = new h,
            i.transformMatrix = null,
            i._skewX = 0,
            i._skewY = 0,
            i._regX = 0,
            i._regY = 0,
            i._rotation = 0,
            i._scaleY = i._scaleX = 1,
            i._alpha = 1,
            i._x = 0,
            i._y = 0,
            i._visible = !0,
            i.target = t,
            i._depth = 0,
            i.mask = null,
            i.width = 0,
            i.height = 0,
            i._props = new o,
            i
        }
        return s(n, t),
        i(n, [{
            key: "isVisible",
            value: function() {
                return this._alpha > 0 && this.visible
            }
        }, {
            key: "updateContext",
            value: function() {
                var t = this
                  , e = (t.mask,
                t._props.matrix);
                this.getMatrix(e)
            }
        }, {
            key: "setTransform",
            value: function(t, e, i, n, s, r, a, h, o) {
                return this.x = t || 0,
                this.y = e || 0,
                this.scaleX = null == i ? 1 : i,
                this.scaleY = null == n ? 1 : n,
                this.rotation = s || 0,
                this.skewX = r || 0,
                this.skewY = a || 0,
                this.regX = h || 0,
                this.regY = o || 0,
                this
            }
        }, {
            key: "getMatrix",
            value: function(t) {
                var e = this
                  , i = t && t.identity() || new h;
                return e.transformMatrix ? i.copy(e.transformMatrix) : i.appendTransform(e.x, e.y, e.scaleX, e.scaleY, e.rotation, e.skewX, e.skewY, e.regX, e.regY)
            }
        }, {
            key: "getConcatenatedDisplayProps",
            value: function(t) {
                t = t ? t.identity() : new o;
                var e = this
                  , i = e.getMatrix(t.matrix);
                do
                    t.prepend(e.visible, e.alpha, e.shadow, e.compositeOperation),
                    e != this && i.prependMatrix(e.getMatrix(e._props.matrix));
                while (e = e.parent);return t
            }
        }, {
            key: "draw",
            value: function() {
                if (this.target) {
                    var t = new h;
                    this._matrix = t.appendTransform(this.x, this.y, this.scaleX, this.scaleY, this.rotation, this.skewX, this.skewY, this.regX, this.regY),
                    u(this.target.style, this.matrix),
                    this.alpha = this.alpha,
                    this.visible = this.visible,
                    this.depth = this.depth
                }
            }
        }, {
            key: "mask",
            set: function(t) {
                this.mask && this.mask.parent && (this.mask.parent.removeChild(this.mask),
                this.target.style.webkitMaskImage = this.target.style.maskImage = "",
                this.mask = null),
                this._mask = t,
                this.mask && this.mask.target && this.target && (this.target.style.webkitMaskImage = this.target.style.maskImage = "url('" + this.mask.target.toDataURL() + "');")
            },
            get: function() {
                return this._mask
            }
        }, {
            key: "depth",
            set: function(t) {
                this._depth = 100 * t,
                this.target && (this.target.style.zIndex = this.depth)
            },
            get: function() {
                return this._depth / 100
            }
        }, {
            key: "parent",
            set: function(t) {
                this._parent = t,
                t ? t.target.appendChild(this.target) : this.target && this.target.parentNode && this.target.parentNode.removeChild(this.target),
                this.draw()
            },
            get: function() {
                return this._parent
            }
        }, {
            key: "alpha",
            set: function(t) {
                this._alpha = t,
                this.target && (this.target.style.opacity = this.visible ? t : 0)
            },
            get: function() {
                return this._alpha
            }
        }, {
            key: "visible",
            set: function(t) {
                this._visible = t,
                this.alpha = this.alpha
            },
            get: function() {
                return this._visible
            }
        }, {
            key: "target",
            set: function(t) {
                if (this._target = t,
                "string" == typeof t) {
                    var e = new Image;
                    e.src = t,
                    this._target = e
                } else if (t && t instanceof HTMLImageElement && t.src && -1 != t.src.indexOf("blob:")) {
                    var e = new Image;
                    e.src = t.src,
                    e.id = "t_" + Math.floor(100 * Math.random()),
                    this._target = e
                }
                this._target && (this._target.style.position = "absolute",
                this._target.style.transformOrigin = this._target.style.WebkitTransformOrigin = this._target.style.msTransformOrigin = this._target.style.MozTransformOrigin = this._target.style.OTransformOrigin = "0% 0%")
            },
            get: function() {
                return this._target
            }
        }, {
            key: "width",
            set: function() {
                this._width = 0
            },
            get: function() {
                return this._width
            }
        }, {
            key: "height",
            set: function(t) {
                this._height = t
            },
            get: function() {
                return this._height
            }
        }, {
            key: "matrix",
            get: function() {
                return this._matrix
            }
        }, {
            key: "x",
            set: function(t) {
                this._x = t
            },
            get: function() {
                return this._x
            }
        }, {
            key: "y",
            set: function(t) {
                this._y = t
            },
            get: function() {
                return this._y
            }
        }, {
            key: "rotation",
            set: function(t) {
                this._rotation = t
            },
            get: function() {
                return this._rotation
            }
        }, {
            key: "scaleX",
            set: function(t) {
                this._scaleX = t
            },
            get: function() {
                return this._scaleX
            }
        }, {
            key: "scaleY",
            set: function(t) {
                this._scaleY = t
            },
            get: function() {
                return this._scaleY
            }
        }, {
            key: "skewX",
            set: function(t) {
                this._skewX = t
            },
            get: function() {
                return this._skewX
            }
        }, {
            key: "skewY",
            set: function(t) {
                this._skewY = t
            },
            get: function() {
                return this._skewY
            }
        }, {
            key: "regX",
            set: function(t) {
                this._regX = t
            },
            get: function() {
                return this._regX
            }
        }, {
            key: "regY",
            set: function(t) {
                this._regY = t
            },
            get: function() {
                return this._regY
            }
        }]),
        n
    }(a);
    l.UIN = 0;
    var c = function(t) {
        function a(t) {
            e(this, a);
            var i = r(this, (a.__proto__ || Object.getPrototypeOf(a)).call(this, t ? t : document.createElement("div")));
            return i.children = [],
            i
        }
        return s(a, t),
        i(a, [{
            key: "getNumChildren",
            value: function() {
                return this.children.length
            }
        }, {
            key: "addChild",
            value: function(t) {
                if (null == t)
                    return t;
                var e = arguments.length;
                if (e > 1) {
                    for (var i = 0; e > i; i++)
                        arguments[i].depth = ++a._DEPTH,
                        this.addChild(arguments[i]);
                    return arguments[e - 1]
                }
                return t.parent && t.parent.removeChild(t),
                t.parent = this,
                this.children.push(t),
                t
            }
        }, {
            key: "addChildAt",
            value: function(t, e) {
                var i = arguments.length
                  , n = arguments[i - 1];
                if (0 > n || n > this.children.length)
                    return arguments[i - 2];
                if (i > 2) {
                    for (var s = 0; i - 1 > s; s++)
                        this.addChildAt(arguments[s], n + s);
                    return arguments[i - 2]
                }
                return t.parent && t.parent.removeChild(t),
                t.parent = this,
                this.children.splice(e, 0, t),
                this.children[e].depth = ++a._DEPTH,
                t
            }
        }, {
            key: "removeChildAt",
            value: function(t) {
                var e = arguments.length;
                if (e > 1) {
                    for (var i = [], n = 0; e > n; n++)
                        i[n] = arguments[n];
                    i.sort(function(t, e) {
                        return e - t
                    });
                    for (var s = !0, n = 0; e > n; n++)
                        s = s && this.removeChildAt(i[n]);
                    return s
                }
                if (0 > t || t > this.children.length - 1)
                    return !1;
                var r = this.children[t];
                return r && (r.parent = null),
                this.children.splice(t, 1),
                !0
            }
        }, {
            key: "removeChild",
            value: function(t) {
                var e = arguments.length;
                if (e > 1) {
                    for (var i = !0, n = 0; e > n; n++)
                        i = i && this.removeChild(arguments[n]);
                    return i
                }
                for (var n = 0; n < this.children.length; n++)
                    if (this.children[n] == t)
                        return this.removeChildAt(n)
            }
        }, {
            key: "removeAllChildren",
            value: function() {
                for (var t = this.children; t.length; )
                    this.removeChildAt(0)
            }
        }, {
            key: "getChildAt",
            value: function(t) {
                return this.children[t]
            }
        }, {
            key: "draw",
            value: function() {
                n(a.prototype.__proto__ || Object.getPrototypeOf(a.prototype), "draw", this).call(this);
                for (var t = this.children.slice(), e = 0, i = t.length; i > e; e++) {
                    var s = t[e];
                    s.isVisible() && (s.updateContext(),
                    s.draw(),
                    s.depth = ++a._DEPTH,
                    s.mask && void 0 === s.mask.parent && this.addChild(s.mask))
                }
                return !0
            }
        }, {
            key: "getStage",
            value: function() {
                for (var t = this.parent; t; ) {
                    if (t instanceof d)
                        return t;
                    t = t.parent
                }
            }
        }, {
            key: "numChildren",
            get: function() {
                return this.getNumChildren()
            }
        }]),
        a
    }(l);
    c._DEPTH = 0;
    var d = function(t) {
        function n(t) {
            e(this, n);
            var i = r(this, (n.__proto__ || Object.getPrototypeOf(n)).call(this, t ? t : document.createElement("div")));
            return i._depth = 1,
            i
        }
        return s(n, t),
        i(n, [{
            key: "_tick",
            value: function() {
                c._DEPTH = 0,
                this.draw()
            }
        }]),
        n
    }(c)
      , f = function(t) {
        function n(t) {
            e(this, n);
            var i = r(this, (n.__proto__ || Object.getPrototypeOf(n)).call(this, document.createElement("div")));
            return i.initialize = n,
            i.spriteSheet = t,
            i
        }
        return s(n, t),
        i(n, [{
            key: "gotoAndStop",
            value: function(t) {
                if (this._currentFrame = t,
                !this._initialized) {
                    this._initialized = !0;
                    var e = this.spriteSheet;
                    this.initialize(),
                    this.spriteSheet = e
                }
                if (this.spriteSheet) {
                    var e = this.spriteSheet.getFrame(0 | this._currentFrame);
                    this.target && (this.target.style.background = "url('" + e.image + "') " + -e.frame.x + "px " + -e.frame.y + "px",
                    this.target.style.width = e.frame.width + "px",
                    this.target.style.height = e.frame.height + "px",
                    this.width = e.frame.width,
                    this.height = e.frame.height)
                }
            }
        }, {
            key: "spriteSheet",
            set: function(t) {
                this._spriteSheet = t
            },
            get: function() {
                return this._spriteSheet
            }
        }]),
        n
    }(l)
      , g = function C() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0
          , i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0
          , n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1
          , s = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 1;
        e(this, C),
        this.x = t,
        this.y = i,
        this.width = n,
        this.height = s
    }
      , v = function() {
        function t(i) {
            e(this, t),
            this.data = i
        }
        return i(t, [{
            key: "_parseData",
            value: function(t) {
                this.frames = [];
                for (var e = 0; e < t.images.length; e++) {
                    var i = t.images[e];
                    "string" != typeof i && (i = i.src),
                    t.images[e] = i
                }
                for (var n, e = 0; e < t.frames.length; e++)
                    n = t.frames[e],
                    this._addframe(t.images, n)
            }
        }, {
            key: "_addframe",
            value: function(t, e) {
                var i = t[e[4] || 0]
                  , n = {
                    image: i,
                    frame: new g(e[0],e[1],e[2],e[3])
                };
                this.frames.push(n)
            }
        }, {
            key: "getFrame",
            value: function(t) {
                return this.frames[t] || null
            }
        }, {
            key: "data",
            set: function(t) {
                this._data = t,
                this.data && this._parseData(this.data)
            },
            get: function() {
                return this._data
            }
        }]),
        t
    }();
    window.createjs = window.createjs || {};
    var _ = createjs.Tween || {};
    window.createjs = window.createjs || {};
    var p = createjs.Ease || {};
    window.createjs = window.createjs || {};
    var y = createjs.Timeline || {}
      , m = function(t) {
        function a(t) {
            e(this, a);
            var i = r(this, (a.__proto__ || Object.getPrototypeOf(a)).call(this, t));
            return i.initialize = a,
            i
        }
        return s(a, t),
        i(a, [{
            key: "draw",
            value: function() {
                n(a.prototype.__proto__ || Object.getPrototypeOf(a.prototype), "draw", this).call(this)
            }
        }]),
        a
    }(l)
      , k = function() {
        function t() {
            e(this, t)
        }
        return i(t, null, [{
            key: "install",
            value: function() {
                _.installPlugin(t, ["startPosition"])
            }
        }, {
            key: "init",
            value: function(t, e, i) {
                return i
            }
        }, {
            key: "step",
            value: function() {}
        }, {
            key: "tween",
            value: function(t, e, i, n, s, r) {
                return t.target instanceof w ? 1 == r ? s[e] : n[e] : i
            }
        }]),
        t
    }();
    k.priority = 100;
    var w = function(t) {
        function a(t, i, n, s) {
            e(this, a);
            var h = r(this, (a.__proto__ || Object.getPrototypeOf(a)).call(this));
            return !a.inited && a.init(),
            h.mode = t || a.INDEPENDENT,
            h.startPosition = i || 0,
            h.loop = n,
            h.currentFrame = 0,
            h.timeline = new y(null,s,{
                paused: !0,
                position: i,
                useTicks: !0
            }),
            h.paused = !1,
            h.actionsEnabled = !0,
            h.autoReset = !0,
            h.frameBounds = h.frameBounds || null,
            h.framerate = null,
            h._framerate = null,
            h._synchOffset = 0,
            h._prevPos = -1,
            h._prevPosition = 0,
            h._t = 0,
            h._managed = {},
            h
        }
        return s(a, t),
        i(a, [{
            key: "getLabels",
            value: function() {
                return this.timeline.getLabels()
            }
        }, {
            key: "getCurrentLabel",
            value: function() {
                return this.timeline.getCurrentLabel()
            }
        }, {
            key: "getDuration",
            value: function() {
                return this.timeline.duration
            }
        }, {
            key: "renderWebGL",
            value: function(t) {
                n(a.prototype.__proto__ || Object.getPrototypeOf(a.prototype), "renderWebGL", this).call(this, t)
            }
        }, {
            key: "renderCanvas",
            value: function(t) {
                n(a.prototype.__proto__ || Object.getPrototypeOf(a.prototype), "renderCanvas", this).call(this, t)
            }
        }, {
            key: "play",
            value: function() {
                this.paused = !1
            }
        }, {
            key: "stop",
            value: function() {
                this.paused = !0
            }
        }, {
            key: "gotoAndPlay",
            value: function(t) {
                this.paused = !1,
                this._goto(t)
            }
        }, {
            key: "gotoAndStop",
            value: function(t) {
                this.paused = !0,
                this._goto(t)
            }
        }, {
            key: "advance",
            value: function(t) {
                var e = a.INDEPENDENT;
                if (this.mode == e) {
                    for (var i = this, n = i.framerate; (i = i.parent) && null == n; )
                        i.mode == e && (n = i._framerate);
                    this._framerate = n;
                    var s = null != n && -1 != n && null != t ? t / (1e3 / n) + this._t : 1
                      , r = 0 | s;
                    for (this._t = s - r; !this.paused && r--; )
                        this._prevPosition = this._prevPos < 0 ? 0 : this._prevPosition + 1
                }
            }
        }, {
            key: "draw",
            value: function() {
                this.advance(createjs.Ticker.getMeasuredFPS()),
                this._updateTimeline(),
                n(a.prototype.__proto__ || Object.getPrototypeOf(a.prototype), "draw", this).call(this)
            }
        }, {
            key: "_goto",
            value: function(t) {
                var e = this.timeline.resolve(t);
                null != e && (-1 == this._prevPos && (this._prevPos = 0 / 0),
                this._prevPosition = e,
                this._t = 0,
                this._updateTimeline())
            }
        }, {
            key: "_reset",
            value: function() {
                this._updateTimeline(),
                this._prevPos = -1,
                this._t = this.currentFrame = 0,
                this.paused = !1
            }
        }, {
            key: "_updateTimeline",
            value: function() {
                var t = this.timeline
                  , e = this.mode != a.INDEPENDENT;
                t.loop = null == this.loop ? !0 : this.loop;
                var i = e ? this.startPosition + (this.mode == a.SINGLE_FRAME ? 0 : this._synchOffset) : this._prevPos < 0 ? 0 : this._prevPosition
                  , n = e || !this.actionsEnabled ? _.NONE : null;
                if (this.currentFrame = t._calcPosition(i),
                t.setPosition(i, n),
                this._prevPosition = t._prevPosition,
                this._prevPos != t._prevPos) {
                    this.currentFrame = this._prevPos = t._prevPos;
                    for (var s in this._managed)
                        this._managed[s] = 1;
                    for (var r = t._tweens, h = 0, o = r.length; o > h; h++) {
                        var u = r[h]
                          , c = u._target;
                        if (c != this && !u.passive) {
                            var d = u._stepPosition;
                            c instanceof l ? this._addManagedChild(c, d) : this._setState(c.state, d)
                        }
                    }
                    var f = this.children;
                    for (h = f.length - 1; h >= 0; h--) {
                        var g = f[h].id;
                        1 == this._managed[g] && (this.removeChildAt(h),
                        delete this._managed[g])
                    }
                }
            }
        }, {
            key: "_setState",
            value: function(t, e) {
                if (t)
                    for (var i = t.length - 1; i >= 0; i--) {
                        var n = t[i]
                          , s = n.t
                          , r = n.p;
                        for (var a in r)
                            s[a] = r[a];
                        this._addManagedChild(s, e)
                    }
            }
        }, {
            key: "_addManagedChild",
            value: function(t, e) {
                t._off || (this.addChildAt(t, 0),
                t instanceof a && (t._synchOffset = e,
                t.mode == a.INDEPENDENT && t.autoReset && !this._managed[t.id] && t._reset()),
                this._managed[t.id] = 2)
            }
        }, {
            key: "currentFrame",
            set: function(t) {
                this._currentFrame = t
            },
            get: function() {
                return this._currentFrame
            }
        }, {
            key: "labels",
            get: function() {
                return this.getLabels()
            }
        }, {
            key: "currentLabel",
            get: function() {
                return this.getCurrentLabel()
            }
        }, {
            key: "totalFrames",
            get: function() {
                return this.getDuration()
            }
        }, {
            key: "duration",
            get: function() {
                return this.getDuration()
            }
        }], [{
            key: "init",
            value: function() {
                a.inited || (k.install(),
                a.inited = !0)
            }
        }]),
        a
    }(c);
    w.prototype.initialize = w,
    w.INDEPENDENT = "independent",
    w.SINGLE_FRAME = "single",
    w.SYNCHED = "synched",
    w.inited = !1;
    var b = Object.freeze({
        Stage: d,
        DisplayProps: o,
        Sprite: f,
        SpriteSheet: v,
        Tween: _,
        Ease: p,
        Timeline: y,
        Bitmap: m,
        Rectangle: g,
        Container: c,
        MovieClip: w,
        DisplayObject: l
    })
      , x = function() {
        function t() {
            var i = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0
              , n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
            e(this, t),
            this.setSize(i, n)
        }
        return i(t, [{
            key: "setSize",
            value: function(t, e) {
                this._width = t,
                this._height = e
            }
        }, {
            key: "_exactFit",
            value: function(t, e) {
                return {
                    x: 0,
                    y: 0,
                    width: this.width,
                    height: this.height,
                    scaleX: t / this.width,
                    scaleY: e / this.height,
                    rotation: 0
                }
            }
        }, {
            key: "_noBorder",
            value: function(t, e) {
                var i = this.height / this.width
                  , n = 1;
                return n = e / t > i ? e / this.height : t / this.width,
                {
                    x: 0,
                    y: 0,
                    width: this.width * n,
                    height: this.height * n,
                    scaleX: n,
                    scaleY: n,
                    rotation: 0
                }
            }
        }, {
            key: "_noScale",
            value: function() {
                return {
                    x: 0,
                    y: 0,
                    width: this.width,
                    height: this.height,
                    scaleX: 1,
                    scaleY: 1,
                    rotation: 0
                }
            }
        }, {
            key: "_showAll",
            value: function(t, e) {
                var i = this.height / this.width
                  , n = 1;
                return n = e / t > i ? t / this.width : e / this.height,
                {
                    x: 0,
                    y: 0,
                    width: this.width * n,
                    height: this.height * n,
                    scaleX: n,
                    scaleY: n,
                    rotation: 0
                }
            }
        }, {
            key: "_exactWidth",
            value: function(t) {
                var e = 1;
                return e = t / this.width,
                {
                    x: 0,
                    y: 0,
                    width: this.width * e,
                    height: this.height * e,
                    scaleX: e,
                    scaleY: e,
                    rotation: 0
                }
            }
        }, {
            key: "_exactHeight",
            value: function(t, e) {
                var i = 1;
                return i = e / this.height,
                {
                    x: 0,
                    y: 0,
                    width: this.width * i,
                    height: this.height * i,
                    scaleX: i,
                    scaleY: i,
                    rotation: 0
                }
            }
        }, {
            key: "update",
            value: function(t, e, i) {
                var n = "h" == this.type.toLocaleLowerCase();
                if (n)
                    if (0 != i)
                        var s = t
                          , r = e;
                    else
                        var s = e
                          , r = t;
                else if (0 == i)
                    var s = t
                      , r = e;
                else
                    var s = e
                      , r = t;
                var a, h = !1;
                switch (this.scaleMode.toLowerCase()) {
                case "exactfit":
                    a = this._exactFit(s, r);
                    break;
                case "noborder":
                    h = !0,
                    a = this._noBorder(s, r);
                    break;
                case "noscale":
                    h = !0,
                    a = this._noScale(s, r);
                    break;
                case "showall":
                    h = !0,
                    a = this._showAll(s, r);
                    break;
                case "width":
                    h = !0,
                    a = this._exactWidth(s, r);
                    break;
                case "height":
                    h = !0,
                    a = this._exactHeight(s, r);
                    break;
                default:
                    a = {
                        x: 0,
                        y: 0,
                        width: s,
                        height: r,
                        scaleX: 1,
                        scaleY: 1,
                        rotation: i
                    }
                }
                if (n)
                    switch (i) {
                    case -90:
                    case 90:
                        a.rotation = 0;
                        break;
                    default:
                        a.rotation = -90
                    }
                else
                    a.rotation = i;
                var o = -90 != a.rotation && (!n || 0 != a.rotation)
                  , u = 1 * (s - a.width)
                  , l = 1 * (r - a.height);
                if (h)
                    switch (this.align.toLowerCase()) {
                    case "l":
                        a.x = o && 0 != a.rotation ? u : 0,
                        a.y = (r - a.height) / 2;
                        break;
                    case "t":
                        a.x = (s - a.width) / 2,
                        a.y = o ? 0 : n ? 0 != a.rotation ? l : 0 : l;
                        break;
                    case "r":
                        a.x = o ? s - a.width - (0 == a.rotation ? 0 : u) : s - a.width,
                        a.y = (r - a.height) / 2;
                        break;
                    case "b":
                        a.x = (s - a.width) / 2,
                        a.y = o ? r - a.height : n ? 0 != a.rotation ? 0 : l : 0;
                        break;
                    case "lt":
                    case "tl":
                        a.x = o && 0 != a.rotation ? u : 0,
                        a.y = o ? 0 : n ? 0 != a.rotation ? l : 0 : l;
                        break;
                    case "tr":
                    case "rt":
                        a.x = o ? s - a.width - (0 == a.rotation ? 0 : u) : s - a.width,
                        a.y = o ? 0 : n ? 0 != a.rotation ? l : 0 : l;
                        break;
                    case "bl":
                    case "lb":
                        a.x = o && 0 != a.rotation ? u : 0,
                        a.y = o ? r - a.height : n ? 0 != a.rotation ? 0 : l : 0;
                        break;
                    case "br":
                    case "rb":
                        a.x = o ? s - a.width - (0 == a.rotation ? 0 : u) : s - a.width,
                        a.y = o ? r - a.height : n ? 0 != a.rotation ? 0 : l : 0;
                        break;
                    default:
                        a.x = (s - a.width) / 2,
                        a.y = (r - a.height) / 2
                    }
                if (0 != a.rotation) {
                    var c = a.x
                      , d = a.y;
                    -90 == a.rotation ? (a.x = a.scaleY * this.height + d,
                    a.y = c) : (a.y = a.scaleX * this.width + c,
                    a.x = d)
                }
                return a
            }
        }, {
            key: "type",
            set: function(t) {
                this._type = t
            },
            get: function() {
                return this._type
            }
        }, {
            key: "align",
            set: function(t) {
                this._align = t
            },
            get: function() {
                return this._align
            }
        }, {
            key: "scaleMode",
            set: function(t) {
                this._scaleMode = t
            },
            get: function() {
                return this._scaleMode
            }
        }, {
            key: "width",
            set: function(t) {
                this._width = t
            },
            get: function() {
                return this._width
            }
        }, {
            key: "height",
            set: function(t) {
                this._height = t
            },
            get: function() {
                return this._height
            }
        }]),
        t
    }();
    x.EXACT_FIT = "exactfit",
    x.NO_BORDER = "noborder",
    x.NO_SCALE = "noscale",
    x.SHOW_ALL = "showall",
    x.WIDTH = "width",
    x.HEIGHT = "height";
    var O = {
        width: 400,
        height: 400,
        scale: "exactfit",
        rotation: "auto",
        align: "",
        mode: "v"
    }
      , M = function(t, e) {
        var i = 1e4
          , n = "matrix3d(" + (e.a * i | 0) / i + "," + (e.b * i | 0) / i + ",0,0," + (e.c * i | 0) / i + "," + (e.d * i | 0) / i + ",0,0,0,0,1,0," + (e.tx + .5 | 0) + "," + (e.ty + .5 | 0) + ",0,1)";
        t.transform = t.WebkitTransform = t.OTransform = t.msTransform = n
    }
      , E = function() {
        function t(i) {
            e(this, t),
            this.matrix = new h,
            this._stage = new x(O.width,O.height),
            this.target = i
        }
        return i(t, [{
            key: "update",
            value: function(t, e, i) {
                if ("v" == this.options.rotation.toLocaleLowerCase() && (this.target.style.display = 0 != i ? "none" : "block"),
                "h" == this.options.rotation.toLocaleLowerCase() && (this.target.style.display = 0 == i ? "none" : "block"),
                "auto" == this.options.rotation.toLocaleLowerCase() && (this.target.style.display = "block"),
                "block" == this.target.style.display) {
                    var n = this._stage.update(t, e, i)
                      , s = new h;
                    s.rotate(-n.rotation),
                    s.tx = n.x,
                    s.ty = n.y,
                    s.scale(n.scaleX, n.scaleY),
                    this.matrix = s,
                    M(this.target.style, this.matrix)
                }
            }
        }, {
            key: "options",
            set: function(t) {
                this._options = t,
                this.target && (this.target.setAttribute("view-width", t.width),
                this.target.setAttribute("view-height", t.height),
                this.target.setAttribute("view-scale", t.scale),
                this.target.setAttribute("view-rotation", t.rotation),
                this.target.setAttribute("view-align", t.align),
                this.target.setAttribute("view-mode", t.mode)),
                this._stage.width = this.options.width,
                this._stage.height = this.options.height,
                this._stage.align = this.options.align,
                this._stage.scaleMode = this.options.scale,
                this._stage.type = t.mode
            },
            get: function() {
                return this._options
            }
        }, {
            key: "matrix",
            set: function(t) {
                this._matrix = t
            },
            get: function() {
                return this._matrix
            }
        }, {
            key: "parent",
            set: function(t) {
                this._parent = t
            },
            get: function() {
                return this._parent
            }
        }, {
            key: "target",
            set: function(t) {
                if (this._target = t,
                t) {
                    t.style.position = "absolute",
                    t.style.transformOrigin = t.style.WebkitTransformOrigin = t.style.msTransformOrigin = t.style.MozTransformOrigin = t.style.OTransformOrigin = "0% 0%";
                    var e = {
                        width: Number(t.getAttribute("view-width")),
                        height: Number(t.getAttribute("view-height")),
                        scale: t.getAttribute("view-scale"),
                        rotation: t.getAttribute("view-rotation"),
                        align: t.getAttribute("view-align"),
                        mode: t.getAttribute("view-mode")
                    };
                    for (var i in e)
                        e[i] || (e[i] = O[i]);
                    t.style.width = e.width + "px",
                    t.style.height = e.height + "px",
                    t.style.overflow = "hidden",
                    this.options = e
                }
            },
            get: function() {
                return this._target
            }
        }]),
        t
    }()
      , T = function(t) {
        function n() {
            e(this, n);
            var t = r(this, (n.__proto__ || Object.getPrototypeOf(n)).call(this));
            return t.init(),
            t
        }
        return s(n, t),
        i(n, [{
            key: "init",
            value: function() {
                this._list = [],
                this._orientation = window.orientation || 0,
                addEventListener("DOMContentLoaded", this._onContentLoaded.bind(this)),
                addEventListener("orientationchange", this._onOrientation.bind(this)),
                addEventListener("resize", this._onResize.bind(this))
            }
        }, {
            key: "_onOrientation",
            value: function() {
                void 0 !== window.orientation && (this._orientation = window.orientation),
                this.createTime()
            }
        }, {
            key: "_onResize",
            value: function() {
                void 0 === window.orientation && (this._orientation = window.innerWidth < window.innerHeight ? 0 : 90,
                this._onOrientation()),
                this.createTime()
            }
        }, {
            key: "_onContentLoaded",
            value: function() {
                addEventListener("DOMNodeInserted", this._onInserted.bind(this)),
                addEventListener("DOMNodeRemoved", this._onRemoved.bind(this)),
                this._onInserted({
                    target: document.body
                })
            }
        }, {
            key: "_onRemoved",
            value: function(t) {
                this._removeItem(t.target)
            }
        }, {
            key: "_onInserted",
            value: function(t) {
                this._checkNodes(t.target)
            }
        }, {
            key: "_checkNodes",
            value: function(t) {
                var e = t.childNodes;
                if (t.getAttribute) {
                    var i = t.getAttribute("view-mode");
                    if (i && !this._checkItem(t) && this._checkParent(t)) {
                        try {
                            var n = new E(t)
                        } catch (s) {}
                        this._addItem(n)
                    }
                }
                for (var r = 0; r < e.length; r++) {
                    var n = t.childNodes[r];
                    this._checkNodes(n)
                }
            }
        }, {
            key: "_checkParent",
            value: function(t) {
                var e = t.parentNode;
                return e && e != document ? e.getAttribute("view-mode") ? !1 : this._checkParent(e) : !0
            }
        }, {
            key: "_addItem",
            value: function(t) {
                this._removeItem(t),
                this._list.push(t),
                void 0 === window.orientation && (this._orientation = window.innerWidth < window.innerHeight ? 0 : 90),
                this.createTime()
            }
        }, {
            key: "_checkItem",
            value: function(t) {
                for (var e = 0; e < this._list.length; e++)
                    if (this._list[e].target == t)
                        return !0;
                return !1
            }
        }, {
            key: "_removeItem",
            value: function(t) {
                for (var e = 0; e < this._list.length; e++)
                    if (this._list[e].target == t)
                        return void this._list.slice(e, 1)
            }
        }, {
            key: "_update",
            value: function() {
                for (var t = window.innerWidth, e = window.innerHeight, i = 0; i < this._list.length; i++) {
                    var n = this._list[i];
                    n.update(t, e, this._orientation)
                }
            }
        }, {
            key: "createTime",
            value: function() {
                var t = this;
                clearTimeout(this._tid);
                var e = 0;
                this._tid = setInterval(function() {
                    t._update(),
                    e++,
                    e > 10 && clearTimeout(t._tid)
                }, 100),
                this._update()
            }
        }, {
            key: "orientation",
            get: function() {
                return this._orientation
            }
        }], [{
            key: "getInstance",
            value: function() {
                return n._instance ? n._instance : n._instance = new n
            }
        }]),
        n
    }(a);
    T._instance = null,
    T.getInstance(),
    t.clip = b,
    t.DomLayout = T
}

var enableInlineVideo = function() {
    "use strict";
    function A(A, g, I, C) {
        function e(I) {
            i = g(e, C),
            A(I - (t || I)),
            t = I
        }
        var i, t;
        return {
            start: function() {
                i || e(0)
            },
            stop: function() {
                I(i),
                i = null,
                t = 0
            }
        }
    }
    function g(g) {
        return A(g, requestAnimationFrame, cancelAnimationFrame)
    }
    function I(A, g, I) {
        function C(C) {
            (!I || I(A, g)) && C.stopImmediatePropagation()
        }
        return A.addEventListener(g, C),
        C
    }
    function C(A, g, I, C) {
        function e() {
            return I[g]
        }
        function i(A) {
            I[g] = A
        }
        C && i(A[g]),
        Object.defineProperty(A, g, {
            get: e,
            set: i
        })
    }
    function e(A, g, I) {
        I.addEventListener(g, function() {
            return A.dispatchEvent(new Event(g))
        })
    }
    function i(A, g) {
        Promise.resolve().then(function() {
            A.dispatchEvent(new Event(g))
        })
    }
    function t(A) {
        var g = new Audio;
        return e(A, "play", g),
        e(A, "playing", g),
        e(A, "pause", g),
        g.crossOrigin = A.crossOrigin,
        g.src = A.src || A.currentSrc || "data:",
        g
    }
    function n(A, g, I) {
        Date.now() > (p || 0) + 200 && (A[h] = !0,
        p = Date.now()),
        I || (A.currentTime = g),
        y[++f % 3] = 0 | 100 * g
    }
    function o(A) {
        return A.driver.currentTime >= A.video.duration
    }
    function r(A) {
        var g = this;
        g.video.readyState >= g.video.HAVE_FUTURE_DATA ? (g.hasAudio || (g.driver.currentTime = g.video.currentTime + A * g.video.playbackRate / 1e3,
        g.video.loop && o(g) && (g.driver.currentTime = 0)),
        n(g.video, g.driver.currentTime)) : g.video.networkState === g.video.NETWORK_IDLE && 0 === g.video.buffered.length && g.video.load(),
        c(g) && (delete g.video[h],
        g.video.pause(!0))
    }
    function a() {
        var A = this
          , g = A[v];
        if (A.webkitDisplayingFullscreen)
            return A[G](),
            void 0;
        if ("data:" !== g.driver.src && g.driver.src !== A.src && (n(A, 0, !0),
        g.driver.src = A.src),
        A.paused) {
            g.paused = !1,
            0 === A.buffered.length && A.load();
            var I = g.driver.play();
            I && I.catch(function(A) {
                console.warn("videoPlayer audio play():", A)
            }),
            g.updater.start(),
            g.hasAudio || (i(A, "play"),
            g.video.readyState >= g.video.HAVE_ENOUGH_DATA && i(A, "playing"))
        }
    }
    function d(A) {
        var g = this
          , I = g[v];
        I.driver.pause(),
        I.updater.stop(),
        g.webkitDisplayingFullscreen && g[b](),
        (!I.paused || A) && (I.paused = !0,
        I.hasAudio || i(g, "pause"),
        c(I) && !g.webkitDisplayingFullscreen && (g[h] = !0,
        i(g, "ended")))
    }
    function c(A) {
        var g = A.video.currentTime >= A.video.duration - .15;
        return g
    }
    function l(A, I) {
        var C = {};
        A[v] = C,
        C.paused = !0,
        C.hasAudio = I,
        C.video = A,
        C.updater = g(r.bind(C)),
        I ? C.driver = t(A) : (A.addEventListener("canplay", function() {
            A.paused || i(A, "playing")
        }),
        C.driver = {
            src: A.src || A.currentSrc || "data:",
            muted: !0,
            paused: !0,
            pause: function() {
                C.driver.paused = !0
            },
            play: function() {
                C.driver.paused = !1,
                o(C) && n(A, 0)
            },
            get ended() {
                return o(C)
            }
        }),
        A.addEventListener("emptied", function() {
            var g = !C.driver.src || "data:" === C.driver.src;
            if (C.driver.src && C.driver.src !== A.src)
                if (n(A, 0, !0),
                C.driver.src = A.src,
                g || !I && A.autoplay) {
                    var e = C.driver.play();
                    e && e.catch(function(A) {
                        console.warn("videoPlayer audio play():", A)
                    })
                } else
                    C.updater.stop()
        }, !1),
        A.addEventListener("webkitbeginfullscreen", function() {
            A.paused ? I && 0 === C.driver.buffered.length && C.driver.load() : (A.pause(),
            A[G]())
        }),
        I && (A.addEventListener("webkitendfullscreen", function() {
            C.driver.currentTime = A.currentTime
        }),
        A.addEventListener("seeking", function() {
            0 > y.indexOf(0 | 100 * A.currentTime) && (console.log("User-requested seeking"),
            C.driver.currentTime = A.currentTime)
        }))
    }
    function u(A) {
        var g = A[h];
        return delete A[h],
        !A.webkitDisplayingFullscreen && !g
    }
    function m(A) {
        var g = A[v];
        A[G] = A.play,
        A[b] = A.pause,
        A.play = a,
        A.pause = d,
        C(A, "paused", g.driver),
        C(A, "muted", g.driver, !0),
        C(A, "playbackRate", g.driver, !0),
        C(A, "ended", g.driver),
        C(A, "loop", g.driver, !0),
        I(A, "seeking", function(A) {
            return !A.webkitDisplayingFullscreen
        }),
        I(A, "seeked", function(A) {
            return !A.webkitDisplayingFullscreen
        }),
        I(A, "timeupdate", u),
        I(A, "ended", u)
    }
    function s(A, g) {
        if (void 0 === g && (g = {}),
        !A[v]) {
            if (!g.everywhere) {
                if (!Z)
                    return;
                if (!(g.iPad || g.ipad ? /iPhone|iPod|iPad/ : /iPhone|iPod/).test(navigator.userAgent))
                    return
            }
            A.pause();
            var I = A.autoplay;
            A.autoplay = !1,
            l(A, !A.muted),
            m(A),
            A.classList.add("IIV"),
            A.muted && I && (A.play(),
            A.addEventListener("playing", function C() {
                A.autoplay = !0,
                A.removeEventListener("playing", C)
            })),
            /iPhone|iPod|iPad/.test(navigator.platform) || console.warn("iphone-inline-video is not guaranteed to work in emulated environments")
        }
    }
    var p, Z = "object" == typeof document && "object-fit"in document.head.style && !matchMedia("(-webkit-video-playable-inline)").matches, v = "bfred-it:iphone-inline-video", h = "bfred-it:iphone-inline-video:event", G = "bfred-it:iphone-inline-video:nativeplay", b = "bfred-it:iphone-inline-video:nativepause", y = [], f = 0;
    return s
}();
!function(A) {
    function g(A) {
        function g() {
            x = A.loop ? A.loop : !1,
            S = A.muted ? A.muted : !1,
            T = A.leavePauseBackPlay ? A.leavePauseBackPlay : !1,
            X = A.poster ? A.poster : void 0,
            q = A.audioUrl ? A.audioUrl : void 0,
            Y = A.onStart ? A.onStart : void 0,
            k = A.onLoadedProgress ? A.onLoadedProgress : void 0,
            E = A.onLoadedComplete ? A.onLoadedComplete : void 0,
            W = A.onEnd ? A.onEnd : void 0,
            J = A.timesParam ? A.timesParam : void 0,
            N = A.onTimes ? A.onTimes : void 0,
            V = A.tryMultipleVideoPlayAtTheSameTime ? A.tryMultipleVideoPlayAtTheSameTime : !1,
            z = A.onPlaying ? A.onPlaying : void 0,
            O = A.onWaiting ? A.onWaiting : void 0,
            L = A.onError ? A.onError : void 0,
            P = A.onSeeked ? A.onSeeked : void 0,
            B = A.onSeeking ? A.onSeeking : void 0,
            ng = void 0 != A.ptt ? A.ptt : !0;
            var g = " .IIV::-webkit-media-controls-play-button,   .IIV::-webkit-media-controls-start-playback-button {  opacity: 0;    pointer-events: none;    width: 5px;}";
            i(g),
            j = A.src,
            w = A.videoElement,
            w.setAttribute("preload", "auto"),
            w.setAttribute("x-webkit-airplay", "true"),
            w.setAttribute("airplay", "allow"),
            w.setAttribute("webkit-playsinline", "true"),
            w.setAttribute("playsinline", "true"),
            e(!0),
            T && document.addEventListener("visibilitychange", I),
            w.muted = S,
            X && (w.poster = X),
            n(),
            f("init", "视频组件初始化"),
            J && 0 == J.length || f("setTimesParam", "设置时间节点")
        }
        function I() {
            switch (document.visibilityState) {
            case "hidden":
                og.paused || (Ag = og.paused,
                og.pause());
                break;
            case "visible":
                Ag || void 0 == Ag || (Ag = void 0,
                og.play())
            }
        }
        function C() {
            console.log("videoPlayer removeAllEventListener"),
            T && document.removeEventListener("visibilitychange", I),
            e(!1)
        }
        function e(A) {
            for (var g = ["canplay", "canplaythrough", "timeupdate", "ended", "abort", "durationchange", "emptied", "error", "loadeddata", "loadedmetadata", "loadstart", "pause", "play", "playing", "ratechange", "seeked", "seeking", "stalled", "suspend", "volumechange", "waiting"], I = 0; g.length > I; I++)
                A ? (w.removeEventListener(g[I], a),
                w.addEventListener(g[I], a)) : w.removeEventListener(g[I], a)
        }
        function i(A) {
            var g = document.getElementsByTagName("head")[0]
              , I = document.createElement("style")
              , C = document.createTextNode(A);
            I.type = "text/css",
            I.styleSheet ? I.styleSheet.cssText = C.nodeValue : I.appendChild(C),
            g.appendChild(I)
        }
        function t(A, g) {
            if (ng)
                try {
                    var I = document.createElement("img")
                      , C = "https://pingfore.qq.com/pingd?dm=" + A + ".hot&url=/&arg=-&hottag=" + encodeURIComponent(g) + "&hotx=9999&hoty=9999&rand=" + Math.random() + "&tgmobileshare=1";
                    I.setAttribute("src", C),
                    I.setAttribute("style", "display:none;position:fixed;left:-999999px;top:-999999px;width:0;height:0;"),
                    document.body.appendChild(I)
                } catch (e) {
                    console.log("videoPlayer sendData error!")
                }
        }
        function n() {
            !ng
        }
        function o() {
            if ($) {
                if ($ = !1,
                w.src = j,
                s(),
                p()) {
                    var A = h();
                    V ? (gg = !0,
                    enableInlineVideo(w, {
                        muted: S,
                        audioUrl: q ? q : og.src
                    })) : -1 == A || (8 >= A ? (gg = !0,
                    enableInlineVideo(w, {
                        muted: S,
                        audioUrl: q ? q : og.src
                    })) : v() || Z() || (gg = !0,
                    enableInlineVideo(w, {
                        muted: S,
                        audioUrl: q ? q : og.src
                    })))
                }
                r()
            }
        }
        function r() {
            J && J.length > 0 ? (tg = !0,
            u()) : tg = !1
        }
        function a(A) {
            if ("timeupdate" != A.type,
            !R())
                switch ("timeupdate" != A.type,
                A.type) {
                case "seeking":
                    B && B({
                        target: og,
                        id: w.id
                    });
                    break;
                case "seeked":
                    P && P({
                        target: og,
                        id: w.id
                    });
                    break;
                case "pause":
                    break;
                case "canplaythrough":
                    break;
                case "error":
                    L && L({
                        target: og,
                        id: w.id
                    });
                    break;
                case "waiting":
                    O && O({
                        target: og,
                        id: w.id
                    });
                    break;
                case "playing":
                    z && z({
                        target: og,
                        id: w.id
                    });
                    break;
                case "canplay":
                    Ig && (D(0),
                    w.pause());
                    break;
                case "timeupdate":
                    w.currentTime > 0 && m(A);
                    break;
                case "loadedmetadata":
                    break;
                case "ended":
                    f("ended", "播放完成"),
                    W && W({
                        target: og,
                        id: w.id
                    }),
                    og.loop && og.replay()
                }
        }
        function d() {
            if (!R() && J)
                for (var A = 0; J.length > A; A++)
                    J[A].trigger || l(w.currentTime, J[A].time) && (J[A].trigger = !0,
                    c(A, J),
                    N && N(J[A].name))
        }
        function c(A, g) {
            if (g && 0 != g.length)
                for (var I = 0; g.length > I; I++)
                    I != A && g[I].trigger && (g[I].trigger = !1)
        }
        function l(A, g) {
            A = (100 * A >> 0) / 100;
            var I = !1
              , C = .03;
            return g + C > A && A > g - 15 * C && (I = !0),
            I
        }
        function u() {
            tg && (requestAnimFrame(u),
            d())
        }
        function m(A) {
            Cg || ("none" == w.style.display && (w.style.display = "block"),
            G() ? "timeupdate" == A.type && Y && _ && (_ = !1,
            f("start", "开始播放"),
            Y({
                target: og,
                id: w.id
            })) : Y && _ && (_ = !1,
            f("start", "开始播放"),
            Y({
                target: og,
                id: w.id
            }),
            s()))
        }
        function s() {
            R() || (clearInterval(F),
            (E || k) && (F = setInterval(function() {
                return ig ? (clearInterval(F),
                void 0) : (w.buffered.length > 0 && (k && k({
                    target: og,
                    id: w.id,
                    progress: w.buffered.end(w.buffered.length - 1)
                }),
                w.buffered.end(w.buffered.length - 1) >= w.duration + (p() || G() ? -.5 : 0) && (E && E({
                    target: og,
                    id: w.id
                }),
                clearInterval(F))),
                void 0)
            }, 30)))
        }
        function p() {
            var A = navigator.userAgent
              , g = !!A.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
            return g
        }
        function Z() {
            var A = navigator.userAgent;
            return "MicroMessenger" == A.match(/MicroMessenger/i) ? !0 : !1
        }
        function v() {
            var A = navigator.userAgent;
            return "QQ/" == A.match(/QQ\//i) ? !0 : !1
        }
        function h() {
            var A, g = window.navigator.userAgent.toLowerCase(), I = g.match(/cpu iphone os (.*?) like mac os/);
            return window.navigator.platform.toLowerCase().indexOf("win32") >= 0 ? A = -1 : I ? A = I[1].replace(/_/g, ".") : void 0
        }
        function G() {
            var A = navigator.userAgent
              , g = A.indexOf("Android") > -1 || A.indexOf("Adr") > -1;
            return g
        }
        function b(A) {
            if (Z() && p()) {
                var g = new Date;
                console.log("videoPlayer wxbr start"),
                "object" == typeof WeixinJSBridge ? WeixinJSBridge.invoke("WeixinJSBridgeReady", {}, function() {
                    console.log("invoke videoPlayer wxbr callBack time:", (new Date).getTime() - g.getTime()),
                    A()
                }) : document.addEventListener("WeixinJSBridgeReady", function() {
                    console.log("addEventListener videoPlayer wxbr callBack time:", (new Date).getTime() - g.getTime()),
                    A()
                }, !1)
            } else
                A()
        }
        function y() {
            var A = !1
              , g = h();
            return p() && (A = -1 == g ? !1 : 8 >= g ? !1 : Z() || v() ? !0 : !1),
            A
        }
        function f(A) {
            if (ng && "function" == typeof PTTSendClick) {
                for (var g = window.location.hostname.split("."), I = window.location.pathname.split("/"), C = g.concat(I), e = "", i = 0; C.length > i; i++)
                    1 == C[i].split(".").length && "" != C[i] && (e += C[i] + "_");
                e = e.substr(0, e.length - 1),
                e = "mmd_videoPlayer." + e + "." + (A + ""),
                t("tgideas.qq.com", e)
            }
        }
        function M() {
            b(function() {
                gg ? (Q(0),
                w.play()) : G() ? (Q(1),
                w.play()) : (Q(2),
                w.load())
            }),
            f("load", "开始缓冲")
        }
        function R() {
            var A = !1;
            return (eg || ig) && (A = !0),
            A
        }
        function D() {}
        function Q() {}
        var w, j, Y, W, k, E, N, T, z, O, L, B, P, J, V, F, S, U, x, H, K, X, q, _ = !0, $ = !0, Ag = void 0, gg = !1, Ig = !0, Cg = !1, eg = !1, ig = !1, tg = !1, ng = !0, og = this, rg = "data:video/mp4;base64,AAAAGGZ0eXBtcDQyAAAAAG1wNDJtcDQxAAAFDm1vb3YAAABsbXZoZAAAAADT7sv+0+7L/gABX5AABCpoAAEAAAEAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAARgdHJhawAAAFx0a2hkAAAAAdPuy/7T7sv+AAAAAQAAAAAABCpoAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAQAAAAAAyAAAAMgAAAAAAJGVkdHMAAAAcZWxzdAAAAAAAAAABAAQqaAAAAAAAAQAAAAAD2G1kaWEAAAAgbWRoZAAAAADT7sv+0+7L/gAAdTAAAWN4FccAAAAAAEBoZGxyAAAAAAAAAAB2aWRlAAAAAAAAAAAAAAAAH01haW5jb25jZXB0IFZpZGVvIE1lZGlhIEhhbmRsZXIAAANwbWluZgAAABR2bWhkAAAAAQAAAAAAAAAAAAAAM2hkbHIAAAAAAAAAAGFsaXMAAAAAAAAAAAAAAABBbGlhcyBEYXRhIEhhbmRsZXIAAAAAJGRpbmYAAAAcZHJlZgAAAAAAAAABAAAADHVybCAAAAABAAAC/XN0YmwAAACmc3RzZAAAAAAAAAABAAAAlmF2YzEAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAMgAyAEgAAABIAAAAAAAAAAEKQVZDIENvZGluZwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY//8AAABAYXZjQwFNQB//4QApZ01AH5ZSCE8REf+AAIAAqEAAAAMAQAAADzgIALuAABBKz8Y4O0LFokABAARo63NSAAAAGHN0dHMAAAAAAAAAAQAAAFsAAAPoAAAAIHN0c3MAAAAAAAAABAAAAAEAAAAfAAAAPQAAAFsAAABnc2R0cAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHHN0c2MAAAAAAAAAAQAAAAEAAABbAAAAAQAAAYBzdHN6AAAAAAAAAAAAAABbAAAAGAAAAA4AAAAOAAAADgAAAA4AAAAOAAAADgAAAA4AAAAOAAAADgAAAA4AAAAOAAAADgAAAA4AAAAOAAAADgAAAA4AAAAOAAAADgAAAA4AAAAOAAAADgAAAA4AAAAOAAAADgAAAA4AAAAOAAAADgAAAA4AAAAOAAAAHQAAAA0AAAAOAAAADgAAAA4AAAAOAAAADgAAAA4AAAAOAAAADgAAAA4AAAAOAAAADgAAAA4AAAAOAAAADgAAAA4AAAAOAAAADgAAAA4AAAAOAAAADgAAAA4AAAAOAAAADgAAAA4AAAANAAAADQAAAA0AAAANAAAAIgAAAA4AAAAPAAAADwAAAA8AAAAPAAAADwAAAA8AAAAPAAAADwAAAA8AAAAPAAAADwAAAA8AAAAPAAAADwAAAA8AAAAPAAAADwAAAA8AAAAPAAAADwAAAA8AAAAPAAAADwAAAA8AAAAPAAAADwAAAA8AAAAPAAAAKgAAABRzdGNvAAAAAAAAAAEAACDxAAAAOnVkdGEAAAAXqVRJTQALAAAwMDowMDowMDowMAAAAA6pVFNDAAIAADMwAAAADalUU1oAAQAAMQAAG7t1dWlkvnrPy5epQuiccZmUkeOvrDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+Cjx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDExIDc5LjE1NjM4MCwgMjAxNC8wNS8wNi0yMzo0MDoxMSAgICAgICAgIj4KIDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+CiAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgIHhtbG5zOnhtcERNPSJodHRwOi8vbnMuYWRvYmUuY29tL3htcC8xLjAvRHluYW1pY01lZGlhLyIKICAgIHhtbG5zOnN0RGltPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvRGltZW5zaW9ucyMiCiAgICB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIKICAgIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiCiAgICB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIKICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgeG1wOkNyZWF0ZURhdGU9IjIwMTYtMDktMDJUMTQ6MjY6MDYrMDg6MDAiCiAgIHhtcDpNb2RpZnlEYXRlPSIyMDE2LTA5LTAyVDE0OjI2OjA2KzA4OjAwIgogICB4bXA6TWV0YWRhdGFEYXRlPSIyMDE2LTA5LTAyVDE0OjI2OjA2KzA4OjAwIgogICB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIEFmdGVyIEVmZmVjdHMgQ0MgMjAxNCAoV2luZG93cykiCiAgIHhtcERNOnZpZGVvRnJhbWVSYXRlPSIzMC4wMDAwMDAiCiAgIHhtcERNOnZpZGVvRmllbGRPcmRlcj0iUHJvZ3Jlc3NpdmUiCiAgIHhtcERNOnZpZGVvUGl4ZWxBc3BlY3RSYXRpbz0iMS8xIgogICB4bXBETTpzdGFydFRpbWVTY2FsZT0iMzAiCiAgIHhtcERNOnN0YXJ0VGltZVNhbXBsZVNpemU9IjEiCiAgIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NzQ0NGJmMjQtZDU5NS1mMDQ2LWFhYzktM2M3YWJjNzAwNzAwIgogICB4bXBNTTpEb2N1bWVudElEPSI3YTY1Mjg5Yi01YzFiLWFiOWQtZjZkZS0yNjkzMDAwMDAwMzUiCiAgIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDphMWFjZWE0Ny0wYTg2LWMxNDAtYTgyOS1lMmJjYzQ2NWU2Y2EiCiAgIGRjOmZvcm1hdD0iSC4yNjQiPgogICA8eG1wRE06ZHVyYXRpb24KICAgIHhtcERNOnZhbHVlPSIyNzMwMDAiCiAgICB4bXBETTpzY2FsZT0iMS85MDAwMCIvPgogICA8eG1wRE06c3RhcnRUaW1lY29kZQogICAgeG1wRE06dGltZUZvcm1hdD0iMzBUaW1lY29kZSIKICAgIHhtcERNOnRpbWVWYWx1ZT0iMDA6MDA6MDA6MDAiLz4KICAgPHhtcERNOnZpZGVvRnJhbWVTaXplCiAgICBzdERpbTp3PSI1MCIKICAgIHN0RGltOmg9IjUwIgogICAgc3REaW06dW5pdD0icGl4ZWwiLz4KICAgPHhtcERNOmFsdFRpbWVjb2RlCiAgICB4bXBETTp0aW1lVmFsdWU9IjAwOjAwOjAwOjAwIgogICAgeG1wRE06dGltZUZvcm1hdD0iMzBUaW1lY29kZSIvPgogICA8eG1wTU06SGlzdG9yeT4KICAgIDxyZGY6U2VxPgogICAgIDxyZGY6bGkKICAgICAgc3RFdnQ6YWN0aW9uPSJzYXZlZCIKICAgICAgc3RFdnQ6aW5zdGFuY2VJRD0iOTM1NzZjM2ItZTEwYy01ZGZmLTRmMzUtMDVlYzAwMDAwMDYyIgogICAgICBzdEV2dDp3aGVuPSIyMDE2LTA5LTAyVDE0OjI2OjA2KzA4OjAwIgogICAgICBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBBZG9iZSBNZWRpYSBFbmNvZGVyIENDIDIwMTQgKFdpbmRvd3MpIgogICAgICBzdEV2dDpjaGFuZ2VkPSIvIi8+CiAgICAgPHJkZjpsaQogICAgICBzdEV2dDphY3Rpb249ImNyZWF0ZWQiCiAgICAgIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6MmNmNDE0NGEtOWVjZi0wYTQwLTljMDEtMzRiZjU0YjRhYjc4IgogICAgICBzdEV2dDp3aGVuPSIyMDE2LTA5LTAyVDE0OjEzOjUwKzA4OjAwIgogICAgICBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBBZnRlciBFZmZlY3RzIENDIDIwMTQgKFdpbmRvd3MpIi8+CiAgICAgPHJkZjpsaQogICAgICBzdEV2dDphY3Rpb249InNhdmVkIgogICAgICBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmU3M2M3NDU4LTJhMjUtZTE0Ni05NjZiLWIyNGYyOWZmM2Q0YyIKICAgICAgc3RFdnQ6d2hlbj0iMjAxNi0wOS0wMlQxNDoxNDozOCswODowMCIKICAgICAgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgQWZ0ZXIgRWZmZWN0cyBDQyAyMDE0IChXaW5kb3dzKSIKICAgICAgc3RFdnQ6Y2hhbmdlZD0iL2NvbnRlbnQiLz4KICAgICA8cmRmOmxpCiAgICAgIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiCiAgICAgIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6OTgyMzc0NjMtNzU2NC00NzQ2LWIzMGEtZWUzMmViMGFmZTc4IgogICAgICBzdEV2dDp3aGVuPSIyMDE2LTA5LTAyVDE0OjI1OjM4KzA4OjAwIgogICAgICBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBBZnRlciBFZmZlY3RzIENDIDIwMTQgKFdpbmRvd3MpIgogICAgICBzdEV2dDpjaGFuZ2VkPSIvY29udGVudCIvPgogICAgIDxyZGY6bGkKICAgICAgc3RFdnQ6YWN0aW9uPSJzYXZlZCIKICAgICAgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo0Njc3MzFhOS02ZTFmLTI0NDQtYTljNi0zM2M3ZjUxMmU1MWUiCiAgICAgIHN0RXZ0OndoZW49IjIwMTYtMDktMDJUMTQ6MjU6MzgrMDg6MDAiCiAgICAgIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIEFmdGVyIEVmZmVjdHMgQ0MgMjAxNCAoV2luZG93cykiCiAgICAgIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4KICAgICA8cmRmOmxpCiAgICAgIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiCiAgICAgIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6YWRmNWQzMjctOTAzYS03YzRiLTg0OTItNzEzMzE5YmFiZTczIgogICAgICBzdEV2dDp3aGVuPSIyMDE2LTA5LTAyVDE0OjI2OjA2KzA4OjAwIgogICAgICBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBBZG9iZSBNZWRpYSBFbmNvZGVyIENDIDIwMTQgKFdpbmRvd3MpIgogICAgICBzdEV2dDpjaGFuZ2VkPSIvIi8+CiAgICAgPHJkZjpsaQogICAgICBzdEV2dDphY3Rpb249InNhdmVkIgogICAgICBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjc0NDRiZjI0LWQ1OTUtZjA0Ni1hYWM5LTNjN2FiYzcwMDcwMCIKICAgICAgc3RFdnQ6d2hlbj0iMjAxNi0wOS0wMlQxNDoyNjowNiswODowMCIKICAgICAgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgQWRvYmUgTWVkaWEgRW5jb2RlciBDQyAyMDE0IChXaW5kb3dzKSIKICAgICAgc3RFdnQ6Y2hhbmdlZD0iL21ldGFkYXRhIi8+CiAgICA8L3JkZjpTZXE+CiAgIDwveG1wTU06SGlzdG9yeT4KICAgPHhtcE1NOkRlcml2ZWRGcm9tCiAgICBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjNlNzEwMjgzLTVmZDMtYTc0Zi04MThmLTIwYTE3NmE0NGRjOCIKICAgIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6M2U3MTAyODMtNWZkMy1hNzRmLTgxOGYtMjBhMTc2YTQ0ZGM4IgogICAgc3RSZWY6b3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjJjZjQxNDRhLTllY2YtMGE0MC05YzAxLTM0YmY1NGI0YWI3OCIvPgogICA8eG1wTU06SW5ncmVkaWVudHM+CiAgICA8cmRmOkJhZz4KICAgICA8cmRmOmxpCiAgICAgIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Nzk3Mjc3Y2UtZjI2My02NjRkLWIyMGItZThiMjdjMzdhZmQwIgogICAgICBzdFJlZjpmcm9tUGFydD0idGltZTowZDUxMzAyNGYzMDcyMCIKICAgICAgc3RSZWY6dG9QYXJ0PSJ0aW1lOjBkNTEzMDI0ZjMwNzIwIgogICAgICBzdFJlZjptYXNrTWFya2Vycz0iTm9uZSIvPgogICAgPC9yZGY6QmFnPgogICA8L3htcE1NOkluZ3JlZGllbnRzPgogICA8eG1wTU06UGFudHJ5PgogICAgPHJkZjpCYWc+CiAgICAgPHJkZjpsaT4KICAgICAgPHJkZjpEZXNjcmlwdGlvbgogICAgICAgZGM6Zm9ybWF0PSJhcHBsaWNhdGlvbi92bmQuYWRvYmUuYWZ0ZXJlZmZlY3RzLmxheWVyIgogICAgICAgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyNDE4MTkxMS0yYmIzLWJhNGEtOTM3NC0wMDM3NThmOGZlNjEiPgogICAgICA8ZGM6dGl0bGU+CiAgICAgICA8cmRmOkFsdD4KICAgICAgICA8cmRmOmxpIHhtbDpsYW5nPSJ4LWRlZmF1bHQiPueZveiJsiDnuq/oibIgMTwvcmRmOmxpPgogICAgICAgPC9yZGY6QWx0PgogICAgICA8L2RjOnRpdGxlPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgICA8L3JkZjpsaT4KICAgICA8cmRmOmxpPgogICAgICA8cmRmOkRlc2NyaXB0aW9uCiAgICAgICBkYzpmb3JtYXQ9ImFwcGxpY2F0aW9uL3ZuZC5hZG9iZS5hZnRlcmVmZmVjdHMuY29tcCIKICAgICAgIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Nzk3Mjc3Y2UtZjI2My02NjRkLWIyMGItZThiMjdjMzdhZmQwIj4KICAgICAgPGRjOnRpdGxlPgogICAgICAgPHJkZjpBbHQ+CiAgICAgICAgPHJkZjpsaSB4bWw6bGFuZz0ieC1kZWZhdWx0Ij7lkIjmiJAgMTwvcmRmOmxpPgogICAgICAgPC9yZGY6QWx0PgogICAgICA8L2RjOnRpdGxlPgogICAgICA8eG1wTU06SW5ncmVkaWVudHM+CiAgICAgICA8cmRmOkJhZz4KICAgICAgICA8cmRmOmxpCiAgICAgICAgIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MjQxODE5MTEtMmJiMy1iYTRhLTkzNzQtMDAzNzU4ZjhmZTYxIgogICAgICAgICBzdFJlZjpmcm9tUGFydD0idGltZTowZDUxMzAyNGYzMDcyMCIKICAgICAgICAgc3RSZWY6dG9QYXJ0PSJ0aW1lOjBkNTEzMDI0ZjMwNzIwIgogICAgICAgICBzdFJlZjptYXNrTWFya2Vycz0iTm9uZSIvPgogICAgICAgPC9yZGY6QmFnPgogICAgICA8L3htcE1NOkluZ3JlZGllbnRzPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgICA8L3JkZjpsaT4KICAgIDwvcmRmOkJhZz4KICAgPC94bXBNTTpQYW50cnk+CiAgPC9yZGY6RGVzY3JpcHRpb24+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgCjw/eHBhY2tldCBlbmQ9InciPz4AAAABbWRhdAAAAAAAAAVqAAAAFGWIgEAAZW/wo/GptEeqNlQoTxdwAAAACkGaAgWxBhb/csAAAAAKQZoECUwQWW9pwAAAAApBmgYMYCCq32DAAAAACkGaCBBgIKLfXUAAAAAKQZoKFGAgot9dQAAAAApBmgwYYCCi311AAAAACkGaDhxgIKLfXUAAAAAKQZoQIGAgmt9SQAAAAApBmhIkYCCa31JAAAAACkGaFChgIJrfUkAAAAAKQZoWLGAgmt9SQAAAAApBmhgwYCCa31JAAAAACkGaGjRgIJLfT0AAAAAKQZocOGAgkt9PQAAAAApBmh48YCCS309AAAAACkGaIEBgIJLfT0AAAAAKQZoiRGAgkt9PQAAAAApBmiRIYCCS309AAAAACkGaJkxgIIrfRkAAAAAKQZooUGAgit9GQAAAAApBmipUYCCK30ZAAAAACkGaLFhgIIrfRkAAAAAKQZouXGAgit9GQAAAAApBmjBgYCCK30ZAAAAACkGaMmRgIIrfRkAAAAAKQZo0aGAgit9GQAAAAApBmjZsYCCK30ZAAAAACkGaOHBgIIrfRkAAAAAKQZo6dGAgit9GQAAAABlliIAgAC1v8Pn4E/PD50MZxGv4XHDFJCeAAAAACUGaAgWxFW8JuAAAAApBmgQJTBFW/wm4AAAACkGaBgxgIq3/CbgAAAAKQZoIEGAirf8JuAAAAApBmgoUYCKt/wm4AAAACkGaDBhgIi3/CAgAAAAKQZoOHGAiLf8ICAAAAApBmhAgYCIt/wgIAAAACkGaEiRgIi3/CAgAAAAKQZoUKGAiLf8ICAAAAApBmhYsYCIt/wgIAAAACkGaGDBgIi3/CAgAAAAKQZoaNGAiLf8ICAAAAApBmhw4YCIt/wgIAAAACkGaHjxgIi3/CAgAAAAKQZogQGAiLf8ICAAAAApBmiJEYCIt/wgIAAAACkGaJEhgIi3/CAgAAAAKQZomTGAiLf8ICAAAAApBmihQYCIt/wgIAAAACkGaKlRgIi3/CAgAAAAKQZosWGAiLf8ICAAAAApBmi5cYCIt/wgIAAAACkGaMGBgIi3/CAgAAAAKQZoyZGAiLf8ICAAAAAlBmjRoYCa3BbwAAAAJQZo2bGAmtwW8AAAACUGaOHBgJrcFvAAAAAlBmjp0YCa3BbwAAAAeZYiAMAD2//7ZB8Cl8UUcqIJOQ3/DE2r3tJgRl6JgAAAACkGaAgWxH2/zJxQAAAALQZoECUwR9v/zJxQAAAALQZoGDGAj7f/zJxQAAAALQZoIEGAj7f/zJxQAAAALQZoKFGAj7f/zJxQAAAALQZoMGGAj7f/zJxQAAAALQZoOHGAj7f/zJxQAAAALQZoQIGAj7f/zJxQAAAALQZoSJGAj7f/zJxQAAAALQZoUKGAj7f/zJxQAAAALQZoWLGAj7f/zJxQAAAALQZoYMGAj7f/zJxQAAAALQZoaNGAj7f/zJxQAAAALQZocOGAj7f/zJxQAAAALQZoePGAj7f/zJxQAAAALQZogQGAhG3/6W7YAAAALQZoiRGAhG3/6W7YAAAALQZokSGAhG3/6W7YAAAALQZomTGAhG3/6W7YAAAALQZooUGAhG3/6W7YAAAALQZoqVGAhG3/6W7YAAAALQZosWGAhG3/6W7YAAAALQZouXGAhG3/6W7YAAAALQZowYGAhG3/6W7YAAAALQZoyZGAhG3/6W7YAAAALQZo0aGAhG3/6W7YAAAALQZo2bGAhG3/6W7YAAAALQZo4cGAhG3/6W7YAAAALQZo6dGAhG3/6W7YAAAAmZYiAEAAO2/72rvzLK0cLlS4dWXuyleQHLLVQFSji5XJgAAAAAQo=";
        g(),
        Object.defineProperty(this, "isUseIphoneinlinevideo", {
            get: function() {
                return gg
            }
        }),
        Object.defineProperty(this, "muted", {
            get: function() {
                return S
            },
            set: function(A) {
                S = A,
                w.muted = S
            }
        }),
        Object.defineProperty(this, "playbackRate", {
            get: function() {
                return U
            },
            set: function(A) {
                U = A,
                w.playbackRate = U
            }
        }),
        Object.defineProperty(this, "bufferedTime", {
            get: function() {
                return w.buffered.end(0)
            }
        }),
        Object.defineProperty(this, "currentTime", {
            get: function() {
                return w.currentTime
            }
        }),
        Object.defineProperty(this, "currentTimeAndPlay", {
            set: function(A) {
                H = A,
                gg ? (D(1),
                w.pause(),
                w.currentTime = H,
                setTimeout(function() {}, 10),
                setTimeout(function() {}, 30),
                setTimeout(function() {}, 60),
                setTimeout(function() {
                    w.currentTime = H,
                    Q(5),
                    og.play()
                }, 100)) : (og.play(),
                w.currentTime = H),
                c(-1, J)
            }
        }),
        Object.defineProperty(this, "currentTimeAndPause", {
            set: function(A) {
                K = A,
                D(2),
                w.pause(),
                w.currentTime = K,
                c(-1, J)
            }
        }),
        Object.defineProperty(this, "loop", {
            get: function() {
                return x
            },
            set: function(A) {
                x = A
            }
        }),
        Object.defineProperty(this, "paused", {
            get: function() {
                return w.paused
            }
        }),
        Object.defineProperty(this, "duration", {
            get: function() {
                return w.duration
            }
        }),
        Object.defineProperty(this, "src", {
            get: function() {
                return j
            },
            set: function(A) {
                D(3),
                og.pause(),
                j = A,
                _ = !0,
                $ = !0,
                Ig = !0
            }
        }),
        Object.defineProperty(this, "visible", {
            get: function() {
                return "block" == w.style.display ? !0 : !1
            },
            set: function(A) {
                w.style.display = A ? "block" : "none"
            }
        }),
        Object.defineProperty(this, "videoElement", {
            get: function() {
                return w
            }
        }),
        Object.defineProperty(this, "timesParam", {
            get: function() {
                return J
            },
            set: function(A) {
                J = A,
                tg ? J && 0 != J.length || (tg = !1) : r()
            }
        }),
        Object.defineProperty(this, "poster", {
            get: function() {
                return w.poster
            },
            set: function(A) {
                w.poster = A
            }
        }),
        Object.defineProperty(this, "isVideoCanAutoPlay", {
            get: function() {
                return y()
            }
        }),
        this.play = function() {
            Cg = !1,
            eg = !1,
            ig = !1,
            Ig = !1,
            o(),
            b(function() {
                gg ? (Q(3),
                w.play()) : (Q(4),
                w.play())
            }),
            f("play", "播放")
        }
        ,
        this.pause = function() {
            Ig = !0,
            D(4),
            w.pause(),
            f("pause", "暂停")
        }
        ,
        this.replay = function() {
            Cg = !1,
            Ig = !1,
            eg = !1,
            ig = !1,
            c(-1, J),
            0 > w.playbackRate && (w.playbackRate = 1),
            this.currentTimeAndPlay = 0,
            f("replay", "重播")
        }
        ,
        this.load = function() {
            og.visible = !1,
            eg = !1,
            ig = !1,
            Cg = !0,
            o(),
            M(),
            f("load", "开始缓冲")
        }
        ,
        this.stopLoad = function() {
            og.visible = !1,
            ig = !0,
            w.src = "",
            $ = !0
        }
        ,
        this.activationLoad = function() {
            og.visible = !1,
            eg = !0;
            var A = og.src;
            og.src = rg,
            o(),
            $ = !0,
            og.src = A,
            M()
        }
        ,
        this.removeAllEventListeners = function() {
            C()
        }
    }
    window.requestAnimFrame = function() {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(A) {
            window.setTimeout(A, 1e3 / 60)
        }
    }(),
    A.VideoPlayer = g
}(this.MMD = this.MMD || {});

export default this.MMD