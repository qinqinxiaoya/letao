var keyword = getParamsByUrl(location.href,'keyword');
var page = 1;
var html = "";
var priceSort = 1;
var numSort = 1;
var This = null;
$(function(){
    //根据用户输入的关键字获取搜索结果
    // 1获取到地址栏中用户输入的搜索关键字
    // 2 用关键字去调取搜索接口
    // 3 将搜索结果展示在页面中
    console.log(keyword);
    mui.init({
        pullRefresh : {
          container:'#refreshContainer',//待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
          up : {
            height:50,//可选.默认50.触发上拉加载拖动距离
            auto:true,//可选,默认false.自动上拉加载一次
            contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
            contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
            callback:getData //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
          }//callback 页面一上来的时候就会调用 加载一次
        }
      });
    $("#priceSort").on('tap',function(){
        priceSort = priceSort == 1? 2:1;
        html = "";
        page = 1;
        mui('#refreshContainer').pullRefresh().refresh(true);
        getData();

    });
    $("#numSort").on('tap',function(){
        numSort = numSort == 1? 2:1;
        html = "";
        page = 1;
        mui('#refreshContainer').pullRefresh().refresh(true);
        getData();

    });
});
//获取地址栏参数
//参数1 参数
//参数2 参数名
function getParamsByUrl(url,name){
    var params = url.substr(url.indexOf("?")+1);
    console.log(params);
    var param = params.split('&');//用&将字符串分割为数组
    for(var i = 0; i<param.length;i++) {
        var current = param[i].split('=');
        if(current[0]==name){
            return current[1];
        }
    }
    return null;
}
function getData(){
    if(!This){
        This = this;//搞不清楚的this！！！
    }
    $.ajax({
        url:'/product/queryProduct',
        type:'get',
        data:{
            page:page++,
            pageSize:3,
            proName:keyword,
            price:priceSort,
            num:numSort
        },
        success:function(res){
            // console.log(res);
            if(res.data.length>0){
                html += template('searchTPI',res);
                $('.product ul').html(html);
                //告诉组件当前数据加载完毕
                This.endPullupToRefresh(false);
            }else {
                This.endPullupToRefresh(true);
            }  
        }
    })
}