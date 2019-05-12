---
title: 'Vue_Vue权威指南' 
date: 2019-02-03 2:30:39
hidden: true
slug: ar7e5nam88j
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">Vue特性</h1>
<p>Vue只是聚焦视图层，是一个构建数据驱动的Web界面的库。 <br>Vue通过简单 API提供高效的数据绑定和灵活的组件系统</p>
<ol>
<li><p>轻量</p></li>
<li><p>数据绑定</p></li>
<li><p>指令</p></li>
<li><p>插件化</p></li>
</ol>
<p>架构从传统后台MVC 向REST API + 前端MV*迁移<br>DOM是数据的一种自然映射</p>
<p>Vue核心：<br><code>组件化</code>和<code>数据驱动</code></p>
<p>组件化: 扩展HTML元素，封装可重用的代码<br>每个组件对应一个工程目录，组件所需要的各种资源在这个目录下就近维护。</p>
<h1 id="articleHeader1">Vue与其它框架的区别</h1>
<p>对比标准：<br><code>文件大小（性能）</code>，<code>入门曲线（易用）</code>,<code>社区繁荣</code>,<code>吸取优点</code></p>
<p><strong>与AngularJs区别</strong></p>
<p>相同点：</p>
<ul>
<li><p>支持指令 -- 内置指令和自定义指令</p></li>
<li><p>支持过滤器 -- 内置过滤器和自定义过滤器</p></li>
<li><p>支持双向绑定</p></li>
<li><p>都不支持低端浏览器(IE6/7/8)</p></li>
</ul>
<p>不同点：<br>在性能上，ANgualrJS依赖对数据做脏检查，所以<code>Watcher</code>越多越慢，Vue使用依赖追中的观察并且使用异步队列更新，所有的数据都是独立触发的。</p>
<p><strong>与React的区别</strong>          </p>
<p>相同点：</p>
<ul>
<li><p>React采用特殊的<code>JSX</code>语法，Vue在组建开中也推崇编写<code>.vue</code>特殊文件格式，对文件内容都有一些约定，两者都需要编译后使用。</p></li>
<li><p>中心思想相同：一切都是组件，组件实例之间可以嵌套。</p></li>
<li><p>都提供合理的钩子函数，可以去定制化的去处理需求。</p></li>
<li><p>都不内置类似AJAX，Router等功能到核心包，而是以其它方式(插件)加载。</p></li>
<li><p>在组建开发中，都支持mixins的特性。</p></li>
</ul>
<p>不同点：</p>
<ul>
<li><p>React依赖 Virtual DOM，而Vue使用的DOM模板。React采用的Virtual DOM会对渲染出来的结果做脏检查</p></li>
<li><p>Vue在模板中提供了指令，过滤器等。可以方便快捷的操作DOM。</p></li>
</ul>
<p>脏检查：在angular中，没有办法对数据是否做了更改，所以设置触发条件，当触发这些条件，就执行一个检查来遍历所有的数据，对比更改的地方，然后执行变化，保留没有更改的地方。<br>效率不高，很多多余，称之为 脏检查。(过程：数据修改了，结果：保留就数据)</p>
<p>Vue稳定版本：<code>1.0.24</code></p>
<h1 id="articleHeader2">数据绑定</h1>
<p>数据绑定是将数据和视图想关联，当数据发生变化时，可以自动更新视图。</p>
<h2 id="articleHeader3">插值</h2>
<p><strong>mustache标签</strong><br>文本插值：<code>"{{""}}"</code><br>有时候只需渲染一次数据,后续数据变化不再关心，使用：<code>"{{"*"}}"</code><br>HTML片段：<code>"{{"{"}}"}</code></p>
<p>注意:Vue指令和自身特性内是不可以插值。</p>
<h2 id="articleHeader4">表达式</h2>
<p>mustache标签可以由JavaScript表达式和过滤器(本质上是一个JavaScript函数)构成。</p>
<p>表达式：各种数值，变量，运算符的综合体。</p>
<p><code>"{{"var a = 100;"}}"</code> // 错误。 是语句，并不是表达式<br><code>"{{"if (true) return 'a'"}}"</code> // 条件控制语句是不支持，可以使用 三目运算符</p>
<h2 id="articleHeader5">指令</h2>
<p>作用：当表达式的值发生变化时，将这个变化也反映到DOM上。</p>
<p><strong>分隔符</strong></p>
<ol><li>
<p>delimiters</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.config.delimiters = ['<%', '%>'];
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code>Vue.<span class="hljs-built_in">config</span>.delimiters = [<span class="hljs-string">'&lt;%'</span>, <span class="hljs-string">'%&gt;'</span>];
</code></pre>
</li></ol>
<p>修改了默认的文本插值的分隔符，则文本插值的语法由<code>"{{"example"}}"</code> 变为<code>&lt;%example%&gt;</code></p>
<ol><li>
<p>unsafeDelimiters</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.config.unsafeDelimiters = ['<$', '$>'];
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code>Vue.<span class="hljs-built_in">config</span>.unsafeDelimiters = [<span class="hljs-string">'&lt;$'</span>, <span class="hljs-string">'$&gt;'</span>];
</code></pre>
<p>如果修改了默认的HTML插值的分隔符，则HTML插值的语法由<code>"{{"example"}}"</code>变为 &lt;$emample&amp;dollar;&gt;</p>
</li></ol>
<h1 id="articleHeader6">指令</h1>
<p>指令的值限定为绑定表达式。<br>作用：当其表达式的值改变时把某些特殊的行为应用到DOM上。</p>
<h2 id="articleHeader7">内部指令</h2>
<p><strong>v-if</strong></p>
<p>根据表达式的值在DOM中生成或移除一个元素。</p>
<p><strong>v-show</strong></p>
<p>根据表达式的值来显示或隐藏HTML元素。</p>
<p>在切换<code>v-if</code>模块时，Vue有一个局部编译/卸载过程，因为<code>v-if</code>中的模板可能包括数据绑定或子组件，<code>v-if</code>是真实的条件渲染，因为它会包缺条件块在切换时合适地销毁与重建条件块内的时间监听器和子组件</p>
<p><code>v-if</code>是惰性的---如果初始渲染时条件为假，则什么也不做，在条件第一次变为真时才开始局部编译(编译会被缓存起来)<br>相比<code>v-show</code> -- 元素始终被编译并保留，只是简单的基于CSS切换。</p>
<p><code>v-if</code>有更高的切换消耗，而<code>v-show</code>有更高的初始渲染消耗。因此，如果需要频繁的切换，则使用<code>v-show</code>较好，如果在运行时条件不大可能变化，则使用<code>v-if</code>较好</p>
<p><strong>v-else</strong></p>
<p>必须跟着<code>v-if</code>或<code>v-show</code>后面，充当<code>else</code>功能</p>
<p><strong>v-model</strong></p>
<p>用来在 <code>input</code>, <code>select</code>, <code>text</code>, <code>checkbox</code>, <code>radio</code> 等表单控件元素上创建双向数据绑定。根据控件类型，v-model自动选取正确的方法更新元素。</p>
<p>在<code>v-model</code>指令可以添加参数<code>number</code>,<code>lazy</code>,<code>debounce</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input type=&quot;text&quot; v-model=&quot;msg&quot; number />
<!-- 输入的自动转换为Number类型(如果原始的转换结果为NaN，则返回原始值) -->

<input type=&quot;text&quot; v-model=&quot;msg&quot; lazy />
<!-- 默认情况下，v-model 在 input 时间中同步输入框的值与数据， 可以添加一个lazy特性，从而将数据改到 change事件中发生 -->

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"msg"</span> <span class="hljs-attr">number</span> /&gt;</span>
<span class="hljs-comment">&lt;!-- 输入的自动转换为Number类型(如果原始的转换结果为NaN，则返回原始值) --&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"msg"</span> <span class="hljs-attr">lazy</span> /&gt;</span>
<span class="hljs-comment">&lt;!-- 默认情况下，v-model 在 input 时间中同步输入框的值与数据， 可以添加一个lazy特性，从而将数据改到 change事件中发生 --&gt;</span>

</code></pre>
<p><strong>v-for</strong></p>
<p>基于源数据重复渲染元素，可以使用<code>$index</code>来呈现相对应的数组索引</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<ul id=&quot;demo&quot;>
    <li v-for=&quot;item in items&quot; class=&quot;item-"{{"$index"}}"&quot;>
        "{{"item.childMsg"}}"
    </li>
</ul>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"demo"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"item in items"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"item-</span></span></span><span class="hljs-template-variable">"{{"$index"}}"</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span>&gt;</span>
        </span><span class="hljs-template-variable">"{{"item.childMsg"}}"</span><span class="xml">
    <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
</span></code></pre>
<p>Vue 1.0.17及以后支持 <code>of分隔符</code>.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div v-for=&quot;item of items&quot;></div>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> v-<span class="hljs-keyword">for</span>=<span class="hljs-string">"item of items"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
</code></pre>
<p>使用<code>v-for</code>，将得到一个特殊的作用域，需要明确指定props属性传递数据，否则在组建内江获取不到数据。(隔离作用域)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
<my-item v-for=&quot;item in items&quot; :item=&quot;item&quot; :index=&quot;$index&quot;>
    <p>"{{"item.text"}}"</p>
</my-item>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>
&lt;<span class="hljs-keyword">my</span>-<span class="hljs-built_in">item</span> v-<span class="hljs-keyword">for</span>=<span class="hljs-string">"item in items"</span> :<span class="hljs-built_in">item</span>=<span class="hljs-string">"item"</span> :index=<span class="hljs-string">"$index"</span>&gt;
    &lt;p&gt;"{{"<span class="hljs-built_in">item</span>.<span class="hljs-built_in">text</span>"}}"&lt;/p&gt;
&lt;/<span class="hljs-keyword">my</span>-<span class="hljs-built_in">item</span>&gt;
</code></pre>
<p>Vue包装了被观察数据的变异方法，它们能触发视图更新。<br><code>push()</code>,<code>pop()</code>,<code>shilt()</code>,<code>unshift()</code>,<code>splice()</code>,<code>sort()</code>,<code>reverse()</code></p>
<p>Vue重写了这些方法之后,触发了<code>notify</code></p>
<p>Vue增加了两个方法来观测变化：<code>$set</code>，<code>$remove</code>。</p>
<p>$set : 通过索引设置数组元素并触发视图更新。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vm.animals.$set(0, {name: 'Aardvark'});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code>vm.animals.$<span class="hljs-keyword">set</span>(<span class="hljs-number">0</span>, {<span class="hljs-keyword">name</span>: <span class="hljs-string">'Aardvark'</span>});
</code></pre>
<p>$set,$remove 底层都是调用<code>splice()</code>方法。</p>
<p>应该尽量避免直接设置数据绑定的数组元素，因为这些变化不会被Vue检测到，因为也不会更新视图渲染，可以使用<code>$set()</code>.</p>
<p>Vue不能检测到数组的变化</p>
<ul>
<li><p>直接用索引设置元素. 例如：vm.items[0] = {};</p></li>
<li><p>修改数据的长度, 例如：vm.items.length = 0;</p></li>
</ul>
<p>解决方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vm.items.$set(0, {});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sqf"><code>vm.<span class="hljs-built_in">items</span>.$<span class="hljs-built_in">set</span>(<span class="hljs-number">0</span>, {});
</code></pre>
<p>第二个问题，用一个空数据替换items即可。</p>
<p><code>v-for</code>遍历一个对象，每一个重复的实例都将有一个特殊的属性<code>$key</code>，或者给对象的简直提供一个别名。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<li v-for=&quot;itme in item&quot;>"{{"$key"}}" : "{{"item"}}"</li>

<li v-for=&quot;(key, value) in item&quot;>"{{"key"}}" : "{{"item.msg"}}"</li>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code>&lt;li v-for=<span class="hljs-string">"itme in item"</span>&gt;"{{"$key"}}" : "{{"item"}}"&lt;/li&gt;

&lt;li v-for=<span class="hljs-string">"(key, value) in item"</span>&gt;"{{"key"}}" : "{{"item.msg"}}"&lt;/li&gt;
</code></pre>
<p><code>v-for</code> 支持整数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<li v-for=&quot;itme in 10&quot;></li>    
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>&lt;li v-<span class="hljs-keyword">for</span>=<span class="hljs-string">"itme in 10"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>    
</code></pre>
<p>ECMAScript无法检测到新属性添加到一个对象上或者在对象中删除。要处理这样的状况Vue增加三种方法：<code>$add(key,value)</code>,<code>$set(key, value)</code>,<code>$delete(key)</code>这些方法可以用来添加和删除属性，同时可以触发视图的更新。    </p>
<p><strong>v-text</strong>    </p>
<p><code>v-text</code>指令可以更新元素的textContent。在内部，<code>"{{" Mustache "}}"</code>插值也被编译为textNode的一个<code>v-text</code>指令。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
<span v-text=&quot;msg&quot;></span>

<span>"{{"msg"}}"</span>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml">
<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">v-text</span>=<span class="hljs-string">"msg"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span></span><span class="hljs-template-variable">"{{"msg"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
</span></code></pre>
<p><strong>v-html</strong><br>可以更新元素的InnerHTML。内容按普通 HTML插入 -- 数据绑定被忽略。</p>
<p><code>"{{"{Mustache"}}"}</code> 插值也会被编译为锚节点上的一个<code>v-html</code>指令</p>
<p>不建议直接动态渲染任意的HTML片段，很容易导致<code>XSS</code>攻击.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div v-html=&quot;html&quot;></div>
<div>"{{"{html"}}"}</div>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-html</span>=<span class="hljs-string">"html"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span></span><span class="hljs-template-variable">"{{"{html"}}"</span><span class="xml">}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</span></code></pre>
<p><strong>v-bind</strong>    </p>
<p>响应更新HTML特性，将一个或多个attribute，或一个组件prop动态绑定到表达式。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<img v-bind:src=&quot;imgSrc&quot; />
<img :src=&quot;imgSrc&quot; />
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>&lt;<span class="hljs-selector-tag">img</span> v-bind:src=<span class="hljs-string">"imgSrc"</span> /&gt;
&lt;<span class="hljs-selector-tag">img</span> :src=<span class="hljs-string">"imgSrc"</span> /&gt;
</code></pre>
<p>在绑定prop时，prop必须在子组件中声明。可以用修饰符指定不同的绑定类型。</p>
<p>修饰符为:</p>
<ul>
<li><p><code>.sync</code> --- 双向绑定，只能用于prop绑定。</p></li>
<li><p><code>.noce</code> --- 单次绑定，只能用于prop绑定</p></li>
<li><p><code>.camel</code> --- 将绑定的特性名字转换驼峰命名(通常用于绑定用驼峰命名的SVG特性)</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<my-component :prop=&quot;smoeThing&quot;></my-component>
<my-component :prop.sync=&quot;smoeThing&quot;></my-component>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">my</span>-component :<span class="hljs-keyword">prop</span>=<span class="hljs-string">"smoeThing"</span>&gt;&lt;/<span class="hljs-keyword">my</span>-component&gt;
&lt;<span class="hljs-keyword">my</span>-component :<span class="hljs-keyword">prop</span>.sync=<span class="hljs-string">"smoeThing"</span>&gt;&lt;/<span class="hljs-keyword">my</span>-component&gt;
</code></pre>
<p><strong>v-on</strong>    <br>用于绑定事件监听器，事件类型由参数指定。</p>
<p>在监听原生DOM事件时，如果只定义一个参数。 DOM event 为事件的唯一参数;如果在内联语句处理器中访问原生DOM事件，则可以用特殊变量$event把它传入方法中。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
<!-- 方法 -->
<button v-on:click=&quot;methods&quot;></button>
<!-- 内联语句 -->
<button v-on:click=&quot;methods(123, $event)&quot;></button>
<!-- 缩写 -->
<button @click=&quot;methods&quot;></button>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>
<span class="hljs-comment">&lt;!-- 方法 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">v-on:click</span>=<span class="hljs-string">"methods"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-comment">&lt;!-- 内联语句 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">v-on:click</span>=<span class="hljs-string">"methods(123, $event)"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-comment">&lt;!-- 缩写 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"methods"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
</code></pre>
<hr>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 停止冒泡 -->
<button @click.stop=&quot;methods&quot;></button>
<!-- 阻止默认行为 -->
<button @click.prevent=&quot;methods&quot;></button>
<!-- 阻止默认行为，没有表达式 -->
<button @submit.prevent></button>
<!-- 串联修饰符 -->
<button @click.stop.prevent=&quot;methods&quot;></button>
<!-- 修饰符，键别名 -->
<button @keyup.enter=&quot;onEnter&quot;></button>

<!-- 键修饰符，键代码 -->
<button @keyup.13=&quot;onEnter&quot;></button>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-comment">&lt;!-- 停止冒泡 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click.stop</span>=<span class="hljs-string">"methods"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-comment">&lt;!-- 阻止默认行为 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click.prevent</span>=<span class="hljs-string">"methods"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-comment">&lt;!-- 阻止默认行为，没有表达式 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">submit.prevent</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-comment">&lt;!-- 串联修饰符 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click.stop.prevent</span>=<span class="hljs-string">"methods"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-comment">&lt;!-- 修饰符，键别名 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">keyup.enter</span>=<span class="hljs-string">"onEnter"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>

<span class="hljs-comment">&lt;!-- 键修饰符，键代码 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">keyup.13</span>=<span class="hljs-string">"onEnter"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
</code></pre>
<p><strong>v-ref</strong></p>
<p>在父组件上注册一个子组件的索引，便于直接访问。不需要表达式，必须提供参数id。可以通过父组件的<code>$refs</code>对象访问子组件</p>
<p><strong>v-el</strong>    </p>
<p>为DOM元素注册一个索引，方便通过所属实例的$els访问这个元素。可以用<code>v-el:smoe-el</code>设置<code>this.$els.smoeEl</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   
<div class=&quot;app&quot;>
    
    <span v-el:msg>hello</span>
    <span v-el:other-msg>Vue</span>
    
</div>

<script src=&quot;vue1.js&quot; type=&quot;text/javascript&quot; charset=&quot;utf-8&quot;></script>

<script type=&quot;text/javascript&quot;>
    
    new Vue({
        el: '.app',
        ready: function () {
            console.log( this.$els.msg.textContent ); // hello
            console.log( this.$els.otherMsg ); // <span>Vue<span>
        }
    });
    
</script>

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>   
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"app"</span>&gt;</span>
    
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">v-el:msg</span>&gt;</span>hello<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">v-el:other-msg</span>&gt;</span>Vue<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"vue1.js"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
    
    <span class="hljs-keyword">new</span> Vue({
        <span class="hljs-attr">el</span>: <span class="hljs-string">'.app'</span>,
        <span class="hljs-attr">ready</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">console</span>.log( <span class="hljs-keyword">this</span>.$els.msg.textContent ); <span class="hljs-comment">// hello</span>
            <span class="hljs-built_in">console</span>.log( <span class="hljs-keyword">this</span>.$els.otherMsg ); <span class="hljs-comment">// &lt;span&gt;Vue&lt;span&gt;</span>
        }
    });
    
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

</code></pre>
<p><strong>v-pre</strong>    </p>
<p>编译时跳过当前元素和它的子元素。可以用来显示原始Mustache标签。跳过大量没有指令的节点会加快编译。</p>
<p><strong>v-cloak</strong></p>
<p><code>v-cloak</code> 这个指令保持在元素上知道关联实例结果编译。<br>解决闪烁问题</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[v-cloak] {
    dispnay: none;
}
<div v-cloak>
    "{{"message"}}"
</div>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml">[v-cloak] {
    dispnay: none;
}
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-cloak</span>&gt;</span>
    </span><span class="hljs-template-variable">"{{"message"}}"</span><span class="xml">
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</span></code></pre>
<h2 id="articleHeader8">自定义指令</h2>
<p>自定义指令提供一种机制将数据的变化映射为DOM行为。</p>
<blockquote><p>钩子函数</p></blockquote>
<p>Vue中的钩子函数都是可选的，相互之间没有制约关系</p>
<ul>
<li><p>bind， 只调用一次，在指令第一次绑定到元素上时调用。</p></li>
<li><p>update， 在bind之后立即以初始值为参数第一次调用，之后每当绑定值变化时调用，参数为新值与旧值。</p></li>
<li>
<p>unbind，只调用一次，在指令从元素上绑定时调用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.directive('my-directive', {
    bind: function () {
        // 准备工作
        // 例如，添加时间处理器或只需要运行一次的高耗任务
    },
    update: function ( newValue, oldValue ) {
        // 值更新时的工作
        // 也会以初始值为参数调用一次    
    },
    unbind: function () {
        // 清理工作
        // 例如，删除bind() 添加的事件监听器    
    }
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>Vue.directive(<span class="hljs-string">'my-directive'</span>, {
    bind: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
        <span class="hljs-comment">// 准备工作</span>
        <span class="hljs-comment">// 例如，添加时间处理器或只需要运行一次的高耗任务</span>
    },
    update: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">( newValue, oldValue )</span> </span>{
        <span class="hljs-comment">// 值更新时的工作</span>
        <span class="hljs-comment">// 也会以初始值为参数调用一次    </span>
    },
    unbind: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
        <span class="hljs-comment">// 清理工作</span>
        <span class="hljs-comment">// 例如，删除bind() 添加的事件监听器    </span>
    }
});
</code></pre>
</li>
</ul>
<p>使用指令：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div v-my-direactive=&quot;someValue&quot;></div>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> v-<span class="hljs-keyword">my</span>-direactive=<span class="hljs-string">"someValue"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
</code></pre>
<p>只需要update函数是，可以传入一个函数替代定义对象</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
Vue.direactive('my-directive', function () {
    // update();
});  
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>
Vue.direactive(<span class="hljs-string">'my-directive'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
    <span class="hljs-comment">// update();</span>
});  
</code></pre>
<blockquote><p>指令实例属性</p></blockquote>
<p>所有的钩子函数都将被复制都实际的指令对象中，在钩子内this指向这个指令对象。</p>
<ul>
<li><p>el -- 指令绑定的元素</p></li>
<li><p>vm -- 拥有该指令的上下文ViewModel</p></li>
<li><p>expression -- 指令的表达式，不包括参数和过滤器。</p></li>
<li><p>arg -- 指令的参数</p></li>
<li><p>name -- 指令的名字，不包含前缀</p></li>
<li><p>modifires  -- 一个对象，包括指令的修饰符</p></li>
<li><p>descriptor -- 一个对象，包含指令的解析结果</p></li>
</ul>
<p>将这些属性视为<strong>只读</strong>，不要修改他们。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
<div id=&quot;app&quot; @click=&quot;up&quot;>
    <div v-my-directive:hello.a.b=&quot;msg&quot;></div>
