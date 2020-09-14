---
title: 'vue单页多页的开发环境配置+vue的开发思路' 
date: 2019-01-14 2:30:07
hidden: true
slug: ybj67mgkcxr
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">vue-multi-device-single-page</h1>
<blockquote><p>多个单页应用整合的vue工程的开发环境<br>vue工程的目录设置</p></blockquote>
<p><a href="https://cn.vuejs.org/" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="/img/remote/1460000009543199" src="https://static.alili.tech/img/remote/1460000009543199" alt="vue-cli" title="vue-cli" style="cursor: pointer; display: inline;"></span></a> <a href="https://cn.vuejs.org/" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="/img/remote/1460000009543200" src="https://static.alili.tech/img/remote/1460000009543200" alt="vue 2.0" title="vue 2.0" style="cursor: pointer; display: inline;"></span></a> <a href="https://github.com/pagekit/vue-resource/blob/develop/docs/http.md" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="/img/remote/1460000009543201" src="https://static.alili.tech/img/remote/1460000009543201" alt="vue-resuorce" title="vue-resuorce" style="cursor: pointer; display: inline;"></span></a> <a href="https://cn.vuejs.org/" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="/img/remote/1460000009543202" src="https://static.alili.tech/img/remote/1460000009543202" alt="vue-router" title="vue-router" style="cursor: pointer; display: inline;"></span></a> <a href="https://cn.vuejs.org/" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="/img/remote/1460000009543203" src="https://static.alili.tech/img/remote/1460000009543203" alt="vuex" title="vuex" style="cursor: pointer; display: inline;"></span></a></p>
<h2 id="articleHeader1">本文内容：</h2>
<ol>
<li><p>vue + vuex + vue-resuorce + vue-route 的工程 的目录设计</p></li>
<li><p>基于 vue-cli 的 多个vue单页应用的开发环境 搭建</p></li>
</ol>
<h2 id="articleHeader2">目录：</h2>
<blockquote>
<p>一、开发环境使用</p>
<p>二、需求分析</p>
<p>三、开发思路</p>
<p>四、src目录设计及思路</p>
<p>五、开发环境开发</p>
<p>六、整个开发环境的目录注释</p>
</blockquote>
<h2 id="articleHeader3">一、开发环境使用</h2>
<h4>多终端（页面）路径设置</h4>
<ol>
<li><p>在src/device/目录下添加终端（页面）路径，如:src/device/pc/</p></li>
<li><p>在新添加的文件下加入这个终端（页面）使用的打包模板，命名为index.html,如：src/device/pc/index.html</p></li>
<li><p>在新添加的文件下加入这个终端（页面）使用的入口文件，命名为index.js,如：src/device/pc/index.js</p></li>
</ol>
<h4>build 打包</h4>
<blockquote><p>打生产环境的包，会自动把不同终端的文件按终端名称分开</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009543208?w=821&amp;h=441" src="https://static.alili.tech/img/remote/1460000009543208?w=821&amp;h=441" alt="build-pc示例图" title="build-pc示例图" style="cursor: pointer; display: inline;"></span></p>
<blockquote>
<p>npm run build 'device'</p>
<p>device ： 接受的参数，在 <code>/build/device-conf.js</code>里面有限制</p>
<p>示例： <code>npm run build pc</code> 打一个pc端的包 </p>
<p>npm run build-all</p>
<p>打所有终端的包</p>
</blockquote>
<h4>dev 开发</h4>
<blockquote>
<p>npm run dev</p>
<p>开始进行调试，基于vue-cli的,所以基本是vue-cli的</p>
</blockquote>
<ol><li><p>自动打开一个网页，从这里选择要调试的终端</p></li></ol>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009543209?w=338&amp;h=251" src="https://static.alili.tech/img/remote/1460000009543209?w=338&amp;h=251" alt="build-pc示例图" title="build-pc示例图" style="cursor: pointer;"></span></p>
<ol><li><p>开始调试</p></li></ol>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009543204?w=711&amp;h=721" src="https://static.alili.tech/img/remote/1460000009543204?w=711&amp;h=721" alt="index-pc" title="index-pc" style="cursor: pointer;"></span></p>
<h2 id="articleHeader4">二、需求分析：</h2>
<h4>需求：</h4>
<ol>
<li><p>要开发pc端 + 移动端 + app混合开发的 页面，每个页面都是单页应用</p></li>
<li><p>为了节约开发成本，这几个端要共用一些组件，和 方法</p></li>
<li><p>打包要方便，调试要方便</p></li>
<li><p>vue应用</p></li>
</ol>
<h4>几个问题：</h4>
<ol>
<li><p>vue-cli提供了非常好的开发环境，我能否在这个基础上整一整，解决掉需求 2 和 3 呢？</p></li>
<li><p>vue + vuex + vue-resuorce +vue-route 的工程目录应该怎么设计呢？</p></li>
</ol>
<blockquote><p>面对这样的需求，我的理解是把多个单页应用融合到一个工程里面，下面是我的解决办法</p></blockquote>
<h4>这个工程是啥</h4>
<blockquote>
<p>github <a href="https://github.com/vincentmrlau/vue-multi-device-single-page" rel="nofollow noreferrer" target="_blank">https://github.com/vincentmrlau/vue-multi-device-single-page</a>，欢迎交流</p>
<p>多端（也可以是多页）的单页应用的vue工程的开发环境,本质上是多个单页应用</p>
<p>基于vue,整合了vuex vue-resuorece vue-router 的开发目录设计</p>
<p>整个基于vue-cli生成的目录进行修改，除了test（正在研究）外的功能均可使用</p>
</blockquote>
<h2 id="articleHeader5">三、开发思路</h2>
<p>1、设置公用组件的目录</p>
<p>2、抽离api，分为公用的api和属于各个页面自己的api</p>
<p>3、每个单页应用vuex管理状态</p>
<p>4、可能会被多人同时编辑，如何尽量减少merge</p>
<p>5、针对这样的需求的src下面的目录应该怎么设计（第三部分有写）</p>
<p>6、针对需求配置开发环境（从第 部门开始是关于这个开发环境的）</p>
<h2 id="articleHeader6">四、src目录设计及思路</h2>
<blockquote>
<p>介绍src的目录设置及其作用</p>
<p>介绍 界面-模板html-组件-store-接口 的关系</p>
</blockquote>
<h4>概况两图流</h4>
<ol><li><p>pc主页示意图</p></li></ol>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009543204?w=711&amp;h=721" src="https://static.alili.tech/img/remote/1460000009543204?w=711&amp;h=721" alt="主页示意图" title="主页示意图" style="cursor: pointer;"></span></p>
<ol><li><p>分析图（怎一个乱字了得）</p></li></ol>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009543205?w=1234&amp;h=705" src="https://static.alili.tech/img/remote/1460000009543205?w=1234&amp;h=705" alt="分析图" title="分析图" style="cursor: pointer;"></span></p>
<h4>目录设置及其作用</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="├─src            # 源文件目录
│  │  config.js
│  │  
│  ├─api        # 多端共用的 api
│  │      device-root.js
│  │      middleware.js
│  │      
│  ├─assets        # 多端共用的 资源
│  │      logo.png
│  │      
│  ├─components    # 多端共用的 组件
│  │      RootCommonComponent.vue
│  │      
│  └─device        # 设备入口 
│      ├─app    # 混合开发的放这里了，也可以分 ios 和 安卓
│      │      index.html    # app专用的html模板，打包好的东西会自动注入
│      │      index.js        # app的入口文件
│      │      
│      ├─mobile        # 这里放移动端的页面 ，下面的 index文件作用类似其他端
│      │      index.html    
│      │      index.js
│      │      
│      └─pc            # 这个目录下的都是pc端使用的，当然其他端要用也是可以的，哈哈
│          │  App.vue        # 入口组件
│          │  index.html    # 模板文件
│          │  index.js        # 入口文件
│          │  
│          ├─api            # 分离开接口
│          │      home.js    # home这个模块用的接口
│          │      middleware.js            # 一些公用的中间件
│          │      
│          ├─assets            # 资源
│          ├─components        # 组件
│          │  ├─commonComponents    # 公共组件
│          │  │      Header.vue
│          │  │      
│          │  ├─Home    # home这个模块用的组件
│          │  │      Body.vue
│          │  │      Index.vue
│          │  │      
│          │  └─Page404    # 404这个模块用的组件
│          │          Index.vue
│          │          
│          ├─router        # 路由
│          │      index.js
│          │      
│          ├─store        # vuex 的store
│          │  │  index.js    # 根级别的store + 模块组装
│          │  │  
│          │  └─modules        # store 模块
│          │          home.js    # home这个模块使用的store
│          │          
│          └─types            # 放类型名称
│                  home.js    # home这个模块使用的 types
│                  root.js    # 公用的types" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code>├─src            <span class="hljs-comment"># 源文件目录</span>
│  │  <span class="hljs-built_in">config</span>.<span class="hljs-keyword">js
</span>│  │  
│  ├─api        <span class="hljs-comment"># 多端共用的 api</span>
│  │      device-root.<span class="hljs-keyword">js
</span>│  │      middleware.<span class="hljs-keyword">js
</span>│  │      
│  ├─assets        <span class="hljs-comment"># 多端共用的 资源</span>
│  │      logo.png
│  │      
│  ├─components    <span class="hljs-comment"># 多端共用的 组件</span>
│  │      RootCommonComponent.vue
│  │      
│  └─device        <span class="hljs-comment"># 设备入口 </span>
│      ├─app    <span class="hljs-comment"># 混合开发的放这里了，也可以分 ios 和 安卓</span>
│      │      index.html    <span class="hljs-comment"># app专用的html模板，打包好的东西会自动注入</span>
│      │      index.<span class="hljs-keyword">js </span>       <span class="hljs-comment"># app的入口文件</span>
│      │      
│      ├─mobile        <span class="hljs-comment"># 这里放移动端的页面 ，下面的 index文件作用类似其他端</span>
│      │      index.html    
│      │      index.<span class="hljs-keyword">js
</span>│      │      
│      └─pc            <span class="hljs-comment"># 这个目录下的都是pc端使用的，当然其他端要用也是可以的，哈哈</span>
│          │  App.vue        <span class="hljs-comment"># 入口组件</span>
│          │  index.html    <span class="hljs-comment"># 模板文件</span>
│          │  index.<span class="hljs-keyword">js </span>       <span class="hljs-comment"># 入口文件</span>
│          │  
│          ├─api            <span class="hljs-comment"># 分离开接口</span>
│          │      home.<span class="hljs-keyword">js </span>   <span class="hljs-comment"># home这个模块用的接口</span>
│          │      middleware.<span class="hljs-keyword">js </span>           <span class="hljs-comment"># 一些公用的中间件</span>
│          │      
│          ├─assets            <span class="hljs-comment"># 资源</span>
│          ├─components        <span class="hljs-comment"># 组件</span>
│          │  ├─commonComponents    <span class="hljs-comment"># 公共组件</span>
│          │  │      Header.vue
│          │  │      
│          │  ├─Home    <span class="hljs-comment"># home这个模块用的组件</span>
│          │  │      <span class="hljs-keyword">Body.vue
</span>│          │  │      Index.vue
│          │  │      
│          │  └─Page404    <span class="hljs-comment"># 404这个模块用的组件</span>
│          │          Index.vue
│          │          
│          ├─router        <span class="hljs-comment"># 路由</span>
│          │      index.<span class="hljs-keyword">js
</span>│          │      
│          ├─store        <span class="hljs-comment"># vuex 的store</span>
│          │  │  index.<span class="hljs-keyword">js </span>   <span class="hljs-comment"># 根级别的store + 模块组装</span>
│          │  │  
│          │  └─modules        <span class="hljs-comment"># store 模块</span>
│          │          home.<span class="hljs-keyword">js </span>   <span class="hljs-comment"># home这个模块使用的store</span>
│          │          
│          └─types            <span class="hljs-comment"># 放类型名称</span>
│                  home.<span class="hljs-keyword">js </span>   <span class="hljs-comment"># home这个模块使用的 types</span>
│                  root.<span class="hljs-keyword">js </span>   <span class="hljs-comment"># 公用的types</span></code></pre>
<h4>界面-模板-组件 的关系</h4>
<blockquote>
<p>界面：最后展现在用户面前的</p>
<p>模板：用来注入打包的html文件</p>
<p>组件：编写的vue组件</p>
</blockquote>
<p>他们的关系如图：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009543206?w=440&amp;h=368" src="https://static.alili.tech/img/remote/1460000009543206?w=440&amp;h=368" alt="view-components" title="view-components" style="cursor: pointer;"></span></p>
<h4>组件-store(vuex)-api(vue-resuorce) 的关系</h4>
<ol>
<li>
<p>组件使用store：</p>
<ol>
<li><p>通过辅助函数（mapGetters,mapActions等）把store的属性映射到组件中使用</p></li>
<li><p>组件通过action来提交mutation修改状态</p></li>
<li><p>也可以通过$store来使用</p></li>
</ol>
</li>
<li>
<p>组件使用api：</p>
<ol><li><p>组件通过store的action使用api</p></li></ol>
</li>
<li>
<p>store内部安排</p>
<ol>
<li><p>由mutation来修改状态</p></li>
<li><p>由action来提交mutation</p></li>
</ol>
</li>
<li><p>由store的action来调用api</p></li>
<li><p>api里面分离开中间件，按需调用</p></li>
</ol>
<p>看图看图 ↓↓↓</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009543207?w=628&amp;h=524" src="https://static.alili.tech/img/remote/1460000009543207?w=628&amp;h=524" alt="主页示意图" title="主页示意图" style="cursor: pointer;"></span></p>
<h2 id="articleHeader7">五、开发环境开发</h2>
<blockquote><p>在vue-cli v2.8.2生产的开发环境的基础上进行修改</p></blockquote>
<h4>新增加：build/device-conf.js 用来出路多终端（页面）开发相关问题</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
var chalk = require('chalk')
var glob = require('glob')

