---
title: 花样形状 -- CSS
reprint: true
categories: reprint
abbrlink: 1dfbda1f
date: 2018-11-14 02:30:09
---

{{% raw %}}
<p>&#x53EA;&#x4F7F;&#x7528;&#x4E00;&#x4E2A;html&#x5143;&#x7D20;&#x7ED8;&#x5236;&#x56FE;&#x5F62;&#xFF0C;&#x90E8;&#x5206;&#x56FE;&#x5F62;&#x9700;&#x8981;&#x6D4F;&#x89C8;&#x5668;&#x652F;&#x6301;</p><h1>&#x6B63;&#x65B9;&#x5F62; Square</h1><pre><code>        #square {
            width: 100px;
            height: 100px;
            background: dodgerblue;
        }</code></pre><h1>&#x957F;&#x65B9;&#x5F62; Rectangle</h1><pre><code>        #rectangle {
            width: 200px;
            height: 100px;
            background: dodgerblue;
        }</code></pre><h1>&#x5706;&#x5F62; Circle</h1><pre><code>        #circle {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            background: dodgerblue;
        }</code></pre><h1>&#x692D;&#x5706;&#x5F62; Oval</h1><pre><code>        #oval {
            width: 200px;
            height: 100px;
            border-radius: 50%;
            background: dodgerblue;
        }</code></pre><h1>&#x4E09;&#x89D2;&#x5F62;&#x5411;&#x4E0A; Triangle Up</h1><pre><code>        #triangle-up {
            width: 0;
            height: 0;
            border-left: 50px solid transparent;
            border-right: 50px solid transparent;
            border-bottom: 100px solid dodgerblue;
        }</code></pre><h1>&#x4E09;&#x89D2;&#x5F62;&#x5411;&#x4E0B; Triangle Down</h1><pre><code>        #triangle-down {
            width: 0;
            height: 0;
            border-top: 100px solid dodgerblue;
            border-left: 50px solid transparent;
            border-right: 50px solid transparent;
        }</code></pre><h1>&#x4E09;&#x89D2;&#x5F62;&#x5411;&#x5DE6; Triangle Left</h1><pre><code>        #triangle-left {
            width: 0;
            height: 0;
            border-top: 50px solid transparent;
            border-right: 100px solid dodgerblue;
            border-bottom: 50px solid transparent;
        }</code></pre><h1>&#x4E09;&#x89D2;&#x5F62;&#x5411;&#x53F3; Triangle Right</h1><pre><code>        #triangle-right {
            width: 0;
            height: 0;
            border-top: 50px solid transparent;
            border-left: 100px solid dodgerblue;
            border-bottom: 50px solid transparent;
        }</code></pre><h1>&#x4E09;&#x89D2;&#x5F62;&#x5DE6;&#x4E0A;&#x89D2; Triangle Top Left</h1><pre><code>        #triangle-topleft {
            width: 0;
            height: 0;
            border-top: 100px solid dodgerblue;
            border-right: 100px solid transparent;
        }</code></pre><h1>&#x4E09;&#x89D2;&#x5F62;&#x53F3;&#x4E0A;&#x89D2; Triangle Top Right</h1><pre><code>        #triangle-topright {
            width: 0;
            height: 0;
            border-top: 100px solid dodgerblue;
            border-left: 100px solid transparent;
        }</code></pre><h1>&#x4E09;&#x89D2;&#x5F62;&#x5DE6;&#x4E0B;&#x89D2; Triangle Bottom Left</h1><pre><code>        #triangle-bottomleft {
            width: 0;
            height: 0;
            border-bottom: 100px solid dodgerblue;
            border-right: 100px solid transparent;
        }</code></pre><h1>&#x4E09;&#x89D2;&#x5F62;&#x53F3;&#x4E0B;&#x89D2; Triangle Bottom Right</h1><pre><code>        #triangle-bottomright {
            width: 0;
            height: 0;
            border-bottom: 100px solid dodgerblue;
            border-left: 100px solid transparent;
        }</code></pre><h1>&#x66F2;&#x7BAD;&#x5934; Curved Tail Arrow</h1><pre><code>        #curvedarrow {
            position: relative;
            width: 0;
            height: 0;
            margin-left: 20px;
            border-top: 9px solid transparent;
            border-right: 9px solid dodgerblue;
            transform: rotate(10deg);
        }

        #curvedarrow:after {
            content: &quot;&quot;;
            position: absolute;
            top: -12px;
            left: -9px;
            width: 12px;
            height: 12px;
            border: 0 solid transparent;
            border-top: 3px solid dodgerblue;
            border-radius: 20px 0 0 0;
            transform: rotate(45deg);
        }</code></pre><h1>&#x68AF;&#x5F62; Trapezoid</h1><pre><code>        #trapezoid {
            width: 100px;
            height: 0;
            border-bottom: 100px solid dodgerblue;
            border-left: 50px solid transparent;
            border-right: 50px solid transparent;
        }</code></pre><h1>&#x5E73;&#x884C;&#x56DB;&#x8FB9;&#x5F62; Parallelogram</h1><pre><code>        #parallelogram {
            width: 150px;
            height: 100px;
            margin-left: 20px;
            transform: skew(20deg);
            background: dodgerblue;
        }</code></pre><h1>&#x661F;&#x5F62;(6&#x70B9;) Star (6-points)</h1><pre><code>        #star-six {
            position: relative;
            width: 0;
            height: 0;
            margin-bottom: 40px;
            border-left: 50px solid transparent;
            border-right: 50px solid transparent;
            border-bottom: 100px solid dodgerblue;
        }

        #star-six:after {
            content: &quot;&quot;;
            position: absolute;
            top: 30px;
            left: -50px;
            width: 0;
            height: 0;
            border-left: 50px solid transparent;
            border-right: 50px solid transparent;
            border-top: 100px solid dodgerblue;
        }</code></pre><h1>&#x661F;&#x5F62;(5&#x70B9;) Star (5-points)</h1><pre><code>        #star-five {
            display: block;
            position: relative;
            width: 0px;
            height: 0px;
            margin: 50px 0;
            border-right: 50px solid transparent;
            border-bottom: 35px solid dodgerblue;
            border-left: 50px solid transparent;
            color: dodgerblue;
            transform: rotate(35deg);
        }

        #star-five:before {
            content: &apos;&apos;;
            display: block;
            position: absolute;
            top: -22.5px;
            left: -32.5px;
            height: 0;
            width: 0;
            border-bottom: 40px solid dodgerblue;
            border-left: 15px solid transparent;
            border-right: 15px solid transparent;
            transform: rotate(-35deg);
        }

        #star-five:after {
            content: &apos;&apos;;
            display: block;
            position: absolute;
            top: 1.5px;
            left: -52.5px;
            width: 0px;
            height: 0px;
            border-right: 50px solid transparent;
            border-bottom: 35px solid dodgerblue;
            border-left: 50px solid transparent;
            color: dodgerblue;
            transform: rotate(-70deg);
        }</code></pre><h1>&#x4E94;&#x89D2;&#x5F62; Pentagon</h1><pre><code>        #pentagon {
            position: relative;
            width: 54px;
            margin-top: 40px;
            border-width: 50px 18px 0;
            border-style: solid;
            border-color: dodgerblue transparent;
                        box-sizing: content-box;
        }

        #pentagon:before {
            content: &quot;&quot;;
            position: absolute;
            top: -85px;
            left: -18px;
            height: 0;
            width: 0;
            border-width: 0 45px 35px;
            border-style: solid;
            border-color: transparent transparent dodgerblue;
        }</code></pre><h1>&#x516D;&#x89D2;&#x5F62; Hexagon</h1><pre><code>        #hexagon {
            position: relative;
            width: 100px;
            height: 55px;
            margin: 40px 0;
            background: dodgerblue;
        }

        #hexagon:before {
            content: &quot;&quot;;
            position: absolute;
            top: -25px;
            left: 0;
            width: 0;
            height: 0;
            border-left: 50px solid transparent;
            border-right: 50px solid transparent;
            border-bottom: 25px solid dodgerblue;
        }

        #hexagon:after {
            content: &quot;&quot;;
            position: absolute;
            left: 0;
            bottom: -25px;
            width: 0;
            height: 0;
            border-left: 50px solid transparent;
            border-right: 50px solid transparent;
            border-top: 25px solid dodgerblue;
        }</code></pre><h1>&#x516B;&#x89D2;&#x5F62; Octagon</h1><pre><code>        #octagon {
            position: relative;
            width: 100px;
            height: 100px;
            background: dodgerblue;
                        box-sizing: content-box;
        }

        #octagon:before {
            content: &quot;&quot;;
            position: absolute;
            top: 0;
            left: 0;
            width: 42px;
            height: 0;
            border-bottom: 29px solid dodgerblue;
            border-left: 29px solid white;
            border-right: 29px solid white;
                        box-sizing: content-box;
        }

        #octagon:after {
            content: &quot;&quot;;
            position: absolute;
            bottom: 0;
            left: 0;
            width: 42px;
            height: 0;
            border-top: 29px solid dodgerblue;
            border-left: 29px solid white;
            border-right: 29px solid white;
                        box-sizing: content-box;
        }</code></pre><h1>&#x5FC3;&#x5F62; Heart</h1><pre><code>        #heart {
            position: relative;
            width: 100px;
            height: 90px;
        }

        #heart:before,
        #heart:after {
            position: absolute;
            content: &quot;&quot;;
            left: 50px;
            top: 0;
            width: 50px;
            height: 80px;
            border-radius: 50px 50px 0 0;
            background: dodgerblue;
            transform: rotate(-45deg);
            transform-origin: 0 100%;
        }

        #heart:after {
            left: 0;
            transform: rotate(45deg);
            transform-origin: 100% 100%;
        }</code></pre><h1>&#x65E0;&#x9650;&#x5F62; Infinity</h1><pre><code>        #infinity {
            position: relative;
            width: 212px;
            height: 100px;
                        box-sizing: content-box;
        }

        #infinity:before,
        #infinity:after {
            content: &quot;&quot;;
            position: absolute;
            top: 0;
            left: 0;
            width: 60px;
            height: 60px;
            border: 20px solid dodgerblue;
            border-radius: 50px 50px 0 50px;
            transform: rotate(-45deg);
                        box-sizing: content-box;
        }

        #infinity:after {
            left: auto;
            right: 0;
            border-radius: 50px 50px 50px 0;
            transform: rotate(45deg);
        }</code></pre><h1>&#x83F1;&#x5F62; Diamond</h1><pre><code>        #diamond {
            position: relative;
            top: -50px;
            width: 0;
            height: 0;
                        margin: 20px;
            border: 50px solid transparent;
            border-bottom-color: dodgerblue;
        }

        #diamond:after {
            content: &apos;&apos;;
            position: absolute;
            left: -50px;
            top: 50px;
            width: 0;
            height: 0;
            border: 50px solid transparent;
            border-top-color: dodgerblue;
        }</code></pre><h1>&#x83F1;&#x5F62;(&#x7A84;) Diamond Narrow</h1><pre><code>        #diamond-narrow {
            position: relative;
            top: -50px;
            width: 0;
            height: 0;
                        margin: 20px;
            border: 50px solid transparent;
            border-bottom: 70px solid dodgerblue;
        }

        #diamond-narrow:after {
            content: &apos;&apos;;
            position: absolute;
            top: 70px;
            left: -50px;
            width: 0;
            height: 0;
            border: 50px solid transparent;
            border-top: 70px solid dodgerblue;
        }</code></pre><h1>&#x83F1;&#x5F62;(&#x76FE;) Diamond Shield</h1><pre><code>        #diamond-shield {
            position: relative;
            top: -50px;
            width: 0;
            height: 0;
            margin-bottom: 20px;
            border: 50px solid transparent;
            border-bottom: 20px solid dodgerblue;
        }

        #diamond-shield:after {
            content: &apos;&apos;;
            position: absolute;
            top: 20px;
            left: -50px;
            width: 0;
            height: 0;
            border: 50px solid transparent;
            border-top: 70px solid dodgerblue;
        }</code></pre><h1>&#x94BB;&#x77F3; Diamond</h1><pre><code>        #cut-diamond {
            position: relative;
            width: 50px;
            height: 0;
            margin: 20px 0 80px 0;
            border-style: solid;
            border-color: transparent transparent dodgerblue transparent;
            border-width: 0 25px 25px 25px;
                        box-sizing: content-box;
        }

        #cut-diamond:after {
            content: &quot;&quot;;
            position: absolute;
            top: 25px;
            left: -25px;
            width: 0;
            height: 0;
            border-style: solid;
            border-color: dodgerblue transparent transparent transparent;
            border-width: 70px 50px 0 50px;
        }</code></pre><h1>&#x86CB;&#x5F62; Egg</h1><pre><code>        #egg {
            display: block;
            width: 120px;
            height: 150px;
                        margin: 20px;
            border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
            background-color: dodgerblue;
        }</code></pre><h1>&#x98DF;&#x8C46;&#x5C0F;&#x5B50; Pac-Man</h1><pre><code>        #pacman {
            width: 0px;
            height: 0px;
                        margin: 20px;
            border-right: 60px solid transparent;
            border-top: 60px solid dodgerblue;
            border-left: 60px solid dodgerblue;
            border-bottom: 60px solid dodgerblue;
            border-top-left-radius: 60px;
            border-top-right-radius: 60px;
            border-bottom-left-radius: 60px;
            border-bottom-right-radius: 60px;
        }</code></pre><h1>&#x8C08;&#x8BDD;&#x6CE1; Talk Bubble</h1><pre><code>        #talkbubble {
            position: relative;
            width: 120px;
            height: 80px;
            margin: 30px;
            border-radius: 10px;
            background: dodgerblue;
        }

        #talkbubble:before {
            content: &quot;&quot;;
            position: absolute;
            right: 100%;
            top: 26px;
            width: 0;
            height: 0;
            border-top: 13px solid transparent;
            border-right: 26px solid dodgerblue;
            border-bottom: 13px solid transparent;
        }</code></pre><h1>&#x7206;&#x70B8;(12&#x70B9;) Burst(12-points)</h1><pre><code>        #burst-12 {
            position: relative;
            width: 80px;
            height: 80px;
            margin: 20px;
            text-align: center;
            background: dodgerblue;
        }

        #burst-12:before,
        #burst-12:after {
            content: &quot;&quot;;
            position: absolute;
            top: 0;
            left: 0;
            height: 80px;
            width: 80px;
            background: dodgerblue;
        }

        #burst-12:before {
            transform: rotate(30deg);
        }

        #burst-12:after {
            transform: rotate(60deg);
        }</code></pre><h1>&#x7206;&#x70B8;(8&#x70B9;) Burst(8-points)</h1><pre><code>        #burst-8 {
            position: relative;
            width: 80px;
            height: 80px;
            margin: 20px;
            text-align: center;
            background: dodgerblue;
            transform: rotate(20deg);
        }

        #burst-8:before {
            content: &quot;&quot;;
            position: absolute;
            top: 0;
            left: 0;
            height: 80px;
            width: 80px;
            background: dodgerblue;
            transform: rotate(135deg);
        }</code></pre><h1>&#x592A;&#x6781; Tai Chi</h1><pre><code>        #yin-yang {
            position: relative;
            width: 96px;
            height: 48px;
            background: white;
            border-width: 2px 2px 50px 2px;
            border-style: solid;
            border-color: dodgerblue;
            border-radius: 100%;
                        box-sizing: content-box;
        }

        #yin-yang:before {
            content: &quot;&quot;;
            position: absolute;
            top: 50%;
            left: 0;
            width: 12px;
            height: 12px;
            border: 18px solid dodgerblue;
            border-radius: 100%;
            background: white;
                        box-sizing: content-box;
        }

        #yin-yang:after {
            content: &quot;&quot;;
            position: absolute;
            top: 50%;
            left: 50%;
            width: 12px;
            height: 12px;
            border: 18px solid white;
            border-radius: 100%;
            background: dodgerblue;
                        box-sizing: content-box;
        }</code></pre><h1>&#x5FBD;&#x7AE0; Badge Ribbon</h1><pre><code>        #badge-ribbon {
            position: relative;
            width: 100px;
            height: 100px;
            margin-bottom: 40px;
            border-radius: 50px;
            background: dodgerblue;
        }

        #badge-ribbon:before,
        #badge-ribbon:after {
            content: &apos;&apos;;
            position: absolute;
            top: 70px;
            left: -10px;
            border-bottom: 70px solid dodgerblue;
            border-left: 40px solid transparent;
            border-right: 40px solid transparent;
            transform: rotate(-140deg);
        }

        #badge-ribbon:after {
            left: auto;
            right: -10px;
            transform: rotate(140deg);
        }</code></pre><h1>&#x592A;&#x7A7A;&#x4FB5;&#x7565;&#x8005; Space Invader</h1><pre><code>        #space-invader {
            width: 1em;
            height: 1em;
            margin: 70px 20px 90px 85px;
            overflow: hidden;
            background: dodgerblue;
            box-shadow: 0 0 0 1em dodgerblue,
            0 1em 0 1em dodgerblue,
            -2.5em 1.5em 0 .5em dodgerblue,
            2.5em 1.5em 0 .5em dodgerblue,
            -3em -3em 0 0 dodgerblue,
            3em -3em 0 0 dodgerblue,
            -2em -2em 0 0 dodgerblue,
            2em -2em 0 0 dodgerblue,
            -3em -1em 0 0 dodgerblue,
            -2em -1em 0 0 dodgerblue,
            2em -1em 0 0 dodgerblue,
            3em -1em 0 0 dodgerblue,
            -4em 0 0 0 dodgerblue,
            -3em 0 0 0 dodgerblue,
            3em 0 0 0 dodgerblue,
            4em 0 0 0 dodgerblue,
            -5em 1em 0 0 dodgerblue,
            -4em 1em 0 0 dodgerblue,
            4em 1em 0 0 dodgerblue,
            5em 1em 0 0 dodgerblue,
            -5em 2em 0 0 dodgerblue,
            5em 2em 0 0 dodgerblue,
            -5em 3em 0 0 dodgerblue,
            -3em 3em 0 0 dodgerblue,
            3em 3em 0 0 dodgerblue,
            5em 3em 0 0 dodgerblue,
            -2em 4em 0 0 dodgerblue,
            -1em 4em 0 0 dodgerblue,
            1em 4em 0 0 dodgerblue,
            2em 4em 0 0 dodgerblue;
        }</code></pre><h1>TV&#x5F62; TV Screen</h1><pre><code>        #tv {
            position: relative;
            width: 150px;
            height: 100px;
            margin: 20px;
            text-align: center;
            text-indent: .1em;
            background: dodgerblue;
            border-radius: 50% / 10%;
            color: white;
        }

        #tv:before {
            content: &apos;&apos;;
            position: absolute;
            top: 10%;
            bottom: 10%;
            right: -5%;
            left: -5%;
            border-radius: 5% / 50%;
            background: inherit;
        }</code></pre><h1>&#x81C2;&#x7AE0; Chevron</h1><pre><code>        #chevron {
            position: relative;
            width: 150px;
            height: 60px;
                        margin: 20px;
        }

        #chevron:before {
            content: &apos;&apos;;
            position: absolute;
            top: 0;
            left: 0;
            width: 51%;
            height: 100%;
            background: dodgerblue;
            transform: skew(0deg, 6deg);
        }

        #chevron:after {
            content: &apos;&apos;;
            position: absolute;
            top: 0;
            right: 0;
            width: 50%;
            height: 100%;
            background: dodgerblue;
            transform: skew(0deg, -6deg);
        }</code></pre><h1>&#x653E;&#x5927;&#x955C; Magnifying Glass</h1><pre><code>        #magnifying-glass {
            display: inline-block;
            position: relative;
            width: 0.4em;
            height: 0.4em;
                        margin: 0.1em;
            border: 0.1em solid dodgerblue;
            border-radius: 0.35em;
            font-size: 10em;
                        box-sizing: content-box;
        }

        #magnifying-glass::before {
            content: &quot;&quot;;
            display: inline-block;
            position: absolute;
            right: -0.25em;
            bottom: -0.1em;
            width: 0.35em;
            height: 0.08em;
            border-width: 0;
            background: dodgerblue;
            transform: rotate(45deg);
        }</code></pre><h1>&#x6708;&#x4EAE; Moon</h1><pre><code>        #moon {
            width: 80px;
            height: 80px;
                        margin: 20px;
            border-radius: 50%;
            box-shadow: 15px 15px 0 0 dodgerblue;
        }</code></pre><h1>&#x65D7;&#x5E1C; Flag</h1><pre><code>        #flag {
            position: relative;
            width: 110px;
            height: 56px;
                        margin: 20px;
            padding-top: 15px;
            font-size: 11px;
            letter-spacing: 0.2em;
            text-align: center;
            text-transform: uppercase;
            color: white;
            background: dodgerblue;
                        box-sizing: content-box;
        }

        #flag:after {
            content: &quot;&quot;;
            position: absolute;
            left: 0;
            bottom: 0;
            width: 0;
            height: 0;
            border-bottom: 13px solid white;
            border-left: 55px solid transparent;
            border-right: 55px solid transparent;
        }</code></pre><h1>&#x9525;&#x4F53; Cone</h1><pre><code>        #cone {
            width: 0;
            height: 0;
                        margin: 20px;
            border-left: 70px solid transparent;
            border-right: 70px solid transparent;
            border-top: 100px solid dodgerblue;
            border-radius: 50%;
        }</code></pre><h1>&#x5341;&#x5B57;&#x67B6; Cross</h1><pre><code>        #cross {
            position: relative;
            width: 20px;
            height: 100px;
            margin: 20px 50px;
            background: dodgerblue;
        }

        #cross:after {
            content: &quot;&quot;;
            position: absolute;
            top: 40px;
            left: -40px;
            width: 100px;
            height: 20px;
            background: dodgerblue;
        }</code></pre><h1>&#x57FA;&#x5730; Base</h1><pre><code>        #base {
            display: inline-block;
            position: relative;
            width: 100px;
            height: 55px;
            margin-left: 20px;
            margin-top: 35px;
            background: dodgerblue;
        }

        #base:before {
            content: &quot;&quot;;
            position: absolute;
            width: 0;
            height: 0;
            top: -35px;
            left: 0;
            border-bottom: 35px solid dodgerblue;
            border-left: 50px solid transparent;
            border-right: 50px solid transparent;
        }</code></pre><h1>&#x6307;&#x9488; Pointer</h1><pre><code>        #pointer {
            position: relative;
            width: 200px;
            height: 40px;
                        margin: 20px;
            background: dodgerblue;
        }

        #pointer:after {
            content: &quot;&quot;;
            position: absolute;
            left: 0;
            bottom: 0;
            width: 0;
            height: 0;
            border-left: 20px solid white;
            border-top: 20px solid transparent;
            border-bottom: 20px solid transparent;
        }

        #pointer:before {
            content: &quot;&quot;;
            position: absolute;
            right: -20px;
            bottom: 0;
            width: 0;
            height: 0;
            border-left: 20px solid dodgerblue;
            border-top: 20px solid transparent;
            border-bottom: 20px solid transparent;
        }</code></pre><p><strong>&#x539F;&#x6587;&#x94FE;&#x63A5;&#xFF1A;<a href="http://www.bestvist.com/p/58" rel="nofollow noreferrer">http://www.bestvist.com/p/58</a></strong><br><strong>&#x539F;&#x6587;&#x6709;&#x6548;&#x679C;&#x66F4;&#x76F4;&#x89C2;&#x5466;</strong><br><strong><a href="https://github.com/bestvist/css-shape" rel="nofollow noreferrer">GitHub&#x5730;&#x5740;</a> &#x6B22;&#x8FCE;star ^ _ ^</strong></p>
{{% /raw %}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
花样形状 -- CSS

## 原文链接
[https://segmentfault.com/a/1190000016169076](https://segmentfault.com/a/1190000016169076)

