---
title: '强大的 Vue 上传组件 vue-simple-uploader' 
date: 2019-01-03 2:30:11
hidden: true
slug: cfp86of75yu
categories: [reprint]
---

{{< raw >}}

                    
<p>在日常开发中经常会遇到文件上传的需求，<a href="https://github.com/simple-uploader/vue-uploader" rel="nofollow noreferrer" target="_blank">vue-simple-uploader</a> 就是一个基于 <a href="https://github.com/simple-uploader/Uploader" rel="nofollow noreferrer" target="_blank">simple-uploader.js</a> 和 Vue 结合做的一个上传组件，自带 UI，可覆盖、自定义；先来张动图看看效果：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010825788" src="https://static.alili.tech/img/remote/1460000010825788" alt="example" title="example" style="cursor: pointer; display: inline;"></span></p>
<p>其主要特点就是：</p>
<ul>
<li><p>支持文件、多文件、文件夹上传</p></li>
<li><p>支持拖拽文件、文件夹上传</p></li>
<li><p>统一对待文件和文件夹，方便操作管理</p></li>
<li><p>可暂停、继续上传</p></li>
<li><p>错误处理</p></li>
<li><p>支持“快传”，通过文件判断服务端是否已存在从而实现“快传”</p></li>
<li><p>上传队列管理，支持最大并发上传</p></li>
<li><p>分块上传</p></li>
<li><p>支持进度、预估剩余时间、出错自动重试、重传等操作</p></li>
</ul>
<h3 id="articleHeader0">安装</h3>
<p>通过<code>npm</code>安装：<code>npm install vue-simple-uploader --save</code>即可。</p>
<h3 id="articleHeader1">使用</h3>
<h4>初始化</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import uploader from 'vue-simple-uploader'
import App from './App.vue'

Vue.use(uploader)

/* eslint-disable no-new */
new Vue({
  render(createElement) {
    return createElement(App)
  }
}).$mount('#app')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> uploader <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-simple-uploader'</span>
<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'./App.vue'</span>

Vue.use(uploader)

<span class="hljs-comment">/* eslint-disable no-new */</span>
<span class="hljs-keyword">new</span> Vue({
  render(createElement) {
    <span class="hljs-keyword">return</span> createElement(App)
  }
}).$mount(<span class="hljs-string">'#app'</span>)</code></pre>
<h3 id="articleHeader2">App.vue</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <uploader :options=&quot;options&quot; class=&quot;uploader-example&quot;>
    <uploader-unsupport></uploader-unsupport>
    <uploader-drop>
      <p>Drop files here to upload or</p>
      <uploader-btn>select files</uploader-btn>
      <uploader-btn :attrs=&quot;attrs&quot;>select images</uploader-btn>
      <uploader-btn :directory=&quot;true&quot;>select folder</uploader-btn>
    </uploader-drop>
    <uploader-list></uploader-list>
  </uploader>
</template>

<script>
  export default {
    data () {
      return {
        options: {
          // 可通过 https://github.com/simple-uploader/Uploader/tree/develop/samples/Node.js 示例启动服务
          target: '//localhost:3000/upload',
          testChunks: false
        },
        attrs: {
          accept: 'image/*'
        }
      }
    }
  }
</script>

