---
title: 'Vue2学习之旅二：添加路由vue-router' 
date: 2018-12-03 2:30:08
hidden: true
slug: aj98leg0jqe
categories: [reprint]
---

{{< raw >}}

                    
<p>作者：心叶<br>时间：2018-04-26 09:26</p>
<p>本篇最终项目文件Github地址：github.com/yelloxing/vue.quick/tree/V2</p>
<p><a href="https://segmentfault.com/u/yelloxing/articles">Vue2学习之旅系列文章目录</a></p>
<p>前一篇我们已经搭建了一个看起来有点不高大上的架子，为了后续学习的方便，这里想先提前把路由说一下，以后一个知识点一个页面，路由切换，是不是很舒服。</p>
<p>首先，我们还是来看看这次我们的项目目录结构变成什么样子了，如下图：</p>
<p><span class="img-wrap"><img data-src="/img/bV9qzo?w=300&amp;h=375" src="https://static.alili.tech/img/bV9qzo?w=300&amp;h=375" alt="图片描述" title="图片描述"></span></p>
<h2>准备工作</h2>
<p>这次我们新添加的文件只有PageOne.vue和PageTwo.vue，以及router/index.js。</p>
<p>router/index.js先无视，先让我们看看前面二个存在的意义。</p>
<p>PageOne.vue和PageTwo.vue是什么，前面一篇文章<a href="https://segmentfault.com/a/1190000014590324">Vue2学习之旅一：初始化项目搭建</a>已经说清楚了，在这里你可以就先简单的认为就是渲染和控制页面中一小块区域（当然也可以是整个页面）的东西，本篇路由跳转就是通过指定一小块区域，通过修改路由来确定是PageOne.vue还是PageTwo.vue来管理这块区域。让我们简单看看他们二个里面的内容。</p>
<p>PageOne.vue里面的内容：</p>
<pre><code>&lt;template&gt;
    &lt;span&gt;
        这是页面一
    &lt;/span&gt;
&lt;/template&gt;
</code></pre>
<p>PageTwo.vue里面的内容：</p>
<pre><code>&lt;template&gt;
    &lt;span&gt;
        这是页面二
    &lt;/span&gt;
&lt;/template&gt;
</code></pre>
<p>这样，我们就准备好了二个页面。</p>
<p>了解路由的人应该都知道，路由就好比一种状态的切换，比如你点击了一个按钮，如果你没有注册按钮的点击事件，你的点击不会触发你想要的事情的发生。</p>
<p>因此，路由跳转之后，如果我们想要页面中指定的一块区域切换用PageOne.vue和PageTwo.vue来管理，就需要配置好路由状态改变的对应事件，这就是我们接下来的事情。</p>
<h2>安装Vue路由</h2>
<p>Vue路由是一个独立的模块，因此，和我们用到vue时一样，我们需要安装他，你应该在package.json中添加下面内容（其实就是在之前安装的vue下面添加那一行vue-router就好了）：</p>
<pre><code>"dependencies": {
    "vue": "^2.2.6",
    "vue-router": "^3.0.1"
}
</code></pre>
<p>然后，别忘了在命令行执行：</p>
<pre><code>npm install
</code></pre>
<p>此时，你就安装好了我们的vue-router</p>
<h2>配置Vue路由</h2>
<p>路由安装好了之后，具体路由跳转到某个状态的时候，页面中的那一小块此刻应该由PageOne.vue和PageTwo.vue之中的谁来管理，这需要提前配置好，不然路由可不知道你想干什么，因此，我们需要编辑开始被无视的router/index.js文件，路由就是在这里配置的。</p>
<p>先让我们来看看最终里面的内容：</p>
<pre><code>import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

//路由跳转的组件，要提前注入
import PageOne from '../components/PageOne.vue';//【地方一】
import PageTwo from '../components/PageTwo.vue';

//路由配置
const router = new VueRouter({
    routes: [{
        path: '/',//【地方二】
        redirect: 'PageOneLink'
    },
    {
        path: '/PageOneLink',//【地方三】
        component: PageOne
    },
    {
        path: '/PageTwoLink',//【地方四】
        component: PageTwo
    }
    ]
});

