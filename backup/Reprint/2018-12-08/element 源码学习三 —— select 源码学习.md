---
title: 'element 源码学习三 —— select 源码学习' 
date: 2018-12-08 2:30:30
hidden: true
slug: z82vbdz4ae
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>select 选择器是个比较复杂的组件了，通过不同的配置可以有多种用法。有必要单独学习学习。</blockquote>
<h1 id="articleHeader0">整体结构</h1>
<p>以下是 select 的 template 结构，已去掉了一部分代码便于查看整体结构：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div>
    <!-- 多选 -->
    <div
      v-if=&quot;multiple&quot;
      ref=&quot;tags&quot;>
      <!-- collapse tags 多选时是否将选中值按文字的形式展示 -->
      <span v-if=&quot;collapseTags &amp;&amp; selected.length&quot;>
        <el-tag
          type=&quot;info&quot;
          disable-transitions>
          <span class=&quot;el-select__tags-text&quot;>"{{" selected[0].currentLabel "}}"</span>
        </el-tag>
        <el-tag
          v-if=&quot;selected.length > 1&quot;
          type=&quot;info&quot;
          disable-transitions>
          <span class=&quot;el-select__tags-text&quot;>+ "{{" selected.length - 1 "}}"</span>
        </el-tag>
      </span>
      <!-- 多选，多个 el-tag 组成 -->
      <transition-group @after-leave=&quot;resetInputHeight&quot; v-if=&quot;!collapseTags&quot;>
        <el-tag
          v-for=&quot;item in selected&quot;
          :key=&quot;getValueKey(item)&quot;
          type=&quot;info&quot;
          disable-transitions>
          <span class=&quot;el-select__tags-text&quot;>"{{" item.currentLabel "}}"</span>
        </el-tag>
      </transition-group>
      <!-- 可输入文本的查询框 -->
      <input
        v-model=&quot;query&quot;
        v-if=&quot;filterable&quot;
        ref=&quot;input&quot;>
    </div>
    <!-- 显示结果框 read-only -->
    <el-input
      ref=&quot;reference&quot;
      v-model=&quot;selectedLabel&quot;>
      <!-- 用户显示清空和向下箭头 -->
      <i slot=&quot;suffix&quot;></i>
    </el-input>
    <!-- 下拉菜单 -->
    <transition>
      <el-select-menu
        ref=&quot;popper&quot;
        v-show=&quot;visible &amp;&amp; emptyText !== false&quot;>
        <el-scrollbar
          tag=&quot;ul&quot;
          wrap-class=&quot;el-select-dropdown__wrap&quot;
          view-class=&quot;el-select-dropdown__list&quot;
          ref=&quot;scrollbar&quot;
          v-show=&quot;options.length > 0 &amp;&amp; !loading&quot;>
          <!-- 默认项（创建条目） -->
          <el-option
            :value=&quot;query&quot;
            created
            v-if=&quot;showNewOption&quot;>
          </el-option>
          <!-- 插槽，用于放 option 和 option-group -->
          <slot></slot>
        </el-scrollbar>
        <!-- loading 加载中文本 -->
        <p
          v-if=&quot;emptyText &amp;&amp;
            (!allowCreate || loading || (allowCreate &amp;&amp; options.length === 0 ))&quot;>
          "{{" emptyText "}}"
        </p>
      </el-select-menu>
    </transition>
  </div>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- 多选 --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>
      <span class="hljs-attr">v-if</span>=<span class="hljs-string">"multiple"</span>
      <span class="hljs-attr">ref</span>=<span class="hljs-string">"tags"</span>&gt;</span>
      <span class="hljs-comment">&lt;!-- collapse tags 多选时是否将选中值按文字的形式展示 --&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"collapseTags &amp;&amp; selected.length"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">el-tag</span>
          <span class="hljs-attr">type</span>=<span class="hljs-string">"info"</span>
          <span class="hljs-attr">disable-transitions</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"el-select__tags-text"</span>&gt;</span>"{{" selected[0].currentLabel "}}"<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">el-tag</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">el-tag</span>
          <span class="hljs-attr">v-if</span>=<span class="hljs-string">"selected.length &gt; 1"</span>
          <span class="hljs-attr">type</span>=<span class="hljs-string">"info"</span>
          <span class="hljs-attr">disable-transitions</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"el-select__tags-text"</span>&gt;</span>+ "{{" selected.length - 1 "}}"<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">el-tag</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
      <span class="hljs-comment">&lt;!-- 多选，多个 el-tag 组成 --&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">transition-group</span> @<span class="hljs-attr">after-leave</span>=<span class="hljs-string">"resetInputHeight"</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"!collapseTags"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">el-tag</span>
          <span class="hljs-attr">v-for</span>=<span class="hljs-string">"item in selected"</span>
          <span class="hljs-attr">:key</span>=<span class="hljs-string">"getValueKey(item)"</span>
          <span class="hljs-attr">type</span>=<span class="hljs-string">"info"</span>
          <span class="hljs-attr">disable-transitions</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"el-select__tags-text"</span>&gt;</span>"{{" item.currentLabel "}}"<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">el-tag</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">transition-group</span>&gt;</span>
      <span class="hljs-comment">&lt;!-- 可输入文本的查询框 --&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
        <span class="hljs-attr">v-model</span>=<span class="hljs-string">"query"</span>
        <span class="hljs-attr">v-if</span>=<span class="hljs-string">"filterable"</span>
        <span class="hljs-attr">ref</span>=<span class="hljs-string">"input"</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- 显示结果框 read-only --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">el-input</span>
      <span class="hljs-attr">ref</span>=<span class="hljs-string">"reference"</span>
      <span class="hljs-attr">v-model</span>=<span class="hljs-string">"selectedLabel"</span>&gt;</span>
      <span class="hljs-comment">&lt;!-- 用户显示清空和向下箭头 --&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"suffix"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">el-input</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- 下拉菜单 --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">transition</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">el-select-menu</span>
        <span class="hljs-attr">ref</span>=<span class="hljs-string">"popper"</span>
        <span class="hljs-attr">v-show</span>=<span class="hljs-string">"visible &amp;&amp; emptyText !== false"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">el-scrollbar</span>
          <span class="hljs-attr">tag</span>=<span class="hljs-string">"ul"</span>
          <span class="hljs-attr">wrap-class</span>=<span class="hljs-string">"el-select-dropdown__wrap"</span>
          <span class="hljs-attr">view-class</span>=<span class="hljs-string">"el-select-dropdown__list"</span>
          <span class="hljs-attr">ref</span>=<span class="hljs-string">"scrollbar"</span>
          <span class="hljs-attr">v-show</span>=<span class="hljs-string">"options.length &gt; 0 &amp;&amp; !loading"</span>&gt;</span>
          <span class="hljs-comment">&lt;!-- 默认项（创建条目） --&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">el-option</span>
            <span class="hljs-attr">:value</span>=<span class="hljs-string">"query"</span>
            <span class="hljs-attr">created</span>
            <span class="hljs-attr">v-if</span>=<span class="hljs-string">"showNewOption"</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">el-option</span>&gt;</span>
          <span class="hljs-comment">&lt;!-- 插槽，用于放 option 和 option-group --&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">slot</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">slot</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">el-scrollbar</span>&gt;</span>
        <span class="hljs-comment">&lt;!-- loading 加载中文本 --&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>
          <span class="hljs-attr">v-if</span>=<span class="hljs-string">"emptyText &amp;&amp;
            (!allowCreate || loading || (allowCreate &amp;&amp; options.length === 0 ))"</span>&gt;</span>
          "{{" emptyText "}}"
        <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">el-select-menu</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">transition</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></code></pre>
