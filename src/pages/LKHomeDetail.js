/**
 * Created By hasee on 2020/5/22
 */
import React from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
  Dimensions,
  Image,
  FlatList,
  RefreshControl,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import Swiper from 'react-native-swiper'
import Picker from 'react-native-picker'
import px from '../utils/px'


const imgData = [
  "https://m.360buyimg.com/mobilecms/s772x376_jfs/t23224/12/1547449730/265644/6da76a53/5b627790N1beab594.jpg!cr_1125x549_0_72!q70.jpg.dpg.webp",
  "https://m.360buyimg.com/mobilecms/s772x376_jfs/t23389/341/1459755771/98229/bdf1b674/5b619766Nb8e94478.jpg!cr_1125x549_0_72!q70.jpg.dpg.webp",
  "https://m.360buyimg.com/mobilecms/s772x376_jfs/t23560/365/1407572473/129109/377153ef/5b6010acN1b265667.jpg!cr_1125x549_0_72!q70.jpg.dpg.webp",
  "https://m.360buyimg.com/mobilecms/s772x376_jfs/t25549/223/5998595/106769/8dfb1308/5b62a8a3Nae1a28e1.jpg!cr_1125x549_0_72!q70.jpg.dpg.webp",
  "https://m.360buyimg.com/mobilecms/s772x376_jfs/t24148/59/1544888845/169957/6b3a521d/5b62a6edNd0172ab9.jpg!cr_1125x549_0_72!q70.jpg.dpg.webp",
];


class LKHomeDetail extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        currentDate:this._getCurrentDate(),
      }
    }
    static navigationOptions = ({ navigation }) => {
        return {
            title: '详情页',
            headerShown: false,
        }
    };

    componentDidMount() {
      this.query();
    }

    query() {
      this.props.dispatch({
        type: 'common/query'
      })
    }

    _onEndReached() {
        this.props.dispatch({
          type: 'common/loadMore'
        })
    }

  //获取当前日期  格式如 2018-12-15
  _getCurrentDate(){
    var currDate = new Date()
    var year = currDate.getFullYear()
    var month = (currDate.getMonth()+1).toString()
    month = month.padStart(2,'0')
    var dateDay = currDate.getDate().toString()
    dateDay = dateDay.padStart(2,'0')
    let time = year+'-'+month+'-'+dateDay
    return time;
  }
  //组装日期数据
  _createDateData(){
    let date = [];
    var currDate = new Date()
    var year = currDate.getFullYear()
    var month = currDate.getMonth()+1
    for(let i=1970;i<=year;i++){
      let month = [];
      for(let j = 1;j<13;j++){
        let day = [];
        if(j === 2){
          for(let k=1;k<29;k++){
            day.push(k+'日');
          }
          //Leap day for years that are divisible by 4, such as 2000, 2004
          if(i%4 === 0){
            day.push(29+'日');
          }
        }
        else if(j in {1:1, 3:1, 5:1, 7:1, 8:1, 10:1, 12:1}){
          for(let k=1;k<32;k++){
            day.push(k+'日');
          }
        }
        else{
          for(let k=1;k<31;k++){
            day.push(k+'日');
          }
        }
        let _month = {};
        _month[j+'月'] = day;
        month.push(_month);
      }
      let _date = {};
      _date[i+'年'] = month;
      date.push(_date);
    }
    return date;
  }
  //打开日期选择 视图
  _showDatePicker() {
    var year = ''
    var month = ''
    var day = ''
    var dateStr = this.state.currentDate
    //console.log('dateStr',dateStr)
    year = dateStr.substring(0,4)
    month = parseInt(dateStr.substring(5,7))
    day = parseInt(dateStr.substring(8,10))
    Picker.init({
      pickerTitleText:'时间选择',
      pickerCancelBtnText:'取消',
      pickerConfirmBtnText:'确定',
      selectedValue:[year+'年',month+'月',day+'日'],
      pickerBg:[255,255,255,1],
      pickerData: this._createDateData(),
      pickerFontColor: [33, 33 ,33, 1],
      onPickerConfirm: (pickedValue, pickedIndex) => {
        console.log(pickedIndex);
        var year = pickedValue[0].substring(0,pickedValue[0].length-1)
        var month = pickedValue[1].substring(0,pickedValue[1].length-1)
        month = month.padStart(2,'0')
        var day = pickedValue[2].substring(0,pickedValue[2].length-1)
        day = day.padStart(2,'0')
        let str = year+'-'+month+'-'+day
        this.setState({
          currentDate:str,
        })
      },
      onPickerCancel: (pickedValue, pickedIndex) => {
        console.log('date', pickedValue, pickedIndex);
      },
      onPickerSelect: (pickedValue, pickedIndex) => {
        console.log('date', pickedValue, pickedIndex);
      }
    });
    Picker.show();
  }



  render() {
        const { common, loading } = this.props;
        const { list } = common;
        return (
            <View style={{ flex: 1, height: '100%' }}>
              <View style={{ height: 200 }}>
                  <Swiper
                    paginationStyle={{ bottom: 30 }}
                    horizontal={ true }
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
                      backgroundColor: '#fff',
                      width: 16,
                      height: 8,
                      borderColor: '#fff',
                      borderWidth: 1.5,
                      borderRadius: 8,
                      marginRight: 6,
                    }}/>}>
                    {imgData.map((item,index)=>(
                      <Image
                        source={{uri:item}}
                        style={{width:Dimensions.get('window').width,height:Dimensions.get('window').width / 2}}
                        key={index}
                      />
                    ))}
                  </Swiper>
              </View>
              <TouchableOpacity onPress={()=>this._showDatePicker()}>
                <Text>打开选择器</Text>
              </TouchableOpacity>
              <FlatList
                data={list}
                keyExtractor={(item, index) => item.id}
                renderItem={ ({ item,index }) => (
                  <TouchableOpacity>
                    <View key={index} style={ styles.item }>
                        <View>
                          <Image source={{
                            uri: item.img_url
                          }} style={{ width: 50, height: 50 }}/>
                        </View>
                        <View>
                          <View>
                            <Text>{ item.title }</Text>
                          </View>
                        </View>
                    </View>
                  </TouchableOpacity>
                ) }
                refreshControl = {
                  <RefreshControl
                    title={'加载中...'}
                    colors={['red']}//此颜色无效
                    tintColor={'orange'}
                    titleColor={'red'}//只有ios有效
                    refreshing={ loading.effects['common/query'] ||loading.effects['common/query']  }
                    onRefresh={ ()=>{
                      this.query()
                    }}
                  />
                }
                onEndReached={ () => this._onEndReached() }
                onEndReachedThreshold={0.1}
                ItemSeparatorComponent={ () => { return (<View style={ styles.line } />) } }
                ListEmptyComponent={()=>{return(<Text>暂无记录</Text>)}} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
  line: {
    marginLeft: px(20),
    marginRight: px(20),
    borderBottomWidth: 1,
    borderBottomColor: '#999',
  },
  item: {
    marginTop: px(20),
    marginLeft: px(20),
    marginRight: px(20),
    marginBottom: px(20),
    flexDirection: 'row'
  }
});


export default connect(({ common, loading }) => ({ common, loading }))(LKHomeDetail)
