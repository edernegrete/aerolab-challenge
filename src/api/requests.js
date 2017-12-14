import request from './index';
import { products, user } from './mock';

export function getProducts() {
  return products;
  // return request('https://aerolab-challenge.now.sh/products').then(res => res);
}

export function getUser() {
  return user;
  // return request('https://aerolab-challenge.now.sh/user/me').then(res => res);
}

export function redeem(body) {
  const data = JSON.stringify(body);
  return request('https://aerolab-challenge.now.sh/redeem', 'POST', data).then(res => res);
}

export function getPoints(amount) {
  const body = {
    points: amount,
  };
  return request('https://aerolab-challenge.now.sh/user/points', 'POST', body).then(res => res);
}
