---
title: '关于 ClojureScript 裸写 stateful React Component' 
date: 2019-02-14 2:30:37
hidden: true
slug: et5ve4chvxr
categories: [reprint]
---

{{< raw >}}

                    
<p>目前的 ClojureScript React 绑定都是比较复杂的, 比如 Reagent, 做了不少的修改,<br>我打算看看直接用 cljs 裸写, 按照 React 本身的语义, 会是什么样子,<br>网上搜到几个版本的代码, 总之核心代码就是这样了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(defn my-component [props context updater]
  (cljs.core/this-as this
    (js/React.Component.call this props context updater)
    ;; anything else you want to set-up. use goog.object/set on this
    this))

(gobj/extend
  (.. my-component -prototype)
  js/React.Component.prototype)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="clojure hljs"><code class="clojure">(<span class="hljs-name"><span class="hljs-builtin-name">defn</span></span> my-component [props context updater]
  (<span class="hljs-name">cljs.core/this-as</span> this
    (<span class="hljs-name">js/React.Component.call</span> this props context updater)
    <span class="hljs-comment">;; anything else you want to set-up. use goog.object/set on this</span>
    this))

(<span class="hljs-name">gobj/extend</span>
  (<span class="hljs-name"><span class="hljs-builtin-name">..</span></span> my-component -prototype)
  js/React.Component.prototype)</code></pre>
<p><a href="https://gist.github.com/pesterhazy/39c84224972890665b6bec3addafdf5a" rel="nofollow noreferrer" target="_blank">https://gist.github.com/peste...</a><button class="btn btn-xs btn-default ml10 preview" data-url="pesterhazy/39c84224972890665b6bec3addafdf5a" data-typeid="1">点击预览</button><br><a href="https://gist.github.com/pesterhazy/2a25c82db0519a28e415b40481f84554" rel="nofollow noreferrer" target="_blank">https://gist.github.com/peste...</a><button class="btn btn-xs btn-default ml10 preview" data-url="pesterhazy/2a25c82db0519a28e415b40481f84554" data-typeid="1">点击预览</button><br><a href="https://gist.github.com/thheller/7f530b34de1c44589f4e0671e1ef7533" rel="nofollow noreferrer" target="_blank">https://gist.github.com/thhel...</a><button class="btn btn-xs btn-default ml10 preview" data-url="thheller/7f530b34de1c44589f4e0671e1ef7533" data-typeid="1">点击预览</button></p>
<p>最关键的部分就是定义一个子类继承 React.Component , 然后增加 render 方法, 参考:<br><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org...</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Rectangle - subclass
function Rectangle() {
  Shape.call(this); // call super constructor.
}

// subclass extends superclass
Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// Rectangle - subclass</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Rectangle</span>(<span class="hljs-params"></span>) </span>{
  Shape.call(<span class="hljs-keyword">this</span>); <span class="hljs-comment">// call super constructor.</span>
}

