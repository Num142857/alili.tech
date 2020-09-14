---
title: '快速构建一个使用axios的vue应用程序' 
date: 2019-01-16 2:30:07
hidden: true
slug: 5bcjvylshuo
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>这篇文章讲述了如何快速构建一个vue程序，并使用axios从远程获取数据。<br><a href="https://www.sitepoint.com/fetching-data-third-party-api-vue-axios/" rel="nofollow noreferrer" target="_blank">这是原文章的直通门</a></p></blockquote>
<blockquote><p>通常情况下，在构建JavaScript应用程序时，会从远程获取数据或使用API。我最近研究了一些<a href="https://github.com/toddmotto/public-apis" rel="nofollow noreferrer" target="_blank">公用API</a>，发现有很多很酷的东西可以用在这些获取到的数据上。</p></blockquote>
<p>我将演示如何构建一个简单的新闻app，它将显示当天的热门新闻，还允许用户通过感兴趣的类别进行过滤。我们将从<a href="https://developer.nytimes.com/" rel="nofollow noreferrer" target="_blank">纽约时报API</a>获取数据。可以在<a href="https://github.com/sitepoint-editors/vuejs-news" rel="nofollow noreferrer" target="_blank">这里</a>找到本教程的完整代码。</p>
<p>下面是最终app的效果：<br><span class="img-wrap"><img data-src="/img/bVMGla?w=1425&amp;h=744" src="https://static.alili.tech/img/bVMGla?w=1425&amp;h=744" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>要使用本教程，你将需要了解基本的Vue.js知识。<a href="https://cn.vuejs.org/" rel="nofollow noreferrer" target="_blank">这是一个vue教程直达</a>。教程将使用ES6语法。</p>
<blockquote><h3 id="articleHeader0">项目结构</h3></blockquote>
<p>我们将只用2个文件来保持项目简洁：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="./app.js
./index.html" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>./app<span class="hljs-selector-class">.js</span>
./index.html</code></pre>
<p><code>app.js</code>包含整个app的逻辑，<code>index.html</code>包含整个app的界面。</p>
<p>我们从<code>index.html</code>开始：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang='en'>
    <head>
        <meta charset=&quot;utf-8&quot;>
        <title>最伟大的新闻app</title>
    </head>
    <body>
        <div class=&quot;container&quot; id=&quot;app&quot;>
            <h3 class=&quot;text-center&quot;>Vue新闻</h3>
        </div>
    </body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">'en'</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>最伟大的新闻app<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"container"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">h3</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"text-center"</span>&gt;</span>Vue新闻<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>然后，在<code>index.html</code>的底部，在<code>&lt;/body&gt;</code>标签之前，引入<code>Vue.js</code>和<code>app.js</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;https://unpkg.com/vue&quot;></script>