// 获取deviceList
var deviceList = []
var deviceSrcArray = glob.sync('./src/device/*')
for(var x in deviceSrcArray){
  deviceList.push(deviceSrcArray[x].split('/')[3])
}

// 检测是否在输入的参数是否在允许的list中
var checkDevice = function () {
  var device = process.env.DEVICE_ENV
  var result = false
  // 检查deviceList是否有重复
  var hash = {}
  var repeatList = []
  for(var l = 0;l < deviceList.length; l++){
    if(hash[deviceList[l]]){
      repeatList.push(deviceList[l])
    }
    hash[deviceList[l]] = true
  }
  if(repeatList.length > 0){
    console.log(chalk.bgRed('deviceList 有重复：'))
    console.log(chalk.bgRed(repeatList.toString()))
    return result
  }
  for(var i in deviceList){
    if(device === deviceList[i]){
      result = device
      break
    }
  }
  if(result === false){
    console.log(chalk.bgRed('参数错误，允许的参数为：'))
    console.log(chalk.bgRed(deviceList.toString()))
  }
  return result
}

exports.deviceList = deviceList
exports.checkDevice = checkDevice
// 其他依赖
exports.polyfills = ['babel-polyfill']
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>
<span class="hljs-keyword">var</span> chalk = <span class="hljs-built_in">require</span>(<span class="hljs-string">'chalk'</span>)
<span class="hljs-keyword">var</span> glob = <span class="hljs-built_in">require</span>(<span class="hljs-string">'glob'</span>)

<span class="hljs-comment">// 获取deviceList</span>
<span class="hljs-keyword">var</span> deviceList = []
<span class="hljs-keyword">var</span> deviceSrcArray = glob.sync(<span class="hljs-string">'./src/device/*'</span>)
<span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> x <span class="hljs-keyword">in</span> deviceSrcArray){
  deviceList.push(deviceSrcArray[x].split(<span class="hljs-string">'/'</span>)[<span class="hljs-number">3</span>])
}

