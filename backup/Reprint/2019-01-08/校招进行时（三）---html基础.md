---
title: '校招进行时（三）---html基础' 
date: 2019-01-08 2:30:11
hidden: true
slug: cwd5a10i31k
categories: [reprint]
---

{{< raw >}}

                    
<p>这篇文章衔接<a href="http://teobler.cn/essay/20170716-interview-preparation-1.html" rel="nofollow noreferrer" target="_blank">上篇</a>，主要罗列一些前端面试中可能问到的html中最基本的问题。</p>
<p>(格式有点乱，内容有点水，罗列了一些基本用法，大家随便看看)</p>
<h1 id="articleHeader0">常用标签</h1>
<h2 id="articleHeader1">容器标签</h2>
<ul>
<li>
<p>div</p>
<p>div标签本身无特殊意义，作为一个块级容器，主要用于组合其他html元素常用于页面的布局。</p>
</li>
<li>
<p>span</p>
<p>span标签与div标签类似，本身无特殊意义，但它在结合诸如class,lang,或者dir属性时，可作为行内元素的容器。它起到描述（文档内容）的作用。</p>
</li>
</ul>
<h2 id="articleHeader2">文本标签</h2>
<ul>
<li>
<p>h1-h6</p>
<p>h标签用于设置网页标题或文章标题，为了符合语义化，尽量用h1作为整个网页或网站的标题，h2作下一级标题，以此类推</p>
</li>
<li>
<p>p </p>
<p>p标签用于设置网页的文体，是大多数文字的主要标签，表示文章或某些文字的一个段落。</p>
</li>
<li>
<p>em 与 strong </p>
<p>em标签的作用是强调内容，strong标签的作用是着重内容，在浏览器中都会被渲染成加粗字体，但是在英文文章中，表示强调的文字会用斜体，例如：专有名词、术语、外来名词等；而strong则使用粗体，表示需要着重表现的文字。同时，如果使用盲人阅读设备，strong标签中的内容会被重读。</p>
</li>
</ul>
<h2 id="articleHeader3">列表与表格标签</h2>
<ul>
<li>
<p>ul、ol 与 li </p>
<p>ul标签代表多项无序列表，即无数值排序的集合；而ol标签代表多项有序列表，是有数值排序的集合。当li标签嵌套在ul标签中时，是无序列表中的列表项，此时li的顺序在列表中没有意义；而当li嵌套在ol标签中时，则是有序列表中的列表项，此时第一个li标签则排序为一，以此类推。</p>
</li>
<li>
<p>dl 与 dt、dd </p>
<p>dl是一个定义列表，用来解释说明一些术语或特定词句。其中dt为术语部分（待解释部分），dd为dt的解释说明部分。</p>
</li>
<li>
<p>table </p>
<p>table标签用于定义表格，在早期由于浏览器对css技术的不支持，人们大量利用table标签进行页面布局，在现代的前端开发中已经摒弃了这种布局方式。但是也不用一棒子打死，table布局在布局表单内容时还是要方便的多。</p>
<p>在使用table标签时，tr标签定义行，th标签定义表头，td标签定义表格单元，更复杂的表格还会包含caption、col、colgroup、thead、tfoot 以及 tbody 元素。</p>
<p>注意：在 HTML5 中，table标签仅支持 "border" 属性，并且只允许使用值 "1" 或 ""</p>
</li>
</ul>
<h2 id="articleHeader4">表单标签</h2>
<ul>
<li>
<p>form </p>
<p>form标签在文档中定义了一个表单，表单中有各种表单控件，最后浏览器会将表单中的信息提交到服务器。其中，form标签有几个常用的重要属性：</p>
<ul><li><p>name</p></li></ul>
<p>name标签可以让我们方便的用js找到某个特定的表单，从而找到此表单下的表单控件，这样就可以对表单中的各个部分进行控制了。（form表单中的表单控件也有name属性）</p>
<ul><li><p>action</p></li></ul>
<p>action属性是当前表单所要提交到的服务器处理url，表单会被提交到action属性中的页面进行处理。</p>
<ul><li><p>method</p></li></ul>
<p>提交表单到服务器的方法，可选GET和POST，两个方法的特点和作用可到网上查阅，今后我也会慢慢整理。</p>
</li>
<li>
<p>input </p>
<p>input标签用于接收用户的填写的信息，通过form表单提交到服务器，同时通过设置<strong>type属性</strong>的不同值可以赋予input标签不同的功能，常用功能如下：</p>
<ul>
<li><p>text（默认）: 用于接收文本信息如用户名等</p></li>
<li><p>password: 用于接收密码</p></li>
<li><p>radio: 单选按钮（使用value属性标注提交值）</p></li>
<li><p>checkbox: 复选框（使用value属性标注提交值）</p></li>
<li><p>file: 文件上传</p></li>
<li><p>image: 图像上传</p></li>
<li><p>data: 输入日期控件（年月日）</p></li>
</ul>
</li>
<li>
<p>button </p>
<p>将button标签归类到这里其实是不太合适的（但是我不知道怎么归了啊=。=）button标签在表单中主要是用于提交表单，当用户填写完成后点击按钮进行表单的提交等操作。通过设置<strong>type属性</strong>也有不同的作用：</p>
<ul>
<li><p>submit: 此按钮提交表单数据给服务器。未指定时，此值为默认值，或者如果此属性动态变为空值或无效值</p></li>
<li><p>reset: 此按钮重置所有组件为初始值</p></li>
<li><p>button: 此按钮没有默认行为。它可以有与元素事件相关的客户端脚本，当事件出现时可触发</p></li>
</ul>
</li>
<li><p>select 与 option <br><br>select标签为下拉菜单，需要配合option标签一起使用，option标签为下拉菜单中的选项。通过指定select标签中的mutiple或size属性可设置select为下拉菜单或是列表框</p></li>
<li>
<p>textarea </p>
<p>用于定义多行文本域，cols和rows属性是必须要填写的，他们用于指定文本域的宽度和高度。多行文本域比较特殊，除了普通的事件属性，他还可以指定onselect属性，用于表示文本域里面的内容被选中时候的事件。</p>
</li>
</ul>
<h2 id="articleHeader5">超链接（锚点）</h2>
<ul><li>
<p>a </p>
<p>a标签用于创建一个到其他网页，文件，或同一页面内的位置，当然也可以是电子邮件地址或任何其他URL的超链接。下面是几个常用的属性：</p>
<ul><li><p>href</p></li></ul>
<p>这是一个必需属性为锚定义一个超文本链接来源。这表示链接目标的URL或URL片段</p>
<ul><li><p>download</p></li></ul>
<p>此属性指示浏览器下载URL而不是导航到URL，因此将提示用户将其保存为本地文件。</p>
<p>如果属性有一个值，它将在保存提示中用作预先填写的文件名 (用户仍然可以根据需要更改文件名)。对允许的值没有限制，但是 / 和  被转换为下划线。大多数文件系统限制文件名中的一些标点符号，浏览器会相应地调整建议的名称。</p>
<ul><li><p>target</p></li></ul>
<p>该属性指定在何处显示链接的资源。 取值为标签（tab），窗口（window），或框架（iframe）等浏览上下文的名称或其他关键词。以下关键字具有特殊的意义:</p>
<ul>
<li><p>_self: 当前页面加载，会覆盖掉当前页面。此值是默认的，如果没有指定属性的话</p></li>
<li><p>_blank: 新窗口打开，根据浏览器的不同设置，会在新标签页或新的浏览器窗口中打开页面</p></li>
<li><p>_parent: 加载响应到当前框架的父框架或当前的HTML5浏览上下文的父浏览上下文。如果没有parent框架或者浏览上下文，此选项的行为方式相同_self。</p></li>
<li><p>_top: IHTML4中：加载的响应成完整的，原来的窗口，取消所有其它frame。 HTML5中：加载响应进入顶层浏览上下文（即，浏览上下文，它是当前的一个的祖先，并且没有parent）。如果没有parent框架或者浏览上下文，此选项的行为方式相同_self</p></li>
</ul>
</li></ul>
<h2 id="articleHeader6">图片标签</h2>
<ul><li>
<p>img </p>
<p>用来设置文档中的图像内容，主要属性如下：</p>
<ul>
<li><p>src: 图像的 URL，这个属性对 &lt;img&gt; 元素来说是必需的</p></li>
<li><p>alt: 这个属性定义了描述图像的替换文本。如果图像的URL是错误的，该图像不在支持的格式列表中，或者如果图像还没有被下载,用户将看到这个显示。</p></li>
</ul>
<p>注意：在标准规范中，省略这个属性表明该图像是内容的关键部分，但没有等效的文本可用。把这个属性设置为空字符串，表明该图像不是内容的关键部分，非可视化浏览器在渲染的时候可能会忽略它。</p>
</li></ul>
<h1 id="articleHeader7">html5新增常用标签</h1>
<h2 id="articleHeader8">3D效果与动画</h2>
<ul><li><p>canvas</p></li></ul>
<p>canvas 标签定义图形，比如图表和其他图像。这个 HTML 元素是为了客户端矢量图形而设计的。它自己没有行为，但却把一个绘图 API 展现给客户端 JavaScript 以使脚本能够把想绘制的东西都绘制到一块画布上。</p>
<h2 id="articleHeader9">音频视频</h2>
<ul><li><p>audio</p></li></ul>
<p>audio 标签用于在文档中表示音频内容。它可以包含多个音频资源， 这些音频资源可以使用 src 属性或者source 元素来进行描述； 浏览器将会选择最合适的一个来使用。对于不支持 audio 元素的浏览器，audio 元素也可以作为浏览器不识别的内容加入到文档中。</p>
<ul><li><p>video</p></li></ul>
<p>用于在文档中嵌入视频内容。</p>
<p>ps.对于html5来说，常用的标签大概就这么多，原因还是浏览器的兼容问题，大多数标签使用起来不方便。主要使用还是特定场景下的api调用，如摄像头，gps定位等。html5的具体特性可查阅<a href="https://developer.mozilla.org/zh-CN/docs/Web/Guide/HTML/HTML5" rel="nofollow noreferrer" target="_blank">MDN:HTML5</a></p>
<h1 id="articleHeader10">特殊标签</h1>
<ul><li><p>&lt;!DOCTYPE&gt;</p></li></ul>
<p>准确的说，!DOCTYPE不应该算是一个html标签。&lt;!DOCTYPE&gt; 告知浏览器当前的 HTML (或 XML)文档是哪一个版本,应该用那种规范来解析当前文档. Doctype 是一条声明,而不是一个标签; 也可以把它叫做 "文档类型声明", 或 简称为 "DTD".</p>
<ul><li><p>meta</p></li></ul>
<p>meta标签位于html文档头部中的head标签中。meta标签用来描述一个HTML网页文档的属性，例如作者、日期和时间、网页描述、关键词、页面刷新等元数据。这些数据将用于服务搜索引擎和其他网络服务.</p>
<p>由于meta标签的属性实在太多，这里列举几个常用属性：</p>
<ul><li>
<p>name </p>
<p>name属性主要用于描述网页，比如网页的关键词，叙述等。与之对应的属性值为content，content中的内容是对name填入类型的具体描述。其中name属性有三个常用的取值，分别是：</p>
<ul>
<li><p>keyword: 告诉搜索引擎你网站的关键词</p></li>
<li><p>description: 用于告诉搜索网站你网站的主要内容</p></li>
<li><p>viewport: 移动设备窗口设置</p></li>
</ul>
<p>其中重点说下viewport的设置：</p>
<p>width: 控制 viewport 的大小，可以指定的一个值，例如 600 或 device-width 为设备的宽度（单位为缩放为 100% 时的 CSS 的像素）</p>
<p>height: 和 width 相对应，指定高度</p>
<p>initial-scale: 初始缩放比例，也即是当页面第一次 load 的时候缩放比例</p>
<p>maximum-scale: 允许用户缩放到的最大比例</p>
<p>minimum-scale: 允许用户缩放到的最小比例</p>
<p>user-scalable: 用户是否可以手动缩放</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  <meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1&quot;>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>  &lt;meta <span class="hljs-built_in">name</span>=<span class="hljs-string">"viewport"</span> content=<span class="hljs-string">"width=device-width, initial-scale=1"</span>&gt;
</code></pre>
<ul><li>
<p>http-equiv <br><br>这个属性用于设置http请求相关参数。使用方法与name一样，需要配合content使用，先使用http-equiv定义，再使用content进行相关设置。</p>
<ul>
<li>
<p>content-Type: 设置字符集，在html5中已经修改为 charset，一般推荐设置成 utf-8 字符集</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  <meta charset=&quot;utf-8&quot;>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span>
</code></pre>
</li>
<li>
<p>X-UA-Compatible: 设置浏览器采用何种版本渲染当前页面，一般选择最新版本</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  <meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;IE=edge,chrome=1&quot;/>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"X-UA-Compatible"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"IE=edge,chrome=1"</span>/&gt;</span>
</code></pre>
</li>
<li><p>cache-control: 指定请求和响应遵循的缓存机制</p></li>
</ul>
<p>no-cache: 先发送请求，与服务器确认该资源是否被更改，如果未被更改，则使用缓存。<br></p>
<p>no-store: 不允许缓存，每次都要去服务器上，下载完整的响应。（安全措施）<br></p>
<p>public : 缓存所有响应，但并非必须。因为max-age也可以做到相同效果<br></p>
<p>private : 只为单个用户缓存，因此不允许任何中继进行缓存。（比如说CDN就不允许缓存private的响应）<br></p>
<p>maxage : 表示当前请求开始，该响应在多久内能被缓存和重用，而不去服务器重新请求。例如：max-age=60表示响应可以再缓存和重用 60 秒。</p>
<p>no-siteapp: 禁止自动转码。假设某网页没有进行移动端适配，在移动端进行浏览时，从某个入口（例如百度）进入该网页，可以防止该入口对网页进行移动设备转码。虽然转码的意图是好的，但是有的时候转码之后效果不尽人意，就可以设置这个属性。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  <meta http-equiv=&quot;Cache-Control&quot; content=&quot;no-siteapp&quot; />
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"Cache-Control"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"no-siteapp"</span> /&gt;</span>
</code></pre>
</li></ul>
</li></ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
校招进行时（三）---html基础

## 原文链接
[https://segmentfault.com/a/1190000010262000](https://segmentfault.com/a/1190000010262000)

