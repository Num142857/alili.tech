---
title: 基于 React Redux 的错误处理
hidden: true
categories: reprint
slug: b641331c
date: 2018-11-11 02:30:06
---

{{< raw >}}
<p>&#x672C;&#x6587;&#x4E3B;&#x8981;&#x5206;&#x4E3A;&#x4EE5;&#x4E0B;&#x4E09;&#x4E2A;&#x90E8;&#x5206;:</p><ul><li>Error &#x7684;&#x5206;&#x7C7B;</li><li>&#x5206;&#x6B65;&#x9AA4;&#x8BE6;&#x7EC6;&#x8BB2;&#x89E3;&#x5982;&#x4F55;&#x5229;&#x7528; Redux &#x7EDF;&#x4E00;&#x5904;&#x7406; Error</li><li>&#x9519;&#x8BEF;&#x4FE1;&#x606F;&#x7684;&#x6536;&#x96C6;</li></ul><p>&#x672C;&#x6587;&#x7684;&#x6848;&#x4F8B;&#x4F7F;&#x7528;&#x7684;&#x6280;&#x672F;&#x6808;&#x5305;&#x62EC;: <code>React</code>&#xFF0C;<code>Redux</code>&#xFF0C;<code>TypeScript</code>&#xFF0C;<code>Axios</code>&#xFF0C;<code>Lodash</code>&#x3002;</p><h2 id="articleHeader0">Error &#x7684;&#x5206;&#x7C7B;</h2><h3 id="articleHeader1">HTTP &#x8BF7;&#x6C42;&#x9519;&#x8BEF;</h3><p>HTTP &#x8BF7;&#x6C42;&#x9519;&#x8BEF;&#x901A;&#x5E38;&#x53EF;&#x4EE5;&#x5F52;&#x4E3A;&#x4EE5;&#x4E0B;&#x51E0;&#x7C7B;:</p><h4>&#x670D;&#x52A1;&#x5668;&#x6709;&#x54CD;&#x5E94;&#x7684;&#x9519;&#x8BEF;</h4><p><code>&#x670D;&#x52A1;&#x5668;&#x6709;&#x54CD;&#x5E94;&#xFF0C;&#x8868;&#x793A;&#x670D;&#x52A1;&#x5668;&#x54CD;&#x5E94;&#x4E86;&#xFF0C;&#x5E76;&#x4E14;&#x8FD4;&#x56DE;&#x4E86;&#x76F8;&#x5E94;&#x7684;&#x9519;&#x8BEF;&#x4FE1;&#x606F;</code>&#x3002;</p><p>&#x5982;&#x679C;&#x4F60;&#x4E0D;&#x671F;&#x671B;&#x6BCF;&#x4E00;&#x4E2A;&#x8BF7;&#x6C42;&#x90FD;&#x663E;&#x793A;&#x670D;&#x52A1;&#x5668;&#x8FD4;&#x56DE;&#x7684;&#x7279;&#x5B9A;&#x9519;&#x8BEF;&#x4FE1;&#x606F;&#xFF0C;&#x8FD8;&#x53EF;&#x4EE5;&#x6839;&#x636E; HTTP Status Code &#x5BF9;&#x9519;&#x8BEF;&#x4FE1;&#x606F;&#x8FDB;&#x4E00;&#x6B65;&#x5F52;&#x7C7B;:</p><ul><li><p><code>4xx&#x5BA2;&#x6237;&#x7AEF;&#x9519;&#x8BEF;: &#x8868;&#x793A;&#x5BA2;&#x6237;&#x7AEF;&#x53D1;&#x751F;&#x4E86;&#x9519;&#x8BEF;&#xFF0C;&#x59A8;&#x788D;&#x4E86;&#x670D;&#x52A1;&#x5668;&#x7684;&#x5904;&#x7406;</code>&#x3002;&#x6BD4;&#x5982;:</p><ul><li>400 Bad Request</li><li>401 Unauthorized</li><li>403 Forbidden</li><li>404 Not Found</li><li>408 Request Timeout</li><li>409 Conflict</li></ul></li><li><p><code>5xx&#x670D;&#x52A1;&#x5668;&#x9519;&#x8BEF;: &#x8868;&#x793A;&#x670D;&#x52A1;&#x5668;&#x65E0;&#x6CD5;&#x5B8C;&#x6210;&#x5408;&#x6CD5;&#x7684;&#x8BF7;&#x6C42;</code>&#x3002;&#x53EF;&#x80FD;&#x662F;&#x670D;&#x52A1;&#x5668;&#x5728;&#x5904;&#x7406;&#x8BF7;&#x6C42;&#x7684;&#x8FC7;&#x7A0B;&#x4E2D;&#x6709;&#x9519;&#x8BEF;&#x6216;&#x8005;&#x5F02;&#x5E38;&#x72B6;&#x6001;&#x53D1;&#x751F;&#x3002;&#x6BD4;&#x5982;:</p><ul><li>500 Internal Server Error</li><li>501 Not Implemented</li><li>503 Service Unavailable</li></ul></li></ul><h4>&#x670D;&#x52A1;&#x5668;&#x65E0;&#x54CD;&#x5E94;&#x7684;&#x9519;&#x8BEF;</h4><p><code>&#x670D;&#x52A1;&#x5668;&#x65E0;&#x54CD;&#x5E94;&#xFF0C;&#x8868;&#x793A;&#x8BF7;&#x6C42;&#x53D1;&#x8D77;&#x4E86;&#xFF0C;&#x4F46;&#x662F;&#x670D;&#x52A1;&#x5668;&#x6CA1;&#x6709;&#x54CD;&#x5E94;</code>&#x3002;</p><p>&#x8FD9;&#x79CD;&#x60C5;&#x51B5;&#x53EF;&#x80FD;&#x662F;&#x56E0;&#x4E3A;&#x7F51;&#x7EDC;&#x6545;&#x969C;(&#x65E0;&#x7F51;/&#x5F31;&#x7F51;)&#xFF0C;&#x6216;&#x7740;&#x8DE8;&#x57DF;&#x8BF7;&#x6C42;&#x88AB;&#x62D2;&#x7EDD;(&#x751F;&#x4EA7;&#x73AF;&#x5883;&#x901A;&#x5E38;&#x4E0D;&#x4F1A;&#x6709;&#x8DE8;&#x57DF;&#x7684;&#x60C5;&#x51B5;&#x51FA;&#x73B0;&#xFF0C;&#x6240;&#x4EE5;&#x8FD9;&#x4E2A;&#x9519;&#x8BEF;&#x4E00;&#x822C;&#x4E0D;&#x7528;&#x8003;&#x8651;)&#x3002;&#x5982;&#x679C;&#x4F60;&#x4F7F;&#x7528;&#x7684; HTTP Client &#x6CA1;&#x6709;&#x8FD4;&#x56DE;&#x9519;&#x8BEF;&#x4FE1;&#x606F;&#xFF0C;&#x53EF;&#x4EE5;&#x8003;&#x8651;&#x663E;&#x793A;&#x4E00;&#x4E2A;&#x901A;&#x7528;&#x9519;&#x8BEF;&#x4FE1;&#x606F;(General Error Message)&#x3002;</p><h3 id="articleHeader2">&#x5E94;&#x7528;&#x7A0B;&#x5E8F;&#x9519;&#x8BEF;</h3><h4>&#x4EE3;&#x7801;&#x9519;&#x8BEF;</h4><p>&#x901A;&#x5E38;&#x662F;&#x7531;&#x4E8E; JS &#x4EE3;&#x7801;&#x7F16;&#x5199;&#x9519;&#x8BEF;&#xFF0C;&#x5BFC;&#x81F4; JavaScript &#x5F15;&#x64CE;&#x65E0;&#x6CD5;&#x6B63;&#x786E;&#x6267;&#x884C;&#xFF0C;&#x4ECE;&#x800C;&#x62A5;&#x9519;&#x3002;&#x8FD9;&#x4E00;&#x7C7B;&#x9519;&#x8BEF;&#x5728;&#x751F;&#x4EA7;&#x73AF;&#x5883;&#x4E00;&#x822C;&#x4E0D;&#x4F1A;&#x51FA;&#x73B0;&#xFF0C;&#x56E0;&#x6B64;&#x53EF;&#x4EE5;&#x6839;&#x636E;&#x4E1A;&#x52A1;&#x9700;&#x6C42;&#x51B3;&#x5B9A;&#x662F;&#x5426;&#x5904;&#x7406;&#x8FD9;&#x4E00;&#x7C7B;&#x9519;&#x8BEF;&#x3002;&#x5E38;&#x89C1;&#x7684;&#x6709;:</p><ul><li>SyntaxError&#x8BED;&#x6CD5;&#x9519;&#x8BEF;</li><li>ReferenceError&#x5F15;&#x7528;&#x9519;&#x8BEF;</li><li>TypeError&#x7C7B;&#x578B;&#x9519;&#x8BEF;</li></ul><h4>Throw Error</h4><p>&#x5E94;&#x7528;&#x4E2D;&#x6839;&#x636E;&#x4E1A;&#x52A1;&#x9700;&#x6C42;&#x800C; Throw &#x7684; Error&#x3002;</p><h2 id="articleHeader3">Redux &#x4E2D;&#x7684; Error &#x5904;&#x7406;</h2><p>&#x5728;&#x4E0A;&#x9762;&#x7684;&#x7AE0;&#x8282;&#x4E2D;&#x6211;&#x4EEC;&#x5DF2;&#x7ECF;&#x5BF9;&#x5E94;&#x7528;&#x4E2D;&#x7684; Error &#x8FDB;&#x884C;&#x4E86;&#x5206;&#x7C7B;&#x3002; &#x5229;&#x7528; Redux &#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5BF9; HTTP Request Error &#x8FDB;&#x884C;&#x7EDF;&#x4E00;&#x7684;&#x5904;&#x7406;&#x3002;</p><h3 id="articleHeader4">Step1: &#x88C2;&#x53D8; HTTP Request Action</h3><p>&#x5728;&#x8FDB;&#x884C; HTTP &#x8BF7;&#x6C42;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x6211;&#x4EEC;&#x901A;&#x5E38;&#x4F1A;&#x53D1;&#x8D77;&#x4E00;&#x4E2A; Action&#x3002;&#x5982;&#x679C;&#x5C06;&#x8BF7;&#x6C42;&#x6210;&#x529F;&#x548C;&#x5931;&#x8D25;&#x7684;&#x72B6;&#x6001;&#x88C2;&#x53D8;&#x6210;&#x4E24;&#x4E2A; Action&#xFF0C;<code>RequestSuccessAction</code> &#x548C; <code>RequestFailedAction</code>&#xFF0C;&#x90A3;&#x4E48;&#x901A;&#x8FC7; RequestFailedAction&#xFF0C;&#x5C31;&#x80FD;&#x591F;&#x5BF9;&#x6240;&#x6709; HTTP &#x8BF7;&#x6C42;&#x7684;&#x9519;&#x8BEF;&#x8FDB;&#x884C;&#x7EDF;&#x4E00;&#x5904;&#x7406;&#x3002;</p><p>requestMiddleware.ts</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export const requestMiddleware: any = (client: AxiosInstance) =&gt; {
  return ({ dispatch }: MiddlewareAPI&lt;any&gt;) =&gt;
    (next: Dispatch&lt;any&gt;) =&gt;
      (action: IRequestAction) =&gt; {
        if (isRequestAction(action)) {
          dispatch(createReqStartAction(action));
          return client.request(action.payload)
            .then((response: AxiosResponse) =&gt; {
              return dispatch(createSuccessAction(action, response));
            })
            .catch((error: AxiosError) =&gt; {
              return dispatch(createFailedAction(action, error, action.meta.omitError));
            });
        }
        return next(action);
      };
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> requestMiddleware: any = <span class="hljs-function">(<span class="hljs-params">client: AxiosInstance</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params">{ dispatch }: MiddlewareAPI&lt;any&gt;</span>) =&gt;</span>
    (next: Dispatch&lt;any&gt;) =&gt;
      <span class="hljs-function">(<span class="hljs-params">action: IRequestAction</span>) =&gt;</span> {
        <span class="hljs-keyword">if</span> (isRequestAction(action)) {
          dispatch(createReqStartAction(action));
          <span class="hljs-keyword">return</span> client.request(action.payload)
            .then(<span class="hljs-function">(<span class="hljs-params">response: AxiosResponse</span>) =&gt;</span> {
              <span class="hljs-keyword">return</span> dispatch(createSuccessAction(action, response));
            })
            .catch(<span class="hljs-function">(<span class="hljs-params">error: AxiosError</span>) =&gt;</span> {
              <span class="hljs-keyword">return</span> dispatch(createFailedAction(action, error, action.meta.omitError));
            });
        }
        <span class="hljs-keyword">return</span> next(action);
      };
};</code></pre><h3 id="articleHeader5">Step2: &#x521B;&#x5EFA; errorMiddleware&#xFF0C;&#x5C06; Error &#x8F6C;&#x5316;&#x4E3A; Notification Action</h3><p>&#x5C06; HTTP &#x8BF7;&#x6C42;&#x7684;&#x5931;&#x8D25;&#x72B6;&#x6001;&#x8F6C;&#x5316;&#x6210; RequestFailedAction &#x4E4B;&#x540E;&#xFF0C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x5199;&#x4E00;&#x4E2A; Middleware &#x6765;&#x5904;&#x7406;&#x5B83;&#x3002;</p><p>&#x8FD9;&#x91CC;&#x6709;&#x4EBA;&#x53EF;&#x80FD;&#x4F1A;&#x95EE;&#x4E86;&#xFF0C;&#x65E2;&#x7136;&#x5DF2;&#x7ECF;&#x6709; RequestFailedAction &#x4E86;&#xFF0C;&#x8FD8;&#x9700;&#x8981; Middleware &#x5417;&#xFF1F;&#x80FD;&#x4E0D;&#x80FD;&#x76F4;&#x63A5;&#x5728; Reducer &#x4E2D;&#x53BB;&#x5904;&#x7406;&#x5B83;&#xFF1F;&#x5176;&#x5B9E;&#x4E5F;&#x662F;&#x53EF;&#x4EE5;&#x7684;&#x3002;&#x4F46;&#x662F;&#x5199;&#x5728; Reducer &#x91CC;&#x9762;&#xFF0C;&#x540C;&#x4E00;&#x4E2A; Action &#x4FEE;&#x6539;&#x4E86;&#x591A;&#x4E2A; State &#x8282;&#x70B9;&#xFF0C;&#x4F1A;&#x5BFC;&#x81F4;&#x4EE3;&#x7801;&#x8026;&#x5408;&#x5EA6;&#x589E;&#x52A0;&#xFF0C;&#x6240;&#x4EE5;&#x5728;&#x8FD9;&#x91CC;&#x6211;&#x4EEC;&#x8FD8;&#x662F;&#x4F7F;&#x7528; Middleware &#x7684;&#x65B9;&#x5F0F;&#x6765;&#x5904;&#x7406;&#x3002;&#x601D;&#x8DEF;&#x5982;&#x4E0B;:</p><ol><li>&#x5982;&#x679C; Action &#x662F;&#x4E00;&#x4E2A; RequestFailedAction&#xFF0C;&#x90A3;&#x4E48;&#x6839;&#x636E;&#x9519;&#x8BEF;&#x7684;&#x5206;&#x7C7B;&#xFF0C;&#x5C06;&#x9519;&#x8BEF;&#x7684;&#x7C7B;&#x578B;&#x548C;&#x4FE1;&#x606F;&#x5B58;&#x50A8;&#x5230; <code>addNotificationAction</code> &#x4E2D;&#x3002;&#x5728;&#x8FD9;&#x91CC;&#x6211;&#x4EEC;&#x5E76;&#x4E0D;&#x9700;&#x8981;&#x5C06;&#x6240;&#x6709;&#x7684;&#x9519;&#x8BEF;&#x4FE1;&#x606F;&#x90FD;&#x5B58;&#x8D77;&#x6765;&#xFF0C;&#x56E0;&#x4E3A; UI &#x53EA;&#x5173;&#x5FC3; Error &#x7684;&#x7C7B;&#x578B;&#x548C;&#x4FE1;&#x606F;&#x3002;</li><li>&#x6839;&#x636E; Error &#x7684;&#x5206;&#x7C7B;&#xFF0C;Dispatch &#x5E26;&#x6709;&#x4E0D;&#x540C; Error Type &#x548C; Error Message &#x7684; Action&#x3002;</li><li>&#x521B;&#x5EFA; <code>createNotification</code> &#x51FD;&#x6570;&#xFF0C;&#x751F;&#x6210;&#x4E00;&#x4E2A;&#x5E26;&#x6709; UUID &#x7684; Notification&#xFF0C;&#x4EE5;&#x4FBF;&#x5220;&#x9664;&#x65F6;&#x4F7F;&#x7528;&#x3002;&#x56E0;&#x4E3A; notification &#x53EF;&#x80FD;&#x4E0D;&#x6B62;&#x4E00;&#x4E2A;&#x3002;</li><li>&#x901A;&#x8FC7; Dispatch <code>removeNotificationAction</code> &#x6765;&#x79FB;&#x9664; Notification&#x3002;</li></ol><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export interface INotification {
  [UUID: number]: {
    type: string;
    msg: string;
  };
}

