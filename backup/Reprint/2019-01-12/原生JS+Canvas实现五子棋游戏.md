---
title: '原生JS+Canvas实现五子棋游戏' 
date: 2019-01-12 2:30:24
hidden: true
slug: ttxrrkxx989
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">一、功能模块</h2>
<p>先看下现在做完的效果：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009826653?w=481&amp;h=640" src="https://static.alili.tech/img/remote/1460000009826653?w=481&amp;h=640" alt="效果图" title="效果图" style="cursor: pointer; display: inline;"></span></p>
<p>线上体验：<a href="https://wj704.github.io/five_game.html" rel="nofollow noreferrer" target="_blank">https://wj704.github.io/five_...</a><br>主要功能模块为：<br>1.人机对战功能<br>2.悔棋功能<br>3.撤销悔棋功能</p>
<h2 id="articleHeader1">二、代码详解</h2>
<h3 id="articleHeader2">2.1 人机对战功能实现</h3>
<p>从效果图可以看到，棋盘的横竖可以放的位置为15*15，通过canvas画棋盘：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        //绘画棋盘
        var drawChessBoard = function(){
            for(var i = 0; i < 15; i++){
                context.moveTo(15 + i * 30 , 15);
                context.lineTo(15 + i * 30 , 435);
                context.stroke();
                context.moveTo(15 , 15 + i * 30);
                context.lineTo(435 , 15 + i * 30);
                context.stroke();
            }
        }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>        <span class="hljs-comment">//绘画棋盘</span>
        var drawChessBoard = function(){
            for(var i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">15</span>; i++){
                context.moveTo(<span class="hljs-number">15</span> + i * <span class="hljs-number">30</span> , <span class="hljs-number">15</span>);
                context.lineTo(<span class="hljs-number">15</span> + i * <span class="hljs-number">30</span> , <span class="hljs-number">435</span>);
                context.stroke();
                context.moveTo(<span class="hljs-number">15</span> , <span class="hljs-number">15</span> + i * <span class="hljs-number">30</span>);
                context.lineTo(<span class="hljs-number">435</span> , <span class="hljs-number">15</span> + i * <span class="hljs-number">30</span>);
                context.stroke();
            }
        }
