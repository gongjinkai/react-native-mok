import React from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import CustomHeader from "../../components/CustomHeader";
import NavigationUtil from '../../navigator/NavigationUtil'

class AccountScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: <CustomHeader
                barStyle={'dark'}
                backgroundColor={'#fff'}
                title={'账号与安全'}
                goBack={ () => navigation.goBack() } />
    }
  };


  handleLogout() {
    this.props.dispatch({
      type: 'common/logout',
      callback: (code) => {
        if(code === 1) NavigationUtil.resetToAuthPage();
      }
    })
  }

  goPage(path) {
    NavigationUtil.goPage(this.props,path)
  }

  render() {
    return (
      <View style={ styles.container }>
        <View style={ styles.at_list }>
          <TouchableOpacity
            style={[styles.at_item, { borderBottomWidth: 1, borderBottomColor: '#F2F2F2' }]}
            onPress={ () => this.goPage('EditPassword') }>
            <View style={ styles.arrow_left }>
              <Text style={ styles.label }>修改密码</Text>
            </View>
            <View style={ styles.arrow_right }>
              <Image
                style={ styles.icon_back }
                source={ require('../../../assets/icons/icon-back_dark.png') } />
            </View>
          </TouchableOpacity>
          <View style={[styles.at_item]}>
            <View style={ styles.arrow_left }>
              <Text style={ styles.label }>手机号码</Text>
            </View>
            <View style={ styles.arrow_right }>
              <Image
                style={ styles.icon_back }
                source={ require('../../../assets/icons/icon-back_dark.png') } />
            </View>
          </View>
        </View>
        <View style={[styles.at_list, { marginTop: 12 }]}>
          <View style={[styles.at_item, { borderBottomWidth: 1, borderBottomColor: '#F2F2F2' }]}>
            <Text style={[styles.label, { marginLeft: 17 }]}>第三方账号</Text>
          </View>
          <View style={[styles.at_item, { borderBottomWidth: 1, borderBottomColor: '#F2F2F2' }]}>
            <View style={ styles.arrow_left }>
              <Image style={ styles.icon_logo }  source={ require('../../../assets/icons/icon-wechat.png') } />
              <Text style={ styles.label }>微信</Text>
            </View>
            <View style={ styles.arrow_right }>
              <Image
                style={ styles.icon_back }
                source={ require('../../../assets/icons/icon-back_dark.png') } />
            </View>
          </View>
          <View style={[styles.at_item, { borderBottomWidth: 1, borderBottomColor: '#F2F2F2' }]}>
            <View style={ styles.arrow_left }>
              <Image style={ styles.icon_logo } source={ require('../../../assets/icons/icon-weibo.png') } />
              <Text style={ styles.label }>微博</Text>
            </View>
            <View style={ styles.arrow_right }>
              <Image
                style={ styles.icon_back }
                source={ require('../../../assets/icons/icon-back_dark.png') } />
            </View>
          </View>
          <View style={[styles.at_item]}>
            <View style={ styles.arrow_left }>
              <Image style={ styles.icon_logo } source={ require('../../../assets/icons/icon-qq.png') } />
              <Text style={ styles.label }>QQ</Text>
            </View>
            <View style={ styles.arrow_right }>
              <Image
                style={ styles.icon_back }
                source={ require('../../../assets/icons/icon-back_dark.png') } />
            </View>
          </View>
        </View>
        <TouchableOpacity style={ styles.bottom_btn } onPress={ () => this.handleLogout() }>
          <Text style={ styles.label }>退出登录</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  at_list: {
    backgroundColor: '#fff',
  },
  at_item: {
    marginLeft: 17,
    marginRight: 17,
    paddingTop: 18,
    paddingBottom: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon_back: {
    transform: [{rotate:'180deg'}]
  },
  icon_logo: {
    marginRight: 11,
  },
  arrow_left: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 18,
  },
  arrow_right: {
    paddingRight: 10,
  },
  label: {
    fontSize: 15,
    color: '#636D76',
    fontWeight: 'bold'
  },
  bottom_btn: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    paddingTop: 18,
    paddingBottom: 18,
    backgroundColor: '#fff'
  }
});

export default connect(({ common, loading }) => ({ common, loading }))(AccountScreen)
