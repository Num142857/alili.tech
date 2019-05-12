---
title: '如何理解Vue的render函数' 
date: 2019-01-02 2:30:09
hidden: true
slug: kof6vrhdvtl
categories: [reprint]
---

{{< raw >}}

                    
<p><strong>第一个参数(必须) - {String | Object | Function}</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>render</title>
    <script src=&quot;https://cdn.bootcss.com/vue/2.3.4/vue.js&quot;></script>
</head>
<body>
    <div id=&quot;app&quot;>
        <elem></elem>
    </div>
    <script>
        Vue.component('elem', {
            render: function(createElement) {
                return createElement('div');//一个HTML标签字符
                /*return createElement({
                    template: '<div></div>'//组件选项对象
                });*/
                /*var func = function() {
                    return {template: '<div></div>'}
                };
                return createElement(func());//一个返回HTML标签字符或组件选项对象的函数*/
            }
        });
        new Vue({
            el: '#app'
        });
    </script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>render<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.bootcss.com/vue/2.3.4/vue.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">elem</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">elem</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
        Vue.component(<span class="hljs-string">'elem'</span>, {
            render: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(createElement)</span> </span>{
                <span class="hljs-keyword">return</span> createElement(<span class="hljs-string">'div'</span>);<span class="hljs-comment">//一个HTML标签字符</span>
                <span class="hljs-comment">/*return createElement({
                    template: '&lt;div&gt;&lt;/div&gt;'//组件选项对象
                });*/</span>
                <span class="hljs-comment">/*var func = function() {
                    return {template: '&lt;div&gt;&lt;/div&gt;'}
                };
                return createElement(func());//一个返回HTML标签字符或组件选项对象的函数*/</span>
            }
        });
        <span class="hljs-keyword">new</span> Vue({
            el: <span class="hljs-string">'#app'</span>
        });
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p><strong>第二个参数(可选) - {Object}</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>render</title>
    <script src=&quot;https://cdn.bootcss.com/vue/2.3.4/vue.js&quot;></script>
</head>
<body>
    <div id=&quot;app&quot;>
        <elem></elem>
    </div>
    <script>
        Vue.component('elem', {
            render: function(createElement) {
                var self = this;
                return createElement('div', {//一个包含模板相关属性的数据对象
                    'class': {
                        foo: true,
                        bar: false
                    },
                    style: {
                        color: 'red',
                        fontSize: '14px'
                    },
                    attrs: {
                        id: 'foo'
                    },
                    domProps: {
                        innerHTML: 'baz'
                    }
                });
            }
        });
        new Vue({
            el: '#app'
        });
    </script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>render<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.bootcss.com/vue/2.3.4/vue.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">elem</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">elem</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
        Vue.component(<span class="hljs-string">'elem'</span>, {
            render: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(createElement)</span> </span>{
                <span class="hljs-keyword">var</span> self = <span class="hljs-keyword">this</span>;
                <span class="hljs-keyword">return</span> createElement(<span class="hljs-string">'div'</span>, {<span class="hljs-comment">//一个包含模板相关属性的数据对象</span>
                    <span class="hljs-string">'class'</span>: {
                        foo: <span class="hljs-literal">true</span>,
                        bar: <span class="hljs-literal">false</span>
                    },
                    style: {
                        color: <span class="hljs-string">'red'</span>,
                        fontSize: <span class="hljs-string">'14px'</span>
                    },
                    attrs: {
                        id: <span class="hljs-string">'foo'</span>
                    },
                    domProps: {
                        innerHTML: <span class="hljs-string">'baz'</span>
                    }
                });
            }
        });
        <span class="hljs-keyword">new</span> Vue({
            el: <span class="hljs-string">'#app'</span>
        });
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p><strong>第三个参数(可选) - {String | Array}</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>render</title>
    <script src=&quot;https://cdn.bootcss.com/vue/2.3.4/vue.js&quot;></script>