</div>

<script src=&quot;//cdn.bootcss.com/vue/1.0.2/vue.js&quot; type=&quot;text/javascript&quot; charset=&quot;utf-8&quot;></script>

<script type=&quot;text/javascript&quot;>
    
    Vue.directive('my-directive', {
        bind: function() {
            console.log('bound!');
        },
        update: function( value ) {
            this.el.innerHTML = 
                'name -' + this.name + '<br />' +
                'expression - ' + this.expression + '<br />' +
                'argument - ' + this.arg + '<br />' +
                'modifiers - ' + JSON.stringify(this.mondifiers) + '<br />' +
                'value -' + value + '<br />' +
                'vm-msg' + this.vm.msg;
        }
    });
        //name -my-directive
        //expression - msg
        //argument - hello
        //modifiers - undefined
        //value -hello
        //vm-msghello
    
    new Vue({
        el: '#app',
        data: {
            msg: 'hello'
        },
        methods: {
            up: function() {
                console.log('click');
            }
        }
    });
    
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"up"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-my-directive:hello.a.b</span>=<span class="hljs-string">"msg"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"//cdn.bootcss.com/vue/1.0.2/vue.js"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
    
    Vue.directive(<span class="hljs-string">'my-directive'</span>, {
        <span class="hljs-attr">bind</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'bound!'</span>);
        },
        <span class="hljs-attr">update</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"> value </span>) </span>{
            <span class="hljs-keyword">this</span>.el.innerHTML = 
                <span class="hljs-string">'name -'</span> + <span class="hljs-keyword">this</span>.name + <span class="hljs-string">'&lt;br /&gt;'</span> +
                <span class="hljs-string">'expression - '</span> + <span class="hljs-keyword">this</span>.expression + <span class="hljs-string">'&lt;br /&gt;'</span> +
                <span class="hljs-string">'argument - '</span> + <span class="hljs-keyword">this</span>.arg + <span class="hljs-string">'&lt;br /&gt;'</span> +
                <span class="hljs-string">'modifiers - '</span> + <span class="hljs-built_in">JSON</span>.stringify(<span class="hljs-keyword">this</span>.mondifiers) + <span class="hljs-string">'&lt;br /&gt;'</span> +
                <span class="hljs-string">'value -'</span> + value + <span class="hljs-string">'&lt;br /&gt;'</span> +
                <span class="hljs-string">'vm-msg'</span> + <span class="hljs-keyword">this</span>.vm.msg;
        }
    });
        <span class="hljs-comment">//name -my-directive</span>
        <span class="hljs-comment">//expression - msg</span>
        <span class="hljs-comment">//argument - hello</span>
        <span class="hljs-comment">//modifiers - undefined</span>
        <span class="hljs-comment">//value -hello</span>
        <span class="hljs-comment">//vm-msghello</span>
    
    <span class="hljs-keyword">new</span> Vue({
        <span class="hljs-attr">el</span>: <span class="hljs-string">'#app'</span>,
        <span class="hljs-attr">data</span>: {
            <span class="hljs-attr">msg</span>: <span class="hljs-string">'hello'</span>
        },
        <span class="hljs-attr">methods</span>: {
            <span class="hljs-attr">up</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'click'</span>);
            }
        }
    });
    
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<h2 id="articleHeader9">指令高级选项</h2>
<p>自定义指令提供一种机制将数据的变化映射为DOM行为</p>
<p><strong>params</strong><br>自定义指令可以接收一个params数组，指定一个特性列表，Vue编译器将自定提取绑定元素的这些特性。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>
    <my-direactvie class=&quot;hello&quot; name=&quot;hi&quot; a=&quot;aaaa&quot;></my-direactvie>
</div>

<script src=&quot;//cdn.bootcss.com/vue/1.0.2/vue.js&quot; type=&quot;text/javascript&quot; charset=&quot;utf-8&quot;></script>

<script type=&quot;text/javascript&quot;>
    
    Vue.elementDirective('my-direactvie', {
        
        params: ['a'],
        
        bind: function() {
            
            console.log(this.params.a);
            
            console.log(this.el.getAttribute('name'));
            
        }
        
    });
    
    new Vue({
        el: '#app'
    });
    
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">my-direactvie</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"hello"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"hi"</span> <span class="hljs-attr">a</span>=<span class="hljs-string">"aaaa"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">my-direactvie</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"//cdn.bootcss.com/vue/1.0.2/vue.js"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
    
    Vue.elementDirective(<span class="hljs-string">'my-direactvie'</span>, {
        
        <span class="hljs-attr">params</span>: [<span class="hljs-string">'a'</span>],
        
        <span class="hljs-attr">bind</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            
            <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.params.a);
            
            <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.el.getAttribute(<span class="hljs-string">'name'</span>));
            
        }
        
    });
    
    <span class="hljs-keyword">new</span> Vue({
        <span class="hljs-attr">el</span>: <span class="hljs-string">'#app'</span>
    });
    
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p>支持动态(v-bind),this.params[key]会自动保持更新。可以指定一个回调，在值变化时调用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>
    <my-direactvie class=&quot;hello&quot; name=&quot;hi&quot; v-bind:a=&quot;someValue&quot;></my-direactvie>
    <input type=&quot;text&quot; v-model=&quot;someValue&quot; name=&quot;&quot; id=&quot;&quot; value=&quot;&quot; />
</div>

<script src=&quot;//cdn.bootcss.com/vue/1.0.2/vue.js&quot; type=&quot;text/javascript&quot; charset=&quot;utf-8&quot;></script>

<script type=&quot;text/javascript&quot;>
    
    Vue.elementDirective('my-direactvie', {
        
        params: ['a'],
        
        paramWatchers: {
            a: function() {
                console.log('a changed!');
            }
        }
        
    });
    
    new Vue({
        el: '#app',
        data: {
            someValue: ''
        }
    });
    
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">my-direactvie</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"hello"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"hi"</span> <span class="hljs-attr">v-bind:a</span>=<span class="hljs-string">"someValue"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">my-direactvie</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"someValue"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">""</span> <span class="hljs-attr">id</span>=<span class="hljs-string">""</span> <span class="hljs-attr">value</span>=<span class="hljs-string">""</span> /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"//cdn.bootcss.com/vue/1.0.2/vue.js"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
    
    Vue.elementDirective(<span class="hljs-string">'my-direactvie'</span>, {
        
        <span class="hljs-attr">params</span>: [<span class="hljs-string">'a'</span>],
        
        <span class="hljs-attr">paramWatchers</span>: {
            <span class="hljs-attr">a</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'a changed!'</span>);
            }
        }
        
    });
    
    <span class="hljs-keyword">new</span> Vue({
        <span class="hljs-attr">el</span>: <span class="hljs-string">'#app'</span>,
        <span class="hljs-attr">data</span>: {
            <span class="hljs-attr">someValue</span>: <span class="hljs-string">''</span>
        }
    });
    
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p><strong>deep</strong></p>
<p>如果自定义指令使用在<strong>一个对象</strong>上，当对象内部属性变化时要触发update，则在指令定义对象中指定 <code>deep:true</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
<div id=&quot;app&quot;>
    <div v-my-directive=&quot;a&quot;></div>
    <button @click=&quot;change&quot;>change</button>"{{"a.b.c"}}"
</div>

<script src=&quot;//cdn.bootcss.com/vue/1.0.2/vue.js&quot; type=&quot;text/javascript&quot; charset=&quot;utf-8&quot;></script>

<script type=&quot;text/javascript&quot;>

    Vue.directive('my-directive', {
        deep: true,
        update: function( obj ) {
            console.log( obj.b.c );
        }
    });
    new Vue({
        el: '#app',
        data: {
            a: {
                b: {
                    c: 2
                }
            }
        },
        methods: {
            change: function() {
                this.a.b.c = 4;
            }
        }
    });

    
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml">
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-my-directive</span>=<span class="hljs-string">"a"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"change"</span>&gt;</span>change<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span><span class="hljs-template-variable">"{{"a.b.c"}}"</span><span class="xml">
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"//cdn.bootcss.com/vue/1.0.2/vue.js"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">

    Vue.directive(<span class="hljs-string">'my-directive'</span>, {
        <span class="hljs-attr">deep</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">update</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"> obj </span>) </span>{
            <span class="hljs-built_in">console</span>.log( obj.b.c );
        }
    });
    <span class="hljs-keyword">new</span> Vue({
        <span class="hljs-attr">el</span>: <span class="hljs-string">'#app'</span>,
        <span class="hljs-attr">data</span>: {
            <span class="hljs-attr">a</span>: {
                <span class="hljs-attr">b</span>: {
                    <span class="hljs-attr">c</span>: <span class="hljs-number">2</span>
                }
            }
        },
        <span class="hljs-attr">methods</span>: {
            <span class="hljs-attr">change</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                <span class="hljs-keyword">this</span>.a.b.c = <span class="hljs-number">4</span>;
            }
        }
    });

    
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</span></code></pre>
<p><strong>twoWay</strong></p>
<p>如果指令想VUe实例写回数据，则在指令定义对象中指定<code>twoWay:true</code><br>作用：允许在指令中使用<code>this.set(value)</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
<div id=&quot;app&quot;>
    自定义组件: <input v-exp=&quot;a.b.c&quot; /> <br />
    父作用域："{{"a.b.c"}}"
</div>

<script src=&quot;//cdn.bootcss.com/vue/1.0.2/vue.js&quot; type=&quot;text/javascript&quot; charset=&quot;utf-8&quot;></script>

<script type=&quot;text/javascript&quot;>
    
    Vue.directive('exp', {
        twoWay: true,
        bind: function() {
            this.handler = function() {
                
                // 把数据写回 vm
                // 如果指令这样绑定 v-exp=&quot;a.b.c&quot;
                // 这里将会绑定 `vm.a.b.c` 赋值
                this.set(this.el.value);
            }.bind(this);
            this.el.addEventListener('input', this.handler)
        },
        update: function() {
            this.el.removeEventListener('input', this.handler);
        }
    });
    
    new Vue({
        el: '#app',
        data: {
            a: {
                b: {
                    c: 2
                }
            }
        }
    });
    
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml">
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    自定义组件: <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">v-exp</span>=<span class="hljs-string">"a.b.c"</span> /&gt;</span> <span class="hljs-tag">&lt;<span class="hljs-name">br</span> /&gt;</span>
    父作用域：</span><span class="hljs-template-variable">"{{"a.b.c"}}"</span><span class="xml">
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"//cdn.bootcss.com/vue/1.0.2/vue.js"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="actionscript">
    
    Vue.directive(<span class="hljs-string">'exp'</span>, {
        twoWay: <span class="hljs-literal">true</span>,
        bind: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
            <span class="hljs-keyword">this</span>.handler = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
                
                <span class="hljs-comment">// 把数据写回 vm</span>
                <span class="hljs-comment">// 如果指令这样绑定 v-exp="a.b.c"</span>
                <span class="hljs-comment">// 这里将会绑定 `vm.a.b.c` 赋值</span>
                <span class="hljs-keyword">this</span>.set(<span class="hljs-keyword">this</span>.el.value);
            }.bind(<span class="hljs-keyword">this</span>);
            <span class="hljs-keyword">this</span>.el.addEventListener(<span class="hljs-string">'input'</span>, <span class="hljs-keyword">this</span>.handler)
        },
        update: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
            <span class="hljs-keyword">this</span>.el.removeEventListener(<span class="hljs-string">'input'</span>, <span class="hljs-keyword">this</span>.handler);
        }
    });
    
    <span class="hljs-keyword">new</span> Vue({
        el: <span class="hljs-string">'#app'</span>,
        data: {
            a: {
                b: {
                    c: <span class="hljs-number">2</span>
                }
            }
        }
    });
    
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</span></code></pre>
<p><strong>acceptStatement</strong></p>
<p>传入<code>acceptStatement:true</code>可以让自定义指令接受内联语句，就像v-on那样。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>
    <div v-my-directive=&quot;a++&quot;></div>
    "{{"a"}}"
</div>

<script src=&quot;//cdn.bootcss.com/vue/1.0.2/vue.js&quot; type=&quot;text/javascript&quot; charset=&quot;utf-8&quot;></script>

<script type=&quot;text/javascript&quot;>
    
    Vue.directive('my-directive', {
        acceptStatement: true,
        update: function( fn ) {
            // 传入一个是函数
            // 调用它是将在所属实例作用域内计算&quot;a++&quot;语句
            console.log( fn.toString() );
            fn();
        }
    });
    
    new Vue({
        el: '#app',
        data: {
            a: 5
        }
    });
    
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-my-directive</span>=<span class="hljs-string">"a++"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    </span><span class="hljs-template-variable">"{{"a"}}"</span><span class="xml">
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"//cdn.bootcss.com/vue/1.0.2/vue.js"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
    
    Vue.directive(<span class="hljs-string">'my-directive'</span>, {
        <span class="hljs-attr">acceptStatement</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">update</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"> fn </span>) </span>{
            <span class="hljs-comment">// 传入一个是函数</span>
            <span class="hljs-comment">// 调用它是将在所属实例作用域内计算"a++"语句</span>
            <span class="hljs-built_in">console</span>.log( fn.toString() );
            fn();
        }
    });
    
    <span class="hljs-keyword">new</span> Vue({
        <span class="hljs-attr">el</span>: <span class="hljs-string">'#app'</span>,
        <span class="hljs-attr">data</span>: {
            <span class="hljs-attr">a</span>: <span class="hljs-number">5</span>
        }
    });
    
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</span></code></pre>
<p><strong>Terminal</strong></p>
<p>Vue通过递归遍历DOM树来编译模块。但是遇到<code>terminal</code>指令时会停止遍历这个元素的后代，这个指令将会接管编译这个元素及其后代的任务。 <code>v-if</code>和 <code>v-for</code>都是<code>terminal</code>指令</p>
<p><strong>priority</strong></p>
<p>可以给指令指定一个优先级。如果没有指定优先级，普通指令默认是1000,terminal指令默认是2000.同一个元素上优先级高的指令会比其它指令处理得早已一些，优先级一样的指令按照它在元素特性列表中出现的顺序依次处理，但是不能保证这个顺序在不同浏览器中是一致的。</p>
<p>流程控制指令 <code>v-if</code>和<code>v-for</code>在编译过程中始终拥有最高的优先级。</p>
<p>指令可使用的配置项：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.directive(id, {
    params: [],
    deep: true, // 使用对象，对象内部属性变化，触发update
    twoWay: true, // 指令把数据写回Vue实例
    acceptStatement: true, // 自定义指令接受内联语句 (类似`v-on`)
    priority: 2222, // 优先级
    bind: function() {},
    update: function() {},
    unbind: function() {}
});

