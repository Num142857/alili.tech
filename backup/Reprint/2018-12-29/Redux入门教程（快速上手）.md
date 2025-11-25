---
title: 'Redux入门教程（快速上手）' 
date: 2018-12-29 2:30:10
hidden: true
slug: eqhjd3u7x44
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>典型的Web应用程序通常由共享数据的多个UI组件组成。通常，多个组件的任务是负责展示同一对象的不同属性。这个对象表示可随时更改的状态。在多个组件之间保持状态的一致性会是一场噩梦，特别是如果有多个通道用于更新同一个对象。</blockquote>
<p>举个?，一个带有购物车的网站。在顶部，我们用一个UI组件显示购物车中的商品数量。我们还可以用另一个UI组件，显示购物车中商<br>品的总价。如果用户点击<code>添加到购物车</code>按钮，则这两个组件应立即更新当前的数据。如果用户从购物车中删除商品、更改数目、使用优惠券或者更改送货地点，则相关的UI组件都应该更新出正确的信息。<br>可以看到，随着功能范围的扩大，一个简单的购物车将会很难保持数据同步。</p>
<p>在这篇文章中，我将介绍<a href="https://github.com/reactjs/redux" rel="nofollow noreferrer">Redux</a>框架，它可以帮助你以简单易用的方式构建复杂项目并进行维护。为了使学习更容易，我们将使用一个简化的<code>购物车项目</code>来学习Redux的工作远离。你需要至少熟悉<a href="https://www.sitepoint.com/getting-started-react-beginners-guide/" rel="nofollow noreferrer">React</a>库，因为你以后需要将其与Redux集成。</p>
<h3>学习前提</h3>
<p>在我们开始以前，确保你熟悉以下知识：</p>
<ul>
<li><a href="https://www.sitepoint.com/introduction-functional-javascript/" rel="nofollow noreferrer">函数式JavaScript</a></li>
<li><a href="https://www.sitepoint.com/oriented-programming-1/" rel="nofollow noreferrer">面向对象JavaScript</a></li>
<li><a href="https://www.sitepoint.com/shorthand-javascript-techniques/" rel="nofollow noreferrer">JavaScript ES6 语法</a></li>
</ul>
<p>同时，确保你的设备已经安装：</p>
<ul>
<li><a href="https://www.sitepoint.com/beginners-guide-node-package-manager/" rel="nofollow noreferrer">NodeJS</a></li>
<li><a href="https://www.sitepoint.com/yarn-vs-npm/" rel="nofollow noreferrer">Yarn(或者npm)</a></li>
</ul>
<h3>什么是Redux</h3>
<p>Redux是一个流行的JavaScript框架，为应用程序提供一个可预测的状态容器。Redux基于简化版本的Flux框架，Flux是Facebook开发的一个框架。在标准的MVC框架中，数据可以在UI组件和存储之间双向流动，而Redux严格限制了数据只能在一个方向上流动。 见下图：</p>
<p><span class="img-wrap"><img data-src="/img/bVWi0h?w=687&amp;h=330" src="https://static.alili.tech/img/bVWi0h?w=687&amp;h=330" alt="图片描述" title="图片描述"></span></p>
<p>在Redux中，所有的数据（比如state）被保存在一个被称为<code>store</code>的容器中 → 在一个应用程序中只能有一个。<code>store</code>本质上是一个状态树，保存了所有对象的状态。任何UI组件都可以直接从<code>store</code>访问特定对象的状态。要通过本地或远程组件更改状态，需要分发一个<code>action</code>。<strong>分发</strong>在这里意味着将可执行信息发送到<code>store</code>。当一个<code>store</code>接收到一个<code>action</code>，它将把这个<code>action</code>代理给相关的<code>reducer</code>。<code>reducer</code>是一个纯函数，它可以查看之前的状态，执行一个<code>action</code>并且返回一个新的状态。</p>
<h3>理解不变性(Immutability)</h3>
<p>在我们开始实践之前，需要先了解JavaScript中的<code>不变性</code>意味着什么。在编码中，我们编写的代码一直在改变变量的值。这是<code>可变性</code>。但是<code>可变性</code>常常会导致意外的错误。如果代码只处理原始数据类型（numbers, strings, booleans），那么你不用担心。但是，如果在处理Arrays和Objects时，则需要小心执行可变操作。<br>接下来演示<code>不变性</code>：</p>
<ul>
<li>打开终端并启动node(输入node)。</li>
<li>创建一个数组，并将其赋值给另一个变量。</li>
</ul>
<pre><code>&gt; let a = [1, 2, 3]
&gt; let b = a
&gt; b.push(8)
&gt; b
[1, 2, 3, 8]
&gt; a
[1, 2, 3, 8]</code></pre>
<p>可以看到，更新数组b也会同时改变数组a。这是因为对象和数组是引用数据类型 → 这意味着这样的数据类型实际上并不保存值，而是存储指向存储单元的指针。<br>将a赋值给b，其实我们只是创建了第二个指向同一存储单元的指针。要解决这个问题，我们需要将引用的值复制到一个新的存储单元。在Javascript中，有三种不同的实现方式：</p>
<ol>
<li>使用<a href="https://facebook.github.io/immutable-js/" rel="nofollow noreferrer">Immutable.js</a>创建不可变的数据结构。</li>
<li>使用JavaScript库(如<a href="http://underscorejs.org/" rel="nofollow noreferrer">Underscore</a>和<a href="https://lodash.com/" rel="nofollow noreferrer">Lodash</a>)来执行不可变的操作。</li>
<li>使用ES6方法执行不可变操作。</li>
</ol>
<p>本文将使用ES6方法，因为它已经在NodeJS环境中可用了，在终端中，执行以下操作：</p>
<pre><code>&gt; a = [1,2,3]
[ 1, 2, 3 ]
&gt; b = Object.assign([],a)
[ 1, 2, 3 ]
&gt; b.push(8)
&gt; b
[ 1, 2, 3, 8 ] // b output
&gt; a
[ 1, 2, 3 ] // a output</code></pre>
<p>在上面的代码中，修改数组b将不会影响数组a。我们使用<code>Object.assign()</code>创建了一个新的副本，由数组b指向。我们也可以使用<code>操作符(...)</code>执行不可变操作：</p>
<pre><code>&gt; a = [1,2,3]
[ 1, 2, 3 ]
&gt; b = [...a, 4, 5, 6]
[ 1, 2, 3, 4, 5, 6 ]
&gt; a
[ 1, 2, 3 ]</code></pre>
<p>我不会深入这个主题，但是这里还有一些额外的ES6功能，我们可以用它们执行不可变操作：</p>
<ul>
<li>
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator" rel="nofollow noreferrer">spread syntax</a> - 用于追加操作</li>
<li>
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map" rel="nofollow noreferrer">map function</a> - 用于更新操作</li>
<li>
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter" rel="nofollow noreferrer">filter function</a> - 用于删除操作</li>
</ul>
<h3>配置Redux</h3>
<p>配置Redux开发环境的最快方法是使用<code>create-react-app</code>工具。在开始之前，确保已经安装并更新了<code>nodejs</code>，<code>npm</code>和<code>yarn</code>。我们生成一个<code>redux-shopping-cart</code>项目并安装<code>Redux</code>：</p>
<pre><code>create-react-app redux-shopping-cart