</head>
<body>
    <div id=&quot;app&quot;>
        <elem></elem>
    </div>
    <script>
        Vue.component('elem', {
            render: function(createElement) {
                var self = this;
                // return createElement('div', '文本');//使用字符串生成文本节点
                return createElement('div', [//由createElement函数构建而成的数组
                    createElement('h1', '主标'),//createElement函数返回VNode对象
                    createElement('h2', '副标')
                ]);
            }
        });
        new Vue({
            el: '#app'
        });
    </script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>render<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.bootcss.com/vue/2.3.4/vue.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">elem</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">elem</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
        Vue.component(<span class="hljs-string">'elem'</span>, {
            render: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(createElement)</span> </span>{
                <span class="hljs-keyword">var</span> self = <span class="hljs-keyword">this</span>;
                <span class="hljs-comment">// return createElement('div', '文本');//使用字符串生成文本节点</span>
                <span class="hljs-keyword">return</span> createElement(<span class="hljs-string">'div'</span>, [<span class="hljs-comment">//由createElement函数构建而成的数组</span>
                    createElement(<span class="hljs-string">'h1'</span>, <span class="hljs-string">'主标'</span>),<span class="hljs-comment">//createElement函数返回VNode对象</span>
                    createElement(<span class="hljs-string">'h2'</span>, <span class="hljs-string">'副标'</span>)
                ]);
            }
        });
        <span class="hljs-keyword">new</span> Vue({
            el: <span class="hljs-string">'#app'</span>
        });
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p><strong>两种组件写法对比</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>render</title>
    <script src=&quot;https://cdn.bootcss.com/vue/2.3.4/vue.js&quot;></script>
</head>
<body>
    <div id=&quot;app&quot;>
        <ele></ele>
    </div>
    <script>
        /*Vue.component('ele', {
            template: '<div id=&quot;elem&quot; :class=&quot;{show: show}&quot; @click=&quot;handleClick&quot;>文本</div>',
            data: function() {
                return {
                    show: true
                }
            },
            methods: {
                handleClick: function() {
                    console.log('clicked!');
                }
            }
        });*/
        Vue.component('ele', {
            render: function(createElement) {
                return createElement('div', {
                    'class': {
                        show: this.show
                    },
                    attrs: {
                        id: 'elem'
                    },
                    on: {
                        click: this.handleClick
                    }
                }, '文本');
            },
            data: function() {
                return {
                    show: true
                }
            },
            methods: {
                handleClick: function() {
                    console.log('clicked!');
                }
            }
        });
        new Vue({
            el: '#app'
        });
    </script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>render<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.bootcss.com/vue/2.3.4/vue.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">ele</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">ele</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-comment">/*Vue.component('ele', {
            template: '&lt;div id="elem" :class="{show: show}" @click="handleClick"&gt;文本&lt;/div&gt;',
            data: function() {
                return {
                    show: true
                }
            },
            methods: {
                handleClick: function() {
                    console.log('clicked!');
                }
            }
        });*/</span>
        Vue.component(<span class="hljs-string">'ele'</span>, {
            <span class="hljs-attr">render</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">createElement</span>) </span>{
                <span class="hljs-keyword">return</span> createElement(<span class="hljs-string">'div'</span>, {
                    <span class="hljs-string">'class'</span>: {
                        <span class="hljs-attr">show</span>: <span class="hljs-keyword">this</span>.show
                    },
                    <span class="hljs-attr">attrs</span>: {
                        <span class="hljs-attr">id</span>: <span class="hljs-string">'elem'</span>
                    },
                    <span class="hljs-attr">on</span>: {
                        <span class="hljs-attr">click</span>: <span class="hljs-keyword">this</span>.handleClick
                    }
                }, <span class="hljs-string">'文本'</span>);
            },
            <span class="hljs-attr">data</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                <span class="hljs-keyword">return</span> {
                    <span class="hljs-attr">show</span>: <span class="hljs-literal">true</span>
                }
            },
            <span class="hljs-attr">methods</span>: {
                <span class="hljs-attr">handleClick</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'clicked!'</span>);
                }
            }
        });
        <span class="hljs-keyword">new</span> Vue({
            <span class="hljs-attr">el</span>: <span class="hljs-string">'#app'</span>
        });
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p><strong>this.$slots用法</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>render</title>
    <script src=&quot;https://cdn.bootcss.com/vue/2.3.4/vue.js&quot;></script>
