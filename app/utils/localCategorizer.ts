import { categoryRules } from './categoryRules';

export const localCategorizer = (
  description: string
): string | null => {
  const text = description.toLowerCase();

  for (const [category, keywords] of Object.entries(
    categoryRules
  )) {
    const found = keywords.some((keyword) =>
      text.includes(keyword)
    );

    if (found) {
      return category;
    }
  }

  return null;
};