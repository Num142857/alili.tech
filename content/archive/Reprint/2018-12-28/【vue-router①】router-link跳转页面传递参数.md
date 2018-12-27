---
title: '【vue-router①】router-link跳转页面传递参数' 
date: 2018-12-28 2:30:10
hidden: true
slug: bs5vdp88f56
categories: [reprint]
---

{{< raw >}}

                    
<p>在vue项目中，往往会遇到这样的情况，就是要实现在一个循环列表中，点击其中一条跳转到下个页面，然后将这一条的相关数据带到下个页面中显示，这是个循环列表，无论点哪一条都是跳到相同的页面，只是填的数据不一样，这个时候就需要实现跳转的时候一起把参数携带过去。</p>
<p>1、我在项目中想要点击v-for的&lt;li&gt;，然后跳到下个页面的表格，顺带将参数传递过去。如下图：</p>
<p><span class="img-wrap"><img data-src="/img/bVXhIy?w=604&amp;h=490" src="https://static.alili.tech/img/bVXhIy?w=604&amp;h=490" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>这里实现的是第一个组件跳转到第二个组件的时候将待办任务的id传递过去，第二个组件接收id后提交给后台请求列表的数据。实现如下：<br>第一个组件里：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div class=&quot;template&quot;>
    <!--待办任务-->
    <ul>
      <li v-for=&quot;(work_task,index) in tasks&quot;>
      <!--使用v-bind动态绑定id传递给目标路径-->
        <router-link tag=&quot;a&quot; :to=&quot;{path:'/workTaskEdit',query{id:work_task.id"}}"&quot;>
          <div class=&quot;mui-navigate-right&quot;>
            <span>"{{"index+1"}}".</span>
            <span>"{{"work_task.title"}}"</span>
            <span>
              "{{"work_task.schedulel"}}"%
            </span>
          </div>
        </router-link>
      </li>
    </ul>
    
  </div>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"template"</span>&gt;</span>
    <span class="hljs-comment">&lt;!--待办任务--&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"(work_task,index) in tasks"</span>&gt;</span>
      <span class="hljs-comment">&lt;!--使用v-bind动态绑定id传递给目标路径--&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">tag</span>=<span class="hljs-string">"a"</span> <span class="hljs-attr">:to</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">{path:'/workTaskEdit',query{id:work_task.id}</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">}"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mui-navigate-right"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span></span><span class="hljs-template-variable">"{{"index+1}</span><span class="xml">}.<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span></span><span class="hljs-template-variable">"{{"work_task.title}</span><span class="xml">}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>
              </span><span class="hljs-template-variable">"{{"work_task.schedulel}</span><span class="xml">}%
            <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></span></code></pre>
<p>因为是根据每个li的不同id进行不同的传参，所以需要使用v-bind动态绑定to，然后将要传递的work_task.id重新命名为id存入query中一起传给目标组件里。<br>在目标组件里接收id，只需要在created()钩子中接收即可，实现如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script>
  export default {
    data() {
      return {
      }
    },
    created() {
      this.id = this.$route.query.id;//获取上个页面传递的id,在下面获取数据的时候先提交id
    },
  }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    data() {
      <span class="hljs-keyword">return</span> {
      }
    },
    created() {
      <span class="hljs-keyword">this</span>.id = <span class="hljs-keyword">this</span>.$route.query.id;<span class="hljs-comment">//获取上个页面传递的id,在下面获取数据的时候先提交id</span>
    },
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>这样就能接收id，进行相应操作了。</p>
<p>2、上面实现的是带一个参数，重点代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<router-link tag=&quot;a&quot; :to=&quot;{path:'/目标路径',query{id:work_task.id"}}"&quot;></router-link>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code style="word-break: break-word; white-space: initial;">&lt;router-link tag=<span class="hljs-string">"a"</span> <span class="hljs-symbol">:to=<span class="hljs-string">"{path:'/目标路径',query{id:work_task.id"}}""</span>&gt;&lt;/router-link&gt;</span></code></pre>
<p>同理，也可实现携带多个参数，用逗号隔开即可，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<router-link tag=&quot;a&quot; :to=&quot;{path:'/目标路径',query{param1:当前param1,
                                                param2:当前param2,
                                                param3:当前param3,
                                                ...}
                          }&quot;>
</router-link>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">tag</span>=<span class="hljs-string">"a"</span> <span class="hljs-attr">:to</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">{path:'/目标路径',query{param1:当前param1,
                                                param2:当前param2,
                                                param3:当前param3,
                                                ...}</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">
                          }"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span></span></code></pre>
<p>3、有时候，我们要传递一个数组，数组都是带着多个参数的，我们可以使用上面的写法，但是呢，当数组参数过多的时候，用上面的写法会显得太过于麻烦和累赘，就需要使用下面的方法。<br>比如用上面的例子，我不止传work_task的id，我要传整个work_task，里面就有id，title，schedulel等等许多参数，这时候的写法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<router-link tag=&quot;a&quot; :to=&quot;{path:'/目标路径',query{arry:work_task"}}"&quot;></router-link>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code style="word-break: break-word; white-space: initial;">&lt;router-link tag=<span class="hljs-string">"a"</span> <span class="hljs-symbol">:to=<span class="hljs-string">"{path:'/目标路径',query{arry:work_task"}}""</span>&gt;&lt;/router-link&gt;</span></code></pre>
<p>上面整体写法看起来是没区别的，但本质就差很多了，实际传的arry就是work_task这一整个数组的参数了，在下一个目标组件中接收基本也是一样的写法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script>
  export default {
    data() {
      return {
          workTask:[],
      }
    },
    created() {
    //这边接收上个组件传递过来的arry数组，赋值给data中定义的workTask
      this.workTask = this.$route.query.arry;
    },
  }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    data() {
      <span class="hljs-keyword">return</span> {
          <span class="hljs-attr">workTask</span>:[],
      }
    },
    created() {
    <span class="hljs-comment">//这边接收上个组件传递过来的arry数组，赋值给data中定义的workTask</span>
      <span class="hljs-keyword">this</span>.workTask = <span class="hljs-keyword">this</span>.$route.query.arry;
    },
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>这样就接收完毕，就可以在这个页面使用workTask数组里面的参数了。</p>
<p>觉得有帮助的朋友们请赏赐在下一个赞嘛！！！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【vue-router①】router-link跳转页面传递参数

## 原文链接
[https://segmentfault.com/a/1190000011707883](https://segmentfault.com/a/1190000011707883)

