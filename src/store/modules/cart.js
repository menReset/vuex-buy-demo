import shop from '../../api/shop'
import { CART, PRODUCTS } from '../mutation-types'

const state = {
  items: [], // 添加的商品列表
  checkoutStatus: null //能否提交的状态
}

const mutations = {
  [CART.SET_CHECKOUT_STATUS](state, status) { // 提交的一个状态控制方法
    state.checkoutStatus = status
  },
  [CART.PUSH_PRODUCT_TO_CART](state, productsItem) { // push一个新商品到购物车商品列表
    state.items.push({
      ...productsItem,
      count: 1
    })
  },
  [CART.INCREMENT_ITEM_QUANTITY](state, productsItem) { // 购物车已有商品添加数量
    const cartItem = state.items.find(item => item.id === productsItem.id)
    cartItem.count ++
  },
  [CART.SET_CART_ITEMS](state) { // 提交后 购物车列表清空
    state.items = []
  }
}

const actions = {
  addProductToCart (context, productsItem) { //添加商品的方法
    context.commit(CART.SET_CHECKOUT_STATUS, null)
    if(productsItem.inventory > 0) {
      const cartItem = context.state.items.find(item => item.id === productsItem.id)
      if(cartItem) { // 如果购物车列表里面有该商品就添加数量 没有就添加该商品
        context.commit(CART.INCREMENT_ITEM_QUANTITY, productsItem)
      } else {
        context.commit(CART.PUSH_PRODUCT_TO_CART, productsItem)
      }
      context.commit(`products/${PRODUCTS.DECREMENT_PRODUCT_INVENTORY}`, productsItem, { root: true }) // 商品列表数量减少
    }
  },
  checkout (context, buyProductsList) { // 提交购物列表 检查是否提交成功和相应处理
    console.log(buyProductsList)
    shop.buyProducts(
      buyProductsList,
      () => { // 提交成功的函数方法
        context.commit(CART.SET_CHECKOUT_STATUS, '成功')
        context.commit(CART.SET_CART_ITEMS)
      },
      () => { // 提交失败的函数方法
        context.commit(CART.SET_CHECKOUT_STATUS, '失败')
      }
    )
  }
}

const getters = {
  cartProducts (state) { //计算属性获取最新的购物车列表
    return state.items
  },
  cartTotalPrice (state) { // 计算购物车里面的总价
    return state.items.reduce((total, productsItem) => {
      return total + productsItem.price * productsItem.count
    }, 0)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
