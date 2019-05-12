---
title: 'Vue 不能检测到对象属性的添加或删除，注意！！！' 
date: 2018-12-01 2:30:12
hidden: true
slug: nser2jn772l
categories: [reprint]
---

{{< raw >}}

                    
<h2>Vue 不能检测到对象属性的添加或删除</h2>
<ul><li>划重点了：<code>Vue 不能检测到对象属性的添加或删除</code>
</li></ul>
<p>官网——深入响应式原理（<a href="https://cn.vuejs.org/v2/guide/reactivity.html#" rel="nofollow noreferrer">https://cn.vuejs.org/v2/guide...</a>）中介绍到：受现代 JavaScript 的限制 (以及废弃 Object.observe)，Vue 不能检测到对象属性的添加或删除。由于 Vue 会在初始化实例时对属性执行 getter/setter 转化过程，所以属性必须在 data 对象上存在才能让 Vue 转换它，这样才能让它是响应的。</p>
<p><span class="img-wrap"><img data-src="/img/bVbam0Z?w=556&amp;h=478" src="https://static.alili.tech/img/bVbam0Z?w=556&amp;h=478" alt="图片描述" title="图片描述"></span></p>
<blockquote>上面的a是响应式的，所以a的改变后会自动渲染页面；<br>但是b是在vm实例创建之后添加的属性，所以他不是响应式的，当我们改变b的值的时候，通过DevTool看到的数据并不会改变，除非我们在DevTool中刷新数据，而且页面也不会刷新。</blockquote>
<h4>有三种解决方案：</h4>
<pre><code>var vm = new Vue{
    el: "#app",
    data:{
        obj:{
            name: "aaa"            
        }
    }
}</code></pre>
<p><strong>1、方案一：利用Vue.set(object,key,value)</strong></p>
<pre><code>
Vue.set(vm.obj,"sex","man")
</code></pre>
<p><strong>2、方案二：利用this.$set(this.object,key,value)</strong></p>
<pre><code>this.$set(this.obj,"sex","man")
</code></pre>
<p><strong>3、方案三：利用Object.assign({},this.obj)</strong></p>
<pre><code>this.obj.sex = "man";
this.obj = Object.assign({},this.obj)

//或者下面方式
</code></pre>
<p>this.obj = Object.assign({},this.obj,{"sex","man"})</p>
<p><strong>DEMO实例：</strong></p>
<pre><code>
&lt;template&gt;
  &lt;div class="parent"&gt;
    &lt;h1 v-show="mainData.test.boolen"&gt;"{{"msg"}}"&lt;/h1&gt;
    &lt;button @click="getData"&gt;数据&lt;/button&gt;
    &lt;select name="" id="" @change="selectChange"&gt;
      &lt;option value="001"&gt;上海&lt;/option&gt;
      &lt;option value="002"&gt;北京&lt;/option&gt;
      &lt;option value="003"&gt;天津&lt;/option&gt;
    &lt;/select&gt;
    &lt;ul&gt;
      &lt;li v-for="(item,index) in list" :key="index" v-show="index &lt; 10"&gt;
        &lt;span class="red"&gt;"{{"item.id"}}"&lt;/span&gt;
        &lt;strong class="blue"&gt;"{{"item.title"}}"&lt;/strong&gt;
      &lt;/li&gt;
    &lt;/ul&gt;
  &lt;/div&gt;
&lt;/template&gt;
&lt;script&gt;
export default {
  name: "Parent",
  data() {
    return {
      count: 10,
      size: 1024,
      mainData: {
        test: {
          aa: 12
        }
      },
      msg: "这是测试信息",
      list: []
    };
  },
  methods: {
    getData: function() {
      var self = this;
      this.$axios.get("http://jsonplaceholder.typicode.com/posts").then(rsp =&gt; {
        self.list = rsp.data;
        self.$set(self.mainData.test, "boolen", false);
      });
    },
    selectChange: function() {
      var self = this;
      self.$set(self.mainData.test, "boolen", true);
    }
  }
};
&lt;/script&gt;
&lt;style scoped&gt;
ul li {
  border: 1px solid #ddd;
  margin-bottom: 10px;
  text-align: left;
}
.red {
  color: red;
}
.blue {
  color: blue;
}
&lt;/style&gt;
</code></pre>
<p>实现的效果如下：（使用的方案二方法）</p>
<p>（1）、下拉框选项改变的时候，会显示“这是测试信息“文字<br><span class="img-wrap"><img data-src="/img/bVbarPD?w=572&amp;h=338" src="https://static.alili.tech/img/bVbarPD?w=572&amp;h=338" alt="图片描述" title="图片描述"></span></p>
<p>（2）、点击”数据“按钮，获取数据，“这是测试信息“文字会隐藏<br><span class="img-wrap"><img data-src="/img/bVbarQc?w=1154&amp;h=498" src="https://static.alili.tech/img/bVbarQc?w=1154&amp;h=498" alt="图片描述" title="图片描述"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue 不能检测到对象属性的添加或删除，注意！！！

## 原文链接
[https://segmentfault.com/a/1190000014826146](https://segmentfault.com/a/1190000014826146)

