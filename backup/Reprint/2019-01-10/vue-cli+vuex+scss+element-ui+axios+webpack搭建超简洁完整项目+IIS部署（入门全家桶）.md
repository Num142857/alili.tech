---
title: 'vue-cli+vuex+scss+element-ui+axios+webpack搭建超简洁完整项目+IIS部署（入门全家桶）' 
date: 2019-01-10 2:30:08
hidden: true
slug: r9f1b12g1j
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">从vue-cli脚手架搭建,到实际项目中用到，比如vuex状态管理；css预编译语言scss；还可能会借助ui框架element-ui；以及与服务端数据交互axios；还有部署到服务器端；才是完整的项目流程，刚入门在这里耗了比较多时间，这里搭建个最简洁的全家桶方便大家学习</h2>
<p><em>可以跳过下面步骤直接下载使用：</em><br><em><a href="https://github.com/MVPVP/ypt201/em" rel="nofollow noreferrer" target="_blank">https://github.com/MVPVP/ypt2...</a><br><em>使用步骤：</em><br><em>下载代码=》安装依赖 <code>npm install</code> =》运行程序 <code>npm run dev</code> =》浏览器中打开 <a href="http://localhost:8080/em" rel="nofollow noreferrer" target="_blank">http://localhost:8080</a></em></em></p>
<p><strong>一、安装vue-cli；</strong></p>
<p>1、<code>npm install -g vue-cli</code><br>全局安装vue-cli；<br><span class="img-wrap"><img data-src="/img/bVPY0M?w=478&amp;h=209" src="https://static.alili.tech/img/bVPY0M?w=478&amp;h=209" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>2、<code>npm install -g vue-cli</code><br>生成ypt201项目名项目文件，默认回车，会安装vue-router路由和EsLint帮助我们检查Javascript编程时的语法格式等；</p>
<p><span class="img-wrap"><img data-src="/img/bVPY31?w=364&amp;h=237" src="https://static.alili.tech/img/bVPY31?w=364&amp;h=237" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>3、<code>cd ypt201</code><br>进入ypt201文件目录下</p>
<p><span class="img-wrap"><img data-src="/img/bVPY3V?w=258&amp;h=75" src="https://static.alili.tech/img/bVPY3V?w=258&amp;h=75" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>4、<code>npm install</code><br>安装依赖,ypt201文件目录下生产node_modules文件；</p>
<p>5、<code>npm run dev</code><br>vue-cli项目跑起来，并在浏览器打开（注意端口是否被占用）</p>
<p><span class="img-wrap"><img data-src="/img/bVPZdE?w=490&amp;h=209" src="https://static.alili.tech/img/bVPZdE?w=490&amp;h=209" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><strong>二、补全vuex+scss+element-ui+axios需要的依赖；</strong></p>
<p>1、<code>npm install --save-dev sass-loader node-sass</code>    用于编译scss文件<br>2、<code>npm install --save vuex axios element-ui</code></p>
<p><strong>三、编辑文件目录，项目中简单使用scss，vuex，element-ui，axios，slot，props练手</strong><br>文件目录如下：</p>
<p><span class="img-wrap"><img data-src="/img/bVP1L8?w=1002&amp;h=978" src="https://static.alili.tech/img/bVP1L8?w=1002&amp;h=978" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>//src文件夹页面自己编辑的，其他页面vue-cli生成的；<br>关于src文件说明：<br>//assets资源文件jsondata.js放静态数据,样式文件scss和imgs图片文件；</p>
<p>//commponents目录里面放了公共组件header,dialogs,menus,pages等文件；</p>
<p>//routes.js文件放路由配置文件；</p>
<p>//views放详情页面文件；</p>
<p>//vuex放状态管理文件；</p>
<p>//App.vue是项目入口文件。</p>
<p>//main.js这是项目的核心文件。全局的配置都在这个文件里面配置。</p>
<p><strong>从vue-cli手脚架搭建到这个项目搭建，所有改动有src里面文件和webpack.base.config文件：</strong><br><strong>以下按照截图顺序粘贴出所有改动过的代码：</strong><br>在webpack.base.config中屏蔽这段代码避免报错，eslint用于代码检测的；<br><strong>webpack.base.config</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clojure"><code>{
      {
        test: /\.(<span class="hljs-name">js</span>|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve(<span class="hljs-name">'src'</span>), resolve(<span class="hljs-name">'test'</span>)],
        options: {
          formatter: require(<span class="hljs-name">'eslint-friendly-formatter'</span>)
        }
      },</code></pre>
<p><strong>jsondata.js</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const menuDatas={
  home:{
    to: '/',text:'首页'
  },
  about:{
    to: 'about',text:'关于'
  },
  yysxx:{
    to: 'showui',text:'组件库'
  }
};

export {menuDatas}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-keyword">const</span> menuDatas={
  <span class="hljs-built_in">home</span>:{
    to: <span class="hljs-string">'/'</span>,<span class="hljs-built_in">text</span>:<span class="hljs-string">'首页'</span>
  },
  about:{
    to: <span class="hljs-string">'about'</span>,<span class="hljs-built_in">text</span>:<span class="hljs-string">'关于'</span>
  },
  yysxx:{
    to: <span class="hljs-string">'showui'</span>,<span class="hljs-built_in">text</span>:<span class="hljs-string">'组件库'</span>
  }
};

