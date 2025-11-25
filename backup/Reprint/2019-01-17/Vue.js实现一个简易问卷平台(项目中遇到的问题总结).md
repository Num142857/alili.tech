---
title: 'Vue.js实现一个简易问卷平台(项目中遇到的问题总结)' 
date: 2019-01-17 2:30:25
hidden: true
slug: 7pqxb7oe3ka
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">项目地址</h2>
<ul>
<li><p><a href="https://github.com/Reusjs/QuestionnairePlatform" rel="nofollow noreferrer" target="_blank">源码地址</a></p></li>
<li><p><a href="https://reusjs.github.io/QuestionnairePlatform/#/" rel="nofollow noreferrer" target="_blank">预览地址</a>（没有做响应式，请在电脑上打开）</p></li>
<li><p>使用了我自制的日历组件（初学vue时做的，有些糙）<a href="https://github.com/Reusjs/calendar-plugin" rel="nofollow noreferrer" target="_blank">calendar-input</a></p></li>
</ul>
<h2 id="articleHeader1">任务描述</h2>
<ul>
<li><p><a href="http://7xrp04.com1.z0.glb.clouddn.com/task_4_50_1.png" rel="nofollow noreferrer" target="_blank">参考设计图</a></p></li>
<li><p>实现一个简易版的问卷管理系统，有如下功能：</p></li>
</ul>
<h3 id="articleHeader2">问卷管理列表</h3>
<ul>
<li><p>有一个头部可以显示logo，不需要实现登录等操作</p></li>
<li><p>问卷管理列表页面默认为首页</p></li>
<li><p>有一个表格用于展示所有已创建的问卷</p></li>
<li><p>列表中包括列有：问卷名称，问卷状态（未发布，发布中，已结束），和操作区域（编辑、删除、查看数据）</p></li>
<li><p>问卷状态为未发布时，可以做的操作为编辑、删除、查看问卷</p></li>
<li><p>问卷状态为发布中和已结束时，可以做的操作为查看数据、查看问卷</p></li>
<li><p>表格最左侧有批量选择（多选）的checkbox，多选后，可以进行批量删除功能，checkbox样式用默认即可，不需要按照设计图的样式</p></li>
<li><p>当一个问卷都没有的时候，表格不展现，页面显示大大的新建问卷按钮</p></li>
</ul>
<h3 id="articleHeader3">问卷新建及编辑</h3>
<ul>
<li><p>点击问卷管理列表中的新建按钮后，进入到问卷新建页面</p></li>
<li><p>点击问卷列表中某个问卷行的编辑按钮后，进入到问卷的编辑页面</p></li>
<li><p>新建页面和编辑页面基本相同</p></li>
<li><p>问卷有一个标题字段，点击后可以进入编辑状态</p></li>
<li><p>可以针对问卷中的问题进行增删改操作，每个问卷最少一个问题，最多十个问题</p></li>
<li><p>问题类型包括：单选题、多选题、单行文本题</p></li>
<li><p>可以对所有问题进行位置改变（上移、下移），复用，删除的操作</p></li>
<li><p>最上面的问题没有上移操作，最下面的问题没有下移操作</p></li>
<li><p>点击复用时，在被复用的问题紧接着的下方新增一个和被复用完全一样的问题（包括选项）</p></li>
<li><p>对于单选题和多选题，可以对问题的选项进行增、删、改、排序操作</p></li>
<li><p>文本题可以设定是必填还是非必填的问题</p></li>
<li><p>有一个问卷调查填写截止时间，使用一个日历组件来进行时间的选择，日期选择不能早于当前日期</p></li>
<li><p>保存问卷可以进行问卷的保存</p></li>
<li><p>发布问卷可以使得问卷状态变为发布中的状态</p></li>
<li><p>当点击发布时，如果截止日期早于当前日期，则需要提示修改截止日期</p></li>
</ul>
<h3 id="articleHeader4">删除问卷</h3>
<ul><li><p>在问卷管理列表中点击某个问卷的删除按钮后，弹出一个浮出层，让用户二次确认是否删除该问卷，如果用户点击是，则删除掉该问卷</p></li></ul>
<h3 id="articleHeader5">查看问卷</h3>
<ul>
<li><p>在问卷管理列表中点击查看问卷的按钮后，在新窗口中打开该问卷的页面，该页面是可供用户进行问卷填写的页面，在问卷未发布状态和已结束状态时，问卷提交是无效的。</p></li>
<li><p>该页面在移动端需要进行良好的兼容支持</p></li>
</ul>
<h3 id="articleHeader6">查看数据</h3>
<ul>
<li><p>在问卷管理列表中点击查看数据按钮后，进入到一个数据报告页面，用图表形式呈现各个单选题和多选题的选择情况</p></li>
<li><p>如设计稿中呈现，每一个问题在右侧用某种图表来呈现答题情况，自行选择合适的图表，设计稿中仅为示意，图表样式不需要和设计稿一致。推荐单选题使用饼状图，多选题使用条形图</p></li>
<li><p>文本题用一个百分比图展现有效回答占比即可</p></li>
<li><p>返回按钮点击后返回列表页面</p></li>
<li><p>在项目中尝试模块化的方法及工具</p></li>
<li><p>在项目中尝试CSS预处理工具</p></li>
<li><p>在项目中尝试项目构建、打包工具</p></li>
</ul>
<h2 id="articleHeader7">问题总结</h2>
<h3 id="articleHeader8">全选功能的实现</h3>
<p>首先每个列表项都使用了v-model进行双向数据绑定传递是否被选中状态</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template v-for=&quot;item in qsList&quot;>
  <ul>
    <li><input type=&quot;checkbox&quot; v-model=&quot;item.checked&quot;></li>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"item in qsList"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"checkbox"</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"item.checked"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></code></pre>
