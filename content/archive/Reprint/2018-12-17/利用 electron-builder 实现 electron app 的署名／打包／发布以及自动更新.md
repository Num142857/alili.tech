---
title: '利用 electron-builder 实现 electron app 的署名／打包／发布以及自动更新' 
date: 2018-12-17 2:30:07
hidden: true
slug: ye6ktjneh6n
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>笔者系 electron-builder 贡献者之一（#12）</blockquote>
<h1 id="articleHeader0">electron-builder 是什么</h1>
<p>官方解释如下：</p>
<blockquote>A complete solution to package and build a ready for distribution Electron app with “auto update” support out of the box</blockquote>
<p>简单来说，electron-builder 就是一个可以将 electron app 打包成安装器 (installer)，以及可以为 electron app 提供自动更新功能的全家桶。</p>
<p>接下来分别介绍 electron-builder 的两大功能：署名/打包/发布 和 自动更新</p>
<h1 id="articleHeader1">署名/打包/发布流程</h1>
<p>想要将开发完成的 app 署名打包成安装器 (installer) 发布出去，需要进行以下几个步骤</p>
<ul>
<li>署名</li>
<li>打包</li>
<li>发布</li>
</ul>
<p>electron-builder 的强大之处在于，以上几个步骤可以一键完成，甚至包括打包成不同平台版本 (etc. macOS, windows...)</p>
<p>但是，在让 electron-builder 为我们完成以上步骤之前，它必须知道一系列信息才能进行署名／打包／发布一系列流程。它需要知道的信息有：</p>
<ul>
<li>署名：署名证书在哪里，以及使用署名证书的密码等信息</li>
<li>打包：打包的安装器面向的平台，是 macOS, windows 还是 linux ，以及安装器的格式等等</li>
<li>发布：要将打包好的安装器发布到的服务器，那么就需要和服务器进行链接的验证信息</li>
</ul>
<h2 id="articleHeader2">配置署名环节所需信息</h2>
<blockquote>如果你进行署名打包的机器是 macOS 而且打包的安装器对应的平台也是 macOS 的话，electron-builder 会自动检测你 keychain 里面可用的署名证书然后自动使用，那么就不需要手动配置署名信息了。</blockquote>
<p>要配置署名环节的各种信息，有两种方式（选其一即可，推荐在环境变量方式）</p>
<ul>
<li>在 package.json 里设置</li>
<li>在环境变量中设置</li>
</ul>
<p>在 package.json 里的设置方式</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 对于 windows 平台的安装器
&quot;win&quot;: {
  &quot;target&quot;: [
  {
  &quot;signingHashAlgorithms&quot;: &quot;sha1&quot;,
  &quot;sign&quot;: &quot;********&quot;,
  &quot;certificationFile&quot;: &quot;../../*****&quot;,
  &quot;certificatePassword&quot;: &quot;******&quot;
  }
  ]
},

// 对于 macOS 平台的安装器
&quot;mac&quot;: {
  &quot;identity&quot;: &quot;****&quot; // The name of certificate to use when signing.
  },
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code><span class="hljs-comment">// 对于 windows 平台的安装器</span>
<span class="hljs-string">"win"</span>: {
  <span class="hljs-string">"target"</span>: [
  {
  <span class="hljs-string">"signingHashAlgorithms"</span>: <span class="hljs-string">"sha1"</span>,
  <span class="hljs-string">"sign"</span>: <span class="hljs-string">"********"</span>,
  <span class="hljs-string">"certificationFile"</span>: <span class="hljs-string">"../../*****"</span>,
  <span class="hljs-string">"certificatePassword"</span>: <span class="hljs-string">"******"</span>
  }
  ]
},

<span class="hljs-comment">// 对于 macOS 平台的安装器</span>
<span class="hljs-string">"mac"</span>: {
  <span class="hljs-string">"identity"</span>: <span class="hljs-string">"****"</span> <span class="hljs-comment">// The name of certificate to use when signing.</span>
  },
</code></pre>
<p>在环境变量中配置</p>
<table>
<thead><tr>
<th>Env Name</th>
<th>Description</th>
</tr></thead>
<tbody>
<tr>
<td>CSC_LINK</td>
<td>The HTTPS link (or base64-encoded data, or file:// link, or local path) to certificate (<em>.p12 or </em>.pfx file). Shorthand ~/ is supported (home directory).</td>
</tr>
<tr>
<td>CSC_KEY_PASSWORD</td>
<td>The password to decrypt the certificate given in CSC_LINK.</td>
</tr>
<tr>
<td>CSC_NAME</td>
<td>macOS-only Name of a certificate (to retrieve from login.keychain). Useful on a development machine (not on CI) if you have several identities (otherwise don't specify it).</td>
</tr>
<tr>
<td>CSC_IDENTITY_AUTO_DISCOVERY</td>
<td>true or false. Defaults to true — on a macOS development machine valid and appropriate identity from your keychain will be automatically used.</td>
</tr>
<tr>
<td>CSC_KEYCHAIN</td>
<td>The keychain name. Used if CSC_LINK is not specified. Defaults to system default keychain.</td>
</tr>
</tbody>
</table>
<p>注意：如果你是在 macOS 上打包面向 windows 平台的安装器，必须增加两个不同的环境变量 WIN_CSC_LINK 和 WIN_CSC_KEY_PASSWORD</p>
<h2 id="articleHeader3">配置打包环节所需信息</h2>
<p>所谓打包环节所需信息，就是指定安装器（installer）的一系列配置信息。比如说运行环境，安装器格式，版权信息，安装器命名等等。这些信息都是在 package.json 中配置。比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;win&quot;: {
  &quot;target&quot;: [
  {
  &quot;target&quot;: &quot;nsis&quot;,
  &quot;arch&quot;: [
  &quot;x64&quot;,
  &quot;ia32&quot;
  ],
  ......
  }
  ]
},

&quot;mac&quot;: {
  &quot;category&quot;: &quot;your.app.category.type&quot;,
  &quot;target&quot;: [
  &quot;zip&quot;,
  &quot;dmg&quot;
  ],
  }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-string">"win"</span>: {
  <span class="hljs-string">"target"</span>: [
  {
  <span class="hljs-string">"target"</span>: <span class="hljs-string">"nsis"</span>,
  <span class="hljs-string">"arch"</span>: [
  <span class="hljs-string">"x64"</span>,
  <span class="hljs-string">"ia32"</span>
  ],
  ......
  }
  ]
},

<span class="hljs-string">"mac"</span>: {
  <span class="hljs-string">"category"</span>: <span class="hljs-string">"your.app.category.type"</span>,
  <span class="hljs-string">"target"</span>: [
  <span class="hljs-string">"zip"</span>,
  <span class="hljs-string">"dmg"</span>
  ],
  },</code></pre>
<p>更多详细配置，请参考</p>
<ul>
<li><a href="https://www.electron.build/configuration/mac" rel="nofollow noreferrer" target="_blank">macOS详细配置</a></li>
<li><a href="https://www.electron.build/configuration/win" rel="nofollow noreferrer" target="_blank">Windows详细配置</a></li>
<li><a href="https://www.electron.build/configuration/linux" rel="nofollow noreferrer" target="_blank">Linux详细配置</a></li>
</ul>
<h2 id="articleHeader4">配置发布环节所需信息</h2>
<p>署名，打包完成后的安装器需要上传发布到服务器（比如说S3），那么electron-builder就需要将链接服务器的验证信息（比如账号／密码，或者各种 Token 等等）。</p>
<p>由于发布的服务器种类各异，所以针对不停的服务器，配置的方式不尽相同</p>
<h3 id="articleHeader5">Bintray</h3>
<p>通过<a href="https://bintray.com/" rel="nofollow noreferrer" target="_blank">Bintray</a>发布的话，需要一个 API key，这个API key 可以从用户主页获取到("Edit Your Profile" -&gt; API Key)，将这个 API key 配置到环境变量 BT_TOKEN 即可</p>
<h3 id="articleHeader6">GenericServer</h3>
<p>Generic 方式是针对可以直接上传不需要验证的服务器，无需格外配置信息。</p>
<h3 id="articleHeader7">GithubOptions</h3>
<p>使用GitHub发布服务器的话，也需要一个TOKEN，这个TOKEN可以在GitHub上创建，可以参考<a href="https://github.com/settings/tokens/new" rel="nofollow noreferrer" target="_blank">GitHub Token 创建方法</a>。获取到这个Token之后，将它放到环境变量 GH_TOKEN 中既可。</p>
<h3 id="articleHeader8">S3Options</h3>
<p>如果使用 Amazon S3 作为发布服务器的话，还需要额外安装一个 electron-publisher-s3 模块（可以通过npm 或者 yarn 来安装）</p>
<p>同样的使用 Amazon S3 也需要验证，在 AWS 上获取你的验证信息，获取到你在AWS上的 KEY ID 和 ACCESS＿KEY 之后，然后分别放到环境变量　AWS_ACCESS_KEY_ID 和 AWS_SECRET_ACCESS_KEY 里面。或者你也可以放到 ~/.aws/credentials 里面。</p>
<h3 id="articleHeader9">SpacesOptions</h3>
<p>如果你使用 DigitalOcean Spaces 作为发布服务器的话，获取到 access key 之后，然后在放到环境变量 DO_KEY_ID 和 DO_SECRET_KEY 里面即可</p>
<h2 id="articleHeader10">署名/打包/发布 一键完成</h2>
<p>上面的信息都配置好了的话，运行以下命令</p>
<p><code>$ build --publish</code> </p>
<p>即可一键完成 署名/打包/发布 流程</p>
<p>更多详细信息可以参考官网 <a href="https://www.electron.build/cli" rel="nofollow noreferrer" target="_blank">CLI详细说明</a></p>
<h1 id="articleHeader11">自动更新功能</h1>
<p>electron app 的自动更新方案，可以大概分为以下两种：</p>
<ul>
<li>有更新服务器 (with update server) 的方案</li>
<li>无更新服务器（without update server）的方案</li>
</ul>
<p>electron-updater 就是针对没有更新服务器的情况而生的解决方案。（PS：有更新服务器的解决方案，可以通过electron自带的autoUpdater来实现，具体的解决方案会在文章最后说明，在这里主要讲解electron-builder全家桶的使用方法）</p>
<p>在 electron-builder 中，这个叫做 electron-updater 的模块与 electron-builder 本体不同，它是一个 runtime-dependency ，也就是放在package.json的<code>dependencies</code>里面的一个模块(PS: 而 electron-builder 是放在<code>devDependencies</code>里面的)</p>
<p>electron-updater 功能强大之处在于，它支持多种无服务器自动更新方案。这里的无服务器并不是指的真的没有服务器。具体来说就是在这种方案里没有计算服务器 (eg. EC2)，只有静态文件服务器 (eg. S3)</p>
<p>electron-updater 模块通过检测静态文件服务器上面的最新release版本号，将它与本地版本号进行对比，从而得知是否需要自动更新。</p>
<p>话不多说，我们直接来看代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const electron = require(&quot;electron&quot;);
const updater = require(&quot;electron-updater&quot;);
const autoUpdater = updater.autoUpdater;

autoUpdater.setFeedURL({
  provider: &quot;generic&quot;, // 这里还可以是 github, s3, bintray
  url: &quot;https://gitlab.com/_example_repo_/-/jobs/artifacts/master/raw/dist?job=build&quot;
});

autoUpdater.on('update-available', function (info) {
  console.log('Update available.');
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> electron = <span class="hljs-built_in">require</span>(<span class="hljs-string">"electron"</span>);
<span class="hljs-keyword">const</span> updater = <span class="hljs-built_in">require</span>(<span class="hljs-string">"electron-updater"</span>);
<span class="hljs-keyword">const</span> autoUpdater = updater.autoUpdater;

autoUpdater.setFeedURL({
  <span class="hljs-attr">provider</span>: <span class="hljs-string">"generic"</span>, <span class="hljs-comment">// 这里还可以是 github, s3, bintray</span>
  url: <span class="hljs-string">"https://gitlab.com/_example_repo_/-/jobs/artifacts/master/raw/dist?job=build"</span>
});

autoUpdater.on(<span class="hljs-string">'update-available'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">info</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Update available.'</span>);
});
</code></pre>
<p>仅用两行就完成了最基本的新版本的检测机制，更多详细的API可以参考<a href="https://www.electron.build/auto-update#module_electron-updater" rel="nofollow noreferrer" target="_blank">官方文档</a></p>
<h1 id="articleHeader12">附录：有更新服务器的自动更新方案</h1>
<p>带有更新服务器的自动更新方案主要由 electron 自带的 autoUpdater 和 外部更新服务器组成</p>
<p>常用的第三方服务有</p>
<ul>
<li>
<a href="https://github.com/zeit/hazel" rel="nofollow noreferrer" target="_blank">Hazel</a> - 是一个开源的 update server. 主要利用了 Github 的 release tag 来进行新版本的发布通知。</li>
<li>
<a href="https://github.com/GitbookIO/nuts" rel="nofollow noreferrer" target="_blank">Nuts</a> – 也是一个开源的 update server, 也是利用了 Github 的 release tag 来进行新版本的发布通知。不同的是，它可以将 新版本缓存到本地硬盘，同时还支持 private repo。同时 Heroku 里面提供的 update server 就是 Nuts，在 Heroku 里面可以轻松启动一个 Nuts 服务。</li>
<li>
<a href="https://github.com/ArekSredzki/electron-release-server" rel="nofollow noreferrer" target="_blank">electron-release-server</a> – 提供了一个 dashboard 来监控 release</li>
<li>
<a href="https://github.com/NucleusPowered/Nucleus" rel="nofollow noreferrer" target="_blank">Nucleus</a> - 这是一个由 Atlassian 公司维护的 update server, 它可以同时支持多个 app 和 channel。而且因为是通过静态文件服务器实现的，所以大大减少了计算消耗。</li>
</ul>
<p>大家可以根据自己的需求来选择搭建自己的更新服务器，具体做法可以参考各自的 GitHub 。</p>
<p>而在 app 方面，只需要增加以下代码，就可以实现最基本的更新检测</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
var app = require('app');
var os = require('os');
var autoUpdater = require('auto-updater');

var platform = os.platform() + '_' + os.arch();
var version = app.getVersion();

autoUpdater.setFeedURL('http://download.myapp.com/update/'+platform+'/'+version);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">
<span class="hljs-keyword">var</span> app = <span class="hljs-built_in">require</span>(<span class="hljs-string">'app'</span>);
<span class="hljs-keyword">var</span> os = <span class="hljs-built_in">require</span>(<span class="hljs-string">'os'</span>);
<span class="hljs-keyword">var</span> autoUpdater = <span class="hljs-built_in">require</span>(<span class="hljs-string">'auto-updater'</span>);

<span class="hljs-keyword">var</span> platform = os.platform() + <span class="hljs-string">'_'</span> + os.arch();
<span class="hljs-keyword">var</span> version = app.getVersion();

autoUpdater.setFeedURL(<span class="hljs-string">'http://download.myapp.com/update/'</span>+platform+<span class="hljs-string">'/'</span>+version);
</code></pre>
<p><a href="https://nicholaslee119.github.io/2018/01/11/electronBuilder%E5%85%A8%E5%AE%B6%E6%A1%B6%E4%BD%BF%E7%94%A8%E6%8C%87%E5%8D%97/" rel="nofollow noreferrer" target="_blank">笔者博客</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
利用 electron-builder 实现 electron app 的署名／打包／发布以及自动更新

## 原文链接
[https://segmentfault.com/a/1190000012839354](https://segmentfault.com/a/1190000012839354)

