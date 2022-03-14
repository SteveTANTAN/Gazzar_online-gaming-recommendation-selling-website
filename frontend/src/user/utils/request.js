import { message } from "antd";

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
      if(res.code!==0){
        message.error(res.error||'error')
      }else{
        resolve(res)
      }
    });
  })
};