const createNotification = ({ type, msg }: { type: string; msg: string }): INotification =&gt; {
  const id = new Date().getTime();
  return {
    [id]: {
      type,
      msg,
    },
  };
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">export</span> interface INotification {
  [UUID: number]: {
    <span class="hljs-attr">type</span>: string;
    msg: string;
  };
}

<span class="hljs-keyword">const</span> createNotification = ({ type, msg }: { <span class="hljs-attr">type</span>: string; msg: string }): <span class="hljs-function"><span class="hljs-params">INotification</span> =&gt;</span> {
  <span class="hljs-keyword">const</span> id = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().getTime();
  <span class="hljs-keyword">return</span> {
    [id]: {
      type,
      msg,
    },
  };
};</code></pre><p>&#x5B8C;&#x6574;&#x4EE3;&#x7801;&#x5982;&#x4E0B;:</p><p>errorMiddleware.ts</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { AnyAction, Dispatch, MiddlewareAPI } from &quot;redux&quot;;
import { isRequestFailedAction } from &quot;../request&quot;;
import {
  addNotification,
  INotification,
} from &quot;./notificationActions&quot;;

export enum ErrorMessages {
  GENERAL_ERROR = &quot;Something went wrong, please try again later!&quot;,
}

enum ErrorTypes {
  GENERAL_ERROR = &quot;GENERAL_ERROR&quot;,
}

