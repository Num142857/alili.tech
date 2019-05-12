---
title: '快速搭建你的 github pages 个人博客 —— 基于 Create-React-App 的单页面应用实践' 
date: 2018-12-16 2:30:10
hidden: true
slug: iwwp44ou03d
categories: [reprint]
---

{{< raw >}}

                    
<p>相信各位github资深玩家们都有自己基于 <code>github pages</code> 搭建的个人站点。官方推荐的静态站点生成器是 <code>Jekyll</code>，关于 <code>Jekyll</code> 的使用感兴趣的各位请自行 google，这里就不赘述了。本文主要介绍下基于 <code>Create-React-App</code> 搭建个人博客的相关实践，可能更适合做前端开发的伙伴。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013026811" src="https://static.alili.tech/img/remote/1460000013026811" alt="github pages" title="github pages" style="cursor: pointer; display: inline;"></span></p>
<p><code>github pages</code> 是 <code>github</code> 推出的静态站点服务，主要的用途在于使用你在 <code>github</code> 仓库中的代码构建你自己的静态站点，为用户提供 <code>github.io</code> 二级域名，您也可以通过添加DNS的 <code>CNAME</code> 记录来绑定自己的域名。</p>
<p><code>github pages</code> 最简单粗暴的方法就是直接往 github 上方静态页面了，创建一个名为 <code>[您的github账号名].github.io</code> 的github仓库，将您的index.html页面代码扔进master分支，就可以直接通过 <code>https://[您的github账号名].github.io</code> 访问到您的站点了。</p>
<p>对于一个简单的个人博客站点来说，存在以下基本功能特性：</p>
<ul>
<li>文章的新增、编辑、一键发布</li>
<li>文章的分类、归档</li>
<li>风格良好的博客样式</li>
<li>评论、SEO等等功能</li>
</ul>
<p>下面介绍基于React如何实现一个简单的静态博客。</p>
<h2 id="articleHeader0">1. 创建一个 React 项目</h2>
<p>使用 Create-React-App（以下简称CRA） 的generator创建一个React前端项目骨架。对此项目进行一定改造以方便我们日常的开发和使用习惯：</p>
<ul>
<li>
<p>使用<code>react-app-rewired</code>来调整CRA中webpack的配置</p>
<ul><li>对CRA的webpack配置感兴趣的童鞋可以看看<a href="https://zhaozhiming.github.io/blog/2018/01/08/create-react-app-override-webpack-config/" rel="nofollow noreferrer" target="_blank">这篇文章</a>
</li></ul>
</li>
<li>使用<code>core-js</code>对浏览器版本进行向下兼容</li>
<li>通过编写不同的React容器组件（container）来实现不同的页面，通过统一的json结构来配置应用的页面路由</li>
<li>使用蚂蚁金服的<code>antd</code>设计语言（React组件）快速实现业务UI</li>
<li>使用<code>axios</code>实现前后端的数据请求</li>
</ul>
<p>个人改造后的项目代码在<a href="https://github.com/parksben/react-spa-app" rel="nofollow noreferrer" target="_blank">这里</a>，您可以直接fork或者down下来使用。</p>
<h2 id="articleHeader1">2. 使用 markdown 搞定你的文章</h2>
<h3 id="articleHeader2">2.1 用于新建文章的交互式命令行（基于 inquirer）</h3>
<p>一般的静态博客系统（如gatsby），会给用户提供一个用于创建新文章的交互式命令行，效果大致如下：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013026812" src="https://static.alili.tech/img/remote/1460000013026812" alt="readline" title="readline" style="cursor: pointer;"></span></p>
<p>类似功能可以使用nodejs中<a href="https://nodejs.org/dist/latest-v8.x/docs/api/readline.html" rel="nofollow noreferrer" target="_blank">readline模块</a>的原生方法来实现。这里推荐一个第三方工具：<a href="https://github.com/SBoudrias/Inquirer.js" rel="nofollow noreferrer" target="_blank">inquirer</a>，本质上是对readline模块进行了增强，提供了很多实用的方法用于交互式命令行开发，实现的用户界面（命令行）也比较友好。</p>
<p>对于上面GIF示例的功能，其代码实现如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// newPost.js

