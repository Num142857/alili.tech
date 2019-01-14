---
title: '项目资源和目录设计和mock模拟数据' 
date: 2019-01-15 2:30:12
hidden: true
slug: edbb09xujxh
categories: [reprint]
---

{{< raw >}}

                    
<p>项目资源和目录设计和mock模拟数据</p>
<h2 id="articleHeader0">项目图片资源</h2>
<ol>
<li><p>psd里面标注坐标(设计师完成),相关使用工具也可以markman来协助辅助</p></li>
<li><p>对于在webpack里面使用的一些小图片,不建议使用雪碧图来进行处理,因为本身webpack会自动帮助处理每一张小图片,所以有时候需要单独切出来一个个小图片,并且分别对应2x和3x的版本</p></li>
<li>
<p>2x和3x图是为了适应不同dpr比例的,不同比例的显示是不一样的.</p>
<ol>
<li><p>2x就是普通的dpr为1的屏幕使用的</p></li>
<li><p>对于高清屏幕就是用3x,dpr为2或者以上</p></li>
<li><p>2x和3x就是尺寸的大小,2x的图片比3x的小</p></li>
</ol>
</li>
<li><p>svg图片(优势是伸缩,图片质量不下降),使用工具转化为图标字体文件来引入,使用于那些图片logo使用</p></li>
<li><p>在使用webpack情况下,小于一定大小的图片会转化为base64然后放到js引入,</p></li>
</ol>
<p>关于drp的科普:</p>
<ul>
<li><p>window.devicePixelRatio是设备上物理像素和设备独立像素(device-independent pixels (dips))的比例。公式表示就是：window.devicePixelRatio = 物理像素 / dips</p></li>
<li><p>非视网膜屏幕的iphone上，屏幕物理像素320像素，独立像素也是320像素，因此，window.devicePixelRatio等于1.</p></li>
<li><p>在视网膜屏幕的iphone上，屏幕物理像素640像素，独立像素还是320像素，因此，window.devicePixelRatio等于2.</p></li>
</ul>
<p>参考:<br><a href="http://www.zhangxinxu.com/wordpress/2012/08/window-devicepixelratio/" rel="nofollow noreferrer" target="_blank">设备像素比devicePixelRatio简单介绍</a></p>
<h2 id="articleHeader1">制作图标字体</h2>
<p>icomoon的使用介绍<br><a href="https://icomoon.io/" rel="nofollow noreferrer" target="_blank">https://icomoon.io/</a></p>
<blockquote><p>课程提供了图标字体的svg文件来使用</p></blockquote>
<h2 id="articleHeader2">项目目录设计</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".
├── README.md
├── build
├── config
├── data.json
├── index.html
├── node_modules
├── package.json
├── resource
├── src #这里是项目的源代码目录
    ├── App.vue
    ├── assets
    │&nbsp;&nbsp; └── logo.png
    ├── common #公共引用的资源的目录
    │&nbsp;&nbsp; ├── fonts #里面存放了图标字体(svg生成后的)
    │&nbsp;&nbsp; └── stylus #stylus的目录
    ├── components #vue组件的目录
    │&nbsp;&nbsp; ├── goods
    │&nbsp;&nbsp; ├── header
    │&nbsp;&nbsp; ├── ratings
    │&nbsp;&nbsp; └── seller
└── main.js

└── static" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code class="shell">.
├── README<span class="hljs-selector-class">.md</span>
├── build
├── config
├── data<span class="hljs-selector-class">.json</span>
├── index<span class="hljs-selector-class">.html</span>
├── node_modules
├── package<span class="hljs-selector-class">.json</span>
├── resource
├── src #这里是项目的源代码目录
    ├── App<span class="hljs-selector-class">.vue</span>
    ├── assets
    │&nbsp;&nbsp; └── logo<span class="hljs-selector-class">.png</span>
    ├── common #公共引用的资源的目录
    │&nbsp;&nbsp; ├── fonts #里面存放了图标字体(svg生成后的)
    │&nbsp;&nbsp; └── stylus #stylus的目录
    ├── components #vue组件的目录
    │&nbsp;&nbsp; ├── goods
    │&nbsp;&nbsp; ├── <span class="hljs-selector-tag">header</span>
    │&nbsp;&nbsp; ├── ratings
    │&nbsp;&nbsp; └── seller
└── main<span class="hljs-selector-class">.js</span>

