const fs = require('fs');
console.log(process.argv);

const [,,fileName] = process.argv;

let result = fs.readFileSync(fileName,'utf-8');
if(!result){
    console.warn('file error', result);
    return;
}
// 单位转换
result=result.replace(/(\d+)rpx/g,(substring,num) => {
    // console.log(num);
    const half = Math.round(num/2);
    return `${half}px`;
})
console.log(result);
