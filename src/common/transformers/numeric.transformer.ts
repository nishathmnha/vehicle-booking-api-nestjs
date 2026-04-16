export const numericTransformer = {
  to: (value?: number): number | null => value ?? null,
  from: (value?: string | number): number | null => {
    if (value === undefined || value === null) {
      return null;
    }

    return Number(value);
  },
};