<p>具体都写在注释中了~从上面内容中可以看到，select 考虑了很多情况，如单选、多选、搜索、下拉框、图标等等。并且使用 slot 插槽来获取开发者传递的 option 和 option-group 组件。<br>可以发现在 select 中使用了多个外部组件，也就是说 el-select 是由多个组件组装成的一个复杂组件~</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  // components
  import ElInput from 'element-ui/packages/input';
  import ElSelectMenu from './select-dropdown.vue';
  import ElOption from './option.vue';
  import ElTag from 'element-ui/packages/tag';
  import ElScrollbar from 'element-ui/packages/scrollbar';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">  <span class="hljs-comment">// components</span>
  <span class="hljs-keyword">import</span> ElInput <span class="hljs-keyword">from</span> <span class="hljs-string">'element-ui/packages/input'</span>;
  <span class="hljs-keyword">import</span> ElSelectMenu <span class="hljs-keyword">from</span> <span class="hljs-string">'./select-dropdown.vue'</span>;
  <span class="hljs-keyword">import</span> ElOption <span class="hljs-keyword">from</span> <span class="hljs-string">'./option.vue'</span>;
  <span class="hljs-keyword">import</span> ElTag <span class="hljs-keyword">from</span> <span class="hljs-string">'element-ui/packages/tag'</span>;
  <span class="hljs-keyword">import</span> ElScrollbar <span class="hljs-keyword">from</span> <span class="hljs-string">'element-ui/packages/scrollbar'</span>;</code></pre>
<h1 id="articleHeader1">select 要实现的功能</h1>
<p>参照<a href="http://element-cn.eleme.io/#/zh-CN/component/select" rel="nofollow noreferrer" target="_blank">官方文档</a>的内容罗列出 select 的一些功能，后面跟上我对功能实现的理解：</p>
<ul>
<li>单选 —— 点击 <code>select</code> 弹出下拉框，点击 <code>option</code> 完成赋值。</li>
<li>禁用 —— <code>select</code> 和 <code>option</code> 都有 <code>disabled</code> 选项用于禁用。</li>
<li>清空 —— 如果 <code>select</code> 中有内容，鼠标悬浮在 <code>input</code> 上显示删除图标，点击执行删除操作。</li>
<li>多选（平铺展示和数字显示数量两种方式） —— 参数 model 变为数组，点击下拉菜单中的选项添加或删除数组中的值。</li>
<li>自定义模板 —— option 中定义了 <code>slot</code> 插槽，默认加了 <code>span</code> 显示内容。可以修改 <code>el-option</code> 标签中内容来自定义模板。</li>
<li>分组 —— 使用 option-group 组件来实现分组效果。</li>
<li>搜索 —— 通过正则匹配搜索项，不符合搜索项的控制 v-show 隐藏</li>
<li>创建条目 —— 在 <code>select</code> 中添加额外 <code>option</code>（一般 <code>option</code> 都是通过 <code>slot</code> 插槽传递的），如允许创建条目，则显示这条 <code>option</code> ,<code>option</code> 的内容显示为查询内容。</li>
</ul>
<h1 id="articleHeader2">从几个问题去看源码逻辑</h1>
<h2 id="articleHeader3">如何实现基本单选功能？</h2>
<p>分析下基本功能：点击 input，显示下拉菜单；鼠标选中一项 option，隐藏下拉菜单；input 中显示选中的结果。<br>所以这里看下显示内容的 input 都有些什么事件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="      @focus=&quot;handleFocus&quot; // 处理 焦点
      @blur=&quot;handleBlur&quot; // 处理 焦点 离开
      @keyup.native=&quot;debouncedOnInputChange&quot;
      @keydown.native.down.stop.prevent=&quot;navigateOptions('next')&quot; // 向下按键，移动到下一个 option
      @keydown.native.up.stop.prevent=&quot;navigateOptions('prev')&quot; // 向上按键，移动到上一个 option
      @keydown.native.enter.prevent=&quot;selectOption&quot; // 回车按键，选中option
      @keydown.native.esc.stop.prevent=&quot;visible = false&quot;  // esc按键，隐藏下拉框
      @keydown.native.tab=&quot;visible = false&quot; // tab按键，跳转到下一个文本框，隐藏下拉框
      @paste.native=&quot;debouncedOnInputChange&quot; // 
      @mouseenter.native=&quot;inputHovering = true&quot; // mouse enter 事件
      @mouseleave.native=&quot;inputHovering = false&quot; // mouse leave 事件" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code>      <span class="hljs-variable">@focus</span>=<span class="hljs-string">"handleFocus"</span> <span class="hljs-comment">// 处理 焦点</span>
      <span class="hljs-variable">@blur</span>=<span class="hljs-string">"handleBlur"</span> <span class="hljs-comment">// 处理 焦点 离开</span>
      <span class="hljs-variable">@keyup</span>.native=<span class="hljs-string">"debouncedOnInputChange"</span>
      <span class="hljs-variable">@keydown</span>.native.down.stop.prevent=<span class="hljs-string">"navigateOptions('next')"</span> <span class="hljs-comment">// 向下按键，移动到下一个 option</span>
      <span class="hljs-variable">@keydown</span>.native.up.stop.prevent=<span class="hljs-string">"navigateOptions('prev')"</span> <span class="hljs-comment">// 向上按键，移动到上一个 option</span>
      <span class="hljs-variable">@keydown</span>.native.enter.prevent=<span class="hljs-string">"selectOption"</span> <span class="hljs-comment">// 回车按键，选中option</span>
      <span class="hljs-variable">@keydown</span>.native.esc.stop.prevent=<span class="hljs-string">"visible = false"</span>  <span class="hljs-comment">// esc按键，隐藏下拉框</span>
      <span class="hljs-variable">@keydown</span>.native.tab=<span class="hljs-string">"visible = false"</span> <span class="hljs-comment">// tab按键，跳转到下一个文本框，隐藏下拉框</span>
      <span class="hljs-variable">@paste</span>.native=<span class="hljs-string">"debouncedOnInputChange"</span> <span class="hljs-comment">// </span>
      <span class="hljs-variable">@mouseenter</span>.native=<span class="hljs-string">"inputHovering = true"</span> <span class="hljs-comment">// mouse enter 事件</span>
      <span class="hljs-variable">@mouseleave</span>.native=<span class="hljs-string">"inputHovering = false"</span> <span class="hljs-comment">// mouse leave 事件</span></code></pre>
