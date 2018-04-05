/**
 * Created by administractor on 2017/10/7.
 */
var webRoot = '';
//ajax
var ajax = function (o) {
    o = o || {};
    o.type = o.type.toUpperCase() || 'POST';
    o.url = o.url || '';
    o.async = o.async || true;
    o.data = o.data || null;
    o.success = o.success || function () {};
    o.error = o.error || function () {};
    var req = null;
    if (XMLHttpRequest) {
        req = new XMLHttpRequest();
    } else {
        req = new ActiveXObject('Microsoft.XMLHTTP');
    }
    var pa = [];
    for (var key in o.data) {
        pa.push(key + '=' + o.data[key]);
    }
    var pd = pa.join('&');
    if (o.type.toUpperCase() === 'POST') {
        req.open(o.type, o.url, o.async);
        req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
        req.send(pd);
    } else if (o.type.toUpperCase() === 'GET') {
        req.open(o.type, o.url + '?' + pd, o.async);
        req.send(null);
    }
    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            if (req.status == 200) {
                o.success(eval("(" + req.responseText + ")"));
            } else {
                o.error(req.xhr, req.status, req.error);
            }
        }
    };
};

//get
var getJson = function (url, callback) {
    var req = null;
    if (XMLHttpRequest) {
        req = new XMLHttpRequest();
    } else {
        req = new ActiveXObject('Microsoft.XMLHTTP');
    }
    req.open('GET', url, true);
    req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
    req.send(null);
    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            if (req.status == 200) {
                callback(eval("(" + req.responseText + ")"));
            }
        }
    };
};
//post
var post = function (url, data, callback) {
    //data:object
    var req = null;
    if (XMLHttpRequest) {
        req = new XMLHttpRequest();
    } else {
        req = new ActiveXObject('Microsoft.XMLHTTP');
    }
    var pa = [];
    for (var key in data) {
        pa.push(key + '=' + data[key]);
    }
    var pd = pa.join('&');
    req.open('POST', url, true);
    req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
    req.send(pd);
    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            if (req.status == 200) {
                callback(eval("(" + req.responseText + ")"));
            }
        }
    };
};
function GetDOM(elId, url) {
    var DOM = document.getElementById(elId);
    DOM.innerHTML = '';
    var frm = document.createElement('iframe');
    frm.setAttribute('id', 'frame');
    frm.src = url;
    frm.frameBorder = '0';
    frm.style.width = '100%';
    frm.style.height = 'calc(100% - 4px)';
    DOM.appendChild(frm);
    if (!url) {
        DOM.innerHTML = '<p style="height:100%;line-height:600px;color:#fff;text-align:center">页面正在制作中，敬请期待...</p>';
    }
}
//获取窗口iframe
function getParentFrame() {
    var frame = window.parent.content.children[0];
    return frame;
}
//本地session
function Session() {
    this.setSession = function (key, value) {
        return sessionStorage.setItem(key, JSON.stringify(value));
    };
    this.getSession = function (key) {
        var value = sessionStorage.getItem(key);
        return JSON.parse(value);
    };
    this.editSession = function (key, value) {
        sessionStorage.setItem(key, JSON.stringify(value));
        return JSON.parse(sessionStorage.getItem(key));
    };
    this.removeSession = function (key) {
        sessionStorage.removeItem(key);
    };
}

//模态窗口
function createModal(title, width, dom, fn) {
    /*
     *width:number 百分比;
     *dom:插入modal中的一段DOM，不包括title和按钮部分;
     *fn:点击确认或OK等，回调函数;
     */
    var body = document.getElementsByTagName('body')[0];
    var modal = document.createElement('div');
    var modalBody = document.createElement('div');
    var modalTitle = document.createElement('div');
    var modalContent = document.createElement('div');
    var modalCtrl = document.createElement('div');
    modal.id = 'modal';
    modalBody.className = 'modalBody';
    modalBody.style.width = width + '%';
    modalTitle.className = 'modalTitle';
    modalTitle.innerHTML = title + '<span onclick="no()"></span>';
    modalContent.className = 'modalContent';
    modalContent.innerHTML = dom;
    modalCtrl.className = 'modalCtrl';
    modalCtrl.innerHTML = '<button type="button" onclick="ok()">确认</button><button type="button" onclick="no()">取消</button>';
    modalBody.appendChild(modalTitle);
    modalBody.appendChild(modalContent);
    modalBody.appendChild(modalCtrl);
    modal.appendChild(modalBody);
    body.appendChild(modal);
    this.ok = function () {
        body.removeChild(modal);
        fn();
    };
    this.no = function () {
        body.removeChild(modal);
    };
}
//折线图
function brokenLine(o) {
    var e = echarts.init(document.getElementById(o.id));
    var option = {
        color: [o.color],
        title: {text: o.title, textStyle: {color: '#fff'}},
        tooltip: {trigger: 'axis'},
        grid: {left: '3%', right: '12%', bottom: '0', containLabel: true},
        xAxis: {
            type: 'category',
            name: o.xName,
            nameTextStyle: {color: o.color},
            splitLine: {show: false},
            axisTick: {show: false},
            axisLine: {lineStyle: {color: o.color}},
            boundaryGap: false,
            data: o.xData
        },
        yAxis: {
            type: 'value',
            name: o.yName,
            max: function (value) {
                value.max = value.max < 4 ? 4 : value.max;
                return ((value.max * 1.5).toFixed(0))
            },
            axisTick: {show: false},
            nameTextStyle: {color: o.color},
            axisLine: {lineStyle: {color: o.color}},
            splitLine: {show: false}
        },
        series: o.data
    };
    e.setOption(option);
}
//柱状图
function setBar(o) {
    var e = echarts.init(document.getElementById(o.id));
    var option = {
        color: [o.color],
        title: {text: o.title, textStyle: {color: '#fff'}},
        tooltip: {trigger: 'axis'},
        grid: {left: '3%', right: '12%', bottom: '0', containLabel: true},
        xAxis: {
            type: 'category',
            name: o.xName,
            nameTextStyle: {color: o.color},
            splitLine: {show: false},
            axisTick: {show: false},
            axisLine: {lineStyle: {color: '#fff'}},
            data: o.xData
        },
        yAxis: {
            type: 'value',
            name: o.yName,
            max: function (value) {
                value.max = value.max < 4 ? 4 : value.max;
                return ((value.max * 1).toFixed(0))
            },
            axisTick: {show: false},
            nameTextStyle: {color: o.color},
            axisLine: {lineStyle: {color: '#fff'}},
            splitLine: {show: false}
        },
        series: o.data
    };
    e.setOption(option);
}





export {
    webRoot,ajax,getJson,post,GetDOM,getParentFrame,
    Session,createModal,brokenLine,setBar
}


