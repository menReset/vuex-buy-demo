<template>
  <div class="cart">
    <div class="product-hint" v-show="!buyProductsList.length">
      请添加产品到购物车
    </div>
    <ul>
      <li v-for="item in buyProductsList" :key="item.id">
        {{ item.title }} - {{ item.price }} X {{ item.count }}
      </li>
    </ul>
    <h3>合计：{{ total }}</h3>
    <button
      @click="checkout(buyProductsList)"
      :disabled="!buyProductsList.length"
    >
      提交
    </button>
    <h3 v-show="checkoutStatus">提交{{ checkoutStatus }}</h3>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState("cart", {
      checkoutStatus: (state) => state.checkoutStatus,
    }),
    ...mapGetters("cart", {
      buyProductsList: "cartProducts",
      total: "cartTotalPrice",
    }),
  },
  methods: {
    //提交购物车列表
    checkout(buyProductsList) {
      this.$store.dispatch("cart/checkout", buyProductsList);
    },
  },
};
</script>

<style scoped>
.product-hint {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
}
ul {
  list-style: none;
}
ul li {
  padding: 20px;
}
.cart button {
  margin-top: 20px;
  padding: 5px 30px;
  font-size: 20px;
  border-radius: 4px;
  border: 1px solid;
}
</style>