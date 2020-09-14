---
title: 'PHP发表心情-投票功能源码' 
date: 2019-01-01 2:30:07
hidden: true
slug: 7o20s1yv7l
categories: [reprint]
---

{{< raw >}}

                    
<p>当浏览新闻页面或者其它页面的时候会有阅读后的感受，比如<strong>给力、淡定、打酱油、加油、坑爹</strong>等等的表情。让读者打分，看看自己的感受是否与其他读者一样。很不错的交互！</p>
<p><span class="img-wrap"><img data-src="/img/bVUNFB?w=374&amp;h=193" src="https://static.alili.tech/img/bVUNFB?w=374&amp;h=193" alt="图片描述" title="图片描述"></span></p>
<p>查看演示：<a href="http://www.weibut.com/demo/201701/mood/" rel="nofollow noreferrer">http://www.weibut.com/demo/20...</a><br>立即下载：<a href="http://www.weibut.com/download/17" rel="nofollow noreferrer">http://www.weibut.com/downloa...</a></p>
<p>本文需要熟悉<code>jquery</code>,<code>mysql</code>,<code>ajax</code>相关的知识，不过用的不多。本文有三个文件：<code>index.html</code>,<code>mood.php</code>,<code>sql.php</code></p>
<blockquote><ul>
<li><p>index.html，页面展示和请求ajax数据</p></li>
<li><p>mood.php，后台文件 处理get请求来的数据，并返回数据</p></li>
<li><p>sql.php，数据库文件，存数据库信息</p></li>
</ul></blockquote>
<p>直接进入代码吧。</p>
<h2>index.html</h2>
<p>首先导入jquery</p>
<pre><code class="html">//cdn.bootcss.com/jquery/1.7.2/jquery.min.js</code></pre>
<p>当文档载入完毕就请求（ajax-get）投票人数数据</p>
<pre><code class="javascript">$.ajax({
    type: 'GET',
    url: 'mood.php',
    cache: false,
    data: 'id=1',
    dataType: 'json',
    error: function(){
        alert('出错了！');
    },
    success: function(json){
        if(json){
            $.each(json,function(index,array){
                var str = "&lt;li&gt;&lt;span&gt;"+array['mood_val']+"&lt;/span&gt;&lt;div class=\"pillar\" style=\"height:"+array['height']+"px;\"&gt;&lt;/div&gt;&lt;div class=\"face\" rel=\""+array['mid']+"\"&gt;&lt;img src=\"images/"+array['mood_pic']+"\"&gt;&lt;br/&gt;"+array['mood_name']+"&lt;/div&gt;&lt;/li&gt;";
                $("#mood ul").append(str);
            });
        }
    }
});</code></pre>
<p>返回就添加到网页里，然后就点击表情逻辑，也ajax到后台</p>
<pre><code class="javascript">$(".face").live('click',function(){
    var face = $(this);
    var mid = face.attr("rel");
    var value = face.parent().find("span").html();
    var val = parseInt(value)+1;
    $.post("mood.php?action=send",{moodid:mid,id:1},function(data){
        if(data&gt;0){
            face.prev().css("height",data+"px");
            face.parent().find("span").html(val);
            face.find("img").addClass("selected");
        }else{
            alert(data);
        }
    });
});</code></pre>
<p>这样整个前台就完成了工作</p>
<h2>mood.php</h2>
<p>首先要导入sql.php数据库文件</p>
<pre><code class="php">include_once("sql.php");</code></pre>
<p>这个文件处理的是整个功能的核心，处理<code>数据库</code>，<code>cookies</code>...</p>
<h3>1.处理获取投票人数代码</h3>
<pre><code class="php">$mname = explode(',',$moodname);//心情说明
$num = count($mname);
$mpic = explode(',',$moodpic);//心情图标
$id = (int)$_GET['id'];
$query = mysql_query("select * from mood where id=$id");
$rs = mysql_fetch_array($query);
if($rs){
    $total = $rs['mood0']+$rs['mood1']+$rs['mood2']+$rs['mood3']+$rs['mood4'];
    for($i=0;$i&lt;$num;$i++){
        $field = 'mood'.$i;
        $m_val = intval($rs[$field]);
        $height = 0; //柱图高度
        if($total &amp;&amp; $m_val){
            $height=round(($m_val/$total)*$moodpicheight); //计算高度
        }
        $arr[] = array(
            'mid' =&gt; $i,
            'mood_name' =&gt; $mname[$i],
            'mood_pic' =&gt; $mpic[$i],
            'mood_val' =&gt; $m_val,
            'height' =&gt; $height
        );
    }
    echo json_encode($arr);
} else {
    for($i=0;$i&lt;$num;$i++){
        $arr[] = array(
            'mid' =&gt; $i,
            'mood_name' =&gt; $mname[$i],
            'mood_pic' =&gt; $mpic[$i],
            'mood_val' =&gt; 0,
            'height' =&gt; 0
        );
    }
    echo json_encode($arr);
}</code></pre>
<h3>2.处理投票功能</h3>
<pre><code class="php">$id = (int)$_POST['id'];
$mid = (int)$_POST['moodid'];
if($mid&lt;0 || !$id){
    echo "错误";
    exit;
}

$havemood = chk_mood($id);
if($havemood==1){
    echo "您已表达过了";exit;
}
$field = 'mood'.$mid;
//查询是否有这个id
$result = mysql_query("select 1 from mood  where id='{$id}'");
$row = mysql_fetch_array($result);
if(is_array($row)){
    $query = mysql_query("update mood set ".$field."=".$field."+1 where id=".$id);
    if($query){
        setcookie("mood".$id, $mid.$id, time()+3600);
        $query2 = mysql_query("select * from mood where id=$id");
        $rs = mysql_fetch_array($query2);
        $total = $rs['mood0']+$rs['mood1']+$rs['mood2']+$rs['mood3']+$rs['mood4'];
        $height = round(($rs[$field]/$total)*$moodpicheight);
        echo $height;
    }else{
        echo -1;
    }
} else {
    mysql_query("INSERT INTO mood(id,mood0,mood1,mood2,mood3,mood4)VALUES ('{$id}','0','0','0','0','0')");
    $query = mysql_query("update mood set ".$field."=".$field."+1 where id=".$id);
    setcookie("mood".$id, $mid.$id, time()+3600);
    echo $moodpicheight;
}</code></pre>
<p>这个文件很简单，基本都是在处理数据库，逻辑也不是很复杂。可以自己下来细心看。</p>
<h2>sql.php</h2>
<p>一个通用的数据库信息储存文件,数据库的<code>ip、帐号、密码、数据库名</code>等等</p>
<pre><code class="php">$host="localhost";
$db_user="root";
$db_pass="";
$db_name="demo";
$timezone="Asia/Shanghai";

$link=mysql_connect($host,$db_user,$db_pass);
mysql_select_db($db_name,$link);
mysql_query("SET names UTF8");

header("Content-Type: text/html; charset=utf-8");</code></pre>
<p><strong>到目前所有的核心代码都也贴出，大神就跳过，如果有需要就下载来看一看</strong><br>对了，还有一个数据库,行吧DDL也贴出来</p>
<pre><code>CREATE TABLE `mood` (
  `id` tinyint(5) NOT NULL,
  `mood0` int(9) unsigned NOT NULL,
  `mood1` int(9) unsigned NOT NULL,
  `mood2` int(9) unsigned NOT NULL,
  `mood3` int(9) unsigned NOT NULL,
  `mood4` int(9) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
PHP发表心情-投票功能源码

## 原文链接
[https://segmentfault.com/a/1190000011114993](https://segmentfault.com/a/1190000011114993)

