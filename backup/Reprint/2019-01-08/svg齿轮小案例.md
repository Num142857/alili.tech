---
title: 'svg齿轮小案例' 
date: 2019-01-08 2:30:11
hidden: true
slug: v1hepx6avi
categories: [reprint]
---

{{< raw >}}

                    
<p><strong>svg齿轮转动案例</strong></p>
<blockquote><p>css代码：</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" .st0{fill:#050101;}
        .st1{fill:none;stroke:#000000;stroke-miterlimit:10;}
        .st2{fill:#8E9890;stroke:#000000;stroke-miterlimit:10;}
        .st3{fill:#050101;stroke:#000000;stroke-miterlimit:10;}
        .st4{fill:#FAFAFA;stroke:#000000;stroke-miterlimit:10;}
        #one{
            width:200px;
            margin: 0 auto;
        }
        #tow{
            width:200px;
            margin-left: 463px;
            float:left;
            margin-top: -60px;
        }
        #three{
            width:200px;
            margin-right: 461px;
            float:right;
            margin-top: -62px;
        }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code> <span class="hljs-selector-class">.st0</span>{<span class="hljs-attribute">fill</span>:<span class="hljs-number">#050101</span>;}
        <span class="hljs-selector-class">.st1</span>{<span class="hljs-attribute">fill</span>:none;<span class="hljs-attribute">stroke</span>:<span class="hljs-number">#000000</span>;<span class="hljs-attribute">stroke-miterlimit</span>:<span class="hljs-number">10</span>;}
        <span class="hljs-selector-class">.st2</span>{<span class="hljs-attribute">fill</span>:<span class="hljs-number">#8E9890</span>;<span class="hljs-attribute">stroke</span>:<span class="hljs-number">#000000</span>;<span class="hljs-attribute">stroke-miterlimit</span>:<span class="hljs-number">10</span>;}
        <span class="hljs-selector-class">.st3</span>{<span class="hljs-attribute">fill</span>:<span class="hljs-number">#050101</span>;<span class="hljs-attribute">stroke</span>:<span class="hljs-number">#000000</span>;<span class="hljs-attribute">stroke-miterlimit</span>:<span class="hljs-number">10</span>;}
        <span class="hljs-selector-class">.st4</span>{<span class="hljs-attribute">fill</span>:<span class="hljs-number">#FAFAFA</span>;<span class="hljs-attribute">stroke</span>:<span class="hljs-number">#000000</span>;<span class="hljs-attribute">stroke-miterlimit</span>:<span class="hljs-number">10</span>;}
        <span class="hljs-selector-id">#one</span>{
            <span class="hljs-attribute">width</span>:<span class="hljs-number">200px</span>;
            <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> auto;
        }
        <span class="hljs-selector-id">#tow</span>{
            <span class="hljs-attribute">width</span>:<span class="hljs-number">200px</span>;
            <span class="hljs-attribute">margin-left</span>: <span class="hljs-number">463px</span>;
            <span class="hljs-attribute">float</span>:left;
            <span class="hljs-attribute">margin-top</span>: -<span class="hljs-number">60px</span>;
        }
        <span class="hljs-selector-id">#three</span>{
            <span class="hljs-attribute">width</span>:<span class="hljs-number">200px</span>;
            <span class="hljs-attribute">margin-right</span>: <span class="hljs-number">461px</span>;
            <span class="hljs-attribute">float</span>:right;
            <span class="hljs-attribute">margin-top</span>: -<span class="hljs-number">62px</span>;
        }
</code></pre>
<blockquote><p>html代码：</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;one&quot;>
    <svg version=&quot;1.1&quot; x=&quot;0px&quot; y=&quot;0px&quot; width=&quot;200&quot; viewBox=&quot;0 0 75.7 72.6&quot; style=&quot;enable-background:new 0 0 75.7 72.6;&quot; xml:space=&quot;preserve&quot;>
<g id=&quot;XMLID_11_&quot;>
    <g id=&quot;XMLID_29_&quot;>
        <path id=&quot;XMLID_30_&quot; class=&quot;st0&quot; d=&quot;M65.2,36.9l7.7-2.4l-1.6-9.3l-8.1,0.6c-1-2.3-2.3-4.4-3.8-6.4l4.4-6.9l-7.2-6.1l-5.9,5.8
            c-2.1-1.1-4.4-1.9-6.9-2.4l-1.1-8.2h-9.5l-0.8,8.4c-2.3,0.6-4.6,1.4-6.6,2.5l-6.3-5.7L12.1,13l4.9,7.1c-1.4,1.8-2.5,3.9-3.4,6.1
            L5,25.8l-1.6,9.3l8.4,2.3c0.1,2.4,0.5,4.6,1.2,6.8l-6.8,5.3l4.7,8.2l7.9-3.6c1.6,1.7,3.4,3.2,5.4,4.5L22.3,67l8.9,3.2l3.7-7.6
            c1.2,0.2,2.4,0.3,3.7,0.3c1.2,0,2.4-0.1,3.5-0.2l3.9,7.4l8.9-3.2l-2.1-8c2.1-1.3,4-2.9,5.6-4.7l7.5,3.1l4.7-8.2l-6.6-4.7
            C64.7,41.9,65.1,39.5,65.2,36.9z&quot;/>
    </g>
    <g id=&quot;XMLID_25_&quot;>
        <path id=&quot;XMLID_26_&quot; class=&quot;st1&quot; d=&quot;M65.2,36.9l7.7-2.4l-1.6-9.3l-8.1,0.6c-1-2.3-2.3-4.4-3.8-6.4l4.4-6.9l-7.2-6.1l-5.9,5.8
            c-2.1-1.1-4.4-1.9-6.9-2.4l-1.1-8.2h-9.5l-0.8,8.4c-2.3,0.6-4.6,1.4-6.6,2.5l-6.3-5.7L12.1,13l4.9,7.1c-1.4,1.8-2.5,3.9-3.4,6.1
            L5,25.8l-1.6,9.3l8.4,2.3c0.1,2.4,0.5,4.6,1.2,6.8l-6.8,5.3l4.7,8.2l7.9-3.6c1.6,1.7,3.4,3.2,5.4,4.5L22.3,67l8.9,3.2l3.7-7.6
            c1.2,0.2,2.4,0.3,3.7,0.3c1.2,0,2.4-0.1,3.5-0.2l3.9,7.4l8.9-3.2l-2.1-8c2.1-1.3,4-2.9,5.6-4.7l7.5,3.1l4.7-8.2l-6.6-4.7
            C64.7,41.9,65.1,39.5,65.2,36.9z&quot;/>
    </g>
    <circle id=&quot;XMLID_14_&quot; class=&quot;st2&quot; cx=&quot;38.5&quot; cy=&quot;36.1&quot; r=&quot;23&quot;/>
<circle id=&quot;XMLID_15_&quot; class=&quot;st3&quot; cx=&quot;38.5&quot; cy=&quot;36.1&quot; r=&quot;12.8&quot;/>
<circle id=&quot;XMLID_16_&quot; class=&quot;st4&quot; cx=&quot;38.5&quot; cy=&quot;36.1&quot; r=&quot;10.5&quot;/>
     <animateTransform
                attributeName=&quot;transform&quot;
                type=&quot;rotate&quot;
                from=&quot;0 37.85 36.3&quot;
                to=&quot;360 37.85 36.3&quot;
                begin=&quot;0s&quot;
                dur=&quot;5s&quot;
                repeatCount=&quot;indefinite&quot;
                />
</g>

</svg>
</div>
<div id=&quot;tow&quot;>
    <svg version=&quot;1.1&quot; x=&quot;0px&quot; y=&quot;0px&quot; width=&quot;200&quot; viewBox=&quot;0 0 75.7 72.6&quot; style=&quot;enable-background:new 0 0 75.7 72.6;&quot; xml:space=&quot;preserve&quot;>
<g id=&quot;XMLID_11_&quot;>
    <g id=&quot;XMLID_29_&quot;>
        <path id=&quot;XMLID_30_&quot; class=&quot;st0&quot; d=&quot;M65.2,36.9l7.7-2.4l-1.6-9.3l-8.1,0.6c-1-2.3-2.3-4.4-3.8-6.4l4.4-6.9l-7.2-6.1l-5.9,5.8
            c-2.1-1.1-4.4-1.9-6.9-2.4l-1.1-8.2h-9.5l-0.8,8.4c-2.3,0.6-4.6,1.4-6.6,2.5l-6.3-5.7L12.1,13l4.9,7.1c-1.4,1.8-2.5,3.9-3.4,6.1
            L5,25.8l-1.6,9.3l8.4,2.3c0.1,2.4,0.5,4.6,1.2,6.8l-6.8,5.3l4.7,8.2l7.9-3.6c1.6,1.7,3.4,3.2,5.4,4.5L22.3,67l8.9,3.2l3.7-7.6
            c1.2,0.2,2.4,0.3,3.7,0.3c1.2,0,2.4-0.1,3.5-0.2l3.9,7.4l8.9-3.2l-2.1-8c2.1-1.3,4-2.9,5.6-4.7l7.5,3.1l4.7-8.2l-6.6-4.7
            C64.7,41.9,65.1,39.5,65.2,36.9z&quot;/>
    </g>
    <g id=&quot;XMLID_25_&quot;>
        <path id=&quot;XMLID_26_&quot; class=&quot;st1&quot; d=&quot;M65.2,36.9l7.7-2.4l-1.6-9.3l-8.1,0.6c-1-2.3-2.3-4.4-3.8-6.4l4.4-6.9l-7.2-6.1l-5.9,5.8
            c-2.1-1.1-4.4-1.9-6.9-2.4l-1.1-8.2h-9.5l-0.8,8.4c-2.3,0.6-4.6,1.4-6.6,2.5l-6.3-5.7L12.1,13l4.9,7.1c-1.4,1.8-2.5,3.9-3.4,6.1
            L5,25.8l-1.6,9.3l8.4,2.3c0.1,2.4,0.5,4.6,1.2,6.8l-6.8,5.3l4.7,8.2l7.9-3.6c1.6,1.7,3.4,3.2,5.4,4.5L22.3,67l8.9,3.2l3.7-7.6
            c1.2,0.2,2.4,0.3,3.7,0.3c1.2,0,2.4-0.1,3.5-0.2l3.9,7.4l8.9-3.2l-2.1-8c2.1-1.3,4-2.9,5.6-4.7l7.5,3.1l4.7-8.2l-6.6-4.7
            C64.7,41.9,65.1,39.5,65.2,36.9z&quot;/>
    </g>
    <circle id=&quot;XMLID_14_&quot; class=&quot;st2&quot; cx=&quot;38.5&quot; cy=&quot;36.1&quot; r=&quot;23&quot;/>
<circle id=&quot;XMLID_15_&quot; class=&quot;st3&quot; cx=&quot;38.5&quot; cy=&quot;36.1&quot; r=&quot;12.8&quot;/>
<circle id=&quot;XMLID_16_&quot; class=&quot;st4&quot; cx=&quot;38.5&quot; cy=&quot;36.1&quot; r=&quot;10.5&quot;/>
     <animateTransform
                attributeName=&quot;transform&quot;
                type=&quot;rotate&quot;
                from=&quot;0 37.85 36.3&quot;
                to=&quot;-360 37.85 36.3&quot;
                begin=&quot;0s&quot;
                dur=&quot;5s&quot;
                repeatCount=&quot;indefinite&quot;
                />
</g>

</svg>
</div>
<div id=&quot;three&quot;>
    <svg version=&quot;1.1&quot; x=&quot;0px&quot; y=&quot;0px&quot; width=&quot;200&quot; viewBox=&quot;0 0 75.7 72.6&quot; style=&quot;enable-background:new 0 0 75.7 72.6;&quot; xml:space=&quot;preserve&quot;>
<g id=&quot;XMLID_11_&quot;>
    <g id=&quot;XMLID_29_&quot;>
        <path id=&quot;XMLID_30_&quot; class=&quot;st0&quot; d=&quot;M65.2,36.9l7.7-2.4l-1.6-9.3l-8.1,0.6c-1-2.3-2.3-4.4-3.8-6.4l4.4-6.9l-7.2-6.1l-5.9,5.8
            c-2.1-1.1-4.4-1.9-6.9-2.4l-1.1-8.2h-9.5l-0.8,8.4c-2.3,0.6-4.6,1.4-6.6,2.5l-6.3-5.7L12.1,13l4.9,7.1c-1.4,1.8-2.5,3.9-3.4,6.1
            L5,25.8l-1.6,9.3l8.4,2.3c0.1,2.4,0.5,4.6,1.2,6.8l-6.8,5.3l4.7,8.2l7.9-3.6c1.6,1.7,3.4,3.2,5.4,4.5L22.3,67l8.9,3.2l3.7-7.6
            c1.2,0.2,2.4,0.3,3.7,0.3c1.2,0,2.4-0.1,3.5-0.2l3.9,7.4l8.9-3.2l-2.1-8c2.1-1.3,4-2.9,5.6-4.7l7.5,3.1l4.7-8.2l-6.6-4.7
            C64.7,41.9,65.1,39.5,65.2,36.9z&quot;/>
    </g>
    <g id=&quot;XMLID_25_&quot;>
        <path id=&quot;XMLID_26_&quot; class=&quot;st1&quot; d=&quot;M65.2,36.9l7.7-2.4l-1.6-9.3l-8.1,0.6c-1-2.3-2.3-4.4-3.8-6.4l4.4-6.9l-7.2-6.1l-5.9,5.8
            c-2.1-1.1-4.4-1.9-6.9-2.4l-1.1-8.2h-9.5l-0.8,8.4c-2.3,0.6-4.6,1.4-6.6,2.5l-6.3-5.7L12.1,13l4.9,7.1c-1.4,1.8-2.5,3.9-3.4,6.1
            L5,25.8l-1.6,9.3l8.4,2.3c0.1,2.4,0.5,4.6,1.2,6.8l-6.8,5.3l4.7,8.2l7.9-3.6c1.6,1.7,3.4,3.2,5.4,4.5L22.3,67l8.9,3.2l3.7-7.6
            c1.2,0.2,2.4,0.3,3.7,0.3c1.2,0,2.4-0.1,3.5-0.2l3.9,7.4l8.9-3.2l-2.1-8c2.1-1.3,4-2.9,5.6-4.7l7.5,3.1l4.7-8.2l-6.6-4.7
            C64.7,41.9,65.1,39.5,65.2,36.9z&quot;/>
    </g>
    <circle id=&quot;XMLID_14_&quot; class=&quot;st2&quot; cx=&quot;38.5&quot; cy=&quot;36.1&quot; r=&quot;23&quot;/>
<circle id=&quot;XMLID_15_&quot; class=&quot;st3&quot; cx=&quot;38.5&quot; cy=&quot;36.1&quot; r=&quot;12.8&quot;/>
<circle id=&quot;XMLID_16_&quot; class=&quot;st4&quot; cx=&quot;38.5&quot; cy=&quot;36.1&quot; r=&quot;10.5&quot;/>
    <animateTransform
                attributeName=&quot;transform&quot;
                type=&quot;rotate&quot;
                from=&quot;0 37.85 36.3&quot;
                to=&quot;-360 37.85 36.3&quot;
                begin=&quot;0s&quot;
                dur=&quot;5s&quot;
                repeatCount=&quot;indefinite&quot;
                />
</g>

</svg>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs subunit"><code>&lt;div id="one"&gt;
    &lt;svg version="1.1" x="0px" y="0px" width="200" viewBox="0 0 75.7 72.6" style="enable-background:new 0 0 75.7 72.6;" xml:space="preserve"&gt;
&lt;g id="XMLID_11_"&gt;
    &lt;g id="XMLID_29_"&gt;
        &lt;path id="XMLID_30_" class="st0" d="M65.2,36.9l7.7<span class="hljs-string">-2</span>.4l<span class="hljs-string">-1</span>.6<span class="hljs-string">-9</span>.3l<span class="hljs-string">-8</span>.1,0.6c<span class="hljs-string">-1</span><span class="hljs-string">-2</span>.3<span class="hljs-string">-2</span>.3<span class="hljs-string">-4</span>.4<span class="hljs-string">-3</span>.8<span class="hljs-string">-6</span>.4l4.4<span class="hljs-string">-6</span>.9l<span class="hljs-string">-7</span>.2<span class="hljs-string">-6</span>.1l<span class="hljs-string">-5</span>.9,5.8
            c<span class="hljs-string">-2</span>.1<span class="hljs-string">-1</span>.1<span class="hljs-string">-4</span>.4<span class="hljs-string">-1</span>.9<span class="hljs-string">-6</span>.9<span class="hljs-string">-2</span>.4l<span class="hljs-string">-1</span>.1<span class="hljs-string">-8</span>.2h<span class="hljs-string">-9</span>.5l<span class="hljs-string">-0</span>.8,8.4c<span class="hljs-string">-2</span>.3,0.6<span class="hljs-string">-4</span>.6,1.4<span class="hljs-string">-6</span>.6,2.5l<span class="hljs-string">-6</span>.3<span class="hljs-string">-5</span>.7L12.1,13l4.9,7.1c<span class="hljs-string">-1</span>.4,1.8<span class="hljs-string">-2</span>.5,3.9<span class="hljs-string">-3</span>.4,6.1
            L5,25.8l<span class="hljs-string">-1</span>.6,9.3l8.4,2.3c0.1,2.4,0.5,4.6,1.2,6.8l<span class="hljs-string">-6</span>.8,5.3l4.7,8.2l7.9<span class="hljs-string">-3</span>.6c1.6,1.7,3.4,3.2,5.4,4.5L22.3,67l8.9,3.2l3.7<span class="hljs-string">-7</span>.6
            c1.2,0.2,2.4,0.3,3.7,0.3c1.2,0,2.4<span class="hljs-string">-0</span>.1,3.5<span class="hljs-string">-0</span>.2l3.9,7.4l8.9<span class="hljs-string">-3</span>.2l<span class="hljs-string">-2</span>.1<span class="hljs-string">-8</span>c2.1<span class="hljs-string">-1</span>.3,4<span class="hljs-string">-2</span>.9,5.6<span class="hljs-string">-4</span>.7l7.5,3.1l4.7<span class="hljs-string">-8</span>.2l<span class="hljs-string">-6</span>.6<span class="hljs-string">-4</span>.7
            C64.7,41.9,65.1,39.5,65.2,36.9z"/&gt;
    &lt;/g&gt;
    &lt;g id="XMLID_25_"&gt;
        &lt;path id="XMLID_26_" class="st1" d="M65.2,36.9l7.7<span class="hljs-string">-2</span>.4l<span class="hljs-string">-1</span>.6<span class="hljs-string">-9</span>.3l<span class="hljs-string">-8</span>.1,0.6c<span class="hljs-string">-1</span><span class="hljs-string">-2</span>.3<span class="hljs-string">-2</span>.3<span class="hljs-string">-4</span>.4<span class="hljs-string">-3</span>.8<span class="hljs-string">-6</span>.4l4.4<span class="hljs-string">-6</span>.9l<span class="hljs-string">-7</span>.2<span class="hljs-string">-6</span>.1l<span class="hljs-string">-5</span>.9,5.8
            c<span class="hljs-string">-2</span>.1<span class="hljs-string">-1</span>.1<span class="hljs-string">-4</span>.4<span class="hljs-string">-1</span>.9<span class="hljs-string">-6</span>.9<span class="hljs-string">-2</span>.4l<span class="hljs-string">-1</span>.1<span class="hljs-string">-8</span>.2h<span class="hljs-string">-9</span>.5l<span class="hljs-string">-0</span>.8,8.4c<span class="hljs-string">-2</span>.3,0.6<span class="hljs-string">-4</span>.6,1.4<span class="hljs-string">-6</span>.6,2.5l<span class="hljs-string">-6</span>.3<span class="hljs-string">-5</span>.7L12.1,13l4.9,7.1c<span class="hljs-string">-1</span>.4,1.8<span class="hljs-string">-2</span>.5,3.9<span class="hljs-string">-3</span>.4,6.1
            L5,25.8l<span class="hljs-string">-1</span>.6,9.3l8.4,2.3c0.1,2.4,0.5,4.6,1.2,6.8l<span class="hljs-string">-6</span>.8,5.3l4.7,8.2l7.9<span class="hljs-string">-3</span>.6c1.6,1.7,3.4,3.2,5.4,4.5L22.3,67l8.9,3.2l3.7<span class="hljs-string">-7</span>.6
            c1.2,0.2,2.4,0.3,3.7,0.3c1.2,0,2.4<span class="hljs-string">-0</span>.1,3.5<span class="hljs-string">-0</span>.2l3.9,7.4l8.9<span class="hljs-string">-3</span>.2l<span class="hljs-string">-2</span>.1<span class="hljs-string">-8</span>c2.1<span class="hljs-string">-1</span>.3,4<span class="hljs-string">-2</span>.9,5.6<span class="hljs-string">-4</span>.7l7.5,3.1l4.7<span class="hljs-string">-8</span>.2l<span class="hljs-string">-6</span>.6<span class="hljs-string">-4</span>.7
            C64.7,41.9,65.1,39.5,65.2,36.9z"/&gt;
    &lt;/g&gt;
    &lt;circle id="XMLID_14_" class="st2" cx="38.5" cy="36.1" r="23"/&gt;
&lt;circle id="XMLID_15_" class="st3" cx="38.5" cy="36.1" r="12.8"/&gt;
&lt;circle id="XMLID_16_" class="st4" cx="38.5" cy="36.1" r="10.5"/&gt;
     &lt;animateTransform
                attributeName="transform"
                type="rotate"
                from="0 37.85 36.3"
                to="360 37.85 36.3"
                begin="0s"
                dur="5s"
                repeatCount="indefinite"
                /&gt;
&lt;/g&gt;

&lt;/svg&gt;
&lt;/div&gt;
&lt;div id="tow"&gt;
    &lt;svg version="1.1" x="0px" y="0px" width="200" viewBox="0 0 75.7 72.6" style="enable-background:new 0 0 75.7 72.6;" xml:space="preserve"&gt;
&lt;g id="XMLID_11_"&gt;
    &lt;g id="XMLID_29_"&gt;
        &lt;path id="XMLID_30_" class="st0" d="M65.2,36.9l7.7<span class="hljs-string">-2</span>.4l<span class="hljs-string">-1</span>.6<span class="hljs-string">-9</span>.3l<span class="hljs-string">-8</span>.1,0.6c<span class="hljs-string">-1</span><span class="hljs-string">-2</span>.3<span class="hljs-string">-2</span>.3<span class="hljs-string">-4</span>.4<span class="hljs-string">-3</span>.8<span class="hljs-string">-6</span>.4l4.4<span class="hljs-string">-6</span>.9l<span class="hljs-string">-7</span>.2<span class="hljs-string">-6</span>.1l<span class="hljs-string">-5</span>.9,5.8
            c<span class="hljs-string">-2</span>.1<span class="hljs-string">-1</span>.1<span class="hljs-string">-4</span>.4<span class="hljs-string">-1</span>.9<span class="hljs-string">-6</span>.9<span class="hljs-string">-2</span>.4l<span class="hljs-string">-1</span>.1<span class="hljs-string">-8</span>.2h<span class="hljs-string">-9</span>.5l<span class="hljs-string">-0</span>.8,8.4c<span class="hljs-string">-2</span>.3,0.6<span class="hljs-string">-4</span>.6,1.4<span class="hljs-string">-6</span>.6,2.5l<span class="hljs-string">-6</span>.3<span class="hljs-string">-5</span>.7L12.1,13l4.9,7.1c<span class="hljs-string">-1</span>.4,1.8<span class="hljs-string">-2</span>.5,3.9<span class="hljs-string">-3</span>.4,6.1
            L5,25.8l<span class="hljs-string">-1</span>.6,9.3l8.4,2.3c0.1,2.4,0.5,4.6,1.2,6.8l<span class="hljs-string">-6</span>.8,5.3l4.7,8.2l7.9<span class="hljs-string">-3</span>.6c1.6,1.7,3.4,3.2,5.4,4.5L22.3,67l8.9,3.2l3.7<span class="hljs-string">-7</span>.6
            c1.2,0.2,2.4,0.3,3.7,0.3c1.2,0,2.4<span class="hljs-string">-0</span>.1,3.5<span class="hljs-string">-0</span>.2l3.9,7.4l8.9<span class="hljs-string">-3</span>.2l<span class="hljs-string">-2</span>.1<span class="hljs-string">-8</span>c2.1<span class="hljs-string">-1</span>.3,4<span class="hljs-string">-2</span>.9,5.6<span class="hljs-string">-4</span>.7l7.5,3.1l4.7<span class="hljs-string">-8</span>.2l<span class="hljs-string">-6</span>.6<span class="hljs-string">-4</span>.7
            C64.7,41.9,65.1,39.5,65.2,36.9z"/&gt;
    &lt;/g&gt;
    &lt;g id="XMLID_25_"&gt;
        &lt;path id="XMLID_26_" class="st1" d="M65.2,36.9l7.7<span class="hljs-string">-2</span>.4l<span class="hljs-string">-1</span>.6<span class="hljs-string">-9</span>.3l<span class="hljs-string">-8</span>.1,0.6c<span class="hljs-string">-1</span><span class="hljs-string">-2</span>.3<span class="hljs-string">-2</span>.3<span class="hljs-string">-4</span>.4<span class="hljs-string">-3</span>.8<span class="hljs-string">-6</span>.4l4.4<span class="hljs-string">-6</span>.9l<span class="hljs-string">-7</span>.2<span class="hljs-string">-6</span>.1l<span class="hljs-string">-5</span>.9,5.8
            c<span class="hljs-string">-2</span>.1<span class="hljs-string">-1</span>.1<span class="hljs-string">-4</span>.4<span class="hljs-string">-1</span>.9<span class="hljs-string">-6</span>.9<span class="hljs-string">-2</span>.4l<span class="hljs-string">-1</span>.1<span class="hljs-string">-8</span>.2h<span class="hljs-string">-9</span>.5l<span class="hljs-string">-0</span>.8,8.4c<span class="hljs-string">-2</span>.3,0.6<span class="hljs-string">-4</span>.6,1.4<span class="hljs-string">-6</span>.6,2.5l<span class="hljs-string">-6</span>.3<span class="hljs-string">-5</span>.7L12.1,13l4.9,7.1c<span class="hljs-string">-1</span>.4,1.8<span class="hljs-string">-2</span>.5,3.9<span class="hljs-string">-3</span>.4,6.1
            L5,25.8l<span class="hljs-string">-1</span>.6,9.3l8.4,2.3c0.1,2.4,0.5,4.6,1.2,6.8l<span class="hljs-string">-6</span>.8,5.3l4.7,8.2l7.9<span class="hljs-string">-3</span>.6c1.6,1.7,3.4,3.2,5.4,4.5L22.3,67l8.9,3.2l3.7<span class="hljs-string">-7</span>.6
            c1.2,0.2,2.4,0.3,3.7,0.3c1.2,0,2.4<span class="hljs-string">-0</span>.1,3.5<span class="hljs-string">-0</span>.2l3.9,7.4l8.9<span class="hljs-string">-3</span>.2l<span class="hljs-string">-2</span>.1<span class="hljs-string">-8</span>c2.1<span class="hljs-string">-1</span>.3,4<span class="hljs-string">-2</span>.9,5.6<span class="hljs-string">-4</span>.7l7.5,3.1l4.7<span class="hljs-string">-8</span>.2l<span class="hljs-string">-6</span>.6<span class="hljs-string">-4</span>.7
            C64.7,41.9,65.1,39.5,65.2,36.9z"/&gt;
    &lt;/g&gt;
    &lt;circle id="XMLID_14_" class="st2" cx="38.5" cy="36.1" r="23"/&gt;
&lt;circle id="XMLID_15_" class="st3" cx="38.5" cy="36.1" r="12.8"/&gt;
&lt;circle id="XMLID_16_" class="st4" cx="38.5" cy="36.1" r="10.5"/&gt;
     &lt;animateTransform
                attributeName="transform"
                type="rotate"
                from="0 37.85 36.3"
                to="<span class="hljs-string">-360</span> 37.85 36.3"
                begin="0s"
                dur="5s"
                repeatCount="indefinite"
                /&gt;
&lt;/g&gt;

&lt;/svg&gt;
&lt;/div&gt;
&lt;div id="three"&gt;
    &lt;svg version="1.1" x="0px" y="0px" width="200" viewBox="0 0 75.7 72.6" style="enable-background:new 0 0 75.7 72.6;" xml:space="preserve"&gt;
&lt;g id="XMLID_11_"&gt;
    &lt;g id="XMLID_29_"&gt;
        &lt;path id="XMLID_30_" class="st0" d="M65.2,36.9l7.7<span class="hljs-string">-2</span>.4l<span class="hljs-string">-1</span>.6<span class="hljs-string">-9</span>.3l<span class="hljs-string">-8</span>.1,0.6c<span class="hljs-string">-1</span><span class="hljs-string">-2</span>.3<span class="hljs-string">-2</span>.3<span class="hljs-string">-4</span>.4<span class="hljs-string">-3</span>.8<span class="hljs-string">-6</span>.4l4.4<span class="hljs-string">-6</span>.9l<span class="hljs-string">-7</span>.2<span class="hljs-string">-6</span>.1l<span class="hljs-string">-5</span>.9,5.8
            c<span class="hljs-string">-2</span>.1<span class="hljs-string">-1</span>.1<span class="hljs-string">-4</span>.4<span class="hljs-string">-1</span>.9<span class="hljs-string">-6</span>.9<span class="hljs-string">-2</span>.4l<span class="hljs-string">-1</span>.1<span class="hljs-string">-8</span>.2h<span class="hljs-string">-9</span>.5l<span class="hljs-string">-0</span>.8,8.4c<span class="hljs-string">-2</span>.3,0.6<span class="hljs-string">-4</span>.6,1.4<span class="hljs-string">-6</span>.6,2.5l<span class="hljs-string">-6</span>.3<span class="hljs-string">-5</span>.7L12.1,13l4.9,7.1c<span class="hljs-string">-1</span>.4,1.8<span class="hljs-string">-2</span>.5,3.9<span class="hljs-string">-3</span>.4,6.1
            L5,25.8l<span class="hljs-string">-1</span>.6,9.3l8.4,2.3c0.1,2.4,0.5,4.6,1.2,6.8l<span class="hljs-string">-6</span>.8,5.3l4.7,8.2l7.9<span class="hljs-string">-3</span>.6c1.6,1.7,3.4,3.2,5.4,4.5L22.3,67l8.9,3.2l3.7<span class="hljs-string">-7</span>.6
            c1.2,0.2,2.4,0.3,3.7,0.3c1.2,0,2.4<span class="hljs-string">-0</span>.1,3.5<span class="hljs-string">-0</span>.2l3.9,7.4l8.9<span class="hljs-string">-3</span>.2l<span class="hljs-string">-2</span>.1<span class="hljs-string">-8</span>c2.1<span class="hljs-string">-1</span>.3,4<span class="hljs-string">-2</span>.9,5.6<span class="hljs-string">-4</span>.7l7.5,3.1l4.7<span class="hljs-string">-8</span>.2l<span class="hljs-string">-6</span>.6<span class="hljs-string">-4</span>.7
            C64.7,41.9,65.1,39.5,65.2,36.9z"/&gt;
    &lt;/g&gt;
    &lt;g id="XMLID_25_"&gt;
        &lt;path id="XMLID_26_" class="st1" d="M65.2,36.9l7.7<span class="hljs-string">-2</span>.4l<span class="hljs-string">-1</span>.6<span class="hljs-string">-9</span>.3l<span class="hljs-string">-8</span>.1,0.6c<span class="hljs-string">-1</span><span class="hljs-string">-2</span>.3<span class="hljs-string">-2</span>.3<span class="hljs-string">-4</span>.4<span class="hljs-string">-3</span>.8<span class="hljs-string">-6</span>.4l4.4<span class="hljs-string">-6</span>.9l<span class="hljs-string">-7</span>.2<span class="hljs-string">-6</span>.1l<span class="hljs-string">-5</span>.9,5.8
            c<span class="hljs-string">-2</span>.1<span class="hljs-string">-1</span>.1<span class="hljs-string">-4</span>.4<span class="hljs-string">-1</span>.9<span class="hljs-string">-6</span>.9<span class="hljs-string">-2</span>.4l<span class="hljs-string">-1</span>.1<span class="hljs-string">-8</span>.2h<span class="hljs-string">-9</span>.5l<span class="hljs-string">-0</span>.8,8.4c<span class="hljs-string">-2</span>.3,0.6<span class="hljs-string">-4</span>.6,1.4<span class="hljs-string">-6</span>.6,2.5l<span class="hljs-string">-6</span>.3<span class="hljs-string">-5</span>.7L12.1,13l4.9,7.1c<span class="hljs-string">-1</span>.4,1.8<span class="hljs-string">-2</span>.5,3.9<span class="hljs-string">-3</span>.4,6.1
            L5,25.8l<span class="hljs-string">-1</span>.6,9.3l8.4,2.3c0.1,2.4,0.5,4.6,1.2,6.8l<span class="hljs-string">-6</span>.8,5.3l4.7,8.2l7.9<span class="hljs-string">-3</span>.6c1.6,1.7,3.4,3.2,5.4,4.5L22.3,67l8.9,3.2l3.7<span class="hljs-string">-7</span>.6
            c1.2,0.2,2.4,0.3,3.7,0.3c1.2,0,2.4<span class="hljs-string">-0</span>.1,3.5<span class="hljs-string">-0</span>.2l3.9,7.4l8.9<span class="hljs-string">-3</span>.2l<span class="hljs-string">-2</span>.1<span class="hljs-string">-8</span>c2.1<span class="hljs-string">-1</span>.3,4<span class="hljs-string">-2</span>.9,5.6<span class="hljs-string">-4</span>.7l7.5,3.1l4.7<span class="hljs-string">-8</span>.2l<span class="hljs-string">-6</span>.6<span class="hljs-string">-4</span>.7
            C64.7,41.9,65.1,39.5,65.2,36.9z"/&gt;
    &lt;/g&gt;
    &lt;circle id="XMLID_14_" class="st2" cx="38.5" cy="36.1" r="23"/&gt;
&lt;circle id="XMLID_15_" class="st3" cx="38.5" cy="36.1" r="12.8"/&gt;
&lt;circle id="XMLID_16_" class="st4" cx="38.5" cy="36.1" r="10.5"/&gt;
    &lt;animateTransform
                attributeName="transform"
                type="rotate"
                from="0 37.85 36.3"
                to="<span class="hljs-string">-360</span> 37.85 36.3"
                begin="0s"
                dur="5s"
                repeatCount="indefinite"
                /&gt;
&lt;/g&gt;

&lt;/svg&gt;
&lt;/div&gt;</code></pre>
<blockquote><p>接下来就看看我们的效果吧：</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010181444" src="https://static.alili.tech/img/remote/1460000010181444" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<blockquote><p>是不是特别漂亮呢！要是觉得漂亮的的话那就点歌赞呗！</p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
svg齿轮小案例

## 原文链接
[https://segmentfault.com/a/1190000010181441](https://segmentfault.com/a/1190000010181441)

