---
title: 'js 简单的推箱子小游戏步骤解析--大家都玩过的' 
date: 2018-12-18 2:30:11
hidden: true
slug: qt5m2cp1f4
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>推箱子小游戏大家肯定都玩过，之所以写这篇文章，是觉得这个小游戏足够简单好理解，大家看完文章之后，自己也能花上半天功夫敲出一个推箱子小游戏来，如果喜欢的话可以点波赞，或者关注一下，希望本文可以帮到大家。</p>
<blockquote>本文首发于我的个人blog：<a href="http://obkoro1.com/" rel="nofollow noreferrer" target="_blank">obkoro1.com</a>
</blockquote>
<h3 id="articleHeader1">demo：<a href="http://obkoro1.com/web_accumulate/example/pushKoro/index.html" rel="nofollow noreferrer" target="_blank">推箱子小游戏</a>
</h3>
<h2 id="articleHeader2">步骤解析：</h2>
<p><strong>本文代码已经放在了<a href="https://github.com/OBKoro1/web_accumulate/blob/d6b599ca22d8656d3f31f80bffa976fac36d2d75/example/pushKoro/index.html" rel="nofollow noreferrer" target="_blank">github</a>上面了,里面也进行了很详细的代码注释，可以copy下来，在本地运行一下看看</strong>。</p>
<h3 id="articleHeader3">1. 渲染地图</h3>
<ol><li>html结构：</li></ol>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012760460?w=503&amp;h=727" src="https://static.alili.tech/img/remote/1460000012760460?w=503&amp;h=727" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    html结构十分简单，只要弄一堆div，来放置地图的class就可以了，我这里初始化了12*9个div，地图里最多九行高度。   
    这些div都是同样大小，地图渲染出来区别的只是颜色的不同。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>    html结构十分简单，只要弄一堆<span class="hljs-keyword">div</span>，来放置地图的<span class="hljs-built_in">class</span>就可以了，我这里初始化了<span class="hljs-number">12</span>*<span class="hljs-number">9</span>个<span class="hljs-keyword">div</span>，地图里最多九行高度。   
    这些<span class="hljs-keyword">div</span>都是同样大小，地图渲染出来区别的只是颜色的不同。
