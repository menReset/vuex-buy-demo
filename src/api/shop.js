const _products = [
  {"id": 1, "title": "华为 Mate 20", "price": 3999, "inventory": 2},
  {"id": 2, "title": "小米 9", "price": 2999, "inventory": 0},
  {"id": 3, "title": "OPPO R17", "price": 2999, "inventory": 5}
]

export default {
  getProducts (cb) { // 模拟获取商品信息
    setTimeout(() => cb(_products), 100)
  },

  buyProducts (products, cb, errorCb) { // 模拟请求成功和失败
    setTimeout(() => {
      Math.random() > 0.5 ? cb() : errorCb()
    }, 100)
  }
}