<p>然后给全选按钮也用v-model绑定是否全选状态</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<label><input type=&quot;checkbox&quot; id=&quot;all-check&quot; v-model=&quot;selectAll&quot;>全选</label>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code style="word-break: break-word; white-space: initial;">&lt;<span class="hljs-keyword">label</span>&gt;&lt;<span class="hljs-keyword">input</span> <span class="hljs-keyword">type</span>=<span class="hljs-string">"checkbox"</span> id=<span class="hljs-string">"all-check"</span> v-model=<span class="hljs-string">"selectAll"</span>&gt;全选&lt;/<span class="hljs-keyword">label</span>&gt;</code></pre>
<p>下一步在computed中定义三个计算属性</p>
<ol>
<li><p>selectAll: 是否全选</p></li>
<li><p>selectCount: 计算有多少项被选中</p></li>
<li><p>selectGroup: 存储当前选中项，以便对它们进行操作</p></li>
</ol>
<p><br></p>
<blockquote><p>selectAll计算属性：</p></blockquote>
<p><br></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="selectAll: {
    get() { //this.qsList是一个数组，理解代码时可以看为[{checked: false}, {checked: false}]
      return this.selectCount === this.qsList.length &amp;&amp; this.selectCount !== 0;
    },
    set(value) {
      this.qsList.forEach( item => {
        item.checked = value;
      } );
      return value;
    }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>selectAll: {
    <span class="hljs-keyword">get</span>() { <span class="hljs-comment">//this.qsList是一个数组，理解代码时可以看为[{checked: false}, {checked: false}]</span>
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.selectCount === <span class="hljs-keyword">this</span>.qsList.length &amp;&amp; <span class="hljs-keyword">this</span>.selectCount !== <span class="hljs-number">0</span>;
    },
    <span class="hljs-keyword">set</span>(value) {
      <span class="hljs-keyword">this</span>.qsList.forEach( item =&gt; {
        item.checked = value;
      } );
      <span class="hljs-keyword">return</span> value;
    }
  }</code></pre>