<span class="hljs-keyword">export</span> {menuDatas}</code></pre>
<p><strong>_header.scss</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$headerH: 48px;
.m-header{
  height: $headerH;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-variable">$headerH</span>: <span class="hljs-number">48px</span>;
<span class="hljs-selector-class">.m-header</span>{
  <span class="hljs-attribute">height</span>: <span class="hljs-variable">$headerH</span>;
}</code></pre>
<p><strong>_menus.scss</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".m-menus{
  width: 200px;
  top: 200px;
  position: absolute;
  bottom: 0;
  li{
    line-height:50px;
  }
}
.router-link-exact-active{
  color: #ff0000;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-selector-class">.m-menus</span>{
  <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
  <span class="hljs-attribute">top</span>: <span class="hljs-number">200px</span>;
  <span class="hljs-attribute">position</span>: absolute;
  <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>;
  <span class="hljs-selector-tag">li</span>{
    <span class="hljs-attribute">line-height</span>:<span class="hljs-number">50px</span>;
  }
}
<span class="hljs-selector-class">.router-link-exact-active</span>{
  <span class="hljs-attribute">color</span>: <span class="hljs-number">#ff0000</span>;
}
</code></pre>
<p><strong>reset.scss</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//淘宝初始化css代码
body, h1, h2, h3, h4, h5, h6, hr, p, blockquote, dl, dt, dd, ul, ol, li, pre, form, fieldset, legend, button, input, textarea, th, td { margin:0; padding:0; }
body, button, input, select, textarea { font:12px/1.5tahoma, arial, \5b8b\4f53; }
h1, h2, h3, h4, h5, h6{ font-size:100%; font-weight:normal; }
address, cite, dfn, em, var { font-style:normal; }
code, kbd, pre, samp { font-family:couriernew, courier, monospace; }
small{ font-size:12px; }
ul, ol { list-style:none; }
a { text-decoration:none; }
a:hover { text-decoration:underline; }
sup { vertical-align:text-top; }
sub{ vertical-align:text-bottom; }
legend { color:#000; }
fieldset, img { border:0; }
button, input, select, textarea { font-size:100%; }
table { border-collapse:collapse; border-spacing:0; }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-comment">//淘宝初始化css代码</span>
<span class="hljs-selector-tag">body</span>, <span class="hljs-selector-tag">h1</span>, <span class="hljs-selector-tag">h2</span>, <span class="hljs-selector-tag">h3</span>, <span class="hljs-selector-tag">h4</span>, <span class="hljs-selector-tag">h5</span>, <span class="hljs-selector-tag">h6</span>, hr, <span class="hljs-selector-tag">p</span>, <span class="hljs-selector-tag">blockquote</span>, <span class="hljs-selector-tag">dl</span>, <span class="hljs-selector-tag">dt</span>, <span class="hljs-selector-tag">dd</span>, <span class="hljs-selector-tag">ul</span>, <span class="hljs-selector-tag">ol</span>, <span class="hljs-selector-tag">li</span>, pre, <span class="hljs-selector-tag">form</span>, <span class="hljs-selector-tag">fieldset</span>, <span class="hljs-selector-tag">legend</span>, <span class="hljs-selector-tag">button</span>, <span class="hljs-selector-tag">input</span>, <span class="hljs-selector-tag">textarea</span>, <span class="hljs-selector-tag">th</span>, <span class="hljs-selector-tag">td</span> { <span class="hljs-attribute">margin</span>:<span class="hljs-number">0</span>; <span class="hljs-attribute">padding</span>:<span class="hljs-number">0</span>; }
<span class="hljs-selector-tag">body</span>, <span class="hljs-selector-tag">button</span>, <span class="hljs-selector-tag">input</span>, select, <span class="hljs-selector-tag">textarea</span> { <span class="hljs-attribute">font</span>:<span class="hljs-number">12px</span>/<span class="hljs-number">1.5</span>tahoma, arial, \<span class="hljs-number">5</span>b8b\<span class="hljs-number">4</span>f53; }
<span class="hljs-selector-tag">h1</span>, <span class="hljs-selector-tag">h2</span>, <span class="hljs-selector-tag">h3</span>, <span class="hljs-selector-tag">h4</span>, <span class="hljs-selector-tag">h5</span>, h6{ <span class="hljs-attribute">font-size</span>:<span class="hljs-number">100%</span>; <span class="hljs-attribute">font-weight</span>:normal; }
<span class="hljs-selector-tag">address</span>, <span class="hljs-selector-tag">cite</span>, <span class="hljs-selector-tag">dfn</span>, <span class="hljs-selector-tag">em</span>, <span class="hljs-selector-tag">var</span> { <span class="hljs-attribute">font-style</span>:normal; }
<span class="hljs-selector-tag">code</span>, <span class="hljs-selector-tag">kbd</span>, pre, <span class="hljs-selector-tag">samp</span> { <span class="hljs-attribute">font-family</span>:couriernew, courier, monospace; }
small{ <span class="hljs-attribute">font-size</span>:<span class="hljs-number">12px</span>; }
<span class="hljs-selector-tag">ul</span>, <span class="hljs-selector-tag">ol</span> { <span class="hljs-attribute">list-style</span>:none; }
<span class="hljs-selector-tag">a</span> { <span class="hljs-attribute">text-decoration</span>:none; }
<span class="hljs-selector-tag">a</span>:hover { <span class="hljs-attribute">text-decoration</span>:underline; }
<span class="hljs-selector-tag">sup</span> { <span class="hljs-attribute">vertical-align</span>:text-top; }
sub{ <span class="hljs-attribute">vertical-align</span>:text-bottom; }
<span class="hljs-selector-tag">legend</span> { <span class="hljs-attribute">color</span>:<span class="hljs-number">#000</span>; }
<span class="hljs-selector-tag">fieldset</span>, <span class="hljs-selector-tag">img</span> { <span class="hljs-attribute">border</span>:<span class="hljs-number">0</span>; }
<span class="hljs-selector-tag">button</span>, <span class="hljs-selector-tag">input</span>, select, <span class="hljs-selector-tag">textarea</span> { <span class="hljs-attribute">font-size</span>:<span class="hljs-number">100%</span>; }
<span class="hljs-selector-tag">table</span> { <span class="hljs-attribute">border-collapse</span>:collapse; <span class="hljs-attribute">border-spacing</span>:<span class="hljs-number">0</span>; }
</code></pre>
<p><strong>_dialogs.vue</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!--标题、关闭按钮是统一的，但是中间正文的内容（包括样式）是想自定义的，这时候就会用到Vue组件的slot来分发内容。比如子组件的template的内容为：-->
<template>
    <div class=&quot;m-dialog-wrapper&quot;>
        <div class=&quot;box&quot;>
            <h1>弹窗标题</h1>
            <slot name=&quot;dialogsContain&quot;></slot>
            <div>
                <span class=&quot;m-btn&quot;>确定</span>
                <span class=&quot;m-btn&quot; @click=&quot;dialogCancel()&quot;>取消</span>
            </div>
        </div>
    </div>
</template>
<style lang=&quot;scss&quot; scoped>
    .f-arctileBox,.m-mask {
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        left: 0;
    }

.m-dialog-wrapper{
    @extend .f-arctileBox;
    .boxBg{
        background: #fff;
        opacity: 1;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        padding: 20px 0 50px 0;
    }
    .box{
        background: #fff;
        margin: auto;
        box-shadow: 3px 3px 5px #ccc;
        border: 1px solid #cdcdcd;
        padding: 20px;
        width: 300px;
        position: relative;
    }
}
</style>
<script>
import {store} from '../vuex/store.js'
export default{
    data(){
        return {
            count:0,
            dialogBool:store.state.dialogBool,
            title:'0'
        }
    },
    methods:{
        dialogCancel(){
            store.commit('dialogBoolFalse');
            console.log(store.state.dialogBool)
        }
    }
}
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-comment">&lt;!--标题、关闭按钮是统一的，但是中间正文的内容（包括样式）是想自定义的，这时候就会用到Vue组件的slot来分发内容。比如子组件的template的内容为：--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"m-dialog-wrapper"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"box"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>弹窗标题<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">slot</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"dialogsContain"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">slot</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"m-btn"</span>&gt;</span>确定<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"m-btn"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"dialogCancel()"</span>&gt;</span>取消<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"scss"</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="undefined">
    .f-arctileBox,.m-mask {
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        left: 0;
    }

.m-dialog-wrapper{
    @extend .f-arctileBox;
    .boxBg{
        background: #fff;
        opacity: 1;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        padding: 20px 0 50px 0;
    }
    .box{
        background: #fff;
        margin: auto;
        box-shadow: 3px 3px 5px #ccc;
        border: 1px solid #cdcdcd;
        padding: 20px;
        width: 300px;
        position: relative;
    }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> {store} <span class="hljs-keyword">from</span> <span class="hljs-string">'../vuex/store.js'</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span>{
    data(){
        <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">count</span>:<span class="hljs-number">0</span>,
            <span class="hljs-attr">dialogBool</span>:store.state.dialogBool,
            <span class="hljs-attr">title</span>:<span class="hljs-string">'0'</span>
        }
    },
    <span class="hljs-attr">methods</span>:{
        dialogCancel(){
            store.commit(<span class="hljs-string">'dialogBoolFalse'</span>);
            <span class="hljs-built_in">console</span>.log(store.state.dialogBool)
        }
    }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p><strong>header.vue</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div class=&quot;m-header&quot;>
        "{{"adminName"}}"
    </div>
</template>
<style lang=&quot;scss&quot; src=&quot;../assets/scss/_header.scss&quot; scoped></style>
<script>
    import {store} from '../vuex/store.js'
    export default{
        data () {
            return {
                adminNameName:store.state.adminName,
            }
        },
        //computed相当于属性的一个实时计算，如果实时计算里关联了对象，那么当对象的某个值改变的时候，同事会出发实时计算。
        computed:{
            adminName(){
                return '实时计算'+store.state.adminName;
            }
        }
    }
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"m-header"</span>&gt;</span>
        </span><span class="hljs-template-variable">"{{"adminName"}}"</span><span class="xml">
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"scss"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../assets/scss/_header.scss"</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">import</span> {store} <span class="hljs-keyword">from</span> <span class="hljs-string">'../vuex/store.js'</span>
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span>{
        data () {
            <span class="hljs-keyword">return</span> {
                <span class="hljs-attr">adminNameName</span>:store.state.adminName,
            }
        },
        <span class="hljs-comment">//computed相当于属性的一个实时计算，如果实时计算里关联了对象，那么当对象的某个值改变的时候，同事会出发实时计算。</span>
        computed:{
            adminName(){
                <span class="hljs-keyword">return</span> <span class="hljs-string">'实时计算'</span>+store.state.adminName;
            }
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</span></code></pre>
<p><strong> menus.vue</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div class=&quot;m-menus&quot;>
        <ul>
            <li v-for=&quot;(childMenu,key,childIndex) in menuList&quot; class=&quot;childMenu&quot;>
                <router-link :to=&quot;childMenu.to&quot; :from=&quot;childMenu.to&quot;>"{{"childMenu.text"}}"</router-link>
            </li>
        </ul>
    </div>
</template>
<style lang=&quot;scss&quot; src=&quot;../assets/scss/_menus.scss&quot; scoped></style>
<script>
    import {menuDatas} from '../assets/datas/jsondata.js'
    import {store} from '../vuex/store.js'
    export default {
        name: 'menus',
        data () {
            return {
               menuList:menuDatas
            }
        },
        methods:{

        }
    }
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"m-menus"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"(childMenu,key,childIndex) in menuList"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"childMenu"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">:to</span>=<span class="hljs-string">"childMenu.to"</span> <span class="hljs-attr">:from</span>=<span class="hljs-string">"childMenu.to"</span>&gt;</span></span><span class="hljs-template-variable">"{{"childMenu.text}</span><span class="xml">}<span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"scss"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../assets/scss/_menus.scss"</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
    <span class="hljs-meta"><span class="hljs-meta-keyword">import</span> </span></span></span><span class="hljs-template-variable">{menuDatas}</span><span class="xml"><span class="javascript"> <span class="hljs-keyword">from</span> <span class="hljs-string">'../assets/datas/jsondata.js'</span>
    <span class="hljs-keyword">import</span> </span></span><span class="hljs-template-variable">{store}</span><span class="xml"><span class="javascript"> <span class="hljs-keyword">from</span> <span class="hljs-string">'../vuex/store.js'</span>
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> </span></span><span class="hljs-template-variable">{
        name: 'menus',
        data () {
            return {
               menuList:menuDatas
            }</span><span class="xml"><span class="undefined">
        },
        methods:</span></span><span class="hljs-template-variable">{

        }</span><span class="xml"><span class="undefined">
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</span></code></pre>
<p><strong> pages.vue</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <ul class=&quot;mo-paging&quot;>
        <!-- prev -->
        <li
                :class=&quot;['paging-item', 'paging-item--prev', {'paging-item--disabled' : index === 1}]&quot;
                @click=&quot;prev&quot;>prev</li>

        <!-- first -->
        <li
                :class=&quot;['paging-item', 'paging-item--first', {'paging-item--disabled' : index === 1}]&quot;
                @click=&quot;first&quot;>first</li>

        <li
                :class=&quot;['paging-item', 'paging-item--more']&quot;
                v-if=&quot;showPrevMore&quot;>...</li>

        <li
                :class=&quot;['paging-item', {'paging-item--current' : index === pager}]&quot;
                v-for=&quot;pager in pagers&quot;
                @click=&quot;go(pager)&quot;>"{{" pager "}}"</li>

        <li
                :class=&quot;['paging-item', 'paging-item--more']&quot;
                v-if=&quot;showNextMore&quot;>...</li>

        <!-- last -->
        <li
                :class=&quot;['paging-item', 'paging-item--last', {'paging-item--disabled' : index === pages}]&quot;
                @click=&quot;last&quot;>last</li>

        <!-- next -->
        <li
                :class=&quot;['paging-item', 'paging-item--next', {'paging-item--disabled' : index === pages}]&quot;
                @click=&quot;next&quot;>next</li>
    </ul>
</template>

<script>
    export default {
    name : 'MoPaging',
    //通过props来接受从父组件传递过来的值
    props : {
        //页面中的可见页码，其他的以...替代, 必须是奇数
        perPages : {
            type : Number,
            default : 5
        },
        //当前页码
        pageIndex : {
            type : Number,
            default : 1
        },
        //每页显示条数
        pageSize : {
            type : Number,
            default : 10
        },
        //总记录数
        total : {
            type : Number,
            default : 1
        },

    },
    data () {
        return {
            index : this.pageIndex, //当前页码
            limit : this.pageSize, //每页显示条数
            size : this.total || 1, //总记录数
            showPrevMore : false,
            showNextMore : false
        }
    },
    methods : {
        prev(){
            if (this.index > 1) {
                this.go(this.index - 1)
            }
        },
        next(){
            if (this.index < this.pages) {
                this.go(this.index + 1)
            }
        },
        first(){
            if (this.index !== 1) {
                this.go(1)
            }
        },
        last(){
            if (this.index != this.pages) {
                this.go(this.pages)
            }
        },
        go (page) {
            if (this.index !== page) {
                this.index = page
                //父组件通过change方法来接受当前的页码
                //this.$emit('change', this.index)
            }
        }
    },
    computed : {
        //计算总页码
        pages(){
            return Math.ceil(this.size / this.limit)
        },
        //计算页码，当count等变化时自动计算
        pagers () {
            const array = []
            const perPages = this.perPages
            const pageCount = this.pages
            let current = this.index
            const _offset = (perPages - 1) / 2

            const offset = {
                start : current - _offset,
                end   : current + _offset
            }
            //-1, 3
            if (offset.start < 1) {
                offset.end = offset.end + (1 - offset.start)
                offset.start = 1
            }
            if (offset.end > pageCount) {
                offset.start = offset.start - (offset.end - pageCount)
                offset.end = pageCount
            }
            if (offset.start < 1) offset.start = 1

            this.showPrevMore = (offset.start > 1)
            this.showNextMore = (offset.end < pageCount)

            for (let i = offset.start; i <= offset.end; i++) {
                array.push(i)
            }
            console.log('arraypage');
            return array
        }
    }
    ,
    watch : {
        pageIndex(val) {
            this.index = val || 1
        },
        pageSize(val) {
            this.limit = val || 10
        },
        total(val) {
            this.size = val || 1
        }
    }
}
</script>

<style lang=&quot;scss&quot; scoped>
    .mo-paging {
        display: inline-block;
        padding: 0;
        margin: 1rem 0;
        font-size: 0;
        list-style: none;
        user-select: none;
        > .paging-item {
            display: inline;
            font-size: 14px;
            position: relative;
            padding: 6px 12px;
            line-height: 1.42857143;
            text-decoration: none;
            border: 1px solid #ccc;
            background-color: #fff;
            margin-left: -1px;
            cursor: pointer;
            color: #0275d8;
            &amp;:first-child {
                margin-left: 0;
        }
            &amp;:hover {
                background-color: #f0f0f0;
                color: #0275d8;
        }
            &amp;.paging-item--disabled,
            &amp;.paging-item--more{
                background-color: #fff;
                color: #505050;
        }
            //禁用
            &amp;.paging-item--disabled {
                cursor: not-allowed;
                opacity: .75;
        }
            &amp;.paging-item--more,
            &amp;.paging-item--current {
                cursor: default;
        }
            //选中
            &amp;.paging-item--current {
                background-color: #0275d8;
                color:#fff;
                position: relative;
                z-index: 1;
                border-color: #0275d8;
        }
    }
    }
</style>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mo-paging"</span>&gt;</span>
        <span class="hljs-comment">&lt;!-- prev --&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>
                <span class="hljs-attr">:class</span>=<span class="hljs-string">"['paging-item', 'paging-item--prev', {'paging-item--disabled' : index === 1}]"</span>
                @<span class="hljs-attr">click</span>=<span class="hljs-string">"prev"</span>&gt;</span>prev<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>

        <span class="hljs-comment">&lt;!-- first --&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>
                <span class="hljs-attr">:class</span>=<span class="hljs-string">"['paging-item', 'paging-item--first', {'paging-item--disabled' : index === 1}]"</span>
                @<span class="hljs-attr">click</span>=<span class="hljs-string">"first"</span>&gt;</span>first<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>

        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>
                <span class="hljs-attr">:class</span>=<span class="hljs-string">"['paging-item', 'paging-item--more']"</span>
                <span class="hljs-attr">v-if</span>=<span class="hljs-string">"showPrevMore"</span>&gt;</span>...<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>

        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>
                <span class="hljs-attr">:class</span>=<span class="hljs-string">"['paging-item', {'paging-item--current' : index === pager}]"</span>
                <span class="hljs-attr">v-for</span>=<span class="hljs-string">"pager in pagers"</span>
                @<span class="hljs-attr">click</span>=<span class="hljs-string">"go(pager)"</span>&gt;</span></span><span class="hljs-template-variable">"{{" pager "}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>

        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>
                <span class="hljs-attr">:class</span>=<span class="hljs-string">"['paging-item', 'paging-item--more']"</span>
                <span class="hljs-attr">v-if</span>=<span class="hljs-string">"showNextMore"</span>&gt;</span>...<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>

        <span class="hljs-comment">&lt;!-- last --&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>
                <span class="hljs-attr">:class</span>=<span class="hljs-string">"['paging-item', 'paging-item--last', {'paging-item--disabled' : index === pages}]"</span>
                @<span class="hljs-attr">click</span>=<span class="hljs-string">"last"</span>&gt;</span>last<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>

        <span class="hljs-comment">&lt;!-- next --&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>
                <span class="hljs-attr">:class</span>=<span class="hljs-string">"['paging-item', 'paging-item--next', {'paging-item--disabled' : index === pages}]"</span>
                @<span class="hljs-attr">click</span>=<span class="hljs-string">"next"</span>&gt;</span>next<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">name</span> : <span class="hljs-string">'MoPaging'</span>,
    <span class="hljs-comment">//通过props来接受从父组件传递过来的值</span>
    props : {
        <span class="hljs-comment">//页面中的可见页码，其他的以...替代, 必须是奇数</span>
        perPages : {
            <span class="hljs-attr">type</span> : <span class="hljs-built_in">Number</span>,
            <span class="hljs-attr">default</span> : <span class="hljs-number">5</span>
        },
        <span class="hljs-comment">//当前页码</span>
        pageIndex : {
            <span class="hljs-attr">type</span> : <span class="hljs-built_in">Number</span>,
            <span class="hljs-attr">default</span> : <span class="hljs-number">1</span>
        },
        <span class="hljs-comment">//每页显示条数</span>
        pageSize : {
            <span class="hljs-attr">type</span> : <span class="hljs-built_in">Number</span>,
            <span class="hljs-attr">default</span> : <span class="hljs-number">10</span>
        },
        <span class="hljs-comment">//总记录数</span>
        total : {
            <span class="hljs-attr">type</span> : <span class="hljs-built_in">Number</span>,
            <span class="hljs-attr">default</span> : <span class="hljs-number">1</span>
        },

    },
    data () {
        <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">index</span> : <span class="hljs-keyword">this</span>.pageIndex, <span class="hljs-comment">//当前页码</span>
            limit : <span class="hljs-keyword">this</span>.pageSize, <span class="hljs-comment">//每页显示条数</span>
            size : <span class="hljs-keyword">this</span>.total || <span class="hljs-number">1</span>, <span class="hljs-comment">//总记录数</span>
            showPrevMore : <span class="hljs-literal">false</span>,
            <span class="hljs-attr">showNextMore</span> : <span class="hljs-literal">false</span>
        }
    },
    <span class="hljs-attr">methods</span> : {
        prev(){
            <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.index &gt; <span class="hljs-number">1</span>) {
                <span class="hljs-keyword">this</span>.go(<span class="hljs-keyword">this</span>.index - <span class="hljs-number">1</span>)
            }
        },
        next(){
            <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.index &lt; <span class="hljs-keyword">this</span>.pages) {
                <span class="hljs-keyword">this</span>.go(<span class="hljs-keyword">this</span>.index + <span class="hljs-number">1</span>)
            }
        },
        first(){
            <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.index !== <span class="hljs-number">1</span>) {
                <span class="hljs-keyword">this</span>.go(<span class="hljs-number">1</span>)
            }
        },
        last(){
            <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.index != <span class="hljs-keyword">this</span>.pages) {
                <span class="hljs-keyword">this</span>.go(<span class="hljs-keyword">this</span>.pages)
            }
        },
        go (page) {
            <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.index !== page) {
                <span class="hljs-keyword">this</span>.index = page
                <span class="hljs-comment">//父组件通过change方法来接受当前的页码</span>
                <span class="hljs-comment">//this.$emit('change', this.index)</span>
            }
        }
    },
    <span class="hljs-attr">computed</span> : {
        <span class="hljs-comment">//计算总页码</span>
        pages(){
            <span class="hljs-keyword">return</span> <span class="hljs-built_in">Math</span>.ceil(<span class="hljs-keyword">this</span>.size / <span class="hljs-keyword">this</span>.limit)
        },
        <span class="hljs-comment">//计算页码，当count等变化时自动计算</span>
        pagers () {
            <span class="hljs-keyword">const</span> array = []
            <span class="hljs-keyword">const</span> perPages = <span class="hljs-keyword">this</span>.perPages
            <span class="hljs-keyword">const</span> pageCount = <span class="hljs-keyword">this</span>.pages
            <span class="hljs-keyword">let</span> current = <span class="hljs-keyword">this</span>.index
            <span class="hljs-keyword">const</span> _offset = (perPages - <span class="hljs-number">1</span>) / <span class="hljs-number">2</span>

            <span class="hljs-keyword">const</span> offset = {
                <span class="hljs-attr">start</span> : current - _offset,
                <span class="hljs-attr">end</span>   : current + _offset
            }
            <span class="hljs-comment">//-1, 3</span>
            <span class="hljs-keyword">if</span> (offset.start &lt; <span class="hljs-number">1</span>) {
                offset.end = offset.end + (<span class="hljs-number">1</span> - offset.start)
                offset.start = <span class="hljs-number">1</span>
            }
            <span class="hljs-keyword">if</span> (offset.end &gt; pageCount) {
                offset.start = offset.start - (offset.end - pageCount)
                offset.end = pageCount
            }
            <span class="hljs-keyword">if</span> (offset.start &lt; <span class="hljs-number">1</span>) offset.start = <span class="hljs-number">1</span>

            <span class="hljs-keyword">this</span>.showPrevMore = (offset.start &gt; <span class="hljs-number">1</span>)
            <span class="hljs-keyword">this</span>.showNextMore = (offset.end &lt; pageCount)

            <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = offset.start; i &lt;= offset.end; i++) {
                array.push(i)
            }
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'arraypage'</span>);
            <span class="hljs-keyword">return</span> array
        }
    }
    ,
    <span class="hljs-attr">watch</span> : {
        pageIndex(val) {
            <span class="hljs-keyword">this</span>.index = val || <span class="hljs-number">1</span>
        },
        pageSize(val) {
            <span class="hljs-keyword">this</span>.limit = val || <span class="hljs-number">10</span>
        },
        total(val) {
            <span class="hljs-keyword">this</span>.size = val || <span class="hljs-number">1</span>
        }
    }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"scss"</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="undefined">
    .mo-paging {
        display: inline-block;
        padding: 0;
        margin: 1rem 0;
        font-size: 0;
        list-style: none;
        user-select: none;
        &gt; .paging-item {
            display: inline;
            font-size: 14px;
            position: relative;
            padding: 6px 12px;
            line-height: 1.42857143;
            text-decoration: none;
            border: 1px solid #ccc;
            background-color: #fff;
            margin-left: -1px;
            cursor: pointer;
            color: #0275d8;
            &amp;:first-child {
                margin-left: 0;
        }
            &amp;:hover {
                background-color: #f0f0f0;
                color: #0275d8;
        }
            &amp;.paging-item--disabled,
            &amp;.paging-item--more{
                background-color: #fff;
                color: #505050;
        }
            //禁用
            &amp;.paging-item--disabled {
                cursor: not-allowed;
                opacity: .75;
        }
            &amp;.paging-item--more,
            &amp;.paging-item--current {
                cursor: default;
        }
            //选中
            &amp;.paging-item--current {
                background-color: #0275d8;
                color:#fff;
                position: relative;
                z-index: 1;
                border-color: #0275d8;
        }
    }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
</span></code></pre>
<p><strong>index.js </strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/views/Hello'
import aboutPage from '@/views/about'
import showuiPage from '@/views/showui'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/about',
      name: 'about',
      component: aboutPage
    },
    {
      path: '/showui',
      name: 'showui',
      component: showuiPage
    }

  ]
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> Router <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-router'</span>
<span class="hljs-keyword">import</span> Hello <span class="hljs-keyword">from</span> <span class="hljs-string">'@/views/Hello'</span>
<span class="hljs-keyword">import</span> aboutPage <span class="hljs-keyword">from</span> <span class="hljs-string">'@/views/about'</span>
<span class="hljs-keyword">import</span> showuiPage <span class="hljs-keyword">from</span> <span class="hljs-string">'@/views/showui'</span>

