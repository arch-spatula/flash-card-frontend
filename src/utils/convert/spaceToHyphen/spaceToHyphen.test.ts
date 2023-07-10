import { describe, expect, it } from 'vitest';
import { spaceToHyphen } from '.';

describe('spaceToHyphen', () => {
  it('should convert text to kebab case', () => {
    const plainText = 'Sonic Free Games';
    const kebabCase = 'sonic-free-games';

    const convertedText = spaceToHyphen(plainText);

    expect(convertedText).toBe(kebabCase);
  });

  it('should return null when param is undefined', () => {
    const param = undefined;

    const convertedText = spaceToHyphen(param);

    expect(convertedText).toBeNull();
  });
});