</head>
<body>
    <div id=&quot;app&quot;>
        <blog-post>
            <h1 slot=&quot;header&quot;><span>About Me</span></h1>
            <p>Here's some page content</p>
            <p slot=&quot;footer&quot;>Copyright 2016 Evan You</p>
            <p>If I have some content down here</p>
        </blog-post>
    </div>
    <script>
        Vue.component('blog-post', {
            render: function(createElement) {
                var header = this.$slots.header,//返回由VNode组成的数组
                    body = this.$slots.default,
                    footer = this.$slots.footer;
                return createElement('div', [
                    createElement('header', header),
                    createElement('main', body),
                    createElement('footer', footer)
                ])
            }
        });
        new Vue({
            el: '#app'
        });
    </script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>render<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.bootcss.com/vue/2.3.4/vue.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">blog-post</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">h1</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"header"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>About Me<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Here's some page content<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"footer"</span>&gt;</span>Copyright 2016 Evan You<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>If I have some content down here<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">blog-post</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
        Vue.component(<span class="hljs-string">'blog-post'</span>, {
            render: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(createElement)</span> </span>{
                <span class="hljs-keyword">var</span> header = <span class="hljs-keyword">this</span>.$slots.header,<span class="hljs-comment">//返回由VNode组成的数组</span>
                    body = <span class="hljs-keyword">this</span>.$slots.default,
                    footer = <span class="hljs-keyword">this</span>.$slots.footer;
                <span class="hljs-keyword">return</span> createElement(<span class="hljs-string">'div'</span>, [
                    createElement(<span class="hljs-string">'header'</span>, header),
                    createElement(<span class="hljs-string">'main'</span>, body),
                    createElement(<span class="hljs-string">'footer'</span>, footer)
                ])
            }
        });
        <span class="hljs-keyword">new</span> Vue({
            el: <span class="hljs-string">'#app'</span>
        });
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p><strong>使用props传递数据</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>render</title>
    <script src=&quot;https://cdn.bootcss.com/vue/2.3.4/vue.js&quot;></script>
</head>
<body>
    <div id=&quot;app&quot;>
        <ele :show=&quot;show&quot;></ele>
        <ele :show=&quot;!show&quot;></ele>
    </div>
    <script>
        Vue.component('ele', {
            render: function(createElement) {
                if (this.show) {
                    return createElement('p', 'true');
                } else {
                    return createElement('p', 'false');
                }
            },
            props: {
                show: {
                    type: Boolean,
                    default: false
                }
            }
        });
        new Vue({
            el: '#app',
            data: {
                show: false
            }
        });
    </script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>render<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.bootcss.com/vue/2.3.4/vue.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">ele</span> <span class="hljs-attr">:show</span>=<span class="hljs-string">"show"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">ele</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">ele</span> <span class="hljs-attr">:show</span>=<span class="hljs-string">"!show"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">ele</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
        Vue.component(<span class="hljs-string">'ele'</span>, {
            render: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(createElement)</span> </span>{
                <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.show) {
                    <span class="hljs-keyword">return</span> createElement(<span class="hljs-string">'p'</span>, <span class="hljs-string">'true'</span>);
                } <span class="hljs-keyword">else</span> {
                    <span class="hljs-keyword">return</span> createElement(<span class="hljs-string">'p'</span>, <span class="hljs-string">'false'</span>);
                }
            },
            props: {
                show: {
                    type: Boolean,
                    <span class="hljs-keyword">default</span>: <span class="hljs-literal">false</span>
                }
            }
        });
        <span class="hljs-keyword">new</span> Vue({
            el: <span class="hljs-string">'#app'</span>,
            data: {
                show: <span class="hljs-literal">false</span>
            }
        });
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p><strong>VNodes必须唯一</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>render</title>
    <script src=&quot;https://cdn.bootcss.com/vue/2.3.4/vue.js&quot;></script>