export default router;
</code></pre>
<p>具体的细节你可以以后学会了慢慢体会，此时，我先告诉你几个你应该知道是重点：</p>
<p>1.开始我们引入了vue-router，因为配置路由只有他自己知道怎么配置，因此引入是必须的；</p>
<p>2.在【地方一】处，我们引入了之前一直耿耿于怀的二个组件，由于后续要指定跳转谁，此处先引入；</p>
<p>3.前面的都是准备工作，后面的就是真的配置了，先看【地方三】，我们配置了如果路由状态是PageOneLink的话那块区域由PageOne.vue管理，【地方四】就不言而喻了；</p>
<p>4.最后还有【地方二】，由于刚刚打开一个页面的时候，路由应该是什么状态都不是，这里就是配置此时自动跳转到状态PageOneLink。</p>
<p>OK?到这里结束都不难理解吧！想一想，是不是只差最后一步了：使用这个配置好的路由，来让他帮助我们控制页面中每一块。</p>
<h2>使用路由</h2>
<p>首先，谁使用路由？当然需要他的Vue对象了，我们这里就是根对象（也就是entry.js里面新建的那个），因此，先看看修改后的entry.js:</p>
<pre><code>import Vue from 'vue';
import App from './App.vue';

// 1.引入刚刚配置的路由（router/index.js）
import router from './router';

//根对象
var vm = new Vue({
    //挂载点
    el: '#root',
    //2.使用刚刚的路由配置
    router: router,
    //启动组件
    render: function (callback) {
        return callback(App);
    }
});
</code></pre>
<p>仔细对比之前的文件，是不是就多了二行代码（我方便备注1.和2.的地方），应该不用多说了吧！</p>
<p>此时，已经使用了，可是，别忘了，还有一件事情，路由跳转之后，应该控制页面里面的哪一块区域？这也需要指定好。</p>
<p>由于我们的是给根Vue对象使用，可以在他使用的组件App.vue里面配置，还是先开卡App.vue此刻被改成什么了再说说具体内容：</p>
<pre><code>&lt;template&gt;
    &lt;section&gt;
      &lt;header&gt;
        "{{"msg"}}"
      &lt;/header&gt;
      &lt;ul&gt;
      &lt;!--路由导航【地方一】--&gt;
        &lt;li&gt;
          &lt;router-link to="/PageOneLink"&gt;页面一&lt;/router-link&gt;
        &lt;/li&gt;
        &lt;li&gt;
          &lt;router-link to="/PageTwoLink"&gt;页面二&lt;/router-link&gt;
        &lt;/li&gt;
    &lt;/ul&gt;
    &lt;!--路由跳转视图【地方二】--&gt;
    &lt;router-view&gt;&lt;/router-view&gt;
    &lt;/section&gt;
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
</code></pre>
<p>可以对比一下，主要就是修改了template里面的内容，添加的地方有二处：</p>
<p>1.先看【地方二】，这个是必须的，也就是知道控制页面里的哪一块区域，没错，就是这里占位的地方；</p>
<p>2.接着是【地方一】，地方一简单的理解就是页面的二个按钮，你点击其中每一个，就会跳转到对应的状态，和前面的路由配置对应。</p>
<p>现在，启动项目，页面访问的时候应该就可以看见下面的效果：<br><span class="img-wrap"><img data-src="/img/bV9qWl?w=360&amp;h=253" src="https://static.alili.tech/img/bV9qWl?w=360&amp;h=253" alt="点击页面一按钮的时候" title="点击页面一按钮的时候"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV9qWQ?w=355&amp;h=236" src="https://static.alili.tech/img/bV9qWQ?w=355&amp;h=236" alt="点击页面二按钮的时候" title="点击页面二按钮的时候"></span></p>
<p>这样，路由就简单的完成了。</p>
<h2>页面美化（可以无视此段）</h2>
<p>为了以后添加新的练习页面的时候，比较好看，建议你可以在App.vue里面的style标签中添加下面的样式：</p>
<pre><code>html {
  font-size: 100px;
}
body {
  margin: 0;
}
header {
  font-size: 0;
}
ul {
  background-color: black;
  font-size: 0;
  line-height: 0.4rem;
  padding: 0 0.3rem 0 0.3rem;
}
ul &gt; li:not(:last-child) {
  margin-right: 0.1rem;
}
ul &gt; li {
  font-size: 0.16rem;
  display: inline-block;
}
ul &gt; li &gt; a:hover {
  color: rgb(240, 227, 227);
}
ul &gt; li &gt; a.router-link-active {
  color: #fff;
  outline: none;
}
ul &gt; li &gt; a {
  color: #60818e;
  text-decoration: none;
}
</code></pre>
<p>此时页面的截图：</p>
<p><span class="img-wrap"><img data-src="/img/bV9q1n?w=1160&amp;h=416" src="https://static.alili.tech/img/bV9q1n?w=1160&amp;h=416" alt="图片描述" title="图片描述"></span></p>
<h2>总结</h2>
<p>路由的基本用法就这些了，后续对于高级用法如果有添加会新写一篇文章，本系列就是循序渐进的系列，希望路由你理解了，祝你好运！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue2学习之旅二：添加路由vue-router

## 原文链接
[https://segmentfault.com/a/1190000014602883](https://segmentfault.com/a/1190000014602883)

