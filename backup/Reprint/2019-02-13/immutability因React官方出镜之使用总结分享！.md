---
title: 'immutability因React官方出镜之使用总结分享！' 
date: 2019-02-13 2:31:23
hidden: true
slug: jofx4lzpmfk
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/bVbiLBX?w=1008&amp;h=298" src="https://static.alili.tech/img/bVbiLBX?w=1008&amp;h=298" alt="本文由@IT·平头哥联盟-首席填坑官∙苏南 分享，公众号：honeyBadger8" title="本文由@IT·平头哥联盟-首席填坑官∙苏南 分享，公众号：honeyBadger8" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader0">引言</h2>
<p>　　之前项目中遇到数据拷贝、引用之间数据层级嵌套过深，拷贝的值相互之间影响的问题，后来引入了<code>immutability-helper</code>，使用过程中的一些总结，跟大家分享下，至于为什么不是<code>immutable</code>，请看下文分解，这里是<a href="https://honeybadger8.github.io/blog/" rel="nofollow noreferrer" target="_blank">@IT·平头哥联盟</a>，我是<code>首席填坑官</code>——<a href="https://github.com/meibin08" rel="nofollow noreferrer" target="_blank">苏南</a>。</p>
<p>​　　相信大家在面试/工作中都遇到过js对象/数组的拷贝问题，面试官问你，你一般怎么做？？在现在ES6盛行的当下，不会一点ES6都不好意思说自己是前端(其实我一般都说自己是<strong>攻城狮、切图崽</strong>😝)，我们想的大多第一想法，如下：</p>
<ul>
<li>
<code>Object.assign</code> - 最方便;</li>
<li>
<code>[...]</code> - 最有逼格;</li>
<li>
<code>JSON.parse</code>、<code>JSON.stringify</code> - 完美组合;</li>
<li>
<code>$.extend()</code> - jQuery时代的引领潮流时尚前沿的API;</li>
<li>最后想到的才是自己递归实现一个;</li>
</ul>
<p>　　但是通常我们使用的<code>Object.assign</code>属于浅拷贝，当数据嵌套层级较深时，就……呵呵了；而<code>JSON.parse、stringify</code>它应该是创建一个临时可能很大的字符串，然后又访问解析器，性能是比较慢的。于是后来发现了 <code>immutable</code>「不可变数据」，曾经我也一度特别喜欢它，但时间久了，慢慢发现，它过于有个性了些、凡事都都没有任何商量的余地，所有的数据，从创建、变更、插入、删除等操作，都要按它的套路来，对于我这种一生放荡不羁爱自由的人来说，长时间的约束，是不能忍的；都说两人如果三观不合，是无法长久下去的，可能也是缘份吧，在后来的某一天偶然的闲逛中邂逅了新欢 ————<a href="https://reactjs.org/docs/update.html" rel="nofollow noreferrer" target="_blank">Immutability Helpers</a>。</p>
<p>　　嗯，今天的主题就是给大家分享一下，<code>Immutability Helpers</code>的一些用法，会介绍API的使用操作和小技巧，如有不理解不对，请纠正：<br>　　</p>
<blockquote>
<strong>太兴奋了</strong>，差点忘了，补充一下,一个简单的拷贝：</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  //实现一个简单的递归数据拷贝
  let customClone = (rawObj)=>{
    let copyObj = {};

    for (var key in rawObj) {
      if( typeof rawObj[key] === 'object' &amp;&amp; Object.prototype.toString.call(rawObj[key]) !== '[object Array]'){
          copyObj[key] = customClone(rawObj[key]);
      }else{
          copyObj[key] = rawObj[key];
      };
    };
    return copyObj;
  };
  let objA =  {&quot;name&quot;:&quot;苏南&quot;,&quot;sex&quot;:&quot;男&quot;,&quot;height&quot;:&quot;176&quot;};
  let objB =  customClone(objA);
      objB.signature = &quot;宝剑锋从磨砺出，梅花香自苦寒来，做有温度的攻城狮&quot;;

  console.log(objA);
  console.log(objB);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">  <span class="hljs-comment">//实现一个简单的递归数据拷贝</span>
  <span class="hljs-keyword">let</span> customClone = <span class="hljs-function">(<span class="hljs-params">rawObj</span>)=&gt;</span>{
    <span class="hljs-keyword">let</span> copyObj = {};

    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> key <span class="hljs-keyword">in</span> rawObj) {
      <span class="hljs-keyword">if</span>( <span class="hljs-keyword">typeof</span> rawObj[key] === <span class="hljs-string">'object'</span> &amp;&amp; <span class="hljs-built_in">Object</span>.prototype.toString.call(rawObj[key]) !== <span class="hljs-string">'[object Array]'</span>){
          copyObj[key] = customClone(rawObj[key]);
      }<span class="hljs-keyword">else</span>{
          copyObj[key] = rawObj[key];
      };
    };
    <span class="hljs-keyword">return</span> copyObj;
  };
  <span class="hljs-keyword">let</span> objA =  {<span class="hljs-string">"name"</span>:<span class="hljs-string">"苏南"</span>,<span class="hljs-string">"sex"</span>:<span class="hljs-string">"男"</span>,<span class="hljs-string">"height"</span>:<span class="hljs-string">"176"</span>};
  <span class="hljs-keyword">let</span> objB =  customClone(objA);
      objB.signature = <span class="hljs-string">"宝剑锋从磨砺出，梅花香自苦寒来，做有温度的攻城狮"</span>;

  <span class="hljs-built_in">console</span>.log(objA);
  <span class="hljs-built_in">console</span>.log(objB);
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbiLB5?w=1116&amp;h=684" src="https://static.alili.tech/img/bVbiLB5?w=1116&amp;h=684" alt="由@IT·平头哥联盟-首席填坑官∙苏南 分享，公众号：honeyBadger8,展示Object.assign拷贝问题" title="由@IT·平头哥联盟-首席填坑官∙苏南 分享，公众号：honeyBadger8,展示Object.assign拷贝问题" style="cursor: pointer;"></span></p>
<ul><li>
<strong>补充一个</strong> <code>Object.assign</code> 的坑 :</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  let data = {
    a:1,
    b:2,
    children:{
      name:&quot;苏南&quot;,
      organization:&quot;@IT·平头哥联盟&quot;,
      job:&quot;首席填坑官&quot;,
      address:&quot;ShenZhen&quot;,
      age:18
    }
  };
  let data2 = Object.assign({},data);
  data2.children.age = 28;
  data2.children.job = &quot;首席甩锅官&quot;;
  data2.b = 666;
  console.log(&quot;我是原始数据 data:&quot;,data);
  console.log(&quot;我是复制后的数据 data2:&quot;,data2);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code>  let data = {
    a:<span class="hljs-number">1</span>,
    <span class="hljs-keyword">b:2,
</span><span class="hljs-symbol">    children:</span>{
<span class="hljs-symbol">      name:</span><span class="hljs-string">"苏南"</span>,
<span class="hljs-symbol">      organization:</span><span class="hljs-string">"@IT·平头哥联盟"</span>,
<span class="hljs-symbol">      job:</span><span class="hljs-string">"首席填坑官"</span>,
<span class="hljs-symbol">      address:</span><span class="hljs-string">"ShenZhen"</span>,
<span class="hljs-symbol">      age:</span><span class="hljs-number">18</span>
    }
  }<span class="hljs-comment">;</span>
  let data2 = Object.assign({},data)<span class="hljs-comment">;</span>
  data2.children.age = <span class="hljs-number">28</span><span class="hljs-comment">;</span>
  data2.children.<span class="hljs-keyword">job </span>= <span class="hljs-string">"首席甩锅官"</span><span class="hljs-comment">;</span>
  data2.<span class="hljs-keyword">b </span>= <span class="hljs-number">666</span><span class="hljs-comment">;</span>
  console.log(<span class="hljs-string">"我是原始数据 data:"</span>,data)<span class="hljs-comment">;</span>
  console.log(<span class="hljs-string">"我是复制后的数据 data2:"</span>,data2)<span class="hljs-comment">;</span>
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbiLB7?w=1532&amp;h=904" src="https://static.alili.tech/img/bVbiLB7?w=1532&amp;h=904" alt="公众号：honeyBadger8,展示Object.assign拷贝问题" title="公众号：honeyBadger8,展示Object.assign拷贝问题" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader1">immutable 最后的一次回顾</h2>
<p>　　都说有了新欢，忘了旧爱，但我不是那种无情无义的人，最后正式介绍一下 <code>immutable</code>，为我俩的……画上一个圆满的句号：</p>
<p>　　再次强调，并不是觉得<code>immutable</code>不好，不够强大，只是自己个人观点，有些不喜欢而已，各位<code>immutable</code>粉勿喷，想了解更多的同学可以<a href="http://facebook.github.io/immutable-js/" rel="nofollow noreferrer" target="_blank">点击这里</a></p>
<blockquote>Immutable data encourages pure functions (data-in, data-out) and lends itself to much simpler application development and enabling techniques from functional programming such as lazy evaluation.</blockquote>
<h5>使用示例：</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  
  const list1 = List([ 1, 2, 3 ]);
  const list2 = List([ 4, 5, 6 ]);
  const array = [ 7, 8, 9 ];
  const list3 = list1.concat(list2, array);
  console.log(list3) // List&nbsp;{size: 9, _origin: 0, _capacity: 9, _level: 5, _root: null,&nbsp;…} 是不能直接获取到数据的，须使用get,-- list3.get(0)

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">  
  <span class="hljs-keyword">const</span> list1 = List([ <span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span> ]);
  <span class="hljs-keyword">const</span> list2 = List([ <span class="hljs-number">4</span>, <span class="hljs-number">5</span>, <span class="hljs-number">6</span> ]);
  <span class="hljs-keyword">const</span> array = [ <span class="hljs-number">7</span>, <span class="hljs-number">8</span>, <span class="hljs-number">9</span> ];
  <span class="hljs-keyword">const</span> list3 = list1.concat(list2, array);
  <span class="hljs-built_in">console</span>.log(list3) <span class="hljs-comment">// List&nbsp;{size: 9, _origin: 0, _capacity: 9, _level: 5, _root: null,&nbsp;…} 是不能直接获取到数据的，须使用get,-- list3.get(0)</span>

