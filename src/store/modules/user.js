import {requestUserList,requestUserCount} from "../../util/request"
const state={
    //列表数据
    list:[],
    size:2,
    total:0,
    page:1

}
const mutations={
    
    changeList(state,arr){

        state.list=arr;

    },

    changeTotal(state,num){

        state.total=num;

    },

    changePage(state,page){

        state.page=page;

    }



}
const actions={
    requestList(context){
         
        const params={
            page:state.page,
            size:state.size
        }

        requestUserList(params).then(res=>{
            if(!res.data.list&&context.state.page>1){
                context.commit("changePage",context.state.page-1);
                context.dispatch("requestList")
                return;
            }
            context.commit("changeList",res.data.list)
        })
    },

   requestTotal(context){
       requestUserCount().then(res=>{
            context.commit("changeTotal",res.data.list[0].total)
        })
    },

    
     changePage(context,page){
        context.commit("changePage",page)
    }

}
const getters={
    list(state){
        return state.list
    },

    total(state){
        return state.total
    },
    size(state){
        return state.size
    }
}
export default {
    state,
    mutations,
    actions,
    getters,
    namespaced:true
}