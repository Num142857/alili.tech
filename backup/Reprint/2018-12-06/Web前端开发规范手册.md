---
title: 'Web前端开发规范手册' 
date: 2018-12-06 2:30:09
hidden: true
slug: 53sdix3stzc
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">规范目的</h3>
<ul><li>为提高团队协作效率, 便于后台人员添加功能及前端后期优化维护, 输出高质量的文档, 特制订此文档。</li></ul>
<hr>
<h3 id="articleHeader1">文件规范</h3>
<h4>文件命名规则</h4>
<blockquote>文件名称统一用小写的英文字母、数字和下划线的组合，其中不得包含汉字、空格和特殊字符；命名原则的指导思想一是使得你自己和工作组的每一个成员能够方便的理解每一个文件的意义，二是当我们在文件夹中使用“按名称排例”的命令时，同一种大类的文件能够排列在一起，以便我们查找、修改、替换、计算负载量等等操作。</blockquote>
<ul><li>HTML的命名原则</li></ul>
<p>主页统一使用<code>index.htm</code>、<code>index.html</code>或<code>index.asp</code>文件名（小写）<br>各子页命名的原则首先应该以栏目名的英语翻译取单一单词为名称。例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="关于我们 --> aboutus 
信息反馈 --> feedback 
产品 --> product" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code>关于我们 <span class="hljs-comment">--&gt; aboutus </span>
信息反馈 <span class="hljs-comment">--&gt; feedback </span>
产品 <span class="hljs-comment">--&gt; product</span></code></pre>
<p>如果栏目名称多而复杂并不好以英文单词命名，则统一使用该栏目名称拼音或拼音的首字母表示；<br>每一个目录中应该包含一个缺省的html 文件，文件名统一用<code>index.htm</code>、<code>index.html</code>或<code>index.asp</code>；</p>
<ul><li>图片的命名原则</li></ul>
<p>图片的名称分为头尾两部分，用下划线隔开，头部分表示此图片的大类性质<br>例如：广告、标志、菜单、按钮等等。<br>放置在页面顶部的广告、装饰图案等长方形的图片取名： <code>banner</code><br>标志性的图片取名为： <code>logo</code><br>在页面上位置不固定并且带有链接的小图片我们取名为 <code>button</code> <br>在页面上某一个位置连续出现，性质相同的链接栏目的图片我们取名： <code>menu</code> <br>装饰用的照片我们取名： <code>pic</code><br>不带链接表示标题的图片我们取名： <code>title</code> <br>范例：<code>banner_sohu.png</code>、<code>banner_sina.png</code>、<code>menu_aboutus.png</code>、<code>menu_job.png</code>、<code>title_news.png</code>、<code>logo_police.png</code>、<code>  logo_national.png</code>、<code>pic_people.png</code><br>鼠标感应效果图片命名规范为<code>"图片名+_+on/off"</code>。<br>例如：<code>menu1_on.png</code>、<code>menu1_off.png</code></p>
<ul><li>javascript的命名原则</li></ul>
<p>例如：广告条的javascript文件名为 <code>ad.js</code>  弹出窗口的javascript文件名为 <code>pop.js</code></p>
<ul><li>动态语言文件命名原则</li></ul>
<p>以性质_描述，描述可以有多个单词，用“_”隔开，性质一般是该页面得概要。<br>范例：<code>register_form.asp</code>、<code>register_post.asp</code>、<code>topic_lock.asp</code></p>
<h4>文件存放位置规范</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    //项目目录(都不是必须存在的目录)
    cn    存放中文HTML文件
    en    存放英文HTML文件
    flash    存放Flash文件
    images    存放图片文件
    imagestudio    存放PSD源文件
    flashstudio    存放flash源文件
    inc    存放include文件
    library    存放库文件
    media    存放多媒体文件
    project    存放工程项目资料
    temp    存放客户原始资料
    js    存放JavaScript脚本
    css    存放CSS文件" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gradle"><code>    <span class="hljs-comment">//项目目录(都不是必须存在的目录)</span>
    cn    存放中文HTML文件
    en    存放英文HTML文件
    flash    存放Flash文件
    images    存放图片文件
    imagestudio    存放PSD源文件
    flashstudio    存放flash源文件
    inc    存放<span class="hljs-keyword">include</span>文件
    library    存放库文件
    media    存放多媒体文件
    <span class="hljs-keyword">project</span>    存放工程项目资料
    temp    存放客户原始资料
    js    存放JavaScript脚本
    css    存放CSS文件</code></pre>
