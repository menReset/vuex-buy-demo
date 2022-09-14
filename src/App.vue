<template>
  <div id="app">
    <div>
      <h1>购物车示例：</h1>
      <h4>账号：{{ $store.state.userInfo.email }}</h4>
      <hr />
      <h3>产品列表：</h3>
      <ProductList></ProductList>
      <hr />
      <h3>我的购物列表：</h3>
      <ShoppingCart></ShoppingCart>
    </div>
  </div>
</template>

<script>
import ProductList from "./components/ProductList.vue";
import ShoppingCart from "./components/ShoppingCart.vue";
export default {
  name: "App",
  components: {
    ProductList,
    ShoppingCart,
  },
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
#app {
  display: flex;
  justify-content: center;
  align-content: center;
}
h4 {
  margin: 10px 0;
}
</style>
