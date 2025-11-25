---
title: 'XSS分析及预防' 
date: 2019-02-11 2:30:49
hidden: true
slug: x94nn5vb76
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">XSS分析及预防</h1>
<hr>
<p>XSS（Cross Site Scripting），又称跨站脚本，XSS的重点不在于跨站点，而是在于脚本的执行。在WEB前端应用日益发展的今天，XSS漏洞尤其容易被开发人员忽视，最终可能造成对个人信息的泄漏。如今，仍然没有统一的方式来检测XSS漏洞，但是对于前端开发人员而言，仍是可以在某些细微处避免的，因此本文会结合笔者的学习和经验总结解决和避免的一些方案，并简要从webkit内核分析浏览器内核对于XSS避免所做的努力，了解底层基础设施对预防XSS所做的贡献。</p>
<h2 id="articleHeader1">XSS的种类和特点</h2>
<blockquote><p>此处不详细讲解XSS的一些细节</p></blockquote>
<p>XSS的目标是让<strong>其他站点的js文件运行在目标站点的上</strong>，这主要发生在页面渲染阶段。在该阶段发生了某些非预期的脚本行为，该脚本可能来自用户的输入，也可能来自域外的其他js文件，不一而足。XSS的发生起源来自于用户输入，因此XSS根据用户输入数据以何种形式、何时触发XSS、是否有后端服务器的参与划分为三种类型，分别是反射型XSS、持久型XSS和DOM XSS。</p>
<h3 id="articleHeader2">反射型XSS</h3>
<p>反射型XSS，顾名思义在于“反射”这个一来一回的过程。反射型XSS的触发有后端的参与，而之所以触发XSS是因为后端解析用户在前端输入的带有XSS性质的脚本或者脚本的data URI编码，后端解析用户输入处理后返回给前端，由浏览器解析这段XSS脚本，触发XSS漏洞。因此如果要避免反射性XSS，则必须需要后端的协调，在后端解析前端的数据时首先做相关的字串检测和转义处理；同时前端同样也许针对用户的数据做excape转义，保证数据源的可靠性。</p>
<p>e.x.<br>localhost/test.php</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<?php echo $_GET['name'] ?>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="php"><span class="hljs-meta">&lt;?php</span> <span class="hljs-keyword">echo</span> $_GET[<span class="hljs-string">'name'</span>] <span class="hljs-meta">?&gt;</span></span></code></pre>
<p>如果通过<br><strong>localhost/test.php?name=&lt;script&gt;alert(document.cookie)&lt;/script&gt;</strong><br>访问页面，那么经过后端服务器的处理，就会造成反射性XSS的发生。</p>
<p>同理，通过传入data uri编码的字符串也会导致XSS，如<br><strong>localhost/test.php?name=data:text/html;charset=utf-8;base64,PHNjcmlwdD5hbGVydChkb2N1bWVudC5jb29raWUpPC9zY3JpcHQ+</strong><br>会导致同样的问题。该段编码的字串解码后是“&lt;script&gt;alert(document.cookie)&lt;/script&gt;”。</p>
<h3 id="articleHeader3">持久型XSS</h3>
<p>持久型XSS仍然需要服务端的参与，它与反射型XSS的区别在于XSS代码是否持久化（硬盘，数据库）。反射型XSS过程中后端服务器仅仅将XSS代码保存在内存中，并为持久化，因此每次触发反射性XSS都需要由用户输入相关的XSS代码；而持久型XSS则仅仅首次输入相关的XSS代码，保存在数据库中，当下次从数据库中获取该数据时在前端未加字串检测和excape转码时，会造成XSS，而且由于该漏洞的隐蔽性和持久型的特点，在多人开发的大型应用和跨应用间的数据获取时造成的大范围的XSS漏洞，危害尤其大。这就需要开发人员培养良好的WEB前端安全意识，不仅仅不能相信用户的输入，也不能完全相信保存在数据库中的数据（即后端开发人员忽视的数据安全检测）。针对持久型XSS没有好的解决方式，只能由开发人员保证。当然规则是由开发者制定，如果忽略用户体验的话，可以制定一套严谨的输入规则，对相关关键词和输入类型（如data URI检测，禁止输入）的检测和禁止，尽可能规避用户发现XSS漏洞的可能性，从源头处理。</p>
<h3 id="articleHeader4">DOM XSS</h3>
<p>DOM XSS完全在前端浏览器触发，无需服务端的参与，因此这是前端开发工程师的“地盘”，理应获得我们的关注。</p>
<p>e.x.<br>localhost/test.html</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script>
eval('alert(location.hash.slice(&quot;1&quot;))');
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-built_in">eval</span>(<span class="hljs-string">'alert(location.hash.slice("1"))'</span>);
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>如果访问localhost/test.html#document.cookie ，那么就会触发最简单的危害非常大的DOM XSS。它完全没有服务端的参与，仅仅由用户的输入和不安全的脚本执行造成，当然在本例中仅仅是最简单的情况，如果用户输入字符串‘&lt;script src="<a href="http://.../abc.js%22&gt;&lt;/script&gt;" rel="nofollow noreferrer" target="_blank">http://.../abc.js"&gt;&lt;/script&gt;</a>’或者text/html格式的data URI，则更难检测，也危害更大，黑客操作起来更为容易。</p>
<p>因此预防DOM XSS，需要前端开发人员警惕用户所有的输入数据，做到数据的excape转义，同时尽可能少的直接输出HTML的内容；不用eval、new Function、setTimeout等较为hack的方式解析外站数据和执行js脚本；禁止内联事件处理函数“<a></a>”；如果在考虑安全性的前提下需要获取外站脚本的执行结果，可以采用前端沙盒（建立空的iframe执行脚本，该iframe无法操作当前文档对象模型）、worker线程的方式完成，保证DOM的安全。</p>
<h2 id="articleHeader5">XSS预防</h2>
<p>XSS漏洞难以检测，但是为了WEB安全仍需要尽力避免，在本节将会针对三种类型XSS漏洞提出对应解决方法，并从其他角度提供更具启发性的意见。</p>
<ul>
<li><p>针对反射型XSS，在对应的小节中也提到过，需要服务端和前端共同预防，针对用户输入的数据做解析和转义，对于前端开发而言，则是善于使用escape，针对data URI内容做正则判断，禁止用户输入非显示信息，如MIME类型为“text/html，text/plain”类型的内容。</p></li>
<li><p>对于存储型XSS，处理方式仍然类同于反射性XSS。</p></li>
<li><p>对于DOM XSS，则需要慎之又慎。由于造成XSS的原因在于用户的输入，因此在前端，需要特别注意以下的用户输入源：</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.URL,
location.hash,
location.research,
document.referrer(此处应尤为注意，referrer属性虽然可用于避免CSRF，但可触发XSS攻击),
XHR返回值（跨域返回值）,
form表单及各种input框" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>document<span class="hljs-selector-class">.URL</span>,
location<span class="hljs-selector-class">.hash</span>,
location<span class="hljs-selector-class">.research</span>,
document.referrer(此处应尤为注意，referrer属性虽然可用于避免CSRF，但可触发XSS攻击),
XHR返回值（跨域返回值）,
form表单及各种input框</code></pre>
<p>针对以上输入源，需要做相对于的检测和转义。在以上输入源中获取数据后，可能会有各种DOM操作或纯粹的js计算，这些操作则是真正触发XSS的罪魁祸首：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1,直接输出HTML内容
document.body.innerHTML = ...
document.body.outterHTML = ...
document.write()
2,HTML标签内联脚本
<a href=&quot;&quot; onclick=&quot;handleClick();&quot;></a>
<img src='abc' onerror=alert('error')>
3,直接执行脚本
eval
new Function(){}
setTimeout()
window.execScript()
4,打开新页面触发XSS（包括反射型XSS和持久型XSS）
window.open()
location.href = ...
location.hash = ..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-number">1</span>,直接输出HTML内容
document<span class="hljs-selector-class">.body</span><span class="hljs-selector-class">.innerHTML</span> = ...
document<span class="hljs-selector-class">.body</span><span class="hljs-selector-class">.outterHTML</span> = ...
document.write()
<span class="hljs-number">2</span>,HTML标签内联脚本
&lt;<span class="hljs-selector-tag">a</span> href=<span class="hljs-string">""</span> onclick=<span class="hljs-string">"handleClick();"</span>&gt;&lt;/a&gt;
&lt;<span class="hljs-selector-tag">img</span> src=<span class="hljs-string">'abc'</span> onerror=alert(<span class="hljs-string">'error'</span>)&gt;
<span class="hljs-number">3</span>,直接执行脚本
eval
new Function(){}
<span class="hljs-function"><span class="hljs-title">setTimeout</span><span class="hljs-params">()</span></span>
window.execScript()
<span class="hljs-number">4</span>,打开新页面触发XSS（包括反射型XSS和持久型XSS）
window.open()
location<span class="hljs-selector-class">.href</span> = ...
location<span class="hljs-selector-class">.hash</span> = ...</code></pre>
<p>在操作DOM时，需要尤其注意上述操作，针对可能造成的XSS需要进行字串转义。当然，有些操作是完全可以避免的：对于innerHTML的拼接操作，需要摒弃jQuery式的链式操作而使用前端模版如artTemplate，也可选择使用由后端渲染好的可靠的数据，这样既保证性能也确保安全；对于HTML标签内嵌js，则需要完全避免，这是一种容错率很低的实现；直接执行脚本和解析数据，则需避免eval和new Funciton等操作，改为JSON.parse、iframe沙盒和webWorker执行；而针对打开新页面触发的XSS则需要开发人员自行把控。</p>
<h3 id="articleHeader6">另外的尝试</h3>
<p>上文提到的仅仅是对应的XSS避免方案，但是如果将目光放置在全局，站在浏览器的角度上，则会变的更为柳暗花明。现阶段，大多数浏览器都支持多种安全策略，如沙盒机制，跨域机制，跨文档消息和CSP。在这里，我们关注CSP（Content Security Policy），又称内容安全协议，CSP通过服务端响应的HTTP头部来制定网页相关资源的加载域，这些资源限定于js文件、css文件、image、iframe、字体和其他对象（如object、applet）。</p>
<p>CSP通过HTTP头部由服务端制定，头部类型由于历史原因总共由三种，这三种仅仅是兼容性的差别，针对chrome浏览器，我们仅需关注<strong>Content-Security-Policy</strong>头部。CSP头部的定义规则如下：<br><em>Content-Security-Policy: 名 值; 名 值; 名 值;</em></p>
<p>具体的指令名如下图：<br><span class="img-wrap"><img data-src="/img/remote/1460000006767023" src="https://static.alili.tech/img/remote/1460000006767023" alt="CSP derective" title="CSP derective" style="cursor: pointer;"></span><br>指令值的规范如下图：<br><span class="img-wrap"><img data-src="/img/remote/1460000005032981" src="https://static.alili.tech/img/remote/1460000005032981" alt="CSP value" title="CSP value" style="cursor: pointer;"></span></p>
<p>因此，如果我们要避免XSS攻击，可以限定脚本的来源域，如：<br>Content-Security-Policy: default-src 'self' ajax.googleapis.com;<br>这样，非本域和ajax.googleapis.com域下的其他脚本不会被加载，避免了XSS。</p>
<p>在这里需要强调一点的是，<strong>默认CSP会禁止script代码块的执行；禁止内联事件处理函数；禁止内联样式；禁止eval和new Function</strong>。对于内联script代码块和内联样式，可通过CSP的header设置，如<strong>Content-Security-Policy: default-src 'self'; script-src 'unsafe-inline';</strong>。</p>
<p>CSP有一个指令需要注意，即report-uri，它会将错误信息主动发送至改cgi（sevlet），用于管理员的统一管控。report-uri属性将会在下文中涉及到。</p>
<h3 id="articleHeader7">webkit中的XSS组件</h3>
<p>XSS攻击主要发生在页面的渲染时，当浏览器的渲染引擎获取到该页面并开始解析时，是可以在该阶段进行安全校验的，具体的时间节点则是在词法分析后针对每个token做过滤。</p>
<p>在webkit中，由HTMLDocumentParser解析得到token后，使用XSSAuditor进行过滤，具体则是在filterToken中执行，不仅仅是针对token的名称，其属性也是监测重点。在webkit中采用黑名单机制，针对“&lt;input&gt;,&lt;form&gt;,&lt;script&gt;,&lt;iframe&gt;”做重点排查，当发现相关隐患时，生成相关信息XSSInfo，由XSSAuditorDelegate类发送给对应的cgi，该cgi的地址正是CSP中的指令值report-uri,当然也可以手动制定该值。</p>
<p>默认，XSSAuditor是启用的，但是XSSAuditor在发现XSS行为时却有多种，这些行为可以配置，这就涉及到HTTP头部<strong>X-XSS-Protection</strong>。该头部并不是W3C和IETF的规范，而是非标准实现，通过对该头部的赋值来定制XSSAuditor的相关行为。</p>
<p>默认情况，XSSAuditor处于重写模式(js代码处在非执行状态)，即<strong>X-XSS-Protection：1</strong>；如果要禁用XSSAuditor，可以X-XSS-Protection：0；当设置为X-XSS-Protection：1;mode=block，则会在XSSAuditor作用时禁止网页显示，呈现给用户的则是空白页；若设置为X-XSS-Protection：1;report=... ，则会将相关统计信息发送给CSP中定义的report-uri。XSSAuditor无法完全避免XSS，但毕竟在浏览器层面提供了一层检查机制，从HTML tag上保证其可靠性。</p>
<h2 id="articleHeader8">总结</h2>
<p>XSS漏洞难以发现，但是作为开发人员需要于细节处避免制造XSS漏洞，而对于CSP规范和webkit的XSSAuditor机制的使用，我们不应抱着依靠它们的想法来解决XSS，毕竟不是所有的页面都可以容忍CSP的严格，XSSAuditor机制也仅仅针对chrome而言，并且存在多种bypass绕过检查，如通过各种HTML实体编码、url编码和js编码。因此，我们仍需以人为本，规范开发习惯，提高WEB前端安全意识。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
XSS分析及预防

## 原文链接
[https://segmentfault.com/a/1190000005032978](https://segmentfault.com/a/1190000005032978)

