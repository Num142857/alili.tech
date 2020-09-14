---
title: '【前端Talkking】CSS系列——CSS深入理解之float浮动' 
date: 2018-12-04 2:30:05
hidden: true
slug: yi3xe1hns9b
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>float属性是CSS中常用的一个属性，在实际工作中使用的非常多，如果使用不当就会出现意料之外的效果。虽然很多人说浮动会用就行、浮动过时了，但是对于优秀的前端开发人员，需要有"刨根问底"的精神，这样在出现一些问题的时候才不至于"手慌脚乱"！因此，今天就特别整理和总结一下float属性。</blockquote>
<h2>1. float介绍</h2>
<p>CSS世界中的float属性是一个年代非常久远的属性，设置了float属性的元素会根据设置的属性值向左或者向右浮动，直到它的外边缘碰到包含框或另一个浮动框的边框为止。设置了float属性的元素会从普通文档流中脱离，相当于不占据任何空间，所以文档中普通流中的元素表现的就像浮动元素不存在一样，因此，设置float属性的后会影响我们的页面布局。具体说来就是：<strong>让block元素无视float元素，让inline元素像流水一样围绕着float元素实现浮动布局</strong>。</p>
<p>float属性设计的初衷：<code>仅仅是让文字像流水一样环绕浮动元素</code>，就像下图中展示的一样：</p>
<p><span class="img-wrap"><img data-src="/img/bV9c9U?w=420&amp;h=168" src="https://static.alili.tech/img/bV9c9U?w=420&amp;h=168" alt="图片描述" title="图片描述"></span></p>
<h2>2. float的特性</h2>
<p>float有哪些有意思的特性呢？具体如下：</p>
<ul>
<li>包裹性</li>
<li>高度塌陷</li>
<li>块状化</li>
<li>没有任何margin合并</li>
</ul>
<p>下面将详细阐述这几点的含义。</p>
<h3>2.1 包裹性</h3>
<p>所谓"包裹性"，其实是由"包裹"和"自适应"两部分组成。假设有以下CSS代码：</p>
<pre><code class="css">/* CSS代码 */
.father{
    border: 1px solid deeppink;
    width: 200px;
}
.son {
    float: left;
    font-size: 0;
    border: 1px solid blue;
    padding: 5px;
}
.father img {
    width: 128px;
}</code></pre>
<p>1）<strong>包裹</strong>。本例中将浮动元素父元素宽度设置为200px，浮动元素的子元素是一个128px宽度的图片，则此时浮动元素宽度表现为"包裹"，也就是里面图片的宽度128px。</p>
<pre><code class="html">/* HTML代码 */
&lt;div class="father"&gt;
    &lt;div class="son"&gt;
        &lt;img src="../../lib/img/mm1.png"&gt;
    &lt;/div&gt;
&lt;/div&gt;</code></pre>
<p><span class="img-wrap"><img data-src="/img/bV9c92?w=430&amp;h=196" src="https://static.alili.tech/img/bV9c92?w=430&amp;h=196" alt="图片描述" title="图片描述"></span></p>
<p>2）<strong>自适应性</strong>。在浮动子元素的中增加一些文字：</p>
<pre><code class="html">/* HTML代码 */
&lt;div class="father"&gt;
    &lt;div class="son"&gt;
        &lt;img src="../../lib/img/mm1.png"&gt;
        &lt;span style="font-size: 12px"&gt;美女1，美女2，美女3，美女4，美女5，美女6，后宫1，后宫2，后宫3，后宫&lt;/span&gt;
    &lt;/div&gt;
