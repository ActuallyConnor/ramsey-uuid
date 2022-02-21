import { Uuid } from '../../src/Uuid';
import { v4 as uuid4, parse } from 'uuid';

describe('Uuid', () => {
  const byteString = 'iuYiÃKÆ´u\'f¦Q';
  const hexString = '69755997-69c3-4bc6-b475-178d2766a651';

  it('Creates Uuid object from string', () => {
    const uuid = Uuid.fromString(hexString);

    expect(uuid.getUuid()).toEqual(parse(hexString));
  });

  it('Returns a Uuid string from Uuid object', () => {
    const uuidString = uuid4();
    const uuid = new Uuid(parse(uuidString));

    expect(uuid.toString()).toEqual(uuidString);
  });

  it('Creates Uuid object from byte string', () => {
    const uuid = Uuid.fromBytes(byteString);

    expect(uuid.getUuid()).toEqual(parse(hexString));
  });

  it('Returns a Uuid byte string from Uuid object', () => {
    const uuid = new Uuid(parse(hexString));

    expect(uuid.getBytes()).toEqual(byteString);
  });

  it('Creates a randomly generated Uuid', () => {
    const uuid = Uuid.uuid4();

    expect(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(uuid.toString())).toBeTruthy();
  });
});
