---
title: '移动端web布局方案的知识总结' 
date: 2019-01-15 2:30:12
hidden: true
slug: ij3b5uywwhh
categories: [reprint]
---

{{< raw >}}

                    
<p>做移动端web开发时，我自己了解了4种方法，我觉得目前适合我的方法就是用rem来作单位，配合h5新的meta属性来适配屏幕做开发。<br>首先介绍一下meta标签</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<meta name=&quot;viewport&quot; content=&quot;width=width-device,initial-scale=1;minimum-scale=1,maximum-scale=1,user-scalable=no&quot;/>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;meta <span class="hljs-built_in">name</span>=<span class="hljs-string">"viewport"</span> content=<span class="hljs-string">"width=width-device,initial-scale=1;minimum-scale=1,maximum-scale=1,user-scalable=no"</span>/&gt;
</code></pre>
<p><code>name="viewport"</code>是来告诉浏览器这个<code>meta</code>属性是设置设备视口的<br><code>content=""</code>是设置视口的具体内容<br><code>width=device-width</code>这段代码告诉浏览器，页面的宽度就等当前设备的视口宽度，<br><code>initial-scale=1</code>,代表初始的页面缩放比例为1，<br><code>minimum-scale=1</code>代表缩放的最小比例为1,<br><code>maximum-scale=1</code>代表缩放的最大比例为1<br><code>user-scalable=no</code>代表不允许用户进行手动缩放。</p>
<p>在做开发时，尽量把<code>minimum-scale=1,maximum-scale=1</code>带上，因为有些第三方工具会让页面缩放,加上这两个时，代表最小缩放比例为1，最大缩放比例也为1，那就是不让用户进行缩放。接下来说缩放比例，即就是你写的<code>css</code>里的1px在屏幕上显示也是1px的宽度，这就是1:1的缩放比例关系，当你在移动设备上做开发时，为了能让用户在屏幕上看的更加清晰，这时Retina屏来了，他会把画布的大小放大到原来的2倍，也就是说现在我写的<code>css</code>里的1px在屏幕上展示的是2px的宽度。在平时开发的时候我想要设置1px的边框，总不可能在<code>css</code>里写0.5px吧，所以为了让1px的宽度在屏幕上显示也是1px的宽度，就只能去对页面进行缩放，也就是让<code>&lt;meta name="viewport" content="width=width-device,initial-scale=0.5;minimum-scale=0.5,maximum-scale=0.5,user-scalable=no"/&gt;</code><br>这里先用0.5来说。<br>当缩放比例为1时，也就是<code>&lt;meta name="viewport" content="width=width-device,initial-scale=1;minimum-scale=1,maximum-scale=1,user-scalable=no"/&gt;</code>我们来看看这段代码的运行结果。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style>
        * {
            margin:0;
            padding:0;
        }
        .box {
            width:100%;
            height:400px;
            margin:0 auto;
            box-sizing:border-box;
            background-color:orange;
            border:1px solid #000;
        }

    </style>
</head>
<body>
    <div class=&quot;box&quot;></div>
</body>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
        * {
            <span class="hljs-attribute">margin</span>:<span class="hljs-number">0</span>;
            <span class="hljs-attribute">padding</span>:<span class="hljs-number">0</span>;
        }
        <span class="hljs-selector-class">.box</span> {
            <span class="hljs-attribute">width</span>:<span class="hljs-number">100%</span>;
            <span class="hljs-attribute">height</span>:<span class="hljs-number">400px</span>;
            <span class="hljs-attribute">margin</span>:<span class="hljs-number">0</span> auto;
            <span class="hljs-attribute">box-sizing</span>:border-box;
            <span class="hljs-attribute">background-color</span>:orange;
            <span class="hljs-attribute">border</span>:<span class="hljs-number">1px</span> solid <span class="hljs-number">#000</span>;
        }

    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"box"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
