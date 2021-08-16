import {TransitionSpecs} from '@react-navigation/stack';

import Home from './Home';
import Login from './Login';
import DetailCard from './DetailCard';
import Cart from './ShoppingCart';
import Searh from './Search';

const config = {
  animation: 'timing',
  config: {
    duration: 0.1,
  },
};

const horizontalTransition = {
  header: () => null,
  gestureDirection: 'horizontal',
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec,
  },
  cardStyleInterpolator: ({current, next, layouts}: any) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
          // {
          //   // prettier-ignore
          //   rotate: current.progress.interpolate({
          //     inputRange: [0, 1],
          //     outputRange: ["60deg", "0deg"]
          //   }),
          // },
          {
            scale: next
              ? next.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 0.9],
                })
              : 1,
          },
        ],
      },
    };
  },
};

const transitionSpec = {open: config, close: config};
const options = {header: () => null, transitionSpec};

export {Home, Login, DetailCard, Cart, Searh, options, horizontalTransition};
