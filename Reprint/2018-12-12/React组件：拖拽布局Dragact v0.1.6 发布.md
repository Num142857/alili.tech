---
title: 'React组件：拖拽布局Dragact v0.1.6 发布' 
date: 2018-12-12 2:30:10
hidden: true
slug: 5z17uqtes6w
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/remote/1460000013377768?w=600&amp;h=375" src="https://static.alili.tech/img/remote/1460000013377768?w=600&amp;h=375" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>仓库地址：<a href="https://github.com/215566435/Dragact" rel="nofollow noreferrer" target="_blank">Dragact爽滑的拖拽组件</a></p>
<p>大家好，新年已经过去，大家又投入了繁忙的工作当中，由于我在国外，因此压根儿没有休息...</p>
<p>少说废话，上周一周的时间里，我陆陆续续的为<a href="https://github.com/215566435/Dragact" rel="nofollow noreferrer" target="_blank">Dragact</a><br>组件进行了一系列更新，基本上做了一个大重构，而且做了一小部分性能优化。</p>
<h1 id="articleHeader0">新特性1：性能提升</h1>
<p>通过对React 组件渲染的优化以及内部算法的优化，把大量的遍历和渲染都省掉。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013377766?w=448&amp;h=221" src="https://static.alili.tech/img/remote/1460000013377766?w=448&amp;h=221" alt="" title="" style="cursor: pointer; display: inline;"></span><br>优化前6s的性能</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013377767?w=528&amp;h=300" src="https://static.alili.tech/img/remote/1460000013377767?w=528&amp;h=300" alt="" title="" style="cursor: pointer; display: inline;"></span><br>优化后6s的性能</p>
<p>大家可以看到，同样是跑6s，我们脚本计算时间，渲染时间，浏览器painting时间都有了很大幅度的提升。</p>
<h1 id="articleHeader1">新特性2：不一样的挂件渲染Api</h1>
<h3 id="articleHeader2">依赖注入式的挂件(widget)</h3>
<p>可以从最简单的例子看出，我们渲染子组件的方式和以往有些不同。以往的React组件书写方式，采用的是类似以下写法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<Dragact
        col={8}
        width={800}
        margin={[5, 5]}
        rowHeight={40}
        className='plant-layout'
    >
        <div key={0} data-set="{{" GridX: 0, GridY: 0, w: 4, h: 2 "}}" className='layout-child'>0</div>
        <div key={1} data-set="{{" GridX: 0, GridY: 0, w: 1, h: 2 "}}" className='layout-child'>1</div>
        <div key={2} data-set="{{" GridX: 0, GridY: 0, w: 3, h: 2 "}}" className='layout-child'>2</div>
    </Dragact>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code class="tsx"><span class="hljs-tag">&lt;<span class="hljs-name">Dragact</span>
        <span class="hljs-attr">col</span>=<span class="hljs-string">{8}</span>
        <span class="hljs-attr">width</span>=<span class="hljs-string">{800}</span>
        <span class="hljs-attr">margin</span>=<span class="hljs-string">{[5,</span> <span class="hljs-attr">5</span>]}
        <span class="hljs-attr">rowHeight</span>=<span class="hljs-string">{40}</span>
        <span class="hljs-attr">className</span>=<span class="hljs-string">'plant-layout'</span>
    &gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{0}</span> <span class="hljs-attr">data-set</span>=<span class="hljs-string">"{{"</span> <span class="hljs-attr">GridX:</span> <span class="hljs-attr">0</span>, <span class="hljs-attr">GridY:</span> <span class="hljs-attr">0</span>, <span class="hljs-attr">w:</span> <span class="hljs-attr">4</span>, <span class="hljs-attr">h:</span> <span class="hljs-attr">2</span> "}}" <span class="hljs-attr">className</span>=<span class="hljs-string">'layout-child'</span>&gt;</span>0<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{1}</span> <span class="hljs-attr">data-set</span>=<span class="hljs-string">"{{"</span> <span class="hljs-attr">GridX:</span> <span class="hljs-attr">0</span>, <span class="hljs-attr">GridY:</span> <span class="hljs-attr">0</span>, <span class="hljs-attr">w:</span> <span class="hljs-attr">1</span>, <span class="hljs-attr">h:</span> <span class="hljs-attr">2</span> "}}" <span class="hljs-attr">className</span>=<span class="hljs-string">'layout-child'</span>&gt;</span>1<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{2}</span> <span class="hljs-attr">data-set</span>=<span class="hljs-string">"{{"</span> <span class="hljs-attr">GridX:</span> <span class="hljs-attr">0</span>, <span class="hljs-attr">GridY:</span> <span class="hljs-attr">0</span>, <span class="hljs-attr">w:</span> <span class="hljs-attr">3</span>, <span class="hljs-attr">h:</span> <span class="hljs-attr">2</span> "}}" <span class="hljs-attr">className</span>=<span class="hljs-string">'layout-child'</span>&gt;</span>2<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">Dragact</span>&gt;</span></code></pre>
