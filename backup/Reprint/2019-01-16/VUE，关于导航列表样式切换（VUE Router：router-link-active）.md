---
title: 'VUE，关于导航列表样式切换（VUE Router：router-link-active）' 
date: 2019-01-16 2:30:08
hidden: true
slug: o5exkq7hnkj
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/bVMeHR?w=486&amp;h=340" src="https://static.alili.tech/img/bVMeHR?w=486&amp;h=340" alt="导航样式图" title="导航样式图" style="cursor: pointer; display: inline;"></span><br>当我们新建一个网站时，总是要做一个导航列表，在传统的WEB开发中这已经是一种很成熟的技术，自己学VUE，看了官方文档，加上自己摸索，也学到不少，现在拿来分享一下。在自己VUE入门学习的笔记中也有提及<br>第一种：JQUERY中我们通常采用:<br>   $("li[class='active']").removeClass("active"); //将当前选中的项目解除被选中的样式；<br>   $(selector).addClass('active');//为选中的条目添加被选中的样式；<br>非常简便，需要npm install jquery，并在baseConfig中配置。但学VUE，还是用其本身的Class 与 Style 绑定最好。<br>第二种：VUE中没有选择器，但对于CSS属性支持状态关联操作（Class 与 Style 绑定）：<br>eg：v-bind:class="{ active: isActive }"<br>解读：当isActive值为真时，active样式有效，Dom渲染结果是：class=“active”<br>当为false时，active样式无效，Dom渲染结果是：class=“”<br>因此我们可以利用这个属性做文章<br>标签HTML：&lt;li v-for:"tagName of tagNames" v-bind:class={active:activeName==tagName} v-on:click="selected(tagName)"&gt;<br>这条语句我们生成了一个列表，并为其绑定了一个选中事件，为class动态绑定了一个判断事件<br>同样我们在选择这个事件中：<br>function selected(seclctedName){<br>this.activeName= seclctedName;<br>}<br>数据属性：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="data(){
    return{
        tagNames:[
            {name:'hello',tabLink:'/Hello'},
            {name:'Login',tabLink:'/Login'},
            {name:'MyBlog',tabLink:'/MyBlog'}
        ],
        activeName:'hello' //当activeName初始值为空时，浏览器加载时默认没有选择的列表项，当为hello时，hello列表默认被选中
    }
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">data</span>(){
    <span class="hljs-selector-tag">return</span>{
        <span class="hljs-attribute">tagNames</span>:[
            {<span class="hljs-attribute">name</span>:<span class="hljs-string">'hello'</span>,<span class="hljs-attribute">tabLink</span>:<span class="hljs-string">'/Hello'</span>},
            {<span class="hljs-attribute">name</span>:<span class="hljs-string">'Login'</span>,<span class="hljs-attribute">tabLink</span>:<span class="hljs-string">'/Login'</span>},
            {<span class="hljs-attribute">name</span>:<span class="hljs-string">'MyBlog'</span>,<span class="hljs-attribute">tabLink</span>:<span class="hljs-string">'/MyBlog'</span>}
        ],
        <span class="hljs-attribute">activeName</span>:<span class="hljs-string">'hello'</span> <span class="hljs-comment">//当activeName初始值为空时，浏览器加载时默认没有选择的列表项，当为hello时，hello列表默认被选中</span>
    }
},</code></pre>
<p>初看运行起来还可以，切换也正常，但当我们停留在非HELLO页面时，刷新页面，hello被选中了，而刷新前的选中样式被解除了，这是因为我们为activeName:'hello' 赋了初值。所以有BUG。<br>第三种：思路同二，但activeName,我新建导航样式列表组件时，我为其定义了一个TITLE属性<br> props: {</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  title: {
      type: String,
       default: 'any'
        }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>  <span class="hljs-selector-tag">title</span>: {
      <span class="hljs-attribute">type</span>: String,
       default: <span class="hljs-string">'any'</span>
        }
  }</code></pre>
<p>并在列表中使用:class="{active:title== tabbarName.name}来绑定active CSS，<br>当其他页面调用这个组件时，指定TITLE，比如： 、<br>  &lt;v-header title="MyBlog"&gt;<br>  &lt;/v-header&gt;   <br>这是当切换到MyBlog时，他就会被选中，随便刷新，都没有方法二的情况出现。</p>
<p>第四种：也是最官方，最简单的。自己当时看VUEROUTER，因为看着面熟，看的比较快，所以错过了这个知识点，开始页的最下面有这样一句话：当 &lt;router-link&gt; 对应的路由匹配成功，将自动设置 class 属性值 .router-link-active，所以你只需要在自己的STYLE文件中，写了.router-link-active的样式，列表选中后，系统就会自动去绑定这个样式。<strong><em><em>此处应该有很多个锤头掩面的表情</em></em></strong>*。</p>
<p>然后</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
VUE，关于导航列表样式切换（VUE Router：router-link-active）

## 原文链接
[https://segmentfault.com/a/1190000009074146](https://segmentfault.com/a/1190000009074146)