<p>通过get方法获取当前选中数，从而实现当列表项全被选中时，全选按钮自动被选中<br><br>   通过set方法实现当全选按钮选中时，所有列表项也被选中<br></p>
<blockquote><p>selectCount计算属性<br><br></p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="selectCount() {
    let i = 0;
    this.qsList.forEach( item => {
      if (item.checked) i++;
    } );
    return i;
  }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>selectCount() {
    <span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">this</span>.qsList.forEach( <span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> {
      <span class="hljs-keyword">if</span> (item.checked) i++;
    } );
    <span class="hljs-keyword">return</span> i;
  },</code></pre>
<p>计算当前有多少项被选中，selectAll通过此变量来计算当前是否所有列表项都被选中<br><br></p>
<blockquote><p>selectGroup计算属性</p></blockquote>
<p><br></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="selectGroup() {
    let group = [];
    this.qsList.forEach( item => {
      if (item.checked) group.push(item);
    } );
    return group;
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code>selectGroup() {
    <span class="hljs-keyword">let</span> <span class="hljs-keyword">group</span> = [];
    <span class="hljs-keyword">this</span>.qsList.forEach( item =&gt; {
      <span class="hljs-keyword">if</span> (item.<span class="hljs-keyword">checked</span>) <span class="hljs-keyword">group</span>.push(item);
    } );
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">group</span>;
  }</code></pre>