Vue.use(Router)

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">new</span> Router({
  routes: [
    {
      path: <span class="hljs-string">'/'</span>,
      name: <span class="hljs-string">'Hello'</span>,
      component: Hello
    },
    {
      path: <span class="hljs-string">'/about'</span>,
      name: <span class="hljs-string">'about'</span>,
      component: aboutPage
    },
    {
      path: <span class="hljs-string">'/showui'</span>,
      name: <span class="hljs-string">'showui'</span>,
      component: showuiPage
    }

  ]
})
</code></pre>
<p><strong>about.vue </strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div>
    <h2>关于指令v-for</h2>
    <ol>
      <li v-for=&quot;todo in todos&quot;>
        "{{" todo.text "}}"
      </li>
    </ol>
    <h2>关于事件click</h2>
    <button @click=&quot;eClick()&quot;>操作状态</button>
    <h2>关于状态管理vuex</h2>
    <div>"{{"number"}}"</div>
    <h2>关于slot</h2>
    <button class=&quot;icon right&quot; @click=&quot;areaClick()&quot;>弹窗案例</button>
    <h2>关于props</h2>
    <div class=&quot;m-page&quot;>
      <pages-tab
        :page-index=&quot;currentPage&quot;
        :total=&quot;count&quot;
        :page-size=&quot;pageSize&quot;
        :per-pages=&quot;perPages&quot;>
      </pages-tab>
    </div>


    <dialogs-tab v-show=&quot;dialogBool&quot;>
      <div slot=&quot;dialogsHeader&quot;><span v-text=&quot;dialogsTitle&quot;></span></div>
      <div slot=&quot;dialogsContain&quot;>
        <p>这里是弹窗具体内容-房产信息</p>
        <p>这里是弹窗具体内容-房产信息</p>
      </div>
    </dialogs-tab>
  </div>
