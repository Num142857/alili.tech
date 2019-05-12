---
title: '使用Vue渲染可配置表单--记一次问卷平台项目' 
date: 2019-01-16 2:30:08
hidden: true
slug: xn3ux2gca1h
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>
<p>近几天来了个紧急项目，想要做一个内部版本的问卷星。相当于可以编辑问卷并提供问卷展示，数据统计的这么一个平台。整个项目耗时不长，本着积淀和积累的原则，将过程中的思路和收获进行一下沉淀。由于公司原因，代码尚未开源。</p>
<p>不过沉淀了个动态配置表单的尝试： <a href="https://github.com/callmedadaxin/custom-form" rel="nofollow noreferrer" target="_blank">github</a>，用于后台快速开发表单等需求，搭配element-ui进行使用，同时可通过后台进行配置生成表单等。</p>
</blockquote>
<h2 id="articleHeader0">功能和效果</h2>
<p>问卷编辑功能大概需要一下几点：</p>
<ul>
<li><p>根据不同题型添加问题</p></li>
<li><p>区分问题的必选性</p></li>
<li><p>问题排序，删除，复制功能</p></li>
<li><p>选择题的选项编辑，排序，删除功能</p></li>
<li><p>问卷渲染</p></li>
<li><p>生成问卷二维码</p></li>
</ul>
<h3 id="articleHeader1">效果</h3>
<p><span class="img-wrap"><img data-src="http://n1.c.imoxiu.com/4d7095bb9211da94bf171ba47cdce736d95cd9fb" src="https://static.alili.techhttp://n1.c.imoxiu.com/4d7095bb9211da94bf171ba47cdce736d95cd9fb" alt="图片" title="图片" style="cursor: pointer; display: inline;"></span><br>or<br><a href="http://n1.c.imoxiu.com/4d7095bb9211da94bf171ba47cdce736d95cd9fb" rel="nofollow noreferrer" target="_blank">预览</a></p>
<h2 id="articleHeader2">技术方案</h2>
<h3 id="articleHeader3">Vue + VueRouter + ElementUI</h3>
<p>使用element进行后台以及问卷表单渲染是再合适不过的了。极大的节省了需要进行表单样式修改的时间，同时，让动态渲染表单成为一件可能且容易的事情。</p>
<h3 id="articleHeader4">表单动态渲染</h3>
<p>刚好在项目之前，有过一次动态配置表单的尝试： <a href="https://github.com/callmedadaxin/custom-form" rel="nofollow noreferrer" target="_blank">github</a> 通过字段自动生成表单及验证。但此时的数据格式相当于在后台已经确定好的，针对可变切频繁变动的表单结构，确定数据结构如下：</p>
<h4>数据结构</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="data: {
  title: 问卷名称
  desc: 问卷描述
  questionList: [
    {
      type: 问题类型,
      label: 问题描述,
      required: 必选性,
      options: [ //选项
        {
          label: 选项内容,
          value: 选项值
        }
        ...
      ] 
    }
    ...
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code><span class="hljs-symbol">data:</span> {
<span class="hljs-symbol">  title:</span> 问卷名称
<span class="hljs-symbol">  desc:</span> 问卷描述
<span class="hljs-symbol">  questionList:</span> [
    {
<span class="hljs-symbol">      type:</span> 问题类型,
<span class="hljs-symbol">      label:</span> 问题描述,
<span class="hljs-symbol">      required:</span> 必选性,
<span class="hljs-symbol">      options:</span> [ <span class="hljs-comment">//选项</span>
        {
<span class="hljs-symbol">          label:</span> 选项内容,
<span class="hljs-symbol">          value:</span> 选项值
        }
        ...
      ] 
    }
    ...
  ]
}</code></pre>
<h4>表单渲染</h4>
<p>最简单的 v-if 模式来满足我们的需求，之前有想过使用is进行渲染，但是不同表单配置项相差很大，很难进行通用。因此采用类似以下这种方式，配置详情可见element官网。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 填空题 -->
<div v-if=&quot;question.type === 'input' || question.type === 'textarea'&quot; class=&quot;question-content-wrap&quot;>
  <el-row>
    <el-col :xs=&quot;8&quot; :sm=&quot;10&quot;>
      <el-input
        v-model=&quot;question.value&quot;
        :autosize=&quot;{ minRows: 2, maxRows: 4}&quot;
        class=&quot;question-input&quot;
        :type=&quot;question.type&quot;>
      </el-input>
    </el-col>
  </el-row>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 填空题 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"question.type === 'input' || question.type === 'textarea'"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"question-content-wrap"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">el-row</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">el-col</span> <span class="hljs-attr">:xs</span>=<span class="hljs-string">"8"</span> <span class="hljs-attr">:sm</span>=<span class="hljs-string">"10"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">el-input</span>
        <span class="hljs-attr">v-model</span>=<span class="hljs-string">"question.value"</span>
        <span class="hljs-attr">:autosize</span>=<span class="hljs-string">"{ minRows: 2, maxRows: 4}"</span>
        <span class="hljs-attr">class</span>=<span class="hljs-string">"question-input"</span>
        <span class="hljs-attr">:type</span>=<span class="hljs-string">"question.type"</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">el-input</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">el-col</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">el-row</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>很简单就可以将表单根据配置渲染出来啦：</p>
<p><span class="img-wrap"><img data-src="/img/bVMhPj" src="https://static.alili.tech/img/bVMhPj" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h2 id="articleHeader5">实现过程</h2>
<p>思路理清楚了，就可以动手实践啦！</p>
<h3 id="articleHeader6">添加问题</h3>
<p>首先，我需要各个问题的基本配置模板，以便于每次直接向questionList中直接添加相应的内容，为了方便存储及使用，将其放在store中,当</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const state = {
  baseSet: {
    radio: {
      type: 'radio',
      label: '单选题',
      required: true,
      options: [...]
    },
    checkbox: ...
    input: ...
  }
}

//添加问题时，直接push进数组即可
const mutations = [
  //添加问题
  ADDQUESTIONLIST(state, data) {
    state.qss.questionList.push(data);
  }
]

//添加问题方法
addQuestion(type) {
  this.addQuestionList(this. baseSet[type]);
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> state = {
  <span class="hljs-attr">baseSet</span>: {
    <span class="hljs-attr">radio</span>: {
      <span class="hljs-attr">type</span>: <span class="hljs-string">'radio'</span>,
      <span class="hljs-attr">label</span>: <span class="hljs-string">'单选题'</span>,
      <span class="hljs-attr">required</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">options</span>: [...]
    },
    <span class="hljs-attr">checkbox</span>: ...
    input: ...
  }
}

<span class="hljs-comment">//添加问题时，直接push进数组即可</span>
<span class="hljs-keyword">const</span> mutations = [
  <span class="hljs-comment">//添加问题</span>
  ADDQUESTIONLIST(state, data) {
    state.qss.questionList.push(data);
  }
]

<span class="hljs-comment">//添加问题方法</span>
addQuestion(type) {
  <span class="hljs-keyword">this</span>.addQuestionList(<span class="hljs-keyword">this</span>. baseSet[type]);
},</code></pre>
<h4>注意</h4>
<p>使用getter获取到我们对应的baseSet对象时，此对象为引用类型，并且，对象的属性，如options也同样为引用类型。我们若不进行处理，则会出现，创建两个相同类型的问题时，对其中某一问题选项进行修改，另一个选项也会进行修改。 因此我们需要对base对象进行<strong><em>简单的拷贝</em></strong>（只进行到数组内容即可）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export const clone = function(obj) {
  var newObj = {};

  for (let key in obj) {
    var target = obj[key];

    if (Object.prototype.toString.call(target) === &quot;[object Object]&quot;) {
      newObj[key] = clone(target);
    } else {
      if (Object.prototype.toString.call(target) === &quot;[object Array]&quot;) {
        newObj[key] = target.slice(0);
      } else {
        newObj[key] = target;
      }
    }
  }

  return newObj;
}

addQuestion(type) {
  this.addQuestionList(clone(this. baseSet[type]));
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> clone = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">obj</span>) </span>{
  <span class="hljs-keyword">var</span> newObj = {};

  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> key <span class="hljs-keyword">in</span> obj) {
    <span class="hljs-keyword">var</span> target = obj[key];

    <span class="hljs-keyword">if</span> (<span class="hljs-built_in">Object</span>.prototype.toString.call(target) === <span class="hljs-string">"[object Object]"</span>) {
      newObj[key] = clone(target);
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">if</span> (<span class="hljs-built_in">Object</span>.prototype.toString.call(target) === <span class="hljs-string">"[object Array]"</span>) {
        newObj[key] = target.slice(<span class="hljs-number">0</span>);
      } <span class="hljs-keyword">else</span> {
        newObj[key] = target;
      }
    }
  }

  <span class="hljs-keyword">return</span> newObj;
}

