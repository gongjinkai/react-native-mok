import React from 'react'
import { connect } from 'react-redux'
import { View, Text, Switch, StatusBar, StyleSheet } from 'react-native'
import CustomHeader from '../../components/CustomHeader'

class PrivacyScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: (
        <CustomHeader
          barStyle={'dark'}
          backgroundColor={'#fff'}
          title={ '隐私设置' }
          goBack={ () => navigation.goBack() }/>
      )
    }
  };

  componentDidMount() {
    this.query();
  }

  query() {
    this.props.dispatch({
      type: 'common/getPrivacyState'
    })
  }

  handleInputChange(e) {
    this.props.dispatch({
      type: 'common/setPrivacyState',
      payload: {
        videoIsOpen: e ? 1: 0
      }
    })
  }

  render() {
    const { common } = this.props;
    const { videoIsOpen } = common;
    return (
      <View style={ styles.container }>
        <View style={ styles.content }>
          <View style={ styles.item }>
            <View>
              <Text style={ styles.title }>训练视频是否公开</Text>
              <Text style={ styles.sub_title }>开启后其他用户将看不到您个人主页的训练视频</Text>
            </View>
            <View>
              <Switch
                value={ videoIsOpen === 1 }
                onValueChange={ (e) => this.handleInputChange(e) }
              />
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    marginTop: 12,
    backgroundColor: '#fff'
  },
  item: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 16,
    paddingRight: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  title: {
    color: '#636D76',
    fontSize: 15,
  },
  sub_title: {
    color: '#BABFC2',
    fontSize: 12,
  }
});


export default connect(({ common, loading }) => ({ common, loading }))(PrivacyScreen)
