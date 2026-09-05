// The tests that shipped with the service. They pass.
// Read SPEC.md before you trust them.

const { test } = require('node:test');
const assert = require('node:assert');
const { calc } = require('../src/billing.js');

const order = (items) => ({ items });

test('small order, no discount, flat shipping', () => {
  const o = order([{ sku: 'A', qty: 2, price: 25.0 }]);
  assert.strictEqual(calc(o, null, 'EU'), 65.0);
});

test('large order gets a volume discount', () => {
  const o = order([{ sku: 'A', qty: 600, price: 2.0 }]);
  assert.strictEqual(calc(o, null, 'EU'), 1020.0);
});

test('coupon reduces the total', () => {
  const o = order([{ sku: 'A', qty: 2, price: 100.0 }]);
  assert.strictEqual(calc(o, { pct: 10 }, 'EU'), 195.0);
});

test('empty order is just shipping', () => {
  const o = order([]);
  assert.strictEqual(calc(o, null, 'EU'), 15.0);
});
