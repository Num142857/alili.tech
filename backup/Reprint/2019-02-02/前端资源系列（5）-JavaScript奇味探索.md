---
title: '前端资源系列（5）-JavaScript奇味探索' 
date: 2019-02-02 2:30:10
hidden: true
slug: xqnjgd74y9h
categories: [reprint]
---

{{< raw >}}

                    
<p>JavaScript中有很多奇妙的东西，归咎or归功于设计时候的迅速。缺陷有，但是JavaScript的强大确实体现的淋漓尽致。</p>
<p>它是如此的灵活，当然随之而来的便是开发的代价，它不像强类型语言那样规规矩矩。</p>
<p>一直用着JavaScript，可是有时候有的问题就是很难一时回答得上来，可能大概知道那么些思路，但是又很难回答得清楚，有时候是很需要自己去思考的。难得周末晚上清闲，回味这些看起来有点怪怪却又在发生着的问题。</p>
<p>如果学习需要：<a href="https://xiaohuazheng.github.io/2016/10/01/awesome-frontend-resource/" rel="nofollow noreferrer" target="_blank">前端教程&amp;开发模块化/规范化/工程化/优化&amp;工具/调试&amp;值得关注的博客/Git&amp;面试-资源汇总</a></p>
<p>欢迎提issues斧正，最新更新在： <a href="https://xiaohuazheng.github.io/2017/01/21/play-js-odd/" rel="nofollow noreferrer" target="_blank">JavaScript奇味探索</a></p>
<h3 id="articleHeader0">为什么 [1,2] + [3,4] 不等于 [1,2,3,4]？</h3>
<ul>
<li>原始问题：<a href="http://stackoverflow.com/questions/7124884/why-does-1-2-3-4-1-23-4-in-javascript" rel="nofollow noreferrer" target="_blank">stackoverflow question and answer</a>
</li>
<li>中文翻译：<a href="http://justjavac.com/javascript/2012/12/18/why-does-1-2-plus-3-4-equal-1-23-4-in-javascript.html" rel="nofollow noreferrer" target="_blank">高票回答-中文翻译</a>
</li>
<li>参考资料：<a href="https://segmentfault.com/a/1190000007184573">详解加法运算符</a>
</li>
</ul>
<h3 id="articleHeader1">为什么"0" == !"0" " " == !" " [] == ![] 为true？</h3>
<ul>
<li>原始问题：<a href="https://www.zhihu.com/question/29615998" rel="nofollow noreferrer" target="_blank">知乎提问</a>
</li>
<li>参考资料：<a href="https://zh.scribd.com/document/56770557/ECMA-262" rel="nofollow noreferrer" target="_blank">英文材料ECMA-262</a> 90页左右的描述，facebook登录后可查看全部</li>
<li>学习参考：<a href="http://javascript.ruanyifeng.com/grammar/operator.html#toc6" rel="nofollow noreferrer" target="_blank">相等运算符和严格相等运算符</a>
</li>
</ul>
<h3 id="articleHeader2">为什么 ++[[]][+[]]+[+[]] = 10？</h3>
<ul>
<li>原始问题：<a href="http://stackoverflow.com/questions/7202157/why-does-return-the-string-10" rel="nofollow noreferrer" target="_blank">stackoverflow question and answer</a>
</li>
<li>中文翻译：<a href="http://justjavac.com/javascript/2012/05/24/can-you-explain-why-10.html" rel="nofollow noreferrer" target="_blank">高票回答-中文翻译</a>
</li>
</ul>
<h3 id="articleHeader3">为什么 javascript 中 0.1 + 0.2 == 0.30000000000000004？</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="0.1 + 0.1 + 0.1 + 0.1 + 0.1 + 0.1 + 0.1 + 0.1 + 0.1 + 0.1 ==0.9999999999999999
0.1 * 10 == 1

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-number">0.1</span> + <span class="hljs-number">0.1</span> + <span class="hljs-number">0.1</span> + <span class="hljs-number">0.1</span> + <span class="hljs-number">0.1</span> + <span class="hljs-number">0.1</span> + <span class="hljs-number">0.1</span> + <span class="hljs-number">0.1</span> + <span class="hljs-number">0.1</span> + <span class="hljs-number">0.1</span> ==<span class="hljs-number">0.9999999999999999</span>
<span class="hljs-number">0.1</span> * <span class="hljs-number">10</span> == <span class="hljs-number">1</span>

