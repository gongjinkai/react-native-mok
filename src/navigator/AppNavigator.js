/**
 * Created By hasee on 2020/5/22
 */
import { createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack';
import AuthNavigator from '../navigator/AuthNavigator'
import MainTabNavigator from '../navigator/MainTabNavigator'
import WelcomePage from '../pages/WelcomePage'
import GuidePage from '../pages/GuidePage'

const WelcomeNavigator = createStackNavigator({
    WelcomePage: {
        screen: WelcomePage,
        navigationOptions: {
            header: null
        }
    }
});

const MainNavigator = createStackNavigator(
  {
    Main: {
        screen: MainTabNavigator,
        navigationOptions: ({ }) => ({
            header: null,
        })
    },
  });

const GuideNavigator = createStackNavigator({
  Guide: {
    screen: GuidePage,
    navigationOptions: ({}) => ({
      header: null,
    })
  }
});

const RootNavigator = createSwitchNavigator({
  Main: MainNavigator,
  Init: WelcomeNavigator,
  Guide: GuideNavigator,
  Auth: AuthNavigator
});



export default RootNavigator
