---
title: 'Flask与Vue的token认证' 
date: 2018-12-31 2:30:29
hidden: true
slug: 3v95fgpnck2
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>后端使用flask设计基于token认证方式的restful接口，前端使用vue.js全家桶，利用axios通讯。</p></blockquote>
<p>感谢两篇文章的作者：</p>
<ul>
<li><a href="http://www.cnblogs.com/vovlie/p/4182814.html" rel="nofollow noreferrer" target="_blank">http://www.cnblogs.com/vovlie...</a></li>
<li><a href="https://segmentfault.com/a/1190000008383094?_ea=1639495">https://segmentfault.com/a/11...</a></li>
</ul>
<p>源码链接：<a href="https://github.com/xingyys/flaskvue" rel="nofollow noreferrer" target="_blank">https://github.com/xingyys/fl...</a></p>
<h1 id="articleHeader0">后端Flask</h1>
<p>Flask采用token认证方式，主要思路是通过<code>/api/login</code>登录获取<code>token</code>，然后使用<code>token</code>调用各个接口。<br>所用到框架的库：</p>
<ul>
<li>flask</li>
<li>flask-cors：flask跨域</li>
<li>flask-sqlachemy: flask数据库orm</li>
<li>flask-httpauth：flask的auth认证</li>
<li>passlib: python密码解析库</li>
<li>itsdangerous</li>
</ul>
<h2 id="articleHeader1">后端结构图</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="flask/
├── app    # 主目录
│&nbsp;&nbsp; ├── __init__.py
│&nbsp;&nbsp; ├── __init__.pyc
│&nbsp;&nbsp; ├── models.py    # 数据库
│&nbsp;&nbsp; ├── models.pyc
│&nbsp;&nbsp; ├── views.py    # 视图
│&nbsp;&nbsp; └── views.pyc
├── config.py    # 配置信息
├── config.pyc
├── db_create.py    # 创建数据库
├── db_migrate.py   # 更新数据库
├── db_repository
│&nbsp;&nbsp; ├── __init__.py
│&nbsp;&nbsp; ├── __init__.pyc
│&nbsp;&nbsp; ├── manage.py
│&nbsp;&nbsp; ├── migrate.cfg
│&nbsp;&nbsp; ├── README
│&nbsp;&nbsp; └── versions
│&nbsp;&nbsp;     ├── 008_migration.py
│&nbsp;&nbsp;     ├── 008_migration.pyc
│&nbsp;&nbsp;     ├── 009_migration.py
│&nbsp;&nbsp;     ├── 009_migration.pyc
│&nbsp;&nbsp;     ├── __init__.py
│&nbsp;&nbsp;     └── __init__.pyc
├── index.html
└── run.py    # app的运行文件
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="python hljs"><code class="python">flask/
├── app    <span class="hljs-comment"># 主目录</span>
│&nbsp;&nbsp; ├── __init__.py
│&nbsp;&nbsp; ├── __init__.pyc
│&nbsp;&nbsp; ├── models.py    <span class="hljs-comment"># 数据库</span>
│&nbsp;&nbsp; ├── models.pyc
│&nbsp;&nbsp; ├── views.py    <span class="hljs-comment"># 视图</span>
│&nbsp;&nbsp; └── views.pyc
├── config.py    <span class="hljs-comment"># 配置信息</span>
├── config.pyc
├── db_create.py    <span class="hljs-comment"># 创建数据库</span>
├── db_migrate.py   <span class="hljs-comment"># 更新数据库</span>
├── db_repository
│&nbsp;&nbsp; ├── __init__.py
│&nbsp;&nbsp; ├── __init__.pyc
│&nbsp;&nbsp; ├── manage.py
│&nbsp;&nbsp; ├── migrate.cfg
│&nbsp;&nbsp; ├── README
│&nbsp;&nbsp; └── versions
│&nbsp;&nbsp;     ├── <span class="hljs-number">008</span>_migration.py
│&nbsp;&nbsp;     ├── <span class="hljs-number">008</span>_migration.pyc
│&nbsp;&nbsp;     ├── <span class="hljs-number">009</span>_migration.py
│&nbsp;&nbsp;     ├── <span class="hljs-number">009</span>_migration.pyc
│&nbsp;&nbsp;     ├── __init__.py
│&nbsp;&nbsp;     └── __init__.pyc
├── index.html
└── run.py    <span class="hljs-comment"># app的运行文件</span>
</code></pre>
<h2 id="articleHeader2">具体实现</h2>
<h3 id="articleHeader3">系统初始化<code>app/__init__.py</code>
</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# -*- coding:utf-8 -*-

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_httpauth import HTTPBasicAuth
from flask_cors import CORS

