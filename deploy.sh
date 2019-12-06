#/bin/bash

DEPLOY_PATH=/var/avchat_server
CUR_PATH=`pwd`

function genORMConfig()
{
	touch ormconfig.json
	echo '{' >> ormconfig.json
    	echo '	"type": "mysql",' >> ormconfig.json
    	echo '	"host": "phab.avdance.top",' >> ormconfig.json
    	echo '	"port": 3306,' >> ormconfig.json
    	echo '	"username": "mysqluser",' >> ormconfig.json
    	echo '	"password": "1@3$5^7*",' >> ormconfig.json
    	echo '	"database": "avchat",' >> ormconfig.json
    	echo '	"synchronize": true,' >> ormconfig.json
    	echo '	"logging": false' >> ormconfig.json
    	echo '}' >> ormconfig.json
}

###########################
#     stop service        #
###########################
if [ -d /var/avchat_server/ ]; then

	cd $DEPLOY_PATH
	echo "entry deploy dir [`pwd`]..."

	if [ "X`pwd`" = "X/var/avchat_server" ]; then
		rm -rf /var/avchat_server/*
	fi

	NUM=`ps -ef |grep forever | wc -l`
	if [ -f app.js -a $NUM -ge 2 ]; then
		forever stop app.js
	fi

	echo "Success to stop service!"
else
	echo "service is not running..."
	mkdir -p /var/avchat_server
fi


###########################
# copy js into deploy dir #
###########################
echo "entry $CUR_PATH dir..."
cd $CUR_PATH

#build project
echo "build avchat_server ..."
/usr/local/node12/bin/tsc --build tsconfig.json

#copy js 
echo "copy js into $DEPLOY_PATH ..."
cp -r ./out/* $DEPLOY_PATH/

#copy config
echo "copy config into $DEPLOY_PATH ..."
cp -r ./config $DEPLOY_PATH/

#copy package.json 
echo "copy package.json into $DEPLOY_PATH ..."
cp ./package.json $DEPLOY_PATH/

##########################
#    start service       #
##########################

cd $DEPLOY_PATH
echo "install dependencies ..."
/usr/local/node12/bin/npm install

#generate ormconfig.json
echo "generate ormconfig.json"
genORMConfig

echo "start service ..."
/usr/local/node12/bin/forever start app.js

echo "Success to deploy avchat service!"









