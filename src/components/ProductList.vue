<template>
  <div class="product">
    <ul>
      <li v-for="item in productList" :key="item.id">
        <span>{{ item.title }}</span>
        -
        <span>{{ item.price }}</span>
        <button :disabled="item.inventory <= 0" @click="addProductToCart(item)">
          加入购物车
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: mapState({
    productList: (state) => state.products.all,
  }),
  created() {
    this.$store.dispatch("products/getAllProducts");
  },
  methods: mapActions("cart", ["addProductToCart"]),
};
</script>

<style scoped>
ul {
  list-style: none;
}
ul li {
  padding: 20px;
}
ul li button {
  display: inline-block;
  margin-left: 10px;
  padding: 2px;
}
</style>