cd redux-shopping-cart
yarn add redux # 或者npm install redux</code></pre>
<p><strong>首先</strong>，删除<code>src</code>文件夹中除<code>index.js</code>以外的所有文件。打开<code>index.js</code>，删除所有代码，键入以下内容：</p>
<pre><code>import { createStore } from "redux";

const reducer = function(state, action) {
  return state;
}

const store = createStore(reducer);</code></pre>
<p>让我解释一下上面的代码：</p>
<ol>
<li>首先，我们从<code>redux</code>包中引入<code>createStore()</code>方法。</li>
<li>
<p>我们创建了一个名为<strong>reducer</strong>的方法。第一个参数<code>state</code>是当前保存在<code>store</code>中的数据，第二个参数<code>action</code>是一个容器，用于：</p>
<ul>
<li>
<code>type</code> - 一个简单的字符串常量，例如ADD, UPDATE, DELETE等。</li>
<li>
<code>payload</code> - 用于更新状态的数据。</li>
</ul>
</li>
<li>我们创建一个Redux存储区，它只能使用reducer作为参数来构造。存储在Redux存储区中的数据可以被直接访问，但只能通过提供的reducer进行更新。</li>
</ol>
<p>注意到，我在第二点中所提到<code>state</code>。目前，<code>state</code>为undefined或null。要解决这个问题，需要分配一个默认的值给<code>state</code>，使其成为一个空数组：</p>
<pre><code>const reducer = function(state=[], action) {
  return state;
}</code></pre>
<p><strong>让我们更进一步</strong>。目前我们创建的reducer是通用的。它的名字没有描述它的用途。那么我们如何使用多个reducer呢？我们将用到Redux包中提供的<code>combineReducers</code>函数。修改代码如下：</p>
<pre><code class="javascript">// src/index.js

