$(document).ready(function(){
  MenuClicked();
  deleteItem();
});

function MenuClicked(){
  $(".menu").click(function(){
    
    nameFood = $("h5", this).text();
    nameFood = nameFood.replace(" ", "-")
    unitPrice = convertRupiahToFloat($("h6", this).text());

    if ($("."+nameFood+"").length) {
      quantity = parseInt($("."+nameFood+" .quantity span").text());
      quantity++;
      totalPrice = quantity * unitPrice;

      $("."+nameFood+" .quantity span").text(quantity);
      $("."+nameFood+" .total-price span").text(convertFloatToRupiah(totalPrice));
      
    } else {
      newElement = '<div class="item-in-troll '+nameFood+'">' +
          '<p class="name-of-food">'+nameFood+'</p>' +
          '<p class="total-price right"><span class="right">'+convertFloatToRupiah(unitPrice)+'</span></p>' +
          '<div class="item-in-troll-image">' +
            '<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);"><path d="M5 20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8h2V6h-4V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H3v2h2zM9 4h6v2H9zM8 8h9v12H7V8z"></path><path d="M9 10h2v8H9zm4 0h2v8h-2z"></path></svg>' +
          '</div>' +
          '<p class="unit-price">Unit price <span class="right" id="unit-price">'+convertFloatToRupiah(unitPrice)+'</span></p>' +
          '<p class="quantity">Quantity: <span class="right">1</span></p>' +
        '</div>';
      $(newElement).appendTo(".item-in-troll-container" );
    }

    // perbaiki apa yang salah di sini
    currentTotalAmount = convertRupiahToFloat($('.total-amount').text());
    currentTax = convertRupiahToFloat($('.tax').text());
    updateTotalAmount(currentTotalAmount, currentTax, unitPrice);
  });
}

function deleteItem(){
  $(".item-in-troll-container").on('click', '.item-in-troll-image svg', function(){
    nameFood = $(this).parent().parent().attr('class').split(' ')[1];
    unitPrice = convertRupiahToFloat($('.'+nameFood+' .unit-price span').text());

    quantity = parseInt($('.'+nameFood+' .quantity span').text());
    totalPrice = convertRupiahToFloat($('.'+nameFood+' .total-price span').text());
    if (quantity > 1) {
      quantity--;
      totalPrice -= unitPrice;
      $('.'+nameFood+' .quantity span').text(quantity);
      $('.'+nameFood+' .total-price span').text(totalPrice);
    } 
    else{
      $('.'+nameFood).remove();
    }
    // perbaiki apa yang salah di sini
    currentTotalAmount = convertRupiahToFloat($('.total-amount').text());
    currentTax = convertRupiahToFloat($('.tax').text());
    decreaseTotalAmount(currentTotalAmount, currentTax, unitPrice);
  });
}
function updateTotalAmount(currentTotalAmount, currentTax, unitPrice){
  tax = currentTax + (unitPrice * (0.1));
  $('.tax').text(convertFloatToRupiah(tax));

  totalAmount = currentTotalAmount + unitPrice + (unitPrice * 0.1);
  $('.total-amount').text(convertFloatToRupiah(totalAmount));
}
function decreaseTotalAmount(currentTotalAmount, currentTax, unitPrice){
  tax = currentTax - (unitPrice * (0.1));
  $('.tax').text(convertFloatToRupiah(tax));

  totalAmount = currentTotalAmount - (unitPrice + (unitPrice * 0.1));
  $('.total-amount').text(convertFloatToRupiah(totalAmount));
}
// function convertRupiahToFloat(hargaString){
//   hargadislide = hargaString.slice(4);
//   hargaFloat = parseFloat(hargadislide);
//   return hargaFloat;
// }
const convertRupiahToFloat = (rupiahString) => {
  const cleanedString = rupiahString.replace(/[^\d,-]/g, ''); // Menghilangkan karakter selain angka, koma, dan minus
  const floatValue = parseFloat(cleanedString.replace(',', '.')); // Mengganti koma dengan titik dan mengonversi ke float
  return isNaN(floatValue) ? 0 : floatValue; // Memastikan bahwa hasilnya adalah float atau 0 jika tidak valid
};

const convertFloatToRupiah = (number)=>{
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR"
  }).format(number);
}

// function convertFloatToRupiah(number){
//   valueRupiah = "Rp. " + number
//   return valueRupiah;
// }