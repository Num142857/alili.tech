---
title: 'Zent - 源自有赞微商城的 React 组件库' 
date: 2018-12-26 2:30:14
hidden: true
slug: ftlf8pzrx8s
categories: [reprint]
---

{{< raw >}}

                    
<p><a href="https://www.youzanyun.com/zanui/zent/" rel="nofollow noreferrer" target="_blank">Zent ( ˈzent )</a> 是有赞 PC 端 Web UI 规范的 React 实现版本，提供了一整套基础的 UI 组件以及常用的__业务组件__。通过 Zent，可以快速搭建出风格统一的页面，提升开发效率。目前我们有 45+ 组件，其中包括 <a href="https://www.youzanyun.com/zanui/zent/zh/component/design" rel="nofollow noreferrer" target="_blank"><code>Design</code></a> 以及 <a href="https://www.youzanyun.com/zanui/zent/zh/component/sku" rel="nofollow noreferrer" target="_blank"><code>SKU</code></a> 等实用的业务组件。这些组件都已经在有赞的各类 PC 业务中广泛使用，我们会在此基础上，持续开发更多实用的新组件。</p>
<p>我们的目标是做东半球最好的 React 组件库，让 React 开发更快、更简单。</p>
<h2 id="articleHeader0">一、特性</h2>
<ul>
<li><p>一套完整的 UI 组件库，组件都经过有赞的业务检验，实用又靠谱。</p></li>
<li><p>完善的中英文文档，每个组件都有详细的 API 说明以及可以运行的示例。</p></li>
<li><p>内置了 TypeScript 类型定义文件。</p></li>
<li><p>Zent 支持<a href="https://www.youzanyun.com/zanui/zent/zh/guides/theme" rel="nofollow noreferrer" target="_blank">自定义主题</a>，通过我们提供的工具你可以在不修改代码的情况下将组件库的整体色调改成你想要的任何颜色。</p></li>
</ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011947694?w=1028&amp;h=638" src="https://static.alili.tech/img/remote/1460000011947694?w=1028&amp;h=638" alt="zent-theme" title="zent-theme" style="cursor: pointer; display: inline;"></span></p>
<ul>
<li><p>一套有赞设计师绘制的图标库。</p></li>
<li><p>单测覆盖率在 90% 以上。</p></li>
<li><p>提供了一个 <a href="https://www.youzanyun.com/zanui/zent/zh/guides/babel-plugin-zent" rel="nofollow noreferrer" target="_blank">babel 插件</a>自动化按需加载代码，只引入使用到的 JavaScript 以及 CSS 文件，减小 bundle 体积。</p></li>
</ul>
<h2 id="articleHeader1">二、我们的优势: 丰富实用的组件</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011947695?w=1042&amp;h=1276" src="https://static.alili.tech/img/remote/1460000011947695?w=1042&amp;h=1276" alt="zent-components" title="zent-components" style="cursor: pointer; display: inline;"></span></p>
<p>下面是一些组件的简单展示，另外我们也提供了一些<a href="https://www.youzanyun.com/zanui/zent/zh/guides/demos" rel="nofollow noreferrer" target="_blank">项目示例</a>，可以帮助你快速使用 Zent 搭建一个页面。</p>
<h3 id="articleHeader2"><a href="https://www.youzanyun.com/zanui/zent/zh/component/datepicker" rel="nofollow noreferrer" target="_blank">时间选择</a></h3>
<p>做过 Web 开发的都知道浏览器原生的时间选择组件不仅不好用，还有各种兼容性问题。为了解决这些问题，Zent 提供了一套自己的时间选择组件，包括日期选择、周选择组件、月选择以及时间区间选择。为了适应不同场景的需求，时间区间选择还提供了两种不同的交互模式。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011947696?w=1930&amp;h=1426" src="https://static.alili.tech/img/remote/1460000011947696?w=1930&amp;h=1426" alt="zent-datepicker" title="zent-datepicker" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader3"><a href="https://www.youzanyun.com/zanui/zent/zh/component/colorpicker" rel="nofollow noreferrer" target="_blank">颜色选择器</a></h3>
<p>和时间选择一样，颜色选择在 Web 上也是一个问题，Zent 同样提供了一个功能强大又方便的颜色选择组件。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011947697" src="https://static.alili.tech/img/remote/1460000011947697" alt="zent-colorpicker" title="zent-colorpicker" style="cursor: pointer; display: inline;"></span></p>
<p>除了常用的基础组件，Zent 还提供了丰富的__业务组件__，开发者可以使用这些组件快速实现业务功能。</p>
<h3 id="articleHeader4"><a href="https://www.youzanyun.com/zanui/zent/zh/component/design" rel="nofollow noreferrer" target="_blank">微页面编辑</a></h3>
<p>我们还开源了有赞的微页面编辑组件，支持自定义微页面内的组件，让你轻轻松松写出一个WebApp，让普通用户也可以搭建含动态数据的页面的。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011947698?w=1516&amp;h=1306" src="https://static.alili.tech/img/remote/1460000011947698?w=1516&amp;h=1306" alt="zent-design" title="zent-design" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader5"><a href="https://www.youzanyun.com/zanui/zent/zh/component/sku" rel="nofollow noreferrer" target="_blank">SKU 选择</a></h3>
<p>商品规格是商品很重要的一个属性，Zent 的 SKU 选择组件封装了商品规格选择的逻辑，让你从复杂的交互中解放出来，有更多精力去优化业务的实现。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011947699" src="https://static.alili.tech/img/remote/1460000011947699" alt="zent-sku" title="zent-sku" style="cursor: pointer;"></span></p>
<h3 id="articleHeader6"><a href="https://www.youzanyun.com/zanui/zent/zh/component/cascader" rel="nofollow noreferrer" target="_blank">省市区选择</a></h3>
<p>Zent 也提供了地址输入中常用的省市区选择组件，这个功能是由级联选择组件实现的。级联选择组件不仅仅可以用来实现省市区选择，很多有层次关系的内容选择都可以通过这个交互实现，例如店铺的主营业务类目选择等。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011947700?w=890&amp;h=348" src="https://static.alili.tech/img/remote/1460000011947700?w=890&amp;h=348" alt="zent-cascader" title="zent-cascader" style="cursor: pointer; display: inline;"></span></p>
<p>我们会继续开放更多基于 Zent 的实用业务组件，敬请期待。</p>
<h2 id="articleHeader7">三、展望</h2>
<p>Zent 还有不少功能没有完善，例如还没有<a href="https://github.com/youzan/zent/issues/174" rel="nofollow noreferrer" target="_blank">动画基础设施</a>，很期待得到大家的批评和帮助，一起打造一个更完善、更好用的 Zent。</p>
<p>完整代码请移步 <a href="https://github.com/youzan/zent" rel="nofollow noreferrer" target="_blank">Github</a>，使用指南请移步<a href="https://www.youzanyun.com/zanui/zent" rel="nofollow noreferrer" target="_blank">文档网站</a>。</p>
<blockquote><p>本文首发于<a href="https://tech.youzan.com/zent-opensource-and-future/" rel="nofollow noreferrer" target="_blank">有赞技术博客</a>。</p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Zent - 源自有赞微商城的 React 组件库

## 原文链接
[https://segmentfault.com/a/1190000011947689](https://segmentfault.com/a/1190000011947689)