import { createStore } from "redux";
import { combineReducers } from 'redux';

const productsReducer = function(state=[], action) {
  return state;
}

const cartReducer = function(state=[], action) {
  return state;
}

const allReducers = {
  products: productsReducer,
  shoppingCart: cartReducer
}

const rootReducer = combineReducers(allReducers);

let store = createStore(rootReducer);</code></pre>
<p>在上面的代码中，我们将通用的reducer修改为<code>productReducer</code>和<code>cartReducer</code>。创建这两个空的reducer是为了展示如何在一个<code>store</code>中使用<code>combineReducers</code>函数组合多个reducer。</p>
<p><strong>接下来</strong>，我们将为reducer定义一些测试数据。修改代码如下：</p>
<pre><code>// src/index.js

…

const initialState = {
  cart: [
    {
      product: 'bread 700g',
      quantity: 2,
      unitCost: 90
    },
    {
      product: 'milk 500ml',
      quantity: 1,
      unitCost: 47
    }
  ]
}

const cartReducer = function(state=initialState, action) {
  return state;
}

…

let store = createStore(rootReducer);

console.log("initial state: ", store.getState());</code></pre>
<p>我们使用<code>store.getState()</code>在控制台中打印出当前的状态。你可以在终端中执行<code>npm start</code>或者<code>yarn start</code>来运行dev服务器。并在控制台中查看<code>state</code>。</p>
<p><span class="img-wrap"><img data-src="/img/bVWi5Q?w=597&amp;h=471" src="https://static.alili.tech/img/bVWi5Q?w=597&amp;h=471" alt="图片描述" title="图片描述"></span></p>
<p>现在，我们的<code>cartReducer</code>什么也没做，但它应该在Redux的存储区中管理购物车商品的状态。我们需要定义添加、更新和删除商品的操作(<code>action</code>)。我们首先定义<code>ADD_TO_CART</code>的逻辑：</p>
<pre><code class="javascript">// src/index.js

…

const ADD_TO_CART = 'ADD_TO_CART';

const cartReducer = function(state=initialState, action) {
  switch (action.type) {
    case ADD_TO_CART: {
      return {
        ...state,
        cart: [...state.cart, action.payload]
      }
    }

    default:
      return state;
  }
}

…</code></pre>
<p>我们继续来分析一下代码。一个reducer需要处理不同的<code>action</code>类型，因此我们需要一个<code>SWITCH</code>语句。当一个<code>ADD_TO_CART</code>类型的action在应用程序中分发时，switch中的代码将处理它。<br>正如你所看到的，我们将<code>action.payload</code>中的数据与现有的state合并以创建一个新的state。</p>
<p><strong>接下来</strong>，我们将定义一个<code>action</code>，作为<code>store.dispatch()</code>的一个参数。<code>action</code>是一个Javascript对象，有一个必须的type和可选的payload。我们在<code>cartReducer</code>函数后定义一个：</p>
<pre><code class="javascript">…
function addToCart(product, quantity, unitCost) {
  return {
    type: ADD_TO_CART,
    payload: { product, quantity, unitCost }
  }
}
…</code></pre>
<p>在这里，我们定义了一个函数，返回一个JavaScript对象。在我们分发消息之前，我们添加一些代码，让我们能够监听<code>store</code>事件的更改。</p>
<pre><code class="javascript">…
let unsubscribe = store.subscribe(() =&gt;
  console.log(store.getState())
);

