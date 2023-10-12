const getProductId = () => window.location.search.split('?')[1].split("=")[1];
const getProductDetails = () => JSON.parse(window.localStorage.getItem("products") || "").filter(item => item.id == getProductId())[0];

const data = getProductDetails();

const navigateToHomePage = (event) => {
    location.href = '/'
}

const navigateToCart = (event) => {
    location.href = "/cart.html"
}

const setPRoductDataInUI = () => {
    const {image,category,price,description,title,rating} = getProductDetails();
    (document.getElementById("image") as HTMLImageElement).setAttribute("src",image);
    (document.getElementById("description") as HTMLElement).innerText = description;
    (document.getElementById("rating") as HTMLDivElement).style.width = `${rating.rate * 150/5}px`;
    (document.getElementById("title")as HTMLElement).innerText = title.toString().toLocaleUpperCase();
    (document.getElementById("category")as HTMLElement).innerText = category.charAt(0).toLocaleUpperCase() + category.substr(1);
}

setPRoductDataInUI();

