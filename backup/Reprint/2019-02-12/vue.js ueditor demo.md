---
title: 'vue.js ueditor demo' 
date: 2019-02-12 2:30:12
hidden: true
slug: x1ay6karvhd
categories: [reprint]
---

{{< raw >}}

                    
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>
<head>
    <meta charset=&quot;utf-8&quot;>
</head>
<body>

    <div class='container' id=&quot;demo&quot;>
        <textarea v-model=&quot;content&quot;></textarea>
        <div id=&quot;editor&quot; v-ueditor=&quot;content&quot; :config=&quot;config&quot;></div>
    </div>

    <script src=&quot;http://apps.bdimg.com/libs/ueditor/1.4.3.1/ueditor.config.js&quot;></script>
    <script src=&quot;http://apps.bdimg.com/libs/ueditor/1.4.3.1/ueditor.all.js&quot;></script>
    <script src=&quot;http://apps.bdimg.com/libs/ueditor/1.4.3.1/lang/zh-cn/zh-cn.js&quot;></script>
    <script src=&quot;http://cdn.bootcss.com/vue/1.0.17/vue.min.js&quot;></script>

    <script type=&quot;text/javascript&quot;>
        //http://vuejs.org.cn/guide/custom-directive.html
        Vue.directive('ueditor', {
            params: ['config'],
            twoWay: true,
            bind: function () {
                var self = this;
                this.el.id = 'ueditor' + new Date().getTime().toString()
                this.editor = UE.getEditor(this.el.id, this.params.config)
                this.editor.ready(function () {
                    self.editorReady = true
                    self.editor.addListener(&quot;contentChange&quot;, function () {
                        self.set(self.editor.getContent())
                    })
                    self.update(self.vm.$get(self.expression))
                })
            },
            update: function (newValue, oldValue) {
                if (this.editorReady) {
                    this.editor.setContent(newValue)
                }
            },
            unbind: function () {
                this.editor.destroy()
            }
        })

        var vm = new Vue({
            el: '#demo',
            data: function () {
                return {
                    content: 'Hello Vue.js!',
                    config: {
                        toolbars: [
                            ['fullscreen', 'source', 'undo', 'redo', 'bold']
                        ]
                    }
                }
            }
        })
    </script>
</body>
</html>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">'container'</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"demo"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">textarea</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"content"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">textarea</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"editor"</span> <span class="hljs-attr">v-ueditor</span>=<span class="hljs-string">"content"</span> <span class="hljs-attr">:config</span>=<span class="hljs-string">"config"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://apps.bdimg.com/libs/ueditor/1.4.3.1/ueditor.config.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://apps.bdimg.com/libs/ueditor/1.4.3.1/ueditor.all.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://apps.bdimg.com/libs/ueditor/1.4.3.1/lang/zh-cn/zh-cn.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://cdn.bootcss.com/vue/1.0.17/vue.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="actionscript">
        <span class="hljs-comment">//http://vuejs.org.cn/guide/custom-directive.html</span>
        Vue.directive(<span class="hljs-string">'ueditor'</span>, {
            params: [<span class="hljs-string">'config'</span>],
            twoWay: <span class="hljs-literal">true</span>,
            bind: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
                <span class="hljs-keyword">var</span> self = <span class="hljs-keyword">this</span>;
                <span class="hljs-keyword">this</span>.el.id = <span class="hljs-string">'ueditor'</span> + <span class="hljs-keyword">new</span> Date().getTime().toString()
                <span class="hljs-keyword">this</span>.editor = UE.getEditor(<span class="hljs-keyword">this</span>.el.id, <span class="hljs-keyword">this</span>.params.config)
                <span class="hljs-keyword">this</span>.editor.ready(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
                    self.editorReady = <span class="hljs-literal">true</span>
                    self.editor.addListener(<span class="hljs-string">"contentChange"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
                        self.set(self.editor.getContent())
                    })
                    self.update(self.vm.$<span class="hljs-keyword">get</span>(self.expression))
                })
            },
            update: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(newValue, oldValue)</span> </span>{
                <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.editorReady) {
                    <span class="hljs-keyword">this</span>.editor.setContent(newValue)
                }
            },
            unbind: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
                <span class="hljs-keyword">this</span>.editor.destroy()
            }
        })

        <span class="hljs-keyword">var</span> vm = <span class="hljs-keyword">new</span> Vue({
            el: <span class="hljs-string">'#demo'</span>,
            data: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
                <span class="hljs-keyword">return</span> {
                    content: <span class="hljs-string">'Hello Vue.js!'</span>,
                    config: {
                        toolbars: [
                            [<span class="hljs-string">'fullscreen'</span>, <span class="hljs-string">'source'</span>, <span class="hljs-string">'undo'</span>, <span class="hljs-string">'redo'</span>, <span class="hljs-string">'bold'</span>]
                        ]
                    }
                }
            }
        })
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</code></pre>
<hr>
<p>1.0</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div v-el:editor></div>
</template>