&lt;/div&gt;</code></pre>
<p>此时，浮动元素宽度就自适应父元素的200px宽度，最终的宽度表现也是200px。如下图所示：</p>
<p><span class="img-wrap"><img data-src="/img/bV9dfi?w=432&amp;h=266" src="https://static.alili.tech/img/bV9dfi?w=432&amp;h=266" alt="图片描述" title="图片描述"></span></p>
<h3>2.2 高度塌陷</h3>
<p>float属性有一个著名的特性：<strong>会让父元素的高度塌陷</strong>。如章节2.1中的效果图，父元素div的高度并没有被子元素撑开(粉色区域)，这种效果可以称为"<strong>高度塌陷</strong>"。float给<code>div.son</code>施了个障眼法，让该元素的高度塌陷为0了，这样外层div计算高度时，认为<code>div.son</code>的高度为0，相当于<code>div.son</code>的content的高度为0，则<code>div.father</code>认为其没有子元素，所以产生了高度塌陷。后文中将讲述如何解决高度塌陷的问题。</p>
<h3>2.3 块状化</h3>
<p>块状化的意思是，一旦元素float的属性不为none，则其display计算值就是block或者table。举个例子：</p>
<pre><code class="javascript">/* JavaScript代码 */
var span = document.createElement('span')
document.body.appendChild(span)
console.log('1.' + window.getComputedStyle(span).display)
// 设置元素左浮动
span.style.cssFloat = 'left'
console.log('2.' + window.getComputedStyle(span).display)</code></pre>
<p>在控制台中的结果如下：</p>
<pre><code class="html">1.inline
2.block</code></pre>
<p>不知道大家有没有跟我一样的疑问：既然设置float后，元素就块状化了，那么怎么还能产生包裹性的效果呢？回答这个问题，需要重新阐述下块状化的意思，这里的块状化意思是可以像block元素一样设置宽和高，并不是真正的块元素。</p>
<p>因此，没有任何理由出现下面的样式组合：</p>
<pre><code class="css">span{
    display: block; /* 多余 */
    float: left;
}
span{
    float: left;
    vertical-align: middle; /* 多余 */
}</code></pre>
<h3>2.4 没有任何的margin重叠</h3>
<p>在这里，我们将<code>.son</code>类增加<code>margin:10px</code>样式，在浏览器中查看实际效果。</p>
<pre><code class="html">/* HTML 代码 */
&lt;div class="father"&gt;
    &lt;div class="son"&gt;
        &lt;img src="../../lib/img/mm1.png"&gt;
    &lt;/div&gt;
    &lt;div class="son"&gt;
        &lt;img src="../../lib/img/mm1.png"&gt;
    &lt;/div&gt;
    &lt;div class="son"&gt;
        &lt;img src="../../lib/img/mm1.png"&gt;
    &lt;/div&gt;
&lt;/div&gt;</code></pre>
<p><span class="img-wrap"><img data-src="/img/bV9dfv?w=310&amp;h=618" src="https://static.alili.tech/img/bV9dfv?w=310&amp;h=618" alt="图片描述" title="图片描述"></span></p>
<p>我们增加<code>.son</code>类的margin为10px，在浏览器中查看相邻的<code>.son</code>元素的空白区域的高度是20px，可以发现设置了float属性的元素没有任何的margin重叠，这和普通的元素margin重叠不一样。</p>
<h2>3. float与流体布局</h2>
<p>使用float可以通过破坏正常的文档流实现CSS环绕，但是却带来了"高度塌陷"的问题！然而我们可以利用float破坏正常文档流的特性实现一些常用的布局：</p>
<ul><li>
<strong>文字环绕变身</strong>-中间内容居中，左中右布局</li></ul>
<p>直接看例子：</p>
<pre><code class="html">&lt;div class="box"&gt;
    &lt;a href="javascript:;" class="fl"&gt;左青龙&lt;/a&gt;
    &lt;a href="javascript:;" class="fr"&gt;右白虎&lt;/a&gt;
    &lt;h3 class="text-center"&gt;标题&lt;/h3&gt;
&lt;/div&gt;</code></pre>
<pre><code class="css">.box{
    background-color: #f5f5f5;
}
.fl{
    float: left;
}
.fr{
    float: right;
}
.text-center{
    text-align: center;
}</code></pre>
<p>从下图中看出，实现了中间内容居中的左中右布局。</p>
<p><span class="img-wrap"><img data-src="/img/bV9dfz?w=1198&amp;h=76" src="https://static.alili.tech/img/bV9dfz?w=1198&amp;h=76" alt="图片描述" title="图片描述"></span></p>
<ul><li><strong>文字环绕的衍生-单侧固定</strong></li></ul>
<pre><code class="html">&lt;div class="father"&gt;
    &lt;img src="../../lib/img/008.JPG"&gt;
    &lt;p class="girl"&gt;美女1，美女2，美女3，美女4，美女5，美女6，后宫1，后宫2，后宫3，后宫4，后宫5，后宫6&lt;/p&gt;
