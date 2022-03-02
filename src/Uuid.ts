import { UuidInterface } from './UuidInterface';
import { v4, parse, stringify, validate } from 'uuid';
import { strcmp } from './util';

/**
 * Uuid provides constants and static methods for working with and generating UUIDs
 */
export class Uuid implements UuidInterface
{
  private readonly uuid: ArrayLike<number>;

  /**
   * Creates a universally unique identifier (UUID) from an array of fields
   *
   * Unless you're making advanced use of this library to generate identifiers that deviate RFC 4122, you
   * probably do not want to instantiate a UUID directly. Use the static methods, instead:
   *
   * import { Uuid } from '@actually_connor/uuid';
   * Uuid.uuid4();
   *
   * @param {ArrayLike<number>} uuid The Array-like collection of 16 values (starting from offset) between 0-255
   */
  public constructor (uuid: ArrayLike<number>)
  {
    this.uuid = uuid;
  }

  /**
   * Returns the Array-like collection of 16 values (starting from offset) between 0-255
   *
   * @return {ArrayLike<number>}
   */
  public getUuid (): ArrayLike<number>
  {
    return this.uuid;
  }

  /**
   * Creates a UUID from the string standard representation
   *
   * @param {string} uuid A hexadecimal string
   *
   * @return {UuidInterface} A UuidInterface instance created from a hexadecimal string representation
   */
  public static fromString (uuid: string): UuidInterface
  {
    return new Uuid(parse(uuid));
  }

  /**
   * Returns the string standard representation of the UUID
   *
   * @return {string}
   */
  public toString (): string
  {
    return stringify(this.uuid);
  }

  /**
   * Returns the hexadecimal representation of the UUID
   *
   * @return {string}
   */
  public getHex (): string
  {
    return stringify(this.uuid).replace(/-/g, '').toUpperCase();
  }

  /**
   * Creates a UUID from a byte string
   *
   * @param {string} bytes A binary string
   *
   * @return {UuidInterface} A UuidInterface instance created from a binary string representation
   */
  public static fromBytes (bytes: string): UuidInterface
  {
    let result = '';

    for (let i = 0; i < bytes.length; i++) {
      result += bytes.charCodeAt(i).toString(16);

      switch (i) {
        case 3:
        case 5:
        case 7:
        case 9:
          result += '-';
          break;
      }
    }

    return new Uuid(parse(result));
  }

  /**
   * Returns the binary string representation of the UUID
   *
   * @return {string}
   */
  public getBytes (): string
  {
    let bytes = '';
    for (let i = 0; i < this.uuid.length; i++) {
      bytes += String.fromCharCode(this.uuid[i]);
    }

    return bytes.replace(' ', '');
  }

  /**
   * Returns a version 4 (random) UUID
   *
   * @return {UuidInterface} A UuidInterface instance that represents a version 4 UUID
   */
  public static uuid4 (): UuidInterface
  {
    return new Uuid(parse(v4()));
  }

  /**
   * Returns true if the provided string is a valid UUID
   *
   * @param {string} uuid A string to validate as a UUID
   *
   * @return {boolean}
   */
  public static isValid (uuid: string): boolean
  {
    return validate(uuid);
  }

  /**
   * Returns true if the UUID is equal to the provided object
   *
   * The result is true if and only if the argument is not null, is a UUID object, has the same variant, and contains
   * the same value, bit for bit, as the UUID.
   *
   * @param {object|null} other An object to test for equality with this UUID
   *
   * @return {boolean} True if the other object is equal to this UUID
   */
  public equals (other: object | null): boolean
  {
    if (!(other instanceof Uuid)) {
      return false;
    }

    return this.compareTo(other) === 0;
  }

  /**
   * Returns -1, 0, or 1 if the UUID is less than, equal to, or greater than the other UUID
   *
   * The first of two UUIDs is greater than the second if the most significant field in which the UUIDs differ
   * is greater for the first UUID.
   *
   * * Q. What's the value of being able to sort UUIDs?
   * * A. Use them as keys in a B-Tree or similar mapping.
   * @param {UuidInterface} other The UUID to compare
   *
   * @return {number} -1, 0, or 1 if the UUID is less than, equal to, or greater than the other
   */
  public compareTo (other: UuidInterface): number
  {
    const compare = strcmp(this.toString(), other.toString());

    if (compare < 0) {
      return -1;
    }

    if (compare > 0) {
      return 1;
    }

    return 0;
  }
}