<h4>CSS书写规范</h4>
<p>基本原则：</p>
<p>CSS样式可细分为3类：<code>自定义样式</code>、<code>重新定义HTML样式</code>、<code>链接状态样式</code>。</p>
<ol>
<li>
<code>自定义样式</code>为设计师自定义的新CSS样式，影响被使用本样式的区域，用于完成网页中局部的样式设定。样式名为<code>“.”+“相应样式效果描述的单词或缩写”</code>，例：<code> .shadow</code>，文字样式样式名为<code>“.word”+“字号”+“行距”+“颜色缩写”</code>，例：<code>.word12</code>、<code>.word12-24</code>、<code>.word12-24-red</code>
</li>
<li>
<code>重新定义HTML样式</code>为设计师重新定义已有的HTML标签样式，影响全部的被设定标签样式，用于统一网页中某一标签的样式定义。样式名为<code>HTML标签</code>，例：<code>hr { border: 1px dotted #333333 }</code>
</li>
<li>
<code>链接状态样式</code>为设计师对链接不同状态设定特殊样式，影响被使用本样式区域中的链接，该样式写法有2种：<code>a.nav:link</code>、<code>nav.a:link</code>，第一种<code>只能修饰&lt;a&gt;</code>标签中；第二种可以修饰<code>所有包含有&lt;a&gt;标签</code>的其他标签。</li>
</ol>
<blockquote>页面内的样式加载必须用链接方式<code>&lt;link rel="stylesheet" type="text/css" href="xxx/xxx.css"&gt;</code>
</blockquote>
<p>注意细则：</p>
<ol>
<li>协作开发及分工: <code>Me(前端负责人，主开发人员，以下简称Me)</code>会根据各个模块, 同时根据页面相似程序, 事先写好大体框架文件, 分配给前端人员实现内部<code>结构</code>、<code>表现</code>、<code>行为</code>; 共用css文件<code>base.css</code>由<code>Me</code>书写, 协作开发过程中, 每个页面请务必都要引入, 此文件包含reset及头部底部样式, 此文件不可随意修改;</li>
<li>class与id的使用: id是唯一的并是父级的, class是可以重复的并是子级的, 所以id仅使用在大的模块上, class可用在重复使用率高及子级中; id原则上都是由<code>Me</code>分发框架文件时命名的, 为JavaScript预留钩子的除外;</li>
<li>为JavaScript预留钩子的命名, 请以<code>js_</code>起始, 比如:<code>js_hide</code>、<code>js_show</code>;</li>
<li>class与id命名: 大的框架命名比如header/footer/wrapper/left/right之类的在 <strong>2</strong> 中由<code>Me</code>统一命名.其他样式名称由 <code>小写英文</code>、<code>数字</code>、<code>_</code>来组合命名(<strong>不能以数字开头</strong>), 如<code>i_comment</code>, <code>fontred</code>, <code>width200</code>; 避免使用中文拼音, 尽量使用简易的单词组合; 总之, 命名要语义化, 简明化.</li>
<li>
<p>规避class与id命名(此条重要, 请及时与<code>Me</code>沟通):  <br>a、 通过从属写法规避, 示例见d; <br>b、 取父级元素id/class命名部分命名, 示例见d; <br>c、 重复使用率高的命名, 请以自己代号加下划线起始, 比如<code>Me_clear</code>; <br>d、 a,b两条, 适用于在 <strong>2</strong> 中已建好框架的页面, 如, 要在 <strong>2</strong> 中已建好框架的页面代码<code>&lt;div id="mainnav"&gt;&lt;/div&gt;</code>中加入新的div元素:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//按a命名法则
<div id=&quot;mainnav&quot;><div class=&quot;firstnav&quot;>...</div></div>
//样式写法
#mainnav  .firstnav{.......}
//按b命名法则
<div id=&quot;mainnav&quot;><div class=&quot;main_firstnav&quot;>...</div></div> 
//样式写法
.main_firstnav{.......}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nimrod"><code>//按a命名法则
&lt;<span class="hljs-keyword">div</span> id=<span class="hljs-string">"mainnav"</span>&gt;&lt;<span class="hljs-keyword">div</span> class=<span class="hljs-string">"firstnav"</span>&gt;...&lt;/<span class="hljs-keyword">div</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
//样式写法
<span class="hljs-comment">#mainnav  .firstnav{.......}</span>
//按b命名法则
&lt;<span class="hljs-keyword">div</span> id=<span class="hljs-string">"mainnav"</span>&gt;&lt;<span class="hljs-keyword">div</span> class=<span class="hljs-string">"main_firstnav"</span>&gt;...&lt;/<span class="hljs-keyword">div</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt; 
//样式写法
.main_firstnav<span class="hljs-meta">{.......}</span></code></pre>
</li>
<li>css属性书写顺序, 建议遵循<code>布局定位属性</code>--&gt;<code>自身属性</code>--&gt;<code>文本属性</code>--&gt;<code>其他属性</code>. 此条可根据自身习惯书写, 但尽量保证同类属性写在一起. 属性列举: 布局定位属性主要包括: <code>margin</code>、<code>padding</code>、<code>float（包括clear）</code>、<code>position（相应的 top,right,bottom,left）</code>、<code>display</code>、<code>visibility</code>、<code>overflow</code>等；自身属性主要包括: <code>width</code>、<code>height</code>、<code>background</code>、<code>border</code>; 文本属性主要包括：<code>font</code>、<code>color</code>、<code>text-align</code>、<code>text-decoration</code>、<code>text-indent</code>等；其他属性包括: <code>list-style(列表样式)</code>、<code>vertical-align</code>、<code>cursor</code>、<code>z-index(层叠顺序)</code> 、<code>zoom</code>等，所列出的这些属性只是最常用到的, 并不代表全部;</li>
<li>书写代码前, 考虑并提高样式重复使用率;</li>
<li>充分利用html自身属性及样式继承原理减少代码量, 比如:<code>&lt;ul class="list"&gt;&lt;li&gt;这儿是标题列表&lt;span&gt;2010-09-15&lt;/span&gt;&lt;/ul&gt;</code>，定义<code>ul.list li{position:relative}  ul.list li span{position:absolute; right:0}</code>，即可实现日期居右显示。</li>
<li>样式表中中文字体名, 请务必转码成<code>unicode</code>码, 以避免编码错误时乱码;</li>
<li>背景图片请尽可能使用<code>sprite技术</code>, <code>减小http请求</code>, 考虑到多人协作开发, <code>sprite</code>按<code>模块</code>制作;</li>
<li>使用<code>table标签</code>时(尽量<code>避免使用table标签</code>), 请不要用<code>width/height/cellspacing/cellpadding</code>等<code>table属性</code>直接定义表现, 应尽可能的利用<code>table自身私有属性</code>分离结构与表现, 如<code>thead,tr,th,td,tbody,tfoot,colgroup,scope</code>; (<code>cellspaing</code>及<code>cellpadding</code>的css控制方法: <code>table{border:0;margin:0;border-collapse:collapse;} table th, table td{padding:0;}</code>, 一般<code>base.css</code>文件中<code>Me</code>会初始化表格样式)</li>
<li>用png图片做图片时, 要求图片格式为<code>png-8</code>格式,若png-8实在影响图片质量或其中有半透明效果, 请为<code>ie6</code>单独定义背景:<code>background:none;_filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=crop, src=’img/bg.png’)</code>;</li>
<li>避免<code>兼容性属性</code>的使用, 比如<code>text-shadow</code>、<code>css3</code>的相关属性;</li>
<li>减少使用影响性能的属性, 比如<code>position:absolute</code>、<code>float</code>;</li>
<li>必须为大区块样式<code>添加注释</code>, 小区块适量注释;</li>
<li>代码缩进与格式: 建议单行书写, 可根据自身习惯, 后期优化<code>Me</code>会统一处理;</li>
</ol>
<h4>命名规则:</h4>
<p>头：<code>header</code><br>  内容：<code>content/container</code><br>  尾：<code>footer</code><br>  导航：<code>nav</code><br>  侧栏：<code>sidebar</code><br>  栏目：<code>column</code><br>  页面外围控制整体布局宽度：<code>wrapper</code><br>  左右中：<code>left</code> <code>right</code> <code>center</code><br>  登录条：<code>loginbar</code><br>  标志：<code>logo</code><br>  广告：<code>banner</code><br>  页面主体：<code>main</code><br>  热点：<code>hot</code><br>  新闻：<code>news</code><br>  下载：<code>download</code><br>  子导航：<code>subnav</code><br>  菜单：<code>menu</code><br>  子菜单：<code>submenu</code><br>  搜索：<code>search</code><br>  友情链接：<code>friendlink</code><br>  页脚：<code>footer</code><br>  版权：<code>copyright</code><br>  滚动：<code>scroll</code><br>  内容：<code>content</code><br>  标签页：<code>tab</code><br>  文章列表：<code>list</code><br>  提示信息：<code>msg</code><br>  小技巧：<code>tips</code><br>  栏目标题：<code>title</code><br>  加入：<code>joinus</code><br>  指南：<code>guild</code><br>  服务：<code>service</code><br>  注册：<code>regsiter</code><br>  状态：<code>status</code><br>  投票：<code>vote</code><br>  合作伙伴：<code>partner</code></p>
<hr>
<h4>注释的写法:</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  /* Footer */
  内容区
  /* End Footer */" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>  <span class="hljs-comment">/* Footer */</span>
  内容区
  <span class="hljs-comment">/* End Footer */</span></code></pre>
