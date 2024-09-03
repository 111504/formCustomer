// 设置默认的 baseURL
axios.defaults.baseURL = "http://localhost:8080";

const defaultFailure = (message, code, url) => {
  console.warn(`URL:${url},code:${code},錯誤訊息:${message}`);
};

const defaultError = (err) => {
  console.log(err);
};

function internalGet(url, success, failure, error = defaultError) {
  axios
    .get(url)
    .then((response) => {
      if (response.data.code === 200) {
        success(response.data.data);
      } else {
        failure(response.data.message, response.data.code, url);
      }
    })
    .catch((err) => error(err));
}

function internalPost(url,data,headers,success,failure,error=defaultError){
  axios
  .post(url,data,{headers:headers})
  .then((response)=>{
    if(response.data.code==200){
      success(response.data.data)
    }else{
      failure(response.data.message,response.data.code,url)
    }
  }).catch(err=>error(err))
}

export function post(url,data,success,failure=defaultError){
  const headers={'Content-Type': 'application/json'}
  internalPost(url,data,headers,success,failure)
}


export function get(url, success, failure = defaultFailure) {
  internalGet(url, success, failure);
}
