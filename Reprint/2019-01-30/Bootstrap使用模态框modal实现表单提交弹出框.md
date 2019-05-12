---
title: 'Bootstrap使用模态框modal实现表单提交弹出框' 
date: 2019-01-30 2:30:23
hidden: true
slug: stp6408xnu
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">Bootstrap 模态框（Modal）插件</h2>
<p><strong>模态框（Modal）</strong>是覆盖在父窗体上的子窗体。通常，目的是显示来自一个单独的源的内容，可以在不离开父窗体的情况下有一些互动。子窗体可提供信息、交互等。<br>如果您想要单独引用该插件的功能，那么您需要引用 modal.js。或者，正如 Bootstrap 插件概览 一章中所提到，您可以引用 bootstrap.js 或压缩版的 bootstrap.min.js。</p>
<h3 id="articleHeader1">用法</h3>
<p>您可以切换模态框（Modal）插件的隐藏内容：<br>通过 data 属性：在控制器元素（比如按钮或者链接）上设置属性 data-toggle="modal"，同时设置 data-target="#identifier" 或 href="#identifier" 来指定要切换的特定的模态框（带有 id="identifier"）。<br>通过 JavaScript：使用这种技术，您可以通过简单的一行 JavaScript 来调用带有 id="identifier" 的模态框：<br>$('#identifier').modal(options)</p>
<h3 id="articleHeader2">实例一、简单弹框</h3>
<p>一个静态的模态窗口实例，如下面的实例所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>
<head>
    <meta charset=&quot;utf-8&quot;> 
    <title>Bootstrap 实例 - 模态框（Modal）插件</title>
    <link rel=&quot;stylesheet&quot; href=&quot;http://cdn.static.runoob.com/libs/bootstrap/3.3.7/css/bootstrap.min.css&quot;>
    <script src=&quot;http://cdn.static.runoob.com/libs/jquery/2.1.1/jquery.min.js&quot;></script>
    <script src=&quot;http://cdn.static.runoob.com/libs/bootstrap/3.3.7/js/bootstrap.min.js&quot;></script>