unsubscribe();</code></pre>
<p>接下来，我们通过分发消息到<code>store</code>来向购物车中添加商品。将下面的代码添加在<code>unsubscribe()</code>之前：</p>
<pre><code class="javascript">…
store.dispatch(addToCart('Coffee 500gm', 1, 250));
store.dispatch(addToCart('Flour 1kg', 2, 110));
store.dispatch(addToCart('Juice 2L', 1, 250));</code></pre>
<p>下面是整个index.js文件：</p>
<pre><code>// src/index.js

import { createStore } from "redux";
import { combineReducers } from 'redux';

const productsReducer = function(state=[], action) {
  return state;
}

const initialState = {
  cart: [
    {
      product: 'bread 700g',
      quantity: 2,
      unitCost: 90
    },
    {
      product: 'milk 500ml',
      quantity: 1,
      unitCost: 47
    }
  ]
}

const ADD_TO_CART = 'ADD_TO_CART';

const cartReducer = function(state=initialState, action) {
  switch (action.type) {
    case ADD_TO_CART: {
      return {
        ...state,
        cart: [...state.cart, action.payload]
      }
    }

    default:
      return state;
  }
}

function addToCart(product, quantity, unitCost) {
  return {
    type: ADD_TO_CART,
    payload: {
      product,
      quantity,
      unitCost
    }
  }
}

const allReducers = {
  products: productsReducer,
  shoppingCart: cartReducer
}

const rootReducer = combineReducers(allReducers);

let store = createStore(rootReducer);

console.log("initial state: ", store.getState());

let unsubscribe = store.subscribe(() =&gt;
  console.log(store.getState())
);

store.dispatch(addToCart('Coffee 500gm', 1, 250));
store.dispatch(addToCart('Flour 1kg', 2, 110));
store.dispatch(addToCart('Juice 2L', 1, 250));

unsubscribe();</code></pre>
<p>保存代码后，Chrome会自动刷新。可以在控制台中确认新的商品已经添加了。</p>
<p><span class="img-wrap"><img data-src="/img/bVWja3?w=963&amp;h=857" src="https://static.alili.tech/img/bVWja3?w=963&amp;h=857" alt="图片描述" title="图片描述"></span></p>
<h3>组织Redux代码</h3>
<p><code>index.js</code>中的代码逐渐变得冗杂。我把所有的代码都写在<code>index.js</code>中是为了起步时的简单易懂。接下来，我们来看一下如何组织Redux项目。首先，在<code>src</code>文件夹中创建一下文件和文件夹：</p>
<p>src/<br>├── actions<br>│   └── cart-actions.js<br>├── index.js<br>├── reducers<br>│   ├── cart-reducer.js<br>│   ├── index.js<br>│   └── products-reducer.js<br>└── store.js</p>
<p>然后，我们把<code>index.js</code>中的代码进行整理：</p>
<pre><code>// src/actions/cart-actions.js

export const ADD_TO_CART = 'ADD_TO_CART';

export function addToCart(product, quantity, unitCost) {
  return {
    type: ADD_TO_CART,
    payload: { product, quantity, unitCost }
  }
}</code></pre>
<pre><code>// src/reducers/products-reducer.js

export default function(state=[], action) {
  return state;
}</code></pre>
<pre><code>// src/reducers/cart-reducer.js

import  { ADD_TO_CART }  from '../actions/cart-actions';

const initialState = {
  cart: [
    {
      product: 'bread 700g',
      quantity: 2,
      unitCost: 90
    },
    {
      product: 'milk 500ml',
      quantity: 1,
      unitCost: 47
    }
  ]
}