<span class="hljs-comment">// 检测是否在输入的参数是否在允许的list中</span>
<span class="hljs-keyword">var</span> checkDevice = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> device = process.env.DEVICE_ENV
  <span class="hljs-keyword">var</span> result = <span class="hljs-literal">false</span>
  <span class="hljs-comment">// 检查deviceList是否有重复</span>
  <span class="hljs-keyword">var</span> hash = {}
  <span class="hljs-keyword">var</span> repeatList = []
  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> l = <span class="hljs-number">0</span>;l &lt; deviceList.length; l++){
    <span class="hljs-keyword">if</span>(hash[deviceList[l]]){
      repeatList.push(deviceList[l])
    }
    hash[deviceList[l]] = <span class="hljs-literal">true</span>
  }
  <span class="hljs-keyword">if</span>(repeatList.length &gt; <span class="hljs-number">0</span>){
    <span class="hljs-built_in">console</span>.log(chalk.bgRed(<span class="hljs-string">'deviceList 有重复：'</span>))
    <span class="hljs-built_in">console</span>.log(chalk.bgRed(repeatList.toString()))
    <span class="hljs-keyword">return</span> result
  }
  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i <span class="hljs-keyword">in</span> deviceList){
    <span class="hljs-keyword">if</span>(device === deviceList[i]){
      result = device
      <span class="hljs-keyword">break</span>
    }
  }
  <span class="hljs-keyword">if</span>(result === <span class="hljs-literal">false</span>){
    <span class="hljs-built_in">console</span>.log(chalk.bgRed(<span class="hljs-string">'参数错误，允许的参数为：'</span>))
    <span class="hljs-built_in">console</span>.log(chalk.bgRed(deviceList.toString()))
  }
  <span class="hljs-keyword">return</span> result
}

exports.deviceList = deviceList
exports.checkDevice = checkDevice
<span class="hljs-comment">// 其他依赖</span>
exports.polyfills = [<span class="hljs-string">'babel-polyfill'</span>]
</code></pre>
<h4>添加:/build/build-all.js</h4>
<blockquote><p>内部根据 deviceList 产生运行build.js子进程，完成打包</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var execFileSync = require('child_process').execFileSync;
var path = require('path')
var deviceList = require('./device-conf').deviceList || []

var buildFile = path.join(__dirname, 'build.js')

for( var x in deviceList){
  console.log('building :',deviceList[x])
  execFileSync( 'node', [buildFile, deviceList[x]], {

  })
}

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> execFileSync = <span class="hljs-built_in">require</span>(<span class="hljs-string">'child_process'</span>).execFileSync;
<span class="hljs-keyword">var</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)
<span class="hljs-keyword">var</span> deviceList = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./device-conf'</span>).deviceList || []

<span class="hljs-keyword">var</span> buildFile = path.join(__dirname, <span class="hljs-string">'build.js'</span>)

<span class="hljs-keyword">for</span>( <span class="hljs-keyword">var</span> x <span class="hljs-keyword">in</span> deviceList){
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'building :'</span>,deviceList[x])
  execFileSync( <span class="hljs-string">'node'</span>, [buildFile, deviceList[x]], {

  })
}

