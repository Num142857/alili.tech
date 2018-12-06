---
title: '使用PostMan进行自动化测试' 
date: 2018-12-07 2:30:10
hidden: true
slug: 9u9aipqwc4s
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>最近在进行一个老项目的升级，第一步是先将node版本从<code>4.x</code>升级到<code>8.x</code>，担心升级会出现问题，所以需要将服务的接口进行验证；<br>如果手动输入各种URL，人肉check，一个两个还行，整个服务。。大几十个接口，未免太浪费时间了-.-；<br>因为是一个纯接口服务的项目，所以打算针对对应的API进行一波自动化测试；<br>所以就开始寻找对应的工具，突然发现，平时使用的<code>PostMan</code>貌似也是支持写测试用例的-.-，所以就照着文档怼了一波；<br>一下午的时间，很是激动，之前使用<code>PostMan</code>仅限于修改<code>Header</code>，添加<code>Body</code>发送请求，从来没有考虑过拿<code>PostMan</code>来进行测试，一下午的使用，感觉发现了新大陆。</blockquote>
<h2 id="articleHeader0">PostMan的安装</h2>
<p>貌似下载和使用<code>PostMan</code>必须要翻墙-.-<br>因为现在提供两种形态的App：</p>
<ol>
<li>
<code>chrome</code>的插件 <em>（已经快要被废弃了，推荐使用独立App）</em>
</li>
<li>独立的App</li>
</ol>
<p>而且在使用时需要登录账号，我这边是直接登录的<code>Google</code>账号-。-貌似有其它方式，但是我并没有去尝试。</p>
<p>独立App版云盘地址（<code>Mac</code>版本，今天刚下载的6.0.10，需要的请自取）：<br>链接:<a href="https://pan.baidu.com/s/18CDp2MUQCLgk_USlmVc-Gw" rel="nofollow noreferrer" target="_blank">https://pan.baidu.com/s/18CDp...</a>  密码:<code>mrpf</code></p>
<p>下载完毕解压后直接运行即可，然后就是注册账号之类的，目测账号这一块主要是用于后续的小组分享需要（可以直接将你的调用记录分享给其他人）。</p>
<h2 id="articleHeader1">发送一个请求</h2>
<p>这是<code>PostMan</code>最基础的一个用法，用来发送一个请求。<br>可以设置<code>Header</code>，<code>Body</code>等信息。<br><span class="img-wrap"><img data-src="/img/bV7vJu?w=1942&amp;h=1162" src="https://static.alili.tech/img/bV7vJu?w=1942&amp;h=1162" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader2">Collections</h2>
<p>我们可以将每次发送的请求进行保存，方便下次请求该接口时，直接调用即可，<br>如果保存请求的话，会被保存到一个<code>Collections</code>里去，类似一个集合。<br><code>PostMan</code>提供了方法，能够一键运行整个<code>Collections</code>中所有的请求。<br><span class="img-wrap"><img data-src="/img/bV7vJx?w=600&amp;h=420" src="https://static.alili.tech/img/bV7vJx?w=600&amp;h=420" alt="" title="" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/bV7vJC?w=1608&amp;h=1210" src="https://static.alili.tech/img/bV7vJC?w=1608&amp;h=1210" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>然后我们就可以在需要的时候，直接运行集合中所有的请求了。<br><span class="img-wrap"><img data-src="/img/bV7vJD?w=730&amp;h=762" src="https://static.alili.tech/img/bV7vJD?w=730&amp;h=762" alt="" title="" style="cursor: pointer;"></span></p>
<p>保存请求记录的时候，在下边选择对应的<code>Collection</code>即可<br><span class="img-wrap"><img data-src="/img/bV7vJF?w=948&amp;h=1344" src="https://static.alili.tech/img/bV7vJF?w=948&amp;h=1344" alt="" title="" style="cursor: pointer;"></span></p>
<h2 id="articleHeader3">开始API测试</h2>
<h3 id="articleHeader4">测试脚本位置</h3>
<p><span class="img-wrap"><img data-src="/img/bV7vJG?w=1962&amp;h=826" src="https://static.alili.tech/img/bV7vJG?w=1962&amp;h=826" alt="" title="" style="cursor: pointer; display: inline;"></span><br><code>PostMan</code>针对请求编写的测试脚本，在这个位置，采用的是<code>JavaScript</code>语法，右侧是一些预先配置的代码片段。<br>以及我们可以在<code>Pre-request Script</code>中编写脚本，用于在发送请求前执行。</p>
<h3 id="articleHeader5">一些简单的语法</h3>
<p><code>PostMan</code>也提供了一种断言，来帮助做一些验证。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="tests['Status code is 200'] = responseCode.code === 200

