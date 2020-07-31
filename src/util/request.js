import axios from "axios"
import qs from "qs"

//响应拦截
axios.interceptors.response.use(res=>{
    console.group("本次路径："+res.config.url)
    console.log(res)
    console.groupEnd()
    return res;
})

const baseUrl="/api"





//菜单添加数据请求
export const requestMenuAdd = (params) => {
    return axios({
        url: baseUrl + "/api/menuadd",
        method: "post",
        data: qs.stringify(params)
    })
}


//菜单渲染数据请求
export const requestMenuList = (params) => {
    return axios({
        url: baseUrl + "/api/menulist",
        method: "get",
        params: params
    })
}



//获取某一条菜单数据
export const requestMenuDetail = params => {
    return axios({
        url: baseUrl + "/api/menuinfo",
        method: "get",
        params
    })
}

//菜单修改
export const requestMenuUpdate = params => {
    return axios({
        url: baseUrl + "/api/menuedit",
        method: "post",
        data: qs.stringify(params)
    })
}


//菜单删除
export const requestMenuDelete = params => {
    return axios({
        url: baseUrl + "/api/menudelete",
        method: "post",
        data: qs.stringify(params)
    })
}



//---------------------------------------------------------------------------------------------------------------



//角色添加
export const requestRoleAdd = (params) => {
    return axios({
        url: baseUrl + "/api/roleadd",
        method: "post",
        data: qs.stringify(params)
    })
}


//角色渲染数据
export const requestRoleList = () => {
    return axios({
        url: baseUrl + "/api/rolelist",
        method: "get",
    
    })
}



//获取某一条角色数据
export const requestRoleDetail = params => {
    return axios({
        url: baseUrl + "/api/roleinfo",
        method: "get",
        params
    })
}



//角色修改
export const requestRoleUpdate = params => {
    return axios({
        url: baseUrl + "/api/roleedit",
        method: "post",
        data: qs.stringify(params)
    })
}



//角色删除
export const requestRoleDelete = params => {
    return axios({
        url: baseUrl + "/api/roledelete",
        method: "post",
        data: qs.stringify(params)
    })
}


//---------------------------------------------------------------------------------------------------------------------------------------------------

//用户添加
export const requestUserAdd = (params) => {
    return axios({
        url: baseUrl + "/api/useradd",
        method: "post",
        data: qs.stringify(params)
    })
}


//用户渲染
export const requestUserList = (params) => {
    return axios({
        url: baseUrl + "/api/userlist",
        method: "get",
        params
    
    })
}


//获取一条用户数据
export const requestUserDetail = params => {
    return axios({
        url: baseUrl + "/api/userinfo",
        method: "get",
        params
    })
}

//角色修改
export const requestUserUpdate = params => {
    return axios({
        url: baseUrl + "/api/useredit",
        method: "post",
        data: qs.stringify(params)
    })
}


//用户删除
export const requestUserDelete = params => axios({
    url: baseUrl + "/api/userdelete",
    method: "post",
    data: qs.stringify(params)
})



//用户总数
export const requestUserCount = () => axios({
    url: baseUrl + "/api/usercount",
    method: "get",
})


//用户登录
export const requestLogin=params=>axios({
    url:baseUrl+"/api/userlogin",
    method:"post",
    data:qs.stringify(params)
})


//----------------------------------------------------------------------------------------------------------------------------------------

//分类添加
export const requestCateAdd = (params) => {
    var formData=new FormData()
    for(let i in params){
        formData.append(i,params[i])
    }
    return axios({
        url: baseUrl + "/api/cateadd",
        method: "post",
        data: formData
    })
}




//分类列表
export const requestCateList = (params) => {
    return axios({
        url: baseUrl + "/api/catelist",
        method: "get",
        params: params
    })
}



//分类某一个条数据
export const requestCateDetail = params => {
    return axios({
        url: baseUrl + "/api/cateinfo",
        method: "get",
        params
    })
}


//分类修改
export const requestCateUpdate = params => {
    var formData=new FormData()
    for(let i in params){
        formData.append(i,params[i])
    }
    return axios({
        url: baseUrl + "/api/cateedit",
        method: "post",
        data: formData
    })
}


//分类删除
export const requestCateDelete = params => {
    return axios({
        url: baseUrl + "/api/catedelete",
        method: "post",
        data: qs.stringify(params)
    })
}




//------------------------------------------------------------------------------------------------------------------------------


//添加规格
export const requestSpecAdd = (params) => {
    return axios({
        url: baseUrl + "/api/specsadd",
        method: "post",
        data: qs.stringify(params)
    })
}






