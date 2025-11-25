---
title: '【前端Talkking】CSS系列——CSS深入理解之absolute定位' 
date: 2018-12-02 2:30:15
hidden: true
slug: b9iruz8lq2u
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">1. 写在前面</h2>
<p>本篇将要介绍的绝对定位absolute属性和此前介绍的<a href="https://segmentfault.com/a/1190000014554601">CSS系列——CSS深入理解之float浮动</a>有着几分的相似性，可以认为两者是<strong>兄弟关系</strong>，都具有“包裹性”、“高度塌陷”、“块状化”的特性，它们在很多场合都可以互相替代。很多人可能有这样的疑问：一个属性名是“position”，一个属性名是“float”，从名字看起来，它们八竿子都打不着啊，怎么还是兄弟关系呢？要说<code>position: absolute</code>和<code>position: relative</code>是兄弟关系还能理解，要说和float是兄弟关系我就纳闷！！！呵呵~~~~，别急，这就是写作本文的目的。</p>
<h2 id="articleHeader1">2. absolute的特性</h2>
<p>在介绍absolute之前，有以下公共CSS代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* CSS代码 */
.father{
    border: 2px solid deeppink;
    width: 200px;
}
.son {
    position: absolute;
    font-size: 0;
    border: 2px solid blue;
    padding: 5px;
}
.father img {
    width: 128px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-comment">/* CSS代码 */</span>
<span class="hljs-selector-class">.father</span>{
    <span class="hljs-attribute">border</span>: <span class="hljs-number">2px</span> solid deeppink;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
}
<span class="hljs-selector-class">.son</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">2px</span> solid blue;
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">5px</span>;
}
<span class="hljs-selector-class">.father</span> <span class="hljs-selector-tag">img</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">128px</span>;
}</code></pre>
<h3 id="articleHeader2">2.1 包裹性</h3>
<p>然后有以下html代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;father&quot;>
    <!--son1与son的唯一区别是son1的position设置为static-->
    <div class=&quot;son1&quot;>
        <img src=&quot;../../lib/img/mm1.png&quot;>
    </div>
</div>
<br/>
<br/>

<div class=&quot;father&quot;>
    <div class=&quot;son&quot;>
        <img src=&quot;../../lib/img/mm1.png&quot;>
    </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"father"</span>&gt;</span>
    <span class="hljs-comment">&lt;!--son1与son的唯一区别是son1的position设置为static--&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"son1"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../../lib/img/mm1.png"</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">br</span>/&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">br</span>/&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"father"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"son"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../../lib/img/mm1.png"</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>最终显示的效果如下图所示：</p>
