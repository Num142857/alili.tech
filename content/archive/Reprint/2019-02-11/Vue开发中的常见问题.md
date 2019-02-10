---
title: 'Vue开发中的常见问题' 
date: 2019-02-11 2:30:49
hidden: true
slug: pq2x56ta5mi
categories: [reprint]
---

{{< raw >}}

                    
<p>最近在群里看到在大家在学习vue的过程中，遇到的很多问题都十分的类似，这里做一下总结：</p>
<h2 id="articleHeader0">2016-6-12 更新</h2>
<p>新的基于Vue实现的问题和解决方案查询文库上线 <a href="https://github.com/qianjiahao/vue-problems-and-solutions" rel="nofollow noreferrer" target="_blank">地址</a></p>
<ul>
<li><p>可以根据关键字查询相关的问题</p></li>
<li><p>每一篇都可以分享</p></li>
<li><p>可以贡献你的问题和解决方案，加入到文库中</p></li>
</ul>
<p>欢迎大家的pull request &amp; star</p>
<hr>
<h4>eslint静态检查</h4>
<p>在大家用vue-cli创建工程的时候，会有一项，使用使用eslint，如果选择了y，那么工程就会安装并启用eslint。</p>
<p>这里列举一下常见的错误：</p>
<p>1.多余的分号 <br><span class="img-wrap"><img data-src="/img/bVvhFl" src="https://static.alili.tech/img/bVvhFl" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>2.定义了却未使用的变量<br><span class="img-wrap"><img data-src="/img/bVvhFs" src="https://static.alili.tech/img/bVvhFs" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>3.结尾多余空格<br><span class="img-wrap"><img data-src="/img/bVvhFE" src="https://static.alili.tech/img/bVvhFE" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>4.超过一行的空行<br><span class="img-wrap"><img data-src="/img/bVvhFN" src="https://static.alili.tech/img/bVvhFN" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>5.代码尾行应该有空行<br><span class="img-wrap"><img data-src="/img/bVvhFR" src="https://static.alili.tech/img/bVvhFR" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>错误肯定是列举不完的，那么提示错误的时候，我们应该先去看提示信息（翻译），如果发现没有错误，可以对照<a href="http://eslint.org/" rel="nofollow noreferrer" target="_blank">eslint的官方文档</a></p>
<p>在大家适应了eslint的写法后，效率和正确率会直线上升，这里安利下我的另一篇文章，<a href="https://segmentfault.com/a/1190000005030647">提升效率的eslint+vscode的开发环境搭建</a></p>
<hr>
<h4>this指向</h4>
<p>经常会有朋友问一些undifined的错误，比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script>
import Hello from './components/Hello'

export default {
  data () {
    return {
      list: ['a', 'b', 'c'],
      idx: 0,
      current: ''
    }
  },
  methods: {
    iter () {
      this.list.map(function (v, k) {
        if (k === this.idx) {
          this.current = v

          console.log(this.current)
        }
      })
    }
  },
  components: {
    Hello
  }
}
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> Hello <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/Hello'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  data () {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">list</span>: [<span class="hljs-string">'a'</span>, <span class="hljs-string">'b'</span>, <span class="hljs-string">'c'</span>],
      <span class="hljs-attr">idx</span>: <span class="hljs-number">0</span>,
      <span class="hljs-attr">current</span>: <span class="hljs-string">''</span>
    }
  },
  <span class="hljs-attr">methods</span>: {
    iter () {
      <span class="hljs-keyword">this</span>.list.map(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">v, k</span>) </span>{
        <span class="hljs-keyword">if</span> (k === <span class="hljs-keyword">this</span>.idx) {
          <span class="hljs-keyword">this</span>.current = v

          <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.current)
        }
      })
    }
  },
  <span class="hljs-attr">components</span>: {
    Hello
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p>这是刚创建的工程，我们定义了list，idx和current，在执行iter方法时，我们就给current赋值以idx为下标的值，当我们执行后会发现，浏览器报了一个错误</p>
<p><span class="img-wrap"><img data-src="/img/bVvhHk" src="https://static.alili.tech/img/bVvhHk" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>这么回事，我们不是定义了idx了吗？</p>
<p>其实是因为我们在map里的this是指向当前map的迭代对象，而非我们vue的实例，所以this里没有我们需要的idx。</p>
<p>解决方式有两种，其一是通过保存this</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let _this = this
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ceylon"><code><span class="hljs-keyword">let</span> <span class="hljs-number">_</span><span class="hljs-keyword">this</span> = <span class="hljs-keyword">this</span>
</code></pre>
<p>其二是使用es6箭头函数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="methods: {
    iter () {
      this.list.map((v, k) => {
        if (k === this.idx) {
          this.current = v

          console.log(this.current)
        }
      })
    }
  },
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>methods: {
    iter () {
      <span class="hljs-keyword">this</span>.list.map(<span class="hljs-function"><span class="hljs-params">(v, k)</span> =&gt;</span> {
        <span class="hljs-keyword">if</span> (k === <span class="hljs-keyword">this</span>.idx) {
          <span class="hljs-keyword">this</span>.current = v

          <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.current)
        }
      })
    }
  },