</code></pre>
<h4>修改/build/build.js</h4>
<blockquote><p>添加设置环境变量并检查参数代码</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var chalk = require('chalk')
// 设置process.env.DEVICE_ENV参数
// 没有则返回错误
var device = process.argv[2]
var checkDevice = require('./device-conf').checkDevice
if(device){
  process.env.DEVICE_ENV = device
  if(!checkDevice()){
    return false
  }
}else {
  console.log(chalk.bgRed('  错误：缺少参数，详情请看readme.md  '))
  return false
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-selector-tag">var</span> chalk = require(<span class="hljs-string">'chalk'</span>)
<span class="hljs-comment">// 设置process.env.DEVICE_ENV参数</span>
<span class="hljs-comment">// 没有则返回错误</span>
<span class="hljs-selector-tag">var</span> device = process<span class="hljs-selector-class">.argv</span>[<span class="hljs-number">2</span>]
<span class="hljs-selector-tag">var</span> checkDevice = require(<span class="hljs-string">'./device-conf'</span>)<span class="hljs-selector-class">.checkDevice</span>
<span class="hljs-function"><span class="hljs-title">if</span><span class="hljs-params">(device)</span></span>{
  process<span class="hljs-selector-class">.env</span><span class="hljs-selector-class">.DEVICE_ENV</span> = device
  <span class="hljs-keyword">if</span>(!checkDevice()){
    return false
  }
}<span class="hljs-keyword">else</span> {
  console.log(chalk.bgRed(<span class="hljs-string">'  错误：缺少参数，详情请看readme.md  '</span>))
  return false
}</code></pre>
<h4>修改/build/build.js</h4>
<ol><li><p>添加一个路由（在使用中间件connect-history-api-fallback之前添加），把可调试的入口展示出来</p></li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 写个小路由，打开浏览器的时候可以选一个开发路径
var deviceList = require('./device-conf').deviceList || []
var sentHref = ''
for(var x in deviceList){
  sentHref += '<a href=&quot;/'+ deviceList[x] +'/index.html&quot;>点我调试终端：'+ deviceList[x].toString() +'</a> <br>'
}
app.get('/devDeviceList', (req, res, next) => {
  res.send(sentHref)
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-comment">// 写个小路由，打开浏览器的时候可以选一个开发路径</span>
<span class="hljs-keyword">var</span> deviceList = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./device-conf'</span>).deviceList || []
<span class="hljs-keyword">var</span> sentHref = <span class="hljs-string">''</span>
<span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> x <span class="hljs-keyword">in</span> deviceList){
  sentHref += <span class="hljs-string">'&lt;a href="/'</span>+ deviceList[x] +<span class="hljs-string">'/index.html"&gt;点我调试终端：'</span>+ deviceList[x].toString() +<span class="hljs-string">'&lt;/a&gt; &lt;br&gt;'</span>
}
app.get(<span class="hljs-string">'/devDeviceList'</span>, <span class="hljs-function">(<span class="hljs-params">req, res, next</span>) =&gt;</span> {
  res.send(sentHref)
})</code></pre>
<ol><li><p>修改打开的默认连接</p></li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="opn(uri + '/devDeviceList')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;"><span class="hljs-function"><span class="hljs-title">opn</span><span class="hljs-params">(uri + <span class="hljs-string">'/devDeviceList'</span>)</span></span></code></pre>
<h4>修改/config/index.js 主要修改模板入口，打包出口等</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
var device = process.env.DEVICE_ENV || 'undefined'


// 入口模板路径
var htmlTemplate =  './src/device/' + device + '/index.html'

module.exports = {
  build: {
    env: require('./prod.env'),
    // 加入html入口
    htmlTemplate: htmlTemplate,
    index: path.resolve(__dirname, '../dist' , device , 'index.html'),
    assetsRoot: path.resolve(__dirname, '../dist' , device),
    assetsSubDirectory: 'static',
    // 这里的路径改成相对路径
    // 原来是： assetsPublicPath: '/',
    assetsPublicPath: '',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 8080,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},
    // CSS Sourcemaps off by default because relative paths are &quot;buggy&quot;
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-regexp">//</span> see http:<span class="hljs-regexp">//</span>vuejs-templates.github.io/webpack <span class="hljs-keyword">for</span> documentation.
var path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)
var device = process.env.DEVICE_ENV || <span class="hljs-string">'undefined'</span>


<span class="hljs-regexp">//</span> 入口模板路径
var htmlTemplate =  <span class="hljs-string">'./src/device/'</span> + device + <span class="hljs-string">'/index.html'</span>

<span class="hljs-built_in">module</span>.exports = {
  build: {
    env: <span class="hljs-built_in">require</span>(<span class="hljs-string">'./prod.env'</span>),
    <span class="hljs-regexp">//</span> 加入html入口
    htmlTemplate: htmlTemplate,
    index: path.resolve(__dirname, <span class="hljs-string">'../dist'</span> , device , <span class="hljs-string">'index.html'</span>),
    assetsRoot: path.resolve(__dirname, <span class="hljs-string">'../dist'</span> , device),
    assetsSubDirectory: <span class="hljs-string">'static'</span>,
    <span class="hljs-regexp">//</span> 这里的路径改成相对路径
    <span class="hljs-regexp">//</span> 原来是： assetsPublicPath: <span class="hljs-string">'/'</span>,
    assetsPublicPath: <span class="hljs-string">''</span>,
    productionSourceMap: <span class="hljs-literal">true</span>,
    <span class="hljs-regexp">//</span> Gzip <span class="hljs-literal">off</span> <span class="hljs-keyword">by</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">as</span> many popular static hosts such <span class="hljs-keyword">as</span>
    <span class="hljs-regexp">//</span> Surge <span class="hljs-keyword">or</span> Netlify already gzip all static assets <span class="hljs-keyword">for</span> you.
    <span class="hljs-regexp">//</span> Before setting to `<span class="javascript"><span class="hljs-literal">true</span></span>`, make sure to:
    <span class="hljs-regexp">//</span> <span class="hljs-built_in">npm</span> install --save-dev compression-webpack-plugin
    productionGzip: <span class="hljs-literal">false</span>,
    productionGzipExtensions: [<span class="hljs-string">'js'</span>, <span class="hljs-string">'css'</span>],
    <span class="hljs-regexp">//</span> Run the build command with an extra argument to
    <span class="hljs-regexp">//</span> View the bundle analyzer report after build finishes:
    <span class="hljs-regexp">//</span> `<span class="javascript">npm run build --report</span>`
    <span class="hljs-regexp">//</span> Set to `<span class="javascript"><span class="hljs-literal">true</span></span>` <span class="hljs-keyword">or</span> `<span class="javascript"><span class="hljs-literal">false</span></span>` to always turn it <span class="hljs-literal">on</span> <span class="hljs-keyword">or</span> <span class="hljs-literal">off</span>
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: <span class="hljs-built_in">require</span>(<span class="hljs-string">'./dev.env'</span>),
    port: <span class="hljs-number">8080</span>,
    autoOpenBrowser: <span class="hljs-literal">true</span>,
    assetsSubDirectory: <span class="hljs-string">'static'</span>,
    assetsPublicPath: <span class="hljs-string">'/'</span>,
    proxyTable: {},
    <span class="hljs-regexp">//</span> CSS Sourcemaps <span class="hljs-literal">off</span> <span class="hljs-keyword">by</span> <span class="hljs-keyword">default</span> because relative paths are <span class="hljs-string">"buggy"</span>
    <span class="hljs-regexp">//</span> with <span class="hljs-keyword">this</span> option, according to the CSS-Loader README
    <span class="hljs-regexp">//</span> (https:<span class="hljs-regexp">//gi</span>thub.com/webpack/css-loader<span class="hljs-comment">#sourcemaps)</span>
    <span class="hljs-regexp">//</span> In our experience, they generally work <span class="hljs-keyword">as</span> expected,
    <span class="hljs-regexp">//</span> just be aware <span class="hljs-keyword">of</span> <span class="hljs-keyword">this</span> issue <span class="hljs-keyword">when</span> enabling <span class="hljs-keyword">this</span> option.
    cssSourceMap: <span class="hljs-literal">false</span>
  }
}</code></pre>
<h4>修改 /build/webpack.dev.conf.js</h4>
<blockquote><p>主要修改了入口配置，出口配置，以及模板文件配置</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 获取device
var device = process.env.DEVICE_ENV

var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// 设置设备相关信息引入
var deviceList = require('./device-conf').deviceList
// 其他依赖
var extraPolyfill = require('./device-conf').polyfills || []

// 设置入口
var entry = {}
// 设置html插件模板入口和依赖
var htmlPluginConf = []
for(var x in deviceList){
  // 设置 入口
  entry[deviceList[x]] = extraPolyfill.concat(
    ['./build/dev-client'],
    './src/device/' + deviceList[x] + '/index.js'
  )
  var _htmlPlugin = new HtmlWebpackPlugin({
    filename: deviceList[x]+'/index.html',
    template: './src/device/' + deviceList[x] + '/index.html',
    chunks: [deviceList[x]]
  })
  htmlPluginConf.push(_htmlPlugin)
}




// add hot-reload related code to entry chunks
// 把热重载所需的代码也打包进去
// Object.keys(baseWebpackConfig.entry).forEach(function (name) {
//   baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
// })

// 删除的entry和output
try {
  delete baseWebpackConfig.entry
}catch (e){
  console.log(e)
}
try{
  delete baseWebpackConfig.output
}catch (e){
  console.log(e)
}

module.exports = merge(baseWebpackConfig, {
  // 设置入口
  entry: entry,
  // 设置出口
  output: {
    path: '/',
    filename: '[name].js',
    publicPath: config.dev.assetsPublicPath
  },
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    // new HtmlWebpackPlugin({
    //   filename: 'index.html',
    //   template: config.dev.htmlTemplate,
    //   inject: true
    // }),
    new FriendlyErrorsPlugin()
  ].concat(htmlPluginConf)
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-comment">// 获取device</span>
<span class="hljs-keyword">var</span> device = process.env.DEVICE_ENV

<span class="hljs-keyword">var</span> utils = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./utils'</span>)
<span class="hljs-keyword">var</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>)
<span class="hljs-keyword">var</span> config = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../config'</span>)
<span class="hljs-keyword">var</span> merge = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack-merge'</span>)
<span class="hljs-keyword">var</span> baseWebpackConfig = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./webpack.base.conf'</span>)
<span class="hljs-keyword">var</span> HtmlWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'html-webpack-plugin'</span>)
<span class="hljs-keyword">var</span> FriendlyErrorsPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'friendly-errors-webpack-plugin'</span>)

<span class="hljs-comment">// 设置设备相关信息引入</span>
<span class="hljs-keyword">var</span> deviceList = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./device-conf'</span>).deviceList
<span class="hljs-comment">// 其他依赖</span>
<span class="hljs-keyword">var</span> extraPolyfill = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./device-conf'</span>).polyfills || []

<span class="hljs-comment">// 设置入口</span>
<span class="hljs-keyword">var</span> entry = {}
<span class="hljs-comment">// 设置html插件模板入口和依赖</span>
<span class="hljs-keyword">var</span> htmlPluginConf = []
<span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> x <span class="hljs-keyword">in</span> deviceList){
  <span class="hljs-comment">// 设置 入口</span>
  entry[deviceList[x]] = extraPolyfill.concat(
    [<span class="hljs-string">'./build/dev-client'</span>],
    <span class="hljs-string">'./src/device/'</span> + deviceList[x] + <span class="hljs-string">'/index.js'</span>
  )
  <span class="hljs-keyword">var</span> _htmlPlugin = <span class="hljs-keyword">new</span> HtmlWebpackPlugin({
    filename: deviceList[x]+<span class="hljs-string">'/index.html'</span>,
    template: <span class="hljs-string">'./src/device/'</span> + deviceList[x] + <span class="hljs-string">'/index.html'</span>,
    chunks: [deviceList[x]]
  })
  htmlPluginConf.push(_htmlPlugin)
}




<span class="hljs-comment">// add hot-reload related code to entry chunks</span>
<span class="hljs-comment">// 把热重载所需的代码也打包进去</span>
<span class="hljs-comment">// Object.keys(baseWebpackConfig.entry).forEach(function (name) {</span>
<span class="hljs-comment">//   baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])</span>
<span class="hljs-comment">// })</span>

<span class="hljs-comment">// 删除的entry和output</span>
<span class="hljs-keyword">try</span> {
  <span class="hljs-keyword">delete</span> baseWebpackConfig.entry
}<span class="hljs-keyword">catch</span> (e){
  <span class="hljs-built_in">console</span>.log(e)
}
<span class="hljs-keyword">try</span>{
  <span class="hljs-keyword">delete</span> baseWebpackConfig.output
}<span class="hljs-keyword">catch</span> (e){
  <span class="hljs-built_in">console</span>.log(e)
}

