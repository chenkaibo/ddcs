/**
 * Created by Administrator on 2017/5/8.
 * 处理站点的数据库操作
 */

var dbOpt = require("../utils/db_conection");
var _dbOpt = new dbOpt();

var siteMgr = (function () {
    var _inst;
    function siteMgrCtrl() {
        return{
            enumSiteListMgr:enumSiteListMgr
        }
    };
    return{
        getInstance:function () {
            if(_inst == undefined){
                _inst = new siteMgrCtrl();
            };
            return _inst;
        }
    };
})();
module.exports = siteMgr;

/*
* 获取站点列表的数据库操作
* */
function enumSiteListMgr(jsonData,callback) {

    if (typeof callback != "function"){
        return;
    };

    var sqlText = "select * from tbl_site;";
    var sqlValue = [];
    _dbOpt.querySql(sqlText,sqlValue,function (err, count, rst) {
          callback(err,rst);
    })
}