</code></pre>
<p>现在再看我们的浏览器</p>
<p><span class="img-wrap"><img data-src="/img/bVvhHG" src="https://static.alili.tech/img/bVvhHG" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>已经可以达到我们预期的效果了！</p>
<p>再来一发</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div @click=&quot;check&quot;></div>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> @click=<span class="hljs-string">"check"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="methods: {
    check () {
        alert('ok')
    }
}

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs smali"><code>methods: {
   <span class="hljs-built_in"> check </span>() {
        alert('ok')
    }
}

</code></pre>
<p>大家会发现并不会alert，但是语法没错误呀，这是为什么呢？</p>
<p>让我妈修改alert</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="methods: {
    check () {
        window.alert('ok')
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs smali"><code>methods: {
   <span class="hljs-built_in"> check </span>() {
        window.alert('ok')
    }
}
</code></pre>
<p>这下alert就能正常工作了，大家肯定都明白是怎么一回事了！</p>
<p>没错 就是this的锅！</p>
<hr>
<h4>方法传值</h4>
<p>我们在input中的方法希望获取input的value，怎么获取呢？</p>
<p>可以通过$event这个对象，通过将$event传入方法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input type=&quot;text&quot; value=&quot;value&quot; @input=&quot;change($event)&quot;/>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs julia"><code>&lt;input <span class="hljs-keyword">type</span>=<span class="hljs-string">"text"</span> value=<span class="hljs-string">"value"</span> <span class="hljs-meta">@input</span>=<span class="hljs-string">"change(<span class="hljs-variable">$event</span>)"</span>/&gt;
</code></pre>
<p>我们可以成功的拿到我们希望的值</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="change (e) {
  console.log(e.target.value)
  this.value = e.target.value
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>change (e) {
  console.log(e<span class="hljs-selector-class">.target</span><span class="hljs-selector-class">.value</span>)
  this<span class="hljs-selector-class">.value</span> = e<span class="hljs-selector-class">.target</span><span class="hljs-selector-class">.value</span>
}
</code></pre>
<hr>
<h4>迭代判断</h4>
<p>比如我们有一个列表，我们希望能显示我们当前选中的那一个，如何实现呢？</p>
<p>基本思路是通过$index来判断是否是当前迭代对象，然后去增减class或者style来实现不同的样式</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<ul>

  <!-- 方法1 class-->
  <li v-for=&quot;item in list&quot; :class=&quot;{'active': $index === activeId}&quot;>"{{"item"}}"</li>
  
  <!-- 方法2 style-->
  <li v-for=&quot;item in list&quot; :style=&quot;{backgroundColor: $index === activeId ? 'red' : 'white'}&quot;>"{{"item"}}"</li>
