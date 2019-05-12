---
title: '探索vue源码之缓存篇' 
date: 2019-02-05 2:30:09
hidden: true
slug: 35n18cfldis
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p><code>vue.js</code>入坑也有了小半年的时间了，圈子里一直流传着其源码优雅、简洁的传说。<br>最近的一次技术分享会，同事分享<code>vue.js</code>源码的缓存部分，鄙人将其整理出来，与大家一起学习</p></blockquote>
<h3 id="articleHeader0">一、从链表说起</h3>
<p>首先我们来看一下<a href="https://zh.wikipedia.org/wiki/%E9%93%BE%E8%A1%A8" rel="nofollow noreferrer" target="_blank">链表</a>的定义：</p>
<blockquote><p>链表（Linked list）是一种常见的基础数据结构，是一种线性表，但是并不会按线性的顺序存储数据，而是在每一个节点里存到下一个节点的指针(Pointer)</p></blockquote>
<p>其中的双向链表是我们今天的主角：</p>
<blockquote><p><strong>双向链表</strong>也叫<strong>双链表</strong>。双向链表中不仅有指向后一个节点的指针，还有指向前一个节点的指针。这样可以从任何一个节点访问前一个节点，当然也可以访问后一个节点，以至整个链表。一般是在需要大批量的另外储存数据在链表中的位置的时候用。</p></blockquote>
<p>图示如下（图片来自<a href="https://zh.wikipedia.org/wiki/%E9%93%BE%E8%A1%A8" rel="nofollow noreferrer" target="_blank">维基百科-链表</a>）：<br><span class="img-wrap"><img data-src="/img/bVB9lU?w=610&amp;h=41" src="https://static.alili.tech/img/bVB9lU?w=610&amp;h=41" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>想象一群人手拉手站成一排，除了队头跟队尾，可以根据每个人的左手以及右手找到排在其左边或者右边的人，这也可以看成一种双向链表</p>
<p>在<code>JavaScript</code>中，我们可以通过对象的属性来实现双向链表。</p>
<p>而在<code>vue.js</code>中，作者正是利用类似双向链表的方式实现缓存的利用</p>
<h3 id="articleHeader1">二、LRU算法</h3>
<p>在缓存中，利用类似双向链表来管理缓存并不难的。难的是如何更加高效的管理缓存，如何在缓存达到其最大内存空间，删除程序中最不常用的变量，而不是随机删除，造成最常用的变量被误删的情况。</p>
<p><code>vue.js</code>中采用<code>LRU算法</code>来实现缓存的高效管理。</p>
<p><code>LRU</code>是<code>Least Recently Used</code>的简称，具体内容可以查看<a href="https://github.com/rsms/js-lru" rel="nofollow noreferrer" target="_blank">GitHub</a>，其有以下优点：</p>
<ol>
<li><p>基于双向链表改变缓存对象中<code>entry</code>的排序，复杂度低</p></li>
<li><p>缓存对象有一个<code>head</code>（最近最少使用的项）和一个<code>tail</code>（最近最多使用的项）</p></li>
<li><p><code>head</code>和<code>tail</code>都是<code>entry</code>，一个<code>entry</code>可能会有一个<code>newer entry</code>以及一个<code>older entry</code>（双向链接，<code>older entry</code>更接近<code>head</code>，<code>newer entry</code>更接近<code>tail</code>）</p></li>
<li><p>使用一个<code>key</code>就可以遍历这个缓存对象，也就意味着只有<code>o(1)</code>的复杂度，内存消耗非常小</p></li>
</ol>
<p>可以通过下面的图来更好的理解<code>LRU算法</code>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    entry             entry             entry             entry        
    ______            ______            ______            ______       
   | head |.newer => |      |.newer => |      |.newer => | tail |      
   |  A   |          |  B   |          |  C   |          |  D   |      
   |______| <= older.|______| <= older.|______| <= older.|______|      
                                                                       
