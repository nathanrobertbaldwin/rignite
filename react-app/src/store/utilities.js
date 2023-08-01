export function dataNormalizer(data) {
  const normalizedData = {};
  data.forEach((object) => {
    normalizedData[object.id] = object;
  });
  return normalizedData;
}
