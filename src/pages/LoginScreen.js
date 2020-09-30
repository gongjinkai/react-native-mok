import React from 'react'
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, StatusBar } from 'react-native'
import px from '../utils/px'



class LoginScreen extends React.Component {


  goHome () {
    this.props.navigation.navigate('Main')
  }

  goToPwdScreen() {
    this.props.navigation.navigate('PwdLogin')
  }

  render() {
    return (
      <View style={ styles.container }>
        <View style={ styles.right_title }>
          <Text style={ styles.right_title_text } onPress={ () => this.goToPwdScreen() }>密码登录</Text>
        </View>
        <View style={ styles.form_content }>
          <Text style={ styles.lg_text }>手机号登录/注册</Text>
          <Text style={ styles.sm_text }>赛季挑战，等你来战</Text>
          <View style={ styles.form_item }>
            <View style={ styles.form_item_left }>
              <Text>+86</Text>
              <Image source={ require('../../assets/icons/icon-down.png') } />
            </View>
            <TextInput placeholder={'请输入手机号'} maxLength={11} />
          </View>
          <View style={ styles.form_item }>
            <TextInput placeholder={'请输入验证码'} style={ styles.form_item_left } />
            <TouchableOpacity style={ styles.btn }>
              <Text style={ styles.btn_text }>获取验证码</Text>
            </TouchableOpacity>
          </View>
          <Text style={ styles.desc }>未注册的手机号验证后自动创建账户</Text>
        </View>
        <TouchableOpacity style={ styles.btn_submit } onPress={ () => this.goHome() }>
          <Text style={ styles.btn_submit_text }>登录</Text>
        </TouchableOpacity>
        <View style={ styles.access_wrap }>
          <View style={ styles.line_font }>
            <Text style={ styles.line_font_arrow_left } />
            <Text style={ styles.line_font_text }>其他登录方式</Text>
            <Text style={ styles.line_font_arrow_right } />
          </View>
          <View style={ styles.card_columns }>
            <Image style={{  marginRight: px(72) }} source={ require('../../assets/icons/icon-wechat.png') }/>
            <Image style={{  marginRight: px(72) }} source={ require('../../assets/icons/icon-qq.png') }/>
            <Image source={ require('../../assets/icons/icon-weibo.png') }/>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  right_title: {
    paddingTop: px(24),
    paddingBottom: px(24),
    paddingRight: px(40),
    alignItems: 'flex-end'
  },
  right_title_text: {
    color: '#636D76',
    fontSize: 15,
    fontWeight: 'bold',
  },
  form_content: {
    marginTop: px(156)
  },
  lg_text: {
    paddingLeft: px(70),
    fontSize: 22,
    color: '#636D76',
    fontWeight: 'bold'
  },
  sm_text: {
    marginTop: px(4),
    marginBottom: px(56),
    paddingLeft: px(70),
    fontSize: 12,
    color: '#9C9C9C'
  },
  form_item: {
    position: 'relative',
    fontSize: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: px(70),
    borderBottomColor: '#F2F2F2',
    borderBottomWidth: 1,
  },
  form_item_left: {
    marginRight: px(46),
    flexDirection: 'row',
    alignItems: 'center'
  },
  btn: {
    position: 'absolute',
    right: px(52),
    paddingLeft: px(26),
    paddingRight: px(26),
    paddingTop: px(10),
    paddingBottom: px(10),
    borderWidth: 1,
    borderColor: '#C1C1C1',
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btn_text: {
    fontSize: 13,
    color: '#C1C1C1',
  },
  desc: {
    marginTop: px(40),
    paddingLeft: px(70),
    color: '#9C9C9C',
    fontSize: 12,
    fontWeight: 'bold'
  },
  btn_submit: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: px(146),
    marginLeft: px(34),
    marginRight: px(34),
    paddingTop: px(10),
    paddingBottom: px(10),
    height: px(80),
    backgroundColor: '#B8EAFF',
    borderRadius: 40
  },
  btn_submit_text: {
    fontSize: 15,
    color: '#fff'
  },
  access_wrap: {
    position: 'absolute',
    bottom: px(56),
    left: 0,
    right: 0,
  },
  line_font: {
    marginBottom: px(40),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  line_font_arrow_left: {
    height: px(3),
    width: px(40),
    backgroundColor: '#9C9C9C'
  },
  line_font_arrow_right: {
    height: px(3),
    width: px(40),
    backgroundColor: '#9C9C9C'
  },
  line_font_text: {
    color: '#9C9C9C',
    fontSize: px(24),
    fontWeight: 'bold',
    letterSpacing: px(2)
  },
  card_columns: {
    flexDirection: 'row',
    justifyContent: 'center'
  }
});

export default LoginScreen
