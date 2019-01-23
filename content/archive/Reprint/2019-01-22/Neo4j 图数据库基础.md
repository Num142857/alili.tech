---
title: 'Neo4j 图数据库基础' 
date: 2019-01-22 2:30:08
hidden: true
slug: l40dg0rmez8
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#neo4j-图数据库基础"></a>Neo4j 图数据库基础</h1>
<blockquote>
<p>在这个三篇系列文章的第一篇文章中，我们将学习图数据库（graph database）的基础知识，它支持了这地球上最大的一些数据池。</p>
</blockquote>
<p><a href="https://camo.githubusercontent.com/fd12534657c58c1c6ba840a595bdb8916f11cbab/68747470733a2f2f6f70656e736f757263652e636f6d2f73697465732f64656661756c742f66696c65732f7374796c65732f696d6167652d66756c6c2d73697a652f7075626c69632f696d616765732f6c6966652f6772617373686f707065725f67726170685f6c6561642e6a70673f69746f6b3d5835515041475968"><img src="" alt="Fundamentals of graph databases with Neo4j" title="Fundamentals of graph databases with Neo4j"></a></p>
<p>对于海量的各种非结构化信息来说，图数据库已经成为帮助收集、管理和搜索大量数据的技术。在这三篇系列文章中，我们将使用开源图数据库软件 <a href="https://neo4j.com/">Neo4j</a> 来研究图数据库。</p>
<p>在本文中，我将向你展示图数据库的基础知识，帮助你快速了解概念模型。在第二篇中，我将向你展示如何启动 Neo4j 数据库，并使用内置的浏览器工具填充一些数据。而且，在本系列的最后一篇文章中，我们将探讨一些在开发工作中使用的 Neo4j 编程库。</p>
<p>掌握图数据库的概念模型是有用的，所以我们从那里开始。图数据库中只存储两种数据：节点node和边edge。</p>
<ul>
<li><strong>节点是实体：</strong>诸如人物、发票、电影、书籍或其他具体事物。这些有些等同于关系数据库中的记录或行。</li>
<li><strong>边名关系：</strong>连接节点的概念、事件或事物。在关系数据库中，这些关系通常存储在具有链接字段的数据库行中。在图数据库中，它们本身就是有用的，是可以以其自己的权限搜索的对象。</li>
</ul>
<p>节点和边都可以拥有可搜索的_属性_。例如，如果你的节点代表人，他们可能拥有名字、性别、出生日期、身高等属性。而边的属性可能描述了两个人之间的关系何时建立，见面的情况或关系的性质。</p>
<p>这是一个帮助你可视化的图表：</p>
<p><a href="https://camo.githubusercontent.com/f10a5e2e8546eeb5b1ea13c9e60223e36f1bebde/68747470733a2f2f6f70656e736f757263652e636f6d2f73697465732f64656661756c742f66696c65732f753132383635312f61727469636c655f315f696d6167655f312e6a7067"><img src="https://p0.ssl.qhimg.com/t0122d8d55090bb62ac.jpg" alt="Graph database image 1" title="Graph database image 1"></a></p>
<p>在这张图中，你知道 Jane Doe 有一个新的丈夫 John；一个女儿（来自她以前的夫妻关系）Mary Smith 和朋友 Robert 和 Rhonda Roe。Roes 有一个儿子 Ryan，他正在与 Mary Smith 约会。</p>
<p>看看它怎么工作？每个节点代表一个独立于其他节点的人。你需要找到关于_那个_人的一切都可以存储在节点的属性中。边描述了人们之间的关系，这与你在程序中需要的一样多。</p>
<p>关系是单向的，且不能是无向的，但这没有问题。由于数据库可以以相同的速度遍历两个方向，并且方向可以忽略，你只需要定义一次此关系。如果你的程序需要定向关系，则可以自由使用它们，但如果双向性是暗含的，则不需要。</p>
<p>另外需要注意的是，图数据库本质上是无 schema 的。这与关系数据库不同，关系数据库每行都有一组列表，并且添加新的字段会给开发和升级带来很多工作。</p>
<p>每个节点都可以拥有一个标签label；对于大多数程序你需要“输入”这个标签，是对典型的关系数据库中的表名的模拟。标签可以让你区分不同的节点类型。如果你需要添加新的标签或属性，修改程序来用它就行！</p>
<p>使用图数据库，你可以直接开始使用新的属性和标签，节点将在创建或编辑时获取它们。不需要转换东西；只需在你的代码中使用它们即可。在这里的例子中，你可以看到，我们知道 Jane 和 Mary 最喜欢的颜色和 Mary 的出生日期，但是别人没有（这些属性）。这个系统不需要知道它；用户可以在正常使用程序的过程中访问节点时为其添加信息（属性）。</p>
<p>作为一名开发人员，这是一个有用的特性。你可以将新的标签或属性添加到由节点处理的表单中并开始使用它，而不必进行数据库 schema 的修改。对于没有该属性的节点，将不显示任何内容。你可以使用任何一种类型的数据库来为表单进行编码，但是你可以放下在关系型数据库中要进行的许多后端工作了。</p>
<p>让我们添加一些新的信息：</p>
<p><a href="https://camo.githubusercontent.com/1a351b2a7f5260f71be4681beb82f527217ae6d6/68747470733a2f2f6f70656e736f757263652e636f6d2f73697465732f64656661756c742f66696c65732f753132383635312f61727469636c655f315f696d6167655f322e6a7067"><img src="https://p0.ssl.qhimg.com/t01b65a9ec7c7ca3548.jpg" alt="Graph database image 2, defining a new type of node" title="Graph database image 2, defining a new type of node"></a></p>
<p>这是一个新的节点类型，它代表一个位置，以及一些相关关系。现在我们看到 John Doe 出生在加利福尼亚州的 Petaluma，而他的妻子 Jane 则出生在德克萨斯州的 Grand Prairie。 他们现在住在得克萨斯州的赛普拉斯，因为 Jane 在附近的休斯顿工作。Ryan Roe 缺乏城市关系对数据库来说没有什么大不了的事情，我们<em>不知道</em>那些信息而已。当用户输入更多数据时，数据库可以轻松获取新数据并添加新数据，并根据需要创建新的节点和关系。</p>
<p>了解节点和边应该足以让你开始使用图形数据库。如果你像我一样，已经在考虑如何在一个图中重组你的程序。在本系列的下一篇文章中，我将向你展示如何安装 Neo4j、插入数据，并进行一些基本的搜索。</p>
<p>（题图：由 Jen Wike Huger 修改，CC BY-SA）</p>
<hr>
<p>via: <a href="https://opensource.com/article/17/7/fundamentals-graph-databases-neo4j">https://opensource.com/article/17/7/fundamentals-graph-databases-neo4j</a></p>
<p>作者：<a href="https://opensource.com/users/druthb">Ruth Holloway</a> 译者：<a href="https://github.com/geekpi">geekpi</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Neo4j 图数据库基础

## 原文链接
[https://www.zcfy.cc/article/fundamentals-of-graph-databases-with-neo4j](https://www.zcfy.cc/article/fundamentals-of-graph-databases-with-neo4j)

