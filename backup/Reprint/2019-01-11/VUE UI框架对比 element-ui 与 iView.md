---
title: 'VUE UI框架对比 element-ui 与 iView' 
date: 2019-01-11 2:30:08
hidden: true
slug: 7gp5z8y3x44
categories: [reprint]
---

{{< raw >}}

                    
<p>element VS iview<br>(最近项目UI框架在选型 ，做了个分析， 不带有任何利益相关）<br>主要从以下几个方面来做对比<br>使用率（npm 平均下载频率，组件数量，star, issue…)<br>API风格<br>打包优化<br>与设计师友好性</p>
<p>1，使用率（npm 平均下载频率，组件数量，star, issue…)<br>element-ui</p>
<p>npm 下载次数 以及issue</p>
<p><span class="img-wrap"><img data-src="/img/bVPxg6?w=1860&amp;h=768" src="https://static.alili.tech/img/bVPxg6?w=1860&amp;h=768" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>目前明显未解决bug遗留数量  ,</p>
<p><span class="img-wrap"><img data-src="/img/bVPxho?w=2044&amp;h=802" src="https://static.alili.tech/img/bVPxho?w=2044&amp;h=802" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>这个应该跟生态也有关系， 用element 的人多，发现bug 的几率更大，2是iview 里面有很多issue 写明是UI组件的问题 但未标明是确切的bug .</p>
<p><span class="img-wrap"><img data-src="/img/bVPxhC?w=2042&amp;h=958" src="https://static.alili.tech/img/bVPxhC?w=2042&amp;h=958" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>以上对比 其实可以看出， element 开发者团队规模大于iview 团队，其结果就是 无论是提交代码频率， 发布版本数量 都比iview 更强！</p>
<p><span class="img-wrap"><img data-src="/img/bVPxhN?w=1950&amp;h=1118" src="https://static.alili.tech/img/bVPxhN?w=1950&amp;h=1118" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>截止2017/6/17 最新支持组件对比</p>
<p><span class="img-wrap"><img data-src="/img/bVPxhY?w=900&amp;h=1420" src="https://static.alili.tech/img/bVPxhY?w=900&amp;h=1420" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVPxib?w=902&amp;h=1432" src="https://static.alili.tech/img/bVPxib?w=902&amp;h=1432" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVPxig?w=896&amp;h=702" src="https://static.alili.tech/img/bVPxig?w=896&amp;h=702" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>（PS 这个是直接看的 官方文档上面的组件列表 ，不代表最后结果）</p>
<p>结论 ，element 生态更好，使用频率远超过iview ,element开发团队实力更强<br>一些小众组件上各有所长 整体iview 更丰富（时间轴，加载进度条，气泡卡片 ，BackTop,图钉）<br>API风格<br>通过使用平率最高的 form table 日历 select 等比较两者</p>
<p><span class="img-wrap"><img data-src="/img/bVPxiO?w=2014&amp;h=898" src="https://static.alili.tech/img/bVPxiO?w=2014&amp;h=898" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span><br>对应代码</p>
<p><span class="img-wrap"><img data-src="/img/bVPxi4?w=1990&amp;h=822" src="https://static.alili.tech/img/bVPxi4?w=1990&amp;h=822" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>明显感觉 iview 的api 更加简洁，在生成类似表格 下拉框这些较复杂的组件时 ， iview 的方式类似于antdesign , 好处是直接传数据进去，在内部实现了模板生成，高效 快捷。 而element 则是用到到v-for vue指令结合的方式去生成，批量生成元素。</p>
<p><span class="img-wrap"><img data-src="/img/bVPxi9?w=1990&amp;h=578" src="https://static.alili.tech/img/bVPxi9?w=1990&amp;h=578" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>表格 操作列 自定义渲染的时 ，iview 使用的是 vue的 render 函数， element 直接在template 中插入对应模板 <br>表格分页都需要 引入分页组件 配合使用</p>
<p><span class="img-wrap"><img data-src="/img/bVPxjl?w=1996&amp;h=1038" src="https://static.alili.tech/img/bVPxjl?w=1996&amp;h=1038" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>两者api 总体比较 ，iview 要比element 简洁许多。 饿了么更侧重于在template里直接去渲染模板<br>思想上 个人觉得iview偏向react, element 更vue</p>
<p>表单校验 两者都使用同一款插件 async-validator 校验方式一样</p>
<p>项目优化角度<br>首屏优化，第三方组件库依赖过大 会给首屏加载带来很大的压力，一般解决方式是 按需求引入组件<br>element-ui 根据官方说明 现需要引入 babel-plugin-component 插件 做相关配置 然后直接在组件目录 注册全局组件<br><span class="img-wrap"><img data-src="/img/bVPxxQ?w=1128&amp;h=778" src="https://static.alili.tech/img/bVPxxQ?w=1128&amp;h=778" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>这里感觉官方给的文档不是很详细 </p>
<p><span class="img-wrap"><img data-src="/img/bVPxx4?w=1994&amp;h=736" src="https://static.alili.tech/img/bVPxx4?w=1994&amp;h=736" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>主题<br>iview</p>
<p>本身提供了一套主题可供选择，除此之外 自定义主题</p>
<p>方法一（官方推荐，前提条件是使用webpack）:<br>新建一个.less 文件 ， 先在less文件中引入官方样式文件 然后在此基础上复写</p>
<p><span class="img-wrap"><img data-src="/img/bVPxx9?w=860&amp;h=230" src="https://static.alili.tech/img/bVPxx9?w=860&amp;h=230" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>方法二 ： <br>官方提供了 自动编译工具iview-them 来编译。干的事情就是 把自定义的样式和 github仓库最新的样式 通过工具生成一个新的样式文件。</p>
<p>element-ui<br>如果只替换颜色 ，可以使用 在线主题生成工具 在线编辑颜色， 生成element-ui 主题 直接下载 再引入</p>
<p>深度定制主题<br>官方提供了 主题生成工具 element-them <br>执行命令 初始化得到一个配置文件 ，修改相关配置 经过编译得到 得到相关主题文件 再通过babel 插件引入</p>
<p><span class="img-wrap"><img data-src="/img/bVPxyb?w=518&amp;h=332" src="https://static.alili.tech/img/bVPxyb?w=518&amp;h=332" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>双方都提供了专门的工具用于深度定制主题，综合比较 iview 更加简单，element 主题定制需要配合 babel做一些预编译 ，以及步骤更多 显得更加复杂</p>
<p>过渡动画<br>element 有内置过渡动画 使得组件的切换变化 更具动感<br>iview 更为中规中矩</p>
<p>对设计人员<br>element 提供了 Sketch 和 Axure 工具 对设计人员友好<br>iview 没有提供</p>
<p>以上 ...</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
VUE UI框架对比 element-ui 与 iView

## 原文链接
[https://segmentfault.com/a/1190000009860218](https://segmentfault.com/a/1190000009860218)