const inquirer = require('inquirer');
const moment = require('moment');

const questions = [
  {
    type: 'input',
    name: 'post_name',
    message: '请输入您的文章别名（用于创建文章目录，仅限英文，单词间用短横杠‘-’连接）：',
    validate: value => {
      if (/(\.|\*|\?|\\|\/)/gi.test(value)) {
        return '文章别名不得包含特殊符号（.*?\\/），请重新输入↑↑';
      }

      if (/(([A-z]+-)+)?[A-z]+/gi.test(value)) {
        return true;
      }

      return '文章别名不合法，请重新输入↑↑';
    },
    filter: value => value.replace(/\s+/gi, '-'),
  },
  {
    type: 'input',
    name: 'create_at',
    message: '请输入文章的发布时间（或者按回车键使用默认值）：',
    default: () => {
      return moment().format('YYYY-MM-DDThh:mm:ss');
    },
    validate: value => {
      if (/\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d/gi.test(value)) {
        return true;
      }

      return '时间格式不合法，请重新输入↑↑';
    },
  },
];

inquirer
  .prompt(questions)
  .then(answers => {
    // 获取用户输入
    const { post_name, create_at } = answers;
  
    /* 此处做一些命令行反馈和过程性的工作 */
    /* （如：提示用户输入是否合法、创建文章对应的目录和文件等等） */
  })
  .catch(err => {
    /* 异常处理 */
  });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// newPost.js</span>

<span class="hljs-keyword">const</span> inquirer = <span class="hljs-built_in">require</span>(<span class="hljs-string">'inquirer'</span>);
<span class="hljs-keyword">const</span> moment = <span class="hljs-built_in">require</span>(<span class="hljs-string">'moment'</span>);

<span class="hljs-keyword">const</span> questions = [
  {
    <span class="hljs-attr">type</span>: <span class="hljs-string">'input'</span>,
    <span class="hljs-attr">name</span>: <span class="hljs-string">'post_name'</span>,
    <span class="hljs-attr">message</span>: <span class="hljs-string">'请输入您的文章别名（用于创建文章目录，仅限英文，单词间用短横杠‘-’连接）：'</span>,
    <span class="hljs-attr">validate</span>: <span class="hljs-function"><span class="hljs-params">value</span> =&gt;</span> {
      <span class="hljs-keyword">if</span> (<span class="hljs-regexp">/(\.|\*|\?|\\|\/)/gi</span>.test(value)) {
        <span class="hljs-keyword">return</span> <span class="hljs-string">'文章别名不得包含特殊符号（.*?\\/），请重新输入↑↑'</span>;
      }

      <span class="hljs-keyword">if</span> (<span class="hljs-regexp">/(([A-z]+-)+)?[A-z]+/gi</span>.test(value)) {
        <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
      }

      <span class="hljs-keyword">return</span> <span class="hljs-string">'文章别名不合法，请重新输入↑↑'</span>;
    },
    <span class="hljs-attr">filter</span>: <span class="hljs-function"><span class="hljs-params">value</span> =&gt;</span> value.replace(<span class="hljs-regexp">/\s+/gi</span>, <span class="hljs-string">'-'</span>),
  },
  {
    <span class="hljs-attr">type</span>: <span class="hljs-string">'input'</span>,
    <span class="hljs-attr">name</span>: <span class="hljs-string">'create_at'</span>,
    <span class="hljs-attr">message</span>: <span class="hljs-string">'请输入文章的发布时间（或者按回车键使用默认值）：'</span>,
    <span class="hljs-attr">default</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      <span class="hljs-keyword">return</span> moment().format(<span class="hljs-string">'YYYY-MM-DDThh:mm:ss'</span>);
    },
    <span class="hljs-attr">validate</span>: <span class="hljs-function"><span class="hljs-params">value</span> =&gt;</span> {
      <span class="hljs-keyword">if</span> (<span class="hljs-regexp">/\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d/gi</span>.test(value)) {
        <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
      }

      <span class="hljs-keyword">return</span> <span class="hljs-string">'时间格式不合法，请重新输入↑↑'</span>;
    },
  },
];

