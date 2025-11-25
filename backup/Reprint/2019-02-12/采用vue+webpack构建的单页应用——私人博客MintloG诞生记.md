---
title: '采用vue+webpack构建的单页应用——私人博客MintloG诞生记' 
date: 2019-02-12 2:30:12
hidden: true
slug: mbrxacddsm
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">介绍</h2>
<p>项目地址：<a href="https://github.com/jrainlau/MintloG" rel="nofollow noreferrer" target="_blank">https://github.com/jrainlau/MintloG</a> （特别乱，参考就好-_-|||）<br><span class="img-wrap"><img data-src="/img/bVtCvk" src="https://static.alili.tech/img/bVtCvk" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>MintloG是我在五天之内完全由自己开发的私人博客，前端技术方案采用了vue+vue-router+vue-resource+webpack的构建方案，后端技术采用了原生PHP+MySQL。博客完全由ajax实现和后台的通信，后台只提供了一个接口，通过传入不同的参数实现不同的增删改查功能。同时博客通过vue-router实现路由管理，通过路由的切换来切换功能，完全没有页面的刷新和跳转，是百分百的单页应用。</p>
<p>设计的灵感来自清新的薄荷绿，因为最近南方的回南天是在恶心，“清新”是最迫切的需求，所以采用了比较明亮的薄荷绿作为主色调。但是因为我的笔记本是12年买的老机器，屏幕比较差，不同的角度看到的颜色也会不一样，所以这里的薄荷绿具体绿成什么样我并不知道……</p>
<p>下面来看看MintloG到底长什么样——</p>
<h4>首页</h4>
<p><span class="img-wrap"><img data-src="/img/bVtCvj" src="https://static.alili.tech/img/bVtCvj" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>首页主要有三个部分，分别是导航栏、文章列表、分类面板。</p>
<ul>
<li><p>导航栏：左侧为“主页”按钮，可以快速回到首页；中间为MintloG的logo；右侧为编写按钮，点击以后可以切换到编写功能。</p></li>
<li><p>文章列表：点击文章标题可以进入查看文章详情，点击时间或标签可以快速筛选；删除按钮可以直接删除该篇文章。</p></li>
<li><p>分类面板：可以通过输入标题关键字，点击标签或者时间对文章列表进行分类。</p></li>
</ul>
<hr>
<h4>文章详情</h4>
<p><span class="img-wrap"><img data-src="/img/bVtCvT" src="https://static.alili.tech/img/bVtCvT" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br>点击“编辑”以后会进入编辑页面<br><span class="img-wrap"><img data-src="/img/bVtCvU" src="https://static.alili.tech/img/bVtCvU" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br>可以对文章进行修改。</p>
<hr>
<h4>撰写文章</h4>
<p>点击右上角的编写按钮，进入编写页面，左边的输入窗口支持markdown语法，会在右边的窗口实时输出编译后的文字。<br><span class="img-wrap"><img data-src="/img/bVtCv2" src="https://static.alili.tech/img/bVtCv2" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br>提交并提示成功<br><span class="img-wrap"><img data-src="/img/bVtCv3" src="https://static.alili.tech/img/bVtCv3" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br>点击OK以后会跳回首页，看到新写的文章<br><span class="img-wrap"><img data-src="/img/bVtCv9" src="https://static.alili.tech/img/bVtCv9" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<hr>
<h4>查找功能</h4>
<p>可以通过文章的标题、标签、修改时间进行查询<br><span class="img-wrap"><img data-src="/img/bVtCwf" src="https://static.alili.tech/img/bVtCwf" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/bVtCwk" src="https://static.alili.tech/img/bVtCwk" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/bVtCwq" src="https://static.alili.tech/img/bVtCwq" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br>具体可以看地址栏上面的路由有啥不同~</p>
<hr>
<h4>删除功能</h4>
<p>点击删除按钮并确认以后会删除对应文章，重新渲染列表。（此处懒得放图）</p>
<hr>
<h2 id="articleHeader1">后台搭建</h2>
<p>介绍完了MintloG的增删改查功能，我们来看一下后台是如何搭建的。<br>我采用原生PHP编写后台，因为感觉增删改查的功能很简单，就懒得用框架了（其实是不会）。</p>
<p>我在<code>conn_sql.php</code>里面新建了一个类，专门用来链接数据库以及提供操作数据库的功能：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<?php
// 连接数据库（单例模式）
class ConnMySQL {
    protected static $_connect = null;
    protected $dbName;
    protected $dsn;
    protected $pdoObj;