</code></pre>
<p>知道格子数后，我们先看五子棋有多少种赢法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="             //赢法数组
            var wins = [];
            for(var i = 0; i < 15; i++){
                wins[i] = [];
                for(var j = 0; j < 15; j++){
                    wins[i][j] = [];
                }
            }
            var count = 0; //赢法总数
            //横线赢法
            for(var i = 0; i < 15; i++){
                for(var j = 0; j < 11; j++){
                    for(var k = 0; k < 5; k++){
                        wins[i][j+k][count] = true;
                    }
                    count++;
                }
            }

            //竖线赢法
            for(var i = 0; i < 15; i++){
                for(var j = 0; j < 11; j++){
                    for(var k = 0; k < 5; k++){
                        wins[j+k][i][count] = true;
                    }
                    count++;
                }
            }

            //正斜线赢法
            for(var i = 0; i < 11; i++){
                for(var j = 0; j < 11; j++){
                    for(var k = 0; k < 5; k++){
                        wins[i+k][j+k][count] = true;
                    }
                    count++;
                }
            }

            //反斜线赢法
            for(var i = 0; i < 11; i++){ 
                for(var j = 14; j > 3; j--){
                    for(var k = 0; k < 5; k++){
                        wins[i+k][j-k][count] = true;
                    }
                    count++;
                }
            }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs swift"><code>             <span class="hljs-comment">//赢法数组</span>
            <span class="hljs-keyword">var</span> wins = [];
            <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">15</span>; i++){
                wins[i] = [];
                <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> j = <span class="hljs-number">0</span>; j &lt; <span class="hljs-number">15</span>; j++){
                    wins[i][j] = [];
                }
            }
            <span class="hljs-keyword">var</span> <span class="hljs-built_in">count</span> = <span class="hljs-number">0</span>; <span class="hljs-comment">//赢法总数</span>
            <span class="hljs-comment">//横线赢法</span>
            <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">15</span>; i++){
                <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> j = <span class="hljs-number">0</span>; j &lt; <span class="hljs-number">11</span>; j++){
                    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> k = <span class="hljs-number">0</span>; k &lt; <span class="hljs-number">5</span>; k++){
                        wins[i][j+k][<span class="hljs-built_in">count</span>] = <span class="hljs-literal">true</span>;
                    }
                    <span class="hljs-built_in">count</span>++;
                }
            }

            <span class="hljs-comment">//竖线赢法</span>
            <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">15</span>; i++){
                <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> j = <span class="hljs-number">0</span>; j &lt; <span class="hljs-number">11</span>; j++){
                    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> k = <span class="hljs-number">0</span>; k &lt; <span class="hljs-number">5</span>; k++){
                        wins[j+k][i][<span class="hljs-built_in">count</span>] = <span class="hljs-literal">true</span>;
                    }
                    <span class="hljs-built_in">count</span>++;
                }
            }

            <span class="hljs-comment">//正斜线赢法</span>
            <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">11</span>; i++){
                <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> j = <span class="hljs-number">0</span>; j &lt; <span class="hljs-number">11</span>; j++){
                    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> k = <span class="hljs-number">0</span>; k &lt; <span class="hljs-number">5</span>; k++){
                        wins[i+k][j+k][<span class="hljs-built_in">count</span>] = <span class="hljs-literal">true</span>;
                    }
                    <span class="hljs-built_in">count</span>++;
                }
            }

            <span class="hljs-comment">//反斜线赢法</span>
            <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">11</span>; i++){ 
                <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> j = <span class="hljs-number">14</span>; j &gt; <span class="hljs-number">3</span>; j--){
                    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> k = <span class="hljs-number">0</span>; k &lt; <span class="hljs-number">5</span>; k++){
                        wins[i+k][j-k][<span class="hljs-built_in">count</span>] = <span class="hljs-literal">true</span>;
                    }
                    <span class="hljs-built_in">count</span>++;
                }
            }
</code></pre>
<p>根据赢法总数定义分别保存计算机和人赢法的数组：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    for(var i = 0; i < count; i++){
                myWin[i] = 0;
                _myWin[i] = 0;
                computerWin[i] = 0;
                _compWin[i] = 0;
     }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs abnf"><code>    for(var i = <span class="hljs-number">0</span><span class="hljs-comment">; i &lt; count; i++){</span>
                myWin[i] = <span class="hljs-number">0</span><span class="hljs-comment">;</span>
                _myWin[i] = <span class="hljs-number">0</span><span class="hljs-comment">;</span>
                computerWin[i] = <span class="hljs-number">0</span><span class="hljs-comment">;</span>
                _compWin[i] = <span class="hljs-number">0</span><span class="hljs-comment">;</span>
     }
