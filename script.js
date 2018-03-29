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


    var re=/^.+:\/\/.+$/;
});