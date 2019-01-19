---
title: 'ncurses 入门指南' 
date: 2019-01-20 2:30:11
hidden: true
slug: 8p7myefjurj
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#ncurses-入门指南"></a>ncurses 入门指南</h1>
<blockquote>
<p>怎样使用curses来绘制终端屏幕？</p>
</blockquote>
<p>虽然图形界面非常酷，但是不是所有的程序都需要点击式的界面。例如，令人尊敬的 Vi 编辑器在第一个 GUI 出现之前在纯文本终端运行了很久。</p>
<p>Vi 编辑器是一个在“文本”模式下绘制的面向屏幕screen-oriented程序的例子。它使用了一个叫 curses 的库。这个库提供了一系列的编程接口来操纵终端屏幕。curses 库产生于 BSD UNIX，但是 Linux 系统通过 ncurses 库提供这个功能。</p>
<p>[要了解 ncurses “过去曾引起的风暴”，参见 <a href="http://www.linuxjournal.com/article/1124">ncurses: Portable Screen-Handling for Linux</a>, September 1, 1995, by Eric S. Raymond.]</p>
<p>使用 curses 创建程序实际上非常简单。在这个文章中，我展示了一个利用 curses 来在终端屏幕上绘图的示例程序。</p>
<h3><a href="#谢尔宾斯基三角形"></a>谢尔宾斯基三角形</h3>
<p>简单展示一些 curses 函数的一个方法是生成谢尔宾斯基三角形Sierpinski's Triangle。如果你对生成谢尔宾斯基三角形的这种方法不熟悉的话，这里是一些产生谢尔宾斯基三角形的规则：</p>
<ol>
<li>设置定义三角形的三个点。</li>
<li>随机选择任意的一个点 <code>(x,y)</code>。</li>
</ol>
<p>然后：</p>
<ol>
<li>在三角形的顶点中随机选择一个点。</li>
<li>将新的 <code>x,y</code> 设置为先前的 <code>x,y</code> 和三角顶点的中间点。</li>
<li>重复（上述步骤）。</li>
</ol>
<p>所以我按照这些指令写了这个程序，程序使用 curses 函数来向终端屏幕绘制谢尔宾斯基三角形：</p>
<pre><code class="hljs lsl"><span class="hljs-comment">/* triangle.c */</span>

#include &lt;curses.h&gt;
#include &lt;stdlib.h&gt;

#include <span class="hljs-string">"getrandom_int.h"</span>

#define ITERMAX <span class="hljs-number">10000</span>

int main(void)
{
  long iter;
  int yi, xi;
  int y[<span class="hljs-number">3</span>], x[<span class="hljs-number">3</span>];
  int index;
  int maxlines, maxcols;

  <span class="hljs-comment">/* initialize curses */</span>

  initscr();
  cbreak();
  noecho();

  clear();

  <span class="hljs-comment">/* initialize triangle */</span>

  maxlines = LINES - <span class="hljs-number">1</span>;
  maxcols = COLS - <span class="hljs-number">1</span>;

  y[<span class="hljs-number">0</span>] = <span class="hljs-number">0</span>;
  x[<span class="hljs-number">0</span>] = <span class="hljs-number">0</span>;

  y[<span class="hljs-number">1</span>] = maxlines;
  x[<span class="hljs-number">1</span>] = maxcols / <span class="hljs-number">2</span>;

  y[<span class="hljs-number">2</span>] = <span class="hljs-number">0</span>;
  x[<span class="hljs-number">2</span>] = maxcols;

  mvaddch(y[<span class="hljs-number">0</span>], x[<span class="hljs-number">0</span>], '<span class="hljs-number">0</span>');
  mvaddch(y[<span class="hljs-number">1</span>], x[<span class="hljs-number">1</span>], '<span class="hljs-number">1</span>');
  mvaddch(y[<span class="hljs-number">2</span>], x[<span class="hljs-number">2</span>], '<span class="hljs-number">2</span>');

  <span class="hljs-comment">/* initialize yi,xi with random values */</span>

  yi = getrandom_int() % maxlines;
  xi = getrandom_int() % maxcols;

  mvaddch(yi, xi, '.');

  <span class="hljs-comment">/* iterate the triangle */</span>

  for (iter = <span class="hljs-number">0</span>; iter &lt; ITERMAX; iter++) {
      index = getrandom_int() % <span class="hljs-number">3</span>;

      yi = (yi + y[index]) / <span class="hljs-number">2</span>;
      xi = (xi + x[index]) / <span class="hljs-number">2</span>;

      mvaddch(yi, xi, '*');
      refresh();
  }

  <span class="hljs-comment">/* done */</span>

  mvaddstr(maxlines, <span class="hljs-number">0</span>, <span class="hljs-string">"Press any key to quit"</span>);

  refresh();

  getch();
  endwin();

  exit(<span class="hljs-number">0</span>);
}

