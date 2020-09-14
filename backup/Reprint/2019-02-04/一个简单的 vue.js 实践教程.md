---
title: '一个简单的 vue.js 实践教程' 
date: 2019-02-04 2:30:58
hidden: true
slug: y465y3hhhn
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p><strong>博客地址：<a href="http://cody1991.github.io/vue/2016/08/30/a-simple-vue-guide.html" rel="nofollow noreferrer" target="_blank">http://cody1991.github.io/vue/2016/08/30/a-simple-vue-guide.html</a></strong></p></blockquote>
<h1 id="articleHeader0">一个简单的 vue.js 实践教程</h1>
<p>更新 (2016.9.6)</p>
<hr>
<p>修复 vue-resource 传参问题</p>
<hr>
<p>更新（2016.9.2）</p>
<hr>
<p>感觉需要改善的地方有：</p>
<ul>
<li><p>(<a href="https://github.com/cody1991/cody1991.github.io/tree/master/source/2016.08.30/vue-guide-more" rel="nofollow noreferrer" target="_blank">更新代码</a>)<code>livingInfo</code> 数组和 <code>anchorInfo</code> 数组可以通过 computed 属性计算合成一个大的数组，那么很多的过滤器还有 <code>forEach</code> 遍历就可以省略掉了</p></li>
<li><p>可以把整个 <code>ul</code> 下的部分做成一个组件</p></li>
<li><p>文章可能描述的很啰嗦</p></li>
</ul>
<hr>
<p>公司有一个项目，其中一部分的截图如下：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006776246?w=1126&amp;h=1363" src="https://static.alili.tech/img/remote/1460000006776246?w=1126&amp;h=1363" alt="" title="" style="cursor: pointer;"></span></p>
<p>主要需求如下：</p>
<ul>
<li><p>需要拉取十个人的信息，包括封面图，名字，票数，以及对应用户是否进行了投票等信息，以及根据票数排序</p></li>
<li><p>正在直播的人在右上角会有一个提示</p></li>
<li><p>点击支持的时候，需要反馈给后台，并且前端这边会有+1的动画，之后重新拉取人物信息以及是否正在直播的状态</p></li>
<li><p>每隔一段时间，拉取人物信息以及是否正在直播的状态</p></li>
</ul>
<p>这里就想到了使用下 <a>vue.js</a> 来构建，因为</p>
<ul>
<li><p>人物信息都是后台拉取的json数据，前端需要展示，如果使用jquery来拼错DOM结构，或者使用模板来写，比如<a href="http://tangram.baidu.com/BaiduTemplate/" rel="nofollow noreferrer" target="_blank">BaiduTemplate</a>，都非常繁琐。使用vue.js的v-for指令可以简单的完成这个任务</p></li>
<li><p>一开始想要前端这边进行排序，那么vue.js的orderBy指令也可以很简单的完成排序功能，而不需要额外的代码判断（不过后来排序都通过后台进行了，相应代码会给出。）</p></li>
<li><p>拉取数据，进行前后台交互，可以使用比较成熟的<a href="https://github.com/vuejs/vue-resource" rel="nofollow noreferrer" target="_blank">vue-resource</a>代替jquery的$.ajax来操作。</p></li>
<li><p>数据会经常进行变化，使用vue.js这样的MVVM框架，可以把重点放在数据的操作上，因为数据的更新也会让DOM保持实时更新</p></li>
</ul>
<p>这里不会讲太多vue.js的基础，因为官网文档 <a href="http://vuejs.org/guide/" rel="nofollow noreferrer" target="_blank">Getting Started</a> 已经非常完善了。下面开始我们这个简单的vue实践吧。</p>
<p><a href="https://github.com/cody1991/cody1991.github.io/tree/master/source/2016.08.30/vue-guide" rel="nofollow noreferrer" target="_blank">源码地址</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;container&quot; id=&quot;app&quot;>
</div>

var app = new Vue({
    el: '#app'
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"container"</span> id=<span class="hljs-string">"app"</span>&gt;
<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>

<span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">el</span>: <span class="hljs-string">'#app'</span>
});
</code></pre>
<p>上面是最简单的 vue 实例初始化。</p>
<p>接下来我们继续构建我们的应用</p>
<p>在未使用 vue.js 之前，我们简单地使用HTML和CSS重构我们的项目：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;container&quot; id=&quot;app&quot;>
    <div class=&quot;radio-wrapper&quot;>
        <ul class=&quot;list clearfix&quot;>
            <li>
                <a class=&quot;link&quot;>
                    <div class=&quot;live&quot;>
                        <p>观看直播 ></p>
                    </div>
                    <img src=&quot;http://a.impingo.me/static/activity/singer/resource/1616312.jpg&quot; class=&quot;user&quot;>
                    <img src=&quot;./images/play.png&quot; class=&quot;play&quot;>
                    <p class=&quot;add&quot;>+1</p>
                </a>
                <div class=&quot;user-wrapper&quot;>
                    <div class=&quot;name&quot;>凌兒</div>
                    <div class=&quot;num&quot;>3280</div>
                </div>
                <div class=&quot;do-btn&quot;>
                    <p>支持</p>
                </div>
            </li>
            <li>
                <a class=&quot;link&quot;>
                    <div class=&quot;live&quot;>
                        <p>观看直播 ></p>
                    </div>
                    <img src=&quot;http://a.impingo.me/static/activity/singer/resource/1616312.jpg&quot; class=&quot;user&quot;>
                    <img src=&quot;./images/play.png&quot; class=&quot;play&quot;>
                    <p class=&quot;add&quot;>+1</p>
                </a>
                <div class=&quot;user-wrapper&quot;>
                    <div class=&quot;name&quot;>凌兒</div>
                    <div class=&quot;num&quot;>3280</div>
                </div>
                <div class=&quot;do-btn&quot;>
                    <p>支持</p>
                </div>
            </li>
        </ul>
    </div>
</div>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"container"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"radio-wrapper"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"list clearfix"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"link"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"live"</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>观看直播 &gt;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
                    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://a.impingo.me/static/activity/singer/resource/1616312.jpg"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"user"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./images/play.png"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"play"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"add"</span>&gt;</span>+1<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"user-wrapper"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"name"</span>&gt;</span>凌兒<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"num"</span>&gt;</span>3280<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"do-btn"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>支持<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"link"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"live"</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>观看直播 &gt;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
                    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://a.impingo.me/static/activity/singer/resource/1616312.jpg"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"user"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./images/play.png"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"play"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"add"</span>&gt;</span>+1<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"user-wrapper"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"name"</span>&gt;</span>凌兒<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"num"</span>&gt;</span>3280<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"do-btn"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>支持<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>大体上的HTML结构就是这样，配合CSS样式，可以得到下面的输出结果：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006776247?w=1141&amp;h=809" src="https://static.alili.tech/img/remote/1460000006776247?w=1141&amp;h=809" alt="" title="" style="cursor: pointer;"></span></p>
<p>当然现在还都是静态数据。</p>
<p>在 <code>ul</code> 里面的 <code>li</code> ，就需要我们使用 <code>v-for</code> 指令来进行循环输出了。下面再继续说明。</p>
<p>首先来看看我们一开始的 js 部分的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var lib = {
    urlParams: function(url) {
        var urlParamsList = {};
        var params = url.search.replace(/^\?/, &quot;&quot;).split('&amp;'); //分开成各个不同的对像，去掉'&amp;'
        for (var i = 0; i < params.length; i++) {
            var param = params[i];
            var temp = param.split(&quot;=&quot;);
            urlParamsList[temp[0]] = decodeURI(temp[1]);
        }
        return urlParamsList;
    }
};

window.onload = function() {

    var attachFastClick = Origami.fastclick;
    attachFastClick(document.body);

    var windowLocation = window.location,
        selfUserID = lib.urlParams(windowLocation)['userID'],
        selfSessionID = lib.urlParams(windowLocation)['sessionID'],
        selfSessionToken = lib.urlParams(windowLocation)['sessionToken'],
        selfPeerID = lib.urlParams(windowLocation)['peerID'];

    var app = new Vue({
        el: '#app',
        data: {
            anchorInfo: [],
            getAnchorInfoUrl: &quot;http://a.impingo.me/activity/getAnchorInfo&quot;,
        },
        ready: function() {
            this.getAnchorInfo();
        },
        methods: {
            getAnchorInfo: function() {
                this.$http.jsonp(this.getAnchorInfoUrl)
                    .then(function(res) {
                        var rtnData = res.data;
                        if (rtnData.rtn == 0) {
                            this.$set('anchorInfo', rtnData.data);
                        }
                    })
                    .catch(function(res) {
                        console.info('网络失败');
                    });
            }
        }
    })
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-built_in">var</span> lib = {
    <span class="hljs-attribute">urlParams</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">url</span>) </span>{
        <span class="hljs-built_in">var</span> urlParamsList = {};
        <span class="hljs-built_in">var</span> params = <span class="hljs-built_in">url</span>.search.replace(<span class="hljs-regexp">/^\?/</span>, <span class="hljs-string">""</span>).split(<span class="hljs-string">'&amp;'</span>); <span class="hljs-comment">//分开成各个不同的对像，去掉'&amp;'</span>
        <span class="hljs-keyword">for</span> (<span class="hljs-built_in">var</span> i = <span class="hljs-number">0</span>; i &lt; params.length; i++) {
            <span class="hljs-built_in">var</span> param = params[i];
            <span class="hljs-built_in">var</span> temp = param.split(<span class="hljs-string">"="</span>);
            urlParamsList[temp[<span class="hljs-number">0</span>]] = <span class="hljs-built_in">decodeURI</span>(temp[<span class="hljs-number">1</span>]);
        }
        <span class="hljs-keyword">return</span> urlParamsList;
    }
};

<span class="hljs-built_in">window</span>.onload = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{

    <span class="hljs-built_in">var</span> attachFastClick = Origami.fastclick;
    attachFastClick(<span class="hljs-built_in">document</span>.body);

    <span class="hljs-built_in">var</span> windowLocation = <span class="hljs-built_in">window</span>.location,
        selfUserID = lib.urlParams(windowLocation)[<span class="hljs-string">'userID'</span>],
        selfSessionID = lib.urlParams(windowLocation)[<span class="hljs-string">'sessionID'</span>],
        selfSessionToken = lib.urlParams(windowLocation)[<span class="hljs-string">'sessionToken'</span>],
        selfPeerID = lib.urlParams(windowLocation)[<span class="hljs-string">'peerID'</span>];

    <span class="hljs-built_in">var</span> app = <span class="hljs-keyword">new</span> Vue({
        <span class="hljs-attribute">el</span>: <span class="hljs-string">'#app'</span>,
        <span class="hljs-attribute">data</span>: {
            <span class="hljs-attribute">anchorInfo</span>: [],
            <span class="hljs-attribute">getAnchorInfoUrl</span>: <span class="hljs-string">"http://a.impingo.me/activity/getAnchorInfo"</span>,
        },
        <span class="hljs-attribute">ready</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">this</span>.getAnchorInfo();
        },
        <span class="hljs-attribute">methods</span>: {
            <span class="hljs-attribute">getAnchorInfo</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                <span class="hljs-keyword">this</span>.$http.jsonp(<span class="hljs-keyword">this</span>.getAnchorInfoUrl)
                    .then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">res</span>) </span>{
                        <span class="hljs-built_in">var</span> rtnData = res.data;
                        <span class="hljs-keyword">if</span> (rtnData.rtn == <span class="hljs-number">0</span>) {
                            <span class="hljs-keyword">this</span>.$set(<span class="hljs-string">'anchorInfo'</span>, rtnData.data);
                        }
                    })
                    .catch(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">res</span>) </span>{
                        <span class="hljs-built_in">console</span>.info(<span class="hljs-string">'网络失败'</span>);
                    });
            }
        }
    })
}
</code></pre>
<p><code>lib</code> 对象主要放着一些基础的方法或者变量，在这里只有一个解析页面地址参数的函数 <code>urlParams</code> ，因为后面我们需要通过页面地址url获取投票用户的userID，即后面看到的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="selfUserID = lib.urlParams(windowLocation)['userID'];
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crystal"><code>selfUserID = <span class="hljs-class"><span class="hljs-keyword">lib</span>.<span class="hljs-title">urlParams</span>(<span class="hljs-title">windowLocation</span>)['<span class="hljs-title">userID</span>'];</span>
</code></pre>
<p><code>selfSessionID</code>,<code>selfSessionToken</code>,<code>selfPeerID</code>不用在意太多，到时候url没有传入这几个也没关系。</p>
<p>而 <code>window.onload</code> 开头的这段：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var attachFastClick = Origami.fastclick;
    attachFastClick(document.body);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs abnf"><code>var attachFastClick = Origami.fastclick<span class="hljs-comment">;</span>
    attachFastClick(document.body)<span class="hljs-comment">;</span>
