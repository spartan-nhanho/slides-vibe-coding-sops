# Instructor notes — spoilers

Do not hand this out. Four bugs are seeded, plus one deliberate discussion point.

## The bugs

**1 — Tier boundary is exclusive.** `if (q > 100)` where the spec says 100 or
more. Exactly 100, 500, or 1000 units falls through to the tier below.

```js
calc({ items: [{ sku:'A', qty:100, price:1.0 }] }, null, 'EU')
// → 115.00   spec: 105.00   (100 × 0.9 + 15 shipping)
```

**2 — Free shipping uses the pre-discount subtotal.** `pre` is captured before
the discount is applied, so an order that only clears $500 *before* discounts
ships free when it should not.

```js
calc({ items: [{ sku:'A', qty:600, price:0.90 }] }, null, 'EU')
// → 459.00   spec: 474.00   (540 pre → 459 post → shipping is NOT free)
```

**3 — It mutates the caller's order.** The shipping line is pushed onto
`o.items`, so the function is not pure and the second call sees a third item.
This is the one that would cause a real incident, and the one almost nobody
finds by reading.

```js
const o = { items: [{ sku:'A', qty:2, price:25.0 }] };
calc(o, null, 'EU');   // → 65.00
calc(o, null, 'EU');   // → 80.00   same input, different answer
```

**4 — Tax is charged on shipping.** `(t + ship) * (1 + tax)` where the spec taxes
the discounted goods only.

```js
calc({ items: [{ sku:'A', qty:1, price:100.0 }] }, null, 'VN')
// → 126.50   spec: 125.00   (the extra 1.50 is 10% of the shipping line)
```

## The discussion point, not a bug

Money is dollars-as-floats throughout. On the current test data it happens to
round correctly, so no test can be written that fails today. Ask the room how
they would prove it is safe — the honest answer is that they cannot, which is
why the rule is "integer cents" rather than "round carefully."

Most models will confidently propose `Math.round(x * 100) / 100` as *the fix for
floating point*. It is not; it is the thing that has been hiding the problem.

## Running the room

Typical outcome: most pairs find bug 1 quickly (a model will often spot the
boundary), bug 4 with the spec open, and miss 2 and 3 entirely. Bug 3 is
invisible unless someone writes a test that calls `calc` twice — which nothing
in the generated test suite will ever do, because generated tests are written
from the implementation, and the implementation "works" the first time.

That is the punchline for the debrief and for checkpoint question 6.