    // 初始化
    private function __construct($host, $user, $pwd, $dbName) {
        try {
            $this->dsn = 'mysql:host='.$host.';dbname='.$dbName;
            $this->pdoObj = new PDO($this->dsn, $user, $pwd);
            $this->pdoObj->query(&quot;set names utf8&quot;);
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }

    // 防止克隆
    private function __clone(){}

    // 返回一个实例化的PDO对象
    public static function makeConnect($host, $user, $pwd, $dbName) {
        if (self::$_connect === null) {
            self::$_connect = new self($host, $user, $pwd, $dbName);
        }
        return self::$_connect;
    }

    // 定义查询方法
    public function query($db, $sqlState = null, $sqlVal=null) {
        if(!$sqlState) {
            $_result = $this->pdoObj->query(&quot;select * from $db&quot;);
        } else {
            $_result = $this->pdoObj->query(&quot;select * from $db where $sqlState like '%&quot;.trim($sqlVal).&quot;%'&quot;);
        }
        return $_result;
    }

    // 定义添加方法
    public function insert($db, $where, $what) {
        $_result = $this->pdoObj->exec(&quot;insert into $db ($where) values ($what)&quot;);
        return $_result;
    }

    // 定义删除方法
    public function delete($db, $where) {
        $_result = $this->pdoObj->exec(&quot;delete from $db where $where&quot;);
        return $_result;
    }

    // 定义更新方法
    public function updata($db, $what, $where) {
        $_result = $this->pdoObj->exec(&quot;update $db set $what where $where&quot;);
        return $_result;
    }

    // 断开和数据库链接
    public function destruct()
    {
        $this->pdoObj = null;
    }
}
?>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="php"><span class="hljs-meta">&lt;?php</span>
<span class="hljs-comment">// 连接数据库（单例模式）</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ConnMySQL</span> </span>{
    <span class="hljs-keyword">protected</span> <span class="hljs-keyword">static</span> $_connect = <span class="hljs-keyword">null</span>;
    <span class="hljs-keyword">protected</span> $dbName;
    <span class="hljs-keyword">protected</span> $dsn;
    <span class="hljs-keyword">protected</span> $pdoObj;