</head>
<body>
    <!-- VNode必须唯一 -->
    <div id=&quot;app&quot;>
        <ele></ele>
    </div>
    <script>
        var child = {
            render: function(createElement) {
                return createElement('p', 'text');
            }
        };
        /*Vue.component('ele', {
            render: function(createElement) {
                var childNode = createElement(child);
                return createElement('div', [
                    childNode, childNode//VNodes必须唯一，渲染失败
                ]);
            }
        });*/
        Vue.component('ele', {
            render: function(createElement) {
                return createElement('div', 
                    Array.apply(null, {
                        length: 2
                    }).map(function() {
                        return createElement(child)//正确写法
                    })
                );
            }
        });
        new Vue({
            el: '#app'
        })
    </script>
</body>
</html>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>render<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.bootcss.com/vue/2.3.4/vue.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- VNode必须唯一 --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">ele</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">ele</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-keyword">var</span> child = {
            <span class="hljs-attr">render</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">createElement</span>) </span>{
                <span class="hljs-keyword">return</span> createElement(<span class="hljs-string">'p'</span>, <span class="hljs-string">'text'</span>);
            }
        };
        <span class="hljs-comment">/*Vue.component('ele', {
            render: function(createElement) {
                var childNode = createElement(child);
                return createElement('div', [
                    childNode, childNode//VNodes必须唯一，渲染失败
                ]);
            }
        });*/</span>
        Vue.component(<span class="hljs-string">'ele'</span>, {
            <span class="hljs-attr">render</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">createElement</span>) </span>{
                <span class="hljs-keyword">return</span> createElement(<span class="hljs-string">'div'</span>, 
                    <span class="hljs-built_in">Array</span>.apply(<span class="hljs-literal">null</span>, {
                        <span class="hljs-attr">length</span>: <span class="hljs-number">2</span>
                    }).map(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                        <span class="hljs-keyword">return</span> createElement(child)<span class="hljs-comment">//正确写法</span>
                    })
                );
            }
        });
        <span class="hljs-keyword">new</span> Vue({
            <span class="hljs-attr">el</span>: <span class="hljs-string">'#app'</span>
        })
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</code></pre>
<p><strong>v-model指令</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>render</title>
    <script src=&quot;https://cdn.bootcss.com/vue/2.3.4/vue.js&quot;></script>
</head>
<body>
    <div id=&quot;app&quot;>
        <el-input :name=&quot;name&quot; @input=&quot;val=>name=val&quot;></el-input>
        <div>你的名字是"{{"name"}}"</div>
    </div>
    <script>
        Vue.component('el-input', {
            render: function(createElement) {
                var self = this;
                return createElement('input', {
                    domProps: {
                        value: self.name
                    },
                    on: {
                        input: function(event) {
                            self.$emit('input', event.target.value);
                        }
                    }
                })
            },
            props: {
                name: String
            }
        });
        new Vue({
            el: '#app',
            data: {
                name: 'hdl'
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
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>render<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.bootcss.com/vue/2.3.4/vue.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">el-input</span> <span class="hljs-attr">:name</span>=<span class="hljs-string">"name"</span> @<span class="hljs-attr">input</span>=<span class="hljs-string">"val=&gt;name=val"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">el-input</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>你的名字是</span><span class="hljs-template-variable">"{{"name"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        Vue.component(<span class="hljs-string">'el-input'</span>, {
            <span class="hljs-attr">render</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">createElement</span>) </span>{
                <span class="hljs-keyword">var</span> self = <span class="hljs-keyword">this</span>;
                <span class="hljs-keyword">return</span> createElement(<span class="hljs-string">'input'</span>, {
                    <span class="hljs-attr">domProps</span>: {
                        <span class="hljs-attr">value</span>: self.name
                    },
                    <span class="hljs-attr">on</span>: {
                        <span class="hljs-attr">input</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>) </span>{
                            self.$emit(<span class="hljs-string">'input'</span>, event.target.value);
                        }
                    }
                })
            },
            <span class="hljs-attr">props</span>: {
                <span class="hljs-attr">name</span>: <span class="hljs-built_in">String</span>
            }
        });
        <span class="hljs-keyword">new</span> Vue({
            <span class="hljs-attr">el</span>: <span class="hljs-string">'#app'</span>,
            <span class="hljs-attr">data</span>: {
                <span class="hljs-attr">name</span>: <span class="hljs-string">'hdl'</span>
            }
        });
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></span></code></pre>
<p><strong>作用域插槽</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>render</title>
    <script src=&quot;https://cdn.bootcss.com/vue/2.3.4/vue.js&quot;></script>
