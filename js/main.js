const createElement = function(elName, className, textContent, image) {
    const createdElement = document.createElement(elName)
    createdElement.className = className;

    
    if (textContent){
        createdElement.textContent = textContent;
    } else  {
        createdElement.src = image 
    }
    return createdElement ;
}

const addZero = function(number) {
    return number < 10 ? "0" + number : number 
}

const dateShow = function(dateString) {
    const date = new Date(dateString);

    return `${addZero(date.getDate())}.${addZero(date.getMonth())}.${date.getFullYear()}`
}

const birdsList = document.querySelector("#bird-list");

const renderBird = function(parrot){

    const {id, img, title, price, sizes, birthDate} = parrot;
    //  currentParrots = parrot 

    const birdItem = document.createElement("li", "col-6","", "");

    const birdCard = createElement("div", "card","","");
    const birdImg = createElement("img", "card-img-top", "", img)
    const birdCardBody = createElement("div", "card-body", "","");
    const birdTitle = createElement("h3", "card-title", title, "");
    const birdPrice = createElement("p", "card-text fw-bold", `$${price}`, "")
    const birdPriceMark = createElement("mark", "", "", "");
    birdPrice.append(birdPriceMark);
    const birdWidth = createElement("p", "badge bg-success", `${sizes.width}sm x ${sizes.height}sm`, "");

    const birdBirth = createElement("p", "card-text", dateShow(birthDate), "");

    const birdBenefitsList = createElement("ul", "d-flex flex-wrap list-unstyled", "","");
    const birdBenefitsItem = createElement("li", "badge bg-primary me-1 mb-1","","");  
    birdBenefitsList.append(birdBenefitsItem);

    const birdPosition = createElement("div", "position-absolute top-0 end-0 d-flex","","");
    const birdShowFavourites = createElement("button", "btn rounded-0 btn-success","","");
    const birdFa = createElement("i", "fa fa-star-o","","");
    birdShowFavourites.append(birdFa);
    const birdEditBtn = createElement("button", "btn rounded-0 btn-secondary","")
    const birdEditIcon = createElement("i", "fa-solid fa-pen","");
    birdEditIcon.style.pointerEvents = "none";
    birdEditBtn.append(birdEditIcon);
    // birdEditBtn.setAttribute("data-bs-dismiss", "modal");
    birdEditBtn.setAttribute("data-bs-toggle" ,"modal")
    birdEditBtn.setAttribute("data-bs-target", "#edit-parrot-modal");
    birdEditBtn.setAttribute("data-id", id);

    const birdDelBtn = createElement("button", "btn rounded-0 btn-danger","");
    const birdDelIcon = createElement("button", "fa-solid fa-trash","");
    birdDelBtn.setAttribute("data-id", id);
    birdDelIcon.style.pointerEvents = "none";
    birdDelBtn.append(birdDelIcon);

    birdPosition.append(birdShowFavourites);
    birdPosition.append(birdEditBtn);
    birdPosition.append(birdDelBtn);

    birdCard.append(birdImg);
    birdCard.append(birdCardBody);

    birdCardBody.append(birdTitle);
    birdCardBody.append(birdPrice);
    birdCardBody.append(birdPosition);
    birdCardBody.append(birdBenefitsList);
    birdCardBody.append(birdWidth);
    birdCardBody.append(birdBirth);

    birdItem.append(birdCard);

    return birdItem ;
}

const renderBirds = function() {
    birdsList.innerHTML = "";
     parrots.forEach(function(parrot){
     const birdItem = renderBird(parrot);
     birdsList.append(birdItem)
    });
}
      
    for (let i = 0; i < parrots.length; i++){
        const currentParrots = parrots[i]
        const birdItem = renderBird(currentParrots)
        birdsList.append(birdItem)
    }

    const titleEdit = document.querySelector("#edit-parrot-title");
    const priceEdit = document.querySelector("#edit-parrot-price");
    const widthEdit = document.querySelector("#edit-parrot_width");
    const heightEdit = document.querySelector("#edit-parrot_height");
    const dateBirthEdit = document.querySelector("#edit-parrot-date");
    const featuresEdit = document.querySelector("#edit-parrot-features")

    // --------------------delete--------------------

    birdsList.addEventListener("click", function(evt){ 
        if(evt.target.matches(".btn-danger")){
            const clickedItemId = +evt.target.dataset.id;
            const clickedItemIndex = parrots.findIndex(function(parrot) {
                return parrot.id === clickedItemId;
            })
            parrots.splice(clickedItemIndex, 1);

            renderBirds()

        } else if (evt.target.matches(".btn-secondary")){
            const clickedId = +evt.target.dataset.id

            const clickedItem = parrots.find(function(parrot){
                return parrot.id === clickedId ;
            })

            titleEdit.value = clickedItem.title;
            priceEdit.value = clickedItem.price;
            widthEdit.value = clickedItem.sizes.width;
            heightEdit.value = clickedItem.sizes.height;
            dateBirthEdit.value = clickedItem.date;
            featuresEdit.value = clickedItem.features;

            editForm.setAttribute("data-editing-id", clickedId);
        }
    })

   renderBirds();

