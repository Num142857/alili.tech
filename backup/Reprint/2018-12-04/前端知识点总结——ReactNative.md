---
title: '前端知识点总结——ReactNative' 
date: 2018-12-04 2:30:05
hidden: true
slug: 8chgtjyddxr
categories: [reprint]
---

{{< raw >}}

                    
<h2>一、ReactNative概述</h2>
<pre><code>移动端开发的3种常见模式：
    1、WebApp
        理解1：
            通过前端技术 编写的可以运行在手机浏览器端的网页，
            提供的用户体验 类似于app用户体验
            --》WebApp
        理解2：
            结合着前端技术 加上原生开发时WebView组件，
            生成的应用程序 --》WebApp
        
        优势：跨平台
    2、NativeApp
            调用官方所提供的SDK（software develop kit）
            中的控件来编程，
            而生成的可以直接安装在手机操作系统的app --》NativeApp
        优势：良好的性能

    3、HybridApp
        混合编程 结合着前端代码和原生开发技术混合编程而生成的，
      可以直接安装在手机操作系统的app
        ---》 HybridApp
        

1、what？
    ReactNative是为了实现原生移动端开发的，基于React的框架
    
    ReactNative的工作原理：
        ReactNative封装了很多的组件，
     而这些组件在调用时是通过js和react的语法调用，调用之后，
     编译成真正的SDK的控件

    RN最大的特点：
        将各种各样的SDK中提供的原生控件，封装成一些可以通过js去调用的React中组件
        View都会直接对应一个平台的原生视图，无论它是UIView、
       &lt;div&gt;还是android.view.View

2、why？
        free
        开发成本很低
        开发的移动端的原生应用程序，性能很好

3、where？
    前端开发人员可以使用RN来实现原生移动端App的开发

开发理念：
    learn once, write anywhere

