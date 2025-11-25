---
title: '发布一个react组件——react-read-pdf，用于在移动端展示PDF文件' 
date: 2019-02-13 2:31:23
hidden: true
slug: as22t12uyrl
categories: [reprint]
---

{{< raw >}}

                    
<hr>
<p>PC端的浏览器对于PDF文件的展示没有太大的问题，给定一个PDF的链接，就可以用浏览器默认的展示样式来展示和渲染PDF文件的内容。比如一个"http://www.baidu.com/test/pdf"。 如何在移动端展示这个文件。为了在移动端展示和渲染PDF文件的内容，本文在pdfjs的基础上实现了一个简单的react组件，用于展示和渲染PDF文件。</p>
<ul>
<li>将这个react组件，以npm包的形式发布。</li>
<li>这个组件的项目地址为：<a href="https://github.com/forthealllight/react-read-pdf" rel="nofollow noreferrer" target="_blank">https://github.com/forthealll...</a>
</li>
</ul>
<p>（如果想看使用的例子，直接下载这个代码或者clone，然后npm install和npm start即可）</p>
<h1 id="articleHeader0">React-read-pdf</h1>
<blockquote>使用React16.5编写的组件，用于在移动设备和PC端显示和渲染PDF文件</blockquote>
<h2 id="articleHeader1">特点</h2>
<ul>
<li>
<strong>Simple</strong>: 使用简单方便，仅仅是一个react组件</li>
<li>
<strong>Mobile-friendly</strong>: 自适应多种移动端的设备，包括手机，平板和其他的移动办公设备</li>
</ul>
<h2 id="articleHeader2">浏览器支持</h2>
<ul>
<li>IE 10+</li>
<li>Firefox 3.6+</li>
<li>Chrome 6+</li>
<li>Safari 6+</li>
<li>Opera 11.5+</li>
<li>iOS Safari 6.1+</li>
<li>Android Browser 3+</li>
</ul>
<h2 id="articleHeader3">快速开始</h2>
<h3 id="articleHeader4">1. 将 react-read-pdf引入你的react项目中</h3>
<p>(在你的项目中比如先引入react,且必须保证React的版本必须在15.0以上)</p>
<p>安装react-read-pdf包</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install --save react-read-pdf" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">npm install --save react-read-pdf</code></pre>
<p>在PC端建议使用PDFReader:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';
import { PDFReader } from 'react-read-pdf';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> { PDFReader } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-read-pdf'</span>;</code></pre>
<p>在移动端建议使用MobilePDFReader,可以自适应各种移动设备:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';
import { MobilePDFReader } from 'react-read-pdf';
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> { MobilePDFReader } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-read-pdf'</span>;
</code></pre>
<h3 id="articleHeader5">2. 引入之后，再来看简单的使用:</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { MobilePDFReader } from 'react-read-pdf';
export default class Test extends Component{
  render(){
    return <div style="{{"overflow:'scroll',height:600"}}">
            <MobilePDFReader url=&quot;http://localhost:3000/test.pdf&quot;/>
           </div>
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> { MobilePDFReader } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-read-pdf'</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Test</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span></span>{
  render(){
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"{{"overflow:</span>'<span class="hljs-attr">scroll</span>',<span class="hljs-attr">height:600</span>"}}"&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">MobilePDFReader</span> <span class="hljs-attr">url</span>=<span class="hljs-string">"http://localhost:3000/test.pdf"</span>/&gt;</span>
           <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  }
}</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import ReactDOM from 'react-dom';
import Test from './test'
ReactDOM.render(<Test />, document.getElementById('root'));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> ReactDOM <span class="hljs-keyword">from</span> <span class="hljs-string">'react-dom'</span>;
<span class="hljs-keyword">import</span> Test <span class="hljs-keyword">from</span> <span class="hljs-string">'./test'</span>
ReactDOM.render(<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Test</span> /&gt;</span>, document.getElementById('root'));</span></code></pre>
<p>react-read-pdf 自适配于各种不同的移动设备，包括手机、平板和其他移动办公设备,下图是利用react-read-pdf在iphoneX上展示PDF的一个例子。</p>
<p>&lt;img src="<a href="https://raw.githubusercontent.com/wiki/forthealllight/react-read-pdf/ip.jpeg" rel="nofollow noreferrer" target="_blank">https://raw.githubusercontent...</a> " width="320"&gt;</p>
<h2 id="articleHeader6">文档</h2>
<p>react-read-pdf 这个npm包主要包括了两个不同类型的组件 <strong><em>PDFReader 和 MobilePDFReader</em></strong>.</p>
<h3 id="articleHeader7"><span style="font-weight:normal;">🌱</span> PDFReader</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { PDFReader } from 'react-read-pdf'

...
<PDFReader url={&quot;http://localhost:3000/test.pdf&quot;} ...>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> { PDFReader } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-read-pdf'</span>

...
&lt;PDFReader url={<span class="hljs-string">"http://localhost:3000/test.pdf"</span>} ...&gt;</code></pre>
<h4>PDFReader组件中的属性</h4>
<table>
<tbody><tr>
<th>属性名称</th>
            <th>类型</th>
            <th>描述</th>
        </tr>
<tr>
<th>url</th>
            <th>字符串或者对象</th>
            <th>如果是字符串，那么url表示的是PDF文件的绝对或者相对地址，如果是对象，可以看关于对象属性的具体描述- &gt;  <a href="#url">url object type </a> </th>
        </tr>
<tr>
<th>data</th>
            <th>字符串</th>
            <th>用二进制来描述的PDF文件,在javascript中，我们可以通过“atob”,将base64编码的PDF文件，转化为二进制编码的文件。</th>
        </tr>
<tr>
<th>page</th>
            <th>数字</th>
            <th>默认值为1，表示应该渲染PDF文件的第几页</th>
        </tr>
<tr>
<th>scale</th>
            <th>数字</th>
            <th>决定渲染的过程中视口的大小</th>
        </tr>
<tr>
<th>width</th>
            <th>数字</th>
            <th>决定渲染过程中，视口的宽度</th>
        </tr>
<tr>
<th>showAllPage</th>
            <th>布尔值</th>
            <th>默认是false,表示不会一次性渲染，只会渲染page的值所指定的那一页。如果这个值为true，则一次性渲染PDF文件所有的页</th>
        </tr>
<tr>
<th>onDocumentComplete</th>
            <th>函数</th>
            <th>将PDF文件加载后，可以通过这个函数输出PDF文件的详细信息。这个函数的具体信息如下所示。 <a href="#function1">function type</a> </th>
        </tr>
</tbody></table>
<p><a><b>url</b></a> <br><strong><em>PDFReader</em></strong>组件的url属性</p>
<p>类型:</p>
<ul>
<li>string : 字符串，表示PDF文件的绝对或者相对地址</li>
<li>object : 对象，有下列的属性</li>
</ul>
<p>属性:</p>
<table>
<thead><tr>
<th>属性名</th>
<th>类型</th>
<th>描述</th>
</tr></thead>
<tbody>
<tr>
<td>url</td>
<td>字符串</td>
<td>字符串，表示PDF文件的绝对或者相对地址</td>
</tr>
<tr>
<td>withCredentials</td>
<td>布尔值</td>
<td>决定请求是否携带cookie</td>
</tr>
</tbody>
</table>
<p><a><b>onDocumentComplete</b></a> <br><strong><em>PDFReader</em></strong>的onDocumentComplete属性</p>
<p>Type:</p>
<ul><li>function(totalPage)</li></ul>
<p>onDocumentComplete的类型是一个函数, 这个函数的第一个参数表示的是PDF文件的总页数。</p>
<h4>注意事项</h4>
<p>PDFReader组件的url属性可以是字符串或者是对象。</p>
<p>下面两种方式都是被允许的。</p>
<p>其一是 :</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" <MobilePDFReader url=&quot;http://localhost:3000/test.pdf&quot;/>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"> &lt;MobilePDFReader url=<span class="hljs-string">"http://localhost:3000/test.pdf"</span>/&gt;
</code></pre>
<p>另外一种方式是 :</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" <MobilePDFReader url={url:&quot;http://localhost:3000/test.pdf&quot;}/>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"> &lt;MobilePDFReader url={<span class="hljs-attr">url</span>:<span class="hljs-string">"http://localhost:3000/test.pdf"</span>}/&gt;
</code></pre>
<h3 id="articleHeader8"><span style="font-weight:normal;">🌱</span> MobilePDFReader</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { MobilePDFReader } from 'react-read-pdf'

...
<MobilePDFReader url={&quot;http://localhost:3000/test.pdf&quot;} ...>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> { MobilePDFReader } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-read-pdf'</span>

...
&lt;MobilePDFReader url={<span class="hljs-string">"http://localhost:3000/test.pdf"</span>} ...&gt;</code></pre>
<h4>MobilePDFReader组件中的属性</h4>
<table>
<tbody><tr>
<th>属性名称</th>
            <th>类型</th>
            <th>描述</th>
        </tr>
<tr>
<th>url</th>
            <th>字符串</th>
            <th>如果是字符串，那么url表示的是PDF文件的绝对或者相对地址  </th>
        </tr>
<tr>
<th>page</th>
            <th>数字</th>
            <th>默认值为1，表示应该渲染PDF文件的第几页</th>
        </tr>
<tr>
<th>scale</th>
            <th>数字或者“auto”</th>
            <th>默认值为“auto”,决定渲染的过程中视口的大小，推荐设置成“auto”可以根据移动设备自适应的适配scale</th>
        </tr>
<tr>
<th>minScale</th>
            <th>数字</th>
            <th>默认值0.25,  scale可取的最小值</th>
        </tr>
<tr>
<th>maxScale</th>
            <th>数字</th>
            <th>默认值10,  scale可取的最大值</th>
        </tr>
<tr>
<th>isShowHeader</th>
            <th>布尔值</th>
            <th>默认值为true，为了生动展示，当值为true，有默认自带的头部样式。设置为false可以去掉这个默认的样式。</th>
        </tr>
<tr>
<th>isShowFooter</th>
            <th>布尔值</th>
            <th>默认值为true，为了生动展示，当值为true，有默认自带的尾部样式。设置为false可以去掉这个默认的样式。</th>
        </tr>
<tr>
<th>onDocumentComplete</th>
            <th>函数</th>
            <th>将PDF文件加载后，可以通过这个函数输出PDF文件的详细信息。这个函数的具体信息如下所示。<a href="#function2">function type</a> for details</th>
        </tr>
</tbody></table>
<p><a><b>onDocumentComplete</b></a> <br><strong><em>MobilePDFReader</em></strong>的onDocumentComplete属性</p>
<p>类型: 函数</p>
<ul><li>function(totalPage,title,otherObj)</li></ul>
<p>函数的参数:</p>
<table>
<thead><tr>
<th>参数名称</th>
<th>类型</th>
<th>描述</th>
</tr></thead>
<tbody>
<tr>
<td>totalPage</td>
<td>数字</td>
<td>表示PDF文件的总页数</td>
</tr>
<tr>
<td>title</td>
<td>字符串</td>
<td>PDF文件的标题</td>
</tr>
<tr>
<td>otherObj</td>
<td>对象</td>
<td>PDF文件的其他扩展或者编码信息</td>
</tr>
</tbody>
</table>
<h4>注意事项</h4>
<p>scale的默认值为“auto”,强烈推荐将scale的值设置成“auto”，这样可以根据移动设备的大小自适应的改变scale的值。</p>
<h2 id="articleHeader9">开发者选项</h2>
<ul>
<li>
<strong><a href="https://facebook.github.io/react/" rel="nofollow noreferrer" target="_blank">React</a></strong> (16.x)</li>
<li>
<strong><a href="https://webpack.js.org/" rel="nofollow noreferrer" target="_blank">Webpack</a></strong> (4.x)</li>
<li>
<strong><a href="https://www.typescriptlang.org/" rel="nofollow noreferrer" target="_blank">Typescript</a></strong> (3.x)</li>
<li>
<strong><a href="https://webpack.js.org/concepts/hot-module-replacement/" rel="nofollow noreferrer" target="_blank">Hot Module Replacement (HMR)</a></strong> using <a href="https://github.com/gaearon/react-hot-loader" rel="nofollow noreferrer" target="_blank">React Hot Loader</a> (4.x)</li>
<li>
<a href="http://babeljs.io/" rel="nofollow noreferrer" target="_blank">Babel</a> (7.x)</li>
<li><a href="http://sass-lang.com/" rel="nofollow noreferrer" target="_blank">Less</a></li>
<li>
<a href="https://github.com/gajus/react-css-modules" rel="nofollow noreferrer" target="_blank">React-css-modules</a>using css-modules</li>
<li>
<a href="https://facebook.github.io/jest/" rel="nofollow noreferrer" target="_blank">Jest</a> - Testing framework for React applications</li>
<li>Production build script</li>
<li>Image loading/minification using <a href="https://github.com/tcoopman/image-webpack-loader" rel="nofollow noreferrer" target="_blank">Image Webpack Loader</a>
</li>
<li>Typescript compiling using <a href="https://github.com/TypeStrong/ts-loader" rel="nofollow noreferrer" target="_blank">Typescript Loader</a> (5.x)</li>
<li>Code quality (linting) for Typescript and LESS/CSS.</li>
</ul>
<h2 id="articleHeader10">安装</h2>
<ol>
<li>Clone/download repo</li>
<li>
<code>yarn install</code> (or <code>npm install</code> for npm)</li>
</ol>
<h2 id="articleHeader11">使用</h2>
<p><strong>Development</strong></p>
<p><code>yarn run start-dev</code></p>
<ul>
<li>Build app continuously (HMR enabled)</li>
<li>App served @ <code>http://localhost:8080</code>
</li>
</ul>
<p><strong>Production</strong></p>
<p><code>yarn run start-prod</code></p>
<ul>
<li>Build app once (HMR disabled)</li>
<li>App served @ <code>http://localhost:3000</code>
</li>
</ul>
<hr>
<p><strong>指令列表</strong></p>
<table>
<thead><tr>
<th>Command</th>
<th>Description</th>
</tr></thead>
<tbody>
<tr>
<td><code>yarn run start-dev</code></td>
<td>Build app continuously (HMR enabled) and serve @ <code>http://localhost:8080</code>
</td>
</tr>
<tr>
<td><code>yarn run start-prod</code></td>
<td>Build app once (HMR disabled) and serve @ <code>http://localhost:3000</code>
</td>
</tr>
<tr>
<td><code>yarn run build</code></td>
<td>Build app to <code>/dist/</code>
</td>
</tr>
<tr>
<td><code>yarn run test</code></td>
<td>Run tests</td>
</tr>
<tr>
<td><code>yarn run lint</code></td>
<td>Run Typescript and SASS linter</td>
</tr>
<tr>
<td><code>yarn run lint:ts</code></td>
<td>Run Typescript linter</td>
</tr>
<tr>
<td><code>yarn run lint:sass</code></td>
<td>Run SASS linter</td>
</tr>
<tr>
<td><code>yarn run start</code></td>
<td>(alias of <code>yarn run start-dev</code>)</td>
</tr>
</tbody>
</table>
<p><strong>Note</strong>: replace <code>yarn</code> with <code>npm</code> if you use npm.</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
发布一个react组件——react-read-pdf，用于在移动端展示PDF文件

## 原文链接
[https://segmentfault.com/a/1190000016802046](https://segmentfault.com/a/1190000016802046)