</code></pre>
<p>然后就是人开始下棋：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    // 我，下棋
    chess.onclick = function(e){
        if(over){ // 游戏结束
            return;
        }
        if(!me){
            return;
        }
        var x = e.offsetX;
        var y = e.offsetY;
        var i = Math.floor(x / 30);
        var j = Math.floor(y / 30);
        _nowi = i;
        _nowj = j;
        if(chressBord[i][j] == 0){
            oneStep(i,j,me);
            chressBord[i][j] = 1; //我，已占位置        
                        
            for(var k = 0; k < count; k++){ // 将可能赢的情况都加1
                if(wins[i][j][k]){
                    myWin[k]++;
                    _compWin[k] = computerWin[k]; // 为悔棋做准备
                    computerWin[k] = 6;//这个位置对方不可能赢了
                    if(myWin[k] == 5){
                        resultTxt.innerHTML = '恭喜，你赢了！';
                        over = true;
                    }
                }
            }
            if(!over){
                me = !me;
                computerAI();
            }
        }
        // 悔棋功能可用
        backbtn.className = backbtn.className.replace( new RegExp( &quot;(\\s|^)unable(\\s|$)&quot; ),&quot; &quot; );          
    }
    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>    <span class="hljs-comment">// 我，下棋</span>
    chess.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
        <span class="hljs-keyword">if</span>(over){ <span class="hljs-comment">// 游戏结束</span>
            <span class="hljs-keyword">return</span>;
        }
        <span class="hljs-keyword">if</span>(!me){
            <span class="hljs-keyword">return</span>;
        }
        <span class="hljs-keyword">var</span> x = e.offsetX;
        <span class="hljs-keyword">var</span> y = e.offsetY;
        <span class="hljs-keyword">var</span> i = <span class="hljs-built_in">Math</span>.floor(x / <span class="hljs-number">30</span>);
        <span class="hljs-keyword">var</span> j = <span class="hljs-built_in">Math</span>.floor(y / <span class="hljs-number">30</span>);
        _nowi = i;
        _nowj = j;
        <span class="hljs-keyword">if</span>(chressBord[i][j] == <span class="hljs-number">0</span>){
            oneStep(i,j,me);
            chressBord[i][j] = <span class="hljs-number">1</span>; <span class="hljs-comment">//我，已占位置        </span>
                        
            <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> k = <span class="hljs-number">0</span>; k &lt; count; k++){ <span class="hljs-comment">// 将可能赢的情况都加1</span>
                <span class="hljs-keyword">if</span>(wins[i][j][k]){
                    myWin[k]++;
                    _compWin[k] = computerWin[k]; <span class="hljs-comment">// 为悔棋做准备</span>
                    computerWin[k] = <span class="hljs-number">6</span>;<span class="hljs-comment">//这个位置对方不可能赢了</span>
                    <span class="hljs-keyword">if</span>(myWin[k] == <span class="hljs-number">5</span>){
                        resultTxt.innerHTML = <span class="hljs-string">'恭喜，你赢了！'</span>;
                        over = <span class="hljs-literal">true</span>;
                    }
                }
            }
            <span class="hljs-keyword">if</span>(!over){
                me = !me;
                computerAI();
            }
        }
        <span class="hljs-comment">// 悔棋功能可用</span>
        backbtn.className = backbtn.className.replace( <span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>( <span class="hljs-string">"(\\s|^)unable(\\s|$)"</span> ),<span class="hljs-string">" "</span> );          
    }
    </code></pre>
<p>oneStep() 方法为落子，要在棋盘上画一个棋子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        //画棋子
        var oneStep = function(i,j,me){
            // debugger;
            context.beginPath();
            context.arc(15 + i * 30, 15 + j * 30, 13, 0, 2 * Math.PI);//画圆
            context.closePath();
            //渐变
            var gradient = context.createRadialGradient(15 + i * 30 + 2, 15 + j * 30 - 2, 13, 15 + i * 30 + 2, 15 + j * 30 - 2, 0);

            if(me){
                gradient.addColorStop(0,'#0a0a0a');
                gradient.addColorStop(1,'#636766');
            }else{
                gradient.addColorStop(0,'#d1d1d1');
                gradient.addColorStop(1,'#f9f9f9');
            }
            context.fillStyle = gradient;
            context.fill();
        }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>        <span class="hljs-comment">//画棋子</span>
        var oneStep = function(i,j,me){
            <span class="hljs-comment">// debugger;</span>
            context.beginPath();
            context.arc(<span class="hljs-number">15</span> + i * <span class="hljs-number">30</span>, <span class="hljs-number">15</span> + j * <span class="hljs-number">30</span>, <span class="hljs-number">13</span>, <span class="hljs-number">0</span>, <span class="hljs-number">2</span> * Math.<span class="hljs-literal">PI</span>);<span class="hljs-comment">//画圆</span>
            context.closePath();
            <span class="hljs-comment">//渐变</span>
            var gradient = context.createRadialGradient(<span class="hljs-number">15</span> + i * <span class="hljs-number">30</span> + <span class="hljs-number">2</span>, <span class="hljs-number">15</span> + j * <span class="hljs-number">30</span> - <span class="hljs-number">2</span>, <span class="hljs-number">13</span>, <span class="hljs-number">15</span> + i * <span class="hljs-number">30</span> + <span class="hljs-number">2</span>, <span class="hljs-number">15</span> + j * <span class="hljs-number">30</span> - <span class="hljs-number">2</span>, <span class="hljs-number">0</span>);

            if(me){
                gradient.addColorStop(<span class="hljs-number">0</span>,'#<span class="hljs-number">0</span>a0a0a');
                gradient.addColorStop(<span class="hljs-number">1</span>,'#<span class="hljs-number">636766</span>');
            }else{
                gradient.addColorStop(<span class="hljs-number">0</span>,'#d1d1d1');
                gradient.addColorStop(<span class="hljs-number">1</span>,'#f9f9f9');
            }
            context.fillStyle = gradient;
            context.fill();
        }
