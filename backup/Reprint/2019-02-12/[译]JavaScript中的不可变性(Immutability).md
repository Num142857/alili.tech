---
title: '[译]JavaScript中的不可变性(Immutability)' 
date: 2019-02-12 2:30:12
hidden: true
slug: j2a8l3mpk3
categories: [reprint]
---

{{< raw >}}

                    
<p>不可变性(<code>Immutability</code>)是函数式编程的核心原则，在面向对象编程里也有大量应用。在这篇文章里，我会给大家秀一下到底什么是不可变性(<code>Immutability</code>)、她为什么还这么屌、以及在<code>JavaScript</code>中怎么应用。</p>
<h2 id="articleHeader0">什么是不可变性(<code>Immutability</code>)？</h2>
<p>还是先来看看关于可变性(<code>Mutability</code>)的教条式定义：“liable or subject to change or alteration(译者注：真他妈难翻，就简单理解成'易于改变的'吧)”。在编程领域里，我们用可变性(<code>Mutability</code>)来描述这样一种对象，它在创建之后状态依旧可被改变。那当我们说不可变(<code>Immutable</code>)时，就是可变(<code>Mutable</code>)的对立面了(译者注：原谅我翻的废话又多起来) － 意思是，创建之后，就再也不能被修改了。</p>
<p>如果我说的又让你感到诡异了，原谅我小小的提醒一下，其实我们平时使用的很多东西事实上都是不可变的哦！</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var statement = 'I am an immutable value';
var otherStr = statement.slice(8, 17);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> statement = <span class="hljs-string">'I am an immutable value'</span>;
<span class="hljs-keyword">var</span> otherStr = statement.slice(<span class="hljs-number">8</span>, <span class="hljs-number">17</span>);</code></pre>
<p>我猜没人会吃惊，<code>statement.slice(8, 17)</code>并没有改变<code>statement</code>变量吧(译者注：如果你吃惊了，赶紧去补基本知识吧)？事实上，<code>string</code>对象上的所有方法里，没有一个会修改原<code>string</code>，它们一律返回新的<code>string</code>。原因简单了，因为<code>string</code>就是是不可变的(<code>Immutable</code>) - 它们不能被修改，我们能做的就是基于原<code>string</code>操作后得到一个新<code>string</code>。</p>
<p>注意了，<code>string</code>可不是<code>JavaScript</code>里唯一内置的不可变(<code>Immutable</code>)数据类型哦。<code>number</code>也是不可变(<code>Immutable</code>)的。否则的话，你试想下这个表达式<code>2 + 3</code>，如果<code>2</code>的含义能被修改，那代码该怎么写啊\|_\|。听起来荒谬吧，但我们在编程中却常常对<code>object</code>和<code>array</code>做出这种事儿。</p>
<h2 id="articleHeader1">JavaScript充满变化</h2>
<p>在<code>JavaScript</code>中，<code>string</code>和<code>number</code>从设计之初就是不可变(<code>Immutable</code>)的。但是，看看下面这个关于<code>array</code>例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [];
var v2 = arr.push(2);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> arr = [];
<span class="hljs-keyword">var</span> v2 = arr.push(<span class="hljs-number">2</span>);</code></pre>
<p>来我问你，<code>v2</code>的值是什么？如果<code>array</code>和<code>string</code>、<code>number</code>一样也是不可变(<code>Immutable</code>)的，那此时<code>v2</code>必定是一个包含了一个数字<code>2</code>的新<code>array</code>。事实上，还真就不是那样的。这里<code>arr</code>引用的<code>array</code>被修改了，里面添了一个数字<code>2</code>，这时<code>v2</code>的值(也就是<code>arr.push(2)</code>的返回值)，其实是<code>arr</code>此时的长度 － 就是<code>1</code>。</p>
<p>试想我们拥有一个不可变的数组(<code>ImmutableArray</code>)。就像<code>string</code>、<code>number</code>那样，她应该能像如下这样被使用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = new ImmutableArray([1, 2, 3, 4]);
var v2 = arr.push(5);

