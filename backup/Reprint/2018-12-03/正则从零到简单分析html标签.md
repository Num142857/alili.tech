---
title: '正则从零到简单分析html标签' 
date: 2018-12-03 2:30:08
hidden: true
slug: d6bg8mqt7ku
categories: [reprint]
---

{{< raw >}}

                    
<p>对于正则之前一直是一个"百度程序员", 也许超过一半甚至更多的程序员也是, 那么这次来学习一下正则表达式.</p>
<h2>事出有因</h2>
<p>这部分介绍一下需求的由来, 与主要内容无关.</p>
<p>工作上有了这样的需求: </p>
<p>web端从ueditor来的数据格式是html, 也就是<code>&lt;p&gt;文章内容&lt;/p&gt;</code>, 并夹杂着诸多标签和嵌套. </p>
<p>然而正在开发的是react-native项目, rn的标签和html完全不兼容, 是<code>View, Text, Image</code>等. </p>
<p>那么把从web存入的数据读取到rn上就出了大麻烦, 甚至有些地方要进行跳转, 有些图片要显示, 那么怎么办呢.</p>
<p>通过百度"js如何验证邮箱"已经无法满足需求了, 只能学一下了.</p>
<h2>目标</h2>
<p>万事有目标, 我们要把一下内容转换成rn的内容:</p>
<pre><code class="html">&lt;p&gt;嘿嘿嘿&lt;img class="currentImg" id="currentImg" src="https://timgsa.baidu.com/timg?image&amp;quality=80&amp;size=b9999_10000&amp;sec=1524647151050&amp;di=d488d0e93e72f13643d843066ef26836&amp;imgtype=0&amp;src=http%3A%2F%2Fimg02.imgcdc.com%2Fgame%2Fzh_cn%2Fpicnews%2F11128819%2F20160518%2F22678501_20160518152946632994008.jpg" width="201.33333333333" height="302" title="点击查看源网页"/&gt;拖过来的图片哦&lt;img class="currentImg" id="currentImg" src="https://timgsa.baidu.com/timg?image&amp;quality=80&amp;size=b9999_10000&amp;sec=1524647205890&amp;di=5bf77e1d35941def729d2059d91deba8&amp;imgtype=0&amp;src=http%3A%2F%2Fnds.tgbus.com%2FUploadFiles%2F201208%2F20120817142937519.jpg" width="201.17405063291" height="302" title="点击查看源网页"/&gt;&lt;br/&gt;a&lt;img src=‘test1’ /&gt;b&lt;img src=‘test2’ /&gt;c&lt;img src=‘test3’ /&gt;d&lt;/p&gt;</code></pre>
<p>转换结果是:</p>
<pre><code class="html">&lt;Text&gt;嘿嘿嘿&lt;/Text&gt;
&lt;Image source="{{"uri: 'https://timgsa.baxxxx'"}}"&gt;&lt;/Image&gt;
&lt;Text&gt;拖过来的图片哦&lt;/Text&gt;
&lt;Image source="{{"uri: 'https://txx'"}}"&gt;&lt;/Image&gt;
&lt;Text&gt;a&lt;/Text&gt;
&lt;Image source="{{"uri: 'test1'"}}"&gt;&lt;/Image&gt;
&lt;Text&gt;b&lt;/Text&gt;
...</code></pre>
<p>本文会从零基础出发达成这个目标.</p>
<p>讲解顺序: 正则介绍 =&gt; 正则语法系统 =&gt; 简单的例子讲解 =&gt; 尝试实现目标以及碰到的问题 =&gt; 实现目标</p>
<h2>什么是正则</h2>
<p>初中时候学的通配符, 用<code>?</code>代表一个任意字符, 用<code>*</code>代表任意个任意字符来进行搜索, 正则也是如此. 比如:</p>
<p><code>123[abc]</code>匹配以下哪组字符?</p>
<ol>
<li>123c</li>
<li>123d</li>
<li>123e</li>
<li>123f</li>
</ol>
<p>选了1的朋友你已经知道正则是什么了. <code>123[abc]</code>就是正则, 代表匹配内容为: 前三个字符分别为123, 第四个字符是abc中的一个, 这个正则遇到<code>123a</code>, <code>123b</code>, <code>123c</code>都可以匹配成功, 其他任何都匹配失败.</p>
<h2>正则语法</h2>
<p>百度了正则表达式看到的东西都用了很多术语, 让人有点犯浑. 我经过学习把正则抽象为两个部分: <code>内容</code>和<code>修饰</code>.</p>
<p>看到一长串正则觉得稀里哗啦, 但是里面的每个符号一定都属于<code>内容</code>或是<code>修饰</code>.</p>
<h3>内容</h3>
<p>内容的形式有3种:</p>
<ol>
<li>直接匹配: 举例就是刚才的<code>123[abc]</code>中的<code>123</code>, 这种匹配需要完全吻合才能匹配, <code>123</code>就唯一匹配<code>123</code>.</li>
<li>范围匹配: 用中括号表示, 也就是刚才例子中的<code>[abc]</code>. 这种情况也就是三选一. 任意匹配<code>a</code>或<code>b</code>或<code>c</code>, 而不是匹配<code>abc</code>. 还有两种形式: 加<code>-</code>来表示范围, 比如<code>[a-z]</code>; 表示排除范围内的<code>^</code>, 比如<code>[^abc]</code>
</li>
<li>匹配并选择缓存到子匹配: 用圆括号表示, 圆括号中的内容语法是"直接匹配"但会被记入缓存作为子匹配, 我记得我最初接触正则就是url rewrite, 写了url正则之后用<code>$1, $2</code>来重写url.</li>
</ol>
<p>在范围匹配中, 我们经常会用: 数字/字母, 也就是<code>[0-9]</code>, <code>[a-zA-Z]</code>, 但是经常用到重复地写麻烦又看不能装逼了, 所以产生了一些快捷方式: <code>\d</code>代表<code>[0-9]</code>, <code>\w</code>代表<code>[0-9a-zA-Z_]</code>这正好是常用的用户名和密码的规则.</p>
<p>这里深入一下圆括号匹配的两个点. 作为拓展, 可以先不看一下的内容直接到下一部分.</p>
<p>因为圆括号中可以用<code>|</code>符号来表示或的关系, 但有时候又不想被加入缓存. 于是可以用<code>?:</code>来表示不需要缓存. 例子:<code>hello (?:world|regular expression)</code>, 用来匹配<code>hello world</code>或者<code>hello regular expression</code>, 但又不需要把<code>world</code>储存为缓存.</p>
<p>如果之前已经用圆括号, 那么期望之后出现同样的内容, 可以用<code>\1</code>这样<code>\</code>加数字来表示. 举个例子: 单引号和双引号, 我们要匹配<code>'123'</code>或者<code>"123"</code>, 但是要保持引号一致.  <code>('|")123\1</code>就可以解决问题.</p>
<h3>修饰</h3>
<p>我把修饰部分分为数量修饰和边界修饰.</p>
<ol>
<li>数量修饰: 符号为{}, 想到了谷歌: <code>go{2,4}gle</code>这个正则可以匹配<code>google</code>, <code>gooogle</code>, <code>goooogle</code>, 代表这个<code>o</code>可以匹配2或者4次. 当然只是为了举例可以枚举, 因为<code>go{2,}gle</code>代表可以无限个<code>o</code>, 这样举例不方便.<p>与之前的范围匹配一样, 数量修饰也有快捷符号: <code>?</code>代表{0,1}, <code>*</code>代表{0,}, <code>+</code>代表{1,}. 都很形象, 不用死记, 就像刚才的d for digital, w for word. 看过一个例子: <code>colou?r</code> 这里的<code>?</code>表示可有可无, 美式和英式的拼写都可以匹配.</p>
<p>另外在"无上限"的数量的右边加<code>?</code>代表不贪婪匹配, 会匹配数量最少的内容. 举例: <code>a+</code>匹配<code>aaaaa</code>的结果为<code>aaaaa</code>, <code>a+?</code>匹配<code>aaaaa</code>的结果为<code>a</code>.</p>
</li>
<li>边界修饰: <code>^</code>表示字符串的头, <code>$</code>表示字符串的尾, <code>\b</code>表示字母与空格间的位置. 用来给匹配定位, 具体用法在实际中操作就会有具体感受了.<p>另外, 正则有一种匹配模式是<code>m</code>, 多行匹配模式, 这个情况里<code>^</code>和<code>$</code>也能匹配每一行的开头和结尾.</p>
</li>
</ol>
<h2>javascript相关函数</h2>
<p>首先明确正则是"正则表达式"与"字符串"发生的匹配关系.</p>
<p>js有个对象是<code>RegExp</code>, 使用方法是<code>new RegExp(pattern, mode)</code>, 或者是用<code>/</code>包裹的字面量: <code>/pattern/mode</code>.</p>
<p>这里发现提到了<code>mode</code>匹配模式, 一共三种:</p>
<ol>
<li>g: 全局匹配, 匹配到一次不会停止, <code>/a/</code>匹配<code>aaa</code>, 如果没有g结果是一个<code>a</code>, 有g结果是3个<code>a</code>.</li>
<li>i: 忽略大小写.</li>
<li>m: 多行模式. 和之前提到的<code>\b</code>有联动.</li>
</ol>
<p>三个模式不互斥, 叠加的, 也就是可以<code>new RegExp(patter, 'gin')</code>.</p>
<p>正则的方法有:</p>
<ol>
<li>
<code>.test()</code>: 返回是否匹配成功, true或者false.</li>
<li>
<code>.exec()</code>: 失败返回null, 成功返回数组, 位置0是匹配内容, 之后是圆括号匹配的内容. 要注意的是exec是忽略'g'模式的.</li>
</ol>
<p>字符串的方法:</p>
<ol>
<li>
<code>.replace(pattern, replacement)</code>: replacement可以字符串或方法, 方法的话参数是匹配到的内容.</li>
<li>
<code>.match(pattern)</code>: 返回数组, 所有匹配到的内容.</li>
</ol>
<h2>分析一些简单常用的例子</h2>
<h3>是否小数</h3>
<pre><code class="js">function isDecimal(strValue )  {  
   var  objRegExp= /^\d+\.\d+$/;
   return  objRegExp.test(strValue);  
}  </code></pre>
<p><code>\d</code>代表数字, <code>+</code>代表至少有1个数字,  <code>\.</code>转移小数点.</p>
<p>连起来看就是: 至少一个数字(<code>\d+</code>) 小数点(<code>\.</code>) 至少一个数字(<code>\d+</code>) .</p>
<p><code>^</code>和<code>$</code>代表头尾, 真个字符串是小数的全部, 而不是包含小数.</p>
<h3>是否中文名</h3>
<pre><code class="js">function ischina(str) {
    var reg=/^[\u4E00-\u9FA5]{2,4}$/;   /*定义验证表达式*/
    return reg.test(str);     /*进行验证*/
}</code></pre>
<p>这个范围是中文的编码范围: <code>[\u4E00-\u9FA5]</code>, <code>{2,4}</code>匹配2~4个. 也就是匹配2~4个中文.</p>
<h3>是否八位数字</h3>
<pre><code class="js">function isStudentNo(str) {
    var reg=/^\d{8}$/;   /*定义验证表达式*/
    return reg.test(str);     /*进行验证*/
}</code></pre>
<h3>是否电话号码</h3>
<pre><code class="js">function isTelCode(str) {
    var reg= /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/;
    return reg.test(str);
}</code></pre>
<p>分两个部分: 座机号和手机号, 用<code>|</code>隔开了.</p>
<p>座机号: 0开头的三位数或四位数 短杠 7~8位数字.</p>
<p>手机号: 第一位1, 第二位3584的一个, 剩下由9个数字凑满11位电话.</p>
<h3>邮箱地址</h3>
<pre><code class="js">function IsEmail(str) {
    var reg=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+$/;
    return reg.test(str);
}</code></pre>
<h2>迈向目标</h2>
<p>这个章节开始整理实现需求的思路.</p>
<p>先回忆一下正则的规则, 其实很简单, 和加减乘除一样, 有各种符号: [], (), |, -, {}, +, *, ?. 当然也可以很复杂, 因为也和加减乘除一样, 可以嵌套, 而正则的符号本来就多, 嵌套起来更是晕, 有一些符号在不同地方有不同作用, 比如<code>\</code>和<code>^</code>.(思考题: 分析一下这两个符号有哪些作用, 在什么场景).</p>
<p>那么我们的目标是: 把一段html分析称rn的标签.</p>
<p>因为rn没有parse的功能, 所以不可以使用replace. (replace是代码高亮的常用手段).</p>
<p>所以我们必须把html分解成js对象, 再从js对象里去分析输出rn标签.</p>
<p>因为html标签分为多种, 为了保证完整性和可维护性, 要把各个标签的正则分开写, 也便于之后在分析每个片段的时候来取子匹配, 比如img标签的src, a标签的href.</p>
<p>经过研究, 正则是不可以拼接的, 只有字符串可以拼接. 所以我们要把不同标签的正则写成字符串, 再在需要的时候拼接. <code>new RegExp(pattern)</code>的pattern参数是可以接受字符串的.</p>
<h2>匹配text的难题与正则匹配的动作分析</h2>
<p>众所周知, 在html里的text是可以光秃秃的(在rn里必须加上Text标签). 那么如何匹配这光秃秃的东西呢, 我开始想了一个办法: 因为text都在标签之外, 也就是"夹在&gt;和&lt;中的字符", 或者在开头(^)和&lt;间的, 或者&gt;和结尾($)间的. 结果标签全都匹配不到了.</p>
<p>原因是这样的, 如果有'g'的模式, 匹配的过程是这样的:</p>
<ol>
<li>进行第一次匹配, 匹配成功后把匹配部分排除待匹配内容.</li>
<li>进行第二次匹配, 匹配成功后把匹配部分排除待匹配内容.</li>
<li>直到匹配失败, 返回所有结果.</li>
</ol>
<p>举个例子:</p>
<pre><code class="js">'applebananaapple'.match(/(apple|banana)/g)</code></pre>
<p>结果是<code>["apple", "banana", "apple"]</code></p>
<p>如果把banana的最后一个字母和apple的第一个字母写成一个:</p>
<pre><code class="js">'applebananapple'.match(/(apple|banana)/g)</code></pre>
<p>那么结果就是<code>["apple", "banana"]</code>了.</p>
<p>反而利用了这个特点, 把text的正则写成: 不包含<code>&lt;&gt;/</code> (<code>[^&lt;&gt;/]+</code>), 并添加在最后一个匹配, 就能正确地匹配出text啦.</p>
<h2>揭晓答案</h2>
<p>写得急促也许有遗漏, 最后贴上完成需求的代码, 语言是rn, 在map输出的时候带着一些项目业务的逻辑请无视.</p>
<pre><code class="js">import React, {Component} from 'react'
import {Text, View, Image, Platform, StyleSheet, TouchableOpacity} from 'react-native'
import {ENVS} from '../../config/apiHost'

/*
    必须props: @html: html内容
    可选props:  @style: 字体style; @magnifyImg: 显示大图
 */

const regex = {  // '_' for close tag
    p: `&lt;p[^&gt;]*?&gt;`,
    _p: `&lt;\/p&gt;`,
    span: `&lt;span[^&gt;]*?&gt;`,
    _span: `&lt;\/span&gt;`,
    br: `&lt;br\/&gt;`,
    a: `&lt;a[^&gt;]*?href=(\'|")([^&gt;]+?)\\1[^&gt;]*?&gt;([^&lt;]+?)&lt;\\/a&gt;`, // $1 是标点符号用来处理匹配 $2 href的带引号的内容 $3 文件名(a标签的innerText),
    img: `&lt;img[^&gt;]*?src=('|")([^&gt;]+?)\\1[^&gt;]*?\\/&gt;`, // $1 标点符号 $2 src的内容
    text: `[^&lt;&gt;/]+`, // 匹配剩下的, 一定要放在最后
}

const tobeRemoved = new RegExp(`(?:${[regex.p, regex._p, regex.span, regex._span, regex.br].join('|')})`, 'g')

const parseToAst = new RegExp(`(?:${[regex.a, regex.img, regex.text].join('|')})`, 'g')

export default class Parsed extends Component {
    render () {
        let str = this.props.html.trim()
        if (!str) {
            return (
                &lt;Text&gt;html attr not passed to component 'parseHtml'&lt;/Text&gt;
            )
        }
        matches = str.replace(tobeRemoved, '').match(parseToAst)
        return (
            &lt;View&gt;
                {matches.map((block, index) =&gt; {
                    for (let [key, value] of Object.entries(regex)) {
                        let res = new RegExp(value).exec(block)
                        if (res) {
                            if (key === 'text') {
                                return (
                                    &lt;Text style={this.props.style} key={index}&gt;{block}&lt;/Text&gt;
                                )
                            }
                            if (key === 'a') {
                                if (res[2].includes('files')) { // 判断附件
                                    if (/[jpg|png|jpeg]/i.test(res[3])) { // 判断图片
                                        let imgId = res[2].match(/\d+/)[0]
                                        return (
                                            &lt;TouchableOpacity key={index} onPress={() =&gt; {this.props.magnifyImg &amp;&amp; this.props.magnifyImg(ENVS.production.api_base_url + '/files/' + imgId)"}}" &gt;
                                                &lt;Image style="{{"width: 100, height: 100, margin: 10"}}" source="{{"uri: ENVS.production.api_base_url + '/files/' + imgId"}}"&gt;&lt;/Image&gt;
                                            &lt;/TouchableOpacity&gt;
                                        )
                                    }
                                }
                            }
                            if (key === 'img') {
                                return (
                                    &lt;TouchableOpacity key={index} onPress={() =&gt; {this.props.magnifyImg &amp;&amp; this.props.magnifyImg(res[2])"}}"&gt;
                                        &lt;Image style="{{"width: 100, height: 100, margin: 10"}}" source="{{"uri: res[2]"}}"&gt;&lt;/Image&gt;
                                    &lt;/TouchableOpacity&gt;
                                )
                            }
                        }
                    }
                })}
            &lt;/View&gt;
        )
    }
}</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
正则从零到简单分析html标签

## 原文链接
[https://segmentfault.com/a/1190000014658277](https://segmentfault.com/a/1190000014658277)