inquirer
  .prompt(questions)
  .then(<span class="hljs-function"><span class="hljs-params">answers</span> =&gt;</span> {
    <span class="hljs-comment">// 获取用户输入</span>
    <span class="hljs-keyword">const</span> { post_name, create_at } = answers;
  
    <span class="hljs-comment">/* 此处做一些命令行反馈和过程性的工作 */</span>
    <span class="hljs-comment">/* （如：提示用户输入是否合法、创建文章对应的目录和文件等等） */</span>
  })
  .catch(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
    <span class="hljs-comment">/* 异常处理 */</span>
  });</code></pre>
<p>如是，将此node脚本添加到项目<code>package.json</code>的<code>scripts</code>中（如：<code>new-post: "node newPost.js"</code>），即可通过<code>npm run</code>命令执行。</p>
<h3 id="articleHeader3">2.2 md 转 html（基于 react-markdown）</h3>
<p>为使用markdown文档来编辑、存储博客的文章内容，需要将md文档转换为react的JSX对象以渲染到网页中。在此推荐使用<a href="https://github.com/rexxars/react-markdown" rel="nofollow noreferrer" target="_blank">react-markdown</a>，功能很6，作者维护得也比较勤。</p>
<p>使用方式如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import ReactMarkdown from 'react-markdown';

<ReactMarkdown source={'# 这是文章标题\n\n'} />
// <h1>这是文章标题</h1>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> ReactMarkdown <span class="hljs-keyword">from</span> <span class="hljs-string">'react-markdown'</span>;

<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">ReactMarkdown</span> <span class="hljs-attr">source</span>=<span class="hljs-string">{</span>'# 这是文章标题\<span class="hljs-attr">n</span>\<span class="hljs-attr">n</span>'} /&gt;</span>
// <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>这是文章标题<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span></code></pre>
<h3 id="articleHeader4">2.3 代码块的语法高亮</h3>
<p>react-markdown提供了一个renderers属性，用户可以传入一系列renderer组件来自定义文章中一些内容的渲染方式（有兴趣的童鞋可以看下包作者对<a href="https://github.com/rexxars/react-markdown/blob/master/src/renderers.js" rel="nofollow noreferrer" target="_blank">默认renderer的实现</a>）。</p>
<p>如：自定义md中图片的渲染方式（用法如下）。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 传入renderer的方式
<ReactMarkdown
  source={'[md文本内容]'}
  renderers="{{"
    image: ImageRenderer,
  "}}"
/>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 传入renderer的方式</span>
&lt;ReactMarkdown
  source={<span class="hljs-string">'[md文本内容]'</span>}
  renderers="{{"
    <span class="hljs-attr">image</span>: ImageRenderer,
  "}}"
/&gt;</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ImageRenderer的实现

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ImageRenderer extends Component {
  static propTypes = {
    src: PropTypes.string.isRequired,
  };

  render() {
    return (
      <img
        className=&quot;post-content-image&quot;
        src={this.props.src}
        alt={this.props.src}
      />
    );
  }
}

export default ImageRenderer;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// ImageRenderer的实现</span>

<span class="hljs-keyword">import</span> React, { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> PropTypes <span class="hljs-keyword">from</span> <span class="hljs-string">'prop-types'</span>;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ImageRenderer</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  <span class="hljs-keyword">static</span> propTypes = {
    <span class="hljs-attr">src</span>: PropTypes.string.isRequired,
  };

  render() {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">img</span>
        <span class="hljs-attr">className</span>=<span class="hljs-string">"post-content-image"</span>
        <span class="hljs-attr">src</span>=<span class="hljs-string">{this.props.src}</span>
        <span class="hljs-attr">alt</span>=<span class="hljs-string">{this.props.src}</span>
      /&gt;</span>
    );
  }
}

