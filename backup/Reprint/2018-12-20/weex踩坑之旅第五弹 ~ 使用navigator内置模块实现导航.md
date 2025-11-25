---
title: 'weex踩坑之旅第五弹 ~ 使用navigator内置模块实现导航' 
date: 2018-12-20 2:30:10
hidden: true
slug: hr6fyerjf4b
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>目前，我个人认为在weex中实现页面跳转的方式有两种，一种是通过weex提供的navigator模块，一种是通过vue-router之类的第三方插件。这两种方式在开发过程中都需要。那么什么时候采用navigator,什么时候采用路由？可以根据开发需求来决定，底部导航可以使用使用路由。页面中特殊功能，比如个人设置，添加地址等功能可以使用navigator。那么这两种方式如何共存于代码中，需要修改webpack.config.js配置文件，具体做法我们在后面的综合项目中讨论。本章只讨论navigator</blockquote>
<p><span class="img-wrap"><img data-src="/img/bV09DV?w=598&amp;h=1056" src="https://static.alili.tech/img/bV09DV?w=598&amp;h=1056" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader0">1. 初始化weex项目</h3>
<p>由于navigator跳转需要多个js bundle，之前我们使用的具有引导文件的单入口文件将不能实现。所以需要通过weex init命令初始化一个新项目。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# 初始化项目
$ weex init navigator
# 安装npm依赖
$ cd navigator
$ npm install
# 安装本地环境
$ weex platform add ios
$ cd platforms/ios
$ pod install
# 运行项目
$ cd ../..
$ weex run ios" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code><span class="hljs-comment"># 初始化项目</span>
<span class="hljs-variable">$ </span>weex init navigator
<span class="hljs-comment"># 安装npm依赖</span>
<span class="hljs-variable">$ </span>cd navigator
<span class="hljs-variable">$ </span>npm install
<span class="hljs-comment"># 安装本地环境</span>
<span class="hljs-variable">$ </span>weex platform add ios
<span class="hljs-variable">$ </span>cd platforms/ios
<span class="hljs-variable">$ </span>pod install
<span class="hljs-comment"># 运行项目</span>
<span class="hljs-variable">$ </span>cd ../..
<span class="hljs-variable">$ </span>weex run ios</code></pre>
<h3 id="articleHeader1">2. 分析跳转原理</h3>
<p>通过查看webpack.config.js配置文件可以知道，webpack在运行过程中会遍历src目录，根据xxx.vue生成xxx.js入口文件，运行npm run dev后，在dist目录中又会产生xxx.js文件（js Bundle）跳转就是从一个js Bundle跳转到另一个js Bundle中，那么这些js Bundle文件存放在什么地方呢？服务器中！这一点务必重视</p>
<p><span class="img-wrap"><img data-src="/img/bV07YS?w=786&amp;h=794" src="https://static.alili.tech/img/bV07YS?w=786&amp;h=794" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>在weex中提供了内置模块navigator来实现页面的跳转。该模块提供了两个方法，push和pop</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//把一个weex页面URL压入导航堆栈中
push({
    url :&quot;&quot;        //要压入的 Weex 页面的 URL
    animated:&quot;&quot;    //&quot;true&quot; 示意为页面压入时需要动画效果，&quot;false&quot; 则不需要，默认值为 &quot;true&quot;。注意，一定要是字符串类型的，千万不能写成布尔类型
}, callback(){
    //回调
})

