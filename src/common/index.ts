import {ToastAndroid, Dimensions} from 'react-native';
import NavigationBarColor from '../nativeModule/navigationBarColor';

export const {width} = Dimensions.get('window');

/**
 * Calculates card prices based on status
 * @param status
 * @returns
 */
export const calculateCardPrice = (status: string) => {
  return status === 'Alive' ? 20 : status === 'Dead' ? 15 : 10;
};

/**
 * Changes the navigation bar color (android)
 * @param color
 * @param light
 */
export const changeNavigationBarColor = async (
  color: string,
  light: boolean,
): Promise<void> => {
  try {
    await NavigationBarColor.changeNavigationBarColor(color, light);
  } catch (error) {
    showToast(`${error}`);
  }
};

/**
 * Show a toast (android)
 * @param message
 */
export const showToast = (message: string): void => {
  ToastAndroid.showWithGravityAndOffset(
    `${message}`,
    ToastAndroid.SHORT,
    ToastAndroid.BOTTOM,
    0,
    100,
  );
};
