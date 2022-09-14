import shop from '../../api/shop'
import { PRODUCTS } from '../mutation-types'

const state = { // init产品的数据
  all: []
}

const mutations = { // 产品操作的方法
  [PRODUCTS.SET_PRODUCTS](state, products) {// 获取全部商品列表的方法
    state.all = products
  },
  [PRODUCTS.DECREMENT_PRODUCT_INVENTORY](state, productsItem) { // 加入购物车后数量减少的方法
    const product = state.all.find(product => product.id === productsItem.id)
    product.inventory -- 
  }
}

const actions = { // 获取产品列表的方法
  getAllProducts (context) {
    shop.getProducts (products => {
      context.commit(PRODUCTS.SET_PRODUCTS, products)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}