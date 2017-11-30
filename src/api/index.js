import config from './config';

export default function request(baseUrl, method, body) {
  const url = baseUrl;
  return fetch(url, {
    method: method || 'GET',
    body: body || {},
    headers: config,
  }).then(res => res.json()).then(data => data);
}
