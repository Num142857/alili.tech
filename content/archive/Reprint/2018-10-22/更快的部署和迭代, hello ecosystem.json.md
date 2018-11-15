---
title: '更快的部署和迭代, hello ecosystem.json'
reprint: true
categories: reprint
abbrlink: 71e9065a
date: 2018-10-22 00:00:00
---

{{% raw %}}

            <p>We announced it at <a href="http://www.nodejsparis.fr/meetups">NodeJS paris meetup</a> (here are the <a href="http://www.slideshare.net/Alexandre-Strzelewicz/keymetrics-pm2">slides</a>) and we did it! For the release of <a href="https://github.com/Unitech/pm2">PM2 0.9.x</a>, a new awesome and simple feature will make your life much easier.</p>
<p>我们从Node.js Mozart，<a href="https://github.com/visionmedia">TJ Holowaychuk</a>嵌入了<a href="https://github.com/visionmedia/deploy">deploy</a> 的修改版本，并且我们还重构了JSON应用程序声明。在内部，它是一个简单的bash脚本，不需要安装任何外部依赖关系。</p>
<p>这是嵌入式部署系统的功能：</p>
<pre><code class="hljs vim">$ pm2 deploy <span class="hljs-symbol">&lt;configuration_file&gt;</span> <span class="hljs-symbol">&lt;environment&gt;</span> <span class="hljs-symbol">&lt;command&gt;</span>

  Command<span class="hljs-variable">s:</span>
    setup                run remote setup commands
    <span class="hljs-keyword">update</span>               <span class="hljs-keyword">update</span> deploy <span class="hljs-keyword">to</span> the latest release
    revert [n]           revert <span class="hljs-keyword">to</span> [n]<span class="hljs-keyword">th</span> <span class="hljs-keyword">last</span> deployment <span class="hljs-built_in">or</span> <span class="hljs-number">1</span>
    curr[ent]            output current release commit
    <span class="hljs-keyword">prev</span>[ious]           output <span class="hljs-keyword">previous</span> release commit
    exec|run <span class="hljs-symbol">&lt;cmd&gt;</span>       <span class="hljs-keyword">execute</span> the given <span class="hljs-symbol">&lt;cmd&gt;</span>
    <span class="hljs-keyword">list</span>                 <span class="hljs-keyword">list</span> <span class="hljs-keyword">previous</span> deploy commits
    [ref]                deploy <span class="hljs-keyword">to</span> [ref], the <span class="hljs-string">"ref"</span> setting, <span class="hljs-built_in">or</span> latest <span class="hljs-keyword">tag</span>

</code></pre>
<p>您可以通过以下方式显示PM2部署帮助：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> pm2 deploy <span class="hljs-built_in">help</span></span>

</code></pre>
<p>不要忘记，这个功能在PM2&gt; 0.9上可用，所以 <a href="https://github.com/Unitech/pm2#how-to-update-pm2">请升级至 PM2</a>.</p>
<h2>ecosystem.json 文件</h2>
<p>现在，默认情况下调用的一个新文件ecosystem.json，该文件将允许您声明您的应用程序/服务以及您想要将代码部署到的不同主机。</p>
<p>您可以通过以下命令生成一个样本ecosystem.json：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> pm2 ecosystem</span>

</code></pre>
<p>这个文件看起来像这样：</p>
<pre><code class="hljs json">{
  <span class="hljs-attr">"apps"</span> : [{
    <span class="hljs-attr">"name"</span>      : <span class="hljs-string">"API"</span>,
    <span class="hljs-attr">"script"</span>    : <span class="hljs-string">"app.js"</span>,
    <span class="hljs-attr">"env"</span>: {
      <span class="hljs-attr">"COMMON_ENV_VAR"</span>: <span class="hljs-string">"true"</span>
    }
    <span class="hljs-string">"env_production"</span>: {
      <span class="hljs-attr">"NODE_ENV"</span>: <span class="hljs-string">"production"</span>,
    }
  },{
    <span class="hljs-attr">"name"</span>      : <span class="hljs-string">"WEB"</span>,
    <span class="hljs-attr">"script"</span>    : <span class="hljs-string">"web.js"</span>
  }],
  <span class="hljs-attr">"deploy"</span> : {
    <span class="hljs-attr">"production"</span> : {
      <span class="hljs-attr">"user"</span> : <span class="hljs-string">"node"</span>,
      <span class="hljs-attr">"host"</span> : <span class="hljs-string">"212.83.163.1"</span>,
      <span class="hljs-attr">"repo"</span> : <span class="hljs-string">"git@github.com:repo.git"</span>,
      <span class="hljs-attr">"ref"</span>  : <span class="hljs-string">"origin/master"</span>,
      <span class="hljs-attr">"path"</span> : <span class="hljs-string">"/var/www/production"</span>,
      <span class="hljs-attr">"post-deploy"</span> : <span class="hljs-string">"pm2 startOrRestart ecosystem.json --env production"</span>
    },
    <span class="hljs-attr">"dev"</span> : {
      <span class="hljs-attr">"user"</span> : <span class="hljs-string">"node"</span>,
      <span class="hljs-attr">"host"</span> : <span class="hljs-string">"212.83.163.1"</span>,
      <span class="hljs-attr">"repo"</span> : <span class="hljs-string">"git@github.com:repo.git"</span>,
      <span class="hljs-attr">"ref"</span>  : <span class="hljs-string">"origin/master"</span>,
      <span class="hljs-attr">"path"</span> : <span class="hljs-string">"/var/www/development"</span>,
      <span class="hljs-attr">"post-deploy"</span> : <span class="hljs-string">"pm2 startOrRestart ecosystem.json --env production"</span>
    }
  }
}

