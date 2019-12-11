c.Spring = function(a) {
  this.defaultMagnetized = true
  var b = c.AbsoluteBackedLayout.apply(this, arguments)
  ;(a = a || {}),

    (this.defaultParameters = {
      padding: [50, 50],
      iterations: 500,
      maxRepulsiveForceDistance: 6,
      k: 2,
      c: 0.01,
      maxVertexMovement: 0.5,
      locationFunction: a.locationFunction
    })
  var d,
    e = jsPlumbUtil.merge(this.defaultParameters, a.parameters || {}),
    f = {},
    g = !1 !== a.absoluteBacked,
    h = 0,
    i = 1 / 0,
    j = -1 / 0,
    k = 1 / 0,
    l = -1 / 0,
    m = 1,
    n = 1,
    o = 0,
    p = function(a) {
      a.getNode && (a = a.getNode())
      var c = f[a.id]
      if (!c) {
        var d = b.getRandomPosition(a.id, 0.5, 0.5, !0)
        c = f[a.id] = {
          id: a.id,
          n: a,
          sp: d,
          p: [d[0], d[1]],
          f: [0, 0]
        }
      }
      return c
    },
    q = function(a, b, c) {
      ;(i = Math.min(i, b)),
        (k = Math.min(k, c)),
        (j = Math.max(j, b)),
        (l = Math.max(l, c)),
        (a.p[0] = b),
        (a.p[1] = c)
    },
    r = function(a, b) {
      if (!a.locked || !b.locked) {
        var c = b.p[0] - a.p[0],
          d = b.p[1] - a.p[1],
          f = c * c + d * d
        f < 0.01 &&
          ((c = 0.1 * Math.random() + 0.1),
          (d = 0.1 * Math.random() + 0.1),
          (f = c * c + d * d))
        var g = Math.sqrt(f)
        if (g < e.maxRepulsiveForceDistance) {
          o++
          var h = (e.k * e.k) / g,
            i = (h * c) / g,
            j = (h * d) / g
          ;(b.f[0] += b.locked ? 0 : (a.locked ? 2 : 1) * i),
            (b.f[1] += b.locked ? 0 : (a.locked ? 2 : 1) * j),
            (a.f[0] -= a.locked ? 0 : (b.locked ? 2 : 1) * i),
            (a.f[1] -= a.locked ? 0 : (b.locked ? 2 : 1) * j)
        }
      }
    },
    s = function(a, b) {
      var c = p(b.target)
      if (!a.locked || !c.locked) {
        o++
        var d = c.p[0] - a.p[0],
          f = c.p[1] - a.p[1],
          g = d * d + f * f
        g < 0.01 &&
          ((d = 0.1 * Math.random() + 0.1),
          (f = 0.1 * Math.random() + 0.1),
          (g = d * d + f * f))
        var h = Math.sqrt(g)
        h > e.maxRepulsiveForceDistance &&
          ((h = e.maxRepulsiveForceDistance), (g = h * h))
        var i = (g - e.k * e.k) / e.k
        ;(void 0 == b.weight || b.weight < 1) && (b.weight = 1),
          (i *= 0.5 * Math.log(b.weight) + 1)
        var j = (i * d) / h,
          k = (i * f) / h
        ;(c.f[0] -= c.locked ? 0 : (a.locked ? 2 : 1) * j),
          (c.f[1] -= c.locked ? 0 : (a.locked ? 2 : 1) * k),
          (a.f[0] += a.locked ? 0 : (c.locked ? 2 : 1) * j),
          (a.f[1] += a.locked ? 0 : (c.locked ? 2 : 1) * k)
      }
    },
    t = function() {
      ;(m = (b.width / (j - i)) * 0.62), (n = (b.height / (l - k)) * 0.62)
      for (var a in f) {
        var c = f[a]
        c.locked || ((c.sp = v(c.p)), b.setPosition(c.id, c.sp[0], c.sp[1], !0))
      }
    },
    u = function(a) {
      return [i + (a[0] - 0.19 * b.width) / m, k + (a[1] - 0.19 * b.height) / n]
    },
    v = function(a) {
      return [0.19 * b.width + (a[0] - i) * m, 0.19 * b.height + (a[1] - k) * n]
    }
  ;(this._nodeMoved = this._groupMoved = function(a, b, c) {
    var d = f[a]
    d && ((d.sp = [b, c]), (d.p = u(d.sp)))
  }),
    (this.forceMagnetize = function() {
      for (var a in f) f[a].locked = !1
    }),
    (this.canMagnetize = function(a) {
      return f[a] && !0 !== f[a].locked
    }),
    (this.reset = function() {
      ;(f = {}), (h = 0), (i = k = 1 / 0), (j = l = -1 / 0)
    }),
    (this._nodeRemoved = this._groupRemoved = function(a) {
      delete f[a.id]
    }),
    (this._nodeAdded = this._groupAdded = function(a, c) {
      if (c && c.position) {
        var d = p(a.node || a.group)
        d &&
          ((d.locked = !0),
          b.setPosition(d.id, c.position.left, c.position.top, !0))
      }
    }),
    (this.begin = function(a, c) {
      ;(h = 0), (d = []), Array.prototype.push.apply(d, b.adapter.getElements())
    }),
    (this.step = function(a, c) {
      var f,
        i = [],
        j = function(a) {
          return i[a]
            ? i[a]
            : (function() {
                return (i[a] = p(d[a])), i[a]
              })()
        }
      for (o = 0, f = 0; f < d.length; f++) {
        var k = j(f)
        if (g && !k.locked) {
          var l = this.getAbsolutePosition(k.n, c)
          if (
            null != l &&
            2 === l.length &&
            null != l[0] &&
            null != l[1] &&
            !isNaN(l[0]) &&
            !isNaN(l[1])
          ) {
            q(k, l[0], l[1]),
              (k.sp = k.p),
              b.setPosition(k.id, l[0], l[1], !0),
              (k.locked = !0)
            continue
          }
        }
        for (var m = f + 1; m < d.length; m++) {
          var n = j(m)
          r(k, n)
        }
        for (
          var u = b.toolkit.getAllEdgesFor(k.n).filter(function(a) {
              return b.adapter.filter(a.target)
            }),
            v = 0;
          v < u.length;
          v++
        )
          s(k, u[v])
      }
      if (0 !== o)
        for (f = 0; f < d.length; f++) {
          var w = j(f),
            x = e.c * w.f[0],
            y = e.c * w.f[1],
            z = e.maxVertexMovement
          x > z && (x = z),
            x < -z && (x = -z),
            y > z && (y = z),
            y < -z && (y = -z),
            q(w, w.p[0] + x, w.p[1] + y),
            (w.f[0] = 0),
            (w.f[1] = 0)
        }
      h++, (0 === o || h >= e.iterations) && (t(), b.setDone(!0))
    }),
    (this.end = function() {
      for (var a in f) f[a].locked = !0
    })
}

var getAbsolutePosition = function(a) {
  a = a || {}
  var b = c.AbstractLayout.apply(this, arguments),
    d = function(a) {
      return [a.data.left, a.data.top]
    },
    e = function(b, c) {
      return (a.locationFunction || d)(b)
    },
    f = function(a, c, d) {
      for (var f = b.adapter[a](), g = f.length, h = 0; h < g; h++) {
        var i = f[h],
          j = i.getFullId(),
          k = b.getPosition(j, null, null, !0)
        null == k && (k = e(i, d)), this.setPosition(j, k[0], k[1], !0)
      }
    }.bind(this)
  return (
    (this.begin = function(a, b) {
      f('getElements', a, b)
    }),
    (this._nodeAdded = function(b, c) {
      return e(b.node, a.parameters || {})
    }),
    (this._groupAdded = function(b, c) {
      return e(b.group, a.parameters || {})
    }),
    (this.getAbsolutePosition = function(a, b) {
      return e(a, b)
    }),
    (this.step = function() {
      b.setDone(!0)
    }),
    b
  )
}
