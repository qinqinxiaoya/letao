/**
 * Created by meiqing on 2018/9/14.
 */
$(function () {
    //实现用户点击搜索按钮 跳转到结果页
        //1给搜索按钮添加点击事件
        //2获取用户输入的搜索关键字
        //3判断用户是否输入了搜索关键字
        //4如果用户没有输入 阻止跳转并给出提示
        //5如果用户输入了 跳转到搜索结果页面，并将用户输入关键字带到这个页面
    $('.btn').on('click',function(){
        //获取用户输入的搜索关键字
        var keyword = $(this).siblings('input').val();
        if(keyword){
            keyArr.push(keyword);//将用户输入关键字存在数组中
            localStorage.setItem("keyArr",JSON.stringify(keyArr));

            location.href="search-result.html?keyword="+keyword;
        }else{
            alert("请输入关键字");
        }
    })

    //实现历史关键字存储
        //1 准备一个数组 存储关键字
        //2 当用户点击搜索按钮的时候讲用户输入的关键字追加到数组中
        //3 将数组存储在本地存储中
        //4 在页面一上来的时候 判断本地存储中是否有已经存储的关键字
        //5 将数据和html拼接
    var keyArr =  [];
    if(localStorage.getItem("keyArr")){
        keyArr = JSON.parse(localStorage.getItem("keyArr"));
        console.log(keyArr);
        var html = template("historyTPL",{result:keyArr});
        console.log(html);
        $('.mui-table-view').html(html);
    }
    //实现清空历史
        //1 给元素添加点击事件
        //2 清空页面中的数据 清空本地存储
    $('.clearBtn').on('click', function () {
        $('.history-box').html('');
        localStorage.removeItem("keyArr");
    })
})