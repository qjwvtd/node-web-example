/**
 * Created by Administrator on 2018/4/7/007.
 */
var fs = require('fs');

module.exports = function(app){
    //读取图片
    app.get('/getImgFile',function(req,res){
        //var _img = './../resource/404.jpg';
        //var imgData = fs.readFileSync(_img,'utf-8');
        console.log(__dirname);
    });

    //读取json
    app.get('/getJsonFile',function(req,res){
        //var _json = './../json/testJson.json';
        //var jsonData = fs.readFileSync(_json,'utf-8');
        console.log(__dirname);
    });
};