└── static</code></pre>
<ol>
<li>
<p>基于组件化设计</p>
<ol><li><p>一个模块组件一个目录,这样方便理解和整理代码</p></li></ol>
</li>
<li>
<p>创建公共目录common放公共的模块和资源,例如js css stylus和fonts</p>
<ol>
<li><p>从icomoon里面处理之后的图标字体会有2个东西,一个是fonts目录,一个是styel.css文件</p></li>
<li><p>将styel.css改名为icon.styl,然后去掉里面的分号和大括号来改为stylus的语法的文件</p></li>
<li><p>然后放到stylus目录里面去</p></li>
</ol>
</li>
</ol>
<blockquote><p>课程使用的stylus的</p></blockquote>
<h2 id="articleHeader3">mock数据模拟</h2>
<p>mock就是做假数据,这样可以便于前后端分离开发,前端不需要等后端做好数据来开发或者测试验证</p>
<h3 id="articleHeader4">准备一个测试数据源</h3>
<p>data.json是课程提供的<a href="https://github.com/ustbhuangyi/vue-sell/blob/master/data.json" rel="nofollow noreferrer" target="_blank">https://github.com/ustbhuangyi/vue-sell/blob/master/data.json</a></p>
<blockquote><p>需要结合设计图和设计来一起看</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/bVNkqg?w=752&amp;h=569" src="https://static.alili.tech/img/bVNkqg?w=752&amp;h=569" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>大致的数据结构如下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;seller&quot;:{......},
    &quot;goods&quot;:{.....},
    &quot;ratings&quot;:{.....}
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">{
    <span class="hljs-string">"seller"</span>:{......},
    <span class="hljs-string">"goods"</span>:{.....},
    <span class="hljs-string">"ratings"</span>:{.....}
}</code></pre>
<p>ress来做模拟数据访问的服务器</p>
<p>在vue-cli里面,node安装好了express</p>
<p>在<code>/sell/build/dev-server.js</code>文件里面编辑</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//截取的部分,其他部分略
var app = express() //在实例化express的后面开始编写测试数据的相关策略

var appData = require('../data.json'); // 引入测试数据
var seller = appData.seller; 
var goods = appData.goods;
var ratings = appData.ratings;

var apiRoutes = express.Router();// 生成express的路由实例

//这里的意思是访问一个/seller链接,然后返回数据
apiRoutes.get('/seller',function (req,res) { // express的路由实例写法
  res.json({ // 返回的是json数据,并且这里是res参数是代表response
    errno:0, //设计返回的json数据的结构
    data:seller
  })
});

apiRoutes.get('/goods',function (req,res) {
  res.json({
    errno:0,
    data:goods
  })
});

apiRoutes.get('/ratings',function (req,res) {
  res.json({
    errno:0,
    data:ratings
  })
});

app.use('/api',apiRoutes); // 调用apiRoutes

var compiler = webpack(webpackConfig)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//截取的部分,其他部分略</span>
<span class="hljs-keyword">var</span> app = express() <span class="hljs-comment">//在实例化express的后面开始编写测试数据的相关策略</span>

<span class="hljs-keyword">var</span> appData = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../data.json'</span>); <span class="hljs-comment">// 引入测试数据</span>
<span class="hljs-keyword">var</span> seller = appData.seller; 
<span class="hljs-keyword">var</span> goods = appData.goods;
<span class="hljs-keyword">var</span> ratings = appData.ratings;

<span class="hljs-keyword">var</span> apiRoutes = express.Router();<span class="hljs-comment">// 生成express的路由实例</span>

<span class="hljs-comment">//这里的意思是访问一个/seller链接,然后返回数据</span>
apiRoutes.get(<span class="hljs-string">'/seller'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">req,res</span>) </span>{ <span class="hljs-comment">// express的路由实例写法</span>
  res.json({ <span class="hljs-comment">// 返回的是json数据,并且这里是res参数是代表response</span>
    errno:<span class="hljs-number">0</span>, <span class="hljs-comment">//设计返回的json数据的结构</span>
    data:seller
  })
});

apiRoutes.get(<span class="hljs-string">'/goods'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">req,res</span>) </span>{
  res.json({
    <span class="hljs-attr">errno</span>:<span class="hljs-number">0</span>,
    <span class="hljs-attr">data</span>:goods
  })
});

apiRoutes.get(<span class="hljs-string">'/ratings'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">req,res</span>) </span>{
  res.json({
    <span class="hljs-attr">errno</span>:<span class="hljs-number">0</span>,
    <span class="hljs-attr">data</span>:ratings
  })
});

app.use(<span class="hljs-string">'/api'</span>,apiRoutes); <span class="hljs-comment">// 调用apiRoutes</span>

<span class="hljs-keyword">var</span> compiler = webpack(webpackConfig)
</code></pre>
<h3 id="articleHeader5">重启dev server</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm dev run" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code class="shell" style="word-break: break-word; white-space: initial;">npm dev <span class="hljs-keyword">run</span></code><span class="bash"></span></pre>
<p>然后访问/seller或者/goods 或者/ratings就能看到数据了,类似做了一个api接口服务器</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
项目资源和目录设计和mock模拟数据

## 原文链接
[https://segmentfault.com/a/1190000009334240](https://segmentfault.com/a/1190000009334240)