</code></pre><p>让我一边解释一边浏览这个程序。首先，<code>getrandom_int()</code> 函数是我对 Linux 系统调用 <code>getrandom()</code> 的包装器。它保证返回一个正整数（<code>int</code>）值。（LCTT 译注：<code>getrandom()</code> 系统调用按照字节返回随机值到一个变量中，值是随机的，不保证正负，使用 <code>stdlib.h</code> 的 <code>random()</code> 函数可以达到同样的效果）另外，按照上面的规则，你应该能够辨认出初始化和迭代谢尔宾斯基三角形的代码。除此之外，我们来看看我用来在终端上绘制三角形的 curses 函数。</p>
<p>大多数 curses 程序以这四条指令开头。 <code>initscr()</code> 函数获取包括大小和特征在内的终端类型，并设置终端支持的 curses 环境。<code>cbreak()</code> 函数禁用行缓冲并设置 curses 每次只接受一个字符。<code>noecho()</code> 函数告诉 curses 不要把输入回显到屏幕上。而 <code>clear()</code> 函数清空了屏幕：</p>
<pre><code class="hljs abnf">  initscr()<span class="hljs-comment">;</span>
  cbreak()<span class="hljs-comment">;</span>
  noecho()<span class="hljs-comment">;</span>

  clear()<span class="hljs-comment">;</span>

</code></pre><p>之后程序设置了三个定义三角的顶点。注意这里使用的 <code>LINES</code> 和 <code>COLS</code>，它们是由 <code>initscr()</code> 来设置的。这些值告诉程序在终端的行数和列数。屏幕坐标从 <code>0</code> 开始，所以屏幕左上角是 <code>0</code> 行 <code>0</code> 列。屏幕右下角是 <code>LINES - 1</code> 行，<code>COLS - 1</code> 列。为了便于记忆，我的程序里把这些值分别设为了变量 <code>maxlines</code> 和 <code>maxcols</code>。</p>
<p>在屏幕上绘制文字的两个简单方法是 <code>addch()</code> 和 <code>addstr()</code> 函数。也可以使用相关的 <code>mvaddch()</code> 和 <code>mvaddstr()</code> 函数可以将字符放到一个特定的屏幕位置。我的程序在很多地方都用到了这些函数。首先程序绘制三个定义三角的点并标记为 <code>'0'</code>，<code>'1'</code> 和 <code>'2'</code>：</p>
<pre><code class="hljs lsl">  mvaddch(y[<span class="hljs-number">0</span>], x[<span class="hljs-number">0</span>], '<span class="hljs-number">0</span>');
  mvaddch(y[<span class="hljs-number">1</span>], x[<span class="hljs-number">1</span>], '<span class="hljs-number">1</span>');
  mvaddch(y[<span class="hljs-number">2</span>], x[<span class="hljs-number">2</span>], '<span class="hljs-number">2</span>');

</code></pre><p>为了绘制任意的一个初始点，程序做了类似的一个调用：</p>
<pre><code class="hljs less">  <span class="hljs-selector-tag">mvaddch</span>(yi, xi, <span class="hljs-string">'.'</span>);

</code></pre><p>还有为了在谢尔宾斯基三角形递归中绘制连续的点：</p>
<pre><code class="hljs lisp">      mvaddch(<span class="hljs-name">yi</span>, xi, '*')<span class="hljs-comment">;</span>

</code></pre><p>当程序完成之后，将会在屏幕左下角（在 <code>maxlines</code> 行，<code>0</code> 列）显示一个帮助信息：</p>
<pre><code class="hljs lisp">  mvaddstr(<span class="hljs-name">maxlines</span>, <span class="hljs-number">0</span>, <span class="hljs-string">"Press any key to quit"</span>)<span class="hljs-comment">;</span>