Vue.directive(id, function() {
    
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>Vue.directive(id, {
    params: [],
    deep: <span class="hljs-literal">true</span>, <span class="hljs-comment">// 使用对象，对象内部属性变化，触发update</span>
    twoWay: <span class="hljs-literal">true</span>, <span class="hljs-comment">// 指令把数据写回Vue实例</span>
    acceptStatement: <span class="hljs-literal">true</span>, <span class="hljs-comment">// 自定义指令接受内联语句 (类似`v-on`)</span>
    priority: <span class="hljs-number">2222</span>, <span class="hljs-comment">// 优先级</span>
    bind: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{},
    update: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{},
    unbind: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{}
});

Vue.directive(id, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
    
});
</code></pre>
<p>问题：</p>
<p><strong>v-on可以绑定多个方法吗?</strong></p>
<p><code>v-on</code>可以绑定多种类型的方法，可以是click，可以是focus事件，也可以是change事件<br>但是使用<code>v-on</code>绑定了两个甚至多个click事件，那么<code>v-on</code>只会绑定第一个click事件，其它会被自动忽略。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input type=&quot;text&quot; :value=&quot;name&quot; @input=&quot;onInput&quot; @focus=&quot;onFocus&quot; @blur=&quot;onBlur&quot; />
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code>&lt;input <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">"text"</span> :value=<span class="hljs-string">"name"</span> <span class="hljs-meta">@input</span>=<span class="hljs-string">"onInput"</span> <span class="hljs-meta">@focus</span>=<span class="hljs-string">"onFocus"</span> <span class="hljs-meta">@blur</span>=<span class="hljs-string">"onBlur"</span> /&gt;
</code></pre>
<p><strong>一个Vue实例可以绑定多个element元素吗?</strong>    </p>
<p><code>el</code>为实例提供挂载元素，值可以是CSS选择符，或实际的HTML元素，或返回HTML元素的函数。这边，元素只用作挂载点。如果提供了模板，则元素被替换，除非replace为false.元素可以用vm.$el访问。</p>
<p><strong>在Vue中如何让v-for循环出来的列表里面的click事件只对当前列表内元素有效?</strong></p>
<ol>
<li><p>从数据角度出发，定好数据结构，然后操作数据</p></li>
<li><p>通过$event对象，获取当前事件源，然后操作下面的元素.</p></li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;app&quot;>
    
    <ul>
        <li @click=&quot;toggle(item)&quot; v-for=&quot;item in items&quot;>
            <span v-show=&quot;item.show&quot;>"{{"item.content"}}"</span>
        </li>
    </ul>
    
</div>

<script src=&quot;vue1.js&quot; type=&quot;text/javascript&quot; charset=&quot;utf-8&quot;></script>

<script type=&quot;text/javascript&quot;>
    
    new Vue({
        el: '.app',
        data: {
            items: [
                {
                    content: '1 item',
                    show: true
                }, {
                    content: '2 item',
                    show: true
                }, {
                    content: '3 item',
                    show: false
                }
            ]
        },
        methods: {
            toggle: function ( item ) {
                item.show = !item.show;
            }
        }
    });
    
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"app"</span>&gt;</span>
    
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"toggle(item)"</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"item in items"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">v-show</span>=<span class="hljs-string">"item.show"</span>&gt;</span></span><span class="hljs-template-variable">"{{"item.content"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"vue1.js"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="actionscript">
    
    <span class="hljs-keyword">new</span> Vue({
        el: <span class="hljs-string">'.app'</span>,
        data: {
            items: [
                {
                    content: <span class="hljs-string">'1 item'</span>,
                    show: <span class="hljs-literal">true</span>
                }, {
                    content: <span class="hljs-string">'2 item'</span>,
                    show: <span class="hljs-literal">true</span>
                }, {
                    content: <span class="hljs-string">'3 item'</span>,
                    show: <span class="hljs-literal">false</span>
                }
            ]
        },
        methods: {
            toggle: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">( item )</span> </span>{
                item.show = !item.show;
            }
        }
    });
    
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</span></code></pre>
<h1 id="articleHeader10">计算属性</h1>
<p>通常会在模板中绑定表达式，模板是用来描述视图结构的。如果模板中的表达式存在过多的逻辑，模板会变成臃肿不堪，维护变得非常困难，因此，为了简化逻辑，当某个属性值依赖于其它属性的值，可以使用计算属性。</p>
<h2 id="articleHeader11">什么是计算属性</h2>
<p>计算属性就是当其依赖属性的值发生变化时，这个属性的值会自动更新，与之相关的DOM部分也会同步自动更新。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;app&quot;>
    
    <input type=&quot;text&quot; v-model=&quot;didi&quot; />
    <input type=&quot;text&quot; v-model=&quot;family&quot; />
    <br />
    
    didi = "{{"didi"}}", family = "{{"family"}}", didiFamily = "{{"didiFamily"}}"
    
</div>


<script src=&quot;vue1.js&quot; type=&quot;text/javascript&quot; charset=&quot;utf-8&quot;></script>

<script type=&quot;text/javascript&quot;>
    
    new Vue({
        el: '.app',
        data: {
            didi: 'didi',
            family: 'family'
        },
        computed: {
            didiFamily: {
                get: function () {
                    return this.didi + this.family;
                },
                set: function ( val ) {
                    var names = val.split(' ');
                    this.didi = names[0];
                    this.family = names[1];
                }
            }
        }
    });
    
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"app"</span>&gt;</span>
    
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"didi"</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"family"</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">br</span> /&gt;</span>
    
    didi = </span><span class="hljs-template-variable">"{{"didi"}}"</span><span class="xml">, family = </span><span class="hljs-template-variable">"{{"family"}}"</span><span class="xml">, didiFamily = </span><span class="hljs-template-variable">"{{"didiFamily"}}"</span><span class="xml">
    
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>


<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"vue1.js"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="actionscript">
    
    <span class="hljs-keyword">new</span> Vue({
        el: <span class="hljs-string">'.app'</span>,
        data: {
            didi: <span class="hljs-string">'didi'</span>,
            family: <span class="hljs-string">'family'</span>
        },
        computed: {
            didiFamily: {
                <span class="hljs-keyword">get</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
                    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.didi + <span class="hljs-keyword">this</span>.family;
                },
                <span class="hljs-keyword">set</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">( val )</span> </span>{
                    <span class="hljs-keyword">var</span> names = val.split(<span class="hljs-string">' '</span>);
                    <span class="hljs-keyword">this</span>.didi = names[<span class="hljs-number">0</span>];
                    <span class="hljs-keyword">this</span>.family = names[<span class="hljs-number">1</span>];
                }
            }
        }
    });
    
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</span></code></pre>
<h2 id="articleHeader12">计算属性缓存</h2>
<p>计算属性方法中执行大量的耗时操作，则可能会带来一些性能问题。<br>例如：在计算属性getter中循环一个大的数组以执行很多操作，那么当频繁调用该计算属性时，就会导致大量不必要的运算。<br>而在 <code>Vue 0.12.8</code>版本中，在这方面进行了优化，即只有计算属性依赖的属性值发生了改变时才会重新执行getter<br>这样存在一个问题：就是只有Vue实例中被观察的数据发生了改变时才会重新执行getter。但是有时候计算属性依赖实时的非观察数据属性。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;app&quot;>
    <input type=&quot;text&quot; v-model=&quot;welcome&quot; name=&quot;&quot; id=&quot;&quot; />
    "{{"welcome"}}"
    <p>"{{"example"}}"</p>
</div>


<script src=&quot;vue1.js&quot; type=&quot;text/javascript&quot; charset=&quot;utf-8&quot;></script>

<script type=&quot;text/javascript&quot;>
    
    new Vue({
        el: '.app',
        data: {
            welcome: 'welcome to join didi'
        },
        computed: {
            example: function () {
                return Date.now() + this.welcome;
            }
        }
    });
    
</script>
    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"welcome"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">""</span> <span class="hljs-attr">id</span>=<span class="hljs-string">""</span> /&gt;</span>
    </span><span class="hljs-template-variable">"{{"welcome"}}"</span><span class="xml">
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span></span><span class="hljs-template-variable">"{{"example"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>


<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"vue1.js"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
    
    <span class="hljs-keyword">new</span> Vue({
        <span class="hljs-attr">el</span>: <span class="hljs-string">'.app'</span>,
        <span class="hljs-attr">data</span>: {
            <span class="hljs-attr">welcome</span>: <span class="hljs-string">'welcome to join didi'</span>
        },
        <span class="hljs-attr">computed</span>: {
            <span class="hljs-attr">example</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                <span class="hljs-keyword">return</span> <span class="hljs-built_in">Date</span>.now() + <span class="hljs-keyword">this</span>.welcome;
            }
        }
    });
    
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    </span></code></pre>
<p>在每次访问example时都取得最新的事件而不是缓存的事件。从<code>Vue 0.12.11</code>版本开始，默认提供了缓存开关。 在计算属性对象中指定cache字段来控制是否开启缓存。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Vue({
    el: '.app',
    data: {
        welcome: 'welcome to join didi'
    },
    computed: {
        example: {
            cache: false, // 关闭缓存，默认为true
            get: function () {
                return Date.now() + this.welcome;
            }
        }
    }
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">new</span> <span class="hljs-selector-tag">Vue</span>({
    <span class="hljs-attribute">el</span>: <span class="hljs-string">'.app'</span>,
    data: {
        welcome: <span class="hljs-string">'welcome to join didi'</span>
    },
    <span class="hljs-selector-tag">computed</span>: {
        <span class="hljs-attribute">example</span>: {
            cache: false, // 关闭缓存，默认为true
            get: function () {
                return Date.<span class="hljs-built_in">now</span>() + this.welcome;
            }
        }
    }
});
</code></pre>
<p>设置cache为false关闭缓存之后，每次直接访问vm.example 时都会重新执行getter方法。</p>
<p>问题：</p>
<p><strong>计算属性getter不执行的场景</strong></p>
<p>当计算属性依赖的数据属性发生改变时，计算属性的getter方法就会执行。在有些情况下，虽然依赖数据属性发生了改变，但计算属性的getter方法并不会执行。</p>
<p>当包含计算属性的节点<strong>被移出模板</strong>中其它地方<strong>没有再引用该属性</strong>时，那么对应的计算属性的getter不会执行。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;app&quot;>
    
    <button @click=&quot;toggleShow&quot;>Toggle Show Total Price</button>
    <p v-if=&quot;showTotal&quot;>Total Price = "{{"totalPrices"}}"</p>
    "{{"totalPrices"}}"
</div>

<script src=&quot;vue1.js&quot; type=&quot;text/javascript&quot; charset=&quot;utf-8&quot;></script>

<script type=&quot;text/javascript&quot;>
    
    new Vue({
        el: '.app',
        data: {
            showTotal: true,
            basePrice: 100
        },
        computed: {
            totalPrices: function () {
                return this.basePrice + 1;
            }
        },
        methods: {
            toggleShow: function () {
                this.showTotal = !this.showTotal; 
            }
        }
    });
    
</script>

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"app"</span>&gt;</span>
    
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"toggleShow"</span>&gt;</span>Toggle Show Total Price<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"showTotal"</span>&gt;</span>Total Price = </span><span class="hljs-template-variable">"{{"totalPrices"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    </span><span class="hljs-template-variable">"{{"totalPrices"}}"</span><span class="xml">
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"vue1.js"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="actionscript">
    
    <span class="hljs-keyword">new</span> Vue({
        el: <span class="hljs-string">'.app'</span>,
        data: {
            showTotal: <span class="hljs-literal">true</span>,
            basePrice: <span class="hljs-number">100</span>
        },
        computed: {
            totalPrices: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
                <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.basePrice + <span class="hljs-number">1</span>;
            }
        },
        methods: {
            toggleShow: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
                <span class="hljs-keyword">this</span>.showTotal = !<span class="hljs-keyword">this</span>.showTotal; 
            }
        }
    });
    
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

</span></code></pre>
<h1 id="articleHeader13">表单控件</h1>
<h2 id="articleHeader14">基本使用</h2>
<p><strong>text</strong></p>
<p>设置文本框<code>v-model</code>为<code>name</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input type=&quot;text&quot; v-model=&quot;name&quot; />
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fsharp"><code>&lt;input <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">"text"</span> v-model=<span class="hljs-string">"name"</span> /&gt;
</code></pre>
<p><strong>checkbox</strong>    </p>
<p>一般的，使用多个复选框，被选中的值将会放入一个数组中。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>
    
    <input type=&quot;checkbox&quot; id=&quot;flash&quot; value=&quot;flash&quot; v-model=&quot;bizLines&quot; />
    <label for=&quot;flash&quot;>快</label>

    <input type=&quot;checkbox&quot; id=&quot;premium&quot; value=&quot;premium&quot; v-model=&quot;bizLines&quot; />
    <label for=&quot;premium&quot;>专</label>

    <p>Checked lines: "{{"bizLines | json"}}"</p>

</div>

<script src=&quot;//cdn.bootcss.com/vue/1.0.2/vue.js&quot; type=&quot;text/javascript&quot; charset=&quot;utf-8&quot;></script>

<script type=&quot;text/javascript&quot;>
    
    new Vue({
        el: '#app',
        data: {
            bizLines: []
        },
        ready: function() {
            console.log( this.bizLines );
        }
    });
    
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"checkbox"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"flash"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"flash"</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"bizLines"</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">for</span>=<span class="hljs-string">"flash"</span>&gt;</span>快<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"checkbox"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"premium"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"premium"</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"bizLines"</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">for</span>=<span class="hljs-string">"premium"</span>&gt;</span>专<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Checked lines: </span><span class="hljs-template-variable">"{{"bizLines | json"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"//cdn.bootcss.com/vue/1.0.2/vue.js"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
    
    <span class="hljs-keyword">new</span> Vue({
        <span class="hljs-attr">el</span>: <span class="hljs-string">'#app'</span>,
        <span class="hljs-attr">data</span>: {
            <span class="hljs-attr">bizLines</span>: []
        },
        <span class="hljs-attr">ready</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">console</span>.log( <span class="hljs-keyword">this</span>.bizLines );
        }
    });
    
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</span></code></pre>
<p><strong>radio</strong></p>
<p>单选按钮被选择时，v-dmoel中的变量值会被赋值为对应的value值。</p>
<p><strong>select</strong></p>
<p>通过<code>v-for</code>指令来冬天生成option</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
<div id=&quot;app&quot;>
    
    <select v-model=&quot;bizLine&quot;>
        <option v-for=&quot;option in options&quot; :value=&quot;option.value&quot;>
            "{{"option.value"}}" "{{"option.premium"}}"
        </option>
    </select>
    <p>bizLine: "{{"bizLine"}}"</p>
    
</div>

<script src=&quot;//cdn.bootcss.com/vue/1.0.2/vue.js&quot; type=&quot;text/javascript&quot; charset=&quot;utf-8&quot;></script>