    <span class="hljs-comment">// 初始化</span>
    <span class="hljs-keyword">private</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">__construct</span><span class="hljs-params">($host, $user, $pwd, $dbName)</span> </span>{
        <span class="hljs-keyword">try</span> {
            <span class="hljs-keyword">$this</span>-&gt;dsn = <span class="hljs-string">'mysql:host='</span>.$host.<span class="hljs-string">';dbname='</span>.$dbName;
            <span class="hljs-keyword">$this</span>-&gt;pdoObj = <span class="hljs-keyword">new</span> PDO(<span class="hljs-keyword">$this</span>-&gt;dsn, $user, $pwd);
            <span class="hljs-keyword">$this</span>-&gt;pdoObj-&gt;query(<span class="hljs-string">"set names utf8"</span>);
        } <span class="hljs-keyword">catch</span> (PDOException $e) {
            <span class="hljs-keyword">echo</span> $e-&gt;getMessage();
        }
    }

    <span class="hljs-comment">// 防止克隆</span>
    <span class="hljs-keyword">private</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">__clone</span><span class="hljs-params">()</span></span>{}

    <span class="hljs-comment">// 返回一个实例化的PDO对象</span>
    <span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">makeConnect</span><span class="hljs-params">($host, $user, $pwd, $dbName)</span> </span>{
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">self</span>::$_connect === <span class="hljs-keyword">null</span>) {
            <span class="hljs-keyword">self</span>::$_connect = <span class="hljs-keyword">new</span> <span class="hljs-keyword">self</span>($host, $user, $pwd, $dbName);
        }
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">self</span>::$_connect;
    }

    <span class="hljs-comment">// 定义查询方法</span>
    <span class="hljs-keyword">public</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">query</span><span class="hljs-params">($db, $sqlState = null, $sqlVal=null)</span> </span>{
        <span class="hljs-keyword">if</span>(!$sqlState) {
            $_result = <span class="hljs-keyword">$this</span>-&gt;pdoObj-&gt;query(<span class="hljs-string">"select * from $db"</span>);
        } <span class="hljs-keyword">else</span> {
            $_result = <span class="hljs-keyword">$this</span>-&gt;pdoObj-&gt;query(<span class="hljs-string">"select * from $db where $sqlState like '%"</span>.trim($sqlVal).<span class="hljs-string">"%'"</span>);
        }
        <span class="hljs-keyword">return</span> $_result;
    }

    <span class="hljs-comment">// 定义添加方法</span>
    <span class="hljs-keyword">public</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">insert</span><span class="hljs-params">($db, $where, $what)</span> </span>{
        $_result = <span class="hljs-keyword">$this</span>-&gt;pdoObj-&gt;exec(<span class="hljs-string">"insert into $db ($where) values ($what)"</span>);
        <span class="hljs-keyword">return</span> $_result;
    }

    <span class="hljs-comment">// 定义删除方法</span>
    <span class="hljs-keyword">public</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">delete</span><span class="hljs-params">($db, $where)</span> </span>{
        $_result = <span class="hljs-keyword">$this</span>-&gt;pdoObj-&gt;exec(<span class="hljs-string">"delete from $db where $where"</span>);
        <span class="hljs-keyword">return</span> $_result;
    }

    <span class="hljs-comment">// 定义更新方法</span>
    <span class="hljs-keyword">public</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">updata</span><span class="hljs-params">($db, $what, $where)</span> </span>{
        $_result = <span class="hljs-keyword">$this</span>-&gt;pdoObj-&gt;exec(<span class="hljs-string">"update $db set $what where $where"</span>);
        <span class="hljs-keyword">return</span> $_result;
    }

    <span class="hljs-comment">// 断开和数据库链接</span>
    <span class="hljs-keyword">public</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">destruct</span><span class="hljs-params">()</span>
    </span>{
        <span class="hljs-keyword">$this</span>-&gt;pdoObj = <span class="hljs-keyword">null</span>;
    }
}
<span class="hljs-meta">?&gt;</span></span></code></pre>
<p>难点其实在于“单例模式”应该如何实例化一个PDO吧我猜……然后在<code>option.php</code>文件里面引入上面这个类，并通过获取<code>$_POST[]</code>获取参数并<code>echo</code>相应的返回信息。因为是ajax应用，涉及到跨域的问题，所以我在文件的开头加了这么一句话<code>header("Access-Control-Allow-Origin:*");</code>跨域问题妥妥的解决了。</p>
<p>后台那边搞定了，就通过phpMyAdmin建了一个MySQL数据库，建立了一张表，存放文章的各种信息，博客的基本功能其实就是在这张表上面折腾。<br><span class="img-wrap"><img data-src="/img/bVtCw7" src="https://static.alili.tech/img/bVtCw7" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br>嗯，就是这么随性。</p>
<hr>
<h2 id="articleHeader2">UI设计</h2>
<p>“不懂设计的前端不是好老板”。<br>不懂可以学嘛~<br>所以在边学边做的情况下进行了我的第一次UI设计……所以如果看官觉得MintloG长得丑请直接把砖头砸向我！我会把你们的砖头都捡起来然后拿去卖钱……<br>其实刚设计出来的时候更丑……<br><span class="img-wrap"><img data-src="/img/bVtCys" src="https://static.alili.tech/img/bVtCys" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>一定的UI规范还是有的：统一以<code>15px</code>作为同类元素的间距，<code>30px</code>作为非同类元素的间距。页面的颜色不超过5个，元素通过阴影作为区分。<br>实在是很钟情google的MD风格，所以模仿的痕迹还是相当重哈！虽然不怎么像。<br>因为懒所以没有用css框架也没有做成响应式。</p>
<hr>
<h2 id="articleHeader3">前端构建</h2>
<p>因为打算采用vuejs，所以采用了官方的vue-cli来生成项目，并安装了vue-router，vue-resource作为路由管理和资源请求工具。<br>文件目录如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="--- /MintloG  项目主目录
    |
    --- /bower_component  第三方库
    |
    --- /src
        |
        --- /components  组件*.vue文件夹
        |       |
                --- blog-article.vue  文章详情
                |
                --- blog-head.vue  导航栏
                |
                --- blog-list.vue  文章列表
                |
                --- blog-search.vue  搜索框
                |
                --- blog-tags.vue  标签栏
                |
                --- blog-timeline.vue  时间线
                |
                --- browse-mode.vue  浏览模式父组件
                |
                --- toolbox.vue  编辑页工具栏
                |
                --- write-panel.vue  编辑页
        |
        --- main.js  入口js文件（路由控制）
        |
        --- App.vue  主程序文件
    |
    --- /lib  第三方文件
    |
    --- /image  图片资源
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haml"><code>-<span class="ruby">-- <span class="hljs-regexp">/MintloG  项目主目录
</span></span>    |
    -<span class="ruby"><span class="hljs-regexp">-- /bower</span>_component  第三方库
