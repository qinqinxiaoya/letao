/**
 * Created by meiqing on 2018/9/13.
 */
$(function(){
    $.ajax({
        url:'/category/queryTopCategory',
        type:'get',
        success:function(res){
            //console.log(res);
            var html = template("categoryTmp",{data:res.rows});
            $(".categories").html(html);
            //获取完一级分类后有数据 同时获取第一个一级分类id 再获取二级分类数据
            if(res.rows.length){
                $('#links').find('a').eq(0).addClass('active');
                var id = res.rows[0].id;
                $.ajax({
                    url:'/category/querySecondCategory',
                    type:'get',
                    data:{id:id},
                    success:function(res){
                        //console.log(res);
                        var h = template("category-second",res);
                        $(".cate-pro ul").html(h);
                    }
                })

            }
        }
    })
    $("#links").on('click','a',function(){
        var id = $(this).attr('data-id');
        $(this).addClass('active').siblings().removeClass('active');
        //获取当前id数据
        //console.log(id);
        $.ajax({
            url:'/category/querySecondCategory',
            type:'get',
            data:{id:id},
            success:function(res){
                //console.log(res);
                var h = template("category-second",res);
                $(".cate-pro ul").html(h);
            }
        })
    })
})