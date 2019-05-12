---
title: '使用dva+antd快速构建单页面应用' 
date: 2019-01-18 2:30:34
hidden: true
slug: ztwijotjhfi
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">项目结构及使用工具集</h2>
<p>原文地址: <a href="http://www.mh611.com/blog/2017/03/23/build-app-with-dva-antd/" rel="nofollow noreferrer" target="_blank">个人博客</a>或<a href="http://joescott.coding.me/blog/2017/03/23/build-app-with-dva-antd/" rel="nofollow noreferrer" target="_blank">joescott.coding.me/blog</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="`project
   |----- src    项目源代码
   |----- dist   项目编译目标
   |----- .roadhogrc 路霸运行配置文件
   |----- lumen_api RESTful api代码目录
   |----- mock   模拟数据服务目录


`src
  |---  index.js      入口js文件
  |---  index.html    项目入口html文件
  |---  router.js     路由文件
  |---  routes        子路由目录， 下面每个子路由使用一个单独的文件夹
  |---  components    组件目录，这里特指公共组件
  |---  models        model目录
  |---  services      服务目录
  |---  utils         工具包目录
  |---  constants.js  常量文件，这个文件其实可放入utils目录，然后统一暴露出去" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code>`project
   <span class="hljs-string">|----- src    项目源代码</span>
   <span class="hljs-string">|----- dist   项目编译目标</span>
   <span class="hljs-string">|----- .roadhogrc 路霸运行配置文件</span>
   <span class="hljs-string">|----- lumen_api RESTful api代码目录</span>
   <span class="hljs-string">|----- mock   模拟数据服务目录</span>


