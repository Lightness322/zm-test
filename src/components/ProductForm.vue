<script setup>
import { onMounted, computed } from 'vue'

import { useProductForm } from '@/composables/useProductForm.js'

const emit = defineEmits(['submit-products'])

const { productForm, products, resetProductForm, getProducts } = useProductForm()

onMounted(() => {
  getProducts()
})

function handleSubmit() {
  emit('submit-products', productForm)
  resetProductForm()
}

const disabledBtn = computed(
  () => productForm.selectedProduct === null || productForm.selectedProductQty === 0
)
</script>

<template>
  <form class="form" @submit.prevent="handleSubmit">
    <div class="form_item">
      <label for="products">Выберите продукцию</label>
      <div class="select_wrapper">
        <select id="products" class="select" v-model="productForm.selectedProduct">
          <option disabled :value="null">Выбрать продукт...</option>
          <option v-for="product in products" :key="product.id" :value="product">
            {{ product.title }}
          </option>
        </select>
      </div>
    </div>
    <div class="form_item">
      <label for="quantity">Введите количество</label>
      <input id="quantity" type="number" class="input" v-model="productForm.selectedProductQty" />
    </div>
    <button :disabled="disabledBtn" class="btn">Добавить</button>
  </form>
</template>

<style scoped>
.form {
  min-width: 394px;

  display: flex;
  flex-direction: column;
  gap: 37px;
}

.form_item {
  display: flex;
  flex-direction: column;
  gap: 21px;
}

.select,
.input {
  width: 100%;
  padding: 12px 16px;

  border-bottom: 1px solid #0170ae;
  background-color: #eef8ff;

  color: #0170ae;
  appearance: none;
}

.select {
  border-top: 1px solid #000;
  border-right: 1px solid #000;
  border-left: 1px solid #000;
  box-shadow: 0px 4px 4px #00000040;
}

.select_wrapper {
  position: relative;
}

.select_wrapper::after {
  content: '';
  position: absolute;
  top: calc(50% - 20.55px / 2);
  right: 19px;

  padding: 6.78px;

  border: solid #2fa6ea;
  border-width: 0 1px 1px 0;

  display: inline-block;
  transform: rotate(45deg);
}

.btn {
  width: 100%;
  max-width: 394px;
  margin: 9px auto 0px auto;
  padding: 12px 0px;

  border: 1px solid #000;
  border-radius: 4px;
  background-color: #2fa6ea;
  box-shadow: 0px 4px 4px #00000040;

  color: #fff;
  font-weight: 500;
  -webkit-text-stroke: 1px #000;
}

.btn:hover {
  background-color: #49b9f9;
}

@media (max-width: 580px) {
  .form {
    min-width: auto;
    width: 100%;
  }
  .select {
    border-width: 0px 0px 1px 0px;
  }
  .btn {
    border: none;
    box-shadow: none;

    -webkit-text-stroke: 0px;
    font-weight: 400;
  }
}
</style>
