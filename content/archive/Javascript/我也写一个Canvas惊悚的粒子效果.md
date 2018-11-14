---
title: 我也写一个Canvas惊悚的粒子效果
tags: Javascript
slug: 95852f7d
keywords: Javascript,html5,canvas
date: 2016-09-04 11:46:35
---

预览:
[Canvas简单粒子效果预览](http://alili.tech/examples/canvas/1.html)


```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Canvas简单粒子效果预览</title>
    <style>
        html,
        body {
            margin: 0;
            padding: 0;
            height: 100%;
            overflow: hidden;
        }
    </style>
</head>
<body>
    <canvas id="dotCanvas"></canvas>
    <script>
        (function () {
            //创建canvas对象
            var domConvas = document.getElementById("dotCanvas");
            var oCanvas = domConvas.getContext("2d");

            var winWidth = document.documentElement.clientWidth;
            var winHeight = document.documentElement.clientHeight;

            //设置宽高
            domConvas.width = winWidth;
            domConvas.height = winHeight;

            //初始化点,并且随机给出每一个点的位置与速度
            var dots = [];
            for (var i = 0; i < 300; i++) {
                dots.push({
                    x: Math.random() * winWidth >> 0,
                    y: Math.random() * winHeight >> 0,
                    xm: (amen() ? 1 : 2.5) * (amen() ? -1 : 1),
                    ym: (amen() ? 1 : 2.5) * (amen() ? -1 : 1),
                    max: 6000
                })
            }

            //随机函数
            function amen() {
                return !!(Math.random() * 10 >> 0) % 2
            }

            dotMove();

            //开始运动
            function dotMove() {
                //清空canvas,便于重绘
                oCanvas.clearRect(0, 0, winWidth, winHeight)

                //给出点新的位置,开始移动
                dots.forEach(function (dot, index) {
                    dot.x = dot.x + dot.xm;
                    dot.y = dot.y + dot.ym;

                    //粒子超出屏幕处理
                    if (dot.x < 0 || dot.x > winWidth) {
                        dot.xm = dot.xm * -1
                    }

                    if (dot.y < 0 || dot.y > winHeight) {
                        dot.ym = dot.ym * -1
                    }

                    //重绘画布
                    oCanvas.fillRect(dot.x, dot.y, 2, 2);


                    //根据距离画线
                    for (var i = 0; i < dots.length; i++) {
                        var dot2 = dots[i];
                        if (dot2 == dot) continue;

                        var gou = dot.y - dot2.y;
                        var gu = dot.x - dot2.x;

                        //勾股定理
                        var xian = gou * gou + gu * gu;
                        
                        if (xian < dot2.max) {
                            //如果符合条件 开始画线
                            oCanvas.beginPath();
                            oCanvas.strokeStyle = 'rgba(0,0,0,1)';
                            oCanvas.lineWidth=1;
                            oCanvas.moveTo(dot.x, dot.y); //画线的起点
                            oCanvas.lineTo(dot2.x,dot2.y) //画线的终点
                            oCanvas.stroke()
                        }
                    }
                })

                //每秒60帧刷新
                requestAnimationFrame(dotMove)
            }

        })()
    </script>
</body>

</html>
```