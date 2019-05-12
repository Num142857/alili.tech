---
title: 'JS 状态模式' 
date: 2018-12-21 2:30:11
hidden: true
slug: 5fxzcoakai2
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">1. 简介</h2>
<p><strong>状态模式</strong>(State)允许一个对象在其内部状态改变的时候改变它的行为，对象看起来似乎修改了它的类。<br>其实就是用一个对象或者数组记录一组状态，每个状态对应一个实现，实现的时候根据状态挨个去运行实现。</p>
<h2 id="articleHeader1">2. 实现</h2>
<p>比如超级玛丽，就可能同时有好几个状态比如 跳跃，移动，射击，蹲下 等，如果对这些动作一个个进行处理判断，需要多个<code>if-else</code>或者<code>switch</code>不仅丑陋不说，而且在遇到有组合动作的时候，实现就会变的更为复杂，这里可以使用状态模式来实现。</p>
<p>状态模式的思路是：首先创建一个状态对象或者数组，内部保存状态变量，然后内部封装好每种动作对应的状态，然后状态对象返回一个接口对象，它可以对内部的状态修改或者调用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const SuperMarry = (function() {    
  let _currentState = [],        // 状态数组
      states = {
        jump() {console.log('跳跃!')},
        move() {console.log('移动!')},
        shoot() {console.log('射击!')},
        squat() {console.log('蹲下!')}
      }
  
  const Action = {
    changeState(arr) {  // 更改当前动作
      _currentState = arr
      return this
    },
    goes() {
      console.log('触发动作')
      _currentState.forEach(T => states[T] &amp;&amp; states[T]())
      return this
    }
  }
  
  return {
    change: Action.changeState,
    go: Action.goes
  }
})()

SuperMarry
    .change(['jump', 'shoot'])
    .go()                    // 触发动作  跳跃!  射击!
    .go()                    // 触发动作  跳跃!  射击!
    .change(['squat'])
    .go()                    // 触发动作  蹲下!" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> SuperMarry = (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{    
  <span class="hljs-keyword">let</span> _currentState = [],        <span class="hljs-comment">// 状态数组</span>
      states = {
        jump() {<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'跳跃!'</span>)},
        move() {<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'移动!'</span>)},
        shoot() {<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'射击!'</span>)},
        squat() {<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'蹲下!'</span>)}
      }
  
  <span class="hljs-keyword">const</span> Action = {
    changeState(arr) {  <span class="hljs-comment">// 更改当前动作</span>
      _currentState = arr
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>
    },
    goes() {
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'触发动作'</span>)
      _currentState.forEach(<span class="hljs-function"><span class="hljs-params">T</span> =&gt;</span> states[T] &amp;&amp; states[T]())
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>
    }
  }
  
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">change</span>: Action.changeState,
    <span class="hljs-attr">go</span>: Action.goes
  }
})()

SuperMarry
    .change([<span class="hljs-string">'jump'</span>, <span class="hljs-string">'shoot'</span>])
    .go()                    <span class="hljs-comment">// 触发动作  跳跃!  射击!</span>
    .go()                    <span class="hljs-comment">// 触发动作  跳跃!  射击!</span>
    .change([<span class="hljs-string">'squat'</span>])
    .go()                    <span class="hljs-comment">// 触发动作  蹲下!</span></code></pre>
<p>这里可以使用<code>ES6</code>的<code>class</code>优化一下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class SuperMarry {
  constructor() {
    this._currentState = []
    this.states = {
      jump() {console.log('跳跃!')},
      move() {console.log('移动!')},
      shoot() {console.log('射击!')},
      squat() {console.log('蹲下!')}
    }
  }
  
  change(arr) {  // 更改当前动作
    this._currentState = arr
    return this
  }
  
  go() {
    console.log('触发动作')
    this._currentState.forEach(T => this.states[T] &amp;&amp; this.states[T]())
    return this
  }
}

