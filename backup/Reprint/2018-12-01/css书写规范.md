---
title: 'css书写规范' 
date: 2018-12-01 2:30:12
hidden: true
slug: up6wbkr2zp
categories: [reprint]
---

{{< raw >}}

                    
<p>在书写css样式的时候总是无意中就写乱了，无论是命名或者是样式的书写顺序，这里做一个总结，提醒自己在书写css的时候时刻注意，大家可以参考哈。</p>
<h2 id="articleHeader0">1. 样式属性顺序</h2>
<p>单个样式规则下的属性在书写时，应按功能进行分组，组之间需要有一个空行。<br>同时要以Positioning Model &gt; Box Model &gt; Typographic &gt; Visual 的顺序书写，提高代码的可读性。</p>
<ol>
<li>Positioning Model 布局方式、位置，相关属性包括：position, top, z-index, display, float等</li>
<li>Box Model 盒模型，相关属性包括：width, height, padding, margin，border,overflow</li>
<li>Typographic 文本排版，相关属性包括：font, line-height, text-align</li>
<li>Visual 视觉外观，相关属性包括：color, background, list-style, transform, animation</li>
</ol>
<h2 id="articleHeader1">2. CSS选择器命名规则</h2>
<ul>
<li>
<p>分类式命名法(在前端组件化下尤为重要)</p>
<ol>
<li>布局（grid）（.g-）：将页面分割为几个大块，通常有头部、主体、主栏、侧栏、尾部等！</li>
<li>模块（module）（.m-）：通常是一个语义化的可以重复使用的较大的整体！比如导航、登录、注册等</li>
<li>元件（unit）（.u-）：通常是一个不可再分的较为小巧的个体，通常被重复用于各种模块中！比如按钮、输 入框、loading等！</li>
<li>功能（function）（.f-）：为方便一些常用样式的使用，我们将这些使用率较高的样式剥离出来，按需使用，通常这些选择器具有固定样式表现，比如清除浮动等！不可滥用！</li>
<li>状态（.z-）：为状态类样式加入前缀，统一标识，方便识别，她只能组合使用或作为后代出现（.u-ipt.z-dis{}，.m-list li.z-sel{}）</li>
<li>javascript(.j-)：.j-将被专用于JS获取节点，请勿使用.j-定义样式</li>
</ol>
</li>
<li>不要使用 " _ " 下划线来命名css<br>能良好的区分javascript变量名<br>输入的时候少按一个shift键<br>浏览器兼容性问题（比如使用_tips的选择器命名，在IE6是无效的）</li>
<li>id采用驼峰式命名(不要乱用id)</li>
<li>scss中的变量、函数、混合、placeholder采用驼峰式命名</li>
<li>相同语义的不同类命名方法：<br>  直接加数字或字母区分即可（如：.m-list、.m-list2、.m-list3等，都是列表模块，但是是完全不一样的模块）。其他举例：.f-fw0、.f-fw1、.s-fc0、.s-fc1、.m-logo2、.m-logo3、u-btn、u-btn2等等。</li>
<li>命名方式(BEM)：类-体（例：g-head）、类-体-修饰符（例：u-btn-active）</li>
<li>后代选择器：体-修饰符即可（例：.m-page .cut{}）注：后代选择器不要在页面布局中使用，因为污染的可能性较大；</li>
</ul>
<h2 id="articleHeader2">3. 最佳写法</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    /* 这是某个模块 */
    .m-nav{}/* 模块容器 */
    .m-nav li,.m-nav a{}/* 先共性  优化组合 */
    .m-nav li{}/* 后个性  语义化标签选择器 */
    .m-nav a{}/* 后个性中的共性 按结构顺序 */
    .m-nav a.a1{}/* 后个性中的个性 */
    .m-nav a.a2{}/* 后个性中的个性 */
    .m-nav .z-crt a{}/* 交互状态变化 */
    .m-nav .z-crt a.a1{}
    .m-nav .z-crt a.a2{}
    .m-nav .btn{}/* 典型后代选择器 */
    .m-nav .btn-1{}/* 典型后代选择器扩展 */
    .m-nav .btn-dis{}/* 典型后代选择器扩展（状态） */
    .m-nav .btn.z-dis{}/* 作用同上，请二选一（如果可以不兼容IE6时使用） */
    .m-nav .m-sch{}/* 控制内部其他模块位置 */
    .m-nav .u-sel{}/* 控制内部其他元件位置 */
    .m-nav-1{}/* 模块扩展 */
    .m-nav-1 li{}
    .m-nav-dis{}/* 模块扩展（状态） */
    .m-nav.z-dis{}/* 作用同上，请二选一（如果可以不兼容IE6时使用） */" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>    <span class="hljs-comment">/* 这是某个模块 */</span>
    <span class="hljs-selector-class">.m-nav</span>{}<span class="hljs-comment">/* 模块容器 */</span>
    <span class="hljs-selector-class">.m-nav</span> <span class="hljs-selector-tag">li</span>,<span class="hljs-selector-class">.m-nav</span> <span class="hljs-selector-tag">a</span>{}<span class="hljs-comment">/* 先共性  优化组合 */</span>
    <span class="hljs-selector-class">.m-nav</span> <span class="hljs-selector-tag">li</span>{}<span class="hljs-comment">/* 后个性  语义化标签选择器 */</span>
    <span class="hljs-selector-class">.m-nav</span> <span class="hljs-selector-tag">a</span>{}<span class="hljs-comment">/* 后个性中的共性 按结构顺序 */</span>
    <span class="hljs-selector-class">.m-nav</span> <span class="hljs-selector-tag">a</span><span class="hljs-selector-class">.a1</span>{}<span class="hljs-comment">/* 后个性中的个性 */</span>
    <span class="hljs-selector-class">.m-nav</span> <span class="hljs-selector-tag">a</span><span class="hljs-selector-class">.a2</span>{}<span class="hljs-comment">/* 后个性中的个性 */</span>
    <span class="hljs-selector-class">.m-nav</span> <span class="hljs-selector-class">.z-crt</span> <span class="hljs-selector-tag">a</span>{}<span class="hljs-comment">/* 交互状态变化 */</span>
    <span class="hljs-selector-class">.m-nav</span> <span class="hljs-selector-class">.z-crt</span> <span class="hljs-selector-tag">a</span><span class="hljs-selector-class">.a1</span>{}
    <span class="hljs-selector-class">.m-nav</span> <span class="hljs-selector-class">.z-crt</span> <span class="hljs-selector-tag">a</span><span class="hljs-selector-class">.a2</span>{}
    <span class="hljs-selector-class">.m-nav</span> <span class="hljs-selector-class">.btn</span>{}<span class="hljs-comment">/* 典型后代选择器 */</span>
    <span class="hljs-selector-class">.m-nav</span> <span class="hljs-selector-class">.btn-1</span>{}<span class="hljs-comment">/* 典型后代选择器扩展 */</span>
    <span class="hljs-selector-class">.m-nav</span> <span class="hljs-selector-class">.btn-dis</span>{}<span class="hljs-comment">/* 典型后代选择器扩展（状态） */</span>
    <span class="hljs-selector-class">.m-nav</span> <span class="hljs-selector-class">.btn</span><span class="hljs-selector-class">.z-dis</span>{}<span class="hljs-comment">/* 作用同上，请二选一（如果可以不兼容IE6时使用） */</span>
    <span class="hljs-selector-class">.m-nav</span> <span class="hljs-selector-class">.m-sch</span>{}<span class="hljs-comment">/* 控制内部其他模块位置 */</span>
    <span class="hljs-selector-class">.m-nav</span> <span class="hljs-selector-class">.u-sel</span>{}<span class="hljs-comment">/* 控制内部其他元件位置 */</span>
    <span class="hljs-selector-class">.m-nav-1</span>{}<span class="hljs-comment">/* 模块扩展 */</span>
    <span class="hljs-selector-class">.m-nav-1</span> <span class="hljs-selector-tag">li</span>{}
    <span class="hljs-selector-class">.m-nav-dis</span>{}<span class="hljs-comment">/* 模块扩展（状态） */</span>
    <span class="hljs-selector-class">.m-nav</span><span class="hljs-selector-class">.z-dis</span>{}<span class="hljs-comment">/* 作用同上，请二选一（如果可以不兼容IE6时使用） */</span></code></pre>
