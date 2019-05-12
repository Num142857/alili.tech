---
title: '太急了点吧？贴吧PWA20天就出炉了' 
date: 2019-01-12 2:30:24
hidden: true
slug: 18vzjr9uxcs
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>"老司机开车 从不需要理由 喜欢我 就来点我吧"   <br><a href="http://tieba.freeedit.cn" rel="nofollow noreferrer" target="_blank">易杭贴吧--新鲜出炉的中文社区 http://tieba.freeedit.cn</a></p></blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009824428?w=500&amp;h=160" src="https://static.alili.tech/img/remote/1460000009824428?w=500&amp;h=160" alt="易杭贴吧--新鲜出炉的中文社区" title="易杭贴吧--新鲜出炉的中文社区" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader0">1. 前述</h2>
<p>最近一直在写一个发贴子的应用，前不久才刚刚“完工”（其实还有很多需要改进的地方）。  <br>这个应用是仿着上一个版本的百度贴吧来写的，最初的打算是想要完成百度贴吧的最主要的那部分基本功能，但真正做起来，却不是一件简单的事。    </p>
<p>这个项目一共用了近二十天的时间，我在这段时间内，既踩了很多的坑，也学到了很多的知识。  <br>踩的坑越多，修复的bug越多，看的东西越多，就越觉得自己知识浅陋。  <br>很多的东西，都是自己用过了之后，才会恍然大悟。看上一百遍，还真的不如自己动手写一遍。  <br>所以我想将这个应用的构建过程和在这段时间内的心得体会记一记。自己呢，也能在写的过程中，对应用中的某些问题进行反思。  </p>
<p>@-v-@</p>
<p>其实自己从来没有这么完整地做过一个这样的项目。  <br>从应用的选题、界面的设计、工具的选择，到环境的搭建、应用的部署，最后到应用的测试和修复，全部依赖于自己。  <br>我既算是这个应用的“UI设计师”，也算是这个应用的“前端工程师”、“后端工程师”、“数据库工程师”，以及“项目架构师”。（突然就把自己说得高大上了，哭笑不得~）  </p>
<p>不过，自己一个人要演这么多的角色，其中的困难很大。  <br>近二十天的时间里，我不断地去尝试打磨作品的细节，希望能做好每一个环节。  <br>但即使到了部署的时候，它也仍然只是个布娃娃。  <br>不过，仍然会使我高兴的是，它至少还可以“动”。</p>
<hr>
<h2 id="articleHeader1">2. 介绍</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009824429?w=281&amp;h=500" src="https://static.alili.tech/img/remote/1460000009824429?w=281&amp;h=500" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>这张图就是这个项目第一次打开时的界面。  <br>当我们不断往右滑的时候，它又会一页页地显示。到了最后一页，它又会很调皮地叫我们返回到第一页，然后点击进入。  <br>进入以后，就是登录、注册之类的。完成了之后，就会直接进入到app里面，然后就可以搜索发帖了。   </p>
<p>页面展示之类的，我就不写了，同伴们看了，估计也会觉得没什么意思。  <br>百度贴吧长什么样子，它也就大概长什么样子，只是某些地方，我做了更改和精简（因为实在是没有那么多时间去写这些功能，功能项太多了，单靠自己一个人，根本难以在短时间内做完，笑~）。  <br>只需要去玩一玩，就知道效果是怎么样的了，所以我就直接给地址吧。  </p>
<p><a href="http://tieba.freeedit.cn" rel="nofollow noreferrer" target="_blank">演示 --- 易杭贴吧--新鲜出炉的中文社区 http://tieba.freeedit.cn</a>  </p>
<p><a href="https://github.com/freeedit/yihang-tieba" rel="nofollow noreferrer" target="_blank">源码 --- https://github.com/freeedit/yihang-tieba</a>  </p>
<p>（项目结构是怎样的，以及如何去运行这个项目，见项目源码地址中的readme文件。）</p>
<p>在这个项目中，我内置了一个彩蛋，大体是长这个样子的 :   </p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009824430?w=281&amp;h=500" src="https://static.alili.tech/img/remote/1460000009824430?w=281&amp;h=500" alt="" title="" style="cursor: pointer;"></span></p>
<p>嗯嗯，其实我们可以多试几次，每次出现的消息是不一样的，就仿佛有个小机器人在跟我们对话一样。  </p>
<p>其他的效果图，都存放在项目的result文件夹中，地址是：</p>
<p><a href="https://github.com/freeedit/yihang-tieba/tree/master/tieba-design/result" rel="nofollow noreferrer" target="_blank">freeedit/yihang-tieba/tieba-design/result</a>  </p>
<p>最后的最后，放上一个总览图。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009824431" src="https://static.alili.tech/img/remote/1460000009824431" alt="" title="" style="cursor: pointer;"></span></p>
<p>（写了一大堆有的没的，接下来才算是进入正文。）</p>
<hr>
<h2 id="articleHeader2">3. 过程</h2>
<p>最初想做一个和QQ一模一样的聊天工具，但后来又觉得聊天的工具太普遍了，所以就将目标转到了百度贴吧。  <br>同样都是和别人一起聊天吹水水，贴吧却要显得更好玩一些。（秋名山老司机一枚前来觐见）  <br>自己也很喜欢贴吧那种“搞笑”、“无畏”的吹水环境。所以后来，就敲定主意做一个贴吧出来。</p>
<h3 id="articleHeader3">3.1 构思</h3>
<p>我将项目分成了四个部分来分步骤完成：  </p>
<p>1 设计 <a href="https://github.com/freeedit/yihang-tieba/tree/master/tieba-design" rel="nofollow noreferrer" target="_blank">freeedit/yihang-tieba/tieba-design</a>  <br>2 前端 <a href="https://github.com/freeedit/yihang-tieba/tree/master/tieba-client" rel="nofollow noreferrer" target="_blank">freeedit/yihang-tieba/tieba-client</a>  <br>3 后端 <a href="https://github.com/freeedit/yihang-tieba/tree/master/tieba-server" rel="nofollow noreferrer" target="_blank">freeedit/yihang-tieba/tieba-server</a>  <br>4 前后端连接 + 将项目部署给主机</p>
<h3 id="articleHeader4">3.2 设计</h3>
<p>小部分的设计图存放在这里:  （还有一大部分被我失误给删掉了）  </p>
<p><a href="https://github.com/freeedit/yihang-tieba/tree/master/tieba-design" rel="nofollow noreferrer" target="_blank">freeedit/yihang-tieba/tieba-design</a>  </p>
<p>首先在阿里矢量图标库中，选取了近80个svg图，再用icomoon将它们打包成能引入stylus的字体文件。  <br>（晕死，我误删的部分，就包括了它，导致我下一次想替一个图标，重新打包成新的字体文件都不行）  </p>
<p>接着，我便开始设计底部的五个小图标。本来打算用AI画几个矢量图，但电脑上没装，再加上很久没用过了，不知道还会不会用，就直接用PS来画了。  <br>PS来画的时候，总感觉，CC2014以后，对矢量图层进行交并补运算好像不一样了，不知道是不是自己的错觉。合并多个矢量图层，总不会出现自己想要的效果（也许是自己还没摸透PS吧）。最后呢，就只能做位图了。  </p>
<p>做完了这些，我才来开始画应用的图标。一个简简单单的吧字，放在一个圆角矩形中，上下两个缺口，底色用#3388ff，搞定！  </p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009824432?w=1280&amp;h=96" src="https://static.alili.tech/img/remote/1460000009824432?w=1280&amp;h=96" alt="" title="" style="cursor: pointer;"></span></p>
<p>在上图最右边的吧字图标，是用来给PWA图标配的。  <br>第二个图标，是用来做用户默认的头像的。  <br>其他几个就是应用图标和底栏图标了。  <br>（为了给用户一种图标在往上升腾的感觉，我故意将几个线条样式的图标下面，开了个口子。用户可能看着就会很难受，就想要把它下面那根线条补全，然后他就可能会按下去。）  </p>
<p>另外呢，考虑到网络可能会出现问题，图片地址找不到，所以也准备了一个默认的图片背景图。</p>
<h3 id="articleHeader5">3.3 前端</h3>
<p><a href="https://github.com/freeedit/yihang-tieba/tree/master/tieba-client" rel="nofollow noreferrer" target="_blank">freeedit/yihang-tieba/tieba-client</a>  </p>
<p>最开始想用sass写的，但是后来感觉stylus更简洁，更干净，看上去更好看，然后就选它来处理CSS了。  <br>决定用stylus之后，就想找个和stylus一样缩进式语法的html预处理器。正好，Jade和它真的是绝配。两个都长得一模一样的，用起来也方便。  <br>我很庆幸自己选了stylue+pug的组合，要不然，这个应用可能需要一个月才能搞定呢。  </p>
<p>到这儿呢，我的强迫症就犯了。有了CSS和HTML的预处理器，怎么着，JS也要上个“预处理器”吧。  <br>当时疯狂地想要用TS，其原因并不是因为它很酷（当然，酷也算它的一方面），而是想三剑客不能只有两剑客（babel不算剑客，它顶多是瓶万金油，个人愚见），这样打架不利索。  <br>（还有一个最最重要的原因，说出来，你们可能会笑死我，它那atom file-icons图标贼好看，绿色偏青色，比JS那个屎黄色好看多了。）  <br>各位看官笑一笑就行了，飘过飘过...  </p>
<p>回归理智。。。  </p>
<p>vue对ts的支持好像还不怎么好，vue-loader是可以用，但用着用着，有些文件引不进来。啊！请原谅我的无知，我真不知道为什么会这样。  <br>最后，因为搞不定了，还是只要两个剑客就够了，三个剑客容易吵架。再加上从未用过TS，不好掌控大局啊。一旦TS出了BUG，我就得哭晕在厕所，果断放弃好了。强迫症之类的东西，身为一名前端化缘人，果然还是不该有啊。  </p>
<p>最终使用到的一套前端工具，就是这样的：  </p>
<p>template: pug   <br>style: stylus   <br>script: babel   <br>database: indexDB  </p>
<p>pug stylus babel  <br>vue2 vuex axios+vue-axios vue-router vue-loader  <br>better-scroll flexible animate  <br>webpack express webpack-pwa-manifest  <br>indexDB localStorage</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  &quot;dependencies&quot;: {
    &quot;better-scroll&quot;: &quot;^0.1.15&quot;,
    &quot;flexible&quot;: &quot;&quot;,
    &quot;animate&quot;: &quot;&quot;,
    &quot;axios&quot;: &quot;^0.16.2&quot;,
    &quot;vue&quot;: &quot;^2.2.6&quot;,
    &quot;vue-axios&quot;: &quot;^2.0.2&quot;,
    &quot;vue-router&quot;: &quot;^2.3.1&quot;,
    &quot;vuex&quot;: &quot;^2.3.1&quot;
  },
  &quot;devDependencies&quot;: {
    &quot;babel-preset-stage-2&quot;: &quot;^6.22.0&quot;,
    &quot;eslint&quot;: &quot;^3.19.0&quot;,
    &quot;eslint-config-standard&quot;: &quot;^6.2.1&quot;,
    &quot;express&quot;: &quot;^4.14.1&quot;,
    &quot;pug&quot;: &quot;^2.0.0-rc.1&quot;,
    &quot;stylus&quot;: &quot;^0.54.5&quot;,
    &quot;vue-loader&quot;: &quot;^11.3.4&quot;,
    &quot;webpack&quot;: &quot;^2.3.3&quot;,
    &quot;webpack-pwa-manifest&quot;: &quot;^2.1.4&quot;
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">  <span class="hljs-string">"dependencies"</span>: {
    <span class="hljs-attr">"better-scroll"</span>: <span class="hljs-string">"^0.1.15"</span>,
    <span class="hljs-attr">"flexible"</span>: <span class="hljs-string">""</span>,
    <span class="hljs-attr">"animate"</span>: <span class="hljs-string">""</span>,
    <span class="hljs-attr">"axios"</span>: <span class="hljs-string">"^0.16.2"</span>,
    <span class="hljs-attr">"vue"</span>: <span class="hljs-string">"^2.2.6"</span>,
    <span class="hljs-attr">"vue-axios"</span>: <span class="hljs-string">"^2.0.2"</span>,
    <span class="hljs-attr">"vue-router"</span>: <span class="hljs-string">"^2.3.1"</span>,
    <span class="hljs-attr">"vuex"</span>: <span class="hljs-string">"^2.3.1"</span>
  },
  <span class="hljs-string">"devDependencies"</span>: {
    <span class="hljs-attr">"babel-preset-stage-2"</span>: <span class="hljs-string">"^6.22.0"</span>,
    <span class="hljs-attr">"eslint"</span>: <span class="hljs-string">"^3.19.0"</span>,
    <span class="hljs-attr">"eslint-config-standard"</span>: <span class="hljs-string">"^6.2.1"</span>,
    <span class="hljs-attr">"express"</span>: <span class="hljs-string">"^4.14.1"</span>,
    <span class="hljs-attr">"pug"</span>: <span class="hljs-string">"^2.0.0-rc.1"</span>,
    <span class="hljs-attr">"stylus"</span>: <span class="hljs-string">"^0.54.5"</span>,
    <span class="hljs-attr">"vue-loader"</span>: <span class="hljs-string">"^11.3.4"</span>,
    <span class="hljs-attr">"webpack"</span>: <span class="hljs-string">"^2.3.3"</span>,
    <span class="hljs-attr">"webpack-pwa-manifest"</span>: <span class="hljs-string">"^2.1.4"</span>
  }</code></pre>