</code></pre>
<p>应用程序部分描述了您要运行的不同应用程序/服务，以及描述应在何处部署代码的部署部分。</p>
<p>正如你所注意到的那样，还有一个env_&lt;ENVIRONMENT&gt;属性指定了专用的环境变量，具体取决于你要部署代码的位置。</p>
<p>与往常一样，您可以通过以下方式在本地启动所有这些服务</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> pm2 start ecosystem.json</span>

</code></pre>
<h3>部署声明</h3>
<p>在每个环境（生产，开发......）中都有一些属性可以像这些配置一样：</p>
<pre><code class="hljs stylus">key /path/to/some<span class="hljs-selector-class">.pem</span>  
user deployer  
host n<span class="hljs-selector-class">.n</span><span class="hljs-selector-class">.n</span><span class="hljs-selector-class">.n</span>  
repo git@github<span class="hljs-selector-class">.com</span>:visionmedia/express<span class="hljs-selector-class">.git</span>  
path /var/www/myapp<span class="hljs-selector-class">.com</span>  
ref origin/master  
pre-deploy ./bin/something  
post-deploy /var/www/myapp.com/update<span class="hljs-selector-class">.sh</span>  

</code></pre>
<p>根据您的需求定制/添加keys。</p>
<blockquote>
<p>重要提示：默认情况下，部署后设置了一些专用于PM2的逻辑。在内部，如果未设置此属性，则之后部署将调用pm2 startOrRestart ecosystem.json(<a href="https://github.com/Unitech/pm2/blob/master/bin/pm2#L142">startOrRestart</a>)</p>
</blockquote>
<h2>配置部署</h2>
<p>在目标服务器上，您必须已经通过以下方式安装了PM2：</p>
<pre><code class="hljs coffeescript">$ <span class="hljs-built_in">npm</span> install pm2@latest -g

</code></pre>
<p>同时PM2能够通过以下方式启动服务器启动：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> pm2 startup ubuntu</span>

</code></pre>
<p>断开远程服务器的连接并确保您的远程服务器具有您的ssh密钥。您可以通过以下方式生成并复制它们</p>
<pre><code class="hljs crmsh">$ ssh-keygen -t rsa
$ ssh-copy-id <span class="hljs-keyword">node</span><span class="hljs-title">@myserver</span>.com

</code></pre>
<p>Once you have generated the ecosystem.json and edited it accordingly to your needs, you're all set and ready to go!</p>
<p>一旦你编辑生成了ecosystem.json，你就已经准备好了。</p>
<h2>安装和部署</h2>
<h3>Setup</h3>
<p><strong>重要提示</strong>：提交您的项目Git存储库上的node_modules文件夹。部署代码以保持所有环境之间的版本一致性时，这是最佳做法。</p>
<p>第一台PM2必须初始化您的远程系统。要做到这一点：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> pm2 deploy &lt;environment_key&gt; setup</span>

</code></pre>
<p>这将根据路径属性创建文件夹注意：默认情况下，PM2将查找本地的ecos.json文件，如果您想要设置另一个文件，请执行$ pm2 deploy &lt;ecosystem_file&gt; &lt;environment_key&gt;设置（例如，您可以使用包.json代替！）</p>
<h3>部署</h3>
<p>现在，PM2必须获取最新版本的应用程序，并启动在应用程序属性下的ecos.json中配置的应用程序。要做到这一点：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> pm2 deploy &lt;environment_key&gt;</span>

</code></pre>
<p>完成！</p>
<h2>其他命令</h2>
<p>使用当前文件夹中的ecosystem.json：</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> Update the code</span>
<span class="hljs-meta">$</span><span class="bash"> pm2 deploy &lt;environment_key&gt; update</span>
<span class="hljs-meta">
#</span><span class="bash"> Revert to [n] th commit</span>
<span class="hljs-meta">$</span><span class="bash"> pm2 deploy &lt;environment_key&gt; revert 1</span>
<span class="hljs-meta">
#</span><span class="bash"> Execute a <span class="hljs-built_in">command</span> on the server</span>
<span class="hljs-meta">$</span><span class="bash"> pm2 deploy production <span class="hljs-built_in">exec</span> <span class="hljs-string">"pm2 restart all"</span></span>

</code></pre>
<h2>结论</h2>
<p>希望这会对你有所帮助！您可能感兴趣的其他一些链接：</p>
<ul>
<li><a href="https://github.com/Unitech/pm2-deploy">PM2中嵌入的pm2-deploy模块</a></li>
<li>关于<a href="https://github.com/Unitech/pm2#deployment">PM2 Readme.md</a>的部署文档 </li>
<li>如果您有任何问题通过<a href="https://github.com/Unitech/pm2/issues?state=open">PM2 Githubissues]</a>告诉我们</li>
</ul>

          
{{% /raw %}}

# 版权声明
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文链接
[https://www.zcfy.cc/article/deploy-and-iterate-faster-hello-ecosystem-json](https://www.zcfy.cc/article/deploy-and-iterate-faster-hello-ecosystem-json)

## 原文标题
更快的部署和迭代, hello ecosystem.json