</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  
  let data = fromJS({
    obj:{}
  });
  let data1 = {
    a:1,
    b:2,
    children:{
      name:&quot;苏南&quot;,
    }
  };
  let data2 = data.mergeIn(['obj'],data1,{c:666});
  console.log(&quot;获取的数据：&quot;,data2.getIn(['obj','c']));
  console.log(&quot;这里是由formJS创建的数据：&quot;,data2.getIn(['obj','children','name']));//
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">  
  <span class="hljs-keyword">let</span> data = fromJS({
    <span class="hljs-attr">obj</span>:{}
  });
  <span class="hljs-keyword">let</span> data1 = {
    <span class="hljs-attr">a</span>:<span class="hljs-number">1</span>,
    <span class="hljs-attr">b</span>:<span class="hljs-number">2</span>,
    <span class="hljs-attr">children</span>:{
      <span class="hljs-attr">name</span>:<span class="hljs-string">"苏南"</span>,
    }
  };
  <span class="hljs-keyword">let</span> data2 = data.mergeIn([<span class="hljs-string">'obj'</span>],data1,{<span class="hljs-attr">c</span>:<span class="hljs-number">666</span>});
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"获取的数据："</span>,data2.getIn([<span class="hljs-string">'obj'</span>,<span class="hljs-string">'c'</span>]));
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"这里是由formJS创建的数据："</span>,data2.getIn([<span class="hljs-string">'obj'</span>,<span class="hljs-string">'children'</span>,<span class="hljs-string">'name'</span>]));<span class="hljs-comment">//</span>
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbiLCa?w=1368&amp;h=560" src="https://static.alili.tech/img/bVbiLCa?w=1368&amp;h=560" alt="公众号：honeyBadger8,展示Object.assign拷贝问题" title="公众号：honeyBadger8,展示Object.assign拷贝问题" style="cursor: pointer;"></span></p>
<blockquote>使用immutable后，所有数据都要类似选择器，一个一个往下选择，并不是说它不好、功能不够强大，只是自己有些不喜欢它类似JQuery选择器一样的语法,get、getIn、set、List等的使用方式，当然它也是可以使用 <code>toJS</code>方法转回来的。</blockquote>
<h2 id="articleHeader2">Immutability Helpers出场</h2>
<blockquote>gitHub上它对自己的介绍很简单：<code>Mutate a copy of data without changing the original source</code> —— 在不更改原始源的情况下改变数据副本。</blockquote>
<p>　　与它结缘，是因为它在react官方文档中出镜，而被我所宠幸，真的 ，<code>只是因为在人群中多看了它一眼再也没能忘掉</code>， 它跟<code>immutable</code>不一样，不会有那么多条条框框约束你，给你自由、给你独立的空间、给你独立的思想，让你想用即用、用之即走～～(泥马,怎么有点像张小龙说它的小程序一样😬),但您放心，它的坑真的比小程序少，API也很简洁，接下来来看一下，它的基本用法：</p>
<ul>
<li>
<code>$push</code> —— 数组;</li>
<li>
<code>$unshift</code> —— 数组;</li>
<li>
<code>$splice</code> —— 数组;</li>
<li>
<code>$set</code> —— 替换/覆盖/合并原数据;</li>
<li>
<code>$toggle</code> —— array of strings ，toggles a list of boolean fields from the target object；</li>
<li>
<code>$unset</code> —— remove the list of keys in array from the target object;</li>
<li>
<code>$merge</code> —— 合并对象;</li>
<li>
<code>$apply</code> ——  passes in the current value to the function and updates it with the new returned value；</li>
<li>
<code>$add</code> —— 新增;</li>
<li>
<code>$remove</code> —— 删除。</li>
</ul>
<blockquote>以上基本就是它全部的API了，下面一起来看看，具体用法吧：</blockquote>
<h4>$push 的使用 :</h4>
<ul><li>看名字就知道它的作用了啦，跟原生的<code>push</code>一样，不过写法有一点点不一样;</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  let arr = [1,2,3,4,5,66];
  let arr2 = update(arr,{
    $push : [&quot;a&quot;,&quot;b&quot;,&quot;c&quot;], //一定要 []号的形式哦，不可以 &quot;a&quot;;
    [4]:{ // ！！index ,可以指定修改下标的值
      $set:&quot;我是替换过的&quot;
    }
  });
  console.log(arr2);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">  <span class="hljs-keyword">let</span> arr = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">66</span>];
  <span class="hljs-keyword">let</span> arr2 = update(arr,{
    <span class="hljs-attr">$push</span> : [<span class="hljs-string">"a"</span>,<span class="hljs-string">"b"</span>,<span class="hljs-string">"c"</span>], <span class="hljs-comment">//一定要 []号的形式哦，不可以 "a";</span>
    [<span class="hljs-number">4</span>]:{ <span class="hljs-comment">// ！！index ,可以指定修改下标的值</span>
      $set:<span class="hljs-string">"我是替换过的"</span>
    }
  });
  <span class="hljs-built_in">console</span>.log(arr2);</code></pre>
