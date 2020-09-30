import React from 'react'
import { createStackNavigator, CardStyleInterpolators } from 'react-navigation-stack'
import platformScreen from '../pages/PlatformScreen'
import noticeScreen from '../pages/noticeScreens/noticeScreen'
import noticeDetailScreen from '../pages/noticeScreens/noticeDetail'
import settingScreen from '../pages/settingsScreens/settings'
import feedbackScreen from '../pages/settingsScreens/feedbackScreen'
import privacyScreen from '../pages/settingsScreens/privacySetting'
import accountScreen from '../pages/settingsScreens/accountScreen'
import followScreen from '../pages/followScreens/followScreen'
import fansScreen from '../pages/fansScreens/fansScreen'
import editPasswordScreen from '../pages/settingsScreens/editPasswordScreen'
import informationScreen from '../pages/informationScreen/informationScreen'
import orderScreen from '../pages/orderScreens/orderScreen'
import orderDetailScreen from '../pages/orderScreens/orderDetailScreen'
import scanQRScreen from '../pages/scanQRScreen'
import addressScreen from '../pages/addressScreens/addressScreen'
import publishAddressScreen from '../pages/addressScreens/pubishAddressScreen'
import editAddressScreen from '../pages/addressScreens/editAddressScreen'
import contactScreen from '../pages/followScreens/contactScreen'

const MyRootStack = createStackNavigator({
  Home: platformScreen,
  Notice: noticeScreen,
  NoticeDetail: noticeDetailScreen,
  Setting: settingScreen,
  Feedback: feedbackScreen,
  Privacy: privacyScreen,
  Follow: followScreen,
  Fans: fansScreen,
  Account: accountScreen,
  EditPassword: editPasswordScreen,
  Information: informationScreen,
  Order: orderScreen,
  OrderDetail: orderDetailScreen,
  ScanQR: scanQRScreen,
  Address: addressScreen,
  PublishAddress: publishAddressScreen,
  EditAddress: editAddressScreen,
  Contact: contactScreen,
},{
  initialRouteName: 'Home',
  navigationOptions: ({ navigation }) => ({
    tabBarVisible: navigation.state.index === 0,
  }),
  defaultNavigationOptions: {
    cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid,
  }
});

export default MyRootStack