</head>
<script>

    // update表单
    function update_info(id)
    {
        var id = id;
        //复杂一点的json的另一种形式  
        var value2 = {&quot;user_id&quot;:&quot;123456&quot;,&quot;username&quot;:&quot;coolcooldool&quot;};  
 
 
        // $('input[name=username]').removeAttr(&quot;readonly&quot;);//去除input元素的readonly属性
         var obj2 = eval(value2);  
         // alert(obj2);

        // 赋值
        $(&quot;#user_id&quot;).val(obj2.user_id);
        $(&quot;#user_name&quot;).val(obj2.username);
        $(&quot;#act&quot;).val(&quot;edit&quot;);

        // 将input元素设置为readonly
        $('#user_id').attr(&quot;readonly&quot;,&quot;readonly&quot;)

    }

    

    // 添加入库操作
    function add_info()
    {
        var form_data = $(&quot;#form_data&quot;).serialize();
        alert(form_data);

    }
</script
<body>

<h2>创建模态框（Modal）</h2>
<!-- 按钮触发模态框 -->
<button class=&quot;btn btn-primary btn-lg&quot; data-toggle=&quot;modal&quot; data-target=&quot;#myModal&quot;>
    添加
</button>
<button class=&quot;btn btn-primary btn-lg&quot; onclick=&quot;update_info(8)&quot; data-toggle=&quot;modal&quot; data-target=&quot;#myModal&quot;>
    编辑
</button>
<!-- 模态框（Modal） -->
<div class=&quot;modal fade&quot; id=&quot;myModal&quot; tabindex=&quot;-1&quot; role=&quot;dialog&quot; aria-labelledby=&quot;myModalLabel&quot; aria-hidden=&quot;true&quot;>
    <div class=&quot;modal-dialog&quot;>
        <div class=&quot;modal-content&quot;>
            <div class=&quot;modal-header&quot;>
                <button type=&quot;button&quot; class=&quot;close&quot; data-dismiss=&quot;modal&quot; aria-hidden=&quot;true&quot;>
                    &amp;times;
                </button>
                <h4 class=&quot;modal-title&quot; id=&quot;myModalLabel&quot;>
                    模态框（Modal）标题
                </h4>
            </div>
            <form id=&quot;form_data&quot;>
            <div class=&quot;modal-body&quot;>
                user_id: <input type=&quot;text&quot; id=&quot;user_id&quot; name=&quot;user_id&quot;/>
                name: <input type=&quot;text&quot; id=&quot;user_name&quot; name=&quot;user_name&quot;/>
                <input type=&quot;hidden&quot; id=&quot;act&quot; value=&quot;add&quot; name=&quot;act&quot;/>
            </div>
            <div class=&quot;modal-footer&quot;>
                <button type=&quot;button&quot; class=&quot;btn btn-default&quot; data-dismiss=&quot;modal&quot;>关闭
                </button>
                <button type=&quot;button&quot; onclick=&quot;add_info()&quot; class=&quot;btn btn-primary&quot;>
                    提交更改
                </button>
            </div>
            </form>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span> 
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Bootstrap 实例 - 模态框（Modal）插件<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"http://cdn.static.runoob.com/libs/bootstrap/3.3.7/css/bootstrap.min.css"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://cdn.static.runoob.com/libs/jquery/2.1.1/jquery.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://cdn.static.runoob.com/libs/bootstrap/3.3.7/js/bootstrap.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="handlebars"><span class="xml">

    // update表单
    function update_info(id)
    {
        var id = id;
        //复杂一点的json的另一种形式  
        var value2 = {"user_id":"123456","username":"coolcooldool"};  
 
 
        // $('input[name=username]').removeAttr("readonly");//去除input元素的readonly属性
         var obj2 = eval(value2);  
         // alert(obj2);

        // 赋值
        $("#user_id").val(obj2.user_id);
        $("#user_name").val(obj2.username);
        $("#act").val("edit");

        // 将input元素设置为readonly
        $('#user_id').attr("readonly","readonly")

    }

    

    // 添加入库操作
    function add_info()
    {
        var form_data = $("#form_data").serialize();
        alert(form_data);

    }
<span class="hljs-tag">&lt;/<span class="hljs-name">script</span>
&lt;<span class="hljs-attr">body</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>创建模态框（Modal）<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
<span class="hljs-comment">&lt;!-- 按钮触发模态框 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"btn btn-primary btn-lg"</span> <span class="hljs-attr">data-toggle</span>=<span class="hljs-string">"modal"</span> <span class="hljs-attr">data-target</span>=<span class="hljs-string">"#myModal"</span>&gt;</span>
    添加
<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"btn btn-primary btn-lg"</span> <span class="hljs-attr">onclick</span>=<span class="hljs-string">"update_info(8)"</span> <span class="hljs-attr">data-toggle</span>=<span class="hljs-string">"modal"</span> <span class="hljs-attr">data-target</span>=<span class="hljs-string">"#myModal"</span>&gt;</span>
    编辑
<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-comment">&lt;!-- 模态框（Modal） --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"modal fade"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"myModal"</span> <span class="hljs-attr">tabindex</span>=<span class="hljs-string">"-1"</span> <span class="hljs-attr">role</span>=<span class="hljs-string">"dialog"</span> <span class="hljs-attr">aria-labelledby</span>=<span class="hljs-string">"myModalLabel"</span> <span class="hljs-attr">aria-hidden</span>=<span class="hljs-string">"true"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"modal-dialog"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"modal-content"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"modal-header"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"close"</span> <span class="hljs-attr">data-dismiss</span>=<span class="hljs-string">"modal"</span> <span class="hljs-attr">aria-hidden</span>=<span class="hljs-string">"true"</span>&gt;</span>
                    &amp;times;
                <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">h4</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"modal-title"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"myModalLabel"</span>&gt;</span>
                    模态框（Modal）标题
                <span class="hljs-tag">&lt;/<span class="hljs-name">h4</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"form_data"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"modal-body"</span>&gt;</span>
                user_id: <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"user_id"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"user_id"</span>/&gt;</span>
                name: <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"user_name"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"user_name"</span>/&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"hidden"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"act"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"add"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"act"</span>/&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"modal-footer"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"btn btn-default"</span> <span class="hljs-attr">data-dismiss</span>=<span class="hljs-string">"modal"</span>&gt;</span>关闭
                <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span> <span class="hljs-attr">onclick</span>=<span class="hljs-string">"add_info()"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"btn btn-primary"</span>&gt;</span>
                    提交更改
                <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span><span class="hljs-comment">&lt;!-- /.modal-content --&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span><span class="hljs-comment">&lt;!-- /.modal --&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></span></span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVGgCZ?w=932&amp;h=447" src="https://static.alili.tech/img/bVGgCZ?w=932&amp;h=447" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader3">实例二、表单弹窗实现增删改功能</h3>
<p><span class="img-wrap"><img data-src="/img/bVGzuM?w=1137&amp;h=342" src="https://static.alili.tech/img/bVGzuM?w=1137&amp;h=342" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>点击添加按钮，弹出添加表单框：</p>
<p><span class="img-wrap"><img data-src="/img/bVGzvp?w=1217&amp;h=463" src="https://static.alili.tech/img/bVGzvp?w=1217&amp;h=463" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><strong>前端页面</strong><br><strong>user_list.html</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>
<head>
    <meta charset=&quot;gb2312&quot;>
    <title>用户列表</title>
    <link href=&quot;http://libs.baidu.com/bootstrap/3.0.3/css/bootstrap.min.css&quot; rel=&quot;stylesheet&quot;>
    <script src=&quot;http://libs.baidu.com/jquery/2.0.0/jquery.min.js&quot;></script>
    <script src=&quot;http://libs.baidu.com/bootstrap/3.0.3/js/bootstrap.min.js&quot;></script>
    <meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;>
</head>
<script>
    // 提交表单
    function delete_info(id)
    {
        if(!id)
        {
            alert('Error！');
            return false;
        }
        // var form_data = new Array();

        $.ajax(
                {
                    url: &quot;action/user_action.php&quot;,
                    data:{&quot;id&quot;:id, &quot;act&quot;:&quot;del&quot;},
                    type: &quot;post&quot;,
                    beforeSend:function()
                    {
                        $(&quot;#tip&quot;).html(&quot;<span style='color:blue'>正在处理...</span>&quot;);
                        return true;
                    },
                    success:function(data)
                    {
                        if(data > 0)
                        {
                            alert('操作成功');
                            $(&quot;#tip&quot;).html(&quot;<span style='color:blueviolet'>恭喜，删除成功！</span>&quot;);

                            // document.location.href='world_system_notice.php'
                             location.reload();
                        }
                        else
                        {
                            $(&quot;#tip&quot;).html(&quot;<span style='color:red'>失败，请重试</span>&quot;);
                            alert('操作失败');
                        }
                    },
                    error:function()
                    {
                        alert('请求出错');
                    },
                    complete:function()
                    {
                        // $('#tips').hide();
                    }
                });

        return false;
    }

    // 编辑表单
    function get_edit_info(user_id)
    {
        if(!user_id)
        {
            alert('Error！');
            return false;
        }
        // var form_data = new Array();

        $.ajax(
                {
                    url: &quot;action/user_action.php&quot;,
                    data:{&quot;user_id&quot;:user_id, &quot;act&quot;:&quot;get&quot;},
                    type: &quot;post&quot;,
                    beforeSend:function()
                    {
                        // $(&quot;#tip&quot;).html(&quot;<span style='color:blue'>正在处理...</span>&quot;);
                        return true;
                    },
                    success:function(data)
                    {
                        if(data)
                        {

                            // 解析json数据
                            var data = data;

                            var data_obj = eval(&quot;(&quot;+data+&quot;)&quot;);

                            // 赋值
                            $(&quot;#user_id&quot;).val(data_obj.user_id);
                           
                            $(&quot;#name&quot;).val(data_obj.name);
                            $(&quot;#address&quot;).val(data_obj.address);
                            $(&quot;#remark&quot;).val(data_obj.remark);
                            $(&quot;#act&quot;).val(&quot;edit&quot;);

                            // 将input元素设置为readonly
                            $('#user_id').attr(&quot;readonly&quot;,&quot;readonly&quot;)
                           // location.reload();
                        }
                        else
                        {
                            $(&quot;#tip&quot;).html(&quot;<span style='color:red'>失败，请重试</span>&quot;);
                          //  alert('操作失败');
                        }
                    },
                    error:function()
                    {
                        alert('请求出错');
                    },
                    complete:function()
                    {
                        // $('#tips').hide();
                    }
                });

        return false;
    }

    // 提交表单
    function check_form()
    {
        var user_id = $.trim($('#user_id').val());
        var act     = $.trim($('#act').val());

        if(!user_id)
        {
            alert('用户ID不能为空！');
            return false;
        }
           var form_data = $('#form_data').serialize();

        // 异步提交数据到action/add_action.php页面
        $.ajax(
                {
                    url: &quot;action/user_action.php&quot;,
                    data:{&quot;form_data&quot;:form_data,&quot;act&quot;:act},
                    type: &quot;post&quot;,
                    beforeSend:function()
                    {
                        $(&quot;#tip&quot;).html(&quot;<span style='color:blue'>正在处理...</span>&quot;);
                        return true;
                    },
                    success:function(data)
                    {
                        if(data > 0)
                        {

                            var msg = &quot;添加&quot;;
                            if(act == &quot;edit&quot;) msg = &quot;编辑&quot;;
                            $(&quot;#tip&quot;).html(&quot;<span style='color:blueviolet'>恭喜，&quot; +msg+ &quot;成功！</span>&quot;);
                            // document.location.href='system_notice.php'
                            alert(msg + &quot;OK！&quot;);
                            location.reload();
                        }
                        else
                        {
                            $(&quot;#tip&quot;).html(&quot;<span style='color:red'>失败，请重试</span>&quot;);
                            alert('操作失败');
                        }
                    },
                    error:function()
                    {
                        alert('请求出错');
                    },
                    complete:function()
                    {
                        $('#acting_tips').hide();
                    }
                });

        return false;
    }

    $(function () { $('#addUserModal').on('hide.bs.modal', function () {
        // 关闭时清空edit状态为add
        $(&quot;#act&quot;).val(&quot;add&quot;);
        location.reload();
    })
    });
</script>
<body>
<div class=&quot;container&quot; style=&quot;min-width: 1200px;&quot;>

<h1>
用户列表
</h1>
    <form action=&quot;extreme_award_user_list.php&quot; method=&quot;post&quot; class=&quot;form&quot;>
    <table class=&quot;table table-bordered&quot;>
        <tbody>
        <tr>
            <td>用户ID：<input type=&quot;text&quot; name=&quot;search_user_id&quot; value=&quot;{search_user_id}&quot;></td>
            <td>合计条件用户： <input type=&quot;text&quot; name=&quot;search_total&quot; value=&quot;{search_total}&quot;></td>
            <td>   <!-- 按钮触发模态框 -->
                <button class=&quot;btn btn-primary btn-sm&quot; data-toggle=&quot;modal&quot;  data-target=&quot;#addUserModal&quot;>
                    添加用户
                </button>
            </td>
        </tr>
        <tr>
            <td colspan=&quot;10&quot; style=&quot; text-align: center; padding: 10px; border: none&quot;>
                <input type=&quot;submit&quot; class=&quot;btn btn-default&quot; value=&quot;搜索&quot; />&amp;nbsp;&amp;nbsp;<a href=&quot;extreme_award_user_list.php&quot;>默认</a>
            </td>
        </tr>
        </tbody>
    </table>
    </form>

    总数（<b>{total_count}</b>）
<table class=&quot;table table-hover table-bordered&quot; >
    <thead>
    <tr>
        <th>用户id</th>
        <th>用户名</th>
        <th>地址</th>
        <th>备注</th>
        <th>操作</th>
    </tr>
    </thead>
    <tbody>
    <!-- BEGIN list -->
    <tr>
        <td>{user_id}</td>
        <td>{name}</td>
        <td>{address}</td>
        <td>{remark}</td>
        <td>
            <button type=&quot;button&quot; class=&quot;btn btn-info&quot; data-toggle=&quot;modal&quot; onclick=&quot;return get_edit_info({user_id})&quot; data-target=&quot;#addUserModal&quot;>编辑</button>
            &amp;nbsp;&amp;nbsp;
        <button type=&quot;button&quot; class=&quot;btn btn-danger&quot; onclick=&quot;return delete_info({id})&quot;>删除</button>
        </td>

    </tr>

    <!-- END list -->


    </tbody>
</table>
    {page_str} &amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;

    <!-- 模态框示例（Modal） -->
    <form method=&quot;post&quot; action=&quot;&quot; class=&quot;form-horizontal&quot; role=&quot;form&quot; id=&quot;form_data&quot; onsubmit=&quot;return check_form()&quot; style=&quot;margin: 20px;&quot;>
    <div class=&quot;modal fade&quot; id=&quot;addUserModal&quot; tabindex=&quot;-1&quot; role=&quot;dialog&quot; aria-labelledby=&quot;myModalLabel&quot; aria-hidden=&quot;true&quot;>
        <div class=&quot;modal-dialog&quot;>
            <div class=&quot;modal-content&quot;>
                <div class=&quot;modal-header&quot;>
                    <button type=&quot;button&quot; class=&quot;close&quot; data-dismiss=&quot;modal&quot; aria-hidden=&quot;true&quot;>
                        &amp;times;
                    </button>
                    <h4 class=&quot;modal-title&quot; id=&quot;myModalLabel&quot;>
                        用户信息
                    </h4>
                </div>
                <div class=&quot;modal-body&quot;>
                    <form class=&quot;form-horizontal&quot; role=&quot;form&quot;>
                        <div class=&quot;form-group&quot;>
                            <label for=&quot;user_id&quot; class=&quot;col-sm-3 control-label&quot;>用户ID</label>
                            <div class=&quot;col-sm-9&quot;>
                                <input type=&quot;text&quot; class=&quot;form-control&quot; id=&quot;user_id&quot; name=&quot;user_id&quot; value=&quot;{user_id}&quot;
                                       placeholder=&quot;请输入用户ID&quot;>
                            </div>
                        </div>
                       
                        <div class=&quot;form-group&quot;>
                            <label for=&quot;lastname&quot; class=&quot;col-sm-3 control-label&quot;>用户名</label>
                            <div class=&quot;col-sm-9&quot;>
                                <input type=&quot;text&quot; class=&quot;form-control&quot; name=&quot;user_name&quot; value=&quot;&quot; id=&quot;user_name&quot;
                                       placeholder=&quot;用户名&quot;>
                            </div>
                        </div>
                        <div class=&quot;form-group&quot;>
                            <label for=&quot;lastname&quot; class=&quot;col-sm-3 control-label&quot;>地址</label>
                            <div class=&quot;col-sm-9&quot;>
                                <input type=&quot;text&quot; class=&quot;form-control&quot; name=&quot;address&quot; value=&quot;&quot; id=&quot;address&quot;
                                       placeholder=&quot;地址&quot;>
                            </div>
                        </div>

                        <div class=&quot;form-group&quot;>
                            <label for=&quot;remark&quot; class=&quot;col-sm-3 control-label&quot;>备注</label>
                            <div class=&quot;col-sm-9&quot;>
                                <textarea  class=&quot;form-control&quot;  name=&quot;remark&quot; value=&quot;{remark}&quot; id=&quot;remark&quot;
                                       placeholder=&quot;备注&quot;>

                                </textarea>
                            </div>
                        </div>
                    </form>
                </div>
                <div class=&quot;modal-footer&quot;>
                    <button type=&quot;button&quot; class=&quot;btn btn-default&quot; data-dismiss=&quot;modal&quot;>关闭
                    </button>
                    <button type=&quot;submit&quot; class=&quot;btn btn-primary&quot;>
                        提交
                    </button><span id=&quot;tip&quot;> </span>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal -->
    </div>
    </form>
</div>
</body>
</html>

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;meta charset="gb2312"&gt;
    &lt;title&gt;用户列表&lt;/title&gt;
    &lt;link href="http://libs.baidu.com/bootstrap/3.0.3/css/bootstrap.min.css" rel="stylesheet"&gt;
    &lt;script src="http://libs.baidu.com/jquery/2.0.0/jquery.min.js"&gt;&lt;/script&gt;
    &lt;script src="http://libs.baidu.com/bootstrap/3.0.3/js/bootstrap.min.js"&gt;&lt;/script&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
&lt;/head&gt;
&lt;script&gt;
    // 提交表单
    function delete_info(id)
    {
        if(!id)
        {
            alert('Error！');
            return false;
        }
        // var form_data = new Array();

        $.ajax(
                {
                    url: "action/user_action.php",
                    data:{"id":id, "act":"del"},
                    type: "post",
                    beforeSend:function()
                    {
                        $("#tip").html("&lt;span style='color:blue'&gt;正在处理...&lt;/span&gt;");
                        return true;
                    },
                    success:function(data)
                    {
                        if(data &gt; 0)
                        {
                            alert('操作成功');
                            $("#tip").html("&lt;span style='color:blueviolet'&gt;恭喜，删除成功！&lt;/span&gt;");

                            // document.location.href='world_system_notice.php'
                             location.reload();
                        }
                        else
                        {
                            $("#tip").html("&lt;span style='color:red'&gt;失败，请重试&lt;/span&gt;");
                            alert('操作失败');
                        }
                    },
                    error:function()
                    {
                        alert('请求出错');
                    },
                    complete:function()
                    {
                        // $('#tips').hide();
                    }
                });

        return false;
    }

    // 编辑表单
    function get_edit_info(user_id)
    {
        if(!user_id)
        {
            alert('Error！');
            return false;
        }
        // var form_data = new Array();

        $.ajax(
                {
                    url: "action/user_action.php",
                    data:{"user_id":user_id, "act":"get"},
                    type: "post",
                    beforeSend:function()
                    {
                        // $("#tip").html("&lt;span style='color:blue'&gt;正在处理...&lt;/span&gt;");
                        return true;
                    },
                    success:function(data)
                    {
                        if(data)
                        {

                            // 解析json数据
                            var data = data;

                            var data_obj = eval("("+data+")");

                            // 赋值
                            $("#user_id").val(data_obj.user_id);
                           
                            $("#name").val(data_obj.name);
                            $("#address").val(data_obj.address);
                            $("#remark").val(data_obj.remark);
                            $("#act").val("edit");

                            // 将input元素设置为readonly
                            $('#user_id').attr("readonly","readonly")
                           // location.reload();
                        }
                        else
                        {
                            $("#tip").html("&lt;span style='color:red'&gt;失败，请重试&lt;/span&gt;");
                          //  alert('操作失败');
                        }
                    },
                    error:function()
                    {
                        alert('请求出错');
                    },
                    complete:function()
                    {
                        // $('#tips').hide();
                    }
                });

        return false;
    }

    // 提交表单
    function check_form()
    {
        var user_id = $.trim($('#user_id').val());
        var act     = $.trim($('#act').val());

        if(!user_id)
        {
            alert('用户ID不能为空！');
            return false;
        }
           var form_data = $('#form_data').serialize();

        // 异步提交数据到action/add_action.php页面
        $.ajax(
                {
                    url: "action/user_action.php",
                    data:{"form_data":form_data,"act":act},
                    type: "post",
                    beforeSend:function()
                    {
                        $("#tip").html("&lt;span style='color:blue'&gt;正在处理...&lt;/span&gt;");
                        return true;
                    },
                    success:function(data)
                    {
                        if(data &gt; 0)
                        {

                            var msg = "添加";
                            if(act == "edit") msg = "编辑";
                            $("#tip").html("&lt;span style='color:blueviolet'&gt;恭喜，" +msg+ "成功！&lt;/span&gt;");
                            // document.location.href='system_notice.php'
                            alert(msg + "OK！");
                            location.reload();
                        }
                        else
                        {
                            $("#tip").html("&lt;span style='color:red'&gt;失败，请重试&lt;/span&gt;");
                            alert('操作失败');
                        }
                    },
                    error:function()
                    {
                        alert('请求出错');
                    },
                    complete:function()
                    {
                        $('#acting_tips').hide();
                    }
                });

        return false;
    }

    $(function () { $('#addUserModal').on('hide.bs.modal', function () {
        // 关闭时清空edit状态为add
        $("#act").val("add");
        location.reload();
    })
    });
&lt;/script&gt;
&lt;body&gt;
&lt;div class="container" style="min-width: 1200px;"&gt;

&lt;h1&gt;
用户列表
&lt;/h1&gt;
    &lt;form action="extreme_award_user_list.php" method="post" class="form"&gt;
    &lt;table class="table table-bordered"&gt;
        &lt;tbody&gt;
        &lt;tr&gt;
            &lt;td&gt;用户ID：&lt;input type="text" name="search_user_id" value="{search_user_id}"&gt;&lt;/td&gt;
            &lt;td&gt;合计条件用户： &lt;input type="text" name="search_total" value="{search_total}"&gt;&lt;/td&gt;
            &lt;td&gt;   &lt;!-- 按钮触发模态框 --&gt;
                &lt;button class="btn btn-primary btn-sm" data-toggle="modal"  data-target="#addUserModal"&gt;
                    添加用户
                &lt;/button&gt;
            &lt;/td&gt;
        &lt;/tr&gt;
        &lt;tr&gt;
            &lt;td colspan="10" style=" text-align: center; padding: 10px; border: none"&gt;
                &lt;input type="submit" class="btn btn-default" value="搜索" /&gt;&amp;nbsp;&amp;nbsp;&lt;a href="extreme_award_user_list.php"&gt;默认&lt;/a&gt;
            &lt;/td&gt;
        &lt;/tr&gt;
        &lt;/tbody&gt;
    &lt;/table&gt;
    &lt;/form&gt;

    总数（&lt;b&gt;{total_count}&lt;/b&gt;）
&lt;table class="table table-hover table-bordered" &gt;
    &lt;thead&gt;
    &lt;tr&gt;
        &lt;th&gt;用户id&lt;/th&gt;
        &lt;th&gt;用户名&lt;/th&gt;
        &lt;th&gt;地址&lt;/th&gt;
        &lt;th&gt;备注&lt;/th&gt;
        &lt;th&gt;操作&lt;/th&gt;
    &lt;/tr&gt;
    &lt;/thead&gt;
    &lt;tbody&gt;
    &lt;!-- BEGIN list --&gt;
    &lt;tr&gt;
        &lt;td&gt;{user_id}&lt;/td&gt;
        &lt;td&gt;{name}&lt;/td&gt;
        &lt;td&gt;{address}&lt;/td&gt;
        &lt;td&gt;{remark}&lt;/td&gt;
        &lt;td&gt;
            &lt;button type="button" class="btn btn-info" data-toggle="modal" onclick="return get_edit_info({user_id})" data-target="#addUserModal"&gt;编辑&lt;/button&gt;
            &amp;nbsp;&amp;nbsp;
        &lt;button type="button" class="btn btn-danger" onclick="return delete_info({id})"&gt;删除&lt;/button&gt;
        &lt;/td&gt;

    &lt;/tr&gt;

    &lt;!-- END list --&gt;


    &lt;/tbody&gt;
&lt;/table&gt;
    {page_str} &amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;

    &lt;!-- 模态框示例（Modal） --&gt;
    &lt;form method="post" action="" class="form-horizontal" role="form" id="form_data" onsubmit="return check_form()" style="margin: 20px;"&gt;
    &lt;div class="modal fade" id="addUserModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"&gt;
        &lt;div class="modal-dialog"&gt;
            &lt;div class="modal-content"&gt;
                &lt;div class="modal-header"&gt;
                    &lt;button type="button" class="close" data-dismiss="modal" aria-hidden="true"&gt;
                        &amp;times;
                    &lt;/button&gt;
                    &lt;h4 class="modal-title" id="myModalLabel"&gt;
                        用户信息
                    &lt;/h4&gt;
                &lt;/div&gt;
                &lt;div class="modal-body"&gt;
                    &lt;form class="form-horizontal" role="form"&gt;
                        &lt;div class="form-group"&gt;
                            &lt;label for="user_id" class="col-sm-3 control-label"&gt;用户ID&lt;/label&gt;
                            &lt;div class="col-sm-9"&gt;
                                &lt;input type="text" class="form-control" id="user_id" name="user_id" value="{user_id}"
                                       placeholder="请输入用户ID"&gt;
                            &lt;/div&gt;
                        &lt;/div&gt;
                       
                        &lt;div class="form-group"&gt;
                            &lt;label for="lastname" class="col-sm-3 control-label"&gt;用户名&lt;/label&gt;
                            &lt;div class="col-sm-9"&gt;
                                &lt;input type="text" class="form-control" name="user_name" value="" id="user_name"
                                       placeholder="用户名"&gt;
                            &lt;/div&gt;
                        &lt;/div&gt;
                        &lt;div class="form-group"&gt;
                            &lt;label for="lastname" class="col-sm-3 control-label"&gt;地址&lt;/label&gt;
                            &lt;div class="col-sm-9"&gt;
                                &lt;input type="text" class="form-control" name="address" value="" id="address"
                                       placeholder="地址"&gt;
                            &lt;/div&gt;
                        &lt;/div&gt;

                        &lt;div class="form-group"&gt;
                            &lt;label for="remark" class="col-sm-3 control-label"&gt;备注&lt;/label&gt;
                            &lt;div class="col-sm-9"&gt;
                                &lt;textarea  class="form-control"  name="remark" value="{remark}" id="remark"
                                       placeholder="备注"&gt;

                                &lt;/textarea&gt;
                            &lt;/div&gt;
                        &lt;/div&gt;
                    &lt;/form&gt;
                &lt;/div&gt;
                &lt;div class="modal-footer"&gt;
                    &lt;button type="button" class="btn btn-default" data-dismiss="modal"&gt;关闭
                    &lt;/button&gt;
                    &lt;button type="submit" class="btn btn-primary"&gt;
                        提交
                    &lt;/button&gt;&lt;span id="tip"&gt; &lt;/span&gt;
                &lt;/div&gt;
            &lt;/div&gt;&lt;!-- /.modal-content --&gt;
        &lt;/div&gt;&lt;!-- /.modal --&gt;
    &lt;/div&gt;
    &lt;/form&gt;
&lt;/div&gt;
&lt;/body&gt;
&lt;/html&gt;

</code></pre>
<p><strong>后台php页面action/user_action.php</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<?php

/**
 * 获取提交的数据
 *
 */

$act       = $_POST['act'];
$id        = $_POST['id'];
$user_id   = (int)$_POST['user_id'];
$form_data = $_POST['form_data'];
$param_arr = array();


// 获取到的数据格式为 “foo=bar&amp;baz=boom&amp;cow=milk&amp;php=hypertext+processor”
// http_build_query 的数据形式用parse_str解析为数组格式
parse_str($form_data, $param_arr);

// 备注中文处理
$param_arr['remark']  = iconv(&quot;utf-8&quot;, &quot;gbk&quot;, trim($param_arr['remark']));


switch($act)
{
    case &quot;add&quot;:

        // 添加入库操作
        // ...
        // ...
        break;

    case &quot;edit&quot;:

        // 编辑操作
        $user_id = $param_arr['user_id'];
        
        // ...
        break;

    case &quot;get&quot;:

        // 返回详细的用户信息
        // get($user_id);
        echo $ret;
        exit();
        break;
    case &quot;del&quot;:
        // 删除
        // delete();
        break;
}

echo $ret > 0 ? 1 : 0;


" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="php"><span class="hljs-meta">&lt;?php</span>

<span class="hljs-comment">/**
 * 获取提交的数据
 *
 */</span>

$act       = $_POST[<span class="hljs-string">'act'</span>];
$id        = $_POST[<span class="hljs-string">'id'</span>];
$user_id   = (int)$_POST[<span class="hljs-string">'user_id'</span>];
$form_data = $_POST[<span class="hljs-string">'form_data'</span>];
$param_arr = <span class="hljs-keyword">array</span>();


<span class="hljs-comment">// 获取到的数据格式为 “foo=bar&amp;baz=boom&amp;cow=milk&amp;php=hypertext+processor”</span>
<span class="hljs-comment">// http_build_query 的数据形式用parse_str解析为数组格式</span>
parse_str($form_data, $param_arr);

<span class="hljs-comment">// 备注中文处理</span>
$param_arr[<span class="hljs-string">'remark'</span>]  = iconv(<span class="hljs-string">"utf-8"</span>, <span class="hljs-string">"gbk"</span>, trim($param_arr[<span class="hljs-string">'remark'</span>]));


<span class="hljs-keyword">switch</span>($act)
{
    <span class="hljs-keyword">case</span> <span class="hljs-string">"add"</span>:

        <span class="hljs-comment">// 添加入库操作</span>
        <span class="hljs-comment">// ...</span>
        <span class="hljs-comment">// ...</span>
        <span class="hljs-keyword">break</span>;

    <span class="hljs-keyword">case</span> <span class="hljs-string">"edit"</span>:

        <span class="hljs-comment">// 编辑操作</span>
        $user_id = $param_arr[<span class="hljs-string">'user_id'</span>];
        
        <span class="hljs-comment">// ...</span>
        <span class="hljs-keyword">break</span>;

    <span class="hljs-keyword">case</span> <span class="hljs-string">"get"</span>:

        <span class="hljs-comment">// 返回详细的用户信息</span>
        <span class="hljs-comment">// get($user_id);</span>
        <span class="hljs-keyword">echo</span> $ret;
        <span class="hljs-keyword">exit</span>();
        <span class="hljs-keyword">break</span>;
    <span class="hljs-keyword">case</span> <span class="hljs-string">"del"</span>:
        <span class="hljs-comment">// 删除</span>
        <span class="hljs-comment">// delete();</span>
        <span class="hljs-keyword">break</span>;
}

<span class="hljs-keyword">echo</span> $ret &gt; <span class="hljs-number">0</span> ? <span class="hljs-number">1</span> : <span class="hljs-number">0</span>;


</span></code></pre>
<p>相关文章：<br><a href="http://www.cnblogs.com/wuhuacong/p/4775282.html" rel="nofollow noreferrer" target="_blank">bootstrap中的模态框（modal，弹出层）</a><br><a href="http://www.jb51.net/article/76013.htm" rel="nofollow noreferrer" target="_blank">链接描述</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Bootstrap使用模态框modal实现表单提交弹出框

## 原文链接
[https://segmentfault.com/a/1190000007651357](https://segmentfault.com/a/1190000007651357)

