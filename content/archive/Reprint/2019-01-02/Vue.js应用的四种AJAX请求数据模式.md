---
title: 'Vue.js应用的四种AJAX请求数据模式' 
date: 2019-01-02 2:30:09
hidden: true
slug: i4lssa0qiu8
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">Vue.js应用的四种AJAX请求数据模式</h2>
<blockquote><p>翻译原文出处：<a href="https://vuejsdevelopers.com/2017/08/28/vue-js-ajax-recipes/" rel="nofollow noreferrer" target="_blank">4 AJAX Patterns For Vue.js Apps</a>  <br>鄙人翻译略差，别见笑。</p></blockquote>
<p>如果您闲的没事干去两个Vue.js开发人员：“在Vue应用中使用AJAX的正确姿势是咋样的？”，您将会得到三种或更多的不同回答。</p>
<p>Vue.js官方没有提供实现AJAX的指定方式，并且有许多不同的设计模式可以被有效地使用。每个都有自己的利弊，应根据要求进行判断。你甚至可以同时使用几个！</p>
<p>在本文中，我将向您展示您可以在Vue应用程序中实现AJAX的四个位置：</p>
<p>1、<a>根实例</a><br>2、<a>组件Components</a><br>3、<a>Vuex actions</a><br>4、<a>路线导航卫士</a><br>5、<a>另加：奖金模式</a></p>
<p>我将解释每个方法，举一个例子，并涵盖利弊。</p>
<h3 id="articleHeader1">一、根实例</h3>
<p>在使用Vue框架时，您可以一开始就从根实例发出所有AJAX请求，即写好所有的数据请求，并将所有状态存储在该实例中。如果任何子组件需要数据，它将会顺着<code>props</code>中传下来。如果子组件需要刷新数据，则将使用自定义事件来提示根实例请求它。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
new Vue({
  data: {
    message: ''
  },
  methods: {
    refreshMessage(resource) {
      this.$http.get('/message').then((response) {
        this.message = response.data.message;
      });
    }
  }
})

