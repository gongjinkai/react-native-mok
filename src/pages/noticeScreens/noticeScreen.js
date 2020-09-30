import React, { useState } from 'react'
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  Alert,
  RefreshControl,
  Image
} from 'react-native'
import { SwipeListView } from 'react-native-swipe-list-view'
import Spinner from 'react-native-loading-spinner-overlay'
import Toast from 'react-native-easy-toast'
import { connect } from 'react-redux'
import AntDesign from 'react-native-vector-icons/AntDesign'
import CustomHeader from '../../components/CustomHeader'
import NavigationUtil from '../../navigator/NavigationUtil'

const PAGE_SIZE = 10;

class NoticeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      pageNum: 1,
      pageSize: 10,
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      header: (
        <CustomHeader
          barStyle={'dark'}
          backgroundColor={'#fff'}
          title={ '消息通知' }
          goBack={ () => NavigationUtil.goBack(navigation) }/>
      )
    }
  };

  componentDidMount() {
    this.query();
    //添加statusBar监听
    this._navDidFocusListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor('#fff')
    });
  }

  componentWillUnmount() {
    this._navDidFocusListener.remove();
  }


  query() {
    this.props.dispatch({
      type: 'notice/query',
      payload: {
        pageNum: 1,
        pageSize: this.state.pageSize,
      }
    })
  }

  refresh() {
    this.props.dispatch({
      type: 'notice/refresh',
      payload: {
        pageNum: 1,
        pageSize: this.state.pageSize,
      }
    })
  }

  goDetail(item) {
    NavigationUtil.goPage({...this.props, id: item.id, title: item.title },'NoticeDetail')
  }


  deleteRow(rowMap, rowKey) {
    Alert.alert('提示', '您要删除这条消息记录吗', [
      {
        text: '取消',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel'
      },
      { text: '确认', onPress: () => { this.removeItem(rowMap, rowKey) }},
    ]);
  };

  removeItem(rowMap, rowKey) {
    this.props.dispatch({
      type: 'notice/removeItem',
      payload: {
        id: rowKey,
      }
    })
  }

  renderItem = item => (
    <TouchableHighlight
      onPress={() => this.goDetail(item) }>
      <View style={styles.notice_item}>
        <View>
          <View style={ styles.left_icon }>
            <AntDesign name={'bells'} size={20} color={'#fff'}/>
          </View>
        </View>
        <View>
          <Text style={ styles.title }>{ item.title }</Text>
          <Text style={ styles.date }>{ item.remindTimeStr }</Text>
        </View>
      </View>
    </TouchableHighlight>
  );

  closeRow(rowMap, rowKey) {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  onRowDidOpen(rowKey) {
    console.log('onRowDidOpen' + '-' +  rowKey);
  }

  // deleteRow(rowMap, rowKey) {
  //   this.closeRow(rowMap, rowKey);
  // }

  /** render 空页面 **/
  _renderEmptyContent() {
    return (
      <View style={ styles.empty_content }>
        <Image source={ require('../../../assets/images/list-empty.png') }/>
        <Text style={ styles.empty_text }>暂无消息</Text>
      </View>
    )
  }

  render() {
    const { loading, notice } = this.props;
    const { noticeList } = notice;
    return (
      <View style={ styles.container }>
        <SwipeListView
          style={{ marginTop: 20 }}
          disableRightSwipe={true}
          useNativeDriver={ true }
          ListEmptyComponent={ this._renderEmptyContent.bind(this) }
          onRowDidOpen={this.onRowDidOpen}
          data={ noticeList }
          previewRowKey={'id'}
          showsVerticalScrollIndicator={false}
          previewOpenValue={-40}
          previewOpenDelay={3000}
          ItemSeparatorComponent={
            () => (
              <View style={styles.separator} />
            )
          }
          renderHiddenItem={ (data, rowMap) => (
            <View style={styles.rowBack}>
              <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnLeft]}
                onPress={() => this.deleteRow(rowMap, data.item.key)}>
                <Text style={styles.backTextWhite}>标为已读</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnRight]}
                onPress={ () => this.deleteRow(rowMap, data.item.key)}>
                <Text style={styles.backTextWhite}>删除</Text>
              </TouchableOpacity>
            </View>
          )}
          rightOpenValue={-150}
          renderItem={ ({ item, index, separators }) => this.renderItem(item)}
          refreshControl = {
            <RefreshControl
              title={'加载中...'}
              colors={['red']}//此颜色无效
              tintColor={'orange'}
              titleColor={'red'}//只有ios有效
              refreshing={ loading.effects['notice/query'] || loading.effects['notice/query']  }
              onRefresh={ ()=>{
                this.refresh();
              }}
            />
          }/>
        <Spinner
          visible={ loading.effects['notice/query'] }
          textContent={'数据加载中...'}
          textStyle={styles.spinnerTextStyle}
        />
        <Toast ref="toast" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  spinnerTextStyle: {
    color: '#fff'
  },
  notice_item: {
    flexDirection: 'row',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: '#FFF'
  },
  left_icon: {
    marginRight:10,
    width: 40,
    height: 40,
    backgroundColor: '#636D76',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginBottom: 4,
    color: '#636D76',
    fontSize: 13,
  },
  date: {
    fontSize: 13,
    color: '#9C9C9C'
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#DBD5D5'
  },
  delete:{
    color:"#d8fffa",
    marginRight:30
  },
  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {
    alignItems: 'center',
    backgroundColor: '#CCC',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 50,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backRightBtnLeft: {
    backgroundColor: '#7F73F7',
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
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
})


export default connect(({ notice, loading }) => ({ notice, loading }))(NoticeScreen)
