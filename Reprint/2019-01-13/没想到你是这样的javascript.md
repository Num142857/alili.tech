---
title: '没想到你是这样的javascript' 
date: 2019-01-13 2:30:11
hidden: true
slug: kjm9c25i04
categories: [reprint]
---

{{< raw >}}

                    
<p>前几天有同学问我，老师我们公司的产品是一个web app公司用的是jquery,我感觉学不到东西，是不是手机端用</p>
<p>jquery不太好啊？当时我的心情是这样的：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009604506?w=436&amp;h=343" src="https://static.alili.tech/img/remote/1460000009604506?w=436&amp;h=343" alt="1.png" title="1.png" style="cursor: pointer; display: inline;"></span></p>
<p>然后我跟说手机端用jquery不太合适，比较臃肿，然后开发也不太适合手机端，你可以试试React。</p>
<p>学生：是这样的老师我要用一个app然后能够单页面切换，从后台拉取数据，然后前端操作数据和提交数据，react能搞定吗。</p>
<p>我：能啊。</p>
<p>学生：嗯，react挺不错的，对了老师react是啥，我听过一直不知道是啥东西，也不知道怎么学？</p>
<p>当时我的心情是这样婶儿的：<br><span class="img-wrap"><img data-src="/img/remote/1460000009604507?w=430&amp;h=355" src="https://static.alili.tech/img/remote/1460000009604507?w=430&amp;h=355" alt="2.png" title="2.png" style="cursor: pointer; display: inline;"></span></p>
<p>我：咱们在第xx天讲的xxx例子，我怎么可能没讲过嘛？</p>
<p>学生：对我想起来了，老师是讲过，老师我把你交给我的都还给你了，啥时候把学费还给我。</p>
<p>我：<br><span class="img-wrap"><img data-src="/img/remote/1460000009604508?w=315&amp;h=300" src="https://static.alili.tech/img/remote/1460000009604508?w=315&amp;h=300" alt="滚.jpg" title="滚.jpg" style="cursor: pointer; display: inline;"></span></p>
<p>以后不管啥一定要说老师讲过但是我忘了，还有你说什么的时候别特么都在末尾加上一句我们老师就是这么说的。内是鲁迅说的，我特么的啥都没说过。</p>
<p>学生：好吧，知道了老师，对了啥是react啊……</p>
<p>我：react是facebook家的一个框架，使用JSX语法。</p>
<p>学生：对，面试的时候内人就问我来着，老师啥是JSX。</p>
<p>我：你可以粗略的理解为JSX就是javascript或者是javascript的增强版。</p>
<p>学生：那老师是不是我原生的js就不能用了啊。</p>
<p>我：能用，不过它用的是ES6,你得用babel编译。</p>
<p>学生：啥是babel.</p>
<p>我：babel就是把 ES6编译成ES5的工具。</p>
<p>学生：老师啥是ES6啊？</p>
<p>我：es6就是es6的下一个版本。</p>
<p>学生：跟没说一样。</p>
<p>我：你就记住es5是javascript兼容版本，es6不兼容就行了。</p>
<p>学生：不兼容咋弄？</p>
<p>我：用babel!!!!</p>
<p>学生：怎么用？</p>
<p>我：你可以独立安装不过更多时候你可以用webpack集成安装。</p>
<p>学生：内个，老师我可以不可以再问一个问题？</p>
<p>我：好吧，你可以问下一个问题了。</p>
<p>学生：谢谢老师，webpack是啥？</p>
<p>我：你可以简单理解成打包工具，ES6转换和typescript的转成js很多公司用它。</p>
<p>学生：老师我知道了，我知道ts是不是写angular那个东西？</p>
<p>我：是写an2以后版本的语言。</p>
<p>学生：typescript是js吗？</p>
<p>我：typescript编译成js，但是本身不是js，比js更强大。你可以理解为javascript是孙悟空，而typescript就是超级赛亚人。</p>
<p>学生：我擦嘞，老师我不看龙珠。</p>
<p>我：你就记住ts在开发大型程序的时候岂止是牛逼，简直是牛逼就行了，an2就是这货写的。</p>
<p>学生：老师angular不是到4了吗？</p>
<p>我：嗯，angular的更新速度都快赶上大姨妈了。</p>
<p>学生：内个老师，其实我只想切个网页，用ajax请求数据，为啥我感觉越学东西越多，我学的速度还没有人家出框架的速度快，另外各种名词</p>
<p>我到底学啥啊？</p>
<p>我：在你眼里是不是javascript 的各种东西很多很复杂搅在一起，看起来都挺熟又都不太熟。是不是这个样子？<br><span class="img-wrap"><img data-src="/img/remote/1460000009604509?w=500&amp;h=400" src="https://static.alili.tech/img/remote/1460000009604509?w=500&amp;h=400" alt="女优.jpg" title="女优.jpg" style="cursor: pointer;"></span></p>
<p>不好意思发错了，是这个<br><span class="img-wrap"><img data-src="/img/remote/1460000009604510?w=800&amp;h=640" src="https://static.alili.tech/img/remote/1460000009604510?w=800&amp;h=640" alt="各种框架.png" title="各种框架.png" style="cursor: pointer;"></span></p>
<p>看到这张图你脑子里是不是就两个不会的？<br><span class="img-wrap"><img data-src="/img/remote/1460000009604511?w=225&amp;h=225" src="https://static.alili.tech/img/remote/1460000009604511?w=225&amp;h=225" alt="这也不会.jpg" title="这也不会.jpg" style="cursor: pointer;"></span></p>
<p>学生：恩恩，老师你快给我讲讲吧，感觉我学的还没框架出的快呢。</p>
<p>===================华丽丽的分割线==================</p>
<p>以上的情况听起来像是个笑话，确实好多同学的典型问题总结出来的。</p>
<p><strong>简单的说就一句话，落后的学习生产力和日益增长的公司需求之间的矛盾。</strong></p>
<p>首先，我想先给大家捋顺JS的学习脉络，然后说下学习方法。</p>
<p>学习脉络是酱紫的，</p>
<p>画的很清楚了，请自觉忽略我家的地毯。</p>
<p>下面说下具体的乱七八糟的各种单词。</p>
<p><strong>第一类是装13语言类：</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009604512?w=184&amp;h=200" src="https://static.alili.tech/img/remote/1460000009604512?w=184&amp;h=200" alt="语言.jpg" title="语言.jpg" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ES5,ES6,ES7, ECMAScript2015 ,Typescript,JSX" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code style="word-break: break-word; white-space: initial;">ES5,ES6,ES7, ECMAScript2015 ,Typescript,JSX</code></pre>
<p>JS版本很多，另外不同的苦可能自己搞语法，你只要知道ES5-7的历史和当前发展，还有哪个框架用哪个语法就行了，全当谈资，不知道也没事，但是不知道显得你土包子。就像你可以不知道吉泽明步，但是你的一定得知道苍老师一样。不然没法沟通。就像人家说东京很热，你说是么，北京更热，这样会没有朋友的。</p>
<p><strong>第二类 继续装B偶尔有用-编译工具类</strong></p>
<p>这种工具就像杜蕾斯，平常不用，真用上了还真着急。啥意思，没事拿着一盒冈本摆弄跟你说我去这个是超薄的，不是神经病就是装逼客。编译工具也如此，没事摆弄那些</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="babel,traceur.js,npm,browserify,webpack,systemjs,gulp" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">babel,traceur<span class="hljs-selector-class">.js</span>,npm,browserify,webpack,systemjs,gulp</code></pre>
<p>一张嘴就是 lts版本的，肯定是没正事儿干的，当然我的意思是你必须了解比如安装了，配置一个项目能跑起来，能够搞一个工作流就行了。这就好比你得会拆包装，别用反了，咳咳不说了……研究webpack太多的跟研究润滑剂类型有哪些的一样，多半是变态。</p>
<p><strong>第三类是女朋友型 - 框架</strong></p>
<p>我们可以有多个女性朋友，但是只能有一个女朋友。多个女性朋友能够让我们生活更丰富多彩，但是一个女朋友才能陪你走一生。框架和开发者的关系是一样的。</p>
<p>你不要整天追着所有的框架跑，比如</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="angular react vue jquery loadash" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">angular react vue jquery loadash</span></code></pre>
<p>等等，选好一个好好搞就行了，搞到让你感觉爽为止。啥叫感觉爽，至少你拿着这个框架去大部分招聘使用这个框架的公司能够让你顺利入职。就行了。有人说握草，老师万一我选的的是一个快被淘汰的框架咋弄，两件事，第一你眼光不行，跟你怎么跟别人过日子是两个问题。第二，如果你真的用心去学了，你很快就会了解这个框架的客观方方面面，你也就决定是否适合你继续学还是换了，你明明知道她是一个S，你非要当一个M，还说她不够温柔，不是人家性格有问题，是你有病好吗</p>
<p><strong>第四类 丈母娘类型 - 后台js，原生应用js和其它环境js</strong></p>
<p>这类型的js包含，</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="nodejs weex  react native phoneGap  hbuilder easyui mui" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code style="word-break: break-word; white-space: initial;">nodejs weex  react <span class="hljs-keyword">native</span> phoneGap  hbuilder easyui mui</code></pre>
<p>等等，很多要求前端会这些的公司大部分原因有两个，一个是因为公司想省钱，让前端干很多其它的活儿，第二是公司后台人员用这些。很多人想学这些技术，我问他前端你会吗？基本上得到的结论都是二把刀。你自己都填补饱肚子，整天开车去送丈母娘跳广场舞你觉得合适么？如果你前端学的老牛逼想控制更多的技术环节了没问题，如果前端学的渣渣儿，那你还是老老实实搬砖吧。这些技术为了工作顺利进行，你得知道，但是别陷进去。</p>
<p><strong>最后说下怎么学，顺便告诉你怎么搞定你女朋友他妈</strong></p>
<p>很多人觉得各个框架都得会，我问他为什么，他说现在公司招聘都是这么要求的，HR面试就爱问这些。我总是建议他们</p>
<p><strong>先学好原生JS,再挑一个自己喜欢的框架深入研究</strong></p>
<p>人家问你框架确实是因为公司需要，但是如果你基础扎实，你就是回答我用过类似的某某，翻书研究一个星期差不多就可以上手了，实在不行我就用原生写一个，基本上HR就不会难为了，当然是你真的原生有足够的的底气这么说。不要被表象迷惑。HR不满意你的不是你某个框架不会用，而是你JS水平不行。</p>
<p>JS不等于框架。</p>
<p>尼古拉斯·屌·大彬哥名言来了，记住，<strong>凡是嫌你矮的丈母娘她并不是嫌你矮，多半是因为你穷！</strong></p>
<p>JS就相当于前，而框架就相当于车。HR就相当于丈母娘。面试就是去见丈母娘。</p>
<p>你身价两亿好几个公司，开着一个破夏利去见她，她心里想这个小伙子不错，有钱还节俭，重点是为人稳重低调。</p>
<p>你一个月1800，开了一辆破夏利去见她，她心里想这个小伙子不行啊，没钱还抠门，哪里整的二手破夏利。</p>
<p>学好js，换辆车（这里的车只框架）很容易，不爽了你换个丈母娘（公司）都不是啥事儿。</p>
<p>最后一句，JS大法好，信彬哥，得永生。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
没想到你是这样的javascript

## 原文链接
[https://segmentfault.com/a/1190000009604541](https://segmentfault.com/a/1190000009604541)

