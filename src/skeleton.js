export default function () {
    var yskeletons = document.querySelectorAll('.yskeleton');

    yskeletons.forEach(function (item) {

        /*  type
            0:段落模式
            1:用户卡片
            2.普通卡片
            3.用户段落
        */
        var type = 0;
        // item.setAttribute('style', 'position:relative');


        var elCover = document.createElement('div');
        elCover.setAttribute('class', 'yskeleton-cover');



        // 行数
        var elLineWrap = document.createElement('div');
        elLineWrap.setAttribute('class', 'yskeleton-line-wrap')
        var row = 0;
        var lineHtml = ''

        var className = item.getAttribute('class');
        console.log(className.indexOf('user-card'))
        if (className.indexOf('user-card') > 0) {
            console.log('执行了')
            type = 1;
            elCover.innerHTML = ('<div class="yskeleton-user"></div>')
            lineHtml = '<div class="yskeleton-line small"></div> <div class="yskeleton-line small"></div>'

        } else if (className.indexOf('card') > 0) {
            type = 2
            elCover.innerHTML = ('<div class="yskeleton-card"></div>')
            lineHtml = '<div class="yskeleton-line small"></div> <div class="yskeleton-line small"></div>'

        } else if (className.indexOf('user') > 0) {
            type = 3
            elCover.innerHTML = ('<div class="yskeleton-user"></div>')
            lineHtml = '<div class="yskeleton-line user"></div>'
            row = Number(item.getAttribute('row')) || 0;
        } else {
            row = Number(item.getAttribute('row')) || 0;
        }


        for (var i = 0; i < row; i++) {
            lineHtml += '<div class="yskeleton-line"></div>'
        }

        elLineWrap.innerHTML = lineHtml;

        elCover.appendChild(elLineWrap);
        item.appendChild(elCover)
    })
}