import React from 'react'
import { createStackNavigator } from 'react-navigation-stack'
import PlanHomeScreen from '../pages/planScreens/planScreen'
import PlanDetailScreen from '../pages/planScreens/planDetailScreen'
import PlanRunningScreen from '../pages/planScreens/planRunningScreen'

const PlanRootStack = createStackNavigator({
  Home: PlanHomeScreen,
  Detail: PlanDetailScreen,
  PlanRunning: PlanRunningScreen,
},{
  initialRouteName: 'Home',
  navigationOptions: ({ navigation }) => ({
    tabBarVisible: navigation.state.index === 0,
  })
});

export default PlanRootStack
