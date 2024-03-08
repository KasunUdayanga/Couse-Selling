const cart=document.querySelector("nav.cart");
const cartSidebar=document.querySelector(".cart-sidebar");
const closecart=document.querySelector(".close-cart");
const buger=document.querySelector(".buger");
const menuSidebar=document.querySelector("menu-sidebar");
const closemenu=document.querySelector(".close-menu");
const cardItemsTotal=document.querySelector("noi");
const cartPriceTotal=document.querySelector("total-amount");
const cartUi=document.querySelector("cart-sidebar .cart");
const totleDiv=document.querySelector(".total-sum");
const clearBtn=document.querySelector(".clear-cart-btn");
const cartContent=document.querySelector("cart-content");

let Cart=[];
let bittonsDOM=[];
    cart.addEventListener("click",function(){
    cartSidebar.classList.transform="transition(0%)";
    const bodyoverlay=document.createElement("div");
    bodyoverlay.classList.add("overlay");
    setTimeout(function(){
        document.querySelector("body").appendChild(bodyoverlay)
    },300);
    })
   closecart.addEventListener("click",function(){
    cartSidebar.classList.transform="translateX(-100%)";
    const bodyoverlay=document.querySelector(".overlay");
        document.querySelector("body").removeChild(bodyoverlay)
   })
   buger.addEventListener("click",function(){
    menuSidebar.classList.transform="translateX(0%)";
   })
   close.addEventListener("click",function(){
    menuSidebar.classList.transform="translateX(-100%)";
   });
class Product{
    async getProduct(){
        const response=await fetch("products.json");
        const data = await response.json();
        let products=data.items;
        products=products.map(items => {
            const{title,price} = item.fields;
            const{id}=item.sys;
            const image=item.fields.image.fields.file.url;
            return {title,price,image,id};
        })
        return products;

    }
}
class UI{
    displayProduct(product){
        let result="";
        product.array.forEach(product => {
            const productDiv=document.createElement("div");
            productDiv.innerHTML= `<div class="product-cart">
            <img src ="${product.image}>"alt="product">
            <span class="add-to-cart" data-id="${product.id}">
            <i class="fa fa-cart--plus fa -1x">
            style="mard=gin-right:0.1em; font-size:1em; "></i>
            add to cart</span>
            <div class="product-name">${product.title}</div>
            <div class="product-pricing">${product.price}</div></div>`
            const p=document.querySelector(".product")
            p.append(productDiv)
        })
    }
    getButton(){
        const btns=document.querySelectorAll(".add-to-cart")
        Array.from(btns)
        buttonsDom =btns;
        btns.forEach((btn)=>{
            let id =btn.dataset.id
            let inCart =Cart.find((item)=>item.id===id);
            if(inCart){
                btn.innerHTML = "In Cart"
                btn.dissabled=true
            }
            btn.addEventListener("click",(e)=>{
            e.currentTarget.innerHTML="In Cart"
            e.currentTarget.style.color="white"
            e.currentTarget.style.pointEvents ="none"
                let carItem={... Storage.getStorageProducyt()id,'amount';1}
                Cart.push(carItem)
                Storage.saveCart(Cart)
                this.setCartValues(Cart)
                this.addCartItem(CartItem)
        })

        })
    }
    setCartValues(Cart) {
        let tempTotal=0;
        let itemsTotal=0;
        Cart.map((item)=>{
            tempTotal+=(item.price*item.amount);
            itemsTotal=item.amount;
            parseFloat(tempTotal.toFixed(2))
        })
        cardItemsTotal.innerHTML=itemsTotal
        cardPrinceTotal.innerHTML=parseFloat(tempTotal.toFixed(2));
    }
    addCartItem(cardItem){
        let cartItemUi =innerHTML=document.createElement('div')
        cartItemUi.innerHTML=` `

    }
}