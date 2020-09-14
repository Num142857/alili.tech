---
title: 'Vue.js中 watch 的高级用法' 
date: 2018-12-02 2:30:15
hidden: true
slug: hknmzgtz3k
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/remote/1460000014685255?w=2392&amp;h=1290" src="https://static.alili.tech/img/remote/1460000014685255?w=2392&amp;h=1290" alt="Vue.js中侦听器（watch）的高级用法" title="Vue.js中侦听器（watch）的高级用法" style="cursor: pointer; display: inline;"></span></p>
<p>假设有如下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div>
      <p>FullName: "{{"fullName"}}"</p>
      <p>FirstName: <input type=&quot;text&quot; v-model=&quot;firstName&quot;></p>
</div>

new Vue({
  el: '#root',
  data: {
    firstName: 'Dawei',
    lastName: 'Lou',
    fullName: ''
  },
  watch: {
    firstName(newName, oldName) {
      this.fullName = newName + ' ' + this.lastName;
    }
  } 
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>FullName: "{{"fullName"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>FirstName: <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"firstName"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

new Vue({
  el: '#root',
  data: {
    firstName: 'Dawei',
    lastName: 'Lou',
    fullName: ''
  },
  watch: {
    firstName(newName, oldName) {
      this.fullName = newName + ' ' + this.lastName;
    }
  } 
})</code></pre>
<p>上面的代码的效果是，当我们输入<code>firstName</code>后，<code>wacth</code>监听每次修改变化的新值，然后计算输出<code>fullName</code>。</p>
<h2 id="articleHeader0">handler方法和immediate属性</h2>
<p>这里 watch 的一个特点是，最初绑定的时候是不会执行的，要等到 <code>firstName</code> 改变时才执行监听计算。那我们想要一开始就让他最初绑定的时候就执行改怎么办呢？我们需要修改一下我们的 watch 写法，修改过后的 watch 代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="watch: {
  firstName: {
    handler(newName, oldName) {
      this.fullName = newName + ' ' + this.lastName;
    },
    // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
    immediate: true
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">watch: {
  <span class="hljs-attr">firstName</span>: {
    handler(newName, oldName) {
      <span class="hljs-keyword">this</span>.fullName = newName + <span class="hljs-string">' '</span> + <span class="hljs-keyword">this</span>.lastName;
    },
    <span class="hljs-comment">// 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法</span>
    immediate: <span class="hljs-literal">true</span>
  }
}</code></pre>
<p>注意到<code>handler</code>了吗，我们给 firstName 绑定了一个<code>handler</code>方法，之前我们写的 watch 方法其实默认写的就是这个<code>handler</code>，Vue.js会去处理这个逻辑，最终编译出来其实就是这个<code>handler</code>。</p>
<p>而<code>immediate:true</code>代表如果在 wacth 里声明了 firstName 之后，就会立即先去执行里面的handler方法，如果为 <code>false</code>就跟我们以前的效果一样，不会在绑定的时候就执行。</p>
<h2 id="articleHeader1">deep属性</h2>
<p>watch 里面还有一个属性 <code>deep</code>，默认值是 <code>false</code>，代表是否深度监听，比如我们 data 里有一个<code>obj</code>属性：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div>
      <p>obj.a: "{{"obj.a"}}"</p>
      <p>obj.a: <input type=&quot;text&quot; v-model=&quot;obj.a&quot;></p>
</div>

new Vue({
  el: '#root',
  data: {
    obj: {
      a: 123
    }
  },
  watch: {
    obj: {
      handler(newName, oldName) {
         console.log('obj.a changed');
      },
      immediate: true
    }
  } 
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>obj.a: "{{"obj.a"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>obj.a: <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"obj.a"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

new Vue({
  el: '#root',
  data: {
    obj: {
      a: 123
    }
  },
  watch: {
    obj: {
      handler(newName, oldName) {
         console.log('obj.a changed');
      },
      immediate: true
    }
  } 
})</code></pre>
<p>当我们在在输入框中输入数据视图改变<code>obj.a</code>的值时，我们发现是无效的。受现代 JavaScript 的限制 (以及废弃 <code>Object.observe</code>)，Vue 不能检测到对象属性的添加或删除。由于 Vue 会在初始化实例时对属性执行 <code>getter/setter</code> 转化过程，所以属性必须在 <code>data</code> 对象上存在才能让 Vue 转换它，这样才能让它是响应的。</p>
<p>默认情况下 handler 只监听<code>obj</code>这个属性它的引用的变化，我们只有给<code>obj</code>赋值的时候它才会监听到，比如我们在 mounted事件钩子函数中对<code>obj</code>进行重新赋值：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mounted: {
  this.obj = {
    a: '456'
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">mounted: {
  <span class="hljs-keyword">this</span>.obj = {
    <span class="hljs-attr">a</span>: <span class="hljs-string">'456'</span>
  }
}</code></pre>
<p>这样我们的 handler 才会执行，打印<code>obj.a changed</code>。</p>
<p>相反，如果我们需要监听<code>obj</code>里的属性<code>a</code>的值呢？这时候<code>deep</code>属性就派上用场了！</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="watch: {
  obj: {
    handler(newName, oldName) {
      console.log('obj.a changed');
    },
    immediate: true,
    deep: true
  }
} " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">watch: {
  <span class="hljs-attr">obj</span>: {
    handler(newName, oldName) {
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'obj.a changed'</span>);
    },
    <span class="hljs-attr">immediate</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">deep</span>: <span class="hljs-literal">true</span>
  }
} </code></pre>
<p><code>deep</code>的意思就是深入观察，监听器会一层层的往下遍历，给对象的所有属性都加上这个监听器，但是这样性能开销就会非常大了，任何修改<code>obj</code>里面任何一个属性都会触发这个监听器里的 handler。</p>
<p>优化，我们可以是使用字符串形式监听。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="watch: {
  'obj.a': {
    handler(newName, oldName) {
      console.log('obj.a changed');
    },
    immediate: true,
    // deep: true
  }
} " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">watch: {
  <span class="hljs-string">'obj.a'</span>: {
    handler(newName, oldName) {
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'obj.a changed'</span>);
    },
    <span class="hljs-attr">immediate</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-comment">// deep: true</span>
  }
} </code></pre>
<p>这样Vue.js才会一层一层解析下去，直到遇到属性<code>a</code>，然后才给<code>a</code>设置监听函数。</p>
<h2 id="articleHeader2">注销watch</h2>
<p>为什么要注销 <code>watch</code>？因为我们的组件是经常要被销毁的，比如我们跳一个路由，从一个页面跳到另外一个页面，那么原来的页面的 watch 其实就没用了，这时候我们应该注销掉原来页面的 watch 的，不然的话可能会导致内置溢出。好在我们平时 watch 都是写在组件的选项中的，他会随着组件的销毁而销毁。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const app = new Vue({
  template: '<div id=&quot;root&quot;>"{{"text"}}"</div>',
  data: {
    text: 0
  },
  watch: {
    text(newVal, oldVal){
      console.log(`${newVal} : ${oldVal}`);
    }
  }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> Vue({
  <span class="hljs-attr">template</span>: <span class="hljs-string">'&lt;div id="root"&gt;"{{"text"}}"&lt;/div&gt;'</span>,
  <span class="hljs-attr">data</span>: {
    <span class="hljs-attr">text</span>: <span class="hljs-number">0</span>
  },
  <span class="hljs-attr">watch</span>: {
    text(newVal, oldVal){
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`<span class="hljs-subst">${newVal}</span> : <span class="hljs-subst">${oldVal}</span>`</span>);
    }
  }
});</code></pre>
<p>但是，如果我们使用下面这样的方式写 watch，那么就要手动注销了，这种注销其实也很简单</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const unWatch = app.$watch('text', (newVal, oldVal) => {
  console.log(`${newVal} : ${oldVal}`);
})

unWatch(); // 手动注销watch" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> unWatch = app.$watch(<span class="hljs-string">'text'</span>, (newVal, oldVal) =&gt; {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`<span class="hljs-subst">${newVal}</span> : <span class="hljs-subst">${oldVal}</span>`</span>);
})

unWatch(); <span class="hljs-comment">// 手动注销watch</span></code></pre>
<p><code>app.$watch</code>调用后会返回一个值，就是<code>unWatch</code>方法，你要注销 watch 只要调用<code>unWatch</code>方法就可以了。</p>
<blockquote>文章首发于我的博客：<a href="https://www.dunizb.com" rel="nofollow noreferrer" target="_blank">https://www.dunizb.com</a><br>原文链接：<a href="https://blog.dunizb.com/2018/04/28/Vue-js-watch-Advanced-Usage/" rel="nofollow noreferrer" target="_blank">https://blog.dunizb.com/2018/...</a>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue.js中 watch 的高级用法

## 原文链接
[https://segmentfault.com/a/1190000014685250](https://segmentfault.com/a/1190000014685250)

