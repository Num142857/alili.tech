---
title: '纯css实现手机通讯录' 
date: 2019-02-15 2:30:44
hidden: true
slug: k7jjlj9018
categories: [reprint]
---

{{< raw >}}

                    
<p>我们经常在手机上看到通讯录列表，这类布局一般有两个显著的效果</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016709371?w=360&amp;h=640" src="https://static.alili.tech/img/remote/1460000016709371?w=360&amp;h=640" alt="20181016202731.png" title="20181016202731.png" style="cursor: pointer; display: inline;"></span></p>
<ol>
<li>首字母吸顶</li>
<li>快速定位</li>
</ol>
<p>下面我们来实现一下</p>
<h2 id="articleHeader0">页面结构</h2>
<p>这里页面结构很简单，就是两个列表</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;con&quot;>
    <!--联系人列表-->
    <div class=&quot;contacts&quot; id=&quot;contacts&quot;>
        <dl>A</dt>
        <dt>a1</dt>
        <dt>a2</dt>
        <dl>B</dt>
        <dt>b1</dt>
        <dt>b2</dt>
        ...
    </div>
    <!--导航列表-->
    <div class=&quot;index&quot; id=&quot;index&quot;>
        <a>A</a>
        <a>B</a>
    </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"con"</span>&gt;</span>
    <span class="hljs-comment">&lt;!--联系人列表--&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"contacts"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"contacts"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">dl</span>&gt;</span>A<span class="hljs-tag">&lt;/<span class="hljs-name">dt</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">dt</span>&gt;</span>a1<span class="hljs-tag">&lt;/<span class="hljs-name">dt</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">dt</span>&gt;</span>a2<span class="hljs-tag">&lt;/<span class="hljs-name">dt</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">dl</span>&gt;</span>B<span class="hljs-tag">&lt;/<span class="hljs-name">dt</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">dt</span>&gt;</span>b1<span class="hljs-tag">&lt;/<span class="hljs-name">dt</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">dt</span>&gt;</span>b2<span class="hljs-tag">&lt;/<span class="hljs-name">dt</span>&gt;</span>
        ...
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-comment">&lt;!--导航列表--&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"index"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"index"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">a</span>&gt;</span>A<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">a</span>&gt;</span>B<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>然后加点样式</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="html,body{
    margin: 0;
    height: 100%;
    padding: 0;
}
dl,dd{
    margin: 0;
}
.con{
    position: relative;
    height: 100%;
    overflow-x: hidden;
}
.index{
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.index a{
    display: block;
    width: 30px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    border-radius: 50%;
    background: cornflowerblue;
    text-decoration: none;
    color: #fff;
    outline: 0;
    margin: 5px;
}
.contacts{
    height: 100%;
    background: #fff;
    overflow: auto;
    line-height: 2em;
}
.contacts dt{
    background: bisque;
    font-size: 1.5rem;
    color:cornflowerblue;
    height: 2em;
    line-height: 2em;
    padding: 0 10px;
}
.contacts dd{
    padding: 0 10px;
    display: block;
    cursor: pointer;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">html</span>,<span class="hljs-selector-tag">body</span>{
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
}
<span class="hljs-selector-tag">dl</span>,<span class="hljs-selector-tag">dd</span>{
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
}
<span class="hljs-selector-class">.con</span>{
    <span class="hljs-attribute">position</span>: relative;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">overflow-x</span>: hidden;
}
<span class="hljs-selector-class">.index</span>{
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">flex-direction</span>: column;
    <span class="hljs-attribute">justify-content</span>: center;
}
<span class="hljs-selector-class">.index</span> <span class="hljs-selector-tag">a</span>{
    <span class="hljs-attribute">display</span>: block;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">30px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">30px</span>;
    <span class="hljs-attribute">text-align</span>: center;
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">30px</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">background</span>: cornflowerblue;
    <span class="hljs-attribute">text-decoration</span>: none;
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#fff</span>;
    <span class="hljs-attribute">outline</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">5px</span>;
}
<span class="hljs-selector-class">.contacts</span>{
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#fff</span>;
    <span class="hljs-attribute">overflow</span>: auto;
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">2em</span>;
}
<span class="hljs-selector-class">.contacts</span> <span class="hljs-selector-tag">dt</span>{
    <span class="hljs-attribute">background</span>: bisque;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">1.5rem</span>;
    <span class="hljs-attribute">color</span>:cornflowerblue;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">2em</span>;
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">2em</span>;
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span> <span class="hljs-number">10px</span>;
}
<span class="hljs-selector-class">.contacts</span> <span class="hljs-selector-tag">dd</span>{
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span> <span class="hljs-number">10px</span>;
    <span class="hljs-attribute">display</span>: block;
    <span class="hljs-attribute">cursor</span>: pointer;
}</code></pre>
<p>这样就可以看到布局了</p>
<p><a href="https://codepen.io/xboxyan/pen/OBzgLK/" rel="nofollow noreferrer" target="_blank">https://codepen.io/xboxyan/pe...</a><button class="btn btn-xs btn-default ml10 preview" data-url="xboxyan/pen/OBzgLK/" data-typeid="3">点击预览</button></p>
<h2 id="articleHeader1">实现吸顶效果</h2>
<p>吸顶效果其实很简单，只要用到css中的新属性<code>position:sticky</code>就可以了</p>
<blockquote>粘性定位元素（stickily positioned element）是计算后位置属性为 sticky 的元素。</blockquote>
<p>兼容性还不错，至少在移动端可以放心使用</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016709372" src="https://static.alili.tech/img/remote/1460000016709372" alt="20181016204441.png" title="20181016204441.png" style="cursor: pointer;"></span></p>
<p>给<code>.contacts dt</code>加上<code>position:sticky</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".contacts dt{
    /*添加如下属性*/
    position: sticky;
    top: 0;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.contacts</span> <span class="hljs-selector-tag">dt</span>{
    <span class="hljs-comment">/*添加如下属性*/</span>
    <span class="hljs-attribute">position</span>: sticky;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
}</code></pre>
<p>这样就实现了每个类目吸顶效果</p>
<p><a href="https://codepen.io/xboxyan/pen/oapwZQ/" rel="nofollow noreferrer" target="_blank">https://codepen.io/xboxyan/pe...</a><button class="btn btn-xs btn-default ml10 preview" data-url="xboxyan/pen/oapwZQ/" data-typeid="3">点击预览</button></p>
<h2 id="articleHeader2">实现快速定位效果</h2>
<p>如果不用js，那么可采用<code>href</code>锚点的方式来实现定位</p>
<p>具体做法就是</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<a href='#A'></a>

...

...


<div id='A'></div>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">'#A'</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>

...

...


<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">'A'</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>如果整个页面是可以滚动的，那么只要点击<code>a</code>，那么页面就会迅速跳转到<code>id=A</code>的元素上</p>
<p>现在对我们的页面添加一些<code>herf</code>和<code>id</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;con&quot;>
    <!--联系人列表-->
    <div class=&quot;contacts&quot; id=&quot;contacts&quot;>
        <dl id='A'>A</dt>
        <dt>a1</dt>
        <dt>a2</dt>
        <dl id='B'>B</dt>
        <dt>b1</dt>
        <dt>b2</dt>
        ...
    </div>
    <!--导航列表-->
    <div class=&quot;index&quot; id=&quot;index&quot;>
        <a href='#A'>A</a>
        <a href='#B'>B</a>
    </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"con"</span>&gt;</span>
    <span class="hljs-comment">&lt;!--联系人列表--&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"contacts"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"contacts"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">dl</span> <span class="hljs-attr">id</span>=<span class="hljs-string">'A'</span>&gt;</span>A<span class="hljs-tag">&lt;/<span class="hljs-name">dt</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">dt</span>&gt;</span>a1<span class="hljs-tag">&lt;/<span class="hljs-name">dt</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">dt</span>&gt;</span>a2<span class="hljs-tag">&lt;/<span class="hljs-name">dt</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">dl</span> <span class="hljs-attr">id</span>=<span class="hljs-string">'B'</span>&gt;</span>B<span class="hljs-tag">&lt;/<span class="hljs-name">dt</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">dt</span>&gt;</span>b1<span class="hljs-tag">&lt;/<span class="hljs-name">dt</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">dt</span>&gt;</span>b2<span class="hljs-tag">&lt;/<span class="hljs-name">dt</span>&gt;</span>
        ...
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-comment">&lt;!--导航列表--&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"index"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"index"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">'#A'</span>&gt;</span>A<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">'#B'</span>&gt;</span>B<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p><a href="https://codepen.io/xboxyan/pen/gBoRvb/" rel="nofollow noreferrer" target="_blank">https://codepen.io/xboxyan/pe...</a><button class="btn btn-xs btn-default ml10 preview" data-url="xboxyan/pen/gBoRvb/" data-typeid="3">点击预览</button></p>
<p>点击右侧的导航按钮，页面就可以快速定位了</p>
<p>等等，好像还有些问题，当往回跳转时，发现并没有完全展开，比如像调回<code>A</code>，结果虽然<code>A</code>标签出来了，但是，<code>A</code>下面的列表却没有出来</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016709373" src="https://static.alili.tech/img/remote/1460000016709373" alt="20181016205557.png" title="20181016205557.png" style="cursor: pointer;"></span></p>
<p>这是什么问题呢？</p>
<p>经过多次的研究，发现是<code>position:sticky</code>搞的鬼！</p>
<p>当往上定位的时候，我们通过<code>href</code>定位过去，定位的依据是到<strong>该元素第一次可见的位置</strong>，此时虽然该元素空压机了，但是下面的元素没有展示出来，所以就造成了这样的问题</p>
<p>发现问题就要解决问题</p>
<h2 id="articleHeader3">快速定位效果修复</h2>
<p>其实我们想要定位的还可以是<code>A</code>下面的第一个列表元素，但是又不能是该元素，因为如果是第一代元素，当跳转的时候就会被上面的<code>A</code>标签遮住。</p>
<p>所以我们在两者之间再插入一个标签，用于定位</p>
<p>如下，添加了<code>&lt;dl class="stikcy-fix"&gt;&lt;/dt&gt;</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;contacts&quot; id=&quot;contacts&quot;>
        <dl>A</dt>
        <dl class=&quot;stikcy-fix&quot; id='A'></dt>
        <dt>a1</dt>
        <dt>a2</dt>
        <dl>B</dt>
        <dl class=&quot;stikcy-fix&quot; id='B'></dl>
        <dt>b1</dt>
        <dt>b2</dt>
        ...
    </div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"contacts"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"contacts"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">dl</span>&gt;</span>A<span class="hljs-tag">&lt;/<span class="hljs-name">dt</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">dl</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"stikcy-fix"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">'A'</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">dt</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">dt</span>&gt;</span>a1<span class="hljs-tag">&lt;/<span class="hljs-name">dt</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">dt</span>&gt;</span>a2<span class="hljs-tag">&lt;/<span class="hljs-name">dt</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">dl</span>&gt;</span>B<span class="hljs-tag">&lt;/<span class="hljs-name">dt</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">dl</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"stikcy-fix"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">'B'</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">dl</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">dt</span>&gt;</span>b1<span class="hljs-tag">&lt;/<span class="hljs-name">dt</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">dt</span>&gt;</span>b2<span class="hljs-tag">&lt;/<span class="hljs-name">dt</span>&gt;</span>
        ...
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>如果直接放在这里肯定会占空间，所以我们把他向上位移，然后设置不可见，使该元素刚好覆盖在原标签位置</p>
<p>如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".contacts .stikcy-fix{
    position: static;
    visibility: hidden;
    margin-top: -2em;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.contacts</span> <span class="hljs-selector-class">.stikcy-fix</span>{
    <span class="hljs-attribute">position</span>: static;
    <span class="hljs-attribute">visibility</span>: hidden;
    <span class="hljs-attribute">margin-top</span>: -<span class="hljs-number">2em</span>;
}</code></pre>
<p><a href="https://codepen.io/xboxyan/pen/mzXdOo/" rel="nofollow noreferrer" target="_blank">https://codepen.io/xboxyan/pe...</a><button class="btn btn-xs btn-default ml10 preview" data-url="xboxyan/pen/mzXdOo/" data-typeid="3">点击预览</button></p>
<p>现在看看，是不是完美跳转了？</p>
<h2 id="articleHeader4">其他细节</h2>
<p>通常我们在选择右侧索引时，页面中间会出现一个大写的字母</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016709374" src="https://static.alili.tech/img/remote/1460000016709374" alt="20181017093614.png" title="20181017093614.png" style="cursor: pointer; display: inline;"></span></p>
<p>这个如果用css实现也比较简单，用到伪元素的<code>content:attr()</code>就可以了，在之前的文章<a href="https://blog.codelabo.cn/article/5b42defe76303126a26e06b9" rel="nofollow noreferrer" target="_blank">(用纯css实现打星星效果)</a>中也讲到过</p>
<p>具体实现如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".index a:active:after{
    content: attr(data-type);
    position: fixed;
    left: 50%;
    top: 50%;
    width: 100px;
    height: 100px;
    border-radius: 5px;
    text-align: center;
    line-height: 100px;
    font-size: 50px;
    transform: translate(-50%,-50%);
    background: rgba(0,0,0,.5);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.index</span> <span class="hljs-selector-tag">a</span><span class="hljs-selector-pseudo">:active</span><span class="hljs-selector-pseudo">:after</span>{
    <span class="hljs-attribute">content</span>: <span class="hljs-built_in">attr</span>(data-type);
    <span class="hljs-attribute">position</span>: fixed;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">5px</span>;
    <span class="hljs-attribute">text-align</span>: center;
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">50px</span>;
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate</span>(-50%,-50%);
    <span class="hljs-attribute">background</span>: <span class="hljs-built_in">rgba</span>(0,0,0,.5);
}</code></pre>
<p>这里用到了<code>content: attr(data-type)</code>，所以<code>a</code>上面要有一个<code>data-type</code>属性</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!--导航列表-->
<div class=&quot;index&quot; id=&quot;index&quot;>
    <a href='#A' data-type='A'>A</a>
    <a href='#B' data-type='B'>B</a>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!--导航列表--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"index"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"index"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">'#A'</span> <span class="hljs-attr">data-type</span>=<span class="hljs-string">'A'</span>&gt;</span>A<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">'#B'</span> <span class="hljs-attr">data-type</span>=<span class="hljs-string">'B'</span>&gt;</span>B<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>其次，实际项目中，我们需要用<code>js</code>来生成这些列表</p>
<p>假定我们要求的数据如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var data = [
        {
            'type':'A',
            'user':[
                {
                    name:'a1'
                },
                {
                    name:'a2'
                },
                {
                    name:'a3'
                },
                {
                    name:'a1'
                },
                {
                    name:'a2'
                },
                {
                    name:'a3'
                },
                {
                    name:'a3'
                },
                {
                    name:'a1'
                },
                {
                    name:'a2'
                },
                {
                    name:'a3'
                },
            ]
        },
        {
            'type':'B',
            'user':[
                {
                    name:'b1'
                },
                {
                    name:'b2'
                },
                {
                    name:'b3'
                },
                {
                    name:'b1'
                },
                {
                    name:'b2'
                },
                {
                    name:'b3'
                },
                {
                    name:'b3'
                },
                {
                    name:'b1'
                },
                {
                    name:'b2'
                },
                {
                    name:'b3'
                },
            ]
        },
        {
            'type':'C',
            'user':[
                {
                    name:'c1'
                },
                {
                    name:'c2'
                },
                {
                    name:'c3'
                },
                {
                    name:'c1'
                },
                {
                    name:'c2'
                },
                {
                    name:'c3'
                },
                {
                    name:'c3'
                },
                {
                    name:'c1'
                },
                {
                    name:'c2'
                },
                {
                    name:'c3'
                },
            ]
        },
        {
            'type':'D',
            'user':[
                {
                    name:'d1'
                },
                {
                    name:'d2'
                },
                {
                    name:'d3'
                },
                {
                    name:'d1'
                },
                {
                    name:'d2'
                },
                {
                    name:'d3'
                },
                {
                    name:'d3'
                },
                {
                    name:'d1'
                },
                {
                    name:'d2'
                },
                {
                    name:'d3'
                },
            ]
        },
        {
            'type':'E',
            'user':[
                {
                    name:'e1'
                },
                {
                    name:'e2'
                },
                {
                    name:'e3'
                },
                {
                    name:'e1'
                },
                {
                    name:'e2'
                },
                {
                    name:'e3'
                },
                {
                    name:'e3'
                },
                {
                    name:'e1'
                },
                {
                    name:'e2'
                },
                {
                    name:'e3'
                },
            ]
        }
    ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> data = [
        {
            <span class="hljs-string">'type'</span>:<span class="hljs-string">'A'</span>,
            <span class="hljs-string">'user'</span>:[
                {
                    <span class="hljs-attr">name</span>:<span class="hljs-string">'a1'</span>
                },
                {
                    <span class="hljs-attr">name</span>:<span class="hljs-string">'a2'</span>
                },
                {
                    <span class="hljs-attr">name</span>:<span class="hljs-string">'a3'</span>
                },
                {
                    <span class="hljs-attr">name</span>:<span class="hljs-string">'a1'</span>
                },
                {
                    <span class="hljs-attr">name</span>:<span class="hljs-string">'a2'</span>
                },
                {
                    <span class="hljs-attr">name</span>:<span class="hljs-string">'a3'</span>
                },
                {
                    <span class="hljs-attr">name</span>:<span class="hljs-string">'a3'</span>
                },
                {
                    <span class="hljs-attr">name</span>:<span class="hljs-string">'a1'</span>
                },
                {
                    <span class="hljs-attr">name</span>:<span class="hljs-string">'a2'</span>
                },
                {
                    <span class="hljs-attr">name</span>:<span class="hljs-string">'a3'</span>
                },
            ]
        },
        {
            <span class="hljs-string">'type'</span>:<span class="hljs-string">'B'</span>,
            <span class="hljs-string">'user'</span>:[
                {
                    <span class="hljs-attr">name</span>:<span class="hljs-string">'b1'</span>
                },
                {
                    <span class="hljs-attr">name</span>:<span class="hljs-string">'b2'</span>
                },
                {
                    <span class="hljs-attr">name</span>:<span class="hljs-string">'b3'</span>
                },
                {
                    <span class="hljs-attr">name</span>:<span class="hljs-string">'b1'</span>
                },
                {
                    <span class="hljs-attr">name</span>:<span class="hljs-string">'b2'</span>
                },
                {
                    <span class="hljs-attr">name</span>:<span class="hljs-string">'b3'</span>
                },
                {
                    <span class="hljs-attr">name</span>:<span class="hljs-string">'b3'</span>
                },
                {
                    <span class="hljs-attr">name</span>:<span class="hljs-string">'b1'</span>
                },
                {
                    <span class="hljs-attr">name</span>:<span class="hljs-string">'b2'</span>
                },
                {
                    <span class="hljs-attr">name</span>:<span class="hljs-string">'b3'</span>
                },
            ]
        },
        {
            <span class="hljs-string">'type'</span>:<span class="hljs-string">'C'</span>,
            <span class="hljs-string">'user'</span>:[
                {
                    <span class="hljs-attr">name</span>:<span class="hljs-string">'c1'</span>
                },
                {
                    <span class="hljs-attr">name</span>:<span class="hljs-string">'c2'</span>
                },
                {
                    <span class="hljs-attr">name</span>:<span class="hljs-string">'c3'</span>
                },
                {
                    <span class="hljs-attr">name</span>:<span class="hljs-string">'c1'</span>
                },
                {
                    <span class="hljs-attr">name</span>:<span class="hljs-string">'c2'</span>
                },
                {
                    <span class="hljs-attr">name</span>:<span class="hljs-string">'c3'</span>
                },
                {
                    <span class="hljs-attr">name</span>:<span class="hljs-string">'c3'</span>
                },
                {
                    <span class="hljs-attr">name</span>:<span class="hljs-string">'c1'</span>
                },
                {
                    <span class="hljs-attr">name</span>:<span class="hljs-string">'c2'</span>
                },
                {
                    <span class="hljs-attr">name</span>:<span class="hljs-string">'c3'</span>
                },
            ]
        },
        {
            <span class="hljs-string">'type'</span>:<span class="hljs-string">'D'</span>,
            <span class="hljs-string">'user'</span>:[
                {
                    <span class="hljs-attr">name</span>:<span class="hljs-string">'d1'</span>
                },
                {
                    <span class="hljs-attr">name</span>:<span class="hljs-string">'d2'</span>
                },
                {
                    <span class="hljs-attr">name</span>:<span class="hljs-string">'d3'</span>
                },
                {
                    <span class="hljs-attr">name</span>:<span class="hljs-string">'d1'</span>
                },
                {
                    <span class="hljs-attr">name</span>:<span class="hljs-string">'d2'</span>
                },
                {
                    <span class="hljs-attr">name</span>:<span class="hljs-string">'d3'</span>
                },
                {
                    <span class="hljs-attr">name</span>:<span class="hljs-string">'d3'</span>
                },
                {
                    <span class="hljs-attr">name</span>:<span class="hljs-string">'d1'</span>
                },
                {
                    <span class="hljs-attr">name</span>:<span class="hljs-string">'d2'</span>
                },
                {
                    <span class="hljs-attr">name</span>:<span class="hljs-string">'d3'</span>
                },
            ]
        },
        {
            <span class="hljs-string">'type'</span>:<span class="hljs-string">'E'</span>,
            <span class="hljs-string">'user'</span>:[
                {
                    <span class="hljs-attr">name</span>:<span class="hljs-string">'e1'</span>
                },
                {
                    <span class="hljs-attr">name</span>:<span class="hljs-string">'e2'</span>
                },
                {
                    <span class="hljs-attr">name</span>:<span class="hljs-string">'e3'</span>
                },
                {
                    <span class="hljs-attr">name</span>:<span class="hljs-string">'e1'</span>
                },
                {
                    <span class="hljs-attr">name</span>:<span class="hljs-string">'e2'</span>
                },
                {
                    <span class="hljs-attr">name</span>:<span class="hljs-string">'e3'</span>
                },
                {
                    <span class="hljs-attr">name</span>:<span class="hljs-string">'e3'</span>
                },
                {
                    <span class="hljs-attr">name</span>:<span class="hljs-string">'e1'</span>
                },
                {
                    <span class="hljs-attr">name</span>:<span class="hljs-string">'e2'</span>
                },
                {
                    <span class="hljs-attr">name</span>:<span class="hljs-string">'e3'</span>
                },
            ]
        }
    ]</code></pre>
<p>这种格式的数据可以要求后端返回，或者直接前端改造都行</p>
<p>然后对数据进行循环遍历即可</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var indexs = document.getElementById('index');
var contacts = document.getElementById('contacts');
var index_html = '';
var contacts_html = '';
data.forEach(el=>{
    contacts_html += '<dl><dt>'+el.type+'</dt><dt class=&quot;stikcy-fix&quot; id='+el.type+'></dt>';
    index_html += '<a href=&quot;#'+el.type+'&quot; data-type='+el.type+'>'+el.type+'</a>';
    el.user.forEach(d=>{
        contacts_html+='<dd>'+d.name+'</dd>';
    })
    contacts_html+='</dl>'
})
indexs.innerHTML = index_html;
contacts.innerHTML = contacts_html;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> indexs = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'index'</span>);
<span class="hljs-keyword">var</span> contacts = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'contacts'</span>);
<span class="hljs-keyword">var</span> index_html = <span class="hljs-string">''</span>;
<span class="hljs-keyword">var</span> contacts_html = <span class="hljs-string">''</span>;
data.forEach(<span class="hljs-function"><span class="hljs-params">el</span>=&gt;</span>{
    contacts_html += <span class="hljs-string">'&lt;dl&gt;&lt;dt&gt;'</span>+el.type+<span class="hljs-string">'&lt;/dt&gt;&lt;dt class="stikcy-fix" id='</span>+el.type+<span class="hljs-string">'&gt;&lt;/dt&gt;'</span>;
    index_html += <span class="hljs-string">'&lt;a href="#'</span>+el.type+<span class="hljs-string">'" data-type='</span>+el.type+<span class="hljs-string">'&gt;'</span>+el.type+<span class="hljs-string">'&lt;/a&gt;'</span>;
    el.user.forEach(<span class="hljs-function"><span class="hljs-params">d</span>=&gt;</span>{
        contacts_html+=<span class="hljs-string">'&lt;dd&gt;'</span>+d.name+<span class="hljs-string">'&lt;/dd&gt;'</span>;
    })
    contacts_html+=<span class="hljs-string">'&lt;/dl&gt;'</span>
})
indexs.innerHTML = index_html;
contacts.innerHTML = contacts_html;</code></pre>
<p><a href="https://codepen.io/xboxyan/pen/LgQYrX/" rel="nofollow noreferrer" target="_blank">https://codepen.io/xboxyan/pe...</a><button class="btn btn-xs btn-default ml10 preview" data-url="xboxyan/pen/LgQYrX/" data-typeid="3">点击预览</button></p>
<p><em>这部分<code>js</code>只是生成布局，没有任何功能上的逻辑</em></p>
<h2 id="articleHeader5">一些不足</h2>
<p>虽然通过锚点实现列表的快速定位，但是此时浏览器的地址栏会加上<code>#A</code>这样的标识，一不好看，二在使用浏览器默认的返回时会把这些标识全部走一遍，不太方便。</p>
<p>还有一个问题，在滚动列表的时候，没法做到右侧索引当前类别高亮显示，同时右侧索引也不支持滑动快速定位。</p>
<p>这些细节问题也只能通过<code>js</code>来修复了。</p>
<p>不过要是一个简单的小项目，没那么多要求的话，纯<code>css</code>还是能很好的适用的，性能上绝对要比通过<code>js</code>滚动监听强上好多倍，而且引用方便，只要数据生成了就可以直接使用^^</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
纯css实现手机通讯录

## 原文链接
[https://segmentfault.com/a/1190000016709368](https://segmentfault.com/a/1190000016709368)

