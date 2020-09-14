---
title: 'JavaScript 版俄罗斯方块' 
date: 2019-02-03 2:30:40
hidden: true
slug: kuocl6lc3n
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>十多年前曾经用 Turbo C++ 3.0 写过 DOS 下的俄罗斯方块，不久之后又用 VB 写了另一个版本。十多年后决心用 JavaScript 再写一个并非完全心血来潮。起因是儿子提到了手掌游戏机，而从技术上来说，主要是想尝试 使用 webpack + babel 构建的纯 es6 前端项目。</p></blockquote>
<h3 id="articleHeader0">传送门</h3>
<ul>
<li><a href="https://git.oschina.net/jamesfancy/tetris/tree/startup/" rel="nofollow noreferrer" target="_blank">本博文对应的源码</a></li>
<li><a href="http://jamesfancy.oschina.io/tetris/" rel="nofollow noreferrer" target="_blank">在线试玩（最新发布，不一定与源码对应</a></li>
<li><a href="https://segmentfault.com/a/1190000007063852">JavaScript 版俄罗斯方块 - 重构</a></li>
</ul>
<h2 id="articleHeader1">项目结构</h2>
<p>这是一个纯静态项目，而且 HTML 只有一页，就是 index.html。样式表内容不多，还是习惯用 LESS 来写，不喜欢用 sass 的原因其实很直白——不想装逼（Ruby）。</p>
<p>重点自然是在脚本上，一个是想尝试完整的 ES6 语法，包括 import/export 的模块管理；二个是想尝试像构建静态语言项目那样，使用构建的思想，通过 webpack + babel 构建出 es5 语法的目标脚本。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="源（es6语法，模块化）==> 目标（es5语法，打包）" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code style="word-break: break-word; white-space: initial;">源（es6语法，模块化）=<span class="hljs-function">=&gt;</span> 目标（es5语法，打包）</code></pre>
<p>项目中使用了 jQuery，但是因为习惯，不想把 jQuery 打包在目标脚本中，也不想手工去下载，所以干脆尝试了一下 bower。相比手工下载，使用 bower 是有好处的，至少 <code>bower install</code> 可以写入构建脚本。</p>
<p>一开始对项目目录结构考虑得不是特别清楚，所以建出来的目录结构其实有点乱。整个目录结构如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[root>
  |-- index.html    : 入口
  |-- js/           : 构建生成的脚本
  |-- css/          : 构建生成的样式表
  |-- lib/          : bower 引入的库
  `-- app/          : 前端源文件
        |-- less    : 样式表源文件
        `-- src     : 脚本(es6)源文件" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="markdown hljs"><code class="markdown">[root&gt;
  |-- index.html    : 入口
  |-- js/           : 构建生成的脚本
  |-- css/          : 构建生成的样式表
  |-- lib/          : bower 引入的库
  `-- app/          : 前端源文件
<span class="hljs-code">        |-- less    : 样式表源文件</span>
<span class="hljs-code">        `-- src     : 脚本(es6)源文件</span></code></pre>
<h2 id="articleHeader2">构建配置</h2>
<p>前端构建脚本部分使用的是 webpack + babel，样式表使用的 less，然后通过 gulp 组织起来。所有前端构建配置和源代码都放在 app 目录下。app 目录下是个 npm 项目，有 gulpfile.js 和 webpack.config.js 等构建配置。</p>
<p>因为 gulp 之前用过，fulpfile.js 写起来还比较顺手，但是在配置 webpack 的时候费了点劲。</p>
<p>先在网上抄了一个配置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const path = require(&quot;path&quot;);

module.exports = {
    context: path.resolve(__dirname, &quot;src&quot;),
    entry: [ &quot;./index&quot; ],
    output: {
        path: path.resolve(__dirname, &quot;../js/&quot;),
        filename: &quot;tetris.js&quot;
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: &quot;babel&quot;,
                query: {
                    presets: [&quot;es2015&quot;]
                }
            }
        ]
    }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">"path"</span>);

