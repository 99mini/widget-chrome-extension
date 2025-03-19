import { describe, expect, it } from 'vitest';

import { deepMerge } from '@/lib/utils/object';

describe('deepMerge', () => {
  it('should merge two objects', () => {
    type FooType = {
      a: number;
      b: {
        c: number;
        d?: number;
      };
    };
    const origin: FooType = {
      a: 1,
      b: {
        c: 2,
        d: 3,
      },
    };

    const newObject: FooType = {
      a: 2,
      b: {
        c: 3,
      },
    };

    const result = deepMerge(origin, newObject);

    expect(result).toEqual({
      a: 2,
      b: {
        c: 3,
        d: 3,
      },
    });
  });
});
