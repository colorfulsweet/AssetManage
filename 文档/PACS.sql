/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     2017/9/26 星期二 下午 12:09:36                    */
/*==============================================================*/


drop table if exists BAODS;

drop table if exists BFXX;

drop table if exists BGDW;

drop table if exists BGR;

drop table if exists CGRK;

drop table if exists DLXX;

drop table if exists LZXX;

drop table if exists PDXX;

drop table if exists RYJS;

drop table if exists RYJSGX;

drop table if exists XTZY;

drop table if exists ZICHAN;

/*==============================================================*/
/* Table: BAODS                                                 */
/*==============================================================*/
create table BAODS
(
   UUID                 varchar(32) not null comment '记录编号',
   fk_zichan_id         varchar(32) comment '资产编码',
   shul                 decimal(10,3) comment '数量',
   unit                 varchar(30) comment '单位',
   fk_bgr_userID        varchar(32) comment '申报人',
   bgsj                 date comment '报告时间',
   fk_zhaopian_id       varchar(32) comment '照片附件',
   dsyy                 varchar(200) comment '丢失原因',
   zgcs                 varchar(400) comment '整改措施',
   tbbz                 varchar(200) comment '提报备注',
   fk_bgr_sprID         varchar(32) comment '审批人',
   spjg                 varchar(30) comment '审批结果',
   spyj                 varchar(30) comment '审批意见',
   primary key (UUID)
);

alter table BAODS comment '报丢失信息';

/*==============================================================*/
/* Table: BFXX                                                  */
/*==============================================================*/
create table BFXX
(
   UUID                 varchar(32) not null comment '报废记录编码',
   fk_zichan_id         varchar(32) comment '资产编码',
   bgsj                 datetime comment '报告时间',
   pzsj                 datetime comment '批准时间',
   shul                 decimal(10,3) comment '数量',
   unit                 varchar(30) comment '单位',
   fk_zhaopian_id       varchar(32) comment '照片',
   fk_bgr_tbrID         varchar(32) comment '提报人',
   bfyy                 varchar(200) comment '报废原因',
   bfyyfx               varchar(400) comment '报废原因分析',
   tbbz                 varchar(30) comment '提报备注',
   fk_bgr_spID          varchar(32) comment '审批人',
   spjg                 varchar(30) comment '审批结果',
   spyj                 varchar(30) comment '审批意见',
   primary key (UUID)
);

alter table BFXX comment '报废信息';

/*==============================================================*/
/* Table: BGDW                                                  */
/*==============================================================*/
create table BGDW
(
   UUID                 varchar(32) not null comment 'id',
   dwID                 varchar(32) comment '单位代码',
   dwmc                 varchar(30) comment '单位名称',
   fuzr                 varchar(32) comment '负责人',
   lxdh                 varchar(30) comment '联系电话',
   ckdz                 varchar(30) comment '仓库地址',
   primary key (UUID)
);

alter table BGDW comment '保管单位';

/*==============================================================*/
/* Table: BGR                                                   */
/*==============================================================*/
create table BGR
(
   UUID                 varchar(32) not null comment 'id',
   user                 varchar(32) not null comment '用户名',
   password             varchar(30) comment '密码',
   dwID                 varchar(30) comment '单位编号',
   lxdh                 varchar(30) comment '联系电话',
   dzyx                 varchar(30) comment '电子邮箱',
   primary key (UUID)
);

alter table BGR comment '保管人';

/*==============================================================*/
/* Table: CGRK                                                  */
/*==============================================================*/
create table CGRK
(
   UUID                 varchar(32) not null comment '入库记录编号',
   fk_zichan_zcID       varchar(32) comment '资产编码',
   rkID                 varchar(32) comment '入库编号',
   rksj                 datetime comment '入库时间',
   fk_bgr_jsrID         varchar(32) comment '经手人',
   shul                 decimal(10,3) comment '数量',
   danw                 varchar(30) comment '单位',
   fk_zhaopian_id       varchar(32) comment '照片',
   cksj                 datetime comment '出库时间',
   primary key (UUID)
);

alter table CGRK comment '采购入库记录';

