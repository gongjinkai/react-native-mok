import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  Alert,
  Vibration,
  Dimensions,
  Platform,
  PermissionsAndroid,
  TouchableOpacity,
} from 'react-native';
import { RNCamera } from 'react-native-camera';

export default class ScannerScreen extends React.Component {

  static navigationOptions = {
    title: 'Scanner',
  };

  constructor(props) {
    super(props);
    this.state = {
      show:true,
      animation: new Animated.Value(0),
    };
  }

  componentDidMount() {
    this.requestPermission();
    //this.checkPermission()
  }

  componentWillUnmount(){
    this.setState({
      show: false
    })
  }

  async requestPermission() {
    try {
      const permissions = [
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.VIBRATE
      ]
      const granteds = await PermissionsAndroid.requestMultiple(permissions)
      console.log(granteds);
    } catch (err) {
      console.log(err.toString())
    }
  }

  checkPermission() {
    // try {
    //   //返回Promise类型
    //   const granted = PermissionsAndroid.check(
    //     PermissionsAndroid.PERMISSIONS.CAMERA
    //   )
    //   granted.then((data)=>{
    //     console.log(typeof data);
    //     console.log("是否获得相机权限"+data)
    //   }).catch((err)=>{
    //     console.log(err.toString())
    //   })
    // } catch (err) {
    //   console.log(err.toString())
    // }
  }

  startAnimation(){
    if(this.state.show){
      this.state.animation.setValue(0);
      Animated.timing(this.state.animation,{
        toValue:1,
        duration:1500,
        easing:Easing.linear,
      }).start(()=>this.startAnimation());
    }
  }

  barcodeReceived(e) {
    if (this.state.show) {
      this.state.show = false;
      if (e) {
        Vibration.vibrate([0, 500], false);
        let result = e.data;
        Alert.alert(
          '扫描成功',
          '扫描结果：' + result,
          [
            {
              text: '确定', onPress: () => {
                this.setState({
                  show: true
                })
              }
            }
          ],
          {cancelable: false}
        )
      } else {
        Alert.alert(
          '提示',
          '扫描失败，请将手机对准二维码重新尝试',
          [
            {
              text: '确定', onPress: () => {
                this.setState({
                  show: true
                })
              }
            }
          ],
          {cancelable: false}
        )
      }
    }
  }


  render() {
    let scanView = null;
    if (Platform.OS === 'ios') {
      scanView = (
        <RNCamera
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
          flashMode={RNCamera.Constants.FlashMode.auto}
          onBarCodeRead={(e) => this.barcodeReceived(e)}
        >
          <View style = {{height: (height-264)/3, width:width, backgroundColor:'rgba(0,0,0,0.5)',}}>
          </View>
          <View style={{flexDirection:'row'}}>
            <View style={styles.itemStyle}/>
            <View style={styles.rectangle}>
              <Animated.View style={[styles.animatedStyle, {
                transform: [{
                  translateY: this.state.animation.interpolate({
                    inputRange: [0,1],
                    outputRange: [0,200]
                  })
                }]
              }]}>
              </Animated.View>
            </View>
            <View style={styles.itemStyle}/>
          </View>
          <View style={{flex:1,backgroundColor:'rgba(0, 0, 0, 0.5)',width:width,alignItems:'center'}}>
            <Text style={styles.textStyle}>将二维码放入框内，即可自动扫描</Text>
          </View>
        </RNCamera>
      )
    } else {
      scanView = (
        <RNCamera
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          googleVisionBarcodeType={RNCamera.Constants.GoogleVisionBarcodeDetection.BarcodeType.QR_CODE}
          flashMode={RNCamera.Constants.FlashMode.auto}
          onBarCodeRead={(e) => this.barcodeReceived(e)}
        >
          <View style = {{height: (height-244)/3, width:width, backgroundColor:'rgba(0,0,0,0.5)',}}>
          </View>
          <View style={{flexDirection:'row'}}>
            <View style={styles.itemStyle}/>
            <View style={styles.rectangle}>
              {/*<Image*/}
                {/*style={[styles.rectangle, {position:'absolute', left: 0, top: 0}]}*/}
                {/*source={ require('../../assets/images/icon_scan_rect.png')}*/}
              {/*/>*/}
              <Animated.View style={[styles.animatedStyle, {
                transform: [{
                  translateY: this.state.animation.interpolate({
                    inputRange: [0,1],
                    outputRange: [0,200]
                  })
                }]
              }]}>
              </Animated.View>
            </View>
            <View style={styles.itemStyle}/>
          </View>
          <View style={{flex:1,backgroundColor:'rgba(0, 0, 0, 0.5)',width:width,alignItems:'center'}}>
            <Text style={styles.textStyle}>将二维码放入框内，即可自动扫描</Text>
          </View>
          <View style={ styles.bottom_content }>
            <TouchableOpacity>
              <Text>访问相册</Text>
            </TouchableOpacity>
          </View>
        </RNCamera>
      )
    }
    return (
      <View style={styles.container}>
        {scanView}
      </View>
    );
  }
}

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
  preview: {
    flex: 1,
  },
  itemStyle:{
    backgroundColor:'rgba(0,0,0,0.5)',
    width:(width-200)/2,
    height:200
  },
  textStyle:{
    color:'#fff',
    marginTop:20,
    fontWeight:'bold',
    fontSize:18
  },
  animatedStyle:{
    height:2,
    backgroundColor:'#00c050'
  },
  rectangle: {
    height: 200,
    width: 200,
  },
  bottom_content: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  }
});
