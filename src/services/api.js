import { stringify } from 'qs';
import request from '../utils/request';

export async function query() {
  return request('/api/users');
}

export async function queryCurrent(params) {
  return request(`/api/userinfo?${stringify(params)}`);
}
export async function queryMenus(params) {
  return request(`/api/list_menus?${stringify(params)}`);
}

// 关于爬虫列表(爬虫方看到的)
export async function queryRule(params) {
  return request(`/api/spider_list?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/spider_list', {
    method: 'DELETE',
    body: {
      ...params,
    },
  });
}

export async function addRule(params) {
  return request('/api/spider_list', {
    method: 'POST',
    body: params,
  });
}

export async function addviualRule(params) {
  return request('/api/visual_spider', {
    method: 'POST',
    body: params,
  });
}

// 关于任务列表
export async function addtask(params) {
  return request('/api/task_list', {
    method: 'POST',
    body: params,
  });
}

export async function querytask(params) {
  return request(`/api/task_list?${stringify(params)}`);
}

// 关于任务基础信息
export async function queryTaskProfile(params) {
  return request(`/api/task_info?${stringify(params)}`);
}

// 关于内容源
// 内容源列表

export async function querysource(params) {
  return request(`/api/source_list?${stringify(params)}`);
}

export async function changesourceBySpider(params) {
  return request('/api/source_list_spider', {
    method: 'PUT',
    body: params,
  });
}

export async function querysourceBySpider(params) {
  return request(`/api/source_list_spider?${stringify(params)}`);
}

// 关于内容源基础信息
export async function querySourceProfile(params) {
  return request(`/api/source_info?${stringify(params)}`);
}

export async function addsource(params) {
  return request('/api/task_info', {
    method: 'POST',
    body: params,
  });
}

export async function changeTaskSourceStatus(params) {
  return request('/api/source_info', {
    method: 'PUT',
    body: params,
  });
}
export async function deleteTaskSourceStatus(params) {
  return request('/api/task_info', {
    method: 'DELETE',
    body: {
      ...params,
    },
  });
}

// 关于爬虫基础信息
export async function queryBasicProfile(params) {
  const url = `/api/spider_info?${stringify(params)}`;
  return request(url);
}

export async function modifySpiderInfo(params) {
  return request('/api/spider_info', {
    method: 'PUT',
    body: params,
  });
}

// 关于状态
export async function queryStatus(params) {
  const url = `/api/spider_status?${stringify(params)}`;
  return request(url);
}

// 关于 sentry 信息
export async function querySentry(params) {
  const url = `/api/spider_sentry?${stringify(params)}`;
  return request(url);
}

export async function removeSentry(params) {
  return request('/api/spider_sentry', {
    method: 'DELETE',
    body: {
      ...params,
    },
  });
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function queryNotices() {
  return request('/api/notices');
}

export async function getPage(params) {
  return request(`/api/get_page?${stringify(params)}`);
}

// 微信公众号任务
export async function addWechatTask(params) {
  return request('/api/wechat_history', {
    method: 'POST',
    body: params,
  });
}

export async function queryWechatTask(params) {
  return request(`/api/wechat_history?${stringify(params)}`);
}

export async function queryKuaiShouTask(params) {
  return request(`/api/kuaishou_history?${stringify(params)}`);
}
export async function addKuaiShouTask(params) {
  return request('/api/kuaishou_history', {
    method: 'POST',
    body: params,
  });
}
export async function deleteKuaiShouTask(params) {
  return request('/api/kuaishou_history', {
    method: 'DELETE',
    body: params,
  });
}

export async function deleteWechatTask(params) {
  return request('/api/wechat_history', {
    method: 'DELETE',
    body: params,
  });
}
