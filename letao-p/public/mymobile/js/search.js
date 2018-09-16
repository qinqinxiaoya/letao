/**
 * Created by meiqing on 2018/9/14.
 */
$(function () {
    //
        //1给搜索按钮添加点击事件
        //2 获取用户输入关键字
        //3 判断用户是否输入关键字
        //4 如果用户没有输入 阻止跳转
        //5 如果用户输入了 就跳转到搜索结果页面 并将关键字带到搜索结果页面
    $('.btn').on('click',function(){
        var keyword = $(this).siblings('input').val();
        if(keyword){
            keyArr.push(keyword);//用户输入关键字追加到数组中
            localStorage.setItem("keyArr",JSON.stringify(keyArr));
            //将数组存储在本地
            location.href="search-result.html?keyword="+keyword;
        }else{
            alert("请输入商品关键字");
        }
    })

    //实现历史关键字存储
        //1 准备一个存储关键字的数组
        //2 当用户点击搜索按钮的时候将用户输入的关键字追加到数组中
        //3 将数组存储到本地存储中
        //4 在页面一上来时判断本地存储中是否有存储的关键字
        //5 �����ݺ�htmlƴ��
    var keyArr =  [];
    if(localStorage.getItem("keyArr")){
        keyArr = JSON.parse(localStorage.getItem("keyArr"));
        console.log(keyArr);
        var html = template("historyTPL",{result:keyArr});
        console.log(html);
        $('.mui-table-view').html(html);
    }
    //清空历史搜索记录
        //1 ��Ԫ����ӵ���¼�
        //2 ���ҳ���е����� ��ձ��ش洢
    $('.clearBtn').on('click', function () {
        $('.history-box').html('');
        localStorage.removeItem("keyArr");
    })
})