<p>从上面的这些事件中可以知道：选中方法为 <code>selectOption</code>（从英文字面意思都能知道~）；显示下拉框通过 <code>visible</code> 属性控制；以及其他按键的一些功能。这里主要主要看看 <code>selectOption</code> 方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="      selectOption() {
        if (!this.visible) {
          this.toggleMenu();
        } else {
          if (this.options[this.hoverIndex]) {
            this.handleOptionSelect(this.options[this.hoverIndex]);
          }
        }
      }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">      selectOption() {
        <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.visible) {
          <span class="hljs-keyword">this</span>.toggleMenu();
        } <span class="hljs-keyword">else</span> {
          <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.options[<span class="hljs-keyword">this</span>.hoverIndex]) {
            <span class="hljs-keyword">this</span>.handleOptionSelect(<span class="hljs-keyword">this</span>.options[<span class="hljs-keyword">this</span>.hoverIndex]);
          }
        }
      },</code></pre>
<p>逻辑就是，如果下拉框未显示则执行 <code>toggleMenu</code> 方法触发下拉框，如果已显示下拉框则处理选择 option 的过程。看看这个 <code>toggleMenu</code> 方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="      toggleMenu() {
        if (!this.selectDisabled) {
          this.visible = !this.visible;
          if (this.visible) {
            (this.$refs.input || this.$refs.reference).focus();
          }
        }
      }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">      toggleMenu() {
        <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.selectDisabled) {
          <span class="hljs-keyword">this</span>.visible = !<span class="hljs-keyword">this</span>.visible;
          <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.visible) {
            (<span class="hljs-keyword">this</span>.$refs.input || <span class="hljs-keyword">this</span>.$refs.reference).focus();
          }
        }
      },</code></pre>
<p>其实就是控制下拉菜单的显示和隐藏。如果显示的时候定焦在 <code>input</code> 和 <code>reference</code> 上，它们其实就是单选和多选的 input 框（多选 input 定义了 <code>ref="input"</code> 单选 input 定义了 <code>ref="reference"</code>）。<br>至此，下拉菜单的显示与隐藏解决了。然后我们去找 option 点击事件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="      // 处理选项选中事件
      handleOptionSelect(option) {
        if (this.multiple) {
          // 多选
          const value = this.value.slice();
          const optionIndex = this.getValueIndex(value, option.value);
          if (optionIndex > -1) {
            // 已选中，从数组中移除
            value.splice(optionIndex, 1);
          } else if (this.multipleLimit <= 0 || value.length < this.multipleLimit) {
            // 未选中，传入数组
            value.push(option.value);
          }
          this.$emit('input', value);
          this.emitChange(value);
          if (option.created) {
            this.query = '';
            this.handleQueryChange('');
            this.inputLength = 20;
          }
          // 查询
          if (this.filterable) this.$refs.input.focus();
        } else {
          // 单选
          this.$emit('input', option.value);
          this.emitChange(option.value);
          this.visible = false;
        }
        // 渲染完成后
        this.$nextTick(() => {
          this.scrollToOption(option);
          this.setSoftFocus();
        });
      }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">      <span class="hljs-comment">// 处理选项选中事件</span>
      handleOptionSelect(option) {
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.multiple) {
          <span class="hljs-comment">// 多选</span>
          <span class="hljs-keyword">const</span> value = <span class="hljs-keyword">this</span>.value.slice();
          <span class="hljs-keyword">const</span> optionIndex = <span class="hljs-keyword">this</span>.getValueIndex(value, option.value);
          <span class="hljs-keyword">if</span> (optionIndex &gt; <span class="hljs-number">-1</span>) {
            <span class="hljs-comment">// 已选中，从数组中移除</span>
            value.splice(optionIndex, <span class="hljs-number">1</span>);
          } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.multipleLimit &lt;= <span class="hljs-number">0</span> || value.length &lt; <span class="hljs-keyword">this</span>.multipleLimit) {
            <span class="hljs-comment">// 未选中，传入数组</span>
            value.push(option.value);
          }
          <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">'input'</span>, value);
          <span class="hljs-keyword">this</span>.emitChange(value);
          <span class="hljs-keyword">if</span> (option.created) {
            <span class="hljs-keyword">this</span>.query = <span class="hljs-string">''</span>;
            <span class="hljs-keyword">this</span>.handleQueryChange(<span class="hljs-string">''</span>);
            <span class="hljs-keyword">this</span>.inputLength = <span class="hljs-number">20</span>;
          }
          <span class="hljs-comment">// 查询</span>
          <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.filterable) <span class="hljs-keyword">this</span>.$refs.input.focus();
        } <span class="hljs-keyword">else</span> {
          <span class="hljs-comment">// 单选</span>
          <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">'input'</span>, option.value);
          <span class="hljs-keyword">this</span>.emitChange(option.value);
          <span class="hljs-keyword">this</span>.visible = <span class="hljs-literal">false</span>;
        }
        <span class="hljs-comment">// 渲染完成后</span>
        <span class="hljs-keyword">this</span>.$nextTick(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
          <span class="hljs-keyword">this</span>.scrollToOption(option);
          <span class="hljs-keyword">this</span>.setSoftFocus();
        });
      },</code></pre>