export const createNotification = ({ type, msg }: { type: string; msg: string }): INotification =&gt; {
  const id = new Date().getTime();
  return {
    [id]: {
      type,
      msg,
    },
  };
};

export const errorMiddleware = ({ dispatch }: MiddlewareAPI) =&gt; {
  return (next: Dispatch&lt;AnyAction&gt;) =&gt; {
    return (action: AnyAction) =&gt; {
      if (isRequestFailedAction(action)) {
        const error = action.payload;
        if (error.response) {
          dispatch(
            addNotification(
              createNotification({
                type: error.response.error,
                msg: error.response.data.message,
              }),
            ),
          );
        } else {
          dispatch(
            addNotification(
              createNotification({
                type: ErrorTypes.GENERAL_ERROR,
                msg: ErrorMessages.GENERAL_ERROR,
              }),
            ),
          );
        }
      }
      return next(action);
    };
  };
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> { AnyAction, Dispatch, MiddlewareAPI } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;redux&quot;</span>;
<span class="hljs-keyword">import</span> { isRequestFailedAction } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;../request&quot;</span>;
<span class="hljs-keyword">import</span> {
  addNotification,
  INotification,
} <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./notificationActions&quot;</span>;

<span class="hljs-keyword">export</span> enum ErrorMessages {
  GENERAL_ERROR = <span class="hljs-string">&quot;Something went wrong, please try again later!&quot;</span>,
}

enum ErrorTypes {
  GENERAL_ERROR = <span class="hljs-string">&quot;GENERAL_ERROR&quot;</span>,
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> createNotification = ({ type, msg }: { <span class="hljs-attr">type</span>: string; msg: string }): <span class="hljs-function"><span class="hljs-params">INotification</span> =&gt;</span> {
  <span class="hljs-keyword">const</span> id = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().getTime();
  <span class="hljs-keyword">return</span> {
    [id]: {
      type,
      msg,
    },
  };
};

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> errorMiddleware = <span class="hljs-function">(<span class="hljs-params">{ dispatch }: MiddlewareAPI</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params">next: Dispatch&lt;AnyAction&gt;</span>) =&gt;</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params">action: AnyAction</span>) =&gt;</span> {
      <span class="hljs-keyword">if</span> (isRequestFailedAction(action)) {
        <span class="hljs-keyword">const</span> error = action.payload;
        <span class="hljs-keyword">if</span> (error.response) {
          dispatch(
            addNotification(
              createNotification({
                <span class="hljs-attr">type</span>: error.response.error,
                <span class="hljs-attr">msg</span>: error.response.data.message,
              }),
            ),
          );
        } <span class="hljs-keyword">else</span> {
          dispatch(
            addNotification(
              createNotification({
                <span class="hljs-attr">type</span>: ErrorTypes.GENERAL_ERROR,
                <span class="hljs-attr">msg</span>: ErrorMessages.GENERAL_ERROR,
              }),
            ),
          );
        }
      }
      <span class="hljs-keyword">return</span> next(action);
    };
  };
};</code></pre><p>notificationActions.ts</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { createAction } from &quot;redux-actions&quot;;

