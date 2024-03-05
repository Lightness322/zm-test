<script setup>
import { computed } from 'vue'

import { formatPrice } from '@/utils/helpers.js'

const props = defineProps(['productList'])

defineEmits(['save-products'])

const totalPrice = computed(() =>
  props.productList.reduce((acc, product) => acc + product.productPrice, 0)
)

const disabledBtn = computed(() => props.productList.length === 0)
</script>

<template>
  <div class="table_container">
    <table class="table">
      <thead>
        <tr class="table_row">
          <th class="table_head-cell">Название товара</th>
          <th class="table_head-cell">Количество</th>
          <th class="table_head-cell">Стоимость</th>
        </tr>
      </thead>
      <TransitionGroup name="list" tag="tbody">
        <tr
          class="table_row"
          v-for="{ productTitle, productQty, productPrice, productId } in productList"
          :key="productId"
        >
          <td class="table_data-cell">{{ productTitle }}</td>
          <td class="table_data-cell">{{ productQty }} шт.</td>
          <td class="table_data-cell">{{ formatPrice(productPrice) }}</td>
        </tr>
      </TransitionGroup>
    </table>
    <TransitionGroup class="list" name="list" tag="ul">
      <li
        class="list_item"
        v-for="{ productTitle, productQty, productPrice, productId } in productList"
        :key="productId"
      >
        <p class="title">{{ productTitle }}</p>
        <div class="row">
          <p>{{ productQty }} шт.</p>
          <p>{{ formatPrice(productPrice) }}</p>
        </div>
      </li>
    </TransitionGroup>
    <div>
      <hr class="line" />
      <p class="total">Итого: {{ formatPrice(totalPrice) }}</p>
      <button class="btn" :disabled="disabledBtn" @click="$emit('save-products')">Сохранить</button>
    </div>
  </div>
</template>

<style scoped>
.table_container {
  width: 100%;
  min-height: 532px;
  margin-top: 61px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.line {
  height: 1px;
  margin-top: 10px;

  background-color: #2fa6ea;
}

.table {
  width: 100%;
}

.table_row {
  padding-bottom: 14px;

  display: grid;
  grid-template-columns: 1fr 0.4fr 0.4fr;
}

.table_row:last-child {
  padding-bottom: 0px;
}

.table_head-cell {
  padding-bottom: 20px;

  color: #0170ae;
  text-align: end;
}

.table_head-cell:first-child {
  text-align: start;
}

.table_data-cell {
  text-align: end;
}

.table_data-cell:first-child {
  text-align: start;
}

.total {
  margin-top: 18px;

  text-align: end;
  font-weight: 400;
}

.btn {
  width: 100%;
  max-width: 394px;
  margin: 25px auto 64px auto;
  padding: 12px 0px;

  border-radius: 4px;
  background-color: #61a91a;

  display: block;

  color: #fff;
  font-weight: 400;
}

.btn:hover {
  background-color: #81c53d;
}

.list {
  display: none;
}

.list_item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.title {
  line-height: 35px;
}

.row {
  display: flex;
  justify-content: space-between;

  font-weight: 400;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

@media (max-width: 1120px) {
  .table_row {
    display: grid;
    grid-template-columns: 1fr 0.7fr 0.7fr;
  }
}

@media (max-width: 980px) {
  .table_container {
    margin-top: 0px;
  }
}

@media (max-width: 580px) {
  .table {
    display: none;
  }
  .list {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
}
</style>