<h4>$unshift 的使用 :</h4>
<ul><li>一样，跟原生的<code>unshift</code>,在原数组开头处插入，同样写法是以一个数组的形式;</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  let arr = [1,2,3,4,5,66];
  let arr2 = update(arr,{
    $unshift : [&quot;a&quot;,&quot;b&quot;,&quot;c&quot;],
    [4]:{
      $set:&quot;我是首席填坑官∙苏南&quot;  //这里需要注意，它的操作是在 unshift之前执行的，也就是在原 arr 上查找 第4个下标
    }
  });
  console.log(&quot;原始数组&quot;,arr);//&nbsp;[1, 2, 3, 4, 5, 66] 相互之间并不会影响
  console.log(arr2); //[&quot;a&quot;, &quot;b&quot;, &quot;c&quot;, 1, 2, 3, 4, &quot;我是首席填坑官∙苏南&quot;, 66]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">  <span class="hljs-keyword">let</span> arr = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">66</span>];
  <span class="hljs-keyword">let</span> arr2 = update(arr,{
    <span class="hljs-attr">$unshift</span> : [<span class="hljs-string">"a"</span>,<span class="hljs-string">"b"</span>,<span class="hljs-string">"c"</span>],
    [<span class="hljs-number">4</span>]:{
      <span class="hljs-attr">$set</span>:<span class="hljs-string">"我是首席填坑官∙苏南"</span>  <span class="hljs-comment">//这里需要注意，它的操作是在 unshift之前执行的，也就是在原 arr 上查找 第4个下标</span>
    }
  });
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"原始数组"</span>,arr);<span class="hljs-comment">//&nbsp;[1, 2, 3, 4, 5, 66] 相互之间并不会影响</span>
  <span class="hljs-built_in">console</span>.log(arr2); <span class="hljs-comment">//["a", "b", "c", 1, 2, 3, 4, "我是首席填坑官∙苏南", 66]</span></code></pre>
