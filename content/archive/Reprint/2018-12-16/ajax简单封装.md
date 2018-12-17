---
title: 'ajax简单封装' 
date: 2018-12-16 2:30:10
hidden: true
slug: vc1nakl52hj
categories: [reprint]
---

{{< raw >}}

                    
<p>工作之余简单封装了ajax的请求，但是工作中还是用jquery，axios，angular内部封装好了http模块（笑）。</p>
<p>ajax一般分为简单的四部：</p>
<ol>
<li>创建ajax对象（这里兼容ie的话要做一下处理）</li>
<li>连接，即请求对象的open方法（get和post还有点不同，get参数要放在url后面，post要设置请求头）</li>
<li>发送，即请求对象的send函数（post参数则放在send里面）</li>
<li>接收，在onreadystatechange（存储函数或函数名，每当readyState属性改变时，就会调用该函数。）函数里面处理。</li>
</ol>
<p>还可以加上超时这些</p>
<h2 id="articleHeader0">onreadystatechange分析</h2>
<ol>
<li>要先判断readyState的状态（有四个状态）<p>①： 0，请求未初始化；</p>
<p>②： 1，服务器连接已建立；</p>
<p>③： 2，请求已接收；</p>
<p>④： 3，请求处理中；</p>
<p>⑤： 4，请求已完成，且响应已就绪</p>
</li>
<li>当readyState等于4时，你又要判断status的状态</li>
<li>请求成功时status状态 200-300（不包括300） ，还有304（是缓存）（具体状态可以去参考文档）</li>
<li>在成功（失败）的回掉函数里面将xhr.responseText的值返回出去。</li>
</ol>
<h3 id="articleHeader1">代码</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'use strict';

var $ = {};
$.ajax = ajax;

function ajax(options) {

  // 解析参数
  options = options || {};
  if (!options.url) return;
  options.type = options.type || 'get';
  options.timeout = options.timeout || 0;

  // 1 创建ajax
  if (window.XMLHttpRequest) {

    // 高级浏览器和ie7以上
    var xhr = new XMLHttpRequest();
  } else {

    //ie6,7,8
    var xhr = new ActiveXObject(&quot;Microsoft.XMLHTTP&quot;); 
  }

  // 2 连接
  var str = jsonToUrl(options.data);
  if (options.type === 'get') {
    xhr.open('get', `${options.url}?${str}`, true);

    // 3 发送
    xhr.send();
  } else {
    xhr.open('post', options.url, true);

    // 请求头
    xhr.setRequestHeader(&quot;Content-Type&quot;,&quot;application/x-www-form-urlencoded&quot;);

    // 3 发送
    xhr.send();
  }

  // 接收
  xhr.onreadystatechange = function() {

    // 完成
    if (xhr.readyState === 4) {

      // 清除定时器
      clearTimeout(timer);

      if (xhr.status >= 200 &amp;&amp; xhr.status < 300 || xhr.status == 304) {

        // 成功
        options.success &amp;&amp; options.success(xhr.responseText);
      } else {
        options.error &amp;&amp; options.error( xhr.status );
      }
    }
  };

  
  // 超时
  if (options.timeout) {
    var timer = setTimeout(function(){ 
            alert(&quot;超时了&quot;);
            xhr.abort(); // 终止
        },options.timeout);
  }
}


// json转url
function jsonToUrl(json) {
  var arr = [];
  json.t = Math.random();
  for(var name in json) {
    arr.push(name + '=' + encodeURIComponent(json[name]));
  }
  return arr.join('&amp;');
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-meta">'use strict'</span>;

<span class="hljs-keyword">var</span> $ = {};
$.ajax = ajax;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">ajax</span>(<span class="hljs-params">options</span>) </span>{

  <span class="hljs-comment">// 解析参数</span>
  options = options || {};
  <span class="hljs-keyword">if</span> (!options.url) <span class="hljs-keyword">return</span>;
  options.type = options.type || <span class="hljs-string">'get'</span>;
  options.timeout = options.timeout || <span class="hljs-number">0</span>;

  <span class="hljs-comment">// 1 创建ajax</span>
  <span class="hljs-keyword">if</span> (<span class="hljs-built_in">window</span>.XMLHttpRequest) {

    <span class="hljs-comment">// 高级浏览器和ie7以上</span>
    <span class="hljs-keyword">var</span> xhr = <span class="hljs-keyword">new</span> XMLHttpRequest();
  } <span class="hljs-keyword">else</span> {

    <span class="hljs-comment">//ie6,7,8</span>
    <span class="hljs-keyword">var</span> xhr = <span class="hljs-keyword">new</span> ActiveXObject(<span class="hljs-string">"Microsoft.XMLHTTP"</span>); 
  }

  <span class="hljs-comment">// 2 连接</span>
  <span class="hljs-keyword">var</span> str = jsonToUrl(options.data);
  <span class="hljs-keyword">if</span> (options.type === <span class="hljs-string">'get'</span>) {
    xhr.open(<span class="hljs-string">'get'</span>, <span class="hljs-string">`<span class="hljs-subst">${options.url}</span>?<span class="hljs-subst">${str}</span>`</span>, <span class="hljs-literal">true</span>);

    <span class="hljs-comment">// 3 发送</span>
    xhr.send();
  } <span class="hljs-keyword">else</span> {
    xhr.open(<span class="hljs-string">'post'</span>, options.url, <span class="hljs-literal">true</span>);

    <span class="hljs-comment">// 请求头</span>
    xhr.setRequestHeader(<span class="hljs-string">"Content-Type"</span>,<span class="hljs-string">"application/x-www-form-urlencoded"</span>);

    <span class="hljs-comment">// 3 发送</span>
    xhr.send();
  }

  <span class="hljs-comment">// 接收</span>
  xhr.onreadystatechange = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{

    <span class="hljs-comment">// 完成</span>
    <span class="hljs-keyword">if</span> (xhr.readyState === <span class="hljs-number">4</span>) {

      <span class="hljs-comment">// 清除定时器</span>
      clearTimeout(timer);

      <span class="hljs-keyword">if</span> (xhr.status &gt;= <span class="hljs-number">200</span> &amp;&amp; xhr.status &lt; <span class="hljs-number">300</span> || xhr.status == <span class="hljs-number">304</span>) {

        <span class="hljs-comment">// 成功</span>
        options.success &amp;&amp; options.success(xhr.responseText);
      } <span class="hljs-keyword">else</span> {
        options.error &amp;&amp; options.error( xhr.status );
      }
    }
  };

  
  <span class="hljs-comment">// 超时</span>
  <span class="hljs-keyword">if</span> (options.timeout) {
    <span class="hljs-keyword">var</span> timer = setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{ 
            alert(<span class="hljs-string">"超时了"</span>);
            xhr.abort(); <span class="hljs-comment">// 终止</span>
        },options.timeout);
  }
}


<span class="hljs-comment">// json转url</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">jsonToUrl</span>(<span class="hljs-params">json</span>) </span>{
  <span class="hljs-keyword">var</span> arr = [];
  json.t = <span class="hljs-built_in">Math</span>.random();
  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> name <span class="hljs-keyword">in</span> json) {
    arr.push(name + <span class="hljs-string">'='</span> + <span class="hljs-built_in">encodeURIComponent</span>(json[name]));
  }
  <span class="hljs-keyword">return</span> arr.join(<span class="hljs-string">'&amp;'</span>);
}</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
ajax简单封装

## 原文链接
[https://segmentfault.com/a/1190000013033689](https://segmentfault.com/a/1190000013033689)