</span>    |
    -<span class="ruby">-- <span class="hljs-regexp">/src
</span></span>        |
        -<span class="ruby"><span class="hljs-regexp">-- /components</span>  组件*.vue文件夹
</span>        |       |
                -<span class="ruby">-- blog-article.vue  文章详情
</span>                |
                -<span class="ruby">-- blog-head.vue  导航栏
</span>                |
                -<span class="ruby">-- blog-list.vue  文章列表
</span>                |
                -<span class="ruby">-- blog-search.vue  搜索框
</span>                |
                -<span class="ruby">-- blog-tags.vue  标签栏
</span>                |
                -<span class="ruby">-- blog-timeline.vue  时间线
</span>                |
                -<span class="ruby">-- browse-mode.vue  浏览模式父组件
</span>                |
                -<span class="ruby">-- toolbox.vue  编辑页工具栏
</span>                |
                -<span class="ruby">-- write-panel.vue  编辑页
</span>        |
        -<span class="ruby">-- main.js  入口js文件（路由控制）
</span>        |
        -<span class="ruby">-- App.vue  主程序文件
</span>    |
    -<span class="ruby">-- <span class="hljs-regexp">/lib  第三方文件
</span></span>    |
    -<span class="ruby"><span class="hljs-regexp">-- /image</span>  图片资源