export interface INotification {
  [UUID: number]: {
    type: string;
    msg: string;
  };
}

export const addNotification = createAction(
  &quot;@@notification/addNotification&quot;,
  (notification: INotification) =&gt; notification,
);

export const removeNotification = createAction(&quot;@@notification/removeNotification&quot;, (id: number) =&gt; id);

export const clearNotifications = createAction(&quot;@@notification/clearNotifications&quot;);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> { createAction } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;redux-actions&quot;</span>;

<span class="hljs-keyword">export</span> interface INotification {
  [UUID: number]: {
    <span class="hljs-attr">type</span>: string;
    msg: string;
  };
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> addNotification = createAction(
  <span class="hljs-string">&quot;@@notification/addNotification&quot;</span>,
  (notification: INotification) =&gt; notification,
);

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> removeNotification = createAction(<span class="hljs-string">&quot;@@notification/removeNotification&quot;</span>, (id: number) =&gt; id);

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> clearNotifications = createAction(<span class="hljs-string">&quot;@@notification/clearNotifications&quot;</span>);</code></pre><blockquote>&#x670D;&#x52A1;&#x5668;&#x9700;&#x8981;&#x4FDD;&#x8BC1;&#x6BCF;&#x4E00;&#x4E2A; HTTP Reqeust &#x90FD;&#x6709;&#x76F8;&#x5E94;&#x7684; Error Message&#xFF0C;&#x4E0D;&#x7136;&#x524D;&#x7AEF;&#x5C31;&#x53EA;&#x80FD;&#x6839;&#x636E; 4xx &#x6216;&#x8005; 5xx &#x8FD9;&#x79CD;&#x7C97;&#x7565;&#x7684;&#x5206;&#x7C7B;&#x6765;&#x663E;&#x793A; Error Message&#x3002;</blockquote><h3 id="articleHeader6">Step3: &#x5904;&#x7406; Notification Action</h3><p>notificationsReducer.ts</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { omit } from &quot;lodash&quot;;
import { Action, handleActions } from &quot;redux-actions&quot;;
import { addNotification, clearNotifications, removeNotification } from &quot;./notificationActions&quot;;

export const notificationsReducer = handleActions(
  {
    [`${addNotification}`]: (state, action: Action&lt;any&gt;) =&gt; {
      return {
        ...state,
        ...action.payload,
      };
    },
    [`${removeNotification}`]: (state, action: Action&lt;any&gt;) =&gt; {
      return omit(state, action.payload);
    },
    [`${clearNotifications}`]: () =&gt; {
      return {};
    },
  },
  {},
);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> { omit } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;lodash&quot;</span>;
<span class="hljs-keyword">import</span> { Action, handleActions } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;redux-actions&quot;</span>;
<span class="hljs-keyword">import</span> { addNotification, clearNotifications, removeNotification } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./notificationActions&quot;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> notificationsReducer = handleActions(
  {
    [<span class="hljs-string">`<span class="hljs-subst">${addNotification}</span>`</span>]: <span class="hljs-function">(<span class="hljs-params">state, action: Action&lt;any&gt;</span>) =&gt;</span> {
      <span class="hljs-keyword">return</span> {
        ...state,
        ...action.payload,
      };
    },
    [<span class="hljs-string">`<span class="hljs-subst">${removeNotification}</span>`</span>]: <span class="hljs-function">(<span class="hljs-params">state, action: Action&lt;any&gt;</span>) =&gt;</span> {
      <span class="hljs-keyword">return</span> omit(state, action.payload);
    },
    [<span class="hljs-string">`<span class="hljs-subst">${clearNotifications}</span>`</span>]: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      <span class="hljs-keyword">return</span> {};
    },
  },
  {},
);</code></pre><h3 id="articleHeader7">Step4: &#x4ECE; Store &#x4E2D;&#x83B7;&#x53D6; Notification&#xFF0C;&#x5E76;&#x901A;&#x8FC7; React Child Render &#x63D0;&#x4F9B;&#x7ED9;&#x5B50;&#x7EC4;&#x4EF6;&#x3002;</h3><p>&#x8FD9;&#x4E00;&#x6B65;&#x5C31;&#x5F88;&#x7B80;&#x5355;&#x4E86;&#xFF0C;&#x4ECE; Store &#x4E2D;&#x62FF;&#x5230; Notifications&#xFF0C;&#x7136;&#x540E;&#x901A;&#x8FC7; React Child Render &#x5C06;&#x5B83;&#x63D0;&#x4F9B;&#x7ED9;&#x5B50;&#x7EC4;&#x4EF6;&#xFF0C;&#x5B50;&#x7EC4;&#x4EF6;&#x5C31;&#x53EF;&#x4EE5;&#x6839;&#x636E;&#x5B83;&#x53BB;&#x663E;&#x793A; UI &#x4E86;&#x3002;</p><p>WithNotifications.tsx</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { isEmpty } from &quot;lodash&quot;;
import * as React from &quot;react&quot;;
import {
  connect,
  DispatchProp,
} from &quot;react-redux&quot;;
import {
  clearNotifications,
  INotification,
} from &quot;./notificationActions&quot;;