</template>

<script>
import {store} from '../vuex/store.js'
import dialogsTab from '../components/dialogs.vue'
import pagesTab from '../components/pages.vue'
export default {
  name: 'indexP',
  data () {
    return {
      todos: [
        { text: 'Learn JavaScript' },
        { text: 'Learn Vue' },
        { text: 'Build something awesome' }
      ],
      dialogsTitle:'',

      perPages:7,
      pageSize : 20 , //每页显示20条数据
      currentPage : 1, //当前页码
      count : 200, //总记录数
      items : []
    }
  },
  methods:{
    eClick(){
      console.log(9999);
      store.commit('inc');
    },
    areaClick(){
      console.log('areaClick');
      store.commit('dialogBoolTrue');
      console.log(store.state.dialogBool);
    }
  },
  computed: {
    number(){
      return store.state.count
    },
    dialogBool(){
      return store.state.dialogBool;
    }
  },
  components:{
    dialogsTab,
    pagesTab
  }
};
</script>
<style lang=&quot;scss&quot;>
  h2{
    background: #417ccc;
    margin: 15px 0 5px;
    color: #fff;
  }
</style>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>关于指令v-for<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ol</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"todo in todos"</span>&gt;</span>
        </span><span class="hljs-template-variable">"{{" todo.text "}}"</span><span class="xml">
      <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ol</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>关于事件click<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"eClick()"</span>&gt;</span>操作状态<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>关于状态管理vuex<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span></span><span class="hljs-template-variable">"{{"number"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>关于slot<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"icon right"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"areaClick()"</span>&gt;</span>弹窗案例<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>关于props<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"m-page"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">pages-tab</span>
        <span class="hljs-attr">:page-index</span>=<span class="hljs-string">"currentPage"</span>
        <span class="hljs-attr">:total</span>=<span class="hljs-string">"count"</span>
        <span class="hljs-attr">:page-size</span>=<span class="hljs-string">"pageSize"</span>
        <span class="hljs-attr">:per-pages</span>=<span class="hljs-string">"perPages"</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">pages-tab</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>


    <span class="hljs-tag">&lt;<span class="hljs-name">dialogs-tab</span> <span class="hljs-attr">v-show</span>=<span class="hljs-string">"dialogBool"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"dialogsHeader"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">v-text</span>=<span class="hljs-string">"dialogsTitle"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"dialogsContain"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>这里是弹窗具体内容-房产信息<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>这里是弹窗具体内容-房产信息<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">dialogs-tab</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> {store} <span class="hljs-keyword">from</span> <span class="hljs-string">'../vuex/store.js'</span>