app = Flask(__name__)
# flask的跨域解决
CORS(app)
app.config.from_object('config')
db = SQLAlchemy(app)
auth = HTTPBasicAuth()

from . import models, views" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="python hljs"><code class="python"><span class="hljs-comment"># -*- coding:utf-8 -*-</span>

<span class="hljs-keyword">from</span> flask <span class="hljs-keyword">import</span> Flask
<span class="hljs-keyword">from</span> flask_sqlalchemy <span class="hljs-keyword">import</span> SQLAlchemy
<span class="hljs-keyword">from</span> flask_httpauth <span class="hljs-keyword">import</span> HTTPBasicAuth
<span class="hljs-keyword">from</span> flask_cors <span class="hljs-keyword">import</span> CORS

app = Flask(__name__)
<span class="hljs-comment"># flask的跨域解决</span>
CORS(app)
app.config.from_object(<span class="hljs-string">'config'</span>)
db = SQLAlchemy(app)
auth = HTTPBasicAuth()

<span class="hljs-keyword">from</span> . <span class="hljs-keyword">import</span> models, views</code></pre>
<h3 id="articleHeader4">配置文件<code>config.py</code>
</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import os
basedir = os.path.abspath(os.path.dirname(__file__))

SQLALCHEMY_DATABASE_URI = &quot;mysql://root:123456@127.0.0.1/rest&quot;
SQLALCHEMY_MIGRATE_REPO = os.path.join(basedir, 'db_repository')
SQLALCHEMY_TRACK_MODIFICATIONS = True
BASEDIR = basedir
# 安全配置
CSRF_ENABLED = True
SECRET_KEY = 'jklklsadhfjkhwbii9/sdf\sdf'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nix"><code><span class="hljs-built_in">import</span> os
<span class="hljs-attr">basedir</span> = os.path.abspath(os.path.dirname(__file__))

<span class="hljs-attr">SQLALCHEMY_DATABASE_URI</span> = <span class="hljs-string">"mysql://root:123456@127.0.0.1/rest"</span>
<span class="hljs-attr">SQLALCHEMY_MIGRATE_REPO</span> = os.path.join(basedir, 'db_repository')
<span class="hljs-attr">SQLALCHEMY_TRACK_MODIFICATIONS</span> = True
<span class="hljs-attr">BASEDIR</span> = basedir
<span class="hljs-comment"># 安全配置</span>
<span class="hljs-attr">CSRF_ENABLED</span> = True
<span class="hljs-attr">SECRET_KEY</span> = 'jklklsadhfjkhwbii9/sdf\sdf'</code></pre>
<p>环境中使用<code>mysql</code>数据库，版本为<code>mariadb 10.1.22</code>。创建<code>rest</code>表</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ mysql -uroot -p xxxxxx
$ create database rest default charset utf8;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code>$ mysql -uroot -p xxxxxx
$ <span class="hljs-keyword">create</span> <span class="hljs-keyword">database</span> rest <span class="hljs-keyword">default</span> <span class="hljs-keyword">charset</span> utf8;</code></pre>
<h3 id="articleHeader5">创建数据库表<code>app/models.py</code>
</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# -*- coding:utf-8 -*-

from app import db, app
from passlib.apps import custom_app_context
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer, SignatureExpired, BadSignature