interface IWithNotificationsCoreInnerProps {
  notifications: INotification;
}

interface IWithNotificationsCoreProps extends DispatchProp {
  notifications: INotification;
  children: (props: IWithNotificationsCoreInnerProps) =&gt; React.ReactNode;
}

class WithNotificationsCore extends React.Component&lt;IWithNotificationsCoreProps&gt; {
  componentWillUnmount() {
    this.props.dispatch(clearNotifications());
  }

  render() {
    if (isEmpty(this.props.notifications)) {
      return null;
    }

    return this.props.children({
      notifications: this.props.notifications,
    });
  }
}

const mapStateToProps = (state: any) =&gt; {
  return {
    notifications: state.notifications,
  };
};

export const WithNotifications = connect(mapStateToProps)(WithNotificationsCore);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> { isEmpty } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;lodash&quot;</span>;
<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;react&quot;</span>;
<span class="hljs-keyword">import</span> {
  connect,
  DispatchProp,
} <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;react-redux&quot;</span>;
<span class="hljs-keyword">import</span> {
  clearNotifications,
  INotification,
} <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./notificationActions&quot;</span>;

interface IWithNotificationsCoreInnerProps {
  <span class="hljs-attr">notifications</span>: INotification;
}

interface IWithNotificationsCoreProps extends DispatchProp {
  <span class="hljs-attr">notifications</span>: INotification;
  children: <span class="hljs-function">(<span class="hljs-params">props: IWithNotificationsCoreInnerProps</span>) =&gt;</span> React.ReactNode;
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">WithNotificationsCore</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span>&lt;<span class="hljs-title">IWithNotificationsCoreProps</span>&gt; </span>{
  componentWillUnmount() {
    <span class="hljs-keyword">this</span>.props.dispatch(clearNotifications());
  }

