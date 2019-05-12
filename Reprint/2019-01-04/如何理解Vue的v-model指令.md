---
title: '如何理解Vue的v-model指令' 
date: 2019-01-04 2:30:10
hidden: true
slug: fd3skc4mwun
categories: [reprint]
---

{{< raw >}}

                    
<p><strong>本文主要讲解v-model指令，主要包括HTML元素的v-model和组件上的v-model两种，用四个简单的案例介绍v-model的使用。</strong></p>
<p><strong>案例一：HTML元素的v-model -输入框(text)</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
<!DOCTYPE html>
    <html lang=&quot;en&quot;>
    <head>
        <meta charset=&quot;UTF-8&quot;>
        <title>v-model指令</title>
        <script src=&quot;https://cdn.bootcss.com/vue/2.3.4/vue.js&quot;></script>
    </head>
    <body>
        <div id=&quot;app4&quot;>
            "{{"price"}}"<br>
            <input v-model=&quot;price&quot;><!-- 下行注释的语法糖 -->
            <!-- <input :value=&quot;price&quot; @input=&quot;price = $event.target.value&quot;> -->
        </div>
        <script>
            new Vue({
                el: '#app4',
                data: {
                    price: '20'
                }
            });
        </script>
    </body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml">
<span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>v-model指令<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.bootcss.com/vue/2.3.4/vue.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app4"</span>&gt;</span>
            </span><span class="hljs-template-variable">"{{"price"}}"</span><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">br</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"price"</span>&gt;</span><span class="hljs-comment">&lt;!-- 下行注释的语法糖 --&gt;</span>
            <span class="hljs-comment">&lt;!-- &lt;input :value="price" @input="price = $event.target.value"&gt; --&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
            <span class="hljs-keyword">new</span> Vue({
                el: <span class="hljs-string">'#app4'</span>,
                data: {
                    price: <span class="hljs-string">'20'</span>
                }
            });
        </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVTfls?w=240&amp;h=58" src="https://static.alili.tech/img/bVTfls?w=240&amp;h=58" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><strong>案例二：  定制组件的v-model - 输入框(text)</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
    <html lang=&quot;en&quot;>
    <head>
        <meta charset=&quot;UTF-8&quot;>
        <title>v-model指令</title>
        <script src=&quot;https://cdn.bootcss.com/vue/2.3.4/vue.js&quot;></script>
    </head>
    <body>
        <div id=&quot;app3&quot;>
            "{{"price"}}"
            <my-input v-model=&quot;price&quot;></my-input><!-- 下行注释的语法糖 -->
            <!-- <my-input :value=&quot;price&quot; @input=&quot;val => {price = val}&quot;></my-input> -->
        </div>
        <script>
            Vue.component('my-input', {
                template: '<div></span><input type=&quot;text&quot; ref=&quot;input&quot; :value=&quot;value&quot; @input=&quot;doThis&quot;/></div>',
                props: {
                    value: String
                },
                methods: {
                    doThis() {
                        this.$emit('input', this.$refs.input.value);
                    }
                }
            });
            new Vue({
                el: '#app3',
                data: {
                    price: '10'
                }
            });
        </script>
    </body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>v-model指令<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.bootcss.com/vue/2.3.4/vue.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app3"</span>&gt;</span>
            </span><span class="hljs-template-variable">"{{"price"}}"</span><span class="xml">
            <span class="hljs-tag">&lt;<span class="hljs-name">my-input</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"price"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">my-input</span>&gt;</span><span class="hljs-comment">&lt;!-- 下行注释的语法糖 --&gt;</span>
            <span class="hljs-comment">&lt;!-- &lt;my-input :value="price" @input="val =&gt; {price = val}"&gt;&lt;/my-input&gt; --&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
            Vue.component(<span class="hljs-string">'my-input'</span>, {
                <span class="hljs-attr">template</span>: <span class="hljs-string">'&lt;div&gt;&lt;/span&gt;&lt;input type="text" ref="input" :value="value" @input="doThis"/&gt;&lt;/div&gt;'</span>,
                <span class="hljs-attr">props</span>: {
                    <span class="hljs-attr">value</span>: <span class="hljs-built_in">String</span>
                },
                <span class="hljs-attr">methods</span>: {
                    doThis() {
                        <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">'input'</span>, <span class="hljs-keyword">this</span>.$refs.input.value);
                    }
                }
            });
            <span class="hljs-keyword">new</span> Vue({
                <span class="hljs-attr">el</span>: <span class="hljs-string">'#app3'</span>,
                <span class="hljs-attr">data</span>: {
                    <span class="hljs-attr">price</span>: <span class="hljs-string">'10'</span>
                }
            });
        </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVTflC?w=240&amp;h=58" src="https://static.alili.tech/img/bVTflC?w=240&amp;h=58" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><strong>案例三： 定制组件的v-model - 复选框(checkbox) - 2.2.0 新增</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" <!DOCTYPE html>
        <html lang=&quot;en&quot;>
        <head>
            <meta charset=&quot;UTF-8&quot;>
            <title>v-model指令</title>
            <script src=&quot;https://cdn.bootcss.com/vue/2.3.4/vue.js&quot;></script>
        </head>
        <body>
            <div id=&quot;app2&quot;>
                "{{"fruit"}}"<!-- 观测数据变化 -->
                <my-checkbox v-model=&quot;fruit.apple&quot; value=&quot;apple&quot;></my-checkbox><!-- 下行注释的语法糖 -->
                <!-- <my-checkbox :checked=&quot;fruit.apple&quot; @change=&quot;val => {fruit.apple = val}&quot; value=&quot;apple&quot;></my-checkbox> -->
            
                <my-checkbox v-model=&quot;fruit.peach&quot; value=&quot;peach&quot;></my-checkbox><!-- 下行注释的语法糖 -->
                <!-- <my-checkbox :checked=&quot;fruit.peach&quot; @change=&quot;val => {fruit.peach = val}&quot; value=&quot;peach&quot;></my-checkbox> -->
            </div>
            <script>
                Vue.component('my-checkbox', {
                    template: '<div><span>"{{"value"}}"</span><input type=&quot;checkbox&quot; :checked=&quot;checked&quot; @change=&quot;doThis&quot; :value=&quot;value&quot;/></div>',
                    model: {
                        prop: 'checked',
                        event: 'change'
                    },
                    props: {
                        checked: Boolean,
                        value: String
                    },
                    methods: {
                        doThis() {
                            this.$emit('change', !this.checked);
                        }
                    }
                });
                new Vue({
                    el: '#app2',
                    data: {
                        fruit: {//数据
                            apple: true,
                            peach: false
                        }
                    }
                });
            </script>
        </body>
    </html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code> <span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>v-model指令<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.bootcss.com/vue/2.3.4/vue.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app2"</span>&gt;</span>
                "{{"fruit"}}"<span class="hljs-comment">&lt;!-- 观测数据变化 --&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">my-checkbox</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"fruit.apple"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"apple"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">my-checkbox</span>&gt;</span><span class="hljs-comment">&lt;!-- 下行注释的语法糖 --&gt;</span>
                <span class="hljs-comment">&lt;!-- &lt;my-checkbox :checked="fruit.apple" @change="val =&gt; {fruit.apple = val}" value="apple"&gt;&lt;/my-checkbox&gt; --&gt;</span>
            
                <span class="hljs-tag">&lt;<span class="hljs-name">my-checkbox</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"fruit.peach"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"peach"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">my-checkbox</span>&gt;</span><span class="hljs-comment">&lt;!-- 下行注释的语法糖 --&gt;</span>
                <span class="hljs-comment">&lt;!-- &lt;my-checkbox :checked="fruit.peach" @change="val =&gt; {fruit.peach = val}" value="peach"&gt;&lt;/my-checkbox&gt; --&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
                Vue.component(<span class="hljs-string">'my-checkbox'</span>, {
                    <span class="hljs-attr">template</span>: <span class="hljs-string">'&lt;div&gt;&lt;span&gt;"{{"value"}}"&lt;/span&gt;&lt;input type="checkbox" :checked="checked" @change="doThis" :value="value"/&gt;&lt;/div&gt;'</span>,
                    <span class="hljs-attr">model</span>: {
                        <span class="hljs-attr">prop</span>: <span class="hljs-string">'checked'</span>,
                        <span class="hljs-attr">event</span>: <span class="hljs-string">'change'</span>
                    },
                    <span class="hljs-attr">props</span>: {
                        <span class="hljs-attr">checked</span>: <span class="hljs-built_in">Boolean</span>,
                        <span class="hljs-attr">value</span>: <span class="hljs-built_in">String</span>
                    },
                    <span class="hljs-attr">methods</span>: {
                        doThis() {
                            <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">'change'</span>, !<span class="hljs-keyword">this</span>.checked);
                        }
                    }
                });
                <span class="hljs-keyword">new</span> Vue({
                    <span class="hljs-attr">el</span>: <span class="hljs-string">'#app2'</span>,
                    <span class="hljs-attr">data</span>: {
                        <span class="hljs-attr">fruit</span>: {<span class="hljs-comment">//数据</span>
                            apple: <span class="hljs-literal">true</span>,
                            <span class="hljs-attr">peach</span>: <span class="hljs-literal">false</span>
                        }
                    }
                });
            </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVTflD?w=240&amp;h=70" src="https://static.alili.tech/img/bVTflD?w=240&amp;h=70" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><strong>案例四： 定制组件的v-model - 单选按钮(radio) -2.2.0 新增</strong></p>
