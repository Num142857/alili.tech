---
title: 'vue面包屑（vue动态路由多级嵌套面包屑怎么弄）' 
date: 2019-01-05 2:30:10
hidden: true
slug: kxiprf57tx
categories: [reprint]
---

{{< raw >}}

                    
<p><strong>vue动态路由多级嵌套面包屑怎么弄(不是动态路由嵌套可以尝试用 this.$route.matched方法获取到path和name集合，动态的嵌套获取不到全部具体的id)</strong></p>
<p><strong>功能比如：</strong>A列表页面路由如/a，点击任意一列进入任意一个A的详情页面名字为B,/b/03（这个是动态路由弄是吧,03就是id嘛），点击B页面任意一列，再进入B的详情页名字为C,路由如/bdetail/01;现在弄面包屑要获取到的路由是刚刚打开的，如（/a；/b/03；/bdetail/01）</p>
<p><strong>思路：</strong>获取所有进入的层级的路由和名称如breadlist=[{path:'/a',name:'一级'},{path:'/b/03',name:'二级'},{path:'/bdetail/01',name:'三级'}]，然后遍历出来如：&lt;span v-for="(item in breadlist)"&gt;&lt;router-link :to="item.path"&gt;"{{"item.name"}}"&lt;/router-link&gt;&lt;/span&gt;</p>
<p><strong>做法：下面贴出相关代码：</strong></p>
<p>A列表页面跳转按钮：（breadNum记录面包屑层级）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<router-link :to=&quot;{path:'/b/'+id,query:{breadNum:2"}}"&quot;></router-link>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code>&lt;router-link <span class="hljs-symbol">:to=<span class="hljs-string">"{path:'/b/'+id,query:{breadNum:2"}}""</span>&gt;&lt;/router-link&gt;</span>
</code></pre>
<p>B列表页面跳转按钮：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<router-link :to=&quot;{path:'/bbdetail/'+id,query:{breadNum:3"}}"&quot;></router-link>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code>&lt;router-link <span class="hljs-symbol">:to=<span class="hljs-string">"{path:'/bbdetail/'+id,query:{breadNum:3"}}""</span>&gt;&lt;/router-link&gt;</span>
</code></pre>
<p>breadcrumb.vue页面：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
        <div class=&quot;breadbox&quot;>
            <span v-for=&quot;(item,index) in breadlist&quot; >
                <router-link :to=&quot;item.path&quot;>"{{"item.name"}}"</router-link>
            </span>
        </div>
