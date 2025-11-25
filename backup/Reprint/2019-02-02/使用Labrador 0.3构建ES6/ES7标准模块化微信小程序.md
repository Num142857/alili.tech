---
title: '使用Labrador 0.3构建ES6/ES7标准模块化微信小程序' 
date: 2019-02-02 2:30:11
hidden: true
slug: snv43p810ji
categories: [reprint]
---

{{< raw >}}

                    
<p><a href="https://github.com/maichong/labrador" rel="nofollow noreferrer" target="_blank">Labrador</a> 是一个专为微信小程序开发的模块化的前端开发框架</p>
<p>在<a href="https://segmentfault.com/a/1190000007017985">微信小程序开发三宗罪和解决方案</a>一文中我向大家阐述了微信小程序开发的三个弊端，并提供了Labrador框架来解决这些弊端。</p>
<p>在上一个版本的Labrador中，组件重用部分功能不完善，今天Labrador发布了0.3版本，相对上一个版本，提供了更强大的组件化功能，并更改了一些模块接口。</p>
<p>下面是Labrador 0.3.x版本的入门手册，如果你已经基于老版本Labrador构建了项目，请参照下面的说明对应升级项目，并升级一下全局的 labrador-cli 库到0.3版本。</p>
<hr>
<blockquote><p>QQ交流群 282140496</p></blockquote>
<hr>
<h2 id="articleHeader0">特性</h2>
<ul>
<li><p>使用Labrador框架可以使微信开发者工具支持加载海量NPM包</p></li>
<li><p>支持ES6/ES7标准代码,使用async/await能够有效避免回调地狱</p></li>
<li><p>组件重用,对微信小程序框架进行了二次封装,实现了组件重用和嵌套</p></li>
<li><p>使用Editor Config及ESLint标准化代码风格，方便团队协作</p></li>
</ul>
<h2 id="articleHeader1">安装</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install -g labrador-cli" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs avrasm"><code style="word-break: break-word; white-space: initial;">npm install -g labrador-<span class="hljs-keyword">cli</span></code></pre>
<h2 id="articleHeader2">初始化项目</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mkdir demo
cd demo
npm init
labrador init" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code><span class="hljs-built_in">mkdir</span> <span class="hljs-built_in">demo</span>
cd <span class="hljs-built_in">demo</span>
npm init
labrador init</code></pre>
<h2 id="articleHeader3">项目目录结构</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="demo                 # 项目根目录
├── .babelrc         # babel配置文件
├── .editorconfig    # Editor Config
├── .eslintignore    # ESLint 忽略配置
├── .eslintrc        # ESLint 语法检查配置
├── package.json
├── dist/            # 目标目录
├── node_modules/
└── src/             # 源码目录
    ├── app.js
    ├── app.json
    ├── app.less
    ├── components/  # 通用组件目录
    ├── pages/       # 页面目录
    └── utils/
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code class="sh">demo                 <span class="hljs-comment"># 项目根目录</span>
├── .babelrc         <span class="hljs-comment"># babel配置文件</span>
├── .editorconfig    <span class="hljs-comment"># Editor Config</span>
├── .eslintignore    <span class="hljs-comment"># ESLint 忽略配置</span>
├── .eslintrc        <span class="hljs-comment"># ESLint 语法检查配置</span>
├── package.json
├── dist/            <span class="hljs-comment"># 目标目录</span>
├── node_modules/
└── src/             <span class="hljs-comment"># 源码目录</span>
    ├── app.js
    ├── app.json
    ├── app.<span class="hljs-keyword">less</span>
    ├── components/  <span class="hljs-comment"># 通用组件目录</span>
    ├── pages/       <span class="hljs-comment"># 页面目录</span>
    └── utils/
