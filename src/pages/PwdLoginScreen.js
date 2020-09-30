import React from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, StatusBar, TextInput, TouchableOpacity } from 'react-native'
import DeviceInfo from 'react-native-device-info';
import JSEncrypt from 'jsencrypt'
import px from '../utils/px'


const PUB_KEY= 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDc14bGDDOwHhO2pMnImrxDCQMVk02Hx365KssbBoYAdnawEM41JpRYCBji8vOCujINPox4Pw49ekdlbrtg2tDAzCLcNS/blc19y2V2FFhxAMzfCm1WB44JZmPvLCRLwskKaPWznpz0xOn3UzvjrfNZwiV9eKgXaN8oBjptvB8ovQIDAQAB';

class PwdLoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formContent: {
        deviceCode: '',
        password: '',
        username: ''
      }
    }
  }

  componentDidMount() {
    DeviceInfo.getDevice().then(result => {
      this.setState({
        formContent: {
          ...this.state.formContent,
          deviceCode: result,
        }
      })
    }).catch(err => {
      console.log(err.toString())
    })
  }

  handleInputChange(key, e) {
    this.setState({
      formContent: {
        ...this.state.formContent,
        [key]: e,
      }
    })
  }

  handleSubmit() {
    let encrypt = new JSEncrypt();
    encrypt.setPublicKey(PUB_KEY);
    this.props.dispatch({
      type: 'common/login',
      payload: {
        ...this.state.formContent,
        password: encrypt.encrypt(this.state.formContent.password)
      },
      callback: (code => {
        console.log(code);
        if(code === 1) {
          this.props.navigation.navigate('Main');
        }
      })
    })
  }

  goBack() {
    this.props.navigation.goBack();
  }

  render() {
    return (
      <View style={ styles.container }>
        <Text style={ styles.title } onPress={ () => this.goBack() }>免密登录</Text>
        <Text style={ styles.lg_title }>密码登录</Text>
        <Text style={ styles.sm_title }>赛季挑战，等你来战</Text>
        <TextInput
          placeholder={'请输入正确的手机号'}
          style={ styles.text_input }
          onChangeText={ e => this.handleInputChange('username', e) }/>
        <TextInput
          placeholder={'请输入密码'}
          style={ styles.text_input }
          secureTextEntry={true}
          onChangeText={ e => this.handleInputChange('password', e) } />
        <TouchableOpacity style={ styles.btn_submit } onPress={ () => this.handleSubmit() }>
          <Text style={ styles.btn_submit_text }>登录</Text>
        </TouchableOpacity>
      </View>
    )
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  title: {
    paddingTop: px(24),
    paddingBottom: px(24),
    paddingRight: px(24),
    fontSize: 15,
    color: '#636D76',
    fontWeight: 'bold',
    textAlign: 'right'
  },
  lg_title: {
    marginTop: 78,
    paddingLeft: 35,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#636D76'
  },
  sm_title: {
    marginTop: 4,
    paddingLeft: 35,
    color: '#9C9C9C',
    fontSize: 12
  },
  text_input: {
    marginLeft: 17,
    marginRight: 17,
    paddingLeft: 18,
    borderBottomWidth: 1,
    borderColor: '#F2F2F2',
    fontSize: 15
  },
  btn_submit: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 73,
    marginLeft: 17,
    marginRight: 17,
    paddingTop: 5,
    paddingBottom: 5,
    height: 40,
    backgroundColor: '#B8EAFF',
    borderRadius: 40
  },
  btn_submit_text: {
    fontSize: 15,
    color: '#fff'
  },
});

export default connect(({ common, loading }) => ({ common, loading }))(PwdLoginScreen)
