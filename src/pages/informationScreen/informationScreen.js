import React from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, StatusBar, Image, TouchableOpacity } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import ImagePicker from 'react-native-image-picker';
import Picker from 'react-native-picker'
import Toast from 'react-native-easy-toast'
import CustomHeader from '../../components/CustomHeader'

const options = {
  title: '选择图片',
  cancelButtonTitle: '取消',
  takePhotoButtonTitle: '拍照',
  chooseFromLibraryButtonTitle: '从相册选取',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  }
};

class InformationScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: <CustomHeader
        barStyle={'dark'}
        backgroundColor={'#fff'}
        title={ '个人资料' }
        goBack={ () => navigation.goBack() }/>
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      userinfo: {},
      currentDate: this._getCurrentDate(),
    }
  }

  componentDidMount() {
    //增加页面监听手动关闭Picker
    this._navDidFocusListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor('#FFF')
    })
    this._navDidBlurListener = this.props.navigation.addListener('didBlur', () => {
      Picker.hide();
    });
    this.query();
    this.queryCity();
  }

  componentWillUnmount() {
    Picker.hide();
    this._navDidBlurListener.remove();
    this._navDidFocusListener.remove();
  }

  query() {
    this.props.dispatch({
      type: 'common/getUserinfo'
    }).then(res => {
      if(res.code === 1) {
        this.setState({
          userinfo: res.data,
        })
      }
    })
  }

  queryCity() {
    this.props.dispatch({
      type: 'common/fetchCityData'
    })
  }

  chooseAvatar() {
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: 'file://' + response.path, fileName: response.fileName };

        this.props.dispatch({
          type: 'common/uploadAvatarFile',
          payload: source,
        }).then(res => {
          this.refs.toast.show(res.message);
          if(res.code === 1) {
            this.setState(prevState => ({
              userinfo: {
                ...prevState.userinfo,
                member: {
                  ...prevState.userinfo.member,
                  icon: 'file://' + response.path,
                }
              }
            }))
          }
        })
      }
    });
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
    let currDate = new Date()
    let year = currDate.getFullYear()
    let month = currDate.getMonth()+1
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
    let year = '';
    let month = '';
    let day = '';
    let dateStr = this.state.currentDate;
    year = dateStr.substring(0,4);
    month = parseInt(dateStr.substring(5,7));
    day = parseInt(dateStr.substring(8,10));
    Picker.init({
      pickerTitleText:'选择生日',
      pickerCancelBtnText:'取消',
      pickerConfirmBtnText:'确定',
      selectedValue:[year+'年',month+'月',day+'日'],
      pickerBg:[255,255,255,.7],
      pickerData: this._createDateData(),
      pickerFontColor: [33, 33 ,33, 1],
      onPickerConfirm: (pickedValue, pickedIndex) => {
        let year = pickedValue[0].substring(0,pickedValue[0].length-1)
        let month = pickedValue[1].substring(0,pickedValue[1].length-1)
        month = month.padStart(2,'0');
        let day = pickedValue[2].substring(0,pickedValue[2].length-1)
        day = day.padStart(2,'0');
        let str = year+'-'+month+'-'+day;

        this.props.dispatch({
          type: 'common/updateUser',
          payload: {
            birthday: str,
          },
        }).then(res => {
          this.refs.toast.show(res.message);
          if(res.code === 1) {
            this.setState(prevState => ({
              userinfo: {
                ...prevState.userinfo,
                member: {
                  ...prevState.userinfo.member,
                  birthday: str
                }
              }
            }))
          }
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

  //组装地区数据
  _createAreaData() {
    const area = this.props.common.cityData;
    let data = [];
    let len = area.length;
    for(let i=0;i<len;i++){
      let city = [];
      for(let j=0,cityLen=area[i]['cityList'].length;j<cityLen;j++){
        let _city = {};
        let countys = area[i]['cityList'][j]['countyList'].map(item => {
          return item.countyname;
        });
        _city[area[i]['cityList'][j]['cityname']] = countys;
        city.push(_city);
      }
      let _data = {};
      _data[area[i]['provincename']] = city;
      data.push(_data);
    }
    return data;

  }

  _showAreaPicker() {
    Picker.init({
      pickerTitleText:'选择地区',
      pickerCancelBtnText:'取消',
      pickerConfirmBtnText:'确定',
      pickerData: this._createAreaData(),
      selectedValue: ['北京', '北京市', '东城区'],
      onPickerConfirm: pickedValue => {
        this.props.dispatch({
          type: 'common/updateUser',
          payload: {
            city: pickedValue[1]
          },
        }).then(res => {
          this.refs.toast.show(res.message);
          if(res.code === 1) {
            this.setState(prevState => ({
              userinfo: {
                ...prevState.userinfo,
                member: {
                  ...prevState.userinfo.member,
                  city: pickedValue[1]
                }
              }
            }))
          }
        })
      },
      onPickerCancel: pickedValue => {
        console.log('area', pickedValue);
      },
      onPickerSelect: pickedValue => {
        //Picker.select(['山东', '青岛', '黄岛区'])
        console.log('area', pickedValue);
      }
    });
    Picker.show();
  }

  render() {
    const { loading } = this.props;
    const { userinfo } = this.state;
    return (
      <View style={ styles.container }>
        <View style={ styles.info_list }>
          <TouchableOpacity
            onPress={ () => this.chooseAvatar() }
            style={[styles.info_item, { paddingTop: 8, paddingBottom: 8 }]}>
            <View style={ styles.arrow_left }>
              <Text style={ styles.label }>头像</Text>
            </View>
            <View style={ styles.arrow_right }>
              <Image source={{ uri: userinfo.member ? userinfo.member.icon : '' }} style={ styles.avatar }/>
              <Image
                style={ styles.icon_right }
                source={ require('../../../assets/icons/icon-back_dark.png') } />
            </View>
          </TouchableOpacity>
          <View style={ styles.info_item }>
            <View style={ styles.arrow_left }>
              <Text style={ styles.label }>用户昵称</Text>
            </View>
            <View style={ styles.arrow_right }>
              <Text style={ styles.label }>{ userinfo.member ? userinfo.member.nickname: '' }</Text>
              <Image
                style={ styles.icon_right }
                source={ require('../../../assets/icons/icon-back_dark.png') } />
            </View>
          </View>
          <View style={ styles.info_item }>
            <View style={ styles.arrow_left }>
              <Text style={ styles.label }>生日</Text>
            </View>
            <TouchableOpacity style={ styles.arrow_right } onPress={ ()=>this._showDatePicker() }>
              <Text style={ styles.label }>{ userinfo.member ? userinfo.member.birthday: '' }</Text>
              <Image
                style={ styles.icon_right }
                source={ require('../../../assets/icons/icon-back_dark.png') } />
            </TouchableOpacity>
          </View>
          <View style={[styles.info_item, { borderBottomWidth: 0 }]}>
            <View style={ styles.arrow_left }>
              <Text style={ styles.label }>城市</Text>
            </View>
            <TouchableOpacity style={ styles.arrow_right } onPress={ () => this._showAreaPicker() }>
              <Text style={ styles.label }>{ userinfo.member ? userinfo.member.city: '' }</Text>
              <Image
                style={ styles.icon_right }
                source={ require('../../../assets/icons/icon-back_dark.png') } />
            </TouchableOpacity>
          </View>
        </View>
        <Spinner
          visible={ loading.effects['common/getUserinfo'] }
          textContent={'数据加载中...'}
          textStyle={styles.spinnerTextStyle}
        />
        <Toast ref="toast" position="center"/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  info_list: {
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: '#FFF'
  },
  info_item: {
    marginLeft: 15,
    marginRight: 10,
    paddingTop: 15,
    paddingBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2'
  },
  label: {
    fontSize: 15,
    color: '#636D76',
    fontWeight: 'bold'
  },
  arrow_right: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  icon_right: {
    transform: [{rotate:'180deg'}]
  },
});

export default connect(({ common, loading }) => ({ common, loading }))(InformationScreen)