tests['Data length >= 10'] = JSON.parse(responseBody).data.length >= 10" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">tests[<span class="hljs-string">'Status code is 200'</span>] = responseCode.code === <span class="hljs-number">200</span>

tests[<span class="hljs-string">'Data length &gt;= 10'</span>] = <span class="hljs-built_in">JSON</span>.parse(responseBody).data.length &gt;= <span class="hljs-number">10</span></code></pre>
<p>赋值为<code>true</code>即表示通过，<code>false</code>为失败。<br><code>tests</code>的直接赋值作用比较局限，如果在脚本中进行一些其他异步操作，则需要用到<code>pm.test</code>了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="setTimeout(() => {
  pm.test(&quot;test check&quot;, function () {
    pm.expect(false).to.be.true
  })
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  pm.test(<span class="hljs-string">"test check"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    pm.expect(<span class="hljs-literal">false</span>).to.be.true
  })
})</code></pre>
<p>只用上边的<code>tests</code>赋值+<code>pm.test/pm.expect</code>已经能够满足我们的需求了，其余的一些只是在这之上的语法糖而已。<br><a href="https://www.getpostman.com/docs/v6/postman/scripts/test_examples" rel="nofollow noreferrer" target="_blank">各种语法示例</a></p>
<h3 id="articleHeader6">在测试脚本中发送请求</h3>
<p>我们可以在拿到一个<code>API</code>返回结果后，根据该结果发送一些新的请求，然后添加断言。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let responseJSON = JSON.parse(responseBody)

