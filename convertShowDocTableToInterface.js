/**
 * 用于将showdoc上的表格转化成TS需要的接口表述
 * 使用方法：
 * 1. 将需要转换的表格的tbody找到，加上ID
 * 2. 执行下面的代码
 * 3. 需要的话用IDE自己再格式化一下
 */
const id = 't1';
// 请在tbody上添加对应的ID
let results = [];
$(`#${id} tr`).map((index,one)=>{
    const child = one.children;
    results.push(Array.from(child).map(td=>{
        return td.innerHTML;
    }))
});
function getRealType(type=''){
    switch (type.toLowerCase()) {
        case 'long': return 'number';
        case 'int':return 'number';
        case 'date': return 'string';
        case 'string': return 'string';
        case 'object': return 'object';
        default: return 'unknown'; //默认返回unknown 方便修改
    }
}
console.log('请确认顺序是 参数名 必选 类型 说明');
let int_face = [];
results.map(r=>{
    const name = r[0];
    const must = '';// 是必选的话直接冒号，否则是?:
    const type = getRealType(r[1]);
    const comment = r[2];
    int_face.push(`${name}${must}:${type};//${comment}`);
})

// JSON.stringify(int_face,null,'    ');
let finalString = ''
int_face.map(one=>{
    console.log(one);
    finalString+= one+'\n';
})
finalString+=''
