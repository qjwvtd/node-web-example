/**
 * Created by Administrator on 2018/1/18/018.
 */
import {ajax,Session} from './common';
console.log('login start...');
document.getElementById('loginBtn').onclick = function(){
    var name = document.getElementById('username').value.trim();
    var pwd = document.getElementById('password').value.trim();
    if(checkName(name,pwd)){
        ajax({
            url:'http://localhost:9000/login',
            type:'post',
            data:{'userName':name,'password':pwd},
            success:function(data){
                console.log(data);
                if(data.state == 0){
                    var session = new Session();
                    session.setSession('user',data.data);
                    window.location.href = 'index.html';
                }else{
                    alert(data.data);
                }
            },
            error:function(xhr,state,error){
                console.log(xhr,state,error);
            }
        });
    }
};
function checkName(name,pwd){
    if(!name || name == '' || name.trim().length < 5){
        alert('账号不能为空,不能少于5个字符');
        return false;
    }else if(!pwd || pwd == '' || pwd.trim().length < 6){
        alert('密码不能为空,不能少于6个字符');
    }else{
        return true;
    }
}