addQuestion(type) {
  <span class="hljs-keyword">this</span>.addQuestionList(clone(<span class="hljs-keyword">this</span>. baseSet[type]));
},</code></pre>
<h3 id="articleHeader7">排序/删除/复制</h3>
<p>这三点基本就是简单的数组操作啦，此时的问题数据依旧是引用类型，直接对引用数组进行操作即可。简单的上移，下移排序，使用splice即可实现。其实这三点都是用splice实现的哈。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="deleteQuestion(index) {
  this.data.questionList.splice(index, 1);
},

copyQuestion(index) {
  let list = this.data.questionList;
  //复制时，同样需要对引用对象进行深拷贝
  list.splice(index, 1, list[index], clone(list[index]));
},

moveQuestion(index, direct) {
  let list = this.data.questionList;

  if(direct === 'up') {
    if(index < 1) {
      this.$toast('已经是第一项！');
      return;
    }

    list.splice(index - 1, 2, list[index], list[index - 1]);
  } else {
    if(index >= list.length - 1) {
      this.$toast('已经是最后一项！');
      return;
    }

    list.splice(index, 2, list[index + 1], list[index]);
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs axapta"><code>deleteQuestion(<span class="hljs-keyword">index</span>) {
  <span class="hljs-keyword">this</span>.data.questionList.splice(<span class="hljs-keyword">index</span>, <span class="hljs-number">1</span>);
},

copyQuestion(<span class="hljs-keyword">index</span>) {
  let list = <span class="hljs-keyword">this</span>.data.questionList;
  <span class="hljs-comment">//复制时，同样需要对引用对象进行深拷贝</span>
  list.splice(<span class="hljs-keyword">index</span>, <span class="hljs-number">1</span>, list[<span class="hljs-keyword">index</span>], clone(list[<span class="hljs-keyword">index</span>]));
},

moveQuestion(<span class="hljs-keyword">index</span>, direct) {
  let list = <span class="hljs-keyword">this</span>.data.questionList;

  <span class="hljs-keyword">if</span>(direct === <span class="hljs-string">'up'</span>) {
    <span class="hljs-keyword">if</span>(<span class="hljs-keyword">index</span> &lt; <span class="hljs-number">1</span>) {
      <span class="hljs-keyword">this</span>.$toast(<span class="hljs-string">'已经是第一项！'</span>);
      <span class="hljs-keyword">return</span>;
    }

    list.splice(<span class="hljs-keyword">index</span> - <span class="hljs-number">1</span>, <span class="hljs-number">2</span>, list[<span class="hljs-keyword">index</span>], list[<span class="hljs-keyword">index</span> - <span class="hljs-number">1</span>]);
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">if</span>(<span class="hljs-keyword">index</span> &gt;= list.length - <span class="hljs-number">1</span>) {
      <span class="hljs-keyword">this</span>.$toast(<span class="hljs-string">'已经是最后一项！'</span>);
      <span class="hljs-keyword">return</span>;
    }

    list.splice(<span class="hljs-keyword">index</span>, <span class="hljs-number">2</span>, list[<span class="hljs-keyword">index</span> + <span class="hljs-number">1</span>], list[<span class="hljs-keyword">index</span>]);
  }
}</code></pre>
<h3 id="articleHeader8">生成二维码</h3>
<p>使用<a href="https://github.com/davidshimjs/qrcodejs" rel="nofollow noreferrer" target="_blank">qrcode.js</a>,感谢大佬们为小辈们造出这么多好用的轮子，让我们站在巨人的肩膀上前行！</p>
<h2 id="articleHeader9">其他点</h2>
<h3 id="articleHeader10">对于Vuex,使用computed获取getters or state,如何配合v-model使用？</h3>
<p>我们都知道，针对Vue2.0后，使用computed获取getters or state，而针对计算属性，我们是无法进行写操作的，像这样</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="computed: {
  ...mapState({
    qss: state => state.qss,
    base: state => state.base
  })
},

