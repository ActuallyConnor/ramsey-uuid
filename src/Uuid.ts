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
   * @param uuid The Array-like collection of 16 values (starting from offset) between 0-255
   */
  public constructor (uuid: ArrayLike<number>)
  {
    this.uuid = uuid;
  }

  /**
   * @inheritDoc
   */
  public getUuid (): ArrayLike<number>
  {
    return this.uuid;
  }

  /**
   *
   * @param uuid
   *
   * @return UuidInterface
   */
  public static fromString (uuid: string): UuidInterface
  {
    return new Uuid(parse(uuid));
  }

  /**
   * @inheritDoc
   */
  public toString (): string
  {
    return stringify(this.uuid);
  }

  /**
   * @inheritDoc
   */
  public getHex (): string
  {
    return stringify(this.uuid).replace(/-/g, '').toUpperCase();
  }

  /**
   * Creates a UUID from a byte string
   *
   * @param bytes A binary string
   *
   * @return UuidInterface A UuidInterface instance created from a binary string representation
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
   * @inheritDoc
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
   * @return UuidInterface A UuidInterface instance that represents a version 4 UUID
   */
  public static uuid4 (): UuidInterface
  {
    return new Uuid(parse(v4()));
  }

  /**
   * Returns true if the provided string is a valid UUID
   *
   * @param uuid A string to validate as a UUID
   *
   * @return boolean
   */
  public static isValid (uuid: string): boolean
  {
    return validate(uuid);
  }

  /**
   * @inheritDoc
   */
  public equals (other: object | null): boolean
  {
    if (!(other instanceof Uuid)) {
      return false;
    }

    return this.compareTo(other) === 0;
  }

  /**
   * @inheritDoc
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