/*==============================================================*/
/* Table: DLXX                                                  */
/*==============================================================*/
create table DLXX
(
   user                 varchar(30) comment '用户名',
   UUID                 varchar(32) not null comment '登录编号',
   dlzt                 varchar(30) comment '登录状态',
   dlIP                 varchar(30) comment '登录IP',
   dlport               varchar(30) comment '登录端口号',
   dlsj                 datetime comment '登录时间',
   primary key (UUID)
);

alter table DLXX comment '登录信息';

/*==============================================================*/
/* Table: LZXX                                                  */
/*==============================================================*/
create table LZXX
(
   UUID                 varchar(32) not null comment '记录编号',
   biaozhi              varchar(30) comment '发放回收流转标志',
   fk_zichan_zcID       varchar(32) comment '资产编码',
   fk_zhaopian_pzzpURL  varchar(32) comment '凭证照片附件',
   fk_zhaopian_sbzpid   varchar(32) comment '设备照片',
   lzsj                 datetime comment '流转时间',
   fk_bgr_fcrID         varchar(32) comment '发出人编号',
   fk_bgr_jsrID         varchar(32) comment '接受人编号',
   lzbz                 varchar(200) comment '流转备注',
   primary key (UUID)
);

alter table LZXX comment '流转信息';

/*==============================================================*/
/* Table: PDXX                                                  */
/*==============================================================*/
create table PDXX
(
   UUID                 varchar(32) not null comment '盘点记录编码',
   fk_zichan_zcID       varchar(32) comment '资产编码',
   pdsj                 datetime comment '盘点数据',
   fk_bgr_bgrID         varchar(32) comment '保管人',
   shul                 decimal(10,3) comment '数量',
   unit                 varchar(30) comment '单位',
   fk_zhaopian_id       varchar(32) comment '照片',
   pdbz                 varchar(200) comment '盘点备注',
   pdpsjl               varchar(30) comment '盘点审批结论',
   pdps                 varchar(100) comment '盘点批示',
   fk_bgr_sprID         varchar(32) comment '审批人',
   primary key (UUID)
);

alter table PDXX comment '盘点信息';

/*==============================================================*/
/* Table: RYJS                                                  */
/*==============================================================*/
create table RYJS
(
   UUID                 varchar(32) not null comment 'id',
   qxmc                 varchar(32) comment '角色名称',
   qxdj                 varchar(30) comment '权限等级',
   primary key (UUID)
);

alter table RYJS comment '人员角色';

/*==============================================================*/
/* Table: RYJSGX                                                */
/*==============================================================*/
create table RYJSGX
(
   fk_bgr_id            varchar(32) not null comment '保管人ID',
   fk_ryjs_id           varchar(32) not null comment '角色ID'
);

alter table RYJSGX comment '人员角色关系表';

/*==============================================================*/
/* Table: XTZY                                                  */
/*==============================================================*/
create table XTZY
(
   UUID                 varchar(32) not null comment '资源编号',
   zymc                 varchar(32) comment '资源名称',
   gnms                 varchar(30) comment '功能描述',
   zyURL                varchar(32) comment '资源URL',
   fk_ryjs_id           varchar(32) comment '角色编号',
   primary key (UUID)
);

alter table XTZY comment '系统资源';

/*==============================================================*/
/* Table: ZICHAN                                                */
/*==============================================================*/
create table ZICHAN
(
   UUID                 varchar(32) not null comment 'id',
   zcID                 varchar(32) comment '资产编码',
   fk_bgdwID            varchar(32) comment '保管单位编号',
   mingch               varchar(30) comment '名称',
   zcly                 varchar(30) comment '资产来源',
   gys                  varchar(30) comment '供应商',
   dcxmmc               varchar(30) comment '调出项目名称',
   shul                 varchar(30) comment '数量',
   ggxh                 varchar(30) comment '规格型号',
   lbie                 varchar(30) comment '类别',
   ppcj                 varchar(30) comment '品牌厂家',
   danwei               varchar(30) comment '单位',
   danjia               varchar(30) comment '单价',
   zczt                 varchar(32) comment '资产状态',
   primary key (UUID)
);

alter table ZICHAN comment '资产';

