---
title: 'FEDAY2016之旅' 
date: 2019-02-12 2:30:12
hidden: true
slug: gzkjtrjhqvg
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="http://7xqy7v.com1.z0.glb.clouddn.com/colorful/blog/feday2.png" src="https://static.alili.techhttp://7xqy7v.com1.z0.glb.clouddn.com/colorful/blog/feday2.png" alt="FEDAY2016" title="FEDAY2016" style="cursor: pointer;"></span></p>
<h3 id="articleHeader0">前戏</h3>
<p>2016/3/21 补上参会的完整记录，这个问题从一开始我就是准备“自问自答”的，希望可以通过这种形式把大会的干货分享给更多人。</p>
<h3 id="articleHeader1">出发/到达</h3>
<p>我跟同事周周是周六凌晨1点才到的广州，住的地方在小区里面，路过楼下的时候看到一家还在营业的啤酒吧，很有Feel，但是此时的精神状态直接把我们送到了房间里，洗完澡之后就碎觉了，准备次日集中精神好好听讲。</p>
<h3 id="articleHeader2">初到会场</h3>
<p>次日，我们穿个马路就来到了本次feday大会的现场。然后是标准的签到，拿“大礼包“，参会证等流程，经常参加大会的同学应该很熟悉了，由于我之前参加过d2，觉得阿里报告厅的屏幕已经很震撼了，没想到，第一次在电影院参加技术大会真的有种赶老罗发布会的感觉：</p>
<p><span class="img-wrap"><img data-src="http://7xqy7v.com1.z0.glb.clouddn.com/colorful/blog/feday1.png" src="https://static.alili.techhttp://7xqy7v.com1.z0.glb.clouddn.com/colorful/blog/feday1.png" alt="大会现场" title="大会现场" style="cursor: pointer;"></span></p>
<p>此次的嘉宾阵容：</p>
<p>好了，进入正题，以下内容既是记录，又是自己的看法和总结，然后形式均为我认为的精华内容整理，完整的内容我觉得没必要赘述，因为大会官网会放出完整的视频。</p>
<h3 id="articleHeader3">Stepan From Facebook - 用Node.js+React.js打造通用应用</h3>
<p>来参加feday前看到本次大会的主题，当我看到同构话题的时候比较兴奋，因为之前负责的我厂一个全站消息中心改造项目，我和搭档有实践同构并为之落地，而且该项目已经上线，所以还是比较清楚同构的作用以及使用场景，而且在厂内也做了相关分享，所以想看看大会上能不能碰撞出一点不一样的火花。</p>
<p>Stepan的演讲精华我觉得可以精简整理为如下几点：</p>
<p>原来用RoR(其实这里泛指后端)做的事情现在都可以用Javascript做，好处是可以前后端复用代码，符合同构的基本条件，然后他通过一个目录结构对比演示指出了同构应用中需要解决的三个事情：渲染/路由/数据（我是这么理解的，因为我认为这确实是同构落地的关键）</p>
<p>对于渲染，他先列举了一个非常简单的例子，我认为他要表达的意思是：渲染的本质其实就是模版+数据，例如:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function template(data){ return '<body>${data}</body>'; }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">template</span>(<span class="hljs-params">data</span>)</span>{ <span class="hljs-keyword">return</span> <span class="hljs-string">'&lt;body&gt;${data}&lt;/body&gt;'</span>; }</code></pre>
<p>这个函数可以在server端直接将数据扔给res.send，也可以用在client端用来生成真实的dom；但我们的应用往往是复杂的，React(Facebook的工程师肯定是要来安利React的)的renderToString方法可以帮助我们完成Server-Side Rendering，因为React的vdom不需要依赖浏览器侧的环境，这是React支持服务端渲染的唯一一个方法，好多同学已经知道了，讲到这里，作为一名Facebook工程师，他成功地为本次大会率先安利了一把React</p>
<p>对于路由，他基本上直接安利了React-Router，然后贴出了跟React-Router官方文档几乎一样的代码，所以，折腾过的同学基本可以略过这个环节，但其实很多同学应该知道，路由共享是同构的重要部分，其实这里的坑还是蛮多的，其中还包括React-Router自身的bug，我在项目里的做法是将这块逻辑以中间件的形式进行处理。</p>
<p>对于数据，不管你有没有用flux，都要解决初始化数据的问题，因为两端共用一份render逻辑，在后端直出的时候，需要将后端得到的数据同步给前端，否则，前端二次render，会得到不正确的渲染输出，这个相信玩过React后端直出的应该也知道，解决方案几乎都是一致的，说到底就是通过:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.__STORE__ = {}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">window</span>.__STORE__ = {}</code></pre>
<p>将数据带给前端。你会发现其他封装好的第三方同构库ISO等最终用的都是这个逻辑。</p>
<p>关于组件拉取数据，他安利了isomorphic-fetch，这样前后端可以共享一份拉取数据的逻辑，对于组件数据在server端的初始化，他的处理方式是，server.js：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async function fetchAllData(props) {
  return Promise.all(
    props
      .components
      .filter(x => x.fetchData) // 探测组件是否有fetchData方法
      .(x => x.fetchData(props))
  );
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fetchAllData</span>(<span class="hljs-params">props</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.all(
    props
      .components
      .filter(<span class="hljs-function"><span class="hljs-params">x</span> =&gt;</span> x.fetchData) <span class="hljs-comment">// 探测组件是否有fetchData方法</span>
      .(<span class="hljs-function"><span class="hljs-params">x</span> =&gt;</span> x.fetchData(props))
  );
}</code></pre>
<p>这里的props可以传入React-Router中match方法返回的上下文，由于我们的业务只直出了部分组件数据，所以这里的做法有所不同，我的做法是将ISO逻辑置入中间件，当中间件匹配到路由后，将利用yield next转交给下一个中间件先拉取数据，然后将数据放入locals中，等到执行到ISO中间件时，中间件将locals中的数据拿出，初始化给React-Router匹配到的组件上下文，最后renderToString<br>React＋Node.js打造通用应用的折腾过程中其实只要解决这关键的三点，差不多就可以打造出一个同构应用了，但是他还没有提到的还有：</p>
<ul>
<li><p>因为前后端共用一份代码，如果client.js中包含require('fastclick')之类的只在浏览器才会依赖的组件引入代码时，我们需要做好环境判断，当然，这非常简单，但是不得不考虑</p></li>
<li><p>如果前端项目中的jsx用的是es6 modules，但是server端用的是require，则需要考虑统一</p></li>
<li><p>同构项目的工程化问题</p></li>
<li><p>......</p></li>
</ul>
<p>最后，我在星巴克逛Stepan博客的时候发现他的博客就是同构的，很有趣，大家可以体验一下：</p>
<p><span class="img-wrap"><img data-src="http://7xqy7v.com1.z0.glb.clouddn.com/colorful/blog/stepan1.png" src="https://static.alili.techhttp://7xqy7v.com1.z0.glb.clouddn.com/colorful/blog/stepan1.png" alt="stepan's blog" title="stepan's blog" style="cursor: pointer;"></span></p>
<p><a href="http://www.stepanp.com/" rel="nofollow noreferrer" target="_blank">Stepan's Blog</a></p>
<h3 id="articleHeader4">江剑峰 微信开发过程中的最佳实践</h3>
<p>剑锋幽默风趣的讲演风格显然非常接地气，这个话题从一开始就吸引住了全场的开发者，因为有太多开发者曾经被微信坑过，这个分享我直奔干货总结了：</p>
<ul>
<li><p>JS-SDK签名过程中提交的URL参数中不得带"#"及后面部分的内容，会导致签名报错</p></li>
<li><p>异步获取签名的时候，要设置正确的Content-Type</p></li>
<li><p>清缓存黑科技：//triggerWebViewCacheCleanup</p></li>
<li><p>flex部分支持</p></li>
<li><p>微信真的没有动过你的localStorage/Cookie，可能原因是进程被杀等</p></li>
</ul>
<p><strong>等等，快后退，我要装逼了：</strong></p>
<blockquote><p>到3月份底，微信x5将全面升级为blink内核，并全网灰度发放完毕，也就说，我们即将可以大胆写flex了，并再也不担心缓存问题了，动画卡顿问题也会得到改善，大家赶紧验证去吧。</p></blockquote>
<h3 id="articleHeader5">黄士旗－ React Tips</h3>
<p>士旗也是来自Facebook的工程师，讲的也是React，总结下来就是：士旗在教大家如何正确使用React：</p>
<ul>
<li><p>容器组件的存在是为了让它可以专注于数据处理，然后让渲染组件专心负责渲染，只需要管扔进来的是什么数据然后渲染就可以了，这样处理后，我们会发现component的代码将变得非常复杂，当我们要管理的state太多之后，所以就有了flux store，但是flux的实现中有不必要的实现，对于应用来说，一个action，一个state就可以返回一个新的state，这完全就是pure function就可以搞定的事情，于是有了redux store</p></li>
<li><p>将组件拆分，用更好的pure function来返回你需要渲染的这些组件，这样可以利用decorator/HOC来达到组件复用，还可以减少组件中大量的_XXX私有方法，让应用程序变得更加可控，debug变得更容易，其实这块还是能够产生很多共鸣的，相信各厂都在实践一些营销页面快速产出的技术方案，React应该是比较合适的技术选型，可以利用decorator达到组件的高度复用</p></li>
<li><p>善用FP，RxJS。士旗在这里安利了一把learnRX项目（GitHub - ReactiveX/learnrx: A series of interactive exercises for learning Microsoft's Reactive Extensions Library for Javascript.），FP跟RxJS本质上是两个东西，只是RxJS中有用到FP的思想，编程思维的转变我认为是需要训练和下功夫的，因为习惯思维非常可怕，我有看过RxJS，这种“一切皆Stream”的咒语一开始令人非常困惑，但豁然开朗后简直仿佛像是看到另外一个世界，这方面，士旗主要强调，我们要善用Array的map/reduce/filter，FP可以让代码变的简洁，FP的“语义化“方法名可以帮助提升代码可读性。</p></li>
</ul>
<h3 id="articleHeader6">陈子舜－下一代web技术可以运用的点</h3>
<p>子舜的话题中讲到了很多务实的，腾讯正在实践的一些技术：</p>
<ul>
<li><p>包括离线化，包括对前端性能的不断优化<br>之前在阿里d2听过腾讯工程师分享过Node.js加速Qzone的一些细节，离线化这块有领略过腾讯对于追求产品极致用户体验的那种态度，我厂也正在慢慢实践，并且落地了一些初步工作，我们意识到无线端的离线化意义重大。</p></li>
<li><p>然后他讲了ServiceWorker，http2，这里可以到时候看大会放出的视频</p></li>
<li><p>子舜这里还提到了运营商劫持的问题，然后安利了HTTPDNS</p></li>
</ul>
<blockquote><p>中间有一次圆桌，HAX主持，主要是一些撕逼，没有啥实质内容，而且我对于有同学问出：［你们怎么看待RN的出现扰乱了原生开发和web开发之间的那种和谐］这种问题感到纳闷。</p></blockquote>
<h3 id="articleHeader7">winter - 如何成为更好的前端</h3>
<p>第一次见到winter大神本尊，我佩服和尊敬这样的前辈，但是我会保持风度和拒绝浮躁，winter的分享虽然不是技术内容分享，但他分享了他在学习前端过程中的一些他认为的好方法，我觉得现场好多前端工程师应该是可以跟他产生共鸣的：</p>
<ul>
<li><p>比如，我们都干过console.dir(window)这种事情吧，然后看到陌生的api，赶紧去学习一下，给自己充充电</p></li>
<li><p>追求真理的态度，建立自己的知识体系，用权威推翻自己认为的甚至是社区认为的那些权威，比如他提到闭包，通过Google学术找到出处论文（追本溯源），然后推翻自己之前的那些认知</p></li>
<li><p>他认为要成为专业的前端工程师，20%靠的是知识，另外80%靠的是编码能力，工程能力，架构能力，后者可能需要的就是工作经验，然后不断练习，然后winter感慨，他自己成长最快的那几年都是在学校里，到了工作之后就很少有这样的机会快速成长，即使工作多年，但是发现自己的进步缓慢</p></li>
</ul>
<h3 id="articleHeader8">Holger Bartel - http/2时代的web性能</h3>
<p>因为之前读过几篇关于http/2的博文，对http/2还是有所了解的，这个话题我没有听完，后来有事情就先走了，听了前面3/4场，这部分大家可以阅读相关博客弥补，我可以安利几篇：</p>
<ul>
<li><p><a href="https://link.zhihu.com/?target=http%3A//www.alloyteam.com/2015/03/http2-0-di-qi-miao-ri-chang/" rel="nofollow noreferrer" target="_blank">HTTP2.0的奇妙日常</a></p></li>
<li><p><a href="https://link.zhihu.com/?target=http%3A//aotu.io/notes/2016/03/17/http2-char/%3Fo2src%3Djuejin%26o2layout%3Dcompat" rel="nofollow noreferrer" target="_blank">前端开发与 HTTP/2 的羁绊——安利篇</a></p></li>
</ul>
<h3 id="articleHeader9">结束篇</h3>
<p>说个题外话，QCON貌似也临近了，据我了解，今年qcon对前端话题的范围基本也是限制在下一代web技术，再回过头来看本次的FEDAY，我觉得从嘉宾到议题还是符合时代气息的。希望下次越办越好，很开心的是在回来的前一天晚上，在楼下的那个啤酒吧里遇到了stepan，holger，士旗，裕波等人，跟stepan和holger面对面交流了相关主题，真可谓不虚此行，满足之余，在知乎上，博客上同步以上所有内容给大家，谢谢。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
FEDAY2016之旅

## 原文链接
[https://segmentfault.com/a/1190000004658473](https://segmentfault.com/a/1190000004658473)

