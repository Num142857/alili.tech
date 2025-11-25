---
title: 'window环境下搭建vim前端开发环境' 
date: 2018-12-31 2:30:30
hidden: true
slug: ezt32nw2eyh
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">前端 window vim 折腾记</h1>
<p>自从换了一个poker键盘之后，对vim的热情递增，终于找一个时间，静下心来折腾一下vim，在window下使用vim着实蛋疼，不过前端开发要求不高，之前用sublime，vscode其实也没用到什么牛逼的插件，将就着用吧。</p>
<h2 id="articleHeader1">1. 下载gvim与基本配置</h2>
<p>在<a href="https://vim.sourceforge.io/download.php#pc" rel="nofollow noreferrer" target="_blank">gvim</a>下载exe文件，直接在window安装即可</p>
<p>在windows下，vim的配置文件为_vimrc，在所安装的vim的目录下，将_vimrc打开之后，删除里面的内容，之后黏贴一下的配置，重新打开vim即可看到一个比较美观的界面了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="set tags+=~/.vim/tags
syntax enable
syntax on
set cursorline
hi CursorLine  cterm=NONE   ctermbg=darkred ctermfg=white
hi CursorColumn cterm=NONE ctermbg=darkred ctermfg=white
filetype plugin indent on
set t_Co=256
set background=dark  &quot;dark light &quot;can switch it to find which is look pretty
set nocompatible                 &quot;some plugin need it
set hlsearch                     &quot;highlight the search
set incsearch                    &quot;move to fit position after one char input
set nobackup                     &quot;won't produce the backup file when save file
set nowritebackup                &quot;won't produce the backup file when save file
set noswapfile                   &quot;won't use swapfile
set hidden                       &quot;can open other file when a file is not saved
set ruler                        &quot;show ruler at the right bottom
set nowrap                       &quot;disable auto newline
set laststatus=2                 &quot;status bar will show anytime
set updatetime=200               &quot;tagbar response 800ms
set showmatch matchtime=0        &quot;show the other bracket
set wmnu wildmode=longest:full   &quot;when in command mode can use auto complete same as bash
set expandtab tabstop=4          &quot;expand the tab to 4 space
set si ai ci cinkeys-=0# cinoptions=g0,:0   &quot;some indent rules
set shiftwidth=4                 &quot;make the indent 4 length
set softtabstop=4                &quot;backspace can del 4 space
set lcs=eol:$,tab:\|\            &quot;display tab to green line
set backspace=indent,eol,start   &quot;better backspace
set fileencodings=utf-8,cp936    &quot;auto test the file is uft-8 or cp936
set fileformats=unix,dos,mac     &quot;line feed different in different mode
set completeopt=menuone,longest
set relativenumber

set guifont=Consolas:h14 &quot;设置字体
set clipboard=unnamed &quot;使用windows的剪贴板

