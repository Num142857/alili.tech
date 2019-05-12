---
title: 'iMap | 一款基于 Electron 和 Vue 的跨平台旅行地图生成器' 
date: 2018-12-28 2:30:11
hidden: true
slug: zw3sgwvd35c
categories: [reprint]
---

{{< raw >}}

                    
<p>项目地址：<a href="https://huangxizhou.com/project/iMap" rel="nofollow noreferrer" target="_blank">https://huangxizhou.com/project/iMap</a></p>
<h2 id="articleHeader0"><strong>技术栈</strong></h2>
<ul>
<li><a href="https://cn.vuejs.org/" rel="nofollow noreferrer" target="_blank">Vue.js</a></li>
<li><a href="https://vuex.vuejs.org/zh-cn/" rel="nofollow noreferrer" target="_blank">Vuex</a></li>
<li><a href="http://www.kancloud.cn/yunye/axios/234845" rel="nofollow noreferrer" target="_blank">Axios</a></li>
<li><a href="https://webpack.js.org/" rel="nofollow noreferrer" target="_blank">Webpack</a></li>
<li>
<a href="https://leancloud.cn" rel="nofollow noreferrer" target="_blank">Leancloud</a>（express）</li>
<li><a href="http://echarts.baidu.com/index.html" rel="nofollow noreferrer" target="_blank">Echarts</a></li>
<li>Electron（<a href="https://simulatedgreg.gitbooks.io/electron-vue/content/en/" rel="nofollow noreferrer" target="_blank">electron-vue</a>）</li>
</ul>
<h2 id="articleHeader1"><strong>项目目录</strong></h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".
├── LICENSE
├── README.md
├── build··········································electron-packager 打包出来的各平台应用
│&nbsp;&nbsp; └── icons······································各平台应用图标
│&nbsp;&nbsp;     ├── icon.icns
│&nbsp;&nbsp;     ├── icon.ico
│&nbsp;&nbsp;     └── icon.png
├── dist···········································应用构建后的代码目录
│&nbsp;&nbsp; ├── electron
├── package.json···································应用层级的 package.json
├── src············································electron 入口文件文件夹
│&nbsp;&nbsp; ├── index.ejs
│&nbsp;&nbsp; ├── main·······································electron 主进程文件文件夹
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── index.dev.js
│&nbsp;&nbsp; │&nbsp;&nbsp; └── index.js
│&nbsp;&nbsp; └── renderer···································Vue 相关的目录
│&nbsp;&nbsp;     ├── App.vue································单页面的主结构
│&nbsp;&nbsp;     ├── assets·································静态资源文件夹
│&nbsp;&nbsp;     │&nbsp;&nbsp; ├── img································项目配图
│&nbsp;&nbsp;     │&nbsp;&nbsp; │&nbsp;&nbsp; ├── china.png
│&nbsp;&nbsp;     │&nbsp;&nbsp; │&nbsp;&nbsp; ├── excel_example.png
│&nbsp;&nbsp;     │&nbsp;&nbsp; │&nbsp;&nbsp; └── world.png
│&nbsp;&nbsp;     │&nbsp;&nbsp; └── my-theme···························iVew 自定义主题相关目录
│&nbsp;&nbsp;     ├── components·····························Vue 相关组件目录
│&nbsp;&nbsp;     │&nbsp;&nbsp; ├── Layout·····························布局组件
│&nbsp;&nbsp;     │&nbsp;&nbsp; │&nbsp;&nbsp; └── Header.vue·····················导航栏
│&nbsp;&nbsp;     │&nbsp;&nbsp; ├── Page·······························页面组件
│&nbsp;&nbsp;     │&nbsp;&nbsp; │&nbsp;&nbsp; ├── Auth.vue·······················用户权限获取组件
│&nbsp;&nbsp;     │&nbsp;&nbsp; │&nbsp;&nbsp; ├── Chart.vue······················制作地图组件
│&nbsp;&nbsp;     │&nbsp;&nbsp; │&nbsp;&nbsp; ├── ForgetPassword.vue·············忘记密码组件
│&nbsp;&nbsp;     │&nbsp;&nbsp; │&nbsp;&nbsp; ├── Help.vue·······················帮助文档组件
│&nbsp;&nbsp;     │&nbsp;&nbsp; │&nbsp;&nbsp; ├── Home.vue·······················主页组件
│&nbsp;&nbsp;     │&nbsp;&nbsp; │&nbsp;&nbsp; ├── Login.vue······················登录页组件
│&nbsp;&nbsp;     │&nbsp;&nbsp; │&nbsp;&nbsp; ├── Map.vue························地图类型组件
│&nbsp;&nbsp;     │&nbsp;&nbsp; │&nbsp;&nbsp; ├── MyProject.vue··················我的项目组件
│&nbsp;&nbsp;     │&nbsp;&nbsp; │&nbsp;&nbsp; ├── Register.vue···················注册组件
│&nbsp;&nbsp;     │&nbsp;&nbsp; │&nbsp;&nbsp; └── Update.vue·····················登录组件
│&nbsp;&nbsp;     │&nbsp;&nbsp; └── Ui·································功能组件
│&nbsp;&nbsp;     │&nbsp;&nbsp;     ├── AddPointModal.vue··············添加地点组件
│&nbsp;&nbsp;     │&nbsp;&nbsp;     ├── DelPointModal.vue··············删除地点组件
│&nbsp;&nbsp;     │&nbsp;&nbsp;     └── EditPointModal.vue·············修改地点组件
│&nbsp;&nbsp;     ├── data···································Echarts 相关数据存放文件夹
│&nbsp;&nbsp;     │&nbsp;&nbsp; ├── china.json·························中国地图 json 数据
│&nbsp;&nbsp;     │&nbsp;&nbsp; ├── map.js·····························导入坐标数据
│&nbsp;&nbsp;     │&nbsp;&nbsp; └── world.json·························世界地图 json 数据
│&nbsp;&nbsp;     ├── filter·································Vue 过滤器目录
│&nbsp;&nbsp;     │&nbsp;&nbsp; └── index.js
│&nbsp;&nbsp;     ├── main.js································Vue 入口文件
│&nbsp;&nbsp;     ├── router·································Vue 路由文件
│&nbsp;&nbsp;     │&nbsp;&nbsp; └── index.js
│&nbsp;&nbsp;     ├── server·································ajax相关操作文件
│&nbsp;&nbsp;     │&nbsp;&nbsp; ├── ajax.js····························二次封装ajax
│&nbsp;&nbsp;     │&nbsp;&nbsp; └── url.js·····························接口别名
│&nbsp;&nbsp;     ├── store··································Vuex 数据目录
│&nbsp;&nbsp;     │&nbsp;&nbsp; ├── actions.js·························涉及多个 mutations 的 action 集合 
│&nbsp;&nbsp;     │&nbsp;&nbsp; ├── index.js···························Vuex 入口文件
│&nbsp;&nbsp;     │&nbsp;&nbsp; ├── modules····························模块目录
│&nbsp;&nbsp;     │&nbsp;&nbsp; │&nbsp;&nbsp; ├── excel.js·······················Excel 数据相关模块
│&nbsp;&nbsp;     │&nbsp;&nbsp; │&nbsp;&nbsp; └── user_info.js···················用户数据相关模块
│&nbsp;&nbsp;     │&nbsp;&nbsp; └── mutations_types.js·················mutation-types 声明  
│&nbsp;&nbsp;     ├── tool···································工具文件夹
│&nbsp;&nbsp;     │&nbsp;&nbsp; └── index.js
│&nbsp;&nbsp;     └── version································应用版本文件夹
│&nbsp;&nbsp;         └── version.js
└── yarn.lock" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>.
├── <span class="hljs-selector-tag">LICENSE</span>
├── <span class="hljs-selector-tag">README</span><span class="hljs-selector-class">.md</span>
├── <span class="hljs-selector-tag">build</span>··········································<span class="hljs-selector-tag">electron-packager</span> 打包出来的各平台应用
│&nbsp;&nbsp; └── <span class="hljs-selector-tag">icons</span>······································各平台应用图标
│&nbsp;&nbsp;     ├── <span class="hljs-selector-tag">icon</span><span class="hljs-selector-class">.icns</span>
│&nbsp;&nbsp;     ├── <span class="hljs-selector-tag">icon</span><span class="hljs-selector-class">.ico</span>
│&nbsp;&nbsp;     └── <span class="hljs-selector-tag">icon</span><span class="hljs-selector-class">.png</span>
├── <span class="hljs-selector-tag">dist</span>···········································应用构建后的代码目录
│&nbsp;&nbsp; ├── <span class="hljs-selector-tag">electron</span>
├── <span class="hljs-selector-tag">package</span><span class="hljs-selector-class">.json</span>···································应用层级的 <span class="hljs-selector-tag">package</span><span class="hljs-selector-class">.json</span>
├── <span class="hljs-selector-tag">src</span>············································<span class="hljs-selector-tag">electron</span> 入口文件文件夹
│&nbsp;&nbsp; ├── <span class="hljs-selector-tag">index</span><span class="hljs-selector-class">.ejs</span>
│&nbsp;&nbsp; ├── <span class="hljs-selector-tag">main</span>·······································<span class="hljs-selector-tag">electron</span> 主进程文件文件夹
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── <span class="hljs-selector-tag">index</span><span class="hljs-selector-class">.dev</span><span class="hljs-selector-class">.js</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; └── <span class="hljs-selector-tag">index</span><span class="hljs-selector-class">.js</span>
│&nbsp;&nbsp; └── <span class="hljs-selector-tag">renderer</span>···································<span class="hljs-selector-tag">Vue</span> 相关的目录
│&nbsp;&nbsp;     ├── <span class="hljs-selector-tag">App</span><span class="hljs-selector-class">.vue</span>································单页面的主结构
│&nbsp;&nbsp;     ├── <span class="hljs-selector-tag">assets</span>·································静态资源文件夹
│&nbsp;&nbsp;     │&nbsp;&nbsp; ├── <span class="hljs-selector-tag">img</span>································项目配图
│&nbsp;&nbsp;     │&nbsp;&nbsp; │&nbsp;&nbsp; ├── <span class="hljs-selector-tag">china</span><span class="hljs-selector-class">.png</span>
│&nbsp;&nbsp;     │&nbsp;&nbsp; │&nbsp;&nbsp; ├── <span class="hljs-selector-tag">excel_example</span><span class="hljs-selector-class">.png</span>
│&nbsp;&nbsp;     │&nbsp;&nbsp; │&nbsp;&nbsp; └── <span class="hljs-selector-tag">world</span><span class="hljs-selector-class">.png</span>
│&nbsp;&nbsp;     │&nbsp;&nbsp; └── <span class="hljs-selector-tag">my-theme</span>···························<span class="hljs-selector-tag">iVew</span> 自定义主题相关目录
│&nbsp;&nbsp;     ├── <span class="hljs-selector-tag">components</span>·····························<span class="hljs-selector-tag">Vue</span> 相关组件目录
│&nbsp;&nbsp;     │&nbsp;&nbsp; ├── <span class="hljs-selector-tag">Layout</span>·····························布局组件
│&nbsp;&nbsp;     │&nbsp;&nbsp; │&nbsp;&nbsp; └── <span class="hljs-selector-tag">Header</span><span class="hljs-selector-class">.vue</span>·····················导航栏
│&nbsp;&nbsp;     │&nbsp;&nbsp; ├── <span class="hljs-selector-tag">Page</span>·······························页面组件
│&nbsp;&nbsp;     │&nbsp;&nbsp; │&nbsp;&nbsp; ├── <span class="hljs-selector-tag">Auth</span><span class="hljs-selector-class">.vue</span>·······················用户权限获取组件
│&nbsp;&nbsp;     │&nbsp;&nbsp; │&nbsp;&nbsp; ├── <span class="hljs-selector-tag">Chart</span><span class="hljs-selector-class">.vue</span>······················制作地图组件
│&nbsp;&nbsp;     │&nbsp;&nbsp; │&nbsp;&nbsp; ├── <span class="hljs-selector-tag">ForgetPassword</span><span class="hljs-selector-class">.vue</span>·············忘记密码组件
│&nbsp;&nbsp;     │&nbsp;&nbsp; │&nbsp;&nbsp; ├── <span class="hljs-selector-tag">Help</span><span class="hljs-selector-class">.vue</span>·······················帮助文档组件
│&nbsp;&nbsp;     │&nbsp;&nbsp; │&nbsp;&nbsp; ├── <span class="hljs-selector-tag">Home</span><span class="hljs-selector-class">.vue</span>·······················主页组件
│&nbsp;&nbsp;     │&nbsp;&nbsp; │&nbsp;&nbsp; ├── <span class="hljs-selector-tag">Login</span><span class="hljs-selector-class">.vue</span>······················登录页组件
│&nbsp;&nbsp;     │&nbsp;&nbsp; │&nbsp;&nbsp; ├── <span class="hljs-selector-tag">Map</span><span class="hljs-selector-class">.vue</span>························地图类型组件
│&nbsp;&nbsp;     │&nbsp;&nbsp; │&nbsp;&nbsp; ├── <span class="hljs-selector-tag">MyProject</span><span class="hljs-selector-class">.vue</span>··················我的项目组件
│&nbsp;&nbsp;     │&nbsp;&nbsp; │&nbsp;&nbsp; ├── <span class="hljs-selector-tag">Register</span><span class="hljs-selector-class">.vue</span>···················注册组件
│&nbsp;&nbsp;     │&nbsp;&nbsp; │&nbsp;&nbsp; └── <span class="hljs-selector-tag">Update</span><span class="hljs-selector-class">.vue</span>·····················登录组件
│&nbsp;&nbsp;     │&nbsp;&nbsp; └── <span class="hljs-selector-tag">Ui</span>·································功能组件
│&nbsp;&nbsp;     │&nbsp;&nbsp;     ├── <span class="hljs-selector-tag">AddPointModal</span><span class="hljs-selector-class">.vue</span>··············添加地点组件
│&nbsp;&nbsp;     │&nbsp;&nbsp;     ├── <span class="hljs-selector-tag">DelPointModal</span><span class="hljs-selector-class">.vue</span>··············删除地点组件
│&nbsp;&nbsp;     │&nbsp;&nbsp;     └── <span class="hljs-selector-tag">EditPointModal</span><span class="hljs-selector-class">.vue</span>·············修改地点组件
│&nbsp;&nbsp;     ├── <span class="hljs-selector-tag">data</span>···································<span class="hljs-selector-tag">Echarts</span> 相关数据存放文件夹
│&nbsp;&nbsp;     │&nbsp;&nbsp; ├── <span class="hljs-selector-tag">china</span><span class="hljs-selector-class">.json</span>·························中国地图 <span class="hljs-selector-tag">json</span> 数据
│&nbsp;&nbsp;     │&nbsp;&nbsp; ├── <span class="hljs-selector-tag">map</span><span class="hljs-selector-class">.js</span>·····························导入坐标数据
│&nbsp;&nbsp;     │&nbsp;&nbsp; └── <span class="hljs-selector-tag">world</span><span class="hljs-selector-class">.json</span>·························世界地图 <span class="hljs-selector-tag">json</span> 数据
│&nbsp;&nbsp;     ├── <span class="hljs-selector-tag">filter</span>·································<span class="hljs-selector-tag">Vue</span> 过滤器目录
│&nbsp;&nbsp;     │&nbsp;&nbsp; └── <span class="hljs-selector-tag">index</span><span class="hljs-selector-class">.js</span>
│&nbsp;&nbsp;     ├── <span class="hljs-selector-tag">main</span><span class="hljs-selector-class">.js</span>································<span class="hljs-selector-tag">Vue</span> 入口文件
│&nbsp;&nbsp;     ├── <span class="hljs-selector-tag">router</span>·································<span class="hljs-selector-tag">Vue</span> 路由文件
│&nbsp;&nbsp;     │&nbsp;&nbsp; └── <span class="hljs-selector-tag">index</span><span class="hljs-selector-class">.js</span>
│&nbsp;&nbsp;     ├── <span class="hljs-selector-tag">server</span>·································<span class="hljs-selector-tag">ajax</span>相关操作文件
│&nbsp;&nbsp;     │&nbsp;&nbsp; ├── <span class="hljs-selector-tag">ajax</span><span class="hljs-selector-class">.js</span>····························二次封装<span class="hljs-selector-tag">ajax</span>
│&nbsp;&nbsp;     │&nbsp;&nbsp; └── <span class="hljs-selector-tag">url</span><span class="hljs-selector-class">.js</span>·····························接口别名
│&nbsp;&nbsp;     ├── <span class="hljs-selector-tag">store</span>··································<span class="hljs-selector-tag">Vuex</span> 数据目录
│&nbsp;&nbsp;     │&nbsp;&nbsp; ├── <span class="hljs-selector-tag">actions</span><span class="hljs-selector-class">.js</span>·························涉及多个 <span class="hljs-selector-tag">mutations</span> 的 <span class="hljs-selector-tag">action</span> 集合 
│&nbsp;&nbsp;     │&nbsp;&nbsp; ├── <span class="hljs-selector-tag">index</span><span class="hljs-selector-class">.js</span>···························<span class="hljs-selector-tag">Vuex</span> 入口文件
│&nbsp;&nbsp;     │&nbsp;&nbsp; ├── <span class="hljs-selector-tag">modules</span>····························模块目录
│&nbsp;&nbsp;     │&nbsp;&nbsp; │&nbsp;&nbsp; ├── <span class="hljs-selector-tag">excel</span><span class="hljs-selector-class">.js</span>·······················<span class="hljs-selector-tag">Excel</span> 数据相关模块
│&nbsp;&nbsp;     │&nbsp;&nbsp; │&nbsp;&nbsp; └── <span class="hljs-selector-tag">user_info</span><span class="hljs-selector-class">.js</span>···················用户数据相关模块
│&nbsp;&nbsp;     │&nbsp;&nbsp; └── <span class="hljs-selector-tag">mutations_types</span><span class="hljs-selector-class">.js</span>·················<span class="hljs-selector-tag">mutation-types</span> 声明  
│&nbsp;&nbsp;     ├── <span class="hljs-selector-tag">tool</span>···································工具文件夹
│&nbsp;&nbsp;     │&nbsp;&nbsp; └── <span class="hljs-selector-tag">index</span><span class="hljs-selector-class">.js</span>
│&nbsp;&nbsp;     └── <span class="hljs-selector-tag">version</span>································应用版本文件夹
│&nbsp;&nbsp;         └── <span class="hljs-selector-tag">version</span><span class="hljs-selector-class">.js</span>
└── <span class="hljs-selector-tag">yarn</span><span class="hljs-selector-class">.lock</span></code></pre>
<h2 id="articleHeader2"><strong>接口与数据问题</strong></h2>
<p>本项目使用的是官方推荐的axios</p>
<blockquote><p>Axios 是一个基于 promise 的 HTTP 库，可以用在浏览器和 node.js 中。</p></blockquote>
<p>本来之前想使用 <code>prototype</code> 来写侵入式代码，但维护起来还是很麻烦，最终还是撸了个开箱即用的 axios 二次封装的js文件出来：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// POST 请求
post({...obj}) {
  return new Promise((resolve, reject) => {
    axios.post(obj.url, obj.data, {
        headers: {
          &quot;Authorization&quot;: user &amp;&amp; user.accessToken
        }
      }).then((data) => {
      if(data.data.code === 0) {
        // ...
      } else if (data.data.code === 1)  {
        // ...        
      } else {
        // ...  
      }
    }).catch((data) => {
      reject(data)
    })
  })     
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// POST 请求</span>
post({...obj}) {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    axios.post(obj.url, obj.data, {
        <span class="hljs-attr">headers</span>: {
          <span class="hljs-string">"Authorization"</span>: user &amp;&amp; user.accessToken
        }
      }).then(<span class="hljs-function">(<span class="hljs-params">data</span>) =&gt;</span> {
      <span class="hljs-keyword">if</span>(data.data.code === <span class="hljs-number">0</span>) {
        <span class="hljs-comment">// ...</span>
      } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (data.data.code === <span class="hljs-number">1</span>)  {
        <span class="hljs-comment">// ...        </span>
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-comment">// ...  </span>
      }
    }).catch(<span class="hljs-function">(<span class="hljs-params">data</span>) =&gt;</span> {
      reject(data)
    })
  })     
}</code></pre>
<p>一般来说，在接收到后端返回的数据时，可以使用<code>resolve(data.data)</code>来直接处理数据，当然也可以按需引入一些 UI 组件与过滤器，直接在 ajax 封装文件中就可以过滤数据并进行全局提示，提升用户体验。</p>
<p>对于 GET 请求，由于项目有使用到百度地图开放 API 来获取城市经纬度，涉及到 <code>jsonp</code> 跨域问题，尴尬的是 axios 官方说明不会支持 <code>jsonp</code> ，所以只能引入 <code>jsonp</code> 这个 npm 包，并且将请求此接口从 GET 请求中单独提取出来。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  getLocation({...obj}) {
    return new Promise((resolve, reject) => {
      jsonp(obj.url + '?' + qs.stringify(obj.data) , null,  (err, data) => {
        if (err) {
          Message.error('请求错误')
        } else {
          if(data.status === 0) {
            resolve(data)
          }
        }
      })
    })
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code class="javascipt">  getLocation({...obj}) {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> Promise(<span class="hljs-function"><span class="hljs-params">(resolve, reject)</span> =&gt;</span> {
      jsonp(obj.url + <span class="hljs-string">'?'</span> + qs.stringify(obj.data) , <span class="hljs-literal">null</span>,  <span class="hljs-function"><span class="hljs-params">(err, data)</span> =&gt;</span> {
        <span class="hljs-keyword">if</span> (err) {
          Message.error(<span class="hljs-string">'请求错误'</span>)
        } <span class="hljs-keyword">else</span> {
          <span class="hljs-keyword">if</span>(data.status === <span class="hljs-number">0</span>) {
            resolve(data)
          }
        }
      })
    })
  }</code></pre>
<p>GET 请求 ajax 代码封装与 POST 基本一致，只是将 <code>obj.data</code> 换成 <code>{ paramas: obj.data }</code> 即可。</p>
<h2 id="articleHeader3"><strong>关于 Vuex 的使用</strong></h2>
<p>Vuex是个能把组件的共享状态抽取出来，当做一个全局单例模式进行管理。这样不管你在何处改变状态，都会通知使用该状态的组件做出相应修改。</p>
<p>在本项目中，需要提取到全局管理的数据有 <code>userInfo</code> 和 <code>excelData</code>，前者保存在全局中，可以减少请求用户信息接口的数量，节约资源，后者由于 Excel 文件上传到后端后只做解析，不保存，所以全局管理 <code>excelData</code> 很重要。</p>
<p>在这里就单独说一说添加城市坐标的操作好了：<br>首先是 <code>mutations_types</code> 声明文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// mutations_types.js
export const ADD_EXCEL_DATA = 'ADD_EXCEL_DATA'
..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code class="javascipt"><span class="hljs-comment">// mutations_types.js</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> ADD_EXCEL_DATA = <span class="hljs-string">'ADD_EXCEL_DATA'</span>
...</code></pre>
<p>声明 <code>state</code> 和 <code>mutations</code><br>在 Vuex 中，更改 Vuex 的 store 中的状态的唯一方法就是 mutations</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// modules/excel.js
import * as types from '../mutations_types'

// state
const state = {
  excelData: {}
}

// mutations
const mutations = {
  ...
  // 添加 excelData
  [types.ADD_EXCEL_DATA] (state, data) {
    state.excelData.data.push(data)
  },
  ...
}

// 导出 state, mutations
export default {
  state,
  mutations
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code class="javascipt">// modules/excel.js
import * as types <span class="hljs-keyword">from</span> '../mutations_types'

// <span class="hljs-keyword">state</span>
const <span class="hljs-keyword">state</span> = {
  excelData: {}
}

// mutations
const mutations = {
  ...
  // 添加 excelData
  [types.ADD_EXCEL_DATA] (<span class="hljs-keyword">state</span>, data) {
    <span class="hljs-keyword">state</span>.excelData.data.push(data)
  },
  ...
}

// 导出 <span class="hljs-keyword">state</span>, mutations
export <span class="hljs-keyword">default</span> {
  <span class="hljs-keyword">state</span>,
  mutations
}</code></pre>
<p>然而，Mutations 必须是同步函数，所以我们还需要 actions</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// actions.js
import * as types from './mutations_types'

...
// 添加 excelData
export const addExcelData = ({ commit }, data) => {
    commit(types.ADD_EXCEL_DATA, data)
}
..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code class="javascipt"><span class="hljs-comment">// actions.js</span>
<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> types <span class="hljs-keyword">from</span> <span class="hljs-string">'./mutations_types'</span>

...
<span class="hljs-comment">// 添加 excelData</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> addExcelData = <span class="hljs-function">(<span class="hljs-params">{ commit }, data</span>) =&gt;</span> {
    commit(types.ADD_EXCEL_DATA, data)
}
...</code></pre>
<p>最后，再在入口文件注入 modules 和 actions即可</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="...
export default new Vuex.Store({
  actions,
  modules: {
    excel
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cpp"><code class="javascipt">...
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">new</span> Vuex.Store({
  actions,
  modules: {
    excel
  }
})</code></pre>
<p>这样一来，关于 excelData 的 数据管理的任督二脉已经打通，现在就看如何来使用了</p>
<p>在组件中可以使用 <code>mapState</code> 、<code>mapActions</code> 辅助函数来简化代码<br><code>mapState</code>函数用在计算属性中</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// AddPointModal.vue
  computed: {
    ...mapState({
      excelData: state => state.excel.excelData,
      countAlias: 'excelData'
    })
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code class="javascipt">// AddPointModal.vue
  computed: {
    ...mapState({
      excelData: <span class="hljs-keyword">state</span> =&gt; <span class="hljs-keyword">state</span>.excel.excelData,
      countAlias: 'excelData'
    })
  }</code></pre>
<p><code>mapActions</code> 函数在本项目中用于 methods 中</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  methods: {
    ...mapActions({
      addExcelData: 'addExcelData'
    })
    ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">  methods: {
    ...mapActions({
      <span class="hljs-attr">addExcelData</span>: <span class="hljs-string">'addExcelData'</span>
    })
    ...
}</code></pre>
<p>在函数中调用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.addExcelData(Arrary)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">this</span>.addExcelData(Arrary)</code></pre>
<p>这样就成功将一个新的数组元素添加到 <code>excelData</code> 中了。</p>
<h2 id="articleHeader4"><strong>如何获取 Excel 数据</strong></h2>
<p>本项目采用 Leancloud 来作为后端支持，使用的是Node.js（express），对于获取用户的 Excel 数据并不想保存数据的话，本项目的思路是将 Node 作为一个文件中转的存在，上传用户 Excel 文件至服务器后，在 <code>/public</code> 目录下保存Excel文件，再在下次用户上传时，清空 <code>/public</code> 目录。</p>
<p>用户 Excel 处理的库本项目选择的是 <a href="https://github.com/mgcrea/node-xlsx" rel="nofollow noreferrer" target="_blank">node-xlsx</a></p>
<p>特别注意的是，在前端文件中，上传用户 Excel 文件是需要使用 <code>formData</code> 来上传的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let formData = new FormData()
formData.append('file', this.file)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> formData = <span class="hljs-keyword">new</span> FormData()
formData.append(<span class="hljs-string">'file'</span>, <span class="hljs-keyword">this</span>.file)</code></pre>
<p>后端使用 <a href="https://github.com/felixge/node-formidable" rel="nofollow noreferrer" target="_blank">formidable</a> 这个库来接收 Excel 文件并使用 <code>form.parse</code> 来解析。</p>
<h2 id="articleHeader5"><strong>关于使用 Echarts</strong></h2>
<blockquote><p>ECharts，一个纯 Javascript 的图表库，可以流畅的运行在 PC 和移动设备上，兼容当前绝大部分浏览器（IE8/9/10/11，Chrome，Firefox，Safari等），底层依赖轻量级的 Canvas 类库 ZRender，提供直观，生动，可交互，可高度个性化定制的数据可视化图表。</p></blockquote>
<p>对于在 Vue 项目中使用 Echarts , 本项目采用的是 <a href="https://github.com/Justineo/vue-echarts" rel="nofollow noreferrer" target="_blank">vue-echarts</a> <br>在 <code>chart.vue</code> 文件中，我们利用一个三元运算符来动态切换地图类型</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.selectMapType === 'china' ?  ECharts.registerMap('china', chinaMap) : ECharts.registerMap('world', worldMap)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">this</span>.selectMapType === <span class="hljs-string">'china'</span> ?  ECharts.registerMap(<span class="hljs-string">'china'</span>, chinaMap) : ECharts.registerMap(<span class="hljs-string">'world'</span>, worldMap)</code></pre>
<p>对于地图数据的导入，本项目的方法是的是导入一个对象，返回地图 <code>option</code> 数据:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// map.js
...
export default {
    getMapData({...obj}) {
    ...
        return {
           // 地图配置数据
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// map.js</span>
...
export <span class="hljs-keyword">default</span> {
    getMapData({...obj}) {
    ...
        return {
           <span class="hljs-comment">// 地图配置数据</span>
        }
    }
}</code></pre>
<p>再在前端文件中使用这个函数即可: <code>this.option = map.getMapData(this.excelData)</code></p>
<h2 id="articleHeader6"><strong>Vue 中父子组件双向绑定</strong></h2>
<p>在本项目中，我将添加、编辑、删除地点的弹窗全部提取到公用 Ui 组件文件夹中，然而这就需要利用 v-model 来实现组件 props 双向绑定</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// template
<Modal :value=&quot;value&quot; v-model=&quot;showModal&quot;></Modal>


// script
export default {
  props: {
      value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return: {
        showModal: false
    }
  },
  watch:{
    value(val) {
      this.showModal = val
    },
    showModal(val) {
      this.$emit('input', val)
    }
  },
  mounted() {
    if (this.value) {
      this.showModal = true;
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// template</span>
&lt;Modal :value=<span class="hljs-string">"value"</span> v-model=<span class="hljs-string">"showModal"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">Modal</span>&gt;</span></span>


<span class="hljs-comment">// script</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">props</span>: {
      <span class="hljs-attr">value</span>: {
      <span class="hljs-attr">type</span>: <span class="hljs-built_in">Boolean</span>,
      <span class="hljs-attr">default</span>: <span class="hljs-literal">false</span>
    }
  },
  data() {
    <span class="hljs-attr">return</span>: {
        <span class="hljs-attr">showModal</span>: <span class="hljs-literal">false</span>
    }
  },
  <span class="hljs-attr">watch</span>:{
    value(val) {
      <span class="hljs-keyword">this</span>.showModal = val
    },
    showModal(val) {
      <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">'input'</span>, val)
    }
  },
  mounted() {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.value) {
      <span class="hljs-keyword">this</span>.showModal = <span class="hljs-literal">true</span>;
    }
  }
}</code></pre>
<p>这样就能使用value来保存 v-model 的值，从而进行双向绑定。</p>
<h2 id="articleHeader7"><strong>在MacOS 上打包 Win32 软件包</strong></h2>
<p>在 electron-vue 文档中有这么一句话：</p>
<blockquote><p>If you are wanting to build for Windows with a custom icon using a non-Windows platform, you must have wine installed.</p></blockquote>
<p>那么我们就来安装wine。首先确保你的 Mac 已经安装 homebrew，运行 <code>brew install wine</code> 来安装wine。</p>
<p>接下来，会出现一个错误提示，提示我们需要安装 Xquartz，按照错误提示给的下载网址下载即可。</p>
<p>再次运行 <code>brew install wine</code> </p>
<p>安装成功后在项目目录下运行 <code>npm run build:win32</code> 就可以打包成Win32 安装包了</p>
<h2 id="articleHeader8"><strong>求一份工作~</strong></h2>
<p>2019年毕业生求带走</p>
<p><a href="https://huangxizhou.com/resume" rel="nofollow noreferrer" target="_blank">我的简历</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
iMap | 一款基于 Electron 和 Vue 的跨平台旅行地图生成器

## 原文链接
[https://segmentfault.com/a/1190000011565835](https://segmentfault.com/a/1190000011565835)

