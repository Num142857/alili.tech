---
title: 'canvas实现 漂亮的下雨效果' 
date: 2018-12-05 2:30:09
hidden: true
slug: zkvkv2tdprq
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">说明</h3>
<p>这篇文章说如何用canvas画出漂亮的下雨效果，先看看最后实现的效果吧。  <br><a href="https://codepen.io/FEWY/pen/Ovevmw" rel="nofollow noreferrer" target="_blank">效果图</a><button class="btn btn-xs btn-default ml10 preview" data-url="FEWY/pen/Ovevmw" data-typeid="3">点击预览</button><br><span class="img-wrap"><img data-src="/img/bV8ITm?w=936&amp;h=532" src="https://static.alili.tech/img/bV8ITm?w=936&amp;h=532" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader1">解释</h3>
<p>看图来分析下，我们需要实现哪些效果。<br>1、雨滴下落效果，移动鼠标控制下落方向 <br>2、雨滴下落散成小水珠，小水珠的移动方向和鼠标移动方向相同<br>3、雨滴下落到鼠标坐标一定范围内，散成小水珠，同样的，小水珠的移动方向也和鼠标移动方向相同</p>
<p>好的，我们把整个效果大致拆分成三个效果，实现这三个效果，就完成了。<br>我们一步一步来实现。</p>
<h4>1、雨滴下落效果，移动鼠标控制下落方向</h4>
<p>实现整个效果的思路就是，<br><strong>初始时</strong><br>用一个数组保存雨滴对象。<br>一个雨滴对象里面有各个属性用来表示，雨滴的x坐标，y坐标，长度，下落速度，颜色，判断是否删除的标志位<br><strong>更新动画时</strong><br>往数组中添加一定数量的雨滴对象，然后遍历数组，修改每个雨滴对象的x坐标和y坐标，用canvas根据雨滴对象的坐标，画出两个点，连起来就是一个雨滴了。</p>
<p>所以实现效果的重点就在坐标上<br><strong>初始化一个雨滴的时候</strong><br>雨滴x坐标：一个随机数<br>雨滴y坐标：-100，这样是为了让雨滴从可视区域外进来<br><strong>更新动画时</strong><br>雨滴x坐标：<code>原x坐标的值 + speed * speedx</code><br>speed 是一个固定的值，表示雨滴下落速度，<br>speedx 是一个和鼠标移动方向有关系的变量，<br><code>speedx = speedx + (maxspeedx - speedx) / 50</code></p>
<p>而maxspeedx 是根据鼠标移动方向得到的一个值<br><code>maxspeedx = (e.clientX - canvasEl.clientWidth / 2) / (canvasEl.clientWidth / 2)</code>，<br><strong>e.clientX：鼠标距离可视区域左边的值</strong><br><strong>canvasEl.clientWidth：整个可视区域的宽度</strong><br>也就是说 speedx 是一个逐渐接近maxspeedx 的值 <br>maxspeedx 的取值范围是 -1 到 1，他的值越接近 -1，说明方向越向左，值越接近1，说明方向越向右。<br>为什么不直接用maxspeedx ？<br>这是为了让雨滴变化方向的速度不要那么快，不要跟随鼠标变化方向立即改变，要有点点的延迟，看上去更好些。<br>如果用maxspeedx ，是这样的效果<br><span class="img-wrap"><img data-src="/img/bV8ITB?w=825&amp;h=454" src="https://static.alili.tech/img/bV8ITB?w=825&amp;h=454" alt="" title="" style="cursor: pointer;"></span></p>
<p>如果用speedx ，是这样的效果<br><span class="img-wrap"><img data-src="/img/bV8ITJ?w=827&amp;h=456" src="https://static.alili.tech/img/bV8ITJ?w=827&amp;h=456" alt="" title="" style="cursor: pointer;"></span></p>
<p>雨滴y坐标：<code>原y坐标的值 + speed</code><br>speed 和上面x坐标中提到的一样，是一个固定值，表示雨滴下落速度，</p>
<p><strong>好的，最后就是用canvas根据雨滴对象的坐标，画两个点了，然后连起来，雨滴就画出来了</strong><br>第一个点坐标比较简单，直接获取雨滴对象的x坐标和y坐标，就是这个点的坐标<br>第二个点的坐标：  <br><code>x坐标 = 雨滴x坐标的值 + 雨滴长度 * speedx</code><br><code>y坐标 = 雨滴y坐标的值 + 雨滴长度</code><br>最后把这两个点连起来，就有一条线了，就是一个雨滴了</p>
<p>当设置x坐标时，又用上了变量 speedx，这是为了让 雨滴方向 和 雨滴下落方向相同，<br>当不用 speedx时，是这样<br><span class="img-wrap"><img data-src="/img/bV8IUe?w=647&amp;h=421" src="https://static.alili.tech/img/bV8IUe?w=647&amp;h=421" alt="" title="" style="cursor: pointer;"></span></p>
<p>当用上speedx时，是这样<br><span class="img-wrap"><img data-src="/img/bV8ITJ?w=827&amp;h=456" src="https://static.alili.tech/img/bV8ITJ?w=827&amp;h=456" alt="" title="" style="cursor: pointer;"></span></p>
<h4>2、雨滴下落散成小水珠，小水珠的移动方向和鼠标移动方向相同</h4>
<p>这里的思路其实，和上面的效果有些相似<br><strong>初始时</strong><br>用一个数组保存小水珠对象。<br>一个小水珠，其实就是画一个圆弧。<br>一个小水珠对象里面有各个属性用来表示，小水珠的坐标，x轴移动速度，y轴移动速度，圆的半径，判断是否删除的标志位。<br><strong>更新动画时</strong><br> 往数组中添加一定数量的小水珠对象，然后遍历数组，修改每个小水珠对象的x坐标和y坐标，用canvas根据小水珠对象的坐标属性 和 半径属性，画一个圆弧。</p>
<p>所以实现效果的重点还在坐标上<br><strong>初始化一个小水珠的时候</strong>   <br>小水珠是雨滴消失的时候出现的，所以小水珠的坐标也是根据雨滴的坐标来的，删除一个雨滴，就出现一些小水珠，而且小水珠的移动方向也是和雨滴下落方向，鼠标移动方向一样，所以还是会需要上面提到的变量 speedx，<br><code>小水珠x坐标： 删除的雨滴x坐标 + 删除的雨滴长度 * speedx</code><br><code>小水珠y坐标：删除的雨滴y坐标 + 删除的雨滴长度</code><br><strong>更新动画时</strong><br>这里要用到小水珠对象的两个属性 vx（x轴的值 的变化速度） 和vy（y轴的值 的变化速度），<br><strong>小水珠的x坐标</strong><br><code>vx = vx + speedx / 2</code><br><code>小水珠的x坐标  =原x坐标 + vx</code>，</p>
<p>speedx：上面提到的和鼠标移动方向相关的一个变量，这里的作用就是用来控制小水珠的移动方向和其他方向相同<br><code>speedx / 2</code>，除2是为了使 让小水珠 在x轴的移动距离短一点，看上去更真实点</p>
<p><strong>小水珠的y坐标</strong><br><code>vy = vy + gravity</code><br><code>小水珠的y坐标  =  原y坐标 + vy;</code>，<br>vy：一个负数<br>gravity：重力，一个正数，完整代码里设置的是0.5<br>因为 原y坐标 是一个正数，这样小水珠y坐标的值，就会先减小后增大，这是为了实现小水珠会先上升后下降的效果，看图<br><span class="img-wrap"><img data-src="/img/bV8IUH?w=456&amp;h=335" src="https://static.alili.tech/img/bV8IUH?w=456&amp;h=335" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p><strong>最后就是用canvas根据小水珠的坐标属性和半径属性画圆弧就可以了，弧度是随机的</strong></p>
<h4>3、雨滴下落到鼠标坐标一定范围内，散成小水珠，同样的，小水珠的移动方向也和鼠标移动方向相同</h4>
<p><span class="img-wrap"><img data-src="/img/bV8IUP?w=534&amp;h=369" src="https://static.alili.tech/img/bV8IUP?w=534&amp;h=369" alt="" title="" style="cursor: pointer; display: inline;"></span><br>确定图中圆的大小容易，假设圆的半径是35，我们能获取到鼠标的坐标，以鼠标的坐标为圆心，35为半径，就确定了圆的大小。<br>重点在于如何判断，雨滴是不是进入了这个范围，这就要用勾股定理了，看图。<br><span class="img-wrap"><img data-src="/img/bV8IUX?w=682&amp;h=431" src="https://static.alili.tech/img/bV8IUX?w=682&amp;h=431" alt="" title="" style="cursor: pointer;"></span></p>
<p>因为雨滴是两个点连起来的一条线，要看雨滴是不是进入了这个范围内， 就是看雨滴靠下边的点的坐标，到鼠标的直线距离是多少，就是图中AB线段的长度。</p>
<blockquote>勾股定理：直角三角形的两条直角边的平方和等于斜边的平方。</blockquote>
<p><code>AB =  Math.sqrt(BC*BC + AC * AC)</code></p>
<p>BC = 雨滴x坐标 - 鼠标x坐标<br>AC = 雨滴y坐标 - 鼠标y坐标<br>Math.sqrt()方法用来计算一个数的平方根</p>
<p>我们知道雨滴到鼠标的直线距离后，和圆的半径比较下，大于半径就不在范围内，否则就是在了。  <br>如果在范围内，就删除雨滴，画一些小水珠。</p>
<h3 id="articleHeader2">总结</h3>
<p>要实现这个效果，麻烦的地方在于方向，雨滴方向，雨滴下落方向，小水珠移动方向，而这些都和鼠标移动方向相关，确定各种方向后，根据距离，用canvas不断的画线，画圆弧就行了。</p>
<h3 id="articleHeader3">完整代码</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!doctype html>
<html lang=&quot;en&quot;>
<head>
  <meta charset=&quot;UTF-8&quot;>
  <style>
    * {
      margin: 0;
      padding: 0;
    }
  </style>
