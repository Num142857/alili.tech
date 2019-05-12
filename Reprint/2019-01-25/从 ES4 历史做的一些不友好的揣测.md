---
title: '从 ES4 历史做的一些不友好的揣测' 
date: 2019-01-25 2:30:23
hidden: true
slug: ywbeq5tee5h
categories: [reprint]
---

{{< raw >}}

                    
<p>忙起来都只能半夜刷自己的文章了. 今天被一篇文章惊到了, 所以想把感想快点写出来.<br>不管格式了, 赶紧刷完睡觉. 事情的起因是一篇文章:<br><a href="https://auth0.com/blog/the-real-story-behind-es4/" rel="nofollow noreferrer" target="_blank">The Real Story Behind ECMAScript 4</a></p>
<p>ES6 大家都熟悉, ES5 大家都会写, 没什么好说的, ES4 很多人都不熟悉.<br>我从 2010 开始接触 JavaScript, 那时候也不知道 ES 几, 直接就学了,<br>后来渐渐知道 ES5, 然后又出来 ES6, 现在已经 2017 来了.<br>ES4 还是有次在民工叔叔写的东西里看到的, 忘了是 GitHub 还是微博,<br>当时大概知道一点 ES4 加了很多神奇的高级功能, ES6 只是逆袭而已.</p>
<p>至于今天看到的细节, 夸张一点可以说震惊了, 虽然也没啥, 还搜到两篇文章:<br><a href="http://ncannasse.fr/blog/ecmascript_4_and_the_web?lang=en" rel="nofollow noreferrer" target="_blank">ECMAScript 4 and the web</a><br><a href="http://blog.gskinner.com/archives/2008/08/javascript_stal.html" rel="nofollow noreferrer" target="_blank">JavaScript Stalled, AS3 Orphaned – Microsoft to Blame?</a><br><a href="http://rednaxelafx.iteye.com/blog/163717" rel="nofollow noreferrer" target="_blank">ECMAScript 4的一些引用资料/杂记</a><br>开头那篇文章讲得很细, 我没时间详细读, 只是刷了一个大概,<br>综合几篇文章看下来, 大致的脉络是有一点了, 后面细节有错的心请参考原文...</p>
<p>大致在 ES3 完成以后, Netscape 打算开始做 ES4 扩展平台的能力,<br>当时的 Flash 还没出来, Macromedia 还在做那个流媒体, 嵌入在浏览器了,<br>Microsoft 应该已经是 80% 的市场占有率了, 同时 C# 等语言正在红红火火,<br>这时候 ES4 早期的标准据说新功能蛮厉害, 包括 Macromedia 也很支持,<br>那个时候 ActionScript 的前身似乎已经有了, 而且后来功能加得很厉害.<br>总之就是 Netscape 想做, Macromedia 大力支持, 而且使劲在推.</p>
<p>这事情 Microsoft 看上去并不开心, 总之是反对新功能, 希望兼容为主,<br>Microsoft 当时是 TC39 的主要成员, 而且反对, 那么这个事情就搞不下来了,<br>拖了几年以后 Brendan Eich 试着指定规范强推, 好像也没效果,<br>总之到后来 ES4 就废了, 搞出来个 ES3.1 , 也就成了后来的 ES5.<br>至少从文章的情绪看, 就是不符合微软的利益, 所以就拖着, 硬生生搞黄了.<br>后来 Netscape 没了出现了 Mozilla, Macromedia 被 Adobe 买了, 之类的.</p>
<p>至于 ES4 到底有什么功能, 好像基本上淡出了视野, Google 上的网址也访问不到,<br>现在看到的几个文章, 展示了一下, 大概的意思就是现在 TypeScript 的功能在那就有了:<br><a href="https://medium.com/@Pier/ecmascript-4-was-too-ahead-of-its-time-799e59232db0#.r7nzby9fv" rel="nofollow noreferrer" target="_blank">EcmaScript 4 was too far ahead of its time</a><br><a href="http://ejohn.org/blog/ecmascript-harmony/" rel="nofollow noreferrer" target="_blank">ECMAScript Harmony</a><br><a href="http://www.moock.org/lectures/newInECMAScript4/" rel="nofollow noreferrer" target="_blank">summary of proposed ECMAScript 4.0 features not already in ActionScript 3.0</a><br>大致有 class, component, constant, non-nullable, type, AOT...(可能不准确),<br>没有经历过当年, 只能推测, 但是多少能感受到如此多功能有多夸张.</p>
<p>后面的事情我们相对熟悉一点, 2008 年 Chrome 发布, 拉开了新一轮的大战,<br>Flash 被 Apple 下手绞杀, Mozilla 跟 Chrome 也算是补刀吧,<br>今天还用 Flash 简直被视为古董了, 当然也跟移动设备耗电有关.<br>而且现在看, Chrome 占了最大的市场份额, IE 也被 Edge 逐渐替换.<br>至于 ES 标准呢, ES6 吵了那么久, Facebook 一个 Babel 刷遍了前端圈.<br>接下来还有 ES201x, TypeScript, Facebook 还在酝酿 ReasonML.</p>
<p>说起来 Compile to JavaScript 也是那个时候开始的, CoffeeScript 2009 发布.<br>Haxe 语言更早, 2005 年就开始 Compile to JavaScript,<br>那个 Compile to JavaScript 语言的列表看到过的人应该都是印象深刻的:<br><a href="https://github.com/jashkenas/coffee-script/wiki/List-of-languages-that-compile-to-JS" rel="nofollow noreferrer" target="_blank">https://github.com/jashkenas/...</a><br>有些人真的是非常认真在作者 altjs 语言的事情, 比如 ClojureScript, BuckleScript,<br>js 有问题本身没什么问题了, 但是怎么修正, 感觉就像是炸了锅一样.</p>
<p>我之前一再夸大 WebAssembly 这个事情的战略意义, 但好像也没怎么夸大,<br>从 Twitter 上捕捉到情绪来看, 前天刚宣布 stable, Twitter 搜索结果就上百,<br>我没有经验真的很难预测接下来会不会发生什么不可理喻的事情,<br>之前猜测的一种可能性是 WebAssembly 成熟之后, JavaScript 提供方马上会大动作,<br>Dart, TypeScript, ReasonML, 这些都有着相当巨大的可能性,<br>当然这个事情很难讲, 我心里是有点害怕的. 但多多少少有点幸灾乐祸的感觉.</p>
<p>说完了再回到 PWA 跟 Weex 这边的事情, 放进长长的历史里边, 也不算大事情了,<br>Service Worker 相当于扩展了浏览器的后台进程, 给了相当大的权限,<br>而 Weex 近似于实现了一个为移动端定义的简化版的浏览器, 加入战斗了,<br>而且我这几天突然想起来国产浏览器在移动端的份额也真是大得有点出乎意料,<br>至少争夺入口争夺流量的战争从未停止, 从操作系统蔓延到浏览器, 蔓延到浏览器插件, 蔓延到手机, 蔓延到手机浏览器, 蔓延到手机 App 里的 WebView...<br>说了那么久前端技术迭代巨快, 这说法也应该改改了...</p>
<p>作为一个开发者, 作为一个开发者, 我觉得是应该机警一点了, 甚至警惕一下,<br>虽然某种程度上是我忙了一天到了半夜精神紧张, 开始胡思乱想,<br>但是, 考虑下接下来浏览器大战继续加剧的可能性, 是不是会对我们的工作造成影响?<br>前面 js 的各种坑, 从 CoffeeScript 折腾到 Babel, 折腾到 TypeScript, 还没折腾完,<br>你可以说为了新技术而欢欣鼓舞, 但是考虑下做技术精力膨胀恐怕一般人也就十多年吧,<br>十多年当中花那么多时间折腾 Babel 的编译配置, 折腾 <code>===</code> 烦不烦, 合算么?!<br>我们当中那么多人学编程就是为的做出漂亮的网站或者手机应用, 跟技术新不新本来也不完全是一回事..<br>但回过头来说, 我们这群人是不是足够聪明能避免再次走进弯路了, 比如从 ES4 到 ES6.</p>
<p>当然,,, 总体上说我的信息到底是片面的, 看到 ES4 这段黑历史, 每个人会有自己的判断,<br>如果可以跟更多的史实串在一起, 或许还有其他的写法, 我就想不到了,<br>但是我的感受吧, 想想 08 年 09 Chrome 的爆发 Altjs 语言的爆发, 事情恐怕不简单,<br>现在 WebAssembly 这个事情也算是搅起来了, 表示密切关注, 同时将强警惕.<br>我的判断有夸大或者妄想的成分的话, 请在文章后面评论告诉我, 记得带上论据和分析....</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
从 ES4 历史做的一些不友好的揣测

## 原文链接
[https://segmentfault.com/a/1190000008550491](https://segmentfault.com/a/1190000008550491)

