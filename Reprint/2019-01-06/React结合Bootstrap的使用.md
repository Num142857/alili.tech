---
title: 'React结合Bootstrap的使用' 
date: 2019-01-06 2:30:10
hidden: true
slug: huem8m2lu37
categories: [reprint]
---

{{< raw >}}

                    
<p><strong>React结合Bootstrap的使用</strong></p>
<blockquote><p>Bootstrap大家应该都不陌生吧，它是一套用于HTML、CSS 和JS的框架，这里，我们要使用它里面的一套样式框架；</p></blockquote>
<hr>
<h3 id="articleHeader0">搭建环境</h3>
<ul><li>首先我们需要去官网下载一个Bootstrap库</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="官网网址：
http://v3.bootcss.com/getting-started/#download
直接在浏览器打开就可以，打开以后会出现以下页面，点击第一个，下载Bootstrap就可以；" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code>官网网址：
http:<span class="hljs-regexp">//</span>v3.bootcss.com<span class="hljs-regexp">/getting-started/</span><span class="hljs-comment">#download</span>
直接在浏览器打开就可以，打开以后会出现以下页面，点击第一个，下载Bootstrap就可以；</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVRJj6?w=993&amp;h=438" src="https://static.alili.tech/img/bVRJj6?w=993&amp;h=438" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<ul><li>然后安装Bootstrap插件</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="在命令行里输入
npm install file-loader url url-loader --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code>在命令行里输入
npm <span class="hljs-keyword">install</span> <span class="hljs-keyword">file</span>-loader <span class="hljs-keyword">url</span> <span class="hljs-keyword">url</span>-loader <span class="hljs-comment">--save-dev</span></code></pre>
<ul><li>配置webpack.config.js文件</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  entry: './index.js',
  output: {
      path:path.resolve(__dirname,&quot;build&quot;),
      publicPath:&quot;/assets/&quot;,
    filename: 'bundle.js'
  },
  module: {
      rules: [
    { test: /\.js$/, exclude: /node_modules/, loader: &quot;react-hot-loader!babel-loader&quot; },
    { test: /\.css$/, exclude: /node_modules/, loader: &quot;style-loader!css-loader&quot; },
    { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: &quot;file-loader&quot; },  //添加
    { test: /\.(woff|woff2)$/, loader:&quot;url-loader?prefix=font/&amp;limit=5000&quot; }, //添加
    { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: &quot;url-loader?limit=10000&amp;mimetype=application/octet-stream&quot; }, //添加
    { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: &quot;url-loader?limit=10000&amp;mimetype=image/svg+xml&quot; } //添加
      ]
    } 
}    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>module.exports = {
<span class="hljs-symbol">  entry:</span> <span class="hljs-string">'./index.js'</span>,
<span class="hljs-symbol">  output:</span> {
<span class="hljs-symbol">      path:</span>path.resolve(__dirname,<span class="hljs-string">"build"</span>),
<span class="hljs-symbol">      publicPath:</span><span class="hljs-string">"/assets/"</span>,
<span class="hljs-symbol">    filename:</span> <span class="hljs-string">'bundle.js'</span>
  },
<span class="hljs-symbol">  module:</span> {
<span class="hljs-symbol">      rules:</span> [
    { <span class="hljs-string">test:</span> <span class="hljs-regexp">/\.js$/</span>, <span class="hljs-string">exclude:</span> <span class="hljs-regexp">/node_modules/</span>, <span class="hljs-string">loader:</span> <span class="hljs-string">"react-hot-loader!babel-loader"</span> },
    { <span class="hljs-string">test:</span> <span class="hljs-regexp">/\.css$/</span>, <span class="hljs-string">exclude:</span> <span class="hljs-regexp">/node_modules/</span>, <span class="hljs-string">loader:</span> <span class="hljs-string">"style-loader!css-loader"</span> },
    { <span class="hljs-string">test:</span> <span class="hljs-regexp">/\.eot(\?v=\d+\.\d+\.\d+)?$/</span>, <span class="hljs-string">loader:</span> <span class="hljs-string">"file-loader"</span> },  <span class="hljs-comment">//添加</span>
    { <span class="hljs-string">test:</span> <span class="hljs-regexp">/\.(woff|woff2)$/</span>, <span class="hljs-string">loader:</span><span class="hljs-string">"url-loader?prefix=font/&amp;limit=5000"</span> }, <span class="hljs-comment">//添加</span>
    { <span class="hljs-string">test:</span> <span class="hljs-regexp">/\.ttf(\?v=\d+\.\d+\.\d+)?$/</span>, <span class="hljs-string">loader:</span> <span class="hljs-string">"url-loader?limit=10000&amp;mimetype=application/octet-stream"</span> }, <span class="hljs-comment">//添加</span>
    { <span class="hljs-string">test:</span> <span class="hljs-regexp">/\.svg(\?v=\d+\.\d+\.\d+)?$/</span>, <span class="hljs-string">loader:</span> <span class="hljs-string">"url-loader?limit=10000&amp;mimetype=image/svg+xml"</span> } <span class="hljs-comment">//添加</span>
      ]
    } 
}    </code></pre>
<blockquote><p>这样我们的环境就搭建完成了；</p></blockquote>
<hr>
<h3 id="articleHeader1">一个简单的小例子</h3>
<blockquote><p>我做了一个用React和Bootstarp的一个例子，一个提交的表格，下面我来给大家详细的介绍一下：</p></blockquote>
<ul><li>创建一个index.html，用来显示效果</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>
    <head>
        <meta charset=&quot;UTF-8&quot;>
        <title>React3</title>
    </head>
    <body>
        <div id=&quot;app&quot;></div>
        <script src=&quot;/assets/bundle.js&quot;></script>
    </body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>React3<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"/assets/bundle.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<ul><li>创建ToDoapp.js文件，它将作为一个最大的模块来包三个模块</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React模块 from 'react';  //导入React模块