<script type=&quot;text/javascript&quot;>
    
    new Vue({
        el: '#app',
        data: {
            bizLine: 'falsh',
            options: [
                { text: '快', value: 'falsh' },
                { text: '专', value: 'premium' }
            ]
        }
    });
    
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml">
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    
    <span class="hljs-tag">&lt;<span class="hljs-name">select</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"bizLine"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"option in options"</span> <span class="hljs-attr">:value</span>=<span class="hljs-string">"option.value"</span>&gt;</span>
            </span><span class="hljs-template-variable">"{{"option.value"}}"</span><span class="xml"> </span><span class="hljs-template-variable">"{{"option.premium"}}"</span><span class="xml">
        <span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">select</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>bizLine: </span><span class="hljs-template-variable">"{{"bizLine"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"//cdn.bootcss.com/vue/1.0.2/vue.js"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="actionscript">
    
    <span class="hljs-keyword">new</span> Vue({
        el: <span class="hljs-string">'#app'</span>,
        data: {
            bizLine: <span class="hljs-string">'falsh'</span>,
            options: [
                { text: <span class="hljs-string">'快'</span>, value: <span class="hljs-string">'falsh'</span> },
                { text: <span class="hljs-string">'专'</span>, value: <span class="hljs-string">'premium'</span> }
            ]
        }
    });
    
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</span></code></pre>
<h2 id="articleHeader15">值绑定</h2>
<p><strong>checkbox</strong></p>
<p>使用 <code>:value</code> 进行绑定</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input type=&quot;checkbox&quot; id=&quot;falsh&quot; :value=&quot;flash&quot; v-model=&quot;bizLines&quot; />
<label for=&quot;falsh&quot;></label>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code>&lt;<span class="hljs-keyword">input</span> <span class="hljs-keyword">type</span>=<span class="hljs-string">"checkbox"</span> id=<span class="hljs-string">"falsh"</span> :value=<span class="hljs-string">"flash"</span> v-model=<span class="hljs-string">"bizLines"</span> /&gt;
&lt;<span class="hljs-keyword">label</span> <span class="hljs-keyword">for</span>=<span class="hljs-string">"falsh"</span>&gt;&lt;/<span class="hljs-keyword">label</span>&gt;
</code></pre>
<p>vm.bizLines === vm.flash</p>
<h2 id="articleHeader16">v-model</h2>
<p>视图与Model之间同步数据</p>
<p><strong>lazy</strong><br>一般的，<code>v-model</code>在input时间中同步输入框的值与数据，可以添加一个lazy特性。从而改到change事件中去同步。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input v-model=&quot;msg&quot; lazy /> <br />
"{{"msg"}}"" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"msg"</span> <span class="hljs-attr">lazy</span> /&gt;</span> <span class="hljs-tag">&lt;<span class="hljs-name">br</span> /&gt;</span>
"{{"msg"}}"</code></pre>
<p><strong>debounce</strong><br>设置一个最小延迟，一般的在 AJAX 请求时，有效。</p>
<p><strong>number</strong><br>可以在<code>v-model</code>所在的控件上使用number指令，该指令会在用户输入被同步到Model中时将其转化为数值类型，如果装换结果为NaN，则对应的Model值该是用户输入的原始值。</p>
<h1 id="articleHeader17">过滤器</h1>
<p>过滤器，本质上都是函数，其作用在于用户输入数据后，它能够进行处理，并返回一个数据结果。</p>
<p>Vue支持在任何出现表达式的地方添加过滤器，除了<code>"{{""}}"</code>mustache风格的表达式之外，还可以在绑定指令的表达式后调用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<span v-text=&quot;message | uppercase&quot;></span>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">v-text</span>=<span class="hljs-string">"message | uppercase"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></code></pre>
<p>过滤器可以接收参数，参数跟在过滤器后面，参数之间以空格分隔。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<p>"{{"msg | filterFunction 'arg1' arg2"}}"</p>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>"{{"msg | filterFunction 'arg1' arg2"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></code></pre>
<p>过滤器函数始终以表达式的值作为第一个参数，带引号的参数会被当作字符串处理，而不带引号的参数会被当作数据属性名来处理。</p>
<p>Linux shell 的管道符号，上一个命令的输出可以作为下一个命令的输入。<br>Vue过滤器支持链式调用，上一个过滤器的输出的结果可以作为下一个过滤器的输入。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<span>"{{"'ddfe' | capitalize | reverse"}}"</span>
<!-- 
    -> 'ddfe' => 'Defe' => 'efeD'
    capitalize 过滤器: 将输入字符串中的单词的首字母大写
    reverse过滤器: 反转字符串顺序 
-->" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>"{{"'ddfe' | capitalize | reverse"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-comment">&lt;!-- 
    -&gt; 'ddfe' =&gt; 'Defe' =&gt; 'efeD'
    capitalize 过滤器: 将输入字符串中的单词的首字母大写
    reverse过滤器: 反转字符串顺序 
--&gt;</span></code></pre>
<h2 id="articleHeader18">内置过滤器</h2>
<p><strong>字母操作</strong>   </p>
<p><code>capitalize</code>,<code>uppercase</code>,<code>lowercase</code> 三个过滤器用于处理英文字符。</p>
<p><code>capitalize</code> 过滤器： 将表达式中的首字母转大写形式。<br><code>uppercase</code>  过滤器：所有字母转换为大写形式。<br><code>lowercase</code> 过滤器：所有字母转为小写形式。</p>
<p><strong>json</strong></p>
<p>json过滤器本质上时JSON.stringify(); 的精简缩略版。<br>作用：将表达式的值转换为JSON字符串。</p>
<p><strong>限制</strong><br><code>limitBy</code>,<code>filterBy</code>,<code>orderBy</code> 用于处理并返回过滤后的数组。 例如与<code>v-for</code>搭配使用。</p>
<blockquote><p>limitBy</p></blockquote>
<p><code>limitBy</code>过滤器的作用时限制数组为开始的前N个元素，其中N由传入的第一个参数指定。第二个参数可选用于指定开始的偏移量。默认偏移量为 0. 如果第二个参数为3，则表示从数组下标第3个的地方开始计数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
<div v-for=&quot;item in tiems | limitBy 10&quot;></div>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>
&lt;<span class="hljs-keyword">div</span> v-<span class="hljs-keyword">for</span>=<span class="hljs-string">"item in tiems | limitBy 10"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
</code></pre>
<blockquote><p>filterBy</p></blockquote>
<p>第一个参数可以是字符串或者函数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div v-for=&quot;item in times | fitlerBy 'hello'&quot;></div>
<!-- 过滤出含有hello 字符串的元素 -->" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"item in times | fitlerBy 'hello'"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-comment">&lt;!-- 过滤出含有hello 字符串的元素 --&gt;</span></code></pre>
<blockquote><p>orderBy</p></blockquote>
<p>返回排序后的数组</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<ul>
    <li v-for=&quot;user in users | orderBy 'lastName' 'firsetname' 'age'&quot;>"{{"user.lasetName"}}"--"{{"user.firsetName"}}"--"{{"user.age"}}"</li>
</ul>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"user in users | orderBy 'lastName' 'firsetname' 'age'"</span>&gt;</span>"{{"user.lasetName"}}"--"{{"user.firsetName"}}"--"{{"user.age"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></code></pre>
<h2 id="articleHeader19">自定义过滤器</h2>
<p><strong>fitler语法</strong>    </p>
<p>Vue.filter(ID, function() {});</p>
<p>单参数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
<div id=&quot;app&quot;>
    <p v-text=&quot;message | reverse&quot;></p>
</div>

<script type=&quot;text/javascript&quot;>
    
    Vue.filter('reverse', function( val ) {
        return val.split('').reverse().join('');
    });
    
    new Vue({
        el: '#app',
        data: {
            message: 'abcdeq'
        }
    });
    
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">v-text</span>=<span class="hljs-string">"message | reverse"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="actionscript">
    
    Vue.filter(<span class="hljs-string">'reverse'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">( val )</span> </span>{
        <span class="hljs-keyword">return</span> val.split(<span class="hljs-string">''</span>).reverse().join(<span class="hljs-string">''</span>);
    });
    
    <span class="hljs-keyword">new</span> Vue({
        el: <span class="hljs-string">'#app'</span>,
        data: {
            message: <span class="hljs-string">'abcdeq'</span>
        }
    });
    
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p>多参数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
<div id=&quot;app&quot;>
    <p v-text=&quot;message | reverse 'before' 'after'&quot;></p>
</div>

<script type=&quot;text/javascript&quot;>
    
    Vue.filter('reverse', function( val, begine, end ) {
        return begine + '---' + val + '---' + end;
    });
    
    new Vue({
        el: '#app',
        data: {
            message: 'abcdeq'
        }
    });
    
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">v-text</span>=<span class="hljs-string">"message | reverse 'before' 'after'"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="actionscript">
    
    Vue.filter(<span class="hljs-string">'reverse'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">( val, begine, end )</span> </span>{
        <span class="hljs-keyword">return</span> begine + <span class="hljs-string">'---'</span> + val + <span class="hljs-string">'---'</span> + end;
    });
    
    <span class="hljs-keyword">new</span> Vue({
        el: <span class="hljs-string">'#app'</span>,
        data: {
            message: <span class="hljs-string">'abcdeq'</span>
        }
    });
    
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p>双向过滤器</p>
<p>Vue支持把视图(input元素)的值在写回模型前进行转化。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.filter('MSG', {
    // model -> view
    // read 函数可选
    read: function() {
        console.log( 123 );
    },
    
    // view -> model
    // write函数将在数据被写入Model之前调用
    // 两个参数分别为表达式的新值和旧值
    write: function( newVal, oldVal ) {
        console.log( newVal, oldVal );
    }
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>Vue.filter(<span class="hljs-string">'MSG'</span>, {
    <span class="hljs-comment">// model -&gt; view</span>
    <span class="hljs-comment">// read 函数可选</span>
    read: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log( <span class="hljs-number">123</span> );
    },
    
    <span class="hljs-comment">// view -&gt; model</span>
    <span class="hljs-comment">// write函数将在数据被写入Model之前调用</span>
    <span class="hljs-comment">// 两个参数分别为表达式的新值和旧值</span>
    write: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"> newVal, oldVal </span>) </span>{
        <span class="hljs-built_in">console</span>.log( newVal, oldVal );
    }
});
</code></pre>
<p>动态参数</p>
<p>如果过滤器参数没有用引号包起来，则它会在当前vm作用域内动态计算。过滤器函数的this始终指向调用它的vm</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
<div id=&quot;app&quot;>
    <input type=&quot;text&quot; v-model=&quot;userInp&quot; />
    <p>"{{"msg | concats userInp"}}"</p>
</div>

<script type=&quot;text/javascript&quot;>
    
    Vue.filter('concats', function( val, inp ) {
        if (inp) {
            return val + inp;
        }
        return val;
    });
    
    new Vue({
        el: '#app',
        data: {
            msg: 'a'
        }
    });
    
    
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml">
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"userInp"</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span></span><span class="hljs-template-variable">"{{"msg | concats userInp"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="actionscript">
    
    Vue.filter(<span class="hljs-string">'concats'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">( val, inp )</span> </span>{
        <span class="hljs-keyword">if</span> (inp) {
            <span class="hljs-keyword">return</span> val + inp;
        }
        <span class="hljs-keyword">return</span> val;
    });
    
    <span class="hljs-keyword">new</span> Vue({
        el: <span class="hljs-string">'#app'</span>,
        data: {
            msg: <span class="hljs-string">'a'</span>
        }
    });
    
    
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</span></code></pre>
<p>过滤器注意点：<br>需要给定过滤器一个唯一标识。如果用户自定义的过滤器和Vue内置的过滤器冲突，那么Vue内置的过滤器将会被覆盖。如果后注册的过滤器和之前的过滤器冲突，则之前注册的过滤器层被覆盖。</p>
<p>过滤器函数的作用时输入表达式的值，经过处理后输出。因此，定义的函数最好可以返回有意义的值。函数没有return语句不会报错，但这样的过滤器没有意义。</p>
<p><strong>问题</strong></p>
<p>filterBy/orderBy 过滤后$index 的索引</p>
<p>在使用 <code>filterBy</code> 或者 <code>orderBy</code> 对表达式进行过滤时，如果同时需要将$index 作为参数，此时的$index将会根据表达式数组或对象过滤后的值进行索引。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
<div id=&quot;app&quot;>
    
    <ul>
        <li v-for=&quot;item in items | orderBy 'age'&quot;>
            "{{"item.msg"}}" -- "{{"$index"}}"
        </li>
    </ul>
    
</div>

<script type=&quot;text/javascript&quot;>

    new Vue({
        el: '#app',
        data: {
            items: [
                { msg: '顺', age: 1 },
                { msg: '出', age: 10  },
                { msg: '快', age: 6 }
            ]
        }
    });
    
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml">
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"item in items | orderBy 'age'"</span>&gt;</span>
            </span><span class="hljs-template-variable">"{{"item.msg"}}"</span><span class="xml"> -- </span><span class="hljs-template-variable">"{{"$index"}}"</span><span class="xml">
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="actionscript">

    <span class="hljs-keyword">new</span> Vue({
        el: <span class="hljs-string">'#app'</span>,
        data: {
            items: [
                { msg: <span class="hljs-string">'顺'</span>, age: <span class="hljs-number">1</span> },
                { msg: <span class="hljs-string">'出'</span>, age: <span class="hljs-number">10</span>  },
                { msg: <span class="hljs-string">'快'</span>, age: <span class="hljs-number">6</span> }
            ]
        }
    });
    
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</span></code></pre>
<p>自定义 filter 的书写位置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script>
    // 第一种写法
    Vue.filter('reverse', function () {

    });

    // 第二种写法
    new Vue({
        el: '',
        data: {},
        fitlers: {
            // 自定义 filter事件的位置
            reverse: function () {

            }
        },
        methods: {}
    });

</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
    <span class="hljs-comment">// 第一种写法</span>
    Vue.filter(<span class="hljs-string">'reverse'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{

    });

    <span class="hljs-comment">// 第二种写法</span>
    <span class="hljs-keyword">new</span> Vue({
        el: <span class="hljs-string">''</span>,
        data: {},
        fitlers: {
            <span class="hljs-comment">// 自定义 filter事件的位置</span>
            reverse: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{

            }
        },
        methods: {}
    });

</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h1 id="articleHeader20">Vue实例方法</h1>
<p>Vue实例提供一些有用的属性和方法，这些属性和方法名都已前缀<code>$</code>开头</p>
<h2 id="articleHeader21">实例属性</h2>
<p><span class="img-wrap"><img data-src="/img/bVDxQ9?w=491&amp;h=325" src="https://static.alili.tech/img/bVDxQ9?w=491&amp;h=325" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><strong>组件树访问</strong></p>
<ol>
<li><p>$parent  访问当前组件实例的父实例</p></li>
<li><p>$root 访问当前组件书的根实例，当前组件没有父实例，$root 表示当前组件的实例本身。</p></li>
<li><p>$children 访问当前组件实例的直接子组件实例。</p></li>
<li><p>$refs 访问使用v-ref指令的子组件。</p></li>
</ol>
<p><strong>DOM访问</strong></p>
<ol>
<li><p>$el 访问挂载当前组件实例的DOM元素。</p></li>
<li><p>$els 访问$el元素中使用了<code>v-el</code>指令的DOM元素。</p></li>
</ol>
<p><strong>数据访问</strong></p>
<ol>
<li><p>$data 访问组件实例观察的数据对象，该对象引用组件实例化时选项中的data属性。</p></li>
<li><p>$options 用来访问组件实例化时的初始化选项对象。</p></li>
</ol>
<p>当实例创建后原本不存在的属性，是无法绑定在视图上的。<br>可以使用<code>Vue.set()</code>,<code>vm.$set()</code> 来解决.</p>
<h2 id="articleHeader22">实例方法</h2>
<p><span class="img-wrap"><img data-src="/img/bVDxX1?w=519&amp;h=326" src="https://static.alili.tech/img/bVDxX1?w=519&amp;h=326" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><strong>$appendTo</strong><br>$appednTo();方法用来将el所指的DOM元素或片段插入到目标元素中。</p>
<p>参数：<br>elementOrSelector（字符串或DOM元素），该参数可以是一个选择器字符串或者DOM元素。<br>callback -- （可选，该回调函数会在el元素被插入到目标元素后背触发。(如果在el上应用了过渡效果，则回调会在过渡完成后被触发)</p>
<p><strong>$before</strong><br>用来将el所指的DOM元素或片段插入到目标元素之前</p>
<p>参数：<br>elementOrSelector <br>callback-- （可选）</p>
<p><strong>$after</strong><br>将el所指的DOM元素或片段插入到目标元素之后。</p>
<p>参数：<br>elementOrSelector <br>callback-- （可选）</p>
<p><strong>$remove</strong><br>将el所指的DOM元素或片段从DOM中删除<br>参数：<br>callback -- （可选）</p>
<p><strong>$nextITick</strong><br>在下次DOM更新循环后执行的回调函数，使用该方法可以保证DOM中的内容已经与最新数据保持同步。<br>参数：<br>callback -- （可选）该回调函数会在DOM更新循环后被执行。它和全局的Vue.nextTick(); 方法一样，不同的是，callback中的this会自动绑定到调用它的Vue实例上。</p>
<h2 id="articleHeader23">实例Event方法的使用</h2>
<p><strong>$on</strong><br>监听实例上的自定义事件</p>
<p><strong>$once</strong><br>监听实例上的自定义事件，当之触发一次。</p>
<p><strong>$emit</strong><br>触发事件<br>参数：<br>event（字符串），该参数可以是一个事件名称<br>args （可选），传递给监听函数的参数</p>
<p><strong>$dispatch()</strong><br>派发事件，即先在当前实例触发，再沿着父链一层一层向上，如果对应的监听函数返回false就停止。<br>参数：<br>event（字符串），该参数可以是一个事件名称<br>args （可选），传递给监听函数的参数</p>
<p><strong>$boradcast()</strong><br>广播事件，即遍历当前实例的$children,如果对应的监听函数false就停止。<br>参数：<br>event（字符串），该参数可以是一个事件名称<br>args （可选），传递给监听函数的参数</p>
<p><strong>$off()</strong><br>删除事件监听器</p>
<p>参数：<br>event（字符串），该参数可以是一个事件名称<br>args （可选），对应的回调函数</p>
<p>如果没有参数，即删除所有的事件监听器，如果只提供一个参数--事件名称，即删除它对应的所有监听器。如果提供两个参数--事件名称和回调函数，即删除对应的这个回调函数。</p>
<h1 id="articleHeader24">组件</h1>
<p>组件核心目标是：可重用性高，减少重复性的开发。</p>
<p>Vue的组件可以理解为预先定义好行为的ViewModel类。一个组件可以预定义选项。</p>
<p>组件核心选项：</p>
<ul>
<li><p>模板(template) -- 声明了数据和最终展现给用户的DOM之间的映射关系</p></li>
<li><p>初始化数据(data) -- 一个组件的初始数据状态。对于可复用的组件来说，通常是私有的状态。</p></li>
<li><p>接收的外部参数(props) -- 组件之间通过参数来进行数据的传递和共享。参数默认是单向绑定(由上至下)，但也可以显示声明为双向绑定。</p></li>
<li><p>方法(methods) -- 对数据的改动操作一般都在组件的方法内进行。可以通过<code>v-on</code>指令将用户输入事件和组件方法进行绑定</p></li>
<li><p>生命周期钩子函数 -- 一个组件会触发多个生命周期钩子函数，比如:<code>created</code>，<code>attached</code>，<code>destoryed</code>等。在这些钩子函数中，可以封装一些自定义的逻辑，和传统的MVC想必，着可以理解为Controller的逻辑被分散到了这些钩子函数中。</p></li>
</ul>
<h2 id="articleHeader25">基础</h2>
<p><strong>注册</strong></p>
<blockquote><p>全局注册</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component('wind-component', WindComponet);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vhdl"><code>Vue.<span class="hljs-keyword">component</span>(<span class="hljs-symbol">'wind</span>-<span class="hljs-keyword">component</span>', WindComponet);
</code></pre>
<p>参数：<br>function， 可以是Vue.extend();创建的一个组件构造器，<br>Object ，Vue在背后自动调用Vue.extend(); </p>
<p>组件的模板替换了自定义元素，自定义元素的作用只是作为一个挂载点，可以用实例replace决定是否替换自定义元素。</p>
<blockquote><p>局部注册</p></blockquote>
<p>不需要每个组件都全局注册，可以让组件只能用在其它组件内。可以使用 实例选项中<code>componets</code>注册</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;app&quot;>
    <wind-component></wind-component>
</div>


<script src=&quot;vue1.js&quot; type=&quot;text/javascript&quot; charset=&quot;utf-8&quot;></script>

<script type=&quot;text/javascript&quot;>
    
    var Child = Vue.extend({
        template: '<div>I am Child</div>'
    });
    
    var Prent = Vue.extend({
        template: '<div>I am Parent</div> <Child></Child>',
        components: {
            child: Child
        }
    });
    
    new Vue({
        el: '.app',
        components: {
            'wind-component': Prent
        }
    });
        
</script>
 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">wind-component</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">wind-component</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>


<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"vue1.js"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="actionscript">
    
    <span class="hljs-keyword">var</span> Child = Vue.extend({
        template: <span class="hljs-string">'&lt;div&gt;I am Child&lt;/div&gt;'</span>
    });
    
    <span class="hljs-keyword">var</span> Prent = Vue.extend({
        template: <span class="hljs-string">'&lt;div&gt;I am Parent&lt;/div&gt; &lt;Child&gt;&lt;/Child&gt;'</span>,
        components: {
            child: Child
        }
    });
    
    <span class="hljs-keyword">new</span> Vue({
        el: <span class="hljs-string">'.app'</span>,
        components: {
            <span class="hljs-string">'wind-component'</span>: Prent
        }
    });
        
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
 
</code></pre>
<p>为了让事件更简单，可以直接传入选项对象而不是构造器给Vue.component(); 和  components选项</p>
<h2 id="articleHeader26">数据传递</h2>
<p>Vue组件三种数据传递方式：</p>
<ul>
<li><p>props</p></li>
<li><p>组件通信</p></li>
<li><p>slot</p></li>
</ul>
<p><strong>props</strong></p>
<p>'props'是组建数据的一个字段，期望从父组件传下来数据。因为组件的实例的作用域是孤立的，着意味着不能并且不应该在子组件的模板内直接引用父组件的数据，所以子组件需要显示的用props选项来获取父组件的数据。props选项可以是字面量，也可以是表达式，还可以绑定修饰符。</p>
<blockquote><p>字面量语法</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
<div class=&quot;app&quot;>
    
    <child msg=&quot;wind&quot;></child>
    
</div>

<script src=&quot;vue1.js&quot; type=&quot;text/javascript&quot; charset=&quot;utf-8&quot;></script>

<script type=&quot;text/javascript&quot;>
    
    
    // 字面量
    var Child = Vue.component('child', {
        props: ['msg'],
        template: '<div>"{{"msg"}}"</div>'
    });
    
    new Vue({
        el: '.app',
        components: {
            child: Child
        }
    });
    
</script>

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"app"</span>&gt;</span>
    
    <span class="hljs-tag">&lt;<span class="hljs-name">child</span> <span class="hljs-attr">msg</span>=<span class="hljs-string">"wind"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">child</span>&gt;</span>
    
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"vue1.js"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="actionscript">
    
    
    <span class="hljs-comment">// 字面量</span>
    <span class="hljs-keyword">var</span> Child = Vue.component(<span class="hljs-string">'child'</span>, {
        props: [<span class="hljs-string">'msg'</span>],
        template: <span class="hljs-string">'&lt;div&gt;"{{"msg"}}"&lt;/div&gt;'</span>
    });
    
    <span class="hljs-keyword">new</span> Vue({
        el: <span class="hljs-string">'.app'</span>,
        components: {
            child: Child
        }
    });
    
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

</code></pre>
<blockquote><p>动态语法</p></blockquote>
<p>可以利用<code>v-bind</code>将动态props绑定到父组件的数据。每当父组件的数据变化时，该变化也会传到给子组件。<br>动态语法：在父级组件链接 <code>:wind="msg"</code>。只能在Vue.extend({}).</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;app&quot;>
    
    <child msg=&quot;wind&quot;></child>
    
</div>

<script src=&quot;vue1.js&quot; type=&quot;text/javascript&quot; charset=&quot;utf-8&quot;></script>

<script type=&quot;text/javascript&quot;>
    
    // 动态语法  // v-bind
    var Child = Vue.extend({
        props: ['wind'],
        template: '<div>"{{"wind"}}"</div>',
//                replace: true
    });
    
    var Parent = Vue.extend({
        template: '<p>parent</p><br /><child :wind=&quot;msg&quot;></child>',
        data: function () {
            return {
                'msg': 'msgConent'
            };
        },
        components: {
            'child': Child
        }
    });
    
    new Vue({
        el: '.app',
        components: {
            child: Parent
        }
    });
    
</script>

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"app"</span>&gt;</span>
    
    <span class="hljs-tag">&lt;<span class="hljs-name">child</span> <span class="hljs-attr">msg</span>=<span class="hljs-string">"wind"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">child</span>&gt;</span>
    
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"vue1.js"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="actionscript">
    
    <span class="hljs-comment">// 动态语法  // v-bind</span>
    <span class="hljs-keyword">var</span> Child = Vue.extend({
        props: [<span class="hljs-string">'wind'</span>],
        template: <span class="hljs-string">'&lt;div&gt;"{{"wind"}}"&lt;/div&gt;'</span>,
<span class="hljs-comment">//                replace: true</span>
    });
    
    <span class="hljs-keyword">var</span> Parent = Vue.extend({
        template: <span class="hljs-string">'&lt;p&gt;parent&lt;/p&gt;&lt;br /&gt;&lt;child :wind="msg"&gt;&lt;/child&gt;'</span>,
        data: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
            <span class="hljs-keyword">return</span> {
                <span class="hljs-string">'msg'</span>: <span class="hljs-string">'msgConent'</span>
            };
        },
        components: {
            <span class="hljs-string">'child'</span>: Child
        }
    });
    
    <span class="hljs-keyword">new</span> Vue({
        el: <span class="hljs-string">'.app'</span>,
        components: {
            child: Parent
        }
    });
    
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