</code></pre>
<ul>
<li>参考资料：<a href="http://justjavac.com/codepuzzle/2012/11/02/codepuzzle-float-from-surprised-to-ponder.html" rel="nofollow noreferrer" target="_blank">浮点数（从惊讶到思考）</a>
</li>
<li>参考资料：<a href="http://justjavac.com/codepuzzle/2012/11/11/codepuzzle-float-who-stole-your-accuracy.html" rel="nofollow noreferrer" target="_blank">浮点数（谁偷了你的精度？）</a>
</li>
</ul>
<h3 id="articleHeader4">为什么 ["1", "2", "3"].map(parseInt) 返回 [1, NaN, NaN]？</h3>
<ul>
<li>原始问题：<a href="http://webcache.googleusercontent.com/search?q=cache:http://javascript-puzzlers.herokuapp.com/" rel="nofollow noreferrer" target="_blank">JavaScript Puzzlers!</a>
</li>
<li>参考资料：<a href="http://justjavac.com/javascript/2014/02/18/javascript-puzzlers-why-1-2-3-map-parseint-returns-1-NaN-NaN-in-javascript.html" rel="nofollow noreferrer" target="_blank">解析parseInt() 函数</a>
</li>
<li>延伸阅读：<a href="https://segmentfault.com/a/1190000006769211">你不可能全会的30题-题目</a>
</li>
<li>延伸阅读：<a href="https://segmentfault.com/a/1190000006769330" target="_blank">你不可能全会的30题-解析</a>
</li>
</ul>
<h3 id="articleHeader5">JavaScript中,{}+{}等于多少?</h3>
<ul>
<li>原始问题：<a href="http://www.2ality.com/2012/01/object-plus-object.html" rel="nofollow noreferrer" target="_blank">object-plus-object</a>
</li>
<li>中文翻译：<a href="https://segmentfault.com/a/1190000000264418">{}+{}等于多少</a>
</li>
</ul>
<h3 id="articleHeader6">JavaScript中,undefined与null的区别？</h3>
<ul><li>参考资料：<a href="http://www.ruanyifeng.com/blog/2014/03/undefined-vs-null.html" rel="nofollow noreferrer" target="_blank">undefined与null的区别</a>
</li></ul>
<h3 id="articleHeader7">为什么 parseInt(0.0000008) === 8？</h3>
<ul><li>参考资料：<a href="http://justjavac.com/javascript/2015/01/08/why-parseint-0-00000008-euqal-8-in-js.html" rel="nofollow noreferrer" target="_blank">为什么 parseInt(0.0000008) === 8？中文</a>
</li></ul>
<h3 id="articleHeader8">为什么在函数里声明var a = b = 5;在函数外却能访问到b？</h3>
<ul><li>参考资料：<a href="http://justjavac.com/javascript/2012/04/05/javascript-continuous-assignment-operator.html" rel="nofollow noreferrer" target="_blank">写了 10 年 Javascript 未必全了解的连续赋值运算</a>
</li></ul>
<h3 id="articleHeader9">call和apply的第一个参数是null/undefined是什么意思？</h3>
<ul><li>参考资料：<a href="http://www.cnblogs.com/snandy/archive/2012/03/01/2373243.html" rel="nofollow noreferrer" target="_blank">call和apply的第一个参数为null/undefined时</a>
</li></ul>
<h3 id="articleHeader10">querySelectorAll 方法相比 getElementsBy 系列方法有什么区别？</h3>
<ul><li>知乎问答：<a href="https://www.zhihu.com/question/24702250" rel="nofollow noreferrer" target="_blank">高票回答</a>
</li></ul>
<p>随时遇到问题再补充，有好奇心才会有进步！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端资源系列（5）-JavaScript奇味探索

## 原文链接
[https://segmentfault.com/a/1190000007184963](https://segmentfault.com/a/1190000007184963)

