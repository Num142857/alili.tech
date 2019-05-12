---
title: 'Docker 及 GitLab CI 在前端工作流上的实践分享（二）' 
date: 2018-12-29 2:30:10
hidden: true
slug: mg85p03nizo
categories: [reprint]
---

{{< raw >}}

                    
<p><a href="https://segmentfault.com/a/1190000011553744">上一篇</a>讲了 Docker 的使用，这篇同样通过一个简单示例，来讲讲 <a href="https://docs.gitlab.com/ee/ci/README.html" rel="nofollow noreferrer" target="_blank">GitLab CI</a>。</p>
<h3 id="articleHeader0">一、什么是 GitLab CI ？</h3>
<p>gitlab-ci 全称是 gitlab continuous integration，也就是基于 gitlab 的持续集成工具。中心思想是当每一次<br>push到gitlab的时候，都会触发一次脚本执行，然后脚本的内容包括了测试，编译，部署等一系列自定义的内容。<br>高版本的 GitLab 自带了 GitLab CI,所以不需要另外安装。</p>
<h3 id="articleHeader1">二、什么是 GitLab-Runner ？</h3>
<p>GitLab-Runner 是脚本执行的承载者，GitLab-CI 事先注册好 GitLab-Runner，再 push 代码，对应的 Runner 就会执行你所定义的脚本。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011553996?w=1000&amp;h=407" src="https://static.alili.tech/img/remote/1460000011553996?w=1000&amp;h=407" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader2">三、安装 GitLab-Runner</h3>
<p>Gitlab Runner安装方式有两种，一种是直接二进制文件安装，一种是基于docker镜像安装。</p>
<h4>二进制文件安装</h4>
<p>[1] 下载对应操作系统的二进制包，我这里使用的是mac版本，</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="sudo curl --output /usr/local/bin/gitlab-ci-multi-runner https://gitlab-ci-multi-runner-downloads.s3.amazonaws.com/latest/binaries/gitlab-ci-multi-runner-darwin-amd64" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code style="word-break: break-word; white-space: initial;">sudo curl --output <span class="hljs-regexp">/usr/</span>local<span class="hljs-regexp">/bin/gi</span>tlab-ci-multi-runner https:<span class="hljs-regexp">//gi</span>tlab-ci-multi-runner-downloads.s3.amazonaws.com<span class="hljs-regexp">/latest/</span>binaries<span class="hljs-regexp">/gitlab-ci-multi-runner-darwin-amd64</span></code></pre>
<p>[2] 给 gitlab-ci-multi-runner 设置权限</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="sudo chmod +x /usr/local/bin/gitlab-ci-multi-runner" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code style="word-break: break-word; white-space: initial;">sudo chmod +x <span class="hljs-regexp">/usr/</span>local<span class="hljs-regexp">/bin/gi</span>tlab-ci-multi-runner</code></pre>
<p>以上是官方安装文档，如果有问题，可以手动到<a href="https://gitlab-ci-multi-runner-downloads.s3.amazonaws.com/v1.11.2/index.html" rel="nofollow noreferrer" target="_blank">版本下载列表</a>下载对应的版本，然后复制到<code>/usr/local/bin/</code>目录下 ---- <strong><em>反正我是自己下载安装才能用的，泪目 T T</em></strong></p>
<p>[3] 注册runner<br>首先，进入到你的 gitlab 项目网页，找到 Settings -&gt; Pipelines，然后找到对应的 <strong>url</strong> 和 <strong>token</strong><br><span class="img-wrap"><img data-src="/img/remote/1460000011553997?w=1000&amp;h=602" src="https://static.alili.tech/img/remote/1460000011553997?w=1000&amp;h=602" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>然后在终端输入</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="gitlab-ci-multi-runner register" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cpp"><code style="word-break: break-word; white-space: initial;">gitlab-ci-multi-runner <span class="hljs-keyword">register</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011553998?w=800&amp;h=244" src="https://static.alili.tech/img/remote/1460000011553998?w=800&amp;h=244" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>然后刷新你的网页，会看到<br><span class="img-wrap"><img data-src="/img/remote/1460000011553999?w=1000&amp;h=568" src="https://static.alili.tech/img/remote/1460000011553999?w=1000&amp;h=568" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>说明注册成功了。</p>
<p>另外，我们可以通过 <code>gitlab-ci-multi-runner list</code> 查询你注册的runner ，用 <code>gitlab-ci-multi-runner status</code> 查看 runner 服务是否运行中。</p>
<h4>docker镜像安装</h4>
<p>[1] 先获取 gitlab-runner 镜像</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="sudo docker pull gitlab/gitlab-runner:latest" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code style="word-break: break-word; white-space: initial;">sudo docker pull gitlab/gitlab-<span class="hljs-string">runner:</span>latest</code></pre>
<p>[2] 启动 gitlab-runner container</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="sudo docker run -d --name gitlab-runner --restart always \
  -v /srv/gitlab-runner/config:/etc/gitlab-runner \
  -v /var/run/docker.sock:/var/run/docker.sock \
  gitlab/gitlab-runner:latest" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code>sudo docker run -d --name gitlab-runner --restart always \
  -v <span class="hljs-regexp">/srv/gi</span>tlab-runner<span class="hljs-regexp">/config:/</span>etc<span class="hljs-regexp">/gitlab-runner \
  -v /</span>var<span class="hljs-regexp">/run/</span>docker.sock:<span class="hljs-regexp">/var/</span>run<span class="hljs-regexp">/docker.sock \
  gitlab/gi</span>tlab-runner:latest</code></pre>