<p>处理选中事件考虑了单选和多选两种情况。<br>如果是多选，检索选中 option 是否在 <code>value</code> 数组中，有则移除、无则添加到 <code>value</code> 数组中。然后 <code>$emit</code> 触发 <code>input</code> 事件，执行 <code>emitChange</code> 方法。如果 option 的 <code>created</code> 为 true，则清空查询内容。<br>如果是单选，<code>$emit</code> 触发 <code>input</code> 事件将选中值传递给父组件，执行 <code>emitChange</code> 方法，最后隐藏下拉菜单。<br>最后使用 <code>$nextTick</code> 方法处理下界面。<br>到这里，选中 option 后下拉菜单消失问题解决，只剩下显示结果到 input 中了。这个显示结果的过程是通过对 <code>visible</code> 属性的监听来完成的（一开始以为在 <code>emitChange</code> 结果发现那只是触发改变事件的）。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="      visible(val) {
        // 在下拉菜单隐藏时
        if (!val) {
          // 处理图标
          this.handleIconHide();
          // 广播下拉菜单销毁事件
          this.broadcast('ElSelectDropdown', 'destroyPopper');
          // 取消焦点
          if (this.$refs.input) {
            this.$refs.input.blur();
          }
          // 重置过程
          this.query = '';
          this.previousQuery = null;
          this.selectedLabel = '';
          this.inputLength = 20;
          this.resetHoverIndex();
          this.$nextTick(() => {
            if (this.$refs.input &amp;&amp;
              this.$refs.input.value === '' &amp;&amp;
              this.selected.length === 0) {
              this.currentPlaceholder = this.cachedPlaceHolder;
            }
          });
          // 如果不是多选，进行赋值现在 input 中
          if (!this.multiple) {
            // selected 为当前选中的 option
            if (this.selected) {
              if (this.filterable &amp;&amp; this.allowCreate &amp;&amp;
                this.createdSelected &amp;&amp; this.createdOption) {
                this.selectedLabel = this.createdLabel;
              } else {
                this.selectedLabel = this.selected.currentLabel;
              }
              // 查询结果
              if (this.filterable) this.query = this.selectedLabel;
            }
          }
        } else {
          // 下拉菜单显示
          // 处理图片显示
          this.handleIconShow();
          // 广播下拉菜单更新事件
          this.broadcast('ElSelectDropdown', 'updatePopper');
          // 处理查询事件
          if (this.filterable) {
            this.query = this.remote ? '' : this.selectedLabel;
            this.handleQueryChange(this.query);
            if (this.multiple) {
              this.$refs.input.focus();
            } else {
              if (!this.remote) {
                this.broadcast('ElOption', 'queryChange', '');
                this.broadcast('ElOptionGroup', 'queryChange');
              }
              this.broadcast('ElInput', 'inputSelect');
            }
          }
        }
        // 触发 visible-change 事件
        this.$emit('visible-change', val);
      }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">      visible(val) {
        <span class="hljs-comment">// 在下拉菜单隐藏时</span>
        <span class="hljs-keyword">if</span> (!val) {
          <span class="hljs-comment">// 处理图标</span>
          <span class="hljs-keyword">this</span>.handleIconHide();
          <span class="hljs-comment">// 广播下拉菜单销毁事件</span>
          <span class="hljs-keyword">this</span>.broadcast(<span class="hljs-string">'ElSelectDropdown'</span>, <span class="hljs-string">'destroyPopper'</span>);
          <span class="hljs-comment">// 取消焦点</span>
          <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.$refs.input) {
            <span class="hljs-keyword">this</span>.$refs.input.blur();
          }
          <span class="hljs-comment">// 重置过程</span>
          <span class="hljs-keyword">this</span>.query = <span class="hljs-string">''</span>;
          <span class="hljs-keyword">this</span>.previousQuery = <span class="hljs-literal">null</span>;
          <span class="hljs-keyword">this</span>.selectedLabel = <span class="hljs-string">''</span>;
          <span class="hljs-keyword">this</span>.inputLength = <span class="hljs-number">20</span>;
          <span class="hljs-keyword">this</span>.resetHoverIndex();
          <span class="hljs-keyword">this</span>.$nextTick(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
            <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.$refs.input &amp;&amp;
              <span class="hljs-keyword">this</span>.$refs.input.value === <span class="hljs-string">''</span> &amp;&amp;
              <span class="hljs-keyword">this</span>.selected.length === <span class="hljs-number">0</span>) {
              <span class="hljs-keyword">this</span>.currentPlaceholder = <span class="hljs-keyword">this</span>.cachedPlaceHolder;
            }
          });
          <span class="hljs-comment">// 如果不是多选，进行赋值现在 input 中</span>
          <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.multiple) {
            <span class="hljs-comment">// selected 为当前选中的 option</span>
            <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.selected) {
              <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.filterable &amp;&amp; <span class="hljs-keyword">this</span>.allowCreate &amp;&amp;
                <span class="hljs-keyword">this</span>.createdSelected &amp;&amp; <span class="hljs-keyword">this</span>.createdOption) {
                <span class="hljs-keyword">this</span>.selectedLabel = <span class="hljs-keyword">this</span>.createdLabel;
              } <span class="hljs-keyword">else</span> {
                <span class="hljs-keyword">this</span>.selectedLabel = <span class="hljs-keyword">this</span>.selected.currentLabel;
              }
              <span class="hljs-comment">// 查询结果</span>
              <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.filterable) <span class="hljs-keyword">this</span>.query = <span class="hljs-keyword">this</span>.selectedLabel;
            }
          }
        } <span class="hljs-keyword">else</span> {
          <span class="hljs-comment">// 下拉菜单显示</span>
          <span class="hljs-comment">// 处理图片显示</span>
          <span class="hljs-keyword">this</span>.handleIconShow();
          <span class="hljs-comment">// 广播下拉菜单更新事件</span>
          <span class="hljs-keyword">this</span>.broadcast(<span class="hljs-string">'ElSelectDropdown'</span>, <span class="hljs-string">'updatePopper'</span>);
          <span class="hljs-comment">// 处理查询事件</span>
          <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.filterable) {
            <span class="hljs-keyword">this</span>.query = <span class="hljs-keyword">this</span>.remote ? <span class="hljs-string">''</span> : <span class="hljs-keyword">this</span>.selectedLabel;
            <span class="hljs-keyword">this</span>.handleQueryChange(<span class="hljs-keyword">this</span>.query);
            <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.multiple) {
              <span class="hljs-keyword">this</span>.$refs.input.focus();
            } <span class="hljs-keyword">else</span> {
              <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.remote) {
                <span class="hljs-keyword">this</span>.broadcast(<span class="hljs-string">'ElOption'</span>, <span class="hljs-string">'queryChange'</span>, <span class="hljs-string">''</span>);
                <span class="hljs-keyword">this</span>.broadcast(<span class="hljs-string">'ElOptionGroup'</span>, <span class="hljs-string">'queryChange'</span>);
              }
              <span class="hljs-keyword">this</span>.broadcast(<span class="hljs-string">'ElInput'</span>, <span class="hljs-string">'inputSelect'</span>);
            }
          }
        }
        <span class="hljs-comment">// 触发 visible-change 事件</span>
        <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">'visible-change'</span>, val);
      },</code></pre>
