import React from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Alert
} from 'react-native'
import Toast from 'react-native-easy-toast'
import CustomHeader from '../../components/CustomHeader'
import NavigationUtil from '../../navigator/NavigationUtil'

const { width, height } = Dimensions.get('window');
const PAGE_SIZE = 10;
let _this;

class ShopCartScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: <CustomHeader
                  title={ '购物车' }
                  backgroundColor={'#FFF'}
                  barStyle={'dark'}
                  right={ <Text onPress={ () => navigation.state.params.navigatePress() }>{ navigation.state.params.mode === 'default' ? '编辑': '完成' }</Text> }
                  goBack={ () => navigation.goBack() }/>
      }
  };

  constructor(props) {
    super(props);
    _this = this;
    this.state = {
      pageNum: 1,
      mode: 'default',  //购物车模式default默认，edit 编辑模式
    }
  }

  componentDidMount() {
    this.query();
    // navigation bind var event
    this.props.navigation.setParams({ mode: 'default' });
    this.props.navigation.setParams({ navigatePress: this.handleToggleMode.bind(this) })
  }

  componentWillUnmount() {

  }

  query() {
    this.props.dispatch({
      type: 'shopCart/query',
      payload: {
        pageNum: this.state.pageNum,
        pageSize: PAGE_SIZE,
      }
    })
  }

  handleToggleMode() {
    this.props.navigation.setParams({ mode: this.props.navigation.state.params.mode === 'default' ? 'edit': 'default' });
  }

  /** FlatList render function **/
  _renderHeaderContent() {
    return (
      <View style={{
        marginTop: 12,
        paddingTop: 16,
        paddingLeft: 16,
        paddingRight: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#FFF'
      }}>
        <Text style={{ color: '#636D76', fontSize: 13 }}>以下商品已失效</Text>
        <Text style={{ color: '#5BC8F7', fontSize: 13 }} onPress={ () => this.handleConfirmRemove() }>清空</Text>
      </View>
    )
  }

  /** FlatList render empty function * jsx **/
  _renderEmptyContent() {
    return (
      <View style={ styles.empty_content }>
        <Image source={ require('../../../assets/images/list-empty.png') }/>
        <Text style={ styles.empty_text }>快去看看有没有心仪的商品吧~</Text>
      </View>
    )
  }

  handleConfirmRemove() {
    Alert.alert('提示', '您要删除失效商品吗', [
      {
        text: '取消',
        style: 'cancel'
      },
      { text: '确认', onPress: () => { this.handleRemoveFailShop() }},
    ]);
  }

  handleRemoveFailShop() {
    this.props.dispatch({
      type: 'shopCart/clearFailure'
    }).then(res => {
      this.toast.show(res.message);
    }).catch(error => {
      throw error
    })
  }

  /**
   * Radio点击事件
   * @param item
   */
  handleRadioChange(item) {
    this.props.dispatch({
      type: 'shopCart/selectRadio',
      payload: {
        ...item,
      }
    })
  }

  /** 购物车全选 **/
  handleSelectAll() {
    this.props.dispatch({
      type: 'shopCart/selectAll'
    })
  }

  /** 购物车结算 **/
  handleConfirmOrder() {
    const { shopCart } = this.props;
    const { cartData } = shopCart;
    const carts = cartData.shelvesList.filter(item => item.checked);
    if(carts.length === 0) {
      this.toast.show('请先选择购物车商品');
    } else {
      NavigationUtil.goPage({ ...this.props, carts },'ConfirmOrder')
    }
  }

  /** 购物车删除  **/
  handleRemoveItem() {
    const { shopCart } = this.props;
    const selectedCart = shopCart.cartData.shelvesList.filter(item => item.checked);
    const ids = selectedCart.map(item => item.id);
    this.props.dispatch({
      type: 'shopCart/removeCart',
      payload: {
        ids,
      }
    }).then(res => {
      this.toast.show(res.message);
    })
  }

  render() {
    const { shopCart } = this.props;
    const { mode } = this.props.navigation.state.params;
    const { cartData, total, selectedAll } = shopCart;
    return (
      <View style={ styles.container }>
        <ScrollView style={ styles.content }>
          <FlatList
            data={ cartData.shelvesList }
            showsVerticalScrollIndicator = {false}
            ListEmptyComponent={ this._renderEmptyContent.bind(this) }
            onEndReachedThreshold={0.1}
            ItemSeparatorComponent={ () => { return (<View style={ styles.line } />) } }
            renderItem={({ item, index, separators }) => (
              <View style={ styles.list_item } key={index}>
                <TouchableOpacity
                  onPress={ () => this.handleRadioChange(item) }
                  style={{ alignSelf: 'center', marginRight: 8 }}>
                  {
                    item.checked ? <Image source={ require('../../../assets/icons/icon-radio_checked.png') }/> : <Image source={ require('../../../assets/icons/icon-radio.png') }/>
                  }
                </TouchableOpacity>
                <View>
                  <Image
                    source={{ uri: item.pic }}
                    style={{
                      width: 100,
                      height: 100,
                    }}
                    resizeMode={'cover'} />
                </View>
                <View style={{ flex: 2, marginLeft: 10 }}>
                  <Text style={ styles.list_item_name }>{ item.name }</Text>
                  <View style={ styles.flex_right }>
                    <Text style={ styles.list_item_price }>￥{ item.price }</Text>
                    <View style={ styles.flex_right_cart }>
                      <Image source={ require('../../../assets/icons/icon-reduce.png') }/>
                      <Text style={ styles.flex_right_text }>{ item.quantity }</Text>
                      <Image source={ require('../../../assets/icons/icon-add.png') }/>
                    </View>
                  </View>
                </View>
              </View>
            )} />
          {
            cartData.failureList.length > 0 ? <FlatList
              data={ cartData.failureList }
              ListHeaderComponent={ this._renderHeaderContent.bind(this) }
              showsVerticalScrollIndicator = {false}
              onEndReachedThreshold={0.1}
              ItemSeparatorComponent={ () => { return (<View style={ styles.line } />) } }
              renderItem={({ item, index, separators }) => (
                <View style={ styles.list_item } key={index}>
                  <View style={{ alignSelf: 'center', marginRight: 8 }}>
                    <Image source={ require('../../../assets/icons/icon-radio.png') }/>
                  </View>
                  <View>
                    <Image
                      source={{ uri: item.pic }}
                      style={{
                        width: 100,
                        height: 100,
                      }}
                      resizeMode={'cover'} />
                  </View>
                  <View style={{ flex: 2, marginLeft: 10 }}>
                    <Text style={ styles.list_item_name }>{ item.name }</Text>
                    <View style={ styles.flex_right }>
                      <Text style={ styles.list_item_price }>￥{ item.price }</Text>
                      <View style={ styles.flex_right_disable }>
                        <Text style={ styles.flex_right_disable_text }>商品失效</Text>
                      </View>
                    </View>
                  </View>
                </View>
              )} /> : null
          }
        </ScrollView>
        {
          mode === 'default' ? (
            <View style={ styles.fixed_button }>
              <TouchableOpacity style={ styles.fixed_radio } onPress={ () => this.handleSelectAll() }>
                {
                  selectedAll ? (
                    <Image source={ require('../../../assets/icons/icon-radio_checked.png') } />
                  ) : (
                    <Image source={ require('../../../assets/icons/icon-radio.png') } />
                  )
                }
                <Text style={ styles.fixed_radio_text }>全选</Text>
              </TouchableOpacity>
              <View
                style={[styles.bottom_btn, {
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  paddingRight: 18,
                }]}>
                <Text style={{ color: '#636D76', fontSize: 11 }}>总计</Text>
                <Text style={{ color: '#5BC8F7', marginLeft: 3 }}>¥{total}</Text>
              </View>
              <TouchableOpacity
                onPress={ () => this.handleConfirmOrder() }
                style={[styles.bottom_btn, {
                  backgroundColor: '#5BC8F7',
                  flex: 1,
                  width: 100,
                }]}>
                <Text style={{ color: '#FFF', fontSize: 16, fontWeight: 'bold' }}>结算{cartData.shelvesList.filter(item => item.checked).length > 0 ? '(' + cartData.shelvesList.filter(item => item.checked).length + ')': null}</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={ styles.fixed_button }>
              <TouchableOpacity
                onPress={ () => this.handleSelectAll() }
                style={[styles.fixed_radio, { flex: 2, paddingRight: 18 }]}>
                {
                  selectedAll ? (
                    <Image source={ require('../../../assets/icons/icon-radio_checked.png') } />
                  ) : (
                    <Image source={ require('../../../assets/icons/icon-radio.png') } />
                  )
                }
                <Text style={ styles.fixed_radio_text }>全选</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={ () => this.handleRemoveItem() }
                activeOpacity={cartData.shelvesList.filter(item => item.checked).length > 0 ? .4 : .7}
                style={[styles.bottom_btn, {
                  backgroundColor: '#5BC8F7',
                  flex: 1,
                  width: 100,
                  opacity: cartData.shelvesList.filter(item => item.checked).length > 0 ? 1 : .7
                }]}>
                <Text style={{ color: '#FFF', fontSize: 16, fontWeight: 'bold' }}>删除</Text>
              </TouchableOpacity>
            </View>
          )
        }
        <Toast ref={ (ref) => this.toast = ref } position={'center'} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    marginTop: 12,
  },
  list_item: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 8,
    paddingRight: 16,
    backgroundColor: '#fff',
  },
  list_item_name: {
    fontSize: 15,
    color: '#636D76'
  },
  list_item_price: {
    fontSize: 13,
    color: '#5BC8F7',
  },
  flex_right: {
    flex: 2,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  flex_right_cart: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  flex_right_text: {
    marginLeft: 8,
    marginRight: 8,
    fontSize: 15,
    color: '#666'
  },
  flex_right_disable: {
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#A3A3A3',
  },
  flex_right_disable_text: {
    color: '#FFF',
    fontSize: 13,
  },
  /** fixed - button **/
  fixed_button: {
    width: width,
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    alignItems: 'center',
  },
  fixed_radio: {
    flexDirection: 'row',
    paddingTop: 17,
    paddingBottom: 17,
    paddingLeft: 8,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  fixed_radio_text: {
    marginLeft: 3,
    color: '#636D76',
    fontSize: 16,
  },
  bottom_btn: {
    flex: 2,
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
    backgroundColor: '#FFF'
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
  empty_content: {
    marginTop: 143,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  empty_text: {
    fontSize: 18,
    color: '#636D76'
  },
});

export default connect(({ shopCart, loading }) => ({ shopCart, loading }))(ShopCartScreen)