//以下代码是无效的
this.qss = 2;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">computed: {
  ...mapState({
    <span class="hljs-attr">qss</span>: <span class="hljs-function"><span class="hljs-params">state</span> =&gt;</span> state.qss,
    <span class="hljs-attr">base</span>: <span class="hljs-function"><span class="hljs-params">state</span> =&gt;</span> state.base
  })
},

<span class="hljs-comment">//以下代码是无效的</span>
<span class="hljs-keyword">this</span>.qss = <span class="hljs-number">2</span>;</code></pre>
<p>因此，我们更无法将qss属性直接绑定在v-model上，很是苦恼。同事的一般处理方式是在data中书写相同的属性，在路由进入时对其进行初始化，当其修改时再写回store。这样写起来未免有点麻烦且不妥当。那么，该如何解决呢？</p>
<p>其实很简单，可以交给父组件呀。</p>
<p>我们常常会听到一个词，<strong><em>单向数据流</em></strong>，大概意思就是让数据单一方向流动，我们只对数据源进行修改，再让数据从数据源依次流动到子组件进行UI渲染。</p>
<p>其实就像我们使用ajax获取数据时，统一交给父组件一样，我们将统一获取到的数据，使用props进行向下分发即可,使用vuex亦是如此。子组件值进行对应值的修改。而针对props，v-model可以很方便的对其进行修改了。当然这些只是我的一点理解，如果有异议，可以一起讨论哈。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用Vue渲染可配置表单--记一次问卷平台项目

## 原文链接
[https://segmentfault.com/a/1190000009085940](https://segmentfault.com/a/1190000009085940)