</code></pre>
<blockquote><p>绑定修饰符</p></blockquote>
<p>props默认是单向绑定 -- 当父组件的属性变化时，将传导给子组件，但是反过来不会。着是为了防止子组件无意修改父组件的状态。</p>
<ul>
<li><p><code>.sync</code>,双向绑定</p></li>
<li><p><code>.once</code>, 单次绑定</p></li>
</ul>
<p>双向绑定会把子组件的msg属性同步会父组件的parentMsg属性</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 默认为单项绑定 -->
<child :msg=&quot;parentMsg&quot;></child>
<!-- 双向绑定 -->
<child :msg.sync=&quot;parentMsg&quot;></child>
<!-- 单词绑定 -->
<child :msg.once=&quot;parentMsg&quot;></child>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 默认为单项绑定 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">child</span> <span class="hljs-attr">:msg</span>=<span class="hljs-string">"parentMsg"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">child</span>&gt;</span>
<span class="hljs-comment">&lt;!-- 双向绑定 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">child</span> <span class="hljs-attr">:msg.sync</span>=<span class="hljs-string">"parentMsg"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">child</span>&gt;</span>
<span class="hljs-comment">&lt;!-- 单词绑定 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">child</span> <span class="hljs-attr">:msg.once</span>=<span class="hljs-string">"parentMsg"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">child</span>&gt;</span></code></pre>
<p>双向绑定会把子组件的msg属性同步到父组件的parentMsg属性，单次绑定在建立之后不会同步之后的变化。如果props是一个对象或数组，那么它是按引用传递的。在子组件内修改会影响父组件的状态，而不管是用哪种类型绑定。</p>
<p><strong>组件通信</strong></p>
<p>子组件可以用<code>this.$parent</code>访问它的父组件，父组件有一个数组<code>this.$children</code>，暴行它所有的子元素，根实例的后代可以用<code>this.$root</code>访问根实例，不过子组件应当避免直接依赖父组件的数据，尽量显式的使用 props传递数据。</p>
<p>在子组件中修改父组件的状态缺点：</p>
<ul>
<li><p>父组件与子组件紧密地耦合</p></li>
<li><p>只看父组件，很难理解父组件的状态，因为它可能被任意子组件修改。在理解情况下，只有组件自己能修改其状态。</p></li>
</ul>
<p>因为作用域是有层次的，所以可以在作用域链上传递时间。<br>一般的，选择事件传递方式，判断规则： 查看要触发事件的作用域。如果要通知整个事件系统，就要向下广播。</p>
<p>每一个Vue实例都是一个事件触发器：</p>
<ul>
<li><p>$on() -- 监听事件</p></li>
<li><p>$emit() -- 把事件沿着作用域向上派送</p></li>
<li><p>$dispatch() -- 派发事件，事件沿着父链冒泡。 调用</p></li>
<li><p>$broadcast() -- 广播事件，事件向下传导给所有的后代</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template id=&quot;child-template&quot;>
    <input v-model=&quot;msg&quot; />
    <button @click=&quot;notify&quot;>Dispatch Event</button>
</template>

<div id=&quot;app&quot;>
    <p>Messages: "{{"messages | json"}}"</p>
    <child></child>
</div>

<script src=&quot;//cdn.bootcss.com/vue/1.0.2/vue.js&quot; type=&quot;text/javascript&quot; charset=&quot;utf-8&quot;></script>

<script type=&quot;text/javascript&quot;>
    
    
    // 注册子组件
    // 将当前消息派发出去
    Vue.component('child', {
        template: '#child-template',
        data: function() {
            return {
                msg: 'hello'
            }
        },
        methods: {
            notify: function () {
                if ( this.msg.trim() ) {
                    this.$dispatch('child-msg', this.msg);
                    this.msg = '';
                }
            }
        }
    });
    
    // 初始化父组件
    // 收到消息时将事件推入一个数组中
    var parent = new Vue({
        el: '#app',
        data: {
            messages: []
        },
        // 在创建实例时 `events` 选项简单的调用`$on`
        events: {
            'child-msg': function ( msg ) {
                // 事件回到内的`this` 自动绑定到组册它的实例上
                this.messages.push(msg);
            }
        }
    });
    
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"child-template"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"msg"</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"notify"</span>&gt;</span>Dispatch Event<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Messages: "{{"messages | json"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">child</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">child</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"//cdn.bootcss.com/vue/1.0.2/vue.js"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="actionscript">
    
    
    <span class="hljs-comment">// 注册子组件</span>
    <span class="hljs-comment">// 将当前消息派发出去</span>
    Vue.component(<span class="hljs-string">'child'</span>, {
        template: <span class="hljs-string">'#child-template'</span>,
        data: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
            <span class="hljs-keyword">return</span> {
                msg: <span class="hljs-string">'hello'</span>
            }
        },
        methods: {
            notify: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
                <span class="hljs-keyword">if</span> ( <span class="hljs-keyword">this</span>.msg.trim() ) {
                    <span class="hljs-keyword">this</span>.$dispatch(<span class="hljs-string">'child-msg'</span>, <span class="hljs-keyword">this</span>.msg);
                    <span class="hljs-keyword">this</span>.msg = <span class="hljs-string">''</span>;
                }
            }
        }
    });
    
    <span class="hljs-comment">// 初始化父组件</span>
    <span class="hljs-comment">// 收到消息时将事件推入一个数组中</span>
    <span class="hljs-keyword">var</span> parent = <span class="hljs-keyword">new</span> Vue({
        el: <span class="hljs-string">'#app'</span>,
        data: {
            messages: []
        },
        <span class="hljs-comment">// 在创建实例时 `events` 选项简单的调用`$on`</span>
        events: {
            <span class="hljs-string">'child-msg'</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">( msg )</span> </span>{
                <span class="hljs-comment">// 事件回到内的`this` 自动绑定到组册它的实例上</span>
                <span class="hljs-keyword">this</span>.messages.push(msg);
            }
        }
    });
    
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>从父组件的代码中不能直接观看到<code>child-msg</code> 事件来自哪里。如果在模板中子组件用到的地方声明事件处理器。 可以使用<code>v-on</code>来监听。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template id=&quot;child-template&quot;>
    <input v-model=&quot;msg&quot; />
    <button @click=&quot;notify&quot;>Dispatch Event</button>
</template>

<div id=&quot;app&quot;>
        <p>Message "{{"messages | json"}}"</p>
        <child @child-msg=&quot;shandleIt&quot;></child>
</div>


<script src=&quot;//cdn.bootcss.com/vue/1.0.2/vue.js&quot; type=&quot;text/javascript&quot; charset=&quot;utf-8&quot;></script>

<script type=&quot;text/javascript&quot;>
    
    // 组册子组件
    Vue.component('child', {
        template: '#child-template',
        data: function () {
            return { msg: 'hello' }
        },
        methods: {
            notify: function () {
                if ( this.msg.trim() ) {
                    this.$dispatch('child-msg', this.msg)
                    this.msg = '';
                }
            }
        }
    });
    
    
    // 初始化父组件
    new Vue({
        el: '#app',
        data: {
            messages: []
        },
        methods: {
            'shandleIt': function () {
                alert(123);
            }
        },
        events: {
            'child-msg': function ( msg ) {
                if ( msg ) {
                    this.messages.push(msg);
                }
            }
        }
    });
    
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"child-template"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"msg"</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"notify"</span>&gt;</span>Dispatch Event<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Message "{{"messages | json"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">child</span> @<span class="hljs-attr">child-msg</span>=<span class="hljs-string">"shandleIt"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">child</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>


<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"//cdn.bootcss.com/vue/1.0.2/vue.js"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="actionscript">
    
    <span class="hljs-comment">// 组册子组件</span>
    Vue.component(<span class="hljs-string">'child'</span>, {
        template: <span class="hljs-string">'#child-template'</span>,
        data: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
            <span class="hljs-keyword">return</span> { msg: <span class="hljs-string">'hello'</span> }
        },
        methods: {
            notify: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
                <span class="hljs-keyword">if</span> ( <span class="hljs-keyword">this</span>.msg.trim() ) {
                    <span class="hljs-keyword">this</span>.$dispatch(<span class="hljs-string">'child-msg'</span>, <span class="hljs-keyword">this</span>.msg)
                    <span class="hljs-keyword">this</span>.msg = <span class="hljs-string">''</span>;
                }
            }
        }
    });
    
    
    <span class="hljs-comment">// 初始化父组件</span>
    <span class="hljs-keyword">new</span> Vue({
        el: <span class="hljs-string">'#app'</span>,
        data: {
            messages: []
        },
        methods: {
            <span class="hljs-string">'shandleIt'</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
                alert(<span class="hljs-number">123</span>);
            }
        },
        events: {
            <span class="hljs-string">'child-msg'</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">( msg )</span> </span>{
                <span class="hljs-keyword">if</span> ( msg ) {
                    <span class="hljs-keyword">this</span>.messages.push(msg);
                }
            }
        }
    });
    
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p>当子组件触发了<code>child-msg</code> 事件时，父组件的 <code>hadleIt</code>方法将被调用。所有影响父组件状态的代码都放到父组件的<code>hadleIt</code>方法中。 子组件只关注触发事件。</p>
<p>尽管有<code>props</code>和<code>events</code>，但是有时候仍需要在JavaScript中直接访问子组件。因此，需要使用<code>v-ref</code>为子组件指定一个索引ID。</p>
<p><code>v-ref</code> 直接访问子组件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>
    <comp v-ref:aa></comp>
    <comp v-ref:bb></comp>
</div>

<script src=&quot;//cdn.bootcss.com/vue/1.0.2/vue.js&quot; type=&quot;text/javascript&quot; charset=&quot;utf-8&quot;></script>

<script>

    Vue.component('comp', {
        template: '<div>嘻嘻哈哈</div>',
    });
    
    new Vue({
        el: '#app',
        data: {
            msg: []
        },
        ready: function () {
            console.log( this.$refs.aa );
            console.log( this.$refs.bb );
        }
    });

</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">comp</span> <span class="hljs-attr">v-ref:aa</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">comp</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">comp</span> <span class="hljs-attr">v-ref:bb</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">comp</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"//cdn.bootcss.com/vue/1.0.2/vue.js"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">

    Vue.component(<span class="hljs-string">'comp'</span>, {
        <span class="hljs-attr">template</span>: <span class="hljs-string">'&lt;div&gt;嘻嘻哈哈&lt;/div&gt;'</span>,
    });
    
    <span class="hljs-keyword">new</span> Vue({
        <span class="hljs-attr">el</span>: <span class="hljs-string">'#app'</span>,
        <span class="hljs-attr">data</span>: {
            <span class="hljs-attr">msg</span>: []
        },
        <span class="hljs-attr">ready</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">console</span>.log( <span class="hljs-keyword">this</span>.$refs.aa );
            <span class="hljs-built_in">console</span>.log( <span class="hljs-keyword">this</span>.$refs.bb );
        }
    });

</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>slot分发内容</strong></p>
<p>场景：<br>使用组件时，常常需要组合使用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<pink>
    <pink-header></pink-header>
    <pink-footer></pink-footer>
</pink>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">pink</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">pink-header</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">pink-header</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">pink-footer</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">pink-footer</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">pink</span>&gt;</span></code></pre>
<p>注意：</p>
<ul>
<li><p>&lt;pink&gt;组件不知道他的挂载点会有什么内容，挂载点的内容是由&lt;pink&gt;的父组件决定的。</p></li>
<li><p>&lt;pink&gt;组件很可能有它自己的模板。</p></li>
</ul>
<p>为了让组件可以组合，需要一种方式来混合父组件的内容与子组件自己的模板。称之为：内容分发<br>Vue使用特殊的&lt;slot&gt;元素左右原始内容的插槽</p>
<p>定义在父组件中，父组件中嵌套的其它内容不会被替换。</p>
<p>编译作用域</p>
<p>分发内容是在各自作用域中被编译。<br>父组件模板的内容在父组件作用域内编译，子组件模板的内容在子组件作用域内编译。</p>
<p>单个 slot</p>
<p>父组件的内容被抛弃，除非子组件模板包含&lt;slot&gt;.如果子组件模板只有一个没有特性的slot，父组件的整个内容将查到slot所在的地方并替换它。</p>
<p>&lt;slot&gt;标签的内容视为回退内容。回退内容在子组件的作用域内编译，当宿主元素为空并且没有内容供插入时显示这个回退内容。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template id=&quot;pink&quot;>
    <div>
        <h1>This is my component!</h1>
        <slot>
            如果没有分发内容则显示我
        </slot>
    </div>
</template>

<div id=&quot;app&quot;>
    <pink-component>
        <p>This is some original conent</p>
        <p>This is some more original conent</p>
    </pink-component>
</div>

<script src=&quot;//cdn.bootcss.com/vue/1.0.2/vue.js&quot; type=&quot;text/javascript&quot; charset=&quot;utf-8&quot;></script>

<script type=&quot;text/javascript&quot;>
    
    Vue.component('pink-component', {
        template: '#pink'
    });
    
    new Vue({
        el: '#app',
    });
    
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"pink"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>This is my component!<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">slot</span>&gt;</span>
            如果没有分发内容则显示我
        <span class="hljs-tag">&lt;/<span class="hljs-name">slot</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">pink-component</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>This is some original conent<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>This is some more original conent<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">pink-component</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"//cdn.bootcss.com/vue/1.0.2/vue.js"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="actionscript">
    
    Vue.component(<span class="hljs-string">'pink-component'</span>, {
        template: <span class="hljs-string">'#pink'</span>
    });
    
    <span class="hljs-keyword">new</span> Vue({
        el: <span class="hljs-string">'#app'</span>,
    });
    
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>具名slot</p>
<p><code>&lt;slot&gt;</code>元素可以用一个特殊特性<code>name</code>配置如何分发内容。多个<code>slot</code>可以有不同的名字。具名<code>slot</code>将皮撇内容片段中有对应<code>slot</code>特性的元素。</p>
<p>·具名slot·仍然可以有一个匿名<code>slot</code>.作为找不到匹配的内容片段的回退插槽，它是默认slot。如果没有默认slot，这些找不到匹配的内容片段将被抛弃。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template id=&quot;pink&quot;>
    
    <div>
        <slot name=&quot;a&quot;></slot>
        <slot></slot>
        <slot name=&quot;b&quot;></slot>
    </div>    
    
</template>

<div id=&quot;app&quot;>
    
    <pink-multi>
        <p slot=&quot;a&quot;>ONE</p>
        <p slot=&quot;b&quot;>TWO</p>
        <p>defalut A</p>
    </pink-multi>

</div>

<script src=&quot;//cdn.bootcss.com/vue/1.0.2/vue.js&quot; type=&quot;text/javascript&quot; charset=&quot;utf-8&quot;></script>

<script type=&quot;text/javascript&quot;>
    
    Vue.component('pink-multi', {
        tempate: '#pink'
    });
    
    new Vue({
        el: '#app'
    });
    
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"pink"</span>&gt;</span>
    
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">slot</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"a"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">slot</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">slot</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">slot</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">slot</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"b"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">slot</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>    
    
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    
    <span class="hljs-tag">&lt;<span class="hljs-name">pink-multi</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"a"</span>&gt;</span>ONE<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"b"</span>&gt;</span>TWO<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>defalut A<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">pink-multi</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"//cdn.bootcss.com/vue/1.0.2/vue.js"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="actionscript">
    
    Vue.component(<span class="hljs-string">'pink-multi'</span>, {
        tempate: <span class="hljs-string">'#pink'</span>
    });
    
    <span class="hljs-keyword">new</span> Vue({
        el: <span class="hljs-string">'#app'</span>
    });
    
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>混合</strong></p>
<p>以一种灵活的方式为组建提供分布复用的功能。混合对象可以包含任意的组件选项。<br>当组件使用了混合对象时，混合对象的所有选项将别“混入”组件自己的选项中。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>
    <mixin-com></mixin-com>
</div>

<script type=&quot;text/javascript&quot;>
    
    Vue.config.debug = true;
    
    // mixin对象
    var myMixin = {
        created: function () {
            this.hello();
        },
        methods: {
            hello: function (){
                console.log( 'hello from mixin!' );
            }
        }
    }
    
    // 定义组件，使用 mixin对象
    var mixinCom = Vue.extend({
        mixins: [myMixin],
        template: '<h1>HELLO ~ </h1>'
    });
    
    // 创建根实例
    new Vue({
        el: '#app',
        components: {
            'mixin-com': mixinCom
        }
    });
    
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">mixin-com</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">mixin-com</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
    
    Vue.config.debug = <span class="hljs-literal">true</span>;
    
    <span class="hljs-comment">// mixin对象</span>
    <span class="hljs-keyword">var</span> myMixin = {
        <span class="hljs-attr">created</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">this</span>.hello();
        },
        <span class="hljs-attr">methods</span>: {
            <span class="hljs-attr">hello</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>)</span>{
                <span class="hljs-built_in">console</span>.log( <span class="hljs-string">'hello from mixin!'</span> );
            }
        }
    }
    
    <span class="hljs-comment">// 定义组件，使用 mixin对象</span>
    <span class="hljs-keyword">var</span> mixinCom = Vue.extend({
        <span class="hljs-attr">mixins</span>: [myMixin],
        <span class="hljs-attr">template</span>: <span class="hljs-string">'&lt;h1&gt;HELLO ~ &lt;/h1&gt;'</span>
    });
    
    <span class="hljs-comment">// 创建根实例</span>
    <span class="hljs-keyword">new</span> Vue({
        <span class="hljs-attr">el</span>: <span class="hljs-string">'#app'</span>,
        <span class="hljs-attr">components</span>: {
            <span class="hljs-string">'mixin-com'</span>: mixinCom
        }
    });
    
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>HTML中是不区分大小写，而JavaScript是区分大小写。在给组件取属性名时，要注意大小写问题。尽量使用小写加中横线</p>
<hr>
<p>当混合对象和组件包含同名选项时，这些选项将以适当的策略合并。<br>例如：同名钩子函数被并入一个数组中，因而都会被调用。另外，混合的钩子函数将在组件自己的钩子之前调用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>
    <my-componet></my-componet>
</div>

