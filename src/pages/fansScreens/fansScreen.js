import React from 'react'
import { View, Text, StyleSheet, Image, StatusBar } from 'react-native'
import CustomHeader from '../../components/CustomHeader'

class FansScreen extends React.Component {

  static navigationOptions = ({navigation}) => {
    return {
      header: <CustomHeader
        barStyle={'dark'}
        backgroundColor={'#fff'}
        title={'我的粉丝'}
        goBack={ () => navigation.goBack() }/>,
    }
  };

  componentDidMount() {
    this._navDidFocusListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor('#fff');
    });
    this.query();
  }

  componentWillUnmount() {
    this._navDidFocusListener.remove();
  }

  query() {

  }

  render() {
    return (
      <View style={ styles.container }>
        <View style={ styles.empty_content }>
          <Image source={ require('../../../assets/images/icon-follow.png') }/>
          <Text style={ styles.empty_text }>您还没有粉丝</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  empty_content: {
    marginTop: 140,
    paddingLeft: 16,
    paddingRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  empty_text: {
    color: '#636D76',
    fontSize: 18,
  }
});

export default FansScreen
