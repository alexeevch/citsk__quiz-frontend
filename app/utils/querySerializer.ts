type QueryPrimitive = string | number | boolean | null | undefined;

type QueryParams = Record<string, QueryPrimitive | QueryPrimitive[]>;

function serializePrimitive(value: QueryPrimitive): string | null {
  if (value === null || value === undefined) return null;
  return String(value);
}

export function serializeQuery(
  params: QueryParams
): Record<string, string | null | undefined | (string | null)[]> {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (value === undefined) return [key, undefined];
      if (value === null) return [key, null];

      if (Array.isArray(value)) {
        return [key, value.map(serializePrimitive)];
      }

      return [key, serializePrimitive(value)];
    })
  );
}

export function deserializeParam<T extends QueryPrimitive>(
  value: string | null | (string | null)[] | undefined,
  type: "string" | "number" | "boolean",
  fallback?: T
): T | undefined {
  if (value === undefined || value === null) return fallback;

  const raw = Array.isArray(value) ? value[0] : value;
  if (raw === null || raw === undefined) return fallback;

  switch (type) {
    case "number": {
      const parsed = Number(raw);
      return (isNaN(parsed) ? fallback : parsed) as T;
    }
    case "boolean":
      return (raw === "true" ? true : raw === "false" ? false : fallback) as T;
    case "string":
      return (raw || fallback) as T;
  }
}

export function deserializeArrayParam<T extends "string" | "number">(
  value: string | null | (string | null)[] | undefined,
  type: T
): (T extends "number" ? number : string)[] {
  if (!value) return [];
  const arr = Array.isArray(value) ? value : [value];

  return arr
    .map((v) => deserializeParam(v, type))
    .filter((v): v is NonNullable<typeof v> => v !== undefined) as any;
}