</code></pre>
<p>引入了 <a href="https://github.com/ftlabs/fastclick" rel="nofollow noreferrer" target="_blank">fastclick</a>，消除手机上点击的300ms延时。</p>
<p>之后就是我们上面提到的vue实例了。</p>
<p>我们给实例添加了新的属性 <code>data</code> ，它是一个对象，这里是vue实例存放数据的地方。初始化用户信息 <code>anchorInfo</code> 为空数组，以及用户信息的接口地址 <code>getAnchorInfoUrl</code> 的值为 <code>http://a.impingo.me/activity/getAnchorInfo</code> 。</p>
<p>然后就是添加了新的属性 <code>ready</code> ，它是一个函数，在vue实例初始化完成的时候会调用这个方法。我们看看这个方法下的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.getAnchorInfo();
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">this</span>.getAnchorInfo();
</code></pre>
<p><code>this</code> 指向vue实例，调用 <code>getAnchorInfo()</code> 方法。</p>
<p>接着往下看，我们看到一个新的属性 <code>methods</code> ，它是一个对象，放着我们vue实例的所有方法。在这之下我们定义了 <code>getAnchorInfo()</code> 方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="getAnchorInfo: function() {
    this.$http.jsonp(this.getAnchorInfoUrl)
        .then(function(res) {
            var rtnData = res.data;
            if (rtnData.rtn == 0) {
                this.$set('anchorInfo', rtnData.data);
            }
        })
        .catch(function(res) {
            console.info('网络失败');
        });
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>getAnchorInfo: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
    <span class="hljs-keyword">this</span>.$http.jsonp(<span class="hljs-keyword">this</span>.getAnchorInfoUrl)
        .then(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(res)</span> </span>{
            <span class="hljs-keyword">var</span> rtnData = res.data;
            <span class="hljs-keyword">if</span> (rtnData.rtn == <span class="hljs-number">0</span>) {
                <span class="hljs-keyword">this</span>.$<span class="hljs-keyword">set</span>(<span class="hljs-string">'anchorInfo'</span>, rtnData.data);
            }
        })
        .catch(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(res)</span> </span>{
            console.info(<span class="hljs-string">'网络失败'</span>);
        });
}
</code></pre>
<p><a href="https://github.com/vuejs/vue-resource" rel="nofollow noreferrer" target="_blank">vue-resource</a> 的使用可以看看这里，我们在这里使用 <code>jsonp</code> 方法请求了 <code>getAnchorInfoUrl</code> 地址的接口，如果请求成功的话，<code>then(function(res)){}</code> ，我们看看 <code>res</code> 的数据结构</p>
<p>(补充)vue-resource 的 <code>jsonp</code> 基本写法是（可以参看官方文档 <a href="https://github.com/vuejs/vue-resource/blob/master/docs/http.md" rel="nofollow noreferrer" target="_blank">HTTP Requests/Response</a>）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.$http.jsonp(url,{
        params: {
                'someKey': someValue
        }
    })
    // this 是 vue 实例
    // url是请求的地址 params是请求的附带参数
    .then(function(res){
        // 后台成功返回数据的时候
        // res 是返回的数据
    })
    .catch(function(res){
        // 后台响应出错的时候
    });
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code>this.$http.jsonp(url,{
        params: {
                <span class="hljs-string">'someKey'</span>: someValue
        }
    })
    <span class="hljs-comment">// this 是 vue 实例</span>
    <span class="hljs-comment">// url是请求的地址 params是请求的附带参数</span>
    .then(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(res)</span></span>{
        <span class="hljs-comment">// 后台成功返回数据的时候</span>
        <span class="hljs-comment">// res 是返回的数据</span>
    })
    .<span class="hljs-keyword">catch</span>(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(res)</span></span>{
        <span class="hljs-comment">// 后台响应出错的时候</span>
    });
</code></pre>
<p><code>res.data</code> 会装载后台返回给我们的数据</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006776248?w=958&amp;h=916" src="https://static.alili.tech/img/remote/1460000006776248?w=958&amp;h=916" alt="" title="" style="cursor: pointer;"></span></p>
<p>可以看到一些返回的信息，而我们想要的数据在 <code>res.data</code> 里面，返回的格式是和后台协商好的。</p>
<p>看下图。<code>res.data.rtn</code> 是一个状态，这里 0 代表着返回成功。而<code>res.data.data</code> 是一个对象数组，长度为10，放着十个用户的信息。每个对象里面有属性 <code>userID</code>,<code>anchorName</code>,<code>supportCnt</code> 分别代表着用户的ID，用户的名字以及它的支持度。</p>
<p>在<code>res.data.rtn</code>为0代表成功的情况下，我们调用vue的 <code>$set</code> 方法，设置<code>anchorInfo</code>的值，把<code>res.data.data</code>赋给它。在这里使用<code>$set</code>方法才能保证<code>anchorInfo</code>变量的值在vue里面是响应式能实时更新的。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006776249?w=1793&amp;h=183" src="https://static.alili.tech/img/remote/1460000006776249?w=1793&amp;h=183" alt="" title="" style="cursor: pointer;"></span></p>
<p>接下来我们修改前面提到的HTML结构吧。我们从 <code>ul</code> 标签开始修改。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<ul class=&quot;list clearfix&quot; v-cloak>
    <li v-for=&quot;anchor in anchorInfo&quot;>
                        
    </li>
</ul>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>&lt;<span class="hljs-selector-tag">ul</span> class=<span class="hljs-string">"list clearfix"</span> v-cloak&gt;
    &lt;<span class="hljs-selector-tag">li</span> v-<span class="hljs-keyword">for</span>=<span class="hljs-string">"anchor in anchorInfo"</span>&gt;
                        
    &lt;/li&gt;
&lt;/ul&gt;
</code></pre>
<p>在这里我们可以看到给 <code>ul</code> 标签加了一个v-cloak，这个是vue实例的DOM结构渲染完成以后，会去掉的一个类。因为我们经常在vue实例还没渲染完成的时候会看到一些比如 <code>"{{"someStr"}}"</code> 这样的绑定属性，我们在CSS里面添加</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[v-cloak] {
    display: none;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-attr">[v-cloak]</span> {
    <span class="hljs-attribute">display</span>: none;
}
</code></pre>
<p>那么在vue实例的DOM还没渲染完成的时候，就会被隐藏起来了。</p>
<p>接下来我们看到了 <code>li</code> 标签里面有vue指令 <code>v-for</code>，在这里它会循环遍历vue实例的数据 <code>anchorInfo</code> 数组，每次遍历的变量别名为 <code>anchor</code>。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006776250?w=1815&amp;h=829" src="https://static.alili.tech/img/remote/1460000006776250?w=1815&amp;h=829" alt="" title="" style="cursor: pointer;"></span></p>
<p>在上图可以看到, <code>ul</code> 标签下面生成了十个<code>li</code>标签，正好是我们 <code>anchorInfo</code> 数组的长度。我们接着给 <code>li</code> 标签里面添加内容。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<li v-for=&quot;anchor in anchorInfo&quot;>
    <a class=&quot;link&quot;>
        <div class=&quot;live&quot;>
            <p>观看直播 ></p>
        </div>
        <img :src=&quot;anchor.userID | getUserImg&quot; class=&quot;user&quot;>
        <img src=&quot;./images/play.png&quot; class=&quot;play&quot;>
        <p class=&quot;add&quot;>+1</p>
    </a>
</li>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>&lt;<span class="hljs-selector-tag">li</span> v-<span class="hljs-keyword">for</span>=<span class="hljs-string">"anchor in anchorInfo"</span>&gt;
    &lt;<span class="hljs-selector-tag">a</span> class=<span class="hljs-string">"link"</span>&gt;
        &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"live"</span>&gt;
            &lt;p&gt;观看直播 &gt;&lt;/p&gt;
        &lt;/div&gt;
        &lt;<span class="hljs-selector-tag">img</span> :src=<span class="hljs-string">"anchor.userID | getUserImg"</span> class=<span class="hljs-string">"user"</span>&gt;
        &lt;<span class="hljs-selector-tag">img</span> src=<span class="hljs-string">"./images/play.png"</span> class=<span class="hljs-string">"play"</span>&gt;
        &lt;<span class="hljs-selector-tag">p</span> class=<span class="hljs-string">"add"</span>&gt;+<span class="hljs-number">1</span>&lt;/p&gt;
    &lt;/a&gt;
&lt;/li&gt;
</code></pre>
<p>（补充）这里给出vue的排序指令代码：</p>
<p><code>li</code> 标签改成这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<li v-for=&quot;anchor in anchorInfo | orderBy supportCntFn&quot;>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>&lt;<span class="hljs-selector-tag">li</span> v-<span class="hljs-keyword">for</span>=<span class="hljs-string">"anchor in anchorInfo | orderBy supportCntFn"</span>&gt;
</code></pre>
<p>在vue实例里面的 <code>method</code> 对象添加：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="supportCntFn: function(a, b) {
    return (parseInt(b.supportCnt, 10) - parseInt(a.supportCnt, 10) >= 0);
},
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>supportCntFn: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">a, b</span>) </span>{
    <span class="hljs-keyword">return</span> (<span class="hljs-built_in">parseInt</span>(b.supportCnt, <span class="hljs-number">10</span>) - <span class="hljs-built_in">parseInt</span>(a.supportCnt, <span class="hljs-number">10</span>) &gt;= <span class="hljs-number">0</span>);
},
</code></pre>
<p>这里通过<code>parseInt</code>的原因是后台传回来的是字符串类型，如果直接排序的话 <code>2</code> 会比 <code>10</code> 排在前面，显然不符合我们的要求。后面继续。</p>
<p>是否正在直播的DOM元素 <code>.live</code> 和点击投票的+1动画的DOM元素 <code>add</code> 我们暂时不考虑它们，在CSS里面都默认设置了 <code>display:none</code>。这里主要看的是用户的封面图 <code>.user</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<img :src=&quot;anchor.userID | getUserImg&quot; class=&quot;user&quot;>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code>&lt;img :src=<span class="hljs-string">"anchor.userID | getUserImg"</span> <span class="hljs-keyword">class</span>=<span class="hljs-string">"user"</span>&gt;
</code></pre>
<p>这里使用了过滤器 <code>getUserImg</code> (注意这里是 <code>:src</code>属性绑定)。所以我们会在vue实例里面添加一个新的属性 <code>filters</code>以及 <code>getUserImg</code>过滤器定义：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="filters: {
    getUserImg: function(val) {
        return 'http://a.impingo.me/static/activity/singer/resource/' + val + '.jpg'
    },
},
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">filters</span>: {
    <span class="hljs-attribute">getUserImg</span>: <span class="hljs-built_in">function</span>(val) {
        return <span class="hljs-string">'http://a.impingo.me/static/activity/singer/resource/'</span> + val + <span class="hljs-string">'.jpg'</span>
    },
},
</code></pre>
<p>而我们当初在和后台协商的时候，图片的地址是 <code>domain+userID+.jpg</code>，所以在 <code>getUserImg</code> 过滤器里面的参数 <code>val</code> 就是我们传入的用户的ID，之后再进行拼凑，返回就好了。</p>
<p>之后在 <code>li</code> 标签继续加入下面的部分：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;user-wrapper&quot;>
    <div class=&quot;name&quot; v-text=&quot;anchor.anchorName&quot;></div>
    <div class=&quot;num&quot; v-text=&quot;anchor.supportCnt&quot;></div>