</code></pre>
<p>接着看计算机怎么下棋，具体看computerAI()方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        // 计算机下棋
        var computerAI = function (){
            var myScore = [];
            var computerScore = [];
            var max = 0;
            var u = 0, v = 0;
            for(var i = 0; i < 15; i++){
                myScore[i] = [];
                computerScore[i] = [];
                for(var j = 0; j < 15; j++){
                    myScore[i][j] = 0;
                    computerScore[i][j] = 0;
                }
            }
            for(var i = 0; i < 15; i++){
                for(var j = 0; j < 15; j++){
                    if(chressBord[i][j] == 0){
                        for(var k = 0; k < count; k++){
                            if(wins[i][j][k]){
                                if(myWin[k] == 1){
                                    myScore[i][j] += 200;
                                }else if(myWin[k] == 2){
                                    myScore[i][j] += 400;
                                }else if(myWin[k] == 3){
                                    myScore[i][j] += 2000;
                                }else if(myWin[k] == 4){
                                    myScore[i][j] += 10000;
                                }
                                
                                if(computerWin[k] == 1){
                                    computerScore[i][j] += 220;
                                }else if(computerWin[k] == 2){
                                    computerScore[i][j] += 420;
                                }else if(computerWin[k] == 3){
                                    computerScore[i][j] += 2100;
                                }else if(computerWin[k] == 4){
                                    computerScore[i][j] += 20000;
                                }                        
                            }
                        }
                        
                        if(myScore[i][j] > max){
                            max  = myScore[i][j];
                            u = i;
                            v = j;
                        }else if(myScore[i][j] == max){
                            if(computerScore[i][j] > computerScore[u][v]){
                                u = i;
                                v = j;    
                            }
                        }
                        
                        if(computerScore[i][j] > max){
                            max  = computerScore[i][j];
                            u = i;
                            v = j;
                        }else if(computerScore[i][j] == max){
                            if(myScore[i][j] > myScore[u][v]){
                                u = i;
                                v = j;    
                            }
                        }
                        
                    }
                }
            }
            _compi = u;
            _compj = v;
            oneStep(u,v,false);
            chressBord[u][v] = 2;  //计算机占据位置
            for(var k = 0; k < count; k++){
                if(wins[u][v][k]){
                    computerWin[k]++;
                    _myWin[k] = myWin[k];
                    myWin[k] = 6;//这个位置对方不可能赢了
                    if(computerWin[k] == 5){
                        resultTxt.innerHTML = 'o(╯□╰)o，计算机赢了，继续加油哦！';
                        over = true;
                    }
                }
            }
            if(!over){
                me = !me;
            }
        }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs prolog"><code>        // 计算机下棋
        var computerAI = function (){
            var myScore = [];
            var computerScore = [];
            var max = <span class="hljs-number">0</span>;
            var u = <span class="hljs-number">0</span>, v = <span class="hljs-number">0</span>;
            for(var i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">15</span>; i++){
                myScore[i] = [];
                computerScore[i] = [];
                for(var j = <span class="hljs-number">0</span>; j &lt; <span class="hljs-number">15</span>; j++){
                    myScore[i][j] = <span class="hljs-number">0</span>;
                    computerScore[i][j] = <span class="hljs-number">0</span>;
                }
            }
            for(var i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">15</span>; i++){
                for(var j = <span class="hljs-number">0</span>; j &lt; <span class="hljs-number">15</span>; j++){
                    if(chressBord[i][j] == <span class="hljs-number">0</span>){
                        for(var k = <span class="hljs-number">0</span>; k &lt; count; k++){
                            if(wins[i][j][k]){
                                if(myWin[k] == <span class="hljs-number">1</span>){
                                    myScore[i][j] += <span class="hljs-number">200</span>;
                                }else if(myWin[k] == <span class="hljs-number">2</span>){
                                    myScore[i][j] += <span class="hljs-number">400</span>;
                                }else if(myWin[k] == <span class="hljs-number">3</span>){
                                    myScore[i][j] += <span class="hljs-number">2000</span>;
                                }else if(myWin[k] == <span class="hljs-number">4</span>){
                                    myScore[i][j] += <span class="hljs-number">10000</span>;
                                }
                                
                                if(computerWin[k] == <span class="hljs-number">1</span>){
                                    computerScore[i][j] += <span class="hljs-number">220</span>;
                                }else if(computerWin[k] == <span class="hljs-number">2</span>){
                                    computerScore[i][j] += <span class="hljs-number">420</span>;
                                }else if(computerWin[k] == <span class="hljs-number">3</span>){
                                    computerScore[i][j] += <span class="hljs-number">2100</span>;
                                }else if(computerWin[k] == <span class="hljs-number">4</span>){
                                    computerScore[i][j] += <span class="hljs-number">20000</span>;
                                }                        
                            }
                        }
                        
                        if(myScore[i][j] &gt; max){
                            max  = myScore[i][j];
                            u = i;
                            v = j;
                        }else if(myScore[i][j] == max){
                            if(computerScore[i][j] &gt; computerScore[u][v]){
                                u = i;
                                v = j;    
                            }
                        }
                        
                        if(computerScore[i][j] &gt; max){
                            max  = computerScore[i][j];
                            u = i;
                            v = j;
                        }else if(computerScore[i][j] == max){
                            if(myScore[i][j] &gt; myScore[u][v]){
                                u = i;
                                v = j;    
                            }
                        }
                        
                    }
                }
            }
            <span class="hljs-symbol">_compi</span> = u;
            <span class="hljs-symbol">_compj</span> = v;
            oneStep(u,v,false);
            chressBord[u][v] = <span class="hljs-number">2</span>;  //计算机占据位置
            for(var k = <span class="hljs-number">0</span>; k &lt; count; k++){
                if(wins[u][v][k]){
                    computerWin[k]++;
                    <span class="hljs-symbol">_myWin</span>[k] = myWin[k];
                    myWin[k] = <span class="hljs-number">6</span>;//这个位置对方不可能赢了
                    if(computerWin[k] == <span class="hljs-number">5</span>){
                        resultTxt.innerHTML = <span class="hljs-string">'o(╯□╰)o，计算机赢了，继续加油哦！'</span>;
                        over = true;
                    }
                }
            }
            if(!over){
                me = !me;
            }
        }</code></pre>
