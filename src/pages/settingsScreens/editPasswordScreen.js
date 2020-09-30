import React from 'react'
import { connect } from 'react-redux'
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import CustomHeader from '../../components/CustomHeader'
import Toast from 'react-native-easy-toast'
import JSEncrypt from 'jsencrypt'
import { PUB_KEY } from '../../utils/config'
import Video from "react-native-video";
import NavigationUtil from "../../navigator/NavigationUtil";

class EditPasswordScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: <CustomHeader
        barStyle={'dark'}
        backgroundColor={'#fff'}
        title={ '修改密码' }
        goBack={ () => navigation.goBack() }/>
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      isSubmit: true,
      newPassword: '',
      confirmPassword: '',
    }
  }

  handleInputChange(key, e) {
    this.setState({
      [key]: e,
    })
  }

  handleSubmit() {
    const { loading } = this.props;
    this.input.blur();
    this.confirmInput.blur();
    let encrypt = new JSEncrypt();
    encrypt.setPublicKey(PUB_KEY);
    if(this.formValidate() && !loading.effects['common/editPassword']) {
      this.props.dispatch({
        type: 'common/editPassword',
        payload: {
          newPassword: encrypt.encrypt(this.state.newPassword),
          confirmPassword: encrypt.encrypt(this.state.confirmPassword),
        }
      }).then(res => {
        this.refs.toast.show(res.message);
        if(res.code === 1) {
          this.timer = null;
          this.timer = setTimeout(() => {
            NavigationUtil.goBack(this.props.navigation);
          },1000)
        }
      })
    }
  }

  formValidate() {
    if(this.state.newPassword.length < 6 || this.state.confirmPassword.length < 6) {
      this.refs.toast.show('密码不得小于6位');
      return false;
    }
    if(this.state.newPassword !== this.state.confirmPassword) {
      this.refs.toast.show('密码前后不统一');
      return false;
    } else {
      return true;
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    const { isSubmit } = this.state;
    return (
      <View style={ styles.container }>
        <View style={ styles.form_content }>
          <View style={ styles.form_item }>
            <TextInput
              ref={ ref => this.input = ref }
              secureTextEntry={true}
              onChangeText={ e => this.handleInputChange('newPassword', e) }
              placeholder={'请输入6-20位新密码'}
              style={ styles.form_item_input }/>
          </View>
          <View style={[styles.form_item, { borderBottomWidth: 0 }]}>
            <TextInput
              ref={ ref => this.confirmInput = ref }
              secureTextEntry={true}
              keyboardType={'numbers-and-punctuation'}
              onChangeText={ e => this.handleInputChange('confirmPassword', e) }
              placeholder={'请确认新密码'}
              maxLength={20}
              style={ styles.form_item_input } />
          </View>
        </View>
        <View style={ styles.btn_content }>
          <TouchableOpacity
            onPress={ () => this.handleSubmit() }
            activeOpacity={ isSubmit ? .2 : 1 }
            maxLength={20}
            style={[styles.btn, isSubmit ? styles.btn_enable : styles.btn_disable ]}>
            <Text style={styles.btn_text}>提交</Text>
          </TouchableOpacity>
        </View>
        <Toast ref="toast" position="center"/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form_content: {
    marginTop: 22,
    backgroundColor: '#fff',
  },
  form_item: {
    marginLeft: 16,
    marginRight: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2'
  },
  form_item_input: {
    paddingLeft: 19
  },
  btn_content: {
    marginTop: 30,
    marginLeft: 13,
    marginRight: 13,
  },
  btn: {
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn_text: {
    fontSize: 15,
    color: '#fff',
  },
  btn_enable: {
    backgroundColor: '#5BC8F7'
  },
  btn_disable: {
    backgroundColor: '#C1C1C1'
  }
});

export default connect(({ common, loading }) => ({ common, loading }))(EditPasswordScreen)
