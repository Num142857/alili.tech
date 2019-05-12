---
title: '【全栈项目上线（vue+node+mongodb）】07.使用git webhooks 优雅的自动化上线vue项目（巨详细）：）' 
date: 2018-12-27 2:30:12
hidden: true
slug: ohx90dc8dac
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">项目上线</h2>
<h2 id="articleHeader1">github 和 打包上线，感觉比较繁琐</h2>
<blockquote><p>每次更新完代码，手动push 到远程仓库，如果想让服务器的代码也同步的话，需要手动去服务器上面，拉取，编译，把编译后的代码复制需要的路径。</p></blockquote>
<h2 id="articleHeader2">使用git webhooks 完美解决这个问题</h2>
<h2 id="articleHeader3">webhooks 概念</h2>
<h3 id="articleHeader4">打开方式</h3>
<blockquote><p>在你的github项目中 点击 settings  会在左侧webhooks</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/bVXHNm?w=1100&amp;h=366" src="https://static.alili.tech/img/bVXHNm?w=1100&amp;h=366" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<blockquote><p>hook 钩子，想要在git某个生命周期触发一个事件，就是想让程序在我们触发一个git事件的时候，做一些事情。<br>举个列子：当我们把代码 git push origin master  的时候，push成功以后，希望服务器自动把代码拉取，更新，做一些自己希望做的事情。</p></blockquote>
<h2 id="articleHeader5">使用详细指南</h2>
<blockquote><p>下面以 vnshop10 为例子，点击图片的 add webhook 按钮</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/bVXHQI?w=1091&amp;h=380" src="https://static.alili.tech/img/bVXHQI?w=1091&amp;h=380" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader6">点击 addwebhook 后 会出现确认密码</h3>
<p><span class="img-wrap"><img data-src="/img/bVXHQX?w=548&amp;h=542" src="https://static.alili.tech/img/bVXHQX?w=548&amp;h=542" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h3 id="articleHeader7">确认完之后出现以下</h3>
<p><span class="img-wrap"><img data-src="/img/bVXHQ7?w=1120&amp;h=682" src="https://static.alili.tech/img/bVXHQ7?w=1120&amp;h=682" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h4>输入一个payload url</h4>
<blockquote><p>Payload URL   当我们提交代码后，git webhook 会像这个url提交一个post请求</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/bVXHRU?w=620&amp;h=555" src="https://static.alili.tech/img/bVXHRU?w=620&amp;h=555" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h4>选择返回的类型</h4>
<p><span class="img-wrap"><img data-src="/img/bVXHSm?w=305&amp;h=127" src="https://static.alili.tech/img/bVXHSm?w=305&amp;h=127" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>Content type<br>一个是json 类型 （选择json类型）<br>一个是x-wwwl-from-urlencoded 类型</p>
<h4>Secret 输入秘钥，这个和程序里面的秘钥要保持一致</h4>
<p><span class="img-wrap"><img data-src="/img/bVXHSQ?w=503&amp;h=82" src="https://static.alili.tech/img/bVXHSQ?w=503&amp;h=82" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h4>选择触发的事件</h4>
<blockquote><p>Which events would you like to trigger this webhook?</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/bVXHTV?w=1582&amp;h=1562" src="https://static.alili.tech/img/bVXHTV?w=1582&amp;h=1562" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<blockquote><p>我们选择 Just the push event.</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/bVXHUf?w=523&amp;h=299" src="https://static.alili.tech/img/bVXHUf?w=523&amp;h=299" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h3 id="articleHeader8">把deploy的项目克隆下拉</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git clone https://github.com/itguide/deploy-vnshop.git deploy" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code style="word-break: break-word; white-space: initial;">git <span class="hljs-keyword">clone</span> <span class="hljs-title">https</span>://github.com/itguide/deploy-vnshop.git deploy</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVXH0X?w=343&amp;h=508" src="https://static.alili.tech/img/bVXH0X?w=343&amp;h=508" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<blockquote>
<p>需要修改的<br><span class="img-wrap"><img data-src="/img/bVXH1z?w=1280&amp;h=443" src="https://static.alili.tech/img/bVXH1z?w=1280&amp;h=443" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>添加的文件</p>
</blockquote>
<p><span class="img-wrap"><img data-src="/img/bVXH1V?w=1109&amp;h=367" src="https://static.alili.tech/img/bVXH1V?w=1109&amp;h=367" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h4>打开index.js</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const http = require('http')
const shell = require('shelljs')
const createHandler = require('github-webhook-handler')
const handler = createHandler({ path: '/webhook', secret: 'vnshop' })
    // 上面的 secret 保持和 GitHub 后台设置的一致