</div>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"user-wrapper"</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"name"</span> v-<span class="hljs-built_in">text</span>=<span class="hljs-string">"anchor.anchorName"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"num"</span> v-<span class="hljs-built_in">text</span>=<span class="hljs-string">"anchor.supportCnt"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;/<span class="hljs-keyword">div</span>&gt;
</code></pre>
<p>这里应该很明显就能明白，是输出了用户的名字和投票数了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template v-if=&quot;voteStatus | getVoteStatus anchor&quot;>
    <div class=&quot;had-btn&quot;>
        <p>今日已支持</p>
    </div>
</template>
<template v-else>
    <div class=&quot;do-btn&quot;>
        <p>支持</p>
    </div>
</template>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"voteStatus | getVoteStatus anchor"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"had-btn"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>今日已支持<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">v-else</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"do-btn"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>支持<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
</code></pre>
<p>我们继续在 <code>li</code> 标签里面添加了这样的代码，<code>template</code> 可以配合 vue的指令 <code>v-if</code> 一同使用。在这里你可能稍微讲解下 <code>v-if="voteStatus | getVoteStatus anchor"</code> 是来判断用户是否已经投票了，已经投票的话显示 <code>.had-btn</code> 元素，否则显示 <code>.do-btn</code> 元素，在后面会补充上。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006776251?w=1154&amp;h=1309" src="https://static.alili.tech/img/remote/1460000006776251?w=1154&amp;h=1309" alt="" title="" style="cursor: pointer;"></span></p>
<p>可以看到我们大部分的UI界面已经完成了。看看其实寥寥几十段代码而已，就把通过jquery来拼错DOM的繁杂方法完成了。</p>
<p>接下来我们主要考虑交互的部分了，在这之前我们先来获取用户是否在直播的状态吧。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var app = new Vue({
    el: '#app',
    data: {
        ...
        livingInfo: [],
        getLiveStatusUrl: &quot;http://a.impingo.me/activity/getLiveStatus&quot;,
        ...
    },
    ready: function() {
        ...
        this.getLiveStatus();
        ...
    },
    methods: {
        ...
        getLiveStatus: function() {
            this.$http.jsonp(this.getLiveStatusUrl)
                .then(function(res) {
                    var that = this;
                    var rtnData = res.data;
                    if (rtnData.rtn == 0) {
                        this.$set('livingInfo', rtnData.data);
                    }
                })
                .catch(function(res) {
                    console.info('网络失败');
                });
        },
        ...
    },
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-built_in">var</span> app = <span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attribute">el</span>: <span class="hljs-string">'#app'</span>,
    <span class="hljs-attribute">data</span>: {
        ...
        <span class="hljs-attribute">livingInfo</span>: [],
        <span class="hljs-attribute">getLiveStatusUrl</span>: <span class="hljs-string">"http://a.impingo.me/activity/getLiveStatus"</span>,
        ...
    },
    <span class="hljs-attribute">ready</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        ...
        <span class="hljs-keyword">this</span>.getLiveStatus();
        ...
    },
    <span class="hljs-attribute">methods</span>: {
        ...
        <span class="hljs-attribute">getLiveStatus</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">this</span>.$http.jsonp(<span class="hljs-keyword">this</span>.getLiveStatusUrl)
                .then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">res</span>) </span>{
                    <span class="hljs-built_in">var</span> that = <span class="hljs-keyword">this</span>;
                    <span class="hljs-built_in">var</span> rtnData = res.data;
                    <span class="hljs-keyword">if</span> (rtnData.rtn == <span class="hljs-number">0</span>) {
                        <span class="hljs-keyword">this</span>.$set(<span class="hljs-string">'livingInfo'</span>, rtnData.data);
                    }
                })
                .catch(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">res</span>) </span>{
                    <span class="hljs-built_in">console</span>.info(<span class="hljs-string">'网络失败'</span>);
                });
        },
        ...
    },
})
</code></pre>
<p>我们添加了上面的代码，<code>data</code>里面的直播信息数组<code>livingInfo</code>和直播信息接口地址<code>getLiveStatusUrl</code>。在<code>ready</code>方法里面添加了一个新的函数调用<code>this.getLiveStatus();</code>对应的函数定义在<code>methods</code>对象里面。核心部分在</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.$set('livingInfo', rtnData.data);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">this</span>.$<span class="hljs-keyword">set</span>(<span class="hljs-string">'livingInfo'</span>, rtnData.<span class="hljs-keyword">data</span>);
</code></pre>
<p>我们和上面一样，把返回的数组 <code>res.data.rtn</code>代表成功的情况下，给<code>livingInfo</code>数组赋值<code>res.data.data</code>。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006776252?w=2138&amp;h=123" src="https://static.alili.tech/img/remote/1460000006776252?w=2138&amp;h=123" alt="" title="" style="cursor: pointer;"></span></p>
<p>看看我们返回的jsonp数据。我们主要关注 <code>state</code> 变量，只有值为 1 的时候代表正在直播，所以我们现在修改一些HTML结构：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;live&quot; v-show=&quot;living | getLiving anchor&quot;>
    <p>观看直播 ></p>
</div>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"live"</span> <span class="hljs-attr">v-show</span>=<span class="hljs-string">"living | getLiving anchor"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>观看直播 &gt;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>给 <code>.live</code> 增加vue指令v-show，只有 <code>living</code> 为 <code>true</code> 的时候，它才会显示出来。我们在下面定义 <code>getLiving</code> 过滤器</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="getLiving: function(val, anchor) {
    var curUserID = anchor.userID,
        isLiving = false;
    this.livingInfo.forEach(function(living) {
        if (living.createUserID === curUserID) {
            if (living.state == &quot;1&quot;) {
                isLiving = true;
            }
        }
    });
    return isLiving;
},
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>getLiving: function(val, <span class="hljs-built_in">anchor</span>) {
    var curUserID = <span class="hljs-built_in">anchor</span>.<span class="hljs-keyword">user</span>ID,
        isLiving = false;
    this.livingInfo.<span class="hljs-keyword">for</span>Each(function(living) {
        if (living.createUserID === curUserID) {
            if (living.<span class="hljs-keyword">state</span> == <span class="hljs-string">"1"</span>) {
                isLiving = true;
            }
        }
    });
    return isLiving;
},
</code></pre>
<p>过滤器接收两个变量，需要过滤的值以及<code>anchor</code>，即对应的用户。</p>
<p>我们把用户的ID赋值给 <code>curUserID</code> 变量，初始化代表是否在直播的变量 <code>isLiving</code> 的值为false，默认不显示。</p>
<p>然后我们使用<code>forEach</code>方法遍历 <code>livingInfo</code> 数组，并且判断此刻 <code>living.createUserID</code> 和 <code>curUserID</code> 相等的时候，看看它的 <code>state</code> 的属性，如果为1的话，<code>isLiving</code> 设置为真。否则其他情况返回 <code>false</code>。（这里可以不用 <code>forEach</code> 方法，因为在找到对应的 <code>living</code> 的时候， <code>forEach</code> 并不能退出循环。）</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006776253?w=1139&amp;h=1349" src="https://static.alili.tech/img/remote/1460000006776253?w=1139&amp;h=1349" alt="" title="" style="cursor: pointer;"></span></p>
<p>如上图，现在正在直播的用户就能显示出观看直播这个标签了。</p>
<p>接下来我们来获取是否可以投票的信息。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var app = new Vue({
    el: '#app',
    data: {
        ...
        queryVoteStatusUrl: &quot;http://a.impingo.me/activity/queryVoteStatus&quot;,
        anchorUserID: '',
        todayHadVote: false
        ...
    },
    ready: function() {
        ...
        this.queryVoteStatus();
        ...
    },
    methods: {
        ...
        queryVoteStatus: function() {
            // this.$http.jsonp(this.queryVoteStatusUrl + '?userID=' + selfUserID)
            this.$http.jsonp(this.queryVoteStatusUrl, {
                    params: {
                        'userID': selfUserID
                    }
                })
                .then(function(res) {
                    var rtnData = res.data;
                    if (rtnData.rtn == 0) {
                        this.todayHadVote = false;
                    } else if (rtnData.rtn == 1) {
                        this.todayHadVote = true;
                        this.anchorUserID = rtnData.data.anchorUserID;
                    }
                })
                .catch(function(res) {
                    console.info('网络失败');
                });
        },
        ...
    },
    filters: {
        ...
        getVoteStatus: function(val, anchor) {
            if (anchor.userID == this.anchorUserID) {
                // 可支持
                return true;
            } else {
                // 不可支持
                return false;
            }
        }
        ...
    },
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">el</span>: <span class="hljs-string">'#app'</span>,
    <span class="hljs-attr">data</span>: {
        ...
        queryVoteStatusUrl: <span class="hljs-string">"http://a.impingo.me/activity/queryVoteStatus"</span>,
        <span class="hljs-attr">anchorUserID</span>: <span class="hljs-string">''</span>,
        <span class="hljs-attr">todayHadVote</span>: <span class="hljs-literal">false</span>
        ...
    },
    <span class="hljs-attr">ready</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        ...
        this.queryVoteStatus();
        ...
    },
    <span class="hljs-attr">methods</span>: {
        ...
        queryVoteStatus: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">// this.$http.jsonp(this.queryVoteStatusUrl + '?userID=' + selfUserID)</span>
            <span class="hljs-keyword">this</span>.$http.jsonp(<span class="hljs-keyword">this</span>.queryVoteStatusUrl, {
                    <span class="hljs-attr">params</span>: {
                        <span class="hljs-string">'userID'</span>: selfUserID
                    }
                })
                .then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">res</span>) </span>{
                    <span class="hljs-keyword">var</span> rtnData = res.data;
                    <span class="hljs-keyword">if</span> (rtnData.rtn == <span class="hljs-number">0</span>) {
                        <span class="hljs-keyword">this</span>.todayHadVote = <span class="hljs-literal">false</span>;
                    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (rtnData.rtn == <span class="hljs-number">1</span>) {
                        <span class="hljs-keyword">this</span>.todayHadVote = <span class="hljs-literal">true</span>;
                        <span class="hljs-keyword">this</span>.anchorUserID = rtnData.data.anchorUserID;
                    }
                })
                .catch(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">res</span>) </span>{
                    <span class="hljs-built_in">console</span>.info(<span class="hljs-string">'网络失败'</span>);
                });
        },
        ...
    },
    <span class="hljs-attr">filters</span>: {
        ...
        getVoteStatus: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">val, anchor</span>) </span>{
            <span class="hljs-keyword">if</span> (anchor.userID == <span class="hljs-keyword">this</span>.anchorUserID) {
                <span class="hljs-comment">// 可支持</span>
                <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
            } <span class="hljs-keyword">else</span> {
                <span class="hljs-comment">// 不可支持</span>
                <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
            }
        }
        ...
    },
});
</code></pre>
<p>上面是我们添加的新代码。 <code>queryVoteStatusUrl</code> 代表着获取是否已投票的接口地址(这个地址后面需要加上当前投票用户的userID，我们可以自己在地址后面添加 <code>userID=10003</code>等，userID从10000开始到11000都可以用来测试)。<code>anchorUserID</code> 为空字符串，后面获取数据的时候如果已投票，会把投给的那个人的ID赋值给它。 <code>todayHadVote</code> 代表今天是否已经投票了，如果已经投票的话禁止继续投票。</p>
<p>所以我们在vue实例的 <code>methods</code> 对象可以看到 <code>queryVoteStatus</code> 方法，如果 <code>res.data.rtn</code> 为0的时候，代表今天还可以投票，进行下面的操作：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.todayHadVote = true;
this.anchorUserID = rtnData.data.anchorUserID;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>this.todayHadVote = true;
this.<span class="hljs-built_in">anchor</span>UserID = rtnData.data.<span class="hljs-built_in">anchor</span>UserID;
</code></pre>
<p>最后就是添加的 <code>getVoteStatus</code> 过滤器，如下图，如果 <code>voteStatus</code> 为真，今日已支持按钮会显示出来，否则显示支持按钮</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template v-if=&quot;voteStatus | getVoteStatus anchor&quot;>
    <div class=&quot;had-btn&quot;>
        <p>今日已支持</p>
    </div>