<p>根据相应的权重，计算出计算机应该落子的位置。</p>
<h3 id="articleHeader3">2.2 悔棋功能</h3>
<p>要提的是，这里暂时只能悔一步棋。悔棋功能主要关键点是：1、销毁刚刚下的棋子；2、将之前不可能赢的状态还原；看下具体的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="            // 悔棋
            backbtn.onclick = function(e){
                if(!backAble) { return;}
                over = false;
                me = true;
               
                // 我，悔棋
                chressBord[_nowi][_nowj] = 0; //我，已占位置 还原
                minusStep(_nowi, _nowj); //销毁棋子                                  
                for(var k = 0; k < count; k++){ // 将可能赢的情况都减1
                    if(wins[_nowi][_nowj][k]){
                        myWin[k]--;
                        computerWin[k] = _compWin[k];//这个位置对方可能赢
                    }
                }

                // 计算机相应的悔棋
                chressBord[_compi][_compj] = 0; //计算机，已占位置 还原
                minusStep(_compi, _compj); //销毁棋子                                  
                for(var k = 0; k < count; k++){ // 将可能赢的情况都减1
                    if(wins[_compi][_compj][k]){
                        computerWin[k]--;
                        myWin[k] = _myWin[i];//这个位置对方可能赢
                    }
                }
                resultTxt.innerHTML = '--益智五子棋--';
                returnAble = true;
                backAble = false;
                 // 撤销悔棋功能可用
                returnbtn.className = returnbtn.className.replace( new RegExp( &quot;(\\s|^)unable(\\s|$)&quot; ),&quot; &quot; ); 
            }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sqf"><code>            <span class="hljs-comment">// 悔棋</span>
            backbtn.onclick = function(e){
                <span class="hljs-keyword">if</span>(!backAble) { return;}
                over = <span class="hljs-literal">false</span>;
                me = <span class="hljs-literal">true</span>;
               
                <span class="hljs-comment">// 我，悔棋</span>
                chressBord[<span class="hljs-variable">_nowi</span>][<span class="hljs-variable">_nowj</span>] = <span class="hljs-number">0</span>; <span class="hljs-comment">//我，已占位置 还原</span>
                minusStep(<span class="hljs-variable">_nowi</span>, <span class="hljs-variable">_nowj</span>); <span class="hljs-comment">//销毁棋子                                  </span>
                <span class="hljs-keyword">for</span>(var k = <span class="hljs-number">0</span>; k &lt; <span class="hljs-built_in">count</span>; k++){ <span class="hljs-comment">// 将可能赢的情况都减1</span>
                    <span class="hljs-keyword">if</span>(wins[<span class="hljs-variable">_nowi</span>][<span class="hljs-variable">_nowj</span>][k]){
                        myWin[k]--;
                        computerWin[k] = <span class="hljs-variable">_compWin</span>[k];<span class="hljs-comment">//这个位置对方可能赢</span>
                    }
                }

                <span class="hljs-comment">// 计算机相应的悔棋</span>
                chressBord[<span class="hljs-variable">_compi</span>][<span class="hljs-variable">_compj</span>] = <span class="hljs-number">0</span>; <span class="hljs-comment">//计算机，已占位置 还原</span>
                minusStep(<span class="hljs-variable">_compi</span>, <span class="hljs-variable">_compj</span>); <span class="hljs-comment">//销毁棋子                                  </span>
                <span class="hljs-keyword">for</span>(var k = <span class="hljs-number">0</span>; k &lt; <span class="hljs-built_in">count</span>; k++){ <span class="hljs-comment">// 将可能赢的情况都减1</span>
                    <span class="hljs-keyword">if</span>(wins[<span class="hljs-variable">_compi</span>][<span class="hljs-variable">_compj</span>][k]){
                        computerWin[k]--;
                        myWin[k] = <span class="hljs-variable">_myWin</span>[i];<span class="hljs-comment">//这个位置对方可能赢</span>
                    }
                }
                resultTxt.innerHTML = <span class="hljs-string">'--益智五子棋--'</span>;
                returnAble = <span class="hljs-literal">true</span>;
                backAble = <span class="hljs-literal">false</span>;
                 <span class="hljs-comment">// 撤销悔棋功能可用</span>
                returnbtn.<span class="hljs-built_in">className</span> = returnbtn.<span class="hljs-built_in">className</span>.replace( new RegExp( <span class="hljs-string">"(\\s|^)unable(\\s|$)"</span> ),<span class="hljs-string">" "</span> ); 
            }</code></pre>