export default ImageRenderer;</span></code></pre>
<p>与此类似，我们可以通过传入一个自定义的renderer来实现文章中代码块的语法高亮。名为<code>CodeBlock</code>的renderer实现如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { highlight, languages } from 'prismjs';
import ReactHtmlParser from 'react-html-parser';
import 'prismjs/themes/prism.css';

export class HtmlComponent extends Component {
  static propTypes = {
    html: PropTypes.string.isRequired,
  };

  render() {
    return ReactHtmlParser(this.props.html);
  }
}

export class CodeBlock extends Component {
  static propTypes = {
    literal: PropTypes.string.isRequired,
    language: PropTypes.string.isRequired,
  };

  render() {
    const html = highlight(this.props.literal, languages[this.props.language]);
    const cls = `language-${this.props.language}`;

    return (
      <pre className={cls}>
        <code className={cls}>
          <HtmlComponent html={html} />
        </code>
      </pre>
    );
  }
}

export default CodeBlock;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> React, { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> PropTypes <span class="hljs-keyword">from</span> <span class="hljs-string">'prop-types'</span>;
<span class="hljs-keyword">import</span> { highlight, languages } <span class="hljs-keyword">from</span> <span class="hljs-string">'prismjs'</span>;
<span class="hljs-keyword">import</span> ReactHtmlParser <span class="hljs-keyword">from</span> <span class="hljs-string">'react-html-parser'</span>;
<span class="hljs-keyword">import</span> <span class="hljs-string">'prismjs/themes/prism.css'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">HtmlComponent</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  <span class="hljs-keyword">static</span> propTypes = {
    <span class="hljs-attr">html</span>: PropTypes.string.isRequired,
  };

  render() {
    <span class="hljs-keyword">return</span> ReactHtmlParser(<span class="hljs-keyword">this</span>.props.html);
  }
}

<span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">CodeBlock</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  <span class="hljs-keyword">static</span> propTypes = {
    <span class="hljs-attr">literal</span>: PropTypes.string.isRequired,
    <span class="hljs-attr">language</span>: PropTypes.string.isRequired,
  };

  render() {
    <span class="hljs-keyword">const</span> html = highlight(<span class="hljs-keyword">this</span>.props.literal, languages[<span class="hljs-keyword">this</span>.props.language]);
    <span class="hljs-keyword">const</span> cls = <span class="hljs-string">`language-<span class="hljs-subst">${<span class="hljs-keyword">this</span>.props.language}</span>`</span>;

    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">pre</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{cls}</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">code</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{cls}</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">HtmlComponent</span> <span class="hljs-attr">html</span>=<span class="hljs-string">{html}</span> /&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">code</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">pre</span>&gt;</span>
    );
  }
}

export default CodeBlock;</span></code></pre>
<p>此处用到了<a href="http://prismjs.com/" rel="nofollow noreferrer" target="_blank">prismjs</a>和<a href="https://github.com/wrakky/react-html-parser" rel="nofollow noreferrer" target="_blank">react-html-parser</a>两个npm包，前者用于将代码文本转化为html文本，后者用于将html文本转化为React的JSX对象以传入React组件（这样做比直接使用<a href="https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml" rel="nofollow noreferrer" target="_blank">dangerouslySetInnerHTML</a>属性更安全些）。</p>
<h2 id="articleHeader5">3. 文章分类</h2>
<p>一个友好的站点肯定少不了导航菜单（或文章的分类菜单），本人的实现方式是直接使用文章的“标签”来进行分类统计，并生成站点的顶部导航，效果如下：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013026813" src="https://static.alili.tech/img/remote/1460000013026813" alt="nav-top" title="nav-top" style="cursor: pointer;"></span></p>
<p>为此，需要撰写一定的脚本实现文章的分类统计和打包，个人的实现方式是将统计结果和文章内容各自打包为json文件，通过前端组件请求数据并加载。</p>
<p>导航栏组件的具体实现如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Dropdown, Menu, Icon } from 'antd';
import { randomId } from 'utils';
import './style.css';

export class Header extends Component {
  static propTypes = {
    data: PropTypes.array,
    activeTag: PropTypes.string,
  };

