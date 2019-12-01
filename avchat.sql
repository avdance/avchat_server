/*
Navicat MySQL Data Transfer

Source Server         : 127.0.0.1
Source Server Version : 50553
Source Host           : localhost:3306
Source Database       : midland

Target Server Type    : MYSQL
Target Server Version : 50553
File Encoding         : 65001

Date: 2019-11-30 16:17:48
*/

-- ----------------------------------------
-- Table structure for avchat_user_base_info 用户信息表
-- ---------------------------------------
DROP TABLE IF EXISTS `avchat_user_base_info`;
CREATE TABLE `avchat_user_base_info` (
  `uid` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `user_name` varchar(20) NOT NULL COMMENT '用户名', 
  `password` varchar(20) NOT NULL  COMMENT '密码',
  `gender` int(2) unsigned DEFAULT 0 COMMENT '性别', 
  `nice_name` varchar(20) NOT NULL COMMENT '昵称',
  `header_image` varchar(64) DEFAULT NULL COMMENT '头像',
  `login_status` int(10) unsigned NOT NULL COMMENT '登陆状态',
  `status` int(10) NOT NULL DEFAULT 0 COMMENT '用户状态',
  `table_name` varchar(20)  NULL COMMENT '好友信息对应表',
  `createtime` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '创建时间',
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT COMMENT='用户信息表';

-- --------------------------------
-- Table structure for avchat_user_detail_info
-- update  by  Autor on date
-- ------------------------------- 
DROP TABLE IF EXISTS `avchat_user_detail_info`;
CREATE TABLE `avchat_user_detail_info` (
  `uid` int(10) unsigned NOT NULL COMMENT 'ID',
  `user_name` varchar(20) NOT NULL COMMENT '用户名',
  `gender` int(2) unsigned DEFAULT 0 COMMENT '性别', 
  `nice_name` varchar(20) NOT NULL COMMENT '昵称',
  `real_name` varchar(20) DEFAULT NULL COMMENT '真实姓名',
  `age` int(10) unsigned DEFAULT 0  COMMENT '年龄',
  `birthday` datetime DEFAULT NULL COMMENT '生日',
  `selfsign` varchar(50) DEFAULT NULL COMMENT '个性签名',
  `company` varchar(20) DEFAULT NULL COMMENT '公司',
  `job_title` varchar(20) DEFAULT NULL COMMENT '职业',
  `area` varchar(20) DEFAULT NULL COMMENT '地址',
  `hometown` varchar(20) DEFAULT NULL COMMENT '家庭地址',
  `mobile` varchar(11) NOT NULL COMMENT '手机号码',
  `email` varchar(20) DEFAULT NULL COMMENT '邮箱',
   `person_info` varchar(50) DEFAULT NULL COMMENT '个人信息',
   `header_image` varchar(64) DEFAULT NULL COMMENT '头像',
   `qrcode_image` varchar(64) DEFAULT NULL COMMENT '二维码信息',
   `expend1` varchar(20) DEFAULT NULL COMMENT '拓展字段1',
   `expend2` varchar(20) DEFAULT NULL COMMENT '拓展字段2',
   PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT COMMENT='用户详细信息表';

-- --------------------------------
-- Table structure for avchat_user_friends
-- update  by  Autor on date
-- ------------------------------- 
DROP TABLE IF EXISTS `avchat_user_friends`;
CREATE TABLE `avchat_user_friends` (
  `uid` int(10) unsigned NOT NULL COMMENT 'ID' ,
  `nice_name` varchar(20) NOT NULL COMMENT '好友昵称',
  `label` varchar(20) NOT NULL COMMENT '好友标签',
  `gender` int(2) unsigned DEFAULT 0 COMMENT '好友性别', 
  `age` int(10) unsigned DEFAULT 0 COMMENT '好友年龄',
  `header_image` varchar(64) DEFAULT NULL COMMENT '好友头像',
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT COMMENT='好友列表';

-- --------------------------------
-- Table structure for avchat_group_info
-- update  by  Autor on date
-- ------------------------------- 
DROP TABLE IF EXISTS `avchat_group_info`;
CREATE TABLE `avchat_group_info` (
  `cid` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID' ,
  `name` varchar(20) NOT NULL COMMENT '群组名称',
  `type` int(10) unsigned NOT NULL COMMENT '群组类型',
  `creator` int(10) unsigned NOT NULL COMMENT '创建者uid',
  `use_paswd` int(2) unsigned NOT NULL COMMENT '是否有密码',
  `passwd` int(10) unsigned  NULL  COMMENT  '群组密码',
  `createtime` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '创建时间',
  `expend1` varchar(20) DEFAULT NULL COMMENT '拓展字段1',
  `expend2` varchar(20) DEFAULT NULL COMMENT '拓展字段2',
   PRIMARY KEY (`cid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT COMMENT='群组信息表';

-- --------------------------------
-- Table structure for avchat_user_group_relation
-- update  by  Autor on date
-- -------------------------------
DROP TABLE IF EXISTS `avchat_user_group_relation`;
CREATE TABLE `avchat_user_group_relation` (
  `cid` int(10) unsigned NOT NULL COMMENT 'ID' ,
  `uid`  int(10)  NOT NULL COMMENT '用户ID',
  `jointime` int(11) unsigned NOT NULL DEFAULT 0 COMMENT '创建时间',
   PRIMARY KEY (`cid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT COMMENT='用户群组关联表';

-- --------------------------------
-- Table structure for avchat_login_record
-- update  by  Autor on date
-- ------------------------------- 
DROP TABLE IF EXISTS `avchat_login_record`;
CREATE TABLE `avchat_login_record` (
  `uid` int(10) unsigned NOT NULL COMMENT 'ID' ,
  `ip` varchar(20) NOT NULL COMMENT "终端IP",
  `terminal_type` int(10) unsigned NOT NULL COMMENT '终端类型',
  `terminal_info` int(64) unsigned NOT NULL COMMENT '终端信息',
  `header_image` varchar(64) DEFAULT NULL COMMENT '用户头像',
  `logintime` varchar(10) DEFAULT NULL COMMENT   '最后登陆时间',
  `expend1` varchar(20) DEFAULT NULL COMMENT '拓展字段1',
  `expend2` varchar(20) DEFAULT NULL COMMENT '拓展字段2',
   PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT COMMENT='用户登陆记录表';