</head>
<body>
  <canvas id=&quot;canvas&quot; style=&quot;position: absolute; height: 100%; width:100%;&quot;></canvas>
  <script>
    window.onload = main;
    function main() {
      // 获取canvas元素
      var canvasEl = document.getElementById('canvas');
      var ctx = canvasEl.getContext('2d');
      // canvas画布的 背景颜色
      var backgroundColor = '#000';

      // canvas画布的宽 等于 可视区域的宽
      canvasEl.width = canvasEl.clientWidth;
      // canvas画布的高 等于 可视区域的高
      canvasEl.height = canvasEl.clientHeight;

      // 保存小水珠的数组
      // 雨滴下落后散成小水珠，小水珠就是一些圆弧
      var dropList = [];

      // 重力
      // 雨滴下落后散成小水珠，小水珠会先上升后下降，主要是因为 gravity 这个变量的缘故
      var gravity = 0.5;

      // 保存雨滴的数组
      // 每个雨滴 都是 画的一条线 
      var linelist = [];

      // 保存鼠标的坐标 
      // mousePos[0] 代表x轴的值，mousePos[1] 代表y轴的值 
      var mousePos = [0, 0];

      // 跟随鼠标， mouseDis 大小区域内的雨滴会消失，形成散落效果
      // 以mousePos为圆心，mouseDis为半径，这个范围内的雨滴 都会散开，形成许多小水珠
      var mouseDis = 35;

      // 更新一次动画，画lineNum 条雨滴，lineNum 值越大，下雨就越密集
      var lineNum = 3;

      // 跟随鼠标方向 变化下雨方向的 速度
      // 鼠标移动后，下雨的方向 会慢慢改变，主要靠speedx 这个变量
      var speedx = 0;

      // maxspeedx 为 speedx 可以取的最大值
      // 当 speedx = maxspeedx时，下雨方向 会 随鼠标移动方向立即改变
      var maxspeedx = 0;

      // 页面大小发生变化时，重置canvas画布大小
      window.onresize = function () {
        canvasEl.width = canvasEl.clientWidth;
        canvasEl.height = canvasEl.clientHeight;
      }

      //移动鼠标触发事件
      window.onmousemove = function (e) {
        //  设置mousePos 等于 鼠标坐标
        //  e.clientX 为距离 浏览器窗口可视区域 左边的距离
        //  e.clientY 为距离 浏览器窗口可视区域 上边的距离
        mousePos[0] = e.clientX;
        mousePos[1] = e.clientY;

        // 通过鼠标位置，设置 maxspeedx的值，取值范围是 -1 到 1
        // maxspeedx的值，关系到 
        // 1、雨滴的方向
        // 2、雨滴下落的方向
        // 3、雨滴下落方向 跟随 鼠标移动方向变化的速度
        // 4、小水珠的移动方向
        // 值越接近1，表示方向越向右
        // 值越接近-1，表示方向越向左
        maxspeedx = (e.clientX - canvasEl.clientWidth / 2) / (canvasEl.clientWidth / 2);
      }

      // 根据参数，返回一个rgb颜色，用于给雨滴设置颜色
      function getRgb(r, g, b) {
        return &quot;rgb(&quot; + r + &quot;,&quot; + g + &quot;,&quot; + b + &quot;)&quot;;
      }

      // 画 一滴雨（一条线）
      function createLine(e) {
        // 随机生成 雨滴的长度
        var temp = 0.25 * (50 + Math.random() * 100);
        // 一个 line 对象，代表一个雨滴
        var line = {
          // 雨滴下落速度  
          speed: 5.5 * (Math.random() * 6 + 3),
          // 判断是否删除，值为true就删除
          die: false,
          // 雨滴x坐标 
          posx: e,
          // 雨滴y坐标 
          posy: -50,
          // 雨滴的长度
          h: temp,
          // 雨滴的颜色
          color: getRgb(Math.floor(temp * 255 / 75), Math.floor(temp * 255 / 75), Math.floor(temp * 255 / 75))
        };
        // 把创建好的line（雨滴）对象，添加到保存雨滴的数组
        linelist.push(line);
      }

      // 画一个小水珠（雨滴散开后的小水珠就是一个个的圆弧）
      function createDrop(x, y) {
        // 一个 drop 对象，代表一个圆弧
        var drop = {
          // 判断是否删除，值为true就删除
          die: false,
          // 圆弧圆心的x坐标 
          posx: x,
          // 圆弧圆心的y坐标 
          posy: y,
          // vx 表示 x轴的值 变化的速度
          vx: (Math.random() - 0.5) * 8,
          // vy 表示 y轴的值 变化的速度 取值范围：-3 到 -9
          vy: Math.random() * (-6) - 3,
          // 圆弧的半径
          radius: Math.random() * 1.5 + 1
        };
        return drop;
      }

      // 画一定数量的小水珠
      function madedrops(x, y) {
        // 随机生成一个数 maxi
        // maxi 代表要画小水珠的数量
        var maxi = Math.floor(Math.random() * 5 + 5);
        for (var i = 0; i < maxi; i++) {
          dropList.push(createDrop(x, y));
        }
      }

      // 开始调用update函数，更新动画
      window.requestAnimationFrame(update);
      // 更新动画
      function update() {
        // 如果保存小水珠的数组有内容
        if (dropList.length > 0) {
          // 遍历保存小水珠的数组
          dropList.forEach(function (e) {
            //设置e.vx，vx表示x坐标变化的速度
            // (speedx)/2 是为了，让小水珠 在x轴的移动距离短一点，看上去更真实点
            // 也使 小水珠的移动方向 和 雨滴方向，雨滴下落方向，鼠标移动方向相同
            e.vx = e.vx + (speedx / 2);
            e.posx = e.posx + e.vx;
            
            //设置e.vy，vy表示y坐标变化的速度
            // e.vy的范围是-3 到 -9，而这时e.posy（y坐标）一定是正值，所以 e.posy的值会先减小后增大
            // 也就是实现 雨滴散成小水珠，小水珠会先上升后下降的效果
            e.vy = e.vy + gravity;
            e.posy = e.posy + e.vy;

            // 如果 小水珠y坐标 大于 可视区域的高度，设置die属性为true
            // 小水珠如果超出可视区域就删除掉
            if (e.posy > canvasEl.clientHeight) {
              e.die = true;
            }
          });
        }

        // 删除 die属性为ture 的数组成员
        // 可视区域外的小水珠删除掉
        for (var i = dropList.length - 1; i >= 0; i--) {
          if (dropList[i].die) {
            dropList.splice(i, 1);
          }
        }

        // 设置下雨方向变换的速度，取值范围： -1 到 1
        // 当 speedx = maxspeedx时，下雨方向 会 随鼠标移动方向立即改变
        speedx = speedx + (maxspeedx - speedx) / 50;

        // 根据lineNum的值，画一定数量雨滴
        for (var i = 0; i < lineNum; i++) {
          // 调用createLine 函数，参数是雨滴x坐标
          createLine(Math.random() * 2 * canvasEl.width - (0.5 * canvasEl.width));
        }

        // 设置结束线，也就是雨滴散开 形成许多小水珠的位置
        var endLine = canvasEl.clientHeight - Math.random() * canvasEl.clientHeight / 5;

        // 遍历保存雨滴的数组
        linelist.forEach(function (e) {

          // 利用勾股定理 确定一个范围，在这个范围内雨滴会散开形成小水珠
          // e.posx + speedx * e.h 是雨滴x坐标
          // e.posy + e.h 是雨滴y坐标
          var dis = Math.sqrt(((e.posx + speedx * e.h) - mousePos[0]) * ((e.posx + speedx * e.h) - mousePos[0]) + (e.posy + e.h - mousePos[1]) * (e.posy + e.h - mousePos[1]));

          // 如果在mouseDis区域内，就删除雨滴，画一些小水珠（圆弧）
          // 实现鼠标碰到雨滴，雨滴散成小水珠的效果
          if (dis < mouseDis) {
            // 删除 雨滴
            e.die = true;
            // 画一些小水珠（圆弧）
            madedrops(e.posx + speedx * e.h, e.posy + e.h);
          }

          // 如果雨滴超过 结束线，删除雨滴，画一些小水珠（圆弧）
          if ((e.posy + e.h) > endLine) {
            e.die = true;
            madedrops(e.posx + speedx * e.h, e.posy + e.h);
          }

          // 如果 雨滴 y坐标 大于 可视区域的高度，设置die属性为true
          // 如果 雨滴 超出可视区域就删除掉
          if (e.posy >= canvasEl.clientHeight) {
            e.die = true;
          } else {
            // 逐渐增加 雨滴 y坐标的值
            e.posy = e.posy + e.speed;

            // 变化雨滴 x坐标
            // * speedx 用来控制雨滴 下落 方向
            // 使 雨滴下落方向 和 鼠标移动方向相同
            e.posx = e.posx + e.speed * speedx;
          }
        });

        // 删除 die属性为ture 的数组成员
        // 鼠标区域内的，超过结束线的，可视区域外的雨滴删除掉
        for (var i = linelist.length - 1; i >= 0; i--) {
          if (linelist[i].die) {
            linelist.splice(i, 1);
          }
        }

        // 渲染
        render();
        // 递归调用 update，实现动画效果
        window.requestAnimationFrame(update);
      }

      // 渲染
      function render() {
        // 画一个和可视区域一样大的矩形
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, canvasEl.width, canvasEl.height);

        // 画雨滴效果
        ctx.lineWidth = 5;
        linelist.forEach(function (line) {
          ctx.strokeStyle = line.color;
          ctx.beginPath();
          ctx.moveTo(line.posx, line.posy);

          // * speedx 用来控制雨滴方向
          // 使 雨滴方向 和 鼠标移动方向相同
          ctx.lineTo(line.posx + line.h * speedx, line.posy + line.h);
          ctx.stroke();
        });

        // 画雨滴散开形成小水珠效果
        ctx.lineWidth = 1;
        ctx.strokeStyle = &quot;#fff&quot;;
        dropList.forEach(function (e) {
          ctx.beginPath();
          ctx.arc(e.posx, e.posy, e.radius, Math.random() * Math.PI * 2, 1 * Math.PI);
          ctx.stroke();
        });

        // 解开注释，可看见鼠标范围
        /*
          ctx.beginPath();
          ctx.arc(mousePos[0], mousePos[1], mouseDis, 0, 2 * Math.PI);
          ctx.stroke();
        */
      }
    }
  </script>
