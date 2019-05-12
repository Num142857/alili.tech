---
title: 'canvas图片绘制跨域问题解决方案Tainted canvases may not be exported' 
date: 2018-12-04 2:30:05
hidden: true
slug: 36wz8xwth1c
categories: [reprint]
---

{{< raw >}}

                    
<h3>图片跨域问题的一般解决方法</h3>
<p>当使用canvas绘制网络图片的时候，经常会出现“Tainted canvases may not be exported”报错，上网搜一下解决方案，应该给的都是给img添加crossOrigin属性，尝试了一下，确实可用。<br>看下面的一个例子：<br>html代码：</p>
<pre><code class="json">&lt;canvas id="canvas" style="display: none"&gt;&lt;/canvas&gt;
&lt;img id="canvasImg" /&gt;</code></pre>
<p>javascript代码：</p>
<pre><code class="javascript">var img = new Image();
img.setAttribute('crossOrigin', 'anonymous');
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');
img.onload = function () {
    canvas.width = img.width;
    canvas.height = img.height + 200;
    ctx.drawImage(img, 0, 0);
      document.getElementById('canvasImg').src = canvas.toDataURL("image/jpeg", 1);
    }
img.src = 'http://img.hb.aicdn.com/38d8f519b3f464a80d85ed9632fed904ed0181f41d632-ZHrigO_fw658';</code></pre>
<p>这样就可以正常画出图片了。</p>
<h3>微信图片的问题</h3>
<p>但是我发现这个方法用于绘制微信头像的时候有概率会出现问题，当然了这里面指的是将图片的网络地址直接赋值给图片的src。【之所以说有概率会出现问题是因为我通过上面的方法去完成需求的时候并没有画出头像（微信头像放在wx.qlogo.cn域名下，然而我今天准备写这篇文章的时候突然就可以了，见鬼<br>当时的时候我们找了很多方法，发现，在头像url后面加上时间戳的话就可以了【emmm神操作<br>即：</p>
<pre><code class="json">img.src = 'http://wx.qlogo.cn/mmopen/vi_32/RnLIHfXibgFHlticiclzflpriaLsC3TS9b2Sbj05Wh3vGlhcFutt18dfkXGUt8x11e4q2KHlX4EHHaBb6XylLQW1kQ/0?timeStamp='+new Date();</code></pre>
<h3>其他的解法</h3>
<p>今天找了个新的方法去解决canvas图片跨域的问题：<br>将文件读入到blob文件对象，然后使用URL.createObjectURL转换成src可用的地址</p>
<pre><code class="json">//直接读成blob文件对象
function getImageBlob (url, cb) {
   var xhr = new XMLHttpRequest();
   xhr.open('get', url, true);
   xhr.responseType = 'blob';
   xhr.onload = function () {
     if (this.status == 200) {
       imgResponse = this.response;
       //这里面可以直接通过URL的api将其转换，然后赋值给img.src
       //也可以使用下面的preView方法将其转换成base64之后再赋值
       img.src = URL.createObjectURL(this.response);
     }
    };
    xhr.send();
  }
  //这里面将blob转换成base64
  function preView (url) {
    let reader = new FileReader();
    getImageBlob(url, function (blob) {
       reader.readAsDataURL(blob);
    });
    reader.onload = function (e) {
      console.log(e.loaded)
    }
  }
  img.onload = function () {
    canvas.width = img.width;
    canvas.height = img.height + 200;
    ctx.drawImage(img, 0, 0);
    document.getElementById('canvasImg').src = canvas.toDataURL("image/jpeg", 1);
  }
  var imgResponse = '';
 getImageBlob('http://wx.qlogo.cn/mmopen/vi_32/RnLIHfXibgFHlticiclzflpriaLsC3TS9b2Sbj05Wh3vGlhcFutt18dfkXGUt8x11e4q2KHlX4EHHaBb6XylLQW1kQ/0');</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
canvas图片绘制跨域问题解决方案Tainted canvases may not be exported

## 原文链接
[https://segmentfault.com/a/1190000014478087](https://segmentfault.com/a/1190000014478087)