<h3 id="articleHeader6">3.4 后端</h3>
<p><a href="https://github.com/freeedit/yihang-tieba/tree/master/tieba-server" rel="nofollow noreferrer" target="_blank">freeedit/yihang-tieba/tieba-server</a>  </p>
<p>后端倒是没什么可说的（后端的哥哥姐姐们别生气，我说的是自己写的后端，笑~），无非就是用koa搭了个后台，搞一搞跨域问题（以后如果有时间呢，再弄一个token验证一下），然后用mongoose连一下mongodb，写一写schema，做一下limit、skip、populate之类的分页、关联查询，再加上那一套简单的curd操作，没了。  </p>
<p>哦，对了，我写了一个很扯淡的代理方式。  <br>在应用中的直播那一项，我自己搞不定，不知道怎么做直播，然后又想填补它的空缺。  <br>重要的是，百度贴吧里面弄一个直播...这个...总感觉有点跑题的味道。（这不是发水贴的地方，直播间也能水贴？）  <br>当然，最最重要的还是，自己搞不定直播这个功能。  <br>然后，我就用了个“知道”，来顶替“直播”的位置。（主要是因为，自己经常去贴吧里面搜贴子看，找一些以前别人问过的问题，毕竟有些问题在别的地方找不到答案，或者回答得不好...）  </p>
<p>然后我就需要给用户实时提示，这个地方，我代理的是360问答页面上请求的接口。  <br>最后用户需要获取到相应的信息，这个地方，我代理的是百度知道的页面，然后把页面上的数据抓下来，形成json文件返回给用户。  </p>
<p>恩恩，360问答的实时提示+百度知道的页面信息，这就是传说中的搜索，自己都被自己搞的笑死了，不过还别说，办法虽然有点那啥，但效果还不错诶，至少用来做一个DEMO，足够了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  &quot;dependencies&quot;: {
    &quot;cheerio&quot;: &quot;^1.0.0-rc.1&quot;,
    &quot;iconv-lite&quot;: &quot;^0.4.17&quot;,
    &quot;koa&quot;: &quot;^2.2.0&quot;,
    &quot;koa-router&quot;: &quot;^7.1.1&quot;,
    &quot;koa-static&quot;: &quot;^3.0.0&quot;,
    &quot;md5&quot;: &quot;^2.2.1&quot;,
    &quot;moment&quot;: &quot;^2.18.1&quot;,
    &quot;mongoose&quot;: &quot;^4.9.3&quot;
  },
  &quot;devDependencies&quot;: {
    &quot;cross-env&quot;: &quot;^4.0.0&quot;,
    &quot;nodemon&quot;: &quot;^1.11.0&quot;
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">  <span class="hljs-string">"dependencies"</span>: {
    <span class="hljs-attr">"cheerio"</span>: <span class="hljs-string">"^1.0.0-rc.1"</span>,
    <span class="hljs-attr">"iconv-lite"</span>: <span class="hljs-string">"^0.4.17"</span>,
    <span class="hljs-attr">"koa"</span>: <span class="hljs-string">"^2.2.0"</span>,
    <span class="hljs-attr">"koa-router"</span>: <span class="hljs-string">"^7.1.1"</span>,
    <span class="hljs-attr">"koa-static"</span>: <span class="hljs-string">"^3.0.0"</span>,
    <span class="hljs-attr">"md5"</span>: <span class="hljs-string">"^2.2.1"</span>,
    <span class="hljs-attr">"moment"</span>: <span class="hljs-string">"^2.18.1"</span>,
    <span class="hljs-attr">"mongoose"</span>: <span class="hljs-string">"^4.9.3"</span>
  },
  <span class="hljs-string">"devDependencies"</span>: {
    <span class="hljs-attr">"cross-env"</span>: <span class="hljs-string">"^4.0.0"</span>,
    <span class="hljs-attr">"nodemon"</span>: <span class="hljs-string">"^1.11.0"</span>
  }</code></pre>
