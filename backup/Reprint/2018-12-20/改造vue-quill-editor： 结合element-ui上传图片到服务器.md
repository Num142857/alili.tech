---
title: '改造vue-quill-editor： 结合element-ui上传图片到服务器' 
date: 2018-12-20 2:30:10
hidden: true
slug: opusli6kbsp
categories: [reprint]
---

{{< raw >}}

                    
<p><strong>前排提示：现在可以直接使用封装好的插件<a href="https://github.com/NextBoy/vue-quill-editor-upload" rel="nofollow noreferrer" target="_blank">vue-quill-editor-upload</a></strong></p>
<h1 id="articleHeader0">需求概述</h1>
<p>vue-quill-editor是我们再使用vue框架的时候常用的一个富文本编辑器，在进行富文本编辑的时候，我们往往要插入一些图片，vue-quill-editor默认的处理方式是直接将图片转成base64编码，这样的结果是整个富文本的html片段十分冗余，通常来讲，每个服务器端接收的post的数据大小都是有限制的，这样的话有可能导致提交失败，或者是用户体验很差，数据要传递很久才全部传送到服务器。<br>因此，在富文本编辑的过程中，对于图片的处理，我们更合理的做法是将图片上传到服务器，再将图片链接插入到富文本中，以达到最优的体验。<br>废话不多说，接下来直接看如何改造</p>
<h1 id="articleHeader1">改造分析</h1>
<p>查阅网上的资料，我感觉提供的方案都不是特别友好，网上搜索的基本都是这一个方法<br><a href="https://github.com/surmon-china/vue-quill-editor/issues/102" rel="nofollow noreferrer" target="_blank">配合 element-ui 实现上传图片/视频到七牛</a>或者是直接<a href="https://segmentfault.com/a/1190000009877910">重新写一个按钮来进行自定义图片操作</a></p>
<p>坦白讲，上面这2个方法都很特别，也的确有效果，但是我个人还是觉得不完美，第一个方法写得太麻烦，第二个方法有点投机取巧。<br>结合上面两种方法以及官方的文档，我这里提供一个新的改造思路给大家参考。</p>
<h2 id="articleHeader2">引入element-ui</h2>
<p>和第一种方法类似，为了更好的控制上传的图片，我这里也是引用了element-ui的上传图片组件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div>
        <!-- 图片上传组件辅助-->
        <el-upload
                class=&quot;avatar-uploader&quot;
                :action=&quot;serverUrl&quot;
                name=&quot;img&quot;
                :headers=&quot;header&quot;
                :show-file-list=&quot;false&quot;
                :on-success=&quot;uploadSuccess&quot;
                :on-error=&quot;uploadError&quot;
                :before-upload=&quot;beforeUpload&quot;>
        </el-upload>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                serverUrl: '',  // 这里写你要上传的图片服务器地址
                header: {token: sessionStorage.token}  // 有的图片服务器要求请求头需要有token  
            }
        },
        methods: {
            // 上传图片前
            beforeUpload(res, file) {},
            // 上传图片成功
            uploadSuccess(res, file) {},
            // 上传图片失败
            uploadError(res, file) {}
        }
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code class="vue.js"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-comment">&lt;!-- 图片上传组件辅助--&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">el-upload</span>
                <span class="hljs-attr">class</span>=<span class="hljs-string">"avatar-uploader"</span>
                <span class="hljs-attr">:action</span>=<span class="hljs-string">"serverUrl"</span>
                <span class="hljs-attr">name</span>=<span class="hljs-string">"img"</span>
                <span class="hljs-attr">:headers</span>=<span class="hljs-string">"header"</span>
                <span class="hljs-attr">:show-file-list</span>=<span class="hljs-string">"false"</span>
                <span class="hljs-attr">:on-success</span>=<span class="hljs-string">"uploadSuccess"</span>
                <span class="hljs-attr">:on-error</span>=<span class="hljs-string">"uploadError"</span>
                <span class="hljs-attr">:before-upload</span>=<span class="hljs-string">"beforeUpload"</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">el-upload</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
        data() {
            <span class="hljs-keyword">return</span> {
                <span class="hljs-attr">serverUrl</span>: <span class="hljs-string">''</span>,  <span class="hljs-comment">// 这里写你要上传的图片服务器地址</span>
                header: {<span class="hljs-attr">token</span>: sessionStorage.token}  <span class="hljs-comment">// 有的图片服务器要求请求头需要有token  </span>
            }
        },
        <span class="hljs-attr">methods</span>: {
            <span class="hljs-comment">// 上传图片前</span>
            beforeUpload(res, file) {},
            <span class="hljs-comment">// 上传图片成功</span>
            uploadSuccess(res, file) {},
            <span class="hljs-comment">// 上传图片失败</span>
            uploadError(res, file) {}
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>这里要使用element-ui主要有2个好处</p>
<ul><li>可以对图片上传前，图片上传成功，图片上传失败等情况进行操作，也就是代码中的</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  :on-success=&quot;uploadSuccess&quot;  //  图片上传成功
  :on-error=&quot;uploadError&quot;  // 图片上传失败
  :before-upload=&quot;beforeUpload&quot;  // 图片上传前" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code>  :<span class="hljs-keyword">on</span>-success=<span class="hljs-string">"uploadSuccess"</span>  //  图片上传成功
  :<span class="hljs-keyword">on</span>-error=<span class="hljs-string">"uploadError"</span>  // 图片上传失败
  :<span class="hljs-keyword">before</span>-upload=<span class="hljs-string">"beforeUpload"</span> <span class="hljs-comment"> // 图片上传前</span></code></pre>
<ul><li>使用element-ui的<a href="http://element-cn.eleme.io/#/zh-CN/component/loading" rel="nofollow noreferrer" target="_blank">v-loading显示loading动画</a>
</li></ul>
<h2 id="articleHeader3">引入<a href="https://quilljs.com/docs/quickstart/" rel="nofollow noreferrer" target="_blank">vue-quill-editor</a>
</h2>
<p>这里对于如何安装和引入vue-quill-editor和就不多做陈述了，不清楚的同学自己Google下哈。<br>在代码中写入vue-quill-editor后如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div>
        <!-- 图片上传组件辅助-->
        <el-upload
                class=&quot;avatar-uploader&quot;
                :action=&quot;serverUrl&quot;
                name=&quot;img&quot;
                :headers=&quot;header&quot;
                :show-file-list=&quot;false&quot;
                :on-success=&quot;uploadSuccess&quot;
                :on-error=&quot;uploadError&quot;
                :before-upload=&quot;beforeUpload&quot;>
        </el-upload>
        <!--富文本编辑器组件-->
       <el-row v-loading=&quot;uillUpdateImg&quot;>
        <quill-editor
                v-model=&quot;detailContent&quot;
                ref=&quot;myQuillEditor&quot;
                :options=&quot;editorOption&quot;
                @change=&quot;onEditorChange($event)&quot;
                @ready=&quot;onEditorReady($event)&quot;
        >
        </quill-editor>
       </el-row>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                quillUpdateImg: false, // 根据图片上传状态来确定是否显示loading动画，刚开始是false,不显示
                serverUrl: '',  // 这里写你要上传的图片服务器地址
                header: {token: sessionStorage.token},  // 有的图片服务器要求请求头需要有token之类的参数，写在这里
                detailContent: '', // 富文本内容
                editorOption: {}  // 富文本编辑器配置
            }
        },
        methods: {
            // 上传图片前
            beforeUpload(res, file) {},
            // 上传图片成功
            uploadSuccess(res, file) {},
            // 上传图片失败
            uploadError(res, file) {}
        }
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-comment">&lt;!-- 图片上传组件辅助--&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">el-upload</span>
                <span class="hljs-attr">class</span>=<span class="hljs-string">"avatar-uploader"</span>
                <span class="hljs-attr">:action</span>=<span class="hljs-string">"serverUrl"</span>
                <span class="hljs-attr">name</span>=<span class="hljs-string">"img"</span>
                <span class="hljs-attr">:headers</span>=<span class="hljs-string">"header"</span>
                <span class="hljs-attr">:show-file-list</span>=<span class="hljs-string">"false"</span>
                <span class="hljs-attr">:on-success</span>=<span class="hljs-string">"uploadSuccess"</span>
                <span class="hljs-attr">:on-error</span>=<span class="hljs-string">"uploadError"</span>
                <span class="hljs-attr">:before-upload</span>=<span class="hljs-string">"beforeUpload"</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">el-upload</span>&gt;</span>
        <span class="hljs-comment">&lt;!--富文本编辑器组件--&gt;</span>
       <span class="hljs-tag">&lt;<span class="hljs-name">el-row</span> <span class="hljs-attr">v-loading</span>=<span class="hljs-string">"uillUpdateImg"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">quill-editor</span>
                <span class="hljs-attr">v-model</span>=<span class="hljs-string">"detailContent"</span>
                <span class="hljs-attr">ref</span>=<span class="hljs-string">"myQuillEditor"</span>
                <span class="hljs-attr">:options</span>=<span class="hljs-string">"editorOption"</span>
                @<span class="hljs-attr">change</span>=<span class="hljs-string">"onEditorChange($event)"</span>
                @<span class="hljs-attr">ready</span>=<span class="hljs-string">"onEditorReady($event)"</span>
        &gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">quill-editor</span>&gt;</span>
       <span class="hljs-tag">&lt;/<span class="hljs-name">el-row</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
        data() {
            <span class="hljs-keyword">return</span> {
                <span class="hljs-attr">quillUpdateImg</span>: <span class="hljs-literal">false</span>, <span class="hljs-comment">// 根据图片上传状态来确定是否显示loading动画，刚开始是false,不显示</span>
                serverUrl: <span class="hljs-string">''</span>,  <span class="hljs-comment">// 这里写你要上传的图片服务器地址</span>
                header: {<span class="hljs-attr">token</span>: sessionStorage.token},  <span class="hljs-comment">// 有的图片服务器要求请求头需要有token之类的参数，写在这里</span>
                detailContent: <span class="hljs-string">''</span>, <span class="hljs-comment">// 富文本内容</span>
                editorOption: {}  <span class="hljs-comment">// 富文本编辑器配置</span>
            }
        },
        <span class="hljs-attr">methods</span>: {
            <span class="hljs-comment">// 上传图片前</span>
            beforeUpload(res, file) {},
            <span class="hljs-comment">// 上传图片成功</span>
            uploadSuccess(res, file) {},
            <span class="hljs-comment">// 上传图片失败</span>
            uploadError(res, file) {}
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>这里可以看到我们用一个&lt;el-row&gt;包裹我们的富文本组件，是为了使用loading动画，就是v-loading这个设置</strong></p>
<h2 id="articleHeader4">重写点击图片按钮事件</h2>
<p>从下图可以看到，默认的配置中，整个工具栏具备了所有的功能，自然也包括红圈中的图片上传功能了。<br>那么接下来我们要怎么去重写这个按钮的事件呢。<br><span class="img-wrap"><img data-src="/img/bV0648?w=1036&amp;h=433" src="https://static.alili.tech/img/bV0648?w=1036&amp;h=433" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>很简单，我们需要在editorOption配置中这么写</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default {
data() {
            return {
            quillUpdateImg: false, // 根据图片上传状态来确定是否显示loading动画，刚开始是false,不显示
                serverUrl: '',  // 这里写你要上传的图片服务器地址
                header: {token: sessionStorage.token},  // 有的图片服务器要求请求头需要有token之类的参数，写在这里
                detailContent: '', // 富文本内容
                editorOption: {
                    placeholder: '',
                    theme: 'snow',  // or 'bubble'
                    modules: {
                        toolbar: {
                            container: toolbarOptions,  // 工具栏
                            handlers: {
                                'image': function (value) {
                                    if (value) {
                                        document.querySelector('#quill-upload input').click()
                                    } else {
                                        this.quill.format('image', false);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">export</span> <span class="hljs-selector-tag">default</span> {
<span class="hljs-selector-tag">data</span>() {
            <span class="hljs-selector-tag">return</span> {
            <span class="hljs-attribute">quillUpdateImg</span>: false, <span class="hljs-comment">// 根据图片上传状态来确定是否显示loading动画，刚开始是false,不显示</span>
                <span class="hljs-attribute">serverUrl</span>: <span class="hljs-string">''</span>,  <span class="hljs-comment">// 这里写你要上传的图片服务器地址</span>
                <span class="hljs-attribute">header</span>: {<span class="hljs-attribute">token</span>: sessionStorage.token},  <span class="hljs-comment">// 有的图片服务器要求请求头需要有token之类的参数，写在这里</span>
                <span class="hljs-attribute">detailContent</span>: <span class="hljs-string">''</span>, <span class="hljs-comment">// 富文本内容</span>
                <span class="hljs-attribute">editorOption</span>: {
                    <span class="hljs-attribute">placeholder</span>: <span class="hljs-string">''</span>,
                    <span class="hljs-attribute">theme</span>: <span class="hljs-string">'snow'</span>,  <span class="hljs-comment">// or 'bubble'</span>
                    <span class="hljs-attribute">modules</span>: {
                        <span class="hljs-attribute">toolbar</span>: {
                            <span class="hljs-attribute">container</span>: toolbarOptions,  <span class="hljs-comment">// 工具栏</span>
                            <span class="hljs-attribute">handlers</span>: {
                                <span class="hljs-string">'image'</span>: function (value) {
                                    if (value) {
                                        document.querySelector(<span class="hljs-string">'#quill-upload input'</span>).click()
                                    } <span class="hljs-selector-tag">else</span> {
                                        <span class="hljs-selector-tag">this</span><span class="hljs-selector-class">.quill</span><span class="hljs-selector-class">.format</span>(<span class="hljs-string">'image'</span>, false);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
}</code></pre>
<p>配置中的handlers是用来定义自定义程序的，然而我们配置完后会懵逼地发现，<strong>整个富文本编辑器的工具栏的图片上传等按钮都不见了</strong> 只保留了几个基本的富文本功能。</p>
<p>这个是因为<strong>添加自定义处理程序将覆盖默认的工具栏和主题行为</strong><br>因此我们要再自行配置下我们需要的工具栏，所有功能的配置如下，大家可以按需配置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script>
// 工具栏配置
const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],

  [{'header': 1}, {'header': 2}],               // custom button values
  [{'list': 'ordered'}, {'list': 'bullet'}],
  [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
  [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
  [{'direction': 'rtl'}],                         // text direction

  [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
  [{'header': [1, 2, 3, 4, 5, 6, false]}],

  [{'color': []}, {'background': []}],          // dropdown with defaults from theme
  [{'font': []}],
  [{'align': []}],
  ['link', 'image', 'video'],
  ['clean']                                         // remove formatting button
]

export default {
data() {
 return {
editorOption: {
          placeholder: '',
          theme: 'snow',  // or 'bubble'
          modules: {
            toolbar: {
              container: toolbarOptions,  // 工具栏
              handlers: {
                'image': function (value) {
                  if (value) {
                    alert(1)
                  } else {
                    this.quill.format('image', false);
                  }
                }
              }
            }
          }
        }
    }
 }
}

</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-comment">// 工具栏配置</span>
<span class="hljs-keyword">const</span> toolbarOptions = [
  [<span class="hljs-string">'bold'</span>, <span class="hljs-string">'italic'</span>, <span class="hljs-string">'underline'</span>, <span class="hljs-string">'strike'</span>],        <span class="hljs-comment">// toggled buttons</span>
  [<span class="hljs-string">'blockquote'</span>, <span class="hljs-string">'code-block'</span>],

  [{<span class="hljs-string">'header'</span>: <span class="hljs-number">1</span>}, {<span class="hljs-string">'header'</span>: <span class="hljs-number">2</span>}],               <span class="hljs-comment">// custom button values</span>
  [{<span class="hljs-string">'list'</span>: <span class="hljs-string">'ordered'</span>}, {<span class="hljs-string">'list'</span>: <span class="hljs-string">'bullet'</span>}],
  [{<span class="hljs-string">'script'</span>: <span class="hljs-string">'sub'</span>}, {<span class="hljs-string">'script'</span>: <span class="hljs-string">'super'</span>}],      <span class="hljs-comment">// superscript/subscript</span>
  [{<span class="hljs-string">'indent'</span>: <span class="hljs-string">'-1'</span>}, {<span class="hljs-string">'indent'</span>: <span class="hljs-string">'+1'</span>}],          <span class="hljs-comment">// outdent/indent</span>
  [{<span class="hljs-string">'direction'</span>: <span class="hljs-string">'rtl'</span>}],                         <span class="hljs-comment">// text direction</span>

  [{<span class="hljs-string">'size'</span>: [<span class="hljs-string">'small'</span>, <span class="hljs-literal">false</span>, <span class="hljs-string">'large'</span>, <span class="hljs-string">'huge'</span>]}],  <span class="hljs-comment">// custom dropdown</span>
  [{<span class="hljs-string">'header'</span>: [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>, <span class="hljs-number">6</span>, <span class="hljs-literal">false</span>]}],

  [{<span class="hljs-string">'color'</span>: []}, {<span class="hljs-string">'background'</span>: []}],          <span class="hljs-comment">// dropdown with defaults from theme</span>
  [{<span class="hljs-string">'font'</span>: []}],
  [{<span class="hljs-string">'align'</span>: []}],
  [<span class="hljs-string">'link'</span>, <span class="hljs-string">'image'</span>, <span class="hljs-string">'video'</span>],
  [<span class="hljs-string">'clean'</span>]                                         <span class="hljs-comment">// remove formatting button</span>
]

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
data() {
 <span class="hljs-keyword">return</span> {
<span class="hljs-attr">editorOption</span>: {
          <span class="hljs-attr">placeholder</span>: <span class="hljs-string">''</span>,
          <span class="hljs-attr">theme</span>: <span class="hljs-string">'snow'</span>,  <span class="hljs-comment">// or 'bubble'</span>
          modules: {
            <span class="hljs-attr">toolbar</span>: {
              <span class="hljs-attr">container</span>: toolbarOptions,  <span class="hljs-comment">// 工具栏</span>
              handlers: {
                <span class="hljs-string">'image'</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">value</span>) </span>{
                  <span class="hljs-keyword">if</span> (value) {
                    alert(<span class="hljs-number">1</span>)
                  } <span class="hljs-keyword">else</span> {
                    <span class="hljs-keyword">this</span>.quill.format(<span class="hljs-string">'image'</span>, <span class="hljs-literal">false</span>);
                  }
                }
              }
            }
          }
        }
    }
 }
}

</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p><strong>由于这里的工具栏配置列举了所有，看起来很长一堆，我建议大家可以写在单独一个文件，然后再引入，美观一点</strong></p>
<h2 id="articleHeader5">自定义按钮事件打开上传图片</h2>
<p>经过上面的配置，大家点击一下图片，可以看出弹出了个1，说明我们的自定义事件生效了，那么接下来，大家的思路是不是就很清晰啦？<br>我们需要在handlers里面继续完善我们的图片点击事件。</p>
<ul><li>第一步，点击按钮选择本地图片</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="handlers: {
           'image': function (value) {
             if (value) {
             // 触发input框选择图片文件
                document.querySelector('.avatar-uploader input').click()
               } else {
                this.quill.format('image', false);
              }
           }
        }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>handlers: {
           <span class="hljs-string">'image'</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">value</span>) </span>{
             <span class="hljs-keyword">if</span> (value) {
             <span class="hljs-comment">// 触发input框选择图片文件</span>
                <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'.avatar-uploader input'</span>).click()
               } <span class="hljs-keyword">else</span> {
                <span class="hljs-keyword">this</span>.quill.format(<span class="hljs-string">'image'</span>, <span class="hljs-literal">false</span>);
              }
           }
        }</code></pre>
<p>在这里我们的自定义事件就结束了，接下来图片上传成功或者失败都由</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" :on-success=&quot;uploadSuccess&quot;  //  图片上传成功
  :on-error=&quot;uploadError&quot;  // 图片上传失败
  :before-upload=&quot;beforeUpload&quot;  // 图片上传前" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code> :<span class="hljs-keyword">on</span>-success=<span class="hljs-string">"uploadSuccess"</span>  //  图片上传成功
  :<span class="hljs-keyword">on</span>-error=<span class="hljs-string">"uploadError"</span>  // 图片上传失败
  :<span class="hljs-keyword">before</span>-upload=<span class="hljs-string">"beforeUpload"</span> <span class="hljs-comment"> // 图片上传前</span></code></pre>
<p>这三个函数来处理</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" // 富文本图片上传前
            beforeUpload() {
                // 显示loading动画
                this.quillUpdateImg = true
            },
            
            uploadSuccess(res, file) {
                // res为图片服务器返回的数据
                // 获取富文本组件实例
                let quill = this.$refs.myQuillEditor.quill
                // 如果上传成功
                if (res.code === '200' &amp;&amp; res.info !== null) {
                    // 获取光标所在位置
                    let length = quill.getSelection().index;
                    // 插入图片  res.info为服务器返回的图片地址
                    quill.insertEmbed(length, 'image', res.info)
                    // 调整光标到最后
                    quill.setSelection(length + 1)
                } else {
                    this.$message.error('图片插入失败')
                }
                // loading动画消失
                this.quillUpdateImg = false
            },
       
            // 富文本图片上传失败
            uploadError() {
                // loading动画消失
                this.quillUpdateImg = false
                this.$message.error('图片插入失败')
            }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code> <span class="hljs-comment">// 富文本图片上传前</span>
            beforeUpload() {
                <span class="hljs-comment">// 显示loading动画</span>
                <span class="hljs-keyword">this</span>.quillUpdateImg = <span class="hljs-literal">true</span>
            },
            
            uploadSuccess(res, file) {
                <span class="hljs-comment">// res为图片服务器返回的数据</span>
                <span class="hljs-comment">// 获取富文本组件实例</span>
                let quill = <span class="hljs-keyword">this</span>.$refs.myQuillEditor.quill
                <span class="hljs-comment">// 如果上传成功</span>
                <span class="hljs-keyword">if</span> (res.code === <span class="hljs-string">'200'</span> &amp;&amp; res.info !== <span class="hljs-literal">null</span>) {
                    <span class="hljs-comment">// 获取光标所在位置</span>
                    let length = quill.getSelection().index;
                    <span class="hljs-comment">// 插入图片  res.info为服务器返回的图片地址</span>
                    quill.insertEmbed(length, <span class="hljs-string">'image'</span>, res.info)
                    <span class="hljs-comment">// 调整光标到最后</span>
                    quill.setSelection(length + <span class="hljs-number">1</span>)
                } <span class="hljs-keyword">else</span> {
                    <span class="hljs-keyword">this</span>.$message.error(<span class="hljs-string">'图片插入失败'</span>)
                }
                <span class="hljs-comment">// loading动画消失</span>
                <span class="hljs-keyword">this</span>.quillUpdateImg = <span class="hljs-literal">false</span>
            },
       
            <span class="hljs-comment">// 富文本图片上传失败</span>
            uploadError() {
                <span class="hljs-comment">// loading动画消失</span>
                <span class="hljs-keyword">this</span>.quillUpdateImg = <span class="hljs-literal">false</span>
                <span class="hljs-keyword">this</span>.$message.error(<span class="hljs-string">'图片插入失败'</span>)
            }</code></pre>
<p>好了，本文就讲到这，目前运行良好，整个文章的代码比较多，但是实际上需要去深入理解的地方很少，我们只是简单重定义了图片按钮的触发事件。<br>对了，大家别忘记安装element-ui和vue-quill-editor哦。<br>如果有错误，欢迎大家多提提意见，希望这篇文章能帮到有需要的人。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
改造vue-quill-editor： 结合element-ui上传图片到服务器

## 原文链接
[https://segmentfault.com/a/1190000012620431](https://segmentfault.com/a/1190000012620431)

