---
title: '星星组件star.vue' 
date: 2019-01-15 2:30:12
hidden: true
slug: w8ouaospvy
categories: [reprint]
---

{{< raw >}}

                    
<p>整个流程是:</p>
<ol>
<li><p>绑定星星类型的class(48,36,24尺寸),使用starType</p></li>
<li><p>使用class来显示星星,有3种类型,全星,半星,无星,使用star-item代表星星本身,然后分别使用on,off,half代表三种不同类型的星星</p></li>
<li><p>一个span代表一个星星项目,并且使用v-for循环将星星项目输出</p></li>
</ol>
<p>组合出来的星星html就类似这样</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;star star-48&quot;>
<span class=&quot;star-item on&quot;></span>
<span class=&quot;star-item on&quot;></span>
<span class=&quot;star-item on&quot;></span>
<span class=&quot;star-item on&quot;></span>
<span class=&quot;star-item half&quot;></span>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"star star-48"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"star-item on"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"star-item on"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"star-item on"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"star-item on"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"star-item half"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<h3 id="articleHeader0">html部分</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div class=&quot;star&quot; :class=&quot;starType&quot;>
    <span v-for=&quot;itemClass in itemClasses&quot; :class=&quot;itemClass&quot; class=&quot;star-item&quot;></span>
  </div>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"star"</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">"starType"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"itemClass in itemClasses"</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">"itemClass"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"star-item"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></code></pre>
<h3 id="articleHeader1">js部分</h3>
<ul>
<li><p>设置常量是为了方便解耦</p></li>
<li>
<p>星星计算比较巧妙(根据分数转换为星星数)</p>
<ul>
<li><p>对于分数score进行<em>2然后向下取整,然后再除以2,是为了获取所有星星的数量,并且这个数量是0.5倍数的,例如4.6 </em> 2就是9.2,然后向下取整是9,然后再除以2就是4.5,那么就可以得到一个0.5倍数的星星数,可以转换为4个全星+一个半星</p></li>
<li><p>对于非整数的星星算作是半个星星,需要知道是否有存在这种情况,所以分数score%1 ,例如8 % 1是0, 8.5 % 1就不是0,并且这个半星只会出现一次,因为半星状态就只要一个</p></li>
<li><p>没有星星的部分是要补全的,这里使用while循环来处理这种情况</p></li>
</ul>
</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script>
  //设置常量
  const LENGTH = 5;
  const CLS_ON = 'on';
  const CLS_HALF = 'half';
  const CLS_OFF = 'off';

  export default{
    props: {
      size: { //传入的size变量
        type: Number //设置变量类型
      },
      score: { //传入的score变量
        type: Number
      }
    },
    computed: {
      starType(){ //通过计算属性,返回组装过的类型,用来对应class类型
        return 'star-' + this.size;
      },
      itemClasses(){
        let result = []; //返回的是一个数组,用来遍历输出星星
        let score = Math.floor(this.score * 2) / 2; //计算所有星星的数量
        let hasDecimal = score % 1 !== 0; //非整数星星判断
        let integer = Math.floor(score); //整数星星判断
        for (let i = 0; i < integer; i++) { //整数星星使用on
          result.push(CLS_ON);//一个整数星星就push一个CLS_ON到数组
        }
        if (hasDecimal) { //非整数星星使用half
          result.push(CLS_HALF);//类似
        }
        while (result.length < LENGTH) { //余下的用无星星补全,使用off
          result.push(CLS_OFF);//类似
        }
        return result;
      }
    }
  }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&lt;script&gt;
  <span class="hljs-comment">//设置常量</span>
  <span class="hljs-keyword">const</span> LENGTH = <span class="hljs-number">5</span>;
  <span class="hljs-keyword">const</span> CLS_ON = <span class="hljs-string">'on'</span>;
  <span class="hljs-keyword">const</span> CLS_HALF = <span class="hljs-string">'half'</span>;
  <span class="hljs-keyword">const</span> CLS_OFF = <span class="hljs-string">'off'</span>;

  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span>{
    <span class="hljs-attr">props</span>: {
      <span class="hljs-attr">size</span>: { <span class="hljs-comment">//传入的size变量</span>
        type: <span class="hljs-built_in">Number</span> <span class="hljs-comment">//设置变量类型</span>
      },
      <span class="hljs-attr">score</span>: { <span class="hljs-comment">//传入的score变量</span>
        type: <span class="hljs-built_in">Number</span>
      }
    },
    <span class="hljs-attr">computed</span>: {
      starType(){ <span class="hljs-comment">//通过计算属性,返回组装过的类型,用来对应class类型</span>
        <span class="hljs-keyword">return</span> <span class="hljs-string">'star-'</span> + <span class="hljs-keyword">this</span>.size;
      },
      itemClasses(){
        <span class="hljs-keyword">let</span> result = []; <span class="hljs-comment">//返回的是一个数组,用来遍历输出星星</span>
        <span class="hljs-keyword">let</span> score = <span class="hljs-built_in">Math</span>.floor(<span class="hljs-keyword">this</span>.score * <span class="hljs-number">2</span>) / <span class="hljs-number">2</span>; <span class="hljs-comment">//计算所有星星的数量</span>
        <span class="hljs-keyword">let</span> hasDecimal = score % <span class="hljs-number">1</span> !== <span class="hljs-number">0</span>; <span class="hljs-comment">//非整数星星判断</span>
        <span class="hljs-keyword">let</span> integer = <span class="hljs-built_in">Math</span>.floor(score); <span class="hljs-comment">//整数星星判断</span>
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; integer; i++) { <span class="hljs-comment">//整数星星使用on</span>
          result.push(CLS_ON);<span class="hljs-comment">//一个整数星星就push一个CLS_ON到数组</span>
        }
        <span class="hljs-keyword">if</span> (hasDecimal) { <span class="hljs-comment">//非整数星星使用half</span>
          result.push(CLS_HALF);<span class="hljs-comment">//类似</span>
        }
        <span class="hljs-keyword">while</span> (result.length &lt; LENGTH) { <span class="hljs-comment">//余下的用无星星补全,使用off</span>
          result.push(CLS_OFF);<span class="hljs-comment">//类似</span>
        }
        <span class="hljs-keyword">return</span> result;
      }
    }
  }
