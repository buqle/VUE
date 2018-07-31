import axios from '@/utils/fetch';
import {newsList} from "./classtit";
import {Local} from "@/utils/storage";
import Vue from 'vue';
//JSON.parse 将json字符串转成json对象
//JSON.stringify 将json对象转成json字符串
const home={
  state:{
    newsList:(function () {
      let newlist=JSON.parse(Local.get('newlist'))||newsList.slice(0,12);//slice 从数组选定元素
      newlist.forEach(news=>{

        if(news.list) delete news.title;
        console.log(news.title)
      });
      Local.set('newlist', JSON.stringify(newlist));
      return newlist
    })(),
    newsIndex:0,
    newsPrevIndex:0,
    newsLoading:false,
    end:false

  },
  actions:{
    delhometag({commit},news){
      commit('DELHOMETAG',news)
    },
    addhomeTag({commit},news){
      commit('ADDHOMETAG',news)
    },
    gethomelist({commit,state},parms){
      /*let obj=state.newsList.find(v=>v.id==parms.id);
      console.log(parms.id)
      if(obj.list){
        return false;
      }*/
      state.newsLoading=true;
      return new Promise((resolve,reject)=>{
        axios.get('home/list',parms)
          .then(res=>{
            state.newsLoading=false;
            if(res.data.list.length<11){
              state.end=true;
            }
            commit('GETHOMELIST',res.data.list);
            resolve(res.data.list)
          }).catch(err=>{
            reject(err)
        }).finally(()=>{
          state.newsLoading=false;
        })
      })
    }

  },
  mutations:{
    ADDHOMETAG(state,news){
      //every对数组每一项执行指定的函数
      if(state.newsList.every(tag=>tag.title!=news.title)){
        state.newsList.push(news);
        console.log(news)
        console.log(state.newsList)
        Local.set('newlist',JSON.stringify(state.newsList))
      }
    },
    DELHOMETAG(state,news){
      console.log(news)
     /* let index=state.newsList.findIndex(tag=>tag.title==news.title);
      console.log(index)*/
      state.newsList.splice(news,1);//从指定位置删除数组一个元素
      Local.set('newlist',JSON.stringify(state.newsList))
    },
    GETHOMELIST(state,list){
      state.newsList[state.newsIndex].list=list;
      Vue.prototype.$set(state.newsList,state.newsIndex,state.newsList[state.newsIndex])
    }
  }
};
export  default home
