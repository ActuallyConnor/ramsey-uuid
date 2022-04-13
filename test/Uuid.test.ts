import { Uuid } from '../src';
import { v4, parse } from 'uuid';
import { fromStringToBuffer } from '../src/util';

describe('Uuid', () => {
  const byteString = 'acCäügF¥ÜsÃ?4';
  const uuidString = '616343e4-fc67-46a5-98dc-73c39c873f34';
  const hexString = '616343E4FC6746A598DC73C39C873F34';

  it('Creates Uuid object from string', () => {
    const uuid = Uuid.fromString(uuidString);

    expect(uuid.getUuid()).toEqual(parse(uuidString));
  });

  it('Returns a Uuid string from Uuid object', () => {
    const uuidString = v4();
    const uuid = new Uuid(parse(uuidString));

    expect(uuid.toString()).toEqual(uuidString);
  });

  it('Creates Uuid object from byte string', () => {
    const uuid = Uuid.fromBytes(byteString);

    expect(uuid.getUuid()).toEqual(parse(uuidString));
  });

  it('Returns a Uuid byte string from Uuid object', () => {
    const uuid = new Uuid(parse(uuidString));

    expect(uuid.getBytes()).toEqual(byteString);
  });

  it('Creates a randomly generated Uuid', () => {
    const uuid = Uuid.uuid4();

    expect(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(uuid.toString())).toBeTruthy();
  });

  it('Returns a hexadecimal string', () => {
    const uuid = Uuid.fromString(uuidString);

    expect(uuid.getHex()).toEqual(hexString);
  });

  it('Validates a UUID string', () => {
    expect(Uuid.isValid(uuidString)).toBeTruthy();
  });

  it('Tests compareTo()', () => {
    // uuid1 and uuid2 are identical
    const uuid1 = Uuid.fromString('ff6f8cb0-c57d-11e1-9b21-0800200c9a66');
    const uuid2 = Uuid.fromString('ff6f8cb0-c57d-11e1-9b21-0800200c9a66');

    // The next three UUIDs are used for comparing msb and lsb in
    // the compareTo() method

    const uuid3 = Uuid.fromString('44cca71e-d13d-11e1-a959-c8bcc8a476f4');

    // msb are greater than $uuid3, lsb are equal to those in $uuid3
    const uuid4 = Uuid.fromString('44cca71e-d13d-11e2-a959-c8bcc8a476f4');

    // msb are equal to those in $uuid3, lsb are less than in $uuid3
    const uuid5 = Uuid.fromString('44cca71e-d13d-11e1-a959-c8bcc8a476f3');

    expect(uuid1.compareTo(uuid2)).toEqual(0);
    expect(uuid2.compareTo(uuid1)).toEqual(0);
    expect(uuid3.compareTo(uuid4)).toEqual(-1);
    expect(uuid4.compareTo(uuid3)).toEqual(1);
    expect(uuid5.compareTo(uuid3)).toEqual(-1);
    expect(uuid3.compareTo(uuid5)).toEqual(1);
  });

  it('Tests compareTo() returns 0 when different cases', () => {
    const uuidString = 'ff6f8cb0-c57d-11e1-9b21-0800200c9a66';
    // uuid1 and uuid2 are identical
    const uuid1 = Uuid.fromString(uuidString);
    const uuid2 = Uuid.fromString(uuidString.toUpperCase());

    expect(uuid1.compareTo(uuid2)).toEqual(0);
    expect(uuid2.compareTo(uuid1)).toEqual(0);
  });

  it('Tests equals()', () => {
    // uuid1 and uuid2 are identical
    const uuid1 = Uuid.fromString('ff6f8cb0-c57d-11e1-9b21-0800200c9a66');
    const uuid2 = Uuid.fromString('ff6f8cb0-c57d-11e1-9b21-0800200c9a66');
    const uuid3 = Uuid.uuid4();

    expect(uuid1.equals(uuid2)).toBeTruthy();
    expect(uuid1.equals(uuid3)).toBeFalsy();
    expect(uuid1.equals({})).toBeFalsy();
  });

  it('Tests equals() returns true when different cases', () => {
    const uuidString = 'ff6f8cb0-c57d-11e1-9b21-0800200c9a66';
    // uuid1 and uuid2 are identical
    const uuid1 = Uuid.fromString(uuidString);
    const uuid2 = Uuid.fromString(uuidString.toUpperCase());

    expect(uuid1.equals(uuid2)).toBeTruthy();
    expect(uuid2.equals(uuid1)).toBeTruthy();
  });

  it('Tests converts from Buffer to UUID', () => {
    const uuidString = '32379c07-fb1b-458d-b735-7e3436703a9c';
    // Convert to buffer and then create UUID object from buffer
    const uuid = Uuid.fromBuffer(fromStringToBuffer(uuidString));

    expect(uuidString).toEqual(uuid.toString());
  });

  it('Tests converts from UUID to Buffer', () => {
    const uuidString = '32379c07-fb1b-458d-b735-7e3436703a9c';
    const buffer = fromStringToBuffer(uuidString);
    const uuid = Uuid.fromString(uuidString);

    expect(buffer).toEqual(uuid.getBuffer());
  });
});