<p>存储被选中项，进行统一操作</p>
<h3 id="articleHeader9">检测表单必填项是否填写</h3>
<p>这个问题我使用了v-model来解决，问卷中总共有三种类型的表单项，radio，checkbox，textarea 因为对于radio的v-model来说只能绑定一个基本类型的值, checkbox的v-model应该绑定一个数组，这样选中项就会一个一个push到数组中，而且是双向绑定的，textarea的v-model也应该是一个基本类型，我设置的是字符串</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<p v-for=&quot;option in item.options&quot; class=&quot;option&quot;>
        <label>
          <input 
          type=&quot;radio&quot; 
          :name=&quot;`${item.num}-${item.title}`&quot;
          v-model=&quot;requiredItem[item.num]&quot;
          v-if=&quot;item.type === 'radio'&quot;
          :value=&quot;option&quot;>
          <input 
          type=&quot;checkbox&quot; 
          :name=&quot;`${item.num}-${item.title}`&quot;
          v-model=&quot;requiredItem[item.num]&quot;
          v-if=&quot;item.type === 'checkbox'&quot;
          :value=&quot;option&quot;>"{{"option"}}"
        </label>
      </p>
      <textarea 
      v-if=&quot;item.type === 'textarea'&quot; 
      v-model=&quot;requiredItem[item.num]&quot;></textarea>
      
      
      //获取必选项，用对象存储起来，相当于 {1: '', 2: [], 3: ''}
      getRequiredItem() {
        this.qsItem.question.forEach( item => {
        if (item.isNeed) {
          if (item.isNeed) {
            if (item.type === 'checkbox') {
              this.requiredItem[item.num] = [] //多选框双向绑定的值
            } else {
              this.requiredItem[item.num] = '' //单选框 文本框双向绑定的值
            }
          }
        }
      } )
    }
    
    //直接检测双向绑定的值的内容长度即可知道必填项是否有值
     validate() {
      for (let i in this.requiredItem) {
        if (this.requiredItem[i].length === 0) return false
      }
      return true
    }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>&lt;p v-<span class="hljs-keyword">for</span>=<span class="hljs-string">"option in item.options"</span> <span class="hljs-class"><span class="hljs-keyword">class</span>="<span class="hljs-title">option</span>"&gt;</span>
        &lt;label&gt;
          &lt;input 
          type=<span class="hljs-string">"radio"</span> 
          :name=<span class="hljs-string">"`<span class="hljs-subst">${item.num}</span>-<span class="hljs-subst">${item.title}</span>`"</span>
          v-model=<span class="hljs-string">"requiredItem[item.num]"</span>
          v-<span class="hljs-keyword">if</span>=<span class="hljs-string">"item.type === 'radio'"</span>
          :value=<span class="hljs-string">"option"</span>&gt;
          &lt;input 
          type=<span class="hljs-string">"checkbox"</span> 
          :name=<span class="hljs-string">"`<span class="hljs-subst">${item.num}</span>-<span class="hljs-subst">${item.title}</span>`"</span>
          v-model=<span class="hljs-string">"requiredItem[item.num]"</span>
          v-<span class="hljs-keyword">if</span>=<span class="hljs-string">"item.type === 'checkbox'"</span>
          :value=<span class="hljs-string">"option"</span>&gt;"{{"option"}}"
        &lt;/label&gt;
      &lt;/p&gt;
      &lt;textarea 
      v-<span class="hljs-keyword">if</span>=<span class="hljs-string">"item.type === 'textarea'"</span> 
      v-model=<span class="hljs-string">"requiredItem[item.num]"</span>&gt;&lt;/textarea&gt;
      
      
      <span class="hljs-comment">//获取必选项，用对象存储起来，相当于 {1: '', 2: [], 3: ''}</span>
      getRequiredItem() {
        <span class="hljs-keyword">this</span>.qsItem.question.forEach( item =&gt; {
        <span class="hljs-keyword">if</span> (item.isNeed) {
          <span class="hljs-keyword">if</span> (item.isNeed) {
            <span class="hljs-keyword">if</span> (item.type === <span class="hljs-string">'checkbox'</span>) {
              <span class="hljs-keyword">this</span>.requiredItem[item.num] = [] <span class="hljs-comment">//多选框双向绑定的值</span>
            } <span class="hljs-keyword">else</span> {
              <span class="hljs-keyword">this</span>.requiredItem[item.num] = <span class="hljs-string">''</span> <span class="hljs-comment">//单选框 文本框双向绑定的值</span>
            }
          }
        }
      } )
    }
    
    <span class="hljs-comment">//直接检测双向绑定的值的内容长度即可知道必填项是否有值</span>
     validate() {
      <span class="hljs-keyword">for</span> (let i <span class="hljs-keyword">in</span> <span class="hljs-keyword">this</span>.requiredItem) {
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.requiredItem[i].length === <span class="hljs-number">0</span>) <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>
      }
      <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>
    }
</code></pre>
<p><br><br>  这里还有一个问题，我现在在v-for中通过v-if来判断表单项类型，这样看起来有些冗余，为什么不直接动态绑定type来渲染表单项呢，这样就不用v-if了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<p v-for=&quot;option in item.options&quot; class=&quot;option&quot;>
  <input 
    :type=&quot;item.type&quot; 
    :name=&quot;`${item.num}-${item.title}`&quot;
    v-model=&quot;requiredItem[item.num]&quot;
    :value=&quot;option&quot;>
</p>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>&lt;p v-<span class="hljs-keyword">for</span>=<span class="hljs-string">"option in item.options"</span> <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"option"</span>&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> 
    <span class="hljs-attr">:type</span>=<span class="hljs-string">"item.type"</span> 
    <span class="hljs-attr">:name</span>=<span class="hljs-string">"`${item.num}-${item.title}`"</span>
    <span class="hljs-attr">v-model</span>=<span class="hljs-string">"requiredItem[item.num]"</span>
    <span class="hljs-attr">:value</span>=<span class="hljs-string">"option"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></span>