&lt;<span class="hljs-regexp">/script&gt;</span></code></pre>
<h3 id="articleHeader2">css部分</h3>
<ul>
<li><p>引入mixin.styl是为了使用bg-image的mixin,因为之前做了一个mixin是专门处理2x和3x图片的转换</p></li>
<li><p>因为这里有3种类型的星星图片,分别是48尺寸,36尺寸,24尺寸,所以对于每一个类别的图片分别使用一种class做对应</p></li>
<li>
<p>每一种星星的尺寸都是有一种相对应的图片的,例如48尺寸的星星就会有,并且图片放在相对应的vue文件目录下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="star48_half@2x.png
star48_half@3x.png
star48_off@2x.png
star48_off@3x.png
star48_on@2x.png
star48_on@3x.png" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs llvm"><code>star<span class="hljs-number">48</span>_half<span class="hljs-title">@2</span><span class="hljs-keyword">x</span>.png
star<span class="hljs-number">48</span>_half<span class="hljs-title">@3</span><span class="hljs-keyword">x</span>.png
star<span class="hljs-number">48</span>_off<span class="hljs-title">@2</span><span class="hljs-keyword">x</span>.png
star<span class="hljs-number">48</span>_off<span class="hljs-title">@3</span><span class="hljs-keyword">x</span>.png
star<span class="hljs-number">48</span>_on<span class="hljs-title">@2</span><span class="hljs-keyword">x</span>.png
star<span class="hljs-number">48</span>_on<span class="hljs-title">@3</span><span class="hljs-keyword">x</span>.png</code></pre>
</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style lang=&quot;stylus&quot; rel=&quot;stylesheet/stylus&quot;>
  @import &quot;../../common/stylus/mixin.styl&quot; //引入mixin文件

  .star
    .star-item
      display: inline-block
      background-repeat: no-repeat
    &amp;.star-48 //48尺寸的星星
      .star-item //每一个星星的基本css信息
        width: 20px
        height: 20px
        margin-right: 22px //每一个星星dom都有外边距
        background-size: 20px 20px
        &amp;:last-child //最后一个的外边距就是0
          margin-right: 0
        &amp;.on //全星状态的class
          bg-image('star48_on')
        &amp;.half //半星状态的class
          bg-image('star48_half')
        &amp;.off //无星状态的class
          bg-image('star48_off')
    &amp;.star-36
      .star-item
        width: 15px
        height: 15px
        margin-right: 6px
        background-size: 15px 15px
      &amp;:last-child
        margin-right: 0
      &amp;.on
        bg-image('star36_on')
      &amp;.half
        bg-image('star36_half')
      &amp;.off
        bg-image('star36_off')
    &amp;.star-24
      .star-item
        width: 10px
        height: 10px
        margin-right: 3px
        background-size: 10px 10px
      &amp;:last-child
        margin-right: 0
      &amp;.on
        bg-image('star24_on')
      &amp;.half
        bg-image('star24_half')
      &amp;.off
        bg-image('star24_off')
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&lt;style lang=<span class="hljs-string">"stylus"</span> rel=<span class="hljs-string">"stylesheet/stylus"</span>&gt;
  @<span class="hljs-keyword">import</span> <span class="hljs-string">"../../common/stylus/mixin.styl"</span> <span class="hljs-comment">//引入mixin文件</span>

  .star
    .star-item
      display: inline-block
      background-repeat: no-repeat
    &amp;.star<span class="hljs-number">-48</span> <span class="hljs-comment">//48尺寸的星星</span>
      .star-item <span class="hljs-comment">//每一个星星的基本css信息</span>
        width: <span class="hljs-number">20</span>px
        height: <span class="hljs-number">20</span>px
        margin-right: <span class="hljs-number">22</span>px <span class="hljs-comment">//每一个星星dom都有外边距</span>
        background-size: <span class="hljs-number">20</span>px <span class="hljs-number">20</span>px
        &amp;:last-child <span class="hljs-comment">//最后一个的外边距就是0</span>
          margin-right: <span class="hljs-number">0</span>
        &amp;.on <span class="hljs-comment">//全星状态的class</span>
          bg-image(<span class="hljs-string">'star48_on'</span>)
        &amp;.half <span class="hljs-comment">//半星状态的class</span>
          bg-image(<span class="hljs-string">'star48_half'</span>)
        &amp;.off <span class="hljs-comment">//无星状态的class</span>
          bg-image(<span class="hljs-string">'star48_off'</span>)
    &amp;.star<span class="hljs-number">-36</span>
      .star-item
        width: <span class="hljs-number">15</span>px
        height: <span class="hljs-number">15</span>px
        margin-right: <span class="hljs-number">6</span>px
        background-size: <span class="hljs-number">15</span>px <span class="hljs-number">15</span>px
      &amp;:last-child
        margin-right: <span class="hljs-number">0</span>
      &amp;.on
        bg-image(<span class="hljs-string">'star36_on'</span>)
      &amp;.half
        bg-image(<span class="hljs-string">'star36_half'</span>)
      &amp;.off
        bg-image(<span class="hljs-string">'star36_off'</span>)
    &amp;.star<span class="hljs-number">-24</span>
      .star-item
        width: <span class="hljs-number">10</span>px
        height: <span class="hljs-number">10</span>px
        margin-right: <span class="hljs-number">3</span>px
        background-size: <span class="hljs-number">10</span>px <span class="hljs-number">10</span>px
      &amp;:last-child
        margin-right: <span class="hljs-number">0</span>
      &amp;.on
        bg-image(<span class="hljs-string">'star24_on'</span>)
      &amp;.half
        bg-image(<span class="hljs-string">'star24_half'</span>)
      &amp;.off
        bg-image(<span class="hljs-string">'star24_off'</span>)
&lt;<span class="hljs-regexp">/style&gt;</span></code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
星星组件star.vue

## 原文链接
[https://segmentfault.com/a/1190000009282186](https://segmentfault.com/a/1190000009282186)

