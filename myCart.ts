const changeQuantity = (event) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "");
    const id = [...event.target.parentElement.childNodes][1].id
    const found = cart.filter( item => parseInt(item.id) == id)[0];
    const newCart = cart.filter(item => item.id != found.id); 
    if(found.quantity == 1){
        localStorage.setItem("cart",JSON.stringify(newCart));
        (document.getElementById("cartProducts") as HTMLElement).innerHTML="";
        (document.getElementById("cart") as HTMLElement).innerHTML="";
        renderDataInCartUI();
        renderTotalCart();
    }else{
        found.quantity = found.quantity - 1;
        localStorage.setItem("cart",JSON.stringify([...newCart,found]));
        (document.getElementById(id) as HTMLElement).innerText = found.quantity;
        (document.getElementById("cart") as HTMLElement).innerHTML="";
        renderTotalCart();
    }
}
const incQuantity = (event) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "");
    const id = [...event.target.parentElement.childNodes][1].id
    const found = cart.filter( item => parseInt(item.id) == id)[0];
    const newCart = cart.filter(item => item.id != found.id); 
    found.quantity = found.quantity + 1;
    localStorage.setItem("cart",JSON.stringify([...newCart,found]));
    (document.getElementById(id) as HTMLElement).innerText = found.quantity;
    (document.getElementById("cart") as HTMLElement).innerHTML="";
    renderTotalCart();
// renderDataInCartUI();
}

const navigateToHome = (event) => {
    location.href = '/'
}

const addProductsInUI = (productsData,appendTo) => productsData?.sort((a,b) => a.id-b.id)?.forEach((item , index) => {
    const cardDiv = document.createElement("div");
    cardDiv.setAttribute("class","productCardContainer")
    const imgTag = document.createElement("img");
    imgTag.setAttribute("alt" , `${item}Image${index}`);
    imgTag.setAttribute("src" , item.image);
    imgTag.setAttribute("class","productImg");

    const cardContentDiv = document.createElement("div");
    cardContentDiv.setAttribute("class","cardContentContainer");
    
    const titleTag = document.createElement("p");
    titleTag.innerText = item.title;
    titleTag.setAttribute("onClick", "navigateToProduct(event)");
    titleTag.setAttribute("class","productTitle");

    const priceContainer = document.createElement("div");
    priceContainer.setAttribute("class","priceContainer");

    const priceTag = document.createElement("p");
    priceTag.setAttribute("class","priceInfo");
    priceTag.innerHTML = "Price: "+`&#8377;`+item.price;

    const cartBtn = document.createElement("button");
    cartBtn.setAttribute("class","productCartButton");
    
    const decBtn = document.createElement("button");
    decBtn.innerText = "-";
    decBtn.setAttribute("onclick","changeQuantity(event)");
    
    const incBtn = document.createElement("button");
    incBtn.innerText = "+";
    incBtn.setAttribute("onclick","incQuantity(event)");

    const quanitityText = document.createElement("p");
    quanitityText.setAttribute("id",item.id);
    quanitityText.innerText=item.quantity;

    cartBtn.appendChild(decBtn);
    cartBtn.appendChild(quanitityText);
    cartBtn.appendChild(incBtn);


    priceContainer.appendChild(priceTag);
    priceContainer.appendChild(cartBtn);
    cardContentDiv.appendChild(titleTag);
    cardContentDiv.appendChild(priceContainer);
    cardDiv.appendChild(imgTag);
    cardDiv.appendChild(cardContentDiv);
    appendTo.appendChild(cardDiv);
});

const navigateToProduct = (event) => {
    const products = JSON.parse(window.localStorage.getItem("products") || "");
    // console.log([...event.currentTarget.parentElement.childNodes]);
    const product = products.filter(item => item.title.trim() == [...event.currentTarget.parentElement.childNodes][0].innerText)[0];
    location.href = `./product.html?id=${product.id}`;
}

const renderTotalCart = () => {
    const cart = JSON.parse(window.localStorage.getItem("cart") || "");
    const billInfoContainerDiv = document.getElementById("cart") as HTMLElement;
    let total = 0;
    cart.sort((a,b) => a.id-b.id).forEach(item => {
        const productBillDiv = document.createElement("div");
        productBillDiv.setAttribute("class","productBillContainer");
        const productBillTitle = document.createElement("p");
        productBillTitle.setAttribute("class","productBillTitle");
        productBillTitle.innerText = item.title;
        const productBillAmount = document.createElement("p");
        productBillAmount.setAttribute("class","productBillAmount");
        productBillAmount.innerHTML =`&#8377;`+ parseInt(item.price) * item.quantity;
        total += parseInt(item.price) * item.quantity;
        productBillDiv.appendChild(productBillTitle);
        productBillDiv.appendChild(productBillAmount);
        billInfoContainerDiv.appendChild(productBillDiv);
    })
    const totalAmountDiv = document.createElement("div");
    totalAmountDiv.setAttribute("class","totalCartAmountContainer");
    const billTotalTitle = document.createElement("p");
    billTotalTitle.setAttribute("class","billTotalTitle");
    billTotalTitle.innerText = "Grand Total";
    
    const billTotalAmount = document.createElement("p");
    billTotalAmount.setAttribute("class","billTotalAmount");
    billTotalAmount.innerHTML = `&#8377;`+ total;

    totalAmountDiv.appendChild(billTotalTitle);
    totalAmountDiv.appendChild(billTotalAmount);
    billInfoContainerDiv.appendChild(totalAmountDiv);
}

const renderDataInCartUI = () => {
    const cartData = JSON.parse(localStorage.getItem("cart") || "");
    addProductsInUI(cartData , document.getElementById("cartProducts"));
}

renderTotalCart();
renderDataInCartUI();