export default function(state=initialState, action) {
  switch (action.type) {
    case ADD_TO_CART: {
      return {
        ...state,
        cart: [...state.cart, action.payload]
      }
    }

    default:
      return state;
  }
}</code></pre>
<pre><code>// src/reducers/index.js

import { combineReducers } from 'redux';
import productsReducer from './products-reducer';
import cartReducer from './cart-reducer';

const allReducers = {
  products: productsReducer,
  shoppingCart: cartReducer
}

const rootReducer = combineReducers(allReducers);

export default rootReducer;</code></pre>
<pre><code>// src/store.js

import { createStore } from "redux";
import rootReducer from './reducers';

let store = createStore(rootReducer);

export default store;</code></pre>
<pre><code>// src/index.js

import store from './store.js';
import { addToCart }  from './actions/cart-actions';

console.log("initial state: ", store.getState());

let unsubscribe = store.subscribe(() =&gt;
  console.log(store.getState())
);

store.dispatch(addToCart('Coffee 500gm', 1, 250));
store.dispatch(addToCart('Flour 1kg', 2, 110));
store.dispatch(addToCart('Juice 2L', 1, 250));

unsubscribe();</code></pre>
<p>整理完代码之后，程序依然会正常运行。现在我们来添加修改和删除购物车中商品的逻辑。修改<code>cart-actions.js</code>和<code>cart-reducer.js</code>文件：</p>
<pre><code>// src/reducers/cart-actions.js
…
export const UPDATE_CART = 'UPDATE_CART';
export const DELETE_FROM_CART = 'DELETE_FROM_CART';
…
export function updateCart(product, quantity, unitCost) {
  return {
    type: UPDATE_CART,
    payload: {
      product,
      quantity,
      unitCost
    }
  }
}

export function deleteFromCart(product) {
  return {
    type: DELETE_FROM_CART,
    payload: {
      product
    }
  }
}</code></pre>
<pre><code>// src/reducers/cart-reducer.js
…
export default function(state=initialState, action) {
  switch (action.type) {
    case ADD_TO_CART: {
      return {
        ...state,
        cart: [...state.cart, action.payload]
      }
    }

    case UPDATE_CART: {
      return {
        ...state,
        cart: state.cart.map(item =&gt; item.product === action.payload.product ? action.payload : item)
      }
    }

    case DELETE_FROM_CART: {
      return {
        ...state,
        cart: state.cart.filter(item =&gt; item.product !== action.payload.product)
      }
    }

    default:
      return state;
  }
}</code></pre>
<p>最后，我们在<code>index.js</code>中分发这两个<code>action</code>：</p>
<pre><code>// src/index.js
…
// Update Cart
store.dispatch(updateCart('Flour 1kg', 5, 110));