</span></code></pre>
<p>可以看到，MintloG是通过不同的组件组合而成，这样符合组件化的思想，以后的维护和修改也会更方便。由于项目比较简单，所以没有使用vuex作为状态管理，而是采用了“子组件——父组件——子组件”的方式实现状态共享，具体实现方式可以参考我的一个demo<a href="https://github.com/jrainlau/vuejs-demo" rel="nofollow noreferrer" target="_blank">https://github.com/jrainlau/vuejs-demo</a></p>
<p>重点部分是<code>main.js</code>文件，它作为入口文件，规定了不同路由的含义：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="router.map({
    '/': {
      component: browseMode,
      subRoutes: {
        '/': {
          component: blogList
        },
        '/details/:artId': {
          component: blogArticle
        }
      }
    },
    '/edit/:mode': {
      component: writePanel
    },
    '/search/tag/:tag': {
      component: browseMode,
      subRoutes: {
        '/': {
          component: blogList
        }
      }
    },
    '/search/time/:time': {
      component: browseMode,
      subRoutes: {
        '/': {
          component: blogList
        }
      }
    },
    '/search/title/:title': {
      component: browseMode,
      subRoutes: {
        '/': {
          component: blogList
        }
      }
    },
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">router</span><span class="hljs-selector-class">.map</span>({
    '/': {
      <span class="hljs-attribute">component</span>: browseMode,
      <span class="hljs-attribute">subRoutes</span>: {
        <span class="hljs-string">'/'</span>: {
          <span class="hljs-attribute">component</span>: blogList
        },
        '/<span class="hljs-selector-tag">details</span>/<span class="hljs-selector-pseudo">:artId'</span>: {
          <span class="hljs-attribute">component</span>: blogArticle
        }
      }
    },
    <span class="hljs-string">'/edit/:mode'</span>: {
      <span class="hljs-attribute">component</span>: writePanel
    },
    '/<span class="hljs-selector-tag">search</span>/<span class="hljs-selector-tag">tag</span>/<span class="hljs-selector-pseudo">:tag'</span>: {
      <span class="hljs-attribute">component</span>: browseMode,
      <span class="hljs-attribute">subRoutes</span>: {
        <span class="hljs-string">'/'</span>: {
          <span class="hljs-attribute">component</span>: blogList
        }
      }
    },
    <span class="hljs-string">'/search/time/:time'</span>: {
      <span class="hljs-attribute">component</span>: browseMode,
      <span class="hljs-attribute">subRoutes</span>: {
        <span class="hljs-string">'/'</span>: {
          <span class="hljs-attribute">component</span>: blogList
        }
      }
    },
    <span class="hljs-string">'/search/title/:title'</span>: {
      <span class="hljs-attribute">component</span>: browseMode,
      <span class="hljs-attribute">subRoutes</span>: {
        <span class="hljs-string">'/'</span>: {
          <span class="hljs-attribute">component</span>: blogList
        }
      }
    },
})</code></pre>
<p>而<code>App.vue</code>则作为父组件：<br><span class="img-wrap"><img data-src="/img/bVtCz9" src="https://static.alili.tech/img/bVtCz9" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br>它加载了<code>blog-head.vue</code>作为导航栏，通过<code>&lt;router-view&gt;</code>切换“浏览模式”和“编辑模式”。</p>
<blockquote>
<ul><li><p>浏览模式<code>browseMode.vue</code><br><span class="img-wrap"><img data-src="/img/bVtCAz" src="https://static.alili.tech/img/bVtCAz" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p></li></ul>
<p>它也有一个<code>&lt;router-view&gt;</code>，用来切换“文章列表”和“文章详情”，也就是<code>blog-list.vue</code>和<code>blog-article.vue</code></p>
</blockquote>
<blockquote>
<ul><li><p>编辑模式<br><span class="img-wrap"><img data-src="/img/bVtCAV" src="https://static.alili.tech/img/bVtCAV" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p></li></ul>
<p>它加载了<code>toolbox.vue</code>作为工具栏，然后可以进行文章的撰写与修改。这个编辑页面复用了我以前的一个项目Markcook，具体可以到这儿去看~<br><a href="https://github.com/jrainlau/markcook" rel="nofollow noreferrer" target="_blank">https://github.com/jrainlau/markcook</a></p>
</blockquote>
<p>比较需要动脑的地方在于路由的嵌套对应组件的切换，以及每一次切换路由所需要进行的状态更新。不过vue-router把这些问题都考虑得很周到，仔细研究官方文档能解决大部分的问题。具体的组件嵌套及组合形式如图：<br><span class="img-wrap"><img data-src="/img/bVtIbG" src="https://static.alili.tech/img/bVtIbG" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>在ajax通信方面，第一次使用vue-resource，感觉比使用jquery相对复杂一点，尤其是配置项，需要全局配置请求体的json格式才能正常发送请求的参数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import VueRouter from 'vue-router'
Vue.use(VueRouter)
Vue.http.options.emulateJSON = true;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gradle"><code><span class="hljs-keyword">import</span> VueRouter <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-router'</span>
Vue.use(VueRouter)
Vue.http.<span class="hljs-keyword">options</span>.emulateJSON = <span class="hljs-keyword">true</span>;</code></pre>
<p>当然付出得多，得到的也多。vue-resource返回的response对象还会带有状态码、状态描述，请求头等等，方便更复杂的使用<br><span class="img-wrap"><img data-src="/img/bVtCCp" src="https://static.alili.tech/img/bVtCCp" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>在内容更新方面，由于是单页应用，不提倡刷新的操作，因为会产生不必要的资源请求而浪费资源，所以通过“重新渲染”的方式实现内容更新。举个例子，在<code>browseMode.vue</code>里我定义了一个<code>getList()</code>方法，用于获取数据：<br><span class="img-wrap"><img data-src="/img/bVtCCE" src="https://static.alili.tech/img/bVtCCE" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br>任何需要“刷新”的时候，我都可以通过<code>this.$emit('getList')</code>来触发这个方法，把内容重新渲染到页面上，实现内容更新的功能。</p>
<hr>
<h2 id="articleHeader4">后记</h2>
<p>写了那么多，总算是把MintloG的诞生给介绍完了，其实主要目的还是作为自己成长的一个记录吧。在一周之内，从完全不懂后台开发到掌握PHP和MySQL的使用，在5天之内完成后台的搭建，UI设计，前端构建，一个MintloG给我的收获远远大于知识的本身，我的毕业设计也终于完成啦！学以致用才是学习最好的方法，继续加油~</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
采用vue+webpack构建的单页应用——私人博客MintloG诞生记

## 原文链接
[https://segmentfault.com/a/1190000004637681](https://segmentfault.com/a/1190000004637681)