  static defaultProps = {
    data: [{ tag: '前端', count: 5 }],
    activeTag: '',
  };

  constructor(props) {
    super(props);
    this.navTotal = 6;
  }

  renderMore() {
    if (this.props.data.length <= this.navTotal) {
      return false;
    }

    const subNavItems = this.props.data.slice(this.navTotal).map(t =>
      <Menu.Item key={`sub_nav_${randomId()}`}>
        <Link
          to={t.linkTo || `/tag/${t.tag}`}
          className={`ant-dropdown-link ${this.props.activeTag === t.tag
            ? 'active'
            : ''}`}
          key={`nav_top_${randomId()}`}>
          {t.tag}（{t.count}）
        </Link>
      </Menu.Item>
    );

    const SubNav = (
      <Menu>
        {subNavItems}
      </Menu>
    );

    const DropDownBtn = (
      <Dropdown overlay={SubNav} key={`nav_top_${randomId()}`}>
        <div className=&quot;header-nav-item&quot;>
          更多分类 <Icon type=&quot;down&quot; />
        </div>
      </Dropdown>
    );

    return DropDownBtn;
  }

  renderTop5() {
    const items = this.props.data.slice(0, this.navTotal - 1).map(t =>
      <Link
        className={`header-nav-item ${this.props.activeTag === t.tag
          ? 'active'
          : ''}`}
        to={t.linkTo || `/tag/${t.tag}`}
        key={`nav_top_${randomId()}`}>
        {!t.linkTo ? `${t.tag}（${t.count}）` : t.tag}
      </Link>
    );

    return (
      <div className=&quot;header-nav&quot;>
        {items}
        {this.renderMore()}
      </div>
    );
  }

  render = () => this.renderTop5();
}