</ul>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>

  <span class="hljs-comment">&lt;!-- 方法1 class--&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"item in list"</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">{'active': $index === activeId}</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span>&gt;</span></span><span class="hljs-template-variable">"{{"item}</span><span class="xml">}<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
  
  <span class="hljs-comment">&lt;!-- 方法2 style--&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"item in list"</span> <span class="hljs-attr">:style</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">{backgroundColor: $index === activeId ? 'red' : 'white'}</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span>&gt;</span></span><span class="hljs-template-variable">"{{"item}</span><span class="xml">}<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="data () {
  return {
    list: ['a', 'b', 'c'],
    activeId: 0
  }
},
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code>data () {
  <span class="hljs-class">return </span>{
<span class="hljs-symbol">    list:</span> [<span class="hljs-string">'a'</span>, <span class="hljs-string">'b'</span>, <span class="hljs-string">'c'</span>],
<span class="hljs-symbol">    activeId:</span> <span class="hljs-number">0</span>
  }
},
</code></pre>
<hr>
<h4>camelCase vs. kebab-case</h4>
<p>HTML 特性不区分大小写。名字形式为 camelCase 的 prop 用作特性时，需要转为 kebab-case（短横线隔开）(官网例子)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component('child', {
  // camelCase in JavaScript
  props: ['myMessage'],
  template: '<span>"{{" myMessage "}}"</span>'
})

<!-- kebab-case in HTML -->
<child my-message=&quot;hello!&quot;></child>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml">Vue.component('child', {
  // camelCase in JavaScript
  props: ['myMessage'],
  template: '<span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span></span><span class="hljs-template-variable">"{{" myMessage "}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>'
})

<span class="hljs-comment">&lt;!-- kebab-case in HTML --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">child</span> <span class="hljs-attr">my-message</span>=<span class="hljs-string">"hello!"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">child</span>&gt;</span>
</span></code></pre>
<p>另外props的写法</p>
<p>简写</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="props: ['demo-first', 'demo-second']
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code><span class="hljs-built_in">props</span>: ['<span class="hljs-built_in">demo</span>-<span class="hljs-built_in">first</span>', '<span class="hljs-built_in">demo</span>-<span class="hljs-built_in">second</span>']
</code></pre>
<p>带类型</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="props: {
    'demo-first': Number,
    'demo-second': Number
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code><span class="hljs-built_in">props</span>: {
    '<span class="hljs-built_in">demo</span>-<span class="hljs-built_in">first</span>': Number,
    '<span class="hljs-built_in">demo</span>-<span class="hljs-built_in">second</span>': Number
}
</code></pre>
<p>带多种检查</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="props: {
    'demo-first': {
        type: Number,
        default: 0
    }
    ...
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haskell"><code><span class="hljs-title">props</span>: {
    'demo-first': {
        <span class="hljs-class"><span class="hljs-keyword">type</span>: <span class="hljs-type">Number</span>,</span>
        <span class="hljs-keyword">default</span>: 0
    }
    ...
}
</code></pre>
<p>所以， 当你获取不到props的值的时候，可以先仔细检查拼写是否正确。</p>
<hr>
<h4>传值与传字面量</h4>
<p>在vue的组件中传递数据，如果是单纯传递字面量，如</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<hello result=&quot;success&quot;></hello>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">hello</span> <span class="hljs-attr">result</span>=<span class="hljs-string">"success"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">hello</span>&gt;</span>
</code></pre>
<p>那么在hello中获取的props result的值就是“success”，如果希望进行值传递，需要在指令前加 ':' 冒号，这样，父层的success的值改变，hello的值也会跟着改变。</p>
<hr>
<h4>转场动画</h4>
<p>在vue中有个很好用的指令，transition，通过它我们可以实现自定义的router切换中的动画</p>
<p>方法就是在</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<router-view transition=&quot;fade&quot;></router-view>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">router-view</span> <span class="hljs-attr">transition</span>=<span class="hljs-string">"fade"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>
</code></pre>
<p>加入自定义的class fade-transition , fade-leave , fade-enter即可。</p>
<hr>
<h4>数据驱动 vs dom</h4>
<p>vue是基于数据驱动的，最好不要直接去修改dom（虽然官方给出了这样的方法）</p>
<hr>
<h4>v-cloak</h4>
<p>如果出现"{{""}}"的短暂出现的情况，可以通过添加v-cloak来处理。</p>
<p>这个指令保持在元素上直到关联实例结束编译。和 CSS 规则如 [v-cloak] { display: none } 一起用时，这个指令可以隐藏未编译的 Mustache 标签直到实例准备完毕。</p>
<hr>
<h4>使用sass</h4>
<p>首先安装依赖</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i node-sass sass-loader -D
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>npm i <span class="hljs-keyword">node</span><span class="hljs-title">-sass</span> sass-loader -D
</code></pre>
<p>然后在vue的style里添加</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style lang=&quot;scss&quot; scoped>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"scss"</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="undefined">
</span></code></pre>
<p>注意：是"scss"!然后重启webpack，就ok啦</p>
<h4>vue片段</h4>
<p>有时候我们会看到这个警告<br><span class="img-wrap"><img data-src="/img/bVxHyr" src="https://static.alili.tech/img/bVxHyr" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>这是因为我们的template中，出现了片段，那么这个片段到底是什么gui呢？</p>
<p>我们可以理解为是一段没有根的dom元素，官网上是这么描述的</p>
<p>下面几种情况会让实例变成一个片断实例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="模板包含多个顶级元素。
模板只包含普通文本。
模板只包含其它组件（其它组件可能是一个片段实例）。
模板只包含一个元素指令，如 <partial> 或 vue-router 的 <router-view>。
模板根节点有一个流程控制指令，如 v-if 或 v-for。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>模板包含多个顶级元素。
模板只包含普通文本。
模板只包含其它组件（其它组件可能是一个片段实例）。
模板只包含一个元素指令，如 <span class="hljs-symbol">&lt;partial&gt;</span> 或 vue-router 的 <span class="hljs-symbol">&lt;router-view&gt;</span>。
模板根节点有一个流程控制指令，如 v-<span class="hljs-keyword">if</span> 或 v-<span class="hljs-keyword">for</span>。
</code></pre>
<p>vue建议我们为片段添加一个根节点，这样方便传递props和过渡效果，也可以让dom更好的溯源，所以，解决方法很简单，在template的内部套一层div即可，像这样</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 片段

<template>
  <h1>hello</h1>
  <h2>world</h2>
</template>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code><span class="hljs-comment">// 片段</span>

<span class="hljs-params">&lt;template&gt;</span>
  <span class="hljs-params">&lt;h1&gt;</span>hello<span class="hljs-params">&lt;/h1&gt;</span>
  <span class="hljs-params">&lt;h2&gt;</span>world<span class="hljs-params">&lt;/h2&gt;</span>
<span class="hljs-params">&lt;/template&gt;</span>
</code></pre>
<hr>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 套div

<template>
  <div>
    <h1>hello</h1>
    <h2>world</h2>
  </div>      
</template>

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code><span class="hljs-comment">// 套div</span>

<span class="hljs-params">&lt;template&gt;</span>
  <span class="hljs-params">&lt;div&gt;</span>
    <span class="hljs-params">&lt;h1&gt;</span>hello<span class="hljs-params">&lt;/h1&gt;</span>
    <span class="hljs-params">&lt;h2&gt;</span>world<span class="hljs-params">&lt;/h2&gt;</span>
  <span class="hljs-params">&lt;/div&gt;</span>      
<span class="hljs-params">&lt;/template&gt;</span>

</code></pre>
<h4>引用图片</h4>
<p>首先，如果使用的是img标签那么可以这样</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="data () {
    return {
        img: require('path/to/your/source')
    }
}

