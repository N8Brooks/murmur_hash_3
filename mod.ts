// https://en.wikipedia.org/wiki/MurmurHash#Algorithm

const C1 = 0xcc9e2d51;

const C2 = 0x1b873593;

const R1 = 15;

const R2 = 13;

const M = 5;

const N = 0xe6546b64;

const textEncoder = new TextEncoder();

/** Gives `m` left rotated as a 32-bit int */
const rotateLeft = (m: number, n: number): number => {
  return (m << n) | (m >>> (32 - n));
};

/** Unsigned 32-bit Murmur Hash 3 with the given uint 32-bit `seed` */
export const murmurHash3 = (key: string, seed = 0) => {
  const bytes = textEncoder.encode(key);
  let hash = seed >>> 0;

  const remainingBytes = bytes.length % 4;
  const fourByteChunks = bytes.length - remainingBytes;

  let i = 0;
  for (; i < fourByteChunks; i += 4) {
    let k = (bytes[i] & 0xff) +
      ((bytes[i + 1] & 0xff) << 8) +
      ((bytes[i + 2] & 0xff) << 16) +
      ((bytes[i + 3] & 0xff) << 24);

    k = Math.imul(k, C1);
    k = rotateLeft(k, R1);
    k = Math.imul(k, C2);

    hash ^= k;
    hash = rotateLeft(hash, R2);
    hash = Math.imul(hash, M) + N;
  }

  let k = 0;
  switch (remainingBytes) {
    case 3:
      k |= (bytes[i + 2] & 0xff) << 16;
    // deno-lint-ignore no-fallthrough
    case 2:
      k |= (bytes[i + 1] & 0xff) << 8;
    case 1:
      k |= bytes[i] & 0xff;

      k = Math.imul(k, C1);
      k = rotateLeft(k, R1);
      k = Math.imul(k, C2);

      hash ^= k;
  }

  hash ^= bytes.length;

  hash ^= hash >>> 16;
  hash = Math.imul(hash, 0x85ebca6b);
  hash ^= hash >>> 13;
  hash = Math.imul(hash, 0xc2b2ae35);
  hash ^= hash >>> 16;

  return hash >>> 0;
};