import ToDoList from './ToDoList';  //导入ToDoList模块
import ToDoForm from './ToDoForm'; //导入ToDoForm模块

class ToDoapp extends React.Component{
    constructor(props){
        super(props);
        this.ids=1;
        this.state={
                todos:[]
        };
    this.addItem=this.addItem.bind(this);
    this.deleteItem=this.deleteItem.bind(this);
    this.okItem=this.okItem.bind(this);
    }
  okItem(id){
    this.state.todos.map(item=>{
        if(item.id==id){
            item.done=1;
        }
            return item;
        });
        this.setState({
            todos:this.state.todos
        });
    }
    deleteItem(id){
        let newtodos=this.state.todos.filter((item)=>{
            return !(item.id==id)
        });
          this.setState({
            todos:newtodos
        });
    }

    addItem(value){
       this.state.todos.unshift(
            {
                id:this.ids++,
                text:value,
                time:(new Date()).toLocaleString(),
                done:0
            }
        )

        this.setState({
            todos:this.state.todos
        });
    }

    render(){
        return (
            <div className=&quot;container&quot;>
                <br/>
                <br/>
                <br/>
            <div className=&quot;panel panel-default&quot;>
                <div className=&quot;panel-headingbg-danger&quot;>
                        <h1 className=&quot;text-center &quot;>ToDo<small>你要做什么？</small></h1>
                        <hr/>
                </div>
                <div className=&quot;panel-body&quot;>
                        <ToDoForm addItem={this.addItem}/>
                        <ToDoList  okItem={this.okItem} deleteItem={this.deleteItem} data={this.state.todos}/>
                    </div>
                </div> 
            </div>
        );
    }
}

export default ToDoapp;  //导出ToDoapp模块" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">import</span> React模块 from <span class="hljs-string">'react'</span>;  <span class="hljs-comment">//导入React模块</span>