const port = 9988
const projects = ['vnshop.shudong.wang', 'vnshop', 'deploy', 'deploy-vnshop']

const projectHandler = (event, action) => {
    const project = event.payload.repository.name // 提交的仓库名字
    console.log(project);
    const branch = event.payload.ref
    if (projects.includes(project)) {
        console.log(new Date(), `Received a ${action} event for ${project} to ${branch}`)
        shell.exec(`sh ./projects/${project}.sh`, (code, stdout, stderr) => {
            console.log(new Date(), 'Exit code:', code)
                // console.log(new Date(), 'Program output:', stdout)
            console.log(new Date(), '执行完毕！错误信息：？', stderr)
        })

    }
}

http.createServer((req, res) => {
    handler(req, res, err => {
        res.statusCode = 404
        res.end('no such location')
    })
}).listen(port, () => {
    console.log(new Date(), `Deploy server Run！port at ${port}`)
    shell.exec('echo shell test OK!', (code, stdout, stderr) => {
        // console.log('Exit code:', code)
        // console.log('Program output:', stdout)
        // console.log('Program stderr:', stderr, stderr === '', !!stderr)

    })
})

handler.on('error', err => {
    console.error('Error:', err.message)
})

handler.on('push', event => { projectHandler(event, 'push') })
handler.on('commit_comment', event => { projectHandler(event, 'commit') })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">const</span> http = <span class="hljs-built_in">require</span>(<span class="hljs-string">'http'</span>)
<span class="hljs-keyword">const</span> shell = <span class="hljs-built_in">require</span>(<span class="hljs-string">'shelljs'</span>)
<span class="hljs-keyword">const</span> createHandler = <span class="hljs-built_in">require</span>(<span class="hljs-string">'github-webhook-handler'</span>)
<span class="hljs-keyword">const</span> handler = createHandler({ path: <span class="hljs-string">'/webhook'</span>, secret: <span class="hljs-string">'vnshop'</span> })
    <span class="hljs-comment">// 上面的 secret 保持和 GitHub 后台设置的一致</span>

<span class="hljs-keyword">const</span> port = <span class="hljs-number">9988</span>
<span class="hljs-keyword">const</span> projects = [<span class="hljs-string">'vnshop.shudong.wang'</span>, <span class="hljs-string">'vnshop'</span>, <span class="hljs-string">'deploy'</span>, <span class="hljs-string">'deploy-vnshop'</span>]

<span class="hljs-keyword">const</span> projectHandler = <span class="hljs-function">(<span class="hljs-params">event, action</span>) =&gt;</span> {
    <span class="hljs-keyword">const</span> project = event.payload.repository.name <span class="hljs-comment">// 提交的仓库名字</span>
    <span class="hljs-built_in">console</span>.log(project);
    <span class="hljs-keyword">const</span> branch = event.payload.ref
    <span class="hljs-keyword">if</span> (projects.includes(project)) {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(), <span class="hljs-string">`Received a <span class="hljs-subst">${action}</span> event for <span class="hljs-subst">${project}</span> to <span class="hljs-subst">${branch}</span>`</span>)
        shell.exec(<span class="hljs-string">`sh ./projects/<span class="hljs-subst">${project}</span>.sh`</span>, <span class="hljs-function">(<span class="hljs-params">code, stdout, stderr</span>) =&gt;</span> {
            <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(), <span class="hljs-string">'Exit code:'</span>, code)
                <span class="hljs-comment">// console.log(new Date(), 'Program output:', stdout)</span>
            <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(), <span class="hljs-string">'执行完毕！错误信息：？'</span>, stderr)
        })

    }
}

http.createServer(<span class="hljs-function">(<span class="hljs-params">req, res</span>) =&gt;</span> {
    handler(req, res, <span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
        res.statusCode = <span class="hljs-number">404</span>
        res.end(<span class="hljs-string">'no such location'</span>)
    })
}).listen(port, <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(), <span class="hljs-string">`Deploy server Run！port at <span class="hljs-subst">${port}</span>`</span>)
    shell.exec(<span class="hljs-string">'echo shell test OK!'</span>, <span class="hljs-function">(<span class="hljs-params">code, stdout, stderr</span>) =&gt;</span> {
        <span class="hljs-comment">// console.log('Exit code:', code)</span>
        <span class="hljs-comment">// console.log('Program output:', stdout)</span>
        <span class="hljs-comment">// console.log('Program stderr:', stderr, stderr === '', !!stderr)</span>

    })
})

