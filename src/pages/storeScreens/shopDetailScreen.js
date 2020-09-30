import React from 'react'
import { connect } from 'react-redux'
import {
  ScrollView,
  View,
  Text,
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert,
  TouchableWithoutFeedback,
  PixelRatio
} from 'react-native'
import Modal from 'react-native-modal'
import RNFS from 'react-native-fs'
import CameraRoll from "@react-native-community/cameraroll";
import Toast from 'react-native-easy-toast'
import { WebView } from 'react-native-webview'
import NavigationUtil from "../../navigator/NavigationUtil";


const { width } = Dimensions.get('window');
console.log(width);
console.log('像素密度' + PixelRatio.get());
const BaseScript =
`(function () {
    var height = null;
    function changeHeight() {
      if (document.body.scrollHeight != height) {
        height = document.body.offsetHeight;
        if (window.postMessage) {
          window.ReactNativeWebView.postMessage(JSON.stringify({
            type: 'setHeight',
            height: height,
          }))
        }
      }
    }
    setTimeout(changeHeight, 500);
} ())
`;


class ShopDetailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerShown: false,
      headerTransparent: true,
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      webViewHeight: 0,
      ModalIntroToggle: false,
      shopCount: 1,
      shopNum: [
        {
          size: 37,
          checked: false,
          disable: false,
        },
        {
          size: 38,
          checked: false,
          disable: false,
        },
        {
          size: 39,
          checked: false,
          disable: true,
        },
        {
          size: 40,
          checked: false,
          disable: false,
        },
        {
          size: 41,
          checked: false,
          disable: true,
        }, {
          size: 42,
          checked: false,
          disable: false,
        },
        {
          size: 43,
          checked: false,
          disable: false,
        },
        {
          size: 44,
          checked: false,
          disable: false,
        },
        {
          size: 45,
          checked: false,
          disable: false,
        },
      ],
      type: -1, //区分购物车还是购买   1.购物车 2.下单购买
    }
  }

  componentDidMount() {
    this._navDidFocusListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBackgroundColor('transparent');
      StatusBar.setTranslucent(true);
    });
    this.query();
  }

  componentWillUnmount() {
    this._navDidFocusListener.remove();
  }


  query() {
    const { navigation } = this.props;
    const _id = navigation.state.params.id;
    this.props.dispatch({
      type: 'shop/getShopDetail',
      payload: {
        id: _id,
      }
    })
  }

  handleMessage(event) {
    const action = JSON.parse(event.nativeEvent.data);
    if (action.type === 'setHeight' && action.height > 0) {
      this.setState({ webViewHeight: action.height })
    }
  }

  handleCloseModal() {
    this.setState({
      ModalIntroToggle: false,
    })
  }

  // 商品添加操作
  handleAddShop() {
    this.setState(prevState => ({
      shopCount: prevState.shopCount += 1,
    }));
  }
  // 商品减少操作
  handleReduceShop() {
    if(this.state.shopCount === 1) {
      return
    }
    this.setState(prevState => ({
      shopCount: prevState.shopCount-= 1,
    }));
  }
  // 商品选择规格
  handleSelectSpecifications(data) {
    this.setState({
      shopNum: this.state.shopNum.map(item => {
        if(data.size === item.size) {
          return {
            ...item,
            checked: true
          }
        } else {
          return {
            ...item,
            checked: false,
          }
        }
      }),
      shopCount: 1,
    })
  }
  ModalIntroToggleFunWrap() {
    const { shop } = this.props;
    const { shopDetail } = shop;
    const { shopCount, shopNum } = this.state;
    const albumPics = shopDetail.albumPics ? shopDetail.albumPics.split(',') : [];
    return(
      <Modal isVisible={this.state.ModalIntroToggle} backdropOpacity={0.2} style={{margin: 0, alignItems:'flex-start', justifyContent: 'flex-start'}} onBackdropPress={() => this.setState({ ModalIntroToggle: false })}>
        <View style={ styles.modal_content }>
          <View style={ styles.modal_top }>
            <Image
              style={{ width: 80, height: 80 }}
              source={{ uri: albumPics[0] }} />
            <View style={{ marginLeft: 16 }}>
              <Text style={{ color: '#5BC8F7', fontSize: 18, marginTop: 26 }}>￥{shopDetail.price}</Text>
              <Text style={{ color: '#666666', fontSize: 15, marginTop: 7 }}>选择规格</Text>
            </View>
          </View>
          <View style={ styles.modal_center }>
            <Text style={{ marginTop: 20, marginBottom: 19, color: '#666', fontSize: 15 }}>选择规格</Text>
            <View style={ styles.label_content }>
              {
                shopNum.map(item => {
                  return item.disable ? (
                    <View style={styles.label_item}>
                      <Text style={[styles.label_item_text, { color: '#C2C2C2' }]}>{ item.size }</Text>
                    </View>
                  ) : (
                    <TouchableOpacity key={item} onPress={ () => this.handleSelectSpecifications(item) }>
                      <View style={[styles.label_item, item.checked ? {
                        borderColor: '#5BC8F7',
                        backgroundColor: '#DFF6FF'
                      } : '']}>
                        <Text style={[styles.label_item_text, item.checked ? {
                          color:'#5BC8F7'
                        }: '']}>{ item.size }</Text>
                      </View>
                    </TouchableOpacity>
                  )
                })
              }
            </View>
          </View>
          <View style={ styles.modal_mall }>
            <Text>购买数量</Text>
            <View style={ styles.modal_mall_right }>
              <TouchableOpacity onPress={ () => this.handleReduceShop() }>
                <Image source={ require('../../../assets/icons/icon-reduce.png') } />
              </TouchableOpacity>
              <Text style={{ marginLeft: 20, marginRight: 20 }}>{ shopCount }</Text>
              <TouchableOpacity onPress={ () => this.handleAddShop() }>
                <Image source={ require('../../../assets/icons/icon-add.png') } />
              </TouchableOpacity>
            </View>
          </View>
          <View style={ styles.modal_footer }>
            <TouchableOpacity style={ styles.btn_primary } onPress={ () => this.handleEnter() }>
              <Text style={ styles.btn_primary_text }>确定</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={ styles.icon_close } onPress={ () => this.handleCloseModal() }>
            <Image source={ require('../../../assets/icons/icon-close.png') } />
          </TouchableOpacity>
        </View>
      </Modal>
    )
  }

  openModal(type) {
    this.setState({
      ModalIntroToggle: true,
      type,
    })
  }

  saveConfirm = (uri)=>{
    Alert.alert('提示  ', '确定保存照片到相册？',
      [
        {text: " 取消", onPress: () => {
            return
          }},
        {
          text: "确定", onPress: () => {
            if(Platform.OS === 'ios'){
              this.saveImg(uri)
            }else{
              this.saveImgInAndroid(uri)
            }
          }
        }
      ]
    )
  }

  //ios保存图片
  saveImg = async(picture) => {
    let prefix = 'assets-library';
    const uri = await CameraRoll.saveToCameraRoll(picture, 'photo')
    if (uri && uri.indexOf(prefix) === 0) {
      Alert.alert('保存成功')
    } else {
      Alert.alert('保存失败')
    }

  }
  //安卓保存图片
  saveImgInAndroid = (picture) => {
    const storeLocation = `${RNFS.ExternalDirectoryPath}`; //安卓ExternalDirectoryPath才是挂载的外置存储，可被用户随意查看
    let pathName = new Date().getTime() + ".png";
    let downloadDest = `${storeLocation}/${pathName}`;
    const ret = RNFS.downloadFile({ fromUrl: picture,toFile:downloadDest});
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
  };

  /**
   * 添加至购物车或者下单
   */
  handleEnter() {
    const { shop } = this.props;
    const { shopDetail } = shop;
    const { type, shopCount } = this.state;
    if(type === 1) {
      this.props.dispatch({
        type: 'shop/addCart',
        payload: {
          productId: shopDetail.id,
          quantity: shopCount
        }
      }).then(res => {
        this.setState({
          ModalIntroToggle: false,
        });
        this.toast.show(res.message)
      })
    }
  }

  render() {
    const { shop } = this.props;
    const { shopDetail } = shop;
    const { webViewHeight } = this.state;
    const albumPics = shopDetail.albumPics ? shopDetail.albumPics.split(',') : [];
    return (
      <View style={ styles.container }>
        <ScrollView style={{ marginBottom: 56 }}>
          <View style={ styles.cover_box }>
            <TouchableOpacity
              activeOpacity={1}
              style={ styles.icon_left_back }
              onPress={ () => NavigationUtil.goBack(this.props.navigation) }>
              <Image
                source={ require('../../../assets/icons/icon-circle_back.png') }/>
            </TouchableOpacity>
            <TouchableWithoutFeedback onLongPress={()=>{this.saveConfirm(albumPics[0])}}>
              <Image
                style={ styles.cover_picture }
                source={{ uri: albumPics[0] }} />
            </TouchableWithoutFeedback>
          </View>
          <View style={ styles.info_card }>
            <Text style={{ fontSize: 18, color: '#FF3A30', fontWeight: 'bold' }}>￥
              <Text style={{ fontSize: 28 }}>{ shopDetail.price }</Text>
            </Text>
            <Text style={{ color: '#333', fontSize: 18 }}>{ shopDetail.name }</Text>
          </View>
          <View style={ styles.column_card }>
            <View style={{ marginBottom: 18 }}>
              <Text style={{ color: '#333', fontSize: 16, fontWeight: 'bold' }}>商品参数</Text>
              <View style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                width: 64,
                opacity: .7,
                height: 7,
                backgroundColor: '#5BC8F7' }} />
            </View>
            <View style={ styles.column_item }>
              <Text style={ styles.label }>品牌</Text>
              <Text></Text>
            </View>
            <View style={ styles.column_item }>
              <Text style={ styles.label }>货号</Text>
              <Text>{ shopDetail.productSn }</Text>
            </View>
            <View style={ styles.column_item }>
              <Text style={ styles.label }>发售价格</Text>
              <Text>￥{ shopDetail.price }</Text>
            </View>
            <View style={ styles.column_item }>
              <Text style={ styles.label }>材质</Text>
              <Text></Text>
            </View>
          </View>
          <View style={ styles.column_card }>
            <View style={{ marginBottom: 18 }}>
              <Text style={{ color: '#333', fontSize: 16, fontWeight: 'bold' }}>商品详情</Text>
              <View style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                width: 64,
                opacity: .7,
                height: 7,
                backgroundColor: '#5BC8F7' }} />
            </View>
            <View style={{ flex: 1, minHeight: webViewHeight }}>
              <WebView
                useWebKit={true}
                showsVerticalScrollIndicator={ false }
                javaScriptEnabled={ true }
                injectedJavaScript={ BaseScript }
                onMessage={ this.handleMessage.bind(this) }
                originWhitelist={['*']}
                source={{ html: `<meta name="viewport" content="width=device-width,height=device-height,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"><head><style>img{max-width: 100%; !important;height:auto !important}p{margin-top:0 !important;margin-bottom:0 !important;}</style></head><body style='margin-top: 0;margin-left: 2px; margin-right: 2px;padding:0;overflow: hidden'><html><body>${ shopDetail.detailHtml ? JSON.parse(shopDetail.detailHtml).html: '' }</body></html>` }}
              />
            </View>
          </View>
        </ScrollView>
        <View style={ styles.fixed_button }>
          <TouchableOpacity style={ styles.icon_services }>
            <Image source={ require('../../../assets/icons/icon-service.png') } />
            <Text>客服</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={ () => this.openModal(1) }
            style={[styles.bottom_btn, {
            backgroundColor: '#F0F0F5'
          }]}>
            <Text style={{ color: '#666666', fontSize: 16, fontWeight: 'bold' }}>加入购物车</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={ () => this.openModal(2) }
            style={[styles.bottom_btn, {
              backgroundColor: '#5BC8F7'
            }]}>
            <Text style={{ color: '#FFF', fontSize: 16, fontWeight: 'bold' }}>立即购买</Text>
          </TouchableOpacity>
        </View>
        <Toast ref={ (ref) => this.toast = ref } position={'center'} />
        { this.ModalIntroToggleFunWrap() }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cover_box: {

  },
  cover_picture: {
    height: 374,
  },
  icon_left_back: {
    position: 'absolute',
    top: 15,
    left: 15,
    zIndex: 99,
  },
  fixed_button: {
    width: width,
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    alignItems: 'center',
  },
  icon_services: {
    paddingTop: 6,
    paddingBottom: 6,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  bottom_btn: {
    flex: 2,
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center'
  },
  info_card: {
    paddingTop: 6,
    paddingBottom: 12,
    paddingLeft: 12,
    backgroundColor: '#fff'
  },
  column_card: {
    marginTop: 12,
    paddingTop: 20,
    paddingLeft: 22,
    paddingRight: 22,
    backgroundColor: '#fff'
  },
  column_item: {
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  label: {
    fontSize: 15,
    color: '#999999'
  },
  /** modal **/
  modal_content: {
    position: 'absolute',
    paddingTop: 20,
    // paddingBottom: 28,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
  },
  modal_top: {
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20,
  },
  icon_close: {
    position: 'absolute',
    right: 20,
    top: 20,
  },
  /** label Content  **/
  modal_center: {
    paddingLeft: 20,
    paddingRight: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F4F4F4'
  },
  label_content: {
    paddingBottom: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  label_item: {
    marginTop: 12,
    marginRight: 5,
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#F4F4F4',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#F4F4F4'
  },
  label_selected: {
    borderColor: '#5BC8F7'
  },
  label_item_text: {
    fontSize: 15,
  },
  modal_mall: {
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  modal_mall_right: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  modal_footer: {
    marginTop: 62,
  },
  btn_primary: {
    paddingTop: 16,
    paddingBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5BC8F7',
    borderColor: '#5BC8F7'
  },
  btn_primary_text: {
    color: '#FFF',
    fontSize: 16,
  }
});


export default connect(({ shop, loading }) => ({ shop, loading }))(ShopDetailScreen)
