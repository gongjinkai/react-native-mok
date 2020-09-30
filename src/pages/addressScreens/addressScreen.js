import React from 'react'
import { connect } from 'react-redux'
import {
  ScrollView,
  View,
  Text,
  StatusBar,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  DeviceEventEmitter,
  Alert,
} from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import Toast from 'react-native-easy-toast'
import CustomHeader from '../../components/CustomHeader'
import NavigationUtil from '../../navigator/NavigationUtil'

class AddressScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: <CustomHeader
                barStyle={'dark'}
                backgroundColor={'#fff'}
                title={ '地址管理' }
                goBack={ () => navigation.goBack() }/>
    }
  }
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this._navDidFocusListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor('#FFF')
    });
    this._emitterListener = DeviceEventEmitter.addListener('query', () => this.query());
    this.query();
  }

  componentWillUnmount() {
    this._navDidFocusListener.remove();
    this._emitterListener.remove();
  }

  query() {
    this.props.dispatch({
      type: 'common/queryAddress'
    })
  }

  goPage(item) {
    NavigationUtil.goPage({...this.props, id: item.id },'EditAddress')
  }

  /**
   * 用户地址删除
   * @param item
   */
  handleRemoveConfirm(item) {
    Alert.alert('提示', '您要删除这条地址吗', [
      {
        text: '取消',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel'
      },
      { text: '确认', onPress: () => { this.handleRemove(item) }},
    ]);
  }

  handleRemove(item) {
    this.props.dispatch({
      type: 'common/removeAddress',
      payload: item,
    }).then(res => {
      this.toast.show(res.message);
    })
  }

  /** FlatList empty **/
  _renderEmptyContent(loading) {
    console.log(loading);
    return (
      <View style={ styles.empty_content }>
        <Image source={ require('../../../assets/images/address-empty.png') }/>
        <Text style={ styles.empty_text }>您还没有收货地址哦~添加一个吧!</Text>
      </View>
    )
  }

  render() {
    const { common, loading } = this.props;
    const { memberAddress } = common;
    return (
      <ScrollView style={ styles.container }>
        <View style={ styles.content }>
          <FlatList
            data={ memberAddress }
            showsVerticalScrollIndicator = {false}
            onEndReachedThreshold={0.1}
            renderItem={ ({ item, index, separators }) => {
              return !loading.effects['common/queryAddress'] ? <View style={ styles.list_item }>
                <View style={ styles.list_item_left }>
                  <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                    <Text style={ styles.list_item_name }>{ item.name }</Text>
                    <Text style={ styles.list_item_phone }>{ item.phoneNumber }</Text>
                  </View>
                  <Text style={ styles.list_item_address }>{ item.province + ' ' + item.city + ' ' + item.county + ' ' + item.detailAddress }</Text>
                </View>
                <View style={ styles.list_item_right }>
                  <TouchableOpacity style={ styles.icon_remove } onPress={ () => this.handleRemoveConfirm(item) }>
                    <Image source={ require('../../../assets/icons/icon-trash.png') }/>
                    <Text style={ styles.icon_text }>删除</Text>
                  </TouchableOpacity>
                  <View style={ styles.list_item_line }/>
                  <TouchableOpacity style={ styles.icon_edit } onPress={ () => this.goPage(item) }>
                    <Image source={ require('../../../assets/icons/icon-pencil.png') }/>
                    <Text style={ styles.icon_text }>编辑</Text>
                  </TouchableOpacity>
                </View>
              </View> : null
            }}
            ListEmptyComponent={ this._renderEmptyContent.bind(this, loading.effects['common/queryAddress']) } />
            <TouchableOpacity style={ styles.btn_primary } onPress={ () => NavigationUtil.goPage(this.props, 'PublishAddress') }>
              <Text style={ styles.btn_primary_text }>新增收货地址</Text>
            </TouchableOpacity>
        </View>
        <Toast ref={ (ref) => this.toast = ref }/>
        <Spinner visible={ loading.effects['common/queryAddress'] }
                 textContent={'数据加载中...'}
                 textStyle={ styles.spinnerTextStyle } />
      </ScrollView>
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
  spinnerTextStyle: {
    color: '#fff'
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
  btn_primary: {
    marginTop: 10,
    marginLeft: 16,
    marginRight: 16,
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: '#5BC8F7'
  },
  btn_primary_text: {
    fontSize: 15,
    color: '#FFF'
  },
  list_item: {
    marginBottom: 12,
    paddingTop: 18,
    paddingBottom: 18,
    paddingLeft: 16,
    paddingRight: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF'
  },
  list_item_left: {
    flex: 1,
  },
  list_item_name: {
    color: '#333333',
    fontSize: 15,
    fontWeight: 'bold'
  },
  list_item_phone: {
    marginLeft: 10,
    color: '#333333',
    fontSize: 13
  },
  list_item_address: {
    marginTop: 4,
    color: '#666666',
    fontSize: 13,
  },
  list_item_right: {
    flexDirection: 'row',
    // alignItems: 'center',
  },
  icon_remove: {
    marginRight: 18,
    alignItems: 'center',
  },
  icon_edit: {
    marginLeft: 18,
    alignItems: 'center'
  },
  list_item_line: {
    width: 1,
    maxHeight: 40,
    backgroundColor: '#BABFC2'
  },
  icon_text: {
    marginTop: 2,
    fontSize: 10,
    color: '#C2C2C2'
  }
});


export default connect(({ common, loading }) => ({ common, loading }))(AddressScreen)
