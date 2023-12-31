const Url = {
  GET: 'https://29.javascript.pages.academy/kekstagram/data',
  POST: 'https://29.javascript.pages.academy/kekstagram',
};

const sendRequest = (onSuccess, onFail, method, body) =>{
  fetch (
    Url[method],
    {
      method: method,
      body: body,
    },
  )
    .then((response) => response.json())
    .then((data) => {
      onSuccess(data);
    })
    .catch((err) => {
      onFail(err);
    });
};

const loadData = (onSuccess, onFail, method = 'GET') => sendRequest(onSuccess, onFail, method);
const uploadData = (onSuccess, onFail, method = 'POST', body) => sendRequest(onSuccess, onFail, method, body);
export{loadData,uploadData};