//渲染规格
export const requestSpecList = (params) => {
    return axios({
        url: baseUrl + "/api/specslist",
        method: "get",
        params
    
    })
}


//获取一条规格数据
export const requestSpecDetail = params => {
    return axios({
        url: baseUrl + "/api/specsinfo",
        method: "get",
        params
    })
}

//修改规格
export const requestSpecUpdate = params => {
    return axios({
        url: baseUrl + "/api/specsedit",
        method: "post",
        data: qs.stringify(params)
    })
}


//删除规格
export const requestSpecDelete = params => axios({
    url: baseUrl + "/api/specsdelete",
    method: "post",
    data: qs.stringify(params)
})



//规格总数
export const requestSpecCount = () => axios({
    url: baseUrl + "/api/specscount",
    method: "get",
})


//------------------------------------------------------------------------------------------------------------------------------

//添加商品
export const requestGoodsAdd = (params) => {
    var formData=new FormData()
    for(let i in params){
        formData.append(i,params[i])
    }
    return axios({
        url: baseUrl + "/api/goodsadd",
        method: "post",
        data: formData
    })
}




//获取商品列表
export const requestGoodsList = (params) => {
    return axios({
        url: baseUrl + "/api/goodslist",
        method: "get",
        params
    
    })
}


//获取一条商品
export const requestGoodsDetail = params => {
    return axios({
        url: baseUrl + "/api/goodsinfo",
        method: "get",
        params
    })
}


//获取商品
export const requestGoodsUpdate = params => {
    let formData = new FormData()
    for (let i in params) {
        formData.append(i, params[i])
    }
    return axios({
        url: baseUrl + "/api/goodsedit",
        method: "post",
        data: formData
    })
}



//分类删除
export const requestGoodsDelete = params => {
    return axios({
        url: baseUrl + "/api/goodsdelete",
        method: "post",
        data: qs.stringify(params)
    })
}

//-------------------------------------------------------------------------------------------------------------------------
//秒杀添加
export const requestSeckAdd = (params) => {
    return axios({
        url: baseUrl + "/api/seckadd",
        method: "post",
        data: qs.stringify(params)
    })
}






//秒杀渲染
export const requestSeckList = (params) => {
    return axios({
        url: baseUrl + "/api/secklist",
        method: "get",
        params
    
    })
}


//获取一条秒杀数据
export const requestSeckDetail = params => {
    return axios({
        url: baseUrl + "/api/seckinfo",
        method: "get",
        params
    })
}

//修改数据
export const requestSeckUpdate = params => {
    return axios({
        url: baseUrl + "/api/seckedit",
        method: "post",
        data: qs.stringify(params)
    })
}


//删除数据
export const requestSeckDelete = params => axios({
    url: baseUrl + "/api/seckdelete",
    method: "post",
    data: qs.stringify(params)
})


//-------------------------------------------------------------------------------------

//轮播图添加
export const requestBannerAdd = (params) => {
    var formData=new FormData()
    for(let i in params){
        formData.append(i,params[i])
    }
    return axios({
        url: baseUrl + "/api/banneradd",
        method: "post",
        data: formData
    })
}




//轮播图列表
export const requestBannerList = (params) => {
    return axios({
        url: baseUrl + "/api/bannerlist",
        method: "get",
        params: params
    })
}



//某一个条数据
export const requestBannerDetail = params => {
    return axios({
        url: baseUrl + "/api/bannerinfo",
        method: "get",
        params
    })
}


//分类修改
export const requestBannerUpdate = params => {
    var formData=new FormData()
    for(let i in params){
        formData.append(i,params[i])
    }
    return axios({
        url: baseUrl + "/api/banneredit",
        method: "post",
        data: formData
    })
}


//分类删除
export const requestBannerDelete = params => {
    return axios({
        url: baseUrl + "/api/bannerdelete",
        method: "post",
        data: qs.stringify(params)
    })
}


//----------------------------------------------------------------------------------------------------------------------------




//渲染
export const requestVipList = (params) => {
    return axios({
        url: baseUrl + "/api/memberlist",
        method: "get",
        params
    
    })
}





//获取一条数据
export const requestVipDetail = params => {
    return axios({
        url: baseUrl + "/api/memberinfo",
        method: "get",
        params
    })
}

//vip修改
export const requestVipUpdate = params => {
    return axios({
        url: baseUrl + "/api/memberedit",
        method: "post",
        data: qs.stringify(params)
    })
}