handler.on(<span class="hljs-string">'error'</span>, <span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.error(<span class="hljs-string">'Error:'</span>, err.message)
})

handler.on(<span class="hljs-string">'push'</span>, <span class="hljs-function"><span class="hljs-params">event</span> =&gt;</span> { projectHandler(event, <span class="hljs-string">'push'</span>) })
handler.on(<span class="hljs-string">'commit_comment'</span>, <span class="hljs-function"><span class="hljs-params">event</span> =&gt;</span> { projectHandler(event, <span class="hljs-string">'commit'</span>) })</code></pre>
<h4>以上代码重点修改</h4>
<p><span class="img-wrap"><img data-src="/img/bVXHV6?w=828&amp;h=68" src="https://static.alili.tech/img/bVXHV6?w=828&amp;h=68" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>path：和git webhooks的payload 保持一致 记得前面加上完整url路径 比如： <a href="http://vx.itnote.cn" rel="nofollow noreferrer" target="_blank">http://vx.itnote.cn</a>:9988/webhook</p>
<p>相当于一个api，每次我们往github 提交事件的时候，github 的webhooks 根据我们设定的事件，然后像这个url提交一个post请求，然后服务器就会根据触发的请求，做一些事情。</p>
<p>secret：和git webhooks的secret 保持一致</p>
<h4>触发的shell 脚本，根据自己的项目业务，编写自己的shell</h4>
<blockquote><p>注意：以下shell 是针对这个教程的项目仅供参考，如果你的项目不符合，请修改自己的shell，<br>我的项目是 vnshop10 所以这个shell文件名字是 vnshop10<br>需要添加的文件<br>vnshop10.sh</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#!/bin/bash
 
WEB_PATH='/home/wwwroot/vnshop/'
WEB_PATH_CLIENT='/home/wwwroot/vnshop/client'
WEB_USER='www'
WEB_USERGROUP='www'
# we can do 
echo &quot;Start deployment vx.itnote.cn&quot;
cd $WEB_PATH
echo &quot;pulling source code...&quot;
# git reset --hard origin/release
# git clean -f
# 把项目拉取到最新
git pull
git checkout master
echo &quot;changing permissions...&quot;
# 切换到client里面
cd $WEB_PATH_CLIENT
# 把vue项目编译
npm run build
chown -R $WEB_USER:$WEB_USERGROUP $WEB_PATH_CLIENT
echo &quot;Finished.&quot;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs bash"><code><span class="hljs-meta">#!/bin/bash
 </span>
WEB_PATH=<span class="hljs-string">'/home/wwwroot/vnshop/'</span>
WEB_PATH_CLIENT=<span class="hljs-string">'/home/wwwroot/vnshop/client'</span>
WEB_USER=<span class="hljs-string">'www'</span>
WEB_USERGROUP=<span class="hljs-string">'www'</span>
<span class="hljs-comment"># we can do </span>
<span class="hljs-built_in">echo</span> <span class="hljs-string">"Start deployment vx.itnote.cn"</span>
<span class="hljs-built_in">cd</span> <span class="hljs-variable">$WEB_PATH</span>
<span class="hljs-built_in">echo</span> <span class="hljs-string">"pulling source code..."</span>
<span class="hljs-comment"># git reset --hard origin/release</span>
<span class="hljs-comment"># git clean -f</span>
<span class="hljs-comment"># 把项目拉取到最新</span>
git pull
git checkout master
<span class="hljs-built_in">echo</span> <span class="hljs-string">"changing permissions..."</span>
<span class="hljs-comment"># 切换到client里面</span>
<span class="hljs-built_in">cd</span> <span class="hljs-variable">$WEB_PATH_CLIENT</span>
<span class="hljs-comment"># 把vue项目编译</span>
npm run build
chown -R <span class="hljs-variable">$WEB_USER</span>:<span class="hljs-variable">$WEB_USERGROUP</span> <span class="hljs-variable">$WEB_PATH_CLIENT</span>
<span class="hljs-built_in">echo</span> <span class="hljs-string">"Finished."</span>
</code></pre>
<h4>以上代码修改完后推送到自己 的仓库</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="检查一下远程仓库是谁的
git remote -v 

更改成自己的仓库
先删除远程的仓库地址
git remote remove origin

