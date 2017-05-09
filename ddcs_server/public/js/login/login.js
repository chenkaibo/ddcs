'use strict';
/*
* author:chenkaibo
* */
$(function () {

    main();
    createCode($("#codeImage"))
    $("#register").click(function () {
        $('#register_form').modal()
    });
    $("#submit").click(function () {
        login();
    })

    $("#reset").click(function () {
        reset()
    })

    function main(){
        //清空所有session
        var sessionObj = window.sessionStorage;
        for(var i in sessionObj)
        {
            window.sessionStorage.removeItem(i);
        }
    }
    /*
     * 校验验证码
     * */
    function checkCode() {
        if($("#checkcode").val() == ""){
            uxAlert("验证码不能为空！");
            return false;
        }
        if($("#checkcode").val().toUpperCase() != $("#codeImage").html().toUpperCase()){
            uxAlert("验证码输入错误！");
            return false;
        };
        return true;
    }

    /*
     * 登录
     */
    function login()
    {

        /*
         * 首先校验验证码
         * */
        var flag = checkCode();

        if(flag){
            var login_Interface = new loginAjaxInterface();  //登录请求接口
            var jsonDataObj = {
                "data" :{"name":"","pwd":""},
                "oper" : "登录系统"
            };
            var username = $("#username").val();
            var pwd = $("#password").val();
            jsonDataObj.data.name = username;
            jsonDataObj.data.pwd = hex_md5(pwd);
            window.sessionStorage.ux_curUserPwd = pwd;
            var jsonDataStr = JSON.stringify(jsonDataObj);
            login_Interface.ajaxRequest(false,jsonDataStr,dealWithLoginData);
        }
    }

    /*
     * 功能：处理登录数据
     */
    function dealWithLoginData(retJson)
    {
        var retjsonStr = JSON.parse(retJson);
        if(retjsonStr.rstcode == "success")
        {
            window.sessionStorage.curUserRole = retjsonStr.data.role;//0:管理员，1:普通用户
            window.sessionStorage.curUserName = retjsonStr.data.name; //用户名
            window.sessionStorage.userHandle = retjsonStr.data.userhandle;//sessionID
            window.location.href="/views/index.html";
        }else{
            uxAlert("请输入正确的用户和密码！");
        }
    }

    /*
     *用户注册
     * */
    function register() {

    }
    /*
     * 取消
     * */
    function cancel()
    {
        window.location.replace("/views/index.html");
    };

    function reset() {
        $("input").val("")
    }
})


