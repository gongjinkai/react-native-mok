import React from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, Image, Alert, Platform, TouchableWithoutFeedback } from 'react-native'
import Toast from 'react-native-easy-toast'
import Spinner from 'react-native-loading-spinner-overlay'
import RNFS from 'react-native-fs'
import ActionSheet from 'react-native-actionsheet'
import CameraRoll from "@react-native-community/cameraroll";

import CustomHeader from '../../components/CustomHeader'

class OrderDetailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: <CustomHeader
        title={ '订单详情' }
        backgroundColor={'#fff'}
        barStyle={'dark'}
        goBack={ () => navigation.goBack() }/>
    }
  };

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {
    this.query();
  }

  query() {
    this.props.dispatch({
      type: 'order/getInfo',
      payload: {
        orderCode: this.props.navigation.state.params.orderCode,
      }
    })
  }

  saveConfirm = () => {
    this.ActionSheet.show();
    // Alert.alert('提示', '确定保存照片到相册？',
    //   [
    //     { text: "取消", onPress: () => {
    //         return
    //     }},
    //     {
    //       text: "确定", onPress: () => {
    //         if(Platform.OS === 'ios'){
    //           this.saveImg()
    //         }else{
    //           this.saveImgInAndroid()
    //         }
    //
    //       }
    //     },
    //   ]
    // )
  }

  // Android save file
  saveImgInAndroid() {
    const storeLocation = `${RNFS.ExternalDirectoryPath}`; //安卓ExternalDirectoryPath才是挂载的外置存储，可被用户随意查看
    let pathName = new Date().getTime() + "联系我们.png";
    let downloadDest = `${storeLocation}/${pathName}`;
    const ret = RNFS.downloadFile({ fromUrl: this.props.order.orderInfo.eventSeasonOrder.medicalQrCode,toFile:downloadDest});
    ret.promise.then(res => {
      if(res && res.statusCode === 200){
        const promise = CameraRoll.saveToCameraRoll("file://" + downloadDest);
        promise.then(function(result) {
          Alert.alert("图片已保存至相册")
        }).catch(function(error) {
          Alert.alert("保存失败")
        })
      }
    })
  }
  // ios save file
  saveImg = async() => {
    let prefix = 'assets-library';
    var uri = await CameraRoll.saveToCameraRoll(this.state.pic, 'photo');
    if (uri && uri.indexOf(prefix) === 0) {
      Alert.alert('保存成功')
    } else {
      Alert.alert('保存失败')
    }
  };

  /**
   * actionSheet handle function
   * @param index
   */

  handleActionSheet(index) {
    console.log(index);
    switch (index) {
      case 0:
        if(Platform.OS === 'ios') {
          this.saveImg()
        } else {
          this.saveImgInAndroid();
        }
        break;
      case 1:
        break;
      case 2:
        break;
    }
  }

  render() {
    const { order, loading } = this.props;
    const { orderInfo } = order;
    return (
      <View style={ styles.container }>
        <View style={ styles.code_content }>
          <View style={ styles.code_title }>
            <Text style={ styles.code_title_text }>体检码：{ orderInfo.eventSeasonOrder && orderInfo.eventSeasonOrder.medicalCode }</Text>
          </View>
          <View style={ styles.qr_content }>
            <TouchableWithoutFeedback  onLongPress={()=>{this.saveConfirm()}}>
              <Image
                style={ styles.qr_code }
                source={{ uri: orderInfo.eventSeasonOrder && orderInfo.eventSeasonOrder.medicalQrCode }}/>
            </TouchableWithoutFeedback>
          </View>
        </View>
        <View style={ styles.abt_content }>
          <View style={ styles.abt_title }>
            <Text style={ styles.abt_info_text }>线下预约体检信息</Text>
          </View>
          <View style={ styles.abt_info }>
            <View>
              <Text style={ styles.abt_info_text }>预约地址：无</Text>
            </View>
            <View>
              <Text style={ styles.abt_info_text }>预约时间：无</Text>
            </View>
          </View>
        </View>
        <View style={ styles.abt_content }>
          <View style={ styles.abt_title }>
            <Text style={ styles.abt_info_text }>订单详情</Text>
          </View>
          <View style={ styles.abt_info }>
            <View>
              <Text
                selectable
                ellipsizeMode={ 'tail' }
                numberOfLines={ 1 }
                style={ styles.abt_info_text }>订单编号：{ orderInfo.eventSeasonOrder && orderInfo.eventSeasonOrder.orderCode }</Text>
            </View>
            <View>
              <Text style={ styles.abt_info_text }>下单时间：{ orderInfo.eventSeasonOrder && orderInfo.eventSeasonOrder.gmtCreate }</Text>
            </View>
            <View>
              <Text style={ styles.abt_info_text }>支付方式：无</Text>
            </View>
          </View>
        </View>
        <ActionSheet
          ref={ actionSheet => this.ActionSheet = actionSheet}
          title={'您将要'}
          options={['保存二维码', '识别二维码', '取消']}
          cancelButtonIndex={2}
          destructiveButtonIndex={1}
          onPress={ (index) => { this.handleActionSheet(index) }} />
        <Toast ref={ (ref) => this.toast = ref }/>
        <Spinner visible={ loading.effects['order/getInfo'] }
                 textContent={'数据加载中...'}
                 textStyle={styles.spinnerTextStyle} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  code_content: {
    marginTop: 10,
    paddingBottom: 28,
    backgroundColor: '#fff',
  },
  code_title: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 15,
    marginRight: 15,
    paddingTop: 17,
    paddingBottom: 17,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2'
  },
  code_title_text: {
    fontSize: 15,
    color: '#5BC8F7'
  },
  qr_content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  qr_code: {
    marginTop: 26,
    width: 121,
    height: 121,
  },
  abt_content: {
    marginTop: 12,
    paddingLeft: 17,
    paddingRight: 17,
    backgroundColor: '#fff',
  },
  abt_title: {
    paddingTop: 17,
    paddingBottom: 17,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2'
  },
  abt_info: {
    paddingTop: 19,
    paddingBottom: 18,
  },
  abt_info_text: {
    fontSize: 15,
    color: '#636D76'
  },
});

export default connect(({ order, loading }) => ({ order, loading }))(OrderDetailScreen)