new SuperMarry()
    .change(['jump', 'shoot'])
    .go()                    // 触发动作  跳跃!  射击!
    .go()                    // 触发动作  跳跃!  射击!
    .change(['squat'])
    .go()                    // 触发动作  蹲下!" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">SuperMarry</span> </span>{
  <span class="hljs-keyword">constructor</span>() {
    <span class="hljs-keyword">this</span>._currentState = []
    <span class="hljs-keyword">this</span>.states = {
      jump() {<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'跳跃!'</span>)},
      move() {<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'移动!'</span>)},
      shoot() {<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'射击!'</span>)},
      squat() {<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'蹲下!'</span>)}
    }
  }
  
  change(arr) {  <span class="hljs-comment">// 更改当前动作</span>
    <span class="hljs-keyword">this</span>._currentState = arr
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>
  }
  
  go() {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'触发动作'</span>)
    <span class="hljs-keyword">this</span>._currentState.forEach(<span class="hljs-function"><span class="hljs-params">T</span> =&gt;</span> <span class="hljs-keyword">this</span>.states[T] &amp;&amp; <span class="hljs-keyword">this</span>.states[T]())
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>
  }
}

<span class="hljs-keyword">new</span> SuperMarry()
    .change([<span class="hljs-string">'jump'</span>, <span class="hljs-string">'shoot'</span>])
    .go()                    <span class="hljs-comment">// 触发动作  跳跃!  射击!</span>
    .go()                    <span class="hljs-comment">// 触发动作  跳跃!  射击!</span>
    .change([<span class="hljs-string">'squat'</span>])
    .go()                    <span class="hljs-comment">// 触发动作  蹲下!</span></code></pre>
<h2 id="articleHeader2">3. 总结</h2>
<p>状态模式的使用场景也特别明确，有如下两点：</p>
<ol>
<li>一个对象的行为取决于它的状态，并且它必须在运行时刻根据状态改变它的行为。</li>
<li>一个操作中含有大量的分支语句，而且这些分支语句依赖于该对象的状态。状态通常为一个或多个枚举常量的表示。</li>
</ol>
<p>简而言之，当遇到很多同级<code>if-else</code>或者<code>switch</code>的时候，可以使用<strong>状态模式</strong>来进行简化。</p>
<hr>
<p>本文是系列文章，可以相互参考印证，共同进步~</p>
<blockquote><ol>
<li><a href="https://segmentfault.com/a/1190000012422055">JS 抽象工厂模式</a></li>
<li><a href="https://segmentfault.com/a/1190000012422198" target="_blank">JS 工厂模式</a></li>
<li><a href="https://segmentfault.com/a/1190000012426841">JS 建造者模式</a></li>
<li><a href="https://segmentfault.com/a/1190000012427846" target="_blank">JS 原型模式</a></li>
<li><a href="https://segmentfault.com/a/1190000012430741">JS 单例模式</a></li>
<li><a href="https://segmentfault.com/a/1190000012430840" target="_blank">JS 回调模式</a></li>
<li><a href="https://segmentfault.com/a/1190000012431621">JS 外观模式</a></li>
<li><a href="https://segmentfault.com/a/1190000012436538" target="_blank">JS 适配器模式</a></li>
<li><a href="https://segmentfault.com/a/1190000012505900">JS 利用高阶函数实现函数缓存(备忘模式)</a></li>
<li><a href="https://segmentfault.com/a/1190000012506631" target="_blank">JS 状态模式</a></li>
<li><a href="https://segmentfault.com/a/1190000012547750">JS 桥接模式</a></li>
<li><a href="https://segmentfault.com/a/1190000012547812" target="_blank">JS 观察者模式</a></li>
</ol></blockquote>
<p>网上的帖子大多深浅不一，甚至有些前后矛盾，在下的文章都是学习过程中的总结，如果发现错误，欢迎留言指出~</p>
<blockquote>参考：<br><a href="https://book.douban.com/subject/26589719/" rel="nofollow noreferrer" target="_blank">《Javascript 设计模式》 - 张荣铭</a><br><a href="http://www.cnblogs.com/TomXu/archive/2012/04/18/2437099.html" rel="nofollow noreferrer" target="_blank">设计模式之状态模式</a>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JS 状态模式

## 原文链接
[https://segmentfault.com/a/1190000012506631](https://segmentfault.com/a/1190000012506631)