removed  <--  <--  <--  <--  <--  <--  <--  <--  <--  <--  <--  added
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gherkin"><code>    entry             entry             entry             entry        
    ______            ______            ______            ______       
   |<span class="hljs-string"> head </span>|<span class="hljs-string">.newer =&gt; </span>|<span class="hljs-string">      </span>|<span class="hljs-string">.newer =&gt; </span>|<span class="hljs-string">      </span>|<span class="hljs-string">.newer =&gt; </span>|<span class="hljs-string"> tail </span>|<span class="hljs-string">      
   </span>|<span class="hljs-string">  A   </span>|<span class="hljs-string">          </span>|<span class="hljs-string">  B   </span>|<span class="hljs-string">          </span>|<span class="hljs-string">  C   </span>|<span class="hljs-string">          </span>|<span class="hljs-string">  D   </span>|<span class="hljs-string">      
   </span>|<span class="hljs-string">______</span>|<span class="hljs-string"> &lt;= older.</span>|<span class="hljs-string">______</span>|<span class="hljs-string"> &lt;= older.</span>|<span class="hljs-string">______</span>|<span class="hljs-string"> &lt;= older.</span>|<span class="hljs-string">______</span>|<span class="hljs-string">      
                                                                       
removed  &lt;--  &lt;--  &lt;--  &lt;--  &lt;--  &lt;--  &lt;--  &lt;--  &lt;--  &lt;--  &lt;--  added
</span></code></pre>
<p>如果缓存达到最大，那么每次只需要将<code>head</code>删除就行了，保证了删除的项是<strong>最不常用的项</strong></p>
<p>还是拿站成一排的人来举例。</p>
<p>有两个指示牌，上面分别写着<code>tail</code>以及<code>head</code>。<code>head</code>指向队伍的第一个人，<code>tail</code>指向队伍的最后一个人。</p>
<p>假设队伍有10个人，按照队伍的排列从队首到队尾依次编号<code>a b c d ··· j</code>，<code>head</code>指向<code>a</code>，<code>tail</code>指向<code>j</code>。</p>
<p>下面分成五种情况来说明队伍的变化：</p>
<ol>
<li><p>如果叫到<code>a</code>（使用了数组里面第一个变量），就将<code>a</code>放到队尾，再手拉手重新组成一个新的队伍。并将原来指向<code>j</code>的<code>tail</code>现在指向<code>a</code>。再让原来指向<code>a</code>的<code>head</code>指向现在队伍的第一个人<code>b</code></p></li>
<li><p>如果叫到<code>b c d ··· i</code>之间任何一个人，则将其从队伍中抽出，放到队尾，重新排队，再改变<code>tail</code>的指向为这个人</p></li>
<li><p>如果叫到<code>j</code>,则保持队伍不变</p></li>
<li><p>队伍达到最大人数，则去掉<code>head</code>指向的编号<code>a</code>，并改变<code>head</code>指向编号<code>b</code>,再在队尾增加一个人，假定编号为<code>k</code>，最后则将<code>tail</code>指向编号<code>k</code></p></li>
<li><p>队伍没有达到最大人数，需要增加队伍人数。只需要在队尾增加编号为<code>k</code>的人。再将<code>tail</code>指向编号<code>k</code></p></li>
</ol>
<h3 id="articleHeader2">三、源码分析</h3>
<p>我们可以通过一张图来先简单理解作者的数据结构：<br><span class="img-wrap"><img data-src="/img/bVCjvA?w=733&amp;h=1290" src="https://static.alili.tech/img/bVCjvA?w=733&amp;h=1290" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>作者在<code>caches</code>对象的<code>_keymap</code>里面保存所需要缓存的变量，通过<code>older</code>以及<code>newer</code>这两个属性来实现双向链表。<code>older</code>指向其前一个对象，<code>newer</code>指向其后一个对象。通过这两个属性，将缓存中的变量连接起来。</p>
<p>以上图举例：<br>缓存<code>caches</code>这个对象中保存了三个变量:<code>key1</code>、<code>key2</code>、<code>key3</code>。</p>
<ul>
<li><p><code>header</code>指向<code>key1</code></p></li>
<li><p><code>tail</code>指向<code>key2</code></p></li>
</ul>
<p>指向如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="         key1              key2              key3       
        ______            ______            ______       
       | head |.newer => |      |.newer => | tail |      
       |      |          |      |          |      |      
       |______| <= older.|______| <= older.|______|  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gherkin"><code>         key1              key2              key3       
        ______            ______            ______       
       |<span class="hljs-string"> head </span>|<span class="hljs-string">.newer =&gt; </span>|<span class="hljs-string">      </span>|<span class="hljs-string">.newer =&gt; </span>|<span class="hljs-string"> tail </span>|<span class="hljs-string">      
       </span>|<span class="hljs-string">      </span>|<span class="hljs-string">          </span>|<span class="hljs-string">      </span>|<span class="hljs-string">          </span>|<span class="hljs-string">      </span>|<span class="hljs-string">      
       </span>|<span class="hljs-string">______</span>|<span class="hljs-string"> &lt;= older.</span>|<span class="hljs-string">______</span>|<span class="hljs-string"> &lt;= older.</span>|<span class="hljs-string">______</span>|<span class="hljs-string">  </span></code></pre>
