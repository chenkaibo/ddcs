/**
 * Created by Administrator on 2017/5/8.
 */
/*
* 处理用户操作的service
* */
var dbOpt = require("../utils/db_conection");
var userDao = require("./user_dao");
var api = require("../utils/api");

/*
* 用于用户操作处理的函数
* */
var userOperFunc = {
    enumUserList : enumUserList,
    createUser : createUser,
    modifyUser : modifyUser,
    queryUser : queryUser,
    deleteUser : deleteUser,
    showUserInfo : showUserInfo,
};

var rtRes = {
    rstcode:"error",
    desc:"",
    data:{}
};

function triggerFunction(jsonData,callback) {
    if (typeof callback != "function"){
        return;
    }
    var mainRequest = jsonData.request.mainRequest;
    var operFunc = userOperFunc[mainRequest];

    if(typeof operFunc != "function")
    {
        callback(JSON.stringify(rtRes));
    }
    else
    {
        operFunc(jsonData,callback);
    }
}
exports.triggerFunction = triggerFunction;

/*
* 获取用户列表
* */
function enumUserList(jsonData,callback) {
    if(typeof callback != "function"){
        return;
    };

    userDao.getInstance().enumUserListMgr(jsonData,function (err,rst) {
        if(err){
            rtRes.desc = err.detail;
        }else {
            rtRes.rstcode = "success";
            rtRes.data = rst;
        };
        callback(JSON.stringify(rtRes));
    })
};
/*
* 创建的用户的service
* */
function createUser(jsonData,callback) {
    if (typeof callback != "function"){
        return;
    };

    jsonData.data.createtime = api.formatDate(new Date());
    jsonData.data.lastmodtime = api.formatDate(new Date());
    userDao.getInstance().createUserMgr(jsonData,function (error) {
        if(error)
        {
            console.log("[execSql adduser]:" + error.detail+"--errorCode:"+error.code+":errorConstraint:"+error.constraint);
            if(error.code == '23505' && error.constraint == 'tbl_user_pkey'){
                rtRes.desc = "该用户已存在！";
            }else{
                rtRes.desc = "添加失败！";
            };
            callback(JSON.stringify(rtRes));
        }
        else
        {
            rtRes.rstcode = "success";
            callback(JSON.stringify(rtRes));
        };
    })
};
function modifyUser(jsonData,callback) {
    if(typeof callback != "function"){
        return;
    };
    jsonData.data.oldpwd = api.createmd5(jsonData.data.oldpwd);
    jsonData.data.newpwd = api.createmd5(jsonData.data.newpwd);
    userDao.getInstance().modifyUserMgr(jsonData,function (err,count) {
        if(err){
            rtRes.desc = err.detail;
        }else if(count ==0){
            rtRes.desc = "密码输入错误！"
        }else {
            rtRes.rstcode = "success";
        };
        callback(JSON.stringify(rtRes));
    })
};
/*
* 删除用户信息
* */
function deleteUser(jsonData,callback) {
    if(typeof callback != "function"){
        return;
    };
    userDao.getInstance().deleteUserMgr(jsonData,function (err) {
        if(err){
            rtRes.desc = err.detail;
        }else {
            rtRes.rstcode = "success";
        };
        callback(JSON.stringify(rtRes));
    })
};
function showUserInfo(jsonData,callback) {
    if(typeof callback != "function"){
        return
    };
    userDao.getInstance().showUserInfoMgr(jsonData,function (err,rst) {
        if(err){
            rtRes.desc = err.detail;
        }else {
            rtRes.rstcode = "success";
            rtRes.data = rst;
        };
        callback(JSON.stringify(rtRes));
    })
};
/*
* 用户查询
* */
function queryUser(jsonData,callback) {
    if(typeof callback != "function"){
        return;
    };
    userDao.getInstance().queryUserMgr(jsonData,function (err,rst) {
        if(err){
            rtRes.desc = err.detail;
        }else {
            rtRes.rstcode = "success";
            rtRes.data = rst;
        };
        callback(JSON.stringify(rtRes));
    })
}
