---
title: 'vue-quill-editor自定义图片上传' 
date: 2019-01-11 2:30:08
hidden: true
slug: 33mff4kdiiw
categories: [reprint]
---

{{< raw >}}

                    
<p>我们通常都会使用富文本编辑器在后台编辑内容，开发vue当然也少不了，我们通过vue官网的链接可以找到一些资源，或者去github上查找一些开源的编辑器。<br>我使用的是vue-quill-editor，它的界面很简洁，功能也满足平时的编辑需要，不过于臃肿，但是它默认的图片上传是使用Data URL方式保存到了内容里，这不是我想要的，我相信大部分人也不想这样去保存图片，还好quill提供了如何去自定义按钮事件的demo(03-example.vue)，那么我们就可以自己去实现图片的保存方式了。</p>
<p>先看看效果，可以支持直接上传文件和裁切图片</p>
<p><span class="img-wrap"><img data-src="/img/bVQY4l?w=815&amp;h=549" src="https://static.alili.tech/img/bVQY4l?w=815&amp;h=549" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/bVQY4m?w=817&amp;h=611" src="https://static.alili.tech/img/bVQY4m?w=817&amp;h=611" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/bVQY44?w=811&amp;h=617" src="https://static.alili.tech/img/bVQY44?w=811&amp;h=617" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h2 id="articleHeader0">工具栏处理</h2>
<p>先创建一个组件Editor.vue,引入vue-quill-editor,我们要做的就是重新定义它的操作按钮，也就是使用slot="toolbar"这个插槽，先贴出quill案例的关键代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<quill-editor v-model=&quot;content&quot;
                      :options=&quot;editorOption&quot;
                      @blur=&quot;onEditorBlur($event)&quot;
                      @focus=&quot;onEditorFocus($event)&quot;
                      @ready=&quot;onEditorReady($event)&quot;>
         <div id=&quot;toolbar&quot; slot=&quot;toolbar&quot;>
           <button class=&quot;ql-bold&quot;>Bold</button>
           <button class=&quot;ql-italic&quot;>Italic</button>
         </div>
</quill-editor>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">quill-editor</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"content"</span>
                      <span class="hljs-attr">:options</span>=<span class="hljs-string">"editorOption"</span>
                      @<span class="hljs-attr">blur</span>=<span class="hljs-string">"onEditorBlur($event)"</span>
                      @<span class="hljs-attr">focus</span>=<span class="hljs-string">"onEditorFocus($event)"</span>
                      @<span class="hljs-attr">ready</span>=<span class="hljs-string">"onEditorReady($event)"</span>&gt;</span>
         <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"toolbar"</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"toolbar"</span>&gt;</span>
           <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ql-bold"</span>&gt;</span>Bold<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
           <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ql-italic"</span>&gt;</span>Italic<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
         <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">quill-editor</span>&gt;</span></code></pre>
