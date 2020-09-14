---
title: 'vue 学习小结 送给新手' 
date: 2019-02-04 2:30:58
hidden: true
slug: idsilieu7m8
categories: [reprint]
---

{{< raw >}}

                    
<p>Vue 是现在最火的前端JavaScript 开发框架。<br>首先，接受它的思想 <br>View 模板即html，静态界面<br>Model 数据源 模型 界面所有的数据负责提供及管理<br>Vue 负责将view 及 Model结合起来。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>
    "{{"message"}}"
</div>
<script type=&quot;text/javascript&quot;>
    var exampleData = {
        message:'Hello World!'
    }
//exampleData 数据模型 数据和模板组成
    new Vue({
        el:'#app',
        data:exampleData
    })
</script>

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    </span><span class="hljs-template-variable">"{{"message"}}"</span><span class="xml">
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="actionscript">
    <span class="hljs-keyword">var</span> exampleData = {
        message:<span class="hljs-string">'Hello World!'</span>
    }
<span class="hljs-comment">//exampleData 数据模型 数据和模板组成</span>
    <span class="hljs-keyword">new</span> Vue({
        el:<span class="hljs-string">'#app'</span>,
        data:exampleData
    })
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

</span></code></pre>
<p>id为app的一段html 即模板，里面有一个"{{"message"}}"表达式等待被填充  "{{""}}" 两个大括号即Vue 表达式</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var exampleData = {
        message:'Hello World!'
    }
    
    exampleData模型 提供了view 需要的数据message 
    vue 做什么呢？ 告知双方，View 的Model 在哪里，
    Model 为哪个view服务
    
 new Vue({
        el:'#app',
        data:exampleData
    })
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>var exampleData = {
        message:<span class="hljs-string">'Hello World!'</span>
    }
    
    exampleData模型 提供了<span class="hljs-keyword">view</span> 需要的数据message 
    vue 做什么呢？ 告知双方，View 的Model 在哪里，
    Model 为哪个<span class="hljs-keyword">view</span>服务
    
 <span class="hljs-keyword">new</span> Vue({
        <span class="hljs-keyword">e</span><span class="hljs-variable">l:</span><span class="hljs-string">'#app'</span>,
        dat<span class="hljs-variable">a:exampleData</span>
    })
</code></pre>
<p>实例化一个Vue  配置参数  el指向html 元素<br>data参数指向数据</p>
<p>**MVVM<br>Model View ViewMode(vue,el,data)**</p>
<p>数据绑定是vue 最核心 也是最酷的一个能力。<br>我们可以将html 与数据绑定起来。 只要数据发生改变，html(view)立即更新，html由form表单等带来的数据改变，数据相应字段也会发生相应改变。即V-model<br>一 viewmodel关联<br>el:'#app',data:{message:'hello world!'}<br>div#app"{{"message"}}"表达式就会显示数据模型model里的message的值 Hello world!</p>
<p>二 数据绑定<br>v-model将input 和 message绑在了一起，任何一方的改变都会影响彼此<br>比如：刚开始，message的值为hello world input value显示为hello world! 数据绑定了 input显示message的值<br>接着 input用户输入，value 发生了改变，通知数据message更新他的值，双向互通。</p>
<p>三 界面的更新<br>input的输入，导致message的值更新，#app元素内，任何表达式与message有关的，都将重新计算，斌企鹅自动更新界面。<br>所以，&lt;p&gt;"{{"message"}}"&lt;/p&gt;会显示出实时与input输入的值一样。</p>
<p>指令 绑定在html元素上，类似于属性的特殊命令，用于增强html的能力<br>v-if 表达式，true 则输出 false 不输出，页面上不会输出其html<br>v-model 双向数据绑定指令 主要用于form 表单，input 输入值会传给数据更新，数据更新会直接在界面数据上反映。</p>
<p>v-show 与v-if 一样 接受一个boolean 值得表达式，但不一样的地方<br>不管真心急啊都会在页面上输出，只是style display:none 而已。</p>
<p>MVVM核心做的是数据驱动的界面，如果数据是数组怎么办？<br>v-for 负责循环输出数据到模板上，item in items<br>循环的数组是 items 当前的对象是item<br>在循环中item对象的所有属性都可以使用item.property调用。<br>items 来自于vue 实例的data数据源<br>v-on指定  事件监听指令<br>v-on:event_type="function_name"<br>在vue 实例里有一个methods API 专门用于提供各种方法，<br>供html调用</p>
<p>v-for=“（index,n） in 4”<br>循环指令，执行 4次<br>index 当前的下标，n为当前的数字</p>
<p>v-bind:class="{on:(tab==index)}"<br>简写:class<br>属性绑定指令，动态属性输出<br>比如.activ,.on</p>
<p>on:(tab == index)<br>on是要输出的类名，是常量，：右边是表达式，如果为真<br>则输出左边的类，<br>数据驱动的属性绑定 改变tab的值就可以，让第几个tab有on 这个类</p>
<p>v-on:mouseover = "setCurrent()"<br>添加DOM 事件监听</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="methods:{
        setCurrent:function(index) {
        this.tab = index;
    }
}


" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">methods</span>:{
        <span class="hljs-attribute">setCurrent</span>:<span class="hljs-built_in">function</span>(index) {
        this.tab = index;
    }
}


</code></pre>
<p>component 组件<br>组件化思维是mvvm 最重要的思想，可以让网页像搭积木一样的来开发。<br>react 作为组件化思维的先驱 facebook 当年统计的组件多达5w多个。<br>优点是：<br>1 复用 组件化开发的过程就是一个选取组件拼装的过程<br>2 易维护 一个组件过时了或者有新的需求直接下架（可拔插）<br>3 协作 一个开发者负责自己的一些组件<br>组件化开发适合大型应用</p>
<p>组件语法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" <body>
     
        <my-component></my-component>
     
    //定义一个组件名为my component
    Vue.component('my-component',{
        //template 属性 组件的html
        template:'<div>A custom component!</div>'
    })
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code> &lt;body&gt;
     
        &lt;my-component&gt;&lt;/my-component&gt;
     
    <span class="hljs-comment">//定义一个组件名为my component</span>
    Vue.component(<span class="hljs-string">'my-component'</span>,{
        <span class="hljs-comment">//template 属性 组件的html</span>
        <span class="hljs-keyword">template</span>:<span class="hljs-string">'&lt;div&gt;A custom component!&lt;/div&gt;'</span>
    })
</code></pre>
<p>定义在vue实例化之前</p>
<p>Vue.component('组件名称'，option)<br>template 属性是基本属性，用于设置组建的模板，即view<br>data,methods 等等，其实它跟Vue实例一样，具有那些复杂的功能</p>
<p>表现<br>组件的名字 可以像自定义的html元素一样，插入html文档，扩展html的功能<br>本质上组件就是一堆html代码的集合，除了html之外，还有数据集交互逻辑，让这个组件变得功能强大.<br>原本的html太简单 功能太贫瘠。</p>
<p>优点：使用的直观性</p>
<p>组件时属于实例的 也可能是属于其他组件的。<br>父组件，子组件。。。  组件之间有关系<br>组件最后通过自定义html的形式挂到vue实例上去 或父组件上去</p>
<p>components 属性 子组件的集合，<br>语法是一个json对象</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var vm = new Vue({
  el:'#app',
  data:{
  },
  components:{
      'my-component':Child
  }
})

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>var <span class="hljs-keyword">vm</span> = <span class="hljs-keyword">new</span> Vue({
  <span class="hljs-keyword">e</span><span class="hljs-variable">l:</span><span class="hljs-string">'#app'</span>,
  dat<span class="hljs-variable">a:</span>{
  },
  component<span class="hljs-variable">s:</span>{
      <span class="hljs-string">'my-component'</span>:Child
  }
})

</code></pre>
<p>my-component 是我们给组件取的别名，html内插入的就是这个名字<br>Child是我们的组件。</p>
<p>组件内数据的声明 与vue 实例数据的声明有些不同，必须为函数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="data:function(){
        return{
        message:'hello'
    }
}

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>data:<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
        <span class="hljs-keyword">return</span>{
        message:<span class="hljs-string">'hello'</span>
    }
}

