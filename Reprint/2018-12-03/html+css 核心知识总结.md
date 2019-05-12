---
title: 'html+css 核心知识总结' 
date: 2018-12-03 2:30:08
hidden: true
slug: rarljpi5ggi
categories: [reprint]
---

{{< raw >}}

                    
<h1>Html</h1>
<h2>1.解释</h2>
<p>&lt;meta charset="UTF-8"&gt;，<br>主要从utf-8展开，utf-8是一种字符编码，该编码是全世界通用的，意思是假如项目涉及多语言，那么只能使用该编码方式。<br> &lt;!DOCTYPE html&gt;<br>  是使用html5文档类型。告知浏览器的解析器，用什么文档类型 规范来解析这个文档。 抛弃之前的html4的4中文档类型</p>
<h2>2.语义化的理解</h2>
<pre><code>**what?**
    根据内容的结构（内容语义化），选择合适的标签（代码语义化）便于开发者阅读和写出更优雅的代码的同时让浏览器的爬虫和机器很好地解析。
**why?**
    为了在没有CSS的情况下，页面也能呈现出很好地内容结构、代码结构:为了裸奔时好看；
    用户体验：例如title、alt用于解释名词或解释图片信息、label标签的活用；
    有利于SEO：和搜索引擎建立良好沟通，有助于爬虫抓取更多的有效信息：爬虫依赖于标签来确定上下文和各个关键字的权重
    方便其他设备解析（如屏幕阅读器、盲人阅读器、移动设备）以意义的方式来渲染网页；
    便于团队开发和维护，语义化更具可读性，是下一步吧网页的重要动向，遵循W3C标准的团队都遵循这个标准，可以减少差异化。
**how?**
    尽可能少的使用无语义的标签div和span；
    在语义不明显时，既可以使用div或者p时，尽量用p, 因为p在默认情况下有上下间距，对兼容特殊终端有利；
    不要使用纯样式标签，如：b、font、u等，改用css设置。
    需要强调的文本，可以包含在strong或者em标签中（浏览器预设样式，能用CSS指定就不用他们），strong默认样式是加粗（不要用b），em是斜体（不用i）；
    使用表格时，标题要用caption，表头用thead，主体部分用tbody包围，尾部用tfoot包围。表头和一般单元格要区分开，表头用th，单元格用td；
    表单域要用fieldset标签包起来，并用legend标签说明表单的用途；
    每个input标签对应的说明文本都需要使用label标签，并且通过为input设置id属性，在lable标签中设置for=someld来让说明文本和相对应的input关联起来。
</code></pre>
<h2>3.Iframe的优缺点， 如何用</h2>
<p><strong>iframe的优点：</strong><br>    iframe能够原封不动的把嵌入的网页展现出来。<br>    如果有多个网页引用iframe，那么你只需要修改iframe的内容，就可以实现调用的每一个页面内容的更改，方便快捷。<br>    网页如果为了统一风格，头部和版本都是一样的，就可以写成一个页面，用iframe来嵌套，可以增加代码的可重用。<br>    如果遇到加载缓慢的第三方内容如图标和广告，这些问题可以由iframe来解决。<br>    重载页面时不需要重载整个页面，只需要重载页面中的一个框架页(减少了数据的传输，增加了网页下载速度)</p>
<p><strong>iframe的缺点</strong><br>    1、页面样式调试麻烦，出现多个滚动条；<br>    2、浏览器的后退按钮失效；<br>    3、过多会增加服务器的HTTP请求；<br>    4、小型的移动设备无法完全显示框架；<br>    5、产生多个页面，不易管理；<br>    6、不容易打印；<br>    7、代码复杂，无法被一些搜索引擎解读。<br>    8、iframe会阻塞主页面的Onload事件；</p>
<h2>4.谈谈对Label的理解</h2>
<p>    功能：表示Label标签要绑定的HTML元素，你点击这个标签的时候，所绑定的元素将获取焦点。<br>    用法：&lt;label for="InputBox"&gt;姓名&lt;/label&gt;&lt;input id="InputBox" type="text"&gt;</p>
<h1>CSS</h1>
<h2>5.谈谈对css选择符的理解</h2>
<p><strong>选择符有9种</strong></p>
<pre><code>1.id选择器（ # myid）
2.类选择器（.myclassname）
3.标签选择器（div, h1, p）
4.相邻选择器（h1 + p）
5.子选择器（ul &lt; li）
6.后代选择器（li a）
7.通配符选择器（ * ）
8.属性选择器（a[rel = "external"]）
9.伪类选择器（a: hover, li: nth - child）
</code></pre>
<p><strong>继承性</strong><br>   可继承： font-size font-family color, UL LI DL DD DT;<br>   不可继承 ：border padding margin width height ;</p>
<p><strong>优先级</strong>   <br> 相同的样式优先级就近原则，样式定义最近者为准;<br> 载入样式以最后载入的定位为准;                                                                                    <br> 优先级算法是权重计算法，id=100，class=10 ,标签是1<br>  一般而言</p>
<pre><code>   !important &gt;  id &gt; class &gt; tag  
   important 比 内联优先级高