<p>&lt;!DOCTYPE html&gt;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<html lang=&quot;en&quot;>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>v-model指令</title>
    <script src=&quot;https://cdn.bootcss.com/vue/2.3.4/vue.js&quot;></script>
</head>
<body>
    <div id=&quot;app&quot;>
        "{{"fruit"}}"<!-- 观测数据变化 -->
        <my-radio v-model=&quot;fruit&quot; value=&quot;apple&quot; name=&quot;myFruit&quot;></my-radio><!-- 下行注释的语法糖 -->
        <!-- <my-radio :checked=&quot;fruit&quot; @change=&quot;val => {fruit = val}&quot; value=&quot;apple&quot;></my-radio> -->
        
        <my-radio v-model=&quot;fruit&quot; value=&quot;peach&quot; name=&quot;myFruit&quot;></my-radio><!-- 下行注释的语法糖 -->
        <!-- <my-radio :checked=&quot;fruit&quot; @change=&quot;val => {fruit = val}&quot; value=&quot;peach&quot;></my-radio> -->
    </div>
    <script>
        Vue.component('my-radio', {
            template: '<div><span>"{{"value"}}"</span><input :name=&quot;name&quot; type=&quot;radio&quot; ref=&quot;radio&quot; :checked=&quot;checked===value&quot; @change=&quot;doThis&quot; :value=&quot;value&quot;/></div>',
            model: {
                prop: 'checked',
                event: 'change'
            },
            props: {
                checked: String,
                value: String,
                name: String
            },
            methods: {
                doThis() {
                    this.$emit('change', this.$refs.radio.value);
                }
            }
        });
        new Vue({
            el: '#app',
            data: {
                fruit: 'peach'//数据
            }
        });
    </script>
