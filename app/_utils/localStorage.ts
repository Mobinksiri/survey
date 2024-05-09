export function getFromLocalStorage<T>(key: string): T | null {
  try {
    const item = localStorage.getItem(key);
    // Parse the stored JSON data, if any
    return item ? JSON.parse(item) : null;
  } catch (error) {
    // Handle potential errors, e.g., if the data is not valid JSON
    console.error('Error getting data from local storage:', error);
    return null;
  }
}

export function setToLocalStorage<T>(key: string, data: T): void {
  try {
    // Stringify the data to store it as JSON
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    // Handle potential errors, e.g., if local storage is full
    console.error('Error setting data in local storage:', error);
  }
}

export function removeFromLocalStorage(key: string) {
  localStorage.removeItem(key);
}
