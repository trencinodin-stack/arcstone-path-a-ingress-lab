export function fixtureProducer(text) {
  return {
    producer: 'fixture',
    payload: Buffer.from(text, 'utf8'),
  };
}
