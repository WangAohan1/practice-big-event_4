$(function () {
    $('#goloing').on('click', function () {
        $('.login').hide()
        $('.reglogin').show()
    })
    $('#goreg').on('click', function () {
        $('.login').show()
        $('.reglogin').hide()
    })


    // 进项表校验
    layui.form.verify({
        pass: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        //   在封装一个判断两个纸箱等
        repass: function (value) {
            var repas = $('#regform [name=password]').val()
            if (value !== repas) {
                return '您输入的两次密码不一致'
            }
        }
    })


    // 封装一个函数用来判用户注册
    $('#regform').on('submit', function (e) {
        // console.log(123)
        e.preventDefault()
        var fd = $(this).serialize()
        $.ajax({
            url: 'http://ajax.frontend.itheima.net/api/reguser',
            type: "POST",
            data: fd,
            success: function (res) {
                console.log(res);
                // 如果成功自动跳转到登录页面
                if (res.status !== 0) {
                    return '注册不成功'
                } else {
                    $('.login').show()
                    $('.reglogin').hide()
                    // 如果注册成功的话将值渲染到登录页面上去
                    var ps=$('.reglogin [name=username]').val()
                    var rq=$('.reglogin [name=password]').val()
                    $('.login [name=username]').val(ps)
                    $('.login [name=password]').val(rq)

                }
            }
        })

    })
    // 进行表单登录验证
    $('#logform').on('submit', function (e) {
        e.preventDefault()
        let fd = $(this).serialize()
        $.ajax({
            url: 'http://ajax.frontend.itheima.net/api/login',
            method: 'POST',
            data: fd,
            success: function (res) {
                console.log(res);
                // 如果登录成功就进行跳转在吧token存储到本地
                if (res.status !== 0) {
                    return layui.layer.msg(res.message,{icon: 5})
                }else{
                    location.href='/index.html'
                    localStorage.setItem('token',res.token)
                }

            }
        })
    })

})