/**
 * Created By hasee on 2020/5/22
 */
import React from 'react'
import { createStackNavigator, CardStyleInterpolators } from 'react-navigation-stack'
import LKHome from '../pages/LKHome'
import LKDetail from '../pages/LKHomeDetail'
import ScannerScreen from '../pages/ScannerScreen'
import ContactScreen from '../pages/ContactPage'
import TabScreen from '../pages/TabScreen'
import LoadScreen from '../pages/LoadScreen'
import ArticleScreen from '../pages/ArticleScreen'
import ActivityScreen from '../pages/ActivityScreen'

const HomeRootStack = createStackNavigator({
    Home: LKHome,
    detail: LKDetail,
    scanner: ScannerScreen,
    contact: ContactScreen,
    tab: {
      screen: TabScreen,
      navigationOptions: {
          header: null
      }
    },
    load: LoadScreen,
    article: ArticleScreen,
    activity: ActivityScreen
},{
    initialRouteName: 'Home',
    navigationOptions: ({ navigation }) => ({
        tabBarVisible: navigation.state.index === 0,
    }),
    defaultNavigationOptions : {
        cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid,
    }
})

export default HomeRootStack