//把当前Weex页面弹出导航堆栈中
pop({
    animated:&quot;&quot;    //&quot;true&quot; 示意为页面压入时需要动画效果，&quot;false&quot; 则不需要，默认值为 &quot;true&quot;。注意，一定要是字符串类型的，千万不能写成布尔类型
}, callback(){
    //回调
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-comment">//把一个weex页面URL压入导航堆栈中</span>
<span class="hljs-selector-tag">push</span>({
    <span class="hljs-attribute">url </span>:<span class="hljs-string">""</span>        <span class="hljs-comment">//要压入的 Weex 页面的 URL</span>
    <span class="hljs-attribute">animated</span>:<span class="hljs-string">""</span>    <span class="hljs-comment">//"true" 示意为页面压入时需要动画效果，"false" 则不需要，默认值为 "true"。注意，一定要是字符串类型的，千万不能写成布尔类型</span>
}, <span class="hljs-selector-tag">callback</span>(){
    <span class="hljs-comment">//回调</span>
})

<span class="hljs-comment">//把当前Weex页面弹出导航堆栈中</span>
<span class="hljs-selector-tag">pop</span>({
    <span class="hljs-attribute">animated</span>:<span class="hljs-string">""</span>    <span class="hljs-comment">//"true" 示意为页面压入时需要动画效果，"false" 则不需要，默认值为 "true"。注意，一定要是字符串类型的，千万不能写成布尔类型</span>
}, <span class="hljs-selector-tag">callback</span>(){
    <span class="hljs-comment">//回调</span>
})</code></pre>
<h3 id="articleHeader2">3. 实现组件之间的相互跳转</h3>
<p>有了这些理论我们就能轻松的实现页面跳转了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;content&quot;>
      <text @click='toNext'>跳转普通页面</text>
      <text @click='jump'>跳转到webview</text>
</div>

//导入navigator模块
let navigator =  weex.requireModule('navigator');

methods:{
    toNext(){
        navigator.push({
          /*
          这里是重点哦！当执行weex run ios的时候，我们会发现默认启动了一个服务
          这个服务的端口为8081，可以通过浏览器打开
          同样，我们也可以通过这种方式将一个jsBundle从服务器中加载过来
          在这里我们要确保wepack-serve服务是开启的
          */
          url: 'http://127.0.0.1:8081/dist/next.js',
          animated: &quot;true&quot;
        })
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code>&lt;div <span class="hljs-keyword">class</span>=<span class="hljs-string">"content"</span>&gt;
      &lt;<span class="hljs-built_in">text</span> @<span class="hljs-built_in">click</span>=<span class="hljs-string">'toNext'</span>&gt;跳转普通页面&lt;/<span class="hljs-built_in">text</span>&gt;
      &lt;<span class="hljs-built_in">text</span> @<span class="hljs-built_in">click</span>=<span class="hljs-string">'jump'</span>&gt;跳转到webview&lt;/<span class="hljs-built_in">text</span>&gt;
&lt;/div&gt;

<span class="hljs-comment">//导入navigator模块</span>
let navigator =  weex.requireModule(<span class="hljs-string">'navigator'</span>);

methods:{
    toNext(){
        navigator.push({
          <span class="hljs-comment">/*
          这里是重点哦！当执行weex run ios的时候，我们会发现默认启动了一个服务
          这个服务的端口为8081，可以通过浏览器打开
          同样，我们也可以通过这种方式将一个jsBundle从服务器中加载过来
          在这里我们要确保wepack-serve服务是开启的
          */</span>
          url: <span class="hljs-string">'http://127.0.0.1:8081/dist/next.js'</span>,
          animated: <span class="hljs-string">"true"</span>
        })
    }
}</code></pre>
<p>同样，我们可以在next.vue中添加返回的功能</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div class=&quot;next&quot;>
        <div class=&quot;header&quot;>
            <text class='c1' @click='toBack'>返回</text>
            <text class='c2'>详细页面</text>
            <text class='c1'>保存</text>
        </div>
        <div class=&quot;content&quot;>
            <text>详细页面</text>
        </div>
    </div>
</template>

    let navigator =  weex.requireModule('navigator');
    export default {
        methods:{
            toBack(){
                navigator.pop({animated: &quot;true&quot;})
            }
        }
    }
    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code>&lt;<span class="hljs-keyword">template</span>&gt;
    &lt;div <span class="hljs-keyword">class</span>=<span class="hljs-string">"next"</span>&gt;
        &lt;div <span class="hljs-keyword">class</span>=<span class="hljs-string">"header"</span>&gt;
            &lt;<span class="hljs-built_in">text</span> <span class="hljs-keyword">class</span>=<span class="hljs-string">'c1'</span> @<span class="hljs-built_in">click</span>=<span class="hljs-string">'toBack'</span>&gt;返回&lt;/<span class="hljs-built_in">text</span>&gt;
            &lt;<span class="hljs-built_in">text</span> <span class="hljs-keyword">class</span>=<span class="hljs-string">'c2'</span>&gt;详细页面&lt;/<span class="hljs-built_in">text</span>&gt;
            &lt;<span class="hljs-built_in">text</span> <span class="hljs-keyword">class</span>=<span class="hljs-string">'c1'</span>&gt;保存&lt;/<span class="hljs-built_in">text</span>&gt;
        &lt;/div&gt;
        &lt;div <span class="hljs-keyword">class</span>=<span class="hljs-string">"content"</span>&gt;
            &lt;<span class="hljs-built_in">text</span>&gt;详细页面&lt;/<span class="hljs-built_in">text</span>&gt;
        &lt;/div&gt;
    &lt;/div&gt;
&lt;/<span class="hljs-keyword">template</span>&gt;

    let navigator =  weex.requireModule(<span class="hljs-string">'navigator'</span>);
    <span class="hljs-keyword">export</span> <span class="hljs-built_in">default</span> {
        methods:{
            toBack(){
                navigator.pop({animated: <span class="hljs-string">"true"</span>})
            }
        }
    }
    </code></pre>
<p>测试结果<br><span class="img-wrap"><img data-src="/img/bV09AU?w=320&amp;h=636" src="https://static.alili.tech/img/bV09AU?w=320&amp;h=636" alt="DaWYu9CgJg.gif" title="DaWYu9CgJg.gif" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader3">4. webview的应用</h3>
<p>在我们现有的项目中，需要完成一个统计报表的功能呢，计划用echars来实现，但是echars在weex中明确得不到支持的，那我们可以使用&lt;web&gt;标签将需要的页面加载进来。使用webview内置组件进行控制。这里我就不再描述echars页面的开发，直接将baidu首页加载到我们的应用中。下面代码是webview.vue的代码，实现方法也很简单。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div class=&quot;webviewContainer&quot;>
        <div class=&quot;header&quot;>
            <text class='c1 cell' @click='toBack'>返回</text>
            <text class='c2 cell'>详细页面</text>
            <text class='c1 cell'>保存</text>
        </div>
        <!--使用web标签加载页面-->
        <web ref=&quot;webview&quot; :src=&quot;url&quot; class=&quot;webview&quot; ></web>
    </div>
</template>
const modal = weex.requireModule('modal')
const navigator =  weex.requireModule('navigator');
export default {
    data:()=>({
        url :'http://www.baidu.com'
    }),
    methods:{
        toBack(){
            navigator.pop({
        animated: &quot;true&quot;
      })
        }
    }
}
<script>
const navigator =  weex.requireModule('navigator');
export default {
    data:()=>({
        url :'http://www.baidu.com'
    }),
    methods:{
        
        toBack(){
            navigator.pop({animated: &quot;true&quot;})
        }
    }
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"webviewContainer"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"header"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">text</span> <span class="hljs-attr">class</span>=<span class="hljs-string">'c1 cell'</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">'toBack'</span>&gt;</span>返回<span class="hljs-tag">&lt;/<span class="hljs-name">text</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">text</span> <span class="hljs-attr">class</span>=<span class="hljs-string">'c2 cell'</span>&gt;</span>详细页面<span class="hljs-tag">&lt;/<span class="hljs-name">text</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">text</span> <span class="hljs-attr">class</span>=<span class="hljs-string">'c1 cell'</span>&gt;</span>保存<span class="hljs-tag">&lt;/<span class="hljs-name">text</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-comment">&lt;!--使用web标签加载页面--&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">web</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">"webview"</span> <span class="hljs-attr">:src</span>=<span class="hljs-string">"url"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"webview"</span> &gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">web</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
const modal = weex.requireModule('modal')
const navigator =  weex.requireModule('navigator');
export default {
    data:()=&gt;({
        url :'http://www.baidu.com'
    }),
    methods:{
        toBack(){
            navigator.pop({
        animated: "true"
      })
        }
    }
}
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">const</span> navigator =  weex.requireModule(<span class="hljs-string">'navigator'</span>);
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">data</span>:<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>({
        <span class="hljs-attr">url</span> :<span class="hljs-string">'http://www.baidu.com'</span>
    }),
    <span class="hljs-attr">methods</span>:{
        
        toBack(){
            navigator.pop({<span class="hljs-attr">animated</span>: <span class="hljs-string">"true"</span>})
        }
    }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bV09Dd?w=321&amp;h=637" src="https://static.alili.tech/img/bV09Dd?w=321&amp;h=637" alt="5WVJ9uw7QH.gif" title="5WVJ9uw7QH.gif" style="cursor: pointer;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
weex踩坑之旅第五弹 ~ 使用navigator内置模块实现导航

## 原文链接
[https://segmentfault.com/a/1190000012629351](https://segmentfault.com/a/1190000012629351)

