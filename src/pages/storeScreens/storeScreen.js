import React from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
  StatusBar,
  Image,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  ScrollView,
  RefreshControl
} from 'react-native'
import Swiper from 'react-native-swiper'
import NavigationUtil from '../../navigator/NavigationUtil'

class StoreScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      headerShown: false,
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      swiperIndex: 0,
    }
  }

  componentDidMount() {
    this._navDidFocusListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor('#fff');
      StatusBar.setTranslucent(false);
    });
    this.query();
  }

  componentWillUnmount() {
    this._navDidFocusListener.remove();
  }

  query() {
    this.props.dispatch({
      type: 'shop/getMallHome'
    })
  }

  refresh() {
    this.props.dispatch({
      type: 'shop/refreshMallHome'
    })
  }

  handleSwiperChange(i) {
    this.setState({
      swiperIndex: i,
    })
  }

  goToDetail(item) {
    NavigationUtil.goPage({...this.props, id: item.id },'ShopDetail');
  }

  goToCategoryPage(item) {
    NavigationUtil.goPage({...this.props, id: item.id }, 'Category');
  }

  _renderHeaderContent() {
    return (
      <View style={{ marginBottom:12 }}>
        <Text style={{ color: '#333', fontSize: 16, fontWeight: 'bold' }}>热门推荐</Text>
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
    )
  }

  _contentViewScroll(e) {
    let offsetY = e.nativeEvent.contentOffset.y; //滑动距离
    let contentSizeHeight = e.nativeEvent.contentSize.height; //scrollView contentSize高度
    let oriageScrollHeight = e.nativeEvent.layoutMeasurement.height; //scrollView高度
    if (offsetY + oriageScrollHeight >= contentSizeHeight){
      console.log('上传滑动到底部事件')
    }
  }

  goPage(path) {
    NavigationUtil.goPage(this.props, path);
  }

  render() {
    const { shop, loading } = this.props;
    const { homeData } = shop;
    const { swiperIndex } = this.state;
    return (
      <View style={ styles.container }>
        <ScrollView
          onMomentumScrollEnd = {this._contentViewScroll}
          refreshControl = {
            <RefreshControl
              title={'加载中...'}
              colors={['red']}//此颜色无效
              tintColor={'orange'}
              titleColor={'red'}//只有ios有效
              refreshing={ loading.effects['home/query'] || loading.effects['home/query']  }
              onRefresh={ ()=>{
                this.refresh();
              }}
            />
          }>
          <View style={ styles.search_bar }>
            <Image source={ require('../../../assets/icons/icon-baseline-search.png')  }/>
            <TextInput placeholder={'请输入您想要搜索的内容'} style={ styles.text_input }/>
          </View>
          <View style={ styles.swiper_content }>
            <Swiper
              paginationStyle={{ bottom: -20 }}
              horizontal={ true }
              loop={true}
              autoplay={true}
              index={swiperIndex}
              onIndexChanged={ (index) => this.handleSwiperChange(index) }
              dot={
                <View
                  style={{
                    backgroundColor:'rgba(0,0,0,.2)',
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    marginLeft: 3,
                    marginRight: 3,
                    marginTop: 3,
                    marginBottom: 3
                  }}
                />
              }
              activeDot={<View style={{
                backgroundColor: '#5BC8F7',
                width: 16,
                height: 8,
                borderColor: '#fff',
                borderRadius: 8,
                marginRight: 6,
              }}/>}>
              { homeData.productBannerList.map((item,index)=>(
                <Image
                  source={{ uri:item.photo }}
                  style={{ height: 140, borderRadius: 20 }}
                  key={index}
                />
              )) }
            </Swiper>
          </View>
          <View style={ styles.category }>
            {
              homeData.productCategoryList.map(item => (
                <TouchableOpacity style={ styles.category_item } onPress={ () => this.goToCategoryPage(item) }>
                  <Image
                    style={{ width: 66, height: 66, borderRadius: 50 }}
                    source={{ uri: item.icon }}/>
                  <Text>{ item.name }</Text>
                </TouchableOpacity>
              ))
            }
          </View>
          <View style={ styles.line }/>
          <FlatList
            data={ homeData.productList }
            style={ styles.goodList }
            numColumns={2}
            ListHeaderComponent={ this._renderHeaderContent.bind(this) }
            renderItem={({ item, index, separators }) => (
              <TouchableOpacity style={ styles.list_item } onPress={ () => this.goToDetail(item)} key={index}>
                <View>
                  <Image
                    source={{ uri: item.pic }}
                    style={{
                      width: 162,
                      height: 162,
                    }}
                    resizeMode={'cover'} />
                </View>
                <View>
                  <Text style={ styles.item_name }>{ item.name }</Text>
                  <Text style={ styles.item_price }>¥{ item.price }</Text>
                </View>
              </TouchableOpacity>
            )}/>
        </ScrollView>
        <View style={ styles.shop_cart }>
          <TouchableOpacity style={ styles.shop_cart_circle } onPress={ () => this.goPage('ShopCart') }>
            <Image source={ require('../../../assets/icons/icon-shopping_cart.png') } />
          </TouchableOpacity>
          {
            homeData.cartItemCount.length > 0 ? <Text style={ styles.shop_cart_num }>{ homeData.cartItemCount }</Text>: null
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF'
  },
  swiper_content: {
    marginTop: 20,
    marginLeft: 16,
    marginRight: 16,
    height: 140,
  },
  search_bar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    marginLeft: 12,
    marginRight: 12,
    paddingLeft: 12,
    backgroundColor: '#F7F8FA',
    borderRadius: 30,
  },
  text_input: {
    height: 40
  },
  category: {
    marginTop: 30,
    marginLeft: 16,
    marginRight: 16,
    paddingBottom: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  category_item: {
    alignItems: 'center',
  },
  line: {
    height: 12,
    backgroundColor: '#F7F8FA'
  },
  goodList: {
    marginTop: 15,
    marginLeft: 16,
    marginRight: 16
  },
  list_item: {
    alignItems: 'flex-start',
    marginRight: 10,
  },
  item_name: {
    color: '#333',
    fontSize: 15,
  },
  item_price: {
    color: '#FF3A30',
    fontSize: 18,
    fontWeight: 'bold',
  },
  /** 购物车 **/
  shop_cart: {
    position: 'absolute',
    bottom: 57,
    right: 14,
  },
  shop_cart_circle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 44,
    height: 44,
    backgroundColor: '#5BC8F7',
    borderRadius: 50,
  },
  shop_cart_num: {
    position: 'absolute',
    right: -5,
    top: -2,
    width: 18,
    height: 18,
    backgroundColor: '#7F73F7',
    textAlign: 'center',
    fontSize: 11,
    fontWeight: 'bold',
    color: '#FFF',
    borderRadius: 50,
  }
});

export default connect(({ shop, loading }) => ({ shop, loading }))(StoreScreen)
