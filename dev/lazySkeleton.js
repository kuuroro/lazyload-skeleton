var lazySkeleton = (function () {
  'use strict';

  function styleInject(css, ref) {
    if ( ref === void 0 ) ref = {};
    var insertAt = ref.insertAt;

    if (!css || typeof document === 'undefined') { return; }

    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';

    if (insertAt === 'top') {
      if (head.firstChild) {
        head.insertBefore(style, head.firstChild);
      } else {
        head.appendChild(style);
      }
    } else {
      head.appendChild(style);
    }

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  }

  var css = ".img {\r\n\r\n            background: linear-gradient(90deg, #f2f2f2 25%, #e6e6e6 37%, #f2f2f2 63%);\r\n            animation: loading 1.4s ease infinite;\r\n            background-size: 400% 100%;\r\n            width: 200px;\r\n            height: 100px;\r\n            display: inline-block;\r\n        }\r\n\r\n        .ylazy {\r\n            background: linear-gradient(90deg, #f2f2f2 25%, #e6e6e6 37%, #f2f2f2 63%);\r\n            animation: loading 1.4s ease infinite;\r\n            background-size: 400% 100%;\r\n            width: 200px;\r\n            height: 100px;\r\n            display: inline-block;\r\n        }\r\n\r\n        .ylazy.yskeleton {}\r\n\r\n        .ylazy.loaded {\r\n            background: none;\r\n            animation: none;\r\n        }\r\n\r\n\r\n        @keyframes loading {\r\n            0% {\r\n                background-position: 100% 50%;\r\n            }\r\n\r\n            100% {\r\n                background-position: 0 50%;\r\n            }\r\n        }\r\n\r\n\r\n\r\n\r\n\r\n        .yskeleton {\r\n            overflow: hidden;\r\n            /* border: 1px solid #f2f2f2 */\r\n        }\r\n\r\n        .yskeleton.card {\r\n            /* overflow: hidden; */\r\n            /* min-width: 200px; */\r\n            width: 140px;\r\n            display: inline-block;\r\n        }\r\n\r\n        .yskeleton.user-card {\r\n            width: 140px;\r\n            display: inline-block;\r\n\r\n        }\r\n\r\n\r\n        .yskeleton-line.user {\r\n            margin: 15px 0;\r\n            max-width: 80%;\r\n        }\r\n\r\n        .yskeleton-cover {\r\n            width: 100%;\r\n            overflow: hidden;\r\n            box-sizing: border-box;\r\n            padding: 10px;\r\n            display: flex;\r\n        }\r\n\r\n        .yskeleton.card .yskeleton-cover,\r\n        .yskeleton.user-card .yskeleton-cover {\r\n            flex-direction: column;\r\n        }\r\n\r\n\r\n\r\n        .yskeleton-user {\r\n            width: 50px;\r\n            height: 50px;\r\n            background: linear-gradient(90deg, #f2f2f2 25%, #e6e6e6 37%, #f2f2f2 63%);\r\n            animation: loading 1.4s ease infinite;\r\n            background-size: 400% 100%;\r\n            border-radius: 50%;\r\n            margin-right: 10px;\r\n            /* flex: 1; */\r\n        }\r\n\r\n        .yskeleton.user-card .yskeleton-user {\r\n            margin: 0 auto;\r\n            width: 100px;\r\n            height: 100px;\r\n            margin: 10px auto 20px;\r\n        }\r\n\r\n        .yskeleton-line-wrap {\r\n            /* overflow: hidden; */\r\n            flex: 1\r\n        }\r\n\r\n        .yskeleton-line {\r\n            background: linear-gradient(90deg, #f2f2f2 25%, #e6e6e6 37%, #f2f2f2 63%);\r\n            animation: loading 1.4s ease infinite;\r\n            background-size: 400% 100%;\r\n            height: 20px;\r\n            margin: 10px 0;\r\n        }\r\n\r\n        .yskeleton-line.small {\r\n            height: 14px;\r\n            margin: 5px 0\r\n        }\r\n\r\n        .yskeleton-card {\r\n            width: 100%;\r\n            padding-bottom: 100%;\r\n            background: linear-gradient(90deg, #f2f2f2 25%, #e6e6e6 37%, #f2f2f2 63%);\r\n            animation: loading 1.4s ease infinite;\r\n            background-size: 400% 100%;\r\n            margin: 0 auto 10px;\r\n        }\r\n\r\n\r\n        .yskeleton .content {\r\n            display: none;\r\n        }\r\n\r\n        .yskeleton.loaded .content {\r\n            display: block;\r\n        }\r\n\r\n        .yskeleton .yskeleton-cover {\r\n            display: flex;\r\n        }\r\n\r\n        .yskeleton.loaded .yskeleton-cover {\r\n            display: none;\r\n        }";
  styleInject(css);

  function lazyLoad () {
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
         var b= findSkeleton(img);
         console.log(b);
      });
      // 获取可视区域的高度
      const viewHeight = window.innerHeight || document.documentElement.clientHeight;
      // num用于统计当前显示到了哪一张图片，避免每次都从第一张图片开始检查是否露出
      let num = 0;

      function lazyload() {
          // console.log(imgs)
          for (let i = num; i < imgs.length; i++) {
              // 用可视区域高度减去元素顶部距离可视区域顶部的高度
              let distance = viewHeight - imgs[i].getBoundingClientRect().top;
              // 如果可视区域高度大于等于元素顶部距离可视区域顶部的高度，说明元素露出

              if (distance >= 0) {
                  //给元素写入真实的src，展示图片
                  imgs[i].src = imgs[i].getAttribute('data-src');
                  imgs[i].setAttribute('class', 'ylazy loaded');
                  //前i张图片已经加载完毕，下次从第i+1张开始检查是否露出
                  imgs[i].onload = (function (t) {
                      console.log(t);
                  })(i);
                  num = i + 1;
              }
          }
      }    // 监听Scroll事件
      window.addEventListener('scroll', lazyload, false);
      // 优先首屏可是区域执行一次
      lazyload();
  }

  function skeleton () {
      var yskeletons = document.querySelectorAll('.yskeleton');

      yskeletons.forEach(function (item) {
          // item.setAttribute('style', 'position:relative');


          var elCover = document.createElement('div');
          elCover.setAttribute('class', 'yskeleton-cover');



          // 行数
          var elLineWrap = document.createElement('div');
          elLineWrap.setAttribute('class', 'yskeleton-line-wrap');
          var row = 0;
          var lineHtml = '';

          var className = item.getAttribute('class');
          console.log(className.indexOf('user-card'));
          if (className.indexOf('user-card') > 0) {
              console.log('执行了');
              elCover.innerHTML = ('<div class="yskeleton-user"></div>');
              lineHtml = '<div class="yskeleton-line small"></div> <div class="yskeleton-line small"></div>';

          } else if (className.indexOf('card') > 0) {
              elCover.innerHTML = ('<div class="yskeleton-card"></div>');
              lineHtml = '<div class="yskeleton-line small"></div> <div class="yskeleton-line small"></div>';

          } else if (className.indexOf('user') > 0) {
              elCover.innerHTML = ('<div class="yskeleton-user"></div>');
              lineHtml = '<div class="yskeleton-line user"></div>';
              row = Number(item.getAttribute('row')) || 0;
          } else {
              row = Number(item.getAttribute('row')) || 0;
          }


          for (var i = 0; i < row; i++) {
              lineHtml += '<div class="yskeleton-line"></div>';
          }

          elLineWrap.innerHTML = lineHtml;

          elCover.appendChild(elLineWrap);
          item.appendChild(elCover);
      });
  }

  window.addEventListener('load', function () {
      lazyLoad();
      skeleton();
  });

  var lazySkeleton;

  return lazySkeleton;

}());