// Delete from Cart
store.dispatch(deleteFromCart('Coffee 500gm'));
…</code></pre>
<p>保存完代码之后，可以在浏览器的控制台中检查修改和删除的结果。</p>
<h3>使用Redux工具调试</h3>
<p>如果我们的代码出错了，应该如何调试呢？</p>
<p>Redux拥有很多第三方的调试工具，可用于分析代码和修复bug。最受欢迎的是<strong>time-travelling tool</strong>，即<a href="https://www.npmjs.com/package/redux-devtools-extension" rel="nofollow noreferrer">redux-devtools-extension</a>。设置它只需要三个步骤。</p>
<ul>
<li>首先，在Chrome中安装<a href="https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en" rel="nofollow noreferrer">Redux Devtools</a>扩展。</li>
<li>然后，在运行Redux应用程序的终端里使用<code>Ctrl+C</code>停止服务器。并用npm或yarn安装<code>redux-devtools-extension</code>包。</li>
</ul>
<pre><code>yarn add redux-devtools-extension</code></pre>
<ul><li>一旦安装完成，我们对<code>store.js</code>稍作修改：</li></ul>
<pre><code>// src/store.js
import { createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';

const store = createStore(rootReducer, composeWithDevTools());

export default store;</code></pre>
<p>我们还可以把<code>src/index.js</code>中日志相关的代码删除掉。返回Chrome，右键单击该工具的图标，打开Redux DevTools面板：</p>
<p><span class="img-wrap"><img data-src="/img/bVWjbv?w=748&amp;h=441" src="https://static.alili.tech/img/bVWjbv?w=748&amp;h=441" alt="图片描述" title="图片描述"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVWjbA?w=1206&amp;h=448" src="https://static.alili.tech/img/bVWjbA?w=1206&amp;h=448" alt="图片描述" title="图片描述"></span></p>
<p>可以看到，Redux Devtools很强大。你可以在<code>action</code>, <code>state</code>和<code>diff(方法差异)</code>之间切换。选择左侧面板上的不同<code>action</code>，观察状态树的变化。你还可以通过进度条来播放<code>actions</code>序列。甚至可以通过工具直接分发操作信息。具体的请查看<a href="https://github.com/gaearon/redux-devtools" rel="nofollow noreferrer">文档</a>。</p>
<h3>集成React</h3>
<p>在本文开头，我提到Redux可以很方便的与React集成。只需要简单的几步。</p>
<ul><li>首先，停止服务器，并安装<code>react-redux</code>包：</li></ul>
<pre><code>yarn add react-redux</code></pre>
<ul><li>接下来，在<code>index.js</code>中加入React代码。我们还将使用<code>Provider</code>类将React应用程序包装在Redux容器中：</li></ul>
<pre><code>// src/index.js
…
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

const App = &lt;h1&gt;Redux Shopping Cart&lt;/h1&gt;;

ReactDOM.render(
  &lt;Provider store={store}&gt;
    { App }
  &lt;/Provider&gt; ,
  document.getElementById('root')
);
…</code></pre>
<p>目前，已经完成了集成的第一部分。可以启动服务器以查看效果。第二部分涉及到使用刚刚安装的<code>react-redux</code>包中的几个方法。通过这些方法将React组件与Redux的<code>store</code>和<code>action</code>相关联。此外，还可以使用<a href="https://expressjs.com/" rel="nofollow noreferrer">Express</a>和<a href="https://feathersjs.com/" rel="nofollow noreferrer">Feathers</a>这样的框架来设置API。API将为我们的应用程序提供对数据库服务的访问。</p>
<p>在Redux中，我们还可以安装其他一些包，比如<code>axios</code>等。我们React组件的<code>state</code>将由Redux处理，确保所有组件与数据库API的同步。想要更进一步的学习，请看<a href="https://www.sitepoint.com/crud-app-react-redux-feathersjs/" rel="nofollow noreferrer">Build a CRUD App Using React, Redux and FeathersJS</a>。</p>
<h3>总结</h3>
<p>我希望本文能对你有所帮助。当然，还有很多相关的内容需要学习。例如，处理异步操作、身份验证、日志记录等。如果觉得Redux适合你，可以看看以下几篇文章：</p>
<ul>
<li><a href="https://www.sitepoint.com/redux-without-react-state-management-vanilla-javascript/" rel="nofollow noreferrer">Redux State Management in Vanilla JavaScript</a></li>
<li><a href="https://www.sitepoint.com/redux-logging-production-logrocket/" rel="nofollow noreferrer">Redux Logging in Production with LogRocket</a></li>
<li><a href="https://www.sitepoint.com/crud-app-react-redux-feathersjs/" rel="nofollow noreferrer">Build a CRUD App Using React, Redux and FeathersJS</a></li>
<li><a href="https://www.sitepoint.com/asynchronous-apis-server-rendered-react/" rel="nofollow noreferrer">Dealing with Asynchronous APIs in Server-rendered React</a></li>
</ul>
<blockquote>这篇文章是看到比较简明的Redux教程。当然也是翻译过来哒，文中提到了很多延伸文章，我还在一个个学习当中，遇到不错的依然会翻译给大家的。<p>?喜欢的话记得收藏哦！</p>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Redux入门教程（快速上手）

## 原文链接
[https://segmentfault.com/a/1190000011474522](https://segmentfault.com/a/1190000011474522)

