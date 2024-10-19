//BD 1.5 Assignment
//Creating Endpoints for FlipDeal e-commerce

let express = require('express');
let app = express();

let port = 3000;

let cors = require('cors');
app.use(cors());

app.listen(port, () => {
  console.log('App is Listening to port ' + port);
});

//Sever side values
let taxRate = 5; //5%
let discountPercentage = 10; //10%
let loyalRate = 2; //2%

//Calculate the total price of items in the cart
//Api call : /cart-total?newItemPrice=1200&cartTotal=0

function cartValue(newItemPrice, cartTotal) {
  let result = newItemPrice + cartTotal;
  return result;
}

app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);

  res.send(cartValue(newItemPrice, cartTotal).toString());
});

// Apply a discount based on membership status
//Api call : /membership-discount?cartTotal=3600&isMember=true

app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember === 'true';

  let discount;

  if (isMember) {
    discount = discountPercentage / 100; // 10% discount for members
  } else {
    discount = 0; // No discount for non-members
  }

  let finalPrice = cartTotal - cartTotal * discount;

  res.send(finalPrice.toString());
});

// Calculate tax on the cart total
// Api call : /calculate-tax?cartTotal=3600

app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);

  let taxAmount = cartTotal * (taxRate / 100);

  res.send(taxAmount.toString());
});

// Estimate delivery time based on shipping method
//Api call : /estimate-delivery?shippingMethod=express&distance=600

app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);

  let deliveryDays;

  if (shippingMethod === 'standard') {
    deliveryDays = distance / 50;
  } else if (shippingMethod === 'express') {
    deliveryDays = distance / 100;
  } else {
    return 'Invalid shipping Method';
  }

  res.send(deliveryDays.toString());
});

// Calculate the shipping cost based on weight and distance
//Api call : /shipping-cost?weight=2&distance=600

app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);

  let shippingcost = weight * distance * 0.1;

  res.send(shippingcost.toString());
});

// Calculate loyalty points earned from a purchase
//Api call : /loyalty-points?purchaseAmount=3600

app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);

  let loyaltyPoints = purchaseAmount * loyalRate;

  res.send(loyaltyPoints.toString());
});
