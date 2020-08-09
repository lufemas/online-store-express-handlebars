
const $addBtn = document.getElementById('add-btn')
const $editBtn = document.getElementById('edit-btn')
const $listBtn = document.getElementById('list-btn')

const $editProductSection = document.getElementById('edit-product-section')
const $listProductSection = document.getElementById('list-product-section')

const $editProductForm = document.getElementById('edit-product-form')


const $actionHeader = document.getElementById('action-header')

const $productImgFile = document.getElementById('product_imgFile')

const $categoriesSelect = document.getElementById('categories-select')

const $productIDInput = document.getElementById('product_id')
const $productNameInput = document.getElementById('product_name')
const $productCategoryInput = document.getElementById('product_category')
const $productPriceInput = document.getElementById('product_price')
const $productDescriptionInput = document.getElementById('product_description')
const $productIsBestSellingInput = document.getElementById('product_isBestSelling')
const $productIsFeaturedInput = document.getElementById('product_isFeatured')
const $productQuantity = document.getElementById('product_quantity')
const $productImg = document.getElementById('product-img')






$addBtn.onclick = e =>{
  $listProductSection.classList.add('hide')
  $editProductSection.classList.remove('hide')
  
  $addBtn.setAttribute('disabled', '')
  $listBtn.removeAttribute('disabled', '')

  $editProductForm.reset()
  $editProductForm.setAttribute('action', "/products/add")

  $productIDInput.value ='-'

  $actionHeader.innerText = 'Add'

}

$listBtn.onclick = e =>{
  $listProductSection.classList.remove('hide')
  $editProductSection.classList.add('hide')

  $listBtn.setAttribute('disabled', '')
  $addBtn.removeAttribute('disabled', '')



  $editProductForm.setAttribute('action', "/products/edit?method=PUT")

}

function handleEditBtn(product){
  $listProductSection.classList.add('hide')
  $editProductSection.classList.remove('hide')
  
  $addBtn.removeAttribute('disabled', '')
  $listBtn.removeAttribute('disabled', '')


  $editProductForm.setAttribute('action', "/products/edit?method=PUT")
  $productIDInput.value = product._id

  $productNameInput.value = product.name
  $productCategoryInput.value = product.category
  $productPriceInput.value = product.price
  $productDescriptionInput.value = product.description
  $productQuantity.value = product.quantity


  product.isBestSelling ? $productIsBestSellingInput.setAttribute('checked', '') : $productIsBestSellingInput.removeAttribute('checked')
  product.isFeatured ? $productIsFeaturedInput.setAttribute('checked', '') : $productIsFeaturedInput.removeAttribute('checked')


  $productImg.setAttribute('src', '/uploads/products/'+ product.imgSrc)

  $actionHeader.innerText = 'Edit'

}

$productImgFile.onchange = function (event){

  const fileReader = new FileReader()
   
  fileReader.onload = function (e){

    $productImg.setAttribute('src', fileReader.result)
  }

  fileReader.readAsDataURL(event.target.files[0])

  console.log(event.target.files[0])
}

$categoriesSelect .onchange = function(e){
  $productsList = document.getElementsByClassName('product-list-item')
  
  console.log(e.target.value)
  for( $prodructList of $productsList){
    $categoryText = $prodructList.querySelector('h5 span')
    if( $categoryText.innerText != e.target.value && e.target.value != 'All'){
      $prodructList.classList.add('hide')
    }else{
      $prodructList.classList.remove('hide')
      
    }
  }
}