<p>下面我们来看作者对这些数据的处理所使用的方法</p>
<p>文件位置：<code>src/cache.js</code></p>
<p>首先<code>export</code>构造函数<code>Cache</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default function Cache (limit) {
  // 标识当前缓存数组的大小
  this.size = 0
  // 标识缓存数组能达到的最大长度
  this.limit = limit
  // head（最不常用的项），tail（最常用的项）全部初始化为undefined
  this.head = this.tail = undefined
  this._keymap = Object.create(null)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Cache</span> (<span class="hljs-params">limit</span>) </span>{
  <span class="hljs-comment">// 标识当前缓存数组的大小</span>
  <span class="hljs-keyword">this</span>.size = <span class="hljs-number">0</span>
  <span class="hljs-comment">// 标识缓存数组能达到的最大长度</span>
  <span class="hljs-keyword">this</span>.limit = limit
  <span class="hljs-comment">// head（最不常用的项），tail（最常用的项）全部初始化为undefined</span>
  <span class="hljs-keyword">this</span>.head = <span class="hljs-keyword">this</span>.tail = <span class="hljs-literal">undefined</span>
  <span class="hljs-keyword">this</span>._keymap = <span class="hljs-built_in">Object</span>.create(<span class="hljs-literal">null</span>)
}</code></pre>
<p>接下来作者在<code>Cache</code>的原型链上面分别定义了：</p>
<ol>
<li><p><code>put</code>：在缓存中加入一个<code>key-value</code>对象，如果缓存数组已经达到最大值，则返回被删除的<code>entry</code>，即<code>head</code>,否则返回<code>undefined</code></p></li>
<li><p><code>shift</code>：在缓存数组中移除最少使用的<code>entry</code>，即<code>head</code>，返回被删除的<code>entry</code>。如果缓存数组为空，则返回<code>undefined</code></p></li>
<li><p><code>get</code>：将<code>key</code>为传入参数的缓存对象标识为最常使用的<code>entry</code>，即<code>tail</code>，并调整双向链表，返回改变后的<code>tail</code>。如果不存在<code>key</code>为传入参数的缓存对象，则返回<code>undefined</code></p></li>
</ol>
<p>a) <code>get</code>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Cache.prototype.get = function (key, returnEntry) {
  var entry = this._keymap[key]
  // 如果查找不到含有`key`这个属性的缓存对象
  if (entry === undefined) return
  // 如果查找到的缓存对象已经是 tail (最近使用过的)
  if (entry === this.tail) {
    return returnEntry
      ? entry
      : entry.value
  }
  // HEAD--------------TAIL
  //   <.older   .newer>
  //  <--- add direction --
  //   A  B  C  <D>  E
  if (entry.newer) {
  // 处理 newer 指向
    if (entry === this.head) {
      // 如果查找到的缓存对象是 head (最近最少使用过的)
      // 则将 head 指向原 head 的 newer 所指向的缓存对象
      this.head = entry.newer
    }
    // 将所查找的缓存对象的下一级的 older 指向所查找的缓存对象的older所指向的值
    // 例如：A B C D E
    // 如果查找到的是D，那么将E指向C，不再指向D
    entry.newer.older = entry.older // C <-- E.
  }
  if (entry.older) {
  // 处理 older 指向
    // 如果查找到的是D，那么C指向E，不再指向D
    entry.older.newer = entry.newer // C. --> E
  }
  // 处理所查找到的对象的 newer 以及 older 指向
  entry.newer = undefined // D --x
  // older指向之前使用过的变量，即D指向E
  entry.older = this.tail // D. --> E
  if (this.tail) {
    // 将E的newer指向D
    this.tail.newer = entry // E. <-- D
  }
  // 改变 tail 为D 
  this.tail = entry
  return returnEntry
    ? entry
    : entry.value
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">Cache.prototype.get = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">key, returnEntry</span>) </span>{
  <span class="hljs-keyword">var</span> entry = <span class="hljs-keyword">this</span>._keymap[key]
  <span class="hljs-comment">// 如果查找不到含有`key`这个属性的缓存对象</span>
  <span class="hljs-keyword">if</span> (entry === <span class="hljs-literal">undefined</span>) <span class="hljs-keyword">return</span>
  <span class="hljs-comment">// 如果查找到的缓存对象已经是 tail (最近使用过的)</span>
  <span class="hljs-keyword">if</span> (entry === <span class="hljs-keyword">this</span>.tail) {
    <span class="hljs-keyword">return</span> returnEntry
      ? entry
      : entry.value
  }
  <span class="hljs-comment">// HEAD--------------TAIL</span>
  <span class="hljs-comment">//   &lt;.older   .newer&gt;</span>
  <span class="hljs-comment">//  &lt;--- add direction --</span>
  <span class="hljs-comment">//   A  B  C  &lt;D&gt;  E</span>
  <span class="hljs-keyword">if</span> (entry.newer) {
  <span class="hljs-comment">// 处理 newer 指向</span>
    <span class="hljs-keyword">if</span> (entry === <span class="hljs-keyword">this</span>.head) {
      <span class="hljs-comment">// 如果查找到的缓存对象是 head (最近最少使用过的)</span>
      <span class="hljs-comment">// 则将 head 指向原 head 的 newer 所指向的缓存对象</span>
      <span class="hljs-keyword">this</span>.head = entry.newer
    }
    <span class="hljs-comment">// 将所查找的缓存对象的下一级的 older 指向所查找的缓存对象的older所指向的值</span>
    <span class="hljs-comment">// 例如：A B C D E</span>
    <span class="hljs-comment">// 如果查找到的是D，那么将E指向C，不再指向D</span>
    entry.newer.older = entry.older <span class="hljs-comment">// C &lt;-- E.</span>
  }
  <span class="hljs-keyword">if</span> (entry.older) {
  <span class="hljs-comment">// 处理 older 指向</span>
    <span class="hljs-comment">// 如果查找到的是D，那么C指向E，不再指向D</span>
    entry.older.newer = entry.newer <span class="hljs-comment">// C. --&gt; E</span>
  }
  <span class="hljs-comment">// 处理所查找到的对象的 newer 以及 older 指向</span>
  entry.newer = <span class="hljs-literal">undefined</span> <span class="hljs-comment">// D --x</span>
  <span class="hljs-comment">// older指向之前使用过的变量，即D指向E</span>
  entry.older = <span class="hljs-keyword">this</span>.tail <span class="hljs-comment">// D. --&gt; E</span>
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.tail) {
    <span class="hljs-comment">// 将E的newer指向D</span>
    <span class="hljs-keyword">this</span>.tail.newer = entry <span class="hljs-comment">// E. &lt;-- D</span>
  }
  <span class="hljs-comment">// 改变 tail 为D </span>
  <span class="hljs-keyword">this</span>.tail = entry
  <span class="hljs-keyword">return</span> returnEntry
    ? entry
    : entry.value
}</code></pre>
<p>b) <code>put</code>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Cache.prototype.put = function (key, value) {
  var removed

  var entry = this.get(key, true)
  // 如果不存在 key 这样属性的缓存对象，才能调用 put 方法
  if (!entry) {
    if (this.size === this.limit) {
    // 如果缓存数组达到上限，则先删除 head 指向的缓存对象
      removed = this.shift()
    }
    // 初始化赋值
    entry = {
      key: key
    }
    this._keymap[key] = entry
    if (this.tail) {
    // 如果存在tail（缓存数组的长度不为0），将tail指向新的 entry
      this.tail.newer = entry
      entry.older = this.tail
    } else {
    // 如果缓存数组的长度为0，将head指向新的entry
      this.head = entry
    }
    this.tail = entry
    this.size++
  }
  entry.value = value

  return removed
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">Cache.prototype.put = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">key, value</span>) </span>{
  <span class="hljs-keyword">var</span> removed

  <span class="hljs-keyword">var</span> entry = <span class="hljs-keyword">this</span>.get(key, <span class="hljs-literal">true</span>)
  <span class="hljs-comment">// 如果不存在 key 这样属性的缓存对象，才能调用 put 方法</span>
  <span class="hljs-keyword">if</span> (!entry) {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.size === <span class="hljs-keyword">this</span>.limit) {
    <span class="hljs-comment">// 如果缓存数组达到上限，则先删除 head 指向的缓存对象</span>
      removed = <span class="hljs-keyword">this</span>.shift()
    }
    <span class="hljs-comment">// 初始化赋值</span>
    entry = {
      <span class="hljs-attr">key</span>: key
    }
    <span class="hljs-keyword">this</span>._keymap[key] = entry
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.tail) {
    <span class="hljs-comment">// 如果存在tail（缓存数组的长度不为0），将tail指向新的 entry</span>
      <span class="hljs-keyword">this</span>.tail.newer = entry
      entry.older = <span class="hljs-keyword">this</span>.tail
    } <span class="hljs-keyword">else</span> {
    <span class="hljs-comment">// 如果缓存数组的长度为0，将head指向新的entry</span>
      <span class="hljs-keyword">this</span>.head = entry
    }
    <span class="hljs-keyword">this</span>.tail = entry
    <span class="hljs-keyword">this</span>.size++
  }
  entry.value = value

  <span class="hljs-keyword">return</span> removed
}</code></pre>
<p>c) <code>shift</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Cache.prototype.shift = function () {
  var entry = this.head
  if (entry) {
    // 删除 head ，并改变指向
    this.head = this.head.newer
    this.head.older = undefined
    entry.newer = entry.older = undefined
    // 同步更新 _keymap 里面的属性值
    this._keymap[entry.key] = undefined
    // 同步更新 缓存数组的长度
    this.size--
  }
  return entry
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">Cache.prototype.shift = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> entry = <span class="hljs-keyword">this</span>.head
  <span class="hljs-keyword">if</span> (entry) {
    <span class="hljs-comment">// 删除 head ，并改变指向</span>
    <span class="hljs-keyword">this</span>.head = <span class="hljs-keyword">this</span>.head.newer
    <span class="hljs-keyword">this</span>.head.older = <span class="hljs-literal">undefined</span>
    entry.newer = entry.older = <span class="hljs-literal">undefined</span>
    <span class="hljs-comment">// 同步更新 _keymap 里面的属性值</span>
    <span class="hljs-keyword">this</span>._keymap[entry.key] = <span class="hljs-literal">undefined</span>
    <span class="hljs-comment">// 同步更新 缓存数组的长度</span>
    <span class="hljs-keyword">this</span>.size--
  }
  <span class="hljs-keyword">return</span> entry
}</code></pre>
<h3 id="articleHeader3">四、后记</h3>
<p>从整个的代码来看，需要学习的不仅仅是<code>LRU算法</code>，作者的对于<code>Object</code>的处理方式也值的我们评味一番。</p>
<p>没有选择去遍历<code>entry</code>，选择通过在<code>Cache</code>内增加一个<code>_keymap</code>属性，通过这个属性来管理<code>entry</code>，实现<code>key</code>与<code>newer</code>、<code>older</code>状态的分离，减少代码的复杂度</p>
<h3 id="articleHeader4">五、附</h3>
<ol>
<li><p>源码版本为<code>v1.0.26</code></p></li>
<li><p>主要内容来自<strong>爱屋吉屋FE团队</strong>的技术分享会</p></li>
</ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
探索vue源码之缓存篇

## 原文链接
[https://segmentfault.com/a/1190000006670689](https://segmentfault.com/a/1190000006670689)

