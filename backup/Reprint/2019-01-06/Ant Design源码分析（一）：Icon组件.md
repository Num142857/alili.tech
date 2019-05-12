---
title: 'Ant Design源码分析（一）：Icon组件' 
date: 2019-01-06 2:30:10
hidden: true
slug: 87mbez8d2ry
categories: [reprint]
---

{{< raw >}}

                    
<ul>
<li>
<h2 id="articleHeader0">提笔前言</h2>
<p>工作中结合Ant Design开发React项目已经有一段时间了，最近开始阅读Ant Design的源码，略有收获。现在整理一下阅读源码过程中的一些记录与心得。文中如有解释不准确的地方，欢迎指出，欢迎拍砖，文明用语，谢~</p>
</li>
<li>
<h2 id="articleHeader1">Ant简介</h2>
<p>Ant Design（以下简称为Antd）是基于React的UI库，不仅提供了各种常用组件，还提供了大量的设计规范指导。而本系列文章是从Antd的各个组件来揣摩下作者大大们的思路，先从最最基本的UI组件：Icon开始</p>
</li>
<li>
<h2 id="articleHeader2">Icon分析</h2>
<p>Antd的源码采用了TypeScript（JavaScript的超集，以下简称TS），阅读源码是需要一些的TS的基础知识的，链接在此<a href="https://www.tslang.cn/docs/handbook/basic-types.html" rel="nofollow noreferrer" target="_blank">TS手册指南</a></p>
</li>
</ul>
<p>源码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react'; 不清楚它为什么能直接这么引用react的？  我们引用是import React as * 
from 'react; 有人清楚的话望不吝指教，
import classNames from 'classnames';  
import omit from 'omit.js';
//React就不用说了，classNames与omit这两个文件的作用：
//前者是条件判断输出className的值，后者是移出对象的指定属性，而实现浅拷贝
//这两个依赖API很简单，就不多说了，有兴趣的可以自己去github上看一下：
//omit https://github.com/benjycui/omit.js， 需要注意的是retruns the new Object 与lodash中的
//omit类似
//classnames  https://github.com/JedWatson/classnames

//定义IconProps接口
export interface IconProps {
  type: string;  //配合className，决定了显示的类型
  className?: string;
  title?: string;
  onClick?: React.MouseEventHandler<any>; //接口里定义了的事件，虽然没有定义其它事件，但是也是可以
//加的，只不过编译阶段可能报错， 另外，这个MouseEventHandler难道是自己随意起的名字，再定义为any？应该
//不是吧？要不然为什么会前面是React
  spin?: boolean;  //  结合对应的className，控制icon旋转
  style?: React.CSSProperties;
}

const Icon = (props: IconProps) => {//TypeScript的无状态组件的写法
  const { type, className = '', spin } = props;
  const classString = classNames({
    anticon: true,
    'anticon-spin': !!spin || type === 'loading',
    [`anticon-${type}`]: true,
  }, className);

  // 这里说一下为什么要用omit()：html的<i>标签，其标准标签属性只有六种：id、class、title、style、
dir、lang。
  // IconProps接口中的6种属性（方法），type、spin不属于上述六种。onClick为事件属性，可以；
  return <i {...omit(props, ['type', 'spin'])} className={classString} />;
};

export default Icon;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-keyword">import</span> <span class="hljs-type">React</span> from <span class="hljs-symbol">'reac</span>t'; 不清楚它为什么能直接这么引用react的？  我们引用是<span class="hljs-keyword">import</span> <span class="hljs-type">React</span> as * 
from <span class="hljs-symbol">'react</span>; 有人清楚的话望不吝指教，
<span class="hljs-keyword">import</span> classNames from <span class="hljs-symbol">'classname</span>s';  
<span class="hljs-keyword">import</span> omit from <span class="hljs-symbol">'omit</span>.js';
<span class="hljs-comment">//React就不用说了，classNames与omit这两个文件的作用：</span>
<span class="hljs-comment">//前者是条件判断输出className的值，后者是移出对象的指定属性，而实现浅拷贝</span>
<span class="hljs-comment">//这两个依赖API很简单，就不多说了，有兴趣的可以自己去github上看一下：</span>
<span class="hljs-comment">//omit https://github.com/benjycui/omit.js， 需要注意的是retruns the new Object 与lodash中的</span>
<span class="hljs-comment">//omit类似</span>
<span class="hljs-comment">//classnames  https://github.com/JedWatson/classnames</span>

<span class="hljs-comment">//定义IconProps接口</span>
export interface <span class="hljs-type">IconProps</span> {
  <span class="hljs-class"><span class="hljs-keyword">type</span></span>: string;  <span class="hljs-comment">//配合className，决定了显示的类型</span>
  className?: string;
  title?: string;
  onClick?: <span class="hljs-type">React</span>.<span class="hljs-type">MouseEventHandler</span>&lt;any&gt;; <span class="hljs-comment">//接口里定义了的事件，虽然没有定义其它事件，但是也是可以</span>
<span class="hljs-comment">//加的，只不过编译阶段可能报错， 另外，这个MouseEventHandler难道是自己随意起的名字，再定义为any？应该</span>
<span class="hljs-comment">//不是吧？要不然为什么会前面是React</span>
  spin?: boolean;  <span class="hljs-comment">//  结合对应的className，控制icon旋转</span>
  style?: <span class="hljs-type">React</span>.<span class="hljs-type">CSSProperties</span>;
}

const <span class="hljs-type">Icon</span> = (props: <span class="hljs-type">IconProps</span>) =&gt; {<span class="hljs-comment">//TypeScript的无状态组件的写法</span>
  const { <span class="hljs-class"><span class="hljs-keyword">type</span>, <span class="hljs-title">className</span> </span>= '', spin } = props;
  const classString = classNames({
    anticon: <span class="hljs-literal">true</span>,
    <span class="hljs-symbol">'anticon</span>-spin': !!spin || <span class="hljs-class"><span class="hljs-keyword">type</span> <span class="hljs-title">===</span> '<span class="hljs-title">loading</span>',</span>
    [`anticon-${<span class="hljs-class"><span class="hljs-keyword">type</span>}`]</span>: <span class="hljs-literal">true</span>,
  }, className);

  <span class="hljs-comment">// 这里说一下为什么要用omit()：html的&lt;i&gt;标签，其标准标签属性只有六种：id、class、title、style、</span>
dir、lang。
  <span class="hljs-comment">// IconProps接口中的6种属性（方法），type、spin不属于上述六种。onClick为事件属性，可以；</span>
  <span class="hljs-keyword">return</span> &lt;i {...omit(props, [<span class="hljs-symbol">'typ</span>e', <span class="hljs-symbol">'spi</span>n'])} className={classString} /&gt;;
};

export <span class="hljs-keyword">default</span> <span class="hljs-type">Icon</span>;
</code></pre>
<p>Icon是Antd中最小的组件，作者大大们通过css来定义了Icon的交互与动画。此组件比较简单，有兴趣的童鞋可以继续查看该系列接下来的文章</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Ant Design源码分析（一）：Icon组件

## 原文链接
[https://segmentfault.com/a/1190000010416622](https://segmentfault.com/a/1190000010416622)