<span class="hljs-keyword">import</span> ToDoList from <span class="hljs-string">'./ToDoList'</span>;  <span class="hljs-comment">//导入ToDoList模块</span>
<span class="hljs-keyword">import</span> ToDoForm from <span class="hljs-string">'./ToDoForm'</span>; <span class="hljs-comment">//导入ToDoForm模块</span>

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ToDoapp</span> <span class="hljs-title">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span></span>{
    <span class="hljs-keyword">constructor</span>(props){
        <span class="hljs-keyword">super</span>(props);
        <span class="hljs-keyword">this</span>.ids=<span class="hljs-number">1</span>;
        <span class="hljs-keyword">this</span>.state={
                todos:[]
        };
    <span class="hljs-keyword">this</span>.addItem=<span class="hljs-keyword">this</span>.addItem.bind(<span class="hljs-keyword">this</span>);
    <span class="hljs-keyword">this</span>.deleteItem=<span class="hljs-keyword">this</span>.deleteItem.bind(<span class="hljs-keyword">this</span>);
    <span class="hljs-keyword">this</span>.okItem=<span class="hljs-keyword">this</span>.okItem.bind(<span class="hljs-keyword">this</span>);
    }
  okItem(id){
    <span class="hljs-keyword">this</span>.state.todos.map(item=&gt;{
        <span class="hljs-keyword">if</span>(item.id==id){
            item.done=<span class="hljs-number">1</span>;
        }
            <span class="hljs-keyword">return</span> item;
        });
        <span class="hljs-keyword">this</span>.setState({
            todos:<span class="hljs-keyword">this</span>.state.todos
        });
    }
    deleteItem(id){
        let newtodos=<span class="hljs-keyword">this</span>.state.todos.filter((item)=&gt;{
            <span class="hljs-keyword">return</span> !(item.id==id)
        });
          <span class="hljs-keyword">this</span>.setState({
            todos:newtodos
        });
    }

    addItem(value){
       <span class="hljs-keyword">this</span>.state.todos.unshift(
            {
                id:<span class="hljs-keyword">this</span>.ids++,
                text:value,
                time:(new Date()).toLocaleString(),
                done:<span class="hljs-number">0</span>
            }
        )

        <span class="hljs-keyword">this</span>.setState({
            todos:<span class="hljs-keyword">this</span>.state.todos
        });
    }

    render(){
        <span class="hljs-keyword">return</span> (
            &lt;div className=<span class="hljs-string">"container"</span>&gt;
                &lt;br/&gt;
                &lt;br/&gt;
                &lt;br/&gt;
            &lt;div className=<span class="hljs-string">"panel panel-default"</span>&gt;
                &lt;div className=<span class="hljs-string">"panel-headingbg-danger"</span>&gt;
                        &lt;h1 className=<span class="hljs-string">"text-center "</span>&gt;ToDo&lt;small&gt;你要做什么？&lt;/small&gt;&lt;/h1&gt;
                        &lt;hr/&gt;
                &lt;/div&gt;
                &lt;div className=<span class="hljs-string">"panel-body"</span>&gt;
                        &lt;ToDoForm addItem={<span class="hljs-keyword">this</span>.addItem}/&gt;
                        &lt;ToDoList  okItem={<span class="hljs-keyword">this</span>.okItem} deleteItem={<span class="hljs-keyword">this</span>.deleteItem} <span class="hljs-keyword">data</span>={<span class="hljs-keyword">this</span>.state.todos}/&gt;
                    &lt;/div&gt;
                &lt;/div&gt; 
            &lt;/div&gt;
        );
    }
}

export <span class="hljs-keyword">default</span> ToDoapp;  <span class="hljs-comment">//导出ToDoapp模块</span></code></pre>
<ul><li>创建ToDoList.js文件</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';

import ToDoItem from './ToDoItem';  //导入ToDoItem模块
class ToDoList extends React.Component{
    render(){
        let todos=this.props.data;
        let todoItems=todos.map(item=>{
            return <ToDoItem okItem={this.props.okItem} deleteItem={this.props.deleteItem} key={item.id} data={item}/>
        });

        return (
            <table className=&quot;table table-striped&quot;>
                <thead>
                    <tr>
                        <th>内容</th>
                        <th>时间</th>
                        <th>状态</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    {todoItems}
                </tbody>
            </table>
        );
    }
}