<p>[3] 注册runner</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="sudo docker exec -it gitlab-runner gitlab-ci-multi-runner register

注册过程略，方式同方式一步骤3." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code><span class="hljs-symbol">sudo</span> docker exec -<span class="hljs-keyword">it </span>gitlab-runner gitlab-ci-<span class="hljs-keyword">multi-runner </span>register

注册过程略，方式同方式一步骤<span class="hljs-number">3</span>.</code></pre>
<h3 id="articleHeader3">四、配置.gitlab-ci.yml</h3>
<p>GitLab CI的一切工作，都是由 .gitlab-ci.yml 来配置的。详细文档可以参考<a href="https://docs.gitlab.com/ee/ci/yaml/README.html" rel="nofollow noreferrer" target="_blank">这里</a></p>
<p>首先，在项目根目录下创建 .gitlab-ci.yml 文件（<strong>编辑完要提交到g itlab 才能生效</strong>）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#定义 stages，用来定义工作阶段，多个 stages 会按顺序进行
stages:
  - build
  - deploy_test
  - deploy_production

# 设置缓存 
cache:
  paths:
    - node_modules/
    - dist/

# 安装依赖 before_script 会在每个 stages 执行之前运行
before_script:
- npm install

# 编译 这里对应上方 stages ，
build:
  stage: build 
  script:    # script 为要执行的命令，可以多条按顺序执行
    - npm run build

# 部署测试服务器 
deploy_test:
  stage: deploy_test
  only:    # only 定义触发分支，即只有在dev分支提交是  才执行以下命令
    - dev
  script:
    - bash scripts/dev.sh


# 部署生产服务器
deploy_production:
  stage: deploy_production
  only:
    - master
  script:
    - bash scripts/deploy.sh
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code><span class="hljs-meta">#定义 stages，用来定义工作阶段，多个 stages 会按顺序进行</span>
<span class="hljs-symbol">stages:</span>
  - build
  - deploy_test
  - deploy_production

<span class="hljs-meta"># 设置缓存 </span>
<span class="hljs-symbol">cache:</span>
<span class="hljs-symbol">  paths:</span>
    - node_modules/
    - dist/

<span class="hljs-meta"># 安装依赖 before_script 会在每个 stages 执行之前运行</span>
<span class="hljs-symbol">before_script:</span>
- npm install

<span class="hljs-meta"># 编译 这里对应上方 stages ，</span>
<span class="hljs-symbol">build:</span>
<span class="hljs-symbol">  stage:</span> build 
<span class="hljs-symbol">  script:</span>    <span class="hljs-meta"># script 为要执行的命令，可以多条按顺序执行</span>
    - npm run build

<span class="hljs-meta"># 部署测试服务器 </span>
<span class="hljs-symbol">deploy_test:</span>
<span class="hljs-symbol">  stage:</span> deploy_test
<span class="hljs-symbol">  only:</span>    <span class="hljs-meta"># only 定义触发分支，即只有在dev分支提交是  才执行以下命令</span>
    - dev
<span class="hljs-symbol">  script:</span>
    - bash scripts/dev.sh


<span class="hljs-meta"># 部署生产服务器</span>
<span class="hljs-symbol">deploy_production:</span>
<span class="hljs-symbol">  stage:</span> deploy_production
<span class="hljs-symbol">  only:</span>
    - master
<span class="hljs-symbol">  script:</span>
    - bash scripts/deploy.sh
</code></pre>
<p>配置完成后，当你在项目 push 代码到 gitlab 的时候，就会触发 gitlab-ci，然后执行你定义的代码。<br>可以在<br><span class="img-wrap"><img data-src="/img/remote/1460000011554000?w=1000&amp;h=420" src="https://static.alili.tech/img/remote/1460000011554000?w=1000&amp;h=420" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>running 表示正在运行，passed 表示通过了。<br>ps:有个容易遇到的坑，当你卡在 pending 不动的时候，可以看看你的 runner 是否设置了 '无 tag 标签也运行'<br>回到你的 runner，点编辑<br><span class="img-wrap"><img data-src="/img/remote/1460000011554001?w=1000&amp;h=171" src="https://static.alili.tech/img/remote/1460000011554001?w=1000&amp;h=171" alt="" title="" style="cursor: pointer;"></span></p>
<p>然后，勾选第二项 <code>Run untagged jobs</code></p>
<p>运行日志可以在这里查看<br><span class="img-wrap"><img data-src="/img/remote/1460000011554002?w=1000&amp;h=746" src="https://static.alili.tech/img/remote/1460000011554002?w=1000&amp;h=746" alt="" title="" style="cursor: pointer;"></span></p>
<p>那么到这，GitLab CI 的基本使用，已经完成啦，赶快去试一下吧 ：）</p>
<p>参考资料：<br><a href="https://docs.gitlab.com/runner/install/osx.html" rel="nofollow noreferrer" target="_blank">gitlab-runner 安装</a><br><a href="https://docs.gitlab.com/ee/ci/yaml/README.html" rel="nofollow noreferrer" target="_blank">gitlab ci yaml 配置</a><br><a href="http://www.jianshu.com/p/df433633816b" rel="nofollow noreferrer" target="_blank">【后端】gitlab之gitlab-ci自动部署</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Docker 及 GitLab CI 在前端工作流上的实践分享（二）

## 原文链接
[https://segmentfault.com/a/1190000011553991](https://segmentfault.com/a/1190000011553991)