<p><span class="img-wrap"><img data-src="https://ws1.sinaimg.cn/large/006tKfTcgy1fr08nfn7q1j305x06d74i.jpg" src="https://static.alili.techhttps://ws1.sinaimg.cn/large/006tKfTcgy1fr08nfn7q1j305x06d74i.jpg" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>在本例中，<strong>son1与son的唯一区别是son1的position设置为static</strong>。 <code>.father元素的宽度设置为200px</code>，<code>img</code>元素是一个128px宽度的图片，则此时绝对定位元素宽度表现为"包裹性"，其宽度也就是里面图片的宽度128px。</p>
<p>由于绝对定位元素宽度表现为"包裹性"，因此，下面的CSS写法就是多余的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".wrap{
    display: inline-block;// 没有必要
    position: absolute;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.wrap</span>{
    <span class="hljs-attribute">display</span>: inline-block;// 没有必要
    <span class="hljs-attribute">position</span>: absolute;
}</code></pre>
<h3 id="articleHeader3">2.2 高度塌陷</h3>
<p>基于上图，父元素div的高度并没有被子元素撑开(粉色区域)，这种效果可以称为"<strong>高度塌陷</strong>"。导致高度塌陷的原因是因为浮动元素脱离了正常的文档流，则<code>div.father</code>认为其没有子元素，所以产生了高度塌陷。</p>
<p>如果在<code>.father</code>元素增加子元素，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!--HTML代码-->
<div class=&quot;father&quot;>
    <div class=&quot;son&quot;>
        <img src=&quot;../../lib/img/mm1.png&quot;>
    </div>
    美女1，美女2，美女3，美女4，美女5
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!--HTML代码--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"father"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"son"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../../lib/img/mm1.png"</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    美女1，美女2，美女3，美女4，美女5
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>则在浏览器中的效果如下：</p>
<p><span class="img-wrap"><img data-src="https://ws1.sinaimg.cn/large/006tKfTcgy1fqw6uuzmhzj30d405y75q.jpg" src="https://static.alili.techhttps://ws1.sinaimg.cn/large/006tKfTcgy1fqw6uuzmhzj30d405y75q.jpg" alt="" title="" style="cursor: pointer;"></span></p>
<p>从图中明显看出文字被图片遮盖了，这一点和float不同。因为，float元素本身仍处于文档流中，文字会环绕着float元素，不会被遮蔽，而设置了absolute的图片元素出现了层级关系，已经脱离了正常的文档流了，从父元素的视点看，图片已经完全消失不见了，因此从最左边开始显示文字，而absolute的层级高，所以图片遮盖了文字。</p>
<h3 id="articleHeader4">2.3 块状化</h3>
<p>块状化的意思是，一旦元素position的属性为<code>absolute</code>或者<code>fixed</code>，则其display计算值就是block或者table。可以复制以下代码到浏览器控制台中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var span = document.createElement('span')
document.body.appendChild(span)
console.log('1.' + window.getComputedStyle(span).display)
// 设置元素绝对定位
span.style.position = 'absolute'
console.log('2.' + window.getComputedStyle(span).display)
document.getElementById(&quot;aa&quot;).style.display = &quot;block&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> span = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'span'</span>)
<span class="hljs-built_in">document</span>.body.appendChild(span)
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'1.'</span> + <span class="hljs-built_in">window</span>.getComputedStyle(span).display)
<span class="hljs-comment">// 设置元素绝对定位</span>
span.style.position = <span class="hljs-string">'absolute'</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'2.'</span> + <span class="hljs-built_in">window</span>.getComputedStyle(span).display)
<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"aa"</span>).style.display = <span class="hljs-string">"block"</span></code></pre>
<p>则在浏览器控制台中的结果如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.inline
2.block" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">1.inline
2.block</code></pre>
<h3 id="articleHeader5">2.4 小结</h3>
<p>对于上面对absolute的介绍，对比float属性，是不是应该理解他们是兄弟关系呢？如果你非得不这样认为可以，只要你明白absolute的特性即可。绝大多数前端开发人员应该都懂，但是如果本文只是介绍上面的知识点，就太对不起大家的期待了！下面将要介绍absolute的流体与相对特性才是本文的重点。</p>
<h2 id="articleHeader6">3. absolute流体与相对特性</h2>
<h3 id="articleHeader7">3.1 absolute的相对特性</h3>
<p>在介绍absolute的相对特性之前，先抛出以下问题： <strong>如果一个元素的定位属性设置成了：<code>position: absolute</code>后，没有设置<code>left/top/right/bottom</code>，并且其祖先元素全部都是非定位元素，请问它将在哪里显示？</strong></p>
<p>包括我自己，在深入了解absolute的特性之前，认为该元素是在浏览器窗口的左上方显示，其实这是对absolute绝对定位属性错误的认识。因此，很多人在使用absolute定位属性的时候，必定先要设置父元素<code>position: relative</code>，同时设置绝对定位元素的<code>left/top/right/bottom</code>，甚至还要设置绝对定位元素层级<code>z-index</code>，<strong>实际上，该元素还是在当前的位置</strong>。我们拿下面的这个例子验证：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" <!--HTML代码-->
<div class=&quot;father&quot;>
    <div class=&quot;pa box&quot;></div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"> <span class="hljs-comment">&lt;!--HTML代码--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"father"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"pa box"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* CSS代码 */
