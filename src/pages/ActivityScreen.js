import React from 'react'
import {View, Text, StatusBar} from 'react-native'
import WebView from 'react-native-webview'
import CustomHeader from '../components/CustomHeader'

class ActivityScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: '详情页',
      headerShown: false,
    }
  };

  componentDidMount() {
    this._navDidFocusListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('light-content');
      StatusBar.setBackgroundColor('#90C4ED')
    });
  }

  componentWillUnmount() {
    this._navDidFocusListener.remove();
  }

  goBack() {
    this.props.navigation.goBack()
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <CustomHeader
          title={ navigation.state.params.title }
          backgroundColor={'#90C4ED'}
          barStyle={'light'}
          goBack={ () => this.goBack() }/>
        <WebView
          source={{ uri: navigation.state.params.link }} />
        <View style={{ height: 50, backgroundColor: '#b9b9b9', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: '#fff' }}>已结束</Text>
        </View>
      </View>
    )
  }
}

export default ActivityScreen