</body>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>v-model指令<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.bootcss.com/vue/2.3.4/vue.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
        "{{"fruit"}}"<span class="hljs-comment">&lt;!-- 观测数据变化 --&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">my-radio</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"fruit"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"apple"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"myFruit"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">my-radio</span>&gt;</span><span class="hljs-comment">&lt;!-- 下行注释的语法糖 --&gt;</span>
        <span class="hljs-comment">&lt;!-- &lt;my-radio :checked="fruit" @change="val =&gt; {fruit = val}" value="apple"&gt;&lt;/my-radio&gt; --&gt;</span>
        
        <span class="hljs-tag">&lt;<span class="hljs-name">my-radio</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"fruit"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"peach"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"myFruit"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">my-radio</span>&gt;</span><span class="hljs-comment">&lt;!-- 下行注释的语法糖 --&gt;</span>
        <span class="hljs-comment">&lt;!-- &lt;my-radio :checked="fruit" @change="val =&gt; {fruit = val}" value="peach"&gt;&lt;/my-radio&gt; --&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        Vue.component(<span class="hljs-string">'my-radio'</span>, {
            <span class="hljs-attr">template</span>: <span class="hljs-string">'&lt;div&gt;&lt;span&gt;"{{"value"}}"&lt;/span&gt;&lt;input :name="name" type="radio" ref="radio" :checked="checked===value" @change="doThis" :value="value"/&gt;&lt;/div&gt;'</span>,
            <span class="hljs-attr">model</span>: {
                <span class="hljs-attr">prop</span>: <span class="hljs-string">'checked'</span>,
                <span class="hljs-attr">event</span>: <span class="hljs-string">'change'</span>
            },
            <span class="hljs-attr">props</span>: {
                <span class="hljs-attr">checked</span>: <span class="hljs-built_in">String</span>,
                <span class="hljs-attr">value</span>: <span class="hljs-built_in">String</span>,
                <span class="hljs-attr">name</span>: <span class="hljs-built_in">String</span>
            },
            <span class="hljs-attr">methods</span>: {
                doThis() {
                    <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">'change'</span>, <span class="hljs-keyword">this</span>.$refs.radio.value);
                }
            }
        });
        <span class="hljs-keyword">new</span> Vue({
            <span class="hljs-attr">el</span>: <span class="hljs-string">'#app'</span>,
            <span class="hljs-attr">data</span>: {
                <span class="hljs-attr">fruit</span>: <span class="hljs-string">'peach'</span><span class="hljs-comment">//数据</span>
            }
        });
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></code></pre>
<p>&lt;/html&gt;<br><span class="img-wrap"><img data-src="/img/bVTflG?w=240&amp;h=70" src="https://static.alili.tech/img/bVTflG?w=240&amp;h=70" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何理解Vue的v-model指令

## 原文链接
[https://segmentfault.com/a/1190000010744545](https://segmentfault.com/a/1190000010744545)