<hr>
<h4>
<strong>id</strong>的命名:</h4>
<ul>
<li>页面结构<br>容器: <code>container</code><br>页头：<code>header</code><br>内容：<code>content</code> <code>container</code><br>页面主体：<code>main</code><br>页尾：<code>footer</code><br>导航：<code>nav</code><br>侧栏：<code>sidebar</code><br>栏目：<code>column</code><br>页面外围控制整体布局宽度：<code>wrapper</code><br>左右中：<code>left</code> <code>right</code> <code>center</code>
</li>
<li>导航<br>导航：<code>nav</code><br>主导航：<code>mainbav</code><br>子导航：<code>subnav</code><br>顶导航：<code>topnav</code><br>边导航：<code>sidebar</code><br>左导航：<code>leftsidebar</code><br>右导航：<code>rightsidebar</code><br>菜单：<code>menu</code><br>子菜单：<code>submenu</code><br>标题: <code>title</code><br>摘要: <code>summary</code>
</li>
<li>功能<br>标志：<code>logo</code><br>广告：<code>banner</code><br>登陆：<code>login</code><br>登录条：<code>loginbar</code><br>注册：<code>regsiter</code><br>搜索：<code>search</code><br>功能区：<code>shop</code><br>标题：<code>title</code><br>加入：<code>joinus</code><br>状态：<code>status</code><br>按钮：<code>btn</code><br>滚动：<code>scroll</code><br>标签页：<code>tab</code><br>文章列表：<code>list</code><br>提示信息：<code>msg</code><br>当前的: <code>current</code><br>小技巧：<code>tips</code><br>图标: <code>icon</code><br>注释：<code>note</code><br>指南：<code>guild</code><br>服务：<code>service</code><br>热点：<code>hot</code><br>新闻：<code>news</code><br>下载：<code>download</code><br>投票：<code>vote</code><br>合作伙伴：<code>partner</code><br>友情链接：<code>link</code><br>版权：<code>copyright</code>
</li>
</ul>
<hr>
<h4>基本样式：</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* CSS Document */
body {margin:0; padding:0; font:12px &quot;\5B8B\4F53&quot;,san-serif;background:#fff;}
div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,pre,form,fieldset,input,textarea,blockquote,p{padding:0; margin:0;}   
table,td,tr,th{font-size:12px;}
li{list-style-type:none;}
img{vertical-align:top;border:0;}
ol,ul {list-style:none;}
h1,h2,h3,h4,h5,h6 {font-size:12px; font-weight:normal;}
address,cite,code,em,th {font-weight:normal; font-style:normal;}
.fB{font-weight:bold;}
.f12px{font-size:12px;}
.f14px{font-size:14px;}
.left{float:left;}
.right{float:right;}
a {color:#2b2b2b; text-decoration:none;}
a:visited {text-decoration:none;}
a:hover {color:#ba2636;text-decoration:underline;}
a:active {color:#ba2636;}

//重定义的最先，伪类其次，自定义最后，便于自己和他人阅读！" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-comment">/* CSS Document */</span>
<span class="hljs-selector-tag">body</span> {<span class="hljs-attribute">margin</span>:<span class="hljs-number">0</span>; <span class="hljs-attribute">padding</span>:<span class="hljs-number">0</span>; <span class="hljs-attribute">font</span>:<span class="hljs-number">12px</span> <span class="hljs-string">"\5B8B\4F53"</span>,san-serif;<span class="hljs-attribute">background</span>:<span class="hljs-number">#fff</span>;}
<span class="hljs-selector-tag">div</span>,<span class="hljs-selector-tag">dl</span>,<span class="hljs-selector-tag">dt</span>,<span class="hljs-selector-tag">dd</span>,<span class="hljs-selector-tag">ul</span>,<span class="hljs-selector-tag">ol</span>,<span class="hljs-selector-tag">li</span>,<span class="hljs-selector-tag">h1</span>,<span class="hljs-selector-tag">h2</span>,<span class="hljs-selector-tag">h3</span>,<span class="hljs-selector-tag">h4</span>,<span class="hljs-selector-tag">h5</span>,<span class="hljs-selector-tag">h6</span>,pre,<span class="hljs-selector-tag">form</span>,<span class="hljs-selector-tag">fieldset</span>,<span class="hljs-selector-tag">input</span>,<span class="hljs-selector-tag">textarea</span>,<span class="hljs-selector-tag">blockquote</span>,p{<span class="hljs-attribute">padding</span>:<span class="hljs-number">0</span>; <span class="hljs-attribute">margin</span>:<span class="hljs-number">0</span>;}   
<span class="hljs-selector-tag">table</span>,<span class="hljs-selector-tag">td</span>,<span class="hljs-selector-tag">tr</span>,th{<span class="hljs-attribute">font-size</span>:<span class="hljs-number">12px</span>;}
li{<span class="hljs-attribute">list-style-type</span>:none;}
img{<span class="hljs-attribute">vertical-align</span>:top;<span class="hljs-attribute">border</span>:<span class="hljs-number">0</span>;}
<span class="hljs-selector-tag">ol</span>,<span class="hljs-selector-tag">ul</span> {<span class="hljs-attribute">list-style</span>:none;}
<span class="hljs-selector-tag">h1</span>,<span class="hljs-selector-tag">h2</span>,<span class="hljs-selector-tag">h3</span>,<span class="hljs-selector-tag">h4</span>,<span class="hljs-selector-tag">h5</span>,<span class="hljs-selector-tag">h6</span> {<span class="hljs-attribute">font-size</span>:<span class="hljs-number">12px</span>; <span class="hljs-attribute">font-weight</span>:normal;}
<span class="hljs-selector-tag">address</span>,<span class="hljs-selector-tag">cite</span>,<span class="hljs-selector-tag">code</span>,<span class="hljs-selector-tag">em</span>,<span class="hljs-selector-tag">th</span> {<span class="hljs-attribute">font-weight</span>:normal; <span class="hljs-attribute">font-style</span>:normal;}
.fB{<span class="hljs-attribute">font-weight</span>:bold;}
.f12px{<span class="hljs-attribute">font-size</span>:<span class="hljs-number">12px</span>;}
.f14px{<span class="hljs-attribute">font-size</span>:<span class="hljs-number">14px</span>;}
.<span class="hljs-attribute">left</span>{float:left;}
.<span class="hljs-attribute">right</span>{float:right;}
<span class="hljs-selector-tag">a</span> {<span class="hljs-attribute">color</span>:<span class="hljs-number">#2b2b2b</span>; <span class="hljs-attribute">text-decoration</span>:none;}
<span class="hljs-selector-tag">a</span>:visited {<span class="hljs-attribute">text-decoration</span>:none;}
<span class="hljs-selector-tag">a</span>:hover {<span class="hljs-attribute">color</span>:<span class="hljs-number">#ba2636</span>;<span class="hljs-attribute">text-decoration</span>:underline;}
<span class="hljs-selector-tag">a</span>:active {<span class="hljs-attribute">color</span>:<span class="hljs-number">#ba2636</span>;}

<span class="hljs-comment">//重定义的最先，伪类其次，自定义最后，便于自己和他人阅读！</span></code></pre>
<blockquote>中英文混排时，我们尽可能的将英文和数字定义为<code>verdana</code>&nbsp;和 <code>arial</code>&nbsp;两种字体。</blockquote>
<hr>
<h4>HTML书写规范</h4>
<h5>网页制作细节</h5>
<h6>head区代码规范</h6>
<blockquote>head区是指HTML代码的&lt;head&gt;和&lt;/head&gt;之间的内容。</blockquote>
<p><strong>必须加入的标签:</strong></p>
<ul>
<li>公司版权注释  <code>&lt;!--- The site is designed by xxx 04/2018 ---&gt;</code>
</li>
<li>
<p>网页显示字符集</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="简体中文：<META HTTP-EQUIV=&quot;Content-Type&quot; CONTENT=&quot;text/html; charset=gb2312&quot;>
繁体中文：<META HTTP-EQUIV=&quot;Content-Type&quot; CONTENT=&quot;text/html; charset=utf-8&quot;>
英 语：<META HTTP-EQUIV=&quot;Content-Type&quot; CONTENT=&quot;text/html; charset=utf-8&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>简体中文：<span class="hljs-tag">&lt;<span class="hljs-name">META</span> <span class="hljs-attr">HTTP-EQUIV</span>=<span class="hljs-string">"Content-Type"</span> <span class="hljs-attr">CONTENT</span>=<span class="hljs-string">"text/html; charset=gb2312"</span>&gt;</span>
繁体中文：<span class="hljs-tag">&lt;<span class="hljs-name">META</span> <span class="hljs-attr">HTTP-EQUIV</span>=<span class="hljs-string">"Content-Type"</span> <span class="hljs-attr">CONTENT</span>=<span class="hljs-string">"text/html; charset=utf-8"</span>&gt;</span>
英 语：<span class="hljs-tag">&lt;<span class="hljs-name">META</span> <span class="hljs-attr">HTTP-EQUIV</span>=<span class="hljs-string">"Content-Type"</span> <span class="hljs-attr">CONTENT</span>=<span class="hljs-string">"text/html; charset=utf-8"</span>&gt;</span></code></pre>
</li>
<li>网页制作者信息  <code>&lt;META name="author" content="luozz@cmgos.com"&gt;</code>
</li>
<li>网站简介  <code>&lt;META NAME="DESCRIPTION" CONTENT="xxxxxxxxxxxxxxxxxxxxxxxxxx"&gt;</code>
</li>
<li>搜索关键字  <code>&lt;META NAME="keywords" CONTENT="xxxx,xxxx,xxx,xxxxx,xxxx,"&gt;</code>
</li>
<li>网页的css规范  <code>&lt;LINK href="xxx/xxx.css" rel="stylesheet" type="text/css"&gt;</code>
</li>
<li>网页标题  <code>&lt;title&gt;xxxxxxxxxxxxxxxxxx&lt;/title&gt;</code>
</li>
</ul>
<p><strong>可以选择加入的标签:</strong></p>
<ul>
<li>设定网页的到期时间。一旦网页过期，必须到服务器上重新调阅。 <code>&lt;META HTTP-EQUIV="expires" CONTENT="Wed, 26 Feb 1997 08：21：57 GMT"&gt;</code>
</li>
<li>禁止浏览器从本地机的缓存中调阅页面内容。 <code>&lt;META HTTP-EQUIV="Pragma" CONTENT="no-cache"&gt;</code>
</li>
<li>用来防止别人在框架里调用你的页面。<code>&lt;META HTTP-EQUIV="Window-target" CONTENT="_top"&gt;</code>
</li>
<li>自动跳转。<code>&lt;META HTTP-EQUIV="Refresh" CONTENT="5;URL=http://www.keyup.top"&gt;5指时间停留5秒</code>
</li>
<li>网页搜索机器人向导。用来告诉搜索机器人哪些页面需要索引，哪些页面不需要索引。<code>&lt;META NAME="robots" CONTENT="none"&gt; CONTENT的参数有all,none,index,noindex,follow,nofollow。默认是all。</code>
</li>
<li>收藏夹图标  <code>&lt;link rel = "Shortcut Icon" href="favicon.ico"&gt;</code>
</li>
<li>所有的javascript的调用尽量采取外部调用. <code>&lt;SCRIPT LANGUAGE="JavaScript" SRC="script/xxxxx.js"&gt;&lt;/SCRIPT&gt;</code>
</li>
<li>附<code>&lt;body&gt;标签</code>： <code>&lt;body&gt;标签</code>不属于head区，这里强调一下，为了保证浏览器的兼容性，必须设置页面背景<code>&lt;body bgcolor="#FFFFFF"&gt;</code>
</li>
</ul>
<h6>字体</h6>
<ul>
<li>在设定字体样式时对于文字字号样式和行间距应必须使用CSS样式表。<code>禁止</code>在页面中出现 <code>&lt;font size=?&gt;</code> 标记。</li>
<li>在网页中中文应首选使用宋体。英文和数字首选使用verdana&nbsp;和arial&nbsp;两种字体。一般使用中文宋体的9pt&nbsp;和11pt 或12px&nbsp;和14.7px&nbsp;这是经过优化的字号，黑体字或者宋体字加粗时，一般选用11pt&nbsp;和14.7px&nbsp;的字号比较合适。</li>
<li>为了最大程度的发挥浏览器自动排版的功能，在一段完整的文字中请尽量不要使用<code>&lt;br&gt;</code>来人工干预分段。</li>
<li>不同语种的文字之间应该有一个半角空格，但避头的符号之前和避尾的符号之后除外，汉字之间的标点要用全角标点，英文字母和数字周围的括号应该使用半角括号。</li>
<li>请不要在网页中连续出现多于一个的<code>空格</code>，也尽量少使用<code>全角空格</code>（英文字符集下，全角空格会变成乱码），空白应该尽量使用<code>text-indent</code>, <code>padding</code>, <code>margin</code>, <code>hspace</code>, <code>vspace</code> 以及透明的<code>gif</code>图片来实现。</li>
<li>行距建议用百分比来定义，常用的两个行距的值是<code>line-height:120%</code> <code>line-height:150%</code>。</li>
<li>排版中我们经常会遇到需要进行首行缩进的处理，不要使用<code>空格</code>或者<code>全角空格</code>来达到效果，规范的做法是在样式表中定义 <code>p { text-indent: 2em; }</code> 然后给每一段加上 &lt;p&gt; 标记，注意，一般情况下，请不要省略 &lt;/p&gt; 结束标记 。</li>
</ul>
<h6>链接</h6>
<ul>
<li>网站中的链接路径全部采用相对路径，一般链接到某一目录下的缺省文件的链接路径不必写全名，如我们不必这样：<code>&lt;a href=”aboutus/index.htm”&gt;</code> 而应该这样：<code>&lt;a href=”aboutus/”&gt;</code>，所有内页指向首页的链接写成<code>&lt;a href=”/”&gt;</code>
</li>
<li>在浏览器里，当我们点击空链接时，它会自动将当前页面重置到首端，从而影响用户正常的阅读内容，我们用代码<code>javascript:void(null)</code>代替原来的“#”标记</li>
</ul>
<h6>表格</h6>
<p><code>1px</code>表格<code>style="border-collapse: collapse"</code><br>实例如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<table border=&quot;1&quot; cellspacing=&quot;0&quot; width=&quot;32&quot; height=&quot;32&quot; style=&quot;border-collapse: collapse&quot;
bordercolor=&quot;#000000&quot; cellpadding=&quot;0&quot;> 
<tr> 
<td></td>
</tr>
</table>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">table</span> <span class="hljs-attr">border</span>=<span class="hljs-string">"1"</span> <span class="hljs-attr">cellspacing</span>=<span class="hljs-string">"0"</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"32"</span> <span class="hljs-attr">height</span>=<span class="hljs-string">"32"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"border-collapse: collapse"</span>
<span class="hljs-attr">bordercolor</span>=<span class="hljs-string">"#000000"</span> <span class="hljs-attr">cellpadding</span>=<span class="hljs-string">"0"</span>&gt;</span> 
<span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span> 
<span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">table</span>&gt;</span></code></pre>
<p>设置亮、暗边框颜色<br>表格有<code>亮边框（bordercolorlight）</code>和<code>暗边框（bordercolordark）</code>两个属性可以对表格样式设置。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<table border=&quot;1&quot; width=&quot;500&quot; bordercolorlight=&quot;#000000&quot; bordercolordark=&quot;#FFFFFF&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">&lt;<span class="hljs-selector-tag">table</span> <span class="hljs-attribute">border</span>=<span class="hljs-string">"1"</span> width=<span class="hljs-string">"500"</span> bordercolorlight=<span class="hljs-string">"#000000"</span> bordercolordark=<span class="hljs-string">"#FFFFFF"</span>&gt;</code></pre>
<p>在写 &lt;table&gt; 互相嵌套时，严格按照的规范，对于单独的一个&lt;table&gt;来说，&lt;table&gt;&lt;tr&gt;对齐，&lt;td&gt; 缩进两个半角空格，&lt;td&gt; 中如果还有嵌套的表格，&lt;table&gt;也缩进两个半角空格，如果&lt;td&gt;中没有任何嵌套的表格，&lt;/td&gt; 结束标记应该与 &lt;td&gt; 处于同一行，不要换行，<br>如我们注意在源代码中不应有这样的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<td><img src=”../images/sample.gif”>
</td>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">”../images/sample.gif”</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span></code></pre>
<p>而应该是这样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<td><img src=”../images/sample.gif”></td>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">”../images/sample.gif”</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span></code></pre>
<p>这是因为浏览器认为换行相当于一个半角空格，以上不规范的写法相当于无意中增加一个半角空格，如果确实有必要增加一个半角空格，也应该这样写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<td><img src=”../images/sample.gif”> </td>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">”../images/sample.gif”</span>&gt;</span> <span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span></code></pre>
<p>一个网页要尽量避免用整个一张大表格，所有的内容都嵌套在这个大表格之内，因为浏览器在解释页面的元素时，是以表格为单位逐一显示，如果一张网页是嵌套在一个大表格之内，那么很可能造成的后果就是，当浏览者敲入网址，他要先面对一片空白很长时间，然后所有的网页内容同时出现。如果必须这样做，请使用 <code>&lt;tbody&gt;</code>标记，以便能够使这个大表格分块显示</p>
<h6>下载速度</h6>
<blockquote>首页Flash 网页大小应限定在 <code>200K以下</code>，尽可能的使用矢量图形和Action来减小动画大小。非首页静态页面含图片大小应限定在70K左右，尽可能的使用背景颜色替换大块同色图片。</blockquote>
<h6>include</h6>
<p><code>asp</code>标准写法 <code>&lt;!--#include file="inc/index_top.asp" --&gt;</code><br><code>jsp</code>标准写法 <code>&lt;%@ include file="../inc/index_top.jsp" %&gt;</code></p>
<h6>Alt和Title</h6>
<p>都是提示性语言标签，请注意它们之间的区别。 <br>在我们浏览网页时，当鼠标停留在图片对象或文字链接上时，在鼠标的右下角有时会出现一个提示信息框。对目标进行一定的注释说明。在一些场合，它的作用是很重要的。 <br><code>alt</code>用来给<code>图片</code>来提示的。<code>title</code>用来给<code>链接文字</code>或<code>普通文字</code>提示的。 <br>用法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<p Title=&quot;给链接文字提示&quot;>文字</p> 
<a href=&quot;#&quot; Title=&quot;给链接文字提示&quot;>文字</a> 
<img src=&quot;图片.gif&quot; alt=&quot;给图片提示&quot;> " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>&lt;<span class="hljs-selector-tag">p</span> Title=<span class="hljs-string">"给链接文字提示"</span>&gt;文字&lt;/p&gt; 
&lt;<span class="hljs-selector-tag">a</span> href=<span class="hljs-string">"#"</span> Title=<span class="hljs-string">"给链接文字提示"</span>&gt;文字&lt;/a&gt; 
&lt;<span class="hljs-selector-tag">img</span> src=<span class="hljs-string">"图片.gif"</span> alt=<span class="hljs-string">"给图片提示"</span>&gt; </code></pre>
<h6>缓存</h6>
<p><em>HTM网页</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<META HTTP-EQUIV=&quot;pragma&quot; CONTENT=&quot;no-cache&quot;> 
<META HTTP-EQUIV=&quot;Cache-Control&quot; CONTENT=&quot;no-cache, must-revalidate&quot;> 
<META HTTP-EQUIV=&quot;expires&quot; CONTENT=&quot;0&quot;> " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">META</span> <span class="hljs-attr">HTTP-EQUIV</span>=<span class="hljs-string">"pragma"</span> <span class="hljs-attr">CONTENT</span>=<span class="hljs-string">"no-cache"</span>&gt;</span> 
<span class="hljs-tag">&lt;<span class="hljs-name">META</span> <span class="hljs-attr">HTTP-EQUIV</span>=<span class="hljs-string">"Cache-Control"</span> <span class="hljs-attr">CONTENT</span>=<span class="hljs-string">"no-cache, must-revalidate"</span>&gt;</span> 
<span class="hljs-tag">&lt;<span class="hljs-name">META</span> <span class="hljs-attr">HTTP-EQUIV</span>=<span class="hljs-string">"expires"</span> <span class="hljs-attr">CONTENT</span>=<span class="hljs-string">"0"</span>&gt;</span> </code></pre>
<p><em>ASP网页</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Response.Expires = -1 
Response.ExpiresAbsolute = Now() - 1 
Response.cachecontrol = &quot;no-cache&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>Response<span class="hljs-selector-class">.Expires</span> = -<span class="hljs-number">1</span> 
Response<span class="hljs-selector-class">.ExpiresAbsolute</span> = Now() - <span class="hljs-number">1</span> 
Response<span class="hljs-selector-class">.cachecontrol</span> = <span class="hljs-string">"no-cache"</span></code></pre>
<h6>浏览器兼容性</h6>
<blockquote>创建站点时，应该明白访问者可能使用各种 Web 浏览器。在已知的其他设计限制下，尽可能将站点设计为具有最大的浏览器兼容性。<br>目前使用的 Web 浏览器有二十多种，大多数已发行了多个版本。即使您只针对使用 Netscape Navigator 和 Microsoft Internet Explorer 的大多数 Web 用户，但您应明确并不是每个人都在使用这两种浏览器的最新版本。<br>您的站点越复杂（在布局、动画、多媒体内容和交互方面），跨浏览器兼容的可能性就越小。例如，并非所有的浏览器都可以运行JavaScript。不使用特殊字符的纯文本页面或许能够在任何浏览器中正确显示，但比起有效地使用图形、布局和交互的页面，这样的页面在美感上可能要差得多。所以，应尽量在最佳效果设计和最大浏览器兼容性设计之间取得平衡。<br>所有的HTML 标签的属性都要用单引号或者双引号括起，即我们应该写<code>&lt;a href=”url”&gt; </code>而不是 <code>&lt;a href=url&gt;</code>.</blockquote>
<h6>banner</h6>
<blockquote>全尺寸banner为468X60px，半尺寸banner为234X60px，小banner为88X31px。<br>另外120X90，120X60也是小图标的标准尺寸。全尺寸banner不超过14K。<br>普遍的banner尺寸760X100，750X120，468X60，468X95，728X90，585X140<br>次级页的pip尺寸360X300，336X280<br>游标:100X100或120X120</blockquote>
<h6>LOGO的国际标准规范</h6>
<blockquote>为了便于INTERNET上信息的传播，一个统一的国际标准是需要的。实际上已经有了这样的一整套标准。其中关于网站的LOGO，目前有三种规格：<br><code>88*31</code> 这是互联网上最普遍的LOGO规格。<br><code>120*60</code> 这种规格用于一般大小的LOGO。<br><code>120*90</code> 这种规格用于大型LOGO。</blockquote>
<h6>页面修饰图片处理</h6>
<blockquote>图片经过优化以加快下载的速度,有较佳的视觉空间效果，用图要与页面风格、页面内容相符；制作精美，细节处理得当。</blockquote>
<hr>
<h4>JavaScript书写规范</h4>
<ol>
<li>书写过程中, 每行代码结束必须有分号; 原则上所有功能均根据XXX项目需求原生开发, 以避免网上down下来的代码造成的代码污染(沉冗代码 || 与现有代码冲突 || ...);</li>
<li>库引入: 原则上仅引入jQuery库, 若需引入第三方库, 须与团队其他人员讨论决定;</li>
<li>变量命名: 驼峰式命名. 原生JavaScript变量要求是纯英文字母, 首字母须小写, 如<code>iTaoLun</code>; jQuery变量要求首字符为<code>_</code>, 其他与原生JavaScript 规则相同, 如: <code>_iTaoLun</code>; 另, 要求变量集中声明, 避免全局变量.</li>
<li>类命名: 首字母大写, 驼峰式命名. 如 ITaoLun;</li>
<li>函数命名: 首字母小写驼峰式命名. 如iTaoLun();</li>
<li>命名语义化, 尽可能利用英文单词或其缩写;</li>
<li>尽量避免使用存在兼容性及消耗资源的方法或属性, 比如eval() &amp; innerText;</li>
<li>后期优化中, JavaScript非注释类中文字符须转换成unicode编码使用, 以避免编码错误时乱码显示;</li>
<li>代码结构明了, 加适量注释. 提高函数重用率;</li>
<li>注重与html分离, 减小reflow, 注重性能.</li>
</ol>
<hr>
<h4>图片规范</h4>
<ol>
<li>所有页面元素类图片均放入img文件夹, 测试用图片放于img/demoimg文件夹;</li>
<li>图片格式仅限于gif || png || jpg;</li>
<li>命名全部用小写英文字母 || 数字 || _ 的组合，其中不得包含汉字 || 空格 || 特殊字符；尽量用易懂的词汇, 便于团队其他成员理解; 另, 命名分头尾两部分, 用下划线隔开, 比如ad_left01.gif || btn_submit.gif;</li>
<li>在保证视觉效果的情况下选择最小的图片格式与图片质量, 以减少加载时间;</li>
<li>尽量避免使用半透明的png图片(若使用, 请参考css规范相关说明);</li>
<li>运用css <code>sprite技术</code>集中小的背景图或图标, 减小页面http请求, 但注意, 请务必在对应的<code>sprite psd源图</code>中划参考线, 并保存至img目录下.</li>
</ol>
<hr>
<h4>注释规范</h4>
<ol>
<li>html注释: 注释格式 <code>&lt;!--这儿是注释--&gt;,</code> '--'只能在注释的始末位置,不可置入注释文字区域;</li>
<li>css注释: 注释格式 <code>/*这儿是注释*/</code>;</li>
<li>JavaScript注释, 单行注释使用<code>//这儿是单行注释</code> ,多行注释使用<code> /* 这儿有多行注释 */</code>;</li>
</ol>
<hr>
<h4>浏览器兼容性 CSS hack</h4>
<p>一、标识区别：<br>区别IE6,IE7,IE8,FF。</p>
<ol>
<li>IE都能识别<code>*</code>; 标准浏览器(如FF)不能识别<code>*</code>；</li>
<li>IE6能识别<code>*</code>，但不能识别<code>!important</code>; IE6在样式前面加<code>_</code>
</li>
<li>IE7能识别<code>*</code>，也能识别<code>!important</code>;</li>
<li>IE8能识别<code>\9</code>， 例如：<code>background:red&nbsp;\9</code>;</li>
<li>firefox不能识别<code>*</code>，但能识别<code>!important</code>;</li>
</ol>
<blockquote>1．IE6和firefox的区别：<br><code>background:orange;*background:blue;</code><br>意思就是火狐浏览器的背景颜色是橙色,而IE浏览器的背景色是蓝色.</blockquote>
<blockquote>2.IE6和IE7的区别：<br><code>background:green !important;background:blue;</code><br>意思指的是:IE7的背景颜色是绿色,IE6的背景颜色是蓝色<p>3.IE7和FF的区别：<br><code>background:orange; *background:green;</code><br>意思指的是:火狐浏览器的背景颜色是橙色,而IE7的背景颜色是绿色</p>
<p>4.FF，IE7，IE6的区别：<br><code>background:orange;*background:green !important;*background:blue;</code><br>意思是火狐浏览器的的背景橙色,IE7浏览器的背景颜色是绿色,而IE6浏览器的颜色是蓝色.</p>
</blockquote>
<hr>
<p><strong>个人主页: <a href="https://www.keyup.top" rel="nofollow noreferrer" target="_blank">https://www.keyup.top</a></strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Web前端开发规范手册

## 原文链接
[https://segmentfault.com/a/1190000014317104](https://segmentfault.com/a/1190000014317104)

