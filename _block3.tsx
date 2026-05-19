
**Data issue:** many entries use duplicate slugs like `for-product-managers` and `for-startup-founders` (dozens of times). A simple `find(p => p.slug === slug)` will always return the **first** match for those. Prefer full slugs (`{service}-for-ctos`) or fix the generator so every slug is unique.

---

## Recommended architecture

Follow the **how-to** pattern (server page + data lookup + `notFound()`):

1. **Helpers** in `persona-based.ts` (or a small `persona-based-helpers.ts` so you do not import 49k lines into a client bundle).
2. **Server** `page.tsx` — `generateStaticParams`, `generateMetadata`, load data, pass to client.
3. **Client** `PersonaBasedClient.tsx` — your existing UI, but props-driven instead of hardcoded constants.

---

## Step 1 — Add lookup helpers

Add to `src/lib/persona-based.ts` (end of file):
