<<<<<<< HEAD
export const state={}

export const mutations={}

export const getters={}
=======
export const state={
    userList: sessionStorage.getItem("userList")?JSON.parse(sessionStorage.getItem("userList")):null

    
}

export const mutations={
    changeUser(state,obj){
        state.userList=obj;
        sessionStorage.setItem("userList",JSON.stringify(state.userList))
    }
}

export const getters={

    userList(state){
        return state.userList
    }
}
>>>>>>> d807809... bug修复
