export function getCollectionData(data) {
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.content)) return data.content;

  throw new TypeError(
    "Expected an array or a paginated API response with an array content field",
  );
}
