---
title: 'exports、module.exports和export、export default到底是咋回事' 
date: 2019-01-06 2:30:10
hidden: true
slug: k0dyfd2ps2d
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>难得有空，今天开始重新规范的学习一下node编程。<br>但是引入模块我看到用 <code>require</code>的方式，再联想到咱们的<code>ES6</code>各种<code>export</code> 、<code>export default</code>。</p>
<p>阿西吧，头都大了....</p>
<p>头大完了，那我们坐下先理理他们的使用范围。</p>
<blockquote><p><code>require</code>:  node 和 es6 都支持的引入<br><code>export / import</code> : 只有es6 支持的导出引入<br><code>module.exports / exports</code>: 只有 node 支持的导出</p></blockquote>
<p>这一刻起，我觉得是时候要把它们之间的关系都给捋清楚了，不然我得混乱死。话不多少，咱们开干！！</p>
<h2 id="articleHeader1">node模块</h2>
<p><code>Node</code>里面的模块系统遵循的是<code>CommonJS</code>规范。<br>那问题又来了，什么是<code>CommonJS</code>规范呢？<br>由于<code>js</code>以前比较混乱，各写各的代码，没有一个模块的概念，而这个规范出来其实就是对模块的一个定义。</p>
<blockquote><p><code>CommonJS</code>定义的模块分为: 模块标识(<code>module</code>)、模块定义(<code>exports</code>) 、模块引用(<code>require</code>)</p></blockquote>
<p>先解释 <code>exports</code> 和 <code>module.exports</code><br>在一个node执行一个文件时，会给这个文件内生成一个 <code>exports</code>和<code>module</code>对象，<br>而<code>module</code>又有一个<code>exports</code>属性。他们之间的关系如下图，都指向一块{}内存区域。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="exports = module.exports = {};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs java"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">exports</span> = <span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = {};</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVRMVd?w=596&amp;h=166" src="https://static.alili.tech/img/bVRMVd?w=596&amp;h=166" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>那下面我们来看看代码的吧。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//utils.js
let a = 100;

console.log(module.exports); //能打印出结果为：{}
console.log(exports); //能打印出结果为：{}

exports.a = 200; //这里辛苦劳作帮 module.exports 的内容给改成 {a : 200}

exports = '指向其他内存区'; //这里把exports的指向指走

//test.js

var a = require('/utils');
console.log(a) // 打印为 {a : 200} " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//utils.js</span>
<span class="hljs-keyword">let</span> a = <span class="hljs-number">100</span>;

<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">module</span>.exports); <span class="hljs-comment">//能打印出结果为：{}</span>
<span class="hljs-built_in">console</span>.log(exports); <span class="hljs-comment">//能打印出结果为：{}</span>

exports.a = <span class="hljs-number">200</span>; <span class="hljs-comment">//这里辛苦劳作帮 module.exports 的内容给改成 {a : 200}</span>

exports = <span class="hljs-string">'指向其他内存区'</span>; <span class="hljs-comment">//这里把exports的指向指走</span>

<span class="hljs-comment">//test.js</span>

<span class="hljs-keyword">var</span> a = <span class="hljs-built_in">require</span>(<span class="hljs-string">'/utils'</span>);
<span class="hljs-built_in">console</span>.log(a) <span class="hljs-comment">// 打印为 {a : 200} </span></code></pre>
<blockquote><p>从上面可以看出，其实<code>require</code>导出的内容是<code>module.exports</code>的指向的内存块内容，并不是<code>exports</code>的。<br>简而言之，区分他们之间的区别就是 <code>exports</code> 只是 <code>module.exports</code>的引用，辅助后者添加内容用的。</p></blockquote>
<p>用白话讲就是，<code>exports</code>只辅助<code>module.exports</code>操作内存中的数据，辛辛苦苦各种操作数据完，累得要死，结果到最后真正被<code>require</code>出去的内容还是<code>module.exports</code>的，真是好苦逼啊。</p>
<p>其实大家用内存块的概念去理解，就会很清楚了。</p>
<p>然后呢，为了避免糊涂，尽量都用 <code>module.exports</code> 导出，然后用<code>require</code>导入。</p>
<h2 id="articleHeader2">ES中的模块导出导入</h2>
<p>说实话，在es中的模块，就非常清晰了。不过也有一些细节的东西需要搞清楚。<br>比如 <code>export</code> 和 <code>export default</code>，还有 导入的时候，<code>import a from ..</code>,<code>import {a} from ..</code>，总之也有点乱，那么下面我们就开始把它们捋清楚吧。</p>
<h3 id="articleHeader3">export 和 export default</h3>
<p>首先我们讲这两个导出，下面我们讲讲它们的区别</p>
<ol>
<li>export与export default均可用于导出常量、函数、文件、模块等</li>
<li>在一个文件或模块中，export、import可以有多个，export default仅有一个</li>
<li>通过export方式导出，在导入时要加{ }，export default则不需要</li>
<li>export能直接导出变量表达式，export default不行。</li>
</ol>
<p>下面咱们看看代码去验证一下</p>
<h4>testEs6Export.js</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'use strict'
//导出变量
export const a = '100';  

 //导出方法
