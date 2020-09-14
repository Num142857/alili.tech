---
title: 'Vue2.0四——组件传参' 
date: 2018-12-23 2:30:07
hidden: true
slug: 1ud2on94v6t
categories: [reprint]
---

{{< raw >}}

                    
<h4>路由配好了 再传个参呗</h4>
<p>注：组件信息流转的时候只能单向<br> 1 &gt; 父子传参<br>   传参：通过属性<br>   prop：传递数据</p>
<p>a.父组件传参给子组件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 子组件：
    <ul>
        <li v-for=&quot;item in dataList&quot;></li>
    </ul>
    
    export default {
        prop: {              //prop接收传过来的参数
            dataList: {
                type:Array,
                required:true    //校验
            }
        },
        data() {
            return {
                dataList: this.dataList
            }
        }
    }
  父组件
    <Position :data-list='List'></Position>  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code> 子组件：
    <span class="hljs-params">&lt;ul&gt;</span>
        <span class="hljs-params">&lt;li v-for="item in dataList"&gt;</span><span class="hljs-params">&lt;/li&gt;</span>
    <span class="hljs-params">&lt;/ul&gt;</span>
    
    export <span class="hljs-class">default </span>{
<span class="hljs-symbol">        prop:</span> {              <span class="hljs-comment">//prop接收传过来的参数</span>
<span class="hljs-symbol">            dataList:</span> {
<span class="hljs-symbol">                type:</span>Array,
<span class="hljs-symbol">                required:</span>true    <span class="hljs-comment">//校验</span>
            }
        },
        data() {
            <span class="hljs-class">return </span>{
<span class="hljs-symbol">                dataList:</span> this.dataList
            }
        }
    }
  父组件
    <span class="hljs-params">&lt;Position :data-list='List'&gt;</span><span class="hljs-params">&lt;/Position&gt;</span>  </code></pre>
<p>b.子组件传参给父组件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="父组件传一个函数给子组件
子组件：
    export default {
        prop: ['id'，'onbuttonInfo'],
        data() {
            return {
                posid: this.id,
                title: 'abc'
            }
        },
        mounted() {
            this.onbuttonInfo(this.title)
        }
    }      
 父组件：
    <Position :id='sid' :onbuttonInfo='handleButonInfo'>职位列表</Position>
    methods:{
        handleButonInfo (msg) {
            console.log(msg)
        }
    }
    注意：浏览器的坑 会把buttonInfo 都改成全小写" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>父组件传一个函数给子组件
子组件：
    export <span class="hljs-keyword">default</span> {
        prop: [<span class="hljs-string">'id'</span>，<span class="hljs-string">'onbuttonInfo'</span>],
        <span class="hljs-keyword">data</span>() {
            <span class="hljs-keyword">return</span> {
                posid: <span class="hljs-keyword">this</span>.id,
                title: <span class="hljs-string">'abc'</span>
            }
        },
        mounted() {
            <span class="hljs-keyword">this</span>.onbuttonInfo(<span class="hljs-keyword">this</span>.title)
        }
    }      
 父组件：
    &lt;Position :id=<span class="hljs-string">'sid'</span> :onbuttonInfo=<span class="hljs-string">'handleButonInfo'</span>&gt;职位列表&lt;/Position&gt;
    methods:{
        handleButonInfo (msg) {
            console.log(msg)
        }
    }
    注意：浏览器的坑 会把buttonInfo 都改成全小写</code></pre>
<p>2 &gt; 动态路由传参</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="方式一：path:'/main/:变量名'   
方式二：
方法：
    传：
    this.$router.push({name: 'goodslist',params:{&quot;list&quot;:this.list"}}")
    接收：
    data() {
      return {
          goodsList: this.$route.query.list,
          val: ''
      }
    }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>方式一：path:<span class="hljs-string">'/main/:变量名'</span>   
方式二：
方法：
    传：
    <span class="hljs-keyword">this</span>.$router.push({name: <span class="hljs-string">'goodslist'</span>,params:{<span class="hljs-string">"list"</span>:<span class="hljs-keyword">this</span>.list"}}")
    接收：
    <span class="hljs-keyword">data</span>() {
      <span class="hljs-keyword">return</span> {
          goodsList: <span class="hljs-keyword">this</span>.$route.query.list,
          <span class="hljs-keyword">val</span>: <span class="hljs-string">''</span>
      }
    },</code></pre>
<p>3 &gt; 跳级组件传参 bus总线</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1、components中建Bus.js文件
    import Vue from 'vue'
    const Bus = new Vue({
        
    })
    export default Bus
2、index。vue中
    import Bus from '../Bus.js'
    mounted() {
        Bus.$on('on-msg',(data)=>{   //订阅 绑定事 接收参数
            console.log(data);
        })
    }
3、positionList.vue
    import Bus from './Bus.js'
    methods:{
        do() {       //发布 传参
            this.$router.push({name:'search',})
            Bus.$emit('on-msg',120)
        }
    }    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-number">1</span>、components中建Bus.js文件
    <span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
    <span class="hljs-keyword">const</span> Bus = <span class="hljs-keyword">new</span> Vue({
        
    })
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> Bus
<span class="hljs-number">2</span>、index。vue中
    <span class="hljs-keyword">import</span> Bus <span class="hljs-keyword">from</span> <span class="hljs-string">'../Bus.js'</span>
    mounted() {
        Bus.$on(<span class="hljs-string">'on-msg'</span>,<span class="hljs-function">(<span class="hljs-params">data</span>)=&gt;</span>{   <span class="hljs-comment">//订阅 绑定事 接收参数</span>
            <span class="hljs-built_in">console</span>.log(data);
        })
    }
<span class="hljs-number">3</span>、positionList.vue
    <span class="hljs-keyword">import</span> Bus <span class="hljs-keyword">from</span> <span class="hljs-string">'./Bus.js'</span>
    methods:{
        <span class="hljs-keyword">do</span>() {       <span class="hljs-comment">//发布 传参</span>
            <span class="hljs-keyword">this</span>.$router.push({name:<span class="hljs-string">'search'</span>,})
            Bus.$emit(<span class="hljs-string">'on-msg'</span>,<span class="hljs-number">120</span>)
        }
    }    </code></pre>
<p>4 &gt; vuex传参（重点）请查看我的vuex文章 啦啦~~~~</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue2.0四——组件传参

## 原文链接
[https://segmentfault.com/a/1190000012313976](https://segmentfault.com/a/1190000012313976)