<p>从 template 中可知，显示结果的 input 绑定的 <code>v-model</code> 是 <code>selectedLabel</code>，而 select 是通过获取下拉菜单的显示与隐藏事件来执行结果显示部分的功能的。最终 <code>selectedLabel</code> 获得到了选中的 option 的 <code>label</code> 内容。<br>这样，从 <strong>点击-单选-显示</strong> 的流程就实现了。还是很简单的。</p>
<h2 id="articleHeader4">如何实现多选，多选选中后 option 右侧的勾以及 input 中的 tag 如何显示？</h2>
<p>关于多选，在刚才讲单选的时候提及了一些了。所以有些代码就不贴出浪费篇幅了。具体逻辑如下：<br>先点击 input 执行 <code>selectOption</code> 方法显示下拉菜单，然后点击下拉菜单中的 option，执行 <code>handleOptionSelect</code> 方法将 option 的值都传给 <code>value</code> 数组。此时 <code>value</code> 数组改变，触发 watch 中的 <code>value</code> 变化监听方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="      value(val) {
        // 多选
        if (this.multiple) {
          this.resetInputHeight();
          if (val.length > 0 || (this.$refs.input &amp;&amp; this.query !== '')) {
            this.currentPlaceholder = '';
          } else {
            this.currentPlaceholder = this.cachedPlaceHolder;
          }
          if (this.filterable &amp;&amp; !this.reserveKeyword) {
            this.query = '';
            this.handleQueryChange(this.query);
          }
        }
        this.setSelected();
        // 非多选查询
        if (this.filterable &amp;&amp; !this.multiple) {
          this.inputLength = 20;
        }
      }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">      value(val) {
        <span class="hljs-comment">// 多选</span>
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.multiple) {
          <span class="hljs-keyword">this</span>.resetInputHeight();
          <span class="hljs-keyword">if</span> (val.length &gt; <span class="hljs-number">0</span> || (<span class="hljs-keyword">this</span>.$refs.input &amp;&amp; <span class="hljs-keyword">this</span>.query !== <span class="hljs-string">''</span>)) {
            <span class="hljs-keyword">this</span>.currentPlaceholder = <span class="hljs-string">''</span>;
          } <span class="hljs-keyword">else</span> {
            <span class="hljs-keyword">this</span>.currentPlaceholder = <span class="hljs-keyword">this</span>.cachedPlaceHolder;
          }
          <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.filterable &amp;&amp; !<span class="hljs-keyword">this</span>.reserveKeyword) {
            <span class="hljs-keyword">this</span>.query = <span class="hljs-string">''</span>;
            <span class="hljs-keyword">this</span>.handleQueryChange(<span class="hljs-keyword">this</span>.query);
          }
        }
        <span class="hljs-keyword">this</span>.setSelected();
        <span class="hljs-comment">// 非多选查询</span>
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.filterable &amp;&amp; !<span class="hljs-keyword">this</span>.multiple) {
          <span class="hljs-keyword">this</span>.inputLength = <span class="hljs-number">20</span>;
        }
      },</code></pre>
<p>以上代码关键是执行了 <code>setSelected</code> 方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="      // 设置选择项
      setSelected() {
        // 单选
        if (!this.multiple) {
          let option = this.getOption(this.value);
          // created 是指创建出来的 option，这里指 allow-create 创建的 option 项
          if (option.created) {
            this.createdLabel = option.currentLabel;
            this.createdSelected = true;
          } else {
            this.createdSelected = false;
          }
          this.selectedLabel = option.currentLabel;
          this.selected = option;
          if (this.filterable) this.query = this.selectedLabel;
          return;
        }
        // 遍历获取 option
        let result = [];
        if (Array.isArray(this.value)) {
          this.value.forEach(value => {
            result.push(this.getOption(value));
          });
        }
        // 赋值
        this.selected = result;
        this.$nextTick(() => {
          // 重置 input 高度
          this.resetInputHeight();
        });
      }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">      <span class="hljs-comment">// 设置选择项</span>
      setSelected() {
        <span class="hljs-comment">// 单选</span>
        <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.multiple) {
          <span class="hljs-keyword">let</span> option = <span class="hljs-keyword">this</span>.getOption(<span class="hljs-keyword">this</span>.value);
          <span class="hljs-comment">// created 是指创建出来的 option，这里指 allow-create 创建的 option 项</span>
          <span class="hljs-keyword">if</span> (option.created) {
            <span class="hljs-keyword">this</span>.createdLabel = option.currentLabel;
            <span class="hljs-keyword">this</span>.createdSelected = <span class="hljs-literal">true</span>;
          } <span class="hljs-keyword">else</span> {
            <span class="hljs-keyword">this</span>.createdSelected = <span class="hljs-literal">false</span>;
          }
          <span class="hljs-keyword">this</span>.selectedLabel = option.currentLabel;
          <span class="hljs-keyword">this</span>.selected = option;
          <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.filterable) <span class="hljs-keyword">this</span>.query = <span class="hljs-keyword">this</span>.selectedLabel;
          <span class="hljs-keyword">return</span>;
        }
        <span class="hljs-comment">// 遍历获取 option</span>
        <span class="hljs-keyword">let</span> result = [];
        <span class="hljs-keyword">if</span> (<span class="hljs-built_in">Array</span>.isArray(<span class="hljs-keyword">this</span>.value)) {
          <span class="hljs-keyword">this</span>.value.forEach(<span class="hljs-function"><span class="hljs-params">value</span> =&gt;</span> {
            result.push(<span class="hljs-keyword">this</span>.getOption(value));
          });
        }
        <span class="hljs-comment">// 赋值</span>
        <span class="hljs-keyword">this</span>.selected = result;
        <span class="hljs-keyword">this</span>.$nextTick(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
          <span class="hljs-comment">// 重置 input 高度</span>
          <span class="hljs-keyword">this</span>.resetInputHeight();
        });
      },</code></pre>
