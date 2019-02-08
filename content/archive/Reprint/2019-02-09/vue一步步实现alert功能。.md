---
title: 'vue一步步实现alert功能。' 
date: 2019-02-09 2:30:58
hidden: true
slug: sm7gmmzymd
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">原生alert的缺点</h1>
<ol>
<li><p>会阻塞一切操作，影响用户体验</p></li>
<li><p>很多浏览器会默认静止alert，例如微信。</p></li>
<li><p>原生alert框样式丑陋。</p></li>
</ol>
<p><span class="img-wrap"><img data-src="/img/bVx7ib" src="https://static.alili.tech/img/bVx7ib" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>demo地址: <a href="http://cycgit.github.io/demo/alert/" rel="nofollow noreferrer" target="_blank">用力点我</a><br>项目地址: <a href="https://github.com/cycgit/web-style/blob/master/demo/modal.html" rel="nofollow noreferrer" target="_blank">web-style</a> 希望大家多多关注。项目里有css样式和vue组件。目标是快速构建后台系统。有一定自适应的设计。</p>
<h1 id="articleHeader1">css</h1>
<p>思路:最外层是一个黑色透明撑满全屏幕的div并且是fixed的<code>div.modal-mask</code>。 </p>
<p>在mask内部是一个垂直居中的div框大小可以固定。垂直居中方法有几种可选。我选用的是flex。<br>关键性的css代码如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".modal-mask{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(55,55,55,.6);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-confirm{
  width: 400px;
  box-sizing: border-box;
  padding: 30px 40px;
  background-color: #fff;
  border-radius: 6px;
}
@media only screen and (max-width: 640px) {
 .modal-confirm{
    width: 100%;
    margin: 0 20px;
    padding: 10px 20px; 
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.modal-mask</span>{
  <span class="hljs-attribute">position</span>: fixed;
  <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">rgba</span>(55,55,55,.6);
  <span class="hljs-attribute">z-index</span>: <span class="hljs-number">100</span>;
  <span class="hljs-attribute">display</span>: flex;
  <span class="hljs-attribute">align-items</span>: center;
  <span class="hljs-attribute">justify-content</span>: center;
}
<span class="hljs-selector-class">.modal-confirm</span>{
  <span class="hljs-attribute">width</span>: <span class="hljs-number">400px</span>;
  <span class="hljs-attribute">box-sizing</span>: border-box;
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">30px</span> <span class="hljs-number">40px</span>;
  <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#fff</span>;
  <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">6px</span>;
}
@<span class="hljs-keyword">media</span> only screen and (max-width: <span class="hljs-number">640px</span>) {
 <span class="hljs-selector-class">.modal-confirm</span>{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> <span class="hljs-number">20px</span>;
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">10px</span> <span class="hljs-number">20px</span>; 
  }
}</code></pre>
<p>其中<code>modal-confirm</code>是alert框,有固定的宽度400px 还有padding。 然后我们做了一个小小的自适应。 在小屏上(屏幕宽度小于640px)取消了固定宽度。减少了padding的值，看起来更小巧。</p>
<h1 id="articleHeader2">开发vue组件</h1>
<h3 id="articleHeader3">vue template</h3>
<p>首先我希望这个组件功能能像原生的alert事件一样随时随地的方便调用。 不希望每次都<code>new Vue({})</code>一个实例。 所以我做了一些不一样的设计。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;modal-mask&quot; v-show=&quot;show&quot;>
        <div class=&quot;modal-confirm&quot;>
            <h2 class=&quot;confirm-header&quot;>
                <i class=&quot;iconfont icon-questioncircle&quot;></i> "{{" title "}}"
            </h2>
            <div class=&quot;confirm-content&quot;>
                "{{" content "}}"
            </div>
            <div class=&quot;confirm-btns&quot;>
                <button class=&quot;btn&quot; @click=&quot;op(1)&quot;>取 消</button>
                <button class=&quot;btn btn-primary&quot; @click=&quot;op(2)&quot;>确 定</button>
            </div>
        </div>
    </div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"modal-mask"</span> <span class="hljs-attr">v-show</span>=<span class="hljs-string">"show"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"modal-confirm"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">h2</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"confirm-header"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"iconfont icon-questioncircle"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span> </span><span class="hljs-template-variable">"{{" title "}}"</span><span class="xml">
            <span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"confirm-content"</span>&gt;</span>
                </span><span class="hljs-template-variable">"{{" content "}}"</span><span class="xml">
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"confirm-btns"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"btn"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"op(1)"</span>&gt;</span>取 消<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"btn btn-primary"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"op(2)"</span>&gt;</span>确 定<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span></code></pre>
<p><code>v-show</code>是控制alert组件的显示和隐藏的指令。 <code>"{{" "}}"</code>是vue默认的模版标记。<br><code>@click</code> 是绑定click事件的指令</p>
<h3 id="articleHeader4">vue data</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Vue({
    el: '#V-confirm',
    data: {
              show: false,
              onCancel: false,
              onOk: false,
              title: '',
              content: ''
          }
    })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-string">new</span> <span class="hljs-string">Vue({</span>
<span class="hljs-attr">    el:</span> <span class="hljs-string">'#V-confirm'</span><span class="hljs-string">,</span>
<span class="hljs-attr">    data:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">              show:</span> <span class="hljs-literal">false</span><span class="hljs-string">,</span>
<span class="hljs-attr">              onCancel:</span> <span class="hljs-literal">false</span><span class="hljs-string">,</span>
<span class="hljs-attr">              onOk:</span> <span class="hljs-literal">false</span><span class="hljs-string">,</span>
<span class="hljs-attr">              title:</span> <span class="hljs-string">''</span><span class="hljs-string">,</span>
<span class="hljs-attr">              content:</span> <span class="hljs-string">''</span>
          <span class="hljs-string">}</span>
    <span class="hljs-string">})</span></code></pre>
