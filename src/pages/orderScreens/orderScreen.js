import React from 'react'
import { connect } from 'react-redux'
import {
  Text,
  View,
  Image,
  RefreshControl,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import Toast from 'react-native-easy-toast'
import Modal from 'react-native-modal'
import CustomHeader from '../../components/CustomHeader'
import NavigationUtil from '../../navigator/NavigationUtil'

const { width, height } = Dimensions.get('window');

const PAGE_SIZE = 10;

class OrderScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: <CustomHeader
        title={ '订单列表' }
        backgroundColor={'#fff'}
        barStyle={'dark'}
        goBack={ () => navigation.goBack() }/>
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      list: [],
      payState: {
        1: '待支付',
        2: '支付成功',
        3: '支付失败',
        4: '已退款',
        5: '未发货',
        6: '已发货',
        7: '退款中',
      },
      pageNo: 1,
      modalVisible: true,
      //reason 退款理由
      reason: [
        {
          title: '来不及去了',
          checked: true,
        },
        {
          title: '计划有变',
          checked: false,
        },
        {
          title: '其他',
          checked: false,
        }
      ],
      ModalIntroToggle: false,
    }
  }

  componentDidMount() {
    this.query();
    this._navDidFocusListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor('#fff')
    })
  }

  componentWillUnmount() {
    this._navDidFocusListener.remove();
  }

  query() {
    this.props.dispatch({
      type: 'order/query',
      payload: {
        pageNum: this.state.pageNo,
        pageSize: PAGE_SIZE,
      }
    });
  }

  goPage(item) {
    NavigationUtil.goPage({ ...this.props, orderCode: item.orderCode }, 'OrderDetail')
  }

  handlePay(item) {
    this.setState({
      modalVisible: false,
      ModalIntroToggle: true,
    })
  }

  // _renderFooter() {
  //   return (
  //     <View style={{ height:30,alignItems:'center',justifyContent:'flex-start', backgroundColor: '#F8F8FA'}}>
  //       <Text style={{color:'#999999',fontSize:14,marginTop:5,marginBottom:5,}}>
  //         没有更多数据了
  //       </Text>
  //     </View>
  //   )
  // }

  _renderEmptyContent() {
    return (
      <View style={ styles.empty_content }>
        <Image source={ require('../../../assets/images/list-empty.png') }/>
        <Text style={ styles.empty_text }>暂无订单</Text>
      </View>
    )
  }

  _onEndReached() {
    const { order } = this.props;
    const { orderData } = order;
    if(orderData.hasNextPage) {
      this.loadMore()
    }
  }

  loadMore() {
    this.props.dispatch({
      type: 'order/loadMore',
      payload: {
        pageNum: this.state.pageNum + 1,
        pageSize: PAGE_SIZE,
      }
    }).then(res => {
      if(res.code === 1) {
        this.setState(prevState => ({
          pageNum: prevState.pageNum += 1,
        }));
      }
    })
  }

  handleModalHide() {
    console.log('close');
    this.setState({
      modalVisible: false,
    })
  }

  refreshOrder() {
    this.props.dispatch({
      type: 'order/refresh',
      payload: {
        pageNum: 1,
        pageSize: PAGE_SIZE,
      }
    })
  }

  /** 退款原因选择  **/
  selectReason(i) {
    const newReason = this.state.reason.map((item, index) => {
      if(index === i) {
        return {
          title: item.title,
          checked: true,
        }
      } else {
        return {
          title: item.title,
          checked: false,
        }
      }
    });
    this.setState({
      reason: newReason,
    })
  }

  handleCloseModal() {
    this.setState({
      modalVisible: false,
    })
  }

  // 通过 Fun()  让模态框变量  取反
  ModalIntroToggleFun() {
    this.setState({
      ModalIntroToggle: !this.state.ModalIntroToggle,
    })
  }

  // 模态框  弹出简介
  ModalIntroToggleFunWrap() {
    const { reason } = this.state;
    return(
      <Modal isVisible={this.state.ModalIntroToggle} backdropOpacity={0.2} style={{margin: 0, alignItems:'flex-start', justifyContent: 'flex-start'}} onBackdropPress={() => this.setState({ ModalIntroToggle: false })}>
        <View style={ styles.modal_content }>
          <View style={ styles.modal_title }>
            <Text style={ styles.modal_title_text }>请选择退款原因</Text>
          </View>
          <View style={ styles.reason_list }>
          {
            reason.map((item, index) => (
              <View style={ styles.reason_item } key={ index }>
              <Text>{ item.title }</Text>
          {
            item.checked ? <Image source={ require('../../../assets/icons/icon-radio_checked.png') } /> : (
                <TouchableOpacity onPress={ () => this.selectReason(index) }>
                  <Image source={ require('../../../assets/icons/icon-radio.png') } />
                </TouchableOpacity>
            )
          }
            </View>
            ))
          }
          </View>
        <View style={ styles.reason_footer }>
          <TouchableOpacity style={[styles.btn_primary,{ paddingLeft: 65, paddingRight: 65 }]}>
            <Text style={ styles.btn_primary_text }>确定</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={ () => this.handleCloseModal() }
            style={[styles.btn_primary,{ paddingLeft: 65, paddingRight: 65 }]}>
            <Text style={ styles.btn_primary_text }>取消</Text>
          </TouchableOpacity>
          </View>
        </View>
      </Modal>
    )
  }



  render() {
    const { payState, modalVisible, reason } = this.state;
    const { loading, order } = this.props;
    const { orderData } = order;
    return (
      <View style={ styles.container }>
        <View style={ styles.order_list }>
          <FlatList
            data={ orderData.archiveList }
            ItemSeparatorComponent={
              () => (
                <View style={styles.separator} />
              )
            }
            ListEmptyComponent={ this._renderEmptyContent.bind(this) }
            renderItem={({ item, index, separators }) => (
              <TouchableOpacity style={ styles.list_item } onPress={ () => this.goPage(item)} key={index}>
                <View style={ styles.order_item }>
                  <Image
                    source={{ uri: item.photo }}
                    style={{
                      width: 100,
                      height: 64,
                      borderRadius: 5,
                    }}
                    resizeMode={'cover'} />
                  <View style={ styles.abs_info }>
                    <Text style={ styles.lg_text }>{ item.title }</Text>
                    <Text style={ styles.plan_info }>{ item.startTime }-{item.stopTime}</Text>
                    <Text style={ styles.blue_text }>{ payState[item.payState] }</Text>
                    <TouchableOpacity style={ styles.btn_primary } onPress={ () => this.handlePay(item) }>
                      <Text style={ styles.btn_primary_text }>{ payState[item.payState] }</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            )}
            refreshControl = {
              <RefreshControl
                title={'加载中...'}
                colors={['red']}//此颜色无效
                tintColor={'orange'}
                titleColor={'red'}//只有ios有效
                refreshing={ loading.effects['order/query'] || loading.effects['order/query']  }
                onRefresh={ ()=>{
                  this.refreshOrder();
                }}
              />
            }
            onEndReached={ this._onEndReached.bind(this) }
            onEndReachedThreshold={0.1} />
        </View>
        <View>
          <TouchableOpacity onPress={()=>this.ModalIntroToggleFun()}>
            <Text>2019届海南省詹州市第一中学高三统测试题（一）：语文</Text>
          </TouchableOpacity>
          { this.ModalIntroToggleFunWrap() }
        </View>
        <Spinner
          visible={ loading.effects['order/query'] }
          textContent={'数据加载中...'}
          textStyle={styles.spinnerTextStyle}
        />
        <Toast ref={ (ref) => { this.toast = ref }} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8FA'
  },
  empty_content: {
    marginTop: 143,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  spinnerTextStyle: {
    color: '#fff'
  },
  order_list: {
    marginTop: 10,
    height: '100%'
  },
  order_item: {
    flexDirection: 'row',
    paddingTop: 20,
    paddingBottom: 10,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: '#fff'
  },
  separator: {
    height: 8,
    backgroundColor: '#F8F8FA',
  },
  abs_info: {
    marginLeft: 12,
    flex: 2,
  },
  blue_text: {
    fontSize: 13,
    color: '#5BC8F7'
  },
  empty_text: {
    fontSize: 18,
    color: '#636D76'
  },
  btn_primary: {
    alignSelf: 'flex-end',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 31,
    paddingRight: 31,
    borderRadius: 15,
    borderWidth: 1,
    backgroundColor: '#5BC8F7',
    borderColor: '#5BC8F7'
  },
  btn_primary_text: {
    textAlign: 'center',
    fontSize: 13,
    color: '#fff'
  },
  /** modal **/
  modal_content: {
    position: 'absolute',
    paddingTop: 17,
    paddingBottom: 28,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
  },
  modal_title: {
    alignItems: 'center'
  },
  modal_title_text: {
    color: '#636D76',
    fontSize: 15,
  },
  reason_list: {
    marginTop: 32,
    paddingLeft: 32,
    paddingRight: 32,
  },
  reason_item: {
    marginBottom: 22,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  reason_footer: {
    paddingLeft: 16,
    paddingRight: 16,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  modal_bg: {
    position: 'absolute',
    width: width,
    height: height,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,.5)',
    zIndex: 999,
  }
});

export default connect(({ order, loading }) => ({ order, loading }))(OrderScreen)