</template>
<template v-else>
    <div class=&quot;do-btn&quot;>
        <p>支持</p>
    </div>
</template>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"voteStatus | getVoteStatus anchor"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"had-btn"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>今日已支持<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">v-else</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"do-btn"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>支持<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
</code></pre>
<p><code>getVoteStatus</code> 过滤器的代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="getVoteStatus: function(val, anchor) {
    if (anchor.userID == this.anchorUserID) {
        // 可支持
        return true;
    } else {
        // 不可支持
        return false;
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>getVoteStatus: function(val, <span class="hljs-built_in">anchor</span>) {
    if (<span class="hljs-built_in">anchor</span>.<span class="hljs-keyword">user</span>ID == this.<span class="hljs-built_in">anchor</span>UserID) {
        // 可支持
        return true;
    } else {
        // 不可支持
        return false;
    }
}
</code></pre>
<p>只有当当前用户的ID和 <code>data</code> 里面的 <code>anchorUserID</code> 一致的时候，<code>voteStatus</code> 会返回 <code>true</code>。</p>
<p>当然我们现在都还没有进行操作，所以所有的按钮都是支持按钮，我们可以在先修改成下面这样：自己把 <code>todayHadVote</code> 设置为 <code>true</code> ，而 <code>anchorUserID</code> 设置一个存在的用户ID来看效果（然后记得撤销修改）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (rtnData.rtn == 0) {
    this.todayHadVote = true;
    this.anchorUserID = 1089536;
} else if (rtnData.rtn == 1) {
    this.todayHadVote = true;
    this.anchorUserID = rtnData.data.anchorUserID;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>if (rtnData.rtn == <span class="hljs-number">0</span>) {
    this.todayHadVote = true;
    this.<span class="hljs-built_in">anchor</span>UserID = <span class="hljs-number">1089536</span>;
} else if (rtnData.rtn == <span class="hljs-number">1</span>) {
    this.todayHadVote = true;
    this.<span class="hljs-built_in">anchor</span>UserID = rtnData.data.<span class="hljs-built_in">anchor</span>UserID;
}
</code></pre>
<p>截图如下：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006776254?w=1157&amp;h=776" src="https://static.alili.tech/img/remote/1460000006776254?w=1157&amp;h=776" alt="" title="" style="cursor: pointer;"></span></p>
<p>接下来还有一个小的需求，就是每隔一段时间重新拉取用户的信息和是否在直播的状态，添加下面的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var app = new Vue({
    el: '#app',
    data: {
        ...
        setIntervalGetAnchorInfo: null,
        setIntervalGetLiveStatus: null,
        intervalDuration: 60 * 1000,
        ...
    },
    ready: function() {
        ...
        this.initSetTimeout();
        ...
    },
    methods: {
        ...
        initSetTimeout: function() {
            var that = this;
            setIntervalGetAnchorInfo = setInterval(function() {
                that.getAnchorInfo();
            }, that.intervalDuration);
            setIntervalGetLiveStatus = setInterval(function() {
                that.getLiveStatus();
            }, that.intervalDuration);
        },
        ...
    },
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-built_in">var</span> app = <span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attribute">el</span>: <span class="hljs-string">'#app'</span>,
    <span class="hljs-attribute">data</span>: {
        ...
        <span class="hljs-attribute">setIntervalGetAnchorInfo</span>: <span class="hljs-literal">null</span>,
        <span class="hljs-attribute">setIntervalGetLiveStatus</span>: <span class="hljs-literal">null</span>,
        <span class="hljs-attribute">intervalDuration</span>: <span class="hljs-number">60</span> * <span class="hljs-number">1000</span>,
        ...
    },
    <span class="hljs-attribute">ready</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        ...
        <span class="hljs-keyword">this</span>.initSetTimeout();
        ...
    },
    <span class="hljs-attribute">methods</span>: {
        ...
        <span class="hljs-attribute">initSetTimeout</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">var</span> that = <span class="hljs-keyword">this</span>;
            setIntervalGetAnchorInfo = setInterval(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                that.getAnchorInfo();
            }, that.intervalDuration);
            setIntervalGetLiveStatus = setInterval(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                that.getLiveStatus();
            }, that.intervalDuration);
        },
        ...
    },
});
</code></pre>
<p>获取用户信息的定时器 <code>setIntervalGetAnchorInfo</code> 和获取直播状态的定时器 <code>setIntervalGetLiveStatus</code>，初始化定时器的 <code>initSetTimeout</code> 方法。</p>
<p>接下来就开始讲解交互部分，首先是投票部分。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;do-btn&quot; @click=&quot;singerVote(anchor)&quot;>
    <p>支持</p>
</div>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"do-btn"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"singerVote(anchor)"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>支持<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>给支持按钮添加一个点击事件，监听函数是 <code>singerVote</code> ，把当前用户当做参数传入。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var app = new Vue({
    el: '#app',
    data: {
        ....
        singerVoteUrl: &quot;http://a.impingo.me/activity/singerVote&quot;,
        ...
    },
    methods: {
        ...
        singerVote: function(anchor) {
            var getUserID = selfUserID,
                getTargetUserID = anchor.userID;

            if (this.todayHadVote) {
                console.info('每日仅支持一次！');
                return;
            }

            this.$http.jsonp(this.singerVoteUrl, {
                    params: {
                        userID: getUserID,
                        targetUserID: getTargetUserID,
                        sessionID: selfSessionID,
                        sessionToken: selfSessionToken,
                        peerID: selfPeerID
                    }
                })
                .then(function(res) {
                    var rtnData = res.data,
                        that = this;
                    if (rtnData.rtn == 0) {
                        // console.info(rtnData.msg);
                        Vue.set(anchor, 'showAdd', true);
                        anchor.supportCnt++;
                        this.anchorUserID = getTargetUserID;
                        this.todayHadVote = true;

                        clearInterval(setIntervalGetAnchorInfo);

                        // 点击投票，动画（2秒）以后，重新拉取直播状态以及直播信息
                        setTimeout(function() {
                            that.getAnchorInfo();
                            that.getLiveStatus();

                            setIntervalGetAnchorInfo = setInterval(function() {
                                that.getAnchorInfo();
                            }, that.intervalDuration);
                        }, 2000);

                    } else if (rtnData.rtn == 2 || rtnData.rtn == 3 || rtnData.rtn == 1) {
                        console.info(rtnData.msg);
                    }
                })
                .catch(function(res) {
                    console.info('网络失败');
                });
        },
        ...
    },
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lisp"><code>var app = new Vue({
    el: '#app',
    data: {
        ....
        singerVoteUrl: <span class="hljs-string">"http://a.impingo.me/activity/singerVote"</span>,
        ...
    },
    methods: {
        ...
        singerVote: function(<span class="hljs-name">anchor</span>) {
            var getUserID = selfUserID,
                getTargetUserID = anchor.userID<span class="hljs-comment">;</span>

            if (<span class="hljs-name">this</span>.todayHadVote) {
                console.info('每日仅支持一次！')<span class="hljs-comment">;</span>
                return<span class="hljs-comment">;</span>
            }

            this.$http.jsonp(<span class="hljs-name">this</span>.singerVoteUrl, {
                    params: {
                        userID: getUserID,
                        targetUserID: getTargetUserID,
                        sessionID: selfSessionID,
                        sessionToken: selfSessionToken,
                        peerID: selfPeerID
                    }
                })
                .then(<span class="hljs-name">function</span>(<span class="hljs-name">res</span>) {
                    var rtnData = res.data,
                        that = this<span class="hljs-comment">;</span>
                    if (<span class="hljs-name">rtnData</span>.rtn == <span class="hljs-number">0</span>) {
                        // console.info(<span class="hljs-name">rtnData</span>.msg)<span class="hljs-comment">;</span>
                        Vue.set(<span class="hljs-name">anchor</span>, 'showAdd', true)<span class="hljs-comment">;</span>
                        anchor.supportCnt++<span class="hljs-comment">;</span>
                        this.anchorUserID = getTargetUserID<span class="hljs-comment">;</span>
                        this.todayHadVote = true<span class="hljs-comment">;</span>

                        clearInterval(<span class="hljs-name">setIntervalGetAnchorInfo</span>)<span class="hljs-comment">;</span>

                        // 点击投票，动画（<span class="hljs-number">2</span>秒）以后，重新拉取直播状态以及直播信息
                        setTimeout(<span class="hljs-name">function</span>() {
                            that.getAnchorInfo()<span class="hljs-comment">;</span>
                            that.getLiveStatus()<span class="hljs-comment">;</span>

                            setIntervalGetAnchorInfo = setInterval(<span class="hljs-name">function</span>() {
                                that.getAnchorInfo()<span class="hljs-comment">;</span>
                            }, that.intervalDuration)<span class="hljs-comment">;</span>
                        }, <span class="hljs-number">2000</span>)<span class="hljs-comment">;</span>

                    } else if (<span class="hljs-name">rtnData</span>.rtn == <span class="hljs-number">2</span> || rtnData.rtn == <span class="hljs-number">3</span> || rtnData.rtn == <span class="hljs-number">1</span>) {
                        console.info(<span class="hljs-name">rtnData</span>.msg)<span class="hljs-comment">;</span>
                    }
                })
                .catch(<span class="hljs-name">function</span>(<span class="hljs-name">res</span>) {
                    console.info('网络失败')<span class="hljs-comment">;</span>
                })<span class="hljs-comment">;</span>
        },
        ...
    },
})<span class="hljs-comment">;</span>
</code></pre>
<p>我们可以看到上面是点击时候的处理。 <code>singerVoteUrl</code> 是投票接口的地址，<code>singerVote</code> 是对应的方法。</p>
<p>一开始看到，如果已经投票了，会反馈 每日仅支持一次！ 的提示语，由 <code>this.todayHadVote</code> 判断。否则，通过 vue-resource 发起请求。</p>
<p>因为上面已经提到很多次了，这里就不赘述太多，我们看看主要的部分。</p>
<p>我们应该还记得：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<p class=&quot;add&quot; v-show=&quot;anchor.showAdd&quot;>+1</p>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"add"</span> <span class="hljs-attr">v-show</span>=<span class="hljs-string">"anchor.showAdd"</span>&gt;</span>+1<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
</code></pre>
<p>这个+1的动画的元素，点击投票，成功反馈以后，会进行</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.set(anchor, 'showAdd', true);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>Vue.<span class="hljs-built_in">set</span>(<span class="hljs-built_in">anchor</span>, 'showAdd', true);
</code></pre>
<p>这个操作，这个时候 <code>.add</code> 元素就会显示出来了。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006778425?w=554&amp;h=761" src="https://static.alili.tech/img/remote/1460000006778425?w=554&amp;h=761" alt="" title="" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="anchor.supportCnt++;
this.anchorUserID = getTargetUserID;
this.todayHadVote = true;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code><span class="hljs-built_in">anchor</span>.supportCnt++;
this.<span class="hljs-built_in">anchor</span>UserID = getTargetUserID;
this.todayHadVote = true;
</code></pre>
<p>之后我们是本地该用户的投票数 <code>++</code>,然后设置用户今天已投票，以及投票的人的ID</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="clearInterval(setIntervalGetAnchorInfo);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lisp"><code>clearInterval(<span class="hljs-name">setIntervalGetAnchorInfo</span>)<span class="hljs-comment">;</span>
</code></pre>
<p>之后我们清楚了获取用户信息的计时器</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="setTimeout(function() {
    that.getAnchorInfo();
    that.getLiveStatus();

    setIntervalGetAnchorInfo = setInterval(function() {
        that.getAnchorInfo();
    }, that.intervalDuration);
}, 2000);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lisp"><code>setTimeout(<span class="hljs-name">function</span>() {
    that.getAnchorInfo()<span class="hljs-comment">;</span>
    that.getLiveStatus()<span class="hljs-comment">;</span>

    setIntervalGetAnchorInfo = setInterval(<span class="hljs-name">function</span>() {
        that.getAnchorInfo()<span class="hljs-comment">;</span>
    }, that.intervalDuration)<span class="hljs-comment">;</span>
}, <span class="hljs-number">2000</span>)<span class="hljs-comment">;</span>
</code></pre>
<p>并在两秒（+1动画结束以后），重新获取直播信息还有主播信息，并且重启获取用户信息的计时器。这里主要考虑的是，点击以后，用户的票数会改变，排序上可能会改变，这个时候重新从后台获取信息，能保证点击以后数据是最新的，排序也是正确的。而清除计时器的原因是，在这次交互后我们已经更新了数据，计时器就应该重置，在规定的 <code>that.intervalDuration</code> 时间以后再重新拉取。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//this.$http.jsonp(this.singerVoteUrl + '?userID=' + getUserID + '&amp;targetUserID=' + getTargetUserID + '&amp;sessionID=' + selfSessionID + '&amp;sessionToken=' + selfSessionToken + '&amp;peerID=' + selfPeerID)

