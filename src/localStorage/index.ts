import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Get a value stored in the device.
 * @param key The value Key.
 * @returns null or the stored value.
 */
async function getStoredValue(
  key: string,
): Promise<object | string | Array<any> | null> {
  try {
    const result = await AsyncStorage.getItem(`@${key}`);
    const response = result != null ? JSON.parse(result) : null;
    return response;
  } catch (e) {
    return null;
  }
}

/**
 * Storages a value in the device.
 * @param key The key.
 * @param value The value, can be either a string, object or array.
 */
async function setValueToStorage(
  key: string,
  value: object | string | Array<any>,
): Promise<void> {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(`@${key}`, jsonValue);
  } catch (e) {
    // save error
  }
}

export {getStoredValue, setValueToStorage};
