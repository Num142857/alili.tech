---
title: '深入JavaScript之call和apply方法' 
date: 2018-12-28 2:30:10
hidden: true
slug: wbi66fqacyp
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">难兄难弟</h2>
<p>我是js里的call方法，我和apply方法是难兄难弟。为什么这么说呢，因为很多前端小白看到咱俩就犯怵: "WTF！这是什么方法，根本看不懂啊！"然后去谷歌去百度，回来还是："WTF！还是没懂！"。然后就把咱俩丢在一边不管了，心想："哎，能不用就不用吧，反正也不见得用得着"。</p>
<h2 id="articleHeader1">借过来玩一玩</h2>
<p>其实只要你认真的研究一下， 就会发现我和我哥们一点也不难。有些地方没有咱俩还真不行。要说咱俩有啥用，我管咱俩的功能叫<code>借过来玩一玩</code>。你看下面的例子啊：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let cat = {
    food: 'fish'，
    eat: function() {
        console.log('I want to eat ' + this.food);
    },
   sleep: function(time) {
      console.log('I sleep' + time);
   }
}
let dog = {
    food: 'bone'，
    playBall: function() {
        console.log('I am a doggy, I love playing ball');
    }
}
dog.playBall();    //I am a doggy, I love playing ball
cat.eat();    //I want to eat fish
cat.eat.call(dog);   //I want to eat bone" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> cat = {
    <span class="hljs-attr">food</span>: <span class="hljs-string">'fish'</span>，
    eat: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'I want to eat '</span> + <span class="hljs-keyword">this</span>.food);
    },
   <span class="hljs-attr">sleep</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">time</span>) </span>{
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'I sleep'</span> + time);
   }
}
<span class="hljs-keyword">let</span> dog = {
    <span class="hljs-attr">food</span>: <span class="hljs-string">'bone'</span>，
    playBall: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'I am a doggy, I love playing ball'</span>);
    }
}
dog.playBall();    <span class="hljs-comment">//I am a doggy, I love playing ball</span>
cat.eat();    <span class="hljs-comment">//I want to eat fish</span>
cat.eat.call(dog);   <span class="hljs-comment">//I want to eat bone</span></code></pre>
<p>喵星人那里定义了eat方法，而汪星人里边只定义了playBall方法，懒惰的汪星人不想在自己内部再定义一个重复的eat方法，但是又想吃吃吃，那怎么办呢？<br>当然就是通过我call方法来找喵星人把eat方法<code>借过来玩一玩</code>啦。所以呢：<br><code>cat.eat.call(dog);</code>的意思就是：喵哥！你的eat方法借dog玩一玩呗！你那个eat方法里的this现在指向了dog了啊！<br>这下你明白了为啥我的功能是<code>借过来玩一玩</code>了吧：<br>1.没有的方法我去别人那里借。<br>2.我可以改变被调用方法内部的this指向, this指向第一个参数。</p>
<p>除此之外，你可能会问了，假如我要调用的函数要接收参数，要怎么办呢？那么可以用到我call方法接收的第2,3,4...个参数了！</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  cat.sleep.call(dog, 'all day'); //I sleep all day" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sqf"><code style="word-break: break-word; white-space: initial;">  cat.<span class="hljs-built_in">sleep</span>.<span class="hljs-built_in">call</span>(dog, <span class="hljs-string">'all day'</span>); <span class="hljs-comment">//I sleep all day</span></code></pre>
<h2 id="articleHeader2">我和我哥们apply的区别</h2>
<p>我和我哥们apply区别很小很小，因为咱俩的主要功能都是一样的，都是借方法过来玩一玩外加改变this的指向，咱俩唯一的不同在于：<br>对于要借过来玩一玩的函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" function myFunction(arg1, arg2, arg3, arg4) {
    console.log(arg1);
    console.log(arg2);
    console.log(arg3);
    console.log(arg4);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">myFunction</span>(<span class="hljs-params">arg1, arg2, arg3, arg4</span>) </span>{
    <span class="hljs-built_in">console</span>.log(arg1);
    <span class="hljs-built_in">console</span>.log(arg2);
    <span class="hljs-built_in">console</span>.log(arg3);
    <span class="hljs-built_in">console</span>.log(arg4);
}</code></pre>
<p>我call的使用方法是<code>myFunction.call(null, '1', '2', '3', '4')</code><br>而apply的使用方法是<code>myFunction.apply(null, ['1', '2', '3', '4'])</code><br>看出来了么，apply这哥们有强迫症！他要把传进去的参数用数组包起来！而我就是一个一个往里传。你要是怕记混咱俩，你就这么记： 我是call，call就是打电话啊，打电话不得一个一个打吗，所以我的参数是一个个独立的。</p>
<h2 id="articleHeader3">这区别有啥用啊？</h2>
<p>你可能又要问了：既然你俩区别这么小，而且看你上面的例子，既能用call又能用apply，那你俩这区别有啥用啊？<br>嘿嘿嘿，当然有用啦，看我给你举个栗子啊：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//这个函数熟悉吧？求传入参数的最大值
Math.max(1, 2, 3); //3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-comment">//这个函数熟悉吧？求传入参数的最大值</span>
Math.max(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>); <span class="hljs-comment">//3</span></code></pre>
<p>如果你是想求一个数组中的最大值， 咋办？把数组传入Math.max?当然不行，不信的话你可以试一下。这个时候我call方法就无能为力了，只能让apply帮你了:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let myArray = [1, 2, 3];
Math.max.apply(null, myArray);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> myArray = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>];
<span class="hljs-built_in">Math</span>.max.apply(<span class="hljs-literal">null</span>, myArray);</code></pre>
<p>ps: 也可以使用<code>...</code>运算符Math.max(...myArray);</p>
<h2 id="articleHeader4">最后</h2>
<p>我们这对难兄难弟其实一点也不难啊！(╯﹏╰)</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
深入JavaScript之call和apply方法

## 原文链接
[https://segmentfault.com/a/1190000011700272](https://segmentfault.com/a/1190000011700272)