&lt;/div&gt;</code></pre>
<pre><code class="css">.father{
    border: 1px solid #444;
    overflow: hidden;
}
.father &gt; img {
    width: 60px; height: 64px;
    float: left;
}
.girl {
    /* 环绕和自适应的区别所在 */
    margin-left: 70px;
}</code></pre>
<p>和文字环绕效果相比，区别就是<code>.girl</code>多了一个<code>margin-left: 70px</code>，同时图片的宽度设置60px，因此不会发生文字环绕的效果。这里，我们也可以不使用<code>margin-left</code>，改用<code>border-left</code>或者<code>padding-left</code>都可以达到改变content box的尺寸，从而实现宽度自适应布局效果。</p>
<p><span class="img-wrap"><img data-src="/img/bV9dfF?w=1024&amp;h=158" src="https://static.alili.tech/img/bV9dfF?w=1024&amp;h=158" alt="图片描述" title="图片描述"></span></p>
<h2>4. float的克星</h2>
<p>既然使用float属性会带来一系列的问题，那么有没有办法消除这些问题呢？答案是：肯定有。接着看下文。</p>
<h3>4.1 clear属性</h3>
<p>在CSS中可以使用clear来清除float属性带来高度塌陷等问题，使用格式如下：</p>
<pre><code class="html">clear: none | left | right | both</code></pre>
<ul>
<li>none：默认值，允许两边都有浮动对象；</li>
<li>left：不允许左侧有浮动对象；</li>
<li>right：不允许右侧有浮动对象；</li>
<li>both：两侧不允许有浮动对象。</li>
</ul>
<p>如果单从字面上的意思来理解，<code>clear:left</code>应该是"<strong>清除左浮动</strong>"，<code>clear:right</code>应该是"<strong>清除右浮动</strong>"，实际上，这种说法是有问题的，<strong>因为浮动一直还在，并没有清除！只能清除浮动带来的影响。</strong></p>
<p>官方对clear属性的解释是：<strong>"元素盒子的边不能和前面的浮动元素相邻"</strong>。注意这里的"前面的"3个字，也就是clear属性对"后面的"浮动元素是不闻不问的。clear属性只能清除元素的自身，不能影响其他的元素。接着看下面的这个例子：</p>
<pre><code class="html">/* HTML代码 */
&lt;div class="box1"&gt;&lt;/div&gt;
&lt;div class="box2"&gt;&lt;/div&gt;</code></pre>
<pre><code class="css">/* CSS代码 */
.box1 {
    float: left;
    width: 100px;
    height: 60px;
    padding: 10px;
    border: 3px solid black;
    background: url("../../lib/img/mm1.png") center no-repeat;
}
.box2 {
    border: 3px solid red;
    padding:10px;
    width:100px;
    height: 60px;
    background: url("../../lib/img/mm2.jpg") center no-repeat;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/bV9dgj?w=137&amp;h=100" src="https://static.alili.tech/img/bV9dgj?w=137&amp;h=100" alt="图片描述" title="图片描述"></span></p>
<p>如上图所示，box1元素为设置了左浮动，已经脱离了正常的文档流，所以box2能够在box1的底层显示。如果想让box2能够换行排列，则只需要在<code>.box2</code>类中增加<code>clear:left</code>样式即可。如下图所示：</p>
<p><span class="img-wrap"><img data-src="/img/bV9dgr?w=154&amp;h=200" src="https://static.alili.tech/img/bV9dgr?w=154&amp;h=200" alt="图片描述" title="图片描述"></span></p>
<h3>4.2 clear属性的不足</h3>
<p>clear属性只对块级元素有效，但是::after等伪元素默认都是内联水平，因此，在实际工作中，我们常常使用下面的代码来清除浮动带来的影响：</p>
<pre><code class="css">.clear::after{
    content: "";
    display: table;/*也可以是'block'或者是'list-item'*/
    clear: both;
}</code></pre>
<p>由于<code>clear:both</code>作用的本质是让自己不和float元素在一行显示，并不是真正意义上的清除浮动，因此float元素有一些不好的特性依然存在，表现在：</p>
<ul><li>如果<code>clear:both</code>元素前面的元素就是float元素，则设置margin-top无效;</li></ul>
<pre><code class="html">/* HTML代码 */
&lt;div class="box1"&gt;&lt;/div&gt;
&lt;div class="box2"&gt;&lt;/div&gt;</code></pre>
<pre><code class="css">/* CSS代码 */
.box1 {
    float: left;
    width: 100px;
    height: 60px;
    padding: 10px;
    border: 3px solid black;
    background: url("../../lib/img/mm1.png") center no-repeat;
}
.box2 {
    clear: both;
    margin-top: -20px;
    border: 3px solid red;
    padding:10px;
    width:100px;
    height: 60px;
    background: url("../../lib/img/mm2.jpg") center no-repeat;
}</code></pre>
<p>在本例中，设置<code>.box2</code>中的<code>margin-top</code>没有任何的效果，如下图所示：<br><span class="img-wrap"><img data-src="/img/bV9dgw?w=157&amp;h=200" src="https://static.alili.tech/img/bV9dgw?w=157&amp;h=200" alt="图片描述" title="图片描述"></span></p>
<ul><li>
<code>clear:both</code>后面的元素依旧可能会发生文字环绕现象。</li></ul>
<pre><code class="html">&lt;div class="father"&gt;
    &lt;div class="float"&gt;
        &lt;img src="../../lib/img/mm1.png"&gt;
    &lt;/div&gt;
    &lt;p&gt;美女1，美女2，美女3，美女4，美女5，美女6，后宫1，后宫2，后宫3，后宫&lt;/p&gt;
&lt;/div&gt;
&lt;div&gt;我要美女1，我还要美女2&lt;/div&gt;</code></pre>
<pre><code class="css">/* CSS代码 */
.father{
    border: 1px solid deeppink;
    width: 500px;
    height: 70px;
}
.father:after{
    content: '';
    display: table;
    clear: both;
}
.float{
    float: left;
}
.father img {
    width: 60px;
    height: 70px;
}</code></pre>
<p>在本例中，设置<code>clean:both</code>来阻止浮动对后面元素的影响，但是最后的错位效果依然发生了（可以设置<code>.father</code>的字体大小为0，然后设置p标签的字体大小解决错误的问题）。</p>
<p><span class="img-wrap"><img data-src="/img/bV9dgA?w=716&amp;h=150" src="https://static.alili.tech/img/bV9dgA?w=716&amp;h=150" alt="图片描述" title="图片描述"></span></p>
<p>由此可见，clear:both只能在一定程度上消除浮动的影响，要想完美去除浮动元素的影响，借助其他的手段——BFC，接着看下文。</p>
<h2>5. CSS世界的结界——BFC</h2>
<h3>5.1 BFC的定义</h3>
<p>BFC全称<code>block formatting context</code>，中文为"<strong>块级格式化上下文</strong>"。BFC的表现原则为：如果一个元素具有BFC，那么它的内部子元素再怎么翻江倒海，都不会影响外部的元素。因此，BFC元素是不可能发生margin重叠的，另外，BFC元素也可以用来清除浮动的影响。</p>
<p>那么满足什么条件才会有BFC呢？只要满足下面任意一个条件就会触发BFC:</p>
<ul>
<li>html根元素；</li>
<li>float的值不为none；</li>
<li>overflow的值为auto、scroll或者hidden；</li>
<li>display的值为table-cell、table-caption和inline-block中的任何一个；</li>
<li>position的值不为relative和static；</li>
</ul>
<p>触发BFC后，就不需要使用<code>clear:both</code>属性去清除浮动的影响。</p>
<h3><strong>5.2 BFC的作用</strong></h3>
<ul><li>清除margin重叠</li></ul>
<pre><code class="html">/* HTML 代码 */
&lt;div class="parent"&gt;
    &lt;p&gt;item 1&lt;/p&gt;
    &lt;p&gt;item 2&lt;/p&gt;
    &lt;p&gt;item 3&lt;/p&gt;
    &lt;p&gt;item 4&lt;/p&gt;
&lt;/div&gt;</code></pre>
<pre><code class="css">/* CSS 代码 */
.parent{
    width: 300px;
    background-color: black;
    overflow: hidden;
}
p {
    background-color: white;
    margin: 10px 0;
    text-align: center;
}</code></pre>
<p>在这种情况下，出现了margin重叠的效果。如下图所示：</p>
<p><span class="img-wrap"><img data-src="/img/bV9dgG?w=207&amp;h=100" src="https://static.alili.tech/img/bV9dgG?w=207&amp;h=100" alt="图片描述" title="图片描述"></span></p>
<p><strong>利用BFC能消除margin重叠，谨记：只有当元素在同一个BFC中时，垂直方向上的margin才会clollpase</strong>。如果它们属于不同的BFC，则不会有margin重叠。因此我们可以再建立一个BFC去阻止margin重叠的发生。所以为了让他们的margin变成20px，我们只需要用div,建立一个BFC，令p元素处于不同BFC即可。请看例子：</p>
<pre><code class="html">/* HTML代码 */
&lt;div class="parent"&gt;
    &lt;p&gt;item 1&lt;/p&gt;
    &lt;p&gt;item 2&lt;/p&gt;
    &lt;div style="overflow: hidden"&gt;
        &lt;p&gt;item 3&lt;/p&gt;
    &lt;/div&gt;
    &lt;p&gt;item 4&lt;/p&gt;
&lt;/div&gt;</code></pre>
<p>从下图中可以看出，借助BFC消除了margin重叠的问题。</p>
<p><span class="img-wrap"><img data-src="/img/bV9dgM?w=182&amp;h=100" src="https://static.alili.tech/img/bV9dgM?w=182&amp;h=100" alt="图片描述" title="图片描述"></span></p>
<ul><li>清除高度塌陷的问题</li></ul>
<p>在上面的章节中，如果子元素设置浮动属性，则父元素就会出现高度塌陷的问题。在这里，我们可以借助BFC消除高度塌陷的问题了，请看下面的这个例子：</p>
<pre><code class="html">/* HTML代码 */
&lt;div style="border: 1px solid deeppink;width: 200px; overflow: hidden"&gt;
    &lt;img src="../../lib/img/mm1.png" style="border: 1px solid blue; float: left"&gt;
&lt;/div&gt;</code></pre>
<p>从下图中可以看到，设置<code>overflow:hidden</code>样式后就产生了BFC，根据BFC的表现规则，内部元素的样式不会影响外部元素的样式，因此没有出现高度塌陷的问题。</p>
<p><span class="img-wrap"><img data-src="/img/bV9dgO?w=428&amp;h=122" src="https://static.alili.tech/img/bV9dgO?w=428&amp;h=122" alt="图片描述" title="图片描述"></span></p>
<ul><li>自适应布局（阻止文本换行）</li></ul>
<pre><code class="html">/* HTML代码 */
&lt;div class="parent"&gt;
    &lt;img src="../../lib/img/mm1.png"&gt;
    &lt;p class="girl"&gt;美女1,美女2,美女3,美女4,美女5,美女6,后宫1,后宫2,后宫3,后宫4,&lt;/p&gt;
&lt;/div&gt;</code></pre>
<pre><code class="css">/* CSS代码 */
.parent{
    border: 1px solid deeppink;
    width: 200px;
    font-size: 0;
}
.parent img{
    border: 1px solid blue;
    float: left;
}
.girl{
    /*overflow: hidden;*/
    font-size: 12px;
    background-color: #cdcdcd;
}</code></pre>
<p>如果我们给<code>.girl</code>元素设置具有BFC特性的属性，如：<code>overflow: hidden</code>就可以实现更健壮、更智能的自适应布局。</p>
<p><span class="img-wrap"><img data-src="/img/bV9dgV?w=434&amp;h=388" src="https://static.alili.tech/img/bV9dgV?w=434&amp;h=388" alt="图片描述" title="图片描述"></span></p>
<p>这里的<code>.girl</code>元素为了不和浮动元素产生任何交集，顺着浮动边缘形成自己的封闭上下文。</p>
<p>普通元素在设置了<code>overflow:hidden</code>后，会自动填满容器中除了浮动元素意外的剩余空间，形成自适应效果，这种自适应布局和纯流体布局相比：</p>
<ul>
<li>自适应内容由于封闭而更加健壮，容错性更强；</li>
<li>自适应内容能够填满除浮动元素以外区域，不需要关心浮动元素宽度。</li>
</ul>
<h2>6. 结语</h2>
<p>本文是我学习float属性总结文章，可能存在理解准确的地方，欢迎大家在评论区评论，指点迷津，大家互相帮助，互相进步。</p>
<p>最后，希望本文的内容能够对您对float的理解能够有所帮助，感谢阅读。</p>
<h2>参考</h2>
<p>张鑫旭-《CSS世界》</p>
<hr>
<p>遇见了，不妨关注下我的微信公众号「前端Talkking」</p>
<p><span class="img-wrap"><img data-src="/img/bV9did?w=591&amp;h=367" src="https://static.alili.tech/img/bV9did?w=591&amp;h=367" alt="图片描述" title="图片描述"></span></p>
<p>​</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【前端Talkking】CSS系列——CSS深入理解之float浮动

## 原文链接
[https://segmentfault.com/a/1190000014554601](https://segmentfault.com/a/1190000014554601)

