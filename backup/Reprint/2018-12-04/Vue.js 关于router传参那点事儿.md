---
title: 'Vue.js 关于router传参那点事儿' 
date: 2018-12-04 2:30:05
hidden: true
slug: yfnek81dnst
categories: [reprint]
---

{{< raw >}}

                    
<h3>Vue-router参数传递</h3>
<ol>
<li>为什么要在router中传递参数<br>设想一个场景，当前在主页中，你需要点击某一项查看该项的详细信息。那么此时就需要在主页传递该项的id到详情页，详情页通过id获取到详细信息。</li>
<li>
<p>vue-router 参数传递的方式</p>
<ul>
<li>
<p>Parma传参<br>贴代码：<br><em>/router/index.vue</em></p>
<pre><code>export default new Router({
 routes: [
   {
     path: '/',
     name: 'Home',
     component: Home
   },
   {
     path: '/work',
     name: 'Work',
     component: Work
   }
 ]
   })</code></pre>
<p>组件<strong>Works</strong>传递一个work的id到组件<strong>Work</strong><br><em>/components/Home/Comtent/Works.vue</em></p>
<pre><code>// 触发它传递一个对象到组件Work
getIt (id) {
 this.$router.push({
   path: '/work',
   name: 'Work',
   params: {
     id: id
   }
 })
   }</code></pre>
<p><em>/components/Work/Index.vue</em></p>
<pre><code>&lt;template&gt;
    &lt;div class="work"&gt;
      work: "{{"id"}}"
    &lt;/div&gt;
  &lt;/template&gt;
  
  &lt;script&gt;
  export default {
    name: 'Work',
    data () {
      return {
        id: this.$route.params.id //拿到id
      }
    }
  }
  &lt;/script&gt;</code></pre>
<p>运行截图:<br><span class="img-wrap"><img data-src="/img/bV83J8?w=1275&amp;h=721" src="https://static.alili.tech/img/bV83J8?w=1275&amp;h=721" alt="Works.png" title="Works.png"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV83KI?w=450&amp;h=308" src="https://static.alili.tech/img/bV83KI?w=450&amp;h=308" alt="Work.png" title="Work.png"></span></p>
</li>
<li>
<p>query传参<br>   将上面的parmas改为query即可，即：</p>
<pre><code> // 传入
 this.$router.push({
path: '/work',
name: 'Work',
query: {
  id: id
}
 })
 
 ... ...
 
 this.$route.query.id // 获取</code></pre>
</li>
</ul>
</li>
<li>
<p>parmas与query的区别</p>
<ul>
<li>query是通过url传递参数，始终显示在url中</li>
<li>parmas传参，刷新页面过后就没有数据了，无法将获取到的参数进行保存</li>
</ul>
</li>
</ol>
<p><em>总结： 这两种参数的传递方式，各有各的用途，具体的还要自己亲手试一试才知道，前端这个领域，还是要多多亲自动手实践。</em></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue.js 关于router传参那点事儿

## 原文链接
[https://segmentfault.com/a/1190000014513462](https://segmentfault.com/a/1190000014513462)