class User(db.Model):
    __tablename__ =  'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(32), index=True)
    password = db.Column(db.String(128))

    # 密码加密
    def hash_password(self, password):
        self.password = custom_app_context.encrypt(password)
    
    # 密码解析
    def verify_password(self, password):
        return custom_app_context.verify(password, self.password)

    # 获取token，有效时间10min
    def generate_auth_token(self, expiration = 600):
        s = Serializer(app.config['SECRET_KEY'], expires_in = expiration)
        return s.dumps({ 'id': self.id })

    # 解析token，确认登录的用户身份
    @staticmethod
    def verify_auth_token(token):
        s = Serializer(app.config['SECRET_KEY'])
        try:
            data = s.loads(token)
        except SignatureExpired:
            return None # valid token, but expired
        except BadSignature:
            return None # invalid token
        user = User.query.get(data['id'])
        return user" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="python hljs"><code class="python"><span class="hljs-comment"># -*- coding:utf-8 -*-</span>

<span class="hljs-keyword">from</span> app <span class="hljs-keyword">import</span> db, app
<span class="hljs-keyword">from</span> passlib.apps <span class="hljs-keyword">import</span> custom_app_context
<span class="hljs-keyword">from</span> itsdangerous <span class="hljs-keyword">import</span> TimedJSONWebSignatureSerializer <span class="hljs-keyword">as</span> Serializer, SignatureExpired, BadSignature

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">User</span><span class="hljs-params">(db.Model)</span>:</span>
    __tablename__ =  <span class="hljs-string">'users'</span>
    id = db.Column(db.Integer, primary_key=<span class="hljs-keyword">True</span>)
    username = db.Column(db.String(<span class="hljs-number">32</span>), index=<span class="hljs-keyword">True</span>)
    password = db.Column(db.String(<span class="hljs-number">128</span>))

    <span class="hljs-comment"># 密码加密</span>
    <span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">hash_password</span><span class="hljs-params">(self, password)</span>:</span>
        self.password = custom_app_context.encrypt(password)
    
    <span class="hljs-comment"># 密码解析</span>
    <span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">verify_password</span><span class="hljs-params">(self, password)</span>:</span>
        <span class="hljs-keyword">return</span> custom_app_context.verify(password, self.password)

    <span class="hljs-comment"># 获取token，有效时间10min</span>
    <span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">generate_auth_token</span><span class="hljs-params">(self, expiration = <span class="hljs-number">600</span>)</span>:</span>
        s = Serializer(app.config[<span class="hljs-string">'SECRET_KEY'</span>], expires_in = expiration)
        <span class="hljs-keyword">return</span> s.dumps({ <span class="hljs-string">'id'</span>: self.id })

    <span class="hljs-comment"># 解析token，确认登录的用户身份</span>
<span class="hljs-meta">    @staticmethod</span>
    <span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">verify_auth_token</span><span class="hljs-params">(token)</span>:</span>
        s = Serializer(app.config[<span class="hljs-string">'SECRET_KEY'</span>])
        <span class="hljs-keyword">try</span>:
            data = s.loads(token)
        <span class="hljs-keyword">except</span> SignatureExpired:
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">None</span> <span class="hljs-comment"># valid token, but expired</span>
        <span class="hljs-keyword">except</span> BadSignature:
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">None</span> <span class="hljs-comment"># invalid token</span>
        user = User.query.get(data[<span class="hljs-string">'id'</span>])
        <span class="hljs-keyword">return</span> user</code></pre>
<p>创建数据库<code>users</code>表：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ python db_create.py
$ python db_migrate.py" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>$ <span class="hljs-keyword">python</span> db_create.<span class="hljs-keyword">py</span>
$ <span class="hljs-keyword">python</span> db_migrate.<span class="hljs-keyword">py</span></code></pre>
<h3 id="articleHeader6">视图<code>app/views.py</code>
</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="from app import app, db, auth
from flask import render_template, json, jsonify, request, abort, g
from app.models import *

@app.route(&quot;/&quot;)
@auth.login_required
def index():    
    return jsonify('Hello, %s' % g.user.username)


