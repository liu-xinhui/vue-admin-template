import axios from "./axios";

export default {
  /**
   * Get方法获取数据
   * get(String url,Object params) 示例get('users',{pageNum:1})
   */
  get: function(url, params) {
    return axios({
      url: url,
      method: "get",
      params: params,
    });
  },
  put: function(url, data, params) {
    return axios({
      url: url,
      method: "put",
      data: data,
      params: params,
    });
  },
  post: function(url, data, params) {
    return axios({
      url: url,
      method: "post",
      data: data,
      params: params,
    });
  },
  // 删除,示例delete('users',10)
  delete: (url, id) => {
    return axios({
      url: url + "/" + id,
      method: "delete",
    });
  },
  //保存，当id大于0时为修改采用put，其他为新增采用post
  save: (url, data) => {
    return axios({
      url: url,
      method: !data.id || data.id === 0 ? "post" : "put",
      data: data,
    });
  },
};