</code></pre>
<p>运行结果：</p>
<p><span class="img-wrap"><img data-src="/img/bVMVlo?w=987&amp;h=472" src="https://static.alili.tech/img/bVMVlo?w=987&amp;h=472" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>当缩放比例为0.5时，也就是<code>&lt;meta name="viewport" content="width=width-device,initial-scale=0.5;minimum-scale=0.5,maximum-scale=0.5,user-scalable=no"/&gt;</code>，我们来看看这段代码的运行结果。</p>
<p><span class="img-wrap"><img data-src="/img/bVMVlr?w=937&amp;h=464" src="https://static.alili.tech/img/bVMVlr?w=937&amp;h=464" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>这时边框也能满足我们的需求1px了。但是0.5哪里来的呢？别急，请看下面，咱们在开发时，有没有注意这里的2.0</p>
<p><span class="img-wrap"><img data-src="/img/bVMVlD?w=467&amp;h=213" src="https://static.alili.tech/img/bVMVlD?w=467&amp;h=213" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>这就是缩放比，电脑屏幕缩放比为1:1，移动设备就不一样了。大家可以看切换设备看看各种手机的缩放比。前面用的0.5，就是缩放比分之一得到的。我们在做开发时，把<code>meta</code>里的各种缩放比例改成缩放比分之一就行了，但是我们又如何获取各种设备的缩放比呢，放心，js里面已经有了获取屏幕缩放比的属性了，<code>window.devicePixelRatio</code>,比如iphone5的这个值就是2等等。这样有了缩放比。我们就可以通过js动态设置meta标签和里面的缩放比了，有了这些内容，我们就能在屏幕上做到1px显示1px的显示了。有了这些，我们就能用我今天所要介绍的第一种方法也是我最喜欢用的方法<code>rem</code>布局。<br><code>1rem</code>就是1个根元素的字体大小，也就是说<code>html</code>设置为<code>20px</code>,<code>1rem</code>就是<code>20px</code>;<code>rem</code>是相对于根元素<code>html</code>的，而<code>em</code>是基于父元素字体大小的。<br>像素还原到1:1后，我们拿宽为640的设计稿，iphone5的屏来适配，此时我们就可以按照稿子进行原模原样的切图，也就是设计稿某区域切出来时为多少px，css就写多少px。最后我们把px全部转换为<code>rem</code>，比如<code>html</code>的<code>font-size</code>大小是<code>20px</code>,<code>div</code>的宽度是<code>100px</code>,我们就可以把100px写成5rem。就这样一直切完整个设计稿，终于完成了切图，布局。（弹性盒子布局很强大，建议去看看）但是当我们换一个设备比如说iphone6p时，页面布局又乱了，这是因为我们设置的<code>html</code>根元素的字体大小没变，而屏幕大小变了，导致布局变乱了，那么我们就要根据屏幕的大小动态的改变根元素的字体大小就行了。接下来看这段代码，带有注释</p>
<p><span class="img-wrap"><img data-src="/img/bVMVlG?w=1023&amp;h=561" src="https://static.alili.tech/img/bVMVlG?w=1023&amp;h=561" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>加上上面的代码之后，就能应用在任何尺寸不同的设备上了。<br>下面介绍另外三种布局方式，目前我不喜欢用这些，未来可能会混合用到<br>1，定死页面宽度，直接写一个<code>div</code>把宽度订到设计稿的宽度或者你需要的宽度，然后让它居中，再在这个<code>div</code>盒子里进行你的页面开发，这种开发的缺点就是当遇到较大的屏幕时，屏幕的两边会流出白边，影响美观，体验不好。<br>2，利用百分比进行开发，把元素的高度固定，宽度给百分比，缺点就是在大屏幕上，元素的宽度被拉伸，导致宽高比例不协调，不够美观。<br>3，利用响应式布局，根据不同的屏幕宽度，用不同的<code>css</code>样式,这个方式代码量大，比较复杂，不适合页面布局复杂的大型网站，反而在博客，个人网站等比较小的网站上效果很好。</p>
<p>以上内容为笔者总结的一些移动端开发布局的小知识，笔者知识技能有限，文章若有理解错误的地方还请读者理解并指出，笔者会虚心学习。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
移动端web布局方案的知识总结

## 原文链接
[https://segmentfault.com/a/1190000009237854](https://segmentfault.com/a/1190000009237854)

