var apiURL = "https://crudcrud.com/api/47d78bafbef5457d9e3f93ddef833823";

async function getBrands() {
  var result = await $.ajax({
    url: apiURL + "/pcBrands",
    dataType: "json",
    contentType: "application/json",
    type: "GET",
    error: sayError,
  });
  return result;
}

const doStuffWithData = (data) => {
  console.log(data);
};

const sayError = (error) => {
  console.log(error);
};

// getAlbums().then(result => console.log(result))
// getBrands()

async function addBrand(newBrand) {
  await $.ajax({
    url: apiURL + "/pcBrands",
    dataType: "json",
    data: JSON.stringify({ brand: newBrand }),
    contentType: "application/json",
    type: "POST",
    success: doStuffWithData,
    error: sayError
  });
}

async function deleteBrand(existingID) {
  console.log(existingID)
  await $.ajax({
    url: apiURL + "/pcBrands/" + existingID,
    type: "DELETE",
    success: doStuffWithData,
    error: sayError
  });
}

async function updateBrand(existingID, updatedBrand) {

  console.log(existingID, updatedBrand);
  
  await $.ajax({
    url: apiURL + "/pcBrands/" + existingID,
    dataType: "json",
    data: JSON.stringify({ brand: updatedBrand }),
    contentType: "application/json",
    type: "PUT",
    success: doStuffWithData,
    error: sayError
  });
}


var createInput = document.getElementById("createInput");
var createButton = document.getElementById("createButton");
var updateBrandInput = document.getElementById("updateBrandInput");
var updateIdInput = document.getElementById("updateIdInput");
var updateButton = document.getElementById("updateButton");
var deleteInput = document.getElementById("deleteInput");
var deleteButton = document.getElementById("deleteButton");
var readButton = document.getElementById("readButton");
var brands = document.getElementById("brands");

createButton.addEventListener("click", () => addBrand(createInput.value))

readButton.addEventListener("click", () => getBrands().then((data) => {

  console.log(data);
  brands.innerHTML = ""

  for (var i = 0; i < data.length; i++){
    var brand = data[i].brand
    var brandID = data[i]._id
    var p = document.createElement('p')
    p.innerHTML = brand + ", " + brandID
    brands.appendChild(p)
  }
}))

deleteButton.addEventListener("click", () => deleteBrand(deleteInput.value))

updateButton.addEventListener("click", () => updateBrand(updateIdInput.value, updateBrandInput.value).then(data => console.log(data)))