`src
  <span class="hljs-string">|---  index.js      入口js文件</span>
  <span class="hljs-string">|---  index.html    项目入口html文件</span>
  <span class="hljs-string">|---  router.js     路由文件</span>
  <span class="hljs-string">|---  routes        子路由目录， 下面每个子路由使用一个单独的文件夹</span>
  <span class="hljs-string">|---  components    组件目录，这里特指公共组件</span>
  <span class="hljs-string">|---  models        model目录</span>
  <span class="hljs-string">|---  services      服务目录</span>
  <span class="hljs-string">|---  utils         工具包目录</span>
  <span class="hljs-string">|---  constants.js  常量文件，这个文件其实可放入utils目录，然后统一暴露出去</span></code></pre>
<p>以上是项目中的总体目录结构。 下面详细介绍几个重要部分的结构。</p>
<p>此应用是当入口应用，入口在src/index.js， 配置在.roadhogrc中，当然roadhog还支持多入口模式，这里不涉及。</p>
<h2 id="articleHeader1">组件系统</h2>
<p>项目中组件分为两大类, 容器组件和呈现组件。</p>
<h3 id="articleHeader2">容器组件</h3>
<p>容器组件对应于每个独立的route页面。每个容器组件都维护一个相关的state, 所有的state改变都由容器最终执行。容器组件负责向其子组件(呈现组件)分配属性(props)。</p>
<p>该项目中，所有子组件仅作呈现组件，没有state, 只有从父级组件传递下来的props。state由容器组件统一管理，然后分发到子组件中。</p>
<p>容器组件在该项目中以路由组件的形式存在，存放在src/routes下面对应的子目录中。每个容器组件使用的子组件(非共享的)都在路由组件目录中存放。而使用到的公共组件则存放在components目录下面。例如公共组件提供数据表的包装，下拉操作控件包装等等，在多个容器组件的子组件中会用到。都被抽离到components目录中。</p>
<p>容器组件的范本如下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// routes/users/index.js
import React, { PropTypes } from 'react'
import { RouterRedux } from 'dva/router'
import { connect } from 'dva'
function Users({ location, dispatch, users, loading }) {
}
Users.propTypes = {
  menus: PropTypes.object,
  // ...
}
function mapStateToProps(state) {
  return {
    users: state.users,
    loading: state.loading.models.users,
  }
}
export default connect(mapStateToProps)(Users)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// routes/users/index.js</span>
<span class="hljs-keyword">import</span> React, { PropTypes } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>
<span class="hljs-keyword">import</span> { RouterRedux } <span class="hljs-keyword">from</span> <span class="hljs-string">'dva/router'</span>
<span class="hljs-keyword">import</span> { connect } <span class="hljs-keyword">from</span> <span class="hljs-string">'dva'</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Users</span>(<span class="hljs-params">{ location, dispatch, users, loading }</span>) </span>{
}
Users.propTypes = {
  <span class="hljs-attr">menus</span>: PropTypes.object,
  <span class="hljs-comment">// ...</span>
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">mapStateToProps</span>(<span class="hljs-params">state</span>) </span>{
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">users</span>: state.users,
    <span class="hljs-attr">loading</span>: state.loading.models.users,
  }
}
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> connect(mapStateToProps)(Users)</code></pre>
<p>创建一个类Users, 接收一些参数，用于类自己使用，后面会通过connect将state联系给这些参数。<br>设置类的propTypes, 编译的时候会对属性进行检查，发现类型错误，编译失败。确保项目质量。</p>
<p>将state和类的属性联系起来， 通过connect方法来实现导出组件</p>
<h3 id="articleHeader3">呈现组件</h3>
<p>项目中的呈现组件根据共享特性，分别存放于routers目录和components目录中。它们是无state组件，只从父组件获取到props。比如容器组件向呈现组件传入state相关的部分属性和相应的操作方法给呈现组件的props, 一级级递归传下去。 而子组件的交互产生改变state的操作，则由子组件沿原路上传回给容器组件，最终由容器组件的具体方法来触发state的同步，以及UI的更新。</p>
<p>呈现组件的范本如下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { PropTypes } from 'react'
// ...
function XView ({
  prop1,
  prop2,
  prop3,
  // ...
}) => {
  // create XView propOpts
  const propOpts = {
    p1,
    p2,
    // ...
  }
  return (
    <div {...propOpts}>
     <div>something to render</div>
    </div>
  )
}
XView.propTypes = {
  // ...
}
export default XView" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> React, { PropTypes } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>
<span class="hljs-comment">// ...</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">XView</span> (<span class="hljs-params">{
  prop1,
  prop2,
  prop3,
  <span class="hljs-regexp">//</span> ...
}</span>) =&gt; </span>{
  <span class="hljs-comment">// create XView propOpts</span>
  <span class="hljs-keyword">const</span> propOpts = {
    p1,
    p2,
    <span class="hljs-comment">// ...</span>
  }
  <span class="hljs-keyword">return</span> (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> {<span class="hljs-attr">...propOpts</span>}&gt;</span>
     <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>something to render<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  )
}
XView.propTypes = {
  <span class="hljs-comment">// ...</span>
}
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> XView</code></pre>
<p>呈现组件和容器组件相比，就是没有使用connect进行state到prop建立联系。这很正常，因为呈现组件是无状态的的，它只有属性，从父层传下来的属性而已。</p>
<p>有了这样的呈现组件，那么就可以直接在父层调用:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<XView {...props}>
</XView>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">XView</span> </span></span><span class="hljs-template-variable">{...props}</span><span class="xml"><span class="hljs-tag">&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">XView</span>&gt;</span></span></code></pre>
<p>XView调用的时候，属性props会作为XView类构造函数的输入。</p>
<h2 id="articleHeader4">模型系统</h2>
<p>该应用的模型model按业务维度设计。模型设计有两种实现方式:</p>
<ul>
<li><p>按数据维度设计: 抽离数据和相关操作的方法。 只关心数据本身，至于使用数据模型的组件所遇到的状态管理则与模型无关，而是作为组件自身的state来维护。</p></li>
<li><p>按照业务维度设计: 将数据和使用数据强关联组件中的状态抽象成model的方法。</p></li>
</ul>
<p>该应用使用后者。</p>
<p>模型位于src/models, 每个独立的route都对应一个model, 每个model包含如下属性:</p>
<ul>
<li><p>namespace: 模型的命名空间，这个是必须的，而且在同一个应用中每个模型的该属性是唯一的。使用可读性较强的词语作namespace, 比如users, categories, menus之类的。</p></li>
<li><p>state: 与具体route相关的所有状态数据结构存放在该属性中。比如数据列表，当前操作项，弹出层的显隐状态等等都可以保存在该属性中。</p></li>
<li><p>subscriptions: 该属性是dva的8个核心概念之一。 该属性存放从源获取数据的设置。 比如当pathname和给定的名称匹配的时候，执行什么操作之类的设置。</p></li>
<li><p>effects: 该属性存放的是异步操作的一些方法。从词语字面意思理解来说，是副作用，就是请求非幂等性的。比如异步获取数据列表、异步更新、异步插入、异步删除等等操作。</p></li>
<li><p>reducers: 该属性存放的是对state的合并方法。基本上就是将新的state值合并到原来的state中, 以达到state的同步。reducer的含义就是多个合并返回一个的意思。</p></li>
</ul>
<p>除了上面的几个属性外，需要另外注意几个方法的使用:</p>
<ul>
<li><p>select: 从state中查找所需的子state属性。该方法参数为state, 返回一个子state对象。</p></li>
<li><p>put: 创建一条effect信息, 指示middleware发起一个action到Store. put({type: ‘xxxx’, payload: {"}}")</p></li>
<li><p>call: 创建一条effect信息，指示middleware使用args作为fn的参数执行，例如call(services.create, payload)</p></li>
</ul>
<p>基本的model范本如下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// models/users.js
export default {
  namespace: 'users',
  state: {},
  subscriptions: {},
  effects: {},
  reducers: {}
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-comment">// models/users.js</span>
<span class="hljs-selector-tag">export</span> <span class="hljs-selector-tag">default</span> {
  <span class="hljs-attribute">namespace</span>: <span class="hljs-string">'users'</span>,
  <span class="hljs-attribute">state</span>: {},
  <span class="hljs-attribute">subscriptions</span>: {},
  <span class="hljs-attribute">effects</span>: {},
  <span class="hljs-attribute">reducers</span>: {}
}</code></pre>
<h2 id="articleHeader5">服务(services)</h2>
<p>有了上面的两个部分，基本的静态交互已经就绪，就剩下和真正的或模拟的API交互了，这部分抽离为services, 即services提供异步数据获取。<br>每个services对应一个route的操作集合，比如query查询列表，update更新记录，create新增记录，delete删除记录。</p>
<p>这个层面的设计，相对比较简单，直接在utils中包装一个request类，提供fetch或ajax功能，然后services中直接将请求参数传入相应方法即可。返回请求的结果Promise。</p>
<h3 id="articleHeader6">mock服务</h3>
<p>roadhog使用json作为运行时配置，它提供了代理的配置，简单配置如下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  &quot;proxy&quot;: {
    &quot;/api&quot;: {
      &quot;target&quot;: &quot;http://localhost:3004/&quot;,
//      &quot;target&quot;: &quot;http://192.168.200.30:8099/api&quot;,
      &quot;changeOrigin&quot;: true,
      &quot;pathRewrite&quot;: { &quot;^/api&quot; : &quot;&quot; }
    }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code>  <span class="hljs-string">"proxy"</span>: {
    <span class="hljs-string">"/api"</span>: {
      <span class="hljs-string">"target"</span>: <span class="hljs-string">"http://localhost:3004/"</span>,
//      <span class="hljs-string">"target"</span>: <span class="hljs-string">"http://192.168.200.30:8099/api"</span>,
      <span class="hljs-string">"changeOrigin"</span>: true,
      <span class="hljs-string">"pathRewrite"</span>: { <span class="hljs-string">"^/api"</span> : <span class="hljs-string">""</span> }
    }
  }</code></pre>
<p>比如使用json-server+mockjs实现的mock服务，启动端口号为3004， 那么使用target指向3004端口，那么请求/api/xxx的时候就进入json-server提供的mock服务。</p>
<p>另外如果和api服务连调的话，同样可以将target指向真实api服务的base url。 例如上面注释掉的那行。</p>
<p>而在正式打包上线后，就不走proxy, 免配置修改，直接生效。</p>
<h3 id="articleHeader7">API设计</h3>
<p>API采用lumen微框架实现的restful api, 这块的不作过多介绍，如有兴趣自行搜索lumen官网查看, 或参照lumen_api中的代码来查看。</p>
<h2 id="articleHeader8">总结</h2>
<p>整个设计下来， 开发流畅性非常不错。 开发体验也非常好。 暂时该项目不支持less, 对图片的处理也稍逊色，后续待解决。</p>
<h2 id="articleHeader9">roadhog源码分析</h2>
<p>roadhog是对webpack功能作的一个封装，roadhog会读取自己的配置信息，然后转换为webpack的配置对象，最终调用webpack作项目打包。下面对roadhog源码作简单分析。</p>
<p>roadhog提供了三个命令:</p>
<ul>
<li><p>roadhog build: 构建production bundle</p></li>
<li><p>roadhog server: 启动开发环境</p></li>
<li><p>roadhog test: 启动测试</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="result = spawn.sync(
  'node',
  [require.resolve(`../lib/${script}`)].concat(args),
  { stdio: 'inherit' }
);
process.exit(result.status);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code>result = spawn.sync(
  <span class="hljs-string">'node'</span>,
  [require.resolve(`..<span class="hljs-regexp">/lib/</span><span class="hljs-variable">${script}</span>`)].concat(args),
  { stdio: <span class="hljs-string">'inherit'</span> }
);
process.<span class="hljs-keyword">exit</span>(result.status);</code></pre>
<p>上面代码中的script的值为build, server或test, 而args是roadhog命令后面的option选项。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Options:
  --debug            Build without compress           [boolean] [default: false]
  --watch, -w        Watch file changes and rebuild   [boolean] [default: false]
  --output-path, -o  Specify output path                [string] [default: null]
  --analyze          Visualize and analyze your Webpack bundle.
                                                      [boolean] [default: false]
  -h                 Show help                                         [boolean]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs n1ql"><code>Options:
  --debug            <span class="hljs-keyword">Build</span> without compress           [<span class="hljs-keyword">boolean</span>] [default: <span class="hljs-literal">false</span>]
  --watch, -w        Watch file changes <span class="hljs-keyword">and</span> rebuild   [<span class="hljs-keyword">boolean</span>] [default: <span class="hljs-literal">false</span>]
  --output-<span class="hljs-keyword">path</span>, -o  Specify output <span class="hljs-keyword">path</span>                [<span class="hljs-keyword">string</span>] [default: <span class="hljs-literal">null</span>]
  --<span class="hljs-keyword">analyze</span>          Visualize <span class="hljs-keyword">and</span> <span class="hljs-keyword">analyze</span> your Webpack bundle.
                                                      [<span class="hljs-keyword">boolean</span>] [default: <span class="hljs-literal">false</span>]
  -h                 <span class="hljs-keyword">Show</span> help                                         [<span class="hljs-keyword">boolean</span>]</code></pre>
<p>roadhog源码中还有一个异步post上报功能， 上报给阿里你当前的平台信息，git用户信息等。 不知道这个具体用于干啥的。 ^-^。<br>roadhog xxx实际上是调用lib/xxx.js执行具体任务。</p>
<p>我们下面先看看build.js的逻辑。</p>
<h3 id="articleHeader10">roadhog build</h3>
<p>build.js代码骨架如下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var _extends = Object.assign || function (target) {
  // Object.assign polyfill
}
exports.build = build;
process.env.NODE_ENV = 'production';
var argv = require('yargs').usage()
  .option()
  .option()
// ...
function build(argv) {
  // the body of the build
}
if (require.main === module) {
  build(_extends({}, argv, { cwd: process.cwd() }));
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> _extends = <span class="hljs-built_in">Object</span>.assign || <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">target</span>) </span>{
  <span class="hljs-comment">// Object.assign polyfill</span>
}
exports.build = build;
process.env.NODE_ENV = <span class="hljs-string">'production'</span>;
<span class="hljs-keyword">var</span> argv = <span class="hljs-built_in">require</span>(<span class="hljs-string">'yargs'</span>).usage()
  .option()
  .option()
<span class="hljs-comment">// ...</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">build</span>(<span class="hljs-params">argv</span>) </span>{
  <span class="hljs-comment">// the body of the build</span>
}
<span class="hljs-keyword">if</span> (<span class="hljs-built_in">require</span>.main === <span class="hljs-built_in">module</span>) {
  build(_extends({}, argv, { <span class="hljs-attr">cwd</span>: process.cwd() }));
}</code></pre>
<p>注意这里require.main === module判断模块是否为应用的主模块，类似于python的if <strong>name</strong> == “__main__“。</p>
<p>也就是说roadhog build实际上就是调用了build.js暴露出去的build方法。</p>
<h3 id="articleHeader11">argv分析</h3>
<ul>
<li><p>debug: 布尔类型值，表示是否使用压缩模式构建</p></li>
<li><p>watch: 短选项名w, 表示观察文件的改动，然后重新构建</p></li>
<li><p>output-path: 别名o, 表示构建的目标地址， 默认为./dist目录。</p></li>
<li><p>analyze: 可视化并分析你的webpack打包</p></li>
<li><p>h: 显示帮助信息</p></li>
</ul>
<h3 id="articleHeader12">build函数分析</h3>
<p>path(lib/config/path.js)</p>
<p>该文件根据build.js当前工作目录，获取应用程序几个重要的相关文件或文件夹的绝对路径：</p>
<ul>
<li><p>appBuild: dist目录的绝对路径</p></li>
<li><p>appPublic: public目录的绝对路径</p></li>
<li><p>appPackageJson: package.json文件的绝对路径</p></li>
<li><p>appSrc: src源代码目录的绝对路径</p></li>
<li><p>appNodeModules: node_modules目录的绝对路径</p></li>
<li><p>ownNodeModules: roadhog自身的node_modules的绝对路径</p></li>
<li><p>resolveApp: 该函数接收一个相对路径，返回该目录相对应用程序目录的绝对路径</p></li>
<li><p>appDirectory: 应用程序所在目录的绝对路径</p></li>
<li><p>getConfig(lib/utils/getConfig.js)</p></li>
</ul>
<p>该方法根据环境获取应用程序当前目录下面的真实配置文件的内容:realGetConfig(‘.roadhogrc’, env, pkg, paths)。</p>
<p>默认使用.roadhogrc配置文件，env为当前环境模式，pkg为package.json文件内容，paths是上面的path相关的路径信息。</p>
<p>roadhog默认配置文件使用json格式的配置，允许在文件中使用注释:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="return (0, _parseJsonPretty2.default)((0, _stripJsonComments2.default)((0, _fs.readFileSync)(rcConfig, 'utf-8')), './roadhogrc');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lisp"><code style="word-break: break-word; white-space: initial;">return (<span class="hljs-number">0</span>, _parseJsonPretty2.default)((<span class="hljs-number">0</span>, _stripJsonComments2.default)((<span class="hljs-number">0</span>, _fs.readFileSync)(<span class="hljs-name">rcConfig</span>, 'utf-8')), './roadhogrc')<span class="hljs-comment">;</span></code></pre>
<p>另外如果不使用.roadhogrc这种配置文件，还可以使用.roadhogrc.js文件，使用纯js来实现配置。返回一个配置对象就可以了。</p>
<p>使用.js配置文件可以允许在配置中使用js变量和方法。灵活度还是蛮高的。</p>
<p>如果两者都没有，roadhog依然可以正常使用，自定义配置对象为空对象而已。</p>
<p>另外配置文件中可以使用package.json中的包名称(name)和版本信息(version)。 分别使用$npm_package_name变量和$npm_package_version变量。</p>
<p>另外如果是test环境模式，可以注册babel。这块通过lib/utils/registerBabel.js代码中实现的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require('babel-register')({
  only: ...
  presets: ...
  plugins: ...
  babelrc: ...
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code><span class="hljs-keyword">require</span>(<span class="hljs-string">'babel-register'</span>)({
  only: <span class="hljs-params">...</span>
  presets: <span class="hljs-params">...</span>
  plugins: <span class="hljs-params">...</span>
  babelrc: <span class="hljs-params">...</span>
})</code></pre>
<p>roadhog配置转webpack配置</p>
<p>在获取了roadhog配置之后，就会将roadhog的配置转换成webpack的配置对象，毕竟底层使用的是webpack来打包的。<br>roadhog将命令选项(argv), 应用构建目录(appBuild), 自有配置(.roadhogrc内容)和应用程序的路径信息合并到默认的webpack.config.prod.js中。</p>
<p>webpack.config.prod.js返回一个函数，该函数返回合并后的webpack对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// lib/config/webpack.config.prod.js
export default function(args, appBuild, config, paths) {
  return {
    bail: true,
    entry: xxxx
    // ...
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// lib/config/webpack.config.prod.js</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">args, appBuild, config, paths</span>) </span>{
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">bail</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">entry</span>: xxxx
    <span class="hljs-comment">// ...</span>
  }
}</code></pre>
<p>roadhog除了提供默认的webpack配置，还支持用户自定义webpack配置覆盖roadhog默认配置， 在项目根目录下面建立webpack.config.js文件，该文件的模版如下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default function (config, env) {
  const newConfig = {};
  // merge or override
  return newConfig;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code>export <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> </span>(config, env) {
  const <span class="hljs-keyword">new</span><span class="hljs-type">Config</span> = {};
  <span class="hljs-comment">// merge or override</span>
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span><span class="hljs-type">Config</span>;
}</code></pre>
<p>接收的config为roadhog合并默认配置后的配置对象， env是环境模式。</p>
<p>也就是说完全可以利用所有webpack的功能来实现。</p>
<h4>构建过程</h4>
<p>在构建之前，先递归读取构建目录中之前所有的.js文件和.css文件，记录原始文件尺寸, 并清理原来的构建目录中的文件。 然后将这些尺寸信息传入构建过程，进行真实构建。</p>
<p>realBuild</p>
<p>真实构建函数实现非常简单，代码如下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function realBuild(previousSizeMap, resolve, argv) {
  if (argv.debug) {
    console.log('不压缩的方式构建');
  } else {
    console.log('优化的方式构建');
  }
  var compiler = (0, _webpack2.default)(config);
  var done = doneHandler.bind(null, previousSizeMap, argv, resolve);
  if (argv.watch) {
    compiler.watch(200, done);
  } else {
    compiler.run(done);
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">realBuild</span>(<span class="hljs-params">previousSizeMap, resolve, argv</span>) </span>{
  <span class="hljs-keyword">if</span> (argv.debug) {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'不压缩的方式构建'</span>);
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'优化的方式构建'</span>);
  }
  <span class="hljs-keyword">var</span> compiler = (<span class="hljs-number">0</span>, _webpack2.default)(config);
  <span class="hljs-keyword">var</span> done = doneHandler.bind(<span class="hljs-literal">null</span>, previousSizeMap, argv, resolve);
  <span class="hljs-keyword">if</span> (argv.watch) {
    compiler.watch(<span class="hljs-number">200</span>, done);
  } <span class="hljs-keyword">else</span> {
    compiler.run(done);
  }
}</code></pre>
<p>到目前为止，roadhog的打包构建功能已经完全解读完了。归根结底就是webpack打包。</p>
<h1 id="articleHeader13">参考连接</h1>
<ul>
<li><p><a href="https://github.com/walkerqiao/dva-antd-demos" rel="nofollow noreferrer" target="_blank">项目代码</a></p></li>
<li><p><a href="https://github.com/dvajs/dva-docs/blob/master/v1/zh-cn/tutorial/04-" rel="nofollow noreferrer" target="_blank">组件设计方法</a></p></li>
<li><p><a href="http://leonshi.com/redux-saga-in-chinese/docs/api/index.html" rel="nofollow noreferrer" target="_blank">Redux-saga中文文档</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000005128101">ES6开发中的兼容性考虑</a></p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用dva+antd快速构建单页面应用

## 原文链接
[https://segmentfault.com/a/1190000008819650](https://segmentfault.com/a/1190000008819650)