</code></pre>
<ol><li>
<p>地图函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   var box=$('.box div'); //地图使用的div集合
   function create(){ //创建地图函数
   box.each(function(index){ //index的数量是固定的，是box div下面div的数量
        // 每次创建地图初始化div
       box.eq(index).removeClass();
   });
   box.each(function(index,element){ //循环整个div的数量 二维数组里数量不够的 默认为空白
   //level为关卡数 根据关卡渲染地图 builder为二维数组，为地图关卡
       if(builder[level][index]){ //过滤0
           box.eq(index).addClass('type'+builder[level][index]);
       }
   });
   box.eq(origin[level]).addClass(&quot;pusher&quot;); //推箱人 皮卡丘位置
   }

   //第一关的地图长这样（下面只是栗子，不是代码），0代表不可抵达区域，1代表目标（要被推到的地方），
   //2代表普通路径（可以走的），3代表墙，4代表箱子
   [0,0,0,0,3,3,3,0,0,0,0,0,
   0,0,0,0,3,1,3,0,0,0,0,0,
   0,0,0,0,3,2,3,3,3,3,0,0,
   0,0,3,3,3,4,2,4,1,3,0,0,
   0,0,3,1,2,4,2,3,3,3,0,0,
   0,0,3,3,3,3,4,3,0,0,0,0,
   0,0,0,0,0,3,1,3,0,0,0,0,
   0,0,0,0,0,3,3,3,0,0,0,0] 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>   var box=$('.box div'); <span class="hljs-comment">//地图使用的div集合</span>
   function create(){ <span class="hljs-comment">//创建地图函数</span>
   box.each(function(index){ <span class="hljs-comment">//index的数量是固定的，是box div下面div的数量</span>
        <span class="hljs-comment">// 每次创建地图初始化div</span>
       box.eq(index).removeClass();
   });
   box.each(function(index,element){ <span class="hljs-comment">//循环整个div的数量 二维数组里数量不够的 默认为空白</span>
   <span class="hljs-comment">//level为关卡数 根据关卡渲染地图 builder为二维数组，为地图关卡</span>
       if(builder[level][index]){ <span class="hljs-comment">//过滤0</span>
           box.eq(index).addClass('type'+builder[level][index]);
       }
   });
   box.eq(origin[level]).addClass(<span class="hljs-string">"pusher"</span>); <span class="hljs-comment">//推箱人 皮卡丘位置</span>
   }

   <span class="hljs-comment">//第一关的地图长这样（下面只是栗子，不是代码），0代表不可抵达区域，1代表目标（要被推到的地方），</span>
   <span class="hljs-comment">//2代表普通路径（可以走的），3代表墙，4代表箱子</span>
   [<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">3</span>,<span class="hljs-number">3</span>,<span class="hljs-number">3</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,
   <span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">3</span>,<span class="hljs-number">1</span>,<span class="hljs-number">3</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,
   <span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">3</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">3</span>,<span class="hljs-number">3</span>,<span class="hljs-number">3</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,
   <span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">3</span>,<span class="hljs-number">3</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">2</span>,<span class="hljs-number">4</span>,<span class="hljs-number">1</span>,<span class="hljs-number">3</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,
   <span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">3</span>,<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">4</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">3</span>,<span class="hljs-number">3</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,
   <span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">3</span>,<span class="hljs-number">3</span>,<span class="hljs-number">3</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">3</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,
   <span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">3</span>,<span class="hljs-number">1</span>,<span class="hljs-number">3</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,
   <span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">3</span>,<span class="hljs-number">3</span>,<span class="hljs-number">3</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>] 
</code></pre>
</li></ol>
<h3 id="articleHeader4">2. 捕获键盘事件,判断是否可以移动</h3>
<p>使用<a href="http://www.w3school.com.cn/jquery/event_keydown.asp" rel="nofollow noreferrer" target="_blank">$(document).keydown()</a>jqery事件，捕获键盘事件。</p>
<ol>
<li>
<p>捕获键盘事件，上下左右以及wsad。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  $(document).keydown(function (e) {
   var key=e.which;
   switch(key){
   //col 的值为12，上下移动要12个div为一个周期
   //方向键上或者w
   case 87:
   case 38:
       move(-col);//判断移动函数
   break;
   //方向键下或者s
   case 83:
   case 40:
      move(col);
   break;
   //方向键左或者a
   case 65:
   case 37:
       move(-1);
   break;
   //方向键右或者d
   case 68:
   case 39:
       move(1);
   break;
   }
  setTimeout(win,500); //按键之后调判断是否过关
  });
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>  $(<span class="hljs-built_in">document</span>).keydown(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
   <span class="hljs-keyword">var</span> key=e.which;
   <span class="hljs-keyword">switch</span>(key){
   <span class="hljs-comment">//col 的值为12，上下移动要12个div为一个周期</span>
   <span class="hljs-comment">//方向键上或者w</span>
   <span class="hljs-keyword">case</span> <span class="hljs-number">87</span>:
   <span class="hljs-keyword">case</span> <span class="hljs-number">38</span>:
       move(-col);<span class="hljs-comment">//判断移动函数</span>
   <span class="hljs-keyword">break</span>;
   <span class="hljs-comment">//方向键下或者s</span>
   <span class="hljs-keyword">case</span> <span class="hljs-number">83</span>:
   <span class="hljs-keyword">case</span> <span class="hljs-number">40</span>:
      move(col);
   <span class="hljs-keyword">break</span>;
   <span class="hljs-comment">//方向键左或者a</span>
   <span class="hljs-keyword">case</span> <span class="hljs-number">65</span>:
   <span class="hljs-keyword">case</span> <span class="hljs-number">37</span>:
       move(<span class="hljs-number">-1</span>);
   <span class="hljs-keyword">break</span>;
   <span class="hljs-comment">//方向键右或者d</span>
   <span class="hljs-keyword">case</span> <span class="hljs-number">68</span>:
   <span class="hljs-keyword">case</span> <span class="hljs-number">39</span>:
       move(<span class="hljs-number">1</span>);
   <span class="hljs-keyword">break</span>;
   }
  setTimeout(win,<span class="hljs-number">500</span>); <span class="hljs-comment">//按键之后调判断是否过关</span>
  });
