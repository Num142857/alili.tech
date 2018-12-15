---
title: 'jQuery与vue分别实现超级简单的绿色拖动验证码功能' 
date: 2018-12-15 2:30:11
hidden: true
slug: pbi9mqtlnno
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">jquery的绿色拖动验证功能</h2>
<p>在网上看到了一个这样的问题：<a href="https://segmentfault.com/q/1010000005083860">那种像拖动滑块匹配图形的验证方式是怎么实现的？</a>。</p>
<p>突然想到实现一个简单绿色拖动验证码的功能，在网上搜了下，有一个用jquery实现的该功能代码。</p>
<p>体验地址：<a href="http://yanshi.sucaihuo.com/jquery/8/897/demo/" rel="nofollow noreferrer" target="_blank">http://yanshi.sucaihuo.com/jquery/8/897/demo/</a>。</p>
<p>其CSS代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#drag{ 
    position: relative;
    background-color: #e8e8e8;
    width: 300px;
    height: 34px;
    line-height: 34px;
    text-align: center;
}
#drag .handler{
    position: absolute;
    top: 0px;
    left: 0px;
    width: 40px;
    height: 32px;
    border: 1px solid #ccc;
    cursor: move;
}
.handler_bg{
    background: #fff url(&quot;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ZDhlNWY5My05NmI0LTRlNWQtOGFjYi03ZTY4OGYyMTU2ZTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NTEyNTVEMURGMkVFMTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTEyNTVEMUNGMkVFMTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2MTc5NzNmZS02OTQxLTQyOTYtYTIwNi02NDI2YTNkOWU5YmUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NGQ4ZTVmOTMtOTZiNC00ZTVkLThhY2ItN2U2ODhmMjE1NmU2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+YiRG4AAAALFJREFUeNpi/P//PwMlgImBQkA9A+bOnfsIiBOxKcInh+yCaCDuByoswaIOpxwjciACFegBqZ1AvBSIS5OTk/8TkmNEjwWgQiUgtQuIjwAxUF3yX3xyGIEIFLwHpKyAWB+I1xGSwxULIGf9A7mQkBwTlhBXAFLHgPgqEAcTkmNCU6AL9d8WII4HOvk3ITkWJAXWUMlOoGQHmsE45ViQ2KuBuASoYC4Wf+OUYxz6mQkgwAAN9mIrUReCXgAAAABJRU5ErkJggg==&quot;) no-repeat center;
}
.handler_ok_bg{
    background: #fff url(&quot;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ZDhlNWY5My05NmI0LTRlNWQtOGFjYi03ZTY4OGYyMTU2ZTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDlBRDI3NjVGMkQ2MTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDlBRDI3NjRGMkQ2MTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDphNWEzMWNhMC1hYmViLTQxNWEtYTEwZS04Y2U5NzRlN2Q4YTEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NGQ4ZTVmOTMtOTZiNC00ZTVkLThhY2ItN2U2ODhmMjE1NmU2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+k+sHwwAAASZJREFUeNpi/P//PwMyKD8uZw+kUoDYEYgloMIvgHg/EM/ptHx0EFk9I8wAoEZ+IDUPiIMY8IN1QJwENOgj3ACo5gNAbMBAHLgAxA4gQ5igAnNJ0MwAVTsX7IKyY7L2UNuJAf+AmAmJ78AEDTBiwGYg5gbifCSxFCZoaBMCy4A4GOjnH0D6DpK4IxNSVIHAfSDOAeLraJrjgJp/AwPbHMhejiQnwYRmUzNQ4VQgDQqXK0ia/0I17wJiPmQNTNBEAgMlQIWiQA2vgWw7QppBekGxsAjIiEUSBNnsBDWEAY9mEFgMMgBk00E0iZtA7AHEctDQ58MRuA6wlLgGFMoMpIG1QFeGwAIxGZo8GUhIysmwQGSAZgwHaEZhICIzOaBkJkqyM0CAAQDGx279Jf50AAAAAABJRU5ErkJggg==&quot;) no-repeat center;
}
#drag .drag_bg{
    background-color: #7ac23c;
    height: 34px;
    width: 0px;
}
#drag .drag_text{
    position: absolute;
    top: 0px;
    width: 300px;
    -moz-user-select: none;
    -webkit-user-select: none;
    user-select: none;
    -o-user-select:none;
    -ms-user-select:none; 
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-id">#drag</span>{ 
    <span class="hljs-attribute">position</span>: relative;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#e8e8e8</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">300px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">34px</span>;
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">34px</span>;
    <span class="hljs-attribute">text-align</span>: center;
}
<span class="hljs-selector-id">#drag</span> <span class="hljs-selector-class">.handler</span>{
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">0px</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">0px</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">40px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">32px</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#ccc</span>;
    <span class="hljs-attribute">cursor</span>: move;
}
<span class="hljs-selector-class">.handler_bg</span>{
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#fff</span> <span class="hljs-built_in">url</span>(<span class="hljs-string">"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ZDhlNWY5My05NmI0LTRlNWQtOGFjYi03ZTY4OGYyMTU2ZTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NTEyNTVEMURGMkVFMTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTEyNTVEMUNGMkVFMTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2MTc5NzNmZS02OTQxLTQyOTYtYTIwNi02NDI2YTNkOWU5YmUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NGQ4ZTVmOTMtOTZiNC00ZTVkLThhY2ItN2U2ODhmMjE1NmU2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+YiRG4AAAALFJREFUeNpi/P//PwMlgImBQkA9A+bOnfsIiBOxKcInh+yCaCDuByoswaIOpxwjciACFegBqZ1AvBSIS5OTk/8TkmNEjwWgQiUgtQuIjwAxUF3yX3xyGIEIFLwHpKyAWB+I1xGSwxULIGf9A7mQkBwTlhBXAFLHgPgqEAcTkmNCU6AL9d8WII4HOvk3ITkWJAXWUMlOoGQHmsE45ViQ2KuBuASoYC4Wf+OUYxz6mQkgwAAN9mIrUReCXgAAAABJRU5ErkJggg=="</span>) no-repeat center;
}
<span class="hljs-selector-class">.handler_ok_bg</span>{
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#fff</span> <span class="hljs-built_in">url</span>(<span class="hljs-string">"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ZDhlNWY5My05NmI0LTRlNWQtOGFjYi03ZTY4OGYyMTU2ZTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDlBRDI3NjVGMkQ2MTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDlBRDI3NjRGMkQ2MTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDphNWEzMWNhMC1hYmViLTQxNWEtYTEwZS04Y2U5NzRlN2Q4YTEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NGQ4ZTVmOTMtOTZiNC00ZTVkLThhY2ItN2U2ODhmMjE1NmU2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+k+sHwwAAASZJREFUeNpi/P//PwMyKD8uZw+kUoDYEYgloMIvgHg/EM/ptHx0EFk9I8wAoEZ+IDUPiIMY8IN1QJwENOgj3ACo5gNAbMBAHLgAxA4gQ5igAnNJ0MwAVTsX7IKyY7L2UNuJAf+AmAmJ78AEDTBiwGYg5gbifCSxFCZoaBMCy4A4GOjnH0D6DpK4IxNSVIHAfSDOAeLraJrjgJp/AwPbHMhejiQnwYRmUzNQ4VQgDQqXK0ia/0I17wJiPmQNTNBEAgMlQIWiQA2vgWw7QppBekGxsAjIiEUSBNnsBDWEAY9mEFgMMgBk00E0iZtA7AHEctDQ58MRuA6wlLgGFMoMpIG1QFeGwAIxGZo8GUhIysmwQGSAZgwHaEZhICIzOaBkJkqyM0CAAQDGx279Jf50AAAAAABJRU5ErkJggg=="</span>) no-repeat center;
}
<span class="hljs-selector-id">#drag</span> <span class="hljs-selector-class">.drag_bg</span>{
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#7ac23c</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">34px</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">0px</span>;
}
<span class="hljs-selector-id">#drag</span> <span class="hljs-selector-class">.drag_text</span>{
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">0px</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">300px</span>;
    <span class="hljs-attribute">-moz-user-select</span>: none;
    <span class="hljs-attribute">-webkit-user-select</span>: none;
    <span class="hljs-attribute">user-select</span>: none;
    <span class="hljs-attribute">-o-user-select</span>:none;
    <span class="hljs-attribute">-ms-user-select</span>:none; 
}</code></pre>
<p>HTML代码结构：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<center style=&quot;margin-top: 100px&quot;>
    <div id=&quot;drag&quot;></div>
