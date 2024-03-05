import { reactive, ref } from 'vue'

export function useProducts() {
  const orderNumber = ref(null)

  const productList = reactive([])

  function addProduct(newProduct) {
    const filteredProductList = productList.filter(
      (product) => product.productId === newProduct.selectedProduct.id
    )

    const isProductInList = filteredProductList.length

    if (!isProductInList) {
      productList.push({
        productId: newProduct.selectedProduct.id,
        productTitle: newProduct.selectedProduct.title,
        productQty: newProduct.selectedProductQty,
        productPrice: newProduct.selectedProductQty * newProduct.selectedProduct.price
      })
    } else {
      const productInList = filteredProductList[0]

      productInList.productQty += newProduct.selectedProductQty
      productInList.productPrice += newProduct.selectedProductQty * newProduct.selectedProduct.price
    }
  }

  async function saveProducts() {
    try {
      const formattedProductList = productList.map((product) => ({
        product_id: product.productId,
        quantity: product.productQty
      }))

      const response = await fetch('https://dev-su.eda1.ru/test_task/save.php', {
        method: 'POST',
        body: formattedProductList
      })

      const codeObj = await response.json()

      if (codeObj.success === true) {
        orderNumber.value = codeObj.code
      } else {
        throw new Error('Cannot send order')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return { productList, addProduct, saveProducts, orderNumber }
}