<ul>
<li><p><code>show</code> 是控制显示隐藏的标记。</p></li>
<li><p><code>onCancel onOk</code> 是点击取消或者确定时候触发的回调。</p></li>
<li><p><code>title content</code> 是alert显示的文本。</p></li>
</ul>
<h3 id="articleHeader5">vue methods</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" methods: {
      op(type){
        this.show = false
        if(type == '1'){
          if(this.onCancel) this.onCancel()
        }else{
          if(this.onOk) this.onOk()
        }

        this.onCancel = false
        this.onOk = false
        
        document.body.style.overflow = ''
      },
      alert(setting){
        this.title = setting.title ||  '标题'
        this.content = setting.content || '内容'
        this.onOk = setting.onOk || false
        this.onCancel = setting.onCancel || false
        this.show = true
        document.body.style.overflow = 'hidden'
      }
    }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code> methods: {
      op(type){
        <span class="hljs-keyword">this</span>.show = <span class="hljs-literal">false</span>
        <span class="hljs-keyword">if</span>(type == <span class="hljs-string">'1'</span>){
          <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.onCancel) <span class="hljs-keyword">this</span>.onCancel()
        }<span class="hljs-keyword">else</span>{
          <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.onOk) <span class="hljs-keyword">this</span>.onOk()
        }

        <span class="hljs-keyword">this</span>.onCancel = <span class="hljs-literal">false</span>
        <span class="hljs-keyword">this</span>.onOk = <span class="hljs-literal">false</span>
        
        document.body.style.overflow = <span class="hljs-string">''</span>
      },
      alert(setting){
        <span class="hljs-keyword">this</span>.title = setting.title ||  <span class="hljs-string">'标题'</span>
        <span class="hljs-keyword">this</span>.content = setting.content || <span class="hljs-string">'内容'</span>
        <span class="hljs-keyword">this</span>.onOk = setting.onOk || <span class="hljs-literal">false</span>
        <span class="hljs-keyword">this</span>.onCancel = setting.onCancel || <span class="hljs-literal">false</span>
        <span class="hljs-keyword">this</span>.show = <span class="hljs-literal">true</span>
        document.body.style.overflow = <span class="hljs-string">'hidden'</span>
      }
    }
  }</code></pre>
<p><code>alert(setting)</code> 方法是控制显示alert组件的方法。接受一个object的参数配置。<br><code>op(type)</code> 方法是点击取消和确定按钮的时候触发的时候。</p>
<h3 id="articleHeader6">hack代码</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
  var element = document.createElement('div');
  element.id = 'V-confirm'
  element.innerHTML = template
  document.body.appendChild(element)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code>
  var <span class="hljs-literal">element</span> = document.createElement(<span class="hljs-string">'div'</span>);
  <span class="hljs-literal">element</span>.id = <span class="hljs-string">'V-confirm'</span>
  <span class="hljs-literal">element</span>.innerHTML = template
  document.body.appendChild(<span class="hljs-literal">element</span>)
</code></pre>
<p>这一段代码作用是一开始就把vue实例插入到 <code>body</code> 底部,方便直接 <code>alert</code> 调用。</p>
<h3 id="articleHeader7">加入一些动画效果</h3>
<p>依赖的是vue指令 <code>transition</code> 具体的用法教程 大家去 <a href="http://cn.vuejs.org/guide/transitions.html" rel="nofollow noreferrer" target="_blank">过渡-传送门</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".modal-enter, .modal-leave {
  opacity: 0;
}
.modal-transition{
  transition: all .3s ease;
}

.modal-enter .modal-confirm,
.modal-leave .modal-confirm {
  transform: scale(1.1);
}
.modal-transition{
  transition: all .3s ease;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.modal-enter</span>, <span class="hljs-selector-class">.modal-leave</span> {
  <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0</span>;
}
<span class="hljs-selector-class">.modal-transition</span>{
  <span class="hljs-attribute">transition</span>: all .<span class="hljs-number">3s</span> ease;
}

<span class="hljs-selector-class">.modal-enter</span> <span class="hljs-selector-class">.modal-confirm</span>,
<span class="hljs-selector-class">.modal-leave</span> <span class="hljs-selector-class">.modal-confirm</span> {
  <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scale</span>(1.1);
}
<span class="hljs-selector-class">.modal-transition</span>{
  <span class="hljs-attribute">transition</span>: all .<span class="hljs-number">3s</span> ease;
}</code></pre>
<h3 id="articleHeader8">用法</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var setting = {}
    setting.title = '你确定删除吗?'
    setting.content = '删除不可以恢复...'
    setting.onOk = function(){}
    setting.onCancel = function(){}
    
    
$confirm.alert(setting)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-selector-tag">var</span> setting = {}
    setting<span class="hljs-selector-class">.title</span> = <span class="hljs-string">'你确定删除吗?'</span>
    setting<span class="hljs-selector-class">.content</span> = <span class="hljs-string">'删除不可以恢复...'</span>
    setting<span class="hljs-selector-class">.onOk</span> = function(){}
    setting<span class="hljs-selector-class">.onCancel</span> = function(){}
    
    
<span class="hljs-variable">$confirm</span>.alert(setting)
</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue一步步实现alert功能。

## 原文链接
[https://segmentfault.com/a/1190000005708968](https://segmentfault.com/a/1190000005708968)