export default Header;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> React, { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> PropTypes <span class="hljs-keyword">from</span> <span class="hljs-string">'prop-types'</span>;
<span class="hljs-keyword">import</span> { Link } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-router-dom'</span>;
<span class="hljs-keyword">import</span> { Dropdown, Menu, Icon } <span class="hljs-keyword">from</span> <span class="hljs-string">'antd'</span>;
<span class="hljs-keyword">import</span> { randomId } <span class="hljs-keyword">from</span> <span class="hljs-string">'utils'</span>;
<span class="hljs-keyword">import</span> <span class="hljs-string">'./style.css'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Header</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  <span class="hljs-keyword">static</span> propTypes = {
    <span class="hljs-attr">data</span>: PropTypes.array,
    <span class="hljs-attr">activeTag</span>: PropTypes.string,
  };

  <span class="hljs-keyword">static</span> defaultProps = {
    <span class="hljs-attr">data</span>: [{ <span class="hljs-attr">tag</span>: <span class="hljs-string">'前端'</span>, <span class="hljs-attr">count</span>: <span class="hljs-number">5</span> }],
    <span class="hljs-attr">activeTag</span>: <span class="hljs-string">''</span>,
  };

  <span class="hljs-keyword">constructor</span>(props) {
    <span class="hljs-keyword">super</span>(props);
    <span class="hljs-keyword">this</span>.navTotal = <span class="hljs-number">6</span>;
  }

  renderMore() {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.props.data.length &lt;= <span class="hljs-keyword">this</span>.navTotal) {
      <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
    }

    <span class="hljs-keyword">const</span> subNavItems = <span class="hljs-keyword">this</span>.props.data.slice(<span class="hljs-keyword">this</span>.navTotal).map(<span class="hljs-function"><span class="hljs-params">t</span> =&gt;</span>
      &lt;Menu.Item key={<span class="hljs-string">`sub_nav_<span class="hljs-subst">${randomId()}</span>`</span>}&gt;
        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Link</span>
          <span class="hljs-attr">to</span>=<span class="hljs-string">{t.linkTo</span> || `/<span class="hljs-attr">tag</span>/${<span class="hljs-attr">t.tag</span>}`}
          <span class="hljs-attr">className</span>=<span class="hljs-string">{</span>`<span class="hljs-attr">ant-dropdown-link</span> ${<span class="hljs-attr">this.props.activeTag</span> === <span class="hljs-string">t.tag</span>
            ? '<span class="hljs-attr">active</span>'
            <span class="hljs-attr">:</span> ''}`}
          <span class="hljs-attr">key</span>=<span class="hljs-string">{</span>`<span class="hljs-attr">nav_top_</span>${<span class="hljs-attr">randomId</span>()}`}&gt;</span>
          {t.tag}（{t.count}）
        <span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span></span>
      &lt;<span class="hljs-regexp">/Menu.Item&gt;
    );

    const SubNav = (
      &lt;Menu&gt;
        {subNavItems}
      &lt;/</span>Menu&gt;
    );

    <span class="hljs-keyword">const</span> DropDownBtn = (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Dropdown</span> <span class="hljs-attr">overlay</span>=<span class="hljs-string">{SubNav}</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{</span>`<span class="hljs-attr">nav_top_</span>${<span class="hljs-attr">randomId</span>()}`}&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"header-nav-item"</span>&gt;</span>
          更多分类 <span class="hljs-tag">&lt;<span class="hljs-name">Icon</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"down"</span> /&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">Dropdown</span>&gt;</span>
    );

    return DropDownBtn;
  }

  renderTop5() {
    const items = this.props.data.slice(0, this.navTotal - 1).map(t =&gt;
      <span class="hljs-tag">&lt;<span class="hljs-name">Link</span>
        <span class="hljs-attr">className</span>=<span class="hljs-string">{</span>`<span class="hljs-attr">header-nav-item</span> ${<span class="hljs-attr">this.props.activeTag</span> === <span class="hljs-string">t.tag</span>
          ? '<span class="hljs-attr">active</span>'
          <span class="hljs-attr">:</span> ''}`}
        <span class="hljs-attr">to</span>=<span class="hljs-string">{t.linkTo</span> || `/<span class="hljs-attr">tag</span>/${<span class="hljs-attr">t.tag</span>}`}
        <span class="hljs-attr">key</span>=<span class="hljs-string">{</span>`<span class="hljs-attr">nav_top_</span>${<span class="hljs-attr">randomId</span>()}`}&gt;</span>
        {!t.linkTo ? `${t.tag}（${t.count}）` : t.tag}
      <span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span>
    );

    return (
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"header-nav"</span>&gt;</span>
        {items}
        {this.renderMore()}
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    );
  }

  render = () =&gt; this.renderTop5();
}

