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
    cartSidebar.style.transform="transition(0%)"
    const bodyOverlay=document.createElement("div")
    bodyOverlay.classList.add("overlay");
    setTimeout(function(){
        document.querySelector("body").append(bodyOverlay)
    },300);
    })
closecart.addEventListener("click",function(){
    cartSidebar.style.transform="translate(100%)";
    const bodyOverlay=document.querySelector(".overlay");
        document.querySelector("body").removeChild(bodyOverlay)
   })
buger.addEventListener("click",function(){
    menuSidebar.classList.transform="translate(0%)";
   })
close.addEventListener("click",function(){
    menuSidebar.classList.transform="translate(-100%)";
   });
class Product{
    async getProduct(){
        const response=await fetch("product.json");
        const data = await response.json();
        let products=data.items;
        products=products.map(items => {
            const{title,price} = item.fields;
            const{id}=items.sys;
            const image= items.fields.image.fields.file.url;
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
                let carItem={... Storage.getStorageProduct(id),'amount':1}
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
        cartItemUi.innerHTML=` <div class ="cart-product">
                                <div class ="product-image">
                                <img src ="${cartItem.Image} alt="product">
                                </div> 
                                <div class ="cart-product-content">
                                <div class= "cart-product-name"><h3>${cartItem.title}</h3></div>
                                <div class= "cart-product-price"><h3>$${cartItem.price}</h3></div>
                                <div class= "cart-product-remove data-id="${cartItem.id}" href="# style="color:red;">remove</a></div></div>
                                <div class= "plus-menus">
                                <i class =fa fa-angle-lrft add-amount"
                                data-id="${cartItem.id}"></i>
                                <spsn class="no-of-items">${cartItem.amount}</span>
                                data id="${cardItem.id}"</i></div></div>`
                                cartContent.append(cartItemUi)

    }
    setupApp(){
        Cart=Storage.getCart()
        this.setCartValues(Cart)
        Cart.map((item)=>
        this.addCartItem(item)
        )}

cartLogic(){
    clearBtn.addEventListener("click",()=>{
        this.closeCart()
    })
    cartContent.addEventListener("click",(event)=>{
        if(event.target.classList.contains("cart-product-remove")){
            let id = event.target.dataset.id
            this.removeItem(id)
            let div=event.target.parentElement.parentElement.parentElement.parentElement
            div.removChild(event.target.parentElement.parentElement.parentElement.parentElement)
        }
        else if (event.target.classList.containts("add-amount")){
            let id = event.target.dataset.id
            let item=Cart.Irem((item)=>item.id===id)
            item.amount++
            Storage.saveCart(Cart)
            this.setCartValues(Cart)
            event.target.nextElementsSibling.innerHTML=itme.amount
        }
        else if(event.target.classList.contains("reduce-amoun")){
            let is =event.target.dataset.id
            let item=Cart.find((item)=>item.id===id)
            if(item.amount>1){
                item.amount--
                Storage.saveCart(Cart)
                this.setCartValues(Cart)
                event.target.previousElementSibling.innerHTML=item.amount
            }
            else{
                this.removeItem(id)
                let div=event.target.parentElement.parentElement.parentElement.parentElement
                div.removChild(event.target.parentElement.parentElement.parentElement.parentElement)
            }
        }
})

}
addAmount(){
    const addBtn=document.querySelectorAll(".add-amount")
    addBtn.forEach((btn)=>{
         btn.addEventListener("click",(event)=>{
            let id = (event.currentTarget.dataset.id)
            Cart.map((item)=>{
                if(item.id===id){
                item.amount++
                Storage.saveCart(Cart)
                this.setCartValues(Cart)
                const amountUi =event.currentTarget.parentElement.children[1]
                amountUi.innerHTML=item.amount
            
          } })
            
    })
        })

}
reduceAmount(){
    const reduceBtn=document.querySelectorAll(".reduce-amount")
    reduceBtn.forEach((btn)=>{
        btn.addEventListener("click",(event)=>{
            let id = (event.currentTarget.dataset.id)
            Cart.map((item)=>{
                if(item.id===id){
                    item.amount--
                    if(item.amount>0){
                    Storage.saveCart(Cart)
                    this.setCartValues(Cart)
                    const amountUi =event.currentTarget.parentElement.children[1]
                    amountUi.innerHTML=item.amount
                }else{
                    
                  event.currentTarget.parentElement.parentElement.parentElement.parentElement
                  this.removChild(Id)
                    
                }
            }
            })
        })
    })

clearCart(){
    let cartItem=Cart.map(item => item.id)
    cartItem.forEach((id)=>this.removeItem(id))
    const cartProduct=document.querySelectorAll(".cart-product")
    cartProduct.forEach((item)=>{
        if(item){
            item.parentElement.removeChild(item)
        }
    })
}
removeItem(id) {
    Cart=Cart.filter((item)=>item.id!==id)
    this.setCartValues(Cart)
    Storage.saveCart(Cart)
    let button = this.getSingleButton='unset'
    button.innerHTML = `<i class ="fa fa-cart-plus"></i> Add To Cart`
}
getSingleButton(id){
    let btn
    buttonsDOM.forEach((button)=>{
        if(button.dataset.id===id){
            btn=button
        }
    })
    return btn
}
}
class Storage{
    static saveProducts(products) {
      localStorage.setItem('products', JSON.stringify(products))
    }
    static getStorageProduct(id) {
        let products = JSON.parse(localStorage.getItem('products'))
        return products.find((item) => item.id === id)
    }
    static saveCart(cart) {
      localStorage.setItem('cart', JSON.stringify(cart))
    }
    static getCart() {
        return localStorage.getItem('cart')? JSON.parse(localStorage.getItem('cart')) :[]

    }
}
document.addEventListener("DOMContentLoaded",()=>{
    const product=new Product();
    const ui=new UI();
    ui.setupApp()
    product.getProduct().then((products)=>{
        ui.displayProduct(products)
        Storage.saveProducts(products)}).then(()=>{
            ui.getButton();
            ui.cartLogic();
        }) 
    })
}
