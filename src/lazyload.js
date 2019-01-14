export default function () {
    // 获取所有的图片标签
    var imgs = document.querySelectorAll('img.ylazy');

    function findSkeleton(node) {

      
        // if (node.tagName ) {
        //     return false
        // }


        // if (cls.indexOf('yskeleton') > 0) {
        //     return node
        // }
        // console.log(node,node.tagName)

        if (node.tagName==='BODY') {
            return false
        } else {
            var cls = node.getAttribute('class');
            if (cls&&cls.indexOf('yskeleton') > 0) {
                return node
            }
            return findSkeleton(node.parentNode);
        }
        // console.log(node.tagName,cls)

    }

    imgs.forEach(function (img) {
       var b= findSkeleton(img)
       console.log(b)
    })
    // 获取可视区域的高度
    const viewHeight = window.innerHeight || document.documentElement.clientHeight
    // num用于统计当前显示到了哪一张图片，避免每次都从第一张图片开始检查是否露出
    let num = 0

    function lazyload() {
        // console.log(imgs)
        for (let i = num; i < imgs.length; i++) {
            // 用可视区域高度减去元素顶部距离可视区域顶部的高度
            let distance = viewHeight - imgs[i].getBoundingClientRect().top
            // 如果可视区域高度大于等于元素顶部距离可视区域顶部的高度，说明元素露出

            if (distance >= 0) {
                //给元素写入真实的src，展示图片
                imgs[i].src = imgs[i].getAttribute('data-src');
                imgs[i].setAttribute('class', 'ylazy loaded')
                //前i张图片已经加载完毕，下次从第i+1张开始检查是否露出
                imgs[i].onload = (function (t) {
                    console.log(t)
                })(i);
                num = i + 1
            }
        }
    };
    // 监听Scroll事件
    window.addEventListener('scroll', lazyload, false);
    // 优先首屏可是区域执行一次
    lazyload()
}