---
title: 'PHP websocket之聊天室实现' 
date: 2018-11-16 2:30:06
hidden: true
slug: 4xj0fggwjqs
categories: reprint
---

{{< raw >}}
<p>PHP&#x90E8;&#x5206;</p><pre><code class="PHP">&lt;?php
error_reporting(E_ALL);
set_time_limit(0);// &#x8BBE;&#x7F6E;&#x8D85;&#x65F6;&#x65F6;&#x95F4;&#x4E3A;&#x65E0;&#x9650;,&#x9632;&#x6B62;&#x8D85;&#x65F6;
date_default_timezone_set(&apos;Asia/shanghai&apos;);
class WebSocket {
    const LOG_PATH = &apos;/tmp/&apos;;
    const LISTEN_SOCKET_NUM = 9;
    /**
     * @var array $sockets
     *    [
     *      (int)$socket =&gt; [
     *                        info
     *                      ]
     *      ]
     *  todo &#x89E3;&#x91CA;socket&#x4E0E;file&#x53F7;&#x5BF9;&#x5E94;
     */
    private $sockets = [];
    private $master;
    public function __construct($host, $port) {
        try {
            $this-&gt;master = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
            // &#x8BBE;&#x7F6E;IP&#x548C;&#x7AEF;&#x53E3;&#x91CD;&#x7528;,&#x5728;&#x91CD;&#x542F;&#x670D;&#x52A1;&#x5668;&#x540E;&#x80FD;&#x91CD;&#x65B0;&#x4F7F;&#x7528;&#x6B64;&#x7AEF;&#x53E3;;
            socket_set_option($this-&gt;master, SOL_SOCKET, SO_REUSEADDR, 1);
            // &#x5C06;IP&#x548C;&#x7AEF;&#x53E3;&#x7ED1;&#x5B9A;&#x5728;&#x670D;&#x52A1;&#x5668;socket&#x4E0A;;
            socket_bind($this-&gt;master, $host, $port);
            // listen&#x51FD;&#x6570;&#x4F7F;&#x7528;&#x4E3B;&#x52A8;&#x8FDE;&#x63A5;&#x5957;&#x63A5;&#x53E3;&#x53D8;&#x4E3A;&#x88AB;&#x8FDE;&#x63A5;&#x5957;&#x63A5;&#x53E3;&#xFF0C;&#x4F7F;&#x5F97;&#x4E00;&#x4E2A;&#x8FDB;&#x7A0B;&#x53EF;&#x4EE5;&#x63A5;&#x53D7;&#x5176;&#x5B83;&#x8FDB;&#x7A0B;&#x7684;&#x8BF7;&#x6C42;&#xFF0C;&#x4ECE;&#x800C;&#x6210;&#x4E3A;&#x4E00;&#x4E2A;&#x670D;&#x52A1;&#x5668;&#x8FDB;&#x7A0B;&#x3002;&#x5728;TCP&#x670D;&#x52A1;&#x5668;&#x7F16;&#x7A0B;&#x4E2D;listen&#x51FD;&#x6570;&#x628A;&#x8FDB;&#x7A0B;&#x53D8;&#x4E3A;&#x4E00;&#x4E2A;&#x670D;&#x52A1;&#x5668;&#xFF0C;&#x5E76;&#x6307;&#x5B9A;&#x76F8;&#x5E94;&#x7684;&#x5957;&#x63A5;&#x5B57;&#x53D8;&#x4E3A;&#x88AB;&#x52A8;&#x8FDE;&#x63A5;,&#x5176;&#x4E2D;&#x7684;&#x80FD;&#x5B58;&#x50A8;&#x7684;&#x8BF7;&#x6C42;&#x4E0D;&#x660E;&#x7684;socket&#x6570;&#x76EE;&#x3002;
            socket_listen($this-&gt;master, self::LISTEN_SOCKET_NUM);
        } catch (\Exception $e) {
            $err_code = socket_last_error();
            $err_msg = socket_strerror($err_code);
            $this-&gt;error([
                &apos;error_init_server&apos;,
                $err_code,
                $err_msg
            ]);
        }
        $this-&gt;sockets[0] = [&apos;resource&apos; =&gt; $this-&gt;master];
        $pid = posix_getpid();
        $this-&gt;debug([&quot;server: {$this-&gt;master} started,pid: {$pid}&quot;]);
        while (true) {
            try {
                $this-&gt;doServer();
            } catch (\Exception $e) {
                $this-&gt;error([
                    &apos;error_do_server&apos;,
                    $e-&gt;getCode(),
                    $e-&gt;getMessage()
                ]);
            }
        }
    }
    private function doServer() {
        $write = $except = NULL;
        $sockets = array_column($this-&gt;sockets, &apos;resource&apos;);
        $read_num = socket_select($sockets, $write, $except, NULL);
        // select&#x4F5C;&#x4E3A;&#x76D1;&#x89C6;&#x51FD;&#x6570;,&#x53C2;&#x6570;&#x5206;&#x522B;&#x662F;(&#x76D1;&#x89C6;&#x53EF;&#x8BFB;,&#x53EF;&#x5199;,&#x5F02;&#x5E38;,&#x8D85;&#x65F6;&#x65F6;&#x95F4;),&#x8FD4;&#x56DE;&#x53EF;&#x64CD;&#x4F5C;&#x6570;&#x76EE;,&#x51FA;&#x9519;&#x65F6;&#x8FD4;&#x56DE;false;
        if (false === $read_num) {
            $this-&gt;error([
                &apos;error_select&apos;,
                $err_code = socket_last_error(),
                socket_strerror($err_code)
            ]);
            return;
        }
        foreach ($sockets as $socket) {
            // &#x5982;&#x679C;&#x53EF;&#x8BFB;&#x7684;&#x662F;&#x670D;&#x52A1;&#x5668;socket,&#x5219;&#x5904;&#x7406;&#x8FDE;&#x63A5;&#x903B;&#x8F91;
            if ($socket == $this-&gt;master) {
                $client = socket_accept($this-&gt;master);
                // &#x521B;&#x5EFA;,&#x7ED1;&#x5B9A;,&#x76D1;&#x542C;&#x540E;accept&#x51FD;&#x6570;&#x5C06;&#x4F1A;&#x63A5;&#x53D7;socket&#x8981;&#x6765;&#x7684;&#x8FDE;&#x63A5;,&#x4E00;&#x65E6;&#x6709;&#x4E00;&#x4E2A;&#x8FDE;&#x63A5;&#x6210;&#x529F;,&#x5C06;&#x4F1A;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x65B0;&#x7684;socket&#x8D44;&#x6E90;&#x7528;&#x4EE5;&#x4EA4;&#x4E92;,&#x5982;&#x679C;&#x662F;&#x4E00;&#x4E2A;&#x591A;&#x4E2A;&#x8FDE;&#x63A5;&#x7684;&#x961F;&#x5217;,&#x53EA;&#x4F1A;&#x5904;&#x7406;&#x7B2C;&#x4E00;&#x4E2A;,&#x5982;&#x679C;&#x6CA1;&#x6709;&#x8FDE;&#x63A5;&#x7684;&#x8BDD;,&#x8FDB;&#x7A0B;&#x5C06;&#x4F1A;&#x88AB;&#x963B;&#x585E;,&#x76F4;&#x5230;&#x8FDE;&#x63A5;&#x4E0A;.&#x5982;&#x679C;&#x7528;set_socket_blocking&#x6216;socket_set_noblock()&#x8BBE;&#x7F6E;&#x4E86;&#x963B;&#x585E;,&#x4F1A;&#x8FD4;&#x56DE;false;&#x8FD4;&#x56DE;&#x8D44;&#x6E90;&#x540E;,&#x5C06;&#x4F1A;&#x6301;&#x7EED;&#x7B49;&#x5F85;&#x8FDE;&#x63A5;&#x3002;
                if (false === $client) {
                    $this-&gt;error([
                        &apos;err_accept&apos;,
                        $err_code = socket_last_error(),
                        socket_strerror($err_code)
                    ]);
                    continue;
                } else {
                    self::connect($client);
                    continue;
                }
            } else {
                // &#x5982;&#x679C;&#x53EF;&#x8BFB;&#x7684;&#x662F;&#x5176;&#x4ED6;&#x5DF2;&#x8FDE;&#x63A5;socket,&#x5219;&#x8BFB;&#x53D6;&#x5176;&#x6570;&#x636E;,&#x5E76;&#x5904;&#x7406;&#x5E94;&#x7B54;&#x903B;&#x8F91;
                $bytes = @socket_recv($socket, $buffer, 2048, 0);
                if ($bytes &lt; 9) {
                    $recv_msg = $this-&gt;disconnect($socket);
                } else {
                    if (!$this-&gt;sockets[(int)$socket][&apos;handshake&apos;]) {
                        self::handShake($socket, $buffer);
                        continue;
                    } else {
                        $recv_msg = self::parse($buffer);
                    }
                }
                array_unshift($recv_msg, &apos;receive_msg&apos;);
                $msg = self::dealMsg($socket, $recv_msg);
                $this-&gt;broadcast($msg);
            }
        }
    }
    /**
     * &#x5C06;socket&#x6DFB;&#x52A0;&#x5230;&#x5DF2;&#x8FDE;&#x63A5;&#x5217;&#x8868;,&#x4F46;&#x63E1;&#x624B;&#x72B6;&#x6001;&#x7559;&#x7A7A;;
     *
     * @param $socket
     */
    public function connect($socket) {
        socket_getpeername($socket, $ip, $port);
        $socket_info = [
            &apos;resource&apos; =&gt; $socket,
            &apos;uname&apos; =&gt; &apos;&apos;,
            &apos;handshake&apos; =&gt; false,
            &apos;ip&apos; =&gt; $ip,
            &apos;port&apos; =&gt; $port,
        ];
        $this-&gt;sockets[(int)$socket] = $socket_info;
        $this-&gt;debug(array_merge([&apos;socket_connect&apos;], $socket_info));
    }
    /**
     * &#x5BA2;&#x6237;&#x7AEF;&#x5173;&#x95ED;&#x8FDE;&#x63A5;
     *
     * @param $socket
     *
     * @return array
     */
    private function disconnect($socket) {
        $recv_msg = [
            &apos;type&apos; =&gt; &apos;logout&apos;,
            &apos;content&apos; =&gt; $this-&gt;sockets[(int)$socket][&apos;uname&apos;],
        ];
        unset($this-&gt;sockets[(int)$socket]);
        return $recv_msg;
    }
    /**
     * &#x7528;&#x516C;&#x5171;&#x63E1;&#x624B;&#x7B97;&#x6CD5;&#x63E1;&#x624B;
     *
     * @param $socket
     * @param $buffer
     *
     * @return bool
     */
    public function handShake($socket, $buffer) {
        // &#x83B7;&#x53D6;&#x5230;&#x5BA2;&#x6237;&#x7AEF;&#x7684;&#x5347;&#x7EA7;&#x5BC6;&#x5319;
        $line_with_key = substr($buffer, strpos($buffer, &apos;Sec-WebSocket-Key:&apos;) + 18);
        $key = trim(substr($line_with_key, 0, strpos($line_with_key, &quot;\r\n&quot;)));
        // &#x751F;&#x6210;&#x5347;&#x7EA7;&#x5BC6;&#x5319;,&#x5E76;&#x62FC;&#x63A5;websocket&#x5347;&#x7EA7;&#x5934;
        $upgrade_key = base64_encode(sha1($key . &quot;258EAFA5-E914-47DA-95CA-C5AB0DC85B11&quot;, true));// &#x5347;&#x7EA7;key&#x7684;&#x7B97;&#x6CD5;
        $upgrade_message = &quot;HTTP/1.1 101 Switching Protocols\r\n&quot;;
        $upgrade_message .= &quot;Upgrade: websocket\r\n&quot;;
        $upgrade_message .= &quot;Sec-WebSocket-Version: 13\r\n&quot;;
        $upgrade_message .= &quot;Connection: Upgrade\r\n&quot;;
        $upgrade_message .= &quot;Sec-WebSocket-Accept:&quot; . $upgrade_key . &quot;\r\n\r\n&quot;;
        socket_write($socket, $upgrade_message, strlen($upgrade_message));// &#x5411;socket&#x91CC;&#x5199;&#x5165;&#x5347;&#x7EA7;&#x4FE1;&#x606F;
        $this-&gt;sockets[(int)$socket][&apos;handshake&apos;] = true;
        socket_getpeername($socket, $ip, $port);
        $this-&gt;debug([
            &apos;hand_shake&apos;,
            $socket,
            $ip,
            $port
        ]);
        // &#x5411;&#x5BA2;&#x6237;&#x7AEF;&#x53D1;&#x9001;&#x63E1;&#x624B;&#x6210;&#x529F;&#x6D88;&#x606F;,&#x4EE5;&#x89E6;&#x53D1;&#x5BA2;&#x6237;&#x7AEF;&#x53D1;&#x9001;&#x7528;&#x6237;&#x540D;&#x52A8;&#x4F5C;;
        $msg = [
            &apos;type&apos; =&gt; &apos;handshake&apos;,
            &apos;content&apos; =&gt; &apos;done&apos;,
        ];
        $msg = $this-&gt;build(json_encode($msg));
        socket_write($socket, $msg, strlen($msg));
        return true;
    }
    /**
     * &#x89E3;&#x6790;&#x6570;&#x636E;
     *
     * @param $buffer
     *
     * @return bool|string
     */
    private function parse($buffer) {
        $decoded = &apos;&apos;;
        $len = ord($buffer[1]) &amp; 127;
        if ($len === 126) {
            $masks = substr($buffer, 4, 4);
            $data = substr($buffer, 8);
        } else if ($len === 127) {
            $masks = substr($buffer, 10, 4);
            $data = substr($buffer, 14);
        } else {
            $masks = substr($buffer, 2, 4);
            $data = substr($buffer, 6);
        }
        for ($index = 0; $index &lt; strlen($data); $index++) {
            $decoded .= $data[$index] ^ $masks[$index % 4];
        }
        return json_decode($decoded, true);
    }
    /**
     * &#x5C06;&#x666E;&#x901A;&#x4FE1;&#x606F;&#x7EC4;&#x88C5;&#x6210;websocket&#x6570;&#x636E;&#x5E27;
     *
     * @param $msg
     *
     * @return string
     */
    private function build($msg) {
        $frame = [];
        $frame[0] = &apos;81&apos;;
        $len = strlen($msg);
        if ($len &lt; 126) {
            $frame[1] = $len &lt; 16 ? &apos;0&apos; . dechex($len) : dechex($len);
        } else if ($len &lt; 65025) {
            $s = dechex($len);
            $frame[1] = &apos;7e&apos; . str_repeat(&apos;0&apos;, 4 - strlen($s)) . $s;
        } else {
            $s = dechex($len);
            $frame[1] = &apos;7f&apos; . str_repeat(&apos;0&apos;, 16 - strlen($s)) . $s;
        }
        $data = &apos;&apos;;
        $l = strlen($msg);
        for ($i = 0; $i &lt; $l; $i++) {
            $data .= dechex(ord($msg{$i}));
        }
        $frame[2] = $data;
        $data = implode(&apos;&apos;, $frame);
        return pack(&quot;H*&quot;, $data);
    }
    /**
     * &#x62FC;&#x88C5;&#x4FE1;&#x606F;
     *
     * @param $socket
     * @param $recv_msg
     *          [
     *          &apos;type&apos;=&gt;user/login
     *          &apos;content&apos;=&gt;content
     *          ]
     *
     * @return string
     */
    private function dealMsg($socket, $recv_msg) {
        $msg_type = $recv_msg[&apos;type&apos;];
        $msg_content = $recv_msg[&apos;content&apos;];
        $response = [];
        switch ($msg_type) {
            case &apos;login&apos;:
                $this-&gt;sockets[(int)$socket][&apos;uname&apos;] = $msg_content;
                // &#x53D6;&#x5F97;&#x6700;&#x65B0;&#x7684;&#x540D;&#x5B57;&#x8BB0;&#x5F55;
                $user_list = array_column($this-&gt;sockets, &apos;uname&apos;);
                $response[&apos;type&apos;] = &apos;login&apos;;
                $response[&apos;content&apos;] = $msg_content;
                $response[&apos;user_list&apos;] = $user_list;
                break;
            case &apos;logout&apos;:
                $user_list = array_column($this-&gt;sockets, &apos;uname&apos;);
                $response[&apos;type&apos;] = &apos;logout&apos;;
                $response[&apos;content&apos;] = $msg_content;
                $response[&apos;user_list&apos;] = $user_list;
                break;
            case &apos;user&apos;:
                $uname = $this-&gt;sockets[(int)$socket][&apos;uname&apos;];
                $response[&apos;type&apos;] = &apos;user&apos;;
                $response[&apos;from&apos;] = $uname;
                $response[&apos;content&apos;] = $msg_content;
                break;
        }
        return $this-&gt;build(json_encode($response));
    }
    /**
     * &#x5E7F;&#x64AD;&#x6D88;&#x606F;
     *
     * @param $data
     */
    private function broadcast($data) {
        foreach ($this-&gt;sockets as $socket) {
            if ($socket[&apos;resource&apos;] == $this-&gt;master) {
                continue;
            }
            socket_write($socket[&apos;resource&apos;], $data, strlen($data));
        }
    }
    /**
     * &#x8BB0;&#x5F55;debug&#x4FE1;&#x606F;
     *
     * @param array $info
     */
    private function debug(array $info) {
        $time = date(&apos;Y-m-d H:i:s&apos;);
        array_unshift($info, $time);
        $info = array_map(&apos;json_encode&apos;, $info);
        file_put_contents(self::LOG_PATH . &apos;websocket_debug.log&apos;, implode(&apos; | &apos;, $info) . &quot;\r\n&quot;, FILE_APPEND);
    }
    /**
     * &#x8BB0;&#x5F55;&#x9519;&#x8BEF;&#x4FE1;&#x606F;
     *
     * @param array $info
     */
    private function error(array $info) {
        $time = date(&apos;Y-m-d H:i:s&apos;);
        array_unshift($info, $time);
        $info = array_map(&apos;json_encode&apos;, $info);
        file_put_contents(self::LOG_PATH . &apos;websocket_error.log&apos;, implode(&apos; | &apos;, $info) . &quot;\r\n&quot;, FILE_APPEND);
    }
}
$ws = new WebSocket(&quot;127.0.0.1&quot;, &quot;8080&quot;);</code></pre><p>HTML&#x90E8;&#x5206;</p><pre><code class="HTML">&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;&lt;/title&gt;
    &lt;meta http-equiv=&quot;content-type&quot; content=&quot;text/html;charset=utf-8&quot;&gt;
    &lt;style&gt;
        p {
            text-align: left;
            padding-left: 20px;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;div style=&quot;width: 800px;height: 600px;margin: 30px auto;text-align: center&quot;&gt;
    &lt;h1&gt;websocket&#x804A;&#x5929;&#x5BA4;&lt;/h1&gt;
    &lt;div style=&quot;width: 800px;border: 1px solid gray;height: 300px;&quot;&gt;
        &lt;div style=&quot;width: 200px;height: 300px;float: left;text-align: left;&quot;&gt;
            &lt;p&gt;&lt;span&gt;&#x5F53;&#x524D;&#x5728;&#x7EBF;:&lt;/span&gt;&lt;span id=&quot;user_num&quot;&gt;0&lt;/span&gt;&lt;/p&gt;
            &lt;div id=&quot;user_list&quot; style=&quot;overflow: auto;&quot;&gt;

            &lt;/div&gt;
        &lt;/div&gt;
        &lt;div id=&quot;msg_list&quot; style=&quot;width: 598px;border:  1px solid gray; height: 300px;overflow: scroll;float: left;&quot;&gt;
        &lt;/div&gt;
    &lt;/div&gt;
    &lt;br&gt;
    &lt;textarea id=&quot;msg_box&quot; rows=&quot;6&quot; cols=&quot;50&quot; onkeydown=&quot;confirm(event)&quot;&gt;&lt;/textarea&gt;&lt;br&gt;
    &lt;input type=&quot;button&quot; value=&quot;&#x53D1;&#x9001;&quot; onclick=&quot;send()&quot;&gt;
&lt;/div&gt;
&lt;/body&gt;
&lt;/html&gt;

&lt;script type=&quot;text/javascript&quot;&gt;
    // &#x5B58;&#x50A8;&#x7528;&#x6237;&#x540D;&#x5230;&#x5168;&#x5C40;&#x53D8;&#x91CF;,&#x63E1;&#x624B;&#x6210;&#x529F;&#x540E;&#x53D1;&#x9001;&#x7ED9;&#x670D;&#x52A1;&#x5668;
    var uname = prompt(&apos;&#x8BF7;&#x8F93;&#x5165;&#x7528;&#x6237;&#x540D;&apos;, &apos;user&apos; + uuid(8, 16));
    var ws = new WebSocket(&quot;ws://127.0.0.1:8080&quot;);
    ws.onopen = function () {
        var data = &quot;&#x7CFB;&#x7EDF;&#x6D88;&#x606F;&#xFF1A;&#x5EFA;&#x7ACB;&#x8FDE;&#x63A5;&#x6210;&#x529F;&quot;;
        listMsg(data);
    };
    /**
     * &#x5206;&#x6790;&#x670D;&#x52A1;&#x5668;&#x8FD4;&#x56DE;&#x4FE1;&#x606F;
     *
     * msg.type : user &#x666E;&#x901A;&#x4FE1;&#x606F;;system &#x7CFB;&#x7EDF;&#x4FE1;&#x606F;;handshake &#x63E1;&#x624B;&#x4FE1;&#x606F;;login &#x767B;&#x9646;&#x4FE1;&#x606F;; logout &#x9000;&#x51FA;&#x4FE1;&#x606F;;
     * msg.from : &#x6D88;&#x606F;&#x6765;&#x6E90;
     * msg.content: &#x6D88;&#x606F;&#x5185;&#x5BB9;
     */
    ws.onmessage = function (e) {
        var msg = JSON.parse(e.data);
        var sender, user_name, name_list, change_type;
        switch (msg.type) {
            case &apos;system&apos;:
                sender = &apos;&#x7CFB;&#x7EDF;&#x6D88;&#x606F;: &apos;;
                break;
            case &apos;user&apos;:
                sender = msg.from + &apos;: &apos;;
                break;
            case &apos;handshake&apos;:
                var user_info = {&apos;type&apos;: &apos;login&apos;, &apos;content&apos;: uname};
                sendMsg(user_info);
                return;
            case &apos;login&apos;:
            case &apos;logout&apos;:
                user_name = msg.content;
                name_list = msg.user_list;
                change_type = msg.type;
                dealUser(user_name, change_type, name_list);
                return;
        }
        var data = sender + msg.content;
        listMsg(data);
    };
    ws.onerror = function () {
        var data = &quot;&#x7CFB;&#x7EDF;&#x6D88;&#x606F; : &#x51FA;&#x9519;&#x4E86;,&#x8BF7;&#x9000;&#x51FA;&#x91CD;&#x8BD5;.&quot;;
        listMsg(data);
    };
    /**
     * &#x5728;&#x8F93;&#x5165;&#x6846;&#x5185;&#x6309;&#x4E0B;&#x56DE;&#x8F66;&#x952E;&#x65F6;&#x53D1;&#x9001;&#x6D88;&#x606F;
     *
     * @param event
     *
     * @returns {boolean}
     */
    function confirm(event) {
        var key_num = event.keyCode;
        if (13 == key_num) {
            send();
        } else {
            return false;
        }
    }
    /**
     * &#x53D1;&#x9001;&#x5E76;&#x6E05;&#x7A7A;&#x6D88;&#x606F;&#x8F93;&#x5165;&#x6846;&#x5185;&#x7684;&#x6D88;&#x606F;
     */
    function send() {
        var msg_box = document.getElementById(&quot;msg_box&quot;);
        var content = msg_box.value;
        var reg = new RegExp(&quot;\r\n&quot;, &quot;g&quot;);
        content = content.replace(reg, &quot;&quot;);
        var msg = {&apos;content&apos;: content.trim(), &apos;type&apos;: &apos;user&apos;};
        sendMsg(msg);
        msg_box.value = &apos;&apos;;
        // todo &#x6E05;&#x9664;&#x6362;&#x884C;&#x7B26;
    }
    /**
     * &#x5C06;&#x6D88;&#x606F;&#x5185;&#x5BB9;&#x6DFB;&#x52A0;&#x5230;&#x8F93;&#x51FA;&#x6846;&#x4E2D;,&#x5E76;&#x5C06;&#x6EDA;&#x52A8;&#x6761;&#x6EDA;&#x52A8;&#x5230;&#x6700;&#x4E0B;&#x65B9;
     */
    function listMsg(data) {
        var msg_list = document.getElementById(&quot;msg_list&quot;);
        var msg = document.createElement(&quot;p&quot;);
        msg.innerHTML = data;
        msg_list.appendChild(msg);
        msg_list.scrollTop = msg_list.scrollHeight;
    }
    /**
     * &#x5904;&#x7406;&#x7528;&#x6237;&#x767B;&#x9646;&#x6D88;&#x606F;
     *
     * @param user_name &#x7528;&#x6237;&#x540D;
     * @param type  login/logout
     * @param name_list &#x7528;&#x6237;&#x5217;&#x8868;
     */
    function dealUser(user_name, type, name_list) {
        var user_list = document.getElementById(&quot;user_list&quot;);
        var user_num = document.getElementById(&quot;user_num&quot;);
        while(user_list.hasChildNodes()) {
            user_list.removeChild(user_list.firstChild);
        }
        for (var index in name_list) {
            var user = document.createElement(&quot;p&quot;);
            user.innerHTML = name_list[index];
            user_list.appendChild(user);
        }
        user_num.innerHTML = name_list.length;
        user_list.scrollTop = user_list.scrollHeight;
        var change = type == &apos;login&apos; ? &apos;&#x4E0A;&#x7EBF;&apos; : &apos;&#x4E0B;&#x7EBF;&apos;;
        var data = &apos;&#x7CFB;&#x7EDF;&#x6D88;&#x606F;: &apos; + user_name + &apos; &#x5DF2;&apos; + change;
        listMsg(data);
    }
    /**
     * &#x5C06;&#x6570;&#x636E;&#x8F6C;&#x4E3A;json&#x5E76;&#x53D1;&#x9001;
     * @param msg
     */
    function sendMsg(msg) {
        var data = JSON.stringify(msg);
        ws.send(data);
    }
    /**
     * &#x751F;&#x4EA7;&#x4E00;&#x4E2A;&#x5168;&#x5C40;&#x552F;&#x4E00;ID&#x4F5C;&#x4E3A;&#x7528;&#x6237;&#x540D;&#x7684;&#x9ED8;&#x8BA4;&#x503C;;
     *
     * @param len
     * @param radix
     * @returns {string}
     */
    function uuid(len, radix) {
        var chars = &apos;0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz&apos;.split(&apos;&apos;);
        var uuid = [], i;
        radix = radix || chars.length;
        if (len) {
            for (i = 0; i &lt; len; i++) uuid[i] = chars[0 | Math.random() * radix];
        } else {
            var r;
            uuid[8] = uuid[13] = uuid[18] = uuid[23] = &apos;-&apos;;
            uuid[14] = &apos;4&apos;;
            for (i = 0; i &lt; 36; i++) {
                if (!uuid[i]) {
                    r = 0 | Math.random() * 16;
                    uuid[i] = chars[(i == 19) ? (r &amp; 0x3) | 0x8 : r];
                }
            }
        }
        return uuid.join(&apos;&apos;);
    }
&lt;/script&gt;</code></pre>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
PHP websocket之聊天室实现

## 原文链接
[https://segmentfault.com/a/1190000016059276](https://segmentfault.com/a/1190000016059276)

