---
title: 使用Vue创建一个Excel插件
reprint: true
categories: reprint
abbrlink: 8d876f92
date: 2018-10-19 00:00:00
---

{{% raw %}}

            <h3>关于本文</h3>
<p>在这篇文章中，你将会经历一遍使用Vue和Excel JavaScript API 打造一个Excel插件的过程。</p>
<h2>预备知识</h2>
<ul>
<li><p>全局安装<a href="https://github.com/vuejs/vue-cli">Vue CLI</a></p>
<pre><code class="hljs avrasm">npm install -g vue-<span class="hljs-keyword">cli</span>

</code></pre></li>
<li><p>全局安装最新版本的<a href="https://github.com/yeoman/yo">Yeoman</a>和<a href="https://github.com/OfficeDev/generator-office">Yeoman generator for Office Add-ins</a> 。</p>
<pre><code class="hljs cmake">npm <span class="hljs-keyword">install</span> -g yo generator-office

</code></pre></li>
</ul>
<h2>创建一个新的Vue app</h2>
<p>使用Vue CLI生成一个新的Vue app。通过命令行，执行下面的命令，并且如下所述对提示的配置进行设置即可。</p>
<pre><code class="hljs dockerfile">vue init webpack my-<span class="hljs-keyword">add</span><span class="bash">-<span class="hljs-keyword">in</span>
</span>
</code></pre><p>当对弹出的提示进行设置的时候，记得为下面三个设置非默认的配置。其他的你可以全部选择使用默认的配置。</p>
<ul>
<li><strong>Install vue-router?</strong> No</li>
<li><strong>Set up unit tests:</strong> No</li>
<li><strong>Setup e2e tests with Nightwatch?</strong> No</li>
</ul>
<p><img src="https://docs.microsoft.com/en-us/office/dev/add-ins/images/vue-cli-prompts.png" alt=""></p>
<h2>生成 manifest 文件</h2>
<p>每个插件都需要一个manifest文件去定义其设置和能力。</p>
<ol>
<li><p>进入你的应用的文件夹。</p>
<pre><code class="hljs dockerfile">cd my-<span class="hljs-keyword">add</span><span class="bash">-<span class="hljs-keyword">in</span>
</span>
</code></pre></li>
<li><p>使用Yeoman生成器为你的插件生成manifest文件。执行下面的命令并且如下设置弹出的提示即可。</p>
<pre><code class="hljs ebnf"><span class="hljs-attribute">yo office</span> 

</code></pre><ul>
<li><strong>Choose a project type:</strong> Manifest</li>
<li><strong>What do you want to name your add-in?:</strong> My Office Add-in</li>
<li><strong>Which Office client application would you like to support?:</strong> Excel</li>
</ul>
</li>
</ol>
<pre><code class="hljs markdown">当你完成了上述引导程序，一个manifest文件以及资源文件就已经可供使用了，可以用于创建你的项目。

![<span class="hljs-string">Yeoman generator</span>](<span class="hljs-link">../images/yo-office.png</span>)

<span class="hljs-quote">&gt; [!NOTE]</span>
<span class="hljs-quote">&gt; If you're prompted to overwrite **package.json**, answer **No** (do not overwrite).</span>

</code></pre><h2>保障你应用的安全性</h2>
<p>虽然使用HTTPS在插件开发中并不是强制要求的，但还是强烈建议为你的插件使用HTTPS。不是SSL-secured（HTTPS）的插件在使用过程中会出现内容不安全的警告和错误提示。如果你计划在Office Online上使用你的插件或者将你的插件发布在AppSource上，那它必须是SSL-secured。如果你的插件可以获取外部数据和服务，它也必须是SSL-secured，以保障传输过程中的数据安全。自签名证书可以在开发和测试环境使用，只要该证书在本地机器上是被信任的即可。</p>
<p>为你的应用开启HTTPS，仅需要打开项目根目录下的<strong>package.json</strong>，修改dev脚本，增加--https标识，保存文件即可。</p>
<pre><code class="hljs brainfuck"><span class="hljs-comment">"dev":</span> <span class="hljs-comment">"webpack</span><span class="hljs-literal">-</span><span class="hljs-comment">dev</span><span class="hljs-literal">-</span><span class="hljs-comment">server</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">https</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">inline</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">progress</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">config</span> <span class="hljs-comment">build/webpack</span><span class="hljs-string">.</span><span class="hljs-comment">dev</span><span class="hljs-string">.</span><span class="hljs-comment">conf</span><span class="hljs-string">.</span><span class="hljs-comment">js"</span>

</code></pre><h2>更新应用</h2>
<ol>
<li><p>在你的编辑器中，打开manifest文件（就是项目根目录下以"manifest.xml"结尾的文件）。替换所有出现的 <a href="https://localhost:3000">https://localhost:3000</a> 为 <a href="https://localhost:8080">https://localhost:8080</a> 并保存文件。</p>
</li>
<li><p>打开 <strong>index.html</strong>，在&lt;/head&gt;标签之前增加下面的&lt;script&gt;标签。</p>
<pre><code class="hljs xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://appsforoffice.microsoft.com/lib/1/hosted/office.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

</code></pre></li>
<li><p>打开<strong>src/main.js</strong>，_移除_下面的代码：</p>
<pre><code class="hljs less"><span class="hljs-selector-tag">new</span> <span class="hljs-selector-tag">Vue</span>({
    <span class="hljs-attribute">el</span>: <span class="hljs-string">'#app'</span>,
    <span class="hljs-attribute">components</span>: {App},
    <span class="hljs-attribute">template</span>: <span class="hljs-string">'&lt;App/&gt;'</span>
})

