import axios from 'axios'

//封装axios请求
export default function ajax(url='',data={},type="GET"){
    let promise; //接收promise对象
    //返回promise对象
    return new Promise((resolve, reject)=>{
        //判断请求方式
        if (type==='GET') {//get请求
            //拼接url
            let dataUrl=''
            //使用Object.keys()方法取出对象的key值，组成一个数组，在遍历拼接data数据
            Object.keys(data).forEach((key)=>{
                dataUrl += key + '=' + data[key] + '&'
            })
            //去除最后一个&符号
            if (dataUrl !== '') {
                //使用substring截取字符串，lastIndexOf得到查找数据的最后一个下标
                dataUrl=dataUrl.substring(0,dataUrl.lastIndexOf('&'))
            }
            //获得完整的url
            url=url+'?'+dataUrl
            //发起请求的到Promise对象
            promise=axios.get(url)
        } else {//post请求
            promise=axios.post(url,data)
        }
        //处理返回的结果
        promise.then((response)=>{
            resolve(response.data)
        }).catch((error)=>{
            reject(error)
        })
    })
}