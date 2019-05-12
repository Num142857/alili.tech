---
title: 'RESTful实践（具体应用）思考' 
date: 2018-12-31 2:30:29
hidden: true
slug: cbz10fnlwh5
categories: [reprint]
---

{{< raw >}}

                    
<p>RESTful这种架构已经具有很长的时间和历程了，但似乎最近restful这个词出现的频率特别高，目前不是很清楚是因为我自个儿现在是以restful风格写程序产生的孕妇效应，还是单页面程序开发的流行造成的。</p>
<p>其实一开始我也是不想写这篇文章的，因为网络上与restful相关的文章挺多，而且都写得挺好的，都具有比较高的参考价值。但是我仔细梳理了我所看过的文章，发现大家基本上讲的是restful的理论经验，好像并没有过多的提及restful实际程序设计上的一些经验总结。而且关于这方面的经验总结我曾经也想找找来做参考也并没有找到，因此，我写这篇文章，希望一些人能得到一些参考（因为是我个人实践，可能有些不符合大流的地方，那就请多多包涵或者指出来了）。</p>
<p>另外这篇文章我不会去讲一些底层restful支持怎么设计（restful框架怎么设计），要说这个的话，那么内容太长了，我主要讲应用层面的东西，也就是具体业务逻辑的一些东西，当然会做一些基本的引申讲解。</p>
<h2 id="articleHeader0">资源</h2>
<p>说到restful就不得不说资源这个东西了，restful的每一个接口所对应的应该是一个资源。那么，在restful里面，“资源”这个词其实应该算是一个抽象概念了，这个“资源”所包含的资源就不仅仅是常规意义上的资源了。我觉得换一种方式叫法，把这种资源叫做对象，可能会更加方便理解。</p>
<p>当然，首先我们其实应该说一下什么是资源。资源包含的东西很多，从图片到音频、视频等数据，以及文本等都是资源。也就是说，服务器上存在的数据就是资源。</p>
<p>但是，单独说资源没有太多意义，应该说资源的表现方式才有意义，或者说数据的表现方式才有意义，此处挺重要的，这个涉及到后续我说的restful风格设计方面的东西。通常来说，我们打开一个URL所能看到的就是一个完整的html界面，而其实，这个html界面就是资源，html所显示出来的图片、音频、视频等等都是资源。说到这里可能有些人在做开发过程中对于一些东西具有误解，认为restful风格所获取的资源是服务端返回<code>json</code>数据。关于这个，我们应该搞清楚几个概念：</p>
<blockquote><ol>
<li>数据类型：就是服务端返回的数据类型，如html、图片、视频、Excel表格、world文档等等；</li>
<li>传输方式：异步和同步；</li>
<li>串行和并行传输： 串行传输是等一个数据传输完成再传输另外一个数据，并行是同时执行。</li>
</ol></blockquote>
<p>这三个东西我就不展开细说了，说起来比较复杂，我就说一下串行和并行与异步和同步的一个大致讲解就好了，很多人觉得异步是并行执行的，或者说把异步理解成并行执行的，这其实不一定，异步只能说执行的时候在某个流程执行的时候可以开始其他任务执行，减少阻塞。</p>
<h2 id="articleHeader1">请求方式</h2>
<p>常用的请求方式大致就是：<code>GET</code>、<code>POST</code>、<code>PUT</code>、<code>DELETE</code>、<code>OPTIONS</code>。</p>
<p>GET：接口从字面意识理解，就是获取数据的，而我们在设计的时候，GET应该是包含两种数据获取方式，一种是获取整体数据列表，一种是根据指定ID获取数据。</p>
<p>POST：是新增数据用的，此请求方式设计的接口是新增数据；</p>
<p>PUT：是修改数据接口，如果要对资源做数据修改，那么程序应该考虑放在这个接口中；</p>
<p>DELETE：很容易理解，这个请求方式对应的是对接口的删除操作；</p>
<p>OPTIONS：这个接口蛮有意思的，通常这个接口设计为返回当前接口的一些信息，比如有哪些字段，哪些字段允许请求哪些字段不允许等。</p>
<p>那么后端的业务逻辑程序应该向外提供基本的五个接口，如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface Api {
    public function index() {} // GET 列表接口 /api
    public function view() {} // GET 单个数据接口 /api/:id
    public function create() {} // POST 创建接口 /api
    public function update() {} // PUT 修改接口 /api/:id
    public function delete() {} // DELETE 删除接口 /api/:id
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="php hljs"><code class="php"><span class="hljs-class"><span class="hljs-keyword">interface</span> <span class="hljs-title">Api</span> </span>{
    <span class="hljs-keyword">public</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">index</span><span class="hljs-params">()</span> </span>{} <span class="hljs-comment">// GET 列表接口 /api</span>
    <span class="hljs-keyword">public</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">view</span><span class="hljs-params">()</span> </span>{} <span class="hljs-comment">// GET 单个数据接口 /api/:id</span>
    <span class="hljs-keyword">public</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">create</span><span class="hljs-params">()</span> </span>{} <span class="hljs-comment">// POST 创建接口 /api</span>
    <span class="hljs-keyword">public</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">update</span><span class="hljs-params">()</span> </span>{} <span class="hljs-comment">// PUT 修改接口 /api/:id</span>
    <span class="hljs-keyword">public</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">delete</span><span class="hljs-params">()</span> </span>{} <span class="hljs-comment">// DELETE 删除接口 /api/:id</span>
}</code></pre>
<h2 id="articleHeader2">业务逻辑设计思维方向</h2>
<p>嗯，说了以上一大堆，那么这个点估计才是比较关键的东西。</p>
<p>可以看以上的那段代码接口，我后面的注释做了请求方式和功能性说明，来看一下<code>update</code>这个接口，这个接口需要注意的是，通常设计的修改接口后面必须要带上指定的数据id，这里的<code>:id</code>指的是资源id参数。从这里来看，似乎对于资源的修改具有一定的局限性，当然删除也如此。然后，我想很多人应该就开始有一个疑问了：“卧槽，老子要做批量修改，咋办？这restful也太局限了吧？”。</p>
<p>对，我开始就是这么想的，后来经过我的思考，我发现并不是这样。我上文提到，服务端任何数据都是资源，而且资源在restful里应该算是一个抽象的意义。上文没法做说明，但其实，这个是关乎到程序设计上的一些问题的。</p>
<p>首先，我们来假设有这样一个例子，我们要批量删除一堆商品数据。按照传统的思维，用户批量选择，然后把这一堆id传递到后端，然后后端根据这一批id来进行删除。我说这个，并不是要表达在restful里这套思维行不通，首先应该肯定这是对的，但是，我们要做的是跳出这期间设计到的另外一个思维。也就是此时我们把商品当做一个资源操作，此时，我们应该把“删除商品”当做一个资源，而不是商品。那么我们在设计接口的时候，就具有非常大的意义了。我们把“删除商品”当做一个资源，暂且把这个接口定义为：<code>/delete-goods</code>。那么，删除就是对应的post接口，也就是创建“删除商品”，那么撤销删除可以对应delete接口，也就是删除“删除商品”。</p>
<p>以上描述得可能有些拗口，但实际上就是这样，如果这么设计，我们遵循了restful的标准，其实交互流程与传统没有太多差别，唯一的差别就是思想的转换。分析以上，其实我们应该得出一些结论：</p>
<ol>
<li>做restful设计的时候，程序设计思维应该要做一定的转换，在不同的场景思考到底什么才应该是资源，应该把什么当做资源？</li>
<li>做restful应该把逻辑拆分得更清晰，没个逻辑对象只做五件事情：看列表数据、看单个数据、增加数据、修改数据、删除数据。</li>
</ol>
<p>以上我虽然是就删除来说的，其实批量修改等也贴合这种思想，也包括我之前回答的一个问题，就是批量阅读消息这种操作也贴合于这种思想。</p>
<h2 id="articleHeader3">其他</h2>
<p>restful交互一般会遵循一些数据结构协议或者HTTP状态值，比如不同的操作结果对应不同的HTTP状态值，且出错会返回指定的错误信息方便前端进行提示等。</p>
<p>当然restful接口的设计为了完全遵循自然语义也可以采用请求资源列表采用复数请求方式（语言中的单数词和复数词）等等。</p>
<p>不管怎么变化，我觉得最基本的还是不同的请求方式对应的不同操作问题，所有的操作对应的还是同一个接口。</p>
<p>以上就是我的一些应用场景的理解和总结，欢迎大家一起交流。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
RESTful实践（具体应用）思考

## 原文链接
[https://segmentfault.com/a/1190000011280637](https://segmentfault.com/a/1190000011280637)