this.$http.jsonp(this.singerVoteUrl, {
    params: {
        userID: getUserID,
        targetUserID: getTargetUserID,
        sessionID: selfSessionID,
        sessionToken: selfSessionToken,
        peerID: selfPeerID
    }
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>//this.<span class="hljs-variable">$http</span>.jsonp(this.singerVoteUrl + '?<span class="hljs-keyword">user</span>ID=' + getUserID + '&amp;targetUserID=' + getTargetUserID + '&amp;sessionID=' + <span class="hljs-literal">self</span>SessionID + '&amp;sessionToken=' + <span class="hljs-literal">self</span>SessionToken + '&amp;peerID=' + <span class="hljs-literal">self</span>PeerID)

this.<span class="hljs-variable">$http</span>.jsonp(this.singerVoteUrl, {
    params: {
        <span class="hljs-keyword">user</span>ID: getUserID,
        targetUserID: getTargetUserID,
        sessionID: <span class="hljs-literal">self</span>SessionID,
        sessionToken: <span class="hljs-literal">self</span>SessionToken,
        peerID: <span class="hljs-literal">self</span>PeerID
    }
});
</code></pre>
<p><del>另外我们在这里看到一窜拼接的地址， vue-resource 应该是可以传递 <code>data</code> 对象来传递参数的，试了几次不知道为什么都不行，待改善。</del></p>
<p>更新：vue-resource传参可以通过上面的方法。 然后这个地方可能会报错，因为后台需要 <code>sessionID</code> 和 <code>sessionToken</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="?userID=10003&amp;peerID=45C7781DE9BF&amp;sessionID=67056f7abd062d4dea&amp;&amp;sessionToken=3df4ce5d23
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>?userID=<span class="hljs-number">10003</span>&amp;peerID=<span class="hljs-number">45</span>C7781DE9BF&amp;sessionID=<span class="hljs-number">67056</span>f7abd062d4dea&amp;&amp;sessionToken=<span class="hljs-number">3</span>df4ce5d23
</code></pre>
<p>可以按照上面这样在url地址加上，然后再发送请求。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;name&quot; v-text=&quot;anchor.anchorName&quot; @click=&quot;jumpProfile(anchor.userID)&quot;></div>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"name"</span> v-<span class="hljs-built_in">text</span>=<span class="hljs-string">"anchor.anchorName"</span> @click=<span class="hljs-string">"jumpProfile(anchor.userID)"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
</code></pre>
<p>另外也有一个点击用户名跳转到他个人主页的需求，我们简单的增加一个方法就好了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="jumpProfile: function(userID) {
    console.log(userID);
    if (window.pingo_js) {
        window.pingo_js.jumpPage('profile://' + userID);
    }
},
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>jumpProfile: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">userID</span>) </span>{
    <span class="hljs-built_in">console</span>.log(userID);
    <span class="hljs-keyword">if</span> (<span class="hljs-built_in">window</span>.pingo_js) {
        <span class="hljs-built_in">window</span>.pingo_js.jumpPage(<span class="hljs-string">'profile://'</span> + userID);
    }
},
</code></pre>
<p>这里的 <code>window.pingo_js</code> 不用考虑太多，是公司APP的接口，后面也有这样的代码，可无视。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<a class=&quot;link&quot; @click=&quot;jumpVideo(anchor)&quot;>
    <div class=&quot;live&quot; v-show=&quot;living | getLiving anchor&quot;>
        <p>观看直播 ></p>
    </div>
    <img :src=&quot;anchor.userID | getUserImg&quot; class=&quot;user&quot;>
    <img src=&quot;./images/play.png&quot; class=&quot;play&quot;>
    <p class=&quot;add&quot; v-show=&quot;anchor.showAdd&quot;>+1</p>
</a>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>&lt;a <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"link"</span> @click=<span class="hljs-string">"jumpVideo(anchor)"</span>&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"live"</span> <span class="hljs-attr">v-show</span>=<span class="hljs-string">"living | getLiving anchor"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>观看直播 &gt;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    &lt;img :src=<span class="hljs-string">"anchor.userID | getUserImg"</span> <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"user"</span>&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./images/play.png"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"play"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"add"</span> <span class="hljs-attr">v-show</span>=<span class="hljs-string">"anchor.showAdd"</span>&gt;</span>+1<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span></span>
</code></pre>
<p>我们这里再给 <code>.link</code> 添加了一个 <code>jumpVideo</code> 的点击事件绑定。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="jumpVideo: function(anchor) {
    var curUserID = anchor.userID;
    window.location.href = 'http://api.impingo.me/static/singer/preselection-live.html?userID=' + curUserID; // 视频地址
    return;
},
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>jumpVideo: function(<span class="hljs-built_in">anchor</span>) {
    var curUserID = <span class="hljs-built_in">anchor</span>.<span class="hljs-keyword">user</span>ID;
    window.location.href = 'http://api.impingo.me/static/singer/preselection-live.html?<span class="hljs-keyword">user</span>ID=' + curUserID; // 视频地址
    return;
},
</code></pre>
<p>就只是简单的跳转到我们准备好的视频播放地址，传入用户的ID就好了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;live&quot; v-show=&quot;living | getLiving anchor&quot; @click.stop=&quot;jumpLive(anchor)&quot;>
    <p>观看直播 ></p>
</div>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"live"</span> <span class="hljs-attr">v-show</span>=<span class="hljs-string">"living | getLiving anchor"</span> @<span class="hljs-attr">click.stop</span>=<span class="hljs-string">"jumpLive(anchor)"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>观看直播 &gt;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>而正在直播的用户，点击观看直播的时候，我们绑定了 <code>jumpLive</code> 事件。这里给 <code>@click</code> 加了一个修饰符 <code>.stop</code> ，即禁止冒泡，反正冒泡到父元素的 <code>jumpVideo</code> 点击事件函数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="jumpLive: function(anchor) {
    var curUserID = anchor.userID,
        curRoomID；
    this.livingInfo.forEach(function(living) {
        if (living.createUserID === curUserID) {
            if (living.state == &quot;1&quot;) {
                curRoomID = living.roomID;
            }
        }
    });
    window.location.href = 'http://api.impingo.me/miniSite/livePage?liveID=' + curRoomID;
} 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>jumpLive: function(<span class="hljs-built_in">anchor</span>) {
    var curUserID = <span class="hljs-built_in">anchor</span>.<span class="hljs-keyword">user</span>ID,
        curRoomID；
    this.livingInfo.<span class="hljs-keyword">for</span>Each(function(living) {
        if (living.createUserID === curUserID) {
            if (living.<span class="hljs-keyword">state</span> == <span class="hljs-string">"1"</span>) {
                curRoomID = living.roomID;
            }
        }
    });
    window.location.href = 'http://api.impingo.me/miniSite/livePage?liveID=' + curRoomID;
} 
</code></pre>
<p>而里面也是简单地循环遍历 <code>livingInfo</code> 数组来匹配对应的用户，找出它直播间的房号，跳转到直播页面（这里也有一个跳转到APP直播间的方法，省略掉了，降低理解成本和代码量）。</p>
<p>大功告成。</p>
<p>感觉需要改善的地方有：</p>
<ul>
<li><p><code>livingInfo</code> 数组和 <code>anchorInfo</code> 数组可以通过 computed 属性计算合成一个大的数组，那么很多的过滤器还有 <code>forEach</code> 遍历就可以省略掉了</p></li>
<li><p>可以把整个 <code>ul</code> 下的部分做成一个组件</p></li>
<li><p>文章可能描述的很啰嗦</p></li>
</ul>
<p>全部代码：</p>
<p><a href="https://github.com/cody1991/cody1991.github.io/tree/master/source/2016.08.30/vue-guide" rel="nofollow noreferrer" target="_blank">源码地址</a></p>
<p>guide.html:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>

<head>
    <title>vue guide</title>
    <meta charset=&quot;utf-8&quot;>
    <meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=0&quot;>
    <meta content=&quot;telephone=no&quot; name=&quot;format-detection&quot; />
    <meta content=&quot;email=no&quot; name=&quot;format-detection&quot; />
    <link rel=&quot;stylesheet&quot; href=&quot;./css/guide.css&quot; />
    <script src=&quot;http://7xnv74.com1.z0.glb.clouddn.com/static/lib/flexible/flexible.js&quot;></script>
</head>

<body>
    <div class=&quot;container&quot; id=&quot;app&quot;>
        <div class=&quot;radio-wrapper&quot;>
            <ul class=&quot;list clearfix&quot; v-cloak>
                <li v-for=&quot;anchor in anchorInfo&quot;>
                    <a class=&quot;link&quot; @click=&quot;jumpVideo(anchor)&quot;>
                        <div class=&quot;live&quot; v-show=&quot;living | getLiving anchor&quot; @click.stop=&quot;jumpLive(anchor)&quot;>
                            <p>观看直播 ></p>
                        </div>
                        <img :src=&quot;anchor.userID | getUserImg&quot; class=&quot;user&quot;>
                        <img src=&quot;./images/play.png&quot; class=&quot;play&quot;>
                        <p class=&quot;add&quot; v-show=&quot;anchor.showAdd&quot;>+1</p>
                    </a>
                    <div class=&quot;user-wrapper&quot;>
                        <div class=&quot;name&quot; v-text=&quot;anchor.anchorName&quot; @click=&quot;jumpProfile(anchor.userID)&quot;></div>
                        <div class=&quot;num&quot; v-text=&quot;anchor.supportCnt&quot;></div>
                    </div>
                    <template v-if=&quot;voteStatus | getVoteStatus anchor&quot;>
                        <div class=&quot;had-btn&quot;>
                            <p>今日已支持</p>
                        </div>
                    </template>
                    <template v-else>
                        <div class=&quot;do-btn&quot; @click=&quot;singerVote(anchor)&quot;>
                            <p>支持</p>
                        </div>
                    </template>
                </li>
            </ul>
        </div>
    </div>
    <script src=&quot;http://7xnv74.com1.z0.glb.clouddn.com/static/lib/fastclick/fastclick.min.js&quot;></script>
    <script src=&quot;./js/vue.min.js&quot;></script>
    <script src=&quot;./js/vue-resource.min.js&quot;></script>
    <script src=&quot;./js/guide.js&quot;></script>