</code></pre>
<h2>6.对css元素的理解</h2>
<p><strong>种类</strong><br>块元素:block：p,ul,li ,dl,ol,dt,h1~h6,hr,div,pre,table. form , fieldset<br>内联元素:inline： a、span、img、input、label、select、strong、textarea br, code, sup, sub；<br>知名的空元素： <br></p>
<hr> &lt;img&gt; &lt;input&gt; &lt;link&gt; &lt;meta&gt; <br><strong>区别</strong><br>块元素：能容纳块和内联等其他元素，不能与其他元素同行，对于宽高起作用.（即能设宽高，独占一行）<br>内联元素：只能容纳文本和内联元素，容许其他内联元素与其同行，宽高对其不起作用。  inline不响应垂直margin,和padding（有但请避免）, width, height, max/min width/height 等属性声明。<br>空元素，主要讲下input 可算内联元素，因为可与其他元素同行，且宽高对其起作用。<p><strong>提示：对内联元素宽高起作用，请使用display:inline-block</strong></p>
<h2>7.谈谈对定位的理解</h2>
<pre><code>absolute 生成绝对定位的元素，相对于 static 定位以外的第一个父元素进行定位。 
fixed （老IE不支持）生成绝对定位的元素，相对于浏览器窗口进行定位。
relative 生成相对定位的元素，相对于其正常位置进行定位。
static  默认值。没有定位，元素出现在正常的流中  （忽略 top, bottom, left, right z-index 声明）
</code></pre>
<ol><li>谈谈对盒模型的理解</li></ol>
<hr>
<pre><code>盒模型是有两种标准的，一个是标准模型w3c，一个是IE模型。</code></pre>
<p>标准盒子的宽 等于 width+margin +padding+border；width就是内容的宽高<br>IE的盒模型：width=内容(content)+填充(padding)+边框(border)的总宽高）</p>
<p>css如何设置两种模型：box-sizing:content-box;   border-box;<br><strong>注意事项</strong>：input、button元素默认border-box ，还是基于传统的ie 盒子模型。但文档类型是标准模式，则所有元素都是w3c盒模型</p>
<h2>9.边距重叠与BFC：</h2>
<p><strong>边距重叠的问题：</strong><br>父元素没有设置margin-top，而子元素设置了margin-top：20px;可以看出，父元素也一起有了边距<br>相邻的上下元素margin-top和margin-bottom也会重叠</p>
<p><strong>边距重叠/外边距合并的注意事项</strong>：<br>  外边距合并只出现在块级元素上； <br>　浮动元素不会和相邻的元素产生外边距合并； <br>　绝对定位元素不会和相邻的元素产生外边距合并； <br>　内联块级元素间不会产生外边距合并； <br>　根元素间不会不会产生外边距合并（如html与body间）； <br>　设置了属性overflow且值不为visible的块级元素不会与它的子元素发生外边距合并</p>
<p><strong>边距重叠的解决方案 （BFC）</strong></p>
<pre><code>float属性不为none（脱离文档流）
position为absolute或fixed
display为inline-block,table-cell,table-caption,flex,inine-flex
overflow不为visible
根元素</code></pre>
<p><strong>BFC的适用场景</strong><br>    自适应两栏布局<br>    清除内部浮动 <br>    防止垂直margin重叠</p>
<h2>10.对浮动的理解</h2>
<p><strong>工作原理：</strong><br>    对块元素设置浮动属性后，它就脱离了当前的文档流布局的方式，漂浮到他的父级元素的左边或者右边。如果想让多个块显示在同一行中，可以将这些块都设置成浮动，并且浮动方向相同。</p>
<p><strong>为什么要清除浮动</strong><br>浮动的缺点：<br>1.当元素有默认属性，且每个浏览器默认属性值不同，而编写者不清楚具体是多少及多大事，会对父元素（如对父元素的background属性，margin属性有影响）和后面元素产生影响，造成布局错乱。<br>2.浮动的元素，高度会塌陷，而高度的塌陷使我们页面后面的布局不能正常显示。<br>故需对父元素使用Clear，进行清除浮动</p>
<p><strong>清除浮动的3种办法：</strong><br>1.添加一个附加层，：#haa{display：block;clear:both;height:20px;}<br>2.给父元素添加overflow：hidden;属性。但是IE6不支持，还需给父元素添加zoom:1属性。<br>3.利用伪类after的方法 <br>例： .cf:after{content:" "；height:0； display:block； clear:both；line-height:0; Visibility:hidden；}  .cf{zoom:1} /<em>IE6不支持通过clear:both和行高为0的方式清除浮动，需增加zoom:1</em>/<br>注意：使用时：浮动布局的时候，在ie6环境中会出现双倍边距的bug（即元素浮动方向和边距方向一致的时候边距会是原来的两倍。）解决的办法是给元素添加display:inline;属性。</p>
<h2>11.为何初始化css样式表</h2>
<p>    方法一、reset.css能够重置浏览器的默认属性。不同的浏览器具有不同的样式，重置能够使其统一。比如说ie浏览器和FF浏览器下button显示不同，通过reset能够统一样式，显示相同的效果。但是很多reset是没必要的，多写了会增加浏览器在渲染页面的负担。<br>    方法二、 normalize.css是一个可以定制的css文件，它让不同的浏览器在渲染元素时形式更统一。</p>
<h2>12.CSS sprite vs 字体图标</h2>
<p>CSS Sprites其实就是把网页中一些背景图片整合到一张图片文件中，再利用CSS的“background-image”，“background- repeat”，“background-position”的组合进行背景定位，background-position可以用数字能精确的定位出背景图片的位置。</p>
<h2>13.实现水平和垂直居中的方式</h2>
<p>实现div的水平居中和垂直居中<br>1.适用: 宽高已定<br>设置position: absolute(父元素记得设置: relative), 然后top和left设置50%, 50%, 再设置margin-left=宽/2, margin-top:宽/2<br>2.只适用: 固定宽高; 如果宽高随意,想靠内部撑开的话, 会占满整个父div <br>依然是利用position：子div的上下左右都设置成0，然后margin设置auto。关键是要设置position：子absolute，父relative。<br>3.适用: 不论是否固定宽高都可用. 问题在于兼容性. ie9及以下不支持<br>设置父级flex属性: display:flex; justify-content:center; align-items: center; <br>4.适用: 要设宽度, 否则会使得宽度为父级div的宽度<br>父级元素设置display:table-cell ，然后vertical-align：middle。这种方法可以设置垂直居中. 这时候只要在子元素里设置margin:auto即可实现水平居中<br>但是这种方法好像会使父元素的居中无效。<br>5.适用: 可不指定宽高<br>使用transform居中. 设置父级position:relative; 子级position:absolute. 然后top: 50%; left:50%; transform:translate(-50%,-50%)<br>6.适用: 指定宽高百分比<br>保证left和right的百分数一样就可以实现水平居中，保证top和bottom的百分数一样就可以实现垂直居中。但是这种方法不能由内部元素自动调节div的宽高，而是通过父元素大小控制的<br>7.使用display:inline-block加伪元素<br>box 容器通过 after或者before 生成一个高度 100% 的「备胎」，他的高度和容器的高度是一致的，相对于「备胎」垂直居中，在视觉上表现出来也就是相对于容器垂直居中了<br>8.多元素水平居中</p>
<pre><code>1) 把子级div设置成display:inline-block; 然后父级div设置text-align:center;
2) 更方便灵活的做法还是使用flex-box, 设置水平居中 justify-content: center</code></pre>
<p>9.使用栅格化布局<br>10.使用flex</p>
<h2>14.CSS3新特性：</h2>
<p>    新增各种CSS选择器   (: not(.input): 所有class不是“input”的节点）<br>    圆角border-radiuis<br>    多列布局：multi-column layout<br>    阴影和反射： multi-column layout<br>    文字特效：text-shadow<br>    线性渐变： gradient<br>    旋转：transform<br>    缩放，定位，倾斜，动画，多背景：transform: scale(0.85,0.90)  translate(0px, -30px)  skew(-9deg, 0deg)  Animation</p>
<h2>15.对css的优化有哪些（压缩 合并 图片 规范）</h2>
<p>    题目中好像已经写了答案了。详情参考后面的前端优化</p>
<h2>16.常见问题与解决方法</h2>
<p>1.如何清除图片下方出现几像素的空白间隙？<br>方法1：img{display:block;}<br>方法2：img{vertical-align:top;}<br>方法3：.test{font-size:0;line-height:0;}<br> .test为img的父元素</p>
<p>2.如何使页面文本行距始终保持为n倍字体大小的基调？<br>方法：body{line-height:n;}</p>
<p>3.如何容器透明，内容不透明？<br>方法1：容器层与内容层并级，容器层设置透明度，内容层通过负margin或者position绝对定位等方式覆盖到容器层上<br>方法2 :正常的子父容器法，对附容器用background:rgba(0,0,0,0.3);</p>
<p>ps:透明度的问题：filter:alpha(opacity=20) opacity:0.2</p>
<p>4.如何使文本溢出边界显示为省略号？<br>.test{width:150px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}</p>
<p>5.如何使连续的长字符串自动换行？<br>.test{width:150px;word-wrap:break-word;}</p>
<p>6.使文本溢出边界不换行强制在一行内显示？<br>.test{width:150px;white-space:nowrap;}</p>
<p>7.去掉chrome 登录页中 记住密码后，输入框的黄色背景<br>回答: input:-webkit-autofill{ background-color:#fff !important; -webkit-box-shadow:0 0 0 40px #fff inset; }</p>
<p>8.分页不能正常跳转至对应的页面：<br>回答: form表单中增加 return false</p>
<p>9.对表格table的td明明设置了width，为何不起作用？<br>方法: 可能你的表格被设置了：table-layout:fixed; 去掉此属性即可</p>
<p>10.audio标签 在chrome下支持ogg mp3 wav的模式，但在ie11下 仅支持mp3格式；但有的ie11 啥都不行，不知道为何。。。</p>
<h1>高阶</h1>
<h2>1.对less 和sass的理解</h2>
<p><strong>定义：</strong>Less 是一门 CSS 预处理语言，它扩充了 CSS 语言，增加了诸如变量、混合（mixin）、函数等功能，让 CSS 更易维护、方便制作主题、扩充。<br><strong>优点</strong>：<br>   写的更快，变量和函数的功能：方便制作主题，利于维护，便于扩充。（换肤）<br>区别？</p>
<h2>2.实现一个栅格系统</h2>
<p><strong>Bootstrap响应式布局是利用其栅格系统，对于不同的屏幕采用不同的类属性</strong></p>
<p>1.行（row）必须包含在.container(固定宽度)或.container-fluid(100%宽度)中，以便为其赋予合适的排列（aligment）和内补（padding）。 <br>2.通过行（row）在水平方向创建一组列（column）。 <br>3.自己内容应当放置于列（column）内，并且，只有列可以作为行（row）的直接子元素。 <br>4.类似.row和.col-xs-4这种预定义的类，可以用来快速创建栅格布局。Bootstrap源码中定义的mixin也可以用来创建语义化布局。 <br>5.通过为列设置padding属性，从而创建列与列之间的间隔（gutter）。通过为.row元素设置负值margin从而抵消为.container元素设置的padding，也就间接为行（row）所包含的列（column）抵消掉了padding。 <br>6.栅格系统的列是通过指定1到12的值来表示其跨越范围。例如三个等宽的列可以使用三个.col-xs-4来创建。 <br>7.如果一行（row）中包含了的列（column）大于12，多余的列所在的元素将作为一个整体另起一行排列。 <br>8.栅格类适用于与屏幕宽度大于或等于分界点大小的设备，并且针对小屏幕覆盖栅格类。 <br>如下图所示为栅格系统在多种屏幕上的应用说明。 </p>
<p><span class="img-wrap"><img data-src="/img/bVbafKI?w=703&amp;h=406" src="https://static.alili.tech/img/bVbafKI?w=703&amp;h=406" alt="clipboard.png" title="clipboard.png"></span></p>
<p>详情请见 bootstrap官网：<a href="https://v3.bootcss.com/css/#grid" rel="nofollow noreferrer">https://v3.bootcss.com/css/#grid</a></p>
<h2>3.谈下flex</h2>
<p>Flex 布局教程：语法篇 阮一峰<br><a href="http://www.ruanyifeng.com/blo..." rel="nofollow noreferrer">http://www.ruanyifeng.com/blo...</a>^%$</p>
<h2>4.px em rem pt vw vh的区别</h2>
<p><strong>px像素</strong>（Pixel）。相对长度单位。像素px是相对于显示器屏幕分辨率而言的。 IE无法调整那些使用px作为单位的字体大小；<br><strong>em</strong>是相对长度单位。相对于当前对象内文本的字体尺寸。如当前对行内文本的字体尺寸未被人为设置，则相对于浏览器的默认字体尺寸。 em会继承父级元素的字体大小。<br><strong>rem</strong> 是相对单位，相对的是html根元素 是字体的单位<br><strong>pt</strong> ：印刷业上常使用的单位，磅的意思，一般用于页面打印排版。<br>关系：任意浏览器的默认字体高都是16px。所有未经调整的浏览器都符合: 1em=16px。12px=0.75em,10px=0.625em。为了简化font-size的换算，需要在css中的body选择器中声明Font-size=62.5%，这就使em值变为 16px62.5%=10px, 这样12px=1.2em, 10px=1em, 也就是说只需要将你的原来的px数值除以10，然后换上em作为单位就行了。pt=px3/4<br>用法：对于只需要适配少部分手机设备，且分辨率对页面影响不大的，使用px即可 。<br><strong>vw</strong>相对于视口的宽度。视口被均分为100单位的vw 算比例的时候，不用去算父元素 然后一级一级的百分比下来<br><strong>vh</strong>相对于视口的高度。视口被均分为100单位的vh<br>对于需要适配各种移动设备，使用rem，例如只需要适配iPhone和iPad等分辨率差别比较挺大的设备。</p>
<h2>5.渐进增强和优雅降级</h2>
<p><strong>渐进增强</strong> ：针对低版本浏览器进行构建页面，保证最基本的功能，然后再针对高级浏览器进行效果、交互等改进和追加功能达到更好的用户体验。</p>
<p><strong>优雅降级</strong> ：一开始就构建完整的功能，然后再针对低版本浏览器进行兼容。</p>
<ol><li>FOUC（无样式内容闪烁）</li></ol>
<hr>
<p>FOUC - Flash Of Unstyled Content 文档样式闪烁</p>
<p>&lt;style type="text/css" media="all"&gt;@import "../fouc.css";&lt;/style&gt;</p>
<p>而引用CSS文件的@import就是造成这个问题的罪魁祸首。IE会先加载整个HTML文档的DOM，然后再去导入外部的CSS文件，因此，在页面DOM加载完成到CSS导入完成中间会有一段时间页面上的内容是没有样式的，这段时间的长短跟网速，电脑速度都有关系。</p>
<p>解决方法简单的出奇，只要在&lt;head&gt;之间加入一个&lt;link&gt;或者&lt;script&gt;元素就可以了。</p>
<h2>7.浏览器的渲染过程</h2>
<p><strong>渲染引擎处理网页，通常分成四个阶段。</strong> </p>
<p><strong>解析html以构建dom树 -&gt; 构建render树 -&gt; 布局render树 -&gt; 绘制render树</strong></p>
<p>1.解析代码：HTML代码解析为DOM，CSS代码解析为CSSOM（CSS Object Model）<br>2.对象合成：将DOM和CSSOM合成一棵渲染树（render tree）<br>3.布局：计算出渲染树的布局（layout），以计算每个节点的几何信息<br>4.绘制：将各个节点绘制到屏幕上。 （即遍历render树，并使用UI后端层绘制每个节点。）</p>
<p>值得注意的是，这个过程是逐步完成的，为了更好的用户体验，渲染引擎将会尽可能早的将内容呈现到屏幕上，并不会等到所有的html都解析完成之后再去构建和布局render树。它是解析完一部分内容就显示一部分内容，同时，可能还在通过网络下载其余内容。</p>
<p><span class="img-wrap"><img data-src="/img/bVba79M?w=634&amp;h=335" src="https://static.alili.tech/img/bVba79M?w=634&amp;h=335" alt="clipboard.png" title="clipboard.png"></span></p>
<p>![图片上传中...]</p>
<p><a href="https://www.cnblogs.com/rainy-shurun/p/5603686.html" rel="nofollow noreferrer">前端必读：浏览器内部工作原理</a><br><em>*正常的网页加载流程是这样的。</em><br><span class="img-wrap"><img data-src="/img/bVba79L?w=655&amp;h=328" src="https://static.alili.tech/img/bVba79L?w=655&amp;h=328" alt="clipboard.png" title="clipboard.png"></span><br>网页，一边开始解析<br>解析过程中，发现&lt;script&gt;标签<br>暂停解析，网页渲染的控制权转交给JavaScript引擎<br>如果&lt;script&gt;标签引用了外部脚本，就下载该脚本，否则就直接执行<br>执行完毕，控制权交还渲染引擎，恢复往下解析HTML网页</p>
<p>CSS 不会阻塞 HTML 的解析，但会阻塞渲染，<br>CSS 的解析会阻塞脚本的执行，<br>脚本也会阻塞 HTML 的解析。</p>
<h2>8.重构、回流</h2>
<p><strong>浏览器的重构</strong> 又名<strong>重绘 重构</strong>。指的是改变每个元素外观时所触发的浏览器行为，比如颜色，背景等样式发生了改变而进行的重新构造新外观的过程。重构不会引发页面的重新布局，不一定伴随着回流。<br><strong>回流</strong> 是mozilla 的Geoko渲染引擎中的术语 ,在webkit中称为‘布局’.都是对元素定位。<br>又名 <strong>重棑</strong>指的是浏览器为了重新渲染页面的需要而进行的重新计算元素的几何大小和位置的，他的开销是非常大的，回流可以理解为渲染树需要重新进行计算，一般最好触发元素的重构，避免元素的回流；比如通过通过添加类来添加css样式，而不是直接在DOM上设置，当需要操作某一块元素时候，最好使其脱离文档流，这样就不会引起回流了，比如设置position：absolute或者fixed，或者display：none，等操作结束后在显示。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
html+css 核心知识总结

## 原文链接
[https://segmentfault.com/a/1190000014654171](https://segmentfault.com/a/1190000014654171)