然后在template中

<img :src=&quot;img&quot; />
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>data () {
    return {
        <span class="hljs-selector-tag">img</span>: require(<span class="hljs-string">'path/to/your/source'</span>)
    }
}

然后在template中

&lt;<span class="hljs-selector-tag">img</span> :src=<span class="hljs-string">"img"</span> /&gt;
</code></pre>
<p>如果使用的是背景图的方式，那么</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="可以这样

data () {
    return {
        img: require('path/to/your/source')
    }
}

<div :style=&quot;{backgroundImage: 'url(' + img + ')'}&quot;></div>

或者直接在css中定义

background-image: url('path/to/your/source');
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ruby"><code>可以这样

data () {
    <span class="hljs-keyword">return</span> {
        <span class="hljs-symbol">img:</span> <span class="hljs-keyword">require</span>(<span class="hljs-string">'path/to/your/source'</span>)
    }
}

&lt;div <span class="hljs-symbol">:style=<span class="hljs-string">"{backgroundImage: 'url(' + img + ')'}"</span>&gt;&lt;/div&gt;</span>

或者直接在css中定义

background-<span class="hljs-symbol">image:</span> url(<span class="hljs-string">'path/to/your/source'</span>);
</code></pre>
<p>如果你的webpack配置了html-loader，那么久很方便了，只在img的src中写入相对路径</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<img src=&quot;./images/logo.png&quot; />
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>&lt;<span class="hljs-selector-tag">img</span> src=<span class="hljs-string">"./images/logo.png"</span> /&gt;
</code></pre>
<p>轻松又愉快</p>
<hr>
<p>暂时想到这么多，如果有新的内容会及时的更新的。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue开发中的常见问题

## 原文链接
[https://segmentfault.com/a/1190000005034270](https://segmentfault.com/a/1190000005034270)