</body>

</html>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>vue guide<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=0"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"telephone=no"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"format-detection"</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"email=no"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"format-detection"</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"./css/guide.css"</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://7xnv74.com1.z0.glb.clouddn.com/static/lib/flexible/flexible.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"container"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"radio-wrapper"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"list clearfix"</span> <span class="hljs-attr">v-cloak</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"anchor in anchorInfo"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"link"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"jumpVideo(anchor)"</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"live"</span> <span class="hljs-attr">v-show</span>=<span class="hljs-string">"living | getLiving anchor"</span> @<span class="hljs-attr">click.stop</span>=<span class="hljs-string">"jumpLive(anchor)"</span>&gt;</span>
                            <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>观看直播 &gt;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
                        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">:src</span>=<span class="hljs-string">"anchor.userID | getUserImg"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"user"</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./images/play.png"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"play"</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"add"</span> <span class="hljs-attr">v-show</span>=<span class="hljs-string">"anchor.showAdd"</span>&gt;</span>+1<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
                    <span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"user-wrapper"</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"name"</span> <span class="hljs-attr">v-text</span>=<span class="hljs-string">"anchor.anchorName"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"jumpProfile(anchor.userID)"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"num"</span> <span class="hljs-attr">v-text</span>=<span class="hljs-string">"anchor.supportCnt"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"voteStatus | getVoteStatus anchor"</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"had-btn"</span>&gt;</span>
                            <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>今日已支持<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
                        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                    <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">v-else</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"do-btn"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"singerVote(anchor)"</span>&gt;</span>
                            <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>支持<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
                        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                    <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://7xnv74.com1.z0.glb.clouddn.com/static/lib/fastclick/fastclick.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./js/vue.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./js/vue-resource.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./js/guide.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</code></pre>
<p>guide.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var lib = {
    urlParams: function(url) {
        var urlParamsList = {};
        var params = url.search.replace(/^\?/, &quot;&quot;).split('&amp;'); //分开成各个不同的对像，去掉'&amp;'
        for (var i = 0; i < params.length; i++) {
            var param = params[i];
            var temp = param.split(&quot;=&quot;);
            urlParamsList[temp[0]] = decodeURI(temp[1]);
        }
        return urlParamsList;
    }
};

window.onload = function() {

    var attachFastClick = Origami.fastclick;
    attachFastClick(document.body);

    var windowLocation = window.location,
        selfUserID = lib.urlParams(windowLocation)['userID'],
        selfSessionID = lib.urlParams(windowLocation)['sessionID'],
        selfSessionToken = lib.urlParams(windowLocation)['sessionToken'],
        selfPeerID = lib.urlParams(windowLocation)['peerID'];

    var app = new Vue({
        el: '#app',
        data: {
            anchorInfo: [],
            livingInfo: [],
            getAnchorInfoUrl: &quot;http://a.impingo.me/activity/getAnchorInfo&quot;,
            getLiveStatusUrl: &quot;http://a.impingo.me/activity/getLiveStatus&quot;,
            queryVoteStatusUrl: &quot;http://a.impingo.me/activity/queryVoteStatus&quot;,
            singerVoteUrl: &quot;http://a.impingo.me/activity/singerVote&quot;,
            anchorUserID: '',
            todayHadVote: false,
            setIntervalGetLiveStatus: null,
            setIntervalGetAnchorInfo: null,
            intervalDuration: 60 * 1000,
        },
        ready: function() {
            this.getAnchorInfo();
            this.getLiveStatus();
            this.queryVoteStatus();
            this.initSetTimeout();
        },
        methods: {
            getAnchorInfo: function() {
                this.$http.jsonp(this.getAnchorInfoUrl)
                    .then(function(res) {
                        console.log(res);
                        var rtnData = res.data;
                        if (rtnData.rtn == 0) {
                            this.$set('anchorInfo', rtnData.data);
                        }
                    })
                    .catch(function(res) {
                        console.info('网络失败');
                    });
            },
            getLiveStatus: function() {
                this.$http.jsonp(this.getLiveStatusUrl)
                    .then(function(res) {
                        var that = this;
                        var rtnData = res.data;
                        if (rtnData.rtn == 0) {
                            this.$set('livingInfo', rtnData.data);
                        }
                    })
                    .catch(function(res) {
                        console.info('网络失败');
                    });
            },
            queryVoteStatus: function() {
                // this.$http.jsonp(this.queryVoteStatusUrl + '?userID=' + selfUserID)
                this.$http.jsonp(this.queryVoteStatusUrl, {
                        params: {
                            'userID': selfUserID
                        }
                    })
                    .then(function(res) {
                        var rtnData = res.data;
                        if (rtnData.rtn == 0) {
                            this.todayHadVote = false;
                        } else if (rtnData.rtn == 1) {
                            this.todayHadVote = true;
                            this.anchorUserID = rtnData.data.anchorUserID;
                        }
                    })
                    .catch(function(res) {
                        console.info('网络失败');
                    });
            },
            initSetTimeout: function() {
                var that = this;
                setIntervalGetAnchorInfo = setInterval(function() {
                    that.getAnchorInfo();
                }, that.intervalDuration);
                setIntervalGetLiveStatus = setInterval(function() {
                    that.getLiveStatus();
                }, that.intervalDuration);
            },
            singerVote: function(anchor) {
                var getUserID = selfUserID,
                    getTargetUserID = anchor.userID;

                if (this.todayHadVote) {
                    console.info('每日仅支持一次！');
                    return;
                }

                this.$http.jsonp(this.singerVoteUrl, {
                        params: {
                            userID: getUserID,
                            targetUserID: getTargetUserID,
                            sessionID: selfSessionID,
                            sessionToken: selfSessionToken,
                            peerID: selfPeerID
                        }
                    })
                    .then(function(res) {
                        var rtnData = res.data,
                            that = this;
                        if (rtnData.rtn == 0) {
                            // console.info(rtnData.msg);
                            Vue.set(anchor, 'showAdd', true);
                            anchor.supportCnt++;
                            this.anchorUserID = getTargetUserID;
                            this.todayHadVote = true;

                            clearInterval(setIntervalGetAnchorInfo);

                            // 点击投票，动画（2秒）以后，重新拉取直播状态以及直播信息
                            setTimeout(function() {
                                that.getAnchorInfo();
                                that.getLiveStatus();

                                setIntervalGetAnchorInfo = setInterval(function() {
                                    that.getAnchorInfo();
                                }, that.intervalDuration);
                            }, 2000);

                        } else if (rtnData.rtn == 2 || rtnData.rtn == 3 || rtnData.rtn == 1) {
                            console.info(rtnData.msg);
                        }
                    })
                    .catch(function(res) {
                        console.info('网络失败');
                    });
            },
            jumpProfile: function(userID) {
                console.log(userID);
                if (window.pingo_js) {
                    window.pingo_js.jumpPage('profile://' + userID);
                }
            },
            jumpVideo: function(anchor) {
                var curUserID = anchor.userID;
                window.location.href = 'http://api.impingo.me/static/singer/preselection-live.html?userID=' + curUserID; // 视频地址
                return;
            },
            jumpLive: function(anchor) {
                var curUserID = anchor.userID,
                    curRoomID;
                this.livingInfo.forEach(function(living) {
                    if (living.createUserID === curUserID) {
                        if (living.state == &quot;1&quot;) {
                            curRoomID = living.roomID;
                        }
                    }
                });
                window.location.href = 'http://api.impingo.me/miniSite/livePage?liveID=' + curRoomID;
            }
        },
        filters: {
            getUserImg: function(val) {
                return 'http://a.impingo.me/static/activity/singer/resource/' + val + '.jpg'
            },
            getLiving: function(val, anchor) {
                var curUserID = anchor.userID,
                    isLiving = false;
                this.livingInfo.forEach(function(living) {
                    if (living.createUserID === curUserID) {
                        if (living.state == &quot;1&quot;) {
                            isLiving = true;
                        }
                    }
                });
                return isLiving;
            },
            getVoteStatus: function(val, anchor) {
                if (anchor.userID == this.anchorUserID) {
                    // 可支持
                    return true;
                } else {
                    // 不可支持
                    return false;
                }
            },
        },
    });
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> lib = {
    <span class="hljs-attr">urlParams</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">url</span>) </span>{
        <span class="hljs-keyword">var</span> urlParamsList = {};
        <span class="hljs-keyword">var</span> params = url.search.replace(<span class="hljs-regexp">/^\?/</span>, <span class="hljs-string">""</span>).split(<span class="hljs-string">'&amp;'</span>); <span class="hljs-comment">//分开成各个不同的对像，去掉'&amp;'</span>
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; params.length; i++) {
            <span class="hljs-keyword">var</span> param = params[i];
            <span class="hljs-keyword">var</span> temp = param.split(<span class="hljs-string">"="</span>);
            urlParamsList[temp[<span class="hljs-number">0</span>]] = <span class="hljs-built_in">decodeURI</span>(temp[<span class="hljs-number">1</span>]);
        }
        <span class="hljs-keyword">return</span> urlParamsList;
    }
};

