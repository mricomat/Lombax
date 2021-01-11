import { Route } from "@react-navigation/native";
import { StackCardStyleInterpolator, StackNavigationOptions } from "@react-navigation/stack";

export type stackOptionType =
  | StackNavigationOptions
  | ((props: { route: Route<string, object | undefined>; navigation: any }) => StackNavigationOptions);

// const transition: TransitionSpec = {
//   animation: 'spring',
//   config: { stiffness: 1000, damping: 500, mass: 3, overshootClamping: true },
// };
const cardStyleInterpolator: StackCardStyleInterpolator = ({ current }) => {
  return { containerStyle: { opacity: current.progress } };
};

const stackOptions: stackOptionType = {
  headerShown: false,
  animationTypeForReplace: "pop",
  animationEnabled: true,
  // TransitionSpecs.RevealFromBottomAndroidSpec, TransitionSpecs.FadeInFromBottomAndroidSpec,
  // transitionSpec: { open: transition, close: transition },
  cardStyleInterpolator,
};

const AnimationUtils = {
  stackOptions,
};

export default AnimationUtils;
