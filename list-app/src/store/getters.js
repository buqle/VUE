import record from "./modules/record";

const getters={
  //user
  isLogin:state=>state.user.isLogin,
  user:state=>state.user.user,
  footerBarList:state=>state.user.footerBarList,

  //app
  Loadings:state=>state.app.Loadings,
  getArticleList:state=>state.app.articleInfo,

  //我的记录
  types:state=>state.record.types,
  loading:state=>state.record.loading,
  recordIndex:state=>state.record.index,
  End:state=>state.record.end,

  //搜索
  keyword:state=>state.search.keyword,
  searchPageindex:state=>state.search.pageindex,
  searchLoading:state=>state.search.loading,
  searchEnd:state=>state.search.end,
  searchList:state=>state.search.list,

  //首页列表
  newsList:state=>state.home.newsList,
  newsLoading:state=>state.home.newsLoading,
  homeNewsIndex:state=>state.home.newsIndex,
  homeNewsPrevIndex:state=>state.home.newsPrevIndex,
  homeEnd:state=>state.home.end

};
export default getters;