set foldmethod=syntax &quot;用语法高亮来定义折叠
set foldlevel=100   &quot;启动vim时不要自动折叠代码
set foldcolumn=5    &quot;设置折叠栏的宽度" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code><span class="hljs-keyword">set</span> <span class="hljs-keyword">tags</span>+=~/.<span class="hljs-keyword">vim</span>/<span class="hljs-keyword">tags</span>
<span class="hljs-keyword">syntax</span> enable
<span class="hljs-keyword">syntax</span> <span class="hljs-keyword">on</span>
<span class="hljs-keyword">set</span> cursorline
<span class="hljs-keyword">hi</span> CursorLine  cterm=NONE   ctermbg=darkred ctermfg=white
<span class="hljs-keyword">hi</span> CursorColumn cterm=NONE ctermbg=darkred ctermfg=white
<span class="hljs-keyword">filetype</span> plugin <span class="hljs-built_in">indent</span> <span class="hljs-keyword">on</span>
<span class="hljs-keyword">set</span> t_Co=<span class="hljs-number">256</span>
<span class="hljs-keyword">set</span> background=dark  <span class="hljs-string">"dark light "</span>can switch it <span class="hljs-keyword">to</span> <span class="hljs-keyword">find</span> which <span class="hljs-keyword">is</span> look pretty
<span class="hljs-keyword">set</span> nocompatible                 <span class="hljs-comment">"some plugin need it</span>
<span class="hljs-keyword">set</span> hlsearch                     <span class="hljs-comment">"highlight the search</span>
<span class="hljs-keyword">set</span> incsearch                    <span class="hljs-comment">"move to fit position after one char input</span>
<span class="hljs-keyword">set</span> nobackup                     <span class="hljs-comment">"won't produce the backup file when save file</span>
<span class="hljs-keyword">set</span> nowritebackup                <span class="hljs-comment">"won't produce the backup file when save file</span>
<span class="hljs-keyword">set</span> noswapfile                   <span class="hljs-comment">"won't use swapfile</span>
<span class="hljs-keyword">set</span> hidden                       <span class="hljs-comment">"can open other file when a file is not saved</span>
<span class="hljs-keyword">set</span> ruler                        <span class="hljs-comment">"show ruler at the right bottom</span>
<span class="hljs-keyword">set</span> nowrap                       <span class="hljs-comment">"disable auto newline</span>
<span class="hljs-keyword">set</span> laststatus=<span class="hljs-number">2</span>                 <span class="hljs-comment">"status bar will show anytime</span>
<span class="hljs-keyword">set</span> updatetime=<span class="hljs-number">200</span>               <span class="hljs-comment">"tagbar response 800ms</span>
<span class="hljs-keyword">set</span> showmatch matchtime=<span class="hljs-number">0</span>        <span class="hljs-comment">"show the other bracket</span>
<span class="hljs-keyword">set</span> wmnu wildmode=longes<span class="hljs-variable">t:full</span>   <span class="hljs-comment">"when in command mode can use auto complete same as bash</span>
<span class="hljs-keyword">set</span> expandtab tabstop=<span class="hljs-number">4</span>          <span class="hljs-comment">"expand the tab to 4 space</span>
<span class="hljs-keyword">set</span> si ai ci cinkeys-=<span class="hljs-number">0</span># cinoptions=g0,:<span class="hljs-number">0</span>   <span class="hljs-comment">"some indent rules</span>
<span class="hljs-keyword">set</span> <span class="hljs-built_in">shiftwidth</span>=<span class="hljs-number">4</span>                 <span class="hljs-comment">"make the indent 4 length</span>
<span class="hljs-keyword">set</span> softtabstop=<span class="hljs-number">4</span>                <span class="hljs-comment">"backspace can del 4 space</span>
<span class="hljs-keyword">set</span> <span class="hljs-keyword">lcs</span>=eo<span class="hljs-variable">l:</span>$,<span class="hljs-keyword">ta</span><span class="hljs-variable">b:</span>\|\            <span class="hljs-comment">"display tab to green line</span>
<span class="hljs-keyword">set</span> backspace=<span class="hljs-built_in">indent</span>,eol,start   <span class="hljs-comment">"better backspace</span>
<span class="hljs-keyword">set</span> fileencodings=utf-<span class="hljs-number">8</span>,cp936    <span class="hljs-comment">"auto test the file is uft-8 or cp936</span>
<span class="hljs-keyword">set</span> fileformats=unix,dos,mac     <span class="hljs-comment">"line feed different in different mode</span>
<span class="hljs-keyword">set</span> completeopt=menuone,longest
<span class="hljs-keyword">set</span> relativenumber

<span class="hljs-keyword">set</span> guifont=Consola<span class="hljs-variable">s:h14</span> <span class="hljs-comment">"设置字体</span>
<span class="hljs-keyword">set</span> clipboard=unnamed <span class="hljs-comment">"使用windows的剪贴板</span>

