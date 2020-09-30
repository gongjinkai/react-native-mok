import React from 'react'
import { createStackNavigator, CardStyleInterpolators } from 'react-navigation-stack'
import RankScreen from '../pages/rankScreens/rankScreen'
import DynamicScreen from '../pages/DynamicScreens/dynamicScreen'

const RankRootStack = createStackNavigator({
  RankHome: RankScreen,
  Dynamic: DynamicScreen
},{
  initialRouteName: 'RankHome',
  navigationOptions: ({ navigation }) => ({
    tabBarVisible: navigation.state.index === 0,
  }),
  defaultNavigationOptions : {
    cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid,
  }
});

export default RankRootStack
