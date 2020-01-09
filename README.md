                
                 avchat_server

#**************************************************
#** last     modify   on  2019-12-03   
#** update   by       郭建勇
#** version           V0.1 
#** typeorm  https://typeorm.io/#/select-query-builder
#**************************************************
#install  generator:
  sudo npm install -g express-generator
#taobao org
  npm install -g  xxx  --registry=https://registry.npm.taobao.org
#node自动重启工具nodemon
 npm i   nodemon cross-env --save-dev   --registry=https://registry.npm.taobao.org  


#***************************************************#
#******************AVCHAT SERVER********************#
#Directory specification
*目录说明*

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
		
   [add TypeScript]
        
		.vscode            vscode运行ts的配置
		src                ts主要文件



*部署步骤(测试)*

1:  npm  install 
2： npm  i         	 nodemon cross-env --save-dev   	 --registry=https://registry.npm.taobao.org
3:  npm  i       	 mysql xss --save 
4:  npm  i      	 express-session --save 
5:  npm  i      	 redis connect-redis  --save 
6:	npm  install 	 typescript --save-dev
7:	npm  install 	 ts-node --save-dev
8:	npm  install     -g typescript
9:  npm  install     jsonwebtoken
10: npm  install     @types/jsonwebtoken --save
11: npm  i 			 @types/socket.io  --save 
12: npm  i           svg-captcha --save
*mysql导入*
[login to mysql server]
Mysql> create database avchat;
Mysql> use    avchat;
Mysql> set names utf8;
Mysql> source avchat.sql;

*tslint检查*
[测试开发阶段使用]
1:项目根目录下 新建 build.sh文件
2:
    #!/bin/bash
    /usr/local/node12/bin/tsc -c --build tsconfig.json  
	#本地使用时打开            
    #tsc -c --build tsconfig.json						
    /usr/local/node12/bin/tslint -c tslint.json 'src/**/*.ts'
	#本地使用时打开   
	#tslint -c tslint.json 'src/**/*.ts'


//---------remove PM2------------
0:  npm  install pm2  -g 



*运行指南*

//简单调试（线下调试）
node app.js

//运行 自动重启nodemon（线下环境）
npm  run  dev

//nodemon 运行(线上环境)
npm run prd

//pm2 运行(线上环境)
npm  run  prd-pm2 