</code></pre>
<blockquote><p><strong>注意</strong> dist目录中的所有文件是由labrador命令生成，请勿直接修改</p></blockquote>
<h2 id="articleHeader4">配置开发工具</h2>
<p>项目初始化后使用WebStorm或Sublime等你习惯的IDE打开项目根目录。然后打开 <em>微信web开发者工具</em> 新建项目，本地开发目录选择 <code>dist</code> 目标目录。</p>
<h2 id="articleHeader5">开发流程</h2>
<p>在WebStorm或Sublime等IDE中编辑 <code>src</code> 目录下的源码，然后在项目根目录中运行<code>labrador build</code> 命令构建项目，然后在 <em>微信web开发者工具</em> 的调试界面中点击左侧菜单的 <em>重启</em> 按钮即可查看效果。</p>
<p>我们在开发中， <em>微信web开发者工具</em> 仅仅用来做调试和预览，不要在 <em>微信web开发者工具</em> 的编辑界面修改代码。</p>
<blockquote><p><em>微信web开发者工具</em> 会偶尔出错，表现为点击 <em>重启</em> 按钮没有反应，调试控制台输出大量的无法require文件的错误，<em>编辑</em> 界面中代码文件不显示。这是因为 <code>labrador build</code> 命令会更新整个 <code>dist</code> 目录，而 <em>微信web开发者工具</em> 在监测代码改变时会出现异常，遇到这种情况只需要关掉 <em>微信web开发者工具</em> 再启动即可。</p></blockquote>
<p>我们还可以使用 <code>labrador watch</code> 命令来监控 <code>src</code> 目录下的代码，当发生改变后自动构建，不用每一次编辑代码后手动运行 <code>labrador build</code> 。</p>
<p>所以最佳的姿势是：</p>
<ol>
<li><p>在项目中运行 <code>labrador watch</code></p></li>
<li><p>在WebStorm中编码，保存</p></li>
<li><p>切换到 <em>微信web开发者工具</em> 中调试、预览</p></li>
<li><p>再回到WebStorm中编码</p></li>
<li><p>...</p></li>
</ol>
<h2 id="articleHeader6">labrador 库</h2>
<p><code>labrador</code> 库对全局的 <code>wx</code> 变量进行了封装，将大部分 <code>wx</code> 对象中的方法进行了Promise支持， 除了以 <code>on*</code> 开头或以 <code>*Sync</code> 结尾的方法。在如下代码中使用 <code>labrador</code> 库。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import wx from 'labrador';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">import</span> wx <span class="hljs-keyword">from</span> <span class="hljs-string">'labrador'</span>;</code></pre>
<p>我们建议不要再使用 <code>wx.getStorageSync()</code> 等同步阻塞方法，而在 <code>async</code> 函数中使用 <code>await wx.getStorage()</code> 异步非阻塞方法提高性能，除非特殊情况。</p>
<h2 id="articleHeader7">app.js</h2>
<p><code>src/app.js</code> 示例代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import wx from 'labrador';
import { sleep } from './utils/util';

export default class {
  globalData = {
    userInfo: null
  };

  async onLaunch() {
    //调用API从本地缓存中获取数据
    let logs = await wx.getStorage({ key: 'logs' }) || [];
    logs.unshift(Date.now());
    await wx.setStorage({ key: 'logs', data: logs });
    this.timer();
  }

  async timer() {
    while (true) {
      console.log('hello');
      await sleep(10000);
    }
  }

