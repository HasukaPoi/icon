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

    $("#gen").click(function () {
        var test = "<html><head><title>test</title></head></html>"
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


    var re = /^.+:\/\/.+$/;
});