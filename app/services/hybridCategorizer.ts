import { localCategorizer } from '../utils/localCategorizer';
import { aiCategorizer } from './aiCategorizer';

export const hybridCategorizer = async (
  description: string
): Promise<string> => {
  const localCategory =
    localCategorizer(description);

  if (localCategory) {
    return localCategory;
  }

  return await aiCategorizer(description);
};