</body>

</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!doctype html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    * {
      <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
      <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
    }
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">canvas</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"canvas"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"position: absolute; height: 100%; width:100%;"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">canvas</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-built_in">window</span>.onload = main;
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">main</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-comment">// 获取canvas元素</span>
      <span class="hljs-keyword">var</span> canvasEl = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'canvas'</span>);
      <span class="hljs-keyword">var</span> ctx = canvasEl.getContext(<span class="hljs-string">'2d'</span>);
      <span class="hljs-comment">// canvas画布的 背景颜色</span>
      <span class="hljs-keyword">var</span> backgroundColor = <span class="hljs-string">'#000'</span>;

      <span class="hljs-comment">// canvas画布的宽 等于 可视区域的宽</span>
      canvasEl.width = canvasEl.clientWidth;
      <span class="hljs-comment">// canvas画布的高 等于 可视区域的高</span>
      canvasEl.height = canvasEl.clientHeight;

      <span class="hljs-comment">// 保存小水珠的数组</span>
      <span class="hljs-comment">// 雨滴下落后散成小水珠，小水珠就是一些圆弧</span>
      <span class="hljs-keyword">var</span> dropList = [];

      <span class="hljs-comment">// 重力</span>
      <span class="hljs-comment">// 雨滴下落后散成小水珠，小水珠会先上升后下降，主要是因为 gravity 这个变量的缘故</span>
      <span class="hljs-keyword">var</span> gravity = <span class="hljs-number">0.5</span>;

      <span class="hljs-comment">// 保存雨滴的数组</span>
      <span class="hljs-comment">// 每个雨滴 都是 画的一条线 </span>
      <span class="hljs-keyword">var</span> linelist = [];

      <span class="hljs-comment">// 保存鼠标的坐标 </span>
      <span class="hljs-comment">// mousePos[0] 代表x轴的值，mousePos[1] 代表y轴的值 </span>
      <span class="hljs-keyword">var</span> mousePos = [<span class="hljs-number">0</span>, <span class="hljs-number">0</span>];

      <span class="hljs-comment">// 跟随鼠标， mouseDis 大小区域内的雨滴会消失，形成散落效果</span>
      <span class="hljs-comment">// 以mousePos为圆心，mouseDis为半径，这个范围内的雨滴 都会散开，形成许多小水珠</span>
      <span class="hljs-keyword">var</span> mouseDis = <span class="hljs-number">35</span>;

      <span class="hljs-comment">// 更新一次动画，画lineNum 条雨滴，lineNum 值越大，下雨就越密集</span>
      <span class="hljs-keyword">var</span> lineNum = <span class="hljs-number">3</span>;

      <span class="hljs-comment">// 跟随鼠标方向 变化下雨方向的 速度</span>
      <span class="hljs-comment">// 鼠标移动后，下雨的方向 会慢慢改变，主要靠speedx 这个变量</span>
      <span class="hljs-keyword">var</span> speedx = <span class="hljs-number">0</span>;

      <span class="hljs-comment">// maxspeedx 为 speedx 可以取的最大值</span>
      <span class="hljs-comment">// 当 speedx = maxspeedx时，下雨方向 会 随鼠标移动方向立即改变</span>
      <span class="hljs-keyword">var</span> maxspeedx = <span class="hljs-number">0</span>;

      <span class="hljs-comment">// 页面大小发生变化时，重置canvas画布大小</span>
      <span class="hljs-built_in">window</span>.onresize = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        canvasEl.width = canvasEl.clientWidth;
        canvasEl.height = canvasEl.clientHeight;
      }

      <span class="hljs-comment">//移动鼠标触发事件</span>
      <span class="hljs-built_in">window</span>.onmousemove = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
        <span class="hljs-comment">//  设置mousePos 等于 鼠标坐标</span>
        <span class="hljs-comment">//  e.clientX 为距离 浏览器窗口可视区域 左边的距离</span>
        <span class="hljs-comment">//  e.clientY 为距离 浏览器窗口可视区域 上边的距离</span>
        mousePos[<span class="hljs-number">0</span>] = e.clientX;
        mousePos[<span class="hljs-number">1</span>] = e.clientY;

        <span class="hljs-comment">// 通过鼠标位置，设置 maxspeedx的值，取值范围是 -1 到 1</span>
        <span class="hljs-comment">// maxspeedx的值，关系到 </span>
        <span class="hljs-comment">// 1、雨滴的方向</span>
        <span class="hljs-comment">// 2、雨滴下落的方向</span>
        <span class="hljs-comment">// 3、雨滴下落方向 跟随 鼠标移动方向变化的速度</span>
        <span class="hljs-comment">// 4、小水珠的移动方向</span>
        <span class="hljs-comment">// 值越接近1，表示方向越向右</span>
        <span class="hljs-comment">// 值越接近-1，表示方向越向左</span>
        maxspeedx = (e.clientX - canvasEl.clientWidth / <span class="hljs-number">2</span>) / (canvasEl.clientWidth / <span class="hljs-number">2</span>);
      }

      <span class="hljs-comment">// 根据参数，返回一个rgb颜色，用于给雨滴设置颜色</span>
      <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getRgb</span>(<span class="hljs-params">r, g, b</span>) </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-string">"rgb("</span> + r + <span class="hljs-string">","</span> + g + <span class="hljs-string">","</span> + b + <span class="hljs-string">")"</span>;
      }

      <span class="hljs-comment">// 画 一滴雨（一条线）</span>
      <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createLine</span>(<span class="hljs-params">e</span>) </span>{
        <span class="hljs-comment">// 随机生成 雨滴的长度</span>
        <span class="hljs-keyword">var</span> temp = <span class="hljs-number">0.25</span> * (<span class="hljs-number">50</span> + <span class="hljs-built_in">Math</span>.random() * <span class="hljs-number">100</span>);
        <span class="hljs-comment">// 一个 line 对象，代表一个雨滴</span>
        <span class="hljs-keyword">var</span> line = {
          <span class="hljs-comment">// 雨滴下落速度  </span>
          speed: <span class="hljs-number">5.5</span> * (<span class="hljs-built_in">Math</span>.random() * <span class="hljs-number">6</span> + <span class="hljs-number">3</span>),
          <span class="hljs-comment">// 判断是否删除，值为true就删除</span>
          die: <span class="hljs-literal">false</span>,
          <span class="hljs-comment">// 雨滴x坐标 </span>
          posx: e,
          <span class="hljs-comment">// 雨滴y坐标 </span>
          posy: <span class="hljs-number">-50</span>,
          <span class="hljs-comment">// 雨滴的长度</span>
          h: temp,
          <span class="hljs-comment">// 雨滴的颜色</span>
          color: getRgb(<span class="hljs-built_in">Math</span>.floor(temp * <span class="hljs-number">255</span> / <span class="hljs-number">75</span>), <span class="hljs-built_in">Math</span>.floor(temp * <span class="hljs-number">255</span> / <span class="hljs-number">75</span>), <span class="hljs-built_in">Math</span>.floor(temp * <span class="hljs-number">255</span> / <span class="hljs-number">75</span>))
        };
        <span class="hljs-comment">// 把创建好的line（雨滴）对象，添加到保存雨滴的数组</span>
        linelist.push(line);
      }

      <span class="hljs-comment">// 画一个小水珠（雨滴散开后的小水珠就是一个个的圆弧）</span>
      <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createDrop</span>(<span class="hljs-params">x, y</span>) </span>{
        <span class="hljs-comment">// 一个 drop 对象，代表一个圆弧</span>
        <span class="hljs-keyword">var</span> drop = {
          <span class="hljs-comment">// 判断是否删除，值为true就删除</span>
          die: <span class="hljs-literal">false</span>,
          <span class="hljs-comment">// 圆弧圆心的x坐标 </span>
          posx: x,
          <span class="hljs-comment">// 圆弧圆心的y坐标 </span>
          posy: y,
          <span class="hljs-comment">// vx 表示 x轴的值 变化的速度</span>
          vx: (<span class="hljs-built_in">Math</span>.random() - <span class="hljs-number">0.5</span>) * <span class="hljs-number">8</span>,
          <span class="hljs-comment">// vy 表示 y轴的值 变化的速度 取值范围：-3 到 -9</span>
          vy: <span class="hljs-built_in">Math</span>.random() * (<span class="hljs-number">-6</span>) - <span class="hljs-number">3</span>,
          <span class="hljs-comment">// 圆弧的半径</span>
          radius: <span class="hljs-built_in">Math</span>.random() * <span class="hljs-number">1.5</span> + <span class="hljs-number">1</span>
        };
        <span class="hljs-keyword">return</span> drop;
      }

      <span class="hljs-comment">// 画一定数量的小水珠</span>
      <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">madedrops</span>(<span class="hljs-params">x, y</span>) </span>{
        <span class="hljs-comment">// 随机生成一个数 maxi</span>
        <span class="hljs-comment">// maxi 代表要画小水珠的数量</span>
        <span class="hljs-keyword">var</span> maxi = <span class="hljs-built_in">Math</span>.floor(<span class="hljs-built_in">Math</span>.random() * <span class="hljs-number">5</span> + <span class="hljs-number">5</span>);
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; maxi; i++) {
          dropList.push(createDrop(x, y));
        }
      }

      <span class="hljs-comment">// 开始调用update函数，更新动画</span>
      <span class="hljs-built_in">window</span>.requestAnimationFrame(update);
      <span class="hljs-comment">// 更新动画</span>
      <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">update</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// 如果保存小水珠的数组有内容</span>
        <span class="hljs-keyword">if</span> (dropList.length &gt; <span class="hljs-number">0</span>) {
          <span class="hljs-comment">// 遍历保存小水珠的数组</span>
          dropList.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
            <span class="hljs-comment">//设置e.vx，vx表示x坐标变化的速度</span>
            <span class="hljs-comment">// (speedx)/2 是为了，让小水珠 在x轴的移动距离短一点，看上去更真实点</span>
            <span class="hljs-comment">// 也使 小水珠的移动方向 和 雨滴方向，雨滴下落方向，鼠标移动方向相同</span>
            e.vx = e.vx + (speedx / <span class="hljs-number">2</span>);
            e.posx = e.posx + e.vx;
            
            <span class="hljs-comment">//设置e.vy，vy表示y坐标变化的速度</span>
            <span class="hljs-comment">// e.vy的范围是-3 到 -9，而这时e.posy（y坐标）一定是正值，所以 e.posy的值会先减小后增大</span>
            <span class="hljs-comment">// 也就是实现 雨滴散成小水珠，小水珠会先上升后下降的效果</span>
            e.vy = e.vy + gravity;
            e.posy = e.posy + e.vy;

            <span class="hljs-comment">// 如果 小水珠y坐标 大于 可视区域的高度，设置die属性为true</span>
            <span class="hljs-comment">// 小水珠如果超出可视区域就删除掉</span>
            <span class="hljs-keyword">if</span> (e.posy &gt; canvasEl.clientHeight) {
              e.die = <span class="hljs-literal">true</span>;
            }
          });
        }

        <span class="hljs-comment">// 删除 die属性为ture 的数组成员</span>
        <span class="hljs-comment">// 可视区域外的小水珠删除掉</span>
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = dropList.length - <span class="hljs-number">1</span>; i &gt;= <span class="hljs-number">0</span>; i--) {
          <span class="hljs-keyword">if</span> (dropList[i].die) {
            dropList.splice(i, <span class="hljs-number">1</span>);
          }
        }

        <span class="hljs-comment">// 设置下雨方向变换的速度，取值范围： -1 到 1</span>
        <span class="hljs-comment">// 当 speedx = maxspeedx时，下雨方向 会 随鼠标移动方向立即改变</span>
        speedx = speedx + (maxspeedx - speedx) / <span class="hljs-number">50</span>;

        <span class="hljs-comment">// 根据lineNum的值，画一定数量雨滴</span>
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; lineNum; i++) {
          <span class="hljs-comment">// 调用createLine 函数，参数是雨滴x坐标</span>
          createLine(<span class="hljs-built_in">Math</span>.random() * <span class="hljs-number">2</span> * canvasEl.width - (<span class="hljs-number">0.5</span> * canvasEl.width));
        }

        <span class="hljs-comment">// 设置结束线，也就是雨滴散开 形成许多小水珠的位置</span>
        <span class="hljs-keyword">var</span> endLine = canvasEl.clientHeight - <span class="hljs-built_in">Math</span>.random() * canvasEl.clientHeight / <span class="hljs-number">5</span>;

        <span class="hljs-comment">// 遍历保存雨滴的数组</span>
        linelist.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{

          <span class="hljs-comment">// 利用勾股定理 确定一个范围，在这个范围内雨滴会散开形成小水珠</span>
          <span class="hljs-comment">// e.posx + speedx * e.h 是雨滴x坐标</span>
          <span class="hljs-comment">// e.posy + e.h 是雨滴y坐标</span>
          <span class="hljs-keyword">var</span> dis = <span class="hljs-built_in">Math</span>.sqrt(((e.posx + speedx * e.h) - mousePos[<span class="hljs-number">0</span>]) * ((e.posx + speedx * e.h) - mousePos[<span class="hljs-number">0</span>]) + (e.posy + e.h - mousePos[<span class="hljs-number">1</span>]) * (e.posy + e.h - mousePos[<span class="hljs-number">1</span>]));

          <span class="hljs-comment">// 如果在mouseDis区域内，就删除雨滴，画一些小水珠（圆弧）</span>
          <span class="hljs-comment">// 实现鼠标碰到雨滴，雨滴散成小水珠的效果</span>
          <span class="hljs-keyword">if</span> (dis &lt; mouseDis) {
            <span class="hljs-comment">// 删除 雨滴</span>
            e.die = <span class="hljs-literal">true</span>;
            <span class="hljs-comment">// 画一些小水珠（圆弧）</span>
            madedrops(e.posx + speedx * e.h, e.posy + e.h);
          }

          <span class="hljs-comment">// 如果雨滴超过 结束线，删除雨滴，画一些小水珠（圆弧）</span>
          <span class="hljs-keyword">if</span> ((e.posy + e.h) &gt; endLine) {
            e.die = <span class="hljs-literal">true</span>;
            madedrops(e.posx + speedx * e.h, e.posy + e.h);
          }

          <span class="hljs-comment">// 如果 雨滴 y坐标 大于 可视区域的高度，设置die属性为true</span>
          <span class="hljs-comment">// 如果 雨滴 超出可视区域就删除掉</span>
          <span class="hljs-keyword">if</span> (e.posy &gt;= canvasEl.clientHeight) {
            e.die = <span class="hljs-literal">true</span>;
          } <span class="hljs-keyword">else</span> {
            <span class="hljs-comment">// 逐渐增加 雨滴 y坐标的值</span>
            e.posy = e.posy + e.speed;

            <span class="hljs-comment">// 变化雨滴 x坐标</span>
            <span class="hljs-comment">// * speedx 用来控制雨滴 下落 方向</span>
            <span class="hljs-comment">// 使 雨滴下落方向 和 鼠标移动方向相同</span>
            e.posx = e.posx + e.speed * speedx;
          }
        });

        <span class="hljs-comment">// 删除 die属性为ture 的数组成员</span>
        <span class="hljs-comment">// 鼠标区域内的，超过结束线的，可视区域外的雨滴删除掉</span>
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = linelist.length - <span class="hljs-number">1</span>; i &gt;= <span class="hljs-number">0</span>; i--) {
          <span class="hljs-keyword">if</span> (linelist[i].die) {
            linelist.splice(i, <span class="hljs-number">1</span>);
          }
        }

        <span class="hljs-comment">// 渲染</span>
        render();
        <span class="hljs-comment">// 递归调用 update，实现动画效果</span>
        <span class="hljs-built_in">window</span>.requestAnimationFrame(update);
      }

      <span class="hljs-comment">// 渲染</span>
      <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">render</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// 画一个和可视区域一样大的矩形</span>
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, canvasEl.width, canvasEl.height);

        <span class="hljs-comment">// 画雨滴效果</span>
        ctx.lineWidth = <span class="hljs-number">5</span>;
        linelist.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">line</span>) </span>{
          ctx.strokeStyle = line.color;
          ctx.beginPath();
          ctx.moveTo(line.posx, line.posy);

          <span class="hljs-comment">// * speedx 用来控制雨滴方向</span>
          <span class="hljs-comment">// 使 雨滴方向 和 鼠标移动方向相同</span>
          ctx.lineTo(line.posx + line.h * speedx, line.posy + line.h);
          ctx.stroke();
        });

        <span class="hljs-comment">// 画雨滴散开形成小水珠效果</span>
        ctx.lineWidth = <span class="hljs-number">1</span>;
        ctx.strokeStyle = <span class="hljs-string">"#fff"</span>;
        dropList.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
          ctx.beginPath();
          ctx.arc(e.posx, e.posy, e.radius, <span class="hljs-built_in">Math</span>.random() * <span class="hljs-built_in">Math</span>.PI * <span class="hljs-number">2</span>, <span class="hljs-number">1</span> * <span class="hljs-built_in">Math</span>.PI);
          ctx.stroke();
        });

        <span class="hljs-comment">// 解开注释，可看见鼠标范围</span>
        <span class="hljs-comment">/*
          ctx.beginPath();
          ctx.arc(mousePos[0], mousePos[1], mouseDis, 0, 2 * Math.PI);
          ctx.stroke();
        */</span>
      }
    }
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p><strong>最后说一句</strong>   <br>这个特效的作者是 <a href="https://juejin.im/user/59db13d5518825350f42507a" rel="nofollow noreferrer" target="_blank">sxq111本尊</a> 大神，我只是站在巨人的肩膀上，喜欢的小伙伴们可以去<a href="https://github.com/sxq111/sxq111.github.io/tree/master/my_canvas_rain" rel="nofollow noreferrer" target="_blank">github</a>上给个小<a href="https://github.com/sxq111/sxq111.github.io/tree/master/my_canvas_rain" rel="nofollow noreferrer" target="_blank">star</a>哦。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016248923?w=600&amp;h=342" src="https://static.alili.tech/img/remote/1460000016248923?w=600&amp;h=342" alt="前端简单说" title="前端简单说" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
canvas实现 漂亮的下雨效果

## 原文链接
[https://segmentfault.com/a/1190000014433283](https://segmentfault.com/a/1190000014433283)