export default Header;</span></code></pre>
<p>大家可以根据实际需要实现自己的文章打包方式（这里就不奉上我的脚本了?）。</p>
<h2 id="articleHeader6">4. 更多功能</h2>
<p>对于个人博客来说，到这里为止还有很多功能没有实现，这里偷个懒，奉上一些相关的链接吧：</p>
<h3 id="articleHeader7">4.1 关于文章评论</h3>
<ul>
<li><a href="http://www.forestofhorizon.com/notesofstudy/2015/12/01/adding-disqus-to-github-pages/" rel="nofollow noreferrer" target="_blank">在github pagess中加入Disqus评论系统</a></li>
<li><a href="https://imsun.net/posts/gitment-introduction/" rel="nofollow noreferrer" target="_blank">使用 GitHub Issues 搭建评论系统</a></li>
</ul>
<h3 id="articleHeader8">4.2 关于文章结构树</h3>
<ul>
<li><a href="https://github.com/hollodotme/TreeMDown" rel="nofollow noreferrer" target="_blank">TreeMDown</a></li>
<li><a href="https://github.com/hughsk/markdown-tree" rel="nofollow noreferrer" target="_blank">markdown-tree</a></li>
</ul>
<p>我最近应该会实现一个React用途的markdown树组件，大家不妨期待下☺️</p>
<h2 id="articleHeader9">5. 发布你的个人静态站点</h2>
<h3 id="articleHeader10">5.1 部署到 github pages（基于 gh-pages）</h3>
<p>CRA针对github pages用途专门推荐了一个包：<a href="https://github.com/tschaub/gh-pages" rel="nofollow noreferrer" target="_blank">gh-pages</a>，使用方法如下：</p>
<p>（1）修改项目的<code>package.json</code>文件，添加homepage属性：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;homepage&quot;: &quot;https://parksben.github.io&quot;," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code style="word-break: break-word; white-space: initial;"><span class="hljs-string">"homepage"</span>: <span class="hljs-string">"https://parksben.github.io"</span>,</code></pre>
<p>（2）项目安装<code>gh-pages</code>依赖后修改，在<code>package.json</code>中添加如下配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  &quot;scripts&quot;: {
+   &quot;predeploy&quot;: &quot;npm run build&quot;,
+   &quot;deploy&quot;: &quot;gh-pages -d build&quot;,
    &quot;start&quot;: &quot;react-scripts start&quot;,
    &quot;build&quot;: &quot;react-scripts build&quot;," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code>  <span class="hljs-string">"scripts"</span>: {
+   <span class="hljs-string">"predeploy"</span>: <span class="hljs-string">"npm run build"</span>,
+   <span class="hljs-string">"deploy"</span>: <span class="hljs-string">"gh-pages -d build"</span>,
    <span class="hljs-string">"start"</span>: <span class="hljs-string">"react-scripts start"</span>,
    <span class="hljs-string">"build"</span>: <span class="hljs-string">"react-scripts build"</span>,</code></pre>
<p>（3）将本地代码上传到github博客仓库的某个分支（只要不是master分支就行），然后执行：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="yarn deploy" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">yarn deploy</span></code></pre>
<p>gh-pages会将CRA项目build到仓库的master分支，然后，你就可以访问你的站点了（有关 CRA 项目部署到 github pages 的详细描述可以看<a href="https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#github-pages" rel="nofollow noreferrer" target="_blank">这里</a>）。</p>
<h3 id="articleHeader11">5.2 如何兼容 React 的客户端路由（一种比较 hack 的方法）</h3>
<p>单页面应用一般需要设置服务端路由，将应用的所有页面路径都重定向到index.html，而github pages并没有这样的默认设置。</p>
<p>因而，当你使用React的客户端路由（React的createBrowserHistory方法创建前端路由）时，除根路径以外的页面，github都会返回自己的404页面。</p>
<p>为此，CRA项目提供了一种比较hack的方法来支持React的客户端路由（通过操作window.history来强行匹配url）。也算是一种奇技淫巧吧☺️。</p>
<p>（1）在CRA项目的public目录下添加一个<code>404.html</code>，其内容如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>
  <head>
    <meta charset=&quot;utf-8&quot;>
    <title>矮大紧的日常 | parksben's blog</title>
    <script type=&quot;text/javascript&quot;>
      var segmentCount = 0;
      var l = window.location;
      l.replace(
        l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
        l.pathname.split('/').slice(0, 1 + segmentCount).join('/') + '/?p=/' +
        l.pathname.slice(1).split('/').slice(segmentCount).join('/').replace(/&amp;/g, '~and~') +
        (l.search ? '&amp;q=' + l.search.slice(1).replace(/&amp;/g, '~and~') : '') +
        l.hash
      );
    </script>
  </head>
  <body>
  </body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>矮大紧的日常 | parksben's blog<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
      <span class="hljs-keyword">var</span> segmentCount = <span class="hljs-number">0</span>;
      <span class="hljs-keyword">var</span> l = <span class="hljs-built_in">window</span>.location;
      l.replace(
        l.protocol + <span class="hljs-string">'//'</span> + l.hostname + (l.port ? <span class="hljs-string">':'</span> + l.port : <span class="hljs-string">''</span>) +
        l.pathname.split(<span class="hljs-string">'/'</span>).slice(<span class="hljs-number">0</span>, <span class="hljs-number">1</span> + segmentCount).join(<span class="hljs-string">'/'</span>) + <span class="hljs-string">'/?p=/'</span> +
        l.pathname.slice(<span class="hljs-number">1</span>).split(<span class="hljs-string">'/'</span>).slice(segmentCount).join(<span class="hljs-string">'/'</span>).replace(<span class="hljs-regexp">/&amp;/g</span>, <span class="hljs-string">'~and~'</span>) +
        (l.search ? <span class="hljs-string">'&amp;q='</span> + l.search.slice(<span class="hljs-number">1</span>).replace(<span class="hljs-regexp">/&amp;/g</span>, <span class="hljs-string">'~and~'</span>) : <span class="hljs-string">''</span>) +
        l.hash
      );
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>（2）在<code>index.html</code>的head中添加如下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script type=&quot;text/javascript&quot;>
  (function(l) {
    if (l.search) {
      var q = {};
      l.search.slice(1).split('&amp;').forEach(function(v) {
        var a = v.split('=');
        q[a[0]] = a.slice(1).join('=').replace(/~and~/g, '&amp;');
      });
      if (q.p !== undefined) {
        window.history.replaceState(null, null,
          l.pathname.slice(0, -1) + (q.p || '') +
          (q.q ? ('?' + q.q) : '') +
          l.hash
        );
      }
    }
  }(window.location))
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
  (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">l</span>) </span>{
    <span class="hljs-keyword">if</span> (l.search) {
      <span class="hljs-keyword">var</span> q = {};
      l.search.slice(<span class="hljs-number">1</span>).split(<span class="hljs-string">'&amp;'</span>).forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">v</span>) </span>{
        <span class="hljs-keyword">var</span> a = v.split(<span class="hljs-string">'='</span>);
        q[a[<span class="hljs-number">0</span>]] = a.slice(<span class="hljs-number">1</span>).join(<span class="hljs-string">'='</span>).replace(<span class="hljs-regexp">/~and~/g</span>, <span class="hljs-string">'&amp;'</span>);
      });
      <span class="hljs-keyword">if</span> (q.p !== <span class="hljs-literal">undefined</span>) {
        <span class="hljs-built_in">window</span>.history.replaceState(<span class="hljs-literal">null</span>, <span class="hljs-literal">null</span>,
          l.pathname.slice(<span class="hljs-number">0</span>, <span class="hljs-number">-1</span>) + (q.p || <span class="hljs-string">''</span>) +
          (q.q ? (<span class="hljs-string">'?'</span> + q.q) : <span class="hljs-string">''</span>) +
          l.hash
        );
      }
    }
  }(<span class="hljs-built_in">window</span>.location))
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>大功告成，你的github站点支持React的客户端路由了。</p>
<p>除此之外，也可以改为使用<code>createHashHistory</code>方法来创建客户端路由，这样前端路由就与服务端路由没多大关系了，不过url里面一串hash毕竟不够优雅。</p>
<p>有兴趣了解奇技淫巧的童鞋，可以点<a href="https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#notes-on-client-side-routing" rel="nofollow noreferrer" target="_blank">这里</a>。</p>
<h3 id="articleHeader12">5.3 部署到自己的服务</h3>
<p>与CRA项目的生产环境部署方式一样：</p>
<ul>
<li>线上执行 yarn build 命令，站点的所有静态资源将打包到 build 目录下</li>
<li>将你的站点的入口配置到 build 目录下</li>
</ul>
<h2 id="articleHeader13">6. 项目参考（源码奉上）</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013038227" src="https://static.alili.tech/img/remote/1460000013038227" alt="parksben.github.io" title="parksben.github.io" style="cursor: pointer; display: inline;"></span></p>
<p>这是<a href="https://parksben.github.io/" rel="nofollow noreferrer" target="_blank">我的github博客</a>（基于上述过程实现的静态站点），感兴趣的伙伴可以<a href="https://github.com/parksben/parksben.github.io" rel="nofollow noreferrer" target="_blank">点击这里</a>查看项目源码，觉得有用也可以fork或star一下下。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
快速搭建你的 github pages 个人博客 —— 基于 Create-React-App 的单页面应用实践

## 原文链接
[https://segmentfault.com/a/1190000013026806](https://segmentfault.com/a/1190000013026806)

