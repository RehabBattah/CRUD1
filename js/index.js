var productNameInput = document.getElementById("productNameInput");
var productPriceInput = document.getElementById("productPriceInput");
var productCategoryInput = document.getElementById("productCategoryInput");
var productDescriptionInput = document.getElementById(
  "productDescriptionInput"
);
var productsContainer = [];
// var searchInput =document.getElementById("searchInput");
var addBtn = document.getElementById("addBtn");
var updatedIndex = 0;

if (localStorage.getItem("userProducts") != null) {
  productsContainer = JSON.parse(localStorage.getItem("userProducts"));
  displayProducts();
}

function addProduct() {
  if (validateProductName() == true) {

    if (addBtn.innerText == "Update") {
      updateProduct();
      displayProducts();
      clearForm();
    } else {
      var product = {
        name: productNameInput.value,
        price: productPriceInput.value,
        category: productCategoryInput.value,
        desc: productDescriptionInput.value,
      };
      productsContainer.push(product);
      localStorage.setItem("userProducts", JSON.stringify(productsContainer));

      displayProducts();
      clearForm();
    }
  } else {
    window.alert("Invalid Name");
  }
}

function clearForm() {
  productNameInput.value = "";
  productPriceInput.value = "";
  productCategoryInput.value = "";
  productDescriptionInput.value = "";
}

function displayProducts() {
  var cartoona = [];
  for (var i = 0; i < productsContainer.length; i++) {
    cartoona += `<tr>
    <td>${i + 1}</td>
    <td>${productsContainer[i].name}</td>
    <td>${productsContainer[i].price}</td>
    <td>${productsContainer[i].category}</td>
    <td>${productsContainer[i].desc}</td> 
    <td><button class="btn btn-sm btn-outline-warning" onclick="getProductData(${i});">Update</button></td> 
    <td><button class="btn btn-sm btn-outline-danger" onclick="deleteProduct(${i});">Delete</button></td>
      
    </tr>`;
  }
  document.getElementById("tbody").innerHTML = cartoona;
}

function deleteProduct(deletedIndex) {
  productsContainer.splice(deletedIndex, 1);
  localStorage.setItem("userProducts", JSON.stringify(productsContainer));
  displayProducts();
}

// oninput="searchProduct(this.value)"
// var  user = "sAmsUng";
// var term = "same";

// console.log(user.toLocaleLowerCase().includes(term.toLocaleLowerCase()));

function searchProduct(term) {
  // var term = searchInput.value;
  var cartoona = "";
  for (var i = 0; i < productsContainer.length; i++) {
    if (
      productsContainer[i].name
        .toLocaleLowerCase()
        .includes(term.toLocaleLowerCase()) == true
    ) {
      cartoona += `<tr>
      <td>${i + 1}</td>
      <td>${productsContainer[i].name}</td>
      <td>${productsContainer[i].price}</td>
      <td>${productsContainer[i].category}</td>
      <td>${productsContainer[i].desc}</td> 
      <td><button class="btn btn-sm btn-outline-warning" onclick="function getProductData(${i});">Update</button></td> 
      <td><button class="btn btn-sm btn-outline-danger" onclick="deleteProduct(${i});">Delete</button></td>
         
      </tr>`;
    }
  }

  document.getElementById("tbody").innerHTML = cartoona;
}

function getProductData(index) {
  updatedIndex = index;
  productNameInput.value = productsContainer[index].name;
  productPriceInput.value = productsContainer[index].price;
  productCategoryInput.value = productsContainer[index].category;
  productDescriptionInput.value = productsContainer[index].desc;
  addBtn.innerHTML = "Update";
  addBtn.classList.replace("btn-success", "btn-warning");
}

function updateProduct() {
  var product = {
    name: productNameInput.value,
    price: productPriceInput.value,
    category: productCategoryInput.value,
    desc: productDescriptionInput.value,
  };
  productsContainer[updatedIndex] = product;
  localStorage.setItem("userProducts", JSON.stringify(productsContainer));
  addBtn.innerHTML = "Add Product";
  addBtn.classList.replace("btn-warning", "btn-success");
}

function validateProductName() {
  var regex = /^[a-z]{3,10}$/;
  if (regex.test(productNameInput.value) == true) {
    return true;
  } else {
    return false;
  }
}
