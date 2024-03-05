import { reactive } from 'vue'

export function useProductForm() {
  const productForm = reactive({
    selectedProduct: null,
    selectedProductQty: 0
  })

  const products = reactive([])

  function resetProductForm() {
    productForm.selectedProduct = null
    productForm.selectedProductQty = 0
  }

  async function getProducts() {
    try {
      const response = await fetch('https://dev-su.eda1.ru/test_task/products.php')
      const productObj = await response.json()

      if (productObj.success === true) {
        products.push(...productObj.products)
      } else {
        throw new Error('Cannot get products')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return { productForm, products, resetProductForm, getProducts }
}