</code></pre>
<p>return 返回一个json 对象</p>
<p>filter 过滤去<br>在开发中 经常有这样的需求 数据库中存放的是原始数据，离我们显示的需求，还差那么一点点。<br>或者是数据需要整个容，换个形式，filter负责<br>数据在  |  管道 后将由一个函数来化妆</p>
<p>组件或者实例中 有一个属性filters 里面放置filter函数在vue2.0以前 默认提供一些常用的过滤器，比如capitalize  sortBy<br>Vue 2.0以后需要自行定义。<br>可以自行定义，数据最后显示的方式。</p>
<p>声明周期函数<br>组件有他的声明周期，即创建前后，销毁前后<br>在配置选项中有一些预定义的生命周期函数钩子，就在相应的周期那一刻会触发。<br>比如经常会在组件加载完成后,发起数据请求ajax<br>放在created 方法中<br>在组件销毁前解绑数据源。</p>
<p>v-html 指令用途：用于将数据显示为html而不是字符串</p>
<p>Ajax <br>异步无刷新 网页技术，通常用于浏览器JavaScript 主动向<br>后端请求数据  并实时更新界面的操作中</p>
<p>Ajax 工程师 RIA富互联网应用开发工程师</p>
<p>传统请求 同步<br>HTTP 请求的过程<br>网友在浏览地址里输入url请求后，解析DNS IP地址找到网页所在的服务器。<br>通知服务器，需要这个页面的html<br>服务器收到请求指令后，去数据库里取出数据，动态渲染html模板，最后通过与网友的连接<br>,将网页字符串发送给浏览器，我们就看到网页了</p>
<p>Ajax 异步请求<br>与同步请求不同，Ajax 是在网页已经渲染，跟服务器断开连接后，客户端JavaScript 通过用户点击事件（换一批）鼠标滚动（下一页）主动向服务器端请求数据<br>而且并不是一直等待结果再执行，而是在服务器端接到指令后，完成运算由服务器端异步的调用callback来继续 执行页面逻辑{动态DOM操作}<br>服务器成功执行，调用callback,<br>失败，调用error  不会刷新页面的就是ajax</p>
<p>一 浏览器原生的异步请求对象  XMLHttpRequest<br>XML 数据的格式 现在主要是JSON<br>HttpRequest  javascript 发出http请求的能力<br>流程</p>
<p>1 打开请求，这是并没有真正发送请求 而是去做了http握手<br>xhr.open('GET',URL);<br>URL 是服务器端提供给你取数据的地址，是预定好的。<br>服务端只需要根据前端的需求，准备好数据，并在预定的地址（URL）,<br>以JSON的格式返回给用户即可</p>
<p>2 定义回调</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="xhr.onload = function() {
        xhr.responseText;
}

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>xhr.onload = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
        xhr.responseText;
}

</code></pre>
<p>xhr 请求后服务器端返回的数据，会异步赛道xhr.responseText属性里面。<br>JSON.parse()将返回数据变成json 对象<br>xhr.send()真正发送请求</p>
<p>xhr的优点在于，带来了web2.0革命，传统了的请求，页面是静态的，死板的<br>而xhr时代的页面是动态的，富交互的，</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$.getJSON(url,params,function(data){
        
});
$.post(url,params,function(data){
        
});

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>$.getJSON(url,params,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>)</span>{
        
});
$.post(url,params,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>)</span>{
        
});

</code></pre>
<p>平时我们不会去直接用XMLHttpRequest</p>
<p>input radio 切换后，ajax 的数据操作由watch 方法来负责</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="watch:{
        propertypeName:'函数名'
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">watch</span>:{
        <span class="hljs-attribute">propertypeName</span>:<span class="hljs-string">'函数名'</span>
}</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue 学习小结 送给新手

## 原文链接
[https://segmentfault.com/a/1190000006794704](https://segmentfault.com/a/1190000006794704)

