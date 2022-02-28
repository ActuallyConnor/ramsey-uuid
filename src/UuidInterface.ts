export interface UuidInterface
{
  getUuid (): ArrayLike<number>;

  toString (): string;

  toHex (): string;

  getBytes (): string;
}
