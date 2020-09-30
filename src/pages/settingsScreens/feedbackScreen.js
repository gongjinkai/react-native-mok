import React from 'react'
import {View, Image, StyleSheet, TextInput, TouchableOpacity, Text, StatusBar} from 'react-native'
import { connect } from 'react-redux'
import Toast from 'react-native-easy-toast'
import ImagePicker from 'react-native-image-picker';
import CustomHeader from "../../components/CustomHeader";

const options = {
  title: '选择图片',
  cancelButtonTitle: '取消',
  takePhotoButtonTitle: '拍照',
  chooseFromLibraryButtonTitle: '从相册选取',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};


class FeedbackScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: (
        <CustomHeader
          barStyle={'dark'}
          backgroundColor={'#fff'}
          title={ '意见反馈' }
          goBack={ () => navigation.goBack() }/>
      )
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      content: '',
      isSubmit: false,
      phone: '',
      pics: []
    }
  }

  componentDidMount() {
    this._navDidFocusListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor('#fff')
    })
  }

  componentWillUnmount() {
    this._navDidFocusListener.remove();
  }

  handleInputChange(e) {
    if(e.length > 0) {
      this.setState({
        content: e,
        isSubmit: true,
      })
    } else {
      this.setState({
        content: e,
        isSubmit: false,
      })
    }
  }

  handlePhoneChange(e) {
    this.setState({
      phone: e,
    })
  }

  /**
   * form clear method
   */
  handleResetForm() {
    this.setState({
      content: '',
      isSubmit: false,
      phone: '',
      pics: []
    })
  }

  /**
   * 提交意见反馈
   * 类型 1.无图提交，2.有图片提交
   */

  handleSubmit() {
    if(this.state.isSubmit) {
      if(this.state.pics.length === 0) {
        this.props.dispatch({
          type: 'feedback/submit',
          payload: {
            type: 1,
            content: this.state.content,
            phone: this.state.phone,
          }
        }).then(data => {
          this.refs.toast.show(data.message);
          this.handleResetForm()
        })
      } else {
        this.props.dispatch({
          type: 'feedback/havePicSubmit',
          payload: {
            type: 1,
            content: this.state.content,
            phone: this.state.phone,
            pics: this.state.pics,
          }
        }).then(data => {
          this.refs.toast.show(data.message);
          this.handleResetForm();
        })
      }
    }
  }

  openCamera() {
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: 'file://' + response.path, fileName: response.fileName };

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({
          pics: [...this.state.pics, source],
        })
      }
    });
  }

  removePicture(data) {
    this.setState({
      pics: this.state.pics.filter(item => item.uri !== data.uri)
    })
  }

  render() {
    const { isSubmit, pics, phone } = this.state;
    return (
      <View style={ styles.container }>
        <View style={ styles.content }>
          <TextInput
            style={ styles.textarea }
            multiline={true}
            value={this.state.content}
            placeholder={'请详细描述您的问题'}
            onChangeText={ (e) => this.handleInputChange(e) } />
          <View style={ styles.picture_box }>
            <View style={{ flexDirection: 'row' }}>
              {
                pics.map((item, index) => (
                  <View>
                    <Image source={{ uri: item.uri }} key={index} style={[styles.picture, index === 0 ? { marginLeft: 10 } : { marginLeft: 0 }]}/>
                    <TouchableOpacity onPress={ () => this.removePicture(item) }
                                      style={{
                                        position: 'absolute',
                                        right: 10,
                                        top: 3,
                                      }}>
                      <Image source={ require('../../../assets/icons/icon-circle-close.png') }/>
                    </TouchableOpacity>
                  </View>
                ))
              }
            </View>
            {
              pics.length < 4 ? <TouchableOpacity
                style={ pics.length === 0 ? { marginLeft: 10 } : null }
                onPress={ () => this.openCamera() }>
                <Image source={ require('../../../assets/images/feedback-add.png') } />
              </TouchableOpacity> : null
            }
          </View>
          <TextInput
            onChangeText={ (e) => this.handlePhoneChange(e) }
            keyboardType={'numeric'}
            style={ styles.input }
            value={ phone }
            placeholder={'请输入您的手机号(选填)'} />
          <View style={ styles.tip }>
            <Text style={ styles.tip_text }>- 我们预计会在1-3个工作日内与您联系 -</Text>
          </View>
          <View style={ styles.button_container }>
            <TouchableOpacity
              onPress={ () => this.handleSubmit() }
              activeOpacity={ isSubmit ? .2 : 1 }
              style={[styles.btn, isSubmit ? styles.btn_enable : styles.btn_disable ]}>
              <Text style={styles.btn_text}>提交</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Toast ref="toast" position="center"/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    marginTop: 20,
  },
  textarea: {
    marginBottom: 20,
    height: 200,
    paddingTop: 20,
    paddingLeft: 16,
    backgroundColor: '#fff',
    textAlignVertical: 'top'
  },
  picture_box: {
    flexDirection: 'row',
    marginBottom: 22,
    backgroundColor: '#fff',
    paddingTop: 15,
    paddingBottom: 35
  },
  picture: {
    marginRight: 10,
    width: 76,
    height: 144,
  },
  input: {
    paddingLeft: 16,
    backgroundColor: '#fff'
  },
  tip: {
    marginTop: 30,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tip_text: {
    fontSize: 12,
    color: '#BABFC2'
  },
  button_container: {
    marginTop: 30,
    marginLeft: 16,
    marginRight: 16,
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


export default connect(({ feedback }) => ({ feedback }))(FeedbackScreen)
