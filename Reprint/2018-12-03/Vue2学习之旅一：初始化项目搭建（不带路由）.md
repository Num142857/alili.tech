---
title: 'Vue2学习之旅一：初始化项目搭建（不带路由）' 
date: 2018-12-03 2:30:08
hidden: true
slug: mtmetxjgr2j
categories: [reprint]
---

{{< raw >}}

                    
<p>作者：心叶<br>时间：2018-04-25 16:33</p>
<p>本篇最终项目文件Github地址：github.com/yelloxing/vue.quick/tree/V1</p>
<p><a href="https://segmentfault.com/u/yelloxing/articles">Vue2学习之旅系列文章目录</a></p>
<p>【不使用vue-cli搭建，因为那样会遗落太多细节没有说明】</p>
<p>下面，我们来一步步使用webpack搭建一个用来学习Vue2的环境，力求没有冗余的代码，让我们开始吧！</p>
<p>备注：后面的学习全部基于这个环境来进行！</p>
<p>先来看看最终的项目结构：</p>
<p><span class="img-wrap"><img data-src="/img/bV9ngv?w=301&amp;h=244" src="https://static.alili.tech/img/bV9ngv?w=301&amp;h=244" alt="图片描述" title="图片描述"></span></p>
<h2>整体说明</h2>
<p>(1)build/main.js和node_modules是自动生成的，先无视</p>
<p>(2)package.json里面是需要用到的node包和一些配置，内容如下：</p>
<pre><code> {
  "name": "vue.quick",
  "version": "0.0.0",
  "scripts": {
    "start": "node_modules/.bin/webpack-dev-server --inline --hot --port 20000",
    "release": "node_modules/.bin/webpack"
  },
  "devDependencies": {
    "babel-core": "^6.26.0",
    "babel-loader": "^6.4.1",
    "css-loader": "^0.28.11",
    "vue-loader": "^11.3.4",
    "vue-template-compiler": "^2.5.16",
    "webpack": "^2.4.1",
    "webpack-dev-server": "^2.4.2"
  },
  "dependencies": {
    "vue": "^2.2.6"
  }
}
</code></pre>
<p>既然是vue开发，因此vue包是必须的，webpack是打包框架，webpack-dev-server是服务器，vue-loader和babel-loader分别是用来解析.js和.vue文件的，余下的都是这二个包依赖的。</p>
<p>上面的start和release分别是配置启动服务器和打包的</p>
<p>（3）webpack.config.js是用来配置webpack的，先看看具体内容：</p>
<pre><code>var webpack = require('webpack');
module.exports = {
    entry: ['./src/entry.js'],
    output: {
        path: __dirname,
        filename: 'build/main.js'
    },
    module: {
        loaders: [{
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    }
};
</code></pre>
<p>入口文件是entry.js，打包的结果存放在main.js，然后配置了如何解析.vue和.js文件</p>
<p>（4）接着是index.html：</p>
<pre><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;meta charset="UTF-8"&gt;
        &lt;title&gt;vue.quick&lt;/title&gt;
    &lt;/head&gt;
    &lt;body&gt;
        &lt;div id="root"&gt;&lt;/div&gt;
        &lt;script src="./build/main.js"&gt;&lt;/script&gt;
    &lt;/body&gt;
&lt;/html&gt;
</code></pre>
<p>除了引入了最后打包的文件main.js外，请记住id='root'，姑且称为挂载点。</p>
<p>(5)最后还剩下二个文件没有说了，先看看App.vue，这个叫做【单文件组件】，其实就是一个vue组件，看看内容（具体写法先无视，后面会细说）：</p>
<pre><code>&lt;template&gt;
    &lt;span&gt;
        "{{" msg "}}"
    &lt;/span&gt;
&lt;/template&gt;

&lt;script&gt;
export default {
  data() {
    return {
      msg: "vue.quick - 基本版本代码"
    };
  }
};
&lt;/script&gt;

&lt;style&gt;
span {
  color: blue;
}
&lt;/style&gt;
</code></pre>
<p>（6）最后一个，也就是打包入口文件entry.js，先看看内容：</p>
<pre><code>import Vue from 'vue';
import App from './App.vue';

//根对象
var vm = new Vue({
    //挂载点
    el: '#root',
    //启动组件
    render: function (callback) {
        return callback(App);
    }
});
</code></pre>
<p>可以简单的理解，这就是一个vue对象，前面（5）说的组件被他使用了，具体的还是后面细说。</p>
<h2>启动项目</h2>
<p>全部的文件都在本地保存好之后（node.js需要保证安装好），命令行进入项目，确保dir或者ls的时候可以看见package.json，然后运行：</p>
<pre><code>npm install
</code></pre>
<p>这样就安装好了需要的node包，接着我们启动服务：</p>
<pre><code>npm start
</code></pre>
<p>如果用的是上面的配置，现在在浏览器访问localhost:20000/应该就可以看见蓝色的【vue.quick - 基本版本代码】几个字了。</p>
<p>除此之外，你还可以运行打包命令：</p>
<pre><code>npm run release
</code></pre>
<p>此时之前说的打包生成的main.js文件应该就生成了，或者选择用浏览器打开index.html应该也可以看见和刚刚一样的结果。</p>
<h2>vue对象说明</h2>
<p>你可以认为，一个vue对象（也有的叫vue实例）就是一个管理一块页面区域的东西，具体管理哪一块区域是根据挂载点来确定的，还记得之前说的index.html里面的挂载点吗，就是和这里的el属性对应的，这里的el属性的值是#root，表示挂载到id=root的标签上，那一块归这个vue对象管理了。</p>
<p>而如何创建一个vue对象是vue知道，因此开头引入了Vue，并使用它常见了一个vue对象，然后这个对象就管理了这一块区域。</p>
<p>可是管理之后，这一块具体如何渲染，有什么交互等，因为是vue对象，直接看VUE的API就知道了</p>
<p>这里用到了render属性，表示使用App这个vue单文件组件来处理这一块，因此，接着看这个组件里面的东西。</p>
<h2>vue单文件组件</h2>
<p>组件里面的地方可以划分三块：template，script和style。</p>
<p>4.1 template表示组件模板，有点类似html代码，不过有一点点区别</p>
<p>4.2 style表示样式，你可以在这里写修改模板的css文件</p>
<p>4.3 script可以理解为管理数据和控制的，比如这里定义了一个数据msg，在模板中使用了他，然后页面就显示出来了结果</p>
<h2>结束语</h2>
<p>到这里，如果项目已经启动成功，并且对这些文件已经有了大致的理解，那么就可以了，具体的细节会在后续文章中说明。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue2学习之旅一：初始化项目搭建（不带路由）

## 原文链接
[https://segmentfault.com/a/1190000014590324](https://segmentfault.com/a/1190000014590324)