<span class="hljs-built_in">module</span>.exports = {
    <span class="hljs-attr">context</span>: path.resolve(__dirname, <span class="hljs-string">"src"</span>),
    <span class="hljs-attr">entry</span>: [ <span class="hljs-string">"./index"</span> ],
    <span class="hljs-attr">output</span>: {
        <span class="hljs-attr">path</span>: path.resolve(__dirname, <span class="hljs-string">"../js/"</span>),
        <span class="hljs-attr">filename</span>: <span class="hljs-string">"tetris.js"</span>
    },
    <span class="hljs-attr">module</span>: {
        <span class="hljs-attr">loaders</span>: [
            {
                <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.js$/</span>,
                <span class="hljs-attr">exclude</span>: <span class="hljs-regexp">/(node_modules)/</span>,
                <span class="hljs-attr">loader</span>: <span class="hljs-string">"babel"</span>,
                <span class="hljs-attr">query</span>: {
                    <span class="hljs-attr">presets</span>: [<span class="hljs-string">"es2015"</span>]
                }
            }
        ]
    }
};</code></pre>
<p>然后在写的过程中发现需要引入 jQuery，于是又在网上找了半天，抄了一句</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    externals: {
        &quot;jquery&quot;: &quot;jQuery&quot;
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code><span class="hljs-symbol">    externals:</span> {
        <span class="hljs-string">"jquery"</span>: <span class="hljs-string">"jQuery"</span>
    }</code></pre>
<p>不过后来看到说推荐用 <code>ProvidePlugin</code>，以后再来研究了。</p>
<p>在代码初成，初次运行的时候，发现调试非常麻烦，因为编译过，找不到错误在 es6 的源码位置。这时候才发现缺少了非常重要的 source map。于是又在网上搜了半天，加上了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    devtool: &quot;source-map&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code style="word-break: break-word; white-space: initial;"><span class="hljs-symbol">    devtool:</span> <span class="hljs-string">"source-map"</span></code></pre>
<h2 id="articleHeader3">程序分析</h2>
<p>因为以前写过，所以在数据结构上还是有点映像，游戏区就对应着一个二维数组。每个图形就是一组有着相对位置关系的坐标，当然还有颜色定义。</p>
<p>所有行为都是通过数据（坐标）的变化来实现的。而障碍物（已固定下来的小方块）判断则是通过当前图形位置及定义中所有小方块的相对位置计算出各小方块坐标之后检查大矩阵对应坐标是否存在小方块数据来判断。这需要提前计算出当前图形在下一个形态所需要占用的坐标列表。</p>
<p>方块的自动下落是通过时钟周期控制。如果还要处理消除动画，就可能需要两个时钟周期控制。当然可以取两个时钟周期的了大公约数来合并成一个公共时钟周期，但俄罗斯方块的动画相当简单，似乎没有必要进行这么复杂的处理——可以考虑在消除时暂停下落时钟周期，消除完成之后再重启。</p>
<p>交互部分主要靠键盘处理，只需要给 <code>document</code> 绑定 <code>keydown</code> 事件处理就好。</p>
<h2 id="articleHeader4">方块模型</h2>
<p>传统的俄罗斯方块只有 7 种图形，加上旋转变形一共也才 19 个图形。所以需要定义的图形不多，懒得去写旋转算法，直接用坐标来定义了。于是先用WPS表格把图形画出来了：</p>
<p><span class="img-wrap"><img data-src="/img/bVDceV?w=649&amp;h=817" src="https://static.alili.tech/img/bVDceV?w=649&amp;h=817" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>然后照此图形，在 JavaScript 中定义结构。设想的数数据结构是这样的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="SHAPES: [Shape]     // 预定义所有图形
Shape: {                // 图形的结构
    colorClass: string,     // 用于染色的 css class    
    forms: [Form]           // 旋转变形的组合
}
Form: [Block]           // 图形变形，是一组小方块的坐标
Block: {                // 小方块坐标
    x: number,              // x 表示横向
    y: number               // y 表示纵向
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code><span class="hljs-symbol">SHAPES:</span> [Shape]     <span class="hljs-comment">// 预定义所有图形</span>
<span class="hljs-symbol">Shape:</span> {                <span class="hljs-comment">// 图形的结构</span>
<span class="hljs-symbol">    colorClass:</span> string,     <span class="hljs-comment">// 用于染色的 css class    </span>
<span class="hljs-symbol">    forms:</span> [Form]           <span class="hljs-comment">// 旋转变形的组合</span>
}
<span class="hljs-symbol">Form:</span> [Block]           <span class="hljs-comment">// 图形变形，是一组小方块的坐标</span>
<span class="hljs-symbol">Block:</span> {                <span class="hljs-comment">// 小方块坐标</span>
<span class="hljs-symbol">    x:</span> number,              <span class="hljs-comment">// x 表示横向</span>
<span class="hljs-symbol">    y:</span> number               <span class="hljs-comment">// y 表示纵向</span>
}</code></pre>
<p>其中 <code>SHAPES</code>、<code>Form</code> 都直接用数组表示，<code>Block</code> 结构简单，直接使用字面对象表示，只需要定义一个 Shape 类（当时考虑加些方法在里面，但后来发现没必要）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Shape {
    constructor(colorIndex, forms) {
        this.colorClass = `c${1 + colorIndex % 7}`;
        this.forms = forms;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Shape</span> </span>{
    <span class="hljs-keyword">constructor</span>(colorIndex, forms) {
        <span class="hljs-keyword">this</span>.colorClass = <span class="hljs-string">`c<span class="hljs-subst">${<span class="hljs-number">1</span> + colorIndex % <span class="hljs-number">7</span>}</span>`</span>;
        <span class="hljs-keyword">this</span>.forms = forms;
    }
}</code></pre>
<p>为了偷懒，<code>SHAPE</code> 是用一个三维数组的数据，通过 <code>Array.prototype.map()</code> 来得到的 Shape 数组</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Shape {
    constructor(colorIndex, forms) {
        this.colorClass = `c${1 + colorIndex % 7}`;
        this.forms = forms;
    }
}

export const SHAPES = [
    // 正方形
    [
        [[0, 0], [0, 1], [1, 0], [1, 1]]
    ],
    // |
    [
        [[0, 0], [0, 1], [0, 2], [0, 3]],
        [[0, 0], [1, 0], [2, 0], [3, 0]]
    ],
    
    // .... 省略，请参阅文末附上的源码地址
].map((defining, i) => {
    // data 就是上面提到的 forms 了，命名时没想好，后来也没改
    const data = defining.map(form => {
        // 计算 right 和 bottom 主要是为了后面的出界判断
        let right = 0;
        let bottom = 0;
        
        // point 就是 block，当时取名的时候没想好
        const points = form.map(point => {
            right = Math.max(right, point[0]);
            bottom = Math.max(bottom, point[1]);
            return {
                x: point[0],
                y: point[1]
            };
        });
        points.width = right + 1;
        points.height = bottom + 1;
        return points;
    });
    return new Shape(i, data);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Shape</span> </span>{
    <span class="hljs-keyword">constructor</span>(colorIndex, forms) {
        <span class="hljs-keyword">this</span>.colorClass = <span class="hljs-string">`c<span class="hljs-subst">${<span class="hljs-number">1</span> + colorIndex % <span class="hljs-number">7</span>}</span>`</span>;
        <span class="hljs-keyword">this</span>.forms = forms;
    }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> SHAPES = [
    <span class="hljs-comment">// 正方形</span>
    [
        [[<span class="hljs-number">0</span>, <span class="hljs-number">0</span>], [<span class="hljs-number">0</span>, <span class="hljs-number">1</span>], [<span class="hljs-number">1</span>, <span class="hljs-number">0</span>], [<span class="hljs-number">1</span>, <span class="hljs-number">1</span>]]
    ],
    <span class="hljs-comment">// |</span>
    [
        [[<span class="hljs-number">0</span>, <span class="hljs-number">0</span>], [<span class="hljs-number">0</span>, <span class="hljs-number">1</span>], [<span class="hljs-number">0</span>, <span class="hljs-number">2</span>], [<span class="hljs-number">0</span>, <span class="hljs-number">3</span>]],
        [[<span class="hljs-number">0</span>, <span class="hljs-number">0</span>], [<span class="hljs-number">1</span>, <span class="hljs-number">0</span>], [<span class="hljs-number">2</span>, <span class="hljs-number">0</span>], [<span class="hljs-number">3</span>, <span class="hljs-number">0</span>]]
    ],
    
    <span class="hljs-comment">// .... 省略，请参阅文末附上的源码地址</span>
].map(<span class="hljs-function">(<span class="hljs-params">defining, i</span>) =&gt;</span> {
    <span class="hljs-comment">// data 就是上面提到的 forms 了，命名时没想好，后来也没改</span>
    <span class="hljs-keyword">const</span> data = defining.map(<span class="hljs-function"><span class="hljs-params">form</span> =&gt;</span> {
        <span class="hljs-comment">// 计算 right 和 bottom 主要是为了后面的出界判断</span>
        <span class="hljs-keyword">let</span> right = <span class="hljs-number">0</span>;
        <span class="hljs-keyword">let</span> bottom = <span class="hljs-number">0</span>;
        
        <span class="hljs-comment">// point 就是 block，当时取名的时候没想好</span>
        <span class="hljs-keyword">const</span> points = form.map(<span class="hljs-function"><span class="hljs-params">point</span> =&gt;</span> {
            right = <span class="hljs-built_in">Math</span>.max(right, point[<span class="hljs-number">0</span>]);
            bottom = <span class="hljs-built_in">Math</span>.max(bottom, point[<span class="hljs-number">1</span>]);
            <span class="hljs-keyword">return</span> {
                <span class="hljs-attr">x</span>: point[<span class="hljs-number">0</span>],
                <span class="hljs-attr">y</span>: point[<span class="hljs-number">1</span>]
            };
        });
        points.width = right + <span class="hljs-number">1</span>;
        points.height = bottom + <span class="hljs-number">1</span>;
        <span class="hljs-keyword">return</span> points;
    });
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> Shape(i, data);
});</code></pre>
<h2 id="articleHeader5">游戏区模型</h2>
<p>虽然游戏区只有一块，但是就画图的这部分行为来说，还有一个预览区的行为与之相仿。游戏区除了显示外还需要处理方块下落、响应键盘操作左、右、下移及变形、堆积、消除等。</p>
<p>对于显示，定义了一个 <code>Matrix</code> 类来处理。<code>Matrix</code> 主要是用来在 HTML 中创建用来显示每一个小方块的 <code>&lt;span&gt;</code> 以及根据数据绘制小方块。当然所谓的“绘制”其实只是设置 <code>&lt;span&gt;</code> 的 css class 而已，让浏览器来处理绘制的事情。</p>
<p><code>Matrix</code> 根据构建传入的 <code>width</code> 和 <code>height</code> 来创建 DOM，每一行是一个 <code>&lt;div&gt;</code> 作为容器，但实际需要操作的是每一行中，由 <code>&lt;span&gt;</code> 表示的小方块。所以其实 <code>Matrix</code> 的结构也很简单，这里简单的列出接口，具体代码参考后面的源码链接</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Matrix {
    constructor(width, height) {}
    build(container) {}
    render(blockList) {}
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Matrix</span> </span>{
    <span class="hljs-keyword">constructor</span>(width, height) {}
    build(container) {}
    render(blockList) {}
}</code></pre>
<h2 id="articleHeader6">逻辑控制</h2>
<p>上面提到主游戏区有一些逻辑控制，而 <code>Matrix</code> 只处理了绘制的问题。所以另外定义了一个类：<code>Puzzle</code> 来处理控制和逻辑的问题，这些问题包括</p>
<ul>
<li>预览图形的生成的显示</li>
<li>游戏图形和已经固定的方块显示</li>
<li>进行中的图形行为（旋转、左移、右移、下移等）</li>
<li>边界及障碍判断</li>
<li>下落结束后可消除行的判断</li>
<li>下落动画处理</li>
<li>消除动画处理</li>
<li>消除后的数据重算（因为位置改变）</li>
<li>Game Over 判断</li>
<li>......</li>
</ul>
<p>其实比较关键的问题是图形和固定方块的显示、边界及障碍判断、动画处理。</p>
<h3 id="articleHeader7">游戏区方块绘制</h3>
<p>已经确定了 <code>Matrix</code> 用于处理绘制，但绘制需要数据，数据又分两部分。一部分是当前下落中的图形，其位置是动态的；另一部分是之前落下的图形，已经固定在游戏区的。</p>
<p>从当前下落中的图形生成一个 blocks 数组，再将已经固定的小方块生成另一个 blocks 数组，合并起来，就是 <code>Matrix.render()</code> 的数据。<code>Matrix</code> 拿到这个数据之后，先遍历所有 <code>&lt;span&gt;</code>，清除颜色 class，再遍历得到的数据，根据每一个 block 提供的位置和颜色，去设置对应的 <code>&lt;span&gt;</code> 的 css class。这样就完成了绘制。</p>
<p><span class="img-wrap"><img data-src="/img/bVDcht?w=871&amp;h=465" src="https://static.alili.tech/img/bVDcht?w=871&amp;h=465" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader8">边界和障碍判断</h3>
<p>之前提到的 <code>Shape</code> 只是一个形状的定义，而下落中的图形是另一个实体，由于 Shape 命名已经被占用了，所以源代码中用 <code>Block</code> 来对它命名。</p>
<blockquote><p>这个命名确实有点乱，需要这样解理：<code>Shape -&gt; ShapeDefinition</code>；<code>Block -&gt; Shape</code>。</p></blockquote>
<p>现在下落中的图形是一个 <code>Block</code> 的实例（对象）。在判断边界和障碍判断的过程中需要用到其位置信息、边界信息（right、bottom）等；另外还需要知道它当前是哪一个旋转形态……所以定义了一些属性。</p>
<p>不过关键问题是需要知道它的下个状态（位置、旋转）会占用哪些坐标的位置。所以定义了几个方法</p>
<ul>
<li>
<code>fasten()</code>，不带参数的时候返回当前位置当前形态所占用的坐标，主要是绘图用；带参数时可以返回指定位置和指定形态所需要占用的坐标。</li>
<li>
<code>fastenOffset()</code>，因为通常需要的位移坐标数据都相对原来的位置只都有少量的偏移，所以定义这个方法，以简化调用 <code>fasten()</code> 的参数。</li>
<li>
<code>fastenRotate()</code>，简化旋转后对 <code>fasten()</code> 的调用。</li>
</ul>
<p>这里有一点需要注意，就是有图形在到在边界之后，旋转可能会造成出界。这种情况下需要对其进行位移，所以 <code>Block</code> 的 <code>rotate()</code> 和 <code>fastenRotate()</code> 都可以输入边界参数，用于计算修正位置。而修正位置则是通过模块中一个局部函数 <code>getRotatePosition()</code> 来实现的。</p>
<h3 id="articleHeader9">动画控制</h3>
<p>前面已经提到了，动画时钟分两个，下落动画时钟和消除动画时钟。对于人工操作引起的动画，在操作之后直接重绘，就不需要通过时钟来进行了。</p>
<p>考虑到在开始消除动画时需要暂停下落动画，之后又要重新开始。所以为下落动画时钟定义为一个 <code>Timer</code> 类来控制 <code>stop()</code> 和 <code>start()</code>，内部实现当然是用的 <code>setInterval()</code> 和 <code>clearInterval()</code>。当然 <code>Timer</code> 也可以用于消除动画，但是因为在写消除动画的时候发现代码比较简单，就直接写 <code>setInterval()</code> 和 <code>clearInterval()</code> 解决了。</p>
<p>在 <code>Puzzle</code> 类中，某个图形下图到底的时候，通过 <code>fastenCurent()</code> 为固定它，这个方法里固定了当前图形之后会调用 <code>eraseRows()</code> 来检查和删除已经填满的行。从数据上消除和压缩行都是在这里处理的，同时这里还进行了消除行的动画处理——对需要消除的行从左到右清除数据并立即重绘。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let columnIndex = 0;
const t = setInterval(() => {
    // fulls 是找出来的需要消除的行
    fulls.forEach((rowIndex) => {
        matrix[rowIndex][columnIndex] = null;
        this.render();
    });
    
    // 消除列达到右边界时结束动画
    if (++columnIndex >= this.puzzle.width) {
        clearInterval(t);
        reduceRows();
        this.render();
        this.process();
    }
}, 10);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> columnIndex = <span class="hljs-number">0</span>;
<span class="hljs-keyword">const</span> t = setInterval(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-comment">// fulls 是找出来的需要消除的行</span>
    fulls.forEach(<span class="hljs-function">(<span class="hljs-params">rowIndex</span>) =&gt;</span> {
        matrix[rowIndex][columnIndex] = <span class="hljs-literal">null</span>;
        <span class="hljs-keyword">this</span>.render();
    });
    
    <span class="hljs-comment">// 消除列达到右边界时结束动画</span>
    <span class="hljs-keyword">if</span> (++columnIndex &gt;= <span class="hljs-keyword">this</span>.puzzle.width) {
        clearInterval(t);
        reduceRows();
        <span class="hljs-keyword">this</span>.render();
        <span class="hljs-keyword">this</span>.process();
    }
}, <span class="hljs-number">10</span>);</code></pre>
<h2 id="articleHeader10">小结</h2>
<p>俄罗斯方块的算法并不难，但这个仓促完成的小游戏中仍然存在一些问题需要将来处理掉：</p>
<ul>
<li>没有交互方式的开始和结束，页面一旦打开就会持续运行。</li>
<li>还没有引入计分</li>
<li>每次绘制都是全部重绘，应该可以优化为局部（变化的部分）重绘</li>
</ul>
<h3 id="articleHeader11">传送门</h3>
<ul>
<li><a href="https://git.oschina.net/jamesfancy/tetris/tree/startup/" rel="nofollow noreferrer" target="_blank">本博文对应的源码</a></li>
<li><a href="http://jamesfancy.oschina.io/tetris/" rel="nofollow noreferrer" target="_blank">在线试玩（最新发布，不一定与源码对应</a></li>
<li><a href="https://segmentfault.com/a/1190000007063852">JavaScript 版俄罗斯方块 - 重构</a></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript 版俄罗斯方块

## 原文链接
[https://segmentfault.com/a/1190000006919702](https://segmentfault.com/a/1190000006919702)

