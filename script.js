$(document).ready(function () {
    var canvas = document.getElementById('myCanvas')
    var cxt = canvas.getContext("2d")
    var img;

    var inputOne = document.getElementById('fileBk');
    inputOne.onchange = function () {
        var fileList = inputOne.files;
        var file = fileList[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (e) {
            dataUrl = reader.result;
            //加载图片
            img = new Image();
            img.onload = function () {
                drawBk();
            }
            img.src = dataUrl;
        }
    }

    function drawBk() {
        cxt.clearRect(0, 0, canvas.width, canvas.height);
        try {
            var s = canvas.width / img.width > canvas.height / img.height ? canvas.width / img.width : canvas.height / img.height;
            var w = s * img.width;
            var h = s * img.height;
            var x = (canvas.width - w) / 2;
            var y = (canvas.height - h) / 2;
            cxt.drawImage(img, x, y, w, h);
        } catch (err) {
            //如果没有背景图将用这个灰色填充
            cxt.fillStyle = '#cccccc';
            cxt.fillRect(0, 0, canvas.width, canvas.height);
        }
    }

    $('#url').on("input propertychange", function () {
        var re = /^.+:\/\/.*$/;
        if(!re.test(this.value)){
            $(this).next("span").text('URL非法')
            $("#gen").attr("disabled","true")
        }else{
            $(this).next("span").text('')
            $("#gen").removeAttr("disabled")
        }
    });

    $("#gen").click(function () {
        var test = '<html><head><title>‍</title><meta http-equiv="Content-Type" content="text/html;charset=UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" /><meta name="apple-mobile-web-app-capable" content="yes"><meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"><link rel="apple-touch-icon-precomposed" href="[BASE64]"></head><body><a id="jump" href="[URL]"></a><img id="icon" src="[BASE64]" style="margin:auto;position:absolute;width:250px;height:250px;top:0;left:0;bottom:0;right:0;"></img><script type="text/javascript">if (window.navigator.standalone) {var e =document.getElementById("jump");var ev =document.createEvent("MouseEvents");ev.initEvent("click", true, true, document.defaultView, 1, 0, 0, 0, 0, false, false, false, false, 0, null);document.body.style.backgroundColor ="#FFFFFF";setTimeout(function () {e.dispatchEvent(ev);}, 25);}else {var icon =document.getElementById("icon");var frame =document.createElement("iframe");frame.src ="https://ooo.0o0.ooo/2017/05/02/59083bbaefea8.jpeg";frame.style.cssText ="height:auto;width:auto\9;width:100%;";document.body.style.cssText ="height:auto;width:auto\9;width:100%;";document.body.removeChild(icon);document.body.appendChild(frame);}</script></body></html>'
        test=test.replace(/\[BASE64\]/g,canvas.toDataURL("image/jpeg"))
        test=test.replace(/\[URL\]/,$("#url").val())
        console.log(test);
        window.open("data:text/html;base64," + base64encode(test),"","")
    });


    var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    function base64encode(str) {
        var out, i, len;
        var c1, c2, c3;
        len = str.length;
        i = 0;
        out = "";
        while (i < len) {
            c1 = str.charCodeAt(i++) & 0xff;
            if (i == len) {
                out += base64EncodeChars.charAt(c1 >> 2);
                out += base64EncodeChars.charAt((c1 & 0x3) << 4);
                out += "==";
                break;
            }
            c2 = str.charCodeAt(i++);
            if (i == len) {
                out += base64EncodeChars.charAt(c1 >> 2);
                out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
                out += base64EncodeChars.charAt((c2 & 0xF) << 2);
                out += "=";
                break;
            }
            c3 = str.charCodeAt(i++);
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
            out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
            out += base64EncodeChars.charAt(c3 & 0x3F);
        }
        return out;
    }

    
    
});