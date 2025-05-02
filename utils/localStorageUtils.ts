export const safeLocalStorage = (operation: 'get' | 'set', key: string, value: string | null = null) => {
  try {
    if (operation === 'get') {
      return localStorage.getItem(key);
    } else if (operation === 'set' && value !== null) {
      localStorage.setItem(key, value);
      return true;
    }
    return null;
  } catch (error) {
    console.error(`localStorage ${operation} failed:`, error);
    return null;
  }
};