<p>minusStep()为销毁棋子的方法，我们看下是怎么销毁的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="         //销毁棋子
         var minusStep = function(i,j) {
            //擦除该圆
            context.clearRect((i) * 30, (j) * 30, 30, 30);

            // 重画该圆周围的格子
            context.beginPath();
            context.moveTo(15+i*30 , j*30);
            context.lineTo(15+i*30 , j*30 + 30);

            context.moveTo(i*30, j*30+15);
            context.lineTo((i+1)*30 , j*30+15);
        
            context.stroke();
        }
        " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>         <span class="hljs-comment">//销毁棋子</span>
         var minusStep = function(i,j) {
            <span class="hljs-comment">//擦除该圆</span>
            context.clearRect((i) * <span class="hljs-number">30</span>, (j) * <span class="hljs-number">30</span>, <span class="hljs-number">30</span>, <span class="hljs-number">30</span>);

            <span class="hljs-comment">// 重画该圆周围的格子</span>
            context.beginPath();
            context.moveTo(<span class="hljs-number">15</span>+i*<span class="hljs-number">30</span> , j*<span class="hljs-number">30</span>);
            context.lineTo(<span class="hljs-number">15</span>+i*<span class="hljs-number">30</span> , j*<span class="hljs-number">30</span> + <span class="hljs-number">30</span>);

            context.moveTo(i*<span class="hljs-number">30</span>, j*<span class="hljs-number">30</span>+<span class="hljs-number">15</span>);
            context.lineTo((i+<span class="hljs-number">1</span>)*<span class="hljs-number">30</span> , j*<span class="hljs-number">30</span>+<span class="hljs-number">15</span>);
        
            context.stroke();
        }
        </code></pre>
