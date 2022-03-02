/**
 * A UUID is a universally unique identifier adhering to an agreed-upon representation format and standard
 * for generation
 */
export interface UuidInterface
{
  getUuid (): ArrayLike<number>;

  compareTo (other: UuidInterface): number;

  equals (other: object | null): boolean;

  toString (): string;

  getHex (): string;

  getBytes (): string;
}