<p>我们可以看到插槽内我们放了两个按钮分别是加粗和倾斜，quill会根据这些按钮的class属性绑定样式和操作，也就是说如果我们不用它的样式，自己写样式，自己绑定事件，就可以去处理自己的逻辑了，那我们要保留quill之前的所有功能只修改图片上传应该如何配置呢？原有的布局样式都保留，只去掉图片样式并单独加事件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<quilleditor v-model=&quot;content&quot;
                 ref=&quot;myTextEditor&quot;
                 :options=&quot;editorOption&quot;
                 @change=&quot;onChange&quot;
                 >
      <div id=&quot;toolbar&quot; slot=&quot;toolbar&quot;>
        <span class=&quot;ql-formats&quot;><button type=&quot;button&quot; class=&quot;ql-bold&quot;></button></span>
        <span class=&quot;ql-formats&quot;><button type=&quot;button&quot; class=&quot;ql-italic&quot;></button></span>
        <span class=&quot;ql-formats&quot;><button type=&quot;button&quot; class=&quot;ql-underline&quot;></button></span>
        <span class=&quot;ql-formats&quot;><button type=&quot;button&quot; class=&quot;ql-strike&quot;></button></span>
        <span class=&quot;ql-formats&quot;><button type=&quot;button&quot; class=&quot;ql-blockquote&quot;></button></span>
        <span class=&quot;ql-formats&quot;><button type=&quot;button&quot; class=&quot;ql-code-block&quot;></button></span>
        <span class=&quot;ql-formats&quot;><button type=&quot;button&quot; class=&quot;ql-header&quot; value=&quot;1&quot;></button></span>
        <span class=&quot;ql-formats&quot;><button type=&quot;button&quot; class=&quot;ql-header&quot; value=&quot;2&quot;></button></span>
        <span class=&quot;ql-formats&quot;><button type=&quot;button&quot; class=&quot;ql-list&quot; value=&quot;ordered&quot;></button></span>
        <span class=&quot;ql-formats&quot;><button type=&quot;button&quot; class=&quot;ql-list&quot; value=&quot;bullet&quot;></button></span>
        <span class=&quot;ql-formats&quot;><button type=&quot;button&quot; class=&quot;ql-script&quot; value=&quot;sub&quot;></button></span>
        <span class=&quot;ql-formats&quot;><button type=&quot;button&quot; class=&quot;ql-script&quot; value=&quot;super&quot;></button></span>
        <span class=&quot;ql-formats&quot;><button type=&quot;button&quot; class=&quot;ql-indent&quot; value=&quot;-1&quot;></button></span>
        <span class=&quot;ql-formats&quot;><button type=&quot;button&quot; class=&quot;ql-indent&quot; value=&quot;+1&quot;></button></span>
        <span class=&quot;ql-formats&quot;> <button type=&quot;button&quot; class=&quot;ql-direction&quot; value=&quot;rtl&quot;></button></span>

      <span class=&quot;ql-formats&quot;><select class=&quot;ql-size&quot;>
        <option value=&quot;small&quot;></option>
        <option selected></option>
        <option value=&quot;large&quot;></option>
        <option value=&quot;huge&quot;></option>
      </select></span>
      <span class=&quot;ql-formats&quot;><select class=&quot;ql-header&quot; >
        <option value=&quot;1&quot;></option>
        <option value=&quot;2&quot;></option>
        <option value=&quot;3&quot;></option>
        <option value=&quot;4&quot;></option>
        <option value=&quot;5&quot;></option>
        <option value=&quot;6&quot;></option>
        <option selected=&quot;selected&quot;></option>
      </select></span>
      <span class=&quot;ql-formats&quot;><select class=&quot;ql-color&quot;>
        <option selected=&quot;selected&quot;></option>
        <option value=&quot;#e60000&quot;></option>
        <option value=&quot;#ff9900&quot;></option>
        <option value=&quot;#ffff00&quot;></option>
        <option value=&quot;#008a00&quot;></option>
        <option value=&quot;#0066cc&quot;></option>
        <option value=&quot;#9933ff&quot;></option>
        <option value=&quot;#ffffff&quot;></option>
        <option value=&quot;#facccc&quot;></option>
        <option value=&quot;#ffebcc&quot;></option>
        <option value=&quot;#ffffcc&quot;></option>
        <option value=&quot;#cce8cc&quot;></option>
        <option value=&quot;#cce0f5&quot;></option>
        <option value=&quot;#ebd6ff&quot;></option>
        <option value=&quot;#bbbbbb&quot;></option>
        <option value=&quot;#f06666&quot;></option>
        <option value=&quot;#ffc266&quot;></option>
        <option value=&quot;#ffff66&quot;></option>
        <option value=&quot;#66b966&quot;></option>
        <option value=&quot;#66a3e0&quot;></option>
        <option value=&quot;#c285ff&quot;></option>
        <option value=&quot;#888888&quot;></option>
        <option value=&quot;#a10000&quot;></option>
        <option value=&quot;#b26b00&quot;></option>
        <option value=&quot;#b2b200&quot;></option>
        <option value=&quot;#006100&quot;></option>
        <option value=&quot;#0047b2&quot;></option>
        <option value=&quot;#6b24b2&quot;></option>
        <option value=&quot;#444444&quot;></option>
        <option value=&quot;#5c0000&quot;></option>
        <option value=&quot;#663d00&quot;></option>
        <option value=&quot;#666600&quot;></option>
        <option value=&quot;#003700&quot;></option>
        <option value=&quot;#002966&quot;></option>
        <option value=&quot;#3d1466&quot;></option>
      </select></span>
     <span class=&quot;ql-formats&quot;> <select class=&quot;ql-background&quot;>
        <option value=&quot;#000000&quot;></option>
        <option value=&quot;#e60000&quot;></option>
        <option value=&quot;#ff9900&quot;></option>
        <option value=&quot;#ffff00&quot;></option>
        <option value=&quot;#008a00&quot;></option>
        <option value=&quot;#0066cc&quot;></option>
        <option value=&quot;#9933ff&quot;></option>
        <option selected=&quot;selected&quot;></option>
        <option value=&quot;#facccc&quot;></option>
        <option value=&quot;#ffebcc&quot;></option>
        <option value=&quot;#ffffcc&quot;></option>
        <option value=&quot;#cce8cc&quot;></option>
        <option value=&quot;#cce0f5&quot;></option>
        <option value=&quot;#ebd6ff&quot;></option>
        <option value=&quot;#bbbbbb&quot;></option>
        <option value=&quot;#f06666&quot;></option>
        <option value=&quot;#ffc266&quot;></option>
        <option value=&quot;#ffff66&quot;></option>
        <option value=&quot;#66b966&quot;></option>
        <option value=&quot;#66a3e0&quot;></option>
        <option value=&quot;#c285ff&quot;></option>
        <option value=&quot;#888888&quot;></option>
        <option value=&quot;#a10000&quot;></option>
        <option value=&quot;#b26b00&quot;></option>
        <option value=&quot;#b2b200&quot;></option>
        <option value=&quot;#006100&quot;></option>
        <option value=&quot;#0047b2&quot;></option>
        <option value=&quot;#6b24b2&quot;></option>
        <option value=&quot;#444444&quot;></option>
        <option value=&quot;#5c0000&quot;></option>
        <option value=&quot;#663d00&quot;></option>
        <option value=&quot;#666600&quot;></option>
        <option value=&quot;#003700&quot;></option>
        <option value=&quot;#002966&quot;></option>
        <option value=&quot;#3d1466&quot;></option>
      </select></span>
      <span class=&quot;ql-formats&quot;><select class=&quot;ql-font&quot;>
        <option selected=&quot;selected&quot;></option>
        <option value=&quot;serif&quot;></option>
        <option value=&quot;monospace&quot;></option>
      </select></span>
      <span class=&quot;ql-formats&quot;>
        <select class=&quot;ql-align&quot;>
        <option selected=&quot;selected&quot;></option>
        <option value=&quot;center&quot;></option>
        <option value=&quot;right&quot;></option>
        <option value=&quot;justify&quot;></option>
      </select>
      </span>
        <span class=&quot;ql-formats&quot;><button type=&quot;button&quot; class=&quot;ql-clean&quot;></button></span>
        <span class=&quot;ql-formats&quot;><button type=&quot;button&quot; class=&quot;ql-link&quot;></button></span>
        <!--图片按钮点击事件-->
      <span class=&quot;ql-formats&quot;><button type=&quot;button&quot; @click=&quot;imgClick&quot;>
        <svg viewBox=&quot;0 0 18 18&quot;> <rect class=&quot;ql-stroke&quot; height=&quot;10&quot; width=&quot;12&quot; x=&quot;3&quot; y=&quot;4&quot;></rect> <circle class=&quot;ql-fill&quot; cx=&quot;6&quot; cy=&quot;7&quot; r=&quot;1&quot;></circle> <polyline class=&quot;ql-even ql-fill&quot; points=&quot;5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12&quot;></polyline> </svg>
      </button></span>
        <span class=&quot;ql-formats&quot;><button type=&quot;button&quot; class=&quot;ql-video&quot;></button></span>

      </div>
    </quilleditor>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">quilleditor</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"content"</span>
                 <span class="hljs-attr">ref</span>=<span class="hljs-string">"myTextEditor"</span>
                 <span class="hljs-attr">:options</span>=<span class="hljs-string">"editorOption"</span>
                 @<span class="hljs-attr">change</span>=<span class="hljs-string">"onChange"</span>
                 &gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"toolbar"</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"toolbar"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ql-formats"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ql-bold"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ql-formats"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ql-italic"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ql-formats"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ql-underline"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ql-formats"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ql-strike"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ql-formats"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ql-blockquote"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ql-formats"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ql-code-block"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ql-formats"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ql-header"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"1"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ql-formats"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ql-header"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"2"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ql-formats"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ql-list"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"ordered"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ql-formats"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ql-list"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"bullet"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ql-formats"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ql-script"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"sub"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ql-formats"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ql-script"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"super"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ql-formats"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ql-indent"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"-1"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ql-formats"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ql-indent"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"+1"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ql-formats"</span>&gt;</span> <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ql-direction"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"rtl"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>

      <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ql-formats"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">select</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ql-size"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"small"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">selected</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"large"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"huge"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">select</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ql-formats"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">select</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ql-header"</span> &gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"1"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"2"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"3"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"4"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"5"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"6"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">selected</span>=<span class="hljs-string">"selected"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">select</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ql-formats"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">select</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ql-color"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">selected</span>=<span class="hljs-string">"selected"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"#e60000"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"#ff9900"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"#ffff00"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"#008a00"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"#0066cc"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"#9933ff"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"#ffffff"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"#facccc"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"#ffebcc"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"#ffffcc"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"#cce8cc"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"#cce0f5"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"#ebd6ff"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"#bbbbbb"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"#f06666"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"#ffc266"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"#ffff66"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"#66b966"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"#66a3e0"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"#c285ff"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"#888888"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"#a10000"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"#b26b00"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"#b2b200"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"#006100"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"#0047b2"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"#6b24b2"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"#444444"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"#5c0000"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"#663d00"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"#666600"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"#003700"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"#002966"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"#3d1466"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">select</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
     <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ql-formats"</span>&gt;</span> <span class="hljs-tag">&lt;<span class="hljs-name">select</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ql-background"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"#000000"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"#e60000"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"#ff9900"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"#ffff00"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"#008a00"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"#0066cc"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"#9933ff"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">selected</span>=<span class="hljs-string">"selected"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"#facccc"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"#ffebcc"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"#ffffcc"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"#cce8cc"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"#cce0f5"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"#ebd6ff"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"#bbbbbb"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"#f06666"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"#ffc266"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"#ffff66"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"#66b966"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"#66a3e0"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"#c285ff"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"#888888"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"#a10000"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"#b26b00"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"#b2b200"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"#006100"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"#0047b2"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"#6b24b2"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"#444444"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"#5c0000"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"#663d00"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"#666600"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"#003700"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"#002966"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"#3d1466"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">select</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ql-formats"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">select</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ql-font"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">selected</span>=<span class="hljs-string">"selected"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"serif"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"monospace"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">select</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ql-formats"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">select</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ql-align"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">selected</span>=<span class="hljs-string">"selected"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"center"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"right"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"justify"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">select</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ql-formats"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ql-clean"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ql-formats"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ql-link"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-comment">&lt;!--图片按钮点击事件--&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ql-formats"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"imgClick"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">svg</span> <span class="hljs-attr">viewBox</span>=<span class="hljs-string">"0 0 18 18"</span>&gt;</span> <span class="hljs-tag">&lt;<span class="hljs-name">rect</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ql-stroke"</span> <span class="hljs-attr">height</span>=<span class="hljs-string">"10"</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"12"</span> <span class="hljs-attr">x</span>=<span class="hljs-string">"3"</span> <span class="hljs-attr">y</span>=<span class="hljs-string">"4"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">rect</span>&gt;</span> <span class="hljs-tag">&lt;<span class="hljs-name">circle</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ql-fill"</span> <span class="hljs-attr">cx</span>=<span class="hljs-string">"6"</span> <span class="hljs-attr">cy</span>=<span class="hljs-string">"7"</span> <span class="hljs-attr">r</span>=<span class="hljs-string">"1"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">circle</span>&gt;</span> <span class="hljs-tag">&lt;<span class="hljs-name">polyline</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ql-even ql-fill"</span> <span class="hljs-attr">points</span>=<span class="hljs-string">"5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">polyline</span>&gt;</span> <span class="hljs-tag">&lt;/<span class="hljs-name">svg</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ql-formats"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ql-video"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>

      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">quilleditor</span>&gt;</span></code></pre>
