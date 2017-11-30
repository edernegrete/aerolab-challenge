import request from './index';

export function getProducts() {
  return request('https://aerolab-challenge.now.sh/products').then(res => res);
}

export function getUser() {
  return request('https://aerolab-challenge.now.sh/user/me').then(res => res);
}

export function redeem(body) {
  const data = JSON.stringify(body);
  return request('https://aerolab-challenge.now.sh/redeem', 'POST', data).then(res => res);
}
