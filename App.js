import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import * as Screens from './src/screens';
import {theme, darkTheme} from './src/styles';

export const ThemeContext = React.createContext({...theme});

const Stack = createStackNavigator();

let initialScreen = 'Home';

export default function App() {
  return (
    <Provider store={store}>
      <ThemeContext.Provider value={theme}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={initialScreen}>
            <Stack.Screen
              name={'Home'}
              component={Screens.Home}
              options={Screens.options}
            />
            <Stack.Screen
              name={'Login'}
              component={Screens.Login}
              options={Screens.horizontalTransition}
            />
            <Stack.Screen
              name={'DetailCard'}
              component={Screens.DetailCard}
              options={Screens.horizontalTransition}
            />
            <Stack.Screen
              name={'ShoppingCart'}
              component={Screens.Cart}
              options={Screens.horizontalTransition}
            />
            <Stack.Screen
              name={'Search'}
              component={Screens.Searh}
              options={Screens.horizontalTransition}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeContext.Provider>
    </Provider>
  );
}