<h2 id="articleHeader1">逻辑处理</h2>
<p>布局完成了，接下来就是逻辑处理了，我们使用cli构建项目，创建两个vue文件</p>
<p><span class="img-wrap"><img data-src="/img/bVQY3M?w=349&amp;h=83" src="https://static.alili.tech/img/bVQY3M?w=349&amp;h=83" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br>Quilleditor.vue是我们对vue-quill-editor的封装<br>CropUpload.vue是我们对vue-image-crop-upload的封装</p>
<p>具体代码请访问<a href="https://github.com/lihualong/quilleditor" rel="nofollow noreferrer" target="_blank"></a><a href="https://github.com/lihualong/quilleditor" rel="nofollow noreferrer" target="_blank">https://github.com/lihualong/...</a></p>
<h2 id="articleHeader2">总结</h2>
<ol>
<li><p>我们是在quill的基础上再封装了一个插件，基本的配置按照quill就好了</p></li>
<li><p>定义props让父组件传值，图片上传的url和file控件的name名称</p></li>
<li><p>处理图片点击的逻辑imgClick方法，判断图片是否裁切，选择不同的处理方式，</p></li>
<li><p>图片处理成功后，并把结果插入quill编辑器，</p></li>
<li><p>我们在父组件调用时都会采用v-model双向绑定，当父组件绑定值时我们使用watch给quill赋值，quill编辑后调用onchange 事件使用this.$emit('input', this.content)给父组件传值</p></li>
</ol>
<p>至此我们的自定义Editor就完成了，跟多的细致的处理就由您发挥了。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue-quill-editor自定义图片上传

## 原文链接
[https://segmentfault.com/a/1190000009877910](https://segmentfault.com/a/1190000009877910)