</code></pre>
</li>
<li>判断是否可以移动。</li>
</ol>
<p>分为两个判断条件：一个是推箱子，一个是不推箱子 自然移动，否则不移动皮卡丘。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    function move(step){ //是否移动判断
         // 分为两个判断条件一个是推箱子，一个是不推箱子 自然移动。 否则不移动皮卡丘
         //step 上下是12个div一个周期，左右是1个div positin是皮卡丘的原来位置
        var pikaqiu1=box.eq(position);//皮卡丘现在的地方
        var pikaqiu2=box.eq(position+step);//皮卡丘要去的下一个地方
        var pushBox=box.eq(position+step*2);//箱子要去的下一个地方
        if(!pikaqiu2.hasClass('type4')&amp;&amp;( pikaqiu2.hasClass('type1')||pikaqiu2.hasClass('type2'))){ //自然移动
            //判断：如果下一个div的class不包含type4(箱子)，并且 下一个div含有type1(目标位置)，或者type2(普通路径)
            //这一步和下一步判断是否有type4的原因是普通路径会变成有type4的路径，这时候就会出现问题
            pikaqiu1.removeClass(&quot;pusher&quot;); //移除当前皮卡丘
            pikaqiu2.addClass(&quot;pusher&quot;);//移动皮卡丘到下一个位置
            position=position+step;//增加position值
        }
        else if((pikaqiu2.hasClass('type4'))&amp;&amp;(!pushBox.hasClass('type4'))&amp;&amp;(pushBox.hasClass('type1')|| pushBox.hasClass('type2')) ) {
            //推箱子    
            //如果下一个div的class包含type4(箱子)并且 不包含重叠type4(箱子) 并且 包含class type1（目标位置）或者 包含type2(空路)
           pikaqiu2.removeClass('type4');//移除当前箱子
            pikaqiu1.removeClass(&quot;pusher&quot;);//移除当前皮卡丘
            pushBox.addClass('type4');//移动箱子到下一个位置
            pikaqiu2.addClass(&quot;pusher&quot;).addClass(&quot;type2&quot;);//
            //本来是type4 移除之后，这里没有class了，要变成普通路径
            position=position+step;//增加position值 
        }
    }    
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code>    function <span class="hljs-built_in">move</span>(<span class="hljs-built_in">step</span>){ <span class="hljs-comment">//是否移动判断</span>
         <span class="hljs-comment">// 分为两个判断条件一个是推箱子，一个是不推箱子 自然移动。 否则不移动皮卡丘</span>
         <span class="hljs-comment">//step 上下是12个div一个周期，左右是1个div positin是皮卡丘的原来位置</span>
        var pikaqiu1=box.eq(<span class="hljs-built_in">position</span>);<span class="hljs-comment">//皮卡丘现在的地方</span>
        var pikaqiu2=box.eq(<span class="hljs-built_in">position</span>+<span class="hljs-built_in">step</span>);<span class="hljs-comment">//皮卡丘要去的下一个地方</span>
        var pushBox=box.eq(<span class="hljs-built_in">position</span>+<span class="hljs-built_in">step</span>*<span class="hljs-number">2</span>);<span class="hljs-comment">//箱子要去的下一个地方</span>
        <span class="hljs-built_in">if</span>(!pikaqiu2.hasClass(<span class="hljs-string">'type4'</span>)&amp;&amp;( pikaqiu2.hasClass(<span class="hljs-string">'type1'</span>)||pikaqiu2.hasClass(<span class="hljs-string">'type2'</span>))){ <span class="hljs-comment">//自然移动</span>
            <span class="hljs-comment">//判断：如果下一个div的class不包含type4(箱子)，并且 下一个div含有type1(目标位置)，或者type2(普通路径)</span>
            <span class="hljs-comment">//这一步和下一步判断是否有type4的原因是普通路径会变成有type4的路径，这时候就会出现问题</span>
            pikaqiu1.removeClass(<span class="hljs-string">"pusher"</span>); <span class="hljs-comment">//移除当前皮卡丘</span>
            pikaqiu2.addClass(<span class="hljs-string">"pusher"</span>);<span class="hljs-comment">//移动皮卡丘到下一个位置</span>
            <span class="hljs-built_in">position</span>=<span class="hljs-built_in">position</span>+<span class="hljs-built_in">step</span>;<span class="hljs-comment">//增加position值</span>
        }
        <span class="hljs-built_in">else</span> <span class="hljs-built_in">if</span>((pikaqiu2.hasClass(<span class="hljs-string">'type4'</span>))&amp;&amp;(!pushBox.hasClass(<span class="hljs-string">'type4'</span>))&amp;&amp;(pushBox.hasClass(<span class="hljs-string">'type1'</span>)|| pushBox.hasClass(<span class="hljs-string">'type2'</span>)) ) {
            <span class="hljs-comment">//推箱子    </span>
            <span class="hljs-comment">//如果下一个div的class包含type4(箱子)并且 不包含重叠type4(箱子) 并且 包含class type1（目标位置）或者 包含type2(空路)</span>
           pikaqiu2.removeClass(<span class="hljs-string">'type4'</span>);<span class="hljs-comment">//移除当前箱子</span>
            pikaqiu1.removeClass(<span class="hljs-string">"pusher"</span>);<span class="hljs-comment">//移除当前皮卡丘</span>
            pushBox.addClass(<span class="hljs-string">'type4'</span>);<span class="hljs-comment">//移动箱子到下一个位置</span>
            pikaqiu2.addClass(<span class="hljs-string">"pusher"</span>).addClass(<span class="hljs-string">"type2"</span>);<span class="hljs-comment">//</span>
            <span class="hljs-comment">//本来是type4 移除之后，这里没有class了，要变成普通路径</span>
            <span class="hljs-built_in">position</span>=<span class="hljs-built_in">position</span>+<span class="hljs-built_in">step</span>;<span class="hljs-comment">//增加position值 </span>
        }
    }    
