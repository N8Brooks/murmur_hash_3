# murmur_hash_3

A TypeScript implementation of unsigned 32-bit
[MurmurHash3](https://en.wikipedia.org/wiki/MurmurHash#Algorithm).

## Usage

### murmurHash3

This function provides the MurmurHash3 value for a string key.

```ts
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { murmurHash3 } from "./murmur_hash_3.ts";

const hash = murmurHash3("deno");

assertEquals(hash, 3565573943);
```

A seed can be provided with the options parameter. The default seed is 0.

```ts
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { murmurHash3 } from "./murmur_hash_3.ts";

const hash = murmurHash3("deno", { seed: 42 });

assertEquals(hash, 3140446342);
```
