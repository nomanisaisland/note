在安装MySQL8.0.13的最后一步，配置启动MySQL服务的时候，MySQL启动失败，查看Log日志错误如下：

Attempting to start service MySQL80...
Failed to start service MySQL80.
Waiting until a connection to MySQL Server 8.0.13 can be established (with a maximum of 10 attempts)...
  Retry 1: Attempting to connect to Mysql@localhost:3306 with user root with no password...
MySQL error 1042: Unable to connect to any of the specified MySQL hosts.
MySQL error 1042: Unable to connect to any of the specified MySQL hosts.
Waiting 3 seconds before the next connection attempt...

于是到 我的电脑->右键->管理->服务和应用程序->服务 里面找到MySQL80服务，右键启动，报错如下图：

再到 任务管理器->服务 里面找到MySQL80服务，右键启动服务，则报错如下：


我的MySQL安装环境
MySQL安装环境为：Windows7 64位专业版

故障揣测
由于新装的操作系统，之前出现过权限不足的提示，故首先定位故障为权限问题。由于MySQL80服务在 计算机管理->服务 里面显示户别为：网络服务。


解决步骤
所以为提高网络服务权限，需将网络服务添加到管理员组，步骤如下：

计算机->管理->本地用户和组->组 双击：

双击Administrators
点击添加
点击高级
把 NETWORK SERVICE添加到Administrators组


层层点击确定返回，再启动MySQL80服务就没有任何问题了。
故障解除，启动服务正常
————————————————
版权声明：本文为CSDN博主「爱萨萨」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/wdr2003/article/details/84824870