---
title: 'JavaScript实现爆炸碎片的 图片切换 效果' 
date: 2018-12-01 2:30:12
hidden: true
slug: 531udltkjg9
categories: [reprint]
---

{{< raw >}}

                    
<h4>说明</h4>
<p>和大家分享一个看上去很酷的效果，先来看<a href="https://codepen.io/FEWY/pen/xjpVLe" rel="nofollow noreferrer">效果图</a>吧！</p>
<p><span class="img-wrap"><img data-src="https://www.kkkk1000.com/images/20180508170457626.gif" src="https://static.alili.techhttps://www.kkkk1000.com/images/20180508170457626.gif" alt="图片未加载" title="图片未加载"></span></p>
<h4>解释</h4>
<p>实现这个效果的思路就是，一个大的div元素，设置好一个背景，生成一定数量小的div元素，背景设置成同样的图片，但是每个小div元素的 <code>background-position</code> 属性值不同，整齐的覆盖在大的div元素上，这样就能拼成一张完整的背景图，鼠标移入时，让所有小的div元素移动和变形。<br>总的来说就是两步：<br>1、生成小的div元素，整齐的覆盖在大的div元素上，像下图这样（为了方便看，把每个小div元素，分开了些）。</p>
<p><span class="img-wrap"><img data-src="https://www.kkkk1000.com/images/20180508172310957.jpg" src="https://static.alili.techhttps://www.kkkk1000.com/images/20180508172310957.jpg" alt="图片未加载" title="图片未加载"></span></p>
<p>2、鼠标移入时，让所有小div元素动起来，主要是改变小div元素的left、top、opacity、transform属性的值</p>
<p>具体实现的代码也并不多，下面是注释很详细的代码。</p>
<h4>完整代码</h4>
<pre><code>&lt;!doctype html&gt;
&lt;head&gt;
    &lt;meta http-equiv="Content-Type" content="text/html; charset=utf-8" /&gt;
    &lt;style&gt;
        body {
            overflow: hidden;
        }

        #container {
            width: 400px;
            height: 300px;
            margin: 150px auto 0 auto;
            position: relative;
        }
    &lt;/style&gt;
&lt;/head&gt;