export const dogSay = function(){ 
    console.log('wang wang');
}

 //导出方法第二种
function catSay(){
   console.log('miao miao'); 
}
export { catSay };

//export default导出
const m = 100;
export default m; 
//export defult const m = 100;// 这里不能写这种格式。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-meta">'use strict'</span>
<span class="hljs-comment">//导出变量</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> a = <span class="hljs-string">'100'</span>;  

 <span class="hljs-comment">//导出方法</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> dogSay = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{ 
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'wang wang'</span>);
}

 <span class="hljs-comment">//导出方法第二种</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">catSay</span>(<span class="hljs-params"></span>)</span>{
   <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'miao miao'</span>); 
}
<span class="hljs-keyword">export</span> { catSay };

<span class="hljs-comment">//export default导出</span>
<span class="hljs-keyword">const</span> m = <span class="hljs-number">100</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> m; 
<span class="hljs-comment">//export defult const m = 100;// 这里不能写这种格式。</span>
</code></pre>
<h4>index.js</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//index.js
'use strict'
var express = require('express');
var router = express.Router();

import { dogSay, catSay } from './testEs6Export'; //导出了 export 方法 
import m from './testEs6Export';  //导出了 export default 

import * as testModule from './testEs6Export'; //as 集合成对象导出



/* GET home page. */
router.get('/', function(req, res, next) {
  dogSay();
  catSay();
  console.log(m);
  testModule.dogSay();
  console.log(testModule.m); // undefined , 因为  as 导出是 把 零散的 export 聚集在一起作为一个对象，而export default 是导出为 default属性。
  console.log(testModule.default); // 100
  res.send('恭喜你，成功验证');
});

module.exports = router;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//index.js</span>
<span class="hljs-meta">'use strict'</span>
<span class="hljs-keyword">var</span> express = <span class="hljs-built_in">require</span>(<span class="hljs-string">'express'</span>);
<span class="hljs-keyword">var</span> router = express.Router();

<span class="hljs-keyword">import</span> { dogSay, catSay } <span class="hljs-keyword">from</span> <span class="hljs-string">'./testEs6Export'</span>; <span class="hljs-comment">//导出了 export 方法 </span>
<span class="hljs-keyword">import</span> m <span class="hljs-keyword">from</span> <span class="hljs-string">'./testEs6Export'</span>;  <span class="hljs-comment">//导出了 export default </span>

<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> testModule <span class="hljs-keyword">from</span> <span class="hljs-string">'./testEs6Export'</span>; <span class="hljs-comment">//as 集合成对象导出</span>



<span class="hljs-comment">/* GET home page. */</span>
router.get(<span class="hljs-string">'/'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res, next</span>) </span>{
  dogSay();
  catSay();
  <span class="hljs-built_in">console</span>.log(m);
  testModule.dogSay();
  <span class="hljs-built_in">console</span>.log(testModule.m); <span class="hljs-comment">// undefined , 因为  as 导出是 把 零散的 export 聚集在一起作为一个对象，而export default 是导出为 default属性。</span>
  <span class="hljs-built_in">console</span>.log(testModule.default); <span class="hljs-comment">// 100</span>
  res.send(<span class="hljs-string">'恭喜你，成功验证'</span>);
});

<span class="hljs-built_in">module</span>.exports = router;</code></pre>
<p>从上面可以看出，确实感觉 <code>ES6</code>的模块系统非常灵活的。</p>
<h2 id="articleHeader4">代码地址</h2>
<blockquote><p>GitHub:   <a href="https://github.com/XuXiaoGH/exportImportTest" rel="nofollow noreferrer" target="_blank">https://github.com/XuXiaoGH/e...</a></p></blockquote>
<h2 id="articleHeader5">参考文献</h2>
<p>1.<a href="https://segmentfault.com/a/1190000006707756">老树新芽，在ES6下使用Express</a><br>2.<a href="https://cnodejs.org/topic/5231a630101e574521e45ef8" rel="nofollow noreferrer" target="_blank">exports 和 module.exports 的区别</a><br>3.<a href="http://www.cnblogs.com/fayin/p/6831071.html" rel="nofollow noreferrer" target="_blank">module.exports与exports,export与export default之间的关系</a></p>
<p>感谢这三位前辈的分享。</p>
<h2 id="articleHeader6">写在最后</h2>
<p>如果文章对你有所帮助，不妨点个赞或者收藏一下，这将是支持我继续写下去的动力。</p>
<p><strong>谢谢亲们。</strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
exports、module.exports和export、export default到底是咋回事

## 原文链接
[https://segmentfault.com/a/1190000010426778](https://segmentfault.com/a/1190000010426778)