添加自己的仓库地址
git remote add origin 自己的仓库地址
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code>检查一下远程仓库是谁的
git remote -v 

更改成自己的仓库
先删除远程的仓库地址
git remote remove origin

添加自己的仓库地址
git remote <span class="hljs-keyword">add</span><span class="bash"> origin 自己的仓库地址
</span></code></pre>
<h4>然后去服务器自己把刚才推送的这个项目克隆下拉</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cd /home/wwwroot

git clone https://github.com/itguide/deploy-vnshop.git

进入到项目里面
cd /home/wwwroot/deploy-vnshop

安装依赖包
cnpm i

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>cd <span class="hljs-regexp">/home/</span>wwwroot

git clone <span class="hljs-string">https:</span><span class="hljs-comment">//github.com/itguide/deploy-vnshop.git</span>

进入到项目里面
cd <span class="hljs-regexp">/home/</span>wwwroot/deploy-vnshop

安装依赖包
cnpm i

</code></pre>
<p>然后启动这个deploy项目</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cd /home/wwwroot/deploy-vnshop

使用pm2 启动，需要提前安装 pm2  npm i -g pm2

pm2 start index.js --name deploy --watch -i max -e ./logs/deploy/error.log -o ./logs/deploy/out.log" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>cd /home/wwwroot/deploy-vnshop

使用pm2 启动，需要提前安装 pm2  npm <span class="hljs-selector-tag">i</span> -g pm2

pm2 start index<span class="hljs-selector-class">.js</span> --name deploy --watch -<span class="hljs-selector-tag">i</span> max -e ./logs/deploy/error<span class="hljs-selector-class">.log</span> -o ./logs/deploy/out.log</code></pre>
<h4>测试接口启动是否成功</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="netstat -anp | grep 9988" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code style="word-break: break-word; white-space: initial;">netstat -anp <span class="hljs-string">| grep 9988</span></code></pre>
<p>可以使用浏览器打开</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="http://vx.itnote.cn:9988/webhook" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code style="word-break: break-word; white-space: initial;"><span class="hljs-symbol">http:</span><span class="hljs-comment">//vx.itnote.cn:9988/webhook</span></code></pre>
<blockquote><p>如果浏览器不可以访问，是阿里云主机的话，需要配置安全组规则</p></blockquote>
<h3 id="articleHeader9">去填写git webhooks 这些配置</h3>
<p><span class="img-wrap"><img data-src="/img/bVXIsQ?w=925&amp;h=687" src="https://static.alili.tech/img/bVXIsQ?w=925&amp;h=687" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>上面的信息，都要和自己填写的保持一致</p>
<h3 id="articleHeader10">填写好点击 add webhook 按钮</h3>
<h3 id="articleHeader11">测试git webhook是否配置成功</h3>
<blockquote><p>生成一个 webhook 点击进去<br> 出现以下情况，表示配置成功</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/bVXIuf?w=777&amp;h=404" src="https://static.alili.tech/img/bVXIuf?w=777&amp;h=404" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVXItJ?w=1582&amp;h=1398" src="https://static.alili.tech/img/bVXItJ?w=1582&amp;h=1398" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader12">测试整个流程是否ok，本地编写代码，push到仓库，检查线上代码是否发生改变。</h3>
<blockquote><p>在本地修改代码，然后提交到master 经过几秒钟漫长的等待，发现线上代码成更改</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/bVXIyK?w=1347&amp;h=623" src="https://static.alili.tech/img/bVXIyK?w=1347&amp;h=623" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVXIy1?w=1558&amp;h=622" src="https://static.alili.tech/img/bVXIy1?w=1558&amp;h=622" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVXIza?w=1452&amp;h=610" src="https://static.alili.tech/img/bVXIza?w=1452&amp;h=610" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h3 id="articleHeader13">大功告成，如果不能帮助到你，请留言</h3>
<h3 id="articleHeader14">如果帮助到你，请点赞，收藏，嘿嘿，也可以打赏哦！</h3>
<h4>欢迎加入前端持续学习</h4>
<p><span class="img-wrap"><img data-src="/img/bVZoaS?w=541&amp;h=741" src="https://static.alili.tech/img/bVZoaS?w=541&amp;h=741" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【全栈项目上线（vue+node+mongodb）】07.使用git webhooks 优雅的自动化上线vue项目（巨详细）：）

## 原文链接
[https://segmentfault.com/a/1190000011808364](https://segmentfault.com/a/1190000011808364)

