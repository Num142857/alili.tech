---
title: '通过 ncurses 在终端创建一个冒险游戏' 
date: 2019-01-20 2:30:11
hidden: true
slug: qvyggqq77di
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#通过-ncurses-在终端创建一个冒险游戏"></a>通过 ncurses 在终端创建一个冒险游戏</h1>
<p>怎样使用 curses 函数读取键盘并操作屏幕。</p>
<p>我<a href="https://linux.cn/article-9348-1.html">之前的文章</a>介绍了 ncurses 库，并提供了一个简单的程序展示了一些将文本放到屏幕上的 curses 函数。在接下来的文章中，我将介绍如何使用其它的 curses 函数。</p>
<h3><a href="#探险"></a>探险</h3>
<p>当我逐渐长大，家里有了一台苹果 II 电脑。我和我兄弟正是在这台电脑上自学了如何用 AppleSoft BASIC 写程序。我在写了一些数学智力游戏之后，继续创造游戏。作为 80 年代的人，我已经是龙与地下城桌游的粉丝，在游戏中角色扮演一个追求打败怪物并在陌生土地上抢掠的战士或者男巫，所以我创建一个基本的冒险游戏也在情理之中。</p>
<p>AppleSoft BASIC 支持一种简洁的特性：在标准分辨率图形模式（GR 模式）下，你可以检测屏幕上特定点的颜色。这为创建一个冒险游戏提供了捷径。比起创建并更新周期性传送到屏幕的内存地图，我现在可以依赖 GR 模式为我维护地图，我的程序还可以在玩家的角色（LCTT 译注：此处 character 双关一个代表玩家的角色，同时也是一个字符）在屏幕四处移动的时候查询屏幕。通过这种方式，我让电脑完成了大部分艰难的工作。因此，我的自顶向下的冒险游戏使用了块状的 GR 模式图形来展示我的游戏地图。</p>
<p>我的冒险游戏使用了一张简单的地图，上面有一大片绿地伴着山脉从中间蔓延向下和一个在左上方的大湖。我要粗略地为桌游战役绘制这个地图，其中包含一个允许玩家穿过到远处的狭窄通道。</p>
<p><a href="https://camo.githubusercontent.com/ab836f6770700c965ee0f0251572af1fe25fcc5c/687474703a2f2f7777772e6c696e75786a6f75726e616c2e636f6d2f66696c65732f6c696e75786a6f75726e616c2e636f6d2f7566696c65732f696d61676563616368652f6c617267652d35353070782d63656e74657265642f75313030303030392f71756573742d6d61702e6a7067"><img src="http://p0.qhimg.com/t01e69d8580a36d12a9.jpg" alt=""></a></p>
<p><em>图 1. 一个有湖和山的简单桌游地图</em></p>
<p>你可以用 curses 绘制这个地图，并用字符代表草地、山脉和水。接下来，我描述怎样使用 curses 那样做，以及如何在 Linux 终端创建和进行类似的一个冒险游戏。</p>
<h3><a href="#构建程序"></a>构建程序</h3>
<p>在我的上一篇文章，我提到了大多数 curses 程序以相同的一组指令获取终端类型和设置 curses 环境：</p>
<pre><code class="hljs abnf">initscr()<span class="hljs-comment">;</span>
cbreak()<span class="hljs-comment">;</span>
noecho()<span class="hljs-comment">;</span>

</code></pre><p>在这个程序，我添加了另外的语句：</p>
<pre><code class="hljs lisp">keypad(<span class="hljs-name">stdscr</span>, TRUE)<span class="hljs-comment">;</span>

