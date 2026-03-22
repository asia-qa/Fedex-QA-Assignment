import { NamedItem } from "@support/types/named-item";

export function sortByName<T extends NamedItem>(items: T[]): T[] {
  return [...items].sort((i1, i2) =>
    i1.name.localeCompare(i2.name, undefined, {
      sensitivity: "base",
      ignorePunctuation: true,
    }),
  );
}
