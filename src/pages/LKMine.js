/**
 * Created By hasee on 2020/5/22
 */
import React from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    ImageBackground,
    Dimensions,
    TouchableOpacity
} from 'react-native'
import ParallaxScrollView from 'react-native-parallax-scroll-view';
const { width, height} = Dimensions.get('window');

const ScrollList = (props) => {
    return (
        <View>
            <View style={{alignItems:'center',flexDirection:'row',justifyContent:'space-between',padding:10,backgroundColor:'#fff',borderBottomColor:'#efefef',borderBottomWidth:1}}>
                <View style={{alignItems:'center'}}>
                    <Text style={{}}>借款</Text>
                    <Text style={{marginTop:5}}> 93,943.44</Text>
                </View>
                <Text style={{fontSize:15}}>+903.09 USDT</Text>

            </View>
            <View style={{alignItems:'center',flexDirection:'row',justifyContent:'space-between',padding:10,backgroundColor:'#fff',borderBottomColor:'#efefef',borderBottomWidth:1}}>
                <View style={{alignItems:'center'}}>
                    <Text style={{}}>借款</Text>
                    <Text style={{marginTop:5}}> 93,943.44</Text>
                </View>
                <Text style={{fontSize:15}}>+903.09 USDT</Text>

            </View>
            <View style={{alignItems:'center',flexDirection:'row',justifyContent:'space-between',padding:10,backgroundColor:'#fff',borderBottomColor:'#efefef',borderBottomWidth:1}}>
                <View style={{alignItems:'center'}}>
                    <Text style={{}}>借款</Text>
                    <Text style={{marginTop:5}}> 93,943.44</Text>
                </View>
                <Text style={{fontSize:15}}>+903.09 USDT</Text>

            </View>
            <View style={{alignItems:'center',flexDirection:'row',justifyContent:'space-between',padding:10,backgroundColor:'#fff',borderBottomColor:'#efefef',borderBottomWidth:1}}>
                <View style={{alignItems:'center'}}>
                    <Text style={{}}>借款</Text>
                    <Text style={{marginTop:5}}> 93,943.44</Text>
                </View>
                <Text style={{fontSize:15}}>+903.09 USDT</Text>
            </View>
        </View>
    )
}
const TitleContent = (props) => {
    return (
        <View style={{
                     width: width,
                     height: 250,
                     justifyContent: 'center',
                     marginTop:30
        }}>
            <View style={{flex:1,alignItems:'center'}}>
                <Text style={{color:'white',fontSize:28,marginTop:50}}>BTC</Text>
            </View>
            <View style={{flexDirection:'row',flex:1}}>
                <View style={{flex:1}}>
                    <Text style={{paddingVertical: 5 ,textAlign:'center',color:'white'}}> 93,943.44</Text>
                    <Text style={{paddingVertical: 5 ,textAlign:'center',color:'white'}}>总资产</Text>
                </View>
                <View style={{flex:1}}>
                    <Text style={{paddingVertical: 5 ,textAlign:'center',color:'white'}}>93,943.44</Text>
                    <Text style={{paddingVertical: 5 ,textAlign:'center',color:'white'}}> 可用资产</Text>
                </View>
                <View style={{flex:1}}>
                    <Text style={{paddingVertical: 5 ,textAlign:'center',color:'white'}}> 93,943.44 </Text>
                    <Text style={{paddingVertical: 5 ,textAlign:'center',color:'white'}}> 冻结资产</Text>
                </View>
            </View>
        </View>
    )
}



export default class LKMine extends React.Component {
    render() {
        console.log(this.props)
        return (
             <View style={{ flex: 1 }}>
               <View style={styles.container}>
                     <ParallaxScrollView
                               backgroundColor="transparent"
                               contentBackgroundColor="transparent"
                               headerBackgroundColor="#333"
                               stickyHeaderHeight={40}
                               parallaxHeaderHeight={250}
                               backgroundSpeed={10}
                               //设置头部背景图片
                               renderBackground={() => (
                                    <View key="background">
                                        <Image
                                            source={{uri: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=938228035,334724885&fm=26&gp=0.jpg'}}
                                            style={{
                                            width: width,
                                            height: 250,
                                            }}>
                                        </Image>
                                        <View style={{ position: 'absolute', top: 0, width: window.width, backgroundColor: 'rgba(0,0,0,.4)', height: 250 }}/>
                                    </View>
                                    )
                               }
                               //自定义头部内容
                               renderForeground={() => (
                                   <TitleContent />
                                 )
                               }
                              //导航栏标题
                               renderStickyHeader={() => (
                                   <View key="sticky-header" style={styles.stickySection}>
                                       <Text style={styles.stickySectionText}>详情页</Text>
                                   </View>
                                    )
                               }
                               //固定的导航栏样式
                               renderFixedHeader ={ () => (
                                   <View key="fixed-header" style={styles.fixedSection}>
                                       <TouchableOpacity style={{height: 25, width: 25}}
                                                           onPress={() => {
                                                           }}>
                                           <Image source={{ uri: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1590511310924&di=401315df4b251568d6ed6682df3a1a04&imgtype=0&src=http%3A%2F%2Fpic.51yuansu.com%2Fpic2%2Fcover%2F00%2F30%2F96%2F58109c29cd7db_610.jpg' }} style={{height: 21, width: 11,marginLeft:10}} />
                                       </TouchableOpacity>
                                       <TouchableOpacity style={{}} onPress={ () => {
                                           this.props.navigation.goBack()
                                       }}>
                                              <Text style={{color:'#fff',marginRight:10}}>记录</Text>
                                       </TouchableOpacity>
                                       </View>
                                       )
                               }>
                               <View style={{marginTop:10}}>
                                   {  /* 自定义内容 */}
                                   <ScrollList />
                               </View>
                           </ParallaxScrollView>
               </View>
             </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#efefef'
    },
    header: {
        backgroundColor: '#3E71FC'
    },
    parallaxHeader: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'column',
        paddingTop: 100
    },
    stickySection: {
        flexDirection: 'row',
        alignItems: "center",
        height: 50,
        width: width,
        backgroundColor: "#000",
        justifyContent: 'space-around'
    },
    stickySectionText: {
        color: 'white',
        fontSize: 20,
        margin: 10,
    },
    fixedSection: {
        width: width,
        position: 'absolute',
        height: 50,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
});
