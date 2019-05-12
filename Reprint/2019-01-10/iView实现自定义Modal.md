---
title: 'iView实现自定义Modal' 
date: 2019-01-10 2:30:08
hidden: true
slug: smx2p0i8ycm
categories: [reprint]
---

{{< raw >}}

                    
<p>Modal组件是iView库中较常用的一个，而如何利用render实现一个自定义的Modal在官方wiki中并没有详细说明。我在这里将举例说明：</p>
<p>所谓自定义内容，是指使用一个自定义的组件作为Modal框的内容。在我的实例中，我使用的内容组件包含有两个Input组件，用于实现两个变量的输入。</p>
<blockquote><p>自定义组件add.vue</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <Row>
        <div class=&quot;wrapper&quot;>
            <h4>
                <Icon type=&quot;heart&quot;></Icon>&amp;nbsp;save
            </h4>
        </div>
        <div class=&quot;wrapper&quot;>
            <Input v-model=&quot;value1&quot; @on-change=&quot;value1Change&quot;></Input>
        </div>
        <div class=&quot;wrapper&quot;>
            <Input v-model=&quot;value2&quot; @on-change=&quot;value2Change&quot;></Input>
        </div>
    </Row>
</template>
<script>
    export default {  
        name: 'add',
        data() {
            return {
                value1:'',
                value2:''
            }
        },
        methods:{
            value1Change:function() {
                var obj = this
                this.$emit('value1', obj.value1)
            },
            value2Change:function() {
                var obj = this
                this.$emit('value2', obj.value2)
            }
        } 
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">Row</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"wrapper"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">h4</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">Icon</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"heart"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">Icon</span>&gt;</span>&amp;nbsp;save
            <span class="hljs-tag">&lt;/<span class="hljs-name">h4</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"wrapper"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">Input</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"value1"</span> @<span class="hljs-attr">on-change</span>=<span class="hljs-string">"value1Change"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">Input</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"wrapper"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">Input</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"value2"</span> @<span class="hljs-attr">on-change</span>=<span class="hljs-string">"value2Change"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">Input</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">Row</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {  
        <span class="hljs-attr">name</span>: <span class="hljs-string">'add'</span>,
        data() {
            <span class="hljs-keyword">return</span> {
                <span class="hljs-attr">value1</span>:<span class="hljs-string">''</span>,
                <span class="hljs-attr">value2</span>:<span class="hljs-string">''</span>
            }
        },
        <span class="hljs-attr">methods</span>:{
            <span class="hljs-attr">value1Change</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                <span class="hljs-keyword">var</span> obj = <span class="hljs-keyword">this</span>
                <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">'value1'</span>, obj.value1)
            },
            <span class="hljs-attr">value2Change</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                <span class="hljs-keyword">var</span> obj = <span class="hljs-keyword">this</span>
                <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">'value2'</span>, obj.value2)
            }
        } 
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>在这个组件中，为两个Input组件分别定义on-change事件的方法。只要value1的值或者value2的值发生变化，就会向父组件emit对应的事件value1和value2。</p>
<blockquote><p>父组件content.vue</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <template>
        <Button @click=&quot;openModal&quot;>弹出模态框</Button>
    </template>
    <script>
        import add from './content/add.vue'
        export default {
            data() {
                return {
                   v1:'',
                   v2:''
                }
            },
            components:{
                add
            },
            methods:{
                openModal: function() {
                    this.$Modal.confirm({
                        scrollable:true,
                        okText:'保存',
                        render: (h) => {
                            return h(add, {
                                props: {
                                   
                                },
                                on: {
                                    value1: (value1) => {
                                        this.v1 = value1
                                    },
                                    value2: (value2) => {
                                        this.v2 = value2
                                    }
                                }
                            })
                        },
                        onOk: () => {
                            if (this.v1 == '' || this.v2 == '') {
                                this.$Message.error('信息填写不完整!')
                            }
                            const msg = this.$Message.loading({
                                content: '正在保存..',
                                duration: 0
                            })
                            this.saveLink(msg)
                        }                        
                    })
                }
            } 
        }
    </script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>    <span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"openModal"</span>&gt;</span>弹出模态框<span class="hljs-tag">&lt;/<span class="hljs-name">Button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-keyword">import</span> add <span class="hljs-keyword">from</span> <span class="hljs-string">'./content/add.vue'</span>
        <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
            data() {
                <span class="hljs-keyword">return</span> {
                   <span class="hljs-attr">v1</span>:<span class="hljs-string">''</span>,
                   <span class="hljs-attr">v2</span>:<span class="hljs-string">''</span>
                }
            },
            <span class="hljs-attr">components</span>:{
                add
            },
            <span class="hljs-attr">methods</span>:{
                <span class="hljs-attr">openModal</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                    <span class="hljs-keyword">this</span>.$Modal.confirm({
                        <span class="hljs-attr">scrollable</span>:<span class="hljs-literal">true</span>,
                        <span class="hljs-attr">okText</span>:<span class="hljs-string">'保存'</span>,
                        <span class="hljs-attr">render</span>: <span class="hljs-function">(<span class="hljs-params">h</span>) =&gt;</span> {
                            <span class="hljs-keyword">return</span> h(add, {
                                <span class="hljs-attr">props</span>: {
                                   
                                },
                                <span class="hljs-attr">on</span>: {
                                    <span class="hljs-attr">value1</span>: <span class="hljs-function">(<span class="hljs-params">value1</span>) =&gt;</span> {
                                        <span class="hljs-keyword">this</span>.v1 = value1
                                    },
                                    <span class="hljs-attr">value2</span>: <span class="hljs-function">(<span class="hljs-params">value2</span>) =&gt;</span> {
                                        <span class="hljs-keyword">this</span>.v2 = value2
                                    }
                                }
                            })
                        },
                        <span class="hljs-attr">onOk</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
                            <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.v1 == <span class="hljs-string">''</span> || <span class="hljs-keyword">this</span>.v2 == <span class="hljs-string">''</span>) {
                                <span class="hljs-keyword">this</span>.$Message.error(<span class="hljs-string">'信息填写不完整!'</span>)
                            }
                            <span class="hljs-keyword">const</span> msg = <span class="hljs-keyword">this</span>.$Message.loading({
                                <span class="hljs-attr">content</span>: <span class="hljs-string">'正在保存..'</span>,
                                <span class="hljs-attr">duration</span>: <span class="hljs-number">0</span>
                            })
                            <span class="hljs-keyword">this</span>.saveLink(msg)
                        }                        
                    })
                }
            } 
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>在父组件中，引入自定义内容组件add(注意：箭头函数中组件为 add 而不是 'add' )，并监听事件value1和value2，及时为data中v1和v2赋值。若在此过程中父组件有需要传递给内容组件的参数，需要在props中填入。</p>
<p>onOk项后定义触发模态框中ok按钮的回调函数。本例中是检查input中输入的值是否为空，并在接口中上传数据。</p>
<p>这样，iView中一个自定义Modal就通过render方法实现了。</p>
<p>最近做了个项目，采用前后分离的模式，而前端使用了iView。作为一个后端程序员，遇见了不少坑,项目上线后我会把我解决的问题总结下，陆续写成文章。既方便自己查看，也希望可以帮助到跟我一样的"小白"。</p>
<p>个人新项目上线后，我会push到<a href="https://github.com/by-zhang" rel="nofollow noreferrer" target="_blank">我的github</a>。希望大家可以体验下，给我点建议，如果能给个star最好不过了。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
iView实现自定义Modal

## 原文链接
[https://segmentfault.com/a/1190000010045286](https://segmentfault.com/a/1190000010045286)