export default ToDoList;  //导出ToDoList模块" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;

<span class="hljs-keyword">import</span> ToDoItem <span class="hljs-keyword">from</span> <span class="hljs-string">'./ToDoItem'</span>;  <span class="hljs-comment">//导入ToDoItem模块</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ToDoList</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span></span>{
    render(){
        <span class="hljs-keyword">let</span> todos=<span class="hljs-keyword">this</span>.props.data;
        <span class="hljs-keyword">let</span> todoItems=todos.map(<span class="hljs-function"><span class="hljs-params">item</span>=&gt;</span>{
            <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">ToDoItem</span> <span class="hljs-attr">okItem</span>=<span class="hljs-string">{this.props.okItem}</span> <span class="hljs-attr">deleteItem</span>=<span class="hljs-string">{this.props.deleteItem}</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{item.id}</span> <span class="hljs-attr">data</span>=<span class="hljs-string">{item}/</span>&gt;</span>
        });

        return (
            <span class="hljs-tag">&lt;<span class="hljs-name">table</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"table table-striped"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">thead</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">th</span>&gt;</span>内容<span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">th</span>&gt;</span>时间<span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">th</span>&gt;</span>状态<span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">th</span>&gt;</span>操作<span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span>
                    <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">thead</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">tbody</span>&gt;</span>
                    {todoItems}
                <span class="hljs-tag">&lt;/<span class="hljs-name">tbody</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">table</span>&gt;</span>
        );
    }
}

export default ToDoList;  //导出ToDoList模块</span></code></pre>
<ul><li>创建ToDoItem.js文件</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';

class ToDoItem extends React.Component{
    delete(){
        this.props.deleteItem(this.props.data.id);
    }
    complete(){
        this.props.okItem(this.props.data.id);
    }
    render(){

        let {text,time,done,id}=this.props.data;

        return (
           <tr>
               <td>{text}</td>
               <td>{time}</td>
               <td>{done==0?&quot;未完成&quot;:&quot;完成&quot;}</td>
               <td>
                   <a className=&quot;btn btn-primary&quot; onClick={this.delete.bind(this)}>删除</a>
                   <a className=&quot;btn btn-success&quot; onClick={this.complete.bind(this)}>
                     <span className=&quot;glyphicon glyphicon-ok&quot; aria-hidden=&quot;true&quot;></span>
                            完成
                   </a>
                </td>
           </tr>
        );
    }
}

export default ToDoItem;  //导出ToDoItem模块" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ToDoItem</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span></span>{
    <span class="hljs-keyword">delete</span>(){
        <span class="hljs-keyword">this</span>.props.deleteItem(<span class="hljs-keyword">this</span>.props.data.id);
    }
    complete(){
        <span class="hljs-keyword">this</span>.props.okItem(<span class="hljs-keyword">this</span>.props.data.id);
    }
    render(){

        <span class="hljs-keyword">let</span> {text,time,done,id}=<span class="hljs-keyword">this</span>.props.data;

        <span class="hljs-keyword">return</span> (
           <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
               <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>{text}<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
               <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>{time}<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
               <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>{done==0?"未完成":"完成"}<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
               <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>
                   <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"btn btn-primary"</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{this.delete.bind(this)}</span>&gt;</span>删除<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
                   <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"btn btn-success"</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{this.complete.bind(this)}</span>&gt;</span>
                     <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"glyphicon glyphicon-ok"</span> <span class="hljs-attr">aria-hidden</span>=<span class="hljs-string">"true"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                            完成
                   <span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
           <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span></span>
        );
    }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> ToDoItem;  <span class="hljs-comment">//导出ToDoItem模块</span></code></pre>
<ul><li>创建ToDoForm.js文件</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';