<script>
    //<ueditor :value.sync=&quot;str&quot; :config=&quot;config&quot;></ueditor>
    module.exports = {
        props: {
            value: {
                type: String,
                default: null
            },
            config: {
                type: Object,
                default: {}
            }
        },
        ready() {
            let id = new Date().getTime().toString()

            this.$els.editor.id = id
            this.editor = UE.getEditor(id, this.config)

            this.editor.ready(function () {
                this.editor.setContent(this.value)

                this.editor.addListener(&quot;contentChange&quot;, function () {
                    let s = this.editor.getContent()
                    this.$set('value', s)
                }.bind(this))

                this.$emit('ready', this.editor)
            }.bind(this))
        }
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-el:editor</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-comment">//&lt;ueditor :value.sync="str" :config="config"&gt;&lt;/ueditor&gt;</span>
    <span class="hljs-built_in">module</span>.exports = {
        <span class="hljs-attr">props</span>: {
            <span class="hljs-attr">value</span>: {
                <span class="hljs-attr">type</span>: <span class="hljs-built_in">String</span>,
                <span class="hljs-attr">default</span>: <span class="hljs-literal">null</span>
            },
            <span class="hljs-attr">config</span>: {
                <span class="hljs-attr">type</span>: <span class="hljs-built_in">Object</span>,
                <span class="hljs-attr">default</span>: {}
            }
        },
        ready() {
            <span class="hljs-keyword">let</span> id = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().getTime().toString()

            <span class="hljs-keyword">this</span>.$els.editor.id = id
            <span class="hljs-keyword">this</span>.editor = UE.getEditor(id, <span class="hljs-keyword">this</span>.config)

            <span class="hljs-keyword">this</span>.editor.ready(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                <span class="hljs-keyword">this</span>.editor.setContent(<span class="hljs-keyword">this</span>.value)

                <span class="hljs-keyword">this</span>.editor.addListener(<span class="hljs-string">"contentChange"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                    <span class="hljs-keyword">let</span> s = <span class="hljs-keyword">this</span>.editor.getContent()
                    <span class="hljs-keyword">this</span>.$set(<span class="hljs-string">'value'</span>, s)
                }.bind(<span class="hljs-keyword">this</span>))

                <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">'ready'</span>, <span class="hljs-keyword">this</span>.editor)
            }.bind(<span class="hljs-keyword">this</span>))
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<hr>
<p>2.0</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div ref=&quot;editor&quot;></div>
</template>

<script>
    let guidGenerator = require('src/utils/guidGenerator')

    //<ueditor v-model=&quot;str&quot; :config=&quot;config&quot;></ueditor>
    module.exports = {
        props: {
            value: {
                type: String,
                default: null
            },
            config: {
                type: Object,
                default: {}
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                // 保证 this.$el 已经插入文档
                let id = guidGenerator()

                this.$refs.editor.id = id
                this.editor = UE.getEditor(id, this.config)

                this.editor.ready(function () {
                    this.editor.setContent(this.value)

                    this.editor.addListener(&quot;contentChange&quot;, function () {
                        this.$emit('input', this.editor.getContent())
                    }.bind(this))

                    this.$emit('ready', this.editor)
                }.bind(this))
            })
        }
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">"editor"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">let</span> guidGenerator = <span class="hljs-built_in">require</span>(<span class="hljs-string">'src/utils/guidGenerator'</span>)

    <span class="hljs-comment">//&lt;ueditor v-model="str" :config="config"&gt;&lt;/ueditor&gt;</span>
    <span class="hljs-built_in">module</span>.exports = {
        <span class="hljs-attr">props</span>: {
            <span class="hljs-attr">value</span>: {
                <span class="hljs-attr">type</span>: <span class="hljs-built_in">String</span>,
                <span class="hljs-attr">default</span>: <span class="hljs-literal">null</span>
            },
            <span class="hljs-attr">config</span>: {
                <span class="hljs-attr">type</span>: <span class="hljs-built_in">Object</span>,
                <span class="hljs-attr">default</span>: {}
            }
        },
        <span class="hljs-attr">mounted</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">this</span>.$nextTick(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                <span class="hljs-comment">// 保证 this.$el 已经插入文档</span>
                <span class="hljs-keyword">let</span> id = guidGenerator()

                <span class="hljs-keyword">this</span>.$refs.editor.id = id
                <span class="hljs-keyword">this</span>.editor = UE.getEditor(id, <span class="hljs-keyword">this</span>.config)

                <span class="hljs-keyword">this</span>.editor.ready(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                    <span class="hljs-keyword">this</span>.editor.setContent(<span class="hljs-keyword">this</span>.value)

                    <span class="hljs-keyword">this</span>.editor.addListener(<span class="hljs-string">"contentChange"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                        <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">'input'</span>, <span class="hljs-keyword">this</span>.editor.getContent())
                    }.bind(<span class="hljs-keyword">this</span>))

                    <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">'ready'</span>, <span class="hljs-keyword">this</span>.editor)
                }.bind(<span class="hljs-keyword">this</span>))
            })
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue.js ueditor demo

## 原文链接
[https://segmentfault.com/a/1190000004874545](https://segmentfault.com/a/1190000004874545)

