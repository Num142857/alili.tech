---
title: '高性能迷你React框架anujs1.1.3发布' 
date: 2018-12-29 2:30:10
hidden: true
slug: f3zrh2d4xs9
categories: [reprint]
---

{{< raw >}}

                    
<p>anujs现在只差一个组件（mention）就完全支持阿里的antd UI库了。一共跑通346个测试, 应该是全世界最接近官方React的迷你框架了。</p>
<p><span class="img-wrap"><img data-src="/img/bVWhAb?w=996&amp;h=658" src="https://static.alili.tech/img/bVWhAb?w=996&amp;h=658" alt="clipboard.png" title="clipboard.png"></span></p>
<p>以后的工作就是把React16的一些新特性支持了，包括组件返回数字、字符串、数组， componentDidCatch钩子与createPortal。</p>
<p>主要更新点：</p>
<ol>
<li>抽象出一个Update类，用于封装组件实例上的所有私有数据</li>
<li>抽象出一个instantiateComponente用于同时实例化有状态与无状态组件，从此再没有 mountStateless, updateStateless方法</li>
<li>修正checkbox点一下会触发两次onChange的BUG</li>
<li>添加ReceiveComponent检测机制，如果context,props一样，那么就不会执行receive, render, update等钩子</li>
<li>修改检测空对象的逻辑</li>
<li>简化任务调度系统的逻辑.</li>
</ol>
<p>个人认为要实现异步渲染其实不难的，因为早期的anujs也用到异步。但要一套代码支持两套生命周期系统，还是蛮复杂的。随着代码的增加，我会将一些废弃的方法拆分出来。在打包时，根据你们的喜好进行选择。</p>
<p>使用</p>
<pre><code>npm i anujs</code></pre>
<p>或者使用架手架 <a href="https://github.com/Levan-Du/anu-cli" rel="nofollow noreferrer">https://github.com/Levan-Du/a...</a></p>
<pre><code>npm i -g anu-cli</code></pre>
<p>webpack.config中如何代替原来用React编写的项目</p>
<pre><code>resolve: {
   alias: {
      'react': 'anujs',
      'react-dom': 'anujs',
        // 若要兼容 IE 请使用以下配置
        // 'react': 'qreact/dist/ReactIE',
        // 'react-dom': 'qreact/dist/ReactIE',
    
        // 如果引用了 prop-types 或 create-react-class
        // 需要添加如下别名
        'prop-types': 'qreact/lib/ReactPropTypes',
        'create-react-class': 'qreact/lib/createClass'
        //如果你在移动端用到了onTouchTap事件
        'react-tap-event-plugin': 'anujs/lib/injectTapEventPlugin',  
   }
},</code></pre>
<p>欢迎大家为anujs加星星与试用！！！</p>
<p><a href="https://github.com/RubyLouvre/anu" rel="nofollow noreferrer">https://github.com/RubyLouvre...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
高性能迷你React框架anujs1.1.3发布

## 原文链接
[https://segmentfault.com/a/1190000011468332](https://segmentfault.com/a/1190000011468332)

