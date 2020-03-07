/* created by CoolGuy on 2020/3/6 */
/**
 * 获取Pinterest指定pin图下所有的图片的高清链接地址
 * 目前的机制是利用指定类（.Yl-.MIw.Hb7）下的img的srcset属性中最后一个（4x）是原图的特点，
 * 拿到img后直接取出srcset取最后一个从而得到图片的原图地址
 * 由于Pinterest是动态加载数据的，并且每加载下一页，会清除掉前面的部分，所以这里采用了手动滚屏的方式，
 * 每次滚动屏幕时去获取一次，最后做一次去重处理，
 *
 * 操作说明：
 * 1. 复制下面代码到控制台即可 （如果只需要首屏，只需要getImg方法，所以直接调用getImg即可）
 * 2. 等待数秒后，从控制台拿到URL链接，复制到下载软件中即可
 *
 *
 * @returns {string[]}
 */
// 自用，pinterest的图片获取
function getImg(){
    return Array.from(document.querySelectorAll('.Yl-.MIw.Hb7 img')).map(img=>{
        const {srcset} = img;
        const urls = srcset.split(',');

        const len = urls.length;
        const lastUrl = urls[len-1];

        const realUrls = lastUrl.trim().split(' ');
        const realUrl = realUrls[0];
        return realUrl;
    })
}
// getImg().join('\n')

function getUrls(){
    return new Promise((resolve=>{
        const {clientHeight} = document.documentElement;
        const scrollH = clientHeight;
        let arr = [];
        let time = 1;
        const timer = setInterval(()=>{
            const imgs = getImg();
            arr = [
                ...arr,
                ...imgs,
            ]
            console.log(time, arr.length, document.documentElement.scrollTop, document.documentElement.scrollHeight);
            if(document.documentElement.scrollTop < document.documentElement.scrollHeight-clientHeight){
                window.scroll(0, scrollH* time);
            }else{
                clearInterval(timer);
                resolve(new Set(arr))
            }
            time++;


        },1000)
    }))

}
getUrls().then(arr=>{
    console.log(Array.from(arr).join('\n'));
})


