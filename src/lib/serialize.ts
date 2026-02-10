export function serializeFile(file: { sizeBytes: bigint } & Record<string, unknown>) {
  return {
    ...file,
    sizeBytes: file.sizeBytes.toString()
  };
}

export function serializeBigInt(value: bigint): string {
  return value.toString();
}
