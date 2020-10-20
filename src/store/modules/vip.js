import {requestVipList} from "../../util/request"
const state={
    //列表数据
    list:[]
}
const mutations={
    
    changeList(state,arr){

        state.list=arr;
    }
}
const actions={
    requestList(context){
        requestVipList().then(res=>{
            context.commit("changeList",res.data.list)
        })
    }
}
const getters={
    list(state){
        return state.list
    }
}
export default {
    state,
    mutations,
    actions,
    getters,
    namespaced:true
}