4、how？
    环境的搭建：
        方案1：
                //安装一个叫做create-react-native-app的包
             npm install -g create-react-native-app
             //创建一个有reactNative模板的项目
             create-react-native-app my-app
             //进入到工程
             cd my-app/
             //启动开发服务器
             npm start
        方案2：（课堂）
            npm install react-native-cli
            react-native init my-app
            cd my-app
            npm install
            npm start


    ①pc端 
    执行reactNative官方所提供的代码，启动开发服务器（npm start）
    ②mobile端
        安装蓝叠模拟器
        启动模拟器
        安装了app-debug.apk 可以去配置要连接的服务器的地址和端口号

        预览

    具体步骤：
        ①将myapp_no_install.rar拷贝到 
         C:\xampp\htdocs\13_FRAMEWORK\react\rn文件夹
        ②将压缩包解压缩到当前文件夹
        ③将node_modules.rar
        拷贝到C:\xampp\htdocs\13_FRAMEWORK\react\rn文件夹
        ④将node_modules.rar压缩包解压缩到当前文件夹
        ⑤打开vscode,点击左上角的文件，选择打开文件夹，找到
        C:\xampp\htdocs\13_FRAMEWORK\react\rn，打开
        ⑥打开集成终端(ctr+`),npm start,启动一个服务器，
         占用的端口号默认是8081

        
        移动端：
            ①打开蓝叠模拟器
            ②安装myapp到 
    C:\xampp\htdocs\13_FRAMEWORK\react\rn\android
     \app\build\outputs\apk文件夹中，
            找到app-debug.apk，将这个文件拖拽到蓝叠中进行安装
            ③在蓝叠中打开myapp，设置要连接的pc端的host和port
            
            windows+R -&gt; cmd -&gt;ipconfig -》ipv4的地址
            172.173.100.97
            8081

            按下shake（摇一摇），在弹出菜单中，找到最下边dev settings并点击，
            在新的弹出菜单中，选中debug server host &amp; port并点击，
            输入当前pc端的ip地址和8081，点击确定，返回，reload

</code></pre>
<h2>二、ReactNative组件的创建和使用</h2>
<pre><code>
组件统一放在RN项目中app/components/

1、创建组件
    import React,{Component} from 'react';
    import {Text} from 'react-native';
    
    export default class Demo01Component extends Component{

        render:function(){
            return &lt;Text&gt;Hello&lt;/Text&gt;
        }
    }
2、其它组件中使用组件
    import Demo01Component from'./app/components/demo01/demo01'

    &lt;Demo01Component&gt;&lt;/Demo01Component&gt;

在ReactNative中的开发过程中，使用ReactJS学习到的各种概念（React）,
符合官方的slogen: learn once,write anywhere(学习一次React，就可以在各个平台编写)

</code></pre>
<h2>三、ReactNative提供的组件</h2>
<pre><code>Text
    作为一个文本段落使用
StyleSheet
    ①先引入StyleSheet
    ②创建样式类
        const myStyles = StyleSheet.create({
            myText:{},
            myView:{}
        })
    ③使用
        &lt;Text style={myStyles.myText}&gt;&lt;/Text&gt;

View
    作为一个容器去使用

Image
    ① 引入组件类
        import {Image} from 'react-native'
    ②调用
        加载本地的图片
        &lt;Image source={require('../*.png')}&gt;&lt;/Image&gt;
        加载服务器端的图片
        &lt;Image source="{{"uri:'imgUrl'"}}"&gt;&lt;/Image&gt;


    注意事项：在引入本地资源图片时，不允许在require方法中出现任何的运算

Button    
    ①引入
        import {Button} from 'react-native'
    ②调用
        &lt;Button title="" onPress={this.handlePress}&gt;&lt;/Button&gt;

state
    三个基本操作
        ①初始化
            constructor(){
                super();
                this.state = {
                    count:1,
                    value:2
                }
            }
        ②读操作
            this.state.count
        ③写操作
            this.setState({count:2})

lifecycle
    处理函数依然可以正常使用</code></pre>
<p>补充：</p>
<pre><code>1、如何查看在控制台的输出
    shake 按下菜单键--》弹出菜单--》Debug JS Remotely
    默认打开浏览器的标签页 f12


</code></pre>
<h2>四、ReactNative封装的组件</h2>
<p>1、FlatList、</p>
<p>高性能的列表组件</p>
<pre><code>要将一个数组 渲染到列表的话：①渲染什么数据 ②列表显示什么内容

具体步骤：
    ①import {FlatList} from 'react-native'

    ②&lt;FlatList &gt;&lt;/FlatList&gt;

    ③准备FlatList要用到的数据，并通过data属性 指定要渲染的数据
    &lt;FlatList data={["zhangsan","lisi","wanger"]}&gt;&lt;/FlatList&gt;

    ④通过renderItem去指定 要将数据渲染在什么样的组件中

    &lt;FlatList 
    renderItem={(info)=&gt;{return &lt;Text&gt;{info.item}&lt;/Text&gt;"}}"
    data={["zhangsan","lisi","wanger"]}&gt;&lt;/FlatList&gt;
</code></pre>
<p>2、TextInput<br>表单的输入框的组件</p>
<pre><code>基本步骤
    ①import {TextInput} from 'react-native'
    ②&lt;TextInput&gt;&lt;/TextInput&gt;
    ③onChangeText={(text)=&gt;{//text就是当前输入框中的值"}}"
    TextInput的onChangeText的事件处理函数是有参数！
    ④TextInput是支持常用的属性
        secureTextEntry={true}
        keyboardType="numeric"
        placeholder=""
        placeholderTextColor="green"


</code></pre>
<p>3、TouchableOpacity<br>将需要添加上点按,透明度渐变效果的组件放在TouchableOpacity中</p>
<pre><code>具体步骤
    ①import {TouchableOpacity} from 'react-native'
    ② &lt;TouchableOpacity onPress={this.handlePress}&gt;
        &lt;Text&gt;&lt;/Text&gt;
    &lt;/TouchableOpacity&gt;
</code></pre>
<p>4、fetch<br>Angular中发起网络请求：</p>
<pre><code>①创建一个服务
②Http Response
    sendRequest(myUrl:string){
        return this.http.get(myUrl, 
      {withCredentials:true}).map((response:Response)=&gt;{
            return response.json()
        })
    }

③服务要指定提供商 providers
④调用
    import 
    实例化
    this.myHS.sendRequest().subscribe(()=&gt;{})
</code></pre>
<p>Vue中发起网络请求：<br> vue-resource<br> this.$http.get().then()</p>
<p>ReactNative</p>
<pre><code>fetch可以实现与远程服务器端的交互

    fetch('')
        .then((response)=&gt;{return response.json()})
        .then((result)=&gt;{//result就是服务器端返回的真正的数据})

    
</code></pre>
<p>5、ScrollView</p>
<pre><code>当前的视图中，如果要渲染的组件，放在一起，高度假设超过了屏幕的高度，
可以指定scrollView添加上下滚动的效果
     基本步骤：
        ①引入
            import {ScrollView} from 'react-native'
        ②将ScrollView作为一个容器去调用
            &lt;ScrollView&gt;                
            &lt;/ScrollView&gt;

对于表单受控元素：
    ①初始化状态
    ②将状态绑定value属性
    ③在onValueChange事件处理函数中 修改状态

    </code></pre>
<p>6、Switch</p>
<pre><code>
    这是一个受控的表单元素
     基本步骤：
        ①import {Switch} from 'react-native'
        ②&lt;Switch&gt;&lt;/Switch&gt;
        ③指定value属性 onValueChange绑定事件处理函数
        搞定受控表单元素
  Text/View/Button/TextInput/Switch/StyleSheet
  FlatList/TouchableOpacity/ScrollView
</code></pre>
<p>7、Flexbox</p>
<pre><code>在ReactNative的开发中，使用Flexbox 弹性盒子进行布局。
    flexDirectiion 指定主轴的方向 row/column
    justifyContent 指定子元素沿着主轴的对齐方式
    alignItems     指定子元素沿着次轴的对齐方式
    
    注意事项：在ReactNative中，主轴沿着纵向（column）


目标：使用ReactNative所封装的各种组件，来实现原生的app：ToDoBox

实现：
    1.在app/components/todobox的文件夹
    在这个文件夹中，去创建
    todobox.js ToDoBoxComponent
    todoinput.js ToDoInputComponent
    todolist.js ToDoListComponent
    todoitem.js ToDoItemComponent

    2.完成各个组件的模板内容的指定

    3.添加
    4.删除



</code></pre>
<p>在实现ToDoBox的过程中，将数据发给了ToDoList，<br>在渲染FlatList的过程中遇到了两个问题：</p>
<p>①ToDoList接收到通过属性传来的值，将值设置为最新的状态</p>
<pre><code>选择是componentWillReceiveProps指定接收最新的属性的值 并更新状态

不要使用和update相关的处理函数，否则会stackSize
</code></pre>
<p>②FlatList的data属性对应的状态 发生变化时，视图却没有更新</p>
<pre><code>指定了extraData={this.state}
</code></pre>
<p>③FlatList在渲染列表项，指定key，解决警告问题</p>
<pre><code>将一个字符串数组 改造成一个对象数组，在对象中只需要指定key的属性就可以

</code></pre>
<p>删除功能：（10"50 -11"05）</p>
<pre><code>当点击todoitem中的删除button时，实现从todobox中删除一个指定位置的元素 
    ①在todobox中定义一个带有参数的方法
    ②将方法先传递给todolist
    ③将方法通过todolist传递给todoitem
    ④todoitem在点击delete按钮时，调用传递来的方法把当前下标通过方法的参 
     数传递给todobox


</code></pre>
<h2>五、在ReactNative实现导航(ReactNavigation)</h2>
<p>Vue</p>
<pre><code>vue-router    
    
    ①引入要用到的插件
        &lt;script src="js/vue-router.js"&gt;&lt;/script&gt;
    
    ②指定容器
        router-view

    ③配置路由词典
        new Vue({
            router:new VueRouter({
                routes:[
                 {path:'',component:Login},
                ]
            })
        })

    ④测试
    url和组件的映射关系


</code></pre>
<p>Angular</p>
<pre><code>RouterModule
0 router-outlet
①创建一个文件app.router.ts
②在app.router.ts中创建一个自定义模块
    
    import {RouterModule} from '@angular/router'
    
    const Routes = [
        {path:'',component:***}
    ]

    @NgModule({
        imports:[RouterModule.forRoot(Routes)],
        exports:[RouterModule]
    })

    export default class AppRoutingModule{}
③在app.module.ts，根模块中指定依赖于创建模块
    import {AppRoutingModule} from './app.router'

    @NgModule({
        imports: 
    [BrowserModule,HttpModule,FormsModule,AppRoutingModule]
    })

</code></pre>
<p>ReactNative:<br>1、基本步骤</p>
<pre><code>ReactNavigation的使用步骤：
    ①安装
        npm install --save react-navigation
    ②创建要用到的组件

    ③配置路由
        import {StackNavigator} from 'react-navigation'
        import CartComponent from '***'
        import OrderConfirmComponent from '***'

        const RootNavigator = StackNavigator({
            cart:{
                screen:CartComponent
            },
            oc:{
                screen:OrderConfirmComponent
            }
        })

        AppRegistry.registerComponent('myapp', () =&gt; RootNavigator);
</code></pre>
<p>2、跳转</p>
<pre><code>this.props.navigation.navigate('routeName');
this.props.navigation.goBack()
</code></pre>
<p>3、跳转完成参数的传递</p>
<pre><code>传
    this.props.navigation
    .navigate('routeName'，{price:100});
收
    this.props.navigation.state.params.price



</code></pre>
<p>补充：</p>
<pre><code>①参数的传递
    jump=(myId)=&gt;{
        this.props.navigation.navigate('detail',{id:myId})
    }

    showItem=(info)=&gt;{
        return &lt;TouchableOpacity onPress={()=&gt;{
            this.jump(info.item.lid)
        "}}"&gt;
        &lt;/TouchableOpacity&gt;
    }

②自定义header

    StackNavigator({
        list:{
            screen:ListComponent,
            navigationOptions:()=&gt;{
                return {
                    headerTitle:'',
                    headerTitleStyle:{}
                }
            }
        }
    })

③如何来实现一个选择功能？
    {
        this.props.isLoading &amp;&amp; &lt;ActivityIndicator&gt; 
       &lt;/ActivityIndicator&gt;
    }

④如何来实现一个循环功能
        {
            this.props.list.map(function(child){
                return {Child}
            })
        }

</code></pre>
<h2>六、移动的应用程序</h2>
<p>①WebApp 基于网页的，基于浏览器的</p>
<pre><code>比如网页版的淘宝，京东
优势在于强大的跨平台</code></pre>
<p>②NativeApp （使用原生开发）</p>
<pre><code>原生开发：调用 Google/Apple所提供的SDK中提供的原生的接口或者服务，
构建用户的可以安装在手机上执行的安装包，称作为Android/iOS的原生开发
直接可以安装在手机的操作系统的app称之为原生的app
比如安装在手机中的微信
优势在于良好的性能</code></pre>
<p>③HybridApp （使用前端技能）--&gt;下周会有详细课程</p>
<pre><code>混合编程：混合使用前端开发技能和原生开发技能进行开发而生成的
可以安装在手机上的安装包
html/css/js + 原生Android Webview/iOS uiWebView
</code></pre>
<p>总结：</p>
<pre><code>    ①RN中的组件
        Text/View/Button/TextInput/FlatList
        StyleSheet fetch touchableOpacity
    ②父---&gt;子
        props down
            步骤1：调用子组件时 通过属性去传值
            &lt;ToDoItem content={info.item}/&gt;
            步骤2：在子组件中，接收通过属性传来的值
            render(){
                return &lt;View&gt;
                    &lt;Text&gt;{this.props.content}&lt;/Text&gt;
                &lt;/View&gt;
            }
    ③子---&gt;父
        ToDoInput想要给ToDoBox传值
        步骤1：
            在ToDoBox中 定义一个带有参数的方法
            saveMsg(msg){
                //msg就是父组件希望得到的值
            }
        步骤2：
            在ToDoBox中 调用ToDoInput时 通过属性传递方法
            &lt;ToDoInput funcSave={this.saveMsg}/&gt;
        步骤3：
            在ToDoInput中调用传递来的方法并传值
            this.props.funcSave(123);
    ④flatList所指定的data发生了变化，但是视图却没有更新
        &lt;FlatList extraData={this.state}/&gt;
    ⑤当通过属性传递给组件的数据，发生变化时，
    子组件如何接受这个变化并更新内部的状态？
        componentWillUpdate
        componentDidUpdate

        componentWillReceiveProps(允许在内部修改状态的)

</code></pre>
<h2>七、RN的组件</h2>
<pre><code>1、ActivityIndicator
    指定一个加载中的图标
    步骤1：
        import {ActivityIndicator} from 'react-native'
    步骤2：
        &lt;ActivityIndictator/&gt;

2、KeyboardAvoidingView
    作为一个容器去使用，用来解决出现视图被弹出的键盘遮住的问题
    
    步骤1：
    引入
    步骤2：
        &lt;KeyboardAvoidingView&gt;
            &lt;TextInput/&gt;
            &lt;Text&gt;&lt;/Text&gt;
        &lt;/KeyboardAvoidingView&gt;
3、switch
    switch是一个受控组件
        步骤1：引入
        步骤2：
            初始化状态，并将状态中的值 绑定到Switch的value属性上边
            &lt;Switch value={this.state.myValue}&gt;
        步骤3：
            指定当操作Switch时，设置状态
            handleChange=(msg)=&gt;{
                this.setState({myValue:msg})
            }
            &lt;Switch 
            onValueChange={this.handleChange}
            value={this.state.myValue}&gt;
</code></pre>
<h2>八、RN中组件之间的跳转和传参</h2>
<pre><code>
复习Vue/Angular的路由模块的使用方式：
1、Vue的SPA的实现方式
    基本步骤：
        ①引入vue-router.js
        ②指定容器
            &lt;router-view&gt;&lt;/router-view&gt;
        ③创建要用到的组件
        ④配置路由词典
            new Vue({
                router:new VueRouter({
                    routes:[
                        {path:'/login',component:LoginComponent},
                        {path:'*',component:NotFound}
                    ]
                })
            })
    传递参数：
        ①明确发送方 接收方
        ②配置接收方的路由地址
        [
            {
                path:'/detail/:id',
                component:DetailComponent
            }
        ]
        ③准备接收
            this.$route.params
        ④准备发送
            this.$router.push('/detail/10')
2、Angular实现SPA的基本步骤：
        ①让AppModule依赖于RouterModule
        ②指定容器
            &lt;router-outlet&gt;&lt;/router-outlet&gt;
        ③创建要用到的组件
        ④配置路由词典
            const myRoutes = [
                {path:'',component:Index},
                {path:'login',component:Login},
                {path:'**',component:NotFound}
            ]

在ReactNative的开发过程中，会使用React Navigation来实现组件之间的
跳转和传参
</code></pre>
<h2>九. 基本步骤</h2>
<pre><code>    步骤1：先去安装
        npm install --save  react-navigation
        在安装的同时，会自动的将当前安装的包名称和版本号 
         写入到当前工程的package.json文件的dependencies
    步骤2：引入
        import {StackNavigator} from 'react-navigation'

    步骤3：创建要用到的组件

    步骤4：配置路由词典
        const RootNavigator = StackNavigator({
            myList:{screen:ListComponent},
            myDetail:{Screen:DetailComponent}
        })
    步骤5：让路由词典生效
        AppRegistry.registerComponent('myApp',()=&gt;RootNavigator)

2.2 跳转
    this.props.navigation.navigate('路由地址');
    举例：
    this.props.navigation.navigate('myDetail');



2.3 参数的传递
    ①明确发送 接收
        cart--hello world--&gt;order
    ②准备接收
        this.props.navigation.state.params.id
    ③准备发送    
        this.props.navigation
        .navigate('myDetail',{id:10})


</code></pre>
<h2>十.应用程序：</h2>
<pre><code>基本的页面结构
服务器端的通信
框架的基本语法
框架的路由模块
框架的网络请求模块
应用内部之间的通信，比如组件间通信、本地数据的处理
</code></pre>
<h2>十一.总结：</h2>
<pre><code>ReactJS
    五大核心概念
        jsx 是允许在js中编写标签的语法，遇到{会用js去解析，遇到&lt;会有html或者react去解析
        component 组件类就是封装好的，带有特定功能，
        可被反复使用的视图（组件类 要指定模板、指定方法）
        ref   得到组件的实例/DOM元素
        state 管理数据、数据绑定
        props 组件间通信

    综合练习（todobox、三连棋）
ReactNative
    (定位是为了实现原生的app，实现原理是所通过js编写或者调用组件类，
     都会在对应的平台中变成真实的和原生开发一样的SDK中提供的服务或者组件，
     比如所写View，会变成ios下真实的uiVIew，会变成Android下的Android.View)

    组件的使用
         Text/View/TextInput/FlatList/Image/Button/AcitivtyIndicator/
        TouchableOpacity/Switch/KeyboardAvoidingView/...
    样式添加
        StyleSheet.create({
            myH1:{
                color:''
            }
        })
        FlexBox 弹性盒子
            flexDirection 指定主轴的方向 row/column
            justifyContent 指定沿着主轴方向的对齐方式
            alignItems  指定沿着次轴方向的对齐方式
            RN默认的主轴是column
    与服务器端的通信
        fetch(myUrl)
            .then((response)=&gt;{response.json()})
            .then((response)=&gt;{
            
            })
    
    页面跳转传参
        reactNavigation (StackNavigator)

        步骤：
            ①安装
                npm install --save react-navigation
            ②引入
                import {StackNavigator} from 'react-navigation'
            ③创建要用到的组件
                PayComponent SendComponent
            ④配置路由词典
                const RootNavigator = StackNavigator(
                    myPay:{
                        screen:PayComponent,
                        navigationOptions:()=&gt;({
                            headerTitle:'',
                            headerTitleStyle:{},
                            headerLeft:,
                            headerRight:.
                        })
                    }
                )
        跳转：
            this.props.navigation.navigate('mySend')
        传递：
            ①发送、接收
            ②发送
    this.props.navigation.navigate('mySend',{id:10})
            ③接收
    this.props.navigation.state.params.id</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端知识点总结——ReactNative

## 原文链接
[https://segmentfault.com/a/1190000014491274](https://segmentfault.com/a/1190000014491274)

