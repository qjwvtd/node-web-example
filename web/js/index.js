/*
 * 2018/2/6
 * administractor
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import {getJson,post,Session} from './common';



//init user
initUserInfo();
function initUserInfo(){
    var session = new Session();
    var userInfo = session.getSession('user');
    if(userInfo == 'null' || userInfo == undefined || userInfo == ''){
        window.location.href = 'login.html';
    }
}
//head component
class Header extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            logo:'',
            appName:'',
            mainList:''
        };
    }
    componentDidMount(){
        var _url = './../js/json/navigation.json';
        getJson(_url,data => {
            //console.log(data);
            this.setState({
                logo:data.logo,
                appName:data.appName,
                mainList:data.mainNav
            });
        });
    }
    render(){
        var img = this.state.logo;
        var name = this.state.appName;
        var session = new Session();
        var user = session.getSession('user');
        if(this.state.mainList.length > 0){
            var li = this.state.mainList.map((item,index) => {
                var defaultActive = index == 0 ? 'active' : '';
                return (
                    <li className={defaultActive} key={index} onClick={() => {navCall(item)}}><a>{item.name}</a></li>
                );
            });
        }
        return (
            <div className="top">
                <div className="logo"><a><img src={img} />{name}</a></div>
                <div className="mainNav"><ul>{li}</ul></div>
                <div className="other">
                    <span className="user">欢迎，<b id="userName">{user.nickname ? user.nickname :''}</b></span>
                    <span><a id="exit" href={user ? 'login.html' : 'login.html'}>{}</a></span>
                </div>
            </div>
        );
    }
}
//挂载header
ReactDOM.render(
    <Header />,
    document.getElementById('header')
);

function navCall(item){
    var thisJson = JSON.stringify(item);
    console.log(thisJson);
    alert(thisJson);
}


document.getElementById('getAllUser').onclick = function(){
    getJson('/getUserInfo',data => {
        document.getElementById('showAllUser').innerText  = JSON.stringify(data);
    });
}
document.getElementById('getAllUser1').onclick = function(){
    getJson('/getHttpResultApiData',data => {
        document.getElementById('showAllUser1').innerText  = JSON.stringify(data);
    });
}
document.getElementById('submitUser').onclick = function(){
    var _num = document.getElementById('user').value;
    var _size = document.getElementById('password').value;
    var _data = {'pageNum':_num,'pageSize':_size};
    console.log(JSON.stringify(_data));
    post('/postHttpResultApiData',_data,data => {
        document.getElementById('showSubmitInfo').innerText  = JSON.stringify(data);
    });
}