</code></pre><p>这里的 <code>TRUE</code> 标志允许 curses 从用户终端读取小键盘和功能键。如果你想要在你的程序中使用上下左右方向键，你需要使用这里的 <code>keypad(stdscr, TRUE)</code>。</p>
<p>这样做了之后，你现在可以开始在终端屏幕上绘图了。curses 函数包括了一系列在屏幕上绘制文本的方法。在我之前的文章中，我展示了 <code>addch()</code> 和 <code>addstr()</code> 函数以及在添加文本之前先移动到指定屏幕位置的对应函数 <code>mvaddch()</code> 和 <code>mvaddstr()</code>。为了在终端上创建这个冒险游戏的地图，你可以使用另外一组函数：<code>vline()</code> 和 <code>hline()</code>，以及它们对应的函数 <code>mvvline()</code> 和 <code>mvhline()</code>。这些 mv 函数接受屏幕坐标、一个要绘制的字符和要重复此字符的次数的参数。例如，<code>mvhline(1, 2, '-', 20)</code> 将会绘制一条开始于第一行第二列并由 20 个横线组成的线段。</p>
<p>为了以编程方式绘制地图到终端屏幕上，让我们先定义这个 <code>draw_map()</code> 函数：</p>
<pre><code class="hljs cpp"><span class="hljs-meta">#<span class="hljs-meta-keyword">define</span> GRASS     <span class="hljs-meta-string">' '</span></span>
<span class="hljs-meta">#<span class="hljs-meta-keyword">define</span> EMPTY     <span class="hljs-meta-string">'.'</span></span>
<span class="hljs-meta">#<span class="hljs-meta-keyword">define</span> WATER     <span class="hljs-meta-string">'~'</span></span>
<span class="hljs-meta">#<span class="hljs-meta-keyword">define</span> MOUNTAIN  <span class="hljs-meta-string">'^'</span></span>
<span class="hljs-meta">#<span class="hljs-meta-keyword">define</span> PLAYER    <span class="hljs-meta-string">'*'</span></span>

<span class="hljs-function"><span class="hljs-keyword">void</span> <span class="hljs-title">draw_map</span><span class="hljs-params">(<span class="hljs-keyword">void</span>)</span>
</span>{
    <span class="hljs-keyword">int</span> y, x;

    <span class="hljs-comment">/* 绘制探索地图 */</span>

    <span class="hljs-comment">/* 背景 */</span>

    <span class="hljs-keyword">for</span> (y = <span class="hljs-number">0</span>; y &lt; LINES; y++) {
        mvhline(y, <span class="hljs-number">0</span>, GRASS, COLS);
    }

    <span class="hljs-comment">/* 山和山道 */</span>

    <span class="hljs-keyword">for</span> (x = COLS / <span class="hljs-number">2</span>; x &lt; COLS * <span class="hljs-number">3</span> / <span class="hljs-number">4</span>; x++) {
        mvvline(<span class="hljs-number">0</span>, x, MOUNTAIN, LINES);
    }

    mvhline(LINES / <span class="hljs-number">4</span>, <span class="hljs-number">0</span>, GRASS, COLS);

    <span class="hljs-comment">/* 湖 */</span>

    <span class="hljs-keyword">for</span> (y = <span class="hljs-number">1</span>; y &lt; LINES / <span class="hljs-number">2</span>; y++) {
        mvhline(y, <span class="hljs-number">1</span>, WATER, COLS / <span class="hljs-number">3</span>);
    }
}


</code></pre><p>在绘制这副地图时，记住填充大块字符到屏幕所使用的 <code>mvvline()</code> 和 <code>mvhline()</code> 函数。我绘制从 0 列开始的字符水平线（<code>mvhline</code>）以创建草地区域，直到占满整个屏幕的高度和宽度。我绘制从 0 行开始的多条垂直线（<code>mvvline</code>）在此上添加了山脉，绘制单行水平线添加了一条山道（<code>mvhline</code>）。并且，我通过绘制一系列短水平线（<code>mvhline</code>）创建了湖。这种绘制重叠方块的方式看起来似乎并没有效率，但是记住在我们调用 <code>refresh()</code> 函数之前 curses 并不会真正更新屏幕。</p>
<p>绘制完地图，创建游戏就还剩下进入循环让程序等待用户按下上下左右方向键中的一个然后让玩家图标正确移动了。如果玩家想要移动的地方是空的，就应该允许玩家到那里。</p>
<p>你可以把 curses 当做捷径使用。比起在程序中实例化一个版本的地图并复制到屏幕这么复杂，你可以让屏幕为你跟踪所有东西。<code>inch()</code> 函数和相关联的 <code>mvinch()</code> 函数允许你探测屏幕的内容。这让你可以查询 curses 以了解玩家想要移动到的位置是否被水填满或者被山阻挡。这样做你需要一个之后会用到的一个帮助函数：</p>
<pre><code class="hljs cpp"><span class="hljs-function"><span class="hljs-keyword">int</span> <span class="hljs-title">is_move_okay</span><span class="hljs-params">(<span class="hljs-keyword">int</span> y, <span class="hljs-keyword">int</span> x)</span>
</span>{
    <span class="hljs-keyword">int</span> testch;

    <span class="hljs-comment">/* 如果要进入的位置可以进入，返回 true */</span>

    testch = mvinch(y, x);
    <span class="hljs-keyword">return</span> ((testch == GRASS) || (testch == EMPTY));
}

