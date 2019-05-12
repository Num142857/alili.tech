---
title: '使用fjpublish发布前端项目（基础篇）' 
date: 2018-12-27 2:30:12
hidden: true
slug: cy951xv0r4
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>本系列文章共分为基础篇，安全篇，拓展篇。</p></blockquote>
<h2 id="articleHeader0">前言</h2>
<p>曾几何时，我相信部分Web Developer（包括我）使用的项目发布方式比较传统（使用xftp或者sublime text的插件sftp等），发布方式简单又粗暴，想发布哪个目录就直接上传覆盖...</p>
<p>但是这种方式对于现在的前端项目有些弊端：</p>
<ul>
<li><p>若项目包含webpackgulp等构建工具，则每次发布都需要等待构建完成后再手动上传，效率低；</p></li>
<li><p>若项目为前端的服务端渲染项目，例如vue的服务端渲染，那么项目上传服务器后还得登录服务器重启进程；</p></li>
<li><p>发布时由于选错文件或者选错发布环境导致的上传(＞﹏＜)悲剧，可没有后悔药吃。</p></li>
</ul>
<p>我知道你想告诉我还可以使用git webhook等自动化工具，的确这是一种比较高级的用法，也非常可靠，但是搭建过程对于新手还是比较麻烦的，而且前端还是不太同于服务端，前端项目大多需要构建，那么构建过程究竟放在服务端还是本地，这是一个问题。</p>
<p>我理想中的发布器应该是易于搭建，通过配置文件就能选择发布到不同的环境，敲完一行发布命令就可以去泡杯茶，让它自己完成整个发布流程。</p>
<p>于是，<a href="https://github.com/zczhangchao51/fjpublish/" rel="nofollow noreferrer" target="_blank">fjpublish</a>就诞生了。它是一个不同于git webhook的发布思路，基于nodejs的能力自动化整个发布流程，顺便把git提交一下...</p>
<h2 id="articleHeader1">安装</h2>
<p>如果你已经安装了nodejs (6.0+)，那么只需要一个命令就能完成fjpublish的安装</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install fjpublish -g" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> fjpublish -g</code></pre>
<p>全局安装就可以在任意路径下使用fjpublish这个命令了。<br><strong>注意: fjpublish依赖一份配置文件，默认是fjpublish.config.js，如果不想在版本库中提交服务器安全信息，请千万记得把它加入忽略文件中，如.gitignore</strong></p>
<h2 id="articleHeader2">配置文件结构</h2>
<p>fjpublish命令行默认会读取当前工作目录下的<strong>fjpublish.config.js</strong>文件，该文件返回一个对象，结构如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
    //modules开始
    modules: [{
        name: '测试环境', //标识要发布的环境描述
        env: 'test', //发布环境的唯一标识
        ssh: {
            host: '12.23.345.678', //远程服务器ip
            username: 'root', //登录服务器的用户名
            //rc版本的user选项和userName选项请在未来统一配置为username
            password: '12345678', //登录服务器的密码
        },
        buildCommand: 'build', //要进行构建的命令build => npm run build
        localPath: 'example', //项目中要发布的目录
        remotePath: '/www/example', //项目中要发布到远程服务器的目录
        tag: '123' //标注发布的版本，可不设置
    }, { ... }],
    //modules结束
    nobuild: true, //modules外的字段可用于每一个module继承,这里仅用于举例
    tag: 'v1', //modules外的字段可用于每一个module继承,这里仅用于举例
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">module</span>.exports = {
    <span class="hljs-comment">//modules开始</span>
    modules: [{
        <span class="hljs-attr">name</span>: <span class="hljs-string">'测试环境'</span>, <span class="hljs-comment">//标识要发布的环境描述</span>
        env: <span class="hljs-string">'test'</span>, <span class="hljs-comment">//发布环境的唯一标识</span>
        ssh: {
            <span class="hljs-attr">host</span>: <span class="hljs-string">'12.23.345.678'</span>, <span class="hljs-comment">//远程服务器ip</span>
            username: <span class="hljs-string">'root'</span>, <span class="hljs-comment">//登录服务器的用户名</span>
            <span class="hljs-comment">//rc版本的user选项和userName选项请在未来统一配置为username</span>
            password: <span class="hljs-string">'12345678'</span>, <span class="hljs-comment">//登录服务器的密码</span>
        },
        <span class="hljs-attr">buildCommand</span>: <span class="hljs-string">'build'</span>, <span class="hljs-comment">//要进行构建的命令build =&gt; npm run build</span>
        localPath: <span class="hljs-string">'example'</span>, <span class="hljs-comment">//项目中要发布的目录</span>
        remotePath: <span class="hljs-string">'/www/example'</span>, <span class="hljs-comment">//项目中要发布到远程服务器的目录</span>
        tag: <span class="hljs-string">'123'</span> <span class="hljs-comment">//标注发布的版本，可不设置</span>
    }, { ... }],
    <span class="hljs-comment">//modules结束</span>
    nobuild: <span class="hljs-literal">true</span>, <span class="hljs-comment">//modules外的字段可用于每一个module继承,这里仅用于举例</span>
    tag: <span class="hljs-string">'v1'</span>, <span class="hljs-comment">//modules外的字段可用于每一个module继承,这里仅用于举例</span>
}</code></pre>
<p>以上展示了一个简单的配置，关于使用fjpublish和阅读本文档，还需明白以下几个概念：</p>
<ul>
<li><p>modules数组中每一个对象（也称<strong>module</strong>）代表一个发布环境，在本文档中<strong>module</strong>指在配置文件中任意一个环境配置module</p></li>
<li><p>在本文档中<strong>config</strong>指代module.exports输出的所有字段（包含modules在内）的对象。</p></li>
<li><p><strong>config</strong>中modules字段外的字段在初始后将并入每一个<strong>module</strong>，优先级为<strong>module</strong> &gt; <strong>config</strong>，也可以理解为<strong>module</strong>继承自<strong>config</strong>。</p></li>
<li><p><strong>config</strong>中modules字段外的字段不仅仅为了继承给<strong>module实例</strong>也可以是为了定义某些全局的配置字段。</p></li>
</ul>
<p><strong>听起来好像一头雾水，建议看完例子再重新理解以上内容</strong></p>
<h2 id="articleHeader3">例子</h2>
<p>让我们闲话少说，先上几个例子来了解fjpublish能做什么。</p>
<h3 id="articleHeader4">1. 简单例子</h3>
<p>发布一个项目文件到远程环境，并备份旧文件。</p>
<h4>任务描述</h4>
<ul><li><p>以提示器的方式选择发布到测试环境</p></li></ul>
<h4>配置文件</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 项目根目录下fjpublish.config.js
module.exports = {
    modules: [{
        name: '测试环境',
        env: 'test',
        ssh: {
            host: '192.168.0.xxx',
            username: 'root', //登录服务器的用户名
            //rc版本的user选项和userName选项请在未来统一配置为username
            password: 'xxxxxx',
        },
        buildCommand: 'webpack',
        localPath: 'example',
        remotePath: '/www/manman/test',
    },{
        name: '预发布环境',
        env: 'pre_release',
        //剩余配置参考‘测试环境’
    },{
        name: '正式环境',
        env: 'pre_release',
        //剩余配置参考‘测试环境’
    }]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 项目根目录下fjpublish.config.js</span>
<span class="hljs-built_in">module</span>.exports = {
    <span class="hljs-attr">modules</span>: [{
        <span class="hljs-attr">name</span>: <span class="hljs-string">'测试环境'</span>,
        <span class="hljs-attr">env</span>: <span class="hljs-string">'test'</span>,
        <span class="hljs-attr">ssh</span>: {
            <span class="hljs-attr">host</span>: <span class="hljs-string">'192.168.0.xxx'</span>,
            <span class="hljs-attr">username</span>: <span class="hljs-string">'root'</span>, <span class="hljs-comment">//登录服务器的用户名</span>
            <span class="hljs-comment">//rc版本的user选项和userName选项请在未来统一配置为username</span>
            password: <span class="hljs-string">'xxxxxx'</span>,
        },
        <span class="hljs-attr">buildCommand</span>: <span class="hljs-string">'webpack'</span>,
        <span class="hljs-attr">localPath</span>: <span class="hljs-string">'example'</span>,
        <span class="hljs-attr">remotePath</span>: <span class="hljs-string">'/www/manman/test'</span>,
    },{
        <span class="hljs-attr">name</span>: <span class="hljs-string">'预发布环境'</span>,
        <span class="hljs-attr">env</span>: <span class="hljs-string">'pre_release'</span>,
        <span class="hljs-comment">//剩余配置参考‘测试环境’</span>
    },{
        <span class="hljs-attr">name</span>: <span class="hljs-string">'正式环境'</span>,
        <span class="hljs-attr">env</span>: <span class="hljs-string">'pre_release'</span>,
        <span class="hljs-comment">//剩余配置参考‘测试环境’</span>
    }]
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 项目根目录下package.json
// 用于使用构建命令npm run webpack来调用webpack
...
&quot;scripts&quot;: {
    &quot;webpack&quot;: &quot;webpack --config example/webpack/build/build.js&quot;
},
..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">// 项目根目录下package.json
// 用于使用构建命令npm run webpack来调用webpack
...
<span class="hljs-string">"scripts"</span>: {
    <span class="hljs-attr">"webpack"</span>: <span class="hljs-string">"webpack --config example/webpack/build/build.js"</span>
},
...</code></pre>
<h4>发布命令</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="fjpublish env -s" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs bash"><code style="word-break: break-word; white-space: initial;">fjpublish env <span class="hljs-_">-s</span></code></pre>
<h4>动态图</h4>
<p><span class="img-wrap"><img data-src="https://user-gold-cdn.xitu.io/2017/10/29/80c8180971c076fc21e03905b5d58eb3" src="https://static.alili.techhttps://user-gold-cdn.xitu.io/2017/10/29/80c8180971c076fc21e03905b5d58eb3" alt="" title="" style="cursor: pointer;"></span><br>&lt;center&gt;&lt;font color="#999" size=1&gt;简单例子&lt;/font&gt;&lt;/center&gt;</p>
<h4>更多内容</h4>
<ul>
<li><p>可以使用命令<code>fjpublish env &lt;env&gt; --diff</code>开启差异化发布，每次发布只上传有改动的文件，极大的缩短上传时间。</p></li>
<li><p>对于不需要构建的项目，不需要准备package.json，并在配置文件中设置<code>nobuild</code>选项；</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="nobuild: true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">nobuild: <span class="hljs-literal">true</span></code></pre>
<ul><li><p>对于某次发布临时不需要构建的，请在命令中使用<code>--nobuild</code>选项</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="fjpublish env <env> --nobuild" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code style="word-break: break-word; white-space: initial;">fjpublish <span class="hljs-keyword">env</span> &lt;<span class="hljs-keyword">env</span>&gt; --nobuild</code></pre>
<h3 id="articleHeader5">2. 多目录发布</h3>
<p>有些时候我们的项目需要发布的文件夹不止一个，或者需要忽略某些文件，那么就需要调整发布方式。</p>
<h4>任务描述</h4>
<ul>
<li><p>使用<strong>module</strong>的<code>localPathEntries</code>来发布多个目录；</p></li>
<li><p>使用<strong>module</strong>的<code>localPathIgnore</code>忽略所有txt结尾的文件。</p></li>
</ul>
<h4>项目文件结构</h4>
<p><span class="img-wrap"><img data-src="https://user-gold-cdn.xitu.io/2017/10/29/072a8f7cb13142de9e417127cf0253cd" src="https://static.alili.techhttps://user-gold-cdn.xitu.io/2017/10/29/072a8f7cb13142de9e417127cf0253cd" alt="" title="" style="cursor: pointer;"></span></p>
<h4>配置文件</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 项目根目录下fjpublish.config.js
module.exports = {
    modules: [{
        name: '测试环境',
        env: 'test',
        ssh: {
            host: '192.168.0.xxx',
            username: 'root', //登录服务器的用户名
            //rc版本的user选项和userName选项请在未来统一配置为username
            password: 'xxxxx',
        },
        buildCommand: 'webpack',
        localPathEntries: ['example', 'lib'],
        localPathIgnore: '**/*.txt',
        remotePath: '/www/manman/multiple',
    }],
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 项目根目录下fjpublish.config.js</span>
<span class="hljs-built_in">module</span>.exports = {
    <span class="hljs-attr">modules</span>: [{
        <span class="hljs-attr">name</span>: <span class="hljs-string">'测试环境'</span>,
        <span class="hljs-attr">env</span>: <span class="hljs-string">'test'</span>,
        <span class="hljs-attr">ssh</span>: {
            <span class="hljs-attr">host</span>: <span class="hljs-string">'192.168.0.xxx'</span>,
            <span class="hljs-attr">username</span>: <span class="hljs-string">'root'</span>, <span class="hljs-comment">//登录服务器的用户名</span>
            <span class="hljs-comment">//rc版本的user选项和userName选项请在未来统一配置为username</span>
            password: <span class="hljs-string">'xxxxx'</span>,
        },
        <span class="hljs-attr">buildCommand</span>: <span class="hljs-string">'webpack'</span>,
        <span class="hljs-attr">localPathEntries</span>: [<span class="hljs-string">'example'</span>, <span class="hljs-string">'lib'</span>],
        <span class="hljs-attr">localPathIgnore</span>: <span class="hljs-string">'**/*.txt'</span>,
        <span class="hljs-attr">remotePath</span>: <span class="hljs-string">'/www/manman/multiple'</span>,
    }],
}</code></pre>
<h4>发布命令</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="fjpublish env test" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs bash"><code style="word-break: break-word; white-space: initial;">fjpublish env <span class="hljs-built_in">test</span></code></pre>
<h4>动态图</h4>
<p><span class="img-wrap"><img data-src="https://user-gold-cdn.xitu.io/2017/10/29/9aa47d92c9cf63a1fe65424a128b6cc9" src="https://static.alili.techhttps://user-gold-cdn.xitu.io/2017/10/29/9aa47d92c9cf63a1fe65424a128b6cc9" alt="" title="" style="cursor: pointer;"></span><br>&lt;center&gt;&lt;font color="#999" size=1&gt;多目录发布&lt;/font&gt;&lt;/center&gt;</p>
<h4>更多</h4>
<ul><li><p>如果把配置改一下，那么发布的项目结构将完全不同，那么聪明的你猜猜修改上文配置的<code>localPath</code>和<code>localPathEntries</code>会发生什么吧；</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="...
localPath: 'example/webpack', //当localPathEntries存在时localPath可不填，不填意味着项目根目录
localPathEntries: ['build', 'dist'],
..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">...
localPath: <span class="hljs-string">'example/webpack'</span>, <span class="hljs-comment">//当localPathEntries存在时localPath可不填，不填意味着项目根目录</span>
localPathEntries: [<span class="hljs-string">'build'</span>, <span class="hljs-string">'dist'</span>],
...</code></pre>
<ul><li><p>若项目为多目录发布，则远程目录的备份规则也将变为以这些子目录为备份源。</p></li></ul>
<p><span class="img-wrap"><img data-src="https://user-gold-cdn.xitu.io/2017/10/29/36d49819112439b05c7492b7842187c4" src="https://static.alili.techhttps://user-gold-cdn.xitu.io/2017/10/29/36d49819112439b05c7492b7842187c4" alt="" title="" style="cursor: pointer;"></span></p>
<h3 id="articleHeader6">3. 远程后置命令</h3>
<p>对于需要重启服务的项目，fjpublish也是支持的。</p>
<h4>任务描述</h4>
<ul>
<li><p>使用<strong>module</strong>的配置项<code>postCommands</code>在项目发布后重启pm2进程；</p></li>
<li><p>忽略当次构建过程并提交一次git；</p></li>
<li><p>使用<strong>module</strong>的配置项<code>ssh2shell</code>设置每个远程命令超时时间为20秒。</p></li>
</ul>
<h4>配置文件</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 项目根目录下fjpublish.config.js
module.exports = {
    modules: [{
        name: '测试环境',
        env: 'test',
        ssh: {
            host: '192.168.0.xxx',
            username: 'root', //登录服务器的用户名
            //rc版本的user选项和userName选项请在未来统一配置为username
            password: 'xxxxxx',
        },
        ssh2shell: {
            idleTimeOut: 20000
        },
        postCommands: ['pm2 reload xxx'],
        buildCommand: 'build',
        localPath: 'example',
        remotePath: '/www/manman/test',
    }]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 项目根目录下fjpublish.config.js</span>
<span class="hljs-built_in">module</span>.exports = {
    <span class="hljs-attr">modules</span>: [{
        <span class="hljs-attr">name</span>: <span class="hljs-string">'测试环境'</span>,
        <span class="hljs-attr">env</span>: <span class="hljs-string">'test'</span>,
        <span class="hljs-attr">ssh</span>: {
            <span class="hljs-attr">host</span>: <span class="hljs-string">'192.168.0.xxx'</span>,
            <span class="hljs-attr">username</span>: <span class="hljs-string">'root'</span>, <span class="hljs-comment">//登录服务器的用户名</span>
            <span class="hljs-comment">//rc版本的user选项和userName选项请在未来统一配置为username</span>
            password: <span class="hljs-string">'xxxxxx'</span>,
        },
        <span class="hljs-attr">ssh2shell</span>: {
            <span class="hljs-attr">idleTimeOut</span>: <span class="hljs-number">20000</span>
        },
        <span class="hljs-attr">postCommands</span>: [<span class="hljs-string">'pm2 reload xxx'</span>],
        <span class="hljs-attr">buildCommand</span>: <span class="hljs-string">'build'</span>,
        <span class="hljs-attr">localPath</span>: <span class="hljs-string">'example'</span>,
        <span class="hljs-attr">remotePath</span>: <span class="hljs-string">'/www/manman/test'</span>,
    }]
}</code></pre>
<h4>发布命令</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="fjpublish env test --nobuild --commit '远程后置命令'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dsconfig"><code style="word-break: break-word; white-space: initial;"><span class="hljs-string">fjpublish </span><span class="hljs-string">env </span><span class="hljs-string">test </span><span class="hljs-built_in">--nobuild</span> <span class="hljs-built_in">--commit</span> <span class="hljs-string">'远程后置命令'</span></code></pre>
<h4>动态图</h4>
<p><span class="img-wrap"><img data-src="https://user-gold-cdn.xitu.io/2017/10/29/4d606e2ba8b3b6a1ac3bdae49c46c236" src="https://static.alili.techhttps://user-gold-cdn.xitu.io/2017/10/29/4d606e2ba8b3b6a1ac3bdae49c46c236" alt="" title="" style="cursor: pointer;"></span><br>&lt;center&gt;&lt;font color="#999" size=1&gt;远程后置命令&lt;/font&gt;&lt;/center&gt;</p>
<h3 id="articleHeader7">4.快速还原</h3>
<p>有备份项目的功能那当然得有还原的办法啦。</p>
<h4>任务描述</h4>
<ul><li><p>还原版本预发布环境至<code>tag</code>标记为‘自定义tag的版本’的版本；</p></li></ul>
<h4>配置文件</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 项目根目录下fjpublish.config.js
module.exports = {
    modules: [{
        name: '预发布环境',
        env: 'pre_release',
        ssh: {
            //略
        },
        localPath: 'example',
        remotePath: '/www/zhangchao/pre_release',
    }],
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 项目根目录下fjpublish.config.js</span>
<span class="hljs-built_in">module</span>.exports = {
    <span class="hljs-attr">modules</span>: [{
        <span class="hljs-attr">name</span>: <span class="hljs-string">'预发布环境'</span>,
        <span class="hljs-attr">env</span>: <span class="hljs-string">'pre_release'</span>,
        <span class="hljs-attr">ssh</span>: {
            <span class="hljs-comment">//略</span>
        },
        <span class="hljs-attr">localPath</span>: <span class="hljs-string">'example'</span>,
        <span class="hljs-attr">remotePath</span>: <span class="hljs-string">'/www/zhangchao/pre_release'</span>,
    }],
}</code></pre>
<h4>还原命令</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="fjpublish recover pre_release" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dos"><code style="word-break: break-word; white-space: initial;">fjpublish <span class="hljs-built_in">recover</span> pre_release</code></pre>
<h4>动态图</h4>
<p><span class="img-wrap"><img data-src="https://user-gold-cdn.xitu.io/2017/10/29/cffca278b9eca7c3c1feb2c7b2b39133" src="https://static.alili.techhttps://user-gold-cdn.xitu.io/2017/10/29/cffca278b9eca7c3c1feb2c7b2b39133" alt="" title="" style="cursor: pointer; display: inline;"></span><br>&lt;center&gt;&lt;font color="#999" size=1&gt;快速还原&lt;/font&gt;&lt;/center&gt;</p>
<h4>更多</h4>
<ul>
<li><p>可以使用命令<code>fjpublish recover pre_release -p, --previous</code> 快速还原至上个版本而不需要选择；</p></li>
<li><p>可以使用选项<code>recoverTemplate</code>自定义版本列表模板；</p></li>
<li><p>快速还原一样也会执行<code>postCommands</code>配置的后置命令。</p></li>
</ul>
<h2 id="articleHeader8">结语</h2>
<p>以上的例子描述了<a href="https://github.com/zczhangchao51/fjpublish/" rel="nofollow noreferrer" target="_blank">fjpublish</a>中最基本的功能，fjpublish也有强大拓展能力，感兴趣的童鞋可以直接移步<a href="http://fjpublish.manman.io/" rel="nofollow noreferrer" target="_blank">官方文档</a>了解更多，别忘了在github上给我点个<a href="http://fjpublish.manman.io/" rel="nofollow noreferrer" target="_blank">star</a>哦。</p>
<p>下一期我们将谈论如何使用fjpublish进行安全发布，拜拜∩__∩y。<br>下一期地址：<a href="https://segmentfault.com/a/1190000012060917">使用fjpublish发布前端项目（安全篇）</a></p>
<p>fjpublish官方交流群：608809145</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用fjpublish发布前端项目（基础篇）

## 原文链接
[https://segmentfault.com/a/1190000011769402](https://segmentfault.com/a/1190000011769402)