<p>可以看到如果是多选，那么将 <code>value</code> 数组遍历，获取相应的 <code>option</code> 值，传给 <code>selected</code>。而多选界面其实就是对于这个 <code>selected</code> 的 v-for 遍历显示。显示的标签使用的是 element 的另外一个组件 <a href="http://element-cn.eleme.io/#/zh-CN/component/tag" rel="nofollow noreferrer" target="_blank">el-tag</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        <el-tag
          v-for=&quot;item in selected&quot;
          :key=&quot;getValueKey(item)&quot;>
          <span class=&quot;el-select__tags-text&quot;>"{{" item.currentLabel "}}"</span>
        </el-tag>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">        <span class="hljs-tag">&lt;<span class="hljs-name">el-tag</span>
          <span class="hljs-attr">v-for</span>=<span class="hljs-string">"item in selected"</span>
          <span class="hljs-attr">:key</span>=<span class="hljs-string">"getValueKey(item)"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"el-select__tags-text"</span>&gt;</span>"{{" item.currentLabel "}}"<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">el-tag</span>&gt;</span></code></pre>
<p>这里顺便提一句： option 的 <code>created</code> 参数用于标识是 <code>select</code> 组件中创建的那个用于创建条目的 <code>option</code>。而从 slot 插槽传入的 option 是不用传 <code>created</code> 参数的。</p>
<h2 id="articleHeader5">如何实现搜索功能？</h2>
<p>从 template 中可知，select 有两个 input，一个用于显示结果，一个则用于查询搜索。我们来看下搜索内容的 input 文本框如何实现搜索功能：<br>在 input 中有 <code>@input="e =&gt; handleQueryChange(e.target.value)"</code>这么一段代码。所以，handleQueryChange 方法就是关键所在了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="      // 处理查询改变
      handleQueryChange(val) {
        if (this.previousQuery === val) return;
        if (
          this.previousQuery === null &amp;&amp;
          (typeof this.filterMethod === 'function' || typeof this.remoteMethod === 'function')
        ) {
          this.previousQuery = val;
          return;
        }
        this.previousQuery = val;
        this.$nextTick(() => {
          if (this.visible) this.broadcast('ElSelectDropdown', 'updatePopper');
        });
        this.hoverIndex = -1;
        if (this.multiple &amp;&amp; this.filterable) {
          const length = this.$refs.input.value.length * 15 + 20;
          this.inputLength = this.collapseTags ? Math.min(50, length) : length;
          this.managePlaceholder();
          this.resetInputHeight();
        }
        if (this.remote &amp;&amp; typeof this.remoteMethod === 'function') {
          this.hoverIndex = -1;
          this.remoteMethod(val);
        } else if (typeof this.filterMethod === 'function') {
          this.filterMethod(val);
          this.broadcast('ElOptionGroup', 'queryChange');
        } else {
          this.filteredOptionsCount = this.optionsCount;
          this.broadcast('ElOption', 'queryChange', val);
          this.broadcast('ElOptionGroup', 'queryChange');
        }
        if (this.defaultFirstOption &amp;&amp; (this.filterable || this.remote) &amp;&amp; this.filteredOptionsCount) {
          this.checkDefaultFirstOption();
        }
      }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">      <span class="hljs-comment">// 处理查询改变</span>
      handleQueryChange(val) {
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.previousQuery === val) <span class="hljs-keyword">return</span>;
        <span class="hljs-keyword">if</span> (
          <span class="hljs-keyword">this</span>.previousQuery === <span class="hljs-literal">null</span> &amp;&amp;
          (<span class="hljs-keyword">typeof</span> <span class="hljs-keyword">this</span>.filterMethod === <span class="hljs-string">'function'</span> || <span class="hljs-keyword">typeof</span> <span class="hljs-keyword">this</span>.remoteMethod === <span class="hljs-string">'function'</span>)
        ) {
          <span class="hljs-keyword">this</span>.previousQuery = val;
          <span class="hljs-keyword">return</span>;
        }
        <span class="hljs-keyword">this</span>.previousQuery = val;
        <span class="hljs-keyword">this</span>.$nextTick(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
          <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.visible) <span class="hljs-keyword">this</span>.broadcast(<span class="hljs-string">'ElSelectDropdown'</span>, <span class="hljs-string">'updatePopper'</span>);
        });
        <span class="hljs-keyword">this</span>.hoverIndex = <span class="hljs-number">-1</span>;
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.multiple &amp;&amp; <span class="hljs-keyword">this</span>.filterable) {
          <span class="hljs-keyword">const</span> length = <span class="hljs-keyword">this</span>.$refs.input.value.length * <span class="hljs-number">15</span> + <span class="hljs-number">20</span>;
          <span class="hljs-keyword">this</span>.inputLength = <span class="hljs-keyword">this</span>.collapseTags ? <span class="hljs-built_in">Math</span>.min(<span class="hljs-number">50</span>, length) : length;
          <span class="hljs-keyword">this</span>.managePlaceholder();
          <span class="hljs-keyword">this</span>.resetInputHeight();
        }
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.remote &amp;&amp; <span class="hljs-keyword">typeof</span> <span class="hljs-keyword">this</span>.remoteMethod === <span class="hljs-string">'function'</span>) {
          <span class="hljs-keyword">this</span>.hoverIndex = <span class="hljs-number">-1</span>;
          <span class="hljs-keyword">this</span>.remoteMethod(val);
        } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> <span class="hljs-keyword">this</span>.filterMethod === <span class="hljs-string">'function'</span>) {
          <span class="hljs-keyword">this</span>.filterMethod(val);
          <span class="hljs-keyword">this</span>.broadcast(<span class="hljs-string">'ElOptionGroup'</span>, <span class="hljs-string">'queryChange'</span>);
        } <span class="hljs-keyword">else</span> {
          <span class="hljs-keyword">this</span>.filteredOptionsCount = <span class="hljs-keyword">this</span>.optionsCount;
          <span class="hljs-keyword">this</span>.broadcast(<span class="hljs-string">'ElOption'</span>, <span class="hljs-string">'queryChange'</span>, val);
          <span class="hljs-keyword">this</span>.broadcast(<span class="hljs-string">'ElOptionGroup'</span>, <span class="hljs-string">'queryChange'</span>);
        }
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.defaultFirstOption &amp;&amp; (<span class="hljs-keyword">this</span>.filterable || <span class="hljs-keyword">this</span>.remote) &amp;&amp; <span class="hljs-keyword">this</span>.filteredOptionsCount) {
          <span class="hljs-keyword">this</span>.checkDefaultFirstOption();
        }
      },</code></pre>
