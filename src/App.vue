<script setup>
import ProductForm from '@/components/ProductForm.vue'
import ProductTable from '@/components/ProductTable.vue'

import { useProducts } from '@/composables/useProducts.js'

const { productList, addProduct, saveProducts, orderNumber } = useProducts()
</script>

<template>
  <div class="wrapper">
    <header class="header">
      <div class="container">
        <span class="header_text">Test project</span>
      </div>
    </header>
    <main class="container content">
      <div class="columns">
        <ProductForm @submit-products="(newProduct) => addProduct(newProduct)" />
        <ProductTable :productList @save-products="saveProducts" />
        <div v-if="orderNumber" class="notification">
          <span>Спасибо за заказ! Номер вашего заказа: </span>
          <span class="order-number">{{ orderNumber }}</span>
        </div>
      </div>
    </main>
    <footer class="footer">
      <div class="container">
        <p class="footer_text">Very interesting tail</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.wrapper {
  height: 100%;

  display: flex;
  flex-direction: column;
}

.container {
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0px 26px;
}

.header {
  margin-bottom: 38px;
  padding: 16px 0px;

  border: 1px solid #000;
  background-color: #755858;
  box-shadow: 0px 4px 4px #00000040;
}

.header_text {
  color: white;
  -webkit-text-stroke: 1px black;
  text-shadow: 0px 4px 4px #00000040;
  font-weight: 500;
}

.columns {
  position: relative;

  display: flex;
  gap: 51px;
}

.notification {
  position: absolute;
  left: 0;
  bottom: 15px;

  width: 100%;

  text-align: center;
}

.content {
  flex: 1 0 auto;
}

.footer {
  height: 100%;
  max-height: 221px;
  min-height: 213px;

  background-color: #000;
}

.footer .container {
  height: 100%;
  padding-top: 18px;
  padding-bottom: 18px;

  display: flex;
  justify-content: end;
  align-items: end;
}

.footer_text {
  color: #fff;
  font-weight: 400;
}

.order-number {
  text-decoration: underline;
}

@media (max-width: 980px) {
  .container {
    width: 100%;
    max-width: 768px;
    margin: 0 auto;
    padding: 0px 26px;
  }

  .columns {
    flex-direction: column;
    gap: 36px;
  }
}

@media (max-width: 580px) {
  .header_text {
    -webkit-text-stroke: 0px;
    font-weight: 400;
  }
}

@media (max-width: 562px) {
  .notification {
    bottom: 2px;
  }
}
</style>
