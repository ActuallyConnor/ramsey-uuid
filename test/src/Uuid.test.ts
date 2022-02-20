import { Uuid } from '../../src/Uuid';
import { v4 as uuid4, stringify, parse } from 'uuid';

describe('Uuid', () => {
  it('Creates Uuid object from string', () => {
    const uuid = Uuid.fromString('69755997-69c3-4bc6-b475-178d2766a651');

    expect(uuid['uuid']).toEqual(parse('69755997-69c3-4bc6-b475-178d2766a651'));
  });

  it('Returns a Uuid string from Uuid object', () => {
    const uuidString = uuid4();
    const uuid = new Uuid(parse(uuidString));

    expect(uuid.toString()).toEqual(uuidString);
  });

  it('Creates Uuid object from byte string', () => {
    const uuid = Uuid.fromBytes('0x6975599769C34BC6B475178D2766A651');

    expect(uuid['uuid']).toEqual(parse('69755997-69c3-4bc6-b475-178d2766a651'));
  });

  it('Returns a Uuid byte string from Uuid object', () => {
    const uuid = new Uuid(parse('69755997-69c3-4bc6-b475-178d2766a651'));

    expect(uuid.getBytes()).toEqual('0x6975599769C34BC6B475178D2766A651');
  });

  it('Creates a randomly generated Uuid', () => {
    const uuid = Uuid.uuid4();

    expect(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(uuid.toString())).toBeTruthy();
  });
});