</head>
<body>
    <div id=&quot;app&quot;>
        <ele>
            <template scope=&quot;props&quot;>
                <span>"{{"props.text"}}"</span>
            </template>
        </ele>
    </div>
    <script>
        Vue.component('ele', {
            render: function(createElement) {
                // 相当于<div><slot :text=&quot;msg&quot;></slot></div>
                return createElement('div', [
                    this.$scopedSlots.default({
                        text: this.msg
                    })
                ]);
            },
            data: function() {
                return {
                    msg: '来自子组件'
                }
            }
        });
        new Vue({
            el: '#app'
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
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>render<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.bootcss.com/vue/2.3.4/vue.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">ele</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">scope</span>=<span class="hljs-string">"props"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span></span><span class="hljs-template-variable">"{{"props.text"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">ele</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
        Vue.component(<span class="hljs-string">'ele'</span>, {
            render: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(createElement)</span> </span>{
                <span class="hljs-comment">// 相当于&lt;div&gt;&lt;slot :text="msg"&gt;&lt;/slot&gt;&lt;/div&gt;</span>
                <span class="hljs-keyword">return</span> createElement(<span class="hljs-string">'div'</span>, [
                    <span class="hljs-keyword">this</span>.$scopedSlots.default({
                        text: <span class="hljs-keyword">this</span>.msg
                    })
                ]);
            },
            data: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
                <span class="hljs-keyword">return</span> {
                    msg: <span class="hljs-string">'来自子组件'</span>
                }
            }
        });
        <span class="hljs-keyword">new</span> Vue({
            el: <span class="hljs-string">'#app'</span>
        });
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></span></code></pre>
<p><strong>向子组件中传递作用域插槽</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>render</title>
    <script src=&quot;https://cdn.bootcss.com/vue/2.3.4/vue.js&quot;></script>
</head>
<body>
    <div id=&quot;app&quot;>
        <ele></ele>
    </div>
    <script>
        Vue.component('ele', {
            render: function(createElement) {
                return createElement('div', [
                    createElement('child', {
                        scopedSlots: {
                            default: function(props) {
                                return [
                                    createElement('span', '来自父组件'),
                                    createElement('span', props.text)
                                ];
                            }
                        }
                    })
                ]);
            }
        });
        Vue.component('child', {
            render: function(createElement) {
                return createElement('b', this.$scopedSlots.default({text: '我是组件'}));
            }
        });
        new Vue({
            el: '#app'
        });
    </script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>render<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.bootcss.com/vue/2.3.4/vue.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">ele</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">ele</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
        Vue.component(<span class="hljs-string">'ele'</span>, {
            render: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(createElement)</span> </span>{
                <span class="hljs-keyword">return</span> createElement(<span class="hljs-string">'div'</span>, [
                    createElement(<span class="hljs-string">'child'</span>, {
                        scopedSlots: {
                            <span class="hljs-keyword">default</span>: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(props)</span> </span>{
                                <span class="hljs-keyword">return</span> [
                                    createElement(<span class="hljs-string">'span'</span>, <span class="hljs-string">'来自父组件'</span>),
                                    createElement(<span class="hljs-string">'span'</span>, props.text)
                                ];
                            }
                        }
                    })
                ]);
            }
        });
        Vue.component(<span class="hljs-string">'child'</span>, {
            render: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(createElement)</span> </span>{
                <span class="hljs-keyword">return</span> createElement(<span class="hljs-string">'b'</span>, <span class="hljs-keyword">this</span>.$scopedSlots.default({text: <span class="hljs-string">'我是组件'</span>}));
            }
        });
        <span class="hljs-keyword">new</span> Vue({
            el: <span class="hljs-string">'#app'</span>
        });
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p><strong>函数化组件</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>render</title>
    <script src=&quot;https://cdn.bootcss.com/vue/2.3.4/vue.js&quot;></script>
</head>
<body>
    <div id=&quot;app&quot;>
        <smart-item :data=&quot;data&quot;></smart-item>
        <button @click=&quot;change('img')&quot;>切换为图片为组件</button>
        <button @click=&quot;change('video')&quot;>切换为视频为组件</button>
        <button @click=&quot;change('text')&quot;>切换为文本组件</button>
    </div>
    <script>
        // 图片组件选项
        var ImgItem = {
            props: ['data'],
            render: function(createElement) {
                return createElement('div', [
                    createElement('p', '图片组件'),
                    createElement('img', {
                        attrs: {
                            src: this.data.url
                        }
                    })
                ]);
            }
        }
        // 视频组件
        var VideoItem = {
            props: ['data'],
            render: function(createElement) {
                return createElement('div', [
                    createElement('p', '视频组件'),
                    createElement('video', {
                        attrs: {
                            src: this.data.url,
                            controls: 'controls',
                            autoplay: 'autoplay'
                        }
                    })
                ]);
            }
        };
        /*纯文本组件*/
        var TextItem = {
            props: ['data'],
            render: function(createElement) {
                return createElement('div', [
                    createElement('p', '纯文本组件'),
                    createElement('p', this.data.text)
                ]);
            }
        };

        Vue.component('smart-item', {
            functional: true,
            render: function(createElement, context) {
                function getComponent() {
                    var data = context.props.data;
                    if (data.type === 'img') return ImgItem;
                    if (data.type === 'video') return VideoItem;
                    return TextItem;
                }
                return createElement(
                    getComponent(),
                    {
                        props: {
                            data: context.props.data
                        }
                    },
                    context.children
                )
            },
            props: {
                data: {
                    type: Object,
                    required: true
                }
            }
        });
        new Vue({
            el: '#app',
            data() {
                return {
                    data: {}
                }
            },
            methods: {
                change: function(type) {
                     if (type === 'img') {
                        this.data = {
                            type: 'img',
                            url: 'https://raw.githubusercontent.com/iview/iview/master/assets/logo.png'
                        }
                    } else if (type === 'video') {
                        this.data = {
                            type: 'video',
                            url: 'http://vjs.zencdn.net/v/oceans.mp4'
                        }
                    } else if (type === 'text') {
                        this.data = {
                            type: 'text',
                            content: '这是一段纯文本'
                        }
                    }
                }
            },
            created: function() {
                this.change('img');
            }
        });
    </script>
</body>
</html>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>render<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.bootcss.com/vue/2.3.4/vue.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">smart-item</span> <span class="hljs-attr">:data</span>=<span class="hljs-string">"data"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">smart-item</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"change('img')"</span>&gt;</span>切换为图片为组件<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"change('video')"</span>&gt;</span>切换为视频为组件<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"change('text')"</span>&gt;</span>切换为文本组件<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-comment">// 图片组件选项</span>
        <span class="hljs-keyword">var</span> ImgItem = {
            <span class="hljs-attr">props</span>: [<span class="hljs-string">'data'</span>],
            <span class="hljs-attr">render</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">createElement</span>) </span>{
                <span class="hljs-keyword">return</span> createElement(<span class="hljs-string">'div'</span>, [
                    createElement(<span class="hljs-string">'p'</span>, <span class="hljs-string">'图片组件'</span>),
                    createElement(<span class="hljs-string">'img'</span>, {
                        <span class="hljs-attr">attrs</span>: {
                            <span class="hljs-attr">src</span>: <span class="hljs-keyword">this</span>.data.url
                        }
                    })
                ]);
            }
        }
        <span class="hljs-comment">// 视频组件</span>
        <span class="hljs-keyword">var</span> VideoItem = {
            <span class="hljs-attr">props</span>: [<span class="hljs-string">'data'</span>],
            <span class="hljs-attr">render</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">createElement</span>) </span>{
                <span class="hljs-keyword">return</span> createElement(<span class="hljs-string">'div'</span>, [
                    createElement(<span class="hljs-string">'p'</span>, <span class="hljs-string">'视频组件'</span>),
                    createElement(<span class="hljs-string">'video'</span>, {
                        <span class="hljs-attr">attrs</span>: {
                            <span class="hljs-attr">src</span>: <span class="hljs-keyword">this</span>.data.url,
                            <span class="hljs-attr">controls</span>: <span class="hljs-string">'controls'</span>,
                            <span class="hljs-attr">autoplay</span>: <span class="hljs-string">'autoplay'</span>
                        }
                    })
                ]);
            }
        };
        <span class="hljs-comment">/*纯文本组件*/</span>
        <span class="hljs-keyword">var</span> TextItem = {
            <span class="hljs-attr">props</span>: [<span class="hljs-string">'data'</span>],
            <span class="hljs-attr">render</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">createElement</span>) </span>{
                <span class="hljs-keyword">return</span> createElement(<span class="hljs-string">'div'</span>, [
                    createElement(<span class="hljs-string">'p'</span>, <span class="hljs-string">'纯文本组件'</span>),
                    createElement(<span class="hljs-string">'p'</span>, <span class="hljs-keyword">this</span>.data.text)
                ]);
            }
        };

        Vue.component(<span class="hljs-string">'smart-item'</span>, {
            <span class="hljs-attr">functional</span>: <span class="hljs-literal">true</span>,
            <span class="hljs-attr">render</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">createElement, context</span>) </span>{
                <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getComponent</span>(<span class="hljs-params"></span>) </span>{
                    <span class="hljs-keyword">var</span> data = context.props.data;
                    <span class="hljs-keyword">if</span> (data.type === <span class="hljs-string">'img'</span>) <span class="hljs-keyword">return</span> ImgItem;
                    <span class="hljs-keyword">if</span> (data.type === <span class="hljs-string">'video'</span>) <span class="hljs-keyword">return</span> VideoItem;
                    <span class="hljs-keyword">return</span> TextItem;
                }
                <span class="hljs-keyword">return</span> createElement(
                    getComponent(),
                    {
                        <span class="hljs-attr">props</span>: {
                            <span class="hljs-attr">data</span>: context.props.data
                        }
                    },
                    context.children
                )
            },
            <span class="hljs-attr">props</span>: {
                <span class="hljs-attr">data</span>: {
                    <span class="hljs-attr">type</span>: <span class="hljs-built_in">Object</span>,
                    <span class="hljs-attr">required</span>: <span class="hljs-literal">true</span>
                }
            }
        });
        <span class="hljs-keyword">new</span> Vue({
            <span class="hljs-attr">el</span>: <span class="hljs-string">'#app'</span>,
            data() {
                <span class="hljs-keyword">return</span> {
                    <span class="hljs-attr">data</span>: {}
                }
            },
            <span class="hljs-attr">methods</span>: {
                <span class="hljs-attr">change</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">type</span>) </span>{
                     <span class="hljs-keyword">if</span> (type === <span class="hljs-string">'img'</span>) {
                        <span class="hljs-keyword">this</span>.data = {
                            <span class="hljs-attr">type</span>: <span class="hljs-string">'img'</span>,
                            <span class="hljs-attr">url</span>: <span class="hljs-string">'https://raw.githubusercontent.com/iview/iview/master/assets/logo.png'</span>
                        }
                    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (type === <span class="hljs-string">'video'</span>) {
                        <span class="hljs-keyword">this</span>.data = {
                            <span class="hljs-attr">type</span>: <span class="hljs-string">'video'</span>,
                            <span class="hljs-attr">url</span>: <span class="hljs-string">'http://vjs.zencdn.net/v/oceans.mp4'</span>
                        }
                    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (type === <span class="hljs-string">'text'</span>) {
                        <span class="hljs-keyword">this</span>.data = {
                            <span class="hljs-attr">type</span>: <span class="hljs-string">'text'</span>,
                            <span class="hljs-attr">content</span>: <span class="hljs-string">'这是一段纯文本'</span>
                        }
                    }
                }
            },
            <span class="hljs-attr">created</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                <span class="hljs-keyword">this</span>.change(<span class="hljs-string">'img'</span>);
            }
        });
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何理解Vue的render函数

## 原文链接
[https://segmentfault.com/a/1190000010913794](https://segmentfault.com/a/1190000010913794)