<style>
  .uploader-example {
    width: 880px;
    padding: 15px;
    margin: 40px auto 0;
    font-size: 12px;
    box-shadow: 0 0 10px rgba(0, 0, 0, .4);
  }
  .uploader-example .uploader-btn {
    margin-right: 4px;
  }
  .uploader-example .uploader-list {
    max-height: 440px;
    overflow: auto;
    overflow-x: hidden;
    overflow-y: auto;
  }
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code class="vue"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">uploader</span> <span class="hljs-attr">:options</span>=<span class="hljs-string">"options"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"uploader-example"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">uploader-unsupport</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">uploader-unsupport</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">uploader-drop</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Drop files here to upload or<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">uploader-btn</span>&gt;</span>select files<span class="hljs-tag">&lt;/<span class="hljs-name">uploader-btn</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">uploader-btn</span> <span class="hljs-attr">:attrs</span>=<span class="hljs-string">"attrs"</span>&gt;</span>select images<span class="hljs-tag">&lt;/<span class="hljs-name">uploader-btn</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">uploader-btn</span> <span class="hljs-attr">:directory</span>=<span class="hljs-string">"true"</span>&gt;</span>select folder<span class="hljs-tag">&lt;/<span class="hljs-name">uploader-btn</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">uploader-drop</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">uploader-list</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">uploader-list</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">uploader</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    data () {
      <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">options</span>: {
          <span class="hljs-comment">// 可通过 https://github.com/simple-uploader/Uploader/tree/develop/samples/Node.js 示例启动服务</span>
          target: <span class="hljs-string">'//localhost:3000/upload'</span>,
          <span class="hljs-attr">testChunks</span>: <span class="hljs-literal">false</span>
        },
        <span class="hljs-attr">attrs</span>: {
          <span class="hljs-attr">accept</span>: <span class="hljs-string">'image/*'</span>
        }
      }
    }
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
  <span class="hljs-selector-class">.uploader-example</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">880px</span>;
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">15px</span>;
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">40px</span> auto <span class="hljs-number">0</span>;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">12px</span>;
    <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">10px</span> <span class="hljs-built_in">rgba</span>(0, 0, 0, .4);
  }
  <span class="hljs-selector-class">.uploader-example</span> <span class="hljs-selector-class">.uploader-btn</span> {
    <span class="hljs-attribute">margin-right</span>: <span class="hljs-number">4px</span>;
  }
  <span class="hljs-selector-class">.uploader-example</span> <span class="hljs-selector-class">.uploader-list</span> {
    <span class="hljs-attribute">max-height</span>: <span class="hljs-number">440px</span>;
    <span class="hljs-attribute">overflow</span>: auto;
    <span class="hljs-attribute">overflow-x</span>: hidden;
    <span class="hljs-attribute">overflow-y</span>: auto;
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<h3 id="articleHeader3">组件</h3>
<h4>Uploader</h4>
<p>上传根组件，可理解为一个上传器。</p>
<h5>Props</h5>
<ul><li><p><code>options {Object}</code></p></li></ul>
<p>参考 <a href="https://github.com/simple-uploader/Uploader#configuration" rel="nofollow noreferrer" target="_blank">simple-uploader.js 配置</a>。</p>
<ul><li><p><code>autoStart {Boolean}</code></p></li></ul>
<p>默认 <code>true</code>, 是否选择文件后自动开始上传。</p>
<h5>事件</h5>
<ul><li><p><code>upload-start</code></p></li></ul>
<p>开始上传。</p>
<ul><li><p><code>file-added(file)</code></p></li></ul>
<p>添加了一个文件，一般用作文件校验，如果给 <code>file</code> 增加 <code>ignored</code> 属性为 <code>true</code> 的话就会被过滤掉。</p>
<ul><li><p><code>file-removed(file)</code></p></li></ul>
<p>移除一个文件（文件夹）。</p>
<ul><li><p><code>files-submitted(files, fileList)</code></p></li></ul>
<p>所选择的文件们添加到上传队列后触发。</p>
<h5>作用域插槽</h5>
<ul><li><p><code>files {Array}</code></p></li></ul>
<p>纯文件列表，没有文件夹概念。</p>
<ul><li><p><code>fileList {Array}</code></p></li></ul>
<p>统一对待文件、文件夹列表。</p>
<ul><li><p><code>started</code></p></li></ul>
<p>是否开始上传了。</p>
<h4>UploaderBtn</h4>
<p>点选上传文件按钮。</p>
<h5>Props</h5>
<ul><li><p><code>directory {Boolean}</code></p></li></ul>
<p>默认 <code>false</code>, 是否是文件夹上传。</p>
<ul><li><p><code>single {Boolean}</code></p></li></ul>
<p>默认 <code>false</code>, 如果设为 <code>true</code>，则代表一次只能选择一个文件。</p>
<ul><li><p><code>attrs {Object}</code></p></li></ul>
<p>默认 <code>{}</code>, 添加到 input 元素上的额外属性。</p>
<h4>UploaderDrop</h4>
<p>拖拽上传区域。</p>
<h4>UploaderList</h4>
<p>文件、文件夹列表，同等对待。</p>
<h5>作用域插槽</h5>
<ul><li><p><code>fileList {Array}</code></p></li></ul>
<p>文件、文件夹组成数组。</p>
<h4>UploaderFiles</h4>
<p>文件列表，没有文件夹概念，纯文件列表。</p>
<h5>作用域插槽</h5>
<ul><li><p><code>files {Array}</code></p></li></ul>
<p>文件列表。</p>
<h4>UploaderUnsupport</h4>
<p>不支持 HTML5 File API 的时候会显示。</p>
<h4>UploaderFile</h4>
<p>文件、文件夹单个组件。</p>
<h5>Props</h5>
<ul><li><p><code>file {Uploader.File}</code></p></li></ul>
<p>封装的文件实例。</p>
<ul><li><p><code>list {Boolean}</code></p></li></ul>
<p>如果是在 <code>UploaderList</code> 组件中使用的话，请设置为 <code>true</code>。</p>
<h5>作用域插槽</h5>
<ul><li><p><code>file {Uploader.File}</code></p></li></ul>
<p>文件实例。</p>
<ul><li><p><code>list {Boolean}</code></p></li></ul>
<p>是否在 <code>UploaderList</code> 组件中使用。</p>
<ul><li><p><code>status {String}</code></p></li></ul>
<p>当前状态，可能是：<code>success</code>, <code>error</code>, <code>uploading</code>, <code>paused</code>, <code>waiting</code></p>
<ul><li><p><code>name {String}</code></p></li></ul>
<p>文件名字。</p>
<ul><li><p><code>paused {Boolean}</code></p></li></ul>
<p>是否暂停了。</p>
<ul><li><p><code>error {Boolean}</code></p></li></ul>
<p>是否出错了。</p>
<ul><li><p><code>averageSpeed {Number}</code></p></li></ul>
<p>平均上传速度，单位字节每秒。</p>
<ul><li><p><code>formatedAverageSpeed {String}</code></p></li></ul>
<p>格式化后的平均上传速度，类似：<code>3 KB / S</code>。</p>
<ul><li><p><code>currentSpeed {Number}</code></p></li></ul>
<p>当前上传速度，单位字节每秒。</p>
<ul><li><p><code>isComplete {Boolean}</code></p></li></ul>
<p>是否已经上传完成。</p>
<ul><li><p><code>isUploading {Boolean}</code></p></li></ul>
<p>是否在上传中。</p>
<ul><li><p><code>size {Number}</code></p></li></ul>
<p>文件或者文件夹大小。</p>
<ul><li><p><code>formatedSize {Number}</code></p></li></ul>
<p>格式化后文件或者文件夹大小，类似：<code>10 KB</code>.</p>
<ul><li><p><code>uploadedSize {Number}</code></p></li></ul>
<p>已经上传大小，单位字节。</p>
<ul><li><p><code>progress {Number}</code></p></li></ul>
<p>介于 0 到 1 之间的小数，上传进度。</p>
<ul><li><p><code>progressStyle {String}</code></p></li></ul>
<p>进度样式，transform 属性，类似：<code>{transform: '-50%'}</code>.</p>
<ul><li><p><code>progressingClass {String}</code></p></li></ul>
<p>正在上传中的时候值为：<code>uploader-file-progressing</code>。</p>
<ul><li><p><code>timeRemaining {Number}</code></p></li></ul>
<p>预估剩余时间，单位秒。</p>
<ul><li><p><code>formatedTimeRemaining {String}</code></p></li></ul>
<p>格式化后剩余时间，类似：<code>3 miniutes</code>.</p>
<ul><li><p><code>type {String}</code></p></li></ul>
<p>文件类型。</p>
<ul><li><p><code>extension {String}</code></p></li></ul>
<p>文件名后缀，小写。</p>
<ul><li><p><code>fileCategory {String}</code></p></li></ul>
<p>文件分类，其中之一：<code>folder</code>, <code>document</code>, <code>video</code>, <code>audio</code>, <code>image</code>, <code>unknown</code>。</p>
<h3 id="articleHeader4">项目</h3>
<p>地址：<a href="https://github.com/simple-uploader/vue-uploader" rel="nofollow noreferrer" target="_blank">https://github.com/simple-uploader/vue-uploader</a>。</p>
<p>欢迎使用、拍砖。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
强大的 Vue 上传组件 vue-simple-uploader

## 原文链接
[https://segmentfault.com/a/1190000010826214](https://segmentfault.com/a/1190000010826214)