.father{
    border: 2px solid deeppink;
    width: 100px;
    height: 100px;
}
.pa{
    position: absolute;
}
.box{
    background-color: #cdcdcd;
    width: 50px;
    height: 50px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-comment">/* CSS代码 */</span>
<span class="hljs-selector-class">.father</span>{
    <span class="hljs-attribute">border</span>: <span class="hljs-number">2px</span> solid deeppink;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
}
<span class="hljs-selector-class">.pa</span>{
    <span class="hljs-attribute">position</span>: absolute;
}
<span class="hljs-selector-class">.box</span>{
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#cdcdcd</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">50px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">50px</span>;
}</code></pre>
<p>如下图所示，<code>.box</code>元素还是在当前的位置显示，而不是在浏览器窗口的左上方显示：</p>
<p><span class="img-wrap"><img data-src="https://ws2.sinaimg.cn/large/006tKfTcgy1fqw5dwkpkyj306d06g74a.jpg" src="https://static.alili.techhttps://ws2.sinaimg.cn/large/006tKfTcgy1fqw5dwkpkyj306d06g74a.jpg" alt="" title="" style="cursor: pointer;"></span></p>
<p>在京东商城首页，有这样的一个效果：</p>
<p><span class="img-wrap"><img data-src="https://ws1.sinaimg.cn/large/006tKfTcgy1fqx90dlppqj30xq0gc77i.jpg" src="https://static.alili.techhttps://ws1.sinaimg.cn/large/006tKfTcgy1fqx90dlppqj30xq0gc77i.jpg" alt="image-20180502200432543" title="image-20180502200432543" style="cursor: pointer;"></span></p>
<p>然后我们打开调试窗口，查看html和css代码如下：</p>
<p><span class="img-wrap"><img data-src="https://ws1.sinaimg.cn/large/006tKfTcgy1fqx931229uj31kw06nq8j.jpg" src="https://static.alili.techhttps://ws1.sinaimg.cn/large/006tKfTcgy1fqx931229uj31kw06nq8j.jpg" alt="image-20180502200712645" title="image-20180502200712645" style="cursor: pointer;"></span></p>
<p>这里css代码中的<code>top:0;left:0</code>完全是多余的代码，可以省略不写。因为，不设置<code>left/top/right/bottom</code>的绝对定位元素还是在当前的位置，只是脱离了正常的文档流了。</p>
<p><strong>实际上，absolute是一个相对比较独立的CSS属性，它的样式和行为表现不依赖其他的CSS属性就可以完成</strong>。因此，<strong>如果元素设置了定位属性为absolute绝对定位，并且没有设置<code>left/top/right/bottom</code>，那么可以将这种定位属性称为“无依赖绝对定位”，其本质就是"相对定位"，特点仅仅是脱离文档流，不占据任何CSS流的尺寸空间了。</strong></p>
<p>无依赖绝对定位在实际开发中非常有用，下面举几个比较常用的例子。</p>
<p><strong>1）各类图标定位</strong></p>
<p>我们以慕课网首页上的课程列表举例：</p>
<p><span class="img-wrap"><img data-src="https://ws2.sinaimg.cn/large/006tKfTcgy1fqxaizcv41j306m03sweq.jpg" src="https://static.alili.techhttps://ws2.sinaimg.cn/large/006tKfTcgy1fqxaizcv41j306m03sweq.jpg" alt="WX20180502-205632@2x" title="WX20180502-205632@2x" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div>
    <div class=&quot;box&quot;></div>
    <i>Hot</i>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"box"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">i</span>&gt;</span>Hot<span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>核心CSS代码如下所示：</p>
<p><span class="img-wrap"><img data-src="https://ws4.sinaimg.cn/large/006tKfTcgy1fqxakc8gi1j30a005lwf7.jpg" src="https://static.alili.techhttps://ws4.sinaimg.cn/large/006tKfTcgy1fqxakc8gi1j30a005lwf7.jpg" alt="WX20180502-205758@2x" title="WX20180502-205758@2x" style="cursor: pointer; display: inline;"></span></p>
<p>完全不需要借助<code>top/right/bottom/left</code>和<code>position: relative</code>的帮助就可以搞定小图标的布局啦。相比使用<code>position:relative</code>和<code>right/top</code>的布局方式，这种布局方式的优点是：</p>
<ul>
<li>维护成本低。如果后面想删除这个图片，只需要将图标对应的html和css代码删除掉就可以了，不会影响其他的元素</li>
<li>健壮性高。如果图片变大或者文字变长，我们不需要修改小图标的css代码，仍然定位效果良好。</li>
</ul>
<p>再举一个在实际开发中用的比较多的一个例子，如下图所示，在一段文字的前面有一个图标：</p>
<p><span class="img-wrap"><img data-src="https://ws2.sinaimg.cn/large/006tKfTcgy1fr08ik3eb4j303u00qwef.jpg" src="https://static.alili.techhttps://ws2.sinaimg.cn/large/006tKfTcgy1fr08ik3eb4j303u00qwef.jpg" alt="" title="" style="cursor: pointer;"></span></p>
<p>这种布局方式同样可以借助无依赖定位的实现，并且代码简单高效，代码如下所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;email-wrapper&quot;>
    <i class=&quot;icon-email&quot;></i>
    <span class=&quot;icon-msg&quot;>请输入您的邮箱:</span>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"email-wrapper"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"icon-email"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"icon-msg"</span>&gt;</span>请输入您的邮箱:<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".email-wrapper{
    display: inline-block;
    height: 20px;
    padding-left: 20px;
    /*font-size: 0;*/
}
.icon-email{
    position: absolute;
    margin-left: -20px;
    width: 20px;
    height: 20px;
    background: url(&quot;../../lib/img/email.png&quot;) center center no-repeat;
    background-size: contain;
}
.icon-msg{
    display: inline-block;
    line-height: 20px;
    vertical-align: top;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.email-wrapper</span>{
    <span class="hljs-attribute">display</span>: inline-block;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">20px</span>;
    <span class="hljs-attribute">padding-left</span>: <span class="hljs-number">20px</span>;
    <span class="hljs-comment">/*font-size: 0;*/</span>
}
<span class="hljs-selector-class">.icon-email</span>{
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">margin-left</span>: -<span class="hljs-number">20px</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">20px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">20px</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-built_in">url</span>(<span class="hljs-string">"../../lib/img/email.png"</span>) center center no-repeat;
    <span class="hljs-attribute">background-size</span>: contain;
}
<span class="hljs-selector-class">.icon-msg</span>{
    <span class="hljs-attribute">display</span>: inline-block;
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">20px</span>;
    <span class="hljs-attribute">vertical-align</span>: top;
}</code></pre>
<p><strong>2）校验提示错误</strong></p>
<p>在实际开发中，我们有很多表单校验，当校验不通过的时候，会有一些错误提示给用户，如下图所示：</p>
<p><span class="img-wrap"><img data-src="https://ws4.sinaimg.cn/large/006tKfTcgy1fr08s0sjxrj30ey06ht93.jpg" src="https://static.alili.techhttps://ws4.sinaimg.cn/large/006tKfTcgy1fr08s0sjxrj30ey06ht93.jpg" alt="" title="" style="cursor: pointer;"></span></p>
<p>通常，错误提示可以放到input框的下面，但是当出现错误提示的时候，下面的内容会整体下移，当错误提示消失的时候，下面的内容又会整体上移，用户体验不好。还有一种做法是放到input框的右侧显示，但是在默认状态下部容器设置了水平居中， 宽度不大，如果再出现错误提示信息，就会出现容器的宽度不够的问题。此时，我们同样可以借助："无依赖定位"，直接给错误提示信息增加一个CSS类，如下所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".msg-error{
    position: absolute;
    margin-left: 10px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.msg-error</span>{
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">margin-left</span>: <span class="hljs-number">10px</span>;
}</code></pre>
<p>无论将input框的宽度变大或者变小，提示信息都会跟着input框。相比使用<code>position:relative</code>和<code>right/top</code>的布局方式，这种方法代码量更少、容错性更高、维护成本更低。</p>
<p>关于无依赖绝对定位的应用还有很多，这里就不一一介绍了，有兴趣的同学可以参看张鑫旭老师的《CSS世界》。</p>
<h3 id="articleHeader8">3.2 absolute的流体特性</h3>
<p>只有absolute遇到<code>left/top/right/bottom</code>属性的时候，absolute元素才真正变成绝对定位元素。如果用户给absolute至少指定了<code>left/right</code>中的一个，则水平方向的相对特性丢失，垂直方向上继续保持相对特性；如果用户给absolute至少指定了<code>top/bottom</code>中的一个，则保持水平方向上的相对特性，垂直方向上的相对特性丢失。例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class='box'></div>
.box{
    position: absolute;
    right: 0;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css">&lt;<span class="hljs-selector-tag">div</span> <span class="hljs-selector-tag">class</span>='<span class="hljs-selector-tag">box</span>'&gt;&lt;/<span class="hljs-selector-tag">div</span>&gt;
<span class="hljs-selector-class">.box</span>{
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>;
}</code></pre>
<p>此时，元素水平方向相对特性丢失，具有了绝对定位特性，而垂直方向的定位依然保持了相对特性。</p>
<p>以上面的这个例子举例，当只有left或者right属性的时候，由于包裹性，此时div的宽度是0。但是，如果同时设置<code>left:0;right:0</code>的时候，宽度表现为"格式化宽度"，宽度自适应于<code>.box</code>包含快的content-box，换句话说，如果包含快的conent-box宽度发生变化，则<code>.box</code>的宽度也会跟着一起变。举个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class='box'></div>
.box{
    position: absolute;
    right: 0;
    left: 0;
    top: 0;
    bottom: 0;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css">&lt;<span class="hljs-selector-tag">div</span> <span class="hljs-selector-tag">class</span>='<span class="hljs-selector-tag">box</span>'&gt;&lt;/<span class="hljs-selector-tag">div</span>&gt;
<span class="hljs-selector-class">.box</span>{
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>;
}</code></pre>
<p>如果<code>.box</code>的包含块是根元素，则上面的代码可以让.box元素正好完全覆盖浏览器的可视窗口，同时，如果改变浏览器窗口的大小，<code>.box</code>的大小会随着浏览器的大小自动变化。因此，对于设置了对立定位属性的绝对定位属性，无论设置padding还是margin，其占据的空间一直不变，变化的就是content-box，这就是典型的<strong>流体表现特性</strong>。流体特性的具体用法在后面会介绍到。</p>
<h2 id="articleHeader9">4. absolute与其他属性</h2>
<p>CSS中的很多属性需要和其他的属性一起使用的时候会发生意向不到的效果。下面将介绍absolute与其他CSS一起使用产生的效果。</p>
<h3 id="articleHeader10">4.1 absolute与text-align</h3>
<p>利用<code>text-align</code>可以控制绝对定位元素的位置，实现主窗口右侧的"返回顶部"以及"反馈"等布局的效果。效果图如下：</p>
<p><span class="img-wrap"><img data-src="https://ws1.sinaimg.cn/large/006tKfTcgy1fqxanctvffj306w08nweb.jpg" src="https://static.alili.techhttps://ws1.sinaimg.cn/large/006tKfTcgy1fqxanctvffj306w08nweb.jpg" alt="WX20180502-210045@2x" title="WX20180502-210045@2x" style="cursor: pointer;"></span></p>
<p>核心代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!--HTML代码-->
<div class=&quot;alignright&quot;>
    <span class=&quot;follow&quot;>
        <img src=&quot;../../lib/img/message.png&quot;>
        <img src=&quot;../../lib/img/top.png&quot;>
    </span>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!--HTML代码--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"alignright"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"follow"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../../lib/img/message.png"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../../lib/img/top.png"</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* CSS代码 */
.alignright{
    overflow: hidden;
    text-align: right;
}
.alignright:before{
    content: &quot;\2002&quot;
}
.follow{
    position: fixed;
    bottom: 100px;
    z-index: 1;
}
.follow img{
    display: block;
    margin: 10px;
    width: 20px;
    height: 20px;
    background-size: contain;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-comment">/* CSS代码 */</span>
<span class="hljs-selector-class">.alignright</span>{
    <span class="hljs-attribute">overflow</span>: hidden;
    <span class="hljs-attribute">text-align</span>: right;
}
<span class="hljs-selector-class">.alignright</span><span class="hljs-selector-pseudo">:before</span>{
    <span class="hljs-attribute">content</span>: <span class="hljs-string">"\2002"</span>
}
<span class="hljs-selector-class">.follow</span>{
    <span class="hljs-attribute">position</span>: fixed;
    <span class="hljs-attribute">bottom</span>: <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">z-index</span>: <span class="hljs-number">1</span>;
}
<span class="hljs-selector-class">.follow</span> <span class="hljs-selector-tag">img</span>{
    <span class="hljs-attribute">display</span>: block;
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">10px</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">20px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">20px</span>;
    <span class="hljs-attribute">background-size</span>: contain;
}</code></pre>
<p>在本例中，利用:before伪元素，在其前面插入一个空格（2002）,然后设置<code>text-aligin: right</code>，则空格对齐主结构的右侧边缘，后面的固定定位元素（同绝对定位元素）由于"无依赖定位"特性，左边缘正好就是主结构的右边缘，自然就跑到主结构的外面显示了。这种布局在实际开发中用处非常大，比如说下图中某宝的楼层导航效果都可以使用这种方式实现。</p>
<p><span class="img-wrap"><img data-src="https://ws1.sinaimg.cn/large/006tKfTcgy1fr09wpql6mj31kw0okk87.jpg" src="https://static.alili.techhttps://ws1.sinaimg.cn/large/006tKfTcgy1fr09wpql6mj31kw0okk87.jpg" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader11">4.2 absolute与clip</h3>
<p>在实际开发过程中，很多时候我们为了更好的SEO和无障碍识别，都会将页面中的一些元素隐藏，例如隐藏下面代码中的<code>本网站名字</code>这几个字：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* CSS代码 */
<a href=&quot;#&quot; class=&quot;logo&quot;>
    <h1>本网站名字</h1>
</a>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-comment">/* CSS代码 */</span>
&lt;<span class="hljs-selector-tag">a</span> <span class="hljs-selector-tag">href</span>="#" <span class="hljs-selector-tag">class</span>="<span class="hljs-selector-tag">logo</span>"&gt;
    &lt;<span class="hljs-selector-tag">h1</span>&gt;本网站名字&lt;/<span class="hljs-selector-tag">h1</span>&gt;
&lt;/<span class="hljs-selector-tag">a</span>&gt;</code></pre>
<p>为了隐藏上面的文字，有以下几种方案可以供我们选择：</p>
<ul>
<li>使用<code>display:none</code>或者<code>visibility:hidden</code>。缺点：屏幕阅读设备会忽略这些文字；</li>
<li>使用<code>text-align</code>缩进。缺点：如果缩进过大到屏幕之外，屏幕阅读设备也是不会读取的；</li>
<li>使用<code>color: transparent</code>。原生IE8浏览器器并不支持，并且还是能够选中文本。</li>
</ul>
<p>借助absolute和clip（关于clip用法不熟悉的同学可以自己百度下，很简单，注：clip只对绝对定位和固定定位的元素生效）这两个属性，能够同时满足视觉上隐藏和屏幕阅读设备能够读取的要求，核心代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* CSS代码 */
h1{
    position: absolute;
    clip: rect(0 0 0 0);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-comment">/* CSS代码 */</span>
<span class="hljs-selector-tag">h1</span>{
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">clip</span>: <span class="hljs-built_in">rect</span>(0 0 0 0);
}</code></pre>
<h3 id="articleHeader12">4.3 absolute之margin:auto居中</h3>
<p>在实际工作开发中，可能我们用的最多的是下面的方式来实现元素的水平垂直居中效果，核心代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* CSS代码 */
.box{
    width: 20px;
    height: 20px;
    position: absolute;
    left: 50%;
    right: 50%;
    margin-left: -10px;
    margin-right: -10px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-comment">/* CSS代码 */</span>
<span class="hljs-selector-class">.box</span>{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">20px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">20px</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">right</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">margin-left</span>: -<span class="hljs-number">10px</span>;
    <span class="hljs-attribute">margin-right</span>: -<span class="hljs-number">10px</span>;
}</code></pre>
<p>此方法有一个不足之处就是需要提前知道元素的尺寸，否则无法控制margin负值的大小。</p>
<p>如果不知道元素的尺寸，可以使用<code>transform: translate(-50%, -50%)</code>代替margin负值，然而这种方法存在一定的兼容性问题，IE9(-ms-), IE10+以及其他现代浏览器才支持，在一定的场景下会导致微信闪退的问题。</p>
<p>在介绍下另外一种方法前，我们首先熟悉下<code>margin: auto</code>的填充规则：</p>
<ul>
<li>如果一侧定值，一侧auto，则auto为剩余空间大小；</li>
<li>如果两侧都是auto，则平分剩余空间。</li>
</ul>
<p>因此，利用绝对定位absolute元素的流体特性和margin: auto的自动分配特性能够实现水平垂直居中的效果，核心代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* CSS代码 */
.box{
    width: 20px;
    height: 20px;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-comment">/* CSS代码 */</span>
<span class="hljs-selector-class">.box</span>{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">20px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">20px</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">margin</span>: auto;
}</code></pre>
<p>显示效果如下：</p>
<p><span class="img-wrap"><img data-src="https://ws2.sinaimg.cn/large/006tKfTcgy1fqxbcibhu2j30n20e674q.jpg" src="https://static.alili.techhttps://ws2.sinaimg.cn/large/006tKfTcgy1fqxbcibhu2j30n20e674q.jpg" alt="WX20180502-212501@2x" title="WX20180502-212501@2x" style="cursor: pointer; display: inline;"></span></p>
<p>这种方法兼用性好，并且需要提前知道元素的尺寸，减少了依赖，后期维护改动的地方少，何乐而不为呢？</p>
<h2 id="articleHeader13">5. 结语</h2>
<p>关于absolute的介绍就到这里了，平时我们应该多思考，多总结，才会有新的体会。计划下一篇文章介绍<strong>relative定位</strong>，最新文章都会第一时间更新在我的公众号&lt;<strong>前端Talkking</strong>&gt;里面，欢迎关注。</p>
<p>以上就是本文的全部内容，感谢阅读，如果有表述不正确的地方，欢迎留言指正！</p>
<h2 id="articleHeader14">6.参考</h2>
<ul><li>张鑫旭 《CSS世界》</li></ul>
<hr>
<p>遇见了，不妨关注下我的微信公众号「前端Talkking」</p>
<p><span class="img-wrap"><img data-src="/img/bV9did" src="https://static.alili.tech/img/bV9did" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【前端Talkking】CSS系列——CSS深入理解之absolute定位

## 原文链接
[https://segmentfault.com/a/1190000014736711](https://segmentfault.com/a/1190000014736711)