<p>首先通过clearRect()擦掉该圆，然后再重新画该圆周围的格子，注意相应的位置，这里花了些时间折腾。</p>
<h3 id="articleHeader4">2.3 撤销悔棋功能</h3>
<p>悔棋过后，再撤销，相当于还原悔棋之前的状态。代码比较简单：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        // 撤销悔棋
        returnbtn.onclick = function(e){
            if(!returnAble) { return; }
            // 我，撤销悔棋
            chressBord[_nowi][_nowj] = 1; //我，已占位置 
            oneStep(_nowi,_nowj,me);                              
            for(var k = 0; k < count; k++){ 
                if(wins[_nowi][_nowj][k]){
                    myWin[k]++;
                    _compWin[k] = computerWin[k];
                    computerWin[k] = 6;//这个位置对方不可能赢
                }
                if(myWin[k] == 5){           
                    resultTxt.innerHTML = '恭喜，你赢了！';
                    over = true;
                }
            }

            // 计算机撤销相应的悔棋
            chressBord[_compi][_compj] = 2; //计算机，已占位置   
            oneStep(_compi,_compj,false);                               
            for(var k = 0; k < count; k++){ 
                if(wins[_compi][_compj][k]){
                    computerWin[k]++;
                    _myWin[k] = myWin[k];
                    myWin[k] = 6;//这个位置对方不可能赢
                }
                if(computerWin[k] == 5){
                    resultTxt.innerHTML = 'o(╯□╰)o，计算机赢了，继续加油哦！';
                    over = true;
                }
            }
            returnbtn.className += 'unable';
            returnAble = false;
            backAble = true;
        }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sqf"><code>        <span class="hljs-comment">// 撤销悔棋</span>
        returnbtn.onclick = function(e){
            <span class="hljs-keyword">if</span>(!returnAble) { return; }
            <span class="hljs-comment">// 我，撤销悔棋</span>
            chressBord[<span class="hljs-variable">_nowi</span>][<span class="hljs-variable">_nowj</span>] = <span class="hljs-number">1</span>; <span class="hljs-comment">//我，已占位置 </span>
            oneStep(<span class="hljs-variable">_nowi</span>,<span class="hljs-variable">_nowj</span>,me);                              
            <span class="hljs-keyword">for</span>(var k = <span class="hljs-number">0</span>; k &lt; <span class="hljs-built_in">count</span>; k++){ 
                <span class="hljs-keyword">if</span>(wins[<span class="hljs-variable">_nowi</span>][<span class="hljs-variable">_nowj</span>][k]){
                    myWin[k]++;
                    <span class="hljs-variable">_compWin</span>[k] = computerWin[k];
                    computerWin[k] = <span class="hljs-number">6</span>;<span class="hljs-comment">//这个位置对方不可能赢</span>
                }
                <span class="hljs-keyword">if</span>(myWin[k] == <span class="hljs-number">5</span>){           
                    resultTxt.innerHTML = <span class="hljs-string">'恭喜，你赢了！'</span>;
                    over = <span class="hljs-literal">true</span>;
                }
            }

            <span class="hljs-comment">// 计算机撤销相应的悔棋</span>
            chressBord[<span class="hljs-variable">_compi</span>][<span class="hljs-variable">_compj</span>] = <span class="hljs-number">2</span>; <span class="hljs-comment">//计算机，已占位置   </span>
            oneStep(<span class="hljs-variable">_compi</span>,<span class="hljs-variable">_compj</span>,<span class="hljs-literal">false</span>);                               
            <span class="hljs-keyword">for</span>(var k = <span class="hljs-number">0</span>; k &lt; <span class="hljs-built_in">count</span>; k++){ 
                <span class="hljs-keyword">if</span>(wins[<span class="hljs-variable">_compi</span>][<span class="hljs-variable">_compj</span>][k]){
                    computerWin[k]++;
                    <span class="hljs-variable">_myWin</span>[k] = myWin[k];
                    myWin[k] = <span class="hljs-number">6</span>;<span class="hljs-comment">//这个位置对方不可能赢</span>
                }
                <span class="hljs-keyword">if</span>(computerWin[k] == <span class="hljs-number">5</span>){
                    resultTxt.innerHTML = <span class="hljs-string">'o(╯□╰)o，计算机赢了，继续加油哦！'</span>;
                    over = <span class="hljs-literal">true</span>;
                }
            }
            returnbtn.<span class="hljs-built_in">className</span> += <span class="hljs-string">'unable'</span>;
            returnAble = <span class="hljs-literal">false</span>;
            backAble = <span class="hljs-literal">true</span>;
        }
