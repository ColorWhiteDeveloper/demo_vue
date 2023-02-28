import { createStore } from 'vuex'

export default createStore({
  modules: {
    demo1:{
      state: {
        str:'hello VueX',
      },
      getters:{
        getterStr:(state)=> state.str,
      },
      mutations: {
        mutationStr:(state,val)=>{
          state.str = val;
        }
      },
      actions: {
        async setValStr({state,commit},strIn){
          commit('mutationStr',strIn);
        },
      },
    }
  }
})