</code></pre><p>然后在相同位置增加下面的代码。</p>
<pre><code class="hljs coffeescript">const Office = <span class="hljs-built_in">window</span>.Office
Office.initialize = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-keyword">new</span> Vue({
    el: <span class="hljs-string">'#app'</span>,
    components: {App},
    template: <span class="hljs-string">'&lt;App/&gt;'</span>
  })
}

</code></pre></li>
<li><p>打开<strong>src/App.vue</strong>，用下面的代码替换该文件的全部内容，并且在文件的最后添加一个换行（例如在&lt;/style&gt;标签之后添加换行）并且保存文件。</p>
<pre><code class="hljs xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Welcome<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Choose the button below to set the color of the selected range to green.<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">br</span> /&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>Try it out<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"onSetColor"</span>&gt;</span>Set color<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-string">'App'</span>,
  <span class="hljs-attr">methods</span>: {
    onSetColor () {
      <span class="hljs-built_in">window</span>.Excel.run(<span class="hljs-keyword">async</span> (context) =&gt; {
        <span class="hljs-keyword">const</span> range = context.workbook.getSelectedRange()
        range.format.fill.color = <span class="hljs-string">'green'</span>
        <span class="hljs-keyword">await</span> context.sync()
      })
    }
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
<span class="hljs-selector-id">#content-header</span> {
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#2a8dd4</span>;
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#fff</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">80px</span>;
    <span class="hljs-attribute">overflow</span>: hidden;
}

<span class="hljs-selector-id">#content-main</span> {
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#fff</span>;
    <span class="hljs-attribute">position</span>: fixed;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">80px</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">overflow</span>: auto;
}

<span class="hljs-selector-class">.padding</span> {
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">15px</span>;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

</code></pre></li>
</ol>
<h2>启动开发服务器</h2>
<ol>
<li><p>通过命令行，执行以下命令启动开发服务器。</p>
<pre><code class="hljs coffeescript"> <span class="hljs-built_in">npm</span> start

</code></pre></li>
<li><p>在浏览器中打开 <a href="https://localhost:8080">https://localhost:8080</a> 。如果你的浏览器指出该页面的证书是不被信任的，你需要设置你的电脑信任该证书。</p>
</li>
<li><p>在你的浏览器在没有任何证书错误的情况下加载完成这个插件页面，你可以准备测试你的插件了。</p>
</li>
</ol>
<h2>尝试一下</h2>
<ol>
<li><p>按照各个平台的用法说明，你将在Excel中加载和运行你的插件。</p>
<ul>
<li>Windows: <a href="https://docs.microsoft.com/en-us/office/dev/add-ins/quickstarts/excel-quickstart-vue?wt.mc_id=drivethedash-twitter-buhollan/../testing/create-a-network-shared-folder-catalog-for-task-pane-and-content-add-ins">Sideload Office Add-ins on Windows</a></li>
<li>Excel Online: <a href="https://docs.microsoft.com/en-us/office/dev/add-ins/quickstarts/excel-quickstart-vue?wt.mc_id=drivethedash-twitter-buhollan/../testing/sideload-office-add-ins-for-testing#sideload-an-office-add-in-on-office-online">Sideload Office Add-ins in Office Online</a></li>
<li>iPad and Mac: <a href="https://docs.microsoft.com/en-us/office/dev/add-ins/quickstarts/excel-quickstart-vue?wt.mc_id=drivethedash-twitter-buhollan/../testing/sideload-an-office-add-in-on-ipad-and-mac">Sideload Office Add-ins on iPad and Mac</a></li>
</ul>
</li>
<li><p>在Excel中，选择 <strong>Home</strong> 选项，然后选择 <strong>Show Taskpane</strong> 按钮打开插件任务窗格。</p>
<p><img src="https://docs.microsoft.com/en-us/office/dev/add-ins/images/excel-quickstart-addin-2a.png" alt="Excel Add-in button"></p>
</li>
<li><p>在工作表中选择任意范围的单元格。</p>
</li>
<li><p>在任务窗格，选择 <strong>Set color</strong> 按钮设置选中区域的颜色为绿色。</p>
<p><img src="https://docs.microsoft.com/en-us/office/dev/add-ins/images/excel-quickstart-addin-2c.png" alt="Excel Add-in"></p>
</li>
</ol>
<h2>后续步骤</h2>
<p>恭喜！你已经成功使用Vue创建了一个Excel插件。接下来，请深入学习更多关于Excel插件的能力并且跟着Excel插件指引创建一个更复杂的插件吧。</p>
<p><a href="https://docs.microsoft.com/en-us/office/dev/add-ins/quickstarts/excel-quickstart-vue?wt.mc_id=drivethedash-twitter-buhollan/../tutorials/excel-tutorial">Excel插件指导</a></p>
<h2>可供参考</h2>
<ul>
<li><a href="https://docs.microsoft.com/en-us/office/dev/add-ins/quickstarts/excel-quickstart-vue?wt.mc_id=drivethedash-twitter-buhollan/../tutorials/excel-tutorial-create-table">Excel插件指引</a></li>
<li><a href="https://docs.microsoft.com/en-us/office/dev/add-ins/quickstarts/excel-quickstart-vue?wt.mc_id=drivethedash-twitter-buhollan/../excel/excel-add-ins-core-concepts">Excel JavaScript API 核心概念</a></li>
<li><a href="http://dev.office.com/code-samples#?filters=excel,office%20add-ins">Excel 插件代码示例</a></li>
<li><a href="https://dev.office.com/reference/add-ins/excel/excel-add-ins-reference-overview">Excel JavaScript API 参考</a></li>
</ul>

          
{{% /raw %}}

# 版权声明
原文链接: [https://www.zcfy.cc/article/build-an-excel-add-in-using-vue](https://www.zcfy.cc/article/build-an-excel-add-in-using-vue)
原文标题: 使用Vue创建一个Excel插件
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！