<h3 id="articleHeader7">3.5 连接</h3>
<p>其实吧，数据在连接时是最麻烦的了。  <br>因为数据请求需要时间，页面需要等待请求完成，完成之后呢，又得渲染页面，渲染页面的同时呢，又要处理没有数据或数据有问题的情况，而且，这些数据可能还需要存储在vuex中，如果要长期存起来，还要用localStorage或indexDB，贼麻烦。  <br>稍不注意，就会出bug，而且写着写着，脑袋就有点不够用了。当数据的请求在一个页面里面放多了，那不同的请求之间还可能存在关联性，绕来绕去的，自己都不知道自己在干嘛。  </p>
<p>幸好，我提前将每个vue文件都分离开来，成了几个独立的文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="xxx-component
  index.vue      // 组件的入口
  template.pug   // html
  style.styl     // css
  script.js      // script
  data.json      // 组件中使用到的静态数据" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">xxx-component
  index.vue      <span class="hljs-comment">// 组件的入口</span>
  template.pug   <span class="hljs-comment">// html</span>
  style.styl     <span class="hljs-comment">// css</span>
  script.js      <span class="hljs-comment">// script</span>
  data.json      <span class="hljs-comment">// 组件中使用到的静态数据</span></code></pre>
<p>对每个文件的写法，也都做了个模板出来。我每次需要写组件的时候，复制一份模板，改一改就好了。  <br>另外呢，该抽离的地方，我都抽离了，实在是抽不了，或者我搞不定的，就没去动它。  </p>
<p>为了完成这个应用，我连续抽了好几个库文件出来。（readme中有写）   <br>跨域库、indexDB库、常用的功能函数库、mongoose的Promise版curd库  </p>
<p>这些文件最终都被上传到了我的个人工具库中。 详见  <br><a href="https://github.com/freeedit/lib-mini-libs-collection" rel="nofollow noreferrer" target="_blank">freeedit/lib-mini-libs-collection</a>  </p>
<p>项目的文件其实打包后也挺大的（904kb），比较手机耗流量。  <br>为了让项目具有离线存储的能力，减少流量的消耗。  <br>所以我在项目中用webpack插件配了一个manifest.js文件出来，这就要求需要使用Https。  <br>但不知是域名方面还是其他什么原因，即使是在我加了https证书之后，也无法访问https，所以最终就只能暂时用http先替着。  <br>如果浏览器上面显示不安全字样，及浏览器中显示某某WARN信息，那应该就是HTTPS造成的。  </p>
<p>（这个项目没有做SSR优化，一是这个应用没有做的必要，这样会加重服务器的负担，二是自己对这方面不熟，还在起步阶段）  <br>（可能接下来，我需要认认真真全面学习一下SSR和PWA ServiceWorker了）</p>
<hr>
<h2 id="articleHeader8">4. 问题</h2>
<h3 id="articleHeader9">4.1 vue computed</h3>
<p>vue computed中的函数好像不能用async+await（用的时候才发现它会失效），但我当时死脑筋，跳不过去，还是后来在其他地方用定时查询来搞定的。  <br>不知道还有没有什么别的方法，让computed之中能用async异步获取数据。（虽然我明白，这件事情不该由computed来做）</p>
<h3 id="articleHeader10">4.2 mongoose populate</h3>
<p>不知道mongoose的populate()函数中，继续嵌套多个同级的populate，怎么写的。（populate的地方之中，又有多个需要populate的地方）  </p>
<p>比如获取文章，然后呢需要populate('floor')，在floor之中，又需要populate('ff')和populate commit数组每一个对象中的一个叫uid的属性。不知道该怎么写，求问。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const postSchema = new Schema({
  bar: {
    type: Schema.ObjectId,
    ref: 'bar',
    index: true
  }
  lz: {
    type: Schema.ObjectId,
    required: true,
    ref: 'user',
    index: true
  }
  floor: [{
    type: Schema.ObjectId,
    ref: 'floor',
    index: true
  }]
})

