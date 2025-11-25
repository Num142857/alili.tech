---
title: 'Weex在native中离线加载本地的字体文件,如iconfont.ttf' 
date: 2018-12-26 2:30:14
hidden: true
slug: h6t6j85bya
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>鉴于自己的APP有个离线模式,所以在使用iconfont的时候不得不将字体文件保存到本地,通过离线的方式加载,所以有了以下的文章.</p></blockquote>
<h2 id="articleHeader0">先讲一波道理</h2>
<ol>
<li>weex怎么加载字体 --&gt;<a href="https://weex.apache.org/cn/references/modules/dom.html#fontFace" rel="nofollow noreferrer" target="_blank">通过dom的方式添加自定义字体</a>
</li>
<li>如何区别本地资源和在线资源--&gt;  <a href="https://weex.apache.org/cn/references/path.html#Schemes" rel="nofollow noreferrer" target="_blank">Schemes的定义</a>
</li>
<li>native端的相对路径--&gt; <a href="https://weex.apache.org/cn/references/path.html#" rel="nofollow noreferrer" target="_blank">相对路径的使用</a>
</li>
</ol>
<h2 id="articleHeader1">总结一波道理</h2>
<ol>
<li>Android或者iOS 访问本地图片或者字体,在weex中统一以' <code>local://</code>'为前缀 ;</li>
<li>'<code>/</code>'在android下如果加载的是字体对应的就是<code>assets</code>目录,若果加载的图片就从<code>drawable </code>目录, 所以iconfont.ttf放置在<code>src/assets</code>目录下的话,字体的url加载方式应该为<code>('local:///iconfont.ttf')</code>
</li>
<li>iOS同理,不过资源文件在<code>bundle resources</code>下.(加载方法未测试)</li>
</ol>
<blockquote><h3 id="articleHeader2">道理我都懂,可仍然过不好这一生 Talk is cheap.</h3></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 初始化加载iconfont字体
 * 
 * @type "{{"initIconfont: (function())"}}"
 */
let iconfontUtils = {
    initIconfont() {
        let dom = weex.requireModule('dom');
        //通过获取platform判断加载字体文件的路径,(待完善,在手机的playground中,是无法加载本地文件的)
        let platform = weex.config.env.platform.toLowerCase();
        let url;
        if ( &quot;android&quot; == platform) {
            //本地资源采用'local:// '的方式加载
           //第三个斜杠是代表当前目录,对于android来说,如果加载的是字体,那么就是assets目录,同理`/iconfont.ttf'`就是加载`assets`目录下的iconfont.ttf文件
            url = &quot;url('local:///font/iconfont.ttf')&quot;;//注意我这里是将字体文件放在'assets/font/''目录下的,所以
        } else if (&quot;ios&quot; == platform) {
            //todo 理论上同android未测试
            url = &quot;url('local:///font/iconfont.ttf')&quot;;
        } else {
            url = &quot;url('http://at.alicdn.com/t/xxxxxxx.ttf')&quot;
        }
        dom.addRule('fontFace', {
            'fontFamily': &quot;iconfont&quot;,
            'src': url
        });
    }
}
export default iconfontUtils;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-comment">/**
 * 初始化加载iconfont字体
 * 
 * @type "{{"initIconfont: (function())"}}"
 */</span>