<h4>$splice 的使用 :</h4>
<ul><li>
<strong>注意</strong> ：数组套数组，start,end, 插入的数据……，;</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
  let arr = [1,2,3,4,5,66];
  let arr2 = update(arr,{
    $splice : [[1,2,[66788,99],{a:123,b:&quot;苏南&quot;}]], // or [0,1,&quot;从我开始是插入的内容&quot;,88,89,90,&quot;后面可以很多，是数组、对象、字符串都行&quot;]
  });
  console.log(arr2); 

  //复杂一些的用法：
  let obj={
    name:&quot;immutable&quot;,
    list :[1,2,[90,55,44,3,22,55],3,4,6,7,8]
  };
  let obj2 = update(obj,{
    list:{
      [2]:value=>update(value,{
        $splice:[[0,2]]  // [90,55,44,3,22,55] => [44, 3, 22, 55]
      })
    }
  });
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">
  <span class="hljs-keyword">let</span> arr = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">66</span>];
  <span class="hljs-keyword">let</span> arr2 = update(arr,{
    <span class="hljs-attr">$splice</span> : [[<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,[<span class="hljs-number">66788</span>,<span class="hljs-number">99</span>],{<span class="hljs-attr">a</span>:<span class="hljs-number">123</span>,<span class="hljs-attr">b</span>:<span class="hljs-string">"苏南"</span>}]], <span class="hljs-comment">// or [0,1,"从我开始是插入的内容",88,89,90,"后面可以很多，是数组、对象、字符串都行"]</span>
  });
  <span class="hljs-built_in">console</span>.log(arr2); 

  <span class="hljs-comment">//复杂一些的用法：</span>
  <span class="hljs-keyword">let</span> obj={
    <span class="hljs-attr">name</span>:<span class="hljs-string">"immutable"</span>,
    <span class="hljs-attr">list</span> :[<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,[<span class="hljs-number">90</span>,<span class="hljs-number">55</span>,<span class="hljs-number">44</span>,<span class="hljs-number">3</span>,<span class="hljs-number">22</span>,<span class="hljs-number">55</span>],<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">6</span>,<span class="hljs-number">7</span>,<span class="hljs-number">8</span>]
  };
  <span class="hljs-keyword">let</span> obj2 = update(obj,{
    <span class="hljs-attr">list</span>:{
      [<span class="hljs-number">2</span>]:<span class="hljs-function"><span class="hljs-params">value</span>=&gt;</span>update(value,{
        <span class="hljs-attr">$splice</span>:[[<span class="hljs-number">0</span>,<span class="hljs-number">2</span>]]  <span class="hljs-comment">// [90,55,44,3,22,55] =&gt; [44, 3, 22, 55]</span>
      })
    }
  });
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbiLCl?w=724&amp;h=334" src="https://static.alili.tech/img/bVbiLCl?w=724&amp;h=334" alt="由@IT·平头哥联盟-首席填坑官∙苏南 分享，公众号：honeyBadger8，immutability-helper $splice的使用展示" title="由@IT·平头哥联盟-首席填坑官∙苏南 分享，公众号：honeyBadger8，immutability-helper $splice的使用展示" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/bVbiLCo?w=1328&amp;h=372" src="https://static.alili.tech/img/bVbiLCo?w=1328&amp;h=372" alt="公众号：honeyBadger8，immutability-helper $splice的使用展示，格式错误的警告" title="公众号：honeyBadger8，immutability-helper $splice的使用展示，格式错误的警告" style="cursor: pointer;"></span></p>
<h4>$set 的使用 :</h4>
<ul><li>上面已经演示过了，其实有点替换的意思，当有重复的值时，就会覆盖，没有就新增,来展示复杂一点的场景,层级深的数据，也不会相互影响;</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  let obj={
    name:&quot;immutable&quot;,
    children:{
      address:&quot;ShenZhen&quot;,
      hobby:&quot;@IT·平头哥联盟-前端开发&quot;
    }
  };
  let obj2 = update(obj,{
    $set : {name:&quot;immutability-helper&quot;,other:&quot;其他字段,如微信公众号：honeyBadger8，每周为你带来最新分享&quot;}
  });
  let obj3 = update(obj,{
    name:{
      $set : &quot;苏南&quot;
    },
    children:{
      hobby:{
        $set:&quot;首席填坑官 - javascript&quot;
      }
    }
  });
  console.log(&quot;原始数据:&quot;,obj); 
  console.log(&quot;obj2:&quot;,obj2); 
  console.log(&quot;obj3&quot;,obj3); " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">  <span class="hljs-keyword">let</span> obj={
    <span class="hljs-attr">name</span>:<span class="hljs-string">"immutable"</span>,
    <span class="hljs-attr">children</span>:{
      <span class="hljs-attr">address</span>:<span class="hljs-string">"ShenZhen"</span>,
      <span class="hljs-attr">hobby</span>:<span class="hljs-string">"@IT·平头哥联盟-前端开发"</span>
    }
  };
  <span class="hljs-keyword">let</span> obj2 = update(obj,{
    <span class="hljs-attr">$set</span> : {<span class="hljs-attr">name</span>:<span class="hljs-string">"immutability-helper"</span>,<span class="hljs-attr">other</span>:<span class="hljs-string">"其他字段,如微信公众号：honeyBadger8，每周为你带来最新分享"</span>}
  });
  <span class="hljs-keyword">let</span> obj3 = update(obj,{
    <span class="hljs-attr">name</span>:{
      <span class="hljs-attr">$set</span> : <span class="hljs-string">"苏南"</span>
    },
    <span class="hljs-attr">children</span>:{
      <span class="hljs-attr">hobby</span>:{
        <span class="hljs-attr">$set</span>:<span class="hljs-string">"首席填坑官 - javascript"</span>
      }
    }
  });
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"原始数据:"</span>,obj); 
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"obj2:"</span>,obj2); 
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"obj3"</span>,obj3); </code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbiLCx?w=1376&amp;h=706" src="https://static.alili.tech/img/bVbiLCx?w=1376&amp;h=706" alt="公众号：honeyBadger8，immutability-helper $set的使用展示，1024请不要叫我程序园，我是有温度的攻城狮" title="公众号：honeyBadger8，immutability-helper $set的使用展示，1024请不要叫我程序园，我是有温度的攻城狮" style="cursor: pointer;"></span></p>
<h4>$toggle 的使用:</h4>
<ul>
<li>听名字，应该就能猜出来，开关切换的意思;</li>
<li>Boolean 布尔值的切换，如果你是强制要 <code>Numbe</code>r 类型 的 0、1，那么使用引方法的时候就要注意了；</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  let obj={
    name:&quot;immutable&quot;,
    a:false,
    b:true,
    c:1,
    d:0
  };
  let obj2 = update(obj,{
    $toggle:['b','a',&quot;c&quot;,&quot;d&quot;],
  });
  console.log(&quot;原始数据:&quot;,obj);
  console.log(&quot;obj2:&quot;,obj2);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">  <span class="hljs-keyword">let</span> obj={
    <span class="hljs-attr">name</span>:<span class="hljs-string">"immutable"</span>,
    <span class="hljs-attr">a</span>:<span class="hljs-literal">false</span>,
    <span class="hljs-attr">b</span>:<span class="hljs-literal">true</span>,
    <span class="hljs-attr">c</span>:<span class="hljs-number">1</span>,
    <span class="hljs-attr">d</span>:<span class="hljs-number">0</span>
  };
  <span class="hljs-keyword">let</span> obj2 = update(obj,{
    <span class="hljs-attr">$toggle</span>:[<span class="hljs-string">'b'</span>,<span class="hljs-string">'a'</span>,<span class="hljs-string">"c"</span>,<span class="hljs-string">"d"</span>],
  });
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"原始数据:"</span>,obj);
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"obj2:"</span>,obj2);
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbiLCz?w=1350&amp;h=514" src="https://static.alili.tech/img/bVbiLCz?w=1350&amp;h=514" alt="本文由@IT·平头哥联盟-首席填坑官∙苏南 分享，公众号：honeyBadger8,immutability-helper $toggle的使用展示，1024请不要叫我程序园，我是有温度的攻城狮" title="本文由@IT·平头哥联盟-首席填坑官∙苏南 分享，公众号：honeyBadger8,immutability-helper $toggle的使用展示，1024请不要叫我程序园，我是有温度的攻城狮" style="cursor: pointer;"></span></p>
<h4>$unset 的使用:</h4>
<ul><li>它跟$set相反，有点remove的味道，但又貌似有不同的之处，当操作的对象为<code>object</code>时key是删除了；而数组<code>array</code>中它的值没有了，却保留了<code>下标</code>，不改变数组的长度,删除数组建议还是用<code>$splice</code>；请看下图：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  let arr = [1,2,3,4,5,6];
  let obj={
    name:&quot;immutable&quot;,
    children:{
      address:&quot;ShenZhen&quot;,
      hobby:&quot;写博客&quot;
    }
  };
  let obj2 = update(obj,{
    $unset : [&quot;name&quot;],
    children:{
      $unset:[&quot;address&quot;]
    }
  });
  console.log(&quot;原始数据:&quot;,obj);
  console.log(&quot;obj2:&quot;,obj2);

  let arr2 = update(arr,{
    $unset : [1]
  });
  console.log(&quot;arr2:&quot;,arr2,arr2.length);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">  <span class="hljs-keyword">let</span> arr = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>];
  <span class="hljs-keyword">let</span> obj={
    <span class="hljs-attr">name</span>:<span class="hljs-string">"immutable"</span>,
    <span class="hljs-attr">children</span>:{
      <span class="hljs-attr">address</span>:<span class="hljs-string">"ShenZhen"</span>,
      <span class="hljs-attr">hobby</span>:<span class="hljs-string">"写博客"</span>
    }
  };
  <span class="hljs-keyword">let</span> obj2 = update(obj,{
    <span class="hljs-attr">$unset</span> : [<span class="hljs-string">"name"</span>],
    <span class="hljs-attr">children</span>:{
      <span class="hljs-attr">$unset</span>:[<span class="hljs-string">"address"</span>]
    }
  });
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"原始数据:"</span>,obj);
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"obj2:"</span>,obj2);

  <span class="hljs-keyword">let</span> arr2 = update(arr,{
    <span class="hljs-attr">$unset</span> : [<span class="hljs-number">1</span>]
  });
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"arr2:"</span>,arr2,arr2.length);
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbiLCE?w=1188&amp;h=710" src="https://static.alili.tech/img/bVbiLCE?w=1188&amp;h=710" alt="由@IT·平头哥联盟-首席填坑官∙苏南 分享，公众号：honeyBadger8,immutability-helper $unset的使用展示" title="由@IT·平头哥联盟-首席填坑官∙苏南 分享，公众号：honeyBadger8,immutability-helper $unset的使用展示" style="cursor: pointer;"></span></p>
<h4>$merge 的使用:</h4>
<ul><li>
<code>$merge</code> 跟我们最爱的<code>Object.assign</code>一样，做合并操作的，但它比<code>assign</code>优秀很多，深层次拷贝，不会相互影响 ：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  let arr = [1,2,3,4,5,6];
  let obj={
    name:&quot;immutable&quot;,
    children:{
      address:&quot;ShenZhen&quot;,
      hobby:&quot;写博客&quot;,
      array:[&quot;我不是程序员&quot;,&quot;切图崽了解一下&quot;],
    }
  };
  let obj2 = update(obj,{
    $merge:{
      arr
    },
    children:{
      array:{
        $merge:{items:[&quot;从前有坐山&quot;,&quot;山里有个庙&quot;]},
        $splice:[[3,0,&quot;住着一个小和尚&quot;]]
      }
    }
  });
  console.log(&quot;原始数据:&quot;,obj);
  console.log(&quot;obj2:&quot;,obj2);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">  <span class="hljs-keyword">let</span> arr = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>];
  <span class="hljs-keyword">let</span> obj={
    <span class="hljs-attr">name</span>:<span class="hljs-string">"immutable"</span>,
    <span class="hljs-attr">children</span>:{
      <span class="hljs-attr">address</span>:<span class="hljs-string">"ShenZhen"</span>,
      <span class="hljs-attr">hobby</span>:<span class="hljs-string">"写博客"</span>,
      <span class="hljs-attr">array</span>:[<span class="hljs-string">"我不是程序员"</span>,<span class="hljs-string">"切图崽了解一下"</span>],
    }
  };
  <span class="hljs-keyword">let</span> obj2 = update(obj,{
    <span class="hljs-attr">$merge</span>:{
      arr
    },
    <span class="hljs-attr">children</span>:{
      <span class="hljs-attr">array</span>:{
        <span class="hljs-attr">$merge</span>:{<span class="hljs-attr">items</span>:[<span class="hljs-string">"从前有坐山"</span>,<span class="hljs-string">"山里有个庙"</span>]},
        <span class="hljs-attr">$splice</span>:[[<span class="hljs-number">3</span>,<span class="hljs-number">0</span>,<span class="hljs-string">"住着一个小和尚"</span>]]
      }
    }
  });
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"原始数据:"</span>,obj);
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"obj2:"</span>,obj2);
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbiLCH?w=1166&amp;h=802" src="https://static.alili.tech/img/bVbiLCH?w=1166&amp;h=802" alt="公众号：honeyBadger8,immutability-helper $merge的使用展示，我是有温度的攻城狮" title="公众号：honeyBadger8,immutability-helper $merge的使用展示，我是有温度的攻城狮" style="cursor: pointer; display: inline;"></span></p>
<h4>$apply 的使用:</h4>
<ul>
<li>
<code>$apply</code> 基于当前值进行一个函数运算，从而得到新的值 ：</li>
<li>
<strong>注意</strong> ：它必须是一个 <code>function</code> 哦！</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  let obj={
    name:&quot;immutable&quot;,
    children:{
      items:[&quot;从前有一坐山&quot;],
      array: [1,2,3,4,5,6],
    }
  };
  let obj2 = update(obj,{
    name:{
      $apply:(val)=>(&quot;首席填坑官&quot;)
    },
    children:{
      items:{
        $apply:(val)=>{
          console.log(&quot;旧值&quot;,val);
          return [3,0,&quot;住着一个小和尚&quot;]
        }
      },
      array:{
        $apply:(val)=>(val.reverse()) //必须是一个函数
      }
    }
  });
  console.log(&quot;原始数据:&quot;,obj);
  console.log(&quot;obj2:&quot;,obj2);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code>  <span class="hljs-keyword">let</span> obj={
    name:<span class="hljs-string">"immutable"</span>,
    children:{
      items:[<span class="hljs-string">"从前有一坐山"</span>],
      array: [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>],
    }
  };
  <span class="hljs-keyword">let</span> obj2 = <span class="hljs-keyword">update</span>(obj,{
    name:{
      $apply:(val)=&gt;(<span class="hljs-string">"首席填坑官"</span>)
    },
    children:{
      items:{
        $apply:(val)=&gt;{
          console.log(<span class="hljs-string">"旧值"</span>,val);
          return [<span class="hljs-number">3</span>,<span class="hljs-number">0</span>,<span class="hljs-string">"住着一个小和尚"</span>]
        }
      },
      array:{
        $apply:(val)=&gt;(val.reverse()) //必须是一个函数
      }
    }
  });
  console.log(<span class="hljs-string">"原始数据:"</span>,obj);
  console.log(<span class="hljs-string">"obj2:"</span>,obj2);
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbiLCN?w=1424&amp;h=608" src="https://static.alili.tech/img/bVbiLCN?w=1424&amp;h=608" alt="公众号：honeyBadger8，immutability-helper $apply的使用展示" title="公众号：honeyBadger8，immutability-helper $apply的使用展示" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/bVbiLCR?w=1344&amp;h=482" src="https://static.alili.tech/img/bVbiLCR?w=1344&amp;h=482" alt="由@IT·平头哥联盟-首席填坑官∙苏南 分享，公众号：honeyBadger8,immutability-helper $apply的使用展示，必须是function" title="由@IT·平头哥联盟-首席填坑官∙苏南 分享，公众号：honeyBadger8,immutability-helper $apply的使用展示，必须是function" style="cursor: pointer;"></span></p>
<h4>$remove 的使用:</h4>
<ul>
<li>
<code>$remove</code> <strong>一定一定</strong> 要是使用<code>Set</code>、<code>Map</code> 创建的数组：</li>
<li>要删除的值，必须是数组成存在的，如值不存在则忽略，<code>$remove:[2,666]</code>，2会删除，6则会被忽略;</li>
<li>这个api有点奇怪，正常普通的数组 [],这样的删除不了！！；</li>
<li>常见错误如下图：</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  let obj={
    name:&quot;immutable&quot;,
    children:{
      array:new Set([1, 2, 3, 4, 4]),
    }
  };
  let obj2 = update(obj,{
    children:{
      array:{
        $remove:[2],
      },
    }
  });
  console.log(&quot;原始数据:&quot;,obj);
  console.log(&quot;obj2:&quot;,obj2);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">  <span class="hljs-keyword">let</span> obj={
    <span class="hljs-attr">name</span>:<span class="hljs-string">"immutable"</span>,
    <span class="hljs-attr">children</span>:{
      <span class="hljs-attr">array</span>:<span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">4</span>]),
    }
  };
  <span class="hljs-keyword">let</span> obj2 = update(obj,{
    <span class="hljs-attr">children</span>:{
      <span class="hljs-attr">array</span>:{
        <span class="hljs-attr">$remove</span>:[<span class="hljs-number">2</span>],
      },
    }
  });
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"原始数据:"</span>,obj);
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"obj2:"</span>,obj2);</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbiLCS?w=1260&amp;h=612" src="https://static.alili.tech/img/bVbiLCS?w=1260&amp;h=612" alt="immutability-helper $remove的使用展示，必须是 new Set Map创建" title="immutability-helper $remove的使用展示，必须是 new Set Map创建" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/bVbiLCT?w=1288&amp;h=336" src="https://static.alili.tech/img/bVbiLCT?w=1288&amp;h=336" alt="immutability-helper $remove的使用展示，必须是function，公众号：honeyBadger8" title="immutability-helper $remove的使用展示，必须是function，公众号：honeyBadger8" style="cursor: pointer;"></span></p>
<h4>$add 的使用:</h4>
<ul>
<li>
<code>$add</code> 跟刚才的 $remove 一样要使用Map/Set，$add方法也跟 <code>es6</code> <code>Map/Set</code>的 add方法一致：</li>
<li>只是写的时候也要注意一些， [ [] ] ，嵌套！</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  let obj={
    name:&quot;immutable&quot;,
    array:new Map([[&quot;a&quot;,1],[&quot;b&quot;,2]]),
  };
  let obj2 = update(obj,{
    array:{
      $add:[[&quot;66&quot;,56]],
    },
  });
  console.log(&quot;原始数据:&quot;,obj);
  console.log(&quot;obj2:&quot;,obj2);
  console.log(&quot;获取key a:&quot;,obj2.array.get('a'));
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">  <span class="hljs-keyword">let</span> obj={
    <span class="hljs-attr">name</span>:<span class="hljs-string">"immutable"</span>,
    <span class="hljs-attr">array</span>:<span class="hljs-keyword">new</span> <span class="hljs-built_in">Map</span>([[<span class="hljs-string">"a"</span>,<span class="hljs-number">1</span>],[<span class="hljs-string">"b"</span>,<span class="hljs-number">2</span>]]),
  };
  <span class="hljs-keyword">let</span> obj2 = update(obj,{
    <span class="hljs-attr">array</span>:{
      <span class="hljs-attr">$add</span>:[[<span class="hljs-string">"66"</span>,<span class="hljs-number">56</span>]],
    },
  });
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"原始数据:"</span>,obj);
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"obj2:"</span>,obj2);
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"获取key a:"</span>,obj2.array.get(<span class="hljs-string">'a'</span>));
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbiLC0?w=1346&amp;h=430" src="https://static.alili.tech/img/bVbiLC0?w=1346&amp;h=430" alt="本文由@IT·平头哥联盟-首席填坑官∙苏南 分享，公众号：honeyBadger8,immutability-helper $add的使用展示，必须是 new Set Map创建" title="本文由@IT·平头哥联盟-首席填坑官∙苏南 分享，公众号：honeyBadger8,immutability-helper $add的使用展示，必须是 new Set Map创建" style="cursor: pointer;"></span></p>
<h2 id="articleHeader3">Immutability Helpers的高阶用法：</h2>
<ul>
<li>还可以自定义方法，如 定义一个 <code>$trinocular</code> 方法，来判断数组中的值；</li>
<li>只是一个简单的示例，更多复杂的用法，可以自己去探索哦 <a href="https://github.com/kolodny/immutability-helper" rel="nofollow noreferrer" target="_blank">去官方 github 👈</a>
</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  update.extend('$trinocular', function(proportion, original) {
    return  original > 88 ? (original/proportion ): (proportion+original);
  });
  let array =[56,33,55,777,322,444,61,12,34,52,245];
  let array2 = array.map((k,v)=>update(k,{
    $trinocular:2
  }))
  console.log(&quot;原始数据:&quot;,array);
  console.log(&quot;array2:&quot;,array2);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code>  <span class="hljs-keyword">update</span>.extend(<span class="hljs-string">'$trinocular'</span>, <span class="hljs-keyword">function</span>(proportion, original) {
    return  original &gt; <span class="hljs-number">88</span> ? (original/proportion ): (proportion+original);
  });
  <span class="hljs-keyword">let</span> <span class="hljs-keyword">array</span> =[<span class="hljs-number">56</span>,<span class="hljs-number">33</span>,<span class="hljs-number">55</span>,<span class="hljs-number">777</span>,<span class="hljs-number">322</span>,<span class="hljs-number">444</span>,<span class="hljs-number">61</span>,<span class="hljs-number">12</span>,<span class="hljs-number">34</span>,<span class="hljs-number">52</span>,<span class="hljs-number">245</span>];
  <span class="hljs-keyword">let</span> array2 = <span class="hljs-keyword">array</span>.<span class="hljs-keyword">map</span>((k,v)=&gt;<span class="hljs-keyword">update</span>(k,{
    $trinocular:<span class="hljs-number">2</span>
  }))
  console.log(<span class="hljs-string">"原始数据:"</span>,<span class="hljs-keyword">array</span>);
  console.log(<span class="hljs-string">"array2:"</span>,array2);</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbiLC6?w=1360&amp;h=150" src="https://static.alili.tech/img/bVbiLC6?w=1360&amp;h=150" alt="本文由@IT·平头哥联盟-首席填坑官∙苏南 分享，公众号：honeyBadger8，immutability-helper 高阶用法" title="本文由@IT·平头哥联盟-首席填坑官∙苏南 分享，公众号：honeyBadger8，immutability-helper 高阶用法" style="cursor: pointer;"></span></p>
