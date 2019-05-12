---
title: 'Node & 单页应用 来做一个完整用户系统吧！' 
date: 2019-02-01 2:30:10
hidden: true
slug: 4sna8qm6ycr
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">1. 开场白</h2>
<p>用户系统是许多网站的基础。这篇文章主要就是讲解如何写一个基于<code>Node</code>的单页应用的用户系统，这个用户系统的功能包括：注册，登录，自动登录，忘记密码，修改密码，邮件激活。<br>如果使用在后端使用模板引擎，而不是用前后端分离的方案，用户系统貌似没有那么复杂。在这个<a href="https://github.com/harryfyodor/N-blog" rel="nofollow noreferrer" target="_blank">Nodejs教程</a>里面已经介绍得很详细了（这是个不错的<code>Nodejs</code>教程）。但是如果选择前后端分离的方案，比如像接下来要介绍的<code>SPA</code>，那用户系统又该怎么处理呢？模板引擎的方案里面，事实上<code>session/cookie</code>上都做了封装，所以操作起来相对简单。但后者则不一样，它需要我们对于<code>HTTP</code>相关的概念有更加清晰的认识。要求会更加细致。</p>
<h2 id="articleHeader1">2. 基础知识</h2>
<p>下面先介绍一下一些基础的知识。说得不会很多，但是对于彻底理解<code>Cookie</code>，<code>Session</code>整个<code>Authentication</code>的机制非常重要。</p>
<h3 id="articleHeader2">2.1 HTTP</h3>
<h4>2.1.1 Cookie &amp; Session</h4>
<p>众所周知，<code>HTTP</code>是无状态的协议。这个的意思就是说，如果发送两个完全一样的请求，那么收到的响应也会完全相同。然而在实际生活中，这明显不符合许多场景。因为每个人虽然都点击了按钮，但我是<code>Harry</code>，她是<code>Clara</code>，我们应该收到不同的内容。服务器需要对我们做出区分，这时候<code>cookie</code>就登场了。我发出请求，服务器在响应里面加一个<code>Set-Cookie</code>，到我们浏览器里设了一个<code>cookie</code>（点开<code>devtool-&gt;Application-&gt;Cookies</code>查看），下一次发送请求的时候，我的<code>header</code>里面就带有<code>cookie</code>了，服务器看到<code>cookie</code>，就知道我是<code>Harry</code>了。这样就完成了一次认证。<br>但是接下来还有一个问题：服务器资源极其宝贵，如果每次都认证会造成资源浪费。加之，如果我希望能够暂时性地在当前会话存储一些信息，存储在<code>cookie</code>会显得非常浪费。因此<code>session</code>就来了。<br><code>session</code>就是当前用户的回话信息。它需要用到<code>cookie</code>，但不需要把<strong>所有信息</strong>都放在<code>cookie</code>里面，它需要的只是一个标示。<br><code>session</code>的信息是存储在服务器上的，可以存在缓存里，数据库里或者类似<code>Redis</code>之类的东西里（没用过..）。举个例子，<code>Express-session</code>里面的<code>session</code>的标示是一个名字为<code>connect.sid</code>的<code>cookie</code>。这个<code>cookie</code>是随机生成的独一无二的序列码，每次用户发起请求的时候，<code>cookie</code>跟着到了服务器上去。服务器检查一下用户的<code>connect.sid</code>，然后从内存，缓存，数据库或者<code>Redis</code>里面找到相应的信息，然后通过中间件进一步加到请求里面。这样服务器就可以使用专属于这个用户的信息而不再需要多次验证了。<br>因此<code>cookie</code>是整个用户机制的核心，下面简单介绍一下相关的<code>header</code>。</p>
<h4>2.1.2 Set-Cookie</h4>
<p><code>Set-Cookie</code>是<code>request</code>的<code>header</code>。<code>header</code>的格式是<code>NAME=VALUE</code>然后用分号‘;’分隔开来。<br>其中有几个设置比较常用：</p>
<ul>
<li><p><code>expires=Date</code> (设置<code>cookie</code>的到期时间)</p></li>
<li><p><code>secure</code> (仅仅只在<code>https</code>下使用)</p></li>
<li><p><code>HttpOnly</code> (使得<code>cookie</code>不能被客户端<code>JavaScript</code>修改)</p></li>
<li><p><code>maxAge</code> （<code>cookie</code>的保持时间，以毫秒为单位）</p></li>
</ul>
<h3 id="articleHeader3">2.2 Node.js</h3>
<h4>关于cookie</h4>
<p>读取和设置<code>cookie</code>在<code>Nodejs</code>里面都很方便，在<code>Express</code>里面添加中间件<code>cookie-parser</code>，可以把<code>cookie</code>对象直接赋给<code>req</code>。在路由回调函数里面操作的时候，直接用<code>req.cookie</code>就可以获取到客户端的<code>cookie</code>值。<br>而设置客户端的<code>cookie</code>则需要用<code>res.cookie</code>函数来设置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 把cookie里面的name值设为name
res.cookie('name', name, {
  maxAge: 1000 * 60 * 60 * 24 * 30,
  path:'/',
  httpOnly: false
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-comment">// 把cookie里面的name值设为name</span>
<span class="hljs-selector-tag">res</span><span class="hljs-selector-class">.cookie</span>(<span class="hljs-string">'name'</span>, name, {
  <span class="hljs-attribute">maxAge</span>: <span class="hljs-number">1000</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span> * <span class="hljs-number">24</span> * <span class="hljs-number">30</span>,
  <span class="hljs-attribute">path</span>:<span class="hljs-string">'/'</span>,
  <span class="hljs-attribute">httpOnly</span>: false
})</code></pre>
<h4>session机制</h4>
<p><code>Express</code>的<code>session</code>实现需要一个中间件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var session = require('express-session')
app.use(session({
    secret: settings.cookieSecret, // 设置密码“种子”
    store: new MongoStore({
      url: 'mongodb://localhost/color' // 这里用了数据库存储session，如果不设置就会用内存
    }),
    resave: true,
    saveUninitialized: true
}))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-keyword">var</span> session = <span class="hljs-keyword">require</span>(<span class="hljs-string">'express-session'</span>)
app.<span class="hljs-keyword">use</span>(session({
    secret: settings.cookieSecret, <span class="hljs-comment">// 设置密码“种子”</span>
    store: <span class="hljs-keyword">new</span> MongoStore({
      url: <span class="hljs-string">'mongodb://localhost/color'</span> <span class="hljs-comment">// 这里用了数据库存储session，如果不设置就会用内存</span>
    }),
    resave: <span class="hljs-keyword">true</span>,
    saveUninitialized: <span class="hljs-keyword">true</span>
}))</code></pre>
<p>有关<code>session</code>的使用<a href="https://github.com/harryfyodor/N-blog" rel="nofollow noreferrer" target="_blank">Nodejs教程</a>里面有介绍，具体来说，比如用户登录之后，可以设置 <code>req.session.user = "harry"</code>, 然后之后的所有需要用到用户登录的场景都可以先判断一下<code>req.session</code>里面有没有<code>user</code>这一项。这样就完成了一次区分，而不需要再次验证。</p>
<h3 id="articleHeader4">2.3 前端</h3>
<p>在这里的预设是要做一个单页应用。如果使用模板引擎，使用<code>render</code>很容易就可以完成登录等等的功能，但如果要写一个前后端分离的应用，比如一个<code>SPA</code>，那就不得不使用<code>AJAX</code>来收发用户信息。<br>不管使用什么库来收发<code>AJAX</code>，有一点是需要注意的：那就是发送的AJAX请求要包含<code>credentials: 'include'</code> 以保证<code>cookie</code>能够被携带发送到后端，否则后端的<code>req.cookie</code>不会收到。</p>
<h2 id="articleHeader5">3. 实例讲解</h2>
<h3 id="articleHeader6">3.1 确认</h3>
<p>对于需要确认用户已经登录了才能够使用的路由，需要加一个中间件。这个中间件的作用是检查<code>req.session.user</code>是不是已经定义了。一般来说，在用户登录之后都需要设置一下<code>req.session.user</code>，以表示处于登录的状态。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function authorize(req, res, next) {
  if(req.session.user) {
    next()
  } else {
    res.status(401).send({errorMsg: &quot;Unauthorize&quot;})
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lua"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">authorize</span><span class="hljs-params">(req, res, next)</span></span> {
  <span class="hljs-keyword">if</span>(req.session.user) {
    <span class="hljs-built_in">next</span>()
  } <span class="hljs-keyword">else</span> {
    res.<span class="hljs-built_in">status</span>(<span class="hljs-number">401</span>).send({errorMsg: <span class="hljs-string">"Unauthorize"</span>})
  }
}</code></pre>
<h3 id="articleHeader7">3.2 注册</h3>
<p>对于一个注册的过程来说需要有如下的一些步骤。收到用户的用户名，邮箱之后，要在数据库里面找一下，如果找到了同名或者用邮箱的，就要告知用户，重名了。如果没有重名，就发送邮件到邮箱中进行验证，同时创建一个未激活的账户。<br>另一个要注意的点就是密码的存取最好不要直接存入，推荐是先加密。<br>这里涉及到了多重嵌套的异步，可以使用<a href="https://segmentfault.com/a/1190000007255138">我之前写的这篇文章</a>的<code>co</code>，也可以用<code>async/await</code>。用回调函数来写后期看起来会很吃力...</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function *registerGen(req, res, newUser) {
  try {
    // 看有没有重名的
    const userOfSameName = yield new Promise(function(resolve, reject) {
      User.get(&quot;NAME&quot;, req.body.name, function(err, user) {
        if(err) reject(err)
        resolve(user)
      })
    })
    // 看是不是同一邮箱又想重复注册
    const userOfSameEmail = yield new Promise(function(resolve, reject) {
      User.get(&quot;EMAIL&quot;, req.body.email, function(err, user) {
        if(err) reject(err)
        resolve(user)
      })
    })
    
    // 如果是以上两种情况，就发送错误信息。
    if(userOfSameName) {
      return res.status(200).send({ errorMsg: &quot;此账户名已经被注册。&quot;})
    } else if (userOfSameEmail) {
      return res.status(200).send({ errorMsg: &quot;此邮箱已经被注册。&quot;})
    }

    // 成功的话就新建一个未激活的账户
    yield new Promise(function(resolve, reject) {
      newUser.save(function(err, user) {
        if(err) {
          console.log(&quot;Register error:&quot; ,err)
          reject(err)
        }
        resolve(user)
      })
    })

    // 发送激活邮件
    yield new Promise(function(resolve, reject) {
      
      const nameHash = crypto.createHmac('sha256', SECRET)
                         .update(req.body.name)
                         .digest('hex')

      const emailHash = crypto.createHmac('sha256', SECRET)
                          .update(req.body.email)
                          .digest('hex')
     
      const base = &quot;http://colors.harryfyodor.tk/activate/&quot;

      // 打开这一段链接之后会可以通过立即发起一个ajax来更新数据库，激活账户。
      const link = `${base}${req.body.name}/${nameHash}|${emailHash}`

      User.activate({
        subject: 'Colors 验证邮件',
        html: '如果您并没有注册Colors，请忽略此邮件。点击下面链接激活账户。<br>\
                <a href=' + link + ' target=&quot;_blank&quot;>激活链接</a>',
        to: req.body.email
      }, function(err) {
        if(err) reject(err)
        res.send({ ok: true })
        resolve()
      })
    })
    
  } catch(e) {
    // 如果有错误就在这里发起，方便debug
    return res.status(500).send({ msg: &quot;ERROR&quot;})
    console.log('Error ', e)
  }
}

function register(req, res) {
  
  // 密码需要先加密，不推荐明文存储。
  var md5 = crypto.createHash('md5'),
      password = md5.update(req.body.password).digest('hex');

  // 创建用户，这里的User是model（后端MVC的M）的一个构造函数。
  var newUser = new User({
    name: req.body.name,
    password: password,
    email: req.body.email
  })

  // 用co函数来实现同步写法写异步
  co(registerGen(req, res, newUser))
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> *<span class="hljs-title">registerGen</span>(<span class="hljs-params">req, res, newUser</span>) </span>{
  <span class="hljs-keyword">try</span> {
    <span class="hljs-comment">// 看有没有重名的</span>
    <span class="hljs-keyword">const</span> userOfSameName = <span class="hljs-keyword">yield</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
      User.get(<span class="hljs-string">"NAME"</span>, req.body.name, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err, user</span>) </span>{
        <span class="hljs-keyword">if</span>(err) reject(err)
        resolve(user)
      })
    })
    <span class="hljs-comment">// 看是不是同一邮箱又想重复注册</span>
    <span class="hljs-keyword">const</span> userOfSameEmail = <span class="hljs-keyword">yield</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
      User.get(<span class="hljs-string">"EMAIL"</span>, req.body.email, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err, user</span>) </span>{
        <span class="hljs-keyword">if</span>(err) reject(err)
        resolve(user)
      })
    })
    
    <span class="hljs-comment">// 如果是以上两种情况，就发送错误信息。</span>
    <span class="hljs-keyword">if</span>(userOfSameName) {
      <span class="hljs-keyword">return</span> res.status(<span class="hljs-number">200</span>).send({ <span class="hljs-attr">errorMsg</span>: <span class="hljs-string">"此账户名已经被注册。"</span>})
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (userOfSameEmail) {
      <span class="hljs-keyword">return</span> res.status(<span class="hljs-number">200</span>).send({ <span class="hljs-attr">errorMsg</span>: <span class="hljs-string">"此邮箱已经被注册。"</span>})
    }

    <span class="hljs-comment">// 成功的话就新建一个未激活的账户</span>
    <span class="hljs-keyword">yield</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
      newUser.save(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err, user</span>) </span>{
        <span class="hljs-keyword">if</span>(err) {
          <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Register error:"</span> ,err)
          reject(err)
        }
        resolve(user)
      })
    })

    <span class="hljs-comment">// 发送激活邮件</span>
    <span class="hljs-keyword">yield</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
      
      <span class="hljs-keyword">const</span> nameHash = crypto.createHmac(<span class="hljs-string">'sha256'</span>, SECRET)
                         .update(req.body.name)
                         .digest(<span class="hljs-string">'hex'</span>)

      <span class="hljs-keyword">const</span> emailHash = crypto.createHmac(<span class="hljs-string">'sha256'</span>, SECRET)
                          .update(req.body.email)
                          .digest(<span class="hljs-string">'hex'</span>)
     
      <span class="hljs-keyword">const</span> base = <span class="hljs-string">"http://colors.harryfyodor.tk/activate/"</span>

      <span class="hljs-comment">// 打开这一段链接之后会可以通过立即发起一个ajax来更新数据库，激活账户。</span>
      <span class="hljs-keyword">const</span> link = <span class="hljs-string">`<span class="hljs-subst">${base}</span><span class="hljs-subst">${req.body.name}</span>/<span class="hljs-subst">${nameHash}</span>|<span class="hljs-subst">${emailHash}</span>`</span>

      User.activate({
        <span class="hljs-attr">subject</span>: <span class="hljs-string">'Colors 验证邮件'</span>,
        <span class="hljs-attr">html</span>: <span class="hljs-string">'如果您并没有注册Colors，请忽略此邮件。点击下面链接激活账户。&lt;br&gt;\
                &lt;a href='</span> + link + <span class="hljs-string">' target="_blank"&gt;激活链接&lt;/a&gt;'</span>,
        <span class="hljs-attr">to</span>: req.body.email
      }, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err</span>) </span>{
        <span class="hljs-keyword">if</span>(err) reject(err)
        res.send({ <span class="hljs-attr">ok</span>: <span class="hljs-literal">true</span> })
        resolve()
      })
    })
    
  } <span class="hljs-keyword">catch</span>(e) {
    <span class="hljs-comment">// 如果有错误就在这里发起，方便debug</span>
    <span class="hljs-keyword">return</span> res.status(<span class="hljs-number">500</span>).send({ <span class="hljs-attr">msg</span>: <span class="hljs-string">"ERROR"</span>})
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Error '</span>, e)
  }
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">register</span>(<span class="hljs-params">req, res</span>) </span>{
  
  <span class="hljs-comment">// 密码需要先加密，不推荐明文存储。</span>
  <span class="hljs-keyword">var</span> md5 = crypto.createHash(<span class="hljs-string">'md5'</span>),
      password = md5.update(req.body.password).digest(<span class="hljs-string">'hex'</span>);

  <span class="hljs-comment">// 创建用户，这里的User是model（后端MVC的M）的一个构造函数。</span>
  <span class="hljs-keyword">var</span> newUser = <span class="hljs-keyword">new</span> User({
    <span class="hljs-attr">name</span>: req.body.name,
    <span class="hljs-attr">password</span>: password,
    <span class="hljs-attr">email</span>: req.body.email
  })

  <span class="hljs-comment">// 用co函数来实现同步写法写异步</span>
  co(registerGen(req, res, newUser))
}</code></pre>
<h3 id="articleHeader8">3.3 登陆</h3>
<p>用户登录需要有以下的步骤，代码就不详细叙述了。这里面需要非常繁琐的判断语句，但是理解起来非常简单。<br><span class="img-wrap"><img data-src="/img/bVERif?w=826&amp;h=1104" src="https://static.alili.tech/img/bVERif?w=826&amp;h=1104" alt="登录流程图" title="登录流程图" style="cursor: pointer;"></span></p>
<h3 id="articleHeader9">3.4 邮件通知</h3>
<p>激活用户需要用到<code>nodemailer</code>这个库，非常方便，用起来也非常简单。可以上<a href="https://nodemailer.com/" rel="nofollow noreferrer" target="_blank">官网</a>看。如果使用163邮箱作为发件的邮箱，有一点要<strong>格外注意</strong>，那就是密码处要是网易的授权密码。这一个需要在163邮箱里面自己设置，然后代码里就用那一个授权密码。这一点需要格外注意。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function sendEmail(detail, callback) {
  var config_email = {
    host: 'smtp.163.com',
    post: '25',
    auth: {
      user: 'example@163.com',
      pass: '**********' // 这个密码不是邮箱密码，请先到邮箱里面设置授权密码。
    }
  }

  var transporter = nodemailer.createTransport(config_email)
  var data = {
    from: config_email.auth.user,
    to: detail.to,
    subject: detail.subject,
    html: detail.html
  }

  // 异步发送邮件
  transporter.sendMail(data, function(err, info) {
    if(err) {
      console.log(&quot;SendEmail Error&quot;, err)
      callback(err)
    } else {
      console.log(&quot;Message sent:&quot; + info.response)
      callback(null);
    }
  })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sendEmail</span>(<span class="hljs-params">detail, callback</span>) </span>{
  <span class="hljs-keyword">var</span> config_email = {
    <span class="hljs-attr">host</span>: <span class="hljs-string">'smtp.163.com'</span>,
    <span class="hljs-attr">post</span>: <span class="hljs-string">'25'</span>,
    <span class="hljs-attr">auth</span>: {
      <span class="hljs-attr">user</span>: <span class="hljs-string">'example@163.com'</span>,
      <span class="hljs-attr">pass</span>: <span class="hljs-string">'**********'</span> <span class="hljs-comment">// 这个密码不是邮箱密码，请先到邮箱里面设置授权密码。</span>
    }
  }

  <span class="hljs-keyword">var</span> transporter = nodemailer.createTransport(config_email)
  <span class="hljs-keyword">var</span> data = {
    <span class="hljs-attr">from</span>: config_email.auth.user,
    <span class="hljs-attr">to</span>: detail.to,
    <span class="hljs-attr">subject</span>: detail.subject,
    <span class="hljs-attr">html</span>: detail.html
  }

  <span class="hljs-comment">// 异步发送邮件</span>
  transporter.sendMail(data, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err, info</span>) </span>{
    <span class="hljs-keyword">if</span>(err) {
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"SendEmail Error"</span>, err)
      callback(err)
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Message sent:"</span> + info.response)
      callback(<span class="hljs-literal">null</span>);
    }
  })
}</code></pre>
<h2 id="articleHeader10">4.总结</h2>
<p>当然，这一个用户登录系统仍然还有很多要改进的地方（比如安全问题等等）。除此之外，在功能上还有不少需要增加的。比如修改密码，比如更换密码等等，看了上面的内容，其实要完成这些功能也是非常简单的一件事了。<br>如果感兴趣的话可以看看我自己写的一个网站，<a href="https://github.com/harryfyodor/colors" rel="nofollow noreferrer" target="_blank">Colors</a>，这是一个基于<code>React</code>和<code>Nodejs</code>的网站，有完整的用户系统，如果没有什么头绪的话可以参考一下~</p>
<p>如果文章中有什么错误或者不妥的地方，欢迎指出，互相交流学习~感谢阅读~</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Node & 单页应用 来做一个完整用户系统吧！

## 原文链接
[https://segmentfault.com/a/1190000007315867](https://segmentfault.com/a/1190000007315867)

