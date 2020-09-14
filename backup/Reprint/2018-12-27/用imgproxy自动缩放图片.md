---
title: '用imgproxy自动缩放图片' 
date: 2018-12-27 2:30:12
hidden: true
slug: kmizakochtb
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>无图，纯干货，信息量较大，慎入！</p></blockquote>
<p>最近几天的成果，浓缩下来就是这么一行代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.getElementById('img1').src = 'http://www.mysite.com/imgproxy' + imgproxy(document.getElementById(&quot;img1&quot;).getAttribute('data-src'), 135, 85);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'img1'</span>).src = <span class="hljs-string">'http://www.mysite.com/imgproxy'</span> + imgproxy(<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"img1"</span>).getAttribute(<span class="hljs-string">'data-src'</span>), <span class="hljs-number">135</span>, <span class="hljs-number">85</span>);</code></pre>
<h1 id="articleHeader0">寻找合适的图床</h1>
<p>最初的时候只是看<a href="https://www.fengerzh.com/" rel="nofollow noreferrer" target="_blank">我的个人博客</a>图片大小高低不一，比较难看，试图找一种方法能够统一各图片的高度。在网上搜索的结果是，发现了几个<code>Jykell</code>的插件，例如<a href="https://github.com/robwierzbowski/jekyll-picture-tag" rel="nofollow noreferrer" target="_blank">jekyll-picture-tag</a>，通过这个过程学到了不少东西，比如img标签除了有srcset以外，还有一个额外的Picture标签等等。本来想用这个插件，但另外一个插件<a href="https://github.com/nhoizey/jekyll-cloudinary" rel="nofollow noreferrer" target="_blank">jekyll-cloudinary</a>的作者说Picture标签并不好，应该直接使用<a href="https://cloudinary.com/" rel="nofollow noreferrer" target="_blank">Cloudinary</a>的服务。</p>
<p>由此而想起在我<a href="https://segmentfault.com/a/1190000011661518">上一篇文章</a>中提到过的<a href="http://www.jianshu.com/p/05289a4bc8b2" rel="nofollow noreferrer" target="_blank">一篇教程</a>中谈到过的用国内的<a href="https://www.qiniu.com/" rel="nofollow noreferrer" target="_blank">七牛云</a>做图床，于是开始尝试把我网站文章中用到的图片往七牛云搬家，图片搬家不是问题，但又想在博客网站上增加https服务，于是在问过我的朋友<a href="http://mazhuang.org/" rel="nofollow noreferrer" target="_blank">马壮</a>之后，在<a href="https://www.cloudflare.com/" rel="nofollow noreferrer" target="_blank">Cloudflare</a>上开通了https服务，但这又造成另外一个问题：七牛云上虽然放了我的图片，但是七牛云本身不支持https服务，于是又得想办法把图片搬到Cloudinary。</p>
<p>至此我个人的博客算是可以告一段落。平心而论，<code>七牛云</code>的预置功能还是很不错的，至少它对于<code>URL</code>的处理方式比<code>Cloudinary</code>要简单，但唯一的遗憾是它不支持<code>https</code>。而如果图片不支持<code>https</code>而网站使用<code>https</code>的话，<code>Chrome</code>会在<code>Console</code>里报警告错误，而我对网站的要求是：一个警告都不能有。</p>
<h1 id="articleHeader1">URL自动调整图片</h1>
<p>在此过程中，我开始思考一个问题：既然<code>Cloudinary</code>和<code>七牛云</code>都提供基于<code>URL</code>地址的图片变换，那么它们是怎么做到的呢？根据我对<code>PHP</code>的粗浅了解，最笨的方法可以直接以<code>PHP</code>读文件的方式从硬盘先读取图片的源文件，然后经转换后再以流的方式输出给页面，但这样效率肯定极低。于是经过搜索后发现了很多人推荐的<a href="https://github.com/jcupitt/libvips" rel="nofollow noreferrer" target="_blank">libvips</a>库，再进一步搜索，在<code>Github</code>上发现了有很多颗星的<a href="https://github.com/DarthSim/imgproxy" rel="nofollow noreferrer" target="_blank">imgproxy</a>这个库，似乎这就是我想要的东西。</p>
<p>于是我开始尝试动手往公司的服务器上部署<code>imgproxy</code>。但这时候遇到一个问题，在<code>CentOS</code>上，<code>imgproxy</code>并没有<code>yum</code>安装包，还需要先手工安装<code>libvips</code>，然后再编译，而最要命的是，公司的服务器在国内，无法通过<code>wget</code>的方式直接安装国外的软件包，由此而我需要先把安装包下载到本地，然后再上传到公司的服务器上。这时候我又想取个巧，<a href="http://jk2k.com/2016/03/iTerm2-enable-shell-integration-to-support-file-uploads-and-downloads/" rel="nofollow noreferrer" target="_blank">使用iterm内置的scp用鼠标拖拽的方式上传文件</a>。按照操作步骤的说明，安装好了之后却发现<code>iterm</code>的<code>scp</code>按钮依然是灰色的，这时才发现是由于服务器上的<code>fish</code>版本过低，只有<code>1.3</code>，而最新的已经是<code>2.6</code>了。于是<a href="http://fishshell.com/files/2.1.0/linux/index.html" rel="nofollow noreferrer" target="_blank">安装2.6的repo</a>，尝试更新<code>fish</code>，却总是报冲突。由此而想到将<code>fish 1.3</code>先卸载，就在这时灾难发生了。</p>
<h1 id="articleHeader2">灾难</h1>
<p>我直接执行了<code>yum remove fish</code>，但是在做这一步之前，我没有将<code>root</code>用户的<code>shell</code>切换回<code>bash</code>，由此而导致了<code>root</code>用户找不到它的<code>shell</code>，因为它还在试图寻找<code>fish</code>。这是一个致命的错误，我记得自己当时隐隐约约有预感，但还是没有特别在意，觉得也许<code>Linux</code>系统会自动为<code>root</code>用户赋予一个缺省的<code>shell</code>。结果我高估了<code>Linux</code>系统的能力。</p>
<p>退出登录之后，我发现<code>root</code>用户登录不上了！如果不仔细观察的话，你会感觉它的不能登录的症状和密码错误非常类似，但实际表现其实略有不同，在<code>SSH</code>端是不大看得出来的。我的第一反应是，如果<code>root</code>用户无法通过<code>SSH</code>登录了，那么应该通过<code>console</code>端登录。</p>
<p>但当天下午，令人惊讶的是连<code>console</code>端也登不上了！这时候我意识到问题严重了。在网上搜索的结果是有人说<a href="https://www.linuxquestions.org/questions/linux-virtualization-and-cloud-90/not-able-to-login-centos-6-5-because-of-login-in-loop-problem-4175520133/" rel="nofollow noreferrer" target="_blank">应该以runlevel 1的方式登录</a>，然后尝试修复<code>/etc/shadow</code>。但我完全不了解对于一台云主机应该如何进入<code>runlevel 1</code>。只好提工单给客服。而客服的技术水平大家应该是知道的，只是建议我重置密码之后再尝试一下。而重置密码必须要关机再重启，就这样来回折腾了很久也修不好。</p>
<p>在经过了漫长的等待之后，终于惊动了一个技术人员。他指出如果我必须要进<code>runlevel 1</code>的话，可以在系统开机的前3秒之间按下键盘的e键，然后就可以进入<code>runlevel 1</code>了。</p>
<p>但问题是这是一台云主机，如何能在开机前3秒按键呢？好在现在云主机的<code>console</code>功能非常发达，你可以开着<code>console</code>重启，这时候网络断掉，然后不停地刷新<code>console</code>，你会在电脑开机的一瞬间看到一个有字的黑画面，这时候迅速按下<code>e</code>键也能进入系统。然后再次按下<code>e</code>，把启动模式修改为<code>Linux single</code>。</p>
<p>按照他的指导，我终于能够以<code>runlevel 1</code>的方式进入了系统，首先尝试用<code>/etc/passwd</code>重建<code>/etc/shadow</code>，再次重启，无果，还是登录不进去。至此为止，所有关于密码的努力均告失败。我想，唯一的办法只能尝试看能不能切换<code>root</code>用户的<code>shell</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="chsh -s /bin/bash" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code style="word-break: break-word; white-space: initial;">chsh -s <span class="hljs-regexp">/bin/</span>bash</code></pre>
<p>把<code>root</code>用户的<code>shell</code>切换成<code>bash</code>之后，再次重启电脑，果然可以成功登录了！</p>
<h1 id="articleHeader3">修复</h1>
<p>接下来，我还是需要安装<code>fish</code>，但<code>yum install fish</code>结果<code>fish</code>还是<code>1.3</code>。我还要继续上次不成功的征程。再次把<code>fish</code>从<code>1.3</code>换成<code>2.6</code>。依然冲突。这次我学精了，我先把<code>root</code>的<code>shell</code>脚本切换成<code>bash</code>，然后<code>yum remove fish</code>，再次安装，发现这个<code>fish 1.3</code>的来源是一个不知什么时候装上的名叫<code>dag</code>的<code>repo</code>，于是尝试把这个<code>dag</code>的<code>repo</code>禁止掉：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="yum-config-manager --disable dag" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lua"><code style="word-break: break-word; white-space: initial;">yum-<span class="hljs-built_in">config</span>-manager <span class="hljs-comment">--disable dag</span></code></pre>
<p>然后再次安装，终于装上了<code>fish 2.6</code>。</p>
<p>至此，基本所有阻塞性因素都消除了，我开始将<code>libvips</code>的代码拖拽进服务器，然后编译。但这时候问题又来了，<code>imgproxy</code>必须运行在<code>docker</code>里，而说明文档上只说需要自己<code>build</code>一个<code>docker</code>，但并没有指明以什么操作系统为基础去<code>build</code>，好在官方提供了一个它们自己的<code>docker</code>文件，可以直接运行<code>imgproxy</code>。</p>
<p>啊！早知如此，我何必折腾这么一大圈？还差点毁掉了我的系统。不过好在学到了不少东西。好吧，于是我们开始直接安装使用<code>imgproxy</code>官方提供的<code>docker</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ docker pull darthsim/imgproxy:latest
$ docker run -e IMGPROXY_KEY=$YOUR_KEY -e IMGPROXY_SALT=$YOUR_SALT -p 8080:8080 -t darthsim/imgproxy" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code>$ docker pull darthsim/imgproxy:latest
$ docker <span class="hljs-keyword">run</span><span class="bash"> <span class="hljs-_">-e</span> IMGPROXY_KEY=<span class="hljs-variable">$YOUR_KEY</span> <span class="hljs-_">-e</span> IMGPROXY_SALT=<span class="hljs-variable">$YOUR_SALT</span> -p 8080:8080 -t darthsim/imgproxy</span></code></pre>
<p>但是这个<code>imgproxy</code>的使用方式又是非常的不友好，它完全不像<code>七牛云</code>或者<code>Cloudinary</code>那样直接在<code>URL</code>地址上构建就行了，它需要自己根据自己的<code>key</code>和<code>salt</code>产生签名，然后再用签名构建<code>URL</code>，它给了<a href="https://github.com/DarthSim/imgproxy/tree/master/examples" rel="nofollow noreferrer" target="_blank">各种语言的例子</a>，唯独没有<code>java</code>的，最后我只好根据它自己的<code>javascript</code>语言的例子构建一个<code>js</code>代码，用于替换页面中的图片链接。</p>
<h1 id="articleHeader4">编程</h1>
<p>但问题又来了，它给定的这个包是一个<code>node</code>的<code>js</code>脚本，里面有<code>require</code>语句，无法直接用于浏览器。这时候又得请出<code>browerify</code>，用它来编译<code>node</code>的脚本为可以供浏览器直接使用的脚本。好在过程并不复杂，编译之后得到的<code>bundle.js</code>文件，我们直接在页面中引用就行了。于是就得到了本文开头的一行代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>
<head>
</head>
<body>
  <img id=&quot;img1&quot; data-src=&quot;http://www.mysite.com/img/somepic.png&quot; src=&quot;&quot; />
  <script src=&quot;bundle.js&quot;></script>
  <script>
    window.onload = function() {
      document.getElementById('img1').src = 'http://www.mysite.com/imgproxy' + imgproxy(document.getElementById(&quot;img1&quot;).getAttribute('data-src'), 135, 85);
    }
  </script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"img1"</span> <span class="hljs-attr">data-src</span>=<span class="hljs-string">"http://www.mysite.com/img/somepic.png"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">""</span> /&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"bundle.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-built_in">window</span>.onload = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'img1'</span>).src = <span class="hljs-string">'http://www.mysite.com/imgproxy'</span> + imgproxy(<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"img1"</span>).getAttribute(<span class="hljs-string">'data-src'</span>), <span class="hljs-number">135</span>, <span class="hljs-number">85</span>);
    }
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>以及相关的js:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.imgproxy = function (url, width, height) {
  const crypto = require('crypto')

  const KEY = 'somekey'
  const SALT = 'somesalt'

  const urlSafeBase64 = (string) => {
    return new Buffer(string).toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
  }

  const hexDecode = (hex) => Buffer.from(hex, 'hex')

  const sign = (salt, target, secret) => {
    const hmac = crypto.createHmac('sha256', hexDecode(secret))
    hmac.update(hexDecode(salt))
    hmac.update(target)
    return urlSafeBase64(hmac.digest())
  }

  const resizing_type = 'fit'
  const gravity = 'no'
  const enlarge = 0
  const extension = 'jpg'
  const encoded_url = urlSafeBase64(url)
  const path = `/${resizing_type}/${width}/${height}/${gravity}/${enlarge}/${encoded_url}.${extension}`

  const signature = sign(SALT, path, KEY)
  const result = `/${signature}${path}`
  return result;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-built_in">window</span>.imgproxy = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">url, width, height</span>) </span>{
  <span class="hljs-keyword">const</span> crypto = <span class="hljs-built_in">require</span>(<span class="hljs-string">'crypto'</span>)

  <span class="hljs-keyword">const</span> KEY = <span class="hljs-string">'somekey'</span>
  <span class="hljs-keyword">const</span> SALT = <span class="hljs-string">'somesalt'</span>

  <span class="hljs-keyword">const</span> urlSafeBase64 = <span class="hljs-function">(<span class="hljs-params"><span class="hljs-built_in">string</span></span>) =&gt;</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> Buffer(<span class="hljs-built_in">string</span>).toString(<span class="hljs-string">'base64'</span>).replace(<span class="hljs-regexp">/=/g</span>, <span class="hljs-string">''</span>).replace(<span class="hljs-regexp">/\+/g</span>, <span class="hljs-string">'-'</span>).replace(<span class="hljs-regexp">/\//g</span>, <span class="hljs-string">'_'</span>)
  }

  <span class="hljs-keyword">const</span> hexDecode = <span class="hljs-function">(<span class="hljs-params">hex</span>) =&gt;</span> Buffer.from(hex, <span class="hljs-string">'hex'</span>)

  <span class="hljs-keyword">const</span> sign = <span class="hljs-function">(<span class="hljs-params">salt, target, secret</span>) =&gt;</span> {
    <span class="hljs-keyword">const</span> hmac = crypto.createHmac(<span class="hljs-string">'sha256'</span>, hexDecode(secret))
    hmac.update(hexDecode(salt))
    hmac.update(target)
    <span class="hljs-keyword">return</span> urlSafeBase64(hmac.digest())
  }

  <span class="hljs-keyword">const</span> resizing_type = <span class="hljs-string">'fit'</span>
  <span class="hljs-keyword">const</span> gravity = <span class="hljs-string">'no'</span>
  <span class="hljs-keyword">const</span> enlarge = <span class="hljs-number">0</span>
  <span class="hljs-keyword">const</span> extension = <span class="hljs-string">'jpg'</span>
  <span class="hljs-keyword">const</span> encoded_url = urlSafeBase64(url)
  <span class="hljs-keyword">const</span> path = <span class="hljs-string">`/<span class="hljs-subst">${resizing_type}</span>/<span class="hljs-subst">${width}</span>/<span class="hljs-subst">${height}</span>/<span class="hljs-subst">${gravity}</span>/<span class="hljs-subst">${enlarge}</span>/<span class="hljs-subst">${encoded_url}</span>.<span class="hljs-subst">${extension}</span>`</span>

  <span class="hljs-keyword">const</span> signature = sign(SALT, path, KEY)
  <span class="hljs-keyword">const</span> result = <span class="hljs-string">`/<span class="hljs-subst">${signature}</span><span class="hljs-subst">${path}</span>`</span>
  <span class="hljs-keyword">return</span> result;
}</code></pre>
<p>当然你需要<code>npm install crypto</code>，然后编译：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="browserify main.js > bundle.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">browserify</span> <span class="hljs-selector-tag">main</span><span class="hljs-selector-class">.js</span> &gt; <span class="hljs-selector-tag">bundle</span><span class="hljs-selector-class">.js</span></code></pre>
<p>你可以把你自己得到的<code>URL</code>去和<a href="https://progapandist.github.io/imgproxy-form/" rel="nofollow noreferrer" target="_blank">这个网站</a>生成的<code>URL</code>做对比，如果完全一致，就说明你的代码配置正确，否则就还是有可能不成功。</p>
<p>这就是这两天来的结果。我学到了不少东西，你学到了吗？</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
用imgproxy自动缩放图片

## 原文链接
[https://segmentfault.com/a/1190000011769042](https://segmentfault.com/a/1190000011769042)