<h2 id="articleHeader3">4. 统一语义理解和命名</h2>
<ul>
<li>
<p>布局(.g-)</p>
<table>
<thead><tr>
<th>语义</th>
<th>命名</th>
<th>简写</th>
</tr></thead>
<tbody>
<tr>
<td>文档</td>
<td>doc</td>
<td>doc</td>
</tr>
<tr>
<td>头部</td>
<td>head</td>
<td>hd</td>
</tr>
<tr>
<td>主体</td>
<td>body</td>
<td>bd</td>
</tr>
<tr>
<td>尾部</td>
<td>foot</td>
<td>ft</td>
</tr>
<tr>
<td>主栏</td>
<td>main</td>
<td>mn</td>
</tr>
<tr>
<td>主栏子容器</td>
<td>mainc</td>
<td>mnc</td>
</tr>
<tr>
<td>侧栏</td>
<td>side</td>
<td>sd</td>
</tr>
<tr>
<td>侧栏子容器</td>
<td>sidec</td>
<td>sdc</td>
</tr>
<tr>
<td>盒容器</td>
<td>wrap/box</td>
<td>wrap/box</td>
</tr>
</tbody>
</table>
</li>
<li>
<p>模块（.m-）、元件（.u-）</p>
<table>
<thead><tr>
<th>语义</th>
<th>命名</th>
<th>简写</th>
</tr></thead>
<tbody>
<tr>
<td>导航</td>
<td>nav</td>
<td>nav</td>
</tr>
<tr>
<td>子导航</td>
<td>subnav</td>
<td>snav</td>
</tr>
<tr>
<td>面包屑</td>
<td>crumb</td>
<td>crm</td>
</tr>
<tr>
<td>菜单</td>
<td>menu</td>
<td>menu</td>
</tr>
<tr>
<td>选项卡</td>
<td>tab</td>
<td>tab</td>
</tr>
<tr>
<td>标题区</td>
<td>head/title</td>
<td>hd/tt</td>
</tr>
<tr>
<td>内容区</td>
<td>body/content</td>
<td>bd/ct</td>
</tr>
<tr>
<td>列表</td>
<td>list</td>
<td>lst</td>
</tr>
<tr>
<td>表格</td>
<td>table</td>
<td>tb</td>
</tr>
<tr>
<td>表单</td>
<td>form</td>
<td>fm</td>
</tr>
<tr>
<td>热点</td>
<td>hot</td>
<td>hot</td>
</tr>
<tr>
<td>排行</td>
<td>top</td>
<td>top</td>
</tr>
<tr>
<td>登录</td>
<td>login</td>
<td>log</td>
</tr>
<tr>
<td>标志</td>
<td>logo</td>
<td>logo</td>
</tr>
<tr>
<td>广告</td>
<td>advertise</td>
<td>ad</td>
</tr>
<tr>
<td>搜索</td>
<td>search</td>
<td>sch</td>
</tr>
<tr>
<td>幻灯</td>
<td>slide</td>
<td>sld</td>
</tr>
<tr>
<td>提示</td>
<td>tips</td>
<td>tips</td>
</tr>
<tr>
<td>帮助</td>
<td>help</td>
<td>help</td>
</tr>
<tr>
<td>新闻</td>
<td>news</td>
<td>news</td>
</tr>
<tr>
<td>下载</td>
<td>download</td>
<td>dld</td>
</tr>
<tr>
<td>注册</td>
<td>regist</td>
<td>reg</td>
</tr>
<tr>
<td>投票</td>
<td>vote</td>
<td>vote</td>
</tr>
<tr>
<td>版权</td>
<td>vcopyright</td>
<td>cprt</td>
</tr>
<tr>
<td>结果</td>
<td>result</td>
<td>rst</td>
</tr>
<tr>
<td>标题</td>
<td>title</td>
<td>tt</td>
</tr>
<tr>
<td>按钮</td>
<td>button</td>
<td>btn</td>
</tr>
<tr>
<td>输入</td>
<td>input</td>
<td>ipt</td>
</tr>
</tbody>
</table>
</li>
<li>
<p>功能（.f-）</p>
<table>
<thead><tr>
<th>语义</th>
<th>命名</th>
<th>简写</th>
</tr></thead>
<tbody>
<tr>
<td>清除浮动</td>
<td>clearboth</td>
<td>cb</td>
</tr>
<tr>
<td>左浮动</td>
<td>floatleft</td>
<td>fl</td>
</tr>
<tr>
<td>内联</td>
<td>inlineblock</td>
<td>ib</td>
</tr>
<tr>
<td>文本居中</td>
<td>textaligncenter</td>
<td>tac</td>
</tr>
<tr>
<td>垂直居中</td>
<td>verticalalignmiddle</td>
<td>vam</td>
</tr>
<tr>
<td>溢出隐藏</td>
<td>overflowhidden</td>
<td>oh</td>
</tr>
<tr>
<td>完全消失</td>
<td>displaynone</td>
<td>dn</td>
</tr>
<tr>
<td>字体大小</td>
<td>fontsize</td>
<td>fz</td>
</tr>
<tr>
<td>字体粗细</td>
<td>fontweight</td>
<td>fs</td>
</tr>
</tbody>
</table>
</li>
<li>
<p>皮肤（.s-）</p>
<table>
<thead><tr>
<th>语义</th>
<th>命名</th>
<th>简写</th>
</tr></thead>
<tbody>
<tr>
<td>字体颜色</td>
<td>fontcolor</td>
<td>fc</td>
</tr>
<tr>
<td>背景颜色</td>
<td>backgroundcolor</td>
<td>bgc</td>
</tr>
<tr>
<td>边框颜色</td>
<td>bordercolor</td>
<td>bdc</td>
</tr>
</tbody>
</table>
</li>
<li>
<p>状态(.z-)</p>
<table>
<thead><tr>
<th>语义</th>
<th>命名</th>
<th>简写</th>
</tr></thead>
<tbody>
<tr>
<td>选中</td>
<td>selected</td>
<td>sel</td>
</tr>
<tr>
<td>当前</td>
<td>current</td>
<td>crt</td>
</tr>
<tr>
<td>显示</td>
<td>show</td>
<td>show</td>
</tr>
<tr>
<td>隐藏</td>
<td>hide</td>
<td>hide</td>
</tr>
<tr>
<td>打开</td>
<td>open</td>
<td>open</td>
</tr>
<tr>
<td>关闭</td>
<td>close    vclose</td>
</tr>
<tr>
<td>出错</td>
<td>error</td>
<td>err</td>
</tr>
<tr>
<td>不可用</td>
<td>disabled</td>
<td>dis</td>
</tr>
</tbody>
</table>
</li>
</ul>
<h2 id="articleHeader4">5. 注意事项</h2>
<ol>
<li>一律小写，中划线</li>
<li>尽量不用缩写</li>
<li>不要随便使用id</li>
<li>去掉小数点前面的0： 0.9rem =&gt; .9rem</li>
<li>使用简写：margin： 0 1rem 3rem</li>
</ol>
<p>本文大部分内容参考自网易前端规范：<a href="http://nec.netease.com/standard/css-sort.html" rel="nofollow noreferrer" target="_blank"></a><a href="http://nec.netease.com/standard/css-sort.html" rel="nofollow noreferrer" target="_blank">http://nec.netease.com/standa...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
css书写规范

## 原文链接
[https://segmentfault.com/a/1190000014757323](https://segmentfault.com/a/1190000014757323)