&lt;body&gt;
    &lt;div id="container"&gt;&lt;/div&gt;
    &lt;script type="text/javascript"&gt;
        window.onload = burst;
        function burst() {
            // ready 用来避免高频率的产生动画效果
            var ready = true;
            // 容器
            var img = document.querySelector('#container');
            // 动画时间,单位是s
            var S = 1;
            // 每行 R 个 碎片
            var R = 4;
            // 每列 C 个 碎片
            var C = 7;
            // 容器宽度
            var W = parseInt(window.getComputedStyle(img)['width']);
            // 容器高度
            var H = parseInt(window.getComputedStyle(img)['height']);
            // 控制碎片的范围
            var N = 2;
            // 碎片分散时，整个活动范围的宽
            var maxW = N * W;
            // 碎片分散时，整个活动范围的高
            var maxH = N * H;
            // 控制显示第 now 张图片
            var now = 0;
            // 保存图片路径的数组
            var imgArr = [
                'http://ovznvnuh8.bkt.clouddn.com/11k.png',
                'http://ovznvnuh8.bkt.clouddn.com/3k.jpg',
                'http://ovznvnuh8.bkt.clouddn.com/12k.png',
            ];
            img.style.background = 'url(' + imgArr[0] + ') no-repeat';
            var next = function () {
                return (now + 1) % imgArr.length;
            }

            img.onmouseover = function () {
                // 如果ready 为false 不产生动画效果
                if (!ready) return;
                ready = false;
                // 创建文档片段
                var html = document.createDocumentFragment();

                // 修改容器背景图
                if (now + 1 &gt;= imgArr.length) {
                    img.style.background = 'url(' + imgArr[0] + ') no-repeat';
                } else {
                    img.style.background = 'url(' + imgArr[now + 1] + ') no-repeat';
                }
                // posArr 用来保存每个碎片的初始位置和结束位置，
                var posArr = [];
                var k = 0;
                
                // 生成一定数量的小div元素，覆盖在容器上
                for (var i = 0; i &lt; R; i++) {
                    for (var j = 0; j &lt; C; j++) {
                        posArr[k] = {
                            // left 代表碎片初始时的 left 值
                            left: W * j / C,
                            // top 代表碎片初始时的 top 值
                            top: H * i / R,
                            // endLeft 代表动画结束时的 left 值
                            endLeft: maxW * j / C - (maxW - (maxW - W) / C - W) / 2,
                            // endTop 代表动画结束时的 top 值
                            endTop: maxH * i / R - (maxH - (maxH - H) / R - H) / 2,
                            // (maxW-(maxW-W)/C-W)/2 和 (maxH-(maxH-H)/R-H)/2 是为了让碎片能在容器的周围散开
                        };

                        // 创建一个div，一个div就是一个碎片
                        var debris = document.createElement("div");
                        // url 用来表示碎片的背景图的路径
                        var url = imgArr[now];
                        // 初始时，碎片的样式
                        debris.style.cssText = `
                            position: absolute;
                            width: ${Math.ceil(W / C)}px;
                            height: ${Math.ceil(H / R)}px;
                            background: url(${url}) -${posArr[k].left}px -${posArr[k].top}px  no-repeat;
                            left: ${posArr[k].left}px;
                            top: ${posArr[k].top}px;
                            opacity:1;
                            transition:${randomNum(0.1, S)}s ease;
                            `;
                        // 把创建的每个div，添加到文档片段中
                        html.appendChild(debris);
                        k++;
                    }
                }
                // 把文档片段 加到DOM树中
                img.appendChild(html);

                // 获取容器的所有子元素，也就是所有的碎片
                var debrisAll = img.children;
                // 改变每个碎片样式，实现动画效果
                setTimeout(function () {
                    for (var i = 0; i &lt; debrisAll.length; i++) {
                        var l = posArr[i].endLeft;
                        var t = posArr[i].endTop;
                        debrisAll[i].style.cssText += `
                            left : ${l}px;
                            top : ${t}px;
                            opacity :0;
                            transform:perspective(500px) rotateX(${randomNum(-180, 180)}deg) rotateY(${randomNum(-180, 180)}deg) rotateZ(${randomNum(-180, 180)}deg) scale(${randomNum(1.5, 3)});
                        `;
                    }
                    // 动画效果完成后
                    // 删除碎片
                    // 把ready 设置为true，可以再次产生动画效果
                    // 改变 now的值，也就是改变当前要显示的图片
                    setTimeout(function () {
                        img.innerHTML = '';
                        ready = true;
                        now = next();
                    }, S * 1000);

                }, 100);
            }

            // 产生一个 n - m 之间的随机数
            function randomNum(n, m) {
                return Math.random() * (m - n) + n;
            }
        }
    &lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
<h4>总结</h4>
<p>这个效果其实和上次实现的一个雪花效果很类似，<br><a href="https://segmentfault.com/a/1190000012225458">简单说 JavaScript实现雪花飘落效果</a>  都是利用定时器实现的动画，定时器应该算是这个效果的重点了，该好好理解下。 </p>
<p>这个效果，代码中设置的是让碎片在容器周围散开，当然你也可以在代码中修改 碎片的 endLeft 和 endTop 的值，来改变方向，比如如果改成这样</p>
<pre><code>endLeft: maxW * j / C - (maxW - W),
endTop: maxH * i / R - (maxH- H),</code></pre>
<p>产生的效果就是向左上方移动</p>
<p><span class="img-wrap"><img data-src="https://www.kkkk1000.com/images/20180509105247715.gif" src="https://static.alili.techhttps://www.kkkk1000.com/images/20180509105247715.gif" alt="图片未加载" title="图片未加载"></span></p>
<p><span class="img-wrap"><img data-src="https://www.kkkk1000.com/images/wxQrCode2.png" src="https://static.alili.techhttps://www.kkkk1000.com/images/wxQrCode2.png" alt="前端简单说" title="前端简单说"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript实现爆炸碎片的 图片切换 效果

## 原文链接
[https://segmentfault.com/a/1190000014840539](https://segmentfault.com/a/1190000014840539)