<span class="hljs-built_in">module</span>.exports = merge(baseWebpackConfig, {
  <span class="hljs-comment">// 设置入口</span>
  entry: entry,
  <span class="hljs-comment">// 设置出口</span>
  output: {
    path: <span class="hljs-string">'/'</span>,
    filename: <span class="hljs-string">'[name].js'</span>,
    publicPath: config.dev.assetsPublicPath
  },
  <span class="hljs-keyword">module</span>: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  <span class="hljs-comment">// cheap-module-eval-source-map is faster for development</span>
  devtool: <span class="hljs-string">'#cheap-module-eval-source-map'</span>,
  plugins: [
    <span class="hljs-keyword">new</span> webpack.DefinePlugin({
      <span class="hljs-string">'process.env'</span>: config.dev.env
    }),
    <span class="hljs-comment">// https://github.com/glenjamin/webpack-hot-middleware#installation--usage</span>
    <span class="hljs-keyword">new</span> webpack.HotModuleReplacementPlugin(),
    <span class="hljs-keyword">new</span> webpack.NoEmitOnErrorsPlugin(),
    <span class="hljs-comment">// https://github.com/ampedandwired/html-webpack-plugin</span>
    <span class="hljs-comment">// new HtmlWebpackPlugin({</span>
    <span class="hljs-comment">//   filename: 'index.html',</span>
    <span class="hljs-comment">//   template: config.dev.htmlTemplate,</span>
    <span class="hljs-comment">//   inject: true</span>
    <span class="hljs-comment">// }),</span>
    <span class="hljs-keyword">new</span> FriendlyErrorsPlugin()
  ].concat(htmlPluginConf)
})
</code></pre>
<h4>修改  /build/webpack.prod.conf.js</h4>
<blockquote><p>主要修改了入口配置，出口配置，以及模板文件配置</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

var env = process.env.NODE_ENV === 'testing'
  ? require('../config/test.env')
  : config.build.env

// 设置device相关变量
var device = process.env.DEVICE_ENV
//设置入口
var extraPolyFill = require('./device-conf').polyfills ||[]
var entry = {
  index: extraPolyFill.concat('./src/device/' + device + '/index.js')
}

console.log(config.build.htmlTemplate)
var webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  // 写入prod的入口
  entry: entry,
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true
    }),
    // extract css into its own file
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css')
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    // generate dist pc.html with correct asset hash for caching.
    // you can customize output by editing /pc.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: process.env.NODE_ENV === 'testing'
        ? 'index.html'
        : config.build.index,
      // template: 'index.html',
      template: config.build.htmlTemplate,
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &amp;&amp;
          /\.js$/.test(module.resource) &amp;&amp;
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

if (config.build.productionGzip) {
  var CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code>var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var <span class="hljs-keyword">merge</span> = require(<span class="hljs-string">'webpack-merge'</span>)
<span class="hljs-keyword">var</span> baseWebpackConfig = require(<span class="hljs-string">'./webpack.base.conf'</span>)
<span class="hljs-keyword">var</span> CopyWebpackPlugin = require(<span class="hljs-string">'copy-webpack-plugin'</span>)
<span class="hljs-keyword">var</span> HtmlWebpackPlugin = require(<span class="hljs-string">'html-webpack-plugin'</span>)
<span class="hljs-keyword">var</span> ExtractTextPlugin = require(<span class="hljs-string">'extract-text-webpack-plugin'</span>)
<span class="hljs-keyword">var</span> OptimizeCSSPlugin = require(<span class="hljs-string">'optimize-css-assets-webpack-plugin'</span>)

<span class="hljs-keyword">var</span> env = process.env.NODE_ENV === <span class="hljs-string">'testing'</span>
  ? require(<span class="hljs-string">'../config/test.env'</span>)
  : config.build.env

// 设置device相关变量
<span class="hljs-keyword">var</span> device = process.env.DEVICE_ENV
//设置入口
<span class="hljs-keyword">var</span> extraPolyFill = require(<span class="hljs-string">'./device-conf'</span>).polyfills ||[]
<span class="hljs-keyword">var</span> entry = {
  <span class="hljs-keyword">index</span>: extraPolyFill.concat(<span class="hljs-string">'./src/device/'</span> + device + <span class="hljs-string">'/index.js'</span>)
}

console.log(config.build.htmlTemplate)
<span class="hljs-keyword">var</span> webpackConfig = <span class="hljs-keyword">merge</span>(baseWebpackConfig, {
  <span class="hljs-keyword">module</span>: {
    <span class="hljs-keyword">rules</span>: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      <span class="hljs-keyword">extract</span>: <span class="hljs-literal">true</span>
    })
  },
  // 写入prod的入口
  entry: entry,
  devtool: config.build.productionSourceMap ? <span class="hljs-string">'#source-map'</span> : <span class="hljs-literal">false</span>,
  <span class="hljs-keyword">output</span>: {
    <span class="hljs-keyword">path</span>: config.build.assetsRoot,
    filename: utils.assetsPath(<span class="hljs-string">'js/[name].[chunkhash].js'</span>),
    chunkFilename: utils.assetsPath(<span class="hljs-string">'js/[id].[chunkhash].js'</span>)
  },
  plugins: [
    // <span class="hljs-keyword">http</span>://vuejs.github.io/vue-loader/en/workflow/production.html
    <span class="hljs-keyword">new</span> webpack.DefinePlugin({
      <span class="hljs-string">'process.env'</span>: env
    }),
    <span class="hljs-keyword">new</span> webpack.optimize.UglifyJsPlugin({
      <span class="hljs-keyword">compress</span>: {
        <span class="hljs-keyword">warnings</span>: <span class="hljs-literal">false</span>
      },
      sourceMap: <span class="hljs-literal">true</span>
    }),
    // <span class="hljs-keyword">extract</span> css <span class="hljs-keyword">into</span> its own <span class="hljs-keyword">file</span>
    <span class="hljs-keyword">new</span> ExtractTextPlugin({
      filename: utils.assetsPath(<span class="hljs-string">'css/[name].[contenthash].css'</span>)
    }),
    // <span class="hljs-keyword">Compress</span> extracted CSS. We <span class="hljs-keyword">are</span> <span class="hljs-keyword">using</span> this <span class="hljs-keyword">plugin</span> so that possible
    // duplicated CSS <span class="hljs-keyword">from</span> different components can be deduped.
    <span class="hljs-keyword">new</span> OptimizeCSSPlugin({
      cssProcessorOptions: {
        <span class="hljs-keyword">safe</span>: <span class="hljs-literal">true</span>
      }
    }),
    // generate dist pc.html <span class="hljs-keyword">with</span> correct asset <span class="hljs-keyword">hash</span> <span class="hljs-keyword">for</span> caching.
    // you can customize <span class="hljs-keyword">output</span> <span class="hljs-keyword">by</span> editing /pc.html
    // see https://github.com/ampedandwired/html-webpack-<span class="hljs-keyword">plugin</span>
    <span class="hljs-keyword">new</span> HtmlWebpackPlugin({
      filename: process.env.NODE_ENV === <span class="hljs-string">'testing'</span>
        ? <span class="hljs-string">'index.html'</span>
        : config.build.index,
      // <span class="hljs-keyword">template</span>: <span class="hljs-string">'index.html'</span>,
      <span class="hljs-keyword">template</span>: config.build.htmlTemplate,
      inject: <span class="hljs-literal">true</span>,
      minify: {
        removeComments: <span class="hljs-literal">true</span>,
        collapseWhitespace: <span class="hljs-literal">true</span>,
        removeAttributeQuotes: <span class="hljs-literal">true</span>
        // more options:
        // https://github.com/kangax/html-minifier#options-<span class="hljs-keyword">quick</span>-<span class="hljs-keyword">reference</span>
      },
      // necessary <span class="hljs-keyword">to</span> consistently <span class="hljs-keyword">work</span> <span class="hljs-keyword">with</span> multiple chunks via CommonsChunkPlugin
      chunksSortMode: <span class="hljs-string">'dependency'</span>
    }),
    // <span class="hljs-keyword">split</span> vendor js <span class="hljs-keyword">into</span> its own <span class="hljs-keyword">file</span>
    <span class="hljs-keyword">new</span> webpack.optimize.CommonsChunkPlugin({
      <span class="hljs-keyword">name</span>: <span class="hljs-string">'vendor'</span>,
      minChunks: <span class="hljs-keyword">function</span> (<span class="hljs-keyword">module</span>, <span class="hljs-keyword">count</span>) {
        // <span class="hljs-keyword">any</span> <span class="hljs-keyword">required</span> modules inside node_modules <span class="hljs-keyword">are</span> extracted <span class="hljs-keyword">to</span> vendor
        <span class="hljs-keyword">return</span> (
          module.resource &amp;&amp;
          /\.js$/.test(module.resource) &amp;&amp;
          module.resource.indexOf(
            path.join(__dirname, <span class="hljs-string">'../node_modules'</span>)
          ) === <span class="hljs-number">0</span>
        )
      }
    }),
    // <span class="hljs-keyword">extract</span> webpack runtime <span class="hljs-keyword">and</span> <span class="hljs-keyword">module</span> manifest <span class="hljs-keyword">to</span> its own <span class="hljs-keyword">file</span> <span class="hljs-keyword">in</span> <span class="hljs-keyword">order</span> <span class="hljs-keyword">to</span>
    // prevent vendor <span class="hljs-keyword">hash</span> <span class="hljs-keyword">from</span> being <span class="hljs-keyword">updated</span> <span class="hljs-keyword">whenever</span> app bundle <span class="hljs-keyword">is</span> <span class="hljs-keyword">updated</span>
    <span class="hljs-keyword">new</span> webpack.optimize.CommonsChunkPlugin({
      <span class="hljs-keyword">name</span>: <span class="hljs-string">'manifest'</span>,
      chunks: [<span class="hljs-string">'vendor'</span>]
    }),
    // copy custom <span class="hljs-keyword">static</span> assets
    <span class="hljs-keyword">new</span> CopyWebpackPlugin([
      {
        <span class="hljs-keyword">from</span>: path.resolve(__dirname, <span class="hljs-string">'../static'</span>),
        <span class="hljs-keyword">to</span>: config.build.assetsSubDirectory,
        <span class="hljs-keyword">ignore</span>: [<span class="hljs-string">'.*'</span>]
      }
    ])
  ]
})

