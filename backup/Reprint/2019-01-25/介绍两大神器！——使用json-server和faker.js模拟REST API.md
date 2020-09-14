---
title: '介绍两大神器！——使用json-server和faker.js模拟REST API' 
date: 2019-01-25 2:30:23
hidden: true
slug: rgw7lstr2s
categories: [reprint]
---

{{< raw >}}

                    
<p>今天发现了一个神器——json-server!在他的帮助下可以在很短的时间内搭建一个Rest API, 然后就可以让前端在不依赖后端的情况下进行开发啦！</p>
<p>关于什么是RESTful API:<br>《RESTful API 设计指南》—— 阮一峰<br><a href="http://www.ruanyifeng.com/blog/2014/05/restful_api.html" rel="nofollow noreferrer" target="_blank">http://www.ruanyifeng.com/blo...</a></p>
<h1 id="articleHeader0">JSON-Server</h1>
<p>简单来说，JSON-Server是一个Node模块，运行Express服务器，你可以指定一个json文件作为api的数据源。</p>
<p>举个例子：<br>我们现在想做一个app，用来管理客户信息，实现简单的CRUD功能（create/retrieve/update/delete)，比如：</p>
<ul>
<li><p>获取客户信息</p></li>
<li><p>增加一个客户</p></li>
<li><p>删除一个客户</p></li>
<li><p>更新客户信息</p></li>
</ul>
<p>好啦，接下来我们就使用json-server完成这一系列动作吧！</p>
<h4>安装JSON-Server</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install -g json-server   //osx系统加'sudo'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> -g <span class="hljs-keyword">json</span>-<span class="hljs-keyword">server</span>   //osx系统加<span class="hljs-string">'sudo'</span></code></pre>
<p>新建一个文件夹同时cd它：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mkdir customer-manager &amp;&amp; cd customer-manager" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dos"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">mkdir</span> customer-manager &amp;&amp; <span class="hljs-built_in">cd</span> customer-manager</code></pre>
<p>新建一个json文件，然后存放一点数据进去：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="touch customers.json" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">touch</span> <span class="hljs-selector-tag">customers</span><span class="hljs-selector-class">.json</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;customers&quot;: [
    { &quot;id&quot;: 1, &quot;first_name&quot;: &quot;John&quot;, &quot;last_name&quot;: &quot;Smith&quot;,  &quot;phone&quot;: &quot;219-839-2819&quot; }
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
  <span class="hljs-attr">"customers"</span>: [
    { <span class="hljs-attr">"id"</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">"first_name"</span>: <span class="hljs-string">"John"</span>, <span class="hljs-attr">"last_name"</span>: <span class="hljs-string">"Smith"</span>,  <span class="hljs-attr">"phone"</span>: <span class="hljs-string">"219-839-2819"</span> }
  ]
}</code></pre>
<h4>开启json-server功能</h4>
<p>所有你要做的事情只是让json-server指向这个customers.json就ok啦！</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="json-server customers.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs axapta"><code style="word-break: break-word; white-space: initial;">json-<span class="hljs-keyword">server</span> customers.js</code></pre>
<p>然后出现这个提示就ok啦！<br><span class="img-wrap"><img data-src="/img/bVJ8Df?w=527&amp;h=325" src="https://static.alili.tech/img/bVJ8Df?w=527&amp;h=325" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>另外，JSON-Server很酷的一点就是支持各种GET/POST/PUT/DELETE的请求。<br>看几个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//GET
fetch('http://localhost:3000/tasks/')
  .then(function(response) {
    return response.json()
  }).then(function(json) {
    console.log('parsed json: ', json)
  }).catch(function(ex) {
    console.log('parsing failed: ', ex)
  });


//POST
fetch('http://localhost:3000/tasks/', {
  method: 'post',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
       &quot;title&quot;:   &quot;Add a blogpost about Angular2&quot;,
       &quot;dueDate&quot;: &quot;2015-05-23T18:25:43.511Z&quot;,
       &quot;done&quot;: false
   })
}).then(function(response) {
      return response.json()
    }).then(function(json) {
      console.log('parsed json: ', json)
    }).catch(function(ex) {
      console.log('parsing failed: ', ex)
    });
    
    
//PUT
fetch('http://localhost:3000/tasks/1', { //在url后面指定下id就好
  method: 'put',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
       &quot;done&quot;: true
   })
}).then(function(response) {
      return response.json()
    }).then(function(json) {
      console.log('parsed json: ', json)
    }).catch(function(ex) {
      console.log('parsing failed: ', ex)
    });
    
    
//DELETE
fetch('http://localhost:3000/tasks/1', {
method: 'delete'
}).then(function(response) {
   return response.json()
 }).then(function(json) {
   console.log('parsed json: ', json)
 }).catch(function(ex) {
   console.log('parsing failed: ', ex)
 });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scilab"><code><span class="hljs-comment">//GET</span>
fetch(<span class="hljs-string">'http://localhost:3000/tasks/'</span>)
  .<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(response)</span> {</span>
    <span class="hljs-keyword">return</span> response.json()
  }).<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(json)</span> {</span>
    console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'parsed json: '</span>, json)
  }).<span class="hljs-keyword">catch</span>(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(ex)</span> {</span>
    console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'parsing failed: '</span>, ex)
  });