<span class="hljs-comment">// subclass extends superclass</span>
Rectangle.prototype = <span class="hljs-built_in">Object</span>.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;</code></pre>
<p>最终得到的一个版本是这样,</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(def comp-input-area
  (let [Child (fn [props context updater]
                (this-as this
                 (.call React/Component this props context updater)
                 (set! (.-state this) (clj->js {:draft &quot;initial thing&quot;}))
                 this))]
    (set! (.-prototype Child) (.create js/Object (.-prototype React/Component)))
    (set! (.. Child -prototype -constructor) React/Component)
    (set!
     (.. Child -prototype -render)
     (fn []
       (this-as this
        (div
         {}
         (input
          {:value (^js .-draft (^js .-state this)),
           :onChange (fn [event]
             (.setState this (clj->js {:draft (.. event -target -value)})))})
         (^js .-draft (^js .-state this))))))
    Child))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clojure"><code class="cljs">(<span class="hljs-name"><span class="hljs-builtin-name">def</span></span> comp-input-area
  (<span class="hljs-name"><span class="hljs-builtin-name">let</span></span> [Child (<span class="hljs-name"><span class="hljs-builtin-name">fn</span></span> [props context updater]
                (<span class="hljs-name">this-as</span> this
                 (<span class="hljs-name">.call</span> React/Component this props context updater)
                 (<span class="hljs-name"><span class="hljs-builtin-name">set!</span></span> (<span class="hljs-name">.-state</span> this) (<span class="hljs-name">clj-&gt;js</span> {<span class="hljs-symbol">:draft</span> <span class="hljs-string">"initial thing"</span>}))
                 this))]
    (<span class="hljs-name"><span class="hljs-builtin-name">set!</span></span> (<span class="hljs-name">.-prototype</span> Child) (<span class="hljs-name">.create</span> js/Object (<span class="hljs-name">.-prototype</span> React/Component)))
    (<span class="hljs-name"><span class="hljs-builtin-name">set!</span></span> (<span class="hljs-name"><span class="hljs-builtin-name">..</span></span> Child -prototype -constructor) React/Component)
    (<span class="hljs-name"><span class="hljs-builtin-name">set!</span></span>
     (<span class="hljs-name"><span class="hljs-builtin-name">..</span></span> Child -prototype -render)
     (<span class="hljs-name"><span class="hljs-builtin-name">fn</span></span> []
       (<span class="hljs-name">this-as</span> this
        (<span class="hljs-name">div</span>
         {}
         (<span class="hljs-name">input</span>
          {<span class="hljs-symbol">:value</span> (<span class="hljs-comment">^js</span> .-draft (<span class="hljs-comment">^js</span> .-state this)),
           <span class="hljs-symbol">:onChange</span> (<span class="hljs-name"><span class="hljs-builtin-name">fn</span></span> [event]
             (<span class="hljs-name">.setState</span> this (<span class="hljs-name">clj-&gt;js</span> {<span class="hljs-symbol">:draft</span> (<span class="hljs-name"><span class="hljs-builtin-name">..</span></span> event -target -value)})))})
         (<span class="hljs-comment">^js</span> .-draft (<span class="hljs-comment">^js</span> .-state this))))))
    Child))</code></pre>
<p>注意用 <code>this-as</code> 这个 macro 来声明 this, 这个在 cljs 是不能随便用的,<br><a href="https://stackoverflow.com/a/20615415/883571" rel="nofollow noreferrer" target="_blank">https://stackoverflow.com/a/2...</a><br>不过这个 macro 有坑, 我用 <code>let</code> 的时候, <code>this</code> 被绑定到 <code>window</code> 上去了,<br>cljs 编译生成的代码存在一些问题, 感觉 <code>this</code> 怎么说其实还是很成问题的</p>
<p>完整代码涉及到更多的 InterOp 用法, 不专门写了.<br>大概的意思就是需要转很多类型, 在上面的例子当中也看到了.<br>这样一来, 通过 macro 之类的手段在语法上做改进, 很难了.</p>
<p>另外看到 JavaScript 有个 reify <a href="https://github.com/clojure/clojurescript/wiki/Working-with-Javascript-classes" rel="nofollow noreferrer" target="_blank">https://github.com/clojure/cl...</a><br>按说可以简化语法, 而且在 Om 代码有到看类似的用法, 不管比较复杂.<br>直接跟上面的例子对比, 初始化 state 的地方不好写.</p>
<p>总之不好完全按照 React 的语义直接封装了.<br>当日内 Hooks 出来有带来一些改变, 不是很确定能搞成什么样, 社区也在探索中.<br><a href="https://github.com/Lokeh/hooks-demo/blob/master/src/hooks_demo.cljs" rel="nofollow noreferrer" target="_blank">https://github.com/Lokeh/hook...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
关于 ClojureScript 裸写 stateful React Component

## 原文链接
[https://segmentfault.com/a/1190000016828953](https://segmentfault.com/a/1190000016828953)

