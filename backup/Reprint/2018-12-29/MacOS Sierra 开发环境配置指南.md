---
title: 'MacOS Sierra 开发环境配置指南' 
date: 2018-12-29 2:30:10
hidden: true
slug: mrkjrjf04f
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>本文来自于我自己配置两台 macOS 开发环境的过程，主要记录一些常用的配置技巧</p></blockquote>
<h2>系统设置</h2>
<h3>更改计算机名称</h3>
<p>macOS 默认的计算机名称「xx的xx」，我一般会把这个名字改成英文，在命令行中看起来会漂亮一点。修改 <code>系统设置-共享-电脑名称</code> 即可</p>
<p><a href="https://img20.360buyimg.com/devfe/jfs/t9919/194/838196844/87087/80259170/59d8e3f4N4277172a.png" rel="nofollow noreferrer"><span class="img-wrap"><img data-src="/img/remote/1460000011473497?w=780&amp;h=643" src="https://static.alili.tech/img/remote/1460000011473497?w=780&amp;h=643" alt="computer-name" title="computer-name"></span></a></p>
<h3>触控板</h3>
<ul>
<li>设置轻点触控板为鼠标点击</li>
<li>设置三指拖动</li>
</ul>
<p><a href="https://img13.360buyimg.com/devfe/jfs/t10129/124/847447368/253995/96574062/59d8e534Nc3e40d9f.png" rel="nofollow noreferrer"><span class="img-wrap"><img data-src="/img/remote/1460000011473498?w=780&amp;h=627" src="https://static.alili.tech/img/remote/1460000011473498?w=780&amp;h=627" alt="tap-click" title="tap-click"></span></a><br><a href="https://img10.360buyimg.com/devfe/jfs/t10396/219/830021333/98488/bcc6e984/59d8e43cN04d84771.png" rel="nofollow noreferrer"><span class="img-wrap"><img data-src="/img/remote/1460000011473499?w=780&amp;h=544" src="https://static.alili.tech/img/remote/1460000011473499?w=780&amp;h=544" alt="drag-drop" title="drag-drop"></span></a></p>
<h3>Finder</h3>
<ul>
<li>开启新 Fidder 窗口时打开 <code>桌面</code>
</li>
<li>执行搜索时 <code>搜索当前文件夹</code>
</li>
<li>显示所有文件扩展名</li>
</ul>
<p><a href="https://img11.360buyimg.com/devfe/jfs/t9571/278/833569016/71935/221e5956/59d8e45dN67661921.png" rel="nofollow noreferrer"><span class="img-wrap"><img data-src="/img/remote/1460000011473500?w=387&amp;h=428" src="https://static.alili.tech/img/remote/1460000011473500?w=387&amp;h=428" alt="finder" title="finder"></span></a></p>
<h3>其它</h3>
<ul>
<li>
<code>系统偏好设置-键盘-输入法-自动切换到文稿输入法</code> 应用切换的时候会保持原来的输入法不变</li>
<li>
<code>桌面空白处右键-排序方式-贴紧网格</code> 右键整理图标的时候就会按网格排列</li>
</ul>
<h2>开发环境设置</h2>
<h3>安装 Command line tools</h3>
<p>方便后续编译安装其它应用</p>
<p><a href="https://img13.360buyimg.com/devfe/jfs/t9601/44/840280004/58067/a2e0aa5e/59d8e496N2cdf9cca.png" rel="nofollow noreferrer"><span class="img-wrap"><img data-src="/img/remote/1460000011473501?w=573&amp;h=288" src="https://static.alili.tech/img/remote/1460000011473501?w=573&amp;h=288" alt="xcode-select" title="xcode-select"></span></a></p>
<pre><code class="bash">xcode-select --install</code></pre>
<h3>安装 brew</h3>
<p>一般命令行的工具，或者开发环境包都用 <a href="https://brew.sh/" rel="nofollow noreferrer">brew</a> 来安装。GUI 的应用直接去网站下载安装包即可，App Store 我一般用来购买安装一些收费软件</p>
<p>打开命令行执行下面的命令来安装 brew</p>
<pre><code class="bash">/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"</code></pre>
<p>使用下面的命令替换 brew 源为<a href="https://lug.ustc.edu.cn/wiki/mirrors/help/brew.git" rel="nofollow noreferrer">中科大镜像</a></p>
<pre><code class="bash"># 替换brew.git:
cd "$(brew --repo)"
git remote set-url origin https://mirrors.ustc.edu.cn/brew.git