</code></pre><p>如你所见，这个函数探测行 <code>x</code>、列 <code>y</code> 并在空间未被占据的时候返回 <code>true</code>，否则返回 <code>false</code>。</p>
<p>这样我们写移动循环就很容易了：从键盘获取一个键值然后根据是上下左右键移动用户字符。这里是一个这种循环的简单版本：</p>
<pre><code class="hljs ceylon">
    do {
        ch = getch();

        <span class="hljs-comment">/* 测试输入的值并获取方向 */</span>

        <span class="hljs-keyword">switch</span> (ch) {
        <span class="hljs-keyword">case</span> KEY<span class="hljs-number">_</span>UP:
            <span class="hljs-keyword">if</span> ((y &gt; <span class="hljs-number">0</span>) &amp;&amp; <span class="hljs-keyword">is</span><span class="hljs-number">_m</span>ove<span class="hljs-number">_</span>okay(y - <span class="hljs-number">1</span>, x)) {
                y = y - <span class="hljs-number">1</span>;
            }
            <span class="hljs-keyword">break</span>;
        <span class="hljs-keyword">case</span> KEY<span class="hljs-number">_</span>DOWN:
            <span class="hljs-keyword">if</span> ((y &lt; LINES - <span class="hljs-number">1</span>) &amp;&amp; <span class="hljs-keyword">is</span><span class="hljs-number">_m</span>ove<span class="hljs-number">_</span>okay(y + <span class="hljs-number">1</span>, x)) {
                y = y + <span class="hljs-number">1</span>;
            }
            <span class="hljs-keyword">break</span>;
        <span class="hljs-keyword">case</span> KEY<span class="hljs-number">_</span>LEFT:
            <span class="hljs-keyword">if</span> ((x &gt; <span class="hljs-number">0</span>) &amp;&amp; <span class="hljs-keyword">is</span><span class="hljs-number">_m</span>ove<span class="hljs-number">_</span>okay(y, x - <span class="hljs-number">1</span>)) {
                x = x - <span class="hljs-number">1</span>;
            }
            <span class="hljs-keyword">break</span>;
        <span class="hljs-keyword">case</span> KEY<span class="hljs-number">_</span>RIGHT
            <span class="hljs-keyword">if</span> ((x &lt; COLS - <span class="hljs-number">1</span>) &amp;&amp; <span class="hljs-keyword">is</span><span class="hljs-number">_m</span>ove<span class="hljs-number">_</span>okay(y, x + <span class="hljs-number">1</span>)) {
                x = x + <span class="hljs-number">1</span>;
            }
            <span class="hljs-keyword">break</span>;
        }
    }
    <span class="hljs-keyword">while</span> (<span class="hljs-number">1</span>);

</code></pre><p>为了在游戏中使用这个循环，你需要在循环里添加一些代码来启用其它的键（例如传统的移动键 WASD），以提供让用户退出游戏和在屏幕上四处移动的方法。这里是完整的程序：</p>
<pre><code class="hljs cpp"><span class="hljs-comment">/* quest.c */</span>

<span class="hljs-meta">#<span class="hljs-meta-keyword">include</span> </span>
<span class="hljs-meta">#<span class="hljs-meta-keyword">include</span> </span>

<span class="hljs-meta">#<span class="hljs-meta-keyword">define</span> GRASS        <span class="hljs-meta-string">' '</span></span>
<span class="hljs-meta">#<span class="hljs-meta-keyword">define</span> EMPTY     <span class="hljs-meta-string">'.'</span></span>
<span class="hljs-meta">#<span class="hljs-meta-keyword">define</span> WATER      <span class="hljs-meta-string">'~'</span></span>
<span class="hljs-meta">#<span class="hljs-meta-keyword">define</span> MOUNTAIN  <span class="hljs-meta-string">'^'</span></span>
<span class="hljs-meta">#<span class="hljs-meta-keyword">define</span> PLAYER      <span class="hljs-meta-string">'*'</span></span>

<span class="hljs-function"><span class="hljs-keyword">int</span> <span class="hljs-title">is_move_okay</span><span class="hljs-params">(<span class="hljs-keyword">int</span> y, <span class="hljs-keyword">int</span> x)</span></span>;
<span class="hljs-function"><span class="hljs-keyword">void</span> <span class="hljs-title">draw_map</span><span class="hljs-params">(<span class="hljs-keyword">void</span>)</span></span>;