  async getUserInfo() {
    if (this.globalData.userInfo) {
      return this.globalData.userInfo;
    }
    await wx.login();
    let res = await wx.getUserInfo();
    this.globalData.userInfo = res.userInfo;
    return res.userInfo;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> wx <span class="hljs-keyword">from</span> <span class="hljs-string">'labrador'</span>;
<span class="hljs-keyword">import</span> { sleep } <span class="hljs-keyword">from</span> <span class="hljs-string">'./utils/util'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> </span>{
  globalData = {
    <span class="hljs-attr">userInfo</span>: <span class="hljs-literal">null</span>
  };

  <span class="hljs-keyword">async</span> onLaunch() {
    <span class="hljs-comment">//调用API从本地缓存中获取数据</span>
    <span class="hljs-keyword">let</span> logs = <span class="hljs-keyword">await</span> wx.getStorage({ <span class="hljs-attr">key</span>: <span class="hljs-string">'logs'</span> }) || [];
    logs.unshift(<span class="hljs-built_in">Date</span>.now());
    <span class="hljs-keyword">await</span> wx.setStorage({ <span class="hljs-attr">key</span>: <span class="hljs-string">'logs'</span>, <span class="hljs-attr">data</span>: logs });
    <span class="hljs-keyword">this</span>.timer();
  }

  <span class="hljs-keyword">async</span> timer() {
    <span class="hljs-keyword">while</span> (<span class="hljs-literal">true</span>) {
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'hello'</span>);
      <span class="hljs-keyword">await</span> sleep(<span class="hljs-number">10000</span>);
    }
  }

  <span class="hljs-keyword">async</span> getUserInfo() {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.globalData.userInfo) {
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.globalData.userInfo;
    }
    <span class="hljs-keyword">await</span> wx.login();
    <span class="hljs-keyword">let</span> res = <span class="hljs-keyword">await</span> wx.getUserInfo();
    <span class="hljs-keyword">this</span>.globalData.userInfo = res.userInfo;
    <span class="hljs-keyword">return</span> res.userInfo;
  }
}</code></pre>
<p>代码中全部使用ES6/ES7标准语法。代码不必声明 <code>use strict</code> ，因为在编译时，所有代码都会强制使用严格模式。</p>
<p>代码中并未调用全局的 <code>App()</code> 方法，而是使用 <code>export</code> 语法默认导出了一个类，在编译后，Labrador会自动增加 <code>App()</code> 方法调用，所有请勿手动调用 <code>App()</code> 方法。</p>
<h2 id="articleHeader8">自定义组件</h2>
<p>Labrador的自定义组件，是基于微信小程序框架的组件之上，进一步自定义组合，拥有逻辑处理和样式。这样做的目的请参见 <a href="https://segmentfault.com/a/1190000007017985" target="_blank">微信小程序开发三宗罪和解决方案</a></p>
<p>项目中通用自定义组件存放在 <code>src/compontents</code> 目录，一个组件一般由三个文件组成，<code>*.js</code> 、 <code>*.xml</code> 和 <code>*.less</code> 分别对应微信小程序框架的 <code>js</code> 、 <code>wxml</code> 和 <code>wxss</code> 文件。在Labardor项目源码中，我们特意采用了 <code>xml</code> 和 <code>less</code> 后缀以示区别。</p>
<h4>自定义组件示例</h4>
<p>下面是一个简单的自定义组件代码实例：</p>
<p>逻辑 <code>src/compontents/title/title.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import wx from 'labrador';
import randomColor  from '../../utils/random-color';

export default class Title extends wx.Component {
  data = {
    text: '',
    color: randomColor()
  };

  handleTap() {
    this.setData({
      color: randomColor()
    });
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> wx <span class="hljs-keyword">from</span> <span class="hljs-string">'labrador'</span>;
<span class="hljs-keyword">import</span> randomColor  <span class="hljs-keyword">from</span> <span class="hljs-string">'../../utils/random-color'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Title</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">wx</span>.<span class="hljs-title">Component</span> </span>{
  data = {
    <span class="hljs-attr">text</span>: <span class="hljs-string">''</span>,
    <span class="hljs-attr">color</span>: randomColor()
  };

  handleTap() {
    <span class="hljs-keyword">this</span>.setData({
      <span class="hljs-attr">color</span>: randomColor()
    });
  }
}</code></pre>
<p>布局 <code>src/compontents/title/title.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<view class=&quot;text-view&quot;>
  <text class=&quot;title-text&quot; catchtap=&quot;handleTap&quot; style=&quot;color:"{{"color"}}";&quot;>"{{"text"}}"</text>
</view>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">view</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"text-view"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">text</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"title-text"</span> <span class="hljs-attr">catchtap</span>=<span class="hljs-string">"handleTap"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"color:"{{"color"}}";"</span>&gt;</span>"{{"text"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">text</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">view</span>&gt;</span></code></pre>
<p>样式 <code>src/compontents/title/title.less</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".title-text {
  font-weight: bold;
  font-size: 2em;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.title-text</span> {
  <span class="hljs-attribute">font-weight</span>: bold;
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">2em</span>;
}</code></pre>
<p>代码和微信小程序框架中的page很相似。最大的区别是在js逻辑代码中，没有调用全局的<code>Page()</code>函数声明页面，而是用 <code>export</code> 语法导出了一个默认的类，这个类需要继承与 <code>labrador.Component</code> 组件基类。</p>
<blockquote><p><strong>注意</strong> 组件中事件响应方法必须以 <code>handle</code> 开头！例如上文中的 <code>handleTap</code></p></blockquote>
<h2 id="articleHeader9">页面</h2>
<p>我们要求所有的页面必须存放在 <code>pages</code> 目录中，每个页面的子目录中的文件格式和自定义组件一致，只是可以多出一个 <code>*.json</code> 配置文件。</p>
<h4>页面示例</h4>
<p>下面是默认首页的示例代码：</p>
<p>逻辑 <code>src/pages/index/index.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import wx from 'labrador';
import List from '../../components/list/list';
import Title from '../../components/title/title';

export default class Index extends wx.Component {
  data = {
    userInfo: {}
  };
  children = {
    list: new List(),
    motto: new Title({ text: 'Hello world' })
  };