<span class="hljs-keyword">let</span> iconfontUtils = {
    initIconfont() {
        <span class="hljs-keyword">let</span> dom = weex.requireModule(<span class="hljs-string">'dom'</span>);
        <span class="hljs-comment">//通过获取platform判断加载字体文件的路径,(待完善,在手机的playground中,是无法加载本地文件的)</span>
        <span class="hljs-keyword">let</span> platform = weex.config.env.platform.toLowerCase();
        <span class="hljs-keyword">let</span> <span class="hljs-built_in">url</span>;
        <span class="hljs-keyword">if</span> ( <span class="hljs-string">"android"</span> == platform) {
            <span class="hljs-comment">//本地资源采用'local:// '的方式加载</span>
           <span class="hljs-comment">//第三个斜杠是代表当前目录,对于android来说,如果加载的是字体,那么就是assets目录,同理`/iconfont.ttf'`就是加载`assets`目录下的iconfont.ttf文件</span>
            <span class="hljs-built_in">url</span> = <span class="hljs-string">"url('local:///font/iconfont.ttf')"</span>;<span class="hljs-comment">//注意我这里是将字体文件放在'assets/font/''目录下的,所以</span>
        } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-string">"ios"</span> == platform) {
            <span class="hljs-comment">//todo 理论上同android未测试</span>
            <span class="hljs-built_in">url</span> = <span class="hljs-string">"url('local:///font/iconfont.ttf')"</span>;
        } <span class="hljs-title">else</span> {
            <span class="hljs-built_in">url</span> = <span class="hljs-string">"url('http://at.alicdn.com/t/xxxxxxx.ttf')"</span>
        }
        dom.addRule(<span class="hljs-string">'fontFace'</span>, {
            <span class="hljs-string">'fontFamily'</span>: <span class="hljs-string">"iconfont"</span>,
            <span class="hljs-string">'src'</span>: <span class="hljs-built_in">url</span>
        });
    }
}
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> iconfontUtils;</code></pre>
<hr>
<h3 id="articleHeader3">除了道理还有一波鸡汤</h3>
<hr>
<h4>关于加载本地字体库文件,动态绑定的时候异常显示</h4>
<p>加载本地的字体库的话,静态写死在&lt;text&gt;元素下,如&lt;text class='iconfont'&gt;&amp;#xe600;&lt;text&gt;,这样正常,但是如果通过Mustache进行数据绑定"{{"font"}}"(这里的font='&amp;#xe600;')时,页面中显示是错误的.</p>
<h4>解决方案:</h4>
<h4>方案一</h4>
<p>参考<a href="https://segmentfault.com/u/hayvane">hayvane</a>在<a href="https://segmentfault.com/q/1010000009357817" target="_blank">Weex关于字体图标的bug</a>的回答</p>
<blockquote><p>在template中 text写死 &amp;#xe685;时，weex-template-compiler在编译阶段使用了he进行decode，而在template中Mustache进行数据绑定fontName（fontName:"&amp;#xe685;"）时不会进行decode.</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" var he = require('he');
 getFontName: function() {
   return he.decode(this.fontName)
 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code> <span class="hljs-keyword">var</span> he = <span class="hljs-built_in">require</span>(<span class="hljs-string">'he'</span>);
 getFontName: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
   <span class="hljs-keyword">return</span> he.decode(<span class="hljs-keyword">this</span>.fontName)
 }</code></pre>
<h5>方案点评:</h5>
<ol>
<li>引入了<code>he</code>导致打包体积过大</li>
<li>需要手动处理非常麻烦</li>
<li>待官方解决</li>
</ol>
<hr>
<h4>方案二:</h4>
<blockquote><p>通过正则表达式将iconfont的字符取出替换,用String.fromCharCode()方法处理</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="decode(text) {
        // 正则匹配 图标和文字混排 eg: 我去上学校&amp;#xe600;,天天不&amp;#xe600;迟到
        let regExp = /&amp;#x[a-z]\d{3,4};?/;
        if (regExp.test(text)) {
            return text.replace(new RegExp(regExp, 'g'), function (iconText) {
                let replace = iconText.replace(/&amp;#x/, '0x').replace(/;$/, '');
                return String.fromCharCode(replace);
            });
        } else {
            return text;
        }
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>decode(text) {
        <span class="hljs-comment">// 正则匹配 图标和文字混排 eg: 我去上学校&amp;#xe600;,天天不&amp;#xe600;迟到</span>
        <span class="hljs-keyword">let</span> regExp = <span class="hljs-regexp">/&amp;#x[a-z]\d{3,4};?/</span>;
        <span class="hljs-keyword">if</span> (regExp.test(text)) {
            <span class="hljs-keyword">return</span> text.replace(<span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>(regExp, <span class="hljs-string">'g'</span>), <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">iconText</span>) </span>{
                <span class="hljs-keyword">let</span> replace = iconText.replace(<span class="hljs-regexp">/&amp;#x/</span>, <span class="hljs-string">'0x'</span>).replace(<span class="hljs-regexp">/;$/</span>, <span class="hljs-string">''</span>);
                <span class="hljs-keyword">return</span> <span class="hljs-built_in">String</span>.fromCharCode(replace);
            });
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-keyword">return</span> text;
        }
    }</code></pre>
<p>方案二感谢<a href="https://github.com/alibaba/weex-ui/issues/45#issuecomment-342087078" rel="nofollow noreferrer" target="_blank">hizhengfu</a>给的思路.</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Weex在native中离线加载本地的字体文件,如iconfont.ttf

## 原文链接
[https://segmentfault.com/a/1190000011852209](https://segmentfault.com/a/1190000011852209)

