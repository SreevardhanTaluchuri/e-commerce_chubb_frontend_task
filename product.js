const getProductId = () => window.location.search.split('?')[1].split("=")[1];
const getProductDetails = () => JSON.parse(window.localStorage.getItem("products")).filter(item => item.id == getProductId())[0];

const data = getProductDetails();

const navigateToHome = (event) => {
    location.href = '/'
}

const navigateToCart = (event) => {
    location.href = "/cart.html"
}

const setPRoductDataInUI = () => {
    const {image,category,price,description,title,rating} = getProductDetails();
    document.getElementById("image").setAttribute("src",image);
    document.getElementById("description").innerText = description;
    document.getElementById("rating").style.width = `${rating.rate * 150/5}px`;
    document.getElementById("title").innerText = title.toString().toLocaleUpperCase();
    document.getElementById("category").innerText = category.charAt(0).toLocaleUpperCase() + category.substr(1);
}

setPRoductDataInUI();