</code></pre><p>注意 curses 在内存中维护了一个版本的屏幕显示，并且只有在你要求的时候才会更新这个屏幕，这很重要。特别是当你想要向屏幕显示大量的文字的时候，这样程序会有更好的性能表现。这是因为 curses 只能更新在上次更新之后改变的这部分屏幕。想要让 curses 更新终端屏幕，请使用 <code>refresh()</code> 函数。</p>
<p>在我的示例程序中，我选择在“绘制”每个谢尔宾斯基三角形中的连续点时更新屏幕。通过这样做，用户可以观察三角形中的每次迭代。（LCTT 译注：由于 CPU 太快，迭代过程执行就太快了，所以其实很难直接看到迭代过程）</p>
<p>在退出之前，我使用 <code>getch()</code> 函数等待用户按下一个键。然后我调用 <code>endwin()</code> 函数退出 curses 环境并返回终端程序到一般控制。</p>
<pre><code class="hljs abnf">  getch()<span class="hljs-comment">;</span>
  endwin()<span class="hljs-comment">;</span>

</code></pre><h3><a href="#编译和示例输出"></a>编译和示例输出</h3>
<p>现在你已经有了你的第一个 curses 示例程序，是时候编译运行它了。记住 Linux 操作系统通过 ncurses 库来实现 curses 功能，所以你需要在编译的时候通过 <code>-lncurses</code>来链接——例如：</p>
<pre><code class="hljs stylus">$ ls
getrandom_int<span class="hljs-selector-class">.c</span>  getrandom_int<span class="hljs-selector-class">.h</span>  triangle<span class="hljs-selector-class">.c</span>

$ gcc -Wall -lncurses -o triangle triangle<span class="hljs-selector-class">.c</span> getrandom_int<span class="hljs-selector-class">.c</span>

</code></pre><p>（LCTT 译注：此处命令行有问题，<code>-lncurses</code> 选项在我的 Ubuntu 16.04 系统 + gcc 4.9.3 环境下，必须放在命令行最后，否则找不到库文件，链接时会出现未定义的引用。）</p>
<p>在标准的 80x24 终端运行这个 <code>triangle</code> 程序并没什么意思。在那样的分辨率下你不能看见谢尔宾斯基三角形的很多细节。如果你运行终端窗口并设置非常小的字体大小，你可以更加容易地看到谢尔宾斯基三角形的不规则性质。在我的系统上，输出如图 1。</p>
<p><a href="https://camo.githubusercontent.com/f2df8bdab23232ecd344267fd45652c52102983e/687474703a2f2f7777772e6c696e75786a6f75726e616c2e636f6d2f66696c65732f6c696e75786a6f75726e616c2e636f6d2f7566696c65732f696d61676563616368652f6c617267652d35353070782d63656e74657265642f75313030303030392f747269616e676c652e706e67"><img src="http://p0.qhimg.com/t01fb644af82274793e.png" alt=""></a></p>
<p><em>图 1. triangle 程序的输出</em></p>
<p>虽然迭代具有随机性，但是每次谢尔宾斯基三角形的运行看起来都会很一致。唯一的不同是最初绘制到屏幕的一些点的位置不同。在这个例子中，你可以看到三角形开始的一个小圆点，在点 1 附近。看起来程序接下来选择了点 2，然后你可以看到在圆点和“2”之间的星号。并且看起来程序随机选择了点 2 作为下一个随机数，因为你可以看到在第一个星号和“2”之间的星号。从这里开始，就不能继续分辨三角形是怎样被画出来的了，因为所有的连续点都属于三角形区域。</p>
<h3><a href="#开始学习-ncurses"></a>开始学习 ncurses</h3>
<p>这个程序是一个怎样使用 curses 函数绘制字符到屏幕的简单例子。按照你的程序的需要，你可以通过 curses 做得更多。在下一篇文章中，我将会展示怎样使用 curses 让用户和屏幕交互。如果你对于学习 curses 有兴趣，我建议你去读位于 <a href="http://www.tldp.org">Linux 文档计划</a>Linux Documentation Project的 Pradeep Padala 写的 <a href="http://tldp.org/HOWTO/NCURSES-Programming-HOWTO">NCURSES Programming HOWTO</a>。</p>
<h3><a href="#关于作者"></a>关于作者</h3>
<p>Jim Hall 是一个自由及开源软件的倡议者，他最有名的工作是 FreeDOS 计划，也同样致力于开源软件的可用性。Jim 是在明尼苏达州的拉姆齐县的首席信息官。</p>
<hr>
<p>via: <a href="http://www.linuxjournal.com/content/getting-started-ncurses">http://www.linuxjournal.com/content/getting-started-ncurses</a></p>
<p>作者：<a href="http://www.linuxjournal.com/users/jim-hall">Jim Hall</a> 译者：<a href="https://github.com/leemeans">leemeans</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
ncurses 入门指南

## 原文链接
[https://www.zcfy.cc/article/getting-started-with-ncurses](https://www.zcfy.cc/article/getting-started-with-ncurses)