const addForm = document.querySelector("#add-parrot-modal");
const addParrotModalEl = document.querySelector("#add-parrot-modal");
const addParrotModal = new bootstrap.Modal(addParrotModalEl);

addForm.addEventListener("submit", function(evt){
    evt.preventDefault();

    const elements = evt.target.elements;

    const titleInput = elements["parrot-title"];
    const imgInput = elements["parrot-img"]; 
    const dateInput = elements["parrot-date"];
    const widthInput = elements["parrot_width"];
    const heightInput = elements["parrot_height"];
    const featuresInput = elements["features"];
    const priceInput = elements["price"];

    const priceValue = priceInput.value;
    const titleValue = titleInput.value;
    const imgValue = imgInput.value;
    const dateValue = dateInput.value;
    const widthValue = widthInput.value;
    const heightValue = heightInput.value;
    const featuresValue = featuresInput.value;

    if(titleValue.trim() && imgValue.trim() && dateValue.trim() && widthValue.trim() 
    && heightValue.trim() && featuresValue.trim()){

        const parrot = {
            id : Math.floor(Math.random() * 1000),
            img : imgValue, 
            title : titleValue,
            date : new Date().toISOString(),
            price : priceValue,
            sizes: {
                width : widthValue,
                height : heightValue
            },
            features : featuresValue,
        }

        parrots.push(parrot);
        addParrotModal.hide();

        const renderItem = renderBird(parrot);
        birdsList.append(renderItem)
    }

})  

// ----------------------edit------------------------
const editForm = document.querySelector("#edit-form");
const editParrotModalEl = document.querySelector("#edit-parrot-modal");
const editParrotModal = new bootstrap.Modal(editParrotModalEl);

editForm.addEventListener("submit", function(evt){
    evt.preventDefault();

    // const elements = evt.target.elements;

    const editingId = evt.target.elements.editingId;

    // const titleInput = elements["edit-parrot-title"];
    // const imgInput = elements["edit-parrot-img"]; 
    // const dateInput = elements["edit-parrot-date"];
    // const widthInput = elements["edit-parrot_width"];
    // const heightInput = elements["edit-parrot_height"];
    // const featuresInput = elements["edit-features"];
    // const priceInput = elements["edit-parrot-price"];

    // const priceValue = priceInput.value;
    // const titleValue = titleInput.value;
    // const imgValue = imgInput.value;
    // const dateValue = dateInput.value;
    // const widthValue = widthInput.value;
    // const heightValue = heightInput.value;
    // const featuresValue = featuresInput.value;

    const priceValue = priceEdit.value;
    const titleValue = titleEdit.value;
    const dateValue = dateBirthEdit.value;
    const widthValue = widthEdit.value;
    const heightValue = heightEdit.value;
    const featuresValue = featuresEdit.value;

    if(titleValue.trim() && dateValue.trim() && widthValue.trim() 
    && heightValue.trim() && featuresValue.trim()){

        const editingItemIndex = parrots.findIndex(function(parrot){
            return parrot.id === editingId
        })

        const parrot = {
            id : editingId,
            title : titleValue,
            date : new Date().toISOString(),
            price : priceValue,
            sizes: {
                width : widthValue,
                height : heightValue
            },
            features : featuresValue,
        }

        parrots.splice(editingItemIndex, 1, parrot);
        editForm.reset();
        editParrotModal.hide();

        renderBirds();
    }
})  

// --------------------filter--------------------

const filterForm = document.querySelector(".filter")

filterForm.addEventListener("submit", function(evt){
    evt.preventDefault();

    const elements = evt.target.elements;

    // const searchValue = elements.search.value;
    const fromValue = elements.from.value;
    const toValue = elements.to.value;
    // const fromWidthValue = elements["from_width"].value;
    // const toWidthValue = elements["#to_width"];
    // const fromHeightValue = elements["#from_height"];
    // const toHeightValue = elements["#to_height"];

    const filteredParrot = parrots.filter(function(parrot) {
        const searchFromValue = parrot.price;
        return searchFromValue >= fromValue;
    })
    .filter(function(parrot){
        const searchToValue = parrot.price;
        return !toValue ? true: searchToValue <= toValue;
    })
    renderBirds(filteredParrot)
})




    

    
        
    

   



