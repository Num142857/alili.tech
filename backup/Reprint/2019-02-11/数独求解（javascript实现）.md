---
title: '数独求解（javascript实现）' 
date: 2019-02-11 2:30:49
hidden: true
slug: j3jx48tunak
categories: [reprint]
---

{{< raw >}}

                    
<p>看《算法的乐趣》，试着用非递归穷举来解数独，看效率如何！</p>
<h2 id="articleHeader0">数独规则</h2>
<p>数独游戏，经典的为9×9=81个单元格组成的九宫格，同时也形成了3×3=9个小九宫格，要求在81个小单元格中填入数字1~9，并且数字在每行每列及每个小九宫格中都不能重复。</p>
<h2 id="articleHeader1">数独技巧</h2>
<ul>
<li><p>直观法</p></li>
<li><p>候选数法</p></li>
<li><p>相关二十格：一个数字只与其所在行列及小九宫格的二十格相关</p></li>
</ul>
<h2 id="articleHeader2">我的思路</h2>
<ul>
<li><p>精心设计了有效性判定函数，最多一次遍历81个小单元格就能做出方案的有效性判定。</p></li>
<li><p>同理设计了相关20格判定，一次0~9的循环就完成有效性判定。</p></li>
<li><p>用数组模拟堆栈，为搜索提供回溯信息。</p></li>
<li><p>利用对象具有map性质，来辅助判断方案的有效性，大大简化了算法。</p></li>
</ul>
<h2 id="articleHeader3">方案设计与实现</h2>
<p>只用了一个二维数组存储数独方案，一个一维数组作堆栈，一个布尔变量作回溯标识。</p>
<h3 id="articleHeader4">变量定义</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var problem = [                //这是书上提到的难度10.7的题
    [8,0,0,0,0,0,0,0,0],
    [0,0,3,6,0,0,0,0,0],
    [0,7,0,0,9,0,2,0,0],
    [0,5,0,0,0,7,0,0,0],
    [0,0,0,0,4,5,7,0,0],
    [0,0,0,1,0,0,0,3,0],
    [0,0,1,0,0,0,0,6,8],
    [0,0,8,5,0,0,0,1,0],
    [0,9,0,0,0,0,4,0,0]
]
var stack = [],flag = false;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>var problem = [                <span class="hljs-comment">//这是书上提到的难度10.7的题</span>
    [<span class="hljs-number">8</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>],
    [<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">3</span>,<span class="hljs-number">6</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>],
    [<span class="hljs-number">0</span>,<span class="hljs-number">7</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">9</span>,<span class="hljs-number">0</span>,<span class="hljs-number">2</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>],
    [<span class="hljs-number">0</span>,<span class="hljs-number">5</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">7</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>],
    [<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">7</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>],
    [<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">1</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">3</span>,<span class="hljs-number">0</span>],
    [<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">1</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">6</span>,<span class="hljs-number">8</span>],
    [<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">8</span>,<span class="hljs-number">5</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">1</span>,<span class="hljs-number">0</span>],
    [<span class="hljs-number">0</span>,<span class="hljs-number">9</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">4</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>]
]
var stack = [],flag = false;</code></pre>
<h3 id="articleHeader5">方案有效性判定</h3>
<p>充分利用了javascript对象的哈希特性，为了方便调试，判定有效时函数的返回值为0，无效时分三种情况，行冲突、列冲突、小九宫格冲突，分别返回1，2，3。前期判定用了它，后来增加了相关二十格判定，在找答案时这个函数就用不上了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function checkValid(sudo){
    let subSudo = {}                        //辅助变量，用来判定小九宫格是否冲突
    for(let i = 0; i<9; i++){
        let row = {}, col = {}              //辅助变量，用来判定行、列是否冲突
        for(let j = 0; j<9; j++){
            let cur1 = sudo[i][j], cur2 = sudo[j][i]            //一次内循环同时完成行列的判定
            if(row[cur1])                    //当前元素已经在行中出现，优化掉零的判断，key为0时值为0，不需要额外判断
                return 1;                    //返回错误代码
            else
                row[cur1] = cur1            //当前元素未在行中出现，存入辅助变量中   
            if(col[cur2])                    //列的判定与行类似，优化掉零的判断，key为0时值为0，不需要额外判断
                return 2;
            else
                col[cur2] = cur2;
            let key = Math.floor(i/3)+'-'+Math.floor(j/3)        //为不同的小九宫格生成不同的key
            if(subSudo[key]){                 //小九宫格中已经有元素，优化掉零的判断，key为0时值为0，不需要额外判断
                if(subSudo[key][cur1])        //对某一个小九宫格的判定与行类似
                    return 3
                else
                    subSudo[key][cur1] = cur1
            }else{                            //这是某小九宫格中的第一个元素
                subSudo[key] = {}             //为小九宫格新建一个辅助变量，并将第一个元素存入其中
                subSudo[key][cur1] = cur1
            }                  
        }
    }
    return 0;                                //程序能运行到这，说明方案有效
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gauss"><code>function checkValid(sudo){
    <span class="hljs-keyword">let</span> subSudo = {}                        <span class="hljs-comment">//辅助变量，用来判定小九宫格是否冲突</span>
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i&lt;<span class="hljs-number">9</span>; i++){
        <span class="hljs-keyword">let</span> row = {}, col = {}              <span class="hljs-comment">//辅助变量，用来判定行、列是否冲突</span>
        <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> j = <span class="hljs-number">0</span>; j&lt;<span class="hljs-number">9</span>; j++){
            <span class="hljs-keyword">let</span> cur1 = sudo[i][j], cur2 = sudo[j][i]            <span class="hljs-comment">//一次内循环同时完成行列的判定</span>
            <span class="hljs-keyword">if</span>(row[cur1])                    <span class="hljs-comment">//当前元素已经在行中出现，优化掉零的判断，key为0时值为0，不需要额外判断</span>
                <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>;                    <span class="hljs-comment">//返回错误代码</span>
            <span class="hljs-keyword">else</span>
                row[cur1] = cur1            <span class="hljs-comment">//当前元素未在行中出现，存入辅助变量中   </span>
            <span class="hljs-keyword">if</span>(col[cur2])                    <span class="hljs-comment">//列的判定与行类似，优化掉零的判断，key为0时值为0，不需要额外判断</span>
                <span class="hljs-keyword">return</span> <span class="hljs-number">2</span>;
            <span class="hljs-keyword">else</span>
                col[cur2] = cur2;
            <span class="hljs-keyword">let</span> <span class="hljs-built_in">key</span> = Math.<span class="hljs-built_in">floor</span>(i/<span class="hljs-number">3</span>)+'-'+Math.<span class="hljs-built_in">floor</span>(j/<span class="hljs-number">3</span>)        <span class="hljs-comment">//为不同的小九宫格生成不同的key</span>
            <span class="hljs-keyword">if</span>(subSudo[<span class="hljs-built_in">key</span>]){                 <span class="hljs-comment">//小九宫格中已经有元素，优化掉零的判断，key为0时值为0，不需要额外判断</span>
                <span class="hljs-keyword">if</span>(subSudo[<span class="hljs-built_in">key</span>][cur1])        <span class="hljs-comment">//对某一个小九宫格的判定与行类似</span>
                    <span class="hljs-keyword">return</span> <span class="hljs-number">3</span>
                <span class="hljs-keyword">else</span>
                    subSudo[<span class="hljs-built_in">key</span>][cur1] = cur1
            }<span class="hljs-keyword">else</span>{                            <span class="hljs-comment">//这是某小九宫格中的第一个元素</span>
                subSudo[<span class="hljs-built_in">key</span>] = {}             <span class="hljs-comment">//为小九宫格新建一个辅助变量，并将第一个元素存入其中</span>
                subSudo[<span class="hljs-built_in">key</span>][cur1] = cur1
            }                  
        }
    }
    <span class="hljs-keyword">return</span> <span class="hljs-number">0</span>;                                <span class="hljs-comment">//程序能运行到这，说明方案有效</span>
}</code></pre>
<h3 id="articleHeader6">相关二十格判定</h3>
<p>原理同整体判定，亮点在小九宫格的定位上。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function check20Grid(sudo,i,j){                
    let row = {}, col = {}, subSudo = {}                //辅助变量
    for(let k = 0; k < 9; k++){
        let cur1 = sudo[i][k], cur2 = sudo[k][j]
        if(cur1){                                        //当前元素已经在行中出现，优化掉零的判断，key为0时值为0，不需要额外判断
            if(row[cur1])
                return 1;                                //返回错误代码
            else
                row[cur1] = cur1                        //当前元素未在行中出现，存入辅助变量中
        }
        if(cur2){                                        //列的判定与行类似，优化掉零的判断，key为0时值为0，不需要额外判断
            if(col[cur2])
                return 2;
            else
                col[cur2] = cur2;
        }
        //转化循环变量到小九宫格的坐标
        let key = sudo[Math.floor(i/3)*3 + Math.floor(k/3)][Math.floor(j/3)*3+Math.floor(k%3)]
        if(subSudo[key])                                //九宫格判定与行类似，优化掉零的判断，key为0时值为0，不需要额外判断
            return 3
        else
            subSudo[key] = key
    }
    return 0;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>function check20Grid(sudo,i,j){                
    <span class="hljs-built_in">let</span> <span class="hljs-built_in">row</span> = {}, <span class="hljs-built_in">col</span> = {}, subSudo = {}                //辅助变量
    <span class="hljs-keyword">for</span>(<span class="hljs-built_in">let</span> k = <span class="hljs-number">0</span>; k &lt; <span class="hljs-number">9</span>; k++){
        <span class="hljs-built_in">let</span> cur1 = sudo[i][k], cur2 = sudo[k][j]
        <span class="hljs-keyword">if</span>(cur1){                                        //当前元素已经在行中出现，优化掉零的判断，<span class="hljs-built_in">key</span>为<span class="hljs-number">0</span>时值为<span class="hljs-number">0</span>，不需要额外判断
            <span class="hljs-keyword">if</span>(<span class="hljs-built_in">row</span>[cur1])
                <span class="hljs-built_in">return</span> <span class="hljs-number">1</span>;                                //返回错误代码
            <span class="hljs-keyword">else</span>
                <span class="hljs-built_in">row</span>[cur1] = cur1                        //当前元素未在行中出现，存入辅助变量中
        }
        <span class="hljs-keyword">if</span>(cur2){                                        //列的判定与行类似，优化掉零的判断，<span class="hljs-built_in">key</span>为<span class="hljs-number">0</span>时值为<span class="hljs-number">0</span>，不需要额外判断
            <span class="hljs-keyword">if</span>(<span class="hljs-built_in">col</span>[cur2])
                <span class="hljs-built_in">return</span> <span class="hljs-number">2</span>;
            <span class="hljs-keyword">else</span>
                <span class="hljs-built_in">col</span>[cur2] = cur2;
        }
        //转化循环变量到小九宫格的坐标
        <span class="hljs-built_in">let</span> <span class="hljs-built_in">key</span> = sudo[Math.<span class="hljs-built_in">floor</span>(i/<span class="hljs-number">3</span>)*<span class="hljs-number">3</span> + Math.<span class="hljs-built_in">floor</span>(k/<span class="hljs-number">3</span>)][Math.<span class="hljs-built_in">floor</span>(j/<span class="hljs-number">3</span>)*<span class="hljs-number">3</span>+Math.<span class="hljs-built_in">floor</span>(k%<span class="hljs-number">3</span>)]
        <span class="hljs-keyword">if</span>(subSudo[<span class="hljs-built_in">key</span>])                                //九宫格判定与行类似，优化掉零的判断，<span class="hljs-built_in">key</span>为<span class="hljs-number">0</span>时值为<span class="hljs-number">0</span>，不需要额外判断
            <span class="hljs-built_in">return</span> <span class="hljs-number">3</span>
        <span class="hljs-keyword">else</span>
            subSudo[<span class="hljs-built_in">key</span>] = <span class="hljs-built_in">key</span>
    }
    <span class="hljs-built_in">return</span> <span class="hljs-number">0</span>;
}</code></pre>
<h3 id="articleHeader7">遍历求解</h3>
<p>利用元素状态初值为零的元素即为待定的特性，并加上堆栈的辅助，没有再开辟额外的存储空间。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function findAnswer(){
    for(let i = 0; i<9; i++){
        for(let j = 0; j<9; ){
            if(problem[i][j] === 0 || flag){              //当前位置为待定元素的首次处理或回溯到当前位置，两种情况看似不同，其实处理相同，自加1即可
                flag = false;
                let k = problem[i][j] + 1;                //搜索向下一个合法值迈进
                while(k<10){                              //循环找到下一个合法值
                    problem[i][j] = k;                    //填值
                    if(check20Grid(problem,i,j) == 0){    //判定合法，相关二十格判定
                        stack.push([i,j++])               //存储回溯点，并步进
                        break;
                    }
                    k++;
                }
                if(k>9){                                  //当前位置找不到合法值，回溯
                    problem[i][j] = 0;                    //回溯前归零
                    let rt = stack.pop();                 //堆栈中取回溯信息
                    if(!rt)                               //无解判断，返回0
                        return 0;    
                    i=rt[0]                               //穿越
                    j=rt[1]
                    flag = true;
                }
            }else{                                        //当前位置数字为题目给定
                j++;
            }
        }
    }
    return 1;                                            //成功找到一组解
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">findAnswer</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i&lt;<span class="hljs-number">9</span>; i++){
        <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> j = <span class="hljs-number">0</span>; j&lt;<span class="hljs-number">9</span>; ){
            <span class="hljs-keyword">if</span>(problem[i][j] === <span class="hljs-number">0</span> || flag){              <span class="hljs-comment">//当前位置为待定元素的首次处理或回溯到当前位置，两种情况看似不同，其实处理相同，自加1即可</span>
                flag = <span class="hljs-literal">false</span>;
                <span class="hljs-keyword">let</span> k = problem[i][j] + <span class="hljs-number">1</span>;                <span class="hljs-comment">//搜索向下一个合法值迈进</span>
                <span class="hljs-keyword">while</span>(k&lt;<span class="hljs-number">10</span>){                              <span class="hljs-comment">//循环找到下一个合法值</span>
                    problem[i][j] = k;                    <span class="hljs-comment">//填值</span>
                    <span class="hljs-keyword">if</span>(check20Grid(problem,i,j) == <span class="hljs-number">0</span>){    <span class="hljs-comment">//判定合法，相关二十格判定</span>
                        stack.push([i,j++])               <span class="hljs-comment">//存储回溯点，并步进</span>
                        <span class="hljs-keyword">break</span>;
                    }
                    k++;
                }
                <span class="hljs-keyword">if</span>(k&gt;<span class="hljs-number">9</span>){                                  <span class="hljs-comment">//当前位置找不到合法值，回溯</span>
                    problem[i][j] = <span class="hljs-number">0</span>;                    <span class="hljs-comment">//回溯前归零</span>
                    <span class="hljs-keyword">let</span> rt = stack.pop();                 <span class="hljs-comment">//堆栈中取回溯信息</span>
                    <span class="hljs-keyword">if</span>(!rt)                               <span class="hljs-comment">//无解判断，返回0</span>
                        <span class="hljs-keyword">return</span> <span class="hljs-number">0</span>;    
                    i=rt[<span class="hljs-number">0</span>]                               <span class="hljs-comment">//穿越</span>
                    j=rt[<span class="hljs-number">1</span>]
                    flag = <span class="hljs-literal">true</span>;
                }
            }<span class="hljs-keyword">else</span>{                                        <span class="hljs-comment">//当前位置数字为题目给定</span>
                j++;
            }
        }
    }
    <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>;                                            <span class="hljs-comment">//成功找到一组解</span>
}</code></pre>
<h2 id="articleHeader8">完整代码</h2>
<p>代码托管在开源中国，其中的sudoku.js即数独解法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="https://git.oschina.net/zhoutk/test.git" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code style="word-break: break-word; white-space: initial;">https:<span class="hljs-regexp">//gi</span>t.oschina.net<span class="hljs-regexp">/zhoutk/</span>test.git</code></pre>
<h2 id="articleHeader9">答案</h2>
<p>书上提到的难度为10.7的题目的答案，1秒内解决，效率还行。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[ [ 8, 1, 2, 7, 5, 3, 6, 4, 9 ],
  [ 9, 4, 3, 6, 8, 2, 1, 7, 5 ],
  [ 6, 7, 5, 4, 9, 1, 2, 8, 3 ],
  [ 1, 5, 4, 2, 3, 7, 8, 9, 6 ],
  [ 3, 6, 9, 8, 4, 5, 7, 2, 1 ],
  [ 2, 8, 7, 1, 6, 9, 5, 3, 4 ],
  [ 5, 2, 1, 9, 7, 4, 3, 6, 8 ],
  [ 4, 3, 8, 5, 2, 6, 9, 1, 7 ],
  [ 7, 9, 6, 3, 1, 8, 4, 5, 2 ] ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>[ [ <span class="hljs-number">8</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">7</span>, <span class="hljs-number">5</span>, <span class="hljs-number">3</span>, <span class="hljs-number">6</span>, <span class="hljs-number">4</span>, <span class="hljs-number">9</span> ],
  [ <span class="hljs-number">9</span>, <span class="hljs-number">4</span>, <span class="hljs-number">3</span>, <span class="hljs-number">6</span>, <span class="hljs-number">8</span>, <span class="hljs-number">2</span>, <span class="hljs-number">1</span>, <span class="hljs-number">7</span>, <span class="hljs-number">5</span> ],
  [ <span class="hljs-number">6</span>, <span class="hljs-number">7</span>, <span class="hljs-number">5</span>, <span class="hljs-number">4</span>, <span class="hljs-number">9</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">8</span>, <span class="hljs-number">3</span> ],
  [ <span class="hljs-number">1</span>, <span class="hljs-number">5</span>, <span class="hljs-number">4</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">7</span>, <span class="hljs-number">8</span>, <span class="hljs-number">9</span>, <span class="hljs-number">6</span> ],
  [ <span class="hljs-number">3</span>, <span class="hljs-number">6</span>, <span class="hljs-number">9</span>, <span class="hljs-number">8</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>, <span class="hljs-number">7</span>, <span class="hljs-number">2</span>, <span class="hljs-number">1</span> ],
  [ <span class="hljs-number">2</span>, <span class="hljs-number">8</span>, <span class="hljs-number">7</span>, <span class="hljs-number">1</span>, <span class="hljs-number">6</span>, <span class="hljs-number">9</span>, <span class="hljs-number">5</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span> ],
  [ <span class="hljs-number">5</span>, <span class="hljs-number">2</span>, <span class="hljs-number">1</span>, <span class="hljs-number">9</span>, <span class="hljs-number">7</span>, <span class="hljs-number">4</span>, <span class="hljs-number">3</span>, <span class="hljs-number">6</span>, <span class="hljs-number">8</span> ],
  [ <span class="hljs-number">4</span>, <span class="hljs-number">3</span>, <span class="hljs-number">8</span>, <span class="hljs-number">5</span>, <span class="hljs-number">2</span>, <span class="hljs-number">6</span>, <span class="hljs-number">9</span>, <span class="hljs-number">1</span>, <span class="hljs-number">7</span> ],
  [ <span class="hljs-number">7</span>, <span class="hljs-number">9</span>, <span class="hljs-number">6</span>, <span class="hljs-number">3</span>, <span class="hljs-number">1</span>, <span class="hljs-number">8</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>, <span class="hljs-number">2</span> ] ]</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
数独求解（javascript实现）

## 原文链接
[https://segmentfault.com/a/1190000004995017](https://segmentfault.com/a/1190000004995017)

