---
title: '手把手教你从零写一个简单的 VUE--模板篇' 
date: 2019-01-05 2:30:10
hidden: true
slug: kiy6zx9pwm
categories: [reprint]
---

{{< raw >}}

                    
<p>教程目录<br>1.<a href="https://segmentfault.com/a/1190000009846314">手把手教你从零写一个简单的 VUE</a><br>2.<a href="https://segmentfault.com/a/1190000010611308" target="_blank">手把手教你从零写一个简单的 VUE--模板篇</a></p>
<p>Hello，我又回来了，上一次的文章教会了大家如何书写一个简单 VUE，里面实现了VUE 的数据驱动视图渲染模板，更新到页面的过程，简单的带大家了解了类似 VUE 这样子的数据驱动视图框架的工作流程，今天我来给大家讲一讲作为一个前端框架最为核心的部分---模板，代码还是放在文章的最后，请随意下载</p>
<h3 id="articleHeader0">模板的分类</h3>
<p>在介绍我们实现的模板语言之前，我们先来了解下，现在市面上比较流行的模板语言：</p>
<h4>PHP/ASP/JSP风格</h4>
<blockquote><div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   <%if(list.length ){%>   <ol>
      <%for(n = 0; n < list.length; ++n ){%>
        <li>
          <%=list[n]%>
        </li>
      <%}%>   
     </ol> 
   <%}%> " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs erb"><code><span class="xml">   <span class="hljs-tag">&lt;<span class="hljs-name">%</span></span></span><span class="ruby"><span class="hljs-keyword">if</span>(list.length ){</span><span class="xml"><span class="hljs-tag">%&gt;</span>   <span class="hljs-tag">&lt;<span class="hljs-name">ol</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">%</span></span></span><span class="ruby"><span class="hljs-keyword">for</span>(n = <span class="hljs-number">0</span>; n &lt; list.length; ++n ){</span><span class="xml"><span class="hljs-tag">%&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">%=</span></span></span><span class="ruby">list[n]</span><span class="xml"><span class="hljs-tag">%&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">%</span></span></span><span class="ruby">}</span><span class="xml"><span class="hljs-tag">%&gt;</span>   
     <span class="hljs-tag">&lt;/<span class="hljs-name">ol</span>&gt;</span> 
   <span class="hljs-tag">&lt;<span class="hljs-name">%</span></span></span><span class="ruby">}</span><span class="xml"><span class="hljs-tag">%&gt;</span> </span></code></pre></blockquote>
<p>这种是最接近于 js 变成语言的语法，比较直观，但是由于存在<code>&lt; &gt;</code>的分隔符，对 IDE不太友好，不太好进行格式化处理</p>
<h4>mustcache风格</h4>
<blockquote><div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    "{{"#if list.length"}}"  
    <ol>
    "{{"#each list item"}}"
      <li>
        "{{"item"}}"
      </li>
    "{{"/each"}}"   
    </ol> 
    "{{"/if"}}"" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs handlebars"><code><span class="xml">    </span><span class="hljs-template-tag">"{{"#<span class="hljs-name"><span class="hljs-builtin-name">if</span></span> list.length"}}"</span><span class="xml">  
    <span class="hljs-tag">&lt;<span class="hljs-name">ol</span>&gt;</span>
    </span><span class="hljs-template-tag">"{{"#<span class="hljs-name"><span class="hljs-builtin-name">each</span></span> list item"}}"</span><span class="xml">
      <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
        </span><span class="hljs-template-variable">"{{"item"}}"</span><span class="xml">
      <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    </span><span class="hljs-template-tag">"{{"/<span class="hljs-name"><span class="hljs-builtin-name">each</span></span>"}}"</span><span class="xml">   
    <span class="hljs-tag">&lt;/<span class="hljs-name">ol</span>&gt;</span> 
    </span><span class="hljs-template-tag">"{{"/<span class="hljs-name"><span class="hljs-builtin-name">if</span></span>"}}"</span></code><span class="xml"></span></pre></blockquote>
<p>这种是<code>artTemplate</code>默认的语法，高级语法有限，通常难自定义拓展</p>
<h4>
<code>DSL</code>风格语法</h4>
<blockquote><div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" <ol dsl-if=&quot;list.length&quot;>   
    <li dsl-for=&quot;item in list&quot;>
    
    </li> 
  </ol> " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code> &lt;<span class="hljs-selector-tag">ol</span> dsl-<span class="hljs-keyword">if</span>=<span class="hljs-string">"list.length"</span>&gt;   
    &lt;<span class="hljs-selector-tag">li</span> dsl-<span class="hljs-keyword">for</span>=<span class="hljs-string">"item in list"</span>&gt;
    
    &lt;/li&gt; 
  &lt;/ol&gt; </code></pre></blockquote>