<span class="hljs-keyword">import</span> dialogsTab <span class="hljs-keyword">from</span> <span class="hljs-string">'../components/dialogs.vue'</span>
<span class="hljs-keyword">import</span> pagesTab <span class="hljs-keyword">from</span> <span class="hljs-string">'../components/pages.vue'</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-string">'indexP'</span>,
  data () {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">todos</span>: [
        { <span class="hljs-attr">text</span>: <span class="hljs-string">'Learn JavaScript'</span> },
        { <span class="hljs-attr">text</span>: <span class="hljs-string">'Learn Vue'</span> },
        { <span class="hljs-attr">text</span>: <span class="hljs-string">'Build something awesome'</span> }
      ],
      <span class="hljs-attr">dialogsTitle</span>:<span class="hljs-string">''</span>,

      <span class="hljs-attr">perPages</span>:<span class="hljs-number">7</span>,
      <span class="hljs-attr">pageSize</span> : <span class="hljs-number">20</span> , <span class="hljs-comment">//每页显示20条数据</span>
      currentPage : <span class="hljs-number">1</span>, <span class="hljs-comment">//当前页码</span>
      count : <span class="hljs-number">200</span>, <span class="hljs-comment">//总记录数</span>
      items : []
    }
  },
  <span class="hljs-attr">methods</span>:{
    eClick(){
      <span class="hljs-built_in">console</span>.log(<span class="hljs-number">9999</span>);
      store.commit(<span class="hljs-string">'inc'</span>);
    },
    areaClick(){
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'areaClick'</span>);
      store.commit(<span class="hljs-string">'dialogBoolTrue'</span>);
      <span class="hljs-built_in">console</span>.log(store.state.dialogBool);
    }
  },
  <span class="hljs-attr">computed</span>: {
    number(){
      <span class="hljs-keyword">return</span> store.state.count
    },
    dialogBool(){
      <span class="hljs-keyword">return</span> store.state.dialogBool;
    }
  },
  <span class="hljs-attr">components</span>:{
    dialogsTab,
    pagesTab
  }
};
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"scss"</span>&gt;</span><span class="css">
  <span class="hljs-selector-tag">h2</span>{
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#417ccc</span>;
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">15px</span> <span class="hljs-number">0</span> <span class="hljs-number">5px</span>;
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#fff</span>;
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
</span></code></pre>
<p><strong> Hello.vue文件放原本vue-cli的内容，注意原本是在components目录下，现在是剪切到views目录下</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="略；" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code style="word-break: break-word; white-space: initial;">略；</code></pre>
<p><strong>showui.vue </strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div>
      <div class=&quot;block&quot;>
        <span class=&quot;demonstration&quot;>hover 显示颜色</span>
        <span class=&quot;wrapper&quot;>
          <el-button :plain=&quot;true&quot; type=&quot;success&quot;>成功按钮</el-button>
          <el-button :plain=&quot;true&quot; type=&quot;warning&quot;>警告按钮</el-button>
          <el-button :plain=&quot;true&quot; type=&quot;danger&quot;>危险按钮</el-button>
          <el-button :plain=&quot;true&quot; type=&quot;info&quot;>信息按钮</el-button>
        </span>
      </div>
      <div class=&quot;block&quot;>
        <span class=&quot;demonstration&quot;>消息提示</span>
        <el-button :plain=&quot;true&quot; @click=&quot;open2&quot;>成功</el-button>
        <el-button :plain=&quot;true&quot; @click=&quot;open3&quot;>警告</el-button>
        <el-button :plain=&quot;true&quot; @click=&quot;open&quot;>消息</el-button>
        <el-button :plain=&quot;true&quot; @click=&quot;open4&quot;>错误</el-button>
      </div>
    </div>
</template>
<style lang=&quot;scss&quot; scoped>
.block{
  margin:10px 0;
}
</style>
<script>
  export default {
    methods: {
      open() {
        this.$message('这是一条消息提示');
      },
      open2() {
        this.$message({
          message: '恭喜你，这是一条成功消息',
          type: 'success'
        });
      },

      open3() {
        this.$message({
          message: '警告哦，这是一条警告消息',
          type: 'warning'
        });
      },

      open4() {
        this.$message.error('错了哦，这是一条错误消息');
      }
    }
  }
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"block"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"demonstration"</span>&gt;</span>hover 显示颜色<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"wrapper"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">el-button</span> <span class="hljs-attr">:plain</span>=<span class="hljs-string">"true"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"success"</span>&gt;</span>成功按钮<span class="hljs-tag">&lt;/<span class="hljs-name">el-button</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">el-button</span> <span class="hljs-attr">:plain</span>=<span class="hljs-string">"true"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"warning"</span>&gt;</span>警告按钮<span class="hljs-tag">&lt;/<span class="hljs-name">el-button</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">el-button</span> <span class="hljs-attr">:plain</span>=<span class="hljs-string">"true"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"danger"</span>&gt;</span>危险按钮<span class="hljs-tag">&lt;/<span class="hljs-name">el-button</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">el-button</span> <span class="hljs-attr">:plain</span>=<span class="hljs-string">"true"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"info"</span>&gt;</span>信息按钮<span class="hljs-tag">&lt;/<span class="hljs-name">el-button</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"block"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"demonstration"</span>&gt;</span>消息提示<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">el-button</span> <span class="hljs-attr">:plain</span>=<span class="hljs-string">"true"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"open2"</span>&gt;</span>成功<span class="hljs-tag">&lt;/<span class="hljs-name">el-button</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">el-button</span> <span class="hljs-attr">:plain</span>=<span class="hljs-string">"true"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"open3"</span>&gt;</span>警告<span class="hljs-tag">&lt;/<span class="hljs-name">el-button</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">el-button</span> <span class="hljs-attr">:plain</span>=<span class="hljs-string">"true"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"open"</span>&gt;</span>消息<span class="hljs-tag">&lt;/<span class="hljs-name">el-button</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">el-button</span> <span class="hljs-attr">:plain</span>=<span class="hljs-string">"true"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"open4"</span>&gt;</span>错误<span class="hljs-tag">&lt;/<span class="hljs-name">el-button</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"scss"</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="css">
<span class="hljs-selector-class">.block</span>{
  <span class="hljs-attribute">margin</span>:<span class="hljs-number">10px</span> <span class="hljs-number">0</span>;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">methods</span>: {
      open() {
        <span class="hljs-keyword">this</span>.$message(<span class="hljs-string">'这是一条消息提示'</span>);
      },
      open2() {
        <span class="hljs-keyword">this</span>.$message({
          <span class="hljs-attr">message</span>: <span class="hljs-string">'恭喜你，这是一条成功消息'</span>,
          <span class="hljs-attr">type</span>: <span class="hljs-string">'success'</span>
        });
      },

      open3() {
        <span class="hljs-keyword">this</span>.$message({
          <span class="hljs-attr">message</span>: <span class="hljs-string">'警告哦，这是一条警告消息'</span>,
          <span class="hljs-attr">type</span>: <span class="hljs-string">'warning'</span>
        });
      },

      open4() {
        <span class="hljs-keyword">this</span>.$message.error(<span class="hljs-string">'错了哦，这是一条错误消息'</span>);
      }
    }
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p><strong>store.js </strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//考虑如何更好地在组件外部管理状态(把组件的共享状态抽取出来,以一个全局单例模式管理呢)
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
//创建Store实例
const store = new Vuex.Store({
    // 创建一个对象来保存应用启动时的初始状态
    state: {
        count: 0,
        adminName:'系统管理员Admin系统管理员',
        dialogBool:false
    },
    mutations: {
        inc: state => state.count++,
        dec: state => state.count--,
        dialogBoolTrue(state){
          state.dialogBool=true;
        },
        dialogBoolFalse(state){
          state.dialogBool=false;
        }
    }
})
export {store}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>//考虑如何更好地在组件外部管理状态(把组件的共享状态抽取出来,以一个全局单例模式管理呢)
import Vue <span class="hljs-keyword">from</span> 'vue'
import Vuex <span class="hljs-keyword">from</span> 'vuex'

Vue.use(Vuex)
//创建Store实例
const store = new Vuex.Store({
    // 创建一个对象来保存应用启动时的初始状态
    <span class="hljs-keyword">state</span>: {
        count: <span class="hljs-number">0</span>,
        adminName:'系统管理员Admin系统管理员',
        dialogBool:false
    },
    mutations: {
        inc: <span class="hljs-keyword">state</span> =&gt; <span class="hljs-keyword">state</span>.count++,
        dec: <span class="hljs-keyword">state</span> =&gt; <span class="hljs-keyword">state</span>.count--,
        dialogBoolTrue(<span class="hljs-keyword">state</span>){
          <span class="hljs-keyword">state</span>.dialogBool=true;
        },
        dialogBoolFalse(<span class="hljs-keyword">state</span>){
          <span class="hljs-keyword">state</span>.dialogBool=false;
        }
    }
})
export {store}</code></pre>
<p><strong> App.vue</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div id=&quot;app&quot;>
    <header-tab></header-tab>
    <img src=&quot;./assets/logo.png&quot;>
    <menu-list></menu-list>
    <router-view class=&quot;article&quot;></router-view>
  </div>
</template>

<script>
import HeaderTab from './components/header.vue'
import menuList from './components/menus.vue'
export default {
  name: 'app',
  components:{
    HeaderTab,
    menuList
  }
}
</script>

<style lang=&quot;scss&quot; scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.article{
  margin-left:210px;
}
</style>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">header-tab</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">header-tab</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./assets/logo.png"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">menu-list</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">menu-list</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"article"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> HeaderTab <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/header.vue'</span>
<span class="hljs-keyword">import</span> menuList <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/menus.vue'</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-string">'app'</span>,
  <span class="hljs-attr">components</span>:{
    HeaderTab,
    menuList
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"scss"</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="css">
<span class="hljs-selector-id">#app</span> {
  <span class="hljs-attribute">font-family</span>: <span class="hljs-string">'Avenir'</span>, Helvetica, Arial, sans-serif;
  <span class="hljs-attribute">-webkit-font-smoothing</span>: antialiased;
  <span class="hljs-attribute">-moz-osx-font-smoothing</span>: grayscale;
  <span class="hljs-attribute">text-align</span>: center;
  <span class="hljs-attribute">color</span>: <span class="hljs-number">#2c3e50</span>;
  <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">60px</span>;
}
<span class="hljs-selector-class">.article</span>{
  <span class="hljs-attribute">margin-left</span>:<span class="hljs-number">210px</span>;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
</code></pre>
<p><strong> main.js</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

import './assets/scss/reset.scss'


import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code>// The Vue build version to <span class="hljs-keyword">load</span> <span class="hljs-keyword">with</span> the <span class="hljs-string">`import`</span> command
// (runtime-<span class="hljs-keyword">only</span> <span class="hljs-keyword">or</span> <span class="hljs-keyword">standalone</span>) has been <span class="hljs-keyword">set</span> <span class="hljs-keyword">in</span> webpack.base.conf <span class="hljs-keyword">with</span> an alias.
<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'./App'</span>
<span class="hljs-keyword">import</span> router <span class="hljs-keyword">from</span> <span class="hljs-string">'./router'</span>

Vue.config.productionTip = <span class="hljs-literal">false</span>

<span class="hljs-keyword">import</span> <span class="hljs-string">'./assets/scss/reset.scss'</span>


<span class="hljs-keyword">import</span> ElementUI <span class="hljs-keyword">from</span> <span class="hljs-string">'element-ui'</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">'element-ui/lib/theme-default/index.css'</span>
Vue.use(ElementUI)
<span class="hljs-comment">/* eslint-disable no-new */</span>
<span class="hljs-keyword">new</span> Vue({
  el: <span class="hljs-string">'#app'</span>,
  router,
  <span class="hljs-keyword">template</span>: <span class="hljs-string">'&lt;App/&gt;'</span>,
  components: { App }
})
</code></pre>
<p><strong>四、项目跑起来，深刻学习案例；</strong><br>1、<code>npm run dev</code> 在浏览器打开项目链接查看页面内容，实例学习案例；</p>
<p><span class="img-wrap"><img data-src="/img/bVP2yw?w=680&amp;h=521" src="https://static.alili.tech/img/bVP2yw?w=680&amp;h=521" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVP2zi?w=650&amp;h=732" src="https://static.alili.tech/img/bVP2zi?w=650&amp;h=732" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVP2zv?w=642&amp;h=508" src="https://static.alili.tech/img/bVP2zv?w=642&amp;h=508" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>2、<code>npm run bulid</code> 打包生成dist文件；</p>
<p><span class="img-wrap"><img data-src="/img/bVP1Vl?w=842&amp;h=195" src="https://static.alili.tech/img/bVP1Vl?w=842&amp;h=195" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><strong>五、部署服务端；</strong><br>1、直接在iis上部署打包生成的dist文件；</p>
<p><span class="img-wrap"><img data-src="/img/bVP1WB?w=773&amp;h=481" src="https://static.alili.tech/img/bVP1WB?w=773&amp;h=481" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVP15I?w=930&amp;h=647" src="https://static.alili.tech/img/bVP15I?w=930&amp;h=647" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><strong>六、遇到的问题；</strong></p>
<p>1、IE浏览器下报错：[vuex] vuex requires a Promise polyfill in this browser.</p>
<p><span class="img-wrap"><img data-src="/img/bVP2sG?w=565&amp;h=171" src="https://static.alili.tech/img/bVP2sG?w=565&amp;h=171" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><strong>解决：</strong><br>第一步： 安装 babel-polyfill 。 babel-polyfill可以模拟ES6使用的环境，可以使用ES6的所有新方法<br><code>npm install --save babel-polyfill</code><br>第二步： 在webpack.config.js文件中，使用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="entry: {
    app: [&quot;babel-polyfill&quot;, &quot;./src/main.js&quot;]
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">entry</span>: {
    <span class="hljs-attribute">app</span>: [<span class="hljs-string">"babel-polyfill"</span>, <span class="hljs-string">"./src/main.js"</span>]
  }</code></pre>
<p>替换：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="entry: {
    app:  './src/main.js'
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">entry</span>: {
    <span class="hljs-attribute">app</span>:  <span class="hljs-string">'./src/main.js'</span>
  }</code></pre>
<p>七、代码链接：<br><a href="https://github.com/MVPVP/ypt201" rel="nofollow noreferrer" target="_blank">https://github.com/MVPVP/ypt201</a><br>使用步骤：<br>下载代码=》安装依赖 <code>npm install</code> =》运行程序 <code>npm run dev</code> =》浏览器中打开 <a href="http://localhost:8080" rel="nofollow noreferrer" target="_blank">http://localhost:8080</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue-cli+vuex+scss+element-ui+axios+webpack搭建超简洁完整项目+IIS部署（入门全家桶）

## 原文链接
[https://segmentfault.com/a/1190000009978596](https://segmentfault.com/a/1190000009978596)