<span class="hljs-keyword">set</span> foldmethod=<span class="hljs-keyword">syntax</span> <span class="hljs-comment">"用语法高亮来定义折叠</span>
<span class="hljs-keyword">set</span> <span class="hljs-built_in">foldlevel</span>=<span class="hljs-number">100</span>   <span class="hljs-comment">"启动vim时不要自动折叠代码</span>
<span class="hljs-keyword">set</span> foldcolumn=<span class="hljs-number">5</span>    <span class="hljs-comment">"设置折叠栏的宽度</span></code></pre>
<h3 id="articleHeader2">1.1 主题推荐</h3>
<p>在此处推荐一个主题<code>gruvbox</code>，安装方法为：</p>
<ol>
<li>下载文件<a href="https://github.com/morhetz/gruvbox/blob/master/colors/gruvbox.vim" rel="nofollow noreferrer" target="_blank">gruvbox</a>，将其命名为gruvbox.vim</li>
<li>将文件拷贝到vim安装目录下的vimfiles -&gt; colors文件夹下</li>
<li>在_vimrc上添加一行配置<code>colorscheme gruvbox</code>, 重启之后即可看到效果</li>
</ol>
<blockquote><p>依此方法类推，在windows下安装主题配色都是这样的方法步骤。</p></blockquote>
<h2 id="articleHeader3">2. 安装Vundle插件管理器</h2>
<p>在windows下安装vundle比较麻烦，分为三步，vundle安装插件的原理依赖于git和curl，因此需要在windows安装这两种工具</p>
<h3 id="articleHeader4">2.1 安装chocolatey</h3>
<p><a href="https://chocolatey.org/" rel="nofollow noreferrer" target="_blank">chocolatey</a>是windows下实用的包管理器，类似于ubuntu下的<code>apt-get</code>，安装步骤如下：</p>
<p>在windows下打开cmd，黏贴以下命令，回车执行，即可安装chocolatey，这里注意要使用管理员权限。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" @&quot;%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe&quot; -NoProfile -InputFormat None -ExecutionPolicy Bypass -Command &quot;iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))&quot; &amp;&amp; SET &quot;PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin&quot; " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mel"><code style="word-break: break-word; white-space: initial;"> @"%SystemRoot%\System32\WindowsPowerShell\v1<span class="hljs-number">.0</span>\powershell.exe<span class="hljs-string">" -NoProfile -InputFormat None -ExecutionPolicy Bypass -Command "</span>iex ((New-Object System.Net.WebClient).DownloadString(<span class="hljs-string">'https://chocolatey.org/install.ps1'</span>))<span class="hljs-string">" &amp;&amp; SET "</span>PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin<span class="hljs-string">" </span></code></pre>
<h3 id="articleHeader5">2.2 安装git和curl</h3>
<p>如果电脑里面有了git或者curl就可以不用重复安装了，利用上一步安装的包管理工具<code>chocolatey</code>，我们只需要在cmd下执行以下命令即可完成git或者curl的安装，非常方便</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="choco install -y git
choco install -y curl" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code>choco <span class="hljs-keyword">install</span> -y git
choco <span class="hljs-keyword">install</span> -y curl</code></pre>
<blockquote><p>这里同样需要管理员权限</p></blockquote>
<h3 id="articleHeader6">2.3 安装Vundle</h3>
<p>完成上面的步骤之后，终于可以安装Vundle，在Vim的安装目录下，找到vimfiles，在该目录下创建bundle文件夹，进入bundler文件夹中，执行以下命令</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git clone https://github.com/gmarik/vundle" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code style="word-break: break-word; white-space: initial;">git <span class="hljs-keyword">clone</span> <span class="hljs-title">https</span>://github.com/gmarik/vundle</code></pre>
<p>clone下来的文件夹为vundle，我们将其重命名为Vundle.vim，有以下的目录结构：</p>
<p>Vim安装目录</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="+--- vimfiles
    +--- bundle
        +--- vundle
            +--- autoload
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code>+<span class="hljs-comment">--- vimfiles</span>
    +<span class="hljs-comment">--- bundle</span>
        +<span class="hljs-comment">--- vundle</span>
            +<span class="hljs-comment">--- autoload</span>
</code></pre>
<h3 id="articleHeader7">2.4 配置vimrc</h3>
<p>首先，添加一个环境变量VIM到windows下，配置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="VIM = VIM的安装目录" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ini"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attr">VIM</span> = VIM的安装目录</code></pre>
<p>之后，配置_vimrc，打开之后，在原有的配置基础上添加</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;插件管理
set rtp+=$VIM/vimfiles/bundle/Vundle.vim/
call vundle#begin()

&quot; 可以在此次安装插件
Plugin 'VundleVim/Vundle.vim'

call vundle#end()
filetype plugin indent on" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code><span class="hljs-comment">"插件管理</span>
<span class="hljs-keyword">set</span> rtp+=$VIM/vimfiles/bundle/Vundle.<span class="hljs-keyword">vim</span>/
<span class="hljs-keyword">call</span> vundle#begin()

<span class="hljs-comment">" 可以在此次安装插件</span>
Plugin <span class="hljs-string">'VundleVim/Vundle.vim'</span>