  //事件处理函数
  handleViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  }

  async onLoad() {
    //调用应用实例的方法获取全局数据
    let userInfo = await wx.app.getUserInfo();
    //更新数据
    this.setData({
      userInfo: userInfo
    });
    this.update();
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> wx <span class="hljs-keyword">from</span> <span class="hljs-string">'labrador'</span>;
<span class="hljs-keyword">import</span> List <span class="hljs-keyword">from</span> <span class="hljs-string">'../../components/list/list'</span>;
<span class="hljs-keyword">import</span> Title <span class="hljs-keyword">from</span> <span class="hljs-string">'../../components/title/title'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Index</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">wx</span>.<span class="hljs-title">Component</span> </span>{
  data = {
    <span class="hljs-attr">userInfo</span>: {}
  };
  children = {
    <span class="hljs-attr">list</span>: <span class="hljs-keyword">new</span> List(),
    <span class="hljs-attr">motto</span>: <span class="hljs-keyword">new</span> Title({ <span class="hljs-attr">text</span>: <span class="hljs-string">'Hello world'</span> })
  };

  <span class="hljs-comment">//事件处理函数</span>
  handleViewTap() {
    wx.navigateTo({
      <span class="hljs-attr">url</span>: <span class="hljs-string">'../logs/logs'</span>
    })
  }

  <span class="hljs-keyword">async</span> onLoad() {
    <span class="hljs-comment">//调用应用实例的方法获取全局数据</span>
    <span class="hljs-keyword">let</span> userInfo = <span class="hljs-keyword">await</span> wx.app.getUserInfo();
    <span class="hljs-comment">//更新数据</span>
    <span class="hljs-keyword">this</span>.setData({
      <span class="hljs-attr">userInfo</span>: userInfo
    });
    <span class="hljs-keyword">this</span>.update();
  }
}</code></pre>
<p>布局 <code>src/pages/index/index.xml</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<view class=&quot;container&quot;>
  <view bindtap=&quot;handleViewTap&quot; class=&quot;userinfo&quot;>
    <image class=&quot;userinfo-avatar&quot; src=&quot;"{{" userInfo.avatarUrl "}}"&quot; background-size=&quot;cover&quot;/>
    <text class=&quot;userinfo-nickname&quot;>"{{" userInfo.nickName "}}"</text>
  </view>
  <view class=&quot;usermotto&quot;>
    <component key=&quot;motto&quot; name=&quot;title&quot;/>
  </view>
  <component key=&quot;list&quot;/>
</view>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">view</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"container"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">view</span> <span class="hljs-attr">bindtap</span>=<span class="hljs-string">"handleViewTap"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"userinfo"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">image</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"userinfo-avatar"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">""{{" userInfo.avatarUrl "}}""</span> <span class="hljs-attr">background-size</span>=<span class="hljs-string">"cover"</span>/&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">text</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"userinfo-nickname"</span>&gt;</span>"{{" userInfo.nickName "}}"<span class="hljs-tag">&lt;/<span class="hljs-name">text</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">view</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">view</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"usermotto"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">component</span> <span class="hljs-attr">key</span>=<span class="hljs-string">"motto"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"title"</span>/&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">view</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">component</span> <span class="hljs-attr">key</span>=<span class="hljs-string">"list"</span>/&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">view</span>&gt;</span></code></pre>
<p>样式</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@import 'list';
@import 'title';

.motto-title-text {
  font-size: 3em;
  padding-bottom: 1rem;
}

/* ... */" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css">@<span class="hljs-keyword">import</span> <span class="hljs-string">'list'</span>;
@<span class="hljs-keyword">import</span> <span class="hljs-string">'title'</span>;

<span class="hljs-selector-class">.motto-title-text</span> {
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">3em</span>;
  <span class="hljs-attribute">padding-bottom</span>: <span class="hljs-number">1rem</span>;
}

<span class="hljs-comment">/* ... */</span></code></pre>
<p>页面代码的格式和自定义组件的格式一模一样，我们的思想是 <strong>页面也是组件</strong>，页面和自定义组件的唯一差别是页面的代码存放在 <code>pages</code> 目录中。</p>
<p>js逻辑代码中同样使用 <code>export</code> 语句导出了一个默认类，也不能手动调用 <code>Page()</code> 方法，因为在编译后，<code>pages</code> 目录下的所有js文件全部会自动调用 <code>Page()</code> 方法声明页面。</p>
<p>我们看到组件类中，有一个对象属性 <code>children</code> ，这个属性定义了该组件依赖、包含的其他自定义组件，在上面的代码中页面包含了两个自定义组件 <code>list</code> 和 <code>title</code> ，这个两个自定义组件的 <code>key</code> 分别为 <code>list</code> 和 <code>motto</code> 。</p>
<p>xml布局代码中，使用了Labrador提供的 <code>&lt;component/&gt;</code> 标签，此标签的作用是导入一个自定义子组件的布局文件，标签有两个属性，分别为 <code>key</code> (必选)和 <code>name</code> (可选，默认为key的值)。<code>key</code> 与js逻辑代码中的组件 <code>key</code> 对应，<code>name</code> 用来在<code>src/componets</code> 和 <code>node_modules</code> 目录中寻找子组件模板。运行时，key对应的子组件逻辑代码类中的 <code>data</code> 将渲染至子组件模板中。</p>
<p>less样式文件中，我们使用了两条 <code>@import</code> 语句加载子组件样式，这里的 <code>@import 'list'</code> 语句按照LESS的语法，会首先寻找当前目录 <code>src/pages/index/</code> 中的 <code>list.less</code> 文件，如果找不到就会尝试寻找 <code>src/componets</code> 和 <code>node_modules</code> 目录中的组件样式。</p>
<p>接下来，我们定义了 <code>.motto-title-text</code> 样式，这样做是因为 <code>motto</code> key 代表的title组件的模板中有一个view 属于 <code>title-text</code> 类，编译时，Labrador将自动为其增加一个前缀 <code>motto-</code> ，所以编译后这个view所属的类为 <code>title-text motto-title-text</code> 那么我们就可以在父组件的样式代码中使用 <code>.motto-title-text</code> 重新定义子组件的样式。</p>
<blockquote><p><strong>注意</strong> 虽然我们采用了LESS文件，但是由于微信小程序框架的限制，不能使用LESS的层级选择及嵌套语法。但是我们可以使用LESS的变量、mixin、函数等功能方便开发。</p></blockquote>
<p>另外Labrador支持多层组件嵌套，在上述的实例中，<code>index</code> 包含子组件 <code>list</code> 和 <code>title</code>，<code>list</code> 包含子组件 <code>title</code>，所以在最终显示时，<code>index</code> 页面上回显示两个 <code>title</code> 组件。</p>
<p>详细代码请参阅 <code>labrador init</code> 命令生成的示例项目。</p>
<h2 id="articleHeader10">总结</h2>
<p>页面也是组件，所有的组件都拥有一样的生命周期函数onLoad, onReady, onShow, onHide, onUnload 以及setData函数。</p>
<p><code>componets</code> 和 <code>pages</code> 两个目录的区别在于，<code>componets</code> 中存放的组件能够被智能加载，<code>pages</code> 目录中的组件在编译时自动加上 <code>Page()</code> 调用，所以，<code>pages</code> 目录中的组件不能被其他组件调用，如果某个组件需要重用，请存放在 <code>componets</code> 目录或打包成NPM包。</p>
<h2 id="articleHeader11">贡献者</h2>
<p><a href="https://maichong.it" rel="nofollow noreferrer" target="_blank">郑州脉冲软件科技有限公司</a></p>
<p><a href="https://github.com/liangxingchen" rel="nofollow noreferrer" target="_blank">梁兴臣</a></p>
<h2 id="articleHeader12">开源协议</h2>
<p>本项目依据MIT开源协议发布，允许任何组织和个人免费使用。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用Labrador 0.3构建ES6/ES7标准模块化微信小程序

## 原文链接
[https://segmentfault.com/a/1190000007109050](https://segmentfault.com/a/1190000007109050)

