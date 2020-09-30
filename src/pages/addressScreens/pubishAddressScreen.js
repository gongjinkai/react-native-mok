import React from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  DeviceEventEmitter,
} from 'react-native'
import Picker from 'react-native-picker'
import Toast from 'react-native-easy-toast'
import CustomHeader from '../../components/CustomHeader'
import NavigationUtil from '../../navigator/NavigationUtil'

class PublishAddressScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: <CustomHeader
        barStyle={'dark'}
        backgroundColor={'#fff'}
        title={ '新增收货地址' }
        goBack={ () => navigation.goBack() }/>
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      formData: {
        city: '',
        county: '',
        detailAddress: '',
        name: '',
        phoneNumber: '',
        province: ''
      },
      pickerShow: false,
    }
  }

  componentDidMount() {
    const { common } = this.props;
    const { cityData } = common;
    if(cityData.length === 0) {
      this.queryCity();
    }
  }

  componentWillUnmount() {
    Picker.hide();
  }

  queryCity() {
    this.props.dispatch({
      type: 'common/fetchCityData'
    })
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
    this.setState({
      pickerShow: true,
    });
    //文本框失焦
    this.nameInput.blur();
    this.phoneInput.blur();
    this.textarea.blur();
    Picker.init({
      pickerTitleText:'选择地区',
      pickerCancelBtnText:'取消',
      pickerConfirmBtnText:'确定',
      pickerData: this._createAreaData(),
      selectedValue: ['北京', '北京市', '东城区'],
      onPickerConfirm: pickedValue => {
        this.setState(prevState => ({
          formData: {
            ...prevState.formData,
            province: pickedValue[0],
            city: pickedValue[1],
            county: pickedValue[2]
          },
          pickerShow: false,
        }))
      },
      onPickerCancel: pickedValue => {
        this.setState({
          pickerShow: false,
        })
      },
      onPickerSelect: pickedValue => {
        console.log('area', pickedValue);
      }
    });
    Picker.show();
  }

  handleInputChange(key,value) {
    this.setState(prevState => ({
      formData: {
        ...prevState.formData,
        [key]: value,
      }
    }))
  }

  handleSubmit() {
    this.props.dispatch({
      type: 'common/addAddress',
      payload: this.state.formData,
    }).then(res => {
      if(res.code === 1) {
        this.toast.show(res.message,200,() => {
          DeviceEventEmitter.emit('query');
          NavigationUtil.goBack(this.props.navigation)
        })
      } else {
        this.toast.show(res.message, 'center')
      }
    })
  }

  handleClosePicker() {
    Picker.hide();
    this.setState({
      pickerShow: false,
    })
  }


  render() {
    const { formData , pickerShow} = this.state;
    return (
      <View style={ styles.container }>
        <View style={ styles.form_content }>
          <View style={ styles.form_item }>
            <Text style={ styles.form_item_label }>收货人：</Text>
            <TextInput
              ref={ (ref) => this.nameInput = ref }
              style={ styles.text_input }
              placeholder={'收货人姓名'}
              placeholderTextColor={'#C2C2C2'}
              onChangeText={ e => this.handleInputChange('name', e) } />
          </View>
          <View style={ styles.form_item }>
            <Text style={ styles.form_item_label }>手机号：</Text>
            <TextInput
              ref={ (ref) => this.phoneInput = ref }
              style={ styles.text_input }
              placeholder={'请填写收货手机号'}
              placeholderTextColor={'#C2C2C2'}
              onChangeText={ e => this.handleInputChange('phoneNumber', e) } />
          </View>
          <View style={ styles.form_item }>
            <Text style={ styles.form_item_label }>所在地区：</Text>
            <TouchableOpacity style={ styles.arrow_right } onPress={ () => this._showAreaPicker() }>
              <Text style={[styles.region_text, formData.province === '' ? { color: '#C2C2C2'}: { color: '#666666'}]}>{ formData.province === '' ? '请选择省/市/县(区)': formData.province + ' ' +  formData.city + ' ' +  formData.county }</Text>
              <Image source={ require('../../../assets/icons/icon-baseline-right.png') } />
            </TouchableOpacity>
          </View>
          <View style={[styles.form_item, { alignItems: 'flex-start' }]}>
            <Text style={[styles.form_item_label, { paddingTop: 10 }]}>详细地址：</Text>
            <TextInput
              style={[styles.text_input, { minHeight: 160, textAlignVertical: 'top' }]}
              multiline={true}
              ref={ (ref) => this.textarea = ref }
              placeholder={'请输入详细地址'}
              placeholderTextColor={'#C2C2C2'}
              onChangeText={ e => this.handleInputChange('detailAddress', e) } />
          </View>
        </View>
        <View style={ styles.footer}>
          <TouchableOpacity style={ styles.btn_primary } onPress={ () => this.handleSubmit() }>
            <Text style={ styles.btn_primary_text }>保存并使用</Text>
          </TouchableOpacity>
        </View>
        {
           pickerShow ? <TouchableOpacity
             style={{
               position: 'absolute',
               bottom: 0,
               top: 0,
               left: 0,
               right: 0,
               backgroundColor: 'rgba(0,0,0,.6)'
             }}
             activeOpacity={ 1 }
             onPress={ () => this.handleClosePicker() }>
             <View />
           </TouchableOpacity> : null
        }
        <Toast ref={ (ref) => { this.toast = ref }}  position="center"/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form_content: {
    marginTop: 12,
    backgroundColor: '#fff'
  },
  form_item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
    marginRight: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2'
  },
  form_item_label: {
    minWidth: 70,
    fontSize: 15,
    color: '#636D76',
    fontWeight: 'bold'
  },
  arrow_right: {
    flex: 2,
    paddingTop: 19,
    paddingBottom: 19,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  region_text: {
    fontSize: 15,
  },
  text_input: {
    flex: 1,
  },
  btn_primary: {
    marginTop: 20,
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
  }
});

export default connect(({ common, loading }) => ({ common, loading }))(PublishAddressScreen)
