/**
 * Created By hasee on 2020/5/22
 */
import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs'
import NavigationUtil from '../navigator/NavigationUtil'
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import HomeRootStack from '../navigator/HomeStackNavigator'
import PlanRootStack from '../navigator/PlanStackNavigator'
import MyRootStack from '../navigator/MyStackNavigator'
import StoreRootStack from '../navigator/StoreNaivgator'
import RankRootStack from '../navigator/RankStackNavigator'
import LKNearby from '../pages/LKNearby'

const TABS = {
  LKHome: {
        screen: HomeRootStack,
        navigationOptions: {
            tabBarLabel: '首页',
            tabBarIcon:({ tintColor,focused }) => {
                return <Ionicons name={ 'ios-home' }
                                  size={26}
                                  style={{ color: tintColor  }} />
            }
        }
    },
  LKFind: {
        screen: PlanRootStack,
        navigationOptions: {
            tabBarLabel: '训练',
            tabBarIcon:({ tintColor,focused }) => {
                return <Ionicons name={ 'ios-people' }
                                 size={26}
                                 style={{ color: tintColor  }} />
            }
        }
    },
  LKNearby: {
        screen: RankRootStack,
        navigationOptions: {
            tabBarLabel: '排行',
            tabBarIcon: ({tintColor, focused}) => {
                return <Ionicons name={'ios-chatboxes'}
                                 size={26}
                                 style={{color: tintColor}}/>
            }
        }
    },
  LKMine: {
        screen: MyRootStack,
        navigationOptions: {
            tabBarLabel: '我的',
            tabBarIcon:({ tintColor,focused }) => {
                return <Ionicons name={ 'ios-person' }
                                 size={26}
                                 style={{ color: tintColor  }} />
            }
        }
    },
  Store: {
    screen: StoreRootStack,
    navigationOptions: {
      tabBarLabel: '商城',
      tabBarIcon:({ tintColor,focused }) => {
        return <MaterialIcons name={ 'shopping-basket' }
                         size={26}
                         style={{ color: tintColor  }} />
      }
    }
  }
};


class MainTabNavigator extends React.Component {
    constructor(props) {
        super(props)
    }
    _tabNavigator() {
        const { LKHome, LKFind, LKMine, LKNearby, Store } = TABS;
        const tabs = { LKHome, LKFind, LKNearby, LKMine, Store };
        if(!this.tabNavigator) {
            this.tabNavigator = createAppContainer(createBottomTabNavigator(
                tabs,
                {
                  backBehavior: false,
                  gestureEnabled: true,
                },
                {
                    tabBarComponent: props => (
                        <BottomTabBar {...props}/>
                    )
                }
            ))
        }
        return this.tabNavigator;
    }
    render() {
        NavigationUtil.navigation = this.props.navigation;
        const TabBarNavigator = this._tabNavigator();
        return <TabBarNavigator/>
    }
}

export default MainTabNavigator

