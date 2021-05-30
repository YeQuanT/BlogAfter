import request from '@/utils/request'

//增加文章
export function addArticle(data) {
    return request({
        url: 'Blog/article',
        method: 'post',
        data
    })
}
//获取文章列表
export function getList(data) {
    return request({
        url: 'Blog/getArticleList',
        method: 'post',
        data
    })
}
//获取单个文章
export function getAarticle(data) {
    return request({
        url: 'Blog/getOneArticle',
        method: 'post',
        data
    })
}
//删除文章，重复调用完全删除，有恢复功能
export function delArticle(data) {
    return request({
        url: 'Blog/delOneArticle',
        method: 'post',
        data
    })
}

 export function getSkill(data){
     return request({
         url:'Blog/getSkill',
         method:'post',
         data
     })}

 export function addSkill(data){
     return request({
         url:'Blog/addSkill',
         method:'post',
         data
     })}
 export function setSkill(data){
     return request({
         url:'Blog/setSkill',
         method:'post',
         data
     })}