</template>
<script>
    export default{
        created() {
          this.getBreadcrumb();
        },
        data() {
            return {
                breadlist: '' // 路由集合
            }
        },
        methods: {
            getBreadcrumb() {
                var breadNumber= this.$route.query.breadNum || 1;//url变量breadNum记录层级，默认为1，如果大于1，要添加上变量；
                var breadLength=this.$store.state.breadListState.length;//目前breadlist集合数组个数
                var curName=this.$route.name;
                var curPath=this.$route.fullPath;
                var newBread={name:curName,path:curPath};
                var ishome=curName=='首页';
                console.log(ishome);
                if(breadNumber===1){//点击一级菜单
                    this.$store.commit('breadListStateRemove',1);//初始化，只有首页面包屑按钮
                    if(!ishome)//如果不是首页
                        this.$store.commit('breadListStateAdd',newBread);//当前页面添加到breadlist集合
                }
                else if(breadLength<=breadNumber){//如果不是一级导航，并且breadlist集合个数等于或者小于目前层级
                    this.$store.commit('breadListStateAdd',newBread);//要把当前路由添加到breadlist集合
                }else{
                    this.$store.commit('breadListStateRemove',parseInt(breadNumber)+1);//如果往回点面包屑导航，截取；
                }
                this.breadlist=this.$store.state.breadListState;
                console.log(this.breadlist);
            }
        },
        watch: {
            $route () {
                this.getBreadcrumb();
            }
        },
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"breadbox"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"(item,index) in breadlist"</span> &gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">:to</span>=<span class="hljs-string">"item.path"</span>&gt;</span></span><span class="hljs-template-variable">"{{"item.name"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span>{
        created() {
          <span class="hljs-keyword">this</span>.getBreadcrumb();
        },
        data() {
            <span class="hljs-keyword">return</span> {
                <span class="hljs-attr">breadlist</span>: <span class="hljs-string">''</span> <span class="hljs-comment">// 路由集合</span>
            }
        },
        <span class="hljs-attr">methods</span>: {
            getBreadcrumb() {
                <span class="hljs-keyword">var</span> breadNumber= <span class="hljs-keyword">this</span>.$route.query.breadNum || <span class="hljs-number">1</span>;<span class="hljs-comment">//url变量breadNum记录层级，默认为1，如果大于1，要添加上变量；</span>
                <span class="hljs-keyword">var</span> breadLength=<span class="hljs-keyword">this</span>.$store.state.breadListState.length;<span class="hljs-comment">//目前breadlist集合数组个数</span>
                <span class="hljs-keyword">var</span> curName=<span class="hljs-keyword">this</span>.$route.name;
                <span class="hljs-keyword">var</span> curPath=<span class="hljs-keyword">this</span>.$route.fullPath;
                <span class="hljs-keyword">var</span> newBread={<span class="hljs-attr">name</span>:curName,<span class="hljs-attr">path</span>:curPath};
                <span class="hljs-keyword">var</span> ishome=curName==<span class="hljs-string">'首页'</span>;
                <span class="hljs-built_in">console</span>.log(ishome);
                <span class="hljs-keyword">if</span>(breadNumber===<span class="hljs-number">1</span>){<span class="hljs-comment">//点击一级菜单</span>
                    <span class="hljs-keyword">this</span>.$store.commit(<span class="hljs-string">'breadListStateRemove'</span>,<span class="hljs-number">1</span>);<span class="hljs-comment">//初始化，只有首页面包屑按钮</span>
                    <span class="hljs-keyword">if</span>(!ishome)<span class="hljs-comment">//如果不是首页</span>
                        <span class="hljs-keyword">this</span>.$store.commit(<span class="hljs-string">'breadListStateAdd'</span>,newBread);<span class="hljs-comment">//当前页面添加到breadlist集合</span>
                }
                <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(breadLength&lt;=breadNumber){<span class="hljs-comment">//如果不是一级导航，并且breadlist集合个数等于或者小于目前层级</span>
                    <span class="hljs-keyword">this</span>.$store.commit(<span class="hljs-string">'breadListStateAdd'</span>,newBread);<span class="hljs-comment">//要把当前路由添加到breadlist集合</span>
                }<span class="hljs-keyword">else</span>{
                    <span class="hljs-keyword">this</span>.$store.commit(<span class="hljs-string">'breadListStateRemove'</span>,<span class="hljs-built_in">parseInt</span>(breadNumber)+<span class="hljs-number">1</span>);<span class="hljs-comment">//如果往回点面包屑导航，截取；</span>
                }
                <span class="hljs-keyword">this</span>.breadlist=<span class="hljs-keyword">this</span>.$store.state.breadListState;
                <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.breadlist);
            }
        },
        <span class="hljs-attr">watch</span>: {
            $route () {
                <span class="hljs-keyword">this</span>.getBreadcrumb();
            }
        },
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<p>状态管理store.js代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default store = new Vuex.Store({
  state: {
    breadListState:[
      {name:'首页',path:'/'}
    ]
  },
  mutations: {
    breadListStateAdd(state,obj){
      state.breadListState.push(obj);
    },
    breadListStateRemove(state,num){
      state.breadListState=state.breadListState.slice(0,num);
    }
  }

})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>export <span class="hljs-keyword">default</span> store = new Vuex.Store({
  <span class="hljs-keyword">state</span>: {
    breadListState:[
      {name:'首页',path:'/'}
    ]
  },
  mutations: {
    breadListStateAdd(<span class="hljs-keyword">state</span>,obj){
      <span class="hljs-keyword">state</span>.breadListState.push(obj);
    },
    breadListStateRemove(<span class="hljs-keyword">state</span>,num){
      <span class="hljs-keyword">state</span>.breadListState=<span class="hljs-keyword">state</span>.breadListState.slice(<span class="hljs-number">0</span>,num);
    }
  }

})
</code></pre>
<p>路由route.js代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    path: '/',
    name: '首页',
    component: Main,
    redirect:'/home',
    children:[
      {path: '/a',name: 'A页面',component: APage},
      {path: '/b/:id',name: 'B页面',component: BPage},
      {path: '/bdetail/:id',name: 'C页面',component: CPage},
    ]
}    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code>{
    <span class="hljs-attribute">path</span>: <span class="hljs-string">'/'</span>,
    <span class="hljs-attribute">name</span>: <span class="hljs-string">'首页'</span>,
    <span class="hljs-attribute">component</span>: Main,
    <span class="hljs-attribute">redirect</span>:<span class="hljs-string">'/home'</span>,
    <span class="hljs-attribute">children</span>:[
      {<span class="hljs-attribute">path</span>: <span class="hljs-string">'/a'</span>,<span class="hljs-attribute">name</span>: <span class="hljs-string">'A页面'</span>,<span class="hljs-attribute">component</span>: APage},
      {<span class="hljs-attribute">path</span>: <span class="hljs-string">'/b/:id'</span>,<span class="hljs-attribute">name</span>: <span class="hljs-string">'B页面'</span>,<span class="hljs-attribute">component</span>: BPage},
      {<span class="hljs-attribute">path</span>: <span class="hljs-string">'/bdetail/:id'</span>,<span class="hljs-attribute">name</span>: <span class="hljs-string">'C页面'</span>,<span class="hljs-attribute">component</span>: CPage},
    ]
}    </code></pre>
<p><strong>建议后修改：</strong>（贴出代码帮我看看）<br>A列表页面跳转按钮：（breadNum记录面包屑层级）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<router-link :to=&quot;{path:'/b/'+id}&quot;></router-link>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code>&lt;router-link <span class="hljs-symbol">:to=<span class="hljs-string">"{path:'/b/'+id}"</span>&gt;&lt;/router-link&gt;</span>
</code></pre>
<p>B列表页面跳转按钮：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<router-link :to=&quot;{path:'/bbdetail/'+id}&quot;></router-link>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code style="word-break: break-word; white-space: initial;">&lt;router-link <span class="hljs-symbol">:to=<span class="hljs-string">"{path:'/bbdetail/'+id}"</span>&gt;&lt;/router-link&gt;</span></code></pre>
<p>breadcrumb.vue页面：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
        <div class=&quot;breadbox&quot;>
            <span v-for=&quot;(item,index) in breadlist&quot; >
                <router-link :to=&quot;item.path&quot;>"{{"item.name"}}"</router-link>
            </span>
        </div>
</template>
<script>
    export default{
        created() {
          this.getBreadcrumb(true);//刷新的参数为true
        },
        data() {
            return {
                breadlist: '' // 路由集合
            }
        },
        methods: {
            getBreadcrumb(isreload) {
                console.log('getBreadcrumb')
                var breadNumber= typeof(this.$route.meta.breadNumber)!=&quot;undefined&quot;?this.$route.meta.breadNumber:1;//面包屑位置索引放到meta里预设好，首页索引为0，一级默认为1
                var breadLength=this.$store.state.breadListState.length;//目前breadlist集合数组个数
                var curName=this.$route.name;
                var curPath=this.$route.fullPath;
                var newBread={name:curName,path:curPath};
                this.$store.commit('increment');
                if(breadNumber===0||breadNumber===1){//点击首页或者一级
                    this.$store.commit('breadListStateRemove',1);//初始化，只有首页面包屑按钮
                    if(breadNumber===1){//点击一级菜单
                        this.$store.commit('breadListStateAdd',newBread);//当前页面添加到breadlist集合
                    }
                }else{
                    if(!isreload){
                        if(breadLength<=breadNumber){//breadlist集合个数等于或者小于目前层级breadNumber
                            this.$store.commit('breadListStateAdd',newBread);//要把当前路由添加到breadlist集合
                        }else{
                            this.$store.commit('breadListStateRemove',parseInt(breadNumber)+1);//如果往回点面包屑导航，截取；
                        }
                    }else{//刷新，state.breadListState被初始化，从缓存取值；
                        this.$store.state.breadListState=JSON.parse(sessionStorage.getItem('breadListStorage'));
                    }
                }
                this.breadlist=this.$store.state.breadListState;
                sessionStorage.setItem('breadListStorage',JSON.stringify(this.breadlist))
            }
        },
        watch: {
            $route () {
                this.getBreadcrumb();
            }
        },
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>&lt;template&gt;
        &lt;div <span class="hljs-class"><span class="hljs-keyword">class</span>="<span class="hljs-title">breadbox</span>"&gt;</span>
            &lt;span v-<span class="hljs-keyword">for</span>=<span class="hljs-string">"(item,index) in breadlist"</span> &gt;
                &lt;router-link :to=<span class="hljs-string">"item.path"</span>&gt;"{{"item.name"}}"&lt;/router-link&gt;
            &lt;/span&gt;
        &lt;/div&gt;
&lt;/template&gt;
&lt;script&gt;
    export <span class="hljs-keyword">default</span>{
        created() {
          <span class="hljs-keyword">this</span>.getBreadcrumb(<span class="hljs-literal">true</span>);<span class="hljs-comment">//刷新的参数为true</span>
        },
        <span class="hljs-keyword">data</span>() {
            <span class="hljs-keyword">return</span> {
                breadlist: <span class="hljs-string">''</span> <span class="hljs-comment">// 路由集合</span>
            }
        },
        methods: {
            getBreadcrumb(isreload) {
                console.log(<span class="hljs-string">'getBreadcrumb'</span>)
                <span class="hljs-keyword">var</span> breadNumber= typeof(<span class="hljs-keyword">this</span>.$route.meta.breadNumber)!=<span class="hljs-string">"undefined"</span>?<span class="hljs-keyword">this</span>.$route.meta.breadNumber:<span class="hljs-number">1</span>;<span class="hljs-comment">//面包屑位置索引放到meta里预设好，首页索引为0，一级默认为1</span>
                <span class="hljs-keyword">var</span> breadLength=<span class="hljs-keyword">this</span>.$store.state.breadListState.length;<span class="hljs-comment">//目前breadlist集合数组个数</span>
                <span class="hljs-keyword">var</span> curName=<span class="hljs-keyword">this</span>.$route.name;
                <span class="hljs-keyword">var</span> curPath=<span class="hljs-keyword">this</span>.$route.fullPath;
                <span class="hljs-keyword">var</span> newBread={name:curName,path:curPath};
                <span class="hljs-keyword">this</span>.$store.commit(<span class="hljs-string">'increment'</span>);
                <span class="hljs-keyword">if</span>(breadNumber===<span class="hljs-number">0</span>||breadNumber===<span class="hljs-number">1</span>){<span class="hljs-comment">//点击首页或者一级</span>
                    <span class="hljs-keyword">this</span>.$store.commit(<span class="hljs-string">'breadListStateRemove'</span>,<span class="hljs-number">1</span>);<span class="hljs-comment">//初始化，只有首页面包屑按钮</span>
                    <span class="hljs-keyword">if</span>(breadNumber===<span class="hljs-number">1</span>){<span class="hljs-comment">//点击一级菜单</span>
                        <span class="hljs-keyword">this</span>.$store.commit(<span class="hljs-string">'breadListStateAdd'</span>,newBread);<span class="hljs-comment">//当前页面添加到breadlist集合</span>
                    }
                }<span class="hljs-keyword">else</span>{
                    <span class="hljs-keyword">if</span>(!isreload){
                        <span class="hljs-keyword">if</span>(breadLength&lt;=breadNumber){<span class="hljs-comment">//breadlist集合个数等于或者小于目前层级breadNumber</span>
                            <span class="hljs-keyword">this</span>.$store.commit(<span class="hljs-string">'breadListStateAdd'</span>,newBread);<span class="hljs-comment">//要把当前路由添加到breadlist集合</span>
                        }<span class="hljs-keyword">else</span>{
                            <span class="hljs-keyword">this</span>.$store.commit(<span class="hljs-string">'breadListStateRemove'</span>,parseInt(breadNumber)+<span class="hljs-number">1</span>);<span class="hljs-comment">//如果往回点面包屑导航，截取；</span>
                        }
                    }<span class="hljs-keyword">else</span>{<span class="hljs-comment">//刷新，state.breadListState被初始化，从缓存取值；</span>
                        <span class="hljs-keyword">this</span>.$store.state.breadListState=JSON.parse(sessionStorage.getItem(<span class="hljs-string">'breadListStorage'</span>));
                    }
                }
                <span class="hljs-keyword">this</span>.breadlist=<span class="hljs-keyword">this</span>.$store.state.breadListState;
                sessionStorage.setItem(<span class="hljs-string">'breadListStorage'</span>,JSON.stringify(<span class="hljs-keyword">this</span>.breadlist))
            }
        },
        watch: {
            $route () {
                <span class="hljs-keyword">this</span>.getBreadcrumb();
            }
        },
    }
&lt;/script&gt;</code></pre>
<p>状态管理store.js代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default store = new Vuex.Store({
  state: {
    breadListState:[
      {name:'首页',path:'/'}
    ]
  },
  mutations: {
    breadListStateAdd(state,obj){
      state.breadListState.push(obj);
    },
    breadListStateRemove(state,num){
      state.breadListState.splice(num,state.breadListState.length-num);
    }
  }

})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>export <span class="hljs-keyword">default</span> store = new Vuex.Store({
  <span class="hljs-keyword">state</span>: {
    breadListState:[
      {name:'首页',path:'/'}
    ]
  },
  mutations: {
    breadListStateAdd(<span class="hljs-keyword">state</span>,obj){
      <span class="hljs-keyword">state</span>.breadListState.push(obj);
    },
    breadListStateRemove(<span class="hljs-keyword">state</span>,num){
      <span class="hljs-keyword">state</span>.breadListState.splice(num,<span class="hljs-keyword">state</span>.breadListState.length-num);
    }
  }

})
</code></pre>
<p>路由route.js代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    path: '/',
    name: '首页',
    component: Main,
    redirect:'/home',
    children:[
      {path: '/a',name: 'A页面',component: APage},
      {path: '/b/:id',name: 'B页面',component: BPage,meta:{breadNumber:2"}}",
      {path: '/bdetail/:id',name: 'C页面',component: CPage,meta:{breadNumber:3"}}",
    ]
}    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code>{
    <span class="hljs-attribute">path</span>: <span class="hljs-string">'/'</span>,
    <span class="hljs-attribute">name</span>: <span class="hljs-string">'首页'</span>,
    <span class="hljs-attribute">component</span>: Main,
    <span class="hljs-attribute">redirect</span>:<span class="hljs-string">'/home'</span>,
    <span class="hljs-attribute">children</span>:[
      {<span class="hljs-attribute">path</span>: <span class="hljs-string">'/a'</span>,<span class="hljs-attribute">name</span>: <span class="hljs-string">'A页面'</span>,<span class="hljs-attribute">component</span>: APage},
      {<span class="hljs-attribute">path</span>: <span class="hljs-string">'/b/:id'</span>,<span class="hljs-attribute">name</span>: <span class="hljs-string">'B页面'</span>,<span class="hljs-attribute">component</span>: BPage,<span class="hljs-attribute">meta</span>:{<span class="hljs-attribute">breadNumber</span>:<span class="hljs-number">2</span>"}}",
      {<span class="hljs-attribute">path</span>: <span class="hljs-string">'/bdetail/:id'</span>,<span class="hljs-attribute">name</span>: <span class="hljs-string">'C页面'</span>,<span class="hljs-attribute">component</span>: CPage,<span class="hljs-attribute">meta</span>:{<span class="hljs-attribute">breadNumber</span>:<span class="hljs-number">3</span>"}}",
    ]
}    </code></pre>
<p>===================================================贴下代码======================：<br>store.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mutations: {
    breadListMutations(getters,list){
      getters.breadListState=list;
      sessionStorage.setItem('breadListStorage',list);
    }
},
  getters:{
    breadListState(){
      return JSON.parse(sessionStorage.getItem('breadListStorage')) || [];
    }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-attribute">mutations</span>: {
    breadListMutations(getters,<span class="hljs-built_in">list</span>){
      getters.breadListState=<span class="hljs-built_in">list</span>;
      sessionStorage.setItem(<span class="hljs-string">'breadListStorage'</span>,<span class="hljs-built_in">list</span>);
    }
},
  <span class="hljs-attribute">getters</span>:{
    breadListState(){
      <span class="hljs-keyword">return</span> <span class="hljs-built_in">JSON</span>.parse(sessionStorage.getItem(<span class="hljs-string">'breadListStorage'</span>)) || [];
    }
  }</code></pre>
<p>breadcrumb.vue组件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>//样式自己写，我用了elementUI
    <div class=&quot;m-artHeader&quot;>
        <el-breadcrumb class=&quot;linkWay&quot;>
            <el-breadcrumb-item v-for=&quot;(item,index) in breadList&quot; :key=&quot;item.id&quot;  separator=&quot;/&quot; :to=&quot;{ path: item.path }&quot;>"{{"item.name"}}"</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>
<script>
export default{
        created() {
            this.getBreadcrumb();
        },
        data() {
            return {
                breadList: [] // 路由集合
            }
        },
        methods: {
            getBreadcrumb() {
                var breadNumber= typeof(this.$route.meta.breadNumber)!=&quot;undefined&quot;?this.$route.meta.breadNumber:1;//默认为1
                var newBread={name:this.$route.name,path:this.$route.fullPath};//当前页面的
                var breadList=this.$store.getters.breadListState;//获取breadList数组
                breadList.splice(breadNumber,breadList.length-breadNumber,newBread);
                var breadList=JSON.stringify(breadList);
                this.$store.commit('breadListMutations',breadList);
                this.breadList=this.$store.getters.breadListState;
            }
        },
        watch: {
            //&quot;$route&quot;: &quot;getBreadcrumb&quot;
            $route () {
                this.getBreadcrumb();
            }
        },
 }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>//样式自己写，我用了elementUI
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"m-artHeader"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">el-breadcrumb</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"linkWay"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">el-breadcrumb-item</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"(item,index) in breadList"</span> <span class="hljs-attr">:key</span>=<span class="hljs-string">"item.id"</span>  <span class="hljs-attr">separator</span>=<span class="hljs-string">"/"</span> <span class="hljs-attr">:to</span>=<span class="hljs-string">"{ path: item.path }"</span>&gt;</span></span><span class="hljs-template-variable">"{{"item.name"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">el-breadcrumb-item</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">el-breadcrumb</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span>{
        created() {
            <span class="hljs-keyword">this</span>.getBreadcrumb();
        },
        data() {
            <span class="hljs-keyword">return</span> {
                <span class="hljs-attr">breadList</span>: [] <span class="hljs-comment">// 路由集合</span>
            }
        },
        <span class="hljs-attr">methods</span>: {
            getBreadcrumb() {
                <span class="hljs-keyword">var</span> breadNumber= <span class="hljs-keyword">typeof</span>(<span class="hljs-keyword">this</span>.$route.meta.breadNumber)!=<span class="hljs-string">"undefined"</span>?<span class="hljs-keyword">this</span>.$route.meta.breadNumber:<span class="hljs-number">1</span>;<span class="hljs-comment">//默认为1</span>
                <span class="hljs-keyword">var</span> newBread={<span class="hljs-attr">name</span>:<span class="hljs-keyword">this</span>.$route.name,<span class="hljs-attr">path</span>:<span class="hljs-keyword">this</span>.$route.fullPath};<span class="hljs-comment">//当前页面的</span>
                <span class="hljs-keyword">var</span> breadList=<span class="hljs-keyword">this</span>.$store.getters.breadListState;<span class="hljs-comment">//获取breadList数组</span>
                breadList.splice(breadNumber,breadList.length-breadNumber,newBread);
                <span class="hljs-keyword">var</span> breadList=<span class="hljs-built_in">JSON</span>.stringify(breadList);
                <span class="hljs-keyword">this</span>.$store.commit(<span class="hljs-string">'breadListMutations'</span>,breadList);
                <span class="hljs-keyword">this</span>.breadList=<span class="hljs-keyword">this</span>.$store.getters.breadListState;
            }
        },
        <span class="hljs-attr">watch</span>: {
            <span class="hljs-comment">//"$route": "getBreadcrumb"</span>
            $route () {
                <span class="hljs-keyword">this</span>.getBreadcrumb();
            }
        },
 }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<p>页面中引用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
 <bread-crumb></bread-crumb>
</template>
<script>
import breadCrumb from '../components/breadcrumb.vue'
export default {
  components:{
    breadCrumb
  }
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
 <span class="hljs-tag">&lt;<span class="hljs-name">bread-crumb</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">bread-crumb</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> breadCrumb <span class="hljs-keyword">from</span> <span class="hljs-string">'../components/breadcrumb.vue'</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> </span></span><span class="hljs-template-variable">{
  components:{
    breadCrumb
  }</span><span class="xml"><span class="undefined">
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue面包屑（vue动态路由多级嵌套面包屑怎么弄）

## 原文链接
[https://segmentfault.com/a/1190000010574901](https://segmentfault.com/a/1190000010574901)