<span class="hljs-comment">//POST</span>
fetch(<span class="hljs-string">'http://localhost:3000/tasks/'</span>, {
  method: <span class="hljs-string">'post'</span>,
  headers: {
    <span class="hljs-string">'Accept'</span>: <span class="hljs-string">'application/json'</span>,
    <span class="hljs-string">'Content-Type'</span>: <span class="hljs-string">'application/json'</span>
  },
  body: JSON.stringify({
       <span class="hljs-string">"title"</span>:   <span class="hljs-string">"Add a blogpost about Angular2"</span>,
       <span class="hljs-string">"dueDate"</span>: <span class="hljs-string">"2015-05-23T18:25:43.511Z"</span>,
       <span class="hljs-string">"done"</span>: false
   })
}).<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(response)</span> {</span>
      <span class="hljs-keyword">return</span> response.json()
    }).<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(json)</span> {</span>
      console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'parsed json: '</span>, json)
    }).<span class="hljs-keyword">catch</span>(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(ex)</span> {</span>
      console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'parsing failed: '</span>, ex)
    });
    
    
<span class="hljs-comment">//PUT</span>
fetch(<span class="hljs-string">'http://localhost:3000/tasks/1'</span>, { <span class="hljs-comment">//在url后面指定下id就好</span>
  method: <span class="hljs-string">'put'</span>,
  headers: {
    <span class="hljs-string">'Accept'</span>: <span class="hljs-string">'application/json'</span>,
    <span class="hljs-string">'Content-Type'</span>: <span class="hljs-string">'application/json'</span>
  },
  body: JSON.stringify({
       <span class="hljs-string">"done"</span>: true
   })
}).<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(response)</span> {</span>
      <span class="hljs-keyword">return</span> response.json()
    }).<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(json)</span> {</span>
      console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'parsed json: '</span>, json)
    }).<span class="hljs-keyword">catch</span>(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(ex)</span> {</span>
      console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'parsing failed: '</span>, ex)
    });
    
    
<span class="hljs-comment">//DELETE</span>
fetch(<span class="hljs-string">'http://localhost:3000/tasks/1'</span>, {
method: <span class="hljs-string">'delete'</span>
}).<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(response)</span> {</span>
   <span class="hljs-keyword">return</span> response.json()
 }).<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(json)</span> {</span>
   console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'parsed json: '</span>, json)
 }).<span class="hljs-keyword">catch</span>(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(ex)</span> {</span>
   console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'parsing failed: '</span>, ex)
 });</code></pre>
<p>JSON-Server基本就是这样啦！接下来介绍另一个神器~</p>
<h1 id="articleHeader1">Faker.js</h1>
<p>如果要自己瞎编API数据的话也是比较烦恼，用faker.js就可以轻松解决这个问题啦!他可以帮助你自动生成大量fake的json数据，作为后端数据~</p>
<h4>安装faker.js</h4>
<p>还是使用npm来安装faker.js:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install faker" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> faker</code></pre>
<p>现在我们用javascript生成一个包含50个客户数据的json文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//customers.js
var faker = require('faker')

function generateCustomers () {
  var customers = []

  for (var id = 0; id < 50; id++) {
    var firstName = faker.name.firstName()
    var lastName = faker.name.firstName()
    var phoneNumber = faker.phone.phoneNumberFormat()

    customers.push({
      &quot;id&quot;: id,
      &quot;first_name&quot;: firstName,
      &quot;last_name&quot;: lastName,
      &quot;phone&quot;: phoneNumber
    })
  }

  return { &quot;customers&quot;: customers }
}

// 如果你要用json-server的话，就需要export这个生成fake data的function
module.exports = generateCustomers" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//customers.js</span>
<span class="hljs-keyword">var</span> faker = <span class="hljs-built_in">require</span>(<span class="hljs-string">'faker'</span>)

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">generateCustomers</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> customers = []

  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> id = <span class="hljs-number">0</span>; id &lt; <span class="hljs-number">50</span>; id++) {
    <span class="hljs-keyword">var</span> firstName = faker.name.firstName()
    <span class="hljs-keyword">var</span> lastName = faker.name.firstName()
    <span class="hljs-keyword">var</span> phoneNumber = faker.phone.phoneNumberFormat()

    customers.push({
      <span class="hljs-string">"id"</span>: id,
      <span class="hljs-string">"first_name"</span>: firstName,
      <span class="hljs-string">"last_name"</span>: lastName,
      <span class="hljs-string">"phone"</span>: phoneNumber
    })
  }

  <span class="hljs-keyword">return</span> { <span class="hljs-string">"customers"</span>: customers }
}

<span class="hljs-comment">// 如果你要用json-server的话，就需要export这个生成fake data的function</span>
<span class="hljs-built_in">module</span>.exports = generateCustomers</code></pre>
<p>然后让json-server指向这个js文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="json-server customers.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs axapta"><code style="word-break: break-word; white-space: initial;">json-<span class="hljs-keyword">server</span> customers.js</code></pre>
<p>这样你就可以在<a href="http://localhost:3000/customers" rel="nofollow noreferrer" target="_blank">http://localhost:3000/customers</a>里看到50个客户数据了。<br>更多faker.js属性可以查看这里：<br><a href="https://github.com/marak/Faker.js/" rel="nofollow noreferrer" target="_blank">https://github.com/marak/Fake...</a></p>
<p>好啦，基本就是这样啦，happy coding!</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
介绍两大神器！——使用json-server和faker.js模拟REST API

## 原文链接
[https://segmentfault.com/a/1190000008574028](https://segmentfault.com/a/1190000008574028)

