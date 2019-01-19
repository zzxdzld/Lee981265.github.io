/*!========================================================================
 *  hexo-theme-snippet: app.js v1.0.0
 * ======================================================================== */
window.onload = function() {
  function cons(){
    var e = "%c";

    var n = "color:red;text-shadow:5px 5px 2px #fff, 5px 5px 2px #373E40, 5px 5px 5px #A2B4BA, 5px 5px 10px #82ABBA;font-weight:bolder;font-size:55px"

    var r = "color:#495A80;text-shadow: 0 1px 0 #ccc,0 2px 0 #c9c9c9,0 1px 0 #bbb;font-size:20px";

    console.info(e + "你好，朋友，欢迎你的来访！", n);

    console.info(e + "前端交流群：635678224 期待你的加入。:-)\r\n", r);
  }

  cons();



    var $body = document.body,
        $mnav = document.getElementById("mnav"), //获取导航三角图标
        $mainMenu = document.getElementById("main-menu"), //手机导航
        $process = document.getElementById('process'), //进度条
        $ajaxImgs = document.querySelectorAll('.img-ajax'), //图片懒加载
        $commentsCounter = document.getElementById('comments-count'),
        $gitcomment = document.getElementById("gitcomment"),
        $backToTop = document.getElementById("back-to-top"),
        $toc = document.getElementById("article-toc"),
        timer = null;

        var a_idx = 0;
        $('body').on('click', function(e) {
          var a = new Array("帅气", "好人","可爱","迷人","美女","(⋌▀¯▀)=☞盘他","I Love You ❤","比心❤","( •́ὤ•̀)","❤记得关注哦","❤我爱你哦","赞一个❤","❤","❤","❤","美丽","漂亮","温柔","善良","贤惠","朴实","纯真","执着","坚强","勇敢","帅气","大方","英俊","潇洒","老实","淳朴","憨厚","天真","单纯","可爱","伟大","超脱","淡定","高贵","俊俏","卓越","不凡","高尚","尊贵","宽容","真诚","坚定","诚实","虚心","谦逊","谨慎","廉洁","无私","正直","慷慨","霸气","俊朗","王者","坚毅","实干","吃苦","耐劳","大气","风度","平和","高深","智慧","刚毅","厚重","宽厚","锐气","风度","稳重","优秀","干练","真诚","敬业","无私","仁义","仗义","豪爽","睿智","刚强","持重","公正","文雅","勇敢","豁达","开朗" ,"富有" ,"专心","勤劳" ,"专注","乐观",'可爱','热心','孝顺','妩媚','丽人','矜持','佳丽','柔美','婉丽','娉婷','婉顺','娇柔','可爱','温柔','体贴','贤惠','高大','英俊','美丽','优雅','活泼','时尚','聪明','能干','健康','勤劳','阳光');






          // var a = new Array("❤记得好评哦❤","❤记得打赏哦❤","❤记得关注哦❤","❤赞一个❤","❤我爱你哦❤");
          var n = $("<span/>").text(a[a_idx]);
          a_idx = (a_idx + 1) % a.length;
          var x = e.pageX,
            y = e.pageY;
          n.css({
            "z-index":"999999999",
            "top": y - 20,
            "left": x,
            "position": "absolute",
            "font-weight": "bold",
            "color": "#ff6651"
            //"color": "rgb("+~~(255*Math.random())+","+~~(255*Math.random())+","+~~(255*Math.random())+")"
          });
          $("body").append(n);
          n.animate({
            "top": y - 180,
            "opacity": 0
          }, 1500, function() {
            n.remove()
          });
        });

    //设备判断
    var isPC = true;
    (function(designPercent) {
        function params(u, p) {
            var m = new RegExp("(?:&|/?)" + p + "=([^&$]+)").exec(u);
            return m ? m[1] : '';
        }
        if (/iphone|ios|android|ipod/i.test(navigator.userAgent.toLowerCase()) == true && params(location.search, "from") != "mobile") {
            isPC = false;
        }
    })();

    //手机菜单导航
    $mnav.onclick = function(){
        var navOpen = $mainMenu.getAttribute("class");
        if(navOpen.indexOf("in") != '-1'){
            $mainMenu.setAttribute("class","collapse navbar-collapse");
        } else {
            $mainMenu.setAttribute("class","collapse navbar-collapse in");
        }
    };

    //首页文章图片懒加载
    function imgsAjax($targetEles) {
        if (!$targetEles) return;
        var _length = $targetEles.length;
        if (_length > 0) {
            var scrollBottom = getScrollTop() + window.innerHeight;
            for (var i = 0; i < _length; i++) {
                (function(index) {
                    var $this = $targetEles[index];
                    var $this_offsetZero = $this.getBoundingClientRect().top + window.pageYOffset - document.documentElement.clientTop;
                    if (scrollBottom >= $this_offsetZero && $this.getAttribute('data-src') && $this.getAttribute('data-src').length > 0) {
                        if ($this.nodeName.toLowerCase() === 'img') {
                            $this.src = $this.getAttribute('data-src');
                            $this.style.display = 'block';
                        } else {
                            var imgObj = new Image();
                            imgObj.onload = function() {
                                $this.innerHTML = "";
                            };
                            imgObj.src = $this.getAttribute('data-src');
                            $this.style.backgroundImage = "url(" + $this.getAttribute('data-src') + ")";
                        }
                        $this.removeAttribute('data-src'); //为了优化，移除
                    }
                })(i);
            }
        }
    }

    //获取滚动高度
    function getScrollTop() {
        return ($body.scrollTop || document.documentElement.scrollTop);
    }
    //滚动回调
    var scrollCallback = function() {
        if ($process) {
            $process.style.width = (getScrollTop() / ($body.scrollHeight - window.innerHeight)) * 100 + "%";
        }
        (isPC && getScrollTop() >= 300) ? $backToTop.removeAttribute("class","hide") : $backToTop.setAttribute("class","hide");
        imgsAjax($ajaxImgs);
    };
    scrollCallback();

    //监听滚动事件
    window.addEventListener('scroll', function() {
        if($toc){
            var top = $toc.offsetTop;
            var left = $toc.offsetLeft;
            var width = $toc.offsetWidth;
            if(getScrollTop() <= top){
                $toc.style = "";
            } else {
                $toc.style.position = "fixed";
                $toc.style.top = "5px";
                $toc.style.left = left + "px";
                $toc.style.width = width + "px"
            }
        }
        clearTimeout(timer);
        timer = setTimeout(function fn() {
            scrollCallback();
        }, 200);
    });

    //返回顶部
	$backToTop.onclick = function() {
	    cancelAnimationFrame(timer);
	    timer = requestAnimationFrame(function fn() {
	        var sTop = getScrollTop();
	        if (sTop > 0) {
	            $body.scrollTop = document.documentElement.scrollTop = sTop - 50;
	            timer = requestAnimationFrame(fn);
	        } else {
	            cancelAnimationFrame(timer);
	        }
	    });
	};


};
