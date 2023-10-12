// const axios = require('axios');



let categories = [];

const navigateToProduct = (event) => {
    const products = JSON.parse(window.localStorage.getItem("products"));
    const product = products.filter(item => item.title.trim() == [...event.currentTarget.parentElement.childNodes][1].innerText)[0];
    location.href = `./product.html?id=${product.id}`;
}

const navigateToCategoryPage = (event) => {
    const title = [...event.target.parentElement.childNodes][0].innerText.toString().toLocaleLowerCase();
    location.href = `./category.html?title=${title}`;
}

const addProductsInUI = (item,appendTo) => {
    const categoryData = JSON.parse(window.localStorage.getItem(item));
    console.log(categoryData);
    // while(window.localStorage.getItem(item) == null){ setProductsInCategory(item)}
        categoryData?.forEach((item , index) => {
            const cardDiv = document.createElement("div");
            cardDiv.setAttribute("class","productCardContainer");
            const imgTag = document.createElement("img");
            imgTag.setAttribute("alt" , `${item}Image${index}`);
            imgTag.setAttribute("src" , item.image);
            imgTag.setAttribute("class","productImg")
            
            const titleTag = document.createElement("p");
            titleTag.innerText = item.title;
            titleTag.setAttribute("onClick", "navigateToProduct(event)");
            titleTag.setAttribute("class","productTitle");
        
            const priceContainer = document.createElement("div");
            priceContainer.setAttribute("class","priceContainer");
        
            const priceTag = document.createElement("p");
            priceTag.setAttribute("class","priceInfo");
            priceTag.innerHTML = `&#8377;`+item.price;
        
            const cart = JSON.parse(localStorage.getItem("cart"));
            const found = cart?.filter(i => item.id == i.id)[0];
            const cartBtn = document.createElement("button");
            cartBtn.setAttribute("id","Cart "+item.id);
            if(!found){
                 cartBtn.setAttribute("onclick" , "addToCart(event)");
                 cartBtn.innerText="ADD";
                 cartBtn.setAttribute("class","productCartButton");
            }else{
                cartBtn.setAttribute("class","productCartBtn");
                const decBtn = document.createElement("button");
                decBtn.innerText = "-";
                decBtn.setAttribute("onclick","changeQuantity(event)");
            
                const incBtn = document.createElement("button");
                incBtn.innerText = "+";
                incBtn.setAttribute("onclick","incQuantity(event)");
        
                const quanitityText = document.createElement("p");
                quanitityText.setAttribute("id",found.id);
                quanitityText.innerText=found.quantity;
        
                cartBtn.appendChild(decBtn);
                cartBtn.appendChild(quanitityText);
                cartBtn.appendChild(incBtn);
            }
        
            priceContainer.appendChild(priceTag);
            priceContainer.appendChild(cartBtn);
            cardDiv.appendChild(imgTag);
            cardDiv.appendChild(titleTag);
            cardDiv.appendChild(priceContainer);
            appendTo.appendChild(cardDiv);
        });
}

const setUI = () => {
    const parentElement = document.getElementById("products");
    const data = window.localStorage.getItem("categories").split(",");
    data.forEach(async item => {
        const categoryDiv = document.createElement("div");
        categoryDiv.setAttribute("class","categoryWrapper");
        categoryDiv.style.display = "flex";
        const seeAllText = document.createElement("p");
        seeAllText.setAttribute("class" , "seeAllText");
        seeAllText.setAttribute("id","seeAll");
        seeAllText.innerText="view all";
        seeAllText.setAttribute("onClick", "navigateToCategoryPage(event)");

        const categoryHeadingDiv = document.createElement("div");
        categoryHeadingDiv.setAttribute("class","categoryHeading");
        const categoryText = document.createElement("p");
        categoryText.innerText = item.toLocaleUpperCase();
        categoryText.setAttribute("class","categoryText");

        addProductsInUI(item , categoryDiv);
        
        // categoryDiv.innerText = categoryData?.map(item => item.title);
        categoryHeadingDiv.appendChild(categoryText);
        categoryHeadingDiv.appendChild(seeAllText);
        parentElement.appendChild(categoryHeadingDiv);
        parentElement.appendChild(categoryDiv);
        

    })
}

const changeQuantity = (event) => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    const id = [...event.target.parentElement.childNodes][1].id
    const found = cart.filter( item => parseInt(item.id) == id)[0];
    const newCart = cart.filter(item => item.id != found.id); 
    if(found.quantity == 1){
        localStorage.setItem("cart",JSON.stringify(newCart));
        document.getElementById("products").innerHTML = "";
        setUI();
    }else{
        found.quantity = found.quantity - 1;
        localStorage.setItem("cart",JSON.stringify([...newCart,found]));
        document.getElementById(id).innerText = found.quantity;
    }
}

