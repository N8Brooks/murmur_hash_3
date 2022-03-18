import { assertStrictEquals } from "./test_deps.ts";
import { murmurHash3 } from "./mod.ts";

Deno.test("empty string", () => {
  assertStrictEquals(murmurHash3(""), 0);
});

Deno.test("a", () => {
  assertStrictEquals(murmurHash3("a"), 1009084850);
});

Deno.test("ѣ", () => {
  assertStrictEquals(murmurHash3("ѣ"), 34615146);
});

Deno.test("ab", () => {
  assertStrictEquals(murmurHash3("ab"), 2613040991);
});

Deno.test("ѣ聣", () => {
  assertStrictEquals(murmurHash3("ѣ聣"), 1127481081);
});

Deno.test("abc", () => {
  assertStrictEquals(murmurHash3("abc"), 3017643002);
});

Deno.test("ѣ聣ऩ", () => {
  assertStrictEquals(murmurHash3("ѣ聣ऩ"), 813769612);
});

Deno.test("abcd", () => {
  assertStrictEquals(murmurHash3("abcd"), 1139631978);
});

Deno.test("ѣ聣ऩŉ", () => {
  assertStrictEquals(murmurHash3("ѣ聣ऩŉ"), 1718536437);
});

Deno.test("bi gram", () => {
  assertStrictEquals(murmurHash3("bi gram"), 855602041);
});

Deno.test("hello world with seed 10", () => {
  assertStrictEquals(murmurHash3("hello world", 10), 2980371087);
});

Deno.test("deno with non 32 bit seed", () => {
  assertStrictEquals(
    murmurHash3("deno", Number.MAX_SAFE_INTEGER),
    272237713,
  );
});

Deno.test("mmh3 with negative seed", () => {
  assertStrictEquals(murmurHash3("mmh3", -10), 2930311050);
});
