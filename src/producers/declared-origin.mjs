export function declaredOriginProducer(origin, text) {
  if (typeof origin !== 'string' || !origin) throw new TypeError('origin must be a non-empty string');
  return {
    producer: origin,
    payload: Buffer.from(text, 'utf8'),
  };
}
