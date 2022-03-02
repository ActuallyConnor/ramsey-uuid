import { UuidInterface } from './UuidInterface';
import { v4, parse, stringify, validate } from 'uuid';

export class Uuid implements UuidInterface
{
  private readonly uuid: ArrayLike<number>;

  public constructor (uuid: ArrayLike<number>)
  {
    this.uuid = uuid;
  }

  public getUuid (): ArrayLike<number>
  {
    return this.uuid;
  }

  public static fromString (uuid: string): UuidInterface
  {
    return new Uuid(parse(uuid));
  }

  public toString (): string
  {
    return stringify(this.uuid);
  }

  public toHex (): string
  {
    return stringify(this.uuid).replace(/-/g, '').toUpperCase();
  }

  public static fromBytes (uuid: string): UuidInterface
  {
    let result = '';

    for (let i = 0; i < uuid.length; i++) {
      result += uuid.charCodeAt(i).toString(16);

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

  public getBytes (): string
  {
    let bytes = '';
    for (let i = 0; i < this.uuid.length; i++) {
      bytes += String.fromCharCode(this.uuid[i]);
    }

    return bytes.replace(' ', '');
  }

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
}