<h2 id="articleHeader4">总结/结尾：</h2>
<p>　　以上就是基础 API 的用法 ，添加了一些官方示例，没有讲到的组合使用，以及使用过程中，可能出现的一些错误，需要留意的地方，更多定制高级用法，有兴趣的同学可以自行了解一下。</p>
<p>　　以上就是今天为大家带来的分享，它可能没有 <code>immutable</code> 那么多功能，但贵在简洁，不会有太多的约束，如理解有误之处，欢迎各位大佬纠正，毕竟我还只是个宝宝——新手上路中！🤪。</p>
<p>　　下方是我弄的一个<strong>公众号</strong>，欢迎关注，以后文章会第一时间，在<strong>公众号</strong>上更新，原因是之前分享的有两篇文章，竟然被其他公众号抄袭了😭，前些天去更新发表的时候，微信提示我文章已经不是原创了检测到相同的文章，宝宝心里那个凉啊～，果断申诉告了对方(是一个培训学校公众号，好气哦)，补了掘金发布的链接和截图日期，万幸最后胜诉了🤗！👇👇</p>
<p><span class="img-wrap"><img data-src="/img/bVbiLDa?w=600&amp;h=336" src="https://static.alili.tech/img/bVbiLDa?w=600&amp;h=336" alt="宝剑锋从磨砺出，梅花香自苦寒来，做有温度的攻城狮!，公众号：honeyBadger8" title="宝剑锋从磨砺出，梅花香自苦寒来，做有温度的攻城狮!，公众号：honeyBadger8" style="cursor: pointer;"></span></p>
<h4>更多文章：</h4>
<p><a href="https://blog.csdn.net/weixin_43254766/article/details/82811714" rel="nofollow noreferrer" target="_blank">做完小程序项目、老板给我加了6k薪资～</a><br><a href="https://blog.csdn.net/weixin_43254766/article/details/83119712" rel="nofollow noreferrer" target="_blank">面试踩过的坑，都在这里了～</a><br><a href="https://blog.csdn.net/weixin_43254766/article/details/83267838" rel="nofollow noreferrer" target="_blank">你应该做的前端性能优化之总结大全！</a><br><a href="https://blog.csdn.net/weixin_43254766/article/details/83618630" rel="nofollow noreferrer" target="_blank">如何给localStorage设置一个过期时间？</a><br><a href="https://blog.csdn.net/weixin_43254766/article/details/83267817" rel="nofollow noreferrer" target="_blank">手把手教你如何绘制一辆会跑车</a><br><a href="https://blog.csdn.net/weixin_43254766/article/details/83472829" rel="nofollow noreferrer" target="_blank">如何用CSS3画出懂你的3D魔方？</a><br><a href="https://blog.csdn.net/weixin_43254766/article/details/82800822" rel="nofollow noreferrer" target="_blank">SVG Sprites Icon的使用技巧</a></p>
<blockquote>作者：苏南 - <a href="https://github.com/meibin08/" rel="nofollow noreferrer" target="_blank">首席填坑官</a><br>链接：<a href="https://honeybadger8.github.io/blog/" rel="nofollow noreferrer" target="_blank">https://honeybadger8.github.i...</a><br>交流：912594095、公众号：<code>honeyBadger8</code><br>本文原创，著作权归作者所有。商业转载请联系<code>@IT·平头哥联盟</code>获得授权，非商业转载请注明原链接及出处。</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
immutability因React官方出镜之使用总结分享！

## 原文链接
[https://segmentfault.com/a/1190000016826994](https://segmentfault.com/a/1190000016826994)

