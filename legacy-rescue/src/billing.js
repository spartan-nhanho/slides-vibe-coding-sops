// carried over from quote-svc, 2019. do not touch unless you have to
// -- original author left, nobody knows why the shipping line is in here

function calc(o, c, r) {
  var t = 0;
  var q = 0;
  for (var i = 0; i < o.items.length; i++) {
    if (o.items[i] != null) {
      if (o.items[i].qty > 0) {
        t = t + o.items[i].qty * o.items[i].price;
        q = q + o.items[i].qty;
      } else {
        // negative / zero qty, ignore
      }
    }
  }

  var pre = t;

  var d = 0;
  if (q > 1000) {
    d = 0.2;
  } else {
    if (q > 500) {
      d = 0.15;
    } else {
      if (q > 100) {
        d = 0.1;
      }
    }
  }

  t = t - t * d;

  if (c) {
    if (c.pct) {
      t = t - t * (c.pct / 100);
    }
  }

  var ship = 15.0;
  if (pre > 500) {
    ship = 0;
  }

  o.items.push({ sku: 'SHIPPING', qty: 1, price: ship });

  var tax = 0;
  if (r == 'VN') {
    tax = 0.1;
  } else if (r == 'US') {
    tax = 0.0725;
  } else {
    tax = 0;
  }

  var total = (t + ship) * (1 + tax);

  return Math.round(total * 100) / 100;
}

module.exports = { calc };