// 获取关注的第一个用户，并请求他的用户信息
pm.sendRequest(responseJSON[0].url, function (err, response) {
  let responseJSON = response.json()

  pm.test('has email', function () {
    pm.expect(responseJSON.email).is.be.true // 如果用户email不存在，断言则会失败
  })
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> responseJSON = <span class="hljs-built_in">JSON</span>.parse(responseBody)

<span class="hljs-comment">// 获取关注的第一个用户，并请求他的用户信息</span>
pm.sendRequest(responseJSON[<span class="hljs-number">0</span>].url, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err, response</span>) </span>{
  <span class="hljs-keyword">let</span> responseJSON = response.json()

  pm.test(<span class="hljs-string">'has email'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    pm.expect(responseJSON.email).is.be.true <span class="hljs-comment">// 如果用户email不存在，断言则会失败</span>
  })
});</code></pre>
<p>如果我们有一些动态接口要进行测试，可以尝试这种写法。<br>一级接口返回<code>List</code><br>二级接口根据<code>List</code>的<code>ID</code>进行获取对应信息。</p>
<h3 id="articleHeader7">如何处理大量重复的断言逻辑</h3>
<p>针对单个API，去编写对应的断言脚本，这个是没有什么问题的。<br>但是如果是针对一个项目的所有<code>API</code>去编写，类似于判断<code>statusCode</code>这样的断言就会显得很冗余，所以<code>PostMan</code>也考虑到了这点。<br>在我们创建的<code>Collection</code>以及下层的文件夹中，我们可以直接编写针对这个目录下的所有请求的断言脚本。<br><span class="img-wrap"><img data-src="/img/bV7vJV?w=574&amp;h=842" src="https://static.alili.tech/img/bV7vJV?w=574&amp;h=842" alt="" title="" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/bV7vJ6?w=1590&amp;h=1220" src="https://static.alili.tech/img/bV7vJ6?w=1590&amp;h=1220" alt="" title="" style="cursor: pointer;"></span><br>这里的脚本会作用于目录下所有的请求。<br>这样我们就可以将一些通用性的断言挪到这里了，在每个请求的<code>Tests</code>下编写针对性的断言脚本。</p>
<h3 id="articleHeader8">变量的使用</h3>
<p><code>PostMan</code>提供了两种变量使用，一个是<code>global</code>，一个是<code>environment</code>。</p>
<h4>global</h4>
<p>代码操作的方式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="pm.globals.set(&quot;variable_key&quot;, &quot;variable_value&quot;) // set variable
pm.globals.get(&quot;variable_key&quot;) // get variable
pm.globals.unset(&quot;variable_key&quot;) // remove variable" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">pm.globals.set(<span class="hljs-string">"variable_key"</span>, <span class="hljs-string">"variable_value"</span>) <span class="hljs-comment">// set variable</span>
pm.globals.get(<span class="hljs-string">"variable_key"</span>) <span class="hljs-comment">// get variable</span>
pm.globals.unset(<span class="hljs-string">"variable_key"</span>) <span class="hljs-comment">// remove variable</span></code></pre>
<p>通过GUI设置：<br><span class="img-wrap"><img data-src="/img/bV7vJ8?w=604&amp;h=544" src="https://static.alili.tech/img/bV7vJ8?w=604&amp;h=544" alt="" title="" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/bV7vJ9?w=1432&amp;h=946" src="https://static.alili.tech/img/bV7vJ9?w=1432&amp;h=946" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>设置完后我们就可以这样使用了：<br><span class="img-wrap"><img data-src="/img/bV7vKa?w=1920&amp;h=548" src="https://static.alili.tech/img/bV7vKa?w=1920&amp;h=548" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>基本上在所有的可输入的地方，我们都能够使用这些变量。</p>
<h4>environment</h4>
<p>环境变量，这个是权重比<code>global</code>要高一些的变量，是针对某些环境来进行设置的值。<br>操作方式类似。</p>
<p>在使用代码操作的方式时，只需将<code>globals</code>替换为<code>environment</code>即可。<br>在发起一个请求，或者一键发送所有请求时，我们可以勾选对应的环境，来使用不同的变量。<br><span class="img-wrap"><img data-src="/img/bV7vKc?w=660&amp;h=232" src="https://static.alili.tech/img/bV7vKc?w=660&amp;h=232" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>在针对大量API测试时，拿<code>environment</code>来设置一个<code>domain</code>将是一个不错的选择。<br>这样在请求中我们只需这样写即可：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=""{{"domain"}}"/res1
"{{"domain"}}"/res2

domain: https://api.github.com" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code>"{{"domain"}}"/res1
"{{"domain"}}"/res2

domain: https://api.github.com</code></pre>
<h3 id="articleHeader9">一个简单的示例：</h3>
<p>通过直接运行一个<code>Collection</code>，我们可以很直观的看到所有的接口验证情况。<br><span class="img-wrap"><img data-src="/img/bV7vKd?w=2560&amp;h=1420" src="https://static.alili.tech/img/bV7vKd?w=2560&amp;h=1420" alt="" title="" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/bV7vKh?w=2560&amp;h=1420" src="https://static.alili.tech/img/bV7vKh?w=2560&amp;h=1420" alt="" title="" style="cursor: pointer;"></span></p>
<h2 id="articleHeader10">参考资料</h2>
<p><a href="https://www.getpostman.com/docs/v6/" rel="nofollow noreferrer" target="_blank">https://www.getpostman.com/do...</a></p>
<p>之前使用<code>PostMan</code>，最多就是模拟一下<code>POST</code>请求，最近刚好碰到类似的需求，发现原来<code>PostMan</code>还可以做的更多。<br>这篇只是使用<code>PostMan</code>进行API测试的最基础操作，还有一些功能目前我并没有用到，例如集成测试、生成<code>API</code>文档之类的。</p>
<p>接口相当于是获取和操作服务资源的方式，肯定属于产品的核心。<br>所以测试是必须的，在交付QA同学之前，自己进行一遍测试，想必一定能节省一部分的时间。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用PostMan进行自动化测试

## 原文链接
[https://segmentfault.com/a/1190000014144322](https://segmentfault.com/a/1190000014144322)

