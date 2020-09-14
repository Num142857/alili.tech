---
title: '前端移动端适配方案之rem之小白解惑' 
date: 2018-12-04 2:30:05
hidden: true
slug: j95hq2a5mla
categories: [reprint]
---

{{< raw >}}

                    
<h2>移动端适配-rem:</h2>
<blockquote>认识移动端</blockquote>
<p>做适配方案之前先认识下移动端，熟悉移动端和pc端的区别和特点，才能真正理解做适配的精髓，这里就简单介绍下；</p>
<p>网上找不到主流android设备的数据表，就以iphone为例：<br><span class="img-wrap"><img data-src="/img/bV8ZZH?w=857&amp;h=434" src="https://static.alili.tech/img/bV8ZZH?w=857&amp;h=434" alt="图片描述" title="图片描述"></span></p>
<p>以iphone6为例：<br>竖屏宽为375，叫做逻辑像素（有的地方叫独立像素）；<br>竖屏宽的像素750，叫做物理像素，是设备实际的光点个数，要知道屏幕都是由一个一个光点组成的;<br>像素比（Asset）2x，就是2倍，物理像素/逻辑像素；<br>ppi:像素密度326,实际平方英寸的光点个数；值越高画面越细腻，但对cpu和电池等硬件要求就越高;ppi超过163的屏幕苹果公司起了个洋气的名字，叫视网膜屏；</p>
<p>逻辑像素和物理像素的概念需要消化消化，css中的px对应的实际上是逻辑像素，比如这里写个width:375px,是可以铺满横向的iphone6;</p>
<p><strong>特别提醒，这里所有的有关像素的概念都和实际的尺寸（英寸）没有多大关系。</strong>（比如iphone6的375就比一些android的360看上去还要窄一些。）</p>
<p>pc端没有这么复杂的像素比关系，什么都是1:1:1；</p>
<p>搞明白这些像素的关系，问题就来了，怎么在css中写1个尺寸，就能让所有尺寸和像素比的设备都饱和展示，比如上面说的375px,屏幕横过来是不是就只占手机一半的位置，换个320宽的手机是不是就溢出了，有滚动条了；</p>
<blockquote>认识单位rem</blockquote>
<p>简单介绍下rem和px的换算关系：1rem=html的font-size；<br>比如：html{font-size:100px},那么1rem就等于100px;</p>
<p>方案就出来了，所有单位使用rem,我们动态改变html的font-size；</p>
<blockquote>实施rem方案</blockquote>
<p>思路就是(一遍看不清楚，把下面的例子理解了再看一遍思路)：先有一个基准，比如375的iphone6，（为什么拿375说事，上面已经提到，我们写的css样式实际上只和逻辑像素有关，至于手机用几个光点去渲染是它的事.）将html的font-size设置成容易计算的值比如100px，页面初始化 和 尺寸发生变化 的时候获取屏幕的宽度（document.body.clientWidth）就好了，然后用这个值除以375，获得一个比值，去乘以100px,最后得到的值来替换html的font-size。</p>
<p>html的font-size=(屏幕宽/375)*100+'px';</p>
<pre><code>例如iphone6,body:{width:3.75rem};
竖屏的时候:html{font-size:375/375}*100+'px',body宽就是3.75*(375/375)*100=375px，铺满了吧；
把屏幕横过来：html{font-size:667/375}*100+'px',body宽3.75*(667/375)*100=667px,又铺满了吧；
</code></pre>
<blockquote>实力总结</blockquote>
<p>目前移动端ui的设计稿都是按375的iphone6来设计的，大多是2倍图，是为了展现更细节的东西，就是750px宽的psd图，在前端设计适配方案的时候就可以用375对应100px的方式来做，所有尺寸css写psd上的一半就好；</p>
<p>rem的适配方案确定按以下几个步骤实施：<br>1.确定设计稿尺寸，375倍数还是320倍数；<br>2.在公共js中添加方法:</p>
<pre><code>var doc=document.docementElement;//减少dom操作
resize(){
    //获取dom文档宽
    var clientWidth=doc.clientWidth,
        htmlFontSize=doc.style.fontSize;
        //动态改变html的font-size,以320为例
        if(clientWidth&lt;320){//设置边界值以防万一
            htmlFontSize=‘100px’;
        }else(){
            htmlFontSize=clientWidth/320*100+'px';
        }
}
//检测屏幕尺寸变化同步font-size，如横竖屏切换时触发
window.onresize=function(){
    resize()
}；
//页面初始化时触发
resize()</code></pre>
<p>3.css中所有的样式单位为rem，包括文字的大小，换算关系如下：<br>如：设计稿尺寸为640，font-size为20px，那么所有尺寸除以2，                                                             <br>{width:3.2rem;font-size:0.1rem;}<br>如：设计稿尺寸为320，font-size为20px，那么body{width:3.2rem;font-size:0.2rem;}<br>如：设计搞为375,那么resize()方法中的320要换成375,css写成body{width:3.75rem;font-size:0.2rem}</p>
<p>特别提醒：这样的适配在pad横屏展示超级大，所以还是要根据业务需求设置临界值；<br>移动端图片适配除了rem的尺寸还要根据不同尺寸设备更换2倍图和3倍图，比如pad上展示3倍图就会更清晰，一般方案是用media媒体查询更换背景图；</p>
<blockquote>rem的缺陷<br>最近在做开发的时候遇到rem的一个大坑，就是如果用户改变了手机的字体大小，而且我们的页面样式的宽用了rem,比如{width:1rem},那么页面的宽就会成倍增长，导致页面乱掉。。。还没找到办法解决，宽度还是先避免使用rem的好。</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端移动端适配方案之rem之小白解惑

## 原文链接
[https://segmentfault.com/a/1190000014502172](https://segmentfault.com/a/1190000014502172)