<span class="hljs-keyword">if</span> (config.build.productionGzip) {
  <span class="hljs-keyword">var</span> CompressionWebpackPlugin = require(<span class="hljs-string">'compression-webpack-plugin'</span>)

  webpackConfig.plugins.push(
    <span class="hljs-keyword">new</span> CompressionWebpackPlugin({
      asset: <span class="hljs-string">'[path].gz[query]'</span>,
      algorithm: <span class="hljs-string">'gzip'</span>,
      <span class="hljs-keyword">test</span>: <span class="hljs-keyword">new</span> RegExp(
        <span class="hljs-string">'\\.('</span> +
        config.build.productionGzipExtensions.join(<span class="hljs-string">'|'</span>) +
        <span class="hljs-string">')$'</span>
      ),
      threshold: <span class="hljs-number">10240</span>,
      minRatio: <span class="hljs-number">0.8</span>
    })
  )
}

<span class="hljs-keyword">if</span> (config.build.bundleAnalyzerReport) {
  <span class="hljs-keyword">var</span> BundleAnalyzerPlugin = require(<span class="hljs-string">'webpack-bundle-analyzer'</span>).BundleAnalyzerPlugin
  webpackConfig.plugins.push(<span class="hljs-keyword">new</span> BundleAnalyzerPlugin())
}

module.exports = webpackConfig
</code></pre>
<h2 id="articleHeader8">六、整个开发环境的目录注释</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="│  .babelrc
│  .editorconfig
│  .eslintignore
│  .eslintrc.js
│  .gitignore
│  .postcssrc.js
│  index.html
│  npm-debug.log
│  package.json
│  README.md
│  tree.txt
│          
├─build   # 这里是打包工具相关的
│      build-all.js # 通过打包所有端的代码
│      build.js        # 这里设定进程的环境变量
│      check-versions.js
│      dev-client.js  
│      dev-server.js    # 这里也需要对进程的环境变量进行设定
│      device-conf.js    # 这里面有关于多端开发、打包的相关设定
│      utils.js
│      vue-loader.conf.js
│      webpack.base.conf.js        # 修改了入口、出口等
│      webpack.dev.conf.js        # 修改了入口、出口等
│      webpack.prod.conf.js        # 修改了入口出口等
│      webpack.test.conf.js        # 测试相关还未完善
│      
├─config
│      dev.env.js
│      index.js                    # 打包的入口和出口
│      prod.env.js
│      test.env.js
│      
├─dist        # 最后打包的目录 分端储存
│  ├─app
│  │  │  index.html
│  │  │  
│  │  └─static
│  │      └─js
│  │              index.0142f89e3523b3b0d16b.js
│  │              index.0142f89e3523b3b0d16b.js.map
│  │              manifest.57f6691c595e842abc95.js
│  │              manifest.57f6691c595e842abc95.js.map
│  │              vendor.cce790f63359fc27fa7d.js
│  │              vendor.cce790f63359fc27fa7d.js.map
│  │              
│  ├─mobile
│  │  │  index.html
│  │  │  
│  │  └─static
│  │      └─js
│  │              index.0142f89e3523b3b0d16b.js
│  │              index.0142f89e3523b3b0d16b.js.map
│  │              manifest.57f6691c595e842abc95.js
│  │              manifest.57f6691c595e842abc95.js.map
│  │              vendor.cce790f63359fc27fa7d.js
│  │              vendor.cce790f63359fc27fa7d.js.map
│  │              
│  └─pc
│      │  index.html
│      │  
│      └─static
│          ├─css
│          │      index.1e809171f3a961de951e3c8e6644435f.css
│          │      index.1e809171f3a961de951e3c8e6644435f.css.map
│          │      
│          └─js
│                  0.f3e74a76d92b3f6ca5ec.js
│                  0.f3e74a76d92b3f6ca5ec.js.map
│                  1.fb471d3425df8c16ac54.js
│                  1.fb471d3425df8c16ac54.js.map
│                  index.a2ba631673923f812cf1.js
│                  index.a2ba631673923f812cf1.js.map
│                  manifest.ab6461111db19541d04b.js
│                  manifest.ab6461111db19541d04b.js.map
│                  vendor.aeee805b1efff3748018.js
│                  vendor.aeee805b1efff3748018.js.map
│                  
├─images         # 这个放点文档写文档用的图片                        
├─sever            # 这里写点服务端程序，用于测试等
│      prod-view-server.js
│      
├─src            # 源文件目录
│  │  config.js
│  │  
│  ├─api        # 多端共用的 api
│  │      device-root.js
│  │      middleware.js
│  │      
│  ├─assets        # 多端共用的 资源
│  │      logo.png
│  │      
│  ├─components    # 多端共用的 组件
│  │      RootCommonComponent.vue
│  │      
│  └─device        # 设备入口 
│      ├─app    # 混合开发的放这里了，也可以分 ios 和 安卓
│      │      index.html    # app专用的html模板，打包好的东西会自动注入
│      │      index.js        # app的入口文件
│      │      
│      ├─mobile        # 这里放移动端的页面 ，下面的 index文件作用类似其他端
│      │      index.html    
│      │      index.js
│      │      
│      └─pc            # 这个目录下的都是pc端使用的，当然其他端要用也是可以的，哈哈
│          │  App.vue        # 入口组件
│          │  index.html    # 模板文件
│          │  index.js        # 入口文件
│          │  
│          ├─api            # 分离开接口
│          │      home.js    # home这个模块用的接口
│          │      middleware.js            # 一些公用的中间件
│          │      
│          ├─assets            # 资源
│          ├─components        # 组件
│          │  ├─commonComponents    # 公共组件
│          │  │      Header.vue
│          │  │      
│          │  ├─Home    # home这个模块用的组件
│          │  │      Body.vue
│          │  │      Index.vue
│          │  │      
│          │  └─Page404    # 404这个模块用的组件
│          │          Index.vue
│          │          
│          ├─router        # 路由
│          │      index.js
│          │      
│          ├─store        # vuex 的store
│          │  │  index.js    # 根级别的store + 模块组装
│          │  │  
│          │  └─modules        # store 模块
│          │          home.js    # home这个模块使用的store
│          │          
│          └─types            # 放类型名称
│                  home.js    # home这个模块使用的 types
│                  root.js    # 公用的types
│                  
├─static
│      .gitkeep
│      
└─test    # 测试相关 TODO
    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>│  <span class="hljs-selector-class">.babelrc</span>
