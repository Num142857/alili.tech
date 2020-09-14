---
title: 'atom使用全局配置ESLint' 
date: 2019-02-07 2:30:15
hidden: true
slug: rkvk3etuj1i
categories: [reprint]
---

{{< raw >}}

                    
<p>ESLint是一个Javascript静态检查工具，它可以帮你养成良好的编程习惯，使你的javascript代码达到国际化的水准。ESLint是所有Javascrpt静态检查工具里最晚诞生的一个，之前还曾经有过JSLint以及JSHint等工具，但JSLint和JSHint都是用的一套标准，在目前这个前端技术飞速发展的时代已经显得有点落伍。ESLint的好处是既提供了国际大厂的标准，同时又给了你自定义标准的可能性。ESLint的推荐设置方式是按项目设置，但是如果我们有很多个不同的javascript项目的话，一个一个去设置未免太麻烦，所以在这里介绍的是全局设置方法，一次设置，所有项目全部采用同一标准。</p>
<p>首先，在atom中安装linter插件和linter-eslint插件。安装完成之后，linter-eslint的缺省设置有2个地方需要修改：</p>
<ol>
<li><p>把<code>Disable when no ESLint config is found</code>的对钩去掉。这个选项的意思是说：如果你的javascript项目文件夹中没有.eslintrc这样的配置文件的话，那么ESLint就不起作用。在这里，我们要设置为全局lint，不需要在每个javascript文件夹中包含.eslintrc文件，所以要把它去掉，否则由于我们的项目文件夹中没有.eslintrc文件，ESLint会不起作用。</p></li>
<li><p>把<code>Use global ESLint installation</code>的对钩勾上。因为我们使用的是全局的ESLint安装包。</p></li>
</ol>
<p>下面，开始安装ESLint：</p>
<ol>
<li><p><code>npm install eslint -g</code><br>ESLint是通过npm安装的，这里的-g选项代表全局，也就是说它不会把ESLint的可执行文件安装在你的项目文件夹或者说当前文件夹下。如果你没有设置这个-g选项的话，它会在你当前文件夹下安装ESLint可执行文件，那样就不是全局安装了。后面我们所有安装包都要用使用这个-g选项</p></li>
<li><p><code>eslint -v</code><br>安装完成之后，你可以先执行一下<code>eslint -v</code>这个命令来看一下eslint是否已经安装成功了，如果没有的话，你需要反复检查，直到确保eslint安装已经成功为止。</p></li>
<li><p>关于<code>eslint --init</code>可以不必执行，它主要的作用是在你当前文件夹下生成.eslintrc文件，但同时也会把eslint在你当前文件夹下重新安装一遍，并且如果你使用包的话，它还会要求必须要有package.json文件，总之会很麻烦。但如果你是第一次使用的话，我建议你可以执行一下试试，它主要提供3种预安装包：Google标准、Airbnb标准和Standard标准。这3个标准里，Google就是Google公司的标准，Airbnb是Airbnb公司的标准，Standard就是一些前端工程师自定的标准。目前来看，公认的最好的标准是Airbnb标准（互联网发展日新月异，永远是年轻人颠覆老年人，连Google都老了）。它对于ES6要求最严格，比如禁止使用var定义变量，必须使用let或者const等等。既然采用最新标准，当然就让你的代码一次性向最高标准看齐，省得以后麻烦。</p></li>
<li><p><code>npm install eslint-config-airbnb -g</code><br>精彩的重头戏来了：看到漂亮的airbnb了吗？我们就里就是要安装Airbnb的标准了。注意-g，还是全局化安装。</p></li>
<li><p><code>npm install eslint-plugin-jsx-a11y -g</code><br>a11y是accessibility（无障碍环境）的缩写，从第一个字母a到最后一个字母y，中间一共是11个字母，所以就叫a11y了，类似于i18n表示internationalization（国际化）一样。JSX主要是React会用到，虽然我们的项目里可能并不会用React，但是这个Airbnb标准必须要用到它，所以必须安装。</p></li>
<li><p><code>npm install eslint-plugin-import -g</code><br>同上，Airbnb标准必需。</p></li>
<li>
<p>最后，编写我们自己的全局.eslintrc文件：</p>
<p>vi ~/.eslintrc.json</p>
</li>
</ol>
<p>前面讲过了，为项目服务的<code>.eslintrc.json</code>文件是放在项目文件夹下的，全局的<code>.eslintrc.json</code>文件则放在当前用户的根目录下，类Unix系统的当前用户目录是<code>~</code>，而Windows系统的话则是类似于<code>C:\Windows\Users\Username</code>这样的地方。<br>把以下代码放入<code>.eslintrc.json</code>，就做好了你的全局ESLint配置文件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;extends&quot;: &quot;airbnb&quot;,
    &quot;installedESLint&quot;: true,
    &quot;plugins&quot;: [
        &quot;react&quot;
    ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
    <span class="hljs-attr">"extends"</span>: <span class="hljs-string">"airbnb"</span>,
    <span class="hljs-attr">"installedESLint"</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">"plugins"</span>: [
        <span class="hljs-string">"react"</span>
    ]
}</code></pre>
<p>在atom中打开你的某一个js文件，随便改几个字符看看效果吧，不出所料的话，应该会出现一堆红色的错误。如果没有出现，不是你的代码没有问题，而是你没有安装对。</p>
<p>Airbnb的缺省标准是每行的缩进字符是2个空格键，而我一般喜欢使用4个空格键作缩进，所以这里需要一点小小的定制。另外，我缺省会大量使用jQuery，不想让它总是报告什么jQuery这个变量未定义等错误。所以增加了几行，最终的<code>.eslintrc.json</code>如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;extends&quot;: &quot;airbnb&quot;,
    &quot;installedESLint&quot;: true,
    &quot;plugins&quot;: [
        &quot;react&quot;
    ],
    &quot;env&quot;: {
        &quot;jquery&quot;: true
    },
    &quot;rules&quot;: {
        &quot;indent&quot;: [&quot;error&quot;, 4]
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
    <span class="hljs-attr">"extends"</span>: <span class="hljs-string">"airbnb"</span>,
    <span class="hljs-attr">"installedESLint"</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">"plugins"</span>: [
        <span class="hljs-string">"react"</span>
    ],
    <span class="hljs-attr">"env"</span>: {
        <span class="hljs-attr">"jquery"</span>: <span class="hljs-literal">true</span>
    },
    <span class="hljs-attr">"rules"</span>: {
        <span class="hljs-attr">"indent"</span>: [<span class="hljs-string">"error"</span>, <span class="hljs-number">4</span>]
    }
}</code></pre>
<p>这样你在任何项目中的js文件都会按照这同一套标准去检查。好了，现在可以开始改你的代码了，解决那一大堆红叉子吧，我相信一定不少。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
atom使用全局配置ESLint

## 原文链接
[https://segmentfault.com/a/1190000005984309](https://segmentfault.com/a/1190000005984309)

