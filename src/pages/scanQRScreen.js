import React, {Component} from 'react';
import {
  StyleSheet,
  Animated,
  View,
  Text,
  PermissionsAndroid,
  Easing,
  ImageBackground,
  StatusBar,
} from 'react-native';
import { RNCamera } from 'react-native-camera'

export default class ScanQRScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerShown: false
    }
  }
  constructor(props){
    super(props)
    this.state = {
      //中间横线动画初始值
      moveAnim: new Animated.Value(-2)
    };
    this.requestCameraPermission = this.requestCameraPermission.bind(this)
  }


  componentWillMount(){
    this.requestCameraPermission();
  }

  componentDidMount() {
    this.startAnimation();
    //监听页面路由 设置为沉浸式导航
    this._navDidFocusListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setHidden(true)
    });
    this._navDidBlurListener = this.props.navigation.addListener('didBlur', () => {
      StatusBar.setHidden(false)
    });
  }

  componentWillUnmount() {
    this._navDidFocusListener.remove();
    this._navDidBlurListener.remove();
  }

  //请求权限的方法
  async requestCameraPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: '申请摄像头权限',
          message:
            '一个很牛逼的应用想借用你的摄像头，' +
            '然后你就可以拍出酷炫的皂片啦。',
          buttonNeutral: '等会再问我',
          buttonNegative: '不行',
          buttonPositive: '好吧',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('现在你获得摄像头权限了');
      } else {
        console.log('用户并不屌你');
        this.props.navigation.goBack()
      }
    } catch (err) {
      console.warn(err);
    }
  }

  /** 相册选择 **/


  /** 扫描框动画*/
  startAnimation = () => {
    this.state.moveAnim.setValue(-2);
    Animated.sequence([
      Animated.timing(
        this.state.moveAnim,
        {
          toValue: 200,
          duration: 1500,
          easing: Easing.linear,
          useNativeDriver: true, // 添加这一行
        }
      ),
      Animated.timing(
        this.state.moveAnim,
        {
          toValue: -1,
          duration: 1500,
          easing: Easing.linear,
          useNativeDriver: true, // 添加这一行
        }
      )
    ]).start(() => this.startAnimation())

  };


  onBarCodeRead = (result) => {
    const { navigate } = this.props.navigation;
    const {data} = result; //只要拿到data就可以了
    //扫码后的操作
    console.log(data);
    alert(data)

  };
  render(){
    return(
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          autoFocus={RNCamera.Constants.AutoFocus.on}/*自动对焦*/
          style={[styles.preview,]}
          type={RNCamera.Constants.Type.back}/*切换前后摄像头 front前back后*/
          flashMode={RNCamera.Constants.FlashMode.off}/*相机闪光模式*/
          onBarCodeRead={this.onBarCodeRead}
        >
          <View style={{
            width:500,
            height:220,
            backgroundColor: 'rgba(0,0,0,0.5)',
          }} />

          <View style={[{flexDirection:'row'}]}>
            <View style={{backgroundColor: 'rgba(0,0,0,0.5)',height:200,width:200}}/>
            <ImageBackground source={require('../../assets/images/icon_scan_rect.png')} style={{width:200,height:200}}>
              <Animated.View
                useNativeDriver={true}
                style={[
                  styles.border,
                  {transform: [{translateY: this.state.moveAnim}]}
                ]}/>
            </ImageBackground>
            <View style={{backgroundColor: 'rgba(0,0,0,0.5)',height:200,width:200}}/>
          </View>
          <View style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', width: 500, alignItems: 'center'}}>
            <Text style={ styles.rectangleText }>将二维码放入框内，即可自动扫描</Text>
            <Text style={ styles.rectangleText } onPress={ () => this.takePicture() }>相册选择</Text>
          </View>
        </RNCamera>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  preview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rectangleContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  rectangle: {
    height: 200,
    width: 200,
    borderWidth: 1,
    borderColor: '#3CB371',
    backgroundColor: 'transparent',
    borderRadius:10,
  },
  rectangleText: {
    flex: 0,
    color: '#fff',
    marginTop: 10
  },
  border: {
    flex: 0,
    width: 196,
    height: 2,
    backgroundColor: '#3CB371',
    borderRadius: 50
  }
});