# 替换homebrew-core.git:
cd "$(brew --repo)/Library/Taps/homebrew/homebrew-core"
git remote set-url origin https://mirrors.ustc.edu.cn/homebrew-core.git</code></pre>
<p>由于 brew 安装下载源码包有时是用 curl 的，所以可以配置下 curl 来走 <em>番习习墙</em> 代理，我一般在配置文件中设置 <code>vim ~/.curlrc</code></p>
<pre><code class="bash">socks5 = "127.0.0.1:1080"</code></pre>
<h3>安装 Zsh &amp; oh-my-zsh</h3>
<p>Zsh 是一种 <a href="https://zh.wikipedia.org/wiki/Unix_shell" rel="nofollow noreferrer">shell</a>，功能和 bash, csh 一样，用来和操作系统交互</p>
<pre><code class="bash"># 安装 zsh
brew install zsh
# 安装 oh-my-zsh 插件
# 更换默认 shell 为 zsh
chsh -s /bin/zsh
sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"</code></pre>
<p>安装成功的话会有下面的提示</p>
<p><a href="https://img13.360buyimg.com/devfe/jfs/t10303/164/828630186/232717/e8624f08/59d8e4d7N2c9b44f6.png" rel="nofollow noreferrer"><span class="img-wrap"><img data-src="/img/remote/1460000011473502?w=781&amp;h=501" src="https://static.alili.tech/img/remote/1460000011473502?w=781&amp;h=501" alt="ohmyzsh" title="ohmyzsh"></span></a></p>
<p>安装自动补全提示插件 <a href="https://github.com/zsh-users/zsh-autosuggestions" rel="nofollow noreferrer">zsh-autosuggestions</a></p>
<pre><code class="bash">git clone git://github.com/zsh-users/zsh-autosuggestions ~/.zsh/zsh-autosuggestions
source ~/.zsh/zsh-autosuggestions/zsh-autosuggestions.zsh</code></pre>
<p><a href="https://img30.360buyimg.com/devfe/jfs/t10564/347/828202786/16788/8bd58613/59d8e50cN2ef8aa62.gif" rel="nofollow noreferrer"><span class="img-wrap"><img data-src="/img/remote/1460000011473503?w=736&amp;h=180" src="https://static.alili.tech/img/remote/1460000011473503?w=736&amp;h=180" alt="zsh-autosuggestions" title="zsh-autosuggestions"></span></a></p>
<h3>安装/配置 iTerm2</h3>
<p><a href="https://www.iterm2.com/" rel="nofollow noreferrer">下载</a> 并安装，打开 Preferences 偏好设置</p>
<ul>
<li>
<code>General</code> 关闭 <code>Native full screen windows</code> 我不使用系统的全屏（因为有过渡动画），是为了使用全局快捷键 <strong>立即</strong> 调出命令行</li>
<li>
<code>Profiles-Window-Transparency</code> 设置透明度 10%~20% 即可，太高会和桌面背景冲突。如果需要临时禁用透明度可以使用快捷键 <code>⌘+u</code>
</li>
<li>
<code>Keys-Hotkey</code> 设置全局显示隐藏快捷键 系统级别的快捷键设置为 <code>⌘+\</code>
</li>
</ul>
<blockquote><p>最佳实践，启动 iTerm2 后按 <code>⌘+enter</code> 全屏，然后 <code>⌘+\</code> 隐藏它，这时候就可以做别的事情去了。任何时间想再用 iTerm2 只需要按 <code>⌘+\</code> 即可</p></blockquote>
<h3>brew 常用工具</h3>
<p>下面这些都是用 brew 安装的，即 <code>brew install xxx</code></p>
<h4>htop</h4>
<p>用来查看当前运行的程序，top 命令的升级版</p>
<p><a href="https://img11.360buyimg.com/devfe/jfs/t10783/119/847515894/438295/9e4709ce/59d8e566N62c288f9.png" rel="nofollow noreferrer"><span class="img-wrap"><img data-src="/img/remote/1460000011473504?w=1920&amp;h=1080" src="https://static.alili.tech/img/remote/1460000011473504?w=1920&amp;h=1080" alt="htop" title="htop"></span></a></p>
<h4>tree</h4>
<p>显示文件为树形菜单</p>
<pre><code class="bash">➜  keelii.github.io tree . -L 2
.
├── config.toml
├── content
│&nbsp;&nbsp; ├── about
│&nbsp;&nbsp; └── archives
├── deploy.sh
├── public
│&nbsp;&nbsp; ├── 2016
...
│&nbsp;&nbsp; └── tags
└── themes
    └── octo-enhance

