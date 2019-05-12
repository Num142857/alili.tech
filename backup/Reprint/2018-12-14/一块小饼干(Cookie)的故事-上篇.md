---
title: '一块小饼干(Cookie)的故事-上篇' 
date: 2018-12-14 2:30:11
hidden: true
slug: eweftqpdx8m
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>cookie 如果非要用汉语理解的话应该是 一段小型文本文件，由网景的创始人之一的<a href="https://zh.wikipedia.org/wiki/%E7%9B%A7%C2%B7%E8%92%99%E7%89%B9%E5%88%A9" rel="nofollow noreferrer" target="_blank">卢 蒙特利</a>在93年发明。<p>上篇是熟悉一下注册的大致流程，下篇熟悉登录流程以及真正的Cookie</p>
</blockquote>
<h2 id="articleHeader0">实现基本的注册功能</h2>
<p>我们打开网站，浏览网站，最常见的两个操作就是注册以及登录，所以有必要探索一下这两个功能如何实现的。</p>
<p>本地模拟，当输入<code>localhost:8080/sign_up</code>的时候，浏览器发起<code>get</code>请求，服务器给你响应<code>sign_up.html</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//服务器端代码
if (path === '/sign_up' &amp;&amp; method === 'GET') {
    let string = fs.readFileSync('./sign_up.html', 'utf8')
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(string)
    response.end()
 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//服务器端代码</span>
<span class="hljs-keyword">if</span> (path === <span class="hljs-string">'/sign_up'</span> &amp;&amp; method === <span class="hljs-string">'GET'</span>) {
    <span class="hljs-keyword">let</span> string = fs.readFileSync(<span class="hljs-string">'./sign_up.html'</span>, <span class="hljs-string">'utf8'</span>)
    response.statusCode = <span class="hljs-number">200</span>
    response.setHeader(<span class="hljs-string">'Content-Type'</span>, <span class="hljs-string">'text/html;charset=utf-8'</span>)
    response.write(string)
    response.end()
 }</code></pre>
<h3 id="articleHeader1">CSS布局的几个小坑</h3>
<p>在写<code>sign_up.html</code>的时候，注意几点css知识：</p>
<ol><li>如果想让你的登录页面的body占满整个屏幕，随着窗口的大小变化而变化的话，可以写</li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body, html{height: 100%}
//或者
body{min-height: 100%}
html{height: 100%}
//不能这么写
body, html{min-height: 100%}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">body</span>, <span class="hljs-selector-tag">html</span>{<span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>}
//或者
<span class="hljs-selector-tag">body</span>{<span class="hljs-attribute">min-height</span>: <span class="hljs-number">100%</span>}
<span class="hljs-selector-tag">html</span>{<span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>}
//不能这么写
<span class="hljs-selector-tag">body</span>, <span class="hljs-selector-tag">html</span>{<span class="hljs-attribute">min-height</span>: <span class="hljs-number">100%</span>}</code></pre>
<p>当然了，实际上这么写就可以了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body{min-height: 100vh}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css" style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">body</span>{<span class="hljs-attribute">min-height</span>: <span class="hljs-number">100vh</span>}</code></pre>
<ol><li>
<code>label</code>标签是<code>display: inline</code>，不能设置宽度，<strong>行内元素则会根据行内内容自适应宽度</strong>，所以行内元素设置width是没有效果的。改成<code>inline-block就可以了</code>
</li></ol>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013231822?w=709&amp;h=581" src="https://static.alili.tech/img/remote/1460000013231822?w=709&amp;h=581" alt="很丑的界面的" title="很丑的界面的" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader2">获得用户的数据</h3>
<p>既然是注册的需求，那么我们首要关注的点就是--用户的注册信息我们如何获得呢</p>
<p>选择合理的数据结构存储数据是很重要的。</p>
<ol>
<li>每个<code>input</code>的<code>name</code>可以使用数组存储</li>
<li>
<code>input</code>的<code>value</code>应该使用<code>hash</code>,也就是对象来存储。</li>
<li>上述的套路会一直用下去，<strong><code>hash+[]</code></strong>的组合。</li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//使用jq来写
let hash = {}
let $form = $('#signUpForm')
$form.on('submit', (e) => {
  e.preventDefault() //不用form表单的默认提交，而是使用我们的的ajax提交
  let need = ['email', 'password', 'password_confirmation']
  need.forEach((name) => {
  let value = $form.find(`[name=${name}]`).val()
  hash[name] = value
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//使用jq来写</span>
<span class="hljs-keyword">let</span> hash = {}
<span class="hljs-keyword">let</span> $form = $(<span class="hljs-string">'#signUpForm'</span>)
$form.on(<span class="hljs-string">'submit'</span>, (e) =&gt; {
  e.preventDefault() <span class="hljs-comment">//不用form表单的默认提交，而是使用我们的的ajax提交</span>
  <span class="hljs-keyword">let</span> need = [<span class="hljs-string">'email'</span>, <span class="hljs-string">'password'</span>, <span class="hljs-string">'password_confirmation'</span>]
  need.forEach(<span class="hljs-function">(<span class="hljs-params">name</span>) =&gt;</span> {
  <span class="hljs-keyword">let</span> value = $form.find(<span class="hljs-string">`[name=<span class="hljs-subst">${name}</span>]`</span>).val()
  hash[name] = value
})</code></pre>
<p>最终<code>hash</code>里面存储的就是</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  'email': '...',
  'password': '...',
  'password_confirmation': '...'
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
  <span class="hljs-string">'email'</span>: <span class="hljs-string">'...'</span>,
  <span class="hljs-string">'password'</span>: <span class="hljs-string">'...'</span>,
  <span class="hljs-string">'password_confirmation'</span>: <span class="hljs-string">'...'</span>
}</code></pre>
<p>到目前为止我们把用户的数据封装到了一个对象里面了。</p>
<p>不过在把hash用ajax发出去之前要先进行一些必要的非空验证</p>
<h3 id="articleHeader3">非空验证</h3>
<p>主要是检测邮箱是否为空、密码是否为空、两次输入的密码是否一致。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//发起请求之前验证是否为空
if (hash['email'] === '') {
  $form.find('[name=&quot;email&quot;]').siblings('.errors').text('请您输入邮箱')
  return false //精髓啊，不然没用了
}
if (hash['password'] === '') {
  $form.find('[name=&quot;password&quot;]').siblings('.errors').text('请您输入密码')
  return false //精髓啊，不然没用了
}
if (hash['password_confirmation'] === '') {
    $form.find('[name=&quot;password_confirmation&quot;]').siblings('.errors').text('请您再次输入确认密码')
    return false //精髓啊，不然没用了
}
if (hash['password'] !== hash['password_confirmation']) {
  $form.find('[name=&quot;password_confirmation&quot;]').siblings('.errors').text('两次输入密码不匹配')
  return false //精髓啊，不然没用了
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//发起请求之前验证是否为空</span>
<span class="hljs-keyword">if</span> (hash[<span class="hljs-string">'email'</span>] === <span class="hljs-string">''</span>) {
  $form.find(<span class="hljs-string">'[name="email"]'</span>).siblings(<span class="hljs-string">'.errors'</span>).text(<span class="hljs-string">'请您输入邮箱'</span>)
  <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span> <span class="hljs-comment">//精髓啊，不然没用了</span>
}
<span class="hljs-keyword">if</span> (hash[<span class="hljs-string">'password'</span>] === <span class="hljs-string">''</span>) {
  $form.find(<span class="hljs-string">'[name="password"]'</span>).siblings(<span class="hljs-string">'.errors'</span>).text(<span class="hljs-string">'请您输入密码'</span>)
  <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span> <span class="hljs-comment">//精髓啊，不然没用了</span>
}
<span class="hljs-keyword">if</span> (hash[<span class="hljs-string">'password_confirmation'</span>] === <span class="hljs-string">''</span>) {
    $form.find(<span class="hljs-string">'[name="password_confirmation"]'</span>).siblings(<span class="hljs-string">'.errors'</span>).text(<span class="hljs-string">'请您再次输入确认密码'</span>)
    <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span> <span class="hljs-comment">//精髓啊，不然没用了</span>
}
<span class="hljs-keyword">if</span> (hash[<span class="hljs-string">'password'</span>] !== hash[<span class="hljs-string">'password_confirmation'</span>]) {
  $form.find(<span class="hljs-string">'[name="password_confirmation"]'</span>).siblings(<span class="hljs-string">'.errors'</span>).text(<span class="hljs-string">'两次输入密码不匹配'</span>)
  <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span> <span class="hljs-comment">//精髓啊，不然没用了</span>
}</code></pre>
<ul>
<li>如果忘记写return的话，即使你为空了还是会直接越过这一步检测，去发起ajax请求的，所以一定不要忘了写上return false.</li>
<li>如果仅仅这么写的话会有一个bug。当出现错误提示后，你把信息填对了，错误信息依然显示，这显然是不合理的。应该填入信息后，错误信息就消失的。</li>
</ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013231823?w=562&amp;h=270" src="https://static.alili.tech/img/remote/1460000013231823?w=562&amp;h=270" alt="bug" title="bug" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" $form.find('.errors').each((index, span) => {
     $(span).text('')
 }) " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"> $form.find(<span class="hljs-string">'.errors'</span>).each(<span class="hljs-function">(<span class="hljs-params">index, span</span>) =&gt;</span> {
     $(span).text(<span class="hljs-string">''</span>)
 }) </code></pre>
<p>使用上述的jq代码来解决这个bug即可。</p>
<p>非空验证完了之后，意味着浏览器收集用户数据的工作完成了，可以把hash发到服务器端了，接下来就是ajax请求了。</p>
<h3 id="articleHeader4">使用ajax提交数据</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$.post('/sign_up', hash)
.then((response) => {
  //成功了就打印这个  
  console.log(response)
},
() => {
  //错误了打印这个
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">$.post(<span class="hljs-string">'/sign_up'</span>, hash)
.then(<span class="hljs-function">(<span class="hljs-params">response</span>) =&gt;</span> {
  <span class="hljs-comment">//成功了就打印这个  </span>
  <span class="hljs-built_in">console</span>.log(response)
},
() =&gt; {
  <span class="hljs-comment">//错误了打印这个</span>
})</code></pre>
<h3 id="articleHeader5">服务器端解析formData</h3>
<p>因为formData是一段一段上传的(具体原因略复杂，可以取极限法，如果formdata很多，不可能一下子上传过来)，自己不会写，就去搜索代码片段解析formdata</p>
<p><code>google: node get post data</code></p>
<p>把获得的代码封装成了一个函数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function readBody(request) {
  return new Promise((resolve, reject) => {
      let body = []
      request.on('data', (chunk) => {
        body.push(chunk)
      }).on('end', () => {
        body = Buffer.concat(body).toString();
          resolve(body)
      })
    }
  )

}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">readBody</span>(<span class="hljs-params">request</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
      <span class="hljs-keyword">let</span> body = []
      request.on(<span class="hljs-string">'data'</span>, (chunk) =&gt; {
        body.push(chunk)
      }).on(<span class="hljs-string">'end'</span>, () =&gt; {
        body = Buffer.concat(body).toString();
          resolve(body)
      })
    }
  )

}</code></pre>
<p>如何使用上述代码片段呢</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="...
if (path === '/sign_up' &amp;&amp; method === 'POST') {
    readBody(request).then((body) => {
      let strings = body.split('&amp;') //['email=1', 'password=2', 'password_confirmmation=3']
      let hash = {}
      strings.forEach(string => {
        //想得到类似这种的 string == 'email=1'
        let parts = string.split('=') //再用=分割,得到['email', '1']
        let key = parts[0]
        let value = parts[1]
        hash[key] = decodeURIComponent(value)//hash['email'] = '1'
      })
      let {email, password, password_confirmation} = hash //ES6的解构赋值
  }
  ..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">...
if (path === <span class="hljs-string">'/sign_up'</span> &amp;&amp; method === <span class="hljs-string">'POST'</span>) {
    readBody(request).then(<span class="hljs-function">(<span class="hljs-params">body</span>) =&gt;</span> {
      <span class="hljs-keyword">let</span> strings = body.split(<span class="hljs-string">'&amp;'</span>) <span class="hljs-comment">//['email=1', 'password=2', 'password_confirmmation=3']</span>
      <span class="hljs-keyword">let</span> hash = {}
      strings.forEach(<span class="hljs-function"><span class="hljs-params">string</span> =&gt;</span> {
        <span class="hljs-comment">//想得到类似这种的 string == 'email=1'</span>
        <span class="hljs-keyword">let</span> parts = string.split(<span class="hljs-string">'='</span>) <span class="hljs-comment">//再用=分割,得到['email', '1']</span>
        <span class="hljs-keyword">let</span> key = parts[<span class="hljs-number">0</span>]
        <span class="hljs-keyword">let</span> value = parts[<span class="hljs-number">1</span>]
        hash[key] = <span class="hljs-built_in">decodeURIComponent</span>(value)<span class="hljs-comment">//hash['email'] = '1'</span>
      })
      <span class="hljs-keyword">let</span> {email, password, password_confirmation} = hash <span class="hljs-comment">//ES6的解构赋值</span>
  }
  ...</code></pre>
<p>当服务器端接收到了所有的formdata数据后，其实是一串形如<code>email=1&amp;password=2&amp;password_confirmation=3</code></p>
<p>的字符串，所以我们考虑使用<code>&amp;</code>字符分割成数组。</p>
<ul>
<li>得到一个形如<code>['email=1', 'password=2', 'confirmation=3']</code>的数组之后，我们为了得到<code>string = 'email=1'</code>这种形式的，开始遍历数组，把数组的每个元素按照<code>=</code>分割，得到 <code>[email, 1]</code>
</li>
<li>用第二小节提供的<code>hash+[]</code>方法，处理成hash</li>
</ul>
<h2 id="articleHeader6">服务器端简单的校验</h2>
<p>既然服务器端已经获得了<code>formdata</code>了，那么应该进行一下简单的校验，比如邮箱的格式，没有问题了就把数据存到数据库里面。(目前校验水平很入门，没有涉及到完备的注册校验功能)</p>
<h3 id="articleHeader7">校验前的准备工作</h3>
<p>上一节我们把formdata完美的封装到了hash里面，为了校验我们要把hash再拆开一个一个的看</p>
<p>或许这么做是最直接的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let email = hash['emai']
let password = hash['password']
let password_confirmation = hash['password_confirmation']" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> email = hash[<span class="hljs-string">'emai'</span>]
<span class="hljs-keyword">let</span> password = hash[<span class="hljs-string">'password'</span>]
<span class="hljs-keyword">let</span> password_confirmation = hash[<span class="hljs-string">'password_confirmation'</span>]</code></pre>
<p>不过ES6提供了一种解构赋值的语法糖，很甜很贴心……</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let {email, password, password_confirmation} = hash" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">let</span> {email, password, password_confirmation} = hash</code></pre>
<h3 id="articleHeader8">由@编码引发的bug</h3>
<p>好了，我们这一步就先看看邮箱格式是否正确。</p>
<p>我是菜鸟级校验邮箱，看到了邮箱的独特标志---<code>@</code>，最起码有这个标志才叫邮箱吧，也就是说没有这个标志，我就可以认为邮箱格式不对啊，翻译成代码就是</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (email.indexOf('@') === -1) {
  response.statusCode = 400
  response.write('email is bad') //单引号只是为了标记这是一个字符串
} " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">if</span> (email.indexOf(<span class="hljs-string">'@'</span>) === <span class="hljs-number">-1</span>) {
  response.statusCode = <span class="hljs-number">400</span>
  response.write(<span class="hljs-string">'email is bad'</span>) <span class="hljs-comment">//单引号只是为了标记这是一个字符串</span>
} </code></pre>
<p>很好，目前来说，事情的发展都很正常，直到一个bug的到来。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013231824?w=563&amp;h=288" src="https://static.alili.tech/img/remote/1460000013231824?w=563&amp;h=288" alt="正常的也报错了" title="正常的也报错了" style="cursor: pointer; display: inline;"></span></p>
<p>一个合法的邮箱，却进入了非法邮箱处理的代码片段里面……</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013231825" src="https://static.alili.tech/img/remote/1460000013231825" alt="很疑惑" title="很疑惑" style="cursor: pointer; display: inline;"></span></p>
<p>毫无疑问，邮箱是合法的，代码也是合理的，那么出问题的必然是我，某个地方的理解有问题。</p>
<ul><li>找bug,把可能出错的代码片段分成几个区间，打log.</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(email.indexOf('@'))
console.log(email)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">console</span>.log(email.indexOf(<span class="hljs-string">'@'</span>))
<span class="hljs-built_in">console</span>.log(email)</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013231826" src="https://static.alili.tech/img/remote/1460000013231826" alt="真的是-1" title="真的是-1" style="cursor: pointer;"></span></p>
<p>没错，<code>email</code>这个字符串的<code>@</code>索引真的是-1，可是我的邮箱写的明明有<code>@</code>啊。</p>
<p>为啥呢，接着又打印出了<code>email</code>的内容，终于真相大白了，<code>email</code>字符串里面真的没有<code>@</code>，</p>
<p>却发现了一串你没想到的<code>%40</code>，(⊙v⊙)嗯，没错了，这就是我认为的那个<code>@</code>的另一个形态。</p>
<ul>
<li>我在浏览器看到的只是浏览器想让我看到的东西而已，既然已经被浏览器处理了，那到了服务器端自然无法处理。</li>
<li>那这个<code>%40</code>哪来的呢</li>
</ul>
<p>Google走起，在<a href="https://www.w3schools.com/tags/ref_urlencode.asp" rel="nofollow noreferrer" target="_blank">w3schools的HTML URL Encoding Reference</a>找到了解释(不是国内的w3school……)</p>
<blockquote>URL encoding converts characters into a format that can be transmitted over the Internet.</blockquote>
<p>URL编码把字符转化成了一种可以在互联网上传播的格式，也就是说，我在网页上看到的字符是被URL编码处理的结果。</p>
<ul><li>那接下来就去搞定什么是URL编码</li></ul>
<p>搞定这个之前，文档先要让你明白啥是<code>URL</code></p>
<blockquote>Web browsers request pages from web servers by using a URL.<p>The URL is the address of a web page, like: <strong><a href="https://www.w3schools.com." rel="nofollow noreferrer" target="_blank">https://www.w3schools.com.</a></strong></p>
</blockquote>
<p>Web浏览器通过使用URL从Web服务器请求页面。 该网址是网页的地址，例如：https：//www.w3schools.com。</p>
<hr>
<p>复习一下URL的组成6部分：</p>
<p><a href="https://www.baidu.com/s?wd=hello&amp;rsv_spt=1#5" rel="nofollow noreferrer" target="_blank">https://www.baidu.com/s?wd=he...</a> 通过这个你就可以访问到一个 "唯一的" 网址</p>
<table>
<thead><tr>
<th>名字</th>
<th>作用</th>
</tr></thead>
<tbody>
<tr>
<td>https:</td>
<td>协议</td>
</tr>
<tr>
<td>www.baidu.com</td>
<td>域名</td>
</tr>
<tr>
<td>/s</td>
<td>路径</td>
</tr>
<tr>
<td>wd=hello&amp;rsv_spt=1</td>
<td>查询参数</td>
</tr>
<tr>
<td>#5</td>
<td>锚点</td>
</tr>
<tr>
<td>端口</td>
<td>默认80</td>
</tr>
</tbody>
</table>
<hr>
<p>复习完了<code>URL</code>，继续搞<code>URL编码</code></p>
<blockquote>URLs can only be sent over the Internet using the <a href="https://www.w3schools.com/charsets/ref_html_ascii.asp" rel="nofollow noreferrer" target="_blank">ASCII character-set</a>.<p>Since URLs often contain characters outside the ASCII set, the URL has to be converted into a valid ASCII format.</p>
<p>URL encoding replaces unsafe ASCII characters with a "%" followed by two hexadecimal digits.</p>
<p>URLs cannot contain spaces. URL encoding normally replaces a space with a plus (+) sign or with %20.</p>
</blockquote>
<ul>
<li>URL只能用ASCII编码在互联网之间发送。</li>
<li>既然URL通常包括ASCII字符编码集之外的字符(很明显嘛，ASCII码表太少)，所以URL必须转化成有效的ASCII格式。</li>
<li>
<strong>这是重点</strong>，URL编码使用<code>%</code>后面紧跟着两个16进制数字的编码格式来代替不安全的ASCII码表</li>
<li>URL不能包括空格。所以URL编码通常使用+号或者<code>20%</code>来代替空格。</li>
</ul>
<p>继续往下翻，找到了<code>%40</code>。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013231827" src="https://static.alili.tech/img/remote/1460000013231827" alt="@符号的解释" title="@符号的解释" style="cursor: pointer; display: inline;"></span></p>
<p>所以要把<code>value</code>的值解码回去</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="hash[key] = decodeURIComponent(value)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">hash[key] = <span class="hljs-built_in">decodeURIComponent</span>(value)</code></pre>
<p><code>decodeURIComponent()</code> 方法用于解码由 <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent" rel="nofollow noreferrer" target="_blank"><code>encodeURIComponent</code></a> 方法或者其它类似方法编码的部分统一资源标识符（URI）。毕竟<code>URL</code>属于<code>URI</code>。</p>
<h3 id="articleHeader9">错误信息的提示方法</h3>
<p>如果有了错，需要提示用户错了，后端写的代码，用户不一定看的懂，需要前端润色一下使用户看懂，或者前端和后端沟通一下，maybe后端脾气不好，前端也是暴脾气，所以应该选择一个前后端都要用的东西做桥梁，很明显<code>JSON</code>是完美的候选人。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (email.indexOf('@') === -1) {
  response.statusCode = 400
  response.setHeader('Content-Type', 'application/json;charset=utf-8') //直接告诉浏览器我是json
  response.write(`
    {
      &quot;errors&quot;: {
      &quot;email&quot;: &quot;invalid&quot;
      }
    }
  `)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">if</span> (email.indexOf(<span class="hljs-string">'@'</span>) === <span class="hljs-number">-1</span>) {
  response.statusCode = <span class="hljs-number">400</span>
  response.setHeader(<span class="hljs-string">'Content-Type'</span>, <span class="hljs-string">'application/json;charset=utf-8'</span>) <span class="hljs-comment">//直接告诉浏览器我是json</span>
  response.write(<span class="hljs-string">`
    {
      "errors": {
      "email": "invalid"
      }
    }
  `</span>)
}</code></pre>
<p>这就合理多了，后台只管写个json给前台看，其他不管了，前台翻译一下给用户看喽～</p>
<p>那么前台如何获得这个<code>json</code>呢</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$.post('/sign_up', hash)
.then((response) => {
  //成功了就打印这个  
  console.log(response)
},
(request, b, c) => {
   console.log(request)
   console.log(b)
   console.log(c)
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">$.post(<span class="hljs-string">'/sign_up'</span>, hash)
.then(<span class="hljs-function">(<span class="hljs-params">response</span>) =&gt;</span> {
  <span class="hljs-comment">//成功了就打印这个  </span>
  <span class="hljs-built_in">console</span>.log(response)
},
(request, b, c) =&gt; {
   <span class="hljs-built_in">console</span>.log(request)
   <span class="hljs-built_in">console</span>.log(b)
   <span class="hljs-built_in">console</span>.log(c)
})</code></pre>
<p>忘记了错误函数里面的参数是啥了，那就都打印出来看看。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013231828?w=1063&amp;h=380" src="https://static.alili.tech/img/remote/1460000013231828?w=1063&amp;h=380" alt="如果没用JSON的话" title="如果没用JSON的话" style="cursor: pointer;"></span></p>
<p>可以看到，如果没用JSON的话，request对象里面有一个后端写的responseText属性可以利用。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013231829?w=946&amp;h=533" src="https://static.alili.tech/img/remote/1460000013231829?w=946&amp;h=533" alt="" title="" style="cursor: pointer;"></span></p>
<p>设置了<code>Content-Type:application/json;charset=utf-8</code>之后，可以利用多出来的<code>responseJSON</code>属性，获得json的内容啊。</p>
<p>最终失败函数里面写</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(request) => {
  let {errors} = request.responseJSON    
  if (errors.email &amp;&amp; errors.email === 'invalid') {
    $form.find('[name=&quot;email&quot;]').siblings('.errors').text('您输入的邮箱错啦')
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">(request) =&gt; {
  <span class="hljs-keyword">let</span> {errors} = request.responseJSON    
  <span class="hljs-keyword">if</span> (errors.email &amp;&amp; errors.email === <span class="hljs-string">'invalid'</span>) {
    $form.find(<span class="hljs-string">'[name="email"]'</span>).siblings(<span class="hljs-string">'.errors'</span>).text(<span class="hljs-string">'您输入的邮箱错啦'</span>)
  }
}</code></pre>
<h3 id="articleHeader10">校验邮箱是否已经存在了</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var users = fs.readFileSync('./db/users', 'utf8')
try {
  users = JSON.parse(users) //[] JSON也支持数组
} catch (exception) {
  users = []
}
let inUse = false
for (let i = 0; i < users.length; i++) {
  let user = users[i]
  if (user.email === email) {
    inUse = true
    break
  }
}
if (inUse) {
  response.statusCode = 400
  response.setHeader('Content-Type', 'application/json;charset=utf-8')
  response.write(`
    {
      &quot;errors&quot;: {
      &quot;email&quot;: &quot;inUse&quot;
      }
    }
  `)
} " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> users = fs.readFileSync(<span class="hljs-string">'./db/users'</span>, <span class="hljs-string">'utf8'</span>)
<span class="hljs-keyword">try</span> {
  users = <span class="hljs-built_in">JSON</span>.parse(users) <span class="hljs-comment">//[] JSON也支持数组</span>
} <span class="hljs-keyword">catch</span> (exception) {
  users = []
}
<span class="hljs-keyword">let</span> inUse = <span class="hljs-literal">false</span>
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; users.length; i++) {
  <span class="hljs-keyword">let</span> user = users[i]
  <span class="hljs-keyword">if</span> (user.email === email) {
    inUse = <span class="hljs-literal">true</span>
    <span class="hljs-keyword">break</span>
  }
}
<span class="hljs-keyword">if</span> (inUse) {
  response.statusCode = <span class="hljs-number">400</span>
  response.setHeader(<span class="hljs-string">'Content-Type'</span>, <span class="hljs-string">'application/json;charset=utf-8'</span>)
  response.write(<span class="hljs-string">`
    {
      "errors": {
      "email": "inUse"
      }
    }
  `</span>)
} </code></pre>
<p>本文并没有使用真正意义上的数据库，只是使用了简单的db文件做数据库，其实就是存的数组，也就是users其实就是数组<code>[]</code>。</p>
<ul><li>之所以使用了<code>try{}catch(){}</code>，是因为一旦除了错，可以将其初始化为空数组，后续代码可以继续执行，可能并不严谨，不过本文是侧重了解注册的思路的。</li></ul>
<p>同样的，如果邮箱已经存在了，就提示用户</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (errors.email &amp;&amp; errors.email === 'inUse') {
    $form.find('[name=&quot;email&quot;]').siblings('.errors').text('这个邮箱已被注册啦')
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">if</span> (errors.email &amp;&amp; errors.email === <span class="hljs-string">'inUse'</span>) {
    $form.find(<span class="hljs-string">'[name="email"]'</span>).siblings(<span class="hljs-string">'.errors'</span>).text(<span class="hljs-string">'这个邮箱已被注册啦'</span>)
}</code></pre>
<hr>
<p>后端校验必须很严格，因为可以通过<code>curl</code>越过前端的校验。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013231830?w=1352&amp;h=254" src="https://static.alili.tech/img/remote/1460000013231830?w=1352&amp;h=254" alt="curl" title="curl" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013231831?w=1600&amp;h=864" src="https://static.alili.tech/img/remote/1460000013231831?w=1600&amp;h=864" alt="使用curl发起请求" title="使用curl发起请求" style="cursor: pointer;"></span></p>
<hr>
<h3 id="articleHeader11">把信息写入数据库</h3>
<p>没有错误之后，就可以把信息写到数据库里面啦</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" users.push({email: email, password: password})//是个对象啊
 var usersString = JSON.stringify(users)
 fs.writeFileSync('./db/users', usersString)
 response.statusCode = 200" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"> users.push({<span class="hljs-attr">email</span>: email, <span class="hljs-attr">password</span>: password})<span class="hljs-comment">//是个对象啊</span>
 <span class="hljs-keyword">var</span> usersString = <span class="hljs-built_in">JSON</span>.stringify(users)
 fs.writeFileSync(<span class="hljs-string">'./db/users'</span>, usersString)
 response.statusCode = <span class="hljs-number">200</span></code></pre>
<p>users实现是个对象，而对象是内存里面的东西，数据库里面应该存储的是字符串，所以用了<code>JSON.stringify(users)</code></p>
<p>好啦，上篇注册篇结束啦，下篇讲一讲如何登录以及<code>Cookie</code>登场</p>
<p>相关代码见<a href="https://github.com/codevvvv9/AJAXDemo_nodeJsServer/blob/master/sign_up.html" rel="nofollow noreferrer" target="_blank">sign_up.html</a></p>
<p><a href="https://github.com/codevvvv9/AJAXDemo_nodeJsServer/blob/master/server.js" rel="nofollow noreferrer" target="_blank">server.js</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
一块小饼干(Cookie)的故事-上篇

## 原文链接
[https://segmentfault.com/a/1190000013231817](https://segmentfault.com/a/1190000013231817)

