import readline from 'readline-sync'

let products = [ 
    { 
        id: 1, 
        title: "Used iPhone X", 
        price: 1500, 
        description: "Good condition, small scratch", 
        category: "Electronics" 
    }, { 
        id: 2, 
        title: "Mountain Bike", 
        price: 800, 
        description: "Needs new tires", 
        category: "Sports" 
    }, { 
        id: 3, 
        title: "Javascript Book", 
        price: 120, 
        description: "Like new, best seller", 
        category: "Books" 
    }, { 
        id: 4, 
        title: "Gaming Keyboard", 
        price: 350, 
        description: "RGB lights, mechanical", 
        category: "Electronics" 
    }, { 
        id: 5, 
        title: "Vintage Lamp", 
        price: 200, 
        description: "From 1980, working perfectly", 
        category: "Home" 
    } 
]; 

function addProduct(title, price, description, category) {
    const newObject = {
        id: products.length === 0 ? 1 : Math.max(...products.map((obj) => obj.id)) + 1,
        title: title,
        price: price,
        description: description,
        category: category
    }
    products.push(newObject)
}

function removeProduct(id) {
    products.splice(products.findIndex((obj) => obj.id === id), 1)
}

function editPrice(id, newPrice) {
    let product = products.find((obj) => obj.id === id)
    product.price = newPrice
    products.splice(products.findIndex((obj) => obj.id === id), 1, product)
}

function showByPriceOrder() {
    products.sort((obj1, obj2) => obj1.price - obj2.price)
    console.table(products);
    
}


function showProductDetails() {
    let idProduct = Number(readline.question("Enter the ID of the product you want to receive: "))
    const printedProduct = products.find((obj) => obj.id === idProduct)
    console.log(`--- Product Details ---`);
    for (const [key, value] of Object.entries(printedProduct)) {
        console.log(`${key} : ${value}`);
    }
}


function filterByCategory(category) {
    const filterCategory = products.filter((obj) => obj.category === category)
    return filterCategory
}

function menu() {
    let id;
    let category;
    
    let flag = true
    while (flag) {
        console.log(`== Marketplace Manager ==
-----------------------------------------------------------------
1. Add a new product for sale.
2. Edit the price of an existing product.
3. Display all products (sorted from most expensive to cheapest).
4. Display full details of a product (by ID).
5. Delete product (sold / not relevant).
6. Filter by category.
0. Exit.
-----------------------------------------------------------------`);
        let choose = readline.question("choose one of those option: ")
        if (Number(choose) > 6) {
            console.log("try again");
            continue
        }
        switch (Number(choose)) {
            case 1:
                let title = readline.question("Enter the title of the item: ")
                let price = Number(readline.question("Enter the price of the item: "))
                let description = readline.question("Enter the description of the item: ")
                category = readline.question("Enter the category of the item: ")
                addProduct(title, price, description, category)
                break

            case 2:
                id = Number(readline.question("Enter the id of the item: "))
                let newPrice = Number(readline.question("Enter the new item you want to update: "))
                editPrice(id, newPrice)
                break
            
            case 3:
                showByPriceOrder()
                break
            
            case 4:
                showProductDetails()
                break
            
            case 5:
                id = Number(readline.question("Enter the id of the item: "))
                removeProduct(id)
                break

            case 6:
                category = readline.question("Enter the category you want to filter: ")
                console.log(filterByCategory(category))
                break
                 
            case 0:
                flag = false

            console.log();
        
        }
    }
}

menu()