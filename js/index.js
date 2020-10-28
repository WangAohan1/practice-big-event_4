$(function(){
    getUser()


    // 点击退出
    $('.exit').on('click',function(e){
e.preventDefault()
        location.href='/login.html'
        console.log(1223);
    })

})

// 封装一个函数
function  getUser(){
    // 获取用户信息
    $.ajax({
        url:'http://ajax.frontend.itheima.net/my/userinfo',
        headers:{
            Authorization:localStorage.getItem('token'),
        },
        success:function(res){
            console.log(res);
            judge(res.data)
        }
    })
}
// 封装一个判断头像的函数
function judge(user){
    // 判断用户是否有管理员名称
    var name =user.nickname ||user.username
    var fristname=name[0].toUpperCase()
    $('.text').html(fristname)
    // 在进行判断如果有照片就显示照片 没有照片就显示span
    if(user.user_pic!==null){
        $('.text').hide()
        $('.layui-nav-img').show().attr('scr',user.user_pic)
    }else{
        $('.text').show()
        $('.layui-nav-img').hide()
    }
}