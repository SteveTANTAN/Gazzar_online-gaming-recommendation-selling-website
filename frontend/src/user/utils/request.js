import { message } from "antd";

export const get = (url, data={}) => {
  return new Promise((resolve)=>{
    fetch(`${url}?${Object.keys(data).map(k=>`${k}=${data[k]}`).join('&')}`).then((response) => response.json()).then(res=>{
      // if(res.code!==0){
      //   message.error(res.error||'error')
      // }else{
        resolve(res)
      // }
    });
  })
};

export const post = (url, data) => {
  return new Promise((resolve)=>{
    fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((response) => response.json()).then(res=>{
      // if(res.code!==0){
      //   message.error(res.error||'error')
      // }else{
        resolve(res)
      // }
    });
  })
};

export const put = (url, data) => {
  return new Promise((resolve)=>{
    fetch(url, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((response) => response.json()).then(res=>{
      // if(res.code!==0){
      //   message.error(res.error||'error')
      // }else{
        resolve(res)
      // }
    });
  })
};