const incQuantity = (event) => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    const id = [...event.target.parentElement.childNodes][1].id;
    const found = cart.filter( item => parseInt(item.id) == id)[0];
    const newCart = cart.filter(item => item.id != found.id); 
    found.quantity = found.quantity + 1;
    console.log([...newCart,found]);
    localStorage.setItem("cart",JSON.stringify([...newCart,found]));
    document.getElementById(id).innerText = found.quantity;
// renderDataInCartUI();
}

const navigateToHome = (event) => {
    location.href = '/'
}



const addToCart = (event) =>{
    const productTitle = [...event.target.parentElement.parentElement.childNodes][1].innerText;
    const products = JSON.parse(window.localStorage.getItem("products"));
    const product = products.filter(item => item.title.trim() == productTitle)[0];
    const cart = JSON.parse(window.localStorage.getItem("cart"));
    const foundInCart = cart?.filter(item => item.title == productTitle)[0];
    if(foundInCart){
        const newCart = cart.filter(item => item.title.trim() != productTitle);
        foundInCart.quantity = foundInCart.quantity + 1;
        newCart.push(foundInCart);
        // console.log(newCart);
        window.localStorage.setItem("cart" , JSON.stringify(newCart));
    }else{
        const newProduct = {...product , quantity : 1};
        if(cart && cart.length > 0)
        window.localStorage.setItem("cart" , JSON.stringify([...cart,newProduct]));
        else
        window.localStorage.setItem("cart" , JSON.stringify([newProduct]));
    }
    const cartBtn = document.getElementById(event.target.id);
    cartBtn.innerHTML="";
    // cartBtn.removeAttribute("class");
    cartBtn.setAttribute("class","productCartBtn");
    const decBtn = document.createElement("button");
        decBtn.innerText = "-";
        decBtn.setAttribute("onclick","changeQuantity(event)");
    
        const incBtn = document.createElement("button");
        incBtn.innerText = "+";
        incBtn.setAttribute("onclick","incQuantity(event)");

        const quanitityText = document.createElement("p");
        quanitityText.setAttribute("id",event.target.id.split(" ")[1]);
        quanitityText.innerText=1;
        cartBtn.appendChild(decBtn);
        cartBtn.appendChild(quanitityText);
        cartBtn.appendChild(incBtn);
        cartBtn.removeAttribute("onclick");
} 

const initData = async () => {
    await getAllCategories();
    await getAllProducts();
    const categories = window.localStorage.getItem("categories").split(",");
    // console.log(categories);
    categories.forEach(async item => {
        await getProductsInCateogory(item);
    });
    setTimeout(() => {
        setUI();

    },1000)
}


const getData = async (url) => {
    try{
        const res = await axios.get(`https://fakestoreapi.com/products/${url}`);
        return res.data;
    }catch(err){
        console.log(err);
    }
}

const getProductsInCateogory = async (category) =>{
        const data = await getData(`category/${category}`);
        window.localStorage.setItem(category , JSON.stringify(data));
}

const getAllProducts = async () => {
    if(!window.localStorage.getItem("products")){
        const data = await getData("");
        window.localStorage.setItem("products" , JSON.stringify(data));
        return data;
    }else{
        return window.localStorage.getItem("categories");
    }
}

const setProductsInCategory = () => {
    const productDiv = document.getElementById("product");
    const category = window.location.search.replace("%20"," ").replace("%27","'").split("?")[1].split("=")[1];
    const categoryDiv = document.getElementById("product");
    const categoryTitle = document.createElement("p");
    categoryTitle.setAttribute("class" , "categoryTitle");
    categoryTitle.innerText = category.charAt(0).toLocaleUpperCase() + category.substring(1);
    categoryDiv.appendChild(categoryTitle);
    const categoryProductsDiv = document.createElement("div");
    categoryProductsDiv.setAttribute("class" , "categoryProductsContainer");
    categoryDiv.appendChild(categoryProductsDiv);
    addProductsInUI(JSON.parse(window.localStorage.getItem(category)),categoryProductsDiv);
}

const getAllCategories = async () => {
        const data = await getData("categories");
        window.localStorage.setItem("categories" , data);
}

const navigateToCart = (event) => {
    location.href = "/cart.html"
}



document.addEventListener("DOMContentLoaded", function() {
    if(location.pathname == '/'){
        initData();
    }
    else
    setProductsInCategory();
}); 
