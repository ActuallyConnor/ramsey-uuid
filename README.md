<h1 align="center">@actually_connor/uuid</h1>

<p align="center">
  <strong>A JavaScript library that provides a 'ramsey/uuid'-like interface for the uuid package.</strong>
</p>

@actually_connor/uuid is a JavaScript library for generating and working with universally unique
identifiers (UUIDs). It provides a [ramsey/uuid][ramseyuuid]-like interface to the [uuid][] package that

This project adheres to a [code of conduct](CODE_OF_CONDUCT.md).
By participating in this project and its community, you are expected to
uphold this code.

## Quickstart

1. Install
```bash
npm i --save @actually_connor/uuid
```

2. Generate a UUID (ES6 module syntax)
```javascript
import { Uuid } from '@actually_connor/uuid';
const uuid = Uuid.uuid4();
```

... or using CommonJS syntax:
```javascript
const { Uuid } = require('@actually_connor/uuid');
const uuid = Uuid.uuid4();
```

## API Summary

### getUuid()

Returns the array of bytes of the UUID

|           |                                          |
| --------- | ---------------------------------------- |
| _returns_ | `Uint8Array[16]`                         |
| _throws_  | `TypeError` if `str` is not a valid UUID |

Example:
```javascript
import { Uuid } from '@actually_connor/uuid';

const uuid = Uuid.uuid4();
const byteArray = uuid.getUuid();
```

### fromString(str)

Convert a UUID string to array of bytes

|           |                                          |
| --------- | ---------------------------------------- |
| `str`     | A valid UUID `String`                    |
| _returns_ | `Uint8Array[16]`                         |
| _throws_  | `TypeError` if `str` is not a valid UUID |

Example:
```javascript
import { Uuid } from '@actually_connor/uuid';

const uuid = Uuid.fromString('6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b');
```

### toString()

Convert array of bytes to UUID string

|                |                                                                              |
| -------------- | ---------------------------------------------------------------------------- |
| _returns_      | `String`                                                                     |
| _throws_       | `TypeError` if a valid UUID string cannot be generated                       |

Example:
```javascript
import { Uuid } from '@actually_connor/uuid';

const uuid = Uuid.uuid4();
uuid.toString(); // ⇨ '6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b'
```

### toHex

Convert array of bytes to UUID hexadecimal string

|                |                                                                              |
| -------------- | ---------------------------------------------------------------------------- |
| _returns_      | `String`                                                                     |
| _throws_       | `TypeError` if a valid UUID string cannot be generated                       |

Example:
```javascript
import { Uuid } from '@actually_connor/uuid';

const uuid = Uuid.uuid4();
uuid.toHex(); // ⇨ '6EC0BD7F11C043DA975E2A8AD9EBAE0B'
```

### fromBytes(str)

Convert a UUID byte string to array of bytes

|           |                                          |
| --------- | ---------------------------------------- |
| `str`     | A valid UUID byte string `String`
| _returns_ | `Uint8Array[16]`                         |
| _throws_  | `TypeError` if `str` is not a valid UUID |

Example:
```javascript
import { Uuid } from '@actually_connor/uuid';

const uuid = Uuid.fromString('acCäügF¥ÜsÃ?4');
```

### getBytes()

Convert an array of bytes to a binary string representation of the UUID

|                |                                                                              |
| -------------- | ---------------------------------------------------------------------------- |
| _returns_      | `String`                                                                     |
| _throws_       | `TypeError` if a valid UUID string cannot be generated                       |

Example:
```javascript
import { Uuid } from '@actually_connor/uuid';

const uuid = Uuid.uuid4();
uuid.getBytes(); // ⇨ 'acCäügF¥ÜsÃ?4'
```

## Use in Database - MySQL

The recommended use for saving UUID values in the database would be to create a `BINARY(16)` column in the database.
When persisting the UUIDs you can `UNHEX` the hexadecimal representation of the UUID.

### TypeORM
```javascript
await this.model
.createQueryBuilder()
.insert()
.into(Table)
.values({
  uuid: () => `UNHEX('${Uuid.uuid4().toHex()}')`,
})
.execute();
```

### MySQL
```sql
INSERT INTO `ActivityDefinition` (`uuid`)
VALUES('UNHEX("616343E4FC6746A598DC73C39C873F34")');
```

## Contributing

Contributions are welcome! To contribute, please familiarize yourself with
[CONTRIBUTING.md](CONTRIBUTING.md).

## Copyright and License

The @actually_connor/uuid library is copyright © [Connor Smyth](https://connorsmyth.com) and
licensed for use under the MIT License (MIT). Please see [LICENSE][] for more
information.

[uuid]: https://www.npmjs.com/package/uuid
[rfc4122]: http://tools.ietf.org/html/rfc4122
[conduct]: https://github.com/ramsey/uuid/blob/main/CODE_OF_CONDUCT.md
[ramseyuuid]: https://github.com/ramsey/uuid
[npm]: https://www.npmjs.com/
[contributing.md]: https://github.com/ActuallyConnor/uuid/blob/main/CONTRIBUTING.md
[license]: https://github.com/ActuallyConnor/uuid/blob/main/LICENSE