│  <span class="hljs-selector-class">.editorconfig</span>
│  <span class="hljs-selector-class">.eslintignore</span>
│  <span class="hljs-selector-class">.eslintrc</span><span class="hljs-selector-class">.js</span>
│  <span class="hljs-selector-class">.gitignore</span>
│  <span class="hljs-selector-class">.postcssrc</span><span class="hljs-selector-class">.js</span>
│  <span class="hljs-selector-tag">index</span><span class="hljs-selector-class">.html</span>
│  <span class="hljs-selector-tag">npm-debug</span><span class="hljs-selector-class">.log</span>
│  <span class="hljs-selector-tag">package</span><span class="hljs-selector-class">.json</span>
│  <span class="hljs-selector-tag">README</span><span class="hljs-selector-class">.md</span>
│  <span class="hljs-selector-tag">tree</span><span class="hljs-selector-class">.txt</span>
│          
├─<span class="hljs-selector-tag">build</span>   # 这里是打包工具相关的
│      <span class="hljs-selector-tag">build-all</span><span class="hljs-selector-class">.js</span> # 通过打包所有端的代码
│      <span class="hljs-selector-tag">build</span><span class="hljs-selector-class">.js</span>        # 这里设定进程的环境变量
│      <span class="hljs-selector-tag">check-versions</span><span class="hljs-selector-class">.js</span>
│      <span class="hljs-selector-tag">dev-client</span><span class="hljs-selector-class">.js</span>  
│      <span class="hljs-selector-tag">dev-server</span><span class="hljs-selector-class">.js</span>    # 这里也需要对进程的环境变量进行设定
│      <span class="hljs-selector-tag">device-conf</span><span class="hljs-selector-class">.js</span>    # 这里面有关于多端开发、打包的相关设定
│      <span class="hljs-selector-tag">utils</span><span class="hljs-selector-class">.js</span>
│      <span class="hljs-selector-tag">vue-loader</span><span class="hljs-selector-class">.conf</span><span class="hljs-selector-class">.js</span>
│      <span class="hljs-selector-tag">webpack</span><span class="hljs-selector-class">.base</span><span class="hljs-selector-class">.conf</span><span class="hljs-selector-class">.js</span>        # 修改了入口、出口等
│      <span class="hljs-selector-tag">webpack</span><span class="hljs-selector-class">.dev</span><span class="hljs-selector-class">.conf</span><span class="hljs-selector-class">.js</span>        # 修改了入口、出口等
│      <span class="hljs-selector-tag">webpack</span><span class="hljs-selector-class">.prod</span><span class="hljs-selector-class">.conf</span><span class="hljs-selector-class">.js</span>        # 修改了入口出口等
│      <span class="hljs-selector-tag">webpack</span><span class="hljs-selector-class">.test</span><span class="hljs-selector-class">.conf</span><span class="hljs-selector-class">.js</span>        # 测试相关还未完善
│      
├─<span class="hljs-selector-tag">config</span>
│      <span class="hljs-selector-tag">dev</span><span class="hljs-selector-class">.env</span><span class="hljs-selector-class">.js</span>
│      <span class="hljs-selector-tag">index</span><span class="hljs-selector-class">.js</span>                    # 打包的入口和出口
│      <span class="hljs-selector-tag">prod</span><span class="hljs-selector-class">.env</span><span class="hljs-selector-class">.js</span>
│      <span class="hljs-selector-tag">test</span><span class="hljs-selector-class">.env</span><span class="hljs-selector-class">.js</span>
│      
├─<span class="hljs-selector-tag">dist</span>        # 最后打包的目录 分端储存
│  ├─<span class="hljs-selector-tag">app</span>
│  │  │  <span class="hljs-selector-tag">index</span><span class="hljs-selector-class">.html</span>
│  │  │  
│  │  └─<span class="hljs-selector-tag">static</span>
│  │      └─<span class="hljs-selector-tag">js</span>
│  │              <span class="hljs-selector-tag">index</span><span class="hljs-selector-class">.0142f89e3523b3b0d16b</span><span class="hljs-selector-class">.js</span>
│  │              <span class="hljs-selector-tag">index</span><span class="hljs-selector-class">.0142f89e3523b3b0d16b</span><span class="hljs-selector-class">.js</span><span class="hljs-selector-class">.map</span>
│  │              <span class="hljs-selector-tag">manifest</span><span class="hljs-selector-class">.57f6691c595e842abc95</span><span class="hljs-selector-class">.js</span>
│  │              <span class="hljs-selector-tag">manifest</span><span class="hljs-selector-class">.57f6691c595e842abc95</span><span class="hljs-selector-class">.js</span><span class="hljs-selector-class">.map</span>
│  │              <span class="hljs-selector-tag">vendor</span><span class="hljs-selector-class">.cce790f63359fc27fa7d</span><span class="hljs-selector-class">.js</span>
│  │              <span class="hljs-selector-tag">vendor</span><span class="hljs-selector-class">.cce790f63359fc27fa7d</span><span class="hljs-selector-class">.js</span><span class="hljs-selector-class">.map</span>
│  │              
│  ├─<span class="hljs-selector-tag">mobile</span>
│  │  │  <span class="hljs-selector-tag">index</span><span class="hljs-selector-class">.html</span>
│  │  │  
│  │  └─<span class="hljs-selector-tag">static</span>
│  │      └─<span class="hljs-selector-tag">js</span>
│  │              <span class="hljs-selector-tag">index</span><span class="hljs-selector-class">.0142f89e3523b3b0d16b</span><span class="hljs-selector-class">.js</span>
│  │              <span class="hljs-selector-tag">index</span><span class="hljs-selector-class">.0142f89e3523b3b0d16b</span><span class="hljs-selector-class">.js</span><span class="hljs-selector-class">.map</span>
│  │              <span class="hljs-selector-tag">manifest</span><span class="hljs-selector-class">.57f6691c595e842abc95</span><span class="hljs-selector-class">.js</span>
│  │              <span class="hljs-selector-tag">manifest</span><span class="hljs-selector-class">.57f6691c595e842abc95</span><span class="hljs-selector-class">.js</span><span class="hljs-selector-class">.map</span>
│  │              <span class="hljs-selector-tag">vendor</span><span class="hljs-selector-class">.cce790f63359fc27fa7d</span><span class="hljs-selector-class">.js</span>
│  │              <span class="hljs-selector-tag">vendor</span><span class="hljs-selector-class">.cce790f63359fc27fa7d</span><span class="hljs-selector-class">.js</span><span class="hljs-selector-class">.map</span>
│  │              
│  └─<span class="hljs-selector-tag">pc</span>
│      │  <span class="hljs-selector-tag">index</span><span class="hljs-selector-class">.html</span>
│      │  
│      └─<span class="hljs-selector-tag">static</span>
│          ├─<span class="hljs-selector-tag">css</span>
│          │      <span class="hljs-selector-tag">index</span><span class="hljs-selector-class">.1e809171f3a961de951e3c8e6644435f</span><span class="hljs-selector-class">.css</span>
│          │      <span class="hljs-selector-tag">index</span><span class="hljs-selector-class">.1e809171f3a961de951e3c8e6644435f</span><span class="hljs-selector-class">.css</span><span class="hljs-selector-class">.map</span>
│          │      
│          └─<span class="hljs-selector-tag">js</span>
│                  0<span class="hljs-selector-class">.f3e74a76d92b3f6ca5ec</span><span class="hljs-selector-class">.js</span>
│                  0<span class="hljs-selector-class">.f3e74a76d92b3f6ca5ec</span><span class="hljs-selector-class">.js</span><span class="hljs-selector-class">.map</span>
│                  1<span class="hljs-selector-class">.fb471d3425df8c16ac54</span><span class="hljs-selector-class">.js</span>
│                  1<span class="hljs-selector-class">.fb471d3425df8c16ac54</span><span class="hljs-selector-class">.js</span><span class="hljs-selector-class">.map</span>
│                  <span class="hljs-selector-tag">index</span><span class="hljs-selector-class">.a2ba631673923f812cf1</span><span class="hljs-selector-class">.js</span>
│                  <span class="hljs-selector-tag">index</span><span class="hljs-selector-class">.a2ba631673923f812cf1</span><span class="hljs-selector-class">.js</span><span class="hljs-selector-class">.map</span>
│                  <span class="hljs-selector-tag">manifest</span><span class="hljs-selector-class">.ab6461111db19541d04b</span><span class="hljs-selector-class">.js</span>
│                  <span class="hljs-selector-tag">manifest</span><span class="hljs-selector-class">.ab6461111db19541d04b</span><span class="hljs-selector-class">.js</span><span class="hljs-selector-class">.map</span>
│                  <span class="hljs-selector-tag">vendor</span><span class="hljs-selector-class">.aeee805b1efff3748018</span><span class="hljs-selector-class">.js</span>
│                  <span class="hljs-selector-tag">vendor</span><span class="hljs-selector-class">.aeee805b1efff3748018</span><span class="hljs-selector-class">.js</span><span class="hljs-selector-class">.map</span>
│                  
├─<span class="hljs-selector-tag">images</span>         # 这个放点文档写文档用的图片                        
├─<span class="hljs-selector-tag">sever</span>            # 这里写点服务端程序，用于测试等
│      <span class="hljs-selector-tag">prod-view-server</span><span class="hljs-selector-class">.js</span>
│      
├─<span class="hljs-selector-tag">src</span>            # 源文件目录
│  │  <span class="hljs-selector-tag">config</span><span class="hljs-selector-class">.js</span>
│  │  
│  ├─<span class="hljs-selector-tag">api</span>        # 多端共用的 <span class="hljs-selector-tag">api</span>
│  │      <span class="hljs-selector-tag">device-root</span><span class="hljs-selector-class">.js</span>
│  │      <span class="hljs-selector-tag">middleware</span><span class="hljs-selector-class">.js</span>
│  │      
│  ├─<span class="hljs-selector-tag">assets</span>        # 多端共用的 资源
│  │      <span class="hljs-selector-tag">logo</span><span class="hljs-selector-class">.png</span>
│  │      
│  ├─<span class="hljs-selector-tag">components</span>    # 多端共用的 组件
│  │      <span class="hljs-selector-tag">RootCommonComponent</span><span class="hljs-selector-class">.vue</span>
│  │      
│  └─<span class="hljs-selector-tag">device</span>        # 设备入口 
│      ├─<span class="hljs-selector-tag">app</span>    # 混合开发的放这里了，也可以分 <span class="hljs-selector-tag">ios</span> 和 安卓
│      │      <span class="hljs-selector-tag">index</span><span class="hljs-selector-class">.html</span>    # <span class="hljs-selector-tag">app</span>专用的<span class="hljs-selector-tag">html</span>模板，打包好的东西会自动注入
│      │      <span class="hljs-selector-tag">index</span><span class="hljs-selector-class">.js</span>        # <span class="hljs-selector-tag">app</span>的入口文件
│      │      
│      ├─<span class="hljs-selector-tag">mobile</span>        # 这里放移动端的页面 ，下面的 <span class="hljs-selector-tag">index</span>文件作用类似其他端
│      │      <span class="hljs-selector-tag">index</span><span class="hljs-selector-class">.html</span>    
│      │      <span class="hljs-selector-tag">index</span><span class="hljs-selector-class">.js</span>
│      │      
│      └─<span class="hljs-selector-tag">pc</span>            # 这个目录下的都是<span class="hljs-selector-tag">pc</span>端使用的，当然其他端要用也是可以的，哈哈
│          │  <span class="hljs-selector-tag">App</span><span class="hljs-selector-class">.vue</span>        # 入口组件
│          │  <span class="hljs-selector-tag">index</span><span class="hljs-selector-class">.html</span>    # 模板文件
│          │  <span class="hljs-selector-tag">index</span><span class="hljs-selector-class">.js</span>        # 入口文件
│          │  
│          ├─<span class="hljs-selector-tag">api</span>            # 分离开接口
│          │      <span class="hljs-selector-tag">home</span><span class="hljs-selector-class">.js</span>    # <span class="hljs-selector-tag">home</span>这个模块用的接口
│          │      <span class="hljs-selector-tag">middleware</span><span class="hljs-selector-class">.js</span>            # 一些公用的中间件
│          │      
│          ├─<span class="hljs-selector-tag">assets</span>            # 资源
│          ├─<span class="hljs-selector-tag">components</span>        # 组件
│          │  ├─<span class="hljs-selector-tag">commonComponents</span>    # 公共组件
│          │  │      <span class="hljs-selector-tag">Header</span><span class="hljs-selector-class">.vue</span>
│          │  │      
│          │  ├─<span class="hljs-selector-tag">Home</span>    # <span class="hljs-selector-tag">home</span>这个模块用的组件
│          │  │      <span class="hljs-selector-tag">Body</span><span class="hljs-selector-class">.vue</span>
│          │  │      <span class="hljs-selector-tag">Index</span><span class="hljs-selector-class">.vue</span>
│          │  │      
│          │  └─<span class="hljs-selector-tag">Page404</span>    # 404这个模块用的组件
│          │          <span class="hljs-selector-tag">Index</span><span class="hljs-selector-class">.vue</span>
│          │          
│          ├─<span class="hljs-selector-tag">router</span>        # 路由
│          │      <span class="hljs-selector-tag">index</span><span class="hljs-selector-class">.js</span>
│          │      
│          ├─<span class="hljs-selector-tag">store</span>        # <span class="hljs-selector-tag">vuex</span> 的<span class="hljs-selector-tag">store</span>
│          │  │  <span class="hljs-selector-tag">index</span><span class="hljs-selector-class">.js</span>    # 根级别的<span class="hljs-selector-tag">store</span> + 模块组装
│          │  │  
│          │  └─<span class="hljs-selector-tag">modules</span>        # <span class="hljs-selector-tag">store</span> 模块
│          │          <span class="hljs-selector-tag">home</span><span class="hljs-selector-class">.js</span>    # <span class="hljs-selector-tag">home</span>这个模块使用的<span class="hljs-selector-tag">store</span>
│          │          
│          └─<span class="hljs-selector-tag">types</span>            # 放类型名称
│                  <span class="hljs-selector-tag">home</span><span class="hljs-selector-class">.js</span>    # <span class="hljs-selector-tag">home</span>这个模块使用的 <span class="hljs-selector-tag">types</span>
│                  <span class="hljs-selector-tag">root</span><span class="hljs-selector-class">.js</span>    # 公用的<span class="hljs-selector-tag">types</span>
│                  
├─<span class="hljs-selector-tag">static</span>
│      <span class="hljs-selector-class">.gitkeep</span>
│      
└─<span class="hljs-selector-tag">test</span>    # 测试相关 <span class="hljs-selector-tag">TODO</span>
    </code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue单页多页的开发环境配置+vue的开发思路

## 原文链接
[https://segmentfault.com/a/1190000009543196](https://segmentfault.com/a/1190000009543196)