  render() {
    <span class="hljs-keyword">if</span> (isEmpty(<span class="hljs-keyword">this</span>.props.notifications)) {
      <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
    }

    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.props.children({
      <span class="hljs-attr">notifications</span>: <span class="hljs-keyword">this</span>.props.notifications,
    });
  }
}

<span class="hljs-keyword">const</span> mapStateToProps = <span class="hljs-function">(<span class="hljs-params">state: any</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">notifications</span>: state.notifications,
  };
};

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> WithNotifications = connect(mapStateToProps)(WithNotificationsCore);</code></pre><h3 id="articleHeader8">Step5: &#x663E;&#x793A; Error Messages</h3><p>&#x56E0;&#x4E3A; Notification &#x662F;&#x4E00;&#x4E2A;&#x901A;&#x7528;&#x7684;&#x7EC4;&#x4EF6;&#xFF0C;&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x4E00;&#x822C;&#x4F1A;&#x628A;&#x5B83;&#x653E;&#x5230;&#x6839;&#x7EC4;&#x4EF6; (Root) &#x4E0A;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;WithNotifications&gt;
  {({ notifications }) =&gt; (
    &lt;&gt;
      {map(notifications, (notification: { type: string; msg: string }, id: number) =&gt; {
        return (
          &lt;div&gt;
            {notification.msg} // &#x5C06;&#x4F60;&#x7684; Notification &#x7EC4;&#x4EF6;&#x653E;&#x5230;&#x8FD9;&#x91CC;            
            {id} // &#x4F60;&#x53EF;&#x4EE5;&#x7528; id &#x53BB;&#x5220;&#x9664;&#x5BF9;&#x5E94;&#x7684; Notification
          &lt;/div&gt;
        );
      })}
    &lt;/&gt;
  )}
