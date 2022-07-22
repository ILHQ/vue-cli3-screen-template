import storage from '@/lib/storage';
import axios from 'axios';

export default function ajax({
  baseApi = process.env.VUE_APP_API,
  api,
  method = 'get',
  data = null,
  withAll = false,
  isFormData = false,
  isDownloadFile = false,
}) {
  // api地址
  const url = `${baseApi}/${api}`;
  const headers = {
    Accept: 'application/json',
    Authorization: storage.get('token') || '',
  };
  // form data ajax
  if (isFormData) {
    headers['Content-Type'] = 'multipart/form-data';
    const tempFrom = new FormData();
    Object.keys(data).forEach((key) => {
      tempFrom.append(key, data[key]);
    });
    data = tempFrom;
  }
  return new Promise((resolve, reject) => {
    axios({
      headers,
      method,
      url,
      [method === 'get' ? 'params' : 'data']: data,
      responseType: isDownloadFile ? 'blob' : 'json',
    })
      .then((response) => response.data)
      .then((data) => {
        if (isDownloadFile) {
          resolve(data);
        } else if (data.status === 200 && data.flag) {
          resolve(withAll ? data : data.data);
        } else {
          // Toast.fail(data.msg ? String(data.msg) : '接口异常');
          reject(data);
        }
      })
      .catch((err) => {
        const error = err.response;
        if (error.status === 403) {
          // 登录失效
          // Toast.fail('登录失效');
        } else {
          // Toast.fail(error.data.msg ? String(error.data.msg) : '接口异常');
        }
        reject(error.data);
      });
  });
}