<span class="hljs-built_in">window</span>.onload = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{

    <span class="hljs-keyword">var</span> attachFastClick = Origami.fastclick;
    attachFastClick(<span class="hljs-built_in">document</span>.body);

    <span class="hljs-keyword">var</span> windowLocation = <span class="hljs-built_in">window</span>.location,
        selfUserID = lib.urlParams(windowLocation)[<span class="hljs-string">'userID'</span>],
        selfSessionID = lib.urlParams(windowLocation)[<span class="hljs-string">'sessionID'</span>],
        selfSessionToken = lib.urlParams(windowLocation)[<span class="hljs-string">'sessionToken'</span>],
        selfPeerID = lib.urlParams(windowLocation)[<span class="hljs-string">'peerID'</span>];

    <span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> Vue({
        <span class="hljs-attr">el</span>: <span class="hljs-string">'#app'</span>,
        <span class="hljs-attr">data</span>: {
            <span class="hljs-attr">anchorInfo</span>: [],
            <span class="hljs-attr">livingInfo</span>: [],
            <span class="hljs-attr">getAnchorInfoUrl</span>: <span class="hljs-string">"http://a.impingo.me/activity/getAnchorInfo"</span>,
            <span class="hljs-attr">getLiveStatusUrl</span>: <span class="hljs-string">"http://a.impingo.me/activity/getLiveStatus"</span>,
            <span class="hljs-attr">queryVoteStatusUrl</span>: <span class="hljs-string">"http://a.impingo.me/activity/queryVoteStatus"</span>,
            <span class="hljs-attr">singerVoteUrl</span>: <span class="hljs-string">"http://a.impingo.me/activity/singerVote"</span>,
            <span class="hljs-attr">anchorUserID</span>: <span class="hljs-string">''</span>,
            <span class="hljs-attr">todayHadVote</span>: <span class="hljs-literal">false</span>,
            <span class="hljs-attr">setIntervalGetLiveStatus</span>: <span class="hljs-literal">null</span>,
            <span class="hljs-attr">setIntervalGetAnchorInfo</span>: <span class="hljs-literal">null</span>,
            <span class="hljs-attr">intervalDuration</span>: <span class="hljs-number">60</span> * <span class="hljs-number">1000</span>,
        },
        <span class="hljs-attr">ready</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">this</span>.getAnchorInfo();
            <span class="hljs-keyword">this</span>.getLiveStatus();
            <span class="hljs-keyword">this</span>.queryVoteStatus();
            <span class="hljs-keyword">this</span>.initSetTimeout();
        },
        <span class="hljs-attr">methods</span>: {
            <span class="hljs-attr">getAnchorInfo</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                <span class="hljs-keyword">this</span>.$http.jsonp(<span class="hljs-keyword">this</span>.getAnchorInfoUrl)
                    .then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">res</span>) </span>{
                        <span class="hljs-built_in">console</span>.log(res);
                        <span class="hljs-keyword">var</span> rtnData = res.data;
                        <span class="hljs-keyword">if</span> (rtnData.rtn == <span class="hljs-number">0</span>) {
                            <span class="hljs-keyword">this</span>.$set(<span class="hljs-string">'anchorInfo'</span>, rtnData.data);
                        }
                    })
                    .catch(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">res</span>) </span>{
                        <span class="hljs-built_in">console</span>.info(<span class="hljs-string">'网络失败'</span>);
                    });
            },
            <span class="hljs-attr">getLiveStatus</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                <span class="hljs-keyword">this</span>.$http.jsonp(<span class="hljs-keyword">this</span>.getLiveStatusUrl)
                    .then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">res</span>) </span>{
                        <span class="hljs-keyword">var</span> that = <span class="hljs-keyword">this</span>;
                        <span class="hljs-keyword">var</span> rtnData = res.data;
                        <span class="hljs-keyword">if</span> (rtnData.rtn == <span class="hljs-number">0</span>) {
                            <span class="hljs-keyword">this</span>.$set(<span class="hljs-string">'livingInfo'</span>, rtnData.data);
                        }
                    })
                    .catch(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">res</span>) </span>{
                        <span class="hljs-built_in">console</span>.info(<span class="hljs-string">'网络失败'</span>);
                    });
            },
            <span class="hljs-attr">queryVoteStatus</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                <span class="hljs-comment">// this.$http.jsonp(this.queryVoteStatusUrl + '?userID=' + selfUserID)</span>
                <span class="hljs-keyword">this</span>.$http.jsonp(<span class="hljs-keyword">this</span>.queryVoteStatusUrl, {
                        <span class="hljs-attr">params</span>: {
                            <span class="hljs-string">'userID'</span>: selfUserID
                        }
                    })
                    .then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">res</span>) </span>{
                        <span class="hljs-keyword">var</span> rtnData = res.data;
                        <span class="hljs-keyword">if</span> (rtnData.rtn == <span class="hljs-number">0</span>) {
                            <span class="hljs-keyword">this</span>.todayHadVote = <span class="hljs-literal">false</span>;
                        } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (rtnData.rtn == <span class="hljs-number">1</span>) {
                            <span class="hljs-keyword">this</span>.todayHadVote = <span class="hljs-literal">true</span>;
                            <span class="hljs-keyword">this</span>.anchorUserID = rtnData.data.anchorUserID;
                        }
                    })
                    .catch(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">res</span>) </span>{
                        <span class="hljs-built_in">console</span>.info(<span class="hljs-string">'网络失败'</span>);
                    });
            },
            <span class="hljs-attr">initSetTimeout</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                <span class="hljs-keyword">var</span> that = <span class="hljs-keyword">this</span>;
                setIntervalGetAnchorInfo = setInterval(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                    that.getAnchorInfo();
                }, that.intervalDuration);
                setIntervalGetLiveStatus = setInterval(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                    that.getLiveStatus();
                }, that.intervalDuration);
            },
            <span class="hljs-attr">singerVote</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">anchor</span>) </span>{
                <span class="hljs-keyword">var</span> getUserID = selfUserID,
                    getTargetUserID = anchor.userID;

                <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.todayHadVote) {
                    <span class="hljs-built_in">console</span>.info(<span class="hljs-string">'每日仅支持一次！'</span>);
                    <span class="hljs-keyword">return</span>;
                }

                <span class="hljs-keyword">this</span>.$http.jsonp(<span class="hljs-keyword">this</span>.singerVoteUrl, {
                        <span class="hljs-attr">params</span>: {
                            <span class="hljs-attr">userID</span>: getUserID,
                            <span class="hljs-attr">targetUserID</span>: getTargetUserID,
                            <span class="hljs-attr">sessionID</span>: selfSessionID,
                            <span class="hljs-attr">sessionToken</span>: selfSessionToken,
                            <span class="hljs-attr">peerID</span>: selfPeerID
                        }
                    })
                    .then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">res</span>) </span>{
                        <span class="hljs-keyword">var</span> rtnData = res.data,
                            that = <span class="hljs-keyword">this</span>;
                        <span class="hljs-keyword">if</span> (rtnData.rtn == <span class="hljs-number">0</span>) {
                            <span class="hljs-comment">// console.info(rtnData.msg);</span>
                            Vue.set(anchor, <span class="hljs-string">'showAdd'</span>, <span class="hljs-literal">true</span>);
                            anchor.supportCnt++;
                            <span class="hljs-keyword">this</span>.anchorUserID = getTargetUserID;
                            <span class="hljs-keyword">this</span>.todayHadVote = <span class="hljs-literal">true</span>;

                            clearInterval(setIntervalGetAnchorInfo);

                            <span class="hljs-comment">// 点击投票，动画（2秒）以后，重新拉取直播状态以及直播信息</span>
                            setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                                that.getAnchorInfo();
                                that.getLiveStatus();

                                setIntervalGetAnchorInfo = setInterval(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                                    that.getAnchorInfo();
                                }, that.intervalDuration);
                            }, <span class="hljs-number">2000</span>);

                        } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (rtnData.rtn == <span class="hljs-number">2</span> || rtnData.rtn == <span class="hljs-number">3</span> || rtnData.rtn == <span class="hljs-number">1</span>) {
                            <span class="hljs-built_in">console</span>.info(rtnData.msg);
                        }
                    })
                    .catch(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">res</span>) </span>{
                        <span class="hljs-built_in">console</span>.info(<span class="hljs-string">'网络失败'</span>);
                    });
            },
            <span class="hljs-attr">jumpProfile</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">userID</span>) </span>{
                <span class="hljs-built_in">console</span>.log(userID);
                <span class="hljs-keyword">if</span> (<span class="hljs-built_in">window</span>.pingo_js) {
                    <span class="hljs-built_in">window</span>.pingo_js.jumpPage(<span class="hljs-string">'profile://'</span> + userID);
                }
            },
            <span class="hljs-attr">jumpVideo</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">anchor</span>) </span>{
                <span class="hljs-keyword">var</span> curUserID = anchor.userID;
                <span class="hljs-built_in">window</span>.location.href = <span class="hljs-string">'http://api.impingo.me/static/singer/preselection-live.html?userID='</span> + curUserID; <span class="hljs-comment">// 视频地址</span>
                <span class="hljs-keyword">return</span>;
            },
            <span class="hljs-attr">jumpLive</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">anchor</span>) </span>{
                <span class="hljs-keyword">var</span> curUserID = anchor.userID,
                    curRoomID;
                <span class="hljs-keyword">this</span>.livingInfo.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">living</span>) </span>{
                    <span class="hljs-keyword">if</span> (living.createUserID === curUserID) {
                        <span class="hljs-keyword">if</span> (living.state == <span class="hljs-string">"1"</span>) {
                            curRoomID = living.roomID;
                        }
                    }
                });
                <span class="hljs-built_in">window</span>.location.href = <span class="hljs-string">'http://api.impingo.me/miniSite/livePage?liveID='</span> + curRoomID;
            }
        },
        <span class="hljs-attr">filters</span>: {
            <span class="hljs-attr">getUserImg</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">val</span>) </span>{
                <span class="hljs-keyword">return</span> <span class="hljs-string">'http://a.impingo.me/static/activity/singer/resource/'</span> + val + <span class="hljs-string">'.jpg'</span>
            },
            <span class="hljs-attr">getLiving</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">val, anchor</span>) </span>{
                <span class="hljs-keyword">var</span> curUserID = anchor.userID,
                    isLiving = <span class="hljs-literal">false</span>;
                <span class="hljs-keyword">this</span>.livingInfo.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">living</span>) </span>{
                    <span class="hljs-keyword">if</span> (living.createUserID === curUserID) {
                        <span class="hljs-keyword">if</span> (living.state == <span class="hljs-string">"1"</span>) {
                            isLiving = <span class="hljs-literal">true</span>;
                        }
                    }
                });
                <span class="hljs-keyword">return</span> isLiving;
            },
            <span class="hljs-attr">getVoteStatus</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">val, anchor</span>) </span>{
                <span class="hljs-keyword">if</span> (anchor.userID == <span class="hljs-keyword">this</span>.anchorUserID) {
                    <span class="hljs-comment">// 可支持</span>
                    <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
                } <span class="hljs-keyword">else</span> {
                    <span class="hljs-comment">// 不可支持</span>
                    <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
                }
            },
        },
    });
}
</code></pre>
<p>guide.less</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@import (inline) './normalize.css';
body {
    background-color: #010017;
}

.container {
    user-select: none;
    font-family: 'Microsoft YaHei', sans-serif;
    position: relative;
    min-width: 320px;
    max-width: 750px;
    margin: 0 auto;
    font-size: 0.32rem;
}

[v-cloak] {
    display: none;
}

// 设计稿是 750px
// 1rem = 75px
@base: 75rem;
.demo {
    text-align: center;
    .btn {
        width: 560 / @base;
    }
}