<p>这么做当然可以，但是有几个问题：</p>
<ul>
<li>子组件非常的丑，需要我们定义一大堆东西</li>
<li>很难监听到子组件的事件，比如是否拖拽等</li>
<li>如果有大量的数据时，就必须写对数组写一个map函数，类似:layout.map(item=&gt;item); 来帮助渲染数组</li>
</ul>
<p>为了解决这个问题，我将子组件的渲染方式进行高度抽象成为一个构造器，简单来说就是以下的形式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<Dragact
        layout={fakeData}//必填项
        ....
    >
        {(item, isDragging) => {
            return <div style={blockStyle}>
                {isDragging ? '正在抓取' : '停放'}
            </div>
        "}}"
    </Dragact>," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&lt;Dragact
        layout={fakeData}<span class="hljs-comment">//必填项</span>
        ....
    &gt;
        {(item, isDragging) =&gt; {
            <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{blockStyle}</span>&gt;</span>
                {isDragging ? '正在抓取' : '停放'}
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
        "}}"
    &lt;<span class="hljs-regexp">/Dragact&gt;,</span></code></pre>
<p>现在，我们子元素渲染变成一个小小的构造函数，第一个入参是您输入数据的每一项，第二个参数就是isDragging，状态监听参数。</p>
<p>这么做，轻易的实现了，组件漂亮，不用写map函数，不用写key，同时更容易监听每一个组件的拖拽状态isDragging.</p>
<p>更多的依赖注入思想以及好处，请看我的知乎问答：<a href="https://www.zhihu.com/question/266745124/answer/322998960" rel="nofollow noreferrer" target="_blank">知乎，方正的回答：如何设计一款组件库</a></p>
<p>最后放一张图动图:<br><span class="img-wrap"><img data-src="/img/remote/1460000013377768?w=600&amp;h=375" src="https://static.alili.tech/img/remote/1460000013377768?w=600&amp;h=375" alt="" title="" style="cursor: pointer;"></span></p>
<p>非常轻松的追踪到了是否拖拽</p>
<h1 id="articleHeader3">新特性3：拖拽把手</h1>
<p>通过全新的api，现在dragact能够轻松的实现，全自定义的拖拽把手</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013377769?w=600&amp;h=375" src="https://static.alili.tech/img/remote/1460000013377769?w=600&amp;h=375" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>点击拖拽把手就能移动，不点击？绝对不能移动</p>
<h1 id="articleHeader4">新特性4：数据驱动的模式</h1>
<blockquote>视图的改变就是数据的改变</blockquote>
<p>这是React给我们的一个启示，<a href="https://github.com/215566435/Dragact" rel="nofollow noreferrer" target="_blank">Dragact</a>组件通过对数据的处理，达到了数据变化即视图变化。</p>
<p>这么做的好处就是我们可以轻松的将布局信息记录在服务器的数据库中，下一次拿到数据的时候，就可以轻松的恢复原来的视图位置。</p>
<p>通过获取<a href="https://github.com/215566435/Dragact" rel="nofollow noreferrer" target="_blank">Dragact</a>组件的实例，我提供了一个api getLayout():DragactLayout;，用于获取当前的布局信息。</p>
<p>在这个例子：<a href="http://link.zhihu.com/?target=http%3A//htmlpreview.github.io/%3Fhttps%3A//github.com/215566435/React-dragger-layout/blob/master/build/index.html" rel="nofollow noreferrer" target="_blank">Drag例子中</a>，我们通过调用getLayout() api将数据存储在本地浏览器中，当下次访问的时候，我们就可以恢复之前所摆放的布局。</p>
<h1 id="articleHeader5">新特性5：全新的用例，支持移动端</h1>
<p>为了更好的观看体验，我为移动端的用户们设计了一个用例页面，现在可以在手机上玩耍啦！</p>
<p>手机端例子：<a href="http://link.zhihu.com/?target=http%3A//htmlpreview.github.io/%3Fhttps%3A//github.com/215566435/React-dragger-layout/blob/master/build/index.html" rel="nofollow noreferrer" target="_blank">Drag例子中</a></p>
<p>手机端的界面<br><span class="img-wrap"><img data-src="/img/remote/1460000013377778?w=600&amp;h=375" src="https://static.alili.tech/img/remote/1460000013377778?w=600&amp;h=375" alt="" title="" style="cursor: pointer;"></span></p>
<h1 id="articleHeader6">下一个版本：</h1>
<ul>
<li>支持自动滚动，当拖拽鼠标到达浏览器边缘的时候，视图能够自动滚动</li>
<li>列表布局，现在是全局布局，下个版本中考虑加入新的列表布局</li>
<li>拖拽把手的高街组件，目前拖拽把手实现有点点蛋疼，在下个版本中，我将进行着重修改</li>
</ul>
<p><a href="https://github.com/215566435/Dragact" rel="nofollow noreferrer" target="_blank">仓库地址：[Dragact爽滑的拖拽组件</a></p>
<p>感谢大家支持，喜欢的给一点✨！～</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React组件：拖拽布局Dragact v0.1.6 发布

## 原文链接
[https://segmentfault.com/a/1190000013377761](https://segmentfault.com/a/1190000013377761)