const floorSchema = new Schema({
  ff: {
    type: Schema.ObjectId,
    required: true,
    ref: 'user'
  },
  commit: [{
    uid: {
      type: Schema.ObjectId,
      ref: 'user',
    }
  }]
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> postSchema = <span class="hljs-keyword">new</span> Schema({
  <span class="hljs-attr">bar</span>: {
    <span class="hljs-attr">type</span>: Schema.ObjectId,
    <span class="hljs-attr">ref</span>: <span class="hljs-string">'bar'</span>,
    <span class="hljs-attr">index</span>: <span class="hljs-literal">true</span>
  }
  lz: {
    <span class="hljs-attr">type</span>: Schema.ObjectId,
    <span class="hljs-attr">required</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">ref</span>: <span class="hljs-string">'user'</span>,
    <span class="hljs-attr">index</span>: <span class="hljs-literal">true</span>
  }
  floor: [{
    <span class="hljs-attr">type</span>: Schema.ObjectId,
    <span class="hljs-attr">ref</span>: <span class="hljs-string">'floor'</span>,
    <span class="hljs-attr">index</span>: <span class="hljs-literal">true</span>
  }]
})

<span class="hljs-keyword">const</span> floorSchema = <span class="hljs-keyword">new</span> Schema({
  <span class="hljs-attr">ff</span>: {
    <span class="hljs-attr">type</span>: Schema.ObjectId,
    <span class="hljs-attr">required</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">ref</span>: <span class="hljs-string">'user'</span>
  },
  <span class="hljs-attr">commit</span>: [{
    <span class="hljs-attr">uid</span>: {
      <span class="hljs-attr">type</span>: Schema.ObjectId,
      <span class="hljs-attr">ref</span>: <span class="hljs-string">'user'</span>,
    }
  }]
})</code></pre>
<p>...<br>还有好几个问题，一时之间想不起来了。  <br>有知道的哥哥姐姐们，替我解一解。</p>
<h2 id="articleHeader11">5. 结束语</h2>
<h3 id="articleHeader12">5.1 幻想</h3>
<p>学软件三年，从电脑打字开始，到影视后期处理，再到游戏编程，最后...我选择了前端作为自己的长期学习目标。  <br>因为，我看到了前端的未来。  <br>现在的网页，已经在逐渐向app转型了，真的很希望有一天，看到它取代桌面的样子。  <br>当我们的桌面本身就是一个浏览器的时候，输入任何命令，都能从网络上获取到我想要的东西。我们不需要再去装WPS、迅雷应用了，因为它们已经变成了网页。  <br>当我们打开这些网页的时候，长的和本地应用一样。而且它们也能像应用一样，被我们安装在电脑上，页面外没有浏览器外壳，桌面最下端也没有什么开始按钮，只有一个搜索框，简单到了极点，这该是多么的棒啊。  <br>我想，这就是我希望的未来前端。而且前端已经在向这方向靠拢了，我想要为它的发展出一份力。</p>
<h3 id="articleHeader13">5.2 庆幸</h3>
<p>很庆幸，自己没有一来就学习前端。  <br>最开始，我是奔后期处理去的，也就是PS、AI、AU、AE、MAYA、ZBrush那一套。  <br>这也算是培养了自己的设计美感（哈哈~歪路子美感）。  <br>可能很多人觉得，几个小图标，一张PSD图，没什么好设计的，照着做都可以做出来的，但如果没有别人的作为参考，就很不容易了。（特别是要融情于“景”）  <br>而且，PS的很多概念，和HTML+CSS的布局概念很像，图层、蒙版、背景阴影、渐变、打组，等等这些，都与HTML+CSS不谋而合，就像是天生为它们设计的。  <br>就是因为早期形成了某些说不出来的概念，所以才能在这个作品中，尝试着把设计的空缺给补上。</p>
<h3 id="articleHeader14">5.3 总结</h3>
<p>在做这个项目的时候，我体会到了大项目的来之不易。  <br>知易行难，即使是一个看上去并不复杂的应用，要真的做好，也并不是一件简单的事。  <br>尝试去做的项目越大，就越觉得自己了解得过于泛泛。  <br>想要做得精细，还是得需要时间不断地去琢磨。</p>
<hr>
<p>原文地址：<a href="http://blog.freeedit.cn/2017/06/12/Yihang-Tieba-Introduction/" rel="nofollow noreferrer" target="_blank">http://blog.freeedit.cn/2017/06/12/Yihang-Tieba-Introduction/</a></p>
<p><a href="http://blog.freeedit.cn/about/" rel="nofollow noreferrer" target="_blank">易杭 : http://blog.freeedit.cn/about/</a> 2017/6/12 10:07 8906字</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
太急了点吧？贴吧PWA20天就出炉了

## 原文链接
[https://segmentfault.com/a/1190000009824424](https://segmentfault.com/a/1190000009824424)

