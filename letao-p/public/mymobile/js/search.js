/**
 * Created by meiqing on 2018/9/14.
 */
$(function () {
    //ʵ���û����������ť ��ת�����ҳ
        //1��������ť��ӵ���¼�
        //2��ȡ�û�����������ؼ���
        //3�ж��û��Ƿ������������ؼ���
        //4����û�û������ ��ֹ��ת��������ʾ
        //5����û������� ��ת���������ҳ�棬�����û�����ؼ��ִ������ҳ��
    $('.btn').on('click',function(){
        //��ȡ�û�����������ؼ���
        var keyword = $(this).siblings('input').val();
        if(keyword){
            keyArr.push(keyword);//���û�����ؼ��ִ���������
            localStorage.setItem("keyArr",JSON.stringify(keyArr));

            location.href="search-result.html?keyword="+keyword;
        }else{
            alert("������ؼ���");
        }
    })

    //ʵ����ʷ�ؼ��ִ洢
        //1 ׼��һ������ �洢�ؼ���
        //2 ���û����������ť��ʱ���û�����Ĺؼ���׷�ӵ�������
        //3 ������洢�ڱ��ش洢��
        //4 ��ҳ��һ������ʱ�� �жϱ��ش洢���Ƿ����Ѿ��洢�Ĺؼ���
        //5 �����ݺ�htmlƴ��
    var keyArr =  [];
    if(localStorage.getItem("keyArr")){
        keyArr = JSON.parse(localStorage.getItem("keyArr"));
        console.log(keyArr);
        var html = template("historyTPL",{result:keyArr});
        console.log(html);
        $('.mui-table-view').html(html);
    }
    //ʵ�������ʷ
        //1 ��Ԫ����ӵ���¼�
        //2 ���ҳ���е����� ��ձ��ش洢
    $('.clearBtn').on('click', function () {
        $('.history-box').html('');
        localStorage.removeItem("keyArr");
    })
})