<span class="hljs-function"><span class="hljs-keyword">int</span> <span class="hljs-title">main</span><span class="hljs-params">(<span class="hljs-keyword">void</span>)</span>
</span>{
    <span class="hljs-keyword">int</span> y, x;
    <span class="hljs-keyword">int</span> ch;

    <span class="hljs-comment">/* 初始化curses */</span>

    initscr();
    keypad(stdscr, TRUE);
    cbreak();
    noecho();

    clear();

    <span class="hljs-comment">/* 初始化探索地图 */</span>

    draw_map();

    <span class="hljs-comment">/* 在左下角初始化玩家 */</span>

    y = LINES - <span class="hljs-number">1</span>;
    x = <span class="hljs-number">0</span>;

    <span class="hljs-keyword">do</span> {
    <span class="hljs-comment">/* 默认获得一个闪烁的光标--表示玩家字符 */</span>

    mvaddch(y, x, PLAYER);
    move(y, x);
    refresh();

    ch = getch();

    <span class="hljs-comment">/* 测试输入的键并获取方向 */</span>

    <span class="hljs-keyword">switch</span> (ch) {
    <span class="hljs-keyword">case</span> KEY_UP:
    <span class="hljs-keyword">case</span> <span class="hljs-string">'w'</span>:
    <span class="hljs-keyword">case</span> <span class="hljs-string">'W'</span>:
        <span class="hljs-keyword">if</span> ((y &gt; <span class="hljs-number">0</span>) &amp;&amp; is_move_okay(y - <span class="hljs-number">1</span>, x)) {
        mvaddch(y, x, EMPTY);
        y = y - <span class="hljs-number">1</span>;
        }
        <span class="hljs-keyword">break</span>;
    <span class="hljs-keyword">case</span> KEY_DOWN:
    <span class="hljs-keyword">case</span> <span class="hljs-string">'s'</span>:
    <span class="hljs-keyword">case</span> <span class="hljs-string">'S'</span>:
        <span class="hljs-keyword">if</span> ((y &lt; LINES - <span class="hljs-number">1</span>) &amp;&amp; is_move_okay(y + <span class="hljs-number">1</span>, x)) {
        mvaddch(y, x, EMPTY);
        y = y + <span class="hljs-number">1</span>;
        }
        <span class="hljs-keyword">break</span>;
    <span class="hljs-keyword">case</span> KEY_LEFT:
    <span class="hljs-keyword">case</span> <span class="hljs-string">'a'</span>:
    <span class="hljs-keyword">case</span> <span class="hljs-string">'A'</span>:
        <span class="hljs-keyword">if</span> ((x &gt; <span class="hljs-number">0</span>) &amp;&amp; is_move_okay(y, x - <span class="hljs-number">1</span>)) {
        mvaddch(y, x, EMPTY);
        x = x - <span class="hljs-number">1</span>;
        }
        <span class="hljs-keyword">break</span>;
    <span class="hljs-keyword">case</span> KEY_RIGHT:
    <span class="hljs-keyword">case</span> <span class="hljs-string">'d'</span>:
    <span class="hljs-keyword">case</span> <span class="hljs-string">'D'</span>:
        <span class="hljs-keyword">if</span> ((x &lt; COLS - <span class="hljs-number">1</span>) &amp;&amp; is_move_okay(y, x + <span class="hljs-number">1</span>)) {
        mvaddch(y, x, EMPTY);
        x = x + <span class="hljs-number">1</span>;
        }
        <span class="hljs-keyword">break</span>;
    }
    }
    <span class="hljs-keyword">while</span> ((ch != <span class="hljs-string">'q'</span>) &amp;&amp; (ch != <span class="hljs-string">'Q'</span>));

    endwin();

    <span class="hljs-built_in">exit</span>(<span class="hljs-number">0</span>);
}

<span class="hljs-function"><span class="hljs-keyword">int</span> <span class="hljs-title">is_move_okay</span><span class="hljs-params">(<span class="hljs-keyword">int</span> y, <span class="hljs-keyword">int</span> x)</span>
</span>{
    <span class="hljs-keyword">int</span> testch;

    <span class="hljs-comment">/* 当空间可以进入时返回true */</span>

    testch = mvinch(y, x);
    <span class="hljs-keyword">return</span> ((testch == GRASS) || (testch == EMPTY));
}

