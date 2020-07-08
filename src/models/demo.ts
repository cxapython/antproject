import {queryDemo} from "@/services/demo";

export default {
  namespace: 'demo',
  state:{
    list:[]
  },
  effects:{
    * initData(params:any,sagaEffects:any){
      const {call,put} = sagaEffects
      const data = yield call(queryDemo);
      yield put({
        type:"queryList",
        data:data
      });
    }
  },
  reducers:{
    queryList(state:any, result:any){
      const data = [...result.data]
      return {
        list:data
      }
    }
  }
}