@app.route('/api/users', methods = ['POST'])
def new_user():
    username = request.json.get('username')
    password = request.json.get('password')
    if username is None or password is None:
        abort(400) # missing arguments
    if User.query.filter_by(username = username).first() is not None:
        abort(400) # existing user
    user = User(username = username)
    user.hash_password(password)
    db.session.add(user)
    db.session.commit()
    return jsonify({ 'username': user.username })

@auth.verify_password
def verify_password(username_or_token, password):
    if request.path == &quot;/api/login&quot;:
        user = User.query.filter_by(username=username_or_token).first()
        if not user or not user.verify_password(password):
            return False
    else:
        user = User.verify_auth_token(username_or_token)
        if not user:
            return False    
    g.user = user   
    return True


@app.route('/api/login')
@auth.login_required
def get_auth_token():
    token = g.user.generate_auth_token()
    return jsonify(token)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="python hljs"><code class="python"><span class="hljs-keyword">from</span> app <span class="hljs-keyword">import</span> app, db, auth
<span class="hljs-keyword">from</span> flask <span class="hljs-keyword">import</span> render_template, json, jsonify, request, abort, g
<span class="hljs-keyword">from</span> app.models <span class="hljs-keyword">import</span> *

<span class="hljs-meta">@app.route("/")</span>
<span class="hljs-meta">@auth.login_required</span>
<span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">index</span><span class="hljs-params">()</span>:</span>    
    <span class="hljs-keyword">return</span> jsonify(<span class="hljs-string">'Hello, %s'</span> % g.user.username)


<span class="hljs-meta">@app.route('/api/users', methods = ['POST'])</span>
<span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">new_user</span><span class="hljs-params">()</span>:</span>
    username = request.json.get(<span class="hljs-string">'username'</span>)
    password = request.json.get(<span class="hljs-string">'password'</span>)
    <span class="hljs-keyword">if</span> username <span class="hljs-keyword">is</span> <span class="hljs-keyword">None</span> <span class="hljs-keyword">or</span> password <span class="hljs-keyword">is</span> <span class="hljs-keyword">None</span>:
        abort(<span class="hljs-number">400</span>) <span class="hljs-comment"># missing arguments</span>
    <span class="hljs-keyword">if</span> User.query.filter_by(username = username).first() <span class="hljs-keyword">is</span> <span class="hljs-keyword">not</span> <span class="hljs-keyword">None</span>:
        abort(<span class="hljs-number">400</span>) <span class="hljs-comment"># existing user</span>
    user = User(username = username)
    user.hash_password(password)
    db.session.add(user)
    db.session.commit()
    <span class="hljs-keyword">return</span> jsonify({ <span class="hljs-string">'username'</span>: user.username })

<span class="hljs-meta">@auth.verify_password</span>
<span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">verify_password</span><span class="hljs-params">(username_or_token, password)</span>:</span>
    <span class="hljs-keyword">if</span> request.path == <span class="hljs-string">"/api/login"</span>:
        user = User.query.filter_by(username=username_or_token).first()
        <span class="hljs-keyword">if</span> <span class="hljs-keyword">not</span> user <span class="hljs-keyword">or</span> <span class="hljs-keyword">not</span> user.verify_password(password):
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">False</span>
    <span class="hljs-keyword">else</span>:
        user = User.verify_auth_token(username_or_token)
        <span class="hljs-keyword">if</span> <span class="hljs-keyword">not</span> user:
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">False</span>    
    g.user = user   
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">True</span>


<span class="hljs-meta">@app.route('/api/login')</span>
<span class="hljs-meta">@auth.login_required</span>
<span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">get_auth_token</span><span class="hljs-params">()</span>:</span>
    token = g.user.generate_auth_token()
    <span class="hljs-keyword">return</span> jsonify(token)</code></pre>
<p>用户注册后密码加密存储，确认用户身份时密码解密。需要认证的<code>api</code>上添加<code>@auth.login_required</code>，它会在调用接口之前调用<code>@auth.verify_password</code>下的方法(此方法唯一)如<code>verify_password</code>。根据请求的路径选择不同的认证方式。</p>
<h3 id="articleHeader7">测试</h3>
<blockquote><p>使用curl命令测试接口</p></blockquote>
<p>注册用户:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ curl -i -X POST -H &quot;Content-Type: application/json&quot; -d '{&quot;username&quot;:&quot;admin&quot;,&quot;password&quot;:&quot;123456&quot;}' http://127.0.0.1:5000/api/register
HTTP/1.0 200 OK
Content-Type: application/json
Access-Control-Allow-Origin: *
Content-Length: 26
Server: Werkzeug/0.12.2 Python/2.7.13
Date: Wed, 20 Sep 2017 06:33:46 GMT