class ToDoForm extends React.Component{
   tijiao(event){
        event.preventDefault();
    }
    add(event){
        
        if(event.type==&quot;keyup&quot;&amp;&amp;event.keyCode!=13){
            return false;
        }

        let txt=this.refs.txt.value;
        if(txt==&quot;&quot;) return false;
        this.props.addItem(txt);
        this.refs.txt.value=&quot;&quot;;
    }
    render(){
        return(
             <form className=&quot;form-horizontal&quot; onSubmit={this.tijiao.bind(this)}>
                <div className=&quot;form-group&quot;>
                    <div className=&quot;col-sm-10&quot;>
                        <input ref=&quot;txt&quot;  type=&quot;text&quot; className=&quot;form-control&quot; onKeyUp={this.add.bind(this)} id=&quot;exampleInputName2&quot; placeholder=&quot;请输入内容&quot;/>
                    </div>
                    <div className=&quot;col-sm-2&quot;>
                <button type=&quot;button&quot; className=&quot;btn btn-primary&quot; onClick={this.add.bind(this)}>添加</button>
                    </div>
                </div>
            </form>
        );
    }
}
export default ToDoForm;  //导出ToDoForm模块" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-keyword">import</span> <span class="hljs-type">React</span> from <span class="hljs-symbol">'reac</span>t';

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ToDoForm</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span></span>{
   tijiao(event){
        event.preventDefault();
    }
    add(event){
        
        <span class="hljs-keyword">if</span>(event.<span class="hljs-keyword">type</span>==<span class="hljs-string">"keyup"</span>&amp;&amp;event.keyCode!=<span class="hljs-number">13</span>){
            <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
        }

        let txt=<span class="hljs-keyword">this</span>.refs.txt.value;
        <span class="hljs-keyword">if</span>(txt==<span class="hljs-string">""</span>) <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
        <span class="hljs-keyword">this</span>.props.addItem(txt);
        <span class="hljs-keyword">this</span>.refs.txt.value=<span class="hljs-string">""</span>;
    }
    render(){
        <span class="hljs-keyword">return</span>(
             &lt;form className=<span class="hljs-string">"form-horizontal"</span> onSubmit={<span class="hljs-keyword">this</span>.tijiao.bind(<span class="hljs-keyword">this</span>)}&gt;
                &lt;div className=<span class="hljs-string">"form-group"</span>&gt;
                    &lt;div className=<span class="hljs-string">"col-sm-10"</span>&gt;
                        &lt;input ref=<span class="hljs-string">"txt"</span>  <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">"text"</span> className=<span class="hljs-string">"form-control"</span> onKeyUp={<span class="hljs-keyword">this</span>.add.bind(<span class="hljs-keyword">this</span>)} id=<span class="hljs-string">"exampleInputName2"</span> placeholder=<span class="hljs-string">"请输入内容"</span>/&gt;
                    &lt;/div&gt;
                    &lt;div className=<span class="hljs-string">"col-sm-2"</span>&gt;
                &lt;button <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">"button"</span> className=<span class="hljs-string">"btn btn-primary"</span> onClick={<span class="hljs-keyword">this</span>.add.bind(<span class="hljs-keyword">this</span>)}&gt;添加&lt;/button&gt;
                    &lt;/div&gt;
                &lt;/div&gt;
            &lt;/form&gt;
        );
    }
}
export <span class="hljs-keyword">default</span> <span class="hljs-type">ToDoForm</span>;  <span class="hljs-comment">//导出ToDoForm模块</span></code></pre>
<blockquote><p>这里我们能用到了栅格化布局；</p></blockquote>
<hr>
<blockquote><p>接下来就让我们来看一下效果吧：</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/bVRJlb?w=1231&amp;h=507" src="https://static.alili.tech/img/bVRJlb?w=1231&amp;h=507" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<blockquote><p>效果：添加的时候可以显示当前时间，安回车键就可以直接添加，点击完成可以把未完成改成完成，点击删除可以删除内容；</p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React结合Bootstrap的使用

## 原文链接
[https://segmentfault.com/a/1190000010383464](https://segmentfault.com/a/1190000010383464)