</code></pre>
<p><br><br>这样看起来简洁多了，但是这样写会报错，v-model不能绑定在type属性为动态值的表单项上，即type是bind的表单项不能用v-model，所以这里只能退一步使用v-if来选择渲染哪种类型的表单项</p>
<h3 id="articleHeader10">延迟执行函数</h3>
<p>当用户点击删除某一项时，一般的做法时弹出一个弹出层询问用户是否删除，用户点击确定再进行删除操作。这时只要给确定按钮绑定一个点击事件进行删除操作即可，但是当要多次点击确定进行下一个步骤，或者页面多个操作事件都是弹出这个弹出层，这时确定按钮就要去判断绑定哪个操作事件等等，很快就变得非常复杂起来<br>这里可以使用ES6的Generator函数，可以很方便的解决这个问题</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;shadow&quot; v-if=&quot;showDialog&quot;>
  <div class=&quot;del-dialog&quot;>
    <header>
      <span>提示</span>
      <span class=&quot;close-btn&quot; @click=&quot;showDialog = false&quot;>X</span>
    </header>
    <p>"{{"info"}}"</p>
    <div class=&quot;btn-box&quot;>
      <button class=&quot;yes&quot; @click=&quot;iterator.next();&quot;>确定</button>
      <button @click=&quot;showDialog = false&quot;>取消</button>
    </div>
  </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"shadow"</span> v-<span class="hljs-keyword">if</span>=<span class="hljs-string">"showDialog"</span>&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"del-dialog"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">header</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>提示<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"close-btn"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"showDialog = false"</span>&gt;</span>X<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>"{{"info"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"btn-box"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"yes"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"iterator.next();"</span>&gt;</span>确定<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"showDialog = false"</span>&gt;</span>取消<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
&lt;<span class="hljs-regexp">/div&gt;</span></code></pre>
<p>弹出层内容</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="data() {
  return {
    qsList: [],
    showDialog: false, //是否显示弹出层
    iterator: {}, //当前迭代器
    info: '' //弹出层提示内容
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">data</span>() {
  <span class="hljs-selector-tag">return</span> {
    <span class="hljs-attribute">qsList</span>: [],
    <span class="hljs-attribute">showDialog</span>: false, <span class="hljs-comment">//是否显示弹出层</span>
    <span class="hljs-attribute">iterator</span>: {}, <span class="hljs-comment">//当前迭代器</span>
    <span class="hljs-attribute">info</span>: <span class="hljs-string">''</span> <span class="hljs-comment">//弹出层提示内容</span>
  }
}</code></pre>
<p>data中的数据</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="*delItem(num) {
    yield this.showDialogMsg('确认要删除此问卷')

    yield (() => {
      let index = 0;
      for (let length = this.qsList.length; index < length; index++) {
        if (this.qsList[index].num === num) break;
      }
      this.qsList.splice(index, 1);
      this.showDialog = false;
    })();
  },
  *delItems() {
    yield this.showDialogMsg('确认要删除选中的问卷？');

    yield (() => {
      this.showDialog = false;
      if (this.selectAll) {
        this.qsList = [];
        return;
      }
      if (this.selectGroup == []) return;

      this.selectGroup.forEach( item => {
        if (this.qsList.indexOf(item) > -1) this.qsList.splice(this.qsList.indexOf(item), 1);
      } )
    })();     
  },
  *edit(item) {
    yield (() => {
      if (item.state === 'noissue') {
        this.showDialogMsg('确认要编辑？');
      } else {
        this.showDialogMsg('只有未发布的问卷才能编辑');
      }
    })();
    yield (() => {
      if (item.state !== 'noissue') {
        this.showDialog = false;
      } else {
        this.showDialog = false;
        this.$router.push({name: 'qsEdit', params: { num: item.num "}}")
      }
    })();
  },
  *watchData(item) {
    yield (() => {
      if (item.state === 'noissue') {
        this.showDialogMsg('未发布的问卷无数据可查看');
      } else {
        this.$router.push({ name: 'qsData', params: { num: item.num "}}")
      }
    })();
    yield this.showDialog = false;
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>*delItem(num) {
    yield <span class="hljs-keyword">this</span>.showDialogMsg(<span class="hljs-string">'确认要删除此问卷'</span>)

    yield (() =&gt; {
      let index = <span class="hljs-number">0</span>;
      <span class="hljs-keyword">for</span> (let length = <span class="hljs-keyword">this</span>.qsList.length; index &lt; length; index++) {
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.qsList[index].num === num) <span class="hljs-keyword">break</span>;
      }
      <span class="hljs-keyword">this</span>.qsList.splice(index, <span class="hljs-number">1</span>);
      <span class="hljs-keyword">this</span>.showDialog = <span class="hljs-literal">false</span>;
    })();
  },
  *delItems() {
    yield <span class="hljs-keyword">this</span>.showDialogMsg(<span class="hljs-string">'确认要删除选中的问卷？'</span>);

    yield (() =&gt; {
      <span class="hljs-keyword">this</span>.showDialog = <span class="hljs-literal">false</span>;
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.selectAll) {
        <span class="hljs-keyword">this</span>.qsList = [];
        <span class="hljs-keyword">return</span>;
      }
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.selectGroup == []) <span class="hljs-keyword">return</span>;

      <span class="hljs-keyword">this</span>.selectGroup.forEach( item =&gt; {
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.qsList.indexOf(item) &gt; <span class="hljs-number">-1</span>) <span class="hljs-keyword">this</span>.qsList.splice(<span class="hljs-keyword">this</span>.qsList.indexOf(item), <span class="hljs-number">1</span>);
      } )
    })();     
  },
  *edit(item) {
    yield (() =&gt; {
      <span class="hljs-keyword">if</span> (item.state === <span class="hljs-string">'noissue'</span>) {
        <span class="hljs-keyword">this</span>.showDialogMsg(<span class="hljs-string">'确认要编辑？'</span>);
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">this</span>.showDialogMsg(<span class="hljs-string">'只有未发布的问卷才能编辑'</span>);
      }
    })();
    yield (() =&gt; {
      <span class="hljs-keyword">if</span> (item.state !== <span class="hljs-string">'noissue'</span>) {
        <span class="hljs-keyword">this</span>.showDialog = <span class="hljs-literal">false</span>;
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">this</span>.showDialog = <span class="hljs-literal">false</span>;
        <span class="hljs-keyword">this</span>.$router.push({name: <span class="hljs-string">'qsEdit'</span>, params: { num: item.num "}}")
      }
    })();
  },
  *watchData(item) {
    yield (() =&gt; {
      <span class="hljs-keyword">if</span> (item.state === <span class="hljs-string">'noissue'</span>) {
        <span class="hljs-keyword">this</span>.showDialogMsg(<span class="hljs-string">'未发布的问卷无数据可查看'</span>);
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">this</span>.$router.push({ name: <span class="hljs-string">'qsData'</span>, params: { num: item.num "}}")
      }
    })();
    yield <span class="hljs-keyword">this</span>.showDialog = <span class="hljs-literal">false</span>;
  }</code></pre>
<p>可以看到 页面中多个操作都绑定在一个弹出层上，实现最大程度的复用，而且不会冲突，只要把当前要执行的操作的迭代器赋给确定按钮，确定按钮执行next方法即可</p>
<h3 id="articleHeader11">v-for每次渲染元素就自动执行一个函数</h3>
<p>有时我们需要v-for的每次遍历中就执行一个函数，我们可以这样</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<li v-for=&quot;item in data&quot;>"{{"doSomething()"}}"</li>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code style="word-break: break-word; white-space: initial;"><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"item in data"</span>&gt;</span></span><span class="hljs-template-variable">"{{"doSomething()"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span></code></pre>
<p>但是这种做法如果执行比较复杂的方法很容易出现一些错误比如无限循环等错误，而且也不推荐<br><br>根据需要可以考虑在js中再次遍历这个数据然后在遍历中对每一项进行操作</p>
<h3 id="articleHeader12">watch无意中造成的无限循环错误</h3>
<p>在编辑问卷功能中，题目号应该要根据题目的上移下移复用删除新建等操作进行变化，我使用了watch来监测变化然后更改题号</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="watch: {
  '$route': 'fetchData',
  qsItem: {
    handler(newVal) {
      newVal.question.forEach( (item, index) => {
        item.num = `Q${index + 1}`
      } )
    },
    deep: true
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>watch: {
  <span class="hljs-string">'$route'</span>: <span class="hljs-string">'fetchData'</span>,
  qsItem: {
    handler(newVal) {
      newVal.question.forEach( <span class="hljs-function"><span class="hljs-params">(item, index)</span> =&gt;</span> {
        item.num = `<span class="javascript">Q${index + <span class="hljs-number">1</span>}</span>`
      } )
    },
    deep: <span class="hljs-literal">true</span>
  }
}</code></pre>
<p>我在进行上移，下移，删除，新建问题等操作时都没有问题，但是在复用操作时产生了无限循环的问题</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;questions&quot; v-for=&quot;(qs, index) in qsItem.question&quot;>
    <span @click=&quot;copy(index, qs)&quot;>复用</span>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"questions"</span> v-<span class="hljs-keyword">for</span>=<span class="hljs-string">"(qs, index) in qsItem.question"</span>&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">span</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"copy(index, qs)"</span>&gt;</span>复用<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></span>
&lt;<span class="hljs-regexp">/div&gt;</span></code></pre>
<p>复用按钮，和复用方法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="copy(index, qs) {
  if (this.questionLength === 10) return alert('问卷已满！')
  this.qsItem.question.splice(index, 0, qs)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>copy(index, qs) {
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.questionLength === <span class="hljs-number">10</span>) <span class="hljs-keyword">return</span> alert(<span class="hljs-string">'问卷已满！'</span>)
  <span class="hljs-keyword">this</span>.qsItem.question.splice(index, <span class="hljs-number">0</span>, qs)
}</code></pre>
<p>这样写看起来没什么问题，哪个item下的复用按钮被点击，就将这个item添加到自己下一项。<br>但是qs添加到watch监测的变量中后，会触发watch的方法，更改题目号，即qs的题目号被更改，同时qs又是那个被点击的item，它们之间存在引用，这就会造成qs题目号的更改会使点击的item的题目号跟着一起变化，这样item一变化，watch又被触发，同时item的题目号因为跟着一起变化，导致题目号不是它正确的题目号，watch触发后，item的题目号又会变化为原来的，因为存在引用qs的又会跟着变，然后再次触发watch....一直循环下去<br>解决方法是用Object.assign()进行一次深拷贝，这样qs和item之间就不存在引用了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="copy(index, qs) {
  if (this.questionLength === 10) return alert('问卷已满！')
  qs = Object.assign({}, qs)
  this.qsItem.question.splice(index, 0, qs)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>copy(index, qs) {
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.questionLength === <span class="hljs-number">10</span>) <span class="hljs-keyword">return</span> alert(<span class="hljs-string">'问卷已满！'</span>)
  qs = Object.assign({}, qs)
  <span class="hljs-keyword">this</span>.qsItem.question.splice(index, <span class="hljs-number">0</span>, qs)
}</code></pre>
<p>这种做法不推荐，因为这种情况下使用watch本来就是不应该的，非常容易造成想不到的问题<br><br>推荐的做法是将watch中的方法封装成一个函数，每次操作时就调用这个函数，当然还是需要Object.assign()来解除复用元素之间的绑定<br><br>这里我为了练习还是使用了watch这个不推荐的方法<br></p>
<blockquote><p>总结完成，交作业了</p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue.js实现一个简易问卷平台(项目中遇到的问题总结)

## 原文链接
[https://segmentfault.com/a/1190000009000663](https://segmentfault.com/a/1190000009000663)

