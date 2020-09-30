import React from 'react'
import { createStackNavigator, CardStyleInterpolators } from 'react-navigation-stack'
import StoreHomeScreen from '../pages/storeScreens/storeScreen'
import ShopDetailScreen from '../pages/storeScreens/shopDetailScreen'
import CategoryScreen from '../pages/storeScreens/categoryScreen'
import ShopCartScreen from '../pages/storeScreens/shopCartScreen'
import DeliverScreen from '../pages/storeScreens/deliverScreen'
import ConfirmOrderScreen from '../pages/storeScreens/confirmOrder'

const StoreRootStack = createStackNavigator({
  StoreHome: StoreHomeScreen,
  ShopDetail: ShopDetailScreen,
  Category: CategoryScreen,
  ShopCart: ShopCartScreen,
  Deliver: DeliverScreen,
  ConfirmOrder: ConfirmOrderScreen
}, {
  initialRouteName: 'StoreHome',
  navigationOptions: ({ navigation }) => ({
    tabBarVisible: navigation.state.index === 0,
  }),
  defaultNavigationOptions : {
    cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid,
  }
});

export default StoreRootStack
