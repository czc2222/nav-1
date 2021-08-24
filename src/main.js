const $webList =$('.webList')
const $lastWeb=$webList.find('li.lastWeb')
const x=localStorage.getItem('x')
const xObject=JSON.parse(x)//将字符串转成对象
const hashMap =xObject || [
    {logo:'M',url:'https://developer.mozilla.org/zh-CN/docs/Web'},{logo:'W',url:'https://www.w3.org'},
    {logo:'B',url:'https://www.bilibili.com'}
]//弄个hash表对应每个网页

const simplifyUrl =(url)=>{
    return url.replace('http://','').replace('https://','').replace('www.','').replace(/\/.*/,'')//删除/开头的内容
}//将前置协议替换成''
const render=()=>{
    $webList.find('li:not(.lastWeb)').remove()//由于点添加按钮的时候会多生成之前的网页，因此要在生成之前先清空，这样就不会重复
    hashMap.forEach((node,index)=>{
        
        const $li =$(`<li>
        
            <div class="web">
                <div class="logo">
                    ${node.logo}
                </div>
                <div class="webLink">${simplifyUrl(node.url)}</div>
                <div class="close">
                    <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-close"></use>
                    </svg>
                </div>
            </div>
        
    </li>`).insertBefore($lastWeb)//将li插入到添加网址的div前面
      $li.on('click',()=>{
        window.open(node.url)
      })//监听点击事件，点击之后跳转页面
      $li.on('click','.close',(e)=>{
        e.stopPropagation()//阻止冒泡
        hashMap.splice(index,1)//点击x之后删除网页，splice是数组删除
        render()//重新渲染页面
      })

    })
}



render()//渲染一遍

$('.addButton')
  .on('click',()=>{
      let url=window.prompt('请输入你要添加的网址')//监听用户输入网址事件
      if(url.indexOf('http')!==0){
      url = 'https://'+url
      }//如果用户少输入https，我们就加上
      console.log(url)
      
      hashMap.push({logo:simplifyUrl(url)[0].toUpperCase(),url:url})//将用户输入的网页添加到hashmap上
      
      render()//加入新的网页，重新渲染
    })
window.onbeforeunload=()=>{
console.log('页面关闭之前触发')
const string=JSON.stringify(hashMap)//由于localStorage只能存字符串，因此把hashmap转换成字符串
localStorage.setItem('x',string)//在localStorage存储网页
}//window.onbeforeunload 是关闭页面之前触发

$(document).on('keypress',(e)=>{

     const {key}= e  //const key =e.key 的简写
     for(let i=0;i<hashMap.length;i++){
       if (hashMap[i].logo.toLowerCase()===key){
        window.open(hashMap[i].url)
       }
     }
})