<p>首先介绍下什么是<code>DSL</code>， <code>DSL</code>全称是<code>Domain Specific Language/DSL</code><strong>领域专用语言</strong>,其基本思想是<strong>求专不求全</strong>，用于解决一个类型，一个领域的问题。比如<code>Vue</code>里面的<code>v-xxx</code>，<code>Vue</code>称之为<code>指令</code>，其实就是一个DSL，用于解决模板语法等问题，这种模板由于在<code>html</code>语法里面相当于标签的属性，所以对<code>IDE</code>友好，不会影响格式化操作。</p>
<p><code>Vue</code>的模板语法相当于结合了 <code>DSL</code>语法和 mustcache风格， 逻辑控制部分使用<code>DSL</code>语法，输出展示部分使用 mustcache风格</p>
<h3 id="articleHeader1">模板引擎设计思路</h3>
<p>下面是这个模板引擎的思路：</p>
<h4>字符串模板语法定义</h4>
<p>首先我们要定义一种模板语法，按照上一节的说明，我们使用<code>DSL风格语法</code>，下面是我们测试用的模板<br><span class="img-wrap"><img data-src="/img/bVSDqb?w=850&amp;h=456" src="https://static.alili.tech/img/bVSDqb?w=850&amp;h=456" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span><br>我们采用最简单的将模板写在<code>script</code>标签的配置方式，可以看到我们定义了几个<code>DSL</code>,分别是<code>dsl-if</code>,<code>dsl-for</code>,<code>dsl-html</code>,分别用于判断，循环和直接输出 html，还有使用<code>mustcache</code>作为字符串输出语法。当然这个只是一个简单的模板<code>DSL</code>语言，主要为了讲解思路，真正的模板需要更加多的模板语法，具体可以参照 <code>VUE</code>文档</p>
<h4>模板解析成为 AST</h4>
<p>首先解释下什么是<code>AST</code>，AST 全称为<code>abstract syntax tree(抽象语法树)</code>，是源代码的抽象语法结构的树状表现形式，每种源码都可以被抽象成为<code>AST</code>，比如我们常用的 js，css，json 等，都可以解析成为 AST<br>把模板解析成为<code>AST</code>,就是将模板的 html 结构进行解析，变成一颗附带结构、关系、属性的抽象树，这样做方便与后面我们多次对模板进行处理，减少了多次解析字符串带来的损耗，同时变成一颗树的数据结构之后更加方便于我们的遍历，关于<code>AST</code>的优点缺点大家可以执行搜索，这里就不展开说明了<br>上面的字符串模板解析完成之后，会变成以下的一个<code>AST</code><br><span class="img-wrap"><img data-src="/img/bVSDyH?w=743&amp;h=440" src="https://static.alili.tech/img/bVSDyH?w=743&amp;h=440" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span><br>可以看到字符串模板变成了一个object数组，每个 obj 代表一个节点，里面包含了这个 obj 的属性，类型，父子关系，用到的<code>DSL</code>等等。这个可以看成是我们的模板的一个中间态，为我们进行进一步处理打下了基础。</p>
<h4>AST 转换成为 模板函数</h4>
<p>联系上一篇文章，其实模板函数的构造都大同小异，基本是都是通过拼接函数字符串，然后通过<code>Function</code>对象转换成一个函数，变成一个函数之后，只要传入对应的数据，函数就会返回一个模板数据渲染好的 html 字符串。下面是例子中通过<code>AST</code><br><span class="img-wrap"><img data-src="/img/bVSDGS?w=588&amp;h=439" src="https://static.alili.tech/img/bVSDGS?w=588&amp;h=439" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span><br>这是个函数体，然后使用<code>new Function</code>，就变成一个真正的函数了，至于这个函数体的解释，我将放在下面具体实现进行讲解</p>
<h4>数据与模板函数结合生成 html</h4>
<p>由于本文主要是讲模板的实现，因此数据部分还是使用延续上一篇文章的绑定，在初始化或者数据发生改变的时候，响应的函数会对数据所关联的模板函数进行重新调用，生成新的html，重新进行渲染。</p>
<p>模板的开发思路我们就在上面都说明了，主要总结下就是将字符串模板变成 ast，ast 变成模板函数，然后就可以结合数据进行 html 生成及渲染了</p>
<h3 id="articleHeader2">具体实现方法</h3>
<p>首先说明下本教程的方法是对思路的实现，并非完全使用 vue 的实现方法，vue 是一个完整的框架，里面涉及的东西比较多，我们的实现是为了让大家更好的了解 vue 的原理，而非完全实现</p>
<h4>字符串模板变成<code>AST</code>部分</h4>
<p>1.模板预处理：<br>由于字符串模板是人为处理的，因此书写的时候可能会出现标签不配对，标签未关闭等问题，因此我们要先做些预处理，来去除这些干扰，做法有很多种，比如通过一些语法分析的工具进行解析，这里我们使用一种比较简单的方式进行处理，代码如下(<code>/src/core/render.js</code>)：<br><span class="img-wrap"><img data-src="/img/bVSDKU?w=1184&amp;h=354" src="https://static.alili.tech/img/bVSDKU?w=1184&amp;h=354" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span><br>可以看到我创建了一个<code>div</code>标签，然后将字符串模板放进去里面，这样子浏览器会对模板进行解析处理，然后我们再通过<code>innerHTML</code>去除前后空格之后拿出来，这样就对字符串模板进行了处理。<br>备注：我们按照 vue 的规则，一个模板只有一个根节点，所以我们取了<code>childNodes[0]</code></p>
<p>2.生成 ast：<br>上面我们对字符串模板进行了预处理，接下去我们要将字符串模板转换成ast,代码比较长，大家有兴趣可以看下<code>/src/compiler/ast/parse.js</code>,下面说下解析思路<br>解析通过正则表达式配合 <code>String.replace(regExt,fn)</code>，正则表达式为<code>/&lt;(?:"[^"]*"['"]*|'[^']*'['"]*|[^'"&gt;])+&gt;/g</code>,解析出来标签和标签上面的属性，然后按照需求进行存储，就生成 ast</p>
<h4>ast 生成模板函数</h4>
<p>生成模板函数的思路就是递归遍历ast 树，对不同的类型节点，不同的<code>NSL</code>，调用不同的生成函数，最后组合成为模板函数字符串，代码如下(/src/compiler/compiler-helper.js)：<br><span class="img-wrap"><img data-src="/img/bVSDUo?w=901&amp;h=918" src="https://static.alili.tech/img/bVSDUo?w=901&amp;h=918" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span><br>可以看到，处理的函数对 <code>DSL</code>还有不同的标签类型进行处理，然后都返回了一个辅助函数的调用，比如<code>_i,_f,_c</code>等等，这里的辅助函数是在模板函数被调用的时候才真正的被调用的,下面我们举例说明一个辅助函数<code>_c</code><br><span class="img-wrap"><img data-src="/img/bVSDXw?w=494&amp;h=296" src="https://static.alili.tech/img/bVSDXw?w=494&amp;h=296" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span><br>这个辅助函数的功能是用于生成节点，可以看到调用了这个函数之后，对应的 ast 里面的节点被真正生成，变成<code>dom</code>节点，并且会把孩子节点进行插入，通过很多辅助函数的递归嵌套调用，最终模板函数一调用，就可以结合数据渲染出来真实的dom节点</p>
<p>下面说一个比较细的知识点，就是辅助函数的调用，我们知道上面的辅助函数调用在生成的时候，其实都是字符串，然后通过<code>new Function</code>让他变成真正的函数，那么问题就来了，我们知道<code>new Function</code>是的作用域和运行时的代码是隔离的，是调用不到外面的<code>_c,_f</code>等辅助函数的，那是如何实现调用的呢，这里用了一个我们很少使用的关键字<code>with</code>，这个关键字在很多书籍里面都不推荐使用，因为他的作用是修改<code>with</code>包含代码块的作用域，如果滥用会导致代码的逻辑不可控，但是在模板函数里面这个关键字有奇效，他可以方便的规定把当前的代码作用域传到模板函数里面，从而使得模板函数里面可以调用到运行时作用域的函数。大家可以看下上一小节生成的模板函数字符串，会发现就是用整个<code>with(that){}</code>包裹起来的，在模板函数运行时，将当前作用域直接传入即可,代码如下：<br><span class="img-wrap"><img data-src="/img/bVSD1l?w=559&amp;h=250" src="https://static.alili.tech/img/bVSD1l?w=559&amp;h=250" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h4>结合数据运行</h4>
<p>至此，我们已经生成了模板函数，通过传入数据运行模板函数，就可以生成 dom，代码如下:<br><span class="img-wrap"><img data-src="/img/bVSD2j?w=551&amp;h=160" src="https://static.alili.tech/img/bVSD2j?w=551&amp;h=160" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span><br>可以我们直接把<code>compiler_helper</code>附带上 data 作为作用域，直接调用了模板函数，就可以生成dom，再结合我们第一篇文章写的数据监听，就可以实现简单的数据驱动视图</p>
<h3 id="articleHeader3">后话</h3>
<p>至此，我们的VUE模板的基本实现已经介绍完成了，这里主要是介绍如何去实现一个模板引擎的思路，所以功能上上面的实现不是完整的，只是实现了一些简单的语法，大家可以下下代码继续补充。</p>
<h3 id="articleHeader4">思考</h3>
<p>细心的人可能会发现，我们上面的模板有个问题，就是如果改了数据中的其中一个数值，那么整个模板都得重新编译，重新渲染，这其实是非常损耗性能的，这其实就是我下一篇文章要讲的，模板渲染的效率问题，先提出几个关键词 <code>虚拟dom，diff 算法，最小化渲染</code>，吊吊大家的胃口，哈哈，下一篇文章我会进行全面的介绍，相信学习完下一篇文章，大家会对现有市面上的数据驱动框架的模板部分有个全面的了解~下一篇文章更加精彩哦~~求关注<br>最后附上源码<a href="https://github.com/qbright/QV/tree/article-2" rel="nofollow noreferrer" target="_blank">点我点我</a>，各位客官给个 star 呗~~</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
手把手教你从零写一个简单的 VUE--模板篇

## 原文链接
[https://segmentfault.com/a/1190000010611308](https://segmentfault.com/a/1190000010611308)