</center>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">center</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"margin-top: 100px"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"drag"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">center</span>&gt;</span></code></pre>
<p>JS调用方式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" $('#drag').drag();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mel"><code style="word-break: break-word; white-space: initial;"> $(<span class="hljs-string">'#drag'</span>).<span class="hljs-keyword">drag</span>();</code></pre>
<p>JS实现代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function($){
    $.fn.drag = function(options){
        var x, drag = this, isMove = false, defaults = {
        };
        var options = $.extend(defaults, options);
        //添加背景，文字，滑块
        var html = '<div class=&quot;drag_bg&quot;></div>'+
                    '<div class=&quot;drag_text&quot; onselectstart=&quot;return false;&quot; unselectable=&quot;on&quot;>拖动滑块验证</div>'+
                    '<div class=&quot;handler handler_bg&quot;></div>';
        this.append(html);
        
        var handler = drag.find('.handler');
        var drag_bg = drag.find('.drag_bg');
        var text = drag.find('.drag_text');
        var maxWidth = drag.width() - handler.width();  //能滑动的最大间距
        
        //鼠标按下时候的x轴的位置
        handler.mousedown(function(e){
            isMove = true;
            x = e.pageX - parseInt(handler.css('left'), 10);
        });
        
        //鼠标指针在上下文移动时，移动距离大于0小于最大间距，滑块x轴位置等于鼠标移动距离
        $(document).mousemove(function(e){
            var _x = e.pageX - x;
            if(isMove){
                if(_x > 0 &amp;&amp; _x <= maxWidth){
                    handler.css({'left': _x});
                    drag_bg.css({'width': _x});
                }else if(_x > maxWidth){  //鼠标指针移动距离达到最大时清空事件
                    dragOk();
                }
            }
        }).mouseup(function(e){
            isMove = false;
            var _x = e.pageX - x;
            if(_x < maxWidth){ //鼠标松开时，如果没有达到最大距离位置，滑块就返回初始位置
                handler.css({'left': 0});
                drag_bg.css({'width': 0});
            }
        });
        
        //清空事件
        function dragOk(){
            handler.removeClass('handler_bg').addClass('handler_ok_bg');
            text.text('验证通过');
            drag.css({'color': '#fff'});
            handler.unbind('mousedown');
            $(document).unbind('mousemove');
            $(document).unbind('mouseup');
        }
    };
})(jQuery);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scheme"><code>(<span class="hljs-name">function</span>(<span class="hljs-name">$</span>){
    $.fn.drag = function(<span class="hljs-name">options</span>){
        var x, drag = this, isMove = false, defaults = {
        }<span class="hljs-comment">;</span>
        var options = $.extend(<span class="hljs-name">defaults</span>, options)<span class="hljs-comment">;</span>
        //添加背景，文字，滑块
        var html = <span class="hljs-symbol">'&lt;div</span> class=<span class="hljs-string">"drag_bg"</span>&gt;&lt;/div&gt;<span class="hljs-symbol">'+</span>
                    <span class="hljs-symbol">'&lt;div</span> class=<span class="hljs-string">"drag_text"</span> onselectstart=<span class="hljs-string">"return false;"</span> unselectable=<span class="hljs-string">"on"</span>&gt;拖动滑块验证&lt;/div&gt;<span class="hljs-symbol">'+</span>
                    <span class="hljs-symbol">'&lt;div</span> class=<span class="hljs-string">"handler handler_bg"</span>&gt;&lt;/div&gt;'<span class="hljs-comment">;</span>
        this.append(<span class="hljs-name">html</span>)<span class="hljs-comment">;</span>
        
        var handler = drag.find(<span class="hljs-symbol">'.handler</span>')<span class="hljs-comment">;</span>
        var drag_bg = drag.find(<span class="hljs-symbol">'.drag_bg</span>')<span class="hljs-comment">;</span>
        var text = drag.find(<span class="hljs-symbol">'.drag_text</span>')<span class="hljs-comment">;</span>
        var maxWidth = drag.width() - handler.width()<span class="hljs-comment">;  //能滑动的最大间距</span>
        
        //鼠标按下时候的x轴的位置
        handler.mousedown(<span class="hljs-name">function</span>(<span class="hljs-name">e</span>){
            isMove = true<span class="hljs-comment">;</span>
            x = e.pageX - parseInt(<span class="hljs-name">handler.css</span>(<span class="hljs-symbol">'left</span>'), <span class="hljs-number">10</span>)<span class="hljs-comment">;</span>
        })<span class="hljs-comment">;</span>
        
        //鼠标指针在上下文移动时，移动距离大于0小于最大间距，滑块x轴位置等于鼠标移动距离
        $(<span class="hljs-name">document</span>).mousemove(<span class="hljs-name">function</span>(<span class="hljs-name">e</span>){
            var _x = e.pageX - x<span class="hljs-comment">;</span>
            if(<span class="hljs-name">isMove</span>){
                if(<span class="hljs-name">_x</span> &gt; <span class="hljs-number">0</span> &amp;&amp; _x &lt;= maxWidth){
                    handler.css({<span class="hljs-symbol">'left</span><span class="hljs-symbol">':</span> _x})<span class="hljs-comment">;</span>
                    drag_bg.css({<span class="hljs-symbol">'width</span><span class="hljs-symbol">':</span> _x})<span class="hljs-comment">;</span>
                }else if(<span class="hljs-name">_x</span> &gt; maxWidth){  //鼠标指针移动距离达到最大时清空事件
                    dragOk()<span class="hljs-comment">;</span>
                }
            }
        }).mouseup(<span class="hljs-name">function</span>(<span class="hljs-name">e</span>){
            isMove = false<span class="hljs-comment">;</span>
            var _x = e.pageX - x<span class="hljs-comment">;</span>
            if(<span class="hljs-name">_x</span> &lt; maxWidth){ //鼠标松开时，如果没有达到最大距离位置，滑块就返回初始位置
                handler.css({<span class="hljs-symbol">'left</span><span class="hljs-symbol">':</span> <span class="hljs-number">0</span>})<span class="hljs-comment">;</span>
                drag_bg.css({<span class="hljs-symbol">'width</span><span class="hljs-symbol">':</span> <span class="hljs-number">0</span>})<span class="hljs-comment">;</span>
            }
        })<span class="hljs-comment">;</span>
        
        //清空事件
        function dragOk(){
            handler.removeClass(<span class="hljs-symbol">'handler_bg</span>').addClass(<span class="hljs-symbol">'handler_ok_bg</span>')<span class="hljs-comment">;</span>
            text.text(<span class="hljs-symbol">'验证通过</span>')<span class="hljs-comment">;</span>
            drag.css({<span class="hljs-symbol">'color</span><span class="hljs-symbol">':</span> '<span class="hljs-literal">#f</span>ff'})<span class="hljs-comment">;</span>
            handler.unbind(<span class="hljs-symbol">'mousedown</span>')<span class="hljs-comment">;</span>
            $(<span class="hljs-name">document</span>).unbind(<span class="hljs-symbol">'mousemove</span>')<span class="hljs-comment">;</span>
            $(<span class="hljs-name">document</span>).unbind(<span class="hljs-symbol">'mouseup</span>')<span class="hljs-comment">;</span>
        }
    }<span class="hljs-comment">;</span>
})(<span class="hljs-name">jQuery</span>)<span class="hljs-comment">;</span></code></pre>
<h2 id="articleHeader1">VUE的绿色拖动验证功能</h2>
<p>HTML结构：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div id=&quot;drag&quot;>
        <div class=&quot;drag_bg weui-btn_primary&quot; :style=&quot;{width:curW+'px'}&quot;></div>
        <div class=&quot;drag_text&quot; onselectstart=&quot;return false;&quot; unselectable=&quot;on&quot;:class=&quot;[isDragOk ? 'whitecolor':'']&quot;>"{{"text"}}"</div>
        <div class=&quot;handler&quot; :style=&quot;{left:curW+'px'}&quot; :class=&quot;[isDragOk ? 'handler_ok_bg':'handler_bg']&quot;></div>
    </div>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;template&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">id</span>=<span class="hljs-string">"drag"</span>&gt;
        &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"drag_bg weui-btn_primary"</span> :style=<span class="hljs-string">"{width:curW+'px'}"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
        &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"drag_text"</span> onselectstart=<span class="hljs-string">"return false;"</span> unselectable=<span class="hljs-string">"on"</span>:<span class="hljs-built_in">class</span>=<span class="hljs-string">"[isDragOk ? 'whitecolor':'']"</span>&gt;"{{"<span class="hljs-built_in">text</span>"}}"&lt;/<span class="hljs-keyword">div</span>&gt;
        &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"handler"</span> :style=<span class="hljs-string">"{left:curW+'px'}"</span> :<span class="hljs-built_in">class</span>=<span class="hljs-string">"[isDragOk ? 'handler_ok_bg':'handler_bg']"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;/<span class="hljs-keyword">div</span>&gt;
