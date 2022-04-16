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

    const birdBirth = createElement("p", "card-text", birthDate, "");

    const birdBenefitsList = createElement("ul", "d-flex flex-wrap list-unstyled", "","");
    const birdBenefitsItem = createElement("li", "badge bg-primary me-1 mb-1","","");  
    birdBenefitsList.append(birdBenefitsItem);

    const birdPosition = createElement("div", "position-absolute top-0 end-0 d-flex","","");
    const birdShowFavourites = createElement("button", "btn rounded-0 btn-success","","");
    const birdFa = createElement("i", "fa fa-star-o","","");
    birdShowFavourites.append(birdFa);
    const birdEdit = createElement("button", "btn rounded-0 btn-secondary","")
    const birdFaPEn = createElement("i", "fa-solid fa-pen","");
    birdEdit.append(birdFaPEn);
    const birdDel = createElement("button", "btn rounded-0 btn-danger","");
    const birdFaTrash = createElement("button", "fa-solid fa-trash","");
    birdDel.append(birdFaTrash);

    birdPosition.append(birdShowFavourites);
    birdPosition.append(birdEdit);
    birdPosition.append(birdDel);

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

const renderBirds = function(parrotArray){
    // birdsList.innerHTML = "";

    parrotArray.forEach(function(parrots){
        const parrots = parrots[i]
        const birdItem = renderBird(parrots);
        birdsList.append(birdItem)
    })
}

    for (let i = 0; i < parrots.length; i++){
        const currentParrots = parrots[i]
        const birdItem = renderBird(currentParrots)
        birdsList.append(birdItem)
    }

const addForm = document.querySelector("#add-parrot-modal");
const addParrotModalEl = document.querySelector("#add-parrot-modal");
const addParrotModal = new bootstrap.Modal(addParrotModalEl)

// const parrotTitle = document.querySelector("#parrot-title");
// const parrotImg = document.querySelector("#parrot-img");
// const parrotDate = document.querySelector("#parrot-date");
// const parrotWidth = document.querySelector("#parrot_width");
// const parrotHeight = document.querySelector("#parrot_height");
// const parrotFeature = document.querySelector("#feature");

addForm.addEventListener("submit", function(evt){
    evt.preventDefault();

    const elements = evt.target.elements;

    const titleInput = elements.title;
    const imgInput = elements.img; 
    const dateInput = elements.birthDate;
    const sizesInput = elements.sizes;
    const featuresInput = elements.features;
    const priceInput = elements.price;

    const priceValue = priceInput.value;
    const titleValue = titleInput["parrot-title"].value;
    const imgValue = imgInput["parrot-img"].value;
    const dateValue = dateInput["parrot-date"].value;
    const widthValue = sizesInput["parrot_width"].value;
    const heightValue = sizesInput["parrot_height"].value;
    const featuresValue = featuresInput["feature"].value;

    if(titleValue.trim() && imgValue.trim() && dateValue.trim() && widthValue.trim() && heightValue.trim() && featuresValue.trim()){

        const parrot = {
            id : Math.floor(Math.random() * 1000),
            img : imgValue, 
            title : titleValue,
            date : dateValue,
            price : priceValue,
            sizes: {
                width : widthValue,
                height : heightValue
            },
            features : featuresValue,
        }
            console.log(parrot)

        parrots.push(parrot);
        addForm.reset();
        addParrotModal.hide();
    }

})  




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
        return !searchToValue ? true: searchToValue <= toValue;
    })
    renderBirds(filteredParrot)
    console.log(filteredParrot)
})




    

    
        
    

   



