import { Uuid } from '../src';
import { v4, parse } from 'uuid';

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

    expect(uuid.toHex()).toEqual(hexString);
  });
});