<script src=&quot;//cdn.bootcss.com/vue/1.0.2/vue.js&quot; type=&quot;text/javascript&quot; charset=&quot;utf-8&quot;></script>

<script type=&quot;text/javascript&quot;>

    var myMixin = {
        created: function () {
            this.hello();
        },
        methods: {
            hello: function () {
                console.log('hello from mixin~');
            }
        }
    }
    
    // 定义组件，使用混合对象
    var com = Vue.extend({
        mixins: [myMixin],
        template: '<h1>HELLO ~</h1>',
        created: function () {
            console.log('component hook called');
        }
    });
    
    // 创建根实例
    new Vue({
        el: '#app',
        components: {
            'my-componet': com
        }
    });

</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">my-componet</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">my-componet</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"//cdn.bootcss.com/vue/1.0.2/vue.js"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">

    <span class="hljs-keyword">var</span> myMixin = {
        <span class="hljs-attr">created</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">this</span>.hello();
        },
        <span class="hljs-attr">methods</span>: {
            <span class="hljs-attr">hello</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'hello from mixin~'</span>);
            }
        }
    }
    
    <span class="hljs-comment">// 定义组件，使用混合对象</span>
    <span class="hljs-keyword">var</span> com = Vue.extend({
        <span class="hljs-attr">mixins</span>: [myMixin],
        <span class="hljs-attr">template</span>: <span class="hljs-string">'&lt;h1&gt;HELLO ~&lt;/h1&gt;'</span>,
        <span class="hljs-attr">created</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'component hook called'</span>);
        }
    });
    
    <span class="hljs-comment">// 创建根实例</span>
    <span class="hljs-keyword">new</span> Vue({
        <span class="hljs-attr">el</span>: <span class="hljs-string">'#app'</span>,
        <span class="hljs-attr">components</span>: {
            <span class="hljs-string">'my-componet'</span>: com
        }
    });

</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p>混合全局注册，一旦全局注册混合，它就会影响所有之后创建的Vue实例。<br>慎用全局混合，因为它会影响到每个所创建的Vue实例，包括第三方组件。大多数情况下，它应当只用于自定义选项。</p>
<p><strong>动态组件</strong></p>
<p>多个组件可以使用同一个挂载点，然后动态的在他们之间切换。使用保留的<code>&lt;component&gt;</code>元素，懂她id绑定到它的<code>is</code>特性上。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<component :is=&quot;show&quot;></component>

<script>
new Vue({
    data: {
        show: true
    }
});
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">component</span> <span class="hljs-attr">:is</span>=<span class="hljs-string">"show"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">component</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
<span class="hljs-keyword">new</span> Vue({
    data: {
        show: <span class="hljs-literal">true</span>
    }
});
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<blockquote><p>keep-alive</p></blockquote>
<p>作用：切换组件时，保留组件状态。减少内存开销。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<component :is=&quot;currentView&quot; keep-alive></component>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">component</span> <span class="hljs-attr">:is</span>=<span class="hljs-string">"currentView"</span> <span class="hljs-attr">keep-alive</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">component</span>&gt;</span></code></pre>
<blockquote><p>activate钩子</p></blockquote>
<p>作用： 控制切换组件的切换时间。切入组件添加<code>activate</code> 钩子函数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component('actiate-exp', {
    activate: function ( done ) {
        var self = this;
        loadDataAsync(function ( data ) {
            self.smoeData = data;
            done();
        });
    }
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">Vue.component(<span class="hljs-string">'actiate-exp'</span>, {
    <span class="hljs-attr">activate</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"> done </span>) </span>{
        <span class="hljs-keyword">var</span> self = <span class="hljs-keyword">this</span>;
        loadDataAsync(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"> data </span>) </span>{
            self.smoeData = data;
            done();
        });
    }
});
</code></pre>
<p>activate 钩子只作用于动态组件切换或静态组件初始化渲染的过程中，不作用于使用实例方法手工插入的过程中。</p>
<blockquote><p>transition-mode</p></blockquote>
<p><code>transition-mode</code> 特性用于指定连个动态组件之间如何过渡。</p>
<p>在默认情况下，进入与离开平滑的过渡。</p>
<ul>
<li><p>in-out --- 新组建先过度进去，等它的过去完成之后当前组件过渡出去。</p></li>
<li><p>out-in 当前组件先过渡出去，等它过渡完成后新组件过渡进入</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 先淡出再淡入 -->

<component :is=&quot;view&quot; transition=&quot;fade&quot; transiion-mode=&quot;out-in&quot;></component>

<style>
    .fade-transition {
        transtion: opacity .3s ease;
    }
    .fade-enter, .fade-leave {
        opacity: 0;
    }
</style>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 先淡出再淡入 --&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">component</span> <span class="hljs-attr">:is</span>=<span class="hljs-string">"view"</span> <span class="hljs-attr">transition</span>=<span class="hljs-string">"fade"</span> <span class="hljs-attr">transiion-mode</span>=<span class="hljs-string">"out-in"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">component</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-class">.fade-transition</span> {
        <span class="hljs-attribute">transtion</span>: opacity .<span class="hljs-number">3s</span> ease;
    }
    <span class="hljs-selector-class">.fade-enter</span>, <span class="hljs-selector-class">.fade-leave</span> {
        <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0</span>;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
</code></pre>
<h2 id="articleHeader27">扩展</h2>
<p><strong>组件和 v-for</strong></p>
<p>自定义组件可以像普通元素一样直接使用<code>v-for</code>。<br>因为组件的作用域是孤立的，无法将数据传递那个到组件内部。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<pink v-for=&quot;item in items&quot; :item=&quot;item&quot; :index=&quot;$index&quot;></pink>
<!-- 显式声明数据来自哪里可以让组件复用再其它地方 -->" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">pink</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"item in items"</span> <span class="hljs-attr">:item</span>=<span class="hljs-string">"item"</span> <span class="hljs-attr">:index</span>=<span class="hljs-string">"$index"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">pink</span>&gt;</span>
<span class="hljs-comment">&lt;!-- 显式声明数据来自哪里可以让组件复用再其它地方 --&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>
    <pink v-for=&quot;item in msg&quot; :wind=&quot;item&quot; :item=&quot;item&quot; :index=&quot;$index&quot;></pink>
</div>        

<script type=&quot;text/javascript&quot;>
    
    Vue.component('pink', {
        props: ['wind'],
        template: '<div>pink -- "{{"wind"}}"</div>'
    });
    
    new Vue({
        el: '#app',
        data: {
            msg: ['pink', 'tan', 'red', 'yellow']
        }
    });
    
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">pink</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"item in msg"</span> <span class="hljs-attr">:wind</span>=<span class="hljs-string">"item"</span> <span class="hljs-attr">:item</span>=<span class="hljs-string">"item"</span> <span class="hljs-attr">:index</span>=<span class="hljs-string">"$index"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">pink</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>        

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="actionscript">
    
    Vue.component(<span class="hljs-string">'pink'</span>, {
        props: [<span class="hljs-string">'wind'</span>],
        template: <span class="hljs-string">'&lt;div&gt;pink -- "{{"wind"}}"&lt;/div&gt;'</span>
    });
    
    <span class="hljs-keyword">new</span> Vue({
        el: <span class="hljs-string">'#app'</span>,
        data: {
            msg: [<span class="hljs-string">'pink'</span>, <span class="hljs-string">'tan'</span>, <span class="hljs-string">'red'</span>, <span class="hljs-string">'yellow'</span>]
        }
    });
    
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p><strong>编写可复用组件</strong></p>
<p>在编写组件时，时刻考虑组件是否可复用是否有好处的。<br>一次性组件跟其它组件紧密耦合没关系，但是可复用组件一定要定义侵袭的公开接口。</p>
<p>Vue组件 API来自三部分 -- <code>prop</code>, <code>Evnet</code>， <code>slot</code></p>
<ul>
<li><p>prop允许外部环境传递数据组给组件</p></li>
<li><p>事件允许组件发出发布环境的action</p></li>
<li><p>slot运行外部环境将内部插入到组件的视图结构内。</p></li>
</ul>
<p>使用<code>v-bind</code> 和 <code>v-on</code>的简写语法，模板的缩进清楚并简洁</p>
<p><strong>异步组件</strong>需要将应用拆分为小块，每块按实现按需加载。Vue允许将组建定义为一个工厂函数，动态的解析组件的定义。Vue只在组件需要渲染时触发工厂函数，并把结果缓存起来。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component('async-exp', function ( resoluve, reject ) {
    setTimeout(function () {
        reslove({
            tempate: '<div>ASYNC!</div>'
        });
    }, 1000);
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">Vue.component(<span class="hljs-string">'async-exp'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"> resoluve, reject </span>) </span>{
    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        reslove({
            <span class="hljs-attr">tempate</span>: <span class="hljs-string">'&lt;div&gt;ASYNC!&lt;/div&gt;'</span>
        });
    }, <span class="hljs-number">1000</span>);
});
</code></pre>
<p>工厂函数接受一个resolve回调，在收到从服务器下载的组件定义时调用。</p>
<p><strong>片段实例</strong></p>
<p>在使用template选项时，模板的内容将替换实例的挂载元素，因而推荐模板的顶级元素始终是单个元素。</p>
<p>下面的情况会让实例变成一个片段实例</p>
<ul>
<li><p>模板包含多个顶级元素</p></li>
<li><p>模板只包含普通文本</p></li>
<li><p>模板包含其他组件(其它组件可能是一个片段实例)</p></li>
<li><p>模板只包含一个元素指令，如&lt;partial&gt; 或 vue-router的&lt;router-view&gt;</p></li>
<li><p>模板根节点有一个流程控制指令,如 v-if 或 v-for</p></li>
</ul>
<p>让实例有未知数据的顶级元素，它将把其DOM内容当作片段。片段实例仍然会正确的渲染内容。不过没有一个根节点，它的$el指向一个锚节点，即一个空的文本节点(在开发模式下是一个注释节点)</p>
<p>组件元素上的非流程控制指令，非prop特性和过度将被忽略。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 不可以，因为没有根元素 -->
<examplte v-show=&quot;ok&quot; transition=&quot;fade&quot;></examplte>
<!-- props 可以 -->
<examplte :prop=&quot;someData&quot;></examplte>
<!-- 流程控制可以，但是不能有过渡 -->
<examplte v-if=&quot;ok&quot;></examplte>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 不可以，因为没有根元素 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">examplte</span> <span class="hljs-attr">v-show</span>=<span class="hljs-string">"ok"</span> <span class="hljs-attr">transition</span>=<span class="hljs-string">"fade"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">examplte</span>&gt;</span>
<span class="hljs-comment">&lt;!-- props 可以 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">examplte</span> <span class="hljs-attr">:prop</span>=<span class="hljs-string">"someData"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">examplte</span>&gt;</span>
<span class="hljs-comment">&lt;!-- 流程控制可以，但是不能有过渡 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">examplte</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"ok"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">examplte</span>&gt;</span></code></pre>
<h2 id="articleHeader28">生命周期</h2>
<p>在vue中，在实例化Vue之前，他们以HTML的文本形式保存在文本编辑器中。当实例化后将经历<code>创建</code>,<code>编译</code>,<code>销毁</code> 主要三个阶段</p>
<p>生命周期钩子：</p>
<ol>
<li><p>init<br>在实例化开始初始化时同步调用。此时数据观测，事件和Watcher 都尚未初始化</p></li>
<li><p>created<br>在实例创建后同步调用。此时实例已经结束解析选项，意味着已建立：数据绑定，计算属性，方法，Watcher/事件回调。但是还没有开始DOM编译，$el还不存在。</p></li>
<li><p>beforeCompile<br>在编译开始前调用。</p></li>
<li><p>compiled<br>在编译结束后调用。此时所有的指令已生效，因而数据的变化将触发DOM更新。但是不是担保$el已插入文档。</p></li>
<li>
<p>ready<br>在编译结束和$el第一次插入文档之后调用，入在第一次attatced钩子之后调用。注意必须是有Vue插入(如vm.$appendTo()等方法或更新)才出发ready钩子的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//  { 模板插入到文档中了；相当于window.onload } " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code style="word-break: break-word; white-space: initial;"><span class="hljs-comment">//  { 模板插入到文档中了；相当于window.onload } </span></code></pre>
</li>
<li><p>attached<br><code>vm.$el</code> 操作如DOM时调用。必须是→<code>指令</code>或<code>实例方法</code>(如$appednTo())    插入，直接操作<code>vm.$el</code>不会触发这个钩子</p></li>
<li><p>detached<br>在<code>vm.$el</code>从DOM中删除时调用。必须是由<code>指令</code>或<code>实例方法删除</code>,直接操作<code>vm.$el</code>不会触发这个钩子</p></li>
<li><p>beforeDestroy<br>在开始销毁实例时开始调用。此时实例仍然有功能。</p></li>
<li><p>destroyed<br>在实例被销毁之后调用。此时所有的绑定和实例的指令已经解绑，所有的子实例也已经被效果。如果有离开过渡，dsetroyed钩子在过渡完成之后调用。</p></li>
</ol>
<h2 id="articleHeader29">开发组件</h2>
<p>组件格式，把一个组件的模板，样式，逻辑三要素整合在同一个文件中，即方便开发，也方便复用和维护。Vue本身支持对组件的异步加载，配合webpack的分块打包功能，可以实现组件的异步按需加载。</p>
<p>基于第三方组件开发</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<scirpt>
    
import Chart from 'chart.js'

</scirpt>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code>&lt;scirpt&gt;
    
<span class="hljs-keyword">import</span> Chart <span class="hljs-keyword">from</span> <span class="hljs-string">'chart.js'</span>

&lt;/scirpt&gt;</code></pre>
<p><strong>问题</strong></p>
<blockquote><p>camelCase &amp; kebab-case</p></blockquote>
<p>HTML标签中的属性名不区分大小写。设置prop名字为camelCase形式的时候，需要装欢为keba-case形式在HTML中使用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- HTML中必须是短横线分割 -->
<child my-message=&quot;hello&quot;></child>

<script type=&quot;text/javascript&quot;>
    Vue.componet('child', {
        props: ['myMessage'],
        template: '<span>"{{"myMessage}</span>'
    });
</script>    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-comment">&lt;!-- HTML中必须是短横线分割 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">child</span> <span class="hljs-attr">my-message</span>=<span class="hljs-string">"hello"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">child</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="actionscript">
    Vue.componet(<span class="hljs-string">'child'</span>, {
        props: [<span class="hljs-string">'myMessage'</span>],
        template: <span class="hljs-string">'&lt;span&gt;"{{"myMessage}&lt;/span&gt;'</span>
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>    </code></pre>
<blockquote><p>字面量语法&amp;动态语法</p></blockquote>
<p>错误用法：<br>使用字面量语法传递数值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 传递字符串 “1” -->
<comp some-prop=&quot;1&quot;></comp>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 传递字符串 “1” --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">comp</span> <span class="hljs-attr">some-prop</span>=<span class="hljs-string">"1"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">comp</span>&gt;</span>
</code></pre>
<p>因为它是一个字面量prop，它的值是字符串“1”，而不是一实际的数字传下去。如果需要传递真实的JavaScript类型的数字，则需要使用动态语法。从而让它的值被当作JavaScript表达式计算。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<comp :some-prop=&quot;1&quot;></comp>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">comp</span> <span class="hljs-attr">:some-prop</span>=<span class="hljs-string">"1"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">comp</span>&gt;</span></code></pre>
<blockquote><p>组件选项问题</p></blockquote>
<p>传入Vue构造器的多数选项也可以用Vue.extend();不过有两个特列：<code>data</code>和<code>el</code>.<br>场景：简单的吧一个对象作为data选项传给Vue.extend();</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var data = { a: 1 };
var MyComponent = Vue.extend({data: data});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">var</span> data = { <span class="hljs-attr">a</span>: <span class="hljs-number">1</span> };
<span class="hljs-keyword">var</span> MyComponent = Vue.extend({<span class="hljs-attr">data</span>: data});</code></pre>
<p>存在的问题：MyComponent所有的实例哦给你共享同一个data对象。<br>解决方式：使用一个函数作为data选项，让这个函数返回一个新对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var MyComponent = Vue.extend({
    data: function () {
        return { a: 1 }
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">var</span> MyComponent = Vue.extend({
    <span class="hljs-attr">data</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> { <span class="hljs-attr">a</span>: <span class="hljs-number">1</span> }
    }
});</code></pre>
<blockquote><p>模板解析</p></blockquote>
<p>Vue的模板是DOM模板，使用浏览器元素的解析器而不是自己实现一个。<br>DOM模板缺点：必须是有效的HTML片段。</p>
<p>一些HTML元素对什么元素都可以放在它里面有限制。</p>
<ul>
<li><p>a 不能包含其他交互元素(如，按钮、连接)</p></li>
<li><p>ul和ol只能包含li</p></li>
<li><p>select 只能包含option和optgroup</p></li>
<li><p>table只能直接包含thead，tbody，tfoot，tr，caption，col，colgroup</p></li>
<li><p>tr只能直接包含th和td</p></li>
</ul>
<p>自定义标签(包括自定义元素和特殊标签，如&lt;component&gt;.&lt;template&gt;,&lt;partal&gt;) 不能用在ul，select，table等对内部元素有限制的标签内。放在这些元素内部的自定义标签将被提到呀U尿素外面，因而渲染不正确。</p>
<p>自定义元素应当使用is特性。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<table>
    <tr :is=&quot;my-component&quot;></tr>
</table>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">table</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">tr</span> <span class="hljs-attr">:is</span>=<span class="hljs-string">"my-component"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">table</span>&gt;</span></code></pre>
<blockquote><p>如何解决数据层级结构太深的问题</p></blockquote>
<p>使用<code>vm.$set()</code>手动定义一层数据</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vm.$set('depAirprotZh', ticketInfo.flight.fromSegments[ticketInfo.flight.fromSegments.length - 1].depAirprotZh);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code class="JavaScirpt" style="word-break: break-word; white-space: initial;">vm.<span class="hljs-variable">$set</span>('depAirprotZh', ticketInfo.flight.<span class="hljs-keyword">from</span>Segments[ticketInfo.flight.<span class="hljs-keyword">from</span>Segments.length - <span class="hljs-number">1</span>].depAirprotZh);</code></pre>
<p><code>$set</code>用法：<br>参数：<br>{String} keyPath<br>{*}  value</p>
<p>设置Vue市里的属性值。在多数情况下应当使用普通对象语法。如<code>vm.a.b=123</code>.<br>这个方法只能适用：</p>
<ul>
<li><p>使用keyPath动态的设置属性</p></li>
<li><p>设置不存在的属性。</p></li>
</ul>
<p>如果keyPath不存在，将递归的创建并建立追踪。如果用它创建顶级属性，实例将被强制进入"digset循环"，在此过程中重新计算所有Watcher。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var vm = new Vue({
    data: {
        a: {
            b: 1
        }
    }
});

// keypath 存在
vm.$set('a.b', 2);
vm.a.b // -> 2

// keypath 不存在
vm.$set('c', 3);
vm.c // -> 3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">var</span> vm = <span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">data</span>: {
        <span class="hljs-attr">a</span>: {
            <span class="hljs-attr">b</span>: <span class="hljs-number">1</span>
        }
    }
});

<span class="hljs-comment">// keypath 存在</span>
vm.$set(<span class="hljs-string">'a.b'</span>, <span class="hljs-number">2</span>);
vm.a.b <span class="hljs-comment">// -&gt; 2</span>

