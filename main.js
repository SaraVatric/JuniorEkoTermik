
let shop = document.getElementById("shop");

let basket = JSON.parse(localStorage.getItem("data")) || [];

let tempIncrementedItems = [];

let generateShop = () => {
 
return (shop.innerHTML =  `
<div class="shop-container">
  <h1 class="shop-title">${naslov}</h1>
  <div class="shop-items">
    <div class="shop-container">
      <h3 style="margin-bottom:25px">Izaberite velicinu:</h3>
      <div class="shop-items">
        ${shopItemsData
          .map((x) => {
            let { id, name, price, desc, img} = x;
            let search = basket.find((x) => x.id === id) || [];
            return `
            <div id=product-id-${id} class="item">
              <div  class="details">
                <h3 class="imeproizvoda">${name}</h3>
                <div class="price-quantity">
                  <h2 class="cijena1">Cijena: ${price} KM</h2>
                  <div class="buttons">
                    <i style="cursor: pointer;" onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                    <div id=${id} class="quantity">${search.item === undefined ? 0 : search.item}</div>
                    <i style="cursor: pointer;" onclick="increment(${id})" class="bi bi-plus-lg"></i>
                  </div>
                </div>
              </div>
            </div>
          `;
          })
          .join("")}
      </div>
    </div>
  </div>
  <div class="green">
<i class="bi bi-circle-fill"></i>
<div class="online">Na Stanju</div>
</div>

<div class="Opis">
<div class="label">Opis Proizvoda</div>
<div class="opiss">
${opis}
</div>
<div style="cursor: pointer;" class="opisss">${vise}</div>
</div>
<button style="cursor: pointer;" onclick="addToCart()" class="addtocart">Dodajte u Kosaricu</button>

`);
};

generateShop();



let increment = (id) => {
  let selectedItem = id;
  let search = tempIncrementedItems.find((x) => x.id === selectedItem.id);

  if (search === undefined) {
    tempIncrementedItems.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }
  updateQuantity(selectedItem.id);
};

let decrement = (id) => {
  let selectedItem = id;
  let search = tempIncrementedItems.find((x) => x.id === selectedItem.id);

  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }
  updateQuantity(selectedItem.id);
};

let updateQuantity = (id) => {
  let search = tempIncrementedItems.find((x) => x.id === id);
  let quantityElement = document.getElementById(id);
  
  if (search) {
    quantityElement.textContent = search.item;
  } else {
    quantityElement.textContent = 0;
  }
};

// Function to create and inject the custom alert into the document
function createCustomAlert() {
  // Create the overlay div
  const overlay = document.createElement('div');
  overlay.id = 'customAlert';
  overlay.className = 'custom-alert-hidden';

  // Create the alert box div
  const alertBox = document.createElement('div');
  alertBox.className = 'custom-alert-box';

  // Create the paragraph for the message
  const messageP = document.createElement('p');
  messageP.id = 'customAlertMessage';
  messageP.textContent = 'Proizvod dodan u košaricu'; // Default message

  const okButton = document.createElement('button');
  okButton.textContent = 'OK';
  okButton.onclick = function() { closeCustomAlert(); };
  okButton.style.backgroundColor = 'gray'; // Set the button background to gray
  okButton.style.color = 'white'; // Optional: set text color to white for better visibility
  okButton.style.border = 'none'; // Optional: remove border
  okButton.style.margin = '20px';
  okButton.style.padding = '15px 55px'; // Optional: adjust padding for better appearance
  okButton.style.cursor = 'pointer'; // Optional: change cursor to pointer on hover
  okButton.style.borderRadius = '5px'; // Optional: round the corners

  // Append elements
  alertBox.appendChild(messageP);
  alertBox.appendChild(okButton);
  overlay.appendChild(alertBox);
  document.body.appendChild(overlay);

  // Inject CSS for the custom alert
  const style = document.createElement('style');
  style.textContent = `
  .custom-alert-hidden {
    display: none;
}
.custom-alert-box {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 45px 100px;
    background-color: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    z-index: 1000; /* Ensure it's above other content */
    text-align: center; /* Center the button */
}
#customAlert {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
    z-index: 999; /* Ensure it's directly below the alert box */
}
  `;
  document.head.appendChild(style);
}

// Function to show the custom alert
function showCustomAlert(message) {
  if (!document.getElementById('customAlert')) {
      createCustomAlert();
  }
  document.getElementById('customAlertMessage').innerText = message;
  document.getElementById('customAlert').style.display = 'block';
}

// Function to close the custom alert
function closeCustomAlert() {
  document.getElementById('customAlert').style.display = 'none';
}




let addToCart = () => {
  basket = basket.concat(tempIncrementedItems);
  tempIncrementedItems = []; // Reset the temporary storage
  localStorage.setItem("data", JSON.stringify(basket));
  calculation();
  // Replace the native alert with the custom alert
  showCustomAlert('Proizvod dodan u košaricu');
};




let calculation = () => {
let cartIcon = document.getElementById("cartAmount");
cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();