{
  &quot;username&quot;: &quot;admin&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>$ curl -i -X POST -H <span class="hljs-string">"Content-Type: application/json"</span> -d <span class="hljs-string">'{"username":"admin","password":"123456"}'</span> <span class="hljs-string">http:</span><span class="hljs-comment">//127.0.0.1:5000/api/register</span>
HTTP/<span class="hljs-number">1.0</span> <span class="hljs-number">200</span> OK
Content-<span class="hljs-string">Type:</span> application/json
Access-Control-Allow-<span class="hljs-string">Origin:</span> *
Content-<span class="hljs-string">Length:</span> <span class="hljs-number">26</span>
<span class="hljs-string">Server:</span> Werkzeug<span class="hljs-regexp">/0.12.2 Python/</span><span class="hljs-number">2.7</span><span class="hljs-number">.13</span>
<span class="hljs-string">Date:</span> Wed, <span class="hljs-number">20</span> Sep <span class="hljs-number">2017</span> <span class="hljs-number">06</span>:<span class="hljs-number">33</span>:<span class="hljs-number">46</span> GMT

{
  <span class="hljs-string">"username"</span>: <span class="hljs-string">"admin"</span>
}</code></pre>
<p>查看数据库：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="MariaDB [rest]> select * from users\G;
*************************** 1. row ***************************
      id: 1
username: admin
password: $6$rounds=656000$etV4F3xLL0dwflX8$mLFX9l5dumBnQFtajGmey346viGuQ4bxR7YhQdKtB/nQH9ij2e3HHMEBPj.ef/o//4o9P2Wd3Y7dxQfjwR2hY/
1 row in set (0.00 sec)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs markdown"><code>MariaDB [rest]&gt; select * from users\G;
<span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">** 1. row **</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span>
<span class="hljs-code">      id: 1</span>
username: admin
password: $6$rounds=656000$etV4F3xLL0dwflX8$mLFX9l5dumBnQFtajGmey346viGuQ4bxR7YhQdKtB/nQH9ij2e3HHMEBPj.ef/o//4o9P2Wd3Y7dxQfjwR2hY/
1 row in set (0.00 sec)</code></pre>
<p>获取token：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" curl -i -u admin:123456  -X GET -H &quot;Content-Type: application/json&quot;  http://127.0.0.1:5000/api/login
HTTP/1.0 200 OK
Content-Type: application/json
Access-Control-Allow-Origin: *
Content-Length: 125
Server: Werkzeug/0.12.2 Python/2.7.13
Date: Wed, 20 Sep 2017 06:37:01 GMT

&quot;eyJhbGciOiJIUzI1NiIsImV4cCI6MTUwNTg5MDAyMSwiaWF0IjoxNTA1ODg5NDIxfQ.eyJpZCI6MX0.nUIKq-ZhFOiLPwZyUmfgWPfHYNy8o6eoR6lmzdsY0oQ&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code> curl -i -u <span class="hljs-string">admin:</span><span class="hljs-number">123456</span>  -X GET -H <span class="hljs-string">"Content-Type: application/json"</span>  <span class="hljs-string">http:</span><span class="hljs-comment">//127.0.0.1:5000/api/login</span>
HTTP/<span class="hljs-number">1.0</span> <span class="hljs-number">200</span> OK
Content-<span class="hljs-string">Type:</span> application/json
Access-Control-Allow-<span class="hljs-string">Origin:</span> *
Content-<span class="hljs-string">Length:</span> <span class="hljs-number">125</span>
<span class="hljs-string">Server:</span> Werkzeug<span class="hljs-regexp">/0.12.2 Python/</span><span class="hljs-number">2.7</span><span class="hljs-number">.13</span>
<span class="hljs-string">Date:</span> Wed, <span class="hljs-number">20</span> Sep <span class="hljs-number">2017</span> <span class="hljs-number">06</span>:<span class="hljs-number">37</span>:<span class="hljs-number">01</span> GMT

<span class="hljs-string">"eyJhbGciOiJIUzI1NiIsImV4cCI6MTUwNTg5MDAyMSwiaWF0IjoxNTA1ODg5NDIxfQ.eyJpZCI6MX0.nUIKq-ZhFOiLPwZyUmfgWPfHYNy8o6eoR6lmzdsY0oQ"</span></code></pre>
<p>使用token调用api：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ curl -i -u eyJhbGciOiJIUzI1NiIsImV4cCI6MTUwNTg5MDAyMSwiaWF0IjoxNTA1ODg5NDIxfQ.eyJpZCI6MX0.nUIKq-ZhFOiLPwZyUmfgWPfHYNy8o6eoR6lmzdsY0oQ:unused   -X GET -H &quot;Content-Type: application/json&quot;  http://127.0.0.1:5000/
HTTP/1.0 200 OK
Content-Type: application/json
Access-Control-Allow-Origin: *
Content-Length: 15
Server: Werkzeug/0.12.2 Python/2.7.13
Date: Wed, 20 Sep 2017 06:38:22 GMT

&quot;Hello, admin&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>$ curl -i -u eyJhbGciOiJIUzI1NiIsImV4cCI6MTUwNTg5MDAyMSwiaWF0IjoxNTA1ODg5NDIxfQ.eyJpZCI6MX0.nUIKq-<span class="hljs-string">ZhFOiLPwZyUmfgWPfHYNy8o6eoR6lmzdsY0oQ:</span>unused   -X GET -H <span class="hljs-string">"Content-Type: application/json"</span>  <span class="hljs-string">http:</span><span class="hljs-comment">//127.0.0.1:5000/</span>
HTTP/<span class="hljs-number">1.0</span> <span class="hljs-number">200</span> OK
Content-<span class="hljs-string">Type:</span> application/json
Access-Control-Allow-<span class="hljs-string">Origin:</span> *
Content-<span class="hljs-string">Length:</span> <span class="hljs-number">15</span>
<span class="hljs-string">Server:</span> Werkzeug<span class="hljs-regexp">/0.12.2 Python/</span><span class="hljs-number">2.7</span><span class="hljs-number">.13</span>
<span class="hljs-string">Date:</span> Wed, <span class="hljs-number">20</span> Sep <span class="hljs-number">2017</span> <span class="hljs-number">06</span>:<span class="hljs-number">38</span>:<span class="hljs-number">22</span> GMT

<span class="hljs-string">"Hello, admin"</span></code></pre>
<p>基于<code>token</code>的<code>Flask api</code>成功！！！！</p>
<h1 id="articleHeader8">前端Vue.js</h1>
<p>前端使用<code>vue</code>的全家桶，axios前后端通讯，axios拦截器，localStorage保存token<br>所使用的框架和库：</p>
<ul>
<li>vue2.0</li>
<li>iview2.X</li>
<li>axios</li>
<li>vuex</li>
<li>vue-router</li>
</ul>
<h2 id="articleHeader9">具体实现</h2>
<h3 id="articleHeader10"><code>main.js</code></h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
// 初始化axios
axios.defaults.baseURL = 'http://127.0.0.1:5000'
axios.defaults.auth = {
    username: '',
    password: '',
}

// axios.interceptors.request.use((config) => {
//     console.log(config)
//     return config;
// }, (error) => {
//     return Promise.reject(error)
// })

// axios拦截器，401状态时跳转登录页并清除token
axios.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (error.response) {
        switch (error.response.status) {
            case 401:
                store.commit('del_token')
                router.push('/login')
        }
    }
    return Promise.reject(error.response.data)
})

