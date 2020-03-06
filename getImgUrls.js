/* created by CoolGuy on 2020/3/6 */
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


