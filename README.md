#avchat_server
#************************************************
#** last   modify  on  2019-11-21   
#** update by      郭建勇
#************************************************
#install  generator:
  sudo npm install -g express-generator

#taobao org
  npm install -g  xxx  --registry=https://registry.npm.taobao.org
#node自动重启工具nodemon
 npm i   nodemon cross-env --save-dev   --registry=https://registry.npm.taobao.org  
#run process
  npm install & npm start
  & npm run dev (加载nodemon) 

#***************************************************
#******************AVCHAT SERVER********************
#Directory specification
avchat_server --
 		-bin                   运行程序
		-conf		       全局配置文件
		-controller            控制器(业务逻辑)
		-db                    缓存/数据库配置
		-logs                  运行日志存放
		-middleware            中间件业务功能
		-model                 数据库的常用操作及配置
		-public		       静态资源目录 
		-routes		       对各个路由做处理的代码逻辑
		-utils		       全局工具类
		-views		       类似于ejs这样的模板文件（前后端分离）

部署步骤：
1： npm  i    nodemon cross-env --save-dev   --registry=https://registry.npm.taobao.org
2:  npm  run  dev