<span class="hljs-function"><span class="hljs-keyword">void</span> <span class="hljs-title">draw_map</span><span class="hljs-params">(<span class="hljs-keyword">void</span>)</span>
</span>{
    <span class="hljs-keyword">int</span> y, x;

    <span class="hljs-comment">/* 绘制探索地图 */</span>

    <span class="hljs-comment">/* 背景 */</span>

    <span class="hljs-keyword">for</span> (y = <span class="hljs-number">0</span>; y &lt; LINES; y++) {
    mvhline(y, <span class="hljs-number">0</span>, GRASS, COLS);
    }

    <span class="hljs-comment">/* 山脉和山道 */</span>

    <span class="hljs-keyword">for</span> (x = COLS / <span class="hljs-number">2</span>; x &lt; COLS * <span class="hljs-number">3</span> / <span class="hljs-number">4</span>; x++) {
    mvvline(<span class="hljs-number">0</span>, x, MOUNTAIN, LINES);
    }

    mvhline(LINES / <span class="hljs-number">4</span>, <span class="hljs-number">0</span>, GRASS, COLS);

    <span class="hljs-comment">/* 湖 */</span>

    <span class="hljs-keyword">for</span> (y = <span class="hljs-number">1</span>; y &lt; LINES / <span class="hljs-number">2</span>; y++) {
    mvhline(y, <span class="hljs-number">1</span>, WATER, COLS / <span class="hljs-number">3</span>);
    }
}

</code></pre><p>在完整的程序清单中，你可以看见使用 curses 函数创建游戏的完整布置：</p>
<ol>
<li>初始化 curses 环境。</li>
<li>绘制地图。</li>
<li>初始化玩家坐标（左下角）</li>
<li>循环：<ul>
<li>绘制玩家的角色。</li>
<li>从键盘获取键值。</li>
<li>对应地上下左右调整玩家坐标。</li>
<li>重复。</li>
</ul>
</li>
<li>完成时关闭curses环境并退出。</li>
</ol>
<h3><a href="#开始玩"></a>开始玩</h3>
<p>当你运行游戏时，玩家的字符在左下角初始化。当玩家在游戏区域四处移动的时候，程序创建了“一串”点。这样可以展示玩家经过了的点，让玩家避免经过不必要的路径。</p>
<p><a href="https://camo.githubusercontent.com/b5886dfdb816dc245f5630b260be24ffccd3a3ee/687474703a2f2f7777772e6c696e75786a6f75726e616c2e636f6d2f66696c65732f6c696e75786a6f75726e616c2e636f6d2f7566696c65732f696d61676563616368652f6c617267652d35353070782d63656e74657265642f75313030303030392f71756573742d73746172742e706e67"><img src="http://p0.qhimg.com/t0111a262f15a514de6.png" alt=""></a></p>
<p><em>图 2. 初始化在左下角的玩家</em></p>
<p><a href="https://camo.githubusercontent.com/7010a9a060addce0d05dfd99d1cc0c523874573c/687474703a2f2f7777772e6c696e75786a6f75726e616c2e636f6d2f66696c65732f6c696e75786a6f75726e616c2e636f6d2f7566696c65732f696d61676563616368652f6c617267652d35353070782d63656e74657265642f75313030303030392f71756573742d312e706e67"><img src="http://p0.qhimg.com/t01e644e6737c1b912e.png" alt=""></a></p>
<p><em>图 3. 玩家可以在游戏区域四处移动，例如湖周围和山的通道</em></p>
<p>为了创建上面这样的完整冒险游戏，你可能需要在他/她的角色在游戏区域四处移动的时候随机创建不同的怪物。你也可以创建玩家可以发现在打败敌人后可以掠夺的特殊道具，这些道具应能提高玩家的能力。</p>
<p>但是作为起点，这是一个展示如何使用 curses 函数读取键盘和操纵屏幕的好程序。</p>
<h3><a href="#下一步"></a>下一步</h3>
<p>这是一个如何使用 curses 函数更新和读取屏幕和键盘的简单例子。按照你的程序需要做什么，curses 可以做得更多。在下一篇文章中，我计划展示如何更新这个简单程序以使用颜色。同时，如果你想要学习更多 curses，我鼓励你去读位于 Linux 文档计划的 Pradeep Padala 写的<a href="http://tldp.org/HOWTO/NCURSES-Programming-HOWTO">如何使用 NCURSES 编程</a>。</p>
<hr>
<p>via: <a href="http://www.linuxjournal.com/content/creating-adventure-game-terminal-ncurses">http://www.linuxjournal.com/content/creating-adventure-game-terminal-ncurses</a></p>
<p>作者：<a href="http://www.linuxjournal.com/users/jim-hall">Jim Hall</a> 译者：<a href="https://github.com/leemeans">Leemeans</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
通过 ncurses 在终端创建一个冒险游戏

## 原文链接
[https://www.zcfy.cc/article/creating-an-adventure-game-in-the-terminal-with-ncurses](https://www.zcfy.cc/article/creating-an-adventure-game-in-the-terminal-with-ncurses)