</code></pre>
<h3 id="articleHeader5">3.胜利判断：</h3>
<p>每次移动都要调用这个胜利判断。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function win(){ //胜利条件判断
    if($(&quot;.type1.type4&quot;).length===goal){ //推的箱子与关卡设置通过箱子的数量对比
        if(level<9) {
            alert(&quot;666，挑战下一关吧--OBKoro1&quot;);
            level++; //关卡+1
            goal = goalList[level];
            position = origin[level];
            create();
        }else {
            alert(&quot;厉害啊 大佬 通关了都&quot;);
        }
    }
}

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">win</span>(<span class="hljs-params"></span>)</span>{ <span class="hljs-comment">//胜利条件判断</span>
    <span class="hljs-keyword">if</span>($(<span class="hljs-string">".type1.type4"</span>).length===goal){ <span class="hljs-comment">//推的箱子与关卡设置通过箱子的数量对比</span>
        <span class="hljs-keyword">if</span>(level&lt;<span class="hljs-number">9</span>) {
            alert(<span class="hljs-string">"666，挑战下一关吧--OBKoro1"</span>);
            level++; <span class="hljs-comment">//关卡+1</span>
            goal = goalList[level];
            position = origin[level];
            create();
        }<span class="hljs-keyword">else</span> {
            alert(<span class="hljs-string">"厉害啊 大佬 通关了都"</span>);
        }
    }
}

</code></pre>
<h3 id="articleHeader6">
<a href="https://github.com/OBKoro1/web_accumulate/blob/d6b599ca22d8656d3f31f80bffa976fac36d2d75/example/pushKoro/index.html" rel="nofollow noreferrer" target="_blank">代码地址</a>、<a href="http://obkoro1.com/web_accumulate/example/pushKoro/index.html" rel="nofollow noreferrer" target="_blank">demo地址</a>
</h3>
<h2 id="articleHeader7">结语</h2>
<p>本文到这里就结束了，喜欢的话，赶紧自己去敲一个出来，希望本文可以帮助大家发散思维。</p>
<p><strong>最后</strong>：如需转载，请放上原文链接并署名。码字不易，<strong>感谢</strong>支持！本人写文章本着交流记录的心态，写的不好之处，不撕逼，但是欢迎指点。然后就是希望看完的朋友点个<strong>喜欢</strong>，也可以<strong>关注</strong>一下我。<br><strong><a href="http://obkoro1.com/" rel="nofollow noreferrer" target="_blank">个人blog</a></strong> and <strong><a href="https://juejin.im/user/58714f0eb123db4a2eb95372" rel="nofollow noreferrer" target="_blank">掘金个人主页</a></strong>  </p>
<p>以上2018.1.7</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
js 简单的推箱子小游戏步骤解析--大家都玩过的

## 原文链接
[https://segmentfault.com/a/1190000012760454](https://segmentfault.com/a/1190000012760454)