// 路由跳转
router.beforeEach((to, from, next) => {
    if (to.meta.required) {
        // 检查localStorage
        if (localStorage.token) {
            store.commit('set_token', localStorage.token)
            // 添加axios头部Authorized
            axios.defaults.auth = {
                username: store.state.token,
                password: store.state.token,
            }
            // iview的页面加载条
            iView.LoadingBar.start();
            next()
        } else {
            next({
                path: '/login',
            })
        }
    } else {
        iView.LoadingBar.start();
        next()
    }
})

router.afterEach((to, from, next) => {
    iView.LoadingBar.finish();
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">
<span class="hljs-comment">// 初始化axios</span>
axios.defaults.baseURL = <span class="hljs-string">'http://127.0.0.1:5000'</span>
axios.defaults.auth = {
    <span class="hljs-attr">username</span>: <span class="hljs-string">''</span>,
    <span class="hljs-attr">password</span>: <span class="hljs-string">''</span>,
}

<span class="hljs-comment">// axios.interceptors.request.use((config) =&gt; {</span>
<span class="hljs-comment">//     console.log(config)</span>
<span class="hljs-comment">//     return config;</span>
<span class="hljs-comment">// }, (error) =&gt; {</span>
<span class="hljs-comment">//     return Promise.reject(error)</span>
<span class="hljs-comment">// })</span>

<span class="hljs-comment">// axios拦截器，401状态时跳转登录页并清除token</span>
axios.interceptors.response.use(<span class="hljs-function">(<span class="hljs-params">response</span>) =&gt;</span> {
    <span class="hljs-keyword">return</span> response;
}, (error) =&gt; {
    <span class="hljs-keyword">if</span> (error.response) {
        <span class="hljs-keyword">switch</span> (error.response.status) {
            <span class="hljs-keyword">case</span> <span class="hljs-number">401</span>:
                store.commit(<span class="hljs-string">'del_token'</span>)
                router.push(<span class="hljs-string">'/login'</span>)
        }
    }
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.reject(error.response.data)
})

<span class="hljs-comment">// 路由跳转</span>
router.beforeEach(<span class="hljs-function">(<span class="hljs-params">to, <span class="hljs-keyword">from</span>, next</span>) =&gt;</span> {
    <span class="hljs-keyword">if</span> (to.meta.required) {
        <span class="hljs-comment">// 检查localStorage</span>
        <span class="hljs-keyword">if</span> (localStorage.token) {
            store.commit(<span class="hljs-string">'set_token'</span>, localStorage.token)
            <span class="hljs-comment">// 添加axios头部Authorized</span>
            axios.defaults.auth = {
                <span class="hljs-attr">username</span>: store.state.token,
                <span class="hljs-attr">password</span>: store.state.token,
            }
            <span class="hljs-comment">// iview的页面加载条</span>
            iView.LoadingBar.start();
            next()
        } <span class="hljs-keyword">else</span> {
            next({
                <span class="hljs-attr">path</span>: <span class="hljs-string">'/login'</span>,
            })
        }
    } <span class="hljs-keyword">else</span> {
        iView.LoadingBar.start();
        next()
    }
})

router.afterEach(<span class="hljs-function">(<span class="hljs-params">to, <span class="hljs-keyword">from</span>, next</span>) =&gt;</span> {
    iView.LoadingBar.finish();
})</code></pre>
<h3 id="articleHeader11">路由</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default new Router({
    routes: [{
        path: '/',
        name: 'index',
        component: Index,
        meta: {
            required: true,
        }
    }, {
        path: '/login',
        name: 'login',
        component: Login,
    }]
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">export</span> <span class="hljs-selector-tag">default</span> <span class="hljs-selector-tag">new</span> <span class="hljs-selector-tag">Router</span>({
    <span class="hljs-attribute">routes</span>: [{
        <span class="hljs-attribute">path</span>: <span class="hljs-string">'/'</span>,
        <span class="hljs-attribute">name</span>: <span class="hljs-string">'index'</span>,
        <span class="hljs-attribute">component</span>: Index,
        <span class="hljs-attribute">meta</span>: {
            <span class="hljs-attribute">required</span>: true,
        }
    }, {
        <span class="hljs-attribute">path</span>: <span class="hljs-string">'/login'</span>,
        <span class="hljs-attribute">name</span>: <span class="hljs-string">'login'</span>,
        <span class="hljs-attribute">component</span>: Login,
    }]
})</code></pre>
<p>路由添加<code>meta</code>字段，作为需要认证路由的标志</p>
<h3 id="articleHeader12">vuex</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default new Vuex.Store({
    state: {
        token: ''
    },
    mutations: {
        set_token(state, token) {
            state.token = token
            localStorage.token = token
        },
        del_token(state) {
            state.token = ''
            localStorage.removeItem('token')
        }
    }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>export <span class="hljs-keyword">default</span> new Vuex.Store({
    <span class="hljs-keyword">state</span>: {
        token: ''
    },
    mutations: {
        set_token(<span class="hljs-keyword">state</span>, token) {
            <span class="hljs-keyword">state</span>.token = token
            localStorage.token = token
        },
        del_token(<span class="hljs-keyword">state</span>) {
            <span class="hljs-keyword">state</span>.token = ''
            localStorage.removeItem('token')
        }
    }
})</code></pre>
<p><code>vuex</code>中保存<code>token</code>，同时修改删除<code>token</code>和<code>localStorage.token</code></p>
<h3 id="articleHeader13">登录和登出</h3>
<p>登录：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="handleSubmit(name, form) {
    this.$refs[name].validate((valid) => {
        if (valid) {
            // 用户名密码简单验证后添加到axios的auth中
            this.$axios.defaults.auth = {
                username: form.username,
                password: form.password,
            }
            this.$axios.get('/api/login').then(response => {
                this.$Message.success(&quot;提交成功&quot;)
                let data = response.data
                // 保存token
                this.$store.commit('set_token', data)
                this.$router.push('/')
            }).catch(error => {
                this.$Message.error(error.status)
            })
        } else {
            this.$Message.error('表单验证失败!');
        }
    })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">handleSubmit(name, form) {
    <span class="hljs-keyword">this</span>.$refs[name].validate(<span class="hljs-function">(<span class="hljs-params">valid</span>) =&gt;</span> {
        <span class="hljs-keyword">if</span> (valid) {
            <span class="hljs-comment">// 用户名密码简单验证后添加到axios的auth中</span>
            <span class="hljs-keyword">this</span>.$axios.defaults.auth = {
                <span class="hljs-attr">username</span>: form.username,
                <span class="hljs-attr">password</span>: form.password,
            }
            <span class="hljs-keyword">this</span>.$axios.get(<span class="hljs-string">'/api/login'</span>).then(<span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> {
                <span class="hljs-keyword">this</span>.$Message.success(<span class="hljs-string">"提交成功"</span>)
                <span class="hljs-keyword">let</span> data = response.data
                <span class="hljs-comment">// 保存token</span>
                <span class="hljs-keyword">this</span>.$store.commit(<span class="hljs-string">'set_token'</span>, data)
                <span class="hljs-keyword">this</span>.$router.push(<span class="hljs-string">'/'</span>)
            }).catch(<span class="hljs-function"><span class="hljs-params">error</span> =&gt;</span> {
                <span class="hljs-keyword">this</span>.$Message.error(error.status)
            })
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-keyword">this</span>.$Message.error(<span class="hljs-string">'表单验证失败!'</span>);
        }
    })
}</code></pre>
<p>登出：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="logout() {
    this.$store.commit('del_token')
    this.$router.push('/login')
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-function"><span class="hljs-title">logout</span><span class="hljs-params">()</span></span> {
    this.<span class="hljs-variable">$store</span>.commit(<span class="hljs-string">'del_token'</span>)
    this.<span class="hljs-variable">$router</span>.push(<span class="hljs-string">'/login'</span>)
}</code></pre>
<p>删除<code>token</code>并跳转到登录页</p>
<blockquote><p><code>flask</code>和<code>vue</code>的<code>token</code>认证就完成了！！！！</p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Flask与Vue的token认证

## 原文链接
[https://segmentfault.com/a/1190000011277435](https://segmentfault.com/a/1190000011277435)