arr.toArray(); // [1, 2, 3, 4]
v2.toArray();  // [1, 2, 3, 4, 5]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> arr = <span class="hljs-keyword">new</span> ImmutableArray([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>]);
<span class="hljs-keyword">var</span> v2 = arr.push(<span class="hljs-number">5</span>);

arr.toArray(); <span class="hljs-comment">// [1, 2, 3, 4]</span>
v2.toArray();  <span class="hljs-comment">// [1, 2, 3, 4, 5]</span></code></pre>
<p>类似的，也可以有一个不可变的Map(<code>ImmutableMap</code>)，理论上可以替代<code>object</code>应该于多数场景，她应该有一个<code>set</code>方法，不过这个<code>set</code>方法不会塞任何东西到原<code>Map</code>里，而是返回一个包含了塞入值的新<code>Map</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var person = new ImmutableMap({name: 'Chris', age: 32});
var olderPerson = person.set('age', 33);

person.toObject(); // {name: 'Chris', age: 32}
olderPerson.toObject(); // {name: 'Chris', age: 33}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> person = <span class="hljs-keyword">new</span> ImmutableMap({<span class="hljs-attr">name</span>: <span class="hljs-string">'Chris'</span>, <span class="hljs-attr">age</span>: <span class="hljs-number">32</span>});
<span class="hljs-keyword">var</span> olderPerson = person.set(<span class="hljs-string">'age'</span>, <span class="hljs-number">33</span>);