</code></pre>
<p>至此，比较简单的完成了这三个功能。</p>
<h2 id="articleHeader5">三、总结</h2>
<p>五子棋游戏的核心关键点是：1、弄清楚有多少种赢法；2、怎么判断是否已经赢了；3、计算机下棋算法。这里巧妙地运用数组存储赢法，判断是否赢了，通过权重比较，计算出计算机该下棋的位置。<br>过程中用到canvas，之前有学习过，虽然很久没用，查了些资料，复习了怎么画线，画圆，学会了怎么如何清除一个圆等。<br>然后要注意的是，用原生Js怎么为元素添加、删除class。<br>最后代码放到github上了，地址：<a href="https://github.com/wj704/wj704.github.io/blob/master/five_game.html" rel="nofollow noreferrer" target="_blank">https://github.com/wj704/wj70...</a><br>参考资料：<br><a href="http://www.cnblogs.com/gdcgy/p/5379159.html" rel="nofollow noreferrer" target="_blank"></a><a href="http://www.cnblogs.com/gdcgy/p/5379159.html" rel="nofollow noreferrer" target="_blank">http://www.cnblogs.com/gdcgy/...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
原生JS+Canvas实现五子棋游戏

## 原文链接
[https://segmentfault.com/a/1190000009826648](https://segmentfault.com/a/1190000009826648)