&lt;/WithNotifications&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">WithNotifications</span>&gt;</span>
  {({ notifications }) =&gt; (
    <span class="hljs-tag">&lt;&gt;</span>
      {map(notifications, (notification: { type: string; msg: string }, id: number) =&gt; {
        return (
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
            {notification.msg} // &#x5C06;&#x4F60;&#x7684; Notification &#x7EC4;&#x4EF6;&#x653E;&#x5230;&#x8FD9;&#x91CC;            
            {id} // &#x4F60;&#x53EF;&#x4EE5;&#x7528; id &#x53BB;&#x5220;&#x9664;&#x5BF9;&#x5E94;&#x7684; Notification
          <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        );
      })}
    <span class="hljs-tag">&lt;/&gt;</span>
  )}
<span class="hljs-tag">&lt;/<span class="hljs-name">WithNotifications</span>&gt;</span>
</code></pre><h3 id="articleHeader9">Step6: &#x6DFB;&#x52A0;&#x767D;&#x540D;&#x5355;</h3><p>&#x5F53;&#x7136;&#xFF0C;&#x5E76;&#x4E0D;&#x662F;&#x6240;&#x6709;&#x7684; API &#x8BF7;&#x6C42;&#x51FA;&#x9519;&#x6211;&#x4EEC;&#x90FD;&#x9700;&#x8981;&#x901A;&#x77E5;&#x7ED9;&#x7528;&#x6237;&#x3002;&#x8FD9;&#x65F6;&#x5019;&#x4F60;&#x5C31;&#x9700;&#x8981;&#x52A0;&#x4E00;&#x4E2A;&#x767D;&#x540D;&#x5355;&#x4E86;&#xFF0C;&#x5982;&#x679C;&#x5728;&#x8FD9;&#x4E2A;&#x767D;&#x540D;&#x5355;&#x5185;&#xFF0C;&#x5219;&#x4E0D;&#x5C06;&#x9519;&#x8BEF;&#x4FE1;&#x606F;&#x901A;&#x77E5;&#x7ED9;&#x7528;&#x6237;&#x3002;&#x53EF;&#x4EE5;&#x8003;&#x8651;&#x5728; Requst Action &#x7684; Meta &#x4E2D;&#x52A0;&#x4E00;&#x4E2A; <code>omitError</code> &#x7684; flag&#xFF0C;&#x5F53;&#x6709;&#x8FD9;&#x4E2A; flag &#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5219;&#x4E0D;&#x8FDB;&#x884C;&#x901A;&#x77E5;&#x3002;&#x8BA9;&#x6211;&#x4EEC;&#x4FEE;&#x6539;&#x4E00;&#x4E0B; errorMiddleware&#xFF0C;&#x5982;&#x4E0B;:</p><p>errorMiddleware.ts</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export const errorMiddleware = ({ dispatch }: MiddlewareAPI) =&gt; {
  return (next: Dispatch&lt;AnyAction&gt;) =&gt; {
    return (action: AnyAction) =&gt; {
    const shouldOmitError = get(action, &quot;meta.omitError&quot;, false);
      if (isRequestFailedAction(action) &amp;&amp; !shouldOmitError) {
        const error = action.payload;
        if (error.response) {
          // same as before
        } else {
          // same as before
      }
      return next(action);
    };
  };
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> errorMiddleware = <span class="hljs-function">(<span class="hljs-params">{ dispatch }: MiddlewareAPI</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params">next: Dispatch&lt;AnyAction&gt;</span>) =&gt;</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params">action: AnyAction</span>) =&gt;</span> {
    <span class="hljs-keyword">const</span> shouldOmitError = get(action, <span class="hljs-string">&quot;meta.omitError&quot;</span>, <span class="hljs-literal">false</span>);
      <span class="hljs-keyword">if</span> (isRequestFailedAction(action) &amp;&amp; !shouldOmitError) {
        <span class="hljs-keyword">const</span> error = action.payload;
        <span class="hljs-keyword">if</span> (error.response) {
          <span class="hljs-comment">// same as before</span>
        } <span class="hljs-keyword">else</span> {
          <span class="hljs-comment">// same as before</span>
      }
      <span class="hljs-keyword">return</span> next(action);
    };
  };
};</code></pre><h3 id="articleHeader10">Step7: &#x6D4B;&#x8BD5;</h3><p>&#x5728;&#x6D4B;&#x8BD5; errorMiddleware &#x7684;&#x65F6;&#x5019;&#xFF0C;&#x53EF;&#x80FD;&#x4F1A;&#x9047;&#x5230;&#x4E00;&#x4E2A;&#x95EE;&#x9898;&#xFF0C;&#x5C31;&#x662F;&#x6211;&#x4EEC;&#x7684; Notification &#x662F;&#x6839;&#x636E;&#x4E00;&#x4E2A;&#x4EE5;&#x65F6;&#x95F4;&#x6233;&#x4E3A; key &#x7684;&#x5BF9;&#x8C61;&#xFF0C;&#x65F6;&#x95F4;&#x6233;&#x662F;&#x6839;&#x636E;&#x5F53;&#x524D;&#x65F6;&#x95F4;&#x751F;&#x6210;&#x7684;&#xFF0C;&#x6BCF;&#x6B21;&#x8DD1;&#x6D4B;&#x8BD5;&#x65F6;&#x90FD;&#x4F1A;&#x53D1;&#x751F;&#x53D8;&#x5316;&#xFF0C;&#x5982;&#x4F55;&#x89E3;&#x51B3;&#x5462;&#xFF1F;Mock getTime &#x65B9;&#x6CD5;&#x5C31;&#x597D;&#x5566;&#x3002;&#x5982;&#x4E0B;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" beforeEach(() =&gt; {
    class MockDate {
      getTime() {
        return 123456;
      }
    }

    global.Date = MockDate as any;
  });

  afterEach(() =&gt; {
    global.Date = Date;
  });" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"> beforeEach(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MockDate</span> </span>{
      getTime() {
        <span class="hljs-keyword">return</span> <span class="hljs-number">123456</span>;
      }
    }

    global.Date = MockDate <span class="hljs-keyword">as</span> any;
  });

  afterEach(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    global.Date = <span class="hljs-built_in">Date</span>;
  });</code></pre><h2 id="articleHeader11">&#x9519;&#x8BEF;&#x4FE1;&#x606F;&#x7684;&#x6536;&#x96C6;</h2><h3 id="articleHeader12">componentDidCatch</h3><p>&#x5229;&#x7528; React <code>componentDidCatch</code> &#x751F;&#x547D;&#x5468;&#x671F;&#x65B9;&#x6CD5;&#x5C06;&#x9519;&#x8BEF;&#x4FE1;&#x606F;&#x6536;&#x96C6;&#x5230; Error Reporting &#x670D;&#x52A1;&#x3002;&#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#x6709;&#x70B9;&#x50CF; JS &#x7684; <code>catch{}</code>&#xFF0C;&#x53EA;&#x4E0D;&#x8FC7;&#x662F;&#x9488;&#x5BF9;&#x7EC4;&#x4EF6;&#x7684;&#x3002;&#x5927;&#x591A;&#x6570;&#x65F6;&#x5019;&#x6211;&#x4EEC;&#x5E0C;&#x671B; ErrorBoundary &#x7EC4;&#x4EF6;&#x8D2F;&#x7A7F;&#x6211;&#x4EEC;&#x7684;&#x6574;&#x4E2A;&#x5E94;&#x7528;&#xFF0C;&#x6240;&#x4EE5;&#x4E00;&#x822C;&#x4F1A;&#x5C06;&#x5B83;&#x653E;&#x5728;&#x6839;&#x8282;&#x70B9;&#x4E0A; (Root)&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    logErrorToMyService(error, info);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return &lt;h1&gt;Something went wrong.&lt;/h1&gt;;
    }
    return this.props.children;
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ErrorBoundary</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  <span class="hljs-keyword">constructor</span>(props) {
    <span class="hljs-keyword">super</span>(props);
    <span class="hljs-keyword">this</span>.state = { <span class="hljs-attr">hasError</span>: <span class="hljs-literal">false</span> };
  }

  componentDidCatch(error, info) {
    <span class="hljs-comment">// Display fallback UI</span>
    <span class="hljs-keyword">this</span>.setState({ <span class="hljs-attr">hasError</span>: <span class="hljs-literal">true</span> });
    <span class="hljs-comment">// You can also log the error to an error reporting service</span>
    logErrorToMyService(error, info);
  }

  render() {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.state.hasError) {
      <span class="hljs-comment">// You can render any custom fallback UI</span>
      <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Something went wrong.<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>;
    }
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.props.children;
  }
}</code></pre><blockquote>&#x6CE8;&#x610F;&#xFF1A;&#x5BF9; ErrorBoundary &#x7EC4;&#x4EF6;&#x6765;&#x8BF4;&#xFF0C;&#x5B83;&#x53EA;&#x4F1A;&#x6355;&#x83B7;&#x5728;&#x5B83;&#x4E4B;&#x4E0B;&#x7684;&#x7EC4;&#x4EF6;&#xFF0C;&#x5B83;&#x4E0D;&#x4F1A;&#x6355;&#x83B7;&#x81EA;&#x8EAB;&#x7EC4;&#x4EF6;&#x5185;&#x90E8;&#x7684;&#x9519;&#x8BEF;&#x3002;</blockquote>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
基于 React Redux 的错误处理

## 原文链接
[https://segmentfault.com/a/1190000016344595](https://segmentfault.com/a/1190000016344595)