person.toObject(); <span class="hljs-comment">// {name: 'Chris', age: 32}</span>
olderPerson.toObject(); <span class="hljs-comment">// {name: 'Chris', age: 33}</span></code></pre>
<p>就像<code>2 + 3</code>这个表达式里，我们不可能改变<code>2</code>或是<code>3</code>所代表的含义，一个<code>person</code>在庆祝他33岁的生日，并不会影响他曾经是32岁的事实。</p>
<h2 id="articleHeader2">JavaScript不可变性(<code>Immutability</code>)实战</h2>
<p><code>JavaScript</code>里目前还没有不可变的<code>list</code>和<code>map</code>，所以暂时我们还是需要三方库的帮助。有两个很不错的，一个是<a href="https://github.com/swannodette/mori" rel="nofollow noreferrer" target="_blank">Mori</a> － 她把<code>ClojureScript</code>里持久化数据结构的API支持带到了<code>JavaScript</code>里；另一个是Facebook出品的<a href="https://github.com/facebook/immutable-js" rel="nofollow noreferrer" target="_blank">immutable.js</a>。后面的示例里，我将使用<a href="https://github.com/facebook/immutable-js" rel="nofollow noreferrer" target="_blank">immutable.js</a>，因为她的API对于<code>JavaScript</code>开发者更友好一些。</p>
<p>下面的例子里，我们使用不可变(<code>Immutable</code>)知识来构建一个扫雷小游戏。扫雷的游戏面板我们用一个不可变的<code>map</code>来构建，其中<code>tiles</code>(雷区区块)部分值得关注哦，它是一个由不可变<code>map</code>组成的不可变<code>list</code>(译者注：又开始绕了)，其中每一个不可变的<code>map</code>表示一个<code>tile</code>(雷区块)。整个这个雷区面板都是由<code>JavaScript</code>的<code>object</code>和<code>array</code>组成的，最后由<a href="https://github.com/facebook/immutable-js" rel="nofollow noreferrer" target="_blank">immutable.js</a>的<code>fromJS</code>方法对其进行不可变化处理：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function createGame(options) {
  return Immutable.fromJS({
    cols: options.cols,
    rows: options.rows,
    tiles: initTiles(options.rows, options.cols, options.mines)
  });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createGame</span>(<span class="hljs-params">options</span>) </span>{
  <span class="hljs-keyword">return</span> Immutable.fromJS({
    <span class="hljs-attr">cols</span>: options.cols,
    <span class="hljs-attr">rows</span>: options.rows,
    <span class="hljs-attr">tiles</span>: initTiles(options.rows, options.cols, options.mines)
  });
}</code></pre>
<p>剩下的主要逻辑部分就是“扫雷”了，传入扫雷游戏对象(一个不可变结构)做为第一个参数，以及要“扫”的那个<code>tile</code>(雷区块)对象，最后返回新的扫雷游戏实例。以下我们就要讲到这个<code>revealTile</code>函数。当它被调用时，<code>tile</code>(雷区块)的状态就要被重置为“扫过”的状态。如果是可变编程，代码很简单：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function revealTile(game, tile) {
  game.tiles[tile].isRevealed = true;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">revealTile</span>(<span class="hljs-params">game, tile</span>) </span>{
  game.tiles[tile].isRevealed = <span class="hljs-literal">true</span>;
}</code></pre>
<p>然后再来看看如果用上面介绍的不可变数据结构来编码，坦白讲，一开始代码变得都点丑了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function revealTile(game, tile) {
  var updatedTile = game.get('tiles').get(tile).set('isRevealed', true);
  var updatedTiles = game.get('tiles').set(tile, updatedTile);
  return game.set('tiles', updatedTiles);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">revealTile</span>(<span class="hljs-params">game, tile</span>) </span>{
  <span class="hljs-keyword">var</span> updatedTile = game.get(<span class="hljs-string">'tiles'</span>).get(tile).set(<span class="hljs-string">'isRevealed'</span>, <span class="hljs-literal">true</span>);
  <span class="hljs-keyword">var</span> updatedTiles = game.get(<span class="hljs-string">'tiles'</span>).set(tile, updatedTile);
  <span class="hljs-keyword">return</span> game.set(<span class="hljs-string">'tiles'</span>, updatedTiles);
}</code></pre>
<p>我去，丑爆了有木有！</p>
<p>万幸，不可变性不止于此，一定有得救！这种需求很常见，所以工具早就考虑到了，可以这么操作：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function revealTile(game, tile) {
  return game.setIn(['tiles', tile, 'isRevealed'], true);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">revealTile</span>(<span class="hljs-params">game, tile</span>) </span>{
  <span class="hljs-keyword">return</span> game.setIn([<span class="hljs-string">'tiles'</span>, tile, <span class="hljs-string">'isRevealed'</span>], <span class="hljs-literal">true</span>);
}</code></pre>
<p>现在<code>revealTile</code>返回一个新的实例了，新实例里其中一个<code>tile</code>(雷区块)的<code>isRevealed</code>就和之前那个<code>game</code>实例里的不一样了。这里面用到的<code>setIn</code>是一个<code>null-safe</code>(空值安全)的函数，任意<code>keyPath</code>中的<code>key</code>不存在时，都会在这个位置创建一个新的不可变<code>map</code>(译者注：这句略绕，个人认为既然这里不是主讲<a href="https://github.com/facebook/immutable-js" rel="nofollow noreferrer" target="_blank">immutable.js</a>，那就没必要非提一下它的这个特性，反而不清不楚，原作没细说，那我也就不多说了，有兴趣的可以<a href="http://facebook.github.io/immutable-js/docs/#/Map/setIn" rel="nofollow noreferrer" target="_blank">来这里</a>自己揣摩)。这个<code>null-safe</code>特性对于我们现在扫雷游戏这个例子并不合适，因为“扫”一个不存在的<code>tile</code>(雷区块)表示我们正在试图扫雷区以外的地方，那显然不对！这里需要多做一步检查，通过<code>getIn</code>方法检查<code>tile</code>(雷区块)是否存在，然后再“扫”它：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function revealTile(game, tile) {
  return game.getIn(['tiles', tile]) ?
    game.setIn(['tiles', tile, 'isRevealed'], true) :
    game;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">revealTile</span>(<span class="hljs-params">game, tile</span>) </span>{
  <span class="hljs-keyword">return</span> game.getIn([<span class="hljs-string">'tiles'</span>, tile]) ?
    game.setIn([<span class="hljs-string">'tiles'</span>, tile, <span class="hljs-string">'isRevealed'</span>], <span class="hljs-literal">true</span>) :
    game;
}</code></pre>
<p>如果<code>tile</code>(雷区块)不存在，我们就返回原扫雷游戏实例。这就是个可迅速上手的关于不可变性(<code>Immutability</code>)的练习，想深入了解的可以看<a href="http://codepen.io/SitePoint/pen/zGYZzQ" rel="nofollow noreferrer" target="_blank">codepen</a><button class="btn btn-xs btn-default ml10 preview" data-url="SitePoint/pen/zGYZzQ" data-typeid="3">点击预览</button>，完整的实现都在里面了。</p>
<h2 id="articleHeader3">Performance怎么样?</h2>
<p>你可能觉得，这他妈Performance应该low爆了吧，我只能说某些情况下你是对的。每当你想添加点东西到一个不可变(<code>Immutable</code>)对象里时，她一定是先拷贝以存在值到新实例里，然后再给新实例添加内容，最后返回新实例。相比可变对象，这势必会有更多内存、计算量消耗。</p>
<p>因为不可变(<code>Immutable</code>)对象永远不变，实际上有一种实现策略叫“结构共享”，使得她的内存消耗远比你想象的少。虽然和内置的<code>array</code>、<code>object</code>的“变化”相比仍然会有额外的开销，但这个开始恒定，绝对可以被不可变性(<code>Immutability</code>)带来的其它众多优势所消磨、减少。在实践中，不可变性(<code>Immutability</code>)带来的优势可以极大的优化程序的整体性能，即使其中的某些个别操作开销变大了。</p>
<h2 id="articleHeader4">改进变更追踪</h2>
<p>各种UI框架里，最难的部分永远是变更追踪(译者注：或者叫“脏检查”)。这是<code>JavaScript</code>社区里的普遍问题，所以EcmaScript 7里提供了单独的API在保证Performance的前提下可以追踪变化：<code>Object.observe()</code>。很多人为之激动，但也有不少人认为这个API然并卵。他们认为，在任何情况下，这个API都没很好的解决变更追踪问题：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var tiles = [{id: 0, isRevealed: false}, {id: 1, isRevealed: true}];
Object.observe(tiles, function () { /* ... */ });

tiles[0].id = 2;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> tiles = [{<span class="hljs-attr">id</span>: <span class="hljs-number">0</span>, <span class="hljs-attr">isRevealed</span>: <span class="hljs-literal">false</span>}, {<span class="hljs-attr">id</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">isRevealed</span>: <span class="hljs-literal">true</span>}];
<span class="hljs-built_in">Object</span>.observe(tiles, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ <span class="hljs-comment">/* ... */</span> });

tiles[<span class="hljs-number">0</span>].id = <span class="hljs-number">2</span>;</code></pre>
<p>上面例子里，<code>tiles[0]</code>的变更并没有触发<code>observer</code>，所以其实这个提案即便是最简单的变更追踪也没做到。那不可变性(<code>Immutability</code>)又是怎么解决的？假设有一个应用状态<code>a</code>，然后它内部有值被改变了，于是就得到了一个新的实例<code>b</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (a === b) {
  // 数据没变，停止操作
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">if</span> (a === b) {
  <span class="hljs-comment">// 数据没变，停止操作</span>
}</code></pre>
<p>如果应用状态<code>a</code>没有被修改，那<code>b</code>就是<code>a</code>，它们指向同一个实例，<code>===</code>就够了，不用做其他事儿。当然这需要我们追踪应用状态的引用，但整个问题的复杂度被大大简化了，现在只要判断一下它们是否同一个实例的引用就好了，真心不用再去深入调查里面的某某字段是不是变了。</p>
<h2 id="articleHeader5">结束语</h2>
<p>希望本文能某种程度上帮你了解不可变性(<code>Immutability</code>)是如何帮我们优化/改进代码的，也希望这些例子从实践角度说清楚了使用方式。不可变性(<code>Immutability</code>)的热度在持续增高，我确定这绝不是你今年看到的关于不可变性(<code>Immutability</code>)的最后一文。同志们，是时候来一发了，我相信你用过后一定会high至的，就像我现在一样^^。</p>
<p>原文地址：<a href="http://www.sitepoint.com/immutability-javascript/" rel="nofollow noreferrer" target="_blank">Immutability in JavaScript</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
[译]JavaScript中的不可变性(Immutability)

## 原文链接
[https://segmentfault.com/a/1190000004906518](https://segmentfault.com/a/1190000004906518)

