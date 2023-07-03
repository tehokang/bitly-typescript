# Bitly client with typescript

This Bitly client is working on nodejs or typescript including an example to verify functionalities of bitly client through http request. Especially a "Bitlinks" section in official document of bitly developer is implemented.

## Example

Once you clone this repository, then run an example as following,

```bash
> ts-node src/examples/example.ts
-- Coordinator ---------------------
 1. shorten
 2. create a bitlink
 3. delete a bitlink
 4. update a bitlink
 5. retrieve a bitlink
 6. get a clicks for a bitlink
 7. create a QR code
 8. retrieve a QR code
 9. update a QR code
10. expand a bitlink
11. get metrics for a bitlink by country (payment required)
12. retrieve bitlinks by group
13. retrieve bitlinks by group
99. Exit
---------------------------------------------------
```

You can see the tests and how they work. You should prepare ".env" hidden file to get your bitly access token.
The hidden file looks like following. Basically all of functionalities will be included in Bitly class.

```bash
GROUP_ID=xxxxxxxxxxx
ACCESS_TOKEN=asljksahdfheqiuwfhefhwekfjhweffskjhdfui1
```

## Installation

This package already published on npmjs with name like bitly-typescript, hope you just enjoy with this.

```bash
yarn add bitly-typescript @types/bitly-typescript
```

## API Document

Please refer to [official bitly document](https://dev.bitly.com/api-reference/)

Please refer to [official bitly postman workspace](https://www.postman.com/bitlyapi/workspace/bitly-api-workspace/documentation/20572866-27e51401-3a30-488c-9fe3-f0610ec26969)