<p>其中，<code>remoteMethod</code> 和 <code>filterMethod</code> 方法是自定义的远程查询和本地过滤方法。如果没有自定义的这两个方法，则会触发广播给 <code>option</code> 和 <code>option-group</code> 组件 <code>queryChange</code> 方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="      // option.vue
      queryChange(query) {
        let parsedQuery = String(query).replace(/(\^|\(|\)|\[|\]|\$|\*|\+|\.|\?|\\|\{|\}|\|)/g, '\\$1');
        // 匹配字符决定是否显示当前option
        this.visible = new RegExp(parsedQuery, 'i').test(this.currentLabel) || this.created;
        if (!this.visible) {
          this.select.filteredOptionsCount--;
        }
      }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">      <span class="hljs-comment">// option.vue</span>
      queryChange(query) {
        <span class="hljs-keyword">let</span> parsedQuery = <span class="hljs-built_in">String</span>(query).replace(<span class="hljs-regexp">/(\^|\(|\)|\[|\]|\$|\*|\+|\.|\?|\\|\{|\}|\|)/g</span>, <span class="hljs-string">'\\$1'</span>);
        <span class="hljs-comment">// 匹配字符决定是否显示当前option</span>
        <span class="hljs-keyword">this</span>.visible = <span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>(parsedQuery, <span class="hljs-string">'i'</span>).test(<span class="hljs-keyword">this</span>.currentLabel) || <span class="hljs-keyword">this</span>.created;
        <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.visible) {
          <span class="hljs-keyword">this</span>.select.filteredOptionsCount--;
        }
      }</code></pre>
<p>option 中通过正则匹配决定是否隐藏当前 option 组件，而 option-group 通过获取子组件，判断如果有子组件是可见的则显示，否则隐藏。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="      // option-group.vue
      queryChange() {
        this.visible = this.$children &amp;&amp;
          Array.isArray(this.$children) &amp;&amp;
          this.$children.some(option => option.visible === true);
      }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">      <span class="hljs-comment">// option-group.vue</span>
      queryChange() {
        <span class="hljs-keyword">this</span>.visible = <span class="hljs-keyword">this</span>.$children &amp;&amp;
          <span class="hljs-built_in">Array</span>.isArray(<span class="hljs-keyword">this</span>.$children) &amp;&amp;
          <span class="hljs-keyword">this</span>.$children.some(<span class="hljs-function"><span class="hljs-params">option</span> =&gt;</span> option.visible === <span class="hljs-literal">true</span>);
      }</code></pre>
<p>所以，其实 option 和 option-group 在搜索的时候只是隐藏掉了不匹配的内容而已。</p>
<h2 id="articleHeader6">下拉菜单的显示和隐藏效果是如何实现的？下拉菜单本质是什么东西？</h2>
<p>下拉菜单是通过 <a href="https://cn.vuejs.org/v2/api/#transition" rel="nofollow noreferrer" target="_blank">transition</a> 来实现过渡动画的。<br>下拉菜单 <code>el-select-menu</code> 本质上就是一个 div 容器而已。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  <div
    class=&quot;el-select-dropdown el-popper&quot;
    :class=&quot;[{ 'is-multiple': $parent.multiple }, popperClass]&quot;
    :style=&quot;{ minWidth: minWidth }&quot;>
    <slot></slot>
  </div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>
    <span class="hljs-attr">class</span>=<span class="hljs-string">"el-select-dropdown el-popper"</span>
    <span class="hljs-attr">:class</span>=<span class="hljs-string">"[{ 'is-multiple': $parent.multiple }, popperClass]"</span>
    <span class="hljs-attr">:style</span>=<span class="hljs-string">"{ minWidth: minWidth }"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">slot</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">slot</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>另外，在代码中经常出现的通知下拉菜单显示和隐藏的广播在 <code>el-select-menu</code> 的 <code>mounted</code> 方法中接收使用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    mounted() {
      this.referenceElm = this.$parent.$refs.reference.$el;
      this.$parent.popperElm = this.popperElm = this.$el;
      this.$on('updatePopper', () => {
        if (this.$parent.visible) this.updatePopper();
      });
      this.$on('destroyPopper', this.destroyPopper);
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">    mounted() {
      <span class="hljs-keyword">this</span>.referenceElm = <span class="hljs-keyword">this</span>.$parent.$refs.reference.$el;
      <span class="hljs-keyword">this</span>.$parent.popperElm = <span class="hljs-keyword">this</span>.popperElm = <span class="hljs-keyword">this</span>.$el;
      <span class="hljs-keyword">this</span>.$on(<span class="hljs-string">'updatePopper'</span>, () =&gt; {
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.$parent.visible) <span class="hljs-keyword">this</span>.updatePopper();
      });
      <span class="hljs-keyword">this</span>.$on(<span class="hljs-string">'destroyPopper'</span>, <span class="hljs-keyword">this</span>.destroyPopper);
    }</code></pre>
