import React from 'react'
import { createStackNavigator, CardStyleInterpolators } from 'react-navigation-stack'
import LoginScreen from "../pages/LoginScreen";
import PwdLoginScreen from "../pages/PwdLoginScreen"

const AuthRootStack = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: ({}) => ({
      header: null,
    })
  },
  PwdLogin: {
    screen: PwdLoginScreen,
    navigationOptions: ({}) => ({
      header: null
    })
  }
}, {
  defaultNavigationOptions : {
    cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid,
  }
});

export default AuthRootStack
