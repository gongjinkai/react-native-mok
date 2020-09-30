# 基于dva 的react-native项目
[![React](https://img.shields.io/badge/react-^16.11.0-brightgreen.svg?style=flat-square)](https://github.com/facebook/react)
[![React-native](https://img.shields.io/badge/react--native-0.62.2-brightgreen)](https://github.com/facebook/react-native)
[![dva](https://img.shields.io/badge/dva-^2.0.2-orange.svg?style=flat-square)](https://github.com/dvajs/dva)


## 已完成
-   集成dva.js 封装axios。
-   解决安卓物理返回键问题。
-   react-navigation 集成。
-   react-native-picker 异步请求数据省市区三级 日期选择
-   react-native-http-cache Android端报错问题  清理缓存
    安卓端报错解决方案
    node_modules>>react-native-http-cache>>android>>src>>main>>java>>cn>>reactnative>>httpcache>>HttpCacheModule.java
    在getImageCacheSize()中替换这2个方法
     //FileCache cache1 = ImagePipelineFactory.getInstance().getMainDiskStorageCache();
    FileCache cache1 = ImagePipelineFactory.getInstance().getMainFileCache();

    //FileCache cache2 = ImagePipelineFactory.getInstance().getSmallImageDiskStorageCache();
    FileCache cache2 = ImagePipelineFactory.getInstance().getSmallImageFileCache();
-   react-navigation4.x 页面切换动画选择
-   react-native-swiper 轮播图
-   react-native-modal 底部滑出modal效果,
-   react-native-actionsheet
-   react-native-camera 扫描二维码功能
-   react-native-fs  文件操作，完成保存图片功能
-   react-native-hyperlink 解析文本中的link，设置Style
-   react-native-loading-spinner-overlay 页面加载效果
-   react-native-pages  移动端翻页效果，****tip 按钮替代手势使用ref获取元素调用next
-   react-native-easy-toast  轻量的toast弹窗
-   react-native-star-rating 评分组件，类似Element-UI start Component

