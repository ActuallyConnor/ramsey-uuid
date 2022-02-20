import { UuidInterface } from './UuidInterface';
import { v4 as uuid4, parse, stringify } from 'uuid';
import ArrayLike = jasmine.ArrayLike;

export class Uuid implements UuidInterface
{
  private readonly uuid: ArrayLike<number>;

  public constructor (uuid: ArrayLike<number>)
  {
    this.uuid = uuid;
  }

  public static fromString (uuid: string): Uuid
  {
    return new Uuid(parse(uuid));
  }

  public toString (): string
  {
    return stringify(this.uuid);
  }

  public static fromBytes (uuid: string): Uuid
  {
    if (uuid.indexOf('0x') === 0) {
      uuid = uuid.substr(2).toLowerCase();
    }

    const newUuid = uuid.substr(0, 8)
      + '-'
      + uuid.substr(8, 4)
      + '-'
      + uuid.substr(12, 4)
      + '-'
      + uuid.substr(16, 4)
      + '-'
      + uuid.substr(20, 12);

    return new Uuid(parse(newUuid));
  }

  public getBytes (): string
  {
    let bytes = stringify(this.uuid);
    bytes = bytes.replace(/-/g, '').toUpperCase();
    bytes = '0x' + bytes;

    return bytes;
  }

  public static uuid4 (): Uuid
  {
    return new Uuid(parse(uuid4()));
  }
}