17 directories, 8 files</code></pre>
<h4>httpie</h4>
<p>使用比 curl 简单多了，而且还有一些代码高亮的效果</p>
<p><a href="https://img13.360buyimg.com/devfe/jfs/t9175/233/2384082355/52554/472f733/59d8e58fN956a159a.png" rel="nofollow noreferrer"><span class="img-wrap"><img data-src="/img/remote/1460000011473505?w=405&amp;h=405" src="https://static.alili.tech/img/remote/1460000011473505?w=405&amp;h=405" alt="httpie" title="httpie"></span></a></p>
<h4>vim</h4>
<p>安装 vim 添加一些默认的模块和编程语言支持 cscope, lua, python 并且覆盖系统默认的 vim</p>
<pre><code class="bash">brew install vim --HEAD --with-cscope --with-lua --with-override-system-vim --with-luajit --with-python</code></pre>
<p>安装 vim-plug</p>
<pre><code class="bash">curl -fLo ~/.vim/autoload/plug.vim --create-dirs https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim</code></pre>
<h4>autojump</h4>
<p>方便在命令行中快速跳转目录，安装后程序会读取你 cd 过的目录并存起来，方便后面用快捷方式调用，支持模糊匹配。<strong>注意: autojump 只会记录安装后使用 cd 命令进入过的目录</strong></p>
<p><a href="//img10.360buyimg.com/devfe/jfs/t10066/212/961703883/22512/ed0565/59dae741N3fcc655c.gif" rel="nofollow noreferrer"><span class="img-wrap"><img data-src="/img/remote/1460000011473506?w=849&amp;h=300" src="https://static.alili.tech/img/remote/1460000011473506?w=849&amp;h=300" alt="autojump" title="autojump"></span></a></p>
<h4>yarn</h4>
<p>npm 的替代品，Production Ready。如果系统中安装过 node，就使用 <code>yarn --without-node</code> 命令只安装 yarn 工具</p>
<h3>安装 python pip</h3>
<p>下载 <a href="https://bootstrap.pypa.io/get-pip.py" rel="nofollow noreferrer">get-pip.py</a> 在命令行中使用 python 运行这个文件</p>
<pre><code class="bash">sudo python get-pip.py</code></pre>
<h3>更改各种程序语言包源</h3>
<h4>ruby - .gemrc</h4>
<pre><code class="bash">gem sources --add https://mirrors.tuna.tsinghua.edu.cn/rubygems/ --remove https://rubygems.org/
gem sources -l</code></pre>
<pre><code class="bash">cat ~/.gemrc
---
:backtrace: false
:bulk_threshold: 1000
:sources:
- https://mirrors.tuna.tsinghua.edu.cn/rubygems/
:update_sources: true
:verbose: true</code></pre>
<h4>node - .yarnrc/.npmrc</h4>
<pre><code class="bash">cat ~/.yarnrc
registry "https://registry.npm.taobao.org"
disturl "https://npm.taobao.org/dist"
electron_mirror "http://cdn.npm.taobao.org/dist/electron/"
node_inspector_cdnurl "https://npm.taobao.org/mirrors/node-inspector"
sass_binary_site "http://cdn.npm.taobao.org/dist/node-sass"</code></pre>
<h3>dotfiles 配置文件</h3>
<p>可以参照我的 <a href="https://github.com/keelii/dotfiles" rel="nofollow noreferrer">dotfiles</a> 配置文件</p>
<h3>其它 GUI 应用</h3>
<ul>
<li>
<a href="https://theunarchiver.com/" rel="nofollow noreferrer">The Unarchiver</a> ⇒ 解压工具</li>
<li>
<a href="https://itunes.apple.com/cn/app/magnet/id441258766?mt=12" rel="nofollow noreferrer">Magent</a> ⇒ 排列窗口</li>
<li>
<a href="https://www.mowglii.com/itsycal/" rel="nofollow noreferrer">Itsycal</a> ⇒ 简洁版日历</li>
<li>
<a href="http://snip.qq.com/" rel="nofollow noreferrer">Snip</a> ⇒ 屏幕截图</li>
<li>
<a href="http://snappy-app.com/" rel="nofollow noreferrer">Snappy</a> ⇒ 屏幕截图、修改分享</li>
<li>
<a href="https://pqrs.org/osx/karabiner/" rel="nofollow noreferrer">Karabiner-Elements</a> ⇒ 改键器, 改键方案参照<a href="/2017/10/03/how-to-map-single-command-key-on-mac/">上篇</a>
</li>
<li>
<a href="https://freemacsoft.net/appcleaner/" rel="nofollow noreferrer">AppCleaner 2</a> ⇒ 卸载应用</li>
<li>
<a href="https://www.cockos.com/licecap/" rel="nofollow noreferrer">licecap for mac</a> ⇒ 录制 gif 图片</li>
<li>
<a href="http://zipzapmac.com/go2shell" rel="nofollow noreferrer">Go2shell</a> ⇒ Finder 当前目录打开命令行</li>
</ul>
<p>博客同步更新：<a href="https://keelii.github.io/2017/10/07/macos-development-setup-guide/" rel="nofollow noreferrer">MacOS Sierra 开发环境配置指南</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
MacOS Sierra 开发环境配置指南

## 原文链接
[https://segmentfault.com/a/1190000011473492](https://segmentfault.com/a/1190000011473492)