Vue.component('sub-component', {
  template: '<div>"{{" message "}}"</div>',
  props: [ 'message' ]
  methods: {
    refreshMessage() {
      this.$emit('refreshMessage');
    }
  }
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">
<span class="hljs-keyword">new</span> Vue({
  <span class="hljs-attr">data</span>: {
    <span class="hljs-attr">message</span>: <span class="hljs-string">''</span>
  },
  <span class="hljs-attr">methods</span>: {
    refreshMessage(resource) {
      <span class="hljs-keyword">this</span>.$http.get(<span class="hljs-string">'/message'</span>).then((response) {
        <span class="hljs-keyword">this</span>.message = response.data.message;
      });
    }
  }
})

Vue.component(<span class="hljs-string">'sub-component'</span>, {
  <span class="hljs-attr">template</span>: <span class="hljs-string">'&lt;div&gt;"{{" message "}}"&lt;/div&gt;'</span>,
  <span class="hljs-attr">props</span>: [ <span class="hljs-string">'message'</span> ]
  methods: {
    refreshMessage() {
      <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">'refreshMessage'</span>);
    }
  }
});
</code></pre>
<p><strong>优点</strong></p>
<ul>
<li>将所有的AJAX逻辑和数据保存在一个地方。</li>
<li>保持您的组件“独立性”，以便它们可以更加专注于展示。</li>
</ul>
<p><strong>缺点</strong></p>
<p>随着您的应用扩展，需要书写大量的“props”和自定义事件。</p>
<h3 id="articleHeader2">二、组件Components</h3>
<p>在使用Vue框架时，组件负责管理自己的AJAX请求和独立状态。实际上，您可能需要创建几个“容器组件”来管理本地组“展示组件”的数据。</p>
<p>例如，filter-list可能是一个容器组件包装filter-input和filter-reset，它们作为展示组件。filter-list将包含AJAX数据逻辑，并且将管理该组中所有组件的数据，通过<code>props</code>和事件进行通信。</p>
<blockquote><p>请参阅<a href="http://www.jianshu.com/p/6fa2b21f5df3" rel="nofollow noreferrer" target="_blank">译文《容器组件和展示组件》原作者：Dan Abramov</a>，可以更好地深入了解这种模式。</p></blockquote>
<p>为了简化此架构的实现，您可以将任何AJAX逻辑抽象为混合，然后在组件中使用mixin使其成为AJAX。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
let mixin = {
  methods: {
    callAJAX(resource) {
      //...
    }
  }
};

Vue.component('container-comp', {
  // No meaningful template, I just manage data for my children
  template: '<div><presentation-comp :mydata=&quot;mydata&quot;></presentation-comp></div>', 
  mixins: [ myMixin ],
  data() {
    return {
     //... 
    }
  },

});

Vue.component('presentation-comp', {
  template: '<div>I just show stuff like "{{" mydata "}}"</div>',
  props: [ 'mydata' ]
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">
<span class="hljs-keyword">let</span> mixin = {
  <span class="hljs-attr">methods</span>: {
    callAJAX(resource) {
      <span class="hljs-comment">//...</span>
    }
  }
};

Vue.component(<span class="hljs-string">'container-comp'</span>, {
  <span class="hljs-comment">// No meaningful template, I just manage data for my children</span>
  template: <span class="hljs-string">'&lt;div&gt;&lt;presentation-comp :mydata="mydata"&gt;&lt;/presentation-comp&gt;&lt;/div&gt;'</span>, 
  <span class="hljs-attr">mixins</span>: [ myMixin ],
  data() {
    <span class="hljs-keyword">return</span> {
     <span class="hljs-comment">//... </span>
    }
  },

});

Vue.component(<span class="hljs-string">'presentation-comp'</span>, {
  <span class="hljs-attr">template</span>: <span class="hljs-string">'&lt;div&gt;I just show stuff like "{{" mydata "}}"&lt;/div&gt;'</span>,
  <span class="hljs-attr">props</span>: [ <span class="hljs-string">'mydata'</span> ]
});
</code></pre>
<p><strong>优点</strong></p>
<ul>
<li>保持组件脱钩和可重用。</li>
<li>在任何时候和任何地点都可以获取数据。</li>
</ul>
<p><strong>缺点</strong></p>
<ul>
<li>与其他组件或组件组不通信数据。</li>
<li>组件可能会产生很多累赘的职责和重复的功能。</li>
</ul>
<h3 id="articleHeader3">三、Vuex actions</h3>
<p>在使用Vue框架时，您可以在Vuex <code>store</code>中管理状态和AJAX逻辑; 组件可以通过<code>dispatch</code>方法操作来请求新数据(store.dispatch将用于触发actions动作)。</p>
<p>如果您要使用此模式，最好从您的<code>action</code>中返回一个<code>promise</code>，以便对AJAX请求的解析做出反应，例如隐藏加载微调器，重新启用按钮等。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
store = new Vuex.Store({
  state: {
    message: ''
  },
  mutations: {
    updateMessage(state, payload) {
      state.message = payload
    }
  },
  actions: {
    refreshMessage(context) {
      return new Promise((resolve) => {
        this.$http.get('...').then((response) => {
          context.commit('updateMessage', response.data.message);
          resolve();
        });
      });
    }
  }
});

Vue.component('my-component', {
  template: '<div>"{{" message "}}"</div>',
  methods: {
    refreshMessage() {
      this.$store.dispatch('refeshMessage').then(() => {
        // do stuff
      });
    }
  },
  computed: {
    message: { return this.$store.state.message; }
  }
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">
store = <span class="hljs-keyword">new</span> Vuex.Store({
  <span class="hljs-attr">state</span>: {
    <span class="hljs-attr">message</span>: <span class="hljs-string">''</span>
  },
  <span class="hljs-attr">mutations</span>: {
    updateMessage(state, payload) {
      state.message = payload
    }
  },
  <span class="hljs-attr">actions</span>: {
    refreshMessage(context) {
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve</span>) =&gt;</span> {
        <span class="hljs-keyword">this</span>.$http.get(<span class="hljs-string">'...'</span>).then(<span class="hljs-function">(<span class="hljs-params">response</span>) =&gt;</span> {
          context.commit(<span class="hljs-string">'updateMessage'</span>, response.data.message);
          resolve();
        });
      });
    }
  }
});

Vue.component(<span class="hljs-string">'my-component'</span>, {
  <span class="hljs-attr">template</span>: <span class="hljs-string">'&lt;div&gt;"{{" message "}}"&lt;/div&gt;'</span>,
  <span class="hljs-attr">methods</span>: {
    refreshMessage() {
      <span class="hljs-keyword">this</span>.$store.dispatch(<span class="hljs-string">'refeshMessage'</span>).then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        <span class="hljs-comment">// do stuff</span>
      });
    }
  },
  <span class="hljs-attr">computed</span>: {
    <span class="hljs-attr">message</span>: { <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.$store.state.message; }
  }
});
</code></pre>
<p>本人比较喜欢这种数据请求模式，因为它很好地分离了你的状态和表现的逻辑。如果你正在使用Vuex，这是要走的路。如果你不使用Vuex，这模式可能是一个很好的理由。</p>
<p><strong>优点</strong></p>
<ul><li>所有的根组件架构的优点，不需要<code>props </code>和自定义事件。</li></ul>
<p><strong>缺点</strong></p>
<ul><li>增加Vuex的开销。</li></ul>
<h3 id="articleHeader4">四、路线导航卫士</h3>
<p>在使用Vue框架时，您的应用程序分为多个页面，当路由更变时，将抓取页面及其子组件所需的所有数据。</p>
<p>这种方法的主要优点是它真正简化了您的UI。如果组件独立获取自己的数据，则当组件数据以任意顺序填充时，页面将不可预测地重新呈现。</p>
<p>实现这一点的一个整洁的方法是在您的服务器上为每个页面创建端点，例如/about，/contact与您的应用程序中的路由名称相匹配。然后，您可以实现一个通用beforeRouteEnter钩子，将所有数据属性合并到页面组件的数据中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
import axios from 'axios';

router.beforeRouteEnter((to, from, next) => {
  axios.get(`/api${to.path}`).then(({ data }) => {
    next(vm => Object.assign(vm.$data, data))
  });
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">
<span class="hljs-keyword">import</span> axios <span class="hljs-keyword">from</span> <span class="hljs-string">'axios'</span>;

router.beforeRouteEnter(<span class="hljs-function">(<span class="hljs-params">to, <span class="hljs-keyword">from</span>, next</span>) =&gt;</span> {
  axios.get(<span class="hljs-string">`/api<span class="hljs-subst">${to.path}</span>`</span>).then(<span class="hljs-function">(<span class="hljs-params">{ data }</span>) =&gt;</span> {
    next(<span class="hljs-function"><span class="hljs-params">vm</span> =&gt;</span> <span class="hljs-built_in">Object</span>.assign(vm.$data, data))
  });
})
</code></pre>
<p><strong>优点</strong></p>
<ul><li>使UI更可预测。</li></ul>
<p><strong>缺点</strong></p>
<ul>
<li>总体来说，直到所有数据准备就绪了 ,页面才能呈现。</li>
<li>如果不使用路线，这模式没有太多的帮助。</li>
</ul>
<h3 id="articleHeader5">奖金模式：将第一个AJAX调用的服务器渲染到页面中</h3>
<p>建议在初始页面加载时使用AJAX来检索应用程序状态，因为它需要额外的往返服务器，这将延迟应用程序的渲染。</p>
<p>相反，将初始应用程序状态注入HTML页面的内联脚本中，以便应用程序作为全局变量在需要时可用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<html>
...
<head>
  ...
  <script type=&quot;text/javascript&quot;>
   window.__INITIAL_STATE__ = '{ &quot;data&quot;: [ ... ] }';
  </script>
</head>
<body>
  <div id=&quot;app&quot;></div>
</body>
</html>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
...
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  ...
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
   <span class="hljs-built_in">window</span>.__INITIAL_STATE__ = <span class="hljs-string">'{ "data": [ ... ] }'</span>;
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</code></pre>
<p>然后，AJAX可以更适合地用于后续数据提取。</p>
<p>如果您有兴趣了解有关此架构的更多信息，请参阅作者的文章“<a href="https://vuejsdevelopers.com/2017/08/06/vue-js-laravel-full-stack-ajax/" rel="nofollow noreferrer" target="_blank">避免此全面堆栈Vue / Laravel应用程序中的常见反模式</a>”。</p>
<hr>
<p>本文原地址：<a href="https://github.com/itemsets/vue2/issues/13" rel="nofollow noreferrer" target="_blank">https://github.com/itemsets/v...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue.js应用的四种AJAX请求数据模式

## 原文链接
[https://segmentfault.com/a/1190000010902115](https://segmentfault.com/a/1190000010902115)

