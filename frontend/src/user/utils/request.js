import { message } from "antd";

export const get = (url, data={}) => {
  return new Promise((resolve)=>{
    fetch(`${url}?${Object.keys(data).map(k=>`${k}=${data[k]}`).join('&')}`)
    .then((response) => {
      if(response.status===200){
        response.json().then(res=>{
          resolve(res)
        })
      }else{
        response.json().then(res=>{
          message.error(res.error||'error')
        })
      }
    })
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
    }).then((response) => {
      if(response.status===200){
        response.json().then(res=>{
          resolve(res)
        })
      }else{
        response.json().then(res=>{
          message.error(res.error||'error')
        })
      }
    })
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
    }).then((response) => {
      if(response.status===200){
        response.json().then(res=>{
          resolve(res)
        })
      }else{
        response.json().then(res=>{
          message.error(res.error||'error')
        })
      }
    })
  })
};
