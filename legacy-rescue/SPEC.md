# Quote calculation — the requirement

This is the source of truth. `src/billing.js` is what someone actually shipped.
Where they disagree, this file is right.

Derive your tests from **this document**, not from the code and not from what the
model tells you the code does. That distinction is the entire exercise.

## Inputs

```js
calc(order, coupon, region)
```

| Argument | Shape |
|---|---|
| `order`  | `{ items: [{ sku, qty, price }] }` — `price` is per unit, in dollars |
| `coupon` | `{ pct }` or `null` |
| `region` | `'VN'`, `'US'`, or anything else |

## Rules

1. **Goods subtotal** is the sum of `qty × price` over every line with `qty > 0`.
   Lines with zero or negative quantity are ignored. `null` entries are ignored.
2. **Volume discount** is chosen from the total quantity across all lines, highest
   applicable tier only:

   | Total quantity | Discount |
   |---|---|
   | 100 or more | 10% |
   | 500 or more | 15% |
   | 1000 or more | 20% |

   The thresholds are inclusive. Exactly 100 units earns the 10% tier.
3. **Coupon** applies as a percentage off, *after* the volume discount.
4. **Shipping** is a flat $15, and free when the goods subtotal **after all
   discounts** is over $500.
5. **Tax** applies to the discounted goods subtotal only. **Shipping is not taxed.**
   `VN` is 10%, `US` is 7.25%, every other region is 0%.
6. The result is rounded to cents.
7. `calc` is a pure function. It must not modify the `order` it is given, and
   calling it twice with the same order must return the same number.

## Not specified on purpose

Whether money should be dollars-as-floats at all. The current API says dollars.
Have an opinion about that by the debrief.