<span class="hljs-comment">// keypath 不存在</span>
vm.$set(<span class="hljs-string">'c'</span>, <span class="hljs-number">3</span>);
vm.c <span class="hljs-comment">// -&gt; 3</span></code></pre>
<blockquote><p>后端数据交互</p></blockquote>
<p>配合<code>vue-router</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Vue({
    el: '#app',
    data: {
        todos: []
    },
    created: function () {
        this.$http
            .get()
            .hten(function ( data ) {
                this.todos = data;
            })
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">el</span>: <span class="hljs-string">'#app'</span>,
    <span class="hljs-attr">data</span>: {
        <span class="hljs-attr">todos</span>: []
    },
    <span class="hljs-attr">created</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">this</span>.$http
            .get()
            .hten(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"> data </span>) </span>{
                <span class="hljs-keyword">this</span>.todos = data;
            })
    }
});</code></pre>
<p>配合Jquery的AJAX</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Vue({
    el: '#app',
    data: {
        todos: []
    },
    created: function () {
        $.get('')
            .done(function ( data ) {
                    this.todo = data;
            });
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">el</span>: <span class="hljs-string">'#app'</span>,
    <span class="hljs-attr">data</span>: {
        <span class="hljs-attr">todos</span>: []
    },
    <span class="hljs-attr">created</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        $.get(<span class="hljs-string">''</span>)
            .done(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"> data </span>) </span>{
                    <span class="hljs-keyword">this</span>.todo = data;
            });
    }
});</code></pre>
<blockquote><p>data中没有计定义计算属性，它是如何被使用的</p></blockquote>
<p>没有把计算数据放到$data里面去，而是通过Object.definePrototype(this, key,def) 直接定义到了实例上。</p>
<h1 id="articleHeader30">ES6</h1>
<p>ES6中的<code>模块</code>,let 和 const</p>
<h2 id="articleHeader31">模块</h2>
<p><strong>export</strong></p>
<p>在ES6中，一个文件就是一个模块，一个模块内部的所有变量，对于外部来说是无法获取的，触发是哟个关键词exprot对外暴露接口，暴露的各个接口通过名字来进行区分。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const sqrt = Math.sqrt;

function square ( x ) {
    return x * x;
}
function diag ( x, y ) {
    return sqrt(square(x) + square(y));
}

// 通过export 暴露接口。使用大括号指定要暴露的接口
export {sqrt, square, diag}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> sqrt = <span class="hljs-built_in">Math</span>.sqrt;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">square</span> (<span class="hljs-params"> x </span>) </span>{
    <span class="hljs-keyword">return</span> x * x;
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">diag</span> (<span class="hljs-params"> x, y </span>) </span>{
    <span class="hljs-keyword">return</span> sqrt(square(x) + square(y));
}

<span class="hljs-comment">// 通过export 暴露接口。使用大括号指定要暴露的接口</span>
<span class="hljs-keyword">export</span> {sqrt, square, diag}</code></pre>
<p><strong>import</strong><br>通过<code>import</code>命令加载这个模块(文件).</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 注意大括号中的接口名必须在lib.js模块中暴露。
 */
import { square, diag } from './lib';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crystal"><code>/**
 * 注意大括号中的接口名必须在<span class="hljs-class"><span class="hljs-keyword">lib</span>.<span class="hljs-title">js</span>模块中暴露。</span>
 *<span class="hljs-regexp">/
import { square, diag } from './lib</span><span class="hljs-string">';</span></code></pre>
<p><code>import</code> 可以通过<code>as</code>语法取别名</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="improt {myVar1 as myCustomVar1}  from './lib';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code style="word-break: break-word; white-space: initial;">improt {myVar1 <span class="hljs-keyword">as</span> myCustomVar1}  <span class="hljs-keyword">from</span> <span class="hljs-string">'./lib'</span>;</code></pre>
<p><code>import</code> 会指定加载模块，因此有空的<code>import</code>语法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 值加载执行模块，不引用任何接口
import './lib'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-comment">// 值加载执行模块，不引用任何接口</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">'./lib'</span></code></pre>
<p><code>import</code>可以整体加载模块，达到命名空间的效果。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// lib.js
export var myVar1 = ...;
export let myVar2 = ...;
exprot const MY_COMST = ...;

export function myFunc () {
    ...
}

exprot function* myGeneratorFunc () {
    ...
}

export class MyClass {
    ...
}

// mian.js

import * as lib from './lib';

console.log(lib.myVar1);
console.log(lib.myVar2);

new lib.MyCalss();
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// lib.js</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">var</span> myVar1 = ...;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">let</span> myVar2 = ...;
exprot <span class="hljs-keyword">const</span> MY_COMST = ...;

<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">myFunc</span> (<span class="hljs-params"></span>) </span>{
    ...
}

exprot <span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">myGeneratorFunc</span> (<span class="hljs-params"></span>) </span>{
    ...
}

<span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MyClass</span> </span>{
    ...
}

<span class="hljs-comment">// mian.js</span>

<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> lib <span class="hljs-keyword">from</span> <span class="hljs-string">'./lib'</span>;

<span class="hljs-built_in">console</span>.log(lib.myVar1);
<span class="hljs-built_in">console</span>.log(lib.myVar2);

<span class="hljs-keyword">new</span> lib.MyCalss();
</code></pre>
<p><strong>export default</strong></p>
<p>场景：即使用模块接口的人必须知道该模块export了哪些接口，有时候一个模块实际上只对外暴露一个接口，这个时候没有必要限定暴露的接口名字。<br>可以使用<code>export default</code>语法让模块调用者自定义要导入的接口名字。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// myFunc.js
export defalut function () {
    
}

/**
 * 注意：myFunc 不能包含在`{}`里。myFunc可以替换任意变量名。
 */
// main.js
import MyFunc from 'myFunc';

MyFunc();
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// myFunc.js</span>
<span class="hljs-keyword">export</span> defalut <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    
}

<span class="hljs-comment">/**
 * 注意：myFunc 不能包含在`{}`里。myFunc可以替换任意变量名。
 */</span>
<span class="hljs-comment">// main.js</span>
<span class="hljs-keyword">import</span> MyFunc <span class="hljs-keyword">from</span> <span class="hljs-string">'myFunc'</span>;

MyFunc();
</code></pre>
<p><strong>export/import在Vue.js中的使用</strong></p>
<p>Vue采用<code>export/import</code>进行模块化开发，文件通过exprot暴露接口，通过improt引用其它文件内容。</p>
<blockquote><p>模块和组件的区别</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Module: 
An implementation unit of software that provides a coherent set of responsibilities.

Component:
A component is a reusable building block that can be combined with other components in the same or other computers in a distributed network to form an application.
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code>Module: 
An implementation unit <span class="hljs-keyword">of</span> software that provides <span class="hljs-keyword">a</span> coherent <span class="hljs-built_in">set</span> <span class="hljs-keyword">of</span> responsibilities.

Component:
A component is <span class="hljs-keyword">a</span> reusable building block that can be combined <span class="hljs-keyword">with</span> other components <span class="hljs-keyword">in</span> <span class="hljs-keyword">the</span> same <span class="hljs-keyword">or</span> other computers <span class="hljs-keyword">in</span> <span class="hljs-keyword">a</span> distributed network <span class="hljs-built_in">to</span> form <span class="hljs-keyword">an</span> application.
</code></pre>
<h1 id="articleHeader32">vue-cli</h1>
<p>基础工具：<code>目录结构</code>，<code>本地调试</code>，<code>代码部署</code>，<code>热加载</code>，<code>单元测试</code></p>
<p>安装: <code>npm install vue-cli</code></p>
<blockquote><p>vue-cli运行之后目录结构</p></blockquote>
<table>
<thead><tr>
<th>目录或文件</th>
<th align="left">说明</th>
</tr></thead>
<tbody>
<tr>
<td>build</td>
<td align="left">webpack配置相关</td>
</tr>
<tr>
<td>config</td>
<td align="left">webpack配置相关</td>
</tr>
<tr>
<td>node_modules</td>
<td align="left">npm install 安装依赖代码库</td>
</tr>
<tr>
<td>src</td>
<td align="left">存放源码</td>
</tr>
<tr>
<td>-- main.js</td>
<td align="left">入口组件</td>
</tr>
<tr>
<td>static</td>
<td align="left">第三方静态资源</td>
</tr>
<tr>
<td>-- .gitkeep</td>
<td align="left">文件目录为空也可以提交到代码仓库</td>
</tr>
<tr>
<td>.babelrc</td>
<td align="left">babel 配置文件</td>
</tr>
<tr>
<td>.editorconfig</td>
<td align="left">编辑器配置</td>
</tr>
<tr>
<td>.eslintignore</td>
<td align="left">忽略语法检查的目录设置</td>
</tr>
<tr>
<td>.eslintrc.js</td>
<td align="left">eslint的配置文件</td>
</tr>
<tr>
<td>.gitignore</td>
<td align="left">git 忽略文件或目录提交</td>
</tr>
<tr>
<td>index.html</td>
<td align="left">入口文件</td>
</tr>
<tr>
<td>package.json</td>
<td align="left">项目的配置文件</td>
</tr>
</tbody>
</table>
<blockquote><p>.babelrc</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;presets&quot;: [&quot;es2015&quot;, &quot;stage-2&quot;], # 预设插件 (babel转换预先需要安装的插件)  // stage-2 四级 （1,2,3,4）包括了 es2015中没有的插件
  &quot;plugins&quot;: [&quot;transform-runtime&quot;], # 插件
  &quot;comments&quot;: false # false 表示转换成代码不生成注释
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clojure"><code>{
  <span class="hljs-string">"presets"</span>: [<span class="hljs-string">"es2015"</span>, <span class="hljs-string">"stage-2"</span>], # 预设插件 (<span class="hljs-name">babel</span>转换预先需要安装的插件)  // stage-2 四级 （<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>）包括了 es2015中没有的插件
  <span class="hljs-string">"plugins"</span>: [<span class="hljs-string">"transform-runtime"</span>], # 插件
  <span class="hljs-string">"comments"</span>: <span class="hljs-literal">false</span> # <span class="hljs-literal">false</span> 表示转换成代码不生成注释
}</code></pre>
<blockquote><p>.editorconfig</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="root = true

