import axios from '@/utils/fetch'
const searchcomm={
  state:{
    keyword:'',
    pageindex:1,//分页
    list:[],
    loading:false,
    loadingMore:false,
    end:false
  },
  actions:{
    getSearchList({commit,state},params={}){
      if (state.loadingMore && !state.loading) return
      state.loading=true;
      console.log(params);
      return new Promise((resolve,reject)=>{
        axios.get('search',params)
          .then(res=>{
            state.loading=false
            if(res.data.list.length<6){
              state.loadingMore=true;
              state.end=true;
            };
            commit('GETSEARCHLIST',res.data.list);
            resolve(res.data.list)
          }).catch(err=>{
            reject(err)
        })
      }).then(val=>{
        console.log(val);
        return val;
      }).then(val=>{
        console.log(val);
        return val;
      })
    }
  },
  mutations:{
    GETSEARCHLIST(state,list){
      state.list=state.pageindex===1?list:state.list.concat(list)
    }
  }
};
export default searchcomm;
