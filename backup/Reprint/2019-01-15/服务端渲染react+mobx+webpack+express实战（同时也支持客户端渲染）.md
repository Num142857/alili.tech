---
title: '服务端渲染react+mobx+webpack+express实战（同时也支持客户端渲染）' 
date: 2019-01-15 2:30:12
hidden: true
slug: 84nr940nody
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>目前绝大多数网站还是一个多页的结构，但其实一个网站已经完全可以做成一个spa，比如youtube就是一个spa，最近公司项目都是采用react+mobx服务端渲染的单页面应用的形式，踩了一些坑，有一些自己的体验，所以把项目抽了出来去掉了业务代码，留了一个架子分享一下。</p></blockquote>
<p><a href="https://github.com/L-x-C/isomorphic-react-with-mobx" rel="nofollow noreferrer" target="_blank">项目github地址</a></p>
<p>目前react主流的状态管理使用的比较多的是redux，我司之前有个项目也是react+redux，从我个人使用下来的感受来说，<strong>对于绝大多数的前端应用场景，mobx远比redux更合适，更简单使用，更容易上手。</strong></p>
<h2 id="articleHeader0">效果</h2>
<h4>登陆，注册</h4>
<p><span class="img-wrap"><img data-src="/img/bVM4Oa?w=1905&amp;h=924" src="https://static.alili.tech/img/bVM4Oa?w=1905&amp;h=924" alt="登陆" title="登陆" style="cursor: pointer; display: inline;"></span></p>
<h4>添加item到列表中</h4>
<p><span class="img-wrap"><img data-src="/img/bVM4Om?w=1905&amp;h=924" src="https://static.alili.tech/img/bVM4Om?w=1905&amp;h=924" alt="列表" title="列表" style="cursor: pointer; display: inline;"></span></p>
<h4>如果路由中没有的页面，处理404</h4>
<p><span class="img-wrap"><img data-src="/img/bVM4Ox?w=1905&amp;h=924" src="https://static.alili.tech/img/bVM4Ox?w=1905&amp;h=924" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader1">如何使用</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git clone git@github.com:L-x-C/isomorphic-react-with-mobx.git
cd isomorphic-react-with-mobx
npm install" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livescript"><code>git clone git@github.com:L-x-C/isomorphic-react-<span class="hljs-keyword">with</span>-mobx.git
cd isomorphic-react-<span class="hljs-keyword">with</span>-mobx
<span class="hljs-built_in">npm</span> install</code></pre>
<h2 id="articleHeader2">Dev (客户端渲染)</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm start
open http://localhost:3000" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code>npm <span class="hljs-built_in">start</span>
<span class="hljs-built_in">open</span> <span class="hljs-keyword">http</span>://localhost:<span class="hljs-number">3000</span></code></pre>
<h2 id="articleHeader3">Production (服务端渲染)</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm run server
open http://localhost:20000" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code>npm <span class="hljs-built_in">run</span> server
<span class="hljs-built_in">open</span> http:<span class="hljs-comment">//localhost:20000</span></code></pre>
<h2 id="articleHeader4">一些经常会遇到的情况</h2>
<h2 id="articleHeader5">如何在服务端获取数据?</h2>
<p>在每个component中增加一个onEnter,用一个promise来处理，在这个promise中发起一个action，改变mobx中的states值</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@action
static onEnter({states, pathname, query, params}) {
    return Promise.all([
      menuActions.setTDK(states, '列表'),
      jobActions.fetchJobList(states, query)
    ]);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs aspectj"><code><span class="hljs-meta">@action</span>
<span class="hljs-function"><span class="hljs-keyword">static</span> <span class="hljs-title">onEnter</span><span class="hljs-params">({states, pathname, query, params})</span> </span>{
    <span class="hljs-keyword">return</span> Promise.all([
      menuActions.setTDK(states, <span class="hljs-string">'列表'</span>),
      jobActions.fetchJobList(states, query)
    ]);
}</code></pre>
<p>之所以能这么做，是因为在serverRender中有一个onEnter的预处理，会根据component的嵌套从最外层一直遍历到最里层的onEnter，并执行其中的的方法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import async from 'async';

export default (renderProps, states) => {
  const params = renderProps.params;
  const query = renderProps.location.query;
  const pathname = renderProps.location.pathname;

  let onEnterArr = renderProps.components.filter(c => c.onEnter);
  return new Promise((resolve, reject) => {
    async.eachOfSeries(onEnterArr, function(c, key, callback) {
      let enterFn = c.onEnter({states, query, params, pathname});
      if (enterFn) {
        enterFn.then(res => {
          if (res) {
            //处理Promise回调执行，比如登陆
            res.forEach((fn) => {
              if (Object.prototype.toString.call(fn) === '[object Function]') {
                fn();
              }
            });
          }

          if (key === (onEnterArr.length - 1)) {
            resolve();
          }

          callback();
        }).catch(err => {
          reject(err);
        });
      } else {
        callback();
      }
    });
  });
};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> <span class="hljs-keyword">async</span> <span class="hljs-keyword">from</span> <span class="hljs-string">'async'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> (renderProps, states) =&gt; {
  <span class="hljs-keyword">const</span> params = renderProps.params;
  <span class="hljs-keyword">const</span> query = renderProps.location.query;
  <span class="hljs-keyword">const</span> pathname = renderProps.location.pathname;

  <span class="hljs-keyword">let</span> onEnterArr = renderProps.components.filter(<span class="hljs-function"><span class="hljs-params">c</span> =&gt;</span> c.onEnter);
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    <span class="hljs-keyword">async</span>.eachOfSeries(onEnterArr, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">c, key, callback</span>) </span>{
      <span class="hljs-keyword">let</span> enterFn = c.onEnter({states, query, params, pathname});
      <span class="hljs-keyword">if</span> (enterFn) {
        enterFn.then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> {
          <span class="hljs-keyword">if</span> (res) {
            <span class="hljs-comment">//处理Promise回调执行，比如登陆</span>
            res.forEach(<span class="hljs-function">(<span class="hljs-params">fn</span>) =&gt;</span> {
              <span class="hljs-keyword">if</span> (<span class="hljs-built_in">Object</span>.prototype.toString.call(fn) === <span class="hljs-string">'[object Function]'</span>) {
                fn();
              }
            });
          }

          <span class="hljs-keyword">if</span> (key === (onEnterArr.length - <span class="hljs-number">1</span>)) {
            resolve();
          }

          callback();
        }).catch(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
          reject(err);
        });
      } <span class="hljs-keyword">else</span> {
        callback();
      }
    });
  });
};
</code></pre>
<h2 id="articleHeader6">如何在服务端设置tdk(title, description, keywords)?</h2>
<p>这其实在上一个问题中就已经出现了，onEnter中有一个setTDK(states, t, d, k)的方法，使用他就可以设置tdk的值</p>
<h2 id="articleHeader7">如何在服务端进行跳转?</h2>
<p>在浏览器环境中，我们可以设置window.location.href = url来进行跳转。<br>但是在服务器环境中，并没有window和document这2个对象，所以我们在服务器环境中抛出一个异常，然后捕获到之后进行302跳转。<br>具体可以看<code>src/helpers/location.js</code>, 中的<code>redirect</code> function<br>他会自动判断当前环境，来选择使用哪一种跳转</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {redirect} from './helpers/location';

@action
static onEnter({states, query, params}) {
    redirect('http://www.xxx.com');
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs aspectj"><code><span class="hljs-keyword">import</span> {redirect} from <span class="hljs-string">'./helpers/location'</span>;

<span class="hljs-meta">@action</span>
<span class="hljs-function"><span class="hljs-keyword">static</span> <span class="hljs-title">onEnter</span><span class="hljs-params">({states, query, params})</span> </span>{
    redirect(<span class="hljs-string">'http://www.xxx.com'</span>);
}</code></pre>
<p>mobx的原理及使用就不在这里做详细的介绍了，网上搜一搜有很多。<br>我相信我们所采用的一些方法也许并不是最完美的解法，如果有更好的欢迎来github中提issue探讨交流，互相学习~<a href="https://github.com/L-x-C/isomorphic-react-with-mobx" rel="nofollow noreferrer" target="_blank">项目地址在此</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
服务端渲染react+mobx+webpack+express实战（同时也支持客户端渲染）

## 原文链接
[https://segmentfault.com/a/1190000009274691](https://segmentfault.com/a/1190000009274691)

