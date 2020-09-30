import React from 'react'
import { connect } from 'react-redux'
import {View, Text, StyleSheet, Image, FlatList, TouchableOpacity, ScrollView} from 'react-native'
import Toast from 'react-native-easy-toast'
import CustomHeader from '../../components/CustomHeader'

class ConfirmOrderScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: <CustomHeader
        title={ '提交订单' }
        backgroundColor={'#FFF'}
        barStyle={'dark'}
        goBack={ () => navigation.goBack() }/>
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      list: [],
    }
  }

  componentDidMount() {
    this.query()
  }

  componentWillUnmount() {

  }

  query() {
    const { navigation } = this.props;
    const productIds = navigation.state.params.carts.map(item => item.productId);
    this.props.dispatch({
      type: 'shopCart/fetchListCart',
      payload: {
        productIds,
      }
    }).then(res => {
      if(res.code === 1) {
        this.setState({
          list: res.data,
        })
      } else {
        this.toast.show(res.message);
      }
    })
  }

  render() {
    const { list } = this.state;
    return (
      <View style={ styles.container }>
        <View style={ styles.cart_content }>
          <View style={ styles.store_title }>
            <Image source={ require('../../../assets/icons/icon-shopping_basket.png') }/>
            <Text style={ styles.store_title_text }>Mok健身专营店</Text>
          </View>
          <View style={ styles.store_list }>
            <FlatList
              data={ list }
              showsVerticalScrollIndicator = {false}
              onEndReachedThreshold={0.1}
              ItemSeparatorComponent={ () => { return (<View style={ styles.line } />) } }
              renderItem={({ item, index, separators }) => (
                <View style={ styles.list_item } key={index}>
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
          </View>
        </View>
        <View style={ styles.fixed_button }>
          <View style={ styles.fixed_arrow_left }>
            <Text style={ styles.fixed_arrow_left_text }>总计：</Text>
            <Text style={ styles.fixed_arrow_left_total }>￥697</Text>
          </View>
          <TouchableOpacity style={ styles.fixed_arrow_right }>
            <Text style={ styles.fixed_arrow_right_text }>提交订单</Text>
          </TouchableOpacity>
        </View>
        <Toast ref={ (ref) => this.toast = ref } position={'center'}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  cart_content: {
    paddingTop: 15,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 20,
    backgroundColor: '#FFF'
  },
  store_title: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  store_title_text: {
    marginLeft: 3,
    fontSize: 15,
    color: '#666666',
    fontWeight: 'bold'
  },
  store_list: {
    //marginTop: 24,
  },
  list_item: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'flex-end',
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
  /** fixed button **/
  fixed_button: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingLeft: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  fixed_arrow_left: {
    flexDirection: 'row',
    paddingTop: 17,
    paddingBottom: 17,
    paddingLeft: 8,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  fixed_arrow_right: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: '100%',
    backgroundColor: '#5BC8F7'
  },
  fixed_arrow_right_text: {
    color: '#FFF'
  },
  fixed_arrow_left_text: {
    color: '#636D76',
    fontSize: 13
  },
  fixed_arrow_left_total: {
    color: '#FF3A30',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Helvetica'
  }
});

export default connect(({ shopCart, loading }) => ({ shopCart, loading }))(ConfirmOrderScreen)
