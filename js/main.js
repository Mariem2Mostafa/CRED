



//#############Variable#################



var nameInput = document.getElementById('nameInput');
var priceInput = document.getElementById('priceInput');
var typeInput = document.getElementById('typeInput');
var descInput = document.getElementById('descInput');
var searchInput = document.getElementById('searchInput');
var tableBody = document.getElementById('tableBody');
var addButton=document.getElementById('addButton');
var updateButton = document.getElementById('updateButton');
var nameError=document.getElementById("nameError")
var priceError=document.getElementById("priceError")
var typeError=document.getElementById("typeError")
var descError=document.getElementById("descError")

var currentIndex = 0;
var productList = [];


//###################LocalStorage#########################
if (localStorage.getItem!=null) {
    productList= JSON.parse(localStorage.getItem("products"))
    diplay()
}


//##########################################################


function addProduct() {
    if (validationDate()) {
        var product = {
        name: nameInput.value,
        price: priceInput.value,
        type: typeInput.value,
        desc: descInput.value
    };
    productList.push(product);
    localStorage.setItem("products", JSON.stringify(productList))

    diplay();
        clearform()
    }
    
}
//#########################################

function diplay() {
    
    var box = "";
    for (var i = 0; i < productList.length; i++){
        box += ` <tr class="text-center">
                        <th scope="row">${i+1}</th>
                        <td>${productList[i].name}</td>
                        <td>${productList[i].price}</td>
                        <td>${productList[i].type}</td>
                        <td>${productList[i].desc}</td>
                        <td>
                            <button  onclick="deleteProduct(${i})" id="deleteBtn" class="btn btn-danger ">Delete</button>
                            <button onclick="editBtn(${i})" id="editBtn" class="btn btn-warning ">Edit</button>         
                        </td>
                        
                    </tr> `
    }
    tableBody.innerHTML = box;
}

//#########################################

function deleteProduct(index) {
    productList.splice(index, 1);
    diplay();
        console.log(productList);

}

//#########################################


function searchProduct() {
    var term = searchInput.value;
    var text = "";
    var box = "";
    for (var i = 0; i < productList.length; i++){
        text = productList[i].name;
        if (text.includes(term.toUpperCase()) || text.includes(term.toLowerCase())) {
            box += ` <tr class="text-center">
                        <th scope="row">${i+1}</th>
                        <td>${productList[i].name}</td>
                        <td>${productList[i].price}</td>
                        <td>${productList[i].type}</td>
                        <td>${productList[i].desc}</td>
                        <td>
                            <button onclick="deleteProduct(${i})" id="deleteBtn" class="btn btn-danger ">Delete</button>
                            <button onclick="editBtn(${i})"  id="editBtn" class="btn btn-warning ">Edit</button>         
                        </td>
                        
                    </tr> `
        }
    }
    tableBody.innerHTML = box;
}

//#########################################

function editBtn(index) {
    currentIndex=index
    addButton.classList.add("d-none");
    updateButton.classList.remove("d-none")
    nameInput.value = productList[index].name;
    priceInput.value = productList[index].price;
    typeInput.value = productList[index].type;
    descInput.value = productList[index].desc;

}


function updateData() {
    if (validationDate()) {
        
        productList[currentIndex].name = nameInput.value;
        productList[currentIndex].price =priceInput.value;
        productList[currentIndex].type= typeInput.value;
        productList[currentIndex].desc = descInput.value;
        
    localStorage.setItem("products", JSON.stringify(productList))

    diplay();
    clearform()

    addButton.classList.remove("d-none");
    updateButton.classList.add("d-none");

    }
    }

function clearform() {
    nameInput.value = "";
    priceInput.value = "";
    typeInput.value = "";
    descInput.value = "";
    nameInput.classList.remove("is-valid");
    priceInput.classList.remove("is-valid");
    typeInput.classList.remove("is-valid");
    descInput.classList.remove("is-valid");
}


function nameValidation(){
    var regex = /^[A-Z][a-z]{3,8}$/;
    var text=nameInput.value
    if(regex.test(text)){

        nameError.classList.add("d-none")
        nameInput.classList.add("is-valid");
        nameInput.classList.remove("is-invalid");
        return true

    }else{
        nameError.classList.remove("d-none");
        nameInput.classList.add("is-invalid");
        nameInput.classList.remove("is-valid");

        return false;
    }
}



function priceValidation(){
    var regex = /^([2-9][0-9]{3}|1[0-9]{4}|20000)$/;
    var text=priceInput.value
    if(regex.test(text)){

        priceError.classList.add("d-none")
        priceInput.classList.add("is-valid");
        priceInput.classList.remove("is-invalid");
        return true

    }else{
        priceError.classList.remove("d-none");
        priceInput.classList.add("is-invalid");
        priceInput.classList.remove("is-valid");

        return false;
    }
}


function typeValidation(){
    var regex = /^(Mobile|Laptop|Watch)$/;
    var text=typeInput.value
    if(regex.test(text)){

        typeError.classList.add("d-none")
        typeInput.classList.add("is-valid");
        typeInput.classList.remove("is-invalid");
        return true

    }else{
        typeError.classList.remove("d-none");
        typeInput.classList.add("is-invalid");
        typeInput.classList.remove("is-valid");

        return false;
    }
}




function descValidation() {
    var regex = /^[a-zA-Z\s]{3,100}$/;
    var text=descInput.value
    if(regex.test(text)){

        descError.classList.add("d-none")
        descInput.classList.add("is-valid");
        descInput.classList.remove("is-invalid");
        return true

    }else{
        descError.classList.remove("d-none");
        descInput.classList.add("is-invalid");
        descInput.classList.remove("is-valid");

        return false;
    }
}

function validationDate() {

    if (nameValidation() && priceValidation() && typeValidation() && descValidation()) {
        return true
    }
    else {
        return false
    }

}