<h2 id="articleHeader7">创建条目如何实现？</h2>
<p>上文中提到过，就是在 select 中默认藏了一条 option，当创建条目时显示这个 option 并显示创建内容。点击这个 option 就可以把创建的内容添加到显示结果的 input 上了。</p>
<h2 id="articleHeader8">如何展示远程数据？</h2>
<p>通过为 select 设置 <code>remote</code> 和 <code>remote-method</code> 属性来获取远程数据。<code>remote-method</code> 方法最终将数据赋值给 option 的 v-model 绑定数组数据将结果显示出来即可。</p>
<h2 id="articleHeader9">清空按钮显示和点击事件呢？</h2>
<p>在显示结果的 input 文本框中有一个 <code>&lt;i&gt;</code> 标签，用于显示图标。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="      <!-- 用户显示清空和向下箭头 -->
      <i slot=&quot;suffix&quot;
       :class=&quot;['el-select__caret', 'el-input__icon', 'el-icon-' + iconClass]&quot;
       @click=&quot;handleIconClick&quot;
      ></i>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">      <span class="hljs-comment">&lt;!-- 用户显示清空和向下箭头 --&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"suffix"</span>
       <span class="hljs-attr">:class</span>=<span class="hljs-string">"['el-select__caret', 'el-input__icon', 'el-icon-' + iconClass]"</span>
       @<span class="hljs-attr">click</span>=<span class="hljs-string">"handleIconClick"</span>
      &gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span></code></pre>
<p>最终 input 右侧显示什么图标由 <code>iconClass</code> 决定，其中 <code>circle-close</code> 就是圆形查查，即清空按钮~</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="      iconClass() {
        let criteria = this.clearable &amp;&amp;
          !this.selectDisabled &amp;&amp;
          this.inputHovering &amp;&amp;
          !this.multiple &amp;&amp;
          this.value !== undefined &amp;&amp;
          this.value !== '';
        return criteria ? 'circle-close is-show-close' : (this.remote &amp;&amp; this.filterable ? '' : 'arrow-up');
      }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">      iconClass() {
        <span class="hljs-keyword">let</span> criteria = <span class="hljs-keyword">this</span>.clearable &amp;&amp;
          !<span class="hljs-keyword">this</span>.selectDisabled &amp;&amp;
          <span class="hljs-keyword">this</span>.inputHovering &amp;&amp;
          !<span class="hljs-keyword">this</span>.multiple &amp;&amp;
          <span class="hljs-keyword">this</span>.value !== <span class="hljs-literal">undefined</span> &amp;&amp;
          <span class="hljs-keyword">this</span>.value !== <span class="hljs-string">''</span>;
        <span class="hljs-keyword">return</span> criteria ? <span class="hljs-string">'circle-close is-show-close'</span> : (<span class="hljs-keyword">this</span>.remote &amp;&amp; <span class="hljs-keyword">this</span>.filterable ? <span class="hljs-string">''</span> : <span class="hljs-string">'arrow-up'</span>);
      },</code></pre>
<p><code>handleIconClick</code> 方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="      // 处理图标点击事件（删除按钮）
      handleIconClick(event) {
        if (this.iconClass.indexOf('circle-close') > -1) {
          this.deleteSelected(event);
        }
      },
      // 删除选中
      deleteSelected(event) {
        event.stopPropagation();
        this.$emit('input', '');
        this.emitChange('');
        this.visible = false;
        this.$emit('clear');
      }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">      <span class="hljs-comment">// 处理图标点击事件（删除按钮）</span>
      handleIconClick(event) {
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.iconClass.indexOf(<span class="hljs-string">'circle-close'</span>) &gt; <span class="hljs-number">-1</span>) {
          <span class="hljs-keyword">this</span>.deleteSelected(event);
        }
      },
      <span class="hljs-comment">// 删除选中</span>
      deleteSelected(event) {
        event.stopPropagation();
        <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">'input'</span>, <span class="hljs-string">''</span>);
        <span class="hljs-keyword">this</span>.emitChange(<span class="hljs-string">''</span>);
        <span class="hljs-keyword">this</span>.visible = <span class="hljs-literal">false</span>;
        <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">'clear'</span>);
      },</code></pre>
<p>最终，清空只是将文本清空掉并且关闭下拉菜单。其实当再次打开 select 的时候，option 还是选中在之前选中的那个位置，即 <code>HoverIndex</code> 没有变为 -1，不知道算不算 bug。</p>
<h2 id="articleHeader10">option 的自定义模板是如何实现的？</h2>
<p>很简单，使用了 slot 插槽。并且在 slot 中定义了默认显示方式。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <slot>
      <span>"{{" currentLabel "}}"</span>
    </slot>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">    <span class="hljs-tag">&lt;<span class="hljs-name">slot</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>"{{" currentLabel "}}"<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">slot</span>&gt;</span></code></pre>
<h1 id="articleHeader11">最后</h1>
<p>第一次尝试用问题取代主题来写博客，这样看着中心是不是更明确一些？<br>最后，说下看完 select 组件的感受：</p>
<ul>
<li>element 通过自定义的广播方法进行父子组件间的通信。（好像以前Vue也有这个功能，后来弃用了。）</li>
<li>再复杂的组件都是由一个个基础的组件拼起来的。</li>
<li>select 功能还是挺复杂的，加上子组件 1000+ 行代码了。本文只是讲了基本功能的实现，值得深入学习。</li>
<li>学习了高手写组件的方式和写法~之后在自己写组件的时候可以参考。</li>
<li>方法、参数命名非常规范，一眼就能看懂具体用法。</li>
<li>知道了 <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some" rel="nofollow noreferrer" target="_blank">Array.some()</a> 方法~</li>
</ul>
<p>好吧，说好了一天写出来，结果断断续续花了三天才完成。有点高估自己能力啦~<br>说下之后的Vue实验室博客计划：计划再找两个复杂的 element 组件来学习，最后写一篇总结博客。然后试着自己去创建几个 UI 组件，学以致用。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
element 源码学习三 —— select 源码学习

## 原文链接
[https://segmentfault.com/a/1190000014098739](https://segmentfault.com/a/1190000014098739)

