import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import { RNCamera } from 'react-native-camera'
import Video from 'react-native-video'

const { width, height } = Dimensions.get('window');

class PlanRunningScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerShown: false,
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      isFlashOn:false,        //闪光灯
      isRecording:false,      //是否在录像
    }
  }

  toggleFlash(){
    this.setState({isFlashOn:!this.state.isFlashOn})
  }

  isFlashOn(){
    if (this.state.isFlashOn===false){
      return(
        <TouchableOpacity  onPress={()=>{this.toggleFlash()}}>
          <Text style={{fontSize:30,fontFamily:'iconfont',color:'black'}}>&#xe633;</Text>
        </TouchableOpacity>

      )
    } else {
      return(
        <TouchableOpacity  onPress={()=>{this.toggleFlash()}}>
          <Text style={{fontSize:30,color:'white',fontFamily:'iconfont'}}>&#xe633;</Text>
        </TouchableOpacity>

      )
    }
  }

  recordBtn(camera){
    if (this.state.isRecording===false){
      return(
        <TouchableOpacity onPress={() => this.takeRecord(camera)} style={styles.capture}>
          <Text style={{ fontSize: 14 }}> 摄像 </Text>
        </TouchableOpacity>
      )
    } else {
      return (
        <TouchableOpacity onPress={() => this.stopRecord(camera)} style={styles.capture}>
          <Text style={{ fontSize: 14 }}> 停止 </Text>
        </TouchableOpacity>
      )
    }
  }
  //开始录像
  takeRecord= async function(camera){
    this.setState({isRecording:true});
    const options = { quality:RNCamera.Constants.VideoQuality["480p"],maxFileSize:(100*1024*1024) };
    const data = await camera.recordAsync(options);
    this.props.navigation.navigate('parentPage',{videoUrl:data.uri})
  };
  //停止录像
  stopRecord(camera){
    this.setState({isRecording:false});
    camera.stopRecording()
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Video
            style={{ width, height }}
            fullscreen={true}
            source={{ uri: 'https://stream7.iqilu.com/10339/upload_transcode/202002/18/20200218114723HDu3hhxqIT.mp4' }}/>
          <RNCamera
            style={styles.preview}
            type={RNCamera.Constants.Type.front}
            flashMode={this.state.isFlashOn===true ? RNCamera.Constants.FlashMode.on : RNCamera.Constants.FlashMode.off}
            permissionDialogTitle={'Permission to use camera'}
            permissionDialogMessage={'We need your permission to use your camera phone'}>
            {({ camera, status }) => {
              return (
                <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                  <View style={{position:'absolute',top:30,left:-40}}>{this.isFlashOn()}</View>
                  {this.recordBtn(camera)}
                </View>
              );
            }}
          </RNCamera>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    width: 124,
    height: 222,
    position: 'absolute',
    right: 10,
    top: 4,
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});



export default PlanRunningScreen
