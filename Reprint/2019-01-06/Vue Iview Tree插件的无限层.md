---
title: 'Vue Iview Tree插件的无限层' 
date: 2019-01-06 2:30:10
hidden: true
slug: mjm91mcpt5b
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">Iview</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
<template>
    <Tree :data=&quot;baseData&quot; show-checkbox multiple></Tree>
</template>
<script>
    export default {
        data () {
            return {
                baseData: []
            }
        },
        methods:{
            getTree(){
                var start = new Date().getTime();//起始时间
                //准备数据
                let testData = {
                    &quot;department&quot;: [
                        {
                            &quot;departmentName&quot;: &quot;测试1&quot;,
                            &quot;departmentDesc&quot;: &quot;盛达康网络&quot;,
                            &quot;parentId&quot;: &quot;&quot;,
                            &quot;id&quot;: &quot;594a28fb1c8652a01f0301&quot;
                        },
                        {
                            &quot;departmentName&quot;: &quot;测试-一级子级&quot;,
                            &quot;parentId&quot;: &quot;594a28fb1c8652a01f0301&quot;,
                            &quot;id&quot;: &quot;594a3910202469941&quot;
                        },
                        {
                            &quot;departmentName&quot;: &quot;测试-二级子级&quot;,
                            &quot;parentId&quot;: &quot;594a3910202469941&quot;,
                            &quot;id&quot;: &quot;594a391020246994asasd1&quot;
                        },
                        {
                            &quot;departmentName&quot;: &quot;盛达康&quot;,
                            &quot;departmentDesc&quot;: &quot;盛达康网络&quot;,
                            &quot;parentId&quot;: &quot;&quot;,
                            &quot;id&quot;: &quot;594a28fb1c8652a01f030126&quot;
                        },
                        {
                            &quot;departmentName&quot;: &quot;开发&quot;,
                            &quot;parentId&quot;: &quot;594a28fb1c8652a01f030126&quot;,
                            &quot;id&quot;: &quot;594a3910202469941c349d7c&quot;
                        },
                        {
                            &quot;departmentName&quot;: &quot;运营&quot;,
                            &quot;parentId&quot;: &quot;594a28fb1c8652a01f030126&quot;,
                            &quot;id&quot;: &quot;594a4509202469941c349d7f&quot;
                        },
                        {
                            &quot;departmentName&quot;: &quot;人事&quot;,
                            &quot;parentId&quot;: &quot;594a28fb1c8652a01f030126&quot;,
                            &quot;id&quot;: &quot;59522e3ef30415281805d39f&quot;
                        },
                        {
                            &quot;departmentName&quot;: &quot;瞧瞧&quot;,
                            &quot;parentId&quot;: &quot;594a3910202469941c349d7c&quot;,
                            &quot;id&quot;: &quot;597842fc51ec7f80118aa94c&quot;
                        },
                        {
                            &quot;departmentName&quot;: &quot;测试层&quot;,
                            &quot;parentId&quot;: &quot;594a4509202469941c349d7f&quot;,
                            &quot;id&quot;: &quot;5978436751ec7f80118aa94d&quot;
                        },
                        {
                            &quot;departmentName&quot;: &quot;测试1&quot;,
                            &quot;parentId&quot;: &quot;5978436751ec7f80118aa94d&quot;,
                            &quot;id&quot;: &quot;5979ad338c9082580984cf0a&quot;
                        },
                        {
                            &quot;departmentName&quot;: &quot;测试2&quot;,
                            &quot;parentId&quot;: &quot;5979ad338c9082580984cf0a&quot;,
                            &quot;id&quot;: &quot;5979ad418c9082580984cf0b&quot;
                        },
                        {
                            &quot;departmentName&quot;: &quot;测试3&quot;,
                            &quot;parentId&quot;: &quot;5979ad418c9082580984cf0b&quot;,
                            &quot;id&quot;: &quot;5979ad568c9082580984cf0c&quot;
                        },
                        {
                            &quot;departmentName&quot;: &quot;测试4&quot;,
                            &quot;parentId&quot;: &quot;5979ad568c9082580984cf0c&quot;,
                            &quot;id&quot;: &quot;5979ad648c9082580984cf0d&quot;
                        }
                    ]
                }
                var data = testData.department
                let treedata = []
                //查找最顶层
                let len = data.length
                for(let j=0;j<len;j++){
                    data[j].expand = false
                    data[j].title = data[j].departmentName
                    if(data[j].parentId == &quot;&quot;){
                        treedata.push({
                            &quot;expand&quot;:true,
                            &quot;title&quot;:data[j].departmentName,
                            &quot;id&quot;:data[j].id
                        })
                    }
                }
                //找到跟最高层id相关的子子孙孙，并给子孙添加lev
                var treedataLevs =[]
                for(let h=0,ls=treedata.length;h<ls;h++){
                    treedataLevs.push({
                        treedataLev:sonsTree(data,treedata[h].id)
                    })
                }
                console.log(treedataLevs)
                for(let p=0,lq=treedataLevs.length;p<lq;p++){
                    var treedataLev = treedataLevs[p].treedataLev
                    //找到最高层的lev
                    var maxLev = 0
                    for(let i=0,lt=treedataLev.length;i<lt;i++){
                        if(parseInt(treedataLev[i].lev) > maxLev){
                            maxLev = parseInt(treedataLev[i].lev)
                        }else{
                            maxLev = maxLev
                        }
                    }
                    //比较当前层和上一层的数据，然后做处理
                    var needLev = maxLev
                    var maxLevTree = []
                    var maxLevTreePrev = []
                    for(let m=0;m<maxLev;m++){
                        maxLevTree = getLevArr(treedataLev,needLev)
                        maxLevTreePrev = getLevArr(treedataLev,needLev-1)
                        for(var j=0,lp=maxLevTreePrev.length;j<lp;j++){
                            maxLevTreePrev[j].children = new Array()
                            for(var i=0,lm=maxLevTree;i<lm.length;i++){
                                if(maxLevTree[i].parentId == maxLevTreePrev[j].id){
                                    maxLevTreePrev[j].children.push(maxLevTree[i])
                                }
                            }
                        }
                        needLev--
                    }
                    treedata[p].children = maxLevTreePrev
                }
                
                this.baseData = treedata
                //找出同一级的数据
                function getLevArr(arr,lev){
                    var newarr = []
                    for(let i=0,la=arr.length;i<la;i++){
                        //这里对arr 的children 做处理
                        arr.children = new Array()
                        if(parseInt(arr[i].lev) == lev){
                            newarr.push(arr[i])
                        }
                    }
                    return newarr
                }
                //给每个数据添加一个lev
                function sonsTree(arr,id){
                    var temp = [],lev=0;
                    var forFn = function(arr, id,lev){
                        for (var i = 0; i < arr.length; i++) {
                            var item = arr[i];
                            if (item.parentId==id) {
                                item.lev=lev;
                                temp.push(item);
                                forFn(arr,item.id,lev+1);
                            }
                        }
                    };
                    forFn(arr, id,lev);
                    return temp;
                }
                var end = new Date().getTime();//结束时间
                console.log(&quot;Tree初始化的时间是&quot;+(end - start)+&quot;ms&quot;)//返回函数执行需要时间
            }
        },
        created:function(){
            this.getTree()
        }
    }
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>
<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">Tree</span> <span class="hljs-attr">:data</span>=<span class="hljs-string">"baseData"</span> <span class="hljs-attr">show-checkbox</span> <span class="hljs-attr">multiple</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">Tree</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
        data () {
            <span class="hljs-keyword">return</span> {
                <span class="hljs-attr">baseData</span>: []
            }
        },
        <span class="hljs-attr">methods</span>:{
            getTree(){
                <span class="hljs-keyword">var</span> start = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().getTime();<span class="hljs-comment">//起始时间</span>
                <span class="hljs-comment">//准备数据</span>
                <span class="hljs-keyword">let</span> testData = {
                    <span class="hljs-string">"department"</span>: [
                        {
                            <span class="hljs-string">"departmentName"</span>: <span class="hljs-string">"测试1"</span>,
                            <span class="hljs-string">"departmentDesc"</span>: <span class="hljs-string">"盛达康网络"</span>,
                            <span class="hljs-string">"parentId"</span>: <span class="hljs-string">""</span>,
                            <span class="hljs-string">"id"</span>: <span class="hljs-string">"594a28fb1c8652a01f0301"</span>
                        },
                        {
                            <span class="hljs-string">"departmentName"</span>: <span class="hljs-string">"测试-一级子级"</span>,
                            <span class="hljs-string">"parentId"</span>: <span class="hljs-string">"594a28fb1c8652a01f0301"</span>,
                            <span class="hljs-string">"id"</span>: <span class="hljs-string">"594a3910202469941"</span>
                        },
                        {
                            <span class="hljs-string">"departmentName"</span>: <span class="hljs-string">"测试-二级子级"</span>,
                            <span class="hljs-string">"parentId"</span>: <span class="hljs-string">"594a3910202469941"</span>,
                            <span class="hljs-string">"id"</span>: <span class="hljs-string">"594a391020246994asasd1"</span>
                        },
                        {
                            <span class="hljs-string">"departmentName"</span>: <span class="hljs-string">"盛达康"</span>,
                            <span class="hljs-string">"departmentDesc"</span>: <span class="hljs-string">"盛达康网络"</span>,
                            <span class="hljs-string">"parentId"</span>: <span class="hljs-string">""</span>,
                            <span class="hljs-string">"id"</span>: <span class="hljs-string">"594a28fb1c8652a01f030126"</span>
                        },
                        {
                            <span class="hljs-string">"departmentName"</span>: <span class="hljs-string">"开发"</span>,
                            <span class="hljs-string">"parentId"</span>: <span class="hljs-string">"594a28fb1c8652a01f030126"</span>,
                            <span class="hljs-string">"id"</span>: <span class="hljs-string">"594a3910202469941c349d7c"</span>
                        },
                        {
                            <span class="hljs-string">"departmentName"</span>: <span class="hljs-string">"运营"</span>,
                            <span class="hljs-string">"parentId"</span>: <span class="hljs-string">"594a28fb1c8652a01f030126"</span>,
                            <span class="hljs-string">"id"</span>: <span class="hljs-string">"594a4509202469941c349d7f"</span>
                        },
                        {
                            <span class="hljs-string">"departmentName"</span>: <span class="hljs-string">"人事"</span>,
                            <span class="hljs-string">"parentId"</span>: <span class="hljs-string">"594a28fb1c8652a01f030126"</span>,
                            <span class="hljs-string">"id"</span>: <span class="hljs-string">"59522e3ef30415281805d39f"</span>
                        },
                        {
                            <span class="hljs-string">"departmentName"</span>: <span class="hljs-string">"瞧瞧"</span>,
                            <span class="hljs-string">"parentId"</span>: <span class="hljs-string">"594a3910202469941c349d7c"</span>,
                            <span class="hljs-string">"id"</span>: <span class="hljs-string">"597842fc51ec7f80118aa94c"</span>
                        },
                        {
                            <span class="hljs-string">"departmentName"</span>: <span class="hljs-string">"测试层"</span>,
                            <span class="hljs-string">"parentId"</span>: <span class="hljs-string">"594a4509202469941c349d7f"</span>,
                            <span class="hljs-string">"id"</span>: <span class="hljs-string">"5978436751ec7f80118aa94d"</span>
                        },
                        {
                            <span class="hljs-string">"departmentName"</span>: <span class="hljs-string">"测试1"</span>,
                            <span class="hljs-string">"parentId"</span>: <span class="hljs-string">"5978436751ec7f80118aa94d"</span>,
                            <span class="hljs-string">"id"</span>: <span class="hljs-string">"5979ad338c9082580984cf0a"</span>
                        },
                        {
                            <span class="hljs-string">"departmentName"</span>: <span class="hljs-string">"测试2"</span>,
                            <span class="hljs-string">"parentId"</span>: <span class="hljs-string">"5979ad338c9082580984cf0a"</span>,
                            <span class="hljs-string">"id"</span>: <span class="hljs-string">"5979ad418c9082580984cf0b"</span>
                        },
                        {
                            <span class="hljs-string">"departmentName"</span>: <span class="hljs-string">"测试3"</span>,
                            <span class="hljs-string">"parentId"</span>: <span class="hljs-string">"5979ad418c9082580984cf0b"</span>,
                            <span class="hljs-string">"id"</span>: <span class="hljs-string">"5979ad568c9082580984cf0c"</span>
                        },
                        {
                            <span class="hljs-string">"departmentName"</span>: <span class="hljs-string">"测试4"</span>,
                            <span class="hljs-string">"parentId"</span>: <span class="hljs-string">"5979ad568c9082580984cf0c"</span>,
                            <span class="hljs-string">"id"</span>: <span class="hljs-string">"5979ad648c9082580984cf0d"</span>
                        }
                    ]
                }
                <span class="hljs-keyword">var</span> data = testData.department
                <span class="hljs-keyword">let</span> treedata = []
                <span class="hljs-comment">//查找最顶层</span>
                <span class="hljs-keyword">let</span> len = data.length
                <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> j=<span class="hljs-number">0</span>;j&lt;len;j++){
                    data[j].expand = <span class="hljs-literal">false</span>
                    data[j].title = data[j].departmentName
                    <span class="hljs-keyword">if</span>(data[j].parentId == <span class="hljs-string">""</span>){
                        treedata.push({
                            <span class="hljs-string">"expand"</span>:<span class="hljs-literal">true</span>,
                            <span class="hljs-string">"title"</span>:data[j].departmentName,
                            <span class="hljs-string">"id"</span>:data[j].id
                        })
                    }
                }
                <span class="hljs-comment">//找到跟最高层id相关的子子孙孙，并给子孙添加lev</span>
                <span class="hljs-keyword">var</span> treedataLevs =[]
                <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> h=<span class="hljs-number">0</span>,ls=treedata.length;h&lt;ls;h++){
                    treedataLevs.push({
                        <span class="hljs-attr">treedataLev</span>:sonsTree(data,treedata[h].id)
                    })
                }
                <span class="hljs-built_in">console</span>.log(treedataLevs)
                <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> p=<span class="hljs-number">0</span>,lq=treedataLevs.length;p&lt;lq;p++){
                    <span class="hljs-keyword">var</span> treedataLev = treedataLevs[p].treedataLev
                    <span class="hljs-comment">//找到最高层的lev</span>
                    <span class="hljs-keyword">var</span> maxLev = <span class="hljs-number">0</span>
                    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>,lt=treedataLev.length;i&lt;lt;i++){
                        <span class="hljs-keyword">if</span>(<span class="hljs-built_in">parseInt</span>(treedataLev[i].lev) &gt; maxLev){
                            maxLev = <span class="hljs-built_in">parseInt</span>(treedataLev[i].lev)
                        }<span class="hljs-keyword">else</span>{
                            maxLev = maxLev
                        }
                    }
                    <span class="hljs-comment">//比较当前层和上一层的数据，然后做处理</span>
                    <span class="hljs-keyword">var</span> needLev = maxLev
                    <span class="hljs-keyword">var</span> maxLevTree = []
                    <span class="hljs-keyword">var</span> maxLevTreePrev = []
                    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> m=<span class="hljs-number">0</span>;m&lt;maxLev;m++){
                        maxLevTree = getLevArr(treedataLev,needLev)
                        maxLevTreePrev = getLevArr(treedataLev,needLev<span class="hljs-number">-1</span>)
                        <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> j=<span class="hljs-number">0</span>,lp=maxLevTreePrev.length;j&lt;lp;j++){
                            maxLevTreePrev[j].children = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>()
                            <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>,lm=maxLevTree;i&lt;lm.length;i++){
                                <span class="hljs-keyword">if</span>(maxLevTree[i].parentId == maxLevTreePrev[j].id){
                                    maxLevTreePrev[j].children.push(maxLevTree[i])
                                }
                            }
                        }
                        needLev--
                    }
                    treedata[p].children = maxLevTreePrev
                }
                
                <span class="hljs-keyword">this</span>.baseData = treedata
                <span class="hljs-comment">//找出同一级的数据</span>
                <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getLevArr</span>(<span class="hljs-params">arr,lev</span>)</span>{
                    <span class="hljs-keyword">var</span> newarr = []
                    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>,la=arr.length;i&lt;la;i++){
                        <span class="hljs-comment">//这里对arr 的children 做处理</span>
                        arr.children = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>()
                        <span class="hljs-keyword">if</span>(<span class="hljs-built_in">parseInt</span>(arr[i].lev) == lev){
                            newarr.push(arr[i])
                        }
                    }
                    <span class="hljs-keyword">return</span> newarr
                }
                <span class="hljs-comment">//给每个数据添加一个lev</span>
                <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sonsTree</span>(<span class="hljs-params">arr,id</span>)</span>{
                    <span class="hljs-keyword">var</span> temp = [],lev=<span class="hljs-number">0</span>;
                    <span class="hljs-keyword">var</span> forFn = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">arr, id,lev</span>)</span>{
                        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; arr.length; i++) {
                            <span class="hljs-keyword">var</span> item = arr[i];
                            <span class="hljs-keyword">if</span> (item.parentId==id) {
                                item.lev=lev;
                                temp.push(item);
                                forFn(arr,item.id,lev+<span class="hljs-number">1</span>);
                            }
                        }
                    };
                    forFn(arr, id,lev);
                    <span class="hljs-keyword">return</span> temp;
                }
                <span class="hljs-keyword">var</span> end = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().getTime();<span class="hljs-comment">//结束时间</span>
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Tree初始化的时间是"</span>+(end - start)+<span class="hljs-string">"ms"</span>)<span class="hljs-comment">//返回函数执行需要时间</span>
            }
        },
        <span class="hljs-attr">created</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            <span class="hljs-keyword">this</span>.getTree()
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<hr>
<p>啥也不说了  看代码吧</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue Iview Tree插件的无限层

## 原文链接
[https://segmentfault.com/a/1190000010381512](https://segmentfault.com/a/1190000010381512)