&lt;/template&gt;</code></pre>
<p>CSS代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style scoped>
#drag {
    position: relative;
    background-color: #e8e8e8;
    width: 100%;
    height: 36px;
    line-height: 36px;
    text-align: center;
}
#drag .drag_bg {
    height: 36px;
    width:0;
}
#drag .drag_text {
    position: absolute;
    top: 0px;
    width: 100%;
    -moz-user-select: none;
    -webkit-user-select: none;
    user-select: none;
    -o-user-select: none;
    -ms-user-select: none;
}
.drag_text.whitecolor{
    color:#fff;
}
#drag .handler {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 40px;
    height: 34px;
    border: 1px solid #ccc;
    cursor: move;
}
.handler_bg {
    background:#fff url(&quot;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ZDhlNWY5My05NmI0LTRlNWQtOGFjYi03ZTY4OGYyMTU2ZTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NTEyNTVEMURGMkVFMTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTEyNTVEMUNGMkVFMTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2MTc5NzNmZS02OTQxLTQyOTYtYTIwNi02NDI2YTNkOWU5YmUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NGQ4ZTVmOTMtOTZiNC00ZTVkLThhY2ItN2U2ODhmMjE1NmU2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+YiRG4AAAALFJREFUeNpi/P//PwMlgImBQkA9A+bOnfsIiBOxKcInh+yCaCDuByoswaIOpxwjciACFegBqZ1AvBSIS5OTk/8TkmNEjwWgQiUgtQuIjwAxUF3yX3xyGIEIFLwHpKyAWB+I1xGSwxULIGf9A7mQkBwTlhBXAFLHgPgqEAcTkmNCU6AL9d8WII4HOvk3ITkWJAXWUMlOoGQHmsE45ViQ2KuBuASoYC4Wf+OUYxz6mQkgwAAN9mIrUReCXgAAAABJRU5ErkJggg==&quot;) no-repeat center
}
.handler_ok_bg {
    background:#fff url(&quot;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ZDhlNWY5My05NmI0LTRlNWQtOGFjYi03ZTY4OGYyMTU2ZTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDlBRDI3NjVGMkQ2MTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDlBRDI3NjRGMkQ2MTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDphNWEzMWNhMC1hYmViLTQxNWEtYTEwZS04Y2U5NzRlN2Q4YTEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NGQ4ZTVmOTMtOTZiNC00ZTVkLThhY2ItN2U2ODhmMjE1NmU2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+k+sHwwAAASZJREFUeNpi/P//PwMyKD8uZw+kUoDYEYgloMIvgHg/EM/ptHx0EFk9I8wAoEZ+IDUPiIMY8IN1QJwENOgj3ACo5gNAbMBAHLgAxA4gQ5igAnNJ0MwAVTsX7IKyY7L2UNuJAf+AmAmJ78AEDTBiwGYg5gbifCSxFCZoaBMCy4A4GOjnH0D6DpK4IxNSVIHAfSDOAeLraJrjgJp/AwPbHMhejiQnwYRmUzNQ4VQgDQqXK0ia/0I17wJiPmQNTNBEAgMlQIWiQA2vgWw7QppBekGxsAjIiEUSBNnsBDWEAY9mEFgMMgBk00E0iZtA7AHEctDQ58MRuA6wlLgGFMoMpIG1QFeGwAIxGZo8GUhIysmwQGSAZgwHaEZhICIzOaBkJkqyM0CAAQDGx279Jf50AAAAAABJRU5ErkJggg==&quot;) no-repeat center
}
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="css">
<span class="hljs-selector-id">#drag</span> {
    <span class="hljs-attribute">position</span>: relative;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#e8e8e8</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">36px</span>;
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">36px</span>;
    <span class="hljs-attribute">text-align</span>: center;
}
<span class="hljs-selector-id">#drag</span> <span class="hljs-selector-class">.drag_bg</span> {
    <span class="hljs-attribute">height</span>: <span class="hljs-number">36px</span>;
    <span class="hljs-attribute">width</span>:<span class="hljs-number">0</span>;
}
<span class="hljs-selector-id">#drag</span> <span class="hljs-selector-class">.drag_text</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">0px</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">-moz-user-select</span>: none;
    <span class="hljs-attribute">-webkit-user-select</span>: none;
    <span class="hljs-attribute">user-select</span>: none;
    <span class="hljs-attribute">-o-user-select</span>: none;
    <span class="hljs-attribute">-ms-user-select</span>: none;
}
<span class="hljs-selector-class">.drag_text</span><span class="hljs-selector-class">.whitecolor</span>{
    <span class="hljs-attribute">color</span>:<span class="hljs-number">#fff</span>;
}
<span class="hljs-selector-id">#drag</span> <span class="hljs-selector-class">.handler</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">0px</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">0px</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">40px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">34px</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#ccc</span>;
    <span class="hljs-attribute">cursor</span>: move;
}
<span class="hljs-selector-class">.handler_bg</span> {
    <span class="hljs-attribute">background</span>:<span class="hljs-number">#fff</span> <span class="hljs-built_in">url</span>(<span class="hljs-string">"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ZDhlNWY5My05NmI0LTRlNWQtOGFjYi03ZTY4OGYyMTU2ZTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NTEyNTVEMURGMkVFMTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTEyNTVEMUNGMkVFMTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2MTc5NzNmZS02OTQxLTQyOTYtYTIwNi02NDI2YTNkOWU5YmUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NGQ4ZTVmOTMtOTZiNC00ZTVkLThhY2ItN2U2ODhmMjE1NmU2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+YiRG4AAAALFJREFUeNpi/P//PwMlgImBQkA9A+bOnfsIiBOxKcInh+yCaCDuByoswaIOpxwjciACFegBqZ1AvBSIS5OTk/8TkmNEjwWgQiUgtQuIjwAxUF3yX3xyGIEIFLwHpKyAWB+I1xGSwxULIGf9A7mQkBwTlhBXAFLHgPgqEAcTkmNCU6AL9d8WII4HOvk3ITkWJAXWUMlOoGQHmsE45ViQ2KuBuASoYC4Wf+OUYxz6mQkgwAAN9mIrUReCXgAAAABJRU5ErkJggg=="</span>) no-repeat center
}
<span class="hljs-selector-class">.handler_ok_bg</span> {
    <span class="hljs-attribute">background</span>:<span class="hljs-number">#fff</span> <span class="hljs-built_in">url</span>(<span class="hljs-string">"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ZDhlNWY5My05NmI0LTRlNWQtOGFjYi03ZTY4OGYyMTU2ZTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDlBRDI3NjVGMkQ2MTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDlBRDI3NjRGMkQ2MTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDphNWEzMWNhMC1hYmViLTQxNWEtYTEwZS04Y2U5NzRlN2Q4YTEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NGQ4ZTVmOTMtOTZiNC00ZTVkLThhY2ItN2U2ODhmMjE1NmU2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+k+sHwwAAASZJREFUeNpi/P//PwMyKD8uZw+kUoDYEYgloMIvgHg/EM/ptHx0EFk9I8wAoEZ+IDUPiIMY8IN1QJwENOgj3ACo5gNAbMBAHLgAxA4gQ5igAnNJ0MwAVTsX7IKyY7L2UNuJAf+AmAmJ78AEDTBiwGYg5gbifCSxFCZoaBMCy4A4GOjnH0D6DpK4IxNSVIHAfSDOAeLraJrjgJp/AwPbHMhejiQnwYRmUzNQ4VQgDQqXK0ia/0I17wJiPmQNTNBEAgMlQIWiQA2vgWw7QppBekGxsAjIiEUSBNnsBDWEAY9mEFgMMgBk00E0iZtA7AHEctDQ58MRuA6wlLgGFMoMpIG1QFeGwAIxGZo8GUhIysmwQGSAZgwHaEZhICIzOaBkJkqyM0CAAQDGx279Jf50AAAAAABJRU5ErkJggg=="</span>) no-repeat center
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<p>JS代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script>
export default{
    name:'slider',
    props:{
        
    },
    data(){
        return{
            curW:0,
            isMove:false, //是否在运动
            isDragOk:false, //是否拖动成功
            maxWidth:0, //拖动的最大宽度
            element:{},
            text:'拖动滑块验证',
            currentPos:{
                x: 0,
                y: 0
            }
        }
    },
    created(){
        
    },
    mounted () {
        var self = this;
        this.element = document.querySelector('.handler');
        this.getMaxWidth();
        window.addEventListener('resize',function(){self.getMaxWidth()});
        window.addEventListener('orientationchange',function(){self.getMaxWidth()});
        
        
          this.element.addEventListener('touchstart',self.touchstartFun,false);
        document.querySelector('body').addEventListener('touchmove',self.touchmoveFun,false);
        document.querySelector('body').addEventListener('touchend',self.touchendFun,false);
        
        this.element.addEventListener('mousedown',self.touchstartFun,false);
        document.querySelector('body').addEventListener('mousemove',self.touchmoveFun,false);
        document.querySelector('body').addEventListener('mouseup',self.touchendFun,false);
        
        (function drawAnimate() {
            if( self.curW <= self.maxWidth){
                window.requestAnimFrame(drawAnimate,1000/60);
                self.curW = self.currentPos.x;
            }else{
                self.curW = self.currentPos.x = self.maxWidth;
            }
        })();
    },
    watch:{
        
    },
    methods:{
        touchstartFun(e){
            if(this.isDragOk){
                  e.preventDefault();
                  return;
              }
            this.isMove = true;
            this.curW = this.currentPos.x = this.getCurrentPosition(e).x;
        },
        touchmoveFun(e){
            if(this.isMove &amp;&amp; this.curW > 0 &amp;&amp; this.curW < this.maxWidth){
                this.currentPos.x = this.getCurrentPosition(e).x;
            }
            else if(this.isMove &amp;&amp; this.curW >= this.maxWidth){
                this.curW = this.currentPos.x = this.maxWidth;
                this.isDragOk = true;
                this.text = &quot;验证通过&quot;;
            }
        },
        touchendFun(e){
            this.isMove = false;
            if(this.curW < this.maxWidth){
                this.curW = this.currentPos.x = 0;
            }
        },
        
        getCurrentPosition(event){
            var xPos, yPos, rect;
            rect = document.getElementById('drag').getBoundingClientRect();
            //event = event.originalEvent;
            //判断是touch，还是鼠标事件
            if (event.type.indexOf('touch') !== -1) {
                xPos = event.touches[0].clientX - rect.left;
                yPos = event.touches[0].clientY - rect.top;
            }
            
            //鼠标事件
            else {
                xPos = event.clientX - rect.left;
                yPos = event.clientY - rect.top;
            }
            return {
                x: xPos,
                y: yPos
            }
        },
        getMaxWidth(){
            this.maxWidth = document.querySelector(&quot;#drag&quot;).clientWidth - document.querySelector(&quot;.handler&quot;).scrollWidth;
        }
    }
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>&lt;script&gt;
export <span class="hljs-keyword">default</span>{
    name:<span class="hljs-string">'slider'</span>,
    props:{
        
    },
    <span class="hljs-keyword">data</span>(){
        <span class="hljs-keyword">return</span>{
            curW:<span class="hljs-number">0</span>,
            isMove:<span class="hljs-literal">false</span>, <span class="hljs-comment">//是否在运动</span>
            isDragOk:<span class="hljs-literal">false</span>, <span class="hljs-comment">//是否拖动成功</span>
            maxWidth:<span class="hljs-number">0</span>, <span class="hljs-comment">//拖动的最大宽度</span>
            element:{},
            text:<span class="hljs-string">'拖动滑块验证'</span>,
            currentPos:{
                x: <span class="hljs-number">0</span>,
                y: <span class="hljs-number">0</span>
            }
        }
    },
    created(){
        
    },
    mounted () {
        <span class="hljs-keyword">var</span> self = <span class="hljs-keyword">this</span>;
        <span class="hljs-keyword">this</span>.element = document.querySelector(<span class="hljs-string">'.handler'</span>);
        <span class="hljs-keyword">this</span>.getMaxWidth();
        window.addEventListener(<span class="hljs-string">'resize'</span>,function(){self.getMaxWidth()});
        window.addEventListener(<span class="hljs-string">'orientationchange'</span>,function(){self.getMaxWidth()});
        
        
          <span class="hljs-keyword">this</span>.element.addEventListener(<span class="hljs-string">'touchstart'</span>,self.touchstartFun,<span class="hljs-literal">false</span>);
        document.querySelector(<span class="hljs-string">'body'</span>).addEventListener(<span class="hljs-string">'touchmove'</span>,self.touchmoveFun,<span class="hljs-literal">false</span>);
        document.querySelector(<span class="hljs-string">'body'</span>).addEventListener(<span class="hljs-string">'touchend'</span>,self.touchendFun,<span class="hljs-literal">false</span>);
        
        <span class="hljs-keyword">this</span>.element.addEventListener(<span class="hljs-string">'mousedown'</span>,self.touchstartFun,<span class="hljs-literal">false</span>);
        document.querySelector(<span class="hljs-string">'body'</span>).addEventListener(<span class="hljs-string">'mousemove'</span>,self.touchmoveFun,<span class="hljs-literal">false</span>);
        document.querySelector(<span class="hljs-string">'body'</span>).addEventListener(<span class="hljs-string">'mouseup'</span>,self.touchendFun,<span class="hljs-literal">false</span>);
        
        (function drawAnimate() {
            <span class="hljs-keyword">if</span>( self.curW &lt;= self.maxWidth){
                window.requestAnimFrame(drawAnimate,<span class="hljs-number">1000</span>/<span class="hljs-number">60</span>);
                self.curW = self.currentPos.x;
            }<span class="hljs-keyword">else</span>{
                self.curW = self.currentPos.x = self.maxWidth;
            }
        })();
    },
    watch:{
        
    },
    methods:{
        touchstartFun(e){
            <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.isDragOk){
                  e.preventDefault();
                  <span class="hljs-keyword">return</span>;
              }
            <span class="hljs-keyword">this</span>.isMove = <span class="hljs-literal">true</span>;
            <span class="hljs-keyword">this</span>.curW = <span class="hljs-keyword">this</span>.currentPos.x = <span class="hljs-keyword">this</span>.getCurrentPosition(e).x;
        },
        touchmoveFun(e){
            <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.isMove &amp;&amp; <span class="hljs-keyword">this</span>.curW &gt; <span class="hljs-number">0</span> &amp;&amp; <span class="hljs-keyword">this</span>.curW &lt; <span class="hljs-keyword">this</span>.maxWidth){
                <span class="hljs-keyword">this</span>.currentPos.x = <span class="hljs-keyword">this</span>.getCurrentPosition(e).x;
            }
            <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.isMove &amp;&amp; <span class="hljs-keyword">this</span>.curW &gt;= <span class="hljs-keyword">this</span>.maxWidth){
                <span class="hljs-keyword">this</span>.curW = <span class="hljs-keyword">this</span>.currentPos.x = <span class="hljs-keyword">this</span>.maxWidth;
                <span class="hljs-keyword">this</span>.isDragOk = <span class="hljs-literal">true</span>;
                <span class="hljs-keyword">this</span>.text = <span class="hljs-string">"验证通过"</span>;
            }
        },
        touchendFun(e){
            <span class="hljs-keyword">this</span>.isMove = <span class="hljs-literal">false</span>;
            <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.curW &lt; <span class="hljs-keyword">this</span>.maxWidth){
                <span class="hljs-keyword">this</span>.curW = <span class="hljs-keyword">this</span>.currentPos.x = <span class="hljs-number">0</span>;
            }
        },
        
        getCurrentPosition(event){
            <span class="hljs-keyword">var</span> xPos, yPos, rect;
            rect = document.getElementById(<span class="hljs-string">'drag'</span>).getBoundingClientRect();
            <span class="hljs-comment">//event = event.originalEvent;</span>
            <span class="hljs-comment">//判断是touch，还是鼠标事件</span>
            <span class="hljs-keyword">if</span> (event.type.indexOf(<span class="hljs-string">'touch'</span>) !== <span class="hljs-number">-1</span>) {
                xPos = event.touches[<span class="hljs-number">0</span>].clientX - rect.left;
                yPos = event.touches[<span class="hljs-number">0</span>].clientY - rect.top;
            }
            
            <span class="hljs-comment">//鼠标事件</span>
            <span class="hljs-keyword">else</span> {
                xPos = event.clientX - rect.left;
                yPos = event.clientY - rect.top;
            }
            <span class="hljs-keyword">return</span> {
                x: xPos,
                y: yPos
            }
        },
        getMaxWidth(){
            <span class="hljs-keyword">this</span>.maxWidth = document.querySelector(<span class="hljs-string">"#drag"</span>).clientWidth - document.querySelector(<span class="hljs-string">".handler"</span>).scrollWidth;
        }
    }
}
&lt;/script&gt;</code></pre>
<p>页面引用方式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<slider></slider>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs apache"><code style="word-break: break-word; white-space: initial;"><span class="hljs-section">&lt;slider&gt;</span><span class="hljs-section">&lt;/slider&gt;</span></code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
jQuery与vue分别实现超级简单的绿色拖动验证码功能

## 原文链接
[https://segmentfault.com/a/1190000013042546](https://segmentfault.com/a/1190000013042546)