<span class="hljs-keyword">call</span> vundle#end()
<span class="hljs-keyword">filetype</span> plugin <span class="hljs-built_in">indent</span> <span class="hljs-keyword">on</span></code></pre>
<blockquote><p>配置环境变量的原因是因为通过$VIM变量可以直接找到VIM的安装根目录，注意在windows下路径之间使用/而不是\</p></blockquote>
<p>此时重新打开vim，在normal模式下，运行命令:BundleInstall，可以看到命令成功执行，即表示成功安装vundle</p>
<h3 id="articleHeader8">2.5 Vundle的几点常识</h3>
<p>Vundle安装插件通过配置文件有两种形式</p>
<ol>
<li>在<code>vundle#begin()</code>和<code>vundle#end()</code>之间，配置行<code>Plugin '插件名称'</code>
</li>
<li>直接配置一行<code>Bundle '插件名称'</code>
</li>
</ol>
<p>在normal模式下，运行</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=":PluginInstall" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clojure"><code style="word-break: break-word; white-space: initial;"><span class="hljs-symbol">:PluginInstall</span></code></pre>
<p>或者</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=":BundleInstall" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clojure"><code style="word-break: break-word; white-space: initial;"><span class="hljs-symbol">:BundleInstall</span></code></pre>
<p>都是一样的安装所有的插件</p>
<p>常用命令参考：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=":BundleInstall // 安装插件
:BundleInstall! // 更新插件
:BundleClean // 卸载插件" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-pseudo">:BundleInstall</span> <span class="hljs-comment">// 安装插件</span>
<span class="hljs-selector-pseudo">:BundleInstall</span>! <span class="hljs-comment">// 更新插件</span>
<span class="hljs-selector-pseudo">:BundleClean</span> <span class="hljs-comment">// 卸载插件</span></code></pre>
<h2 id="articleHeader9">3 常用插件与用法</h2>
<blockquote><p>这一部分会不定期更新，用到什么安装什么</p></blockquote>
<p>在windows下安装插件大部分时候需要重新启动vim，很尴尬！</p>
<p>如果想多安装的插件有更多的了解可以自行搜索vim+插件名，一般在github就可以直接搜索到。</p>
<h3 id="articleHeader10">3.1 美观底部状态栏</h3>
<p>安装的插件叫<a href="https://github.com/vim-airline/vim-airline" rel="nofollow noreferrer" target="_blank">vim-airline</a>, 安装步骤如下：</p>
<ol>
<li>
<p>配置_vimrc, 添加以下配置，参考上面vundle安装插件的常识</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Plugin 'vim-airline/vim-airline'
Plugin 'vim-airline/vim-airline-themes'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sml"><code><span class="hljs-type">Plugin</span> <span class="hljs-symbol">'vim</span>-airline/vim-airline'
<span class="hljs-type">Plugin</span> <span class="hljs-symbol">'vim</span>-airline/vim-airline-themes'</code></pre>
</li>
<li>执行:BundleInstall，安装之后重新启动即可</li>
</ol>
<h3 id="articleHeader11">3.2 nerdTree</h3>
<p>边栏文件管理，不用多介绍，直接在配置_vimrc，使用:BundleInstall即可</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Bundle 'scrooloose/nerdtree'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nginx"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">Bundle</span> <span class="hljs-string">'scrooloose/nerdtree'</span></code></pre>
<p>配置快捷键，按F2开关边栏，浏览文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot; nerdTree快捷键映射
let NERDTreeWinPos='left'
let NERDTreeWinSize=30
map <F2> :NERDTreeToggle<CR>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code><span class="hljs-comment">" nerdTree快捷键映射</span>
<span class="hljs-keyword">let</span> NERDTreeWinPos=<span class="hljs-string">'left'</span>
<span class="hljs-keyword">let</span> NERDTreeWinSize=<span class="hljs-number">30</span>
<span class="hljs-keyword">map</span> <span class="hljs-symbol">&lt;F2&gt;</span> :NERDTreeToggle<span class="hljs-symbol">&lt;CR&gt;</span></code></pre>
<h3 id="articleHeader12">3.3 emmet / vim-closetag</h3>
<p>前端开发经常使用到的插件，安装还是配置_vimrc，使用:BundleInstall即可</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Bundle 'mattn/emmet-vim'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nginx"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">Bundle</span> <span class="hljs-string">'mattn/emmet-vim'</span></code></pre>
<p>配置emmet的快捷键ctrl+tab，并且使其只在特定的文件类型下才生效，单独设置tab不科学，经常使用tab进行缩进的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot; 设置emmet快捷
let g:user_emmet_expandabbr_key = '<c-tab>'
let g:user_emmet_settings = {'indentation': '    '}
let g:user_emmet_install_global = 0
autocmd FileType html,css EmmetInstall" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code><span class="hljs-comment">" 设置emmet快捷</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">g:user_emmet_expandabbr_key</span> = <span class="hljs-string">'&lt;c-tab&gt;'</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">g:user_emmet_settings</span> = {<span class="hljs-string">'indentation'</span>: <span class="hljs-string">'    '</span>}
<span class="hljs-keyword">let</span> <span class="hljs-variable">g:user_emmet_install_global</span> = <span class="hljs-number">0</span>
<span class="hljs-keyword">autocmd</span> FileType html,css EmmetInstall</code></pre>
<p>在用不到emmet的时候，可以使用<code>vim-closetag</code>进行自动关闭html、xml标签，在html文件比较大的情况下还是蛮实用的，配置如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Plugin 'alvan/vim-closetag'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nginx"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">Plugin</span> <span class="hljs-string">'alvan/vim-closetag'</span></code></pre>
<h3 id="articleHeader13">3.4 markdown</h3>
<p>安装markdown插件，可以支持markdown的语法，如果需要预览则要安装额外安装其他的插件</p>
<p>配置_vimrc，使用:BundleInstall</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot; markdown插件
Plugin 'godlygeek/tabular'
Plugin 'plasticboy/vim-markdown'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code><span class="hljs-comment">" markdown插件</span>
Plugin <span class="hljs-string">'godlygeek/tabular'</span>
Plugin <span class="hljs-string">'plasticboy/vim-markdown'</span></code></pre>
<h3 id="articleHeader14">3.5 js/css/html/json 格式化</h3>
<p>配置_vimrc，再执行<code>:PluginInstall</code>，注意，需要有npm的支持，即在电脑上安装node环境</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Plugin 'maksimr/vim-jsbeautify'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nginx"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">Plugin</span> <span class="hljs-string">'maksimr/vim-jsbeautify'</span></code></pre>
<p>设置快捷键，配置_vimrc</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="map <c-f> :call JsBeautify()<cr>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">map</span> <span class="hljs-symbol">&lt;c-f&gt;</span> :<span class="hljs-keyword">call</span> JsBeautify()<span class="hljs-symbol">&lt;cr&gt;</span></code></pre>
<p>即可使用ctrl+f的快捷键格式化文件</p>
<h3 id="articleHeader15">3.6 快速打开文件</h3>
<p>在vim中，快速查找并打开该文件，使用ctrlp.vim，配置_vimrc，使用Vundle进行安装即可</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Plugin 'ctrlpvim/ctrlp.vim'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nginx"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">Plugin</span> <span class="hljs-string">'ctrlpvim/ctrlp.vim'</span></code></pre>
<p>配置快捷键，ctrl+p，打开搜索栏，可以浏览当前文件夹的文件，也可以快速打开文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let g:ctrlp_map = '<c-p>'
let g:ctrlp_cmd = 'CtrlP'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code><span class="hljs-keyword">let</span> <span class="hljs-variable">g:ctrlp_map</span> = <span class="hljs-string">'&lt;c-p&gt;'</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">g:ctrlp_cmd</span> = <span class="hljs-string">'CtrlP'</span></code></pre>
<h3 id="articleHeader16">3.7 多窗口</h3>
<p>当分隔多个窗口的时候，即使用<code>:vsp filename</code>指令时，可以插件<code>szw/vim-maximizer</code>，进行窗口的最大最小化，很方便</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Plugin 'szw/vim-maximizer'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nginx"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">Plugin</span> <span class="hljs-string">'szw/vim-maximizer'</span></code></pre>
<p>配置F3为快捷键，配置如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="nnoremap <silent><F3> :MaximizerToggle<CR>
vnoremap <silent><F3> :MaximizerToggle<CR>gv
inoremap <silent><F3> <C-o>:MaximizerToggle<CR>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code><span class="hljs-keyword">nnoremap</span> <span class="hljs-symbol">&lt;silent&gt;</span><span class="hljs-symbol">&lt;F3&gt;</span> :MaximizerToggle<span class="hljs-symbol">&lt;CR&gt;</span>
<span class="hljs-keyword">vnoremap</span> <span class="hljs-symbol">&lt;silent&gt;</span><span class="hljs-symbol">&lt;F3&gt;</span> :MaximizerToggle<span class="hljs-symbol">&lt;CR&gt;</span><span class="hljs-keyword">gv</span>
<span class="hljs-keyword">inoremap</span> <span class="hljs-symbol">&lt;silent&gt;</span><span class="hljs-symbol">&lt;F3&gt;</span> <span class="hljs-symbol">&lt;C-o&gt;</span>:MaximizerToggle<span class="hljs-symbol">&lt;CR&gt;</span></code></pre>
<h3 id="articleHeader17">3.8 全局搜索</h3>
<p>在windows下，全局搜索是一个很麻烦的事情，这里决定使用vim自带的<code>vimgrep</code>，但是这个命令使用起来比较麻烦，因此使用了插件<code>vim-easygrep</code>，同样使用Vundle进行安装</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Plugin 'dkprice/vim-easygrep'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nginx"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">Plugin</span> <span class="hljs-string">'dkprice/vim-easygrep'</span></code></pre>
<p>vim-easygrep有一些默认的快捷键，例如</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<leader>vv 可以在当前目录下全局搜索指针选择的单词" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs apache"><code style="word-break: break-word; white-space: initial;"><span class="hljs-section">&lt;leader&gt;</span><span class="hljs-attribute">vv</span> 可以在当前目录下全局搜索指针选择的单词</code></pre>
<p>例如我们要全局搜索一段字符串<code>str-star</code>，可以在可视模式下通过光标移动选择该字符串，之后按下快捷键 &lt;leader&gt;vv，即完成字符串的搜索，很方便</p>
<p>当然，我们也可以直接进行全局搜索，使用指令</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=":Grep 搜索字符串" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-pseudo">:Grep</span> 搜索字符串</code></pre>
<p>全局替换也可以</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=":Replace [target] [replacement]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clojure"><code style="word-break: break-word; white-space: initial;"><span class="hljs-symbol">:Replace</span> [target] [replacement]</code></pre>
<h3 id="articleHeader18">3.9 注释代码</h3>
<p>实现代码的快速注释，使用的是插件<code>scrooloose/nerdcommenter</code>，配置如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Plugin 'scrooloose/nerdcommenter'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nginx"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">Plugin</span> <span class="hljs-string">'scrooloose/nerdcommenter'</span></code></pre>
<p>有默认的快捷方式：</p>
<ol>
<li>注释当前行：&lt;leader&gt;cc</li>
<li>toggle注释：&lt;leader&gt;c&lt;space&gt;</li>
</ol>
<p>配置了注释时空出一个字符</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let g:NERDSpaceDelims = 1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nix"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">let</span> g:<span class="hljs-attr">NERDSpaceDelims</span> = <span class="hljs-number">1</span></code></pre>
<h3 id="articleHeader19">3.10 javascript库语法高亮</h3>
<p>安装了插件<code>javascript-libraries-syntax.vim</code>，配置如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Bundle 'javascript-libraries-syntax.vim'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nginx"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">Bundle</span> <span class="hljs-string">'javascript-libraries-syntax.vim'</span></code></pre>
<p>安装之后，可以设置识别的js库函数，进行语法高亮</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let g:used_javascript_libs = 'jquery,requirejs'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">let</span> g:used_javascript_libs = <span class="hljs-symbol">'jquery</span>,requirejs'</code></pre>
<h3 id="articleHeader20">3.11 光标的快速移动</h3>
<p>快速移动光标的插件<code>easymotion</code>，安装配置如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Plugin 'easymotion/vim-easymotion'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nginx"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">Plugin</span> <span class="hljs-string">'easymotion/vim-easymotion'</span></code></pre>
<p>开启快速移动的模式 &lt;leader&gt;&lt;leader&gt;w</p>
<p>输入高亮的字母可以调到对应的位置</p>
<h3 id="articleHeader21">3.12 浏览当前打开的文件</h3>
<p>这里使用的插件是<code>jlanzarotta/bufexplorer</code>，依旧是使用vundle进行安装，配置如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Plugin 'jlanzarotta/bufexplorer'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nginx"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">Plugin</span> <span class="hljs-string">'jlanzarotta/bufexplorer'</span></code></pre>
<p>配置快捷键F8，浏览当前打开的文件列表，配置如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="nnoremap <silent><F8> :BufExplorer<CR>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code style="word-break: break-word; white-space: initial;">nnoremap &lt;silent&gt;&lt;F8&gt; <span class="hljs-symbol">:BufExplorer&lt;CR&gt;</span></code></pre>
<blockquote><p>注意要在normal模式下</p></blockquote>
<h2 id="articleHeader22">后续</h2>
<p>欢迎关注<a href="https://github.com/zhangguixu/window-vim" rel="nofollow noreferrer" target="_blank">window-vim</a>，入坑之后继续将会持续更新。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
window环境下搭建vim前端开发环境

## 原文链接
[https://segmentfault.com/a/1190000011212786](https://segmentfault.com/a/1190000011212786)