[*]
charset = utf-8 # 编码
indent_style = space # 缩进风格 （基于空格作为缩进风格）
indent_size = 2 # 缩进大小
end_of_line = lf # 换行符风格， lf是linux换行符风格
insert_final_newline = true # 创建文件，会自动在末尾插入新行
trim_trailing_whitespace = true # true，自动行尾多余风格" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ini"><code><span class="hljs-attr">root</span> = <span class="hljs-literal">true</span>
<span class="hljs-section">
[*]</span>
<span class="hljs-attr">charset</span> = utf-<span class="hljs-number">8</span> # 编码
<span class="hljs-attr">indent_style</span> = space # 缩进风格 （基于空格作为缩进风格）
<span class="hljs-attr">indent_size</span> = <span class="hljs-number">2</span> # 缩进大小
<span class="hljs-attr">end_of_line</span> = lf # 换行符风格， lf是linux换行符风格
<span class="hljs-attr">insert_final_newline</span> = <span class="hljs-literal">true</span> # 创建文件，会自动在末尾插入新行
<span class="hljs-attr">trim_trailing_whitespace</span> = <span class="hljs-literal">true</span> # <span class="hljs-literal">true</span>，自动行尾多余风格</code></pre>
<blockquote><p>.eslintignore</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="build/*.js # build 文件夹底下的所有文件
config/*.js # config 文件夹底下的所有文件" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code><span class="hljs-keyword">build/*.js </span><span class="hljs-comment"># build 文件夹底下的所有文件</span>
<span class="hljs-built_in">config</span><span class="hljs-comment">/*.js # config 文件夹底下的所有文件</span></code></pre>
<blockquote><p>.eslintrc.js</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style // 语法规则地址
  extends: 'standard', // standard 表示继承一个标准的规则，在vue-cli创建过程中会选择.
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': { // 配置部分自定义规则
    // allow paren-less arrow functions
    'arrow-parens': 0, // 箭头函数前面允许不写括号 （值设置为0，表示忽略检查）
    // allow async-await
    'generator-star-spacing': 0, // async-await 使用
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0 // 不允许在代码中有这些选项，生产环境不允许有 debugger
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs java"><code><span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = {
  root: <span class="hljs-keyword">true</span>,
  parser: <span class="hljs-string">'babel-eslint'</span>,
  parserOptions: {
    sourceType: <span class="hljs-string">'module'</span>
  },
  <span class="hljs-comment">// https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style // 语法规则地址</span>
  extends: <span class="hljs-string">'standard'</span>, <span class="hljs-comment">// standard 表示继承一个标准的规则，在vue-cli创建过程中会选择.</span>
  <span class="hljs-comment">// required to lint *.vue files</span>
  plugins: [
    <span class="hljs-string">'html'</span>
  ],
  <span class="hljs-comment">// add your custom rules here</span>
  <span class="hljs-string">'rules'</span>: { <span class="hljs-comment">// 配置部分自定义规则</span>
    <span class="hljs-comment">// allow paren-less arrow functions</span>
    <span class="hljs-string">'arrow-parens'</span>: <span class="hljs-number">0</span>, <span class="hljs-comment">// 箭头函数前面允许不写括号 （值设置为0，表示忽略检查）</span>
    <span class="hljs-comment">// allow async-await</span>
    <span class="hljs-string">'generator-star-spacing'</span>: <span class="hljs-number">0</span>, <span class="hljs-comment">// async-await 使用</span>
    <span class="hljs-comment">// allow debugger during development</span>
    <span class="hljs-string">'no-debugger'</span>: process.env.NODE_ENV === <span class="hljs-string">'production'</span> ? <span class="hljs-number">2</span> : <span class="hljs-number">0</span> <span class="hljs-comment">// 不允许在代码中有这些选项，生产环境不允许有 debugger</span>
  }
}</code></pre>
<blockquote><p>package.js</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;dependencies&quot;: { # 项目生产下的依赖

},
&quot;devDependencies&quot;: { # 编译过程中的依赖
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code><span class="hljs-string">"dependencies"</span>: { <span class="hljs-meta"># 项目生产下的依赖</span>

},
<span class="hljs-string">"devDependencies"</span>: { <span class="hljs-meta"># 编译过程中的依赖</span>
}</code></pre>
<blockquote><p>webpack打包</p></blockquote>
<p><code>weback.base.conf.js</code>webapck基本配置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var path = require('path')
var config = require('../config') 
var utils = require('./utils')
var projectRoot = path.resolve(__dirname, '../') // 项目根目录

module.exports = {
  entry: {
    app: './src/main.js' // 入口文件
  },
  output: {
    path: config.build.assetsRoot, // 打包的根目录名字
    publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath, // 根目录
    filename: '[name].js' // 对应 entry 的key名字
  },
  resolve: { // 设置在 require() 或者import 模块一些相关配置
    extensions: ['', '.js', '.vue'], // 自动补全文件后缀
    fallback: [path.join(__dirname, '../node_modules')], // require() 找不到模块，会充 node_modules模块中寻找 
    alias: { // 别名
      'src': path.resolve(__dirname, '../src'), // require 的时候 使用的别名
      'assets': path.resolve(__dirname, '../src/assets'),
      'components': path.resolve(__dirname, '../src/components')
    }
  },
  resolveLoader: {  // require() 找不到模块，会充 node_modules模块中寻找
    fallback: [path.join(__dirname, '../node_modules')] 
  },
  module: {
    preLoaders: [// preLoaders 会在loader之前对文件进行处理  // 对某种类型的文件 应用 某个loader进行处理
      {
        test: /\.vue$/,
        loader: 'eslint',
        include: projectRoot, // 检查的文件。 只对该文件下的文件进行检查
        exclude: /node_modules/ // 排除这些目录，进行该loader处理
      },
      {
        test: /\.js$/,
        loader: 'eslint',
        include: projectRoot,
        exclude: /node_modules/
      }
    ],
    loaders: [ // 对某种类型的文件 应用 某个loader进行处理
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.html$/,
        loader: 'vue-html'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        query: { 
          limit: 10000, // 文件大小小于 10000kb 的时候生产 base64的文件
          name: utils.assetsPath('img/[name].[hash:7].[ext]') // 文件名的规则 生产
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  eslint: { 
    formatter: require('eslint-friendly-formatter') // 检查错误友好的提示错误信息 并提供 es6语法的官网链接
  },
  vue: {
    loaders: utils.cssLoaders() // .vue文件中CSS处理的loader
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">var</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)
<span class="hljs-keyword">var</span> config = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../config'</span>) 
<span class="hljs-keyword">var</span> utils = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./utils'</span>)
<span class="hljs-keyword">var</span> projectRoot = path.resolve(__dirname, <span class="hljs-string">'../'</span>) <span class="hljs-comment">// 项目根目录</span>

<span class="hljs-built_in">module</span>.exports = {
  entry: {
    app: <span class="hljs-string">'./src/main.js'</span> <span class="hljs-comment">// 入口文件</span>
  },
  output: {
    path: config.build.assetsRoot, <span class="hljs-comment">// 打包的根目录名字</span>
    publicPath: process.env.NODE_ENV === <span class="hljs-string">'production'</span> ? config.build.assetsPublicPath : config.dev.assetsPublicPath, <span class="hljs-comment">// 根目录</span>
    filename: <span class="hljs-string">'[name].js'</span> <span class="hljs-comment">// 对应 entry 的key名字</span>
  },
  resolve: { <span class="hljs-comment">// 设置在 require() 或者import 模块一些相关配置</span>
    extensions: [<span class="hljs-string">''</span>, <span class="hljs-string">'.js'</span>, <span class="hljs-string">'.vue'</span>], <span class="hljs-comment">// 自动补全文件后缀</span>
    fallback: [path.join(__dirname, <span class="hljs-string">'../node_modules'</span>)], <span class="hljs-comment">// require() 找不到模块，会充 node_modules模块中寻找 </span>
    alias: { <span class="hljs-comment">// 别名</span>
      <span class="hljs-string">'src'</span>: path.resolve(__dirname, <span class="hljs-string">'../src'</span>), <span class="hljs-comment">// require 的时候 使用的别名</span>
      <span class="hljs-string">'assets'</span>: path.resolve(__dirname, <span class="hljs-string">'../src/assets'</span>),
      <span class="hljs-string">'components'</span>: path.resolve(__dirname, <span class="hljs-string">'../src/components'</span>)
    }
  },
  resolveLoader: {  <span class="hljs-comment">// require() 找不到模块，会充 node_modules模块中寻找</span>
    fallback: [path.join(__dirname, <span class="hljs-string">'../node_modules'</span>)] 
  },
  <span class="hljs-keyword">module</span>: {
    preLoaders: [<span class="hljs-comment">// preLoaders 会在loader之前对文件进行处理  // 对某种类型的文件 应用 某个loader进行处理</span>
      {
        test: <span class="hljs-regexp">/\.vue$/</span>,
        loader: <span class="hljs-string">'eslint'</span>,
        include: projectRoot, <span class="hljs-comment">// 检查的文件。 只对该文件下的文件进行检查</span>
        exclude: <span class="hljs-regexp">/node_modules/</span> <span class="hljs-comment">// 排除这些目录，进行该loader处理</span>
      },
      {
        test: <span class="hljs-regexp">/\.js$/</span>,
        loader: <span class="hljs-string">'eslint'</span>,
        include: projectRoot,
        exclude: <span class="hljs-regexp">/node_modules/</span>
      }
    ],
    loaders: [ <span class="hljs-comment">// 对某种类型的文件 应用 某个loader进行处理</span>
      {
        test: <span class="hljs-regexp">/\.vue$/</span>,
        loader: <span class="hljs-string">'vue'</span>
      },
      {
        test: <span class="hljs-regexp">/\.js$/</span>,
        loader: <span class="hljs-string">'babel'</span>,
        include: projectRoot,
        exclude: <span class="hljs-regexp">/node_modules/</span>
      },
      {
        test: <span class="hljs-regexp">/\.json$/</span>,
        loader: <span class="hljs-string">'json'</span>
      },
      {
        test: <span class="hljs-regexp">/\.html$/</span>,
        loader: <span class="hljs-string">'vue-html'</span>
      },
      {
        test: <span class="hljs-regexp">/\.(png|jpe?g|gif|svg)(\?.*)?$/</span>,
        loader: <span class="hljs-string">'url'</span>,
        query: { 
          limit: <span class="hljs-number">10000</span>, <span class="hljs-comment">// 文件大小小于 10000kb 的时候生产 base64的文件</span>
          name: utils.assetsPath(<span class="hljs-string">'img/[name].[hash:7].[ext]'</span>) <span class="hljs-comment">// 文件名的规则 生产</span>
        }
      },
      {
        test: <span class="hljs-regexp">/\.(woff2?|eot|ttf|otf)(\?.*)?$/</span>,
        loader: <span class="hljs-string">'url'</span>,
        query: {
          limit: <span class="hljs-number">10000</span>,
          name: utils.assetsPath(<span class="hljs-string">'fonts/[name].[hash:7].[ext]'</span>)
        }
      }
    ]
  },
  eslint: { 
    formatter: <span class="hljs-built_in">require</span>(<span class="hljs-string">'eslint-friendly-formatter'</span>) <span class="hljs-comment">// 检查错误友好的提示错误信息 并提供 es6语法的官网链接</span>
  },
  vue: {
    loaders: utils.cssLoaders() <span class="hljs-comment">// .vue文件中CSS处理的loader</span>
  }
}</code></pre>
<p><code>webpack.dev.conf.js</code> dev环境下的webpack配置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var config = require('../config')
var webpack = require('webpack')
var merge = require('webpack-merge')
var utils = require('./utils')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) { // hot relaod 相关代码 // 改变源码在浏览器不刷新的情况下，能够看到更新后的视图.
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  module: { 
    // 独立对 CSS预处理文件进行编译
    loaders: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // eval-source-map is faster for development
  devtool: '#eval-source-map', 
  plugins: [
    new webpack.DefinePlugin({ // 把源码中的 `process.env` 替换成 config.dev.env
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.optimize.OccurenceOrderPlugin(), // webpack 优化插件. 对插件使用的频率
    new webpack.HotModuleReplacementPlugin(), // hot realod
    new webpack.NoErrorsPlugin(), // 编译错误，会跳过那段代码
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({ // 通过
      filename: 'index.html', // 编译生成的文件名
      template: 'index.html', // 处理的模板
      inject: true // 表示打包的时候，路径自动添加到index.html中. css 的路径会自动添加到 head头部， js会默认添加到body中
    })
  ]
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-selector-tag">var</span> config = require(<span class="hljs-string">'../config'</span>)
<span class="hljs-selector-tag">var</span> webpack = require(<span class="hljs-string">'webpack'</span>)
<span class="hljs-selector-tag">var</span> merge = require(<span class="hljs-string">'webpack-merge'</span>)
<span class="hljs-selector-tag">var</span> utils = require(<span class="hljs-string">'./utils'</span>)
<span class="hljs-selector-tag">var</span> baseWebpackConfig = require(<span class="hljs-string">'./webpack.base.conf'</span>)
<span class="hljs-selector-tag">var</span> HtmlWebpackPlugin = require(<span class="hljs-string">'html-webpack-plugin'</span>)

<span class="hljs-comment">// add hot-reload related code to entry chunks</span>
Object.keys(baseWebpackConfig.entry).forEach(function (name) { <span class="hljs-comment">// hot relaod 相关代码 // 改变源码在浏览器不刷新的情况下，能够看到更新后的视图.</span>
  baseWebpackConfig<span class="hljs-selector-class">.entry</span>[name] = [<span class="hljs-string">'./build/dev-client'</span>].concat(baseWebpackConfig<span class="hljs-selector-class">.entry</span>[name])
})

module<span class="hljs-selector-class">.exports</span> = merge(baseWebpackConfig, {
  module: { 
    <span class="hljs-comment">// 独立对 CSS预处理文件进行编译</span>
    loaders: utils.styleLoaders({ sourceMap: config<span class="hljs-selector-class">.dev</span><span class="hljs-selector-class">.cssSourceMap</span> })
  },
  <span class="hljs-comment">// eval-source-map is faster for development</span>
  devtool: <span class="hljs-string">'#eval-source-map'</span>, 
  plugins: [
    new webpack.DefinePlugin({ <span class="hljs-comment">// 把源码中的 `process.env` 替换成 config.dev.env</span>
      <span class="hljs-string">'process.env'</span>: config<span class="hljs-selector-class">.dev</span><span class="hljs-selector-class">.env</span>
    }),
    <span class="hljs-comment">// https://github.com/glenjamin/webpack-hot-middleware#installation--usage</span>
    new webpack<span class="hljs-selector-class">.optimize</span><span class="hljs-selector-class">.OccurenceOrderPlugin</span>(), <span class="hljs-comment">// webpack 优化插件. 对插件使用的频率</span>
    new webpack.HotModuleReplacementPlugin(), <span class="hljs-comment">// hot realod</span>
    new webpack.NoErrorsPlugin(), <span class="hljs-comment">// 编译错误，会跳过那段代码</span>
    <span class="hljs-comment">// https://github.com/ampedandwired/html-webpack-plugin</span>
    new HtmlWebpackPlugin({ <span class="hljs-comment">// 通过</span>
      filename: <span class="hljs-string">'index.html'</span>, <span class="hljs-comment">// 编译生成的文件名</span>
      template: <span class="hljs-string">'index.html'</span>, <span class="hljs-comment">// 处理的模板</span>
      inject: true <span class="hljs-comment">// 表示打包的时候，路径自动添加到index.html中. css 的路径会自动添加到 head头部， js会默认添加到body中</span>
    })
  ]
})</code></pre>
<p><code>dev-server.js</code> dev运行文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var path = require('path')
var express = require('express')
var webpack = require('webpack')
var config = require('../config')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = process.env.NODE_ENV === 'testing'
  ? require('./webpack.prod.conf')
  : require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port  // 端口号
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable // 代理的接口

var app = express()
var compiler = webpack(webpackConfig) // 编译webapck配置

var devMiddleware = require('webpack-dev-middleware')(compiler, {  // webpack专门为express开发的中间件.
  publicPath: webpackConfig.output.publicPath, // 静态资源访问目录
  stats: {
    colors: true,
    chunks: false
  }
})

var hotMiddleware = require('webpack-hot-middleware')(compiler) // 访问的app文件，并没有生产到项目目录中，而是在内存中，该中间件做了处理，放入内存中.
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) { // 处理代理接口
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware) // 使用自定义中间件

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware) // 使用自定义中间件

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory) // 处理静态资源目录
app.use(staticPath, express.static('./static')) //  静态资源目录

module.exports = app.listen(port, function (err) { // 监听
  if (err) { 
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-keyword">var</span> path = <span class="hljs-keyword">require</span>(<span class="hljs-string">'path'</span>)
<span class="hljs-keyword">var</span> express = <span class="hljs-keyword">require</span>(<span class="hljs-string">'express'</span>)
<span class="hljs-keyword">var</span> webpack = <span class="hljs-keyword">require</span>(<span class="hljs-string">'webpack'</span>)
<span class="hljs-keyword">var</span> config = <span class="hljs-keyword">require</span>(<span class="hljs-string">'../config'</span>)
<span class="hljs-keyword">var</span> proxyMiddleware = <span class="hljs-keyword">require</span>(<span class="hljs-string">'http-proxy-middleware'</span>)
<span class="hljs-keyword">var</span> webpackConfig = process.env.NODE_ENV === <span class="hljs-string">'testing'</span>
  ? <span class="hljs-keyword">require</span>(<span class="hljs-string">'./webpack.prod.conf'</span>)
  : <span class="hljs-keyword">require</span>(<span class="hljs-string">'./webpack.dev.conf'</span>)

<span class="hljs-comment">// default port where dev server listens for incoming traffic</span>
<span class="hljs-keyword">var</span> port = process.env.PORT || config.dev.port  <span class="hljs-comment">// 端口号</span>
<span class="hljs-comment">// Define HTTP proxies to your custom API backend</span>
<span class="hljs-comment">// https://github.com/chimurai/http-proxy-middleware</span>
<span class="hljs-keyword">var</span> proxyTable = config.dev.proxyTable <span class="hljs-comment">// 代理的接口</span>

<span class="hljs-keyword">var</span> app = express()
<span class="hljs-keyword">var</span> compiler = webpack(webpackConfig) <span class="hljs-comment">// 编译webapck配置</span>

<span class="hljs-keyword">var</span> devMiddleware = <span class="hljs-keyword">require</span>(<span class="hljs-string">'webpack-dev-middleware'</span>)(compiler, {  <span class="hljs-comment">// webpack专门为express开发的中间件.</span>
  publicPath: webpackConfig.output.publicPath, <span class="hljs-comment">// 静态资源访问目录</span>
  stats: {
    colors: <span class="hljs-keyword">true</span>,
    chunks: <span class="hljs-keyword">false</span>
  }
})

<span class="hljs-keyword">var</span> hotMiddleware = <span class="hljs-keyword">require</span>(<span class="hljs-string">'webpack-hot-middleware'</span>)(compiler) <span class="hljs-comment">// 访问的app文件，并没有生产到项目目录中，而是在内存中，该中间件做了处理，放入内存中.</span>
<span class="hljs-comment">// force page reload when html-webpack-plugin template changes</span>
compiler.plugin(<span class="hljs-string">'compilation'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(compilation)</span> </span>{
  compilation.plugin(<span class="hljs-string">'html-webpack-plugin-after-emit'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(data, cb)</span> </span>{
    hotMiddleware.publish({ action: <span class="hljs-string">'reload'</span> })
    cb()
  })
})

<span class="hljs-comment">// proxy api requests</span>
Object.keys(proxyTable).<span class="hljs-keyword">forEach</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(context)</span> </span>{ <span class="hljs-comment">// 处理代理接口</span>
  <span class="hljs-keyword">var</span> options = proxyTable[context]
  <span class="hljs-keyword">if</span> (typeof options === <span class="hljs-string">'string'</span>) {
    options = { target: options }
  }
  app.<span class="hljs-keyword">use</span>(proxyMiddleware(context, options))
})

<span class="hljs-comment">// handle fallback for HTML5 history API</span>
app.<span class="hljs-keyword">use</span>(<span class="hljs-keyword">require</span>(<span class="hljs-string">'connect-history-api-fallback'</span>)())

<span class="hljs-comment">// serve webpack bundle output</span>
app.<span class="hljs-keyword">use</span>(devMiddleware) <span class="hljs-comment">// 使用自定义中间件</span>

<span class="hljs-comment">// enable hot-reload and state-preserving</span>
<span class="hljs-comment">// compilation error display</span>
app.<span class="hljs-keyword">use</span>(hotMiddleware) <span class="hljs-comment">// 使用自定义中间件</span>

<span class="hljs-comment">// serve pure static assets</span>
<span class="hljs-keyword">var</span> staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory) <span class="hljs-comment">// 处理静态资源目录</span>
app.<span class="hljs-keyword">use</span>(staticPath, express.<span class="hljs-keyword">static</span>(<span class="hljs-string">'./static'</span>)) <span class="hljs-comment">//  静态资源目录</span>

module.exports = app.listen(port, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(err)</span> </span>{ <span class="hljs-comment">// 监听</span>
  <span class="hljs-keyword">if</span> (err) { 
    console.log(err)
    <span class="hljs-keyword">return</span>
  }
  console.log(<span class="hljs-string">'Listening at http://localhost:'</span> + port + <span class="hljs-string">'\n'</span>)
})</code></pre>
<p>项目目录</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="`src`所有源码目录
-`main.js`入口文件 
-`App.vue` 整个页面是实例文件

-`components` 组件目录
--`header` 子组件目录
---`header.vue` 具体的组件

--`common` 公共资源
---`js`  基础库
---`stylus` css预处理器
---`fonts` 字体库" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haml"><code>`src`所有源码目录
-<span class="ruby"><span class="hljs-string">`main.js`</span>入口文件 
</span>-<span class="ruby"><span class="hljs-string">`App.vue`</span> 整个页面是实例文件
</span>
-<span class="ruby"><span class="hljs-string">`components`</span> 组件目录
</span>-<span class="ruby">-<span class="hljs-string">`header`</span> 子组件目录
</span>-<span class="ruby">--<span class="hljs-string">`header.vue`</span> 具体的组件
</span>
-<span class="ruby">-<span class="hljs-string">`common`</span> 公共资源
</span>-<span class="ruby">--<span class="hljs-string">`js`</span>  基础库
</span>-<span class="ruby">--<span class="hljs-string">`stylus`</span> css预处理器
</span>-<span class="ruby">--<span class="hljs-string">`fonts`</span> 字体库</span></code></pre>
<p><strong>数据传递</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="props

1. 变量名 = data --> 自定义组件的自定义属性
2. props 在child, 变量名在child



父级到子级：

父级：
$broadcast
子级：
evnets: {
    events: function () {
    }
}


子级到父级：

父级：
evnets: {
    events: function () {} 
}

子级：
$dispatch" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code>props

<span class="hljs-number">1.</span> 变量名 = data --&gt; 自定义组件的自定义属性
<span class="hljs-number">2.</span> props 在child, 变量名在child



父级到子级：

父级：
$broadcast
子级：
evnets: {
    events: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
    }
}


子级到父级：

父级：
evnets: {
    events: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{} 
}

子级：
$dispatch</code></pre>
<h1 id="articleHeader33">配置选项</h1>
<p>new Vue(options)</p>
<ul>
<li><p>el</p></li>
<li><p>data</p></li>
<li><p>methods</p></li>
<li><p>components</p></li>
<li><p>computed</p></li>
<li><p>wtach</p></li>
<li><p>replace</p></li>
</ul>
<hr>
<ul>
<li><p>init</p></li>
<li><p>created</p></li>
<li><p>beforeCompile</p></li>
<li><p>compiled</p></li>
<li><p>ready</p></li>
<li><p>attached</p></li>
<li><p>detached</p></li>
<li><p>beforeDestroy</p></li>
<li><p>destoryed</p></li>
</ul>
<hr>
<ul>
<li><p>events</p></li>
<li><p>mixins: [mixin]</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var vm = new Vue({

    el: '选择器', // 挂载到页面的那个元素里，即确定vue的作用范围，外部可以通过 vm.$el 访问，得到的是一个原生dom元素，可进行对应操作
    
    a: '', // 自定义属性， 外部课通过vm.$options 访问

    data: {}, // 实例属性，外部通过实例名， 即vm.$data调用

    computed: {}, // 计算属性， 也是实例属性， 只是以方法的形式存在，并可以有逻辑运算的属性

    method: {}, // 实例方法

    wtach: {}, // 对data和computed的属性进行监听，当属性有变化时，自动触发，以方法的形式存在 外部通过$.watch调用

    // 以上属性和方法，实例内部都通过 this调用，外部则通过对应的实例方法访问.

    // 在vue的生命周期过程中，提供了一系列的钩子函数，进行自定义逻辑注入

    created: function () { // 实例已经创建 }，

    beforeCompile: function () { // 模块编译之前 }, 

    compiled: function () { // 模块编译之后，即模板占位符被是内容替换 },

    ready: function () { // 模板插入到文档中， 相当于window.onload },

    // 上面4个方法，在对象被实例化后即按顺序执行

    beforeDestroy: function () { // 对象销毁之前 },

    destroyed: function () { // 对象销毁之后 }

    // 上面2个方法需通过事件主动触发， vm.$destory(); 才执行 
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs oxygene"><code><span class="hljs-keyword">var</span> vm = <span class="hljs-keyword">new</span> Vue(<span class="hljs-comment">{

    el: '选择器', // 挂载到页面的那个元素里，即确定vue的作用范围，外部可以通过 vm.$el 访问，得到的是一个原生dom元素，可进行对应操作
    
    a: '', // 自定义属性， 外部课通过vm.$options 访问

    data: {}</span>, <span class="hljs-comment">// 实例属性，外部通过实例名， 即vm.$data调用</span>

    computed: <span class="hljs-comment">{}</span>, <span class="hljs-comment">// 计算属性， 也是实例属性， 只是以方法的形式存在，并可以有逻辑运算的属性</span>

    <span class="hljs-function"><span class="hljs-keyword">method</span>:</span> <span class="hljs-comment">{}</span>, <span class="hljs-comment">// 实例方法</span>

    wtach: <span class="hljs-comment">{}</span>, <span class="hljs-comment">// 对data和computed的属性进行监听，当属性有变化时，自动触发，以方法的形式存在 外部通过$.watch调用</span>

    <span class="hljs-comment">// 以上属性和方法，实例内部都通过 this调用，外部则通过对应的实例方法访问.</span>

    <span class="hljs-comment">// 在vue的生命周期过程中，提供了一系列的钩子函数，进行自定义逻辑注入</span>

    created: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> <span class="hljs-comment">{ // 实例已经创建 }</span>，

    <span class="hljs-title">beforeCompile</span>:</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> <span class="hljs-comment">{ // 模块编译之前 }</span>, 

    <span class="hljs-title">compiled</span>:</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> <span class="hljs-comment">{ // 模块编译之后，即模板占位符被是内容替换 }</span>,

    <span class="hljs-title">ready</span>:</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> <span class="hljs-comment">{ // 模板插入到文档中， 相当于window.onload }</span>,

    // 上面4个方法，在对象被实例化后即按顺序执行

    <span class="hljs-title">beforeDestroy</span>:</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> <span class="hljs-comment">{ // 对象销毁之前 }</span>,

    <span class="hljs-title">destroyed</span>:</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> <span class="hljs-comment">{ // 对象销毁之后 }</span>

    // 上面2个方法需通过事件主动触发， <span class="hljs-title">vm</span>.$<span class="hljs-title">destory</span><span class="hljs-params">()</span>;</span> 才执行 
});</code></pre>
<p>Vue.extend(options)</p>
<ul>
<li><p>template</p></li>
<li><p>data</p></li>
<li><p>props</p></li>
<li><p>components</p></li>
<li><p>name</p></li>
<li><p>mixins: [mixin]</p></li>
<li><p>methods</p></li>
</ul>
<p>Vue.component(id, options)</p>
<ul>
<li><p>props (array | object)</p></li>
<li><p>templalte</p></li>
<li><p>methods</p></li>
<li><p>data</p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue_Vue权威指南

## 原文链接
[https://segmentfault.com/a/1190000006998227](https://segmentfault.com/a/1190000006998227)