.radio-wrapper {
    .list {
        padding-left: 18/@base;
        padding-right: 18/@base;
        padding-top: 35/@base;
        li {
            background-color: #fff;
            width: 346/@base;
            height: 488/@base;
            position: relative;
            margin-bottom: 20/@base;
            float: left;
            display: table;
            &amp;:nth-child(odd) {
                // margin-right: 10/@base;
            }
            &amp;:nth-child(even) {
                float: right;
            }
            .live {
                position: absolute;
                background-color: #2aa2fe;
                width: 150/@base;
                height: 50/@base;
                border-top-right-radius: 100px;
                border-bottom-right-radius: 100px;
                left: -11/@base;
                top: 29/@base;
                z-index: 99;
                display: table;
                p {
                    color: #fff;
                    font-size: 24/@base;
                    text-align: center;
                    vertical-align: middle;
                    display: table-cell;
                }
            }
            .link {
                display: block;
                width: 324/@base;
                height: 324/@base;
                position: absolute;
                left: 11/@base;
                right: 11/@base;
                top: 10/@base;
            }
            .user {
                width: 324/@base;
                display: block;
            }
            .play {
                width: 60/@base;
                position: absolute;
                left: 30/@base;
                top: 250/@base;
            }
            .add {
                position: absolute;
                font-size: 30/@base;
                font-weight: bold;
                color: #f919b6;
                z-index: 99;
                right: 30/@base;
                top: 310/@base;
                -webkit-animation: fadeOutUp 2s .2s ease both;
            }
            @-webkit-keyframes fadeOutUp {
                0% {
                    opacity: 1;
                    -webkit-transform: translateY(0)
                }
                30% {
                    opacity: 0.7;
                    font-size: 40/@base;
                    -webkit-transform: translateY(-15px)
                }
                100% {
                    opacity: 0;
                    -webkit-transform: translateY(-30px)
                }
            }
            .user-wrapper {
                position: absolute;
                left: 11/@base;
                top: 350/@base;
                width: 320/@base;
                .name {
                    color: #333;
                    font-size: 26/@base;
                    display: inline-block;
                    width: 150/@base;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                }
                .num {
                    color: #f919b6;
                    font-size: 26/@base;
                    display: inline-block;
                    float: right;
                    // margin-left: 200/@base;
                }
            }
            .do-btn {
                background-color: #f919b6;
                text-align: center;
                border-radius: 15/@base;
                width: 306/@base;
                height: 70/@base;
                bottom: 20/@base;
                left: 20/@base;
                position: absolute;
                display: table;
                p {
                    display: table-cell;
                    vertical-align: middle;
                    font-size: 30/@base;
                    color: #fff;
                }
            }
            .had-btn {
                background-color: #ffb9e8;
                text-align: center;
                border-radius: 15/@base;
                width: 306/@base;
                height: 70/@base;
                bottom: 20/@base;
                left: 20/@base;
                position: absolute;
                display: table;
                p {
                    display: table-cell;
                    vertical-align: middle;
                    font-size: 30/@base;
                    color: rgba(255, 255, 255, 0.6);
                }
            }
        }
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-keyword">@import</span> (inline) <span class="hljs-string">'./normalize.css'</span>;
<span class="hljs-selector-tag">body</span> {
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#010017</span>;
}

<span class="hljs-selector-class">.container</span> {
    <span class="hljs-attribute">user-select</span>: none;
    <span class="hljs-attribute">font-family</span>: <span class="hljs-string">'Microsoft YaHei'</span>, sans-serif;
    <span class="hljs-attribute">position</span>: relative;
    <span class="hljs-attribute">min-width</span>: <span class="hljs-number">320px</span>;
    <span class="hljs-attribute">max-width</span>: <span class="hljs-number">750px</span>;
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> auto;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">0.32rem</span>;
}

<span class="hljs-selector-attr">[v-cloak]</span> {
    <span class="hljs-attribute">display</span>: none;
}

<span class="hljs-comment">// 设计稿是 750px</span>
<span class="hljs-comment">// 1rem = 75px</span>
<span class="hljs-variable">@base:</span> <span class="hljs-number">75rem</span>;
<span class="hljs-selector-class">.demo</span> {
    <span class="hljs-attribute">text-align</span>: center;
    <span class="hljs-selector-class">.btn</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">560</span> / <span class="hljs-variable">@base</span>;
    }
}

<span class="hljs-selector-class">.radio-wrapper</span> {
    <span class="hljs-selector-class">.list</span> {
        <span class="hljs-attribute">padding-left</span>: <span class="hljs-number">18</span>/<span class="hljs-variable">@base</span>;
        <span class="hljs-attribute">padding-right</span>: <span class="hljs-number">18</span>/<span class="hljs-variable">@base</span>;
        <span class="hljs-attribute">padding-top</span>: <span class="hljs-number">35</span>/<span class="hljs-variable">@base</span>;
        <span class="hljs-selector-tag">li</span> {
            <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#fff</span>;
            <span class="hljs-attribute">width</span>: <span class="hljs-number">346</span>/<span class="hljs-variable">@base</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">488</span>/<span class="hljs-variable">@base</span>;
            <span class="hljs-attribute">position</span>: relative;
            <span class="hljs-attribute">margin-bottom</span>: <span class="hljs-number">20</span>/<span class="hljs-variable">@base</span>;
            <span class="hljs-attribute">float</span>: left;
            <span class="hljs-attribute">display</span>: table;
            <span class="hljs-selector-tag">&amp;</span><span class="hljs-selector-pseudo">:nth-child(odd)</span> {
                <span class="hljs-comment">// margin-right: 10/@base;</span>
            }
            <span class="hljs-selector-tag">&amp;</span><span class="hljs-selector-pseudo">:nth-child(even)</span> {
                <span class="hljs-attribute">float</span>: right;
            }
            <span class="hljs-selector-class">.live</span> {
                <span class="hljs-attribute">position</span>: absolute;
                <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#2aa2fe</span>;
                <span class="hljs-attribute">width</span>: <span class="hljs-number">150</span>/<span class="hljs-variable">@base</span>;
                <span class="hljs-attribute">height</span>: <span class="hljs-number">50</span>/<span class="hljs-variable">@base</span>;
                <span class="hljs-attribute">border-top-right-radius</span>: <span class="hljs-number">100px</span>;
                <span class="hljs-attribute">border-bottom-right-radius</span>: <span class="hljs-number">100px</span>;
                <span class="hljs-attribute">left</span>: -<span class="hljs-number">11</span>/<span class="hljs-variable">@base</span>;
                <span class="hljs-attribute">top</span>: <span class="hljs-number">29</span>/<span class="hljs-variable">@base</span>;
                <span class="hljs-attribute">z-index</span>: <span class="hljs-number">99</span>;
                <span class="hljs-attribute">display</span>: table;
                <span class="hljs-selector-tag">p</span> {
                    <span class="hljs-attribute">color</span>: <span class="hljs-number">#fff</span>;
                    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">24</span>/<span class="hljs-variable">@base</span>;
                    <span class="hljs-attribute">text-align</span>: center;
                    <span class="hljs-attribute">vertical-align</span>: middle;
                    <span class="hljs-attribute">display</span>: table-cell;
                }
            }
            <span class="hljs-selector-class">.link</span> {
                <span class="hljs-attribute">display</span>: block;
                <span class="hljs-attribute">width</span>: <span class="hljs-number">324</span>/<span class="hljs-variable">@base</span>;
                <span class="hljs-attribute">height</span>: <span class="hljs-number">324</span>/<span class="hljs-variable">@base</span>;
                <span class="hljs-attribute">position</span>: absolute;
                <span class="hljs-attribute">left</span>: <span class="hljs-number">11</span>/<span class="hljs-variable">@base</span>;
                <span class="hljs-attribute">right</span>: <span class="hljs-number">11</span>/<span class="hljs-variable">@base</span>;
                <span class="hljs-attribute">top</span>: <span class="hljs-number">10</span>/<span class="hljs-variable">@base</span>;
            }
            <span class="hljs-selector-class">.user</span> {
                <span class="hljs-attribute">width</span>: <span class="hljs-number">324</span>/<span class="hljs-variable">@base</span>;
                <span class="hljs-attribute">display</span>: block;
            }
            <span class="hljs-selector-class">.play</span> {
                <span class="hljs-attribute">width</span>: <span class="hljs-number">60</span>/<span class="hljs-variable">@base</span>;
                <span class="hljs-attribute">position</span>: absolute;
                <span class="hljs-attribute">left</span>: <span class="hljs-number">30</span>/<span class="hljs-variable">@base</span>;
                <span class="hljs-attribute">top</span>: <span class="hljs-number">250</span>/<span class="hljs-variable">@base</span>;
            }
            <span class="hljs-selector-class">.add</span> {
                <span class="hljs-attribute">position</span>: absolute;
                <span class="hljs-attribute">font-size</span>: <span class="hljs-number">30</span>/<span class="hljs-variable">@base</span>;
                <span class="hljs-attribute">font-weight</span>: bold;
                <span class="hljs-attribute">color</span>: <span class="hljs-number">#f919b6</span>;
                <span class="hljs-attribute">z-index</span>: <span class="hljs-number">99</span>;
                <span class="hljs-attribute">right</span>: <span class="hljs-number">30</span>/<span class="hljs-variable">@base</span>;
                <span class="hljs-attribute">top</span>: <span class="hljs-number">310</span>/<span class="hljs-variable">@base</span>;
                <span class="hljs-attribute">-webkit-animation</span>: fadeOutUp <span class="hljs-number">2s</span> .<span class="hljs-number">2s</span> ease both;
            }
            <span class="hljs-keyword">@-webkit-keyframes</span> fadeOutUp {
                <span class="hljs-selector-tag">0%</span> {
                    <span class="hljs-attribute">opacity</span>: <span class="hljs-number">1</span>;
                    <span class="hljs-attribute">-webkit-transform</span>: translateY(<span class="hljs-number">0</span>)
                }
                <span class="hljs-selector-tag">30%</span> {
                    <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0.7</span>;
                    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">40</span>/<span class="hljs-variable">@base</span>;
                    <span class="hljs-attribute">-webkit-transform</span>: translateY(-<span class="hljs-number">15px</span>)
                }
                <span class="hljs-selector-tag">100%</span> {
                    <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0</span>;
                    <span class="hljs-attribute">-webkit-transform</span>: translateY(-<span class="hljs-number">30px</span>)
                }
            }
            <span class="hljs-selector-class">.user-wrapper</span> {
                <span class="hljs-attribute">position</span>: absolute;
                <span class="hljs-attribute">left</span>: <span class="hljs-number">11</span>/<span class="hljs-variable">@base</span>;
                <span class="hljs-attribute">top</span>: <span class="hljs-number">350</span>/<span class="hljs-variable">@base</span>;
                <span class="hljs-attribute">width</span>: <span class="hljs-number">320</span>/<span class="hljs-variable">@base</span>;
                <span class="hljs-selector-class">.name</span> {
                    <span class="hljs-attribute">color</span>: <span class="hljs-number">#333</span>;
                    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">26</span>/<span class="hljs-variable">@base</span>;
                    <span class="hljs-attribute">display</span>: inline-block;
                    <span class="hljs-attribute">width</span>: <span class="hljs-number">150</span>/<span class="hljs-variable">@base</span>;
                    <span class="hljs-attribute">text-overflow</span>: ellipsis;
                    <span class="hljs-attribute">overflow</span>: hidden;
                    <span class="hljs-attribute">white-space</span>: nowrap;
                }
                <span class="hljs-selector-class">.num</span> {
                    <span class="hljs-attribute">color</span>: <span class="hljs-number">#f919b6</span>;
                    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">26</span>/<span class="hljs-variable">@base</span>;
                    <span class="hljs-attribute">display</span>: inline-block;
                    <span class="hljs-attribute">float</span>: right;
                    <span class="hljs-comment">// margin-left: 200/@base;</span>
                }
            }
            <span class="hljs-selector-class">.do-btn</span> {
                <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#f919b6</span>;
                <span class="hljs-attribute">text-align</span>: center;
                <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">15</span>/<span class="hljs-variable">@base</span>;
                <span class="hljs-attribute">width</span>: <span class="hljs-number">306</span>/<span class="hljs-variable">@base</span>;
                <span class="hljs-attribute">height</span>: <span class="hljs-number">70</span>/<span class="hljs-variable">@base</span>;
                <span class="hljs-attribute">bottom</span>: <span class="hljs-number">20</span>/<span class="hljs-variable">@base</span>;
                <span class="hljs-attribute">left</span>: <span class="hljs-number">20</span>/<span class="hljs-variable">@base</span>;
                <span class="hljs-attribute">position</span>: absolute;
                <span class="hljs-attribute">display</span>: table;
                <span class="hljs-selector-tag">p</span> {
                    <span class="hljs-attribute">display</span>: table-cell;
                    <span class="hljs-attribute">vertical-align</span>: middle;
                    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">30</span>/<span class="hljs-variable">@base</span>;
                    <span class="hljs-attribute">color</span>: <span class="hljs-number">#fff</span>;
                }
            }
            <span class="hljs-selector-class">.had-btn</span> {
                <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#ffb9e8</span>;
                <span class="hljs-attribute">text-align</span>: center;
                <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">15</span>/<span class="hljs-variable">@base</span>;
                <span class="hljs-attribute">width</span>: <span class="hljs-number">306</span>/<span class="hljs-variable">@base</span>;
                <span class="hljs-attribute">height</span>: <span class="hljs-number">70</span>/<span class="hljs-variable">@base</span>;
                <span class="hljs-attribute">bottom</span>: <span class="hljs-number">20</span>/<span class="hljs-variable">@base</span>;
                <span class="hljs-attribute">left</span>: <span class="hljs-number">20</span>/<span class="hljs-variable">@base</span>;
                <span class="hljs-attribute">position</span>: absolute;
                <span class="hljs-attribute">display</span>: table;
                <span class="hljs-selector-tag">p</span> {
                    <span class="hljs-attribute">display</span>: table-cell;
                    <span class="hljs-attribute">vertical-align</span>: middle;
                    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">30</span>/<span class="hljs-variable">@base</span>;
                    <span class="hljs-attribute">color</span>: rgba(<span class="hljs-number">255</span>, <span class="hljs-number">255</span>, <span class="hljs-number">255</span>, <span class="hljs-number">0.6</span>);
                }
            }
        }
    }
}
</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
一个简单的 vue.js 实践教程

## 原文链接
[https://segmentfault.com/a/1190000006776243](https://segmentfault.com/a/1190000006776243)