<script src=&quot;app.js&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://unpkg.com/vue"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"app.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>可选地，可以引入<a href="http://foundation.zurb.com/" rel="nofollow noreferrer" target="_blank">Foundation</a>，以利用一些预制样式，使我们的界面看起来更好一点。 将其包含在&lt;head&gt;标签中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<link rel=&quot;stylesheet&quot; href=&quot;https://cdnjs.cloudflare.com/ajax/libs/foundation/6.3.1/css/foundation.min.css&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"https://cdnjs.cloudflare.com/ajax/libs/foundation/6.3.1/css/foundation.min.css"</span>&gt;</span></code></pre>
<blockquote><h3 id="articleHeader1">创建一个简单Vue应用程序</h3></blockquote>
<p>首先，我们将在元素<code>div#app</code>上创建一个新的Vue实例，并使用一些测试数据来模拟新闻API的响应：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ./app.js
const vm = new Vue({
    el: '#app',
    data: {
        results: [
            {title: '第一条新闻', abstract: '我是第一条新闻'},
            {title: '接着是第二条', abstract: '我是第二条新闻'},
            {title: '然后是第三条', abstract: '我是第三条新闻'},
            {title: '我是最后一条了', abstract: '我是第四条新闻'}
        ]
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-comment">// ./app.js</span>
const vm = <span class="hljs-keyword">new</span> Vue({
<span class="hljs-symbol">    el:</span> <span class="hljs-string">'#app'</span>,
<span class="hljs-symbol">    data:</span> {
<span class="hljs-symbol">        results:</span> [
            {<span class="hljs-string">title:</span> <span class="hljs-string">'第一条新闻'</span>, <span class="hljs-string">abstract:</span> <span class="hljs-string">'我是第一条新闻'</span>},
            {<span class="hljs-string">title:</span> <span class="hljs-string">'接着是第二条'</span>, <span class="hljs-string">abstract:</span> <span class="hljs-string">'我是第二条新闻'</span>},
            {<span class="hljs-string">title:</span> <span class="hljs-string">'然后是第三条'</span>, <span class="hljs-string">abstract:</span> <span class="hljs-string">'我是第三条新闻'</span>},
            {<span class="hljs-string">title:</span> <span class="hljs-string">'我是最后一条了'</span>, <span class="hljs-string">abstract:</span> <span class="hljs-string">'我是第四条新闻'</span>}
        ]
    }
});</code></pre>
<p>我们通过<code>el</code>参数告诉Vue要挂载的元素，并通过<code>data</code>参数指定我们的app将使用哪些数据。</p>
<p>要在我们的应用程序中显示模拟数据，可以在<code>#app</code>元素中写入:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- ./index.html -->
<div class=&quot;columns medium-3&quot; v-for=&quot;result in results&quot;>
    <div class=&quot;card&quot;>
        <div class=&quot;card-divider&quot;>
            "{{" result.title "}}"
        </div>
        <div class=&quot;card-section&quot;>
            <p>"{{" result.abstract "}}".</p>
        </div>
    </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-comment">&lt;!-- ./index.html --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"columns medium-3"</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"result in results"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"card"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"card-divider"</span>&gt;</span>
            </span><span class="hljs-template-variable">"{{" result.title "}}"</span><span class="xml">
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"card-section"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span></span><span class="hljs-template-variable">"{{" result.abstract "}}"</span><span class="xml">.<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span></code></pre>
<p><code>v-for</code>指令用于渲染我们的列表。我们还使用双花括号来显示每一个<code>result</code>的内容。</p>
<p>我们现在有一个基本的布局结构了：<br><span class="img-wrap"><img data-src="/img/bVMJoX?w=1143&amp;h=393" src="https://static.alili.tech/img/bVMJoX?w=1143&amp;h=393" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<blockquote><h3 id="articleHeader2">从API获取数据</h3></blockquote>
<p>要使用<code>纽约时报API</code>，需要获得一个API密钥。所以如果你没有的话，点击<a href="https://developer.nytimes.com/signup" rel="nofollow noreferrer" target="_blank">这里</a>，注册以获取<a href="https://developer.nytimes.com/top_stories_v2.json" rel="nofollow noreferrer" target="_blank">Top Stories API</a>的API密钥（注册时API一栏选择<code>Top Stories API</code>）。</p>
<h4>使用Ajax请求和处理响应</h4>
<p><a href="https://github.com/mzabriskie/axios" rel="nofollow noreferrer" target="_blank">Axios</a>是一个基于promise的HTTP客户端，用于发送Ajax请求。它提供了简单而丰富的API。它与<code>fetch</code> API非常相似，但不需要为旧版浏览器添加一个polyfill，还有一些其他的细微之处。</p>
<p>引入axios：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- ./index.html -->
<script src=&quot;https://cdn.bootcss.com/axios/0.16.0/axios.min.js&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-comment">&lt;!-- ./index.html --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.bootcss.com/axios/0.16.0/axios.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>现在，一旦我们的Vue应用程序挂载(mounted)，我们就发送请求获取<code>top stories</code>的列表：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ./app.js
const vm = new Vue({
    el: '#app',
    data: {
        results: []
    },
    mounted() {
        axios.get(&quot;https://api.nytimes.com/svc/topstories/v2/home.json?api-key=your_api_key&quot;)
        .then(response => {
            this.results = response.data.resultes})
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs roboconf"><code>// ./app.js
const vm = new Vue({
    <span class="hljs-attribute">el</span>: '#app',
    data: {
        results: []
    },
    mounted() {
        axios<span class="hljs-variable">.get</span>("https://api<span class="hljs-variable">.nytimes</span><span class="hljs-variable">.com</span>/svc/topstories/v2/home<span class="hljs-variable">.json</span>?api-key=your_api_key")
        <span class="hljs-variable">.then</span>(response =&gt; {
            this<span class="hljs-variable">.results</span> = response<span class="hljs-variable">.data</span><span class="hljs-variable">.resultes</span>})
    }
});</code></pre>
<blockquote><p><strong>注意</strong>：将<code>your_api_key</code>替换为之前注册获得的API key。</p></blockquote>
<p>现在我们可以在我们的主页上看到新闻列表。不要担心不美观的界面，我们会在后面处理：<br><span class="img-wrap"><img data-src="/img/bVMJpw?w=1146&amp;h=930" src="https://static.alili.tech/img/bVMJpw?w=1146&amp;h=930" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>通过Vue Devtools来看看API的响应：<br><span class="img-wrap"><img data-src="/img/bVMJpH?w=1146&amp;h=554" src="https://static.alili.tech/img/bVMJpH?w=1146&amp;h=554" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>为了使我们的项目更加整洁，可复用，我们将做一些小的重构，并介绍一个帮助函数来构建我们的URL。 我们还将注册<code>getPosts</code>作为我们应用程序的一个方法((将其添加到vue对象的method参数中)：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ./app.js
const NYTBaseUrl = &quot;https://api.nytimes.com/svc/topstories/v2/&quot;;
const Apikey = &quot;your_api_key&quot;;

function buildUrl(url) {
    return NYTBaseUrl + url + &quot;.json?api-key=&quot; + Apikey;
}

const vm = new Vue ({
    el: '#app',
    data: {
        results: []
    },
    mounted () {
        this.getPosts('home');
    },
    methods: {
        getPosts(section) {
            let url = buildUrl(section);
            axios.get(url).then((response) => {
                this.results = response.data.results;
            }).catch(error => {
                console.log(error);
            });
        }
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// ./app.js</span>
<span class="hljs-keyword">const</span> NYTBaseUrl = <span class="hljs-string">"https://api.nytimes.com/svc/topstories/v2/"</span>;
<span class="hljs-keyword">const</span> Apikey = <span class="hljs-string">"your_api_key"</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">buildUrl</span>(<span class="hljs-params">url</span>) </span>{
    <span class="hljs-keyword">return</span> NYTBaseUrl + url + <span class="hljs-string">".json?api-key="</span> + Apikey;
}

<span class="hljs-keyword">const</span> vm = <span class="hljs-keyword">new</span> Vue ({
    <span class="hljs-attr">el</span>: <span class="hljs-string">'#app'</span>,
    <span class="hljs-attr">data</span>: {
        <span class="hljs-attr">results</span>: []
    },
    mounted () {
        <span class="hljs-keyword">this</span>.getPosts(<span class="hljs-string">'home'</span>);
    },
    <span class="hljs-attr">methods</span>: {
        getPosts(section) {
            <span class="hljs-keyword">let</span> url = buildUrl(section);
            axios.get(url).then(<span class="hljs-function">(<span class="hljs-params">response</span>) =&gt;</span> {
                <span class="hljs-keyword">this</span>.results = response.data.results;
            }).catch(<span class="hljs-function"><span class="hljs-params">error</span> =&gt;</span> {
                <span class="hljs-built_in">console</span>.log(error);
            });
        }
    }
});</code></pre>
<p>我们可以通过引入计算属性(computed property)对API获得的原始结果进行一些修改，从而对我们的视图的外观进行一些更改。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const vm = new Vue ({
    el: '#app',
    data: {
        results: []
    },
    mounted () {
        this.getPosts('home');
    },
    methods: {
        getPosts(section) {
            let url = buildUrl(section);
            axios.get(url).then((response) => {
                this.results = response.data.results;
            }).catch(error => {
                console.log(error);
            });
        }
    },
    computed: {
        processedPosts() {
            let posts = this.results;
            
            //添加image_url属性
            posts.map(post => {
                let imgObj = post.multimedia.find(media => media.format === &quot;superJumbo&quot;);
                post.image_url = imgObj ? imgObj.url : &quot;http://placehold.it/300x200?text=N/A&quot;;
            });
            
            //将数据分组
            let i, j, chunkedArray = [], chunk = 4;
            for (i = 0, j = 0; i < posts.length; i += chunk, j++) {
                chunkedArray[j] = posts.slice(i, i + chunk);
            }
            return chunkedArray;
        }
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lisp"><code>const vm = new Vue ({
    el: '#app',
    data: {
        results: []
    },
    mounted () {
        this.getPosts('home')<span class="hljs-comment">;</span>
    },
    methods: {
        getPosts(<span class="hljs-name">section</span>) {
            let url = buildUrl(<span class="hljs-name">section</span>)<span class="hljs-comment">;</span>
            axios.get(<span class="hljs-name">url</span>).then((<span class="hljs-name">response</span>) =&gt; {
                this.results = response.data.results<span class="hljs-comment">;</span>
            }).catch(<span class="hljs-name">error</span> =&gt; {
                console.log(<span class="hljs-name">error</span>)<span class="hljs-comment">;</span>
            })<span class="hljs-comment">;</span>
        }
    },
    computed: {
        processedPosts() {
            let posts = this.results<span class="hljs-comment">;</span>
            
            //添加image_url属性
            posts.map(<span class="hljs-name">post</span> =&gt; {
                let imgObj = post.multimedia.find(<span class="hljs-name">media</span> =&gt; media.format === <span class="hljs-string">"superJumbo"</span>)<span class="hljs-comment">;</span>
                post.image_url = imgObj ? imgObj.url : <span class="hljs-string">"http://placehold.it/300x200?text=N/A"</span><span class="hljs-comment">;</span>
            })<span class="hljs-comment">;</span>
            
            //将数据分组
            let i, j, chunkedArray = [], chunk = <span class="hljs-number">4</span><span class="hljs-comment">;</span>
            for (<span class="hljs-name">i</span> = <span class="hljs-number">0</span>, j = <span class="hljs-number">0</span><span class="hljs-comment">; i &lt; posts.length; i += chunk, j++) {</span>
                chunkedArray[j] = posts.slice(<span class="hljs-name">i</span>, i + chunk)<span class="hljs-comment">;</span>
            }
            return chunkedArray<span class="hljs-comment">;</span>
        }
    }
})<span class="hljs-comment">;</span></code></pre>
<p>在上述代码中，在计算属性<code>processedPosts</code>中，我们附加一个<code>image_url</code>属性给每个新闻对象：<br>我们通过循环遍历API的<code>results</code>，并通过在<code>multimedia</code>数组中对单个元素搜索来查找所需格式的媒体，然后将该媒体的URL赋值给<code>image_url</code>属性。在媒体不可用的情况下，我们将默认图片地址设置为来自<a href="http://placehold.it/" rel="nofollow noreferrer" target="_blank">Placehold.it</a>的图像。</p>
<p>我们还写了一个循环来将我们的<code>results</code>数组分为四个一组，这将会处理我们前面看到的不美观界面。</p>
<blockquote><p><strong>Note</strong>: 你也可以使用像<a href="https://lodash.com/docs/#chunk" rel="nofollow noreferrer" target="_blank">Lodash</a>这样的库进行分块。</p></blockquote>
<p>计算属性非常适合操纵数据。每当我们需要将<code>results</code>数组分组时，我们可以将它定义为一个计算属性，按照我们的意愿使用它，因为Vue会在<code>results</code>改动时自动更新<code>processedPosts</code>。</p>
<p>计算属性也基于它们的依赖关系进行缓存，因此只要<code>results</code>不改变，<code>processedPosts</code>属性将返回自身的缓存值。这将有助于性能，特别是在进行复杂的数据操作时。</p>
<p>接下来，我们在<code>index.html</code>中修改我们的html标签，以显示我们的计算结果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- ./index.html -->
<div class=&quot;row&quot; v-for=&quot;posts in processedPosts&quot;>
    <div class=&quot;columns large-3 medium-6&quot; v-for=&quot;post in posts&quot;>
        <div class=&quot;card&quot;>
            <div class=&quot;card-divider&quot;>
                "{{" post.title "}}"
            </div>
            <a :href=&quot;post.url&quot; target=&quot;_blank&quot;>
                <img :src=&quot;post.image_url&quot;>
            </a>
            <div class=&quot;card-section&quot;>
                <p>"{{" post.abstract "}}"</p>
            </div>
        </div>
    </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-comment">&lt;!-- ./index.html --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"row"</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"posts in processedPosts"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"columns large-3 medium-6"</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"post in posts"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"card"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"card-divider"</span>&gt;</span>
                </span><span class="hljs-template-variable">"{{" post.title "}}"</span><span class="xml">
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">:href</span>=<span class="hljs-string">"post.url"</span> <span class="hljs-attr">target</span>=<span class="hljs-string">"_blank"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">:src</span>=<span class="hljs-string">"post.image_url"</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"card-section"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span></span><span class="hljs-template-variable">"{{" post.abstract "}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span></code></pre>
<p>现在我们的app看起来美观一些了：<br><span class="img-wrap"><img data-src="/img/bVMJp9?w=1143&amp;h=847" src="https://static.alili.tech/img/bVMJp9?w=1143&amp;h=847" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<blockquote><h3 id="articleHeader3">新闻列表组件</h3></blockquote>
<p>组件用于将应用程序模块化。“新闻列表”可以重构为一个组件，例如，如果我们的app成长起来，并且决定在别的地方也使用新闻列表，组件将会使这变得很容易。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ./app.js
Vue.component('news-list', {
    props: ['results'],
    template: `
        <section>
            <div class=&quot;row&quot; v-for=&quot;posts in processedPosts&quot;>
                <div class=&quot;columns large-3 medium-6&quot; v-for=&quot;post in posts&quot;>
                    <div class=&quot;card&quot;>
                        <div class=&quot;card-divider&quot;>
                        "{{" post.title "}}"
                        </div>
                        <a :href=&quot;post.url&quot; target=&quot;_blank&quot;><img :src=&quot;post.image_url&quot;></a>
                        <div class=&quot;card-section&quot;>
                            <p>"{{" post.abstract "}}"</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `,
    computed: {
        processedPosts() {
            //...
        }
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-regexp">//</span> ./app.js
Vue.component(<span class="hljs-string">'news-list'</span>, {
    props: [<span class="hljs-string">'results'</span>],
    template: `<span class="javascript">
        &lt;section&gt;
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"row"</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"posts in processedPosts"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"columns large-3 medium-6"</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"post in posts"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"card"</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"card-divider"</span>&gt;</span>
                        "{{" post.title "}}"
                        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">:href</span>=<span class="hljs-string">"post.url"</span> <span class="hljs-attr">target</span>=<span class="hljs-string">"_blank"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">:src</span>=<span class="hljs-string">"post.image_url"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"card-section"</span>&gt;</span>
                            <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>"{{" post.abstract "}}"<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
                        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span></span>
    </span>`,
    computed: {
        processedPosts() {
            <span class="hljs-regexp">//</span>...
        }
    }
});</code></pre>
<p>在上面的代码中，我们注册了一个全局组件：<br><code>Vue.component(tagName，options)</code>。建议在定义<code>tagName</code>时使用连字符，这样它们不会与标准HTML标签发生冲突。</p>
<p>我们来简单看一下其他几个参数：</p>
<ul>
<li><p>props：这是一个我们希望从父作用域传递给组件的数组。 我们传递了<code>results</code>，因为我们从主应用程序实例加载组件。</p></li>
<li><p>template：在这里我们定义新闻列表的html。注意，我们将列表包装在<code>&lt;section&gt;</code>标签中。这是因为组件需要有一个单独的根元素，而不是多个元素。</p></li>
</ul>
<p>调整我们的html代码以使用我们的新闻列表组件，并传递<code>results</code>数据：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- ./index.html -->
<div class=&quot;container&quot; id=&quot;app&quot;>
    <h3 class=&quot;text-center&quot;>Vue新闻</h3>
    <news-list :results=&quot;results&quot;></news-list>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-comment">&lt;!-- ./index.html --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"container"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h3</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"text-center"</span>&gt;</span>Vue新闻<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">news-list</span> <span class="hljs-attr">:results</span>=<span class="hljs-string">"results"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">news-list</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<blockquote><p>注意：组件也可以创建为单个文件（.vue文件），然后由构建工具（如webpack）解析。虽然这超出了本教程的范围，但建议用于更大或更复杂的应用程序。</p></blockquote>
<blockquote><h3 id="articleHeader4">实现类别过滤</h3></blockquote>
<p>为了使我们的应用程序更加丰富，我们现在可以引入类别过滤器，以允许用户仅显示某些类别的新闻。</p>
<p>首先，我们注册现在应用程序里展示的以及即将会展示的类别列表：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const SECTIONS = &quot;home, arts, automobiles, books, business, fashion, food, health, insider, magazine, movies, national, nyregion, obituaries, opinion, politics, realestate, science, sports, sundayreview, technology, theater, tmagazine, travel, upshot, world&quot;;

const vm = new Vue({
    el: '#app',
    data: {
        results: [],
        //设置展示的类别数组
        sections: SECTIONS.split(', '),
        //设置默认的展示类别
        section: 'home',
    },
    mounted () {
        this.getPosts(this.section);
    },
    //...
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs processing"><code><span class="hljs-keyword">const</span> SECTIONS = <span class="hljs-string">"home, arts, automobiles, books, business, fashion, food, health, insider, magazine, movies, national, nyregion, obituaries, opinion, politics, realestate, science, sports, sundayreview, technology, theater, tmagazine, travel, upshot, world"</span>;

<span class="hljs-keyword">const</span> vm = <span class="hljs-keyword">new</span> Vue({
    el: <span class="hljs-string">'#app'</span>,
    data: {
        results: [],
        <span class="hljs-comment">//设置展示的类别数组</span>
        sections: SECTIONS.<span class="hljs-built_in">split</span>(<span class="hljs-string">', '</span>),
        <span class="hljs-comment">//设置默认的展示类别</span>
        section: <span class="hljs-string">'home'</span>,
    },
    mounted () {
        <span class="hljs-keyword">this</span>.getPosts(<span class="hljs-keyword">this</span>.section);
    },
    <span class="hljs-comment">//...</span>
});</code></pre>
<p>接下来，我们在<code>div#app</code>容器中添加：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- ./index.html -->
<section class=&quot;callout secondary&quot;>
    <h5 class=&quot;text-center&quot;>分类</h5>
    <form>
        <div class=&quot;row&quot;>
            <div class=&quot;large-6 columns&quot;>
                <select v-model=&quot;section&quot;>
                    <option v-for=&quot;section in sections&quot; :value=&quot;section&quot;>
                        "{{" section "}}"
                    </option>
                </select>
            </div>
            <div class=&quot;medium-6 columns&quot;>
                <a @click=&quot;getPosts(section)&quot; class=&quot;button expanded&quot;>我要看新闻</a>
            </div>
        </div>
    </form>
</section>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-comment">&lt;!-- ./index.html --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">section</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"callout secondary"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h5</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"text-center"</span>&gt;</span>分类<span class="hljs-tag">&lt;/<span class="hljs-name">h5</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">form</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"row"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"large-6 columns"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">select</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"section"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"section in sections"</span> <span class="hljs-attr">:value</span>=<span class="hljs-string">"section"</span>&gt;</span>
                        </span><span class="hljs-template-variable">"{{" section "}}"</span><span class="xml">
                    <span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">select</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"medium-6 columns"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">a</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"getPosts(section)"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"button expanded"</span>&gt;</span>我要看新闻<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span></span></code></pre>
<p>当单击“我要看新闻”按钮时，触发所选分类的<code>getPosts</code>方法。</p>
<blockquote><p>最终demo</p></blockquote>
<p>我决定添加一些小的（可选的）交互，使应用程序体验更好一些，如引入加载图像。</p>
<p>可以看看如下效果：<br><a href="https://codepen.io/mengmengpro/pen/gWwJJW" rel="nofollow noreferrer" target="_blank">https://codepen.io/mengmengpr...</a><button class="btn btn-xs btn-default ml10 preview" data-url="mengmengpro/pen/gWwJJW" data-typeid="3">点击预览</button></p>
<p>也可以在<a href="http://vuejs-news.herokuapp.com/" rel="nofollow noreferrer" target="_blank">此处</a>查看实时版本。</p>
<blockquote><h3 id="articleHeader5">结尾</h3></blockquote>
<p>在本教程中，我们已经学会了如何从头开始创建一个Vue.js项目，如何使用<code>axios</code>从API获取数据，以及如何使用组件和计算属性去处理数据。</p>
<p>现在我们有一个功能齐全的基于API服务构建的Vue.js 2.0应用程序。通过引入其他API可以进行大量的改进。例如，我们可以：</p>
<ul>
<li><p>使用<a href="https://buffer.com/developers/api" rel="nofollow noreferrer" target="_blank">Buffer API</a>从分类中自动排列社交媒体。</p></li>
<li><p>使用<a href="https://getpocket.com/developer/" rel="nofollow noreferrer" target="_blank">Pocket API</a>标记文章稍后阅读。</p></li>
<li><p>等等</p></li>
</ul>
<p>该项目的整个代码也托管在<a href="https://github.com/sitepoint-editors/vuejs-news" rel="nofollow noreferrer" target="_blank">Github</a>上，因此你可以克隆，运行并进行改进。</p>
<blockquote><p>这篇文章对于vue初学者是一个不错的教程，它讲述了如何快速的搭建起一个vue应用程序，其他详细的vue特性，可以去官网学习之后基于本项目进行改进。</p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
快速构建一个使用axios的vue应用程序

## 原文链接
[https://segmentfault.com/a/1190000009192118](https://segmentfault.com/a/1190000009192118)

