/**
 * 用于iqiyi中需要不含水印的截图
 * 原理是利用iqiyi编辑图片时没有水印的特点，在此时将图片转换出来
 *
 * 操作说明：
 * 1. 在需要截取的画面上点击视频右边的截屏，然后点击编辑
 * 2. 此时会生成canvas，执行下面的脚本，脚本会打开一个新的窗口，将图片另存为即可
 */
function getImg() {
  var img = document.getElementById("canvas-warpper").toDataURL();
  if (!img) {
    console.log("no img");
    return;
  }
  var iframe = "<iframe width='100%' height='100%' src='" + img + "' name='" + document.title + "' title='" + document.title + "'></iframe>";
  var x = window.open();
  x.document.open();
  x.document.write(iframe);
  x.document.close();
  x.document.title= document.title.replace('精灵宝可梦', '');
}

getImg();
