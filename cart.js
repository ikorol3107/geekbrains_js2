
  


    function renderGoodList() {
      $('#products').empty();
      $.ajax({
        url: 'http://localhost:3000/products',
        type: 'GET',
        success: function (products) {
          var $ul = $('<ul />', {
            class: 'ulProduct',
          });

          products.forEach(function (product) {
             var $li = $('<li />',{
              class: 'parent-product-list',
             });
             var $a = $('<a />', {
              class: 'product',
             });
             //$a.href = product.url;
             var $img = $('<img />', {
               src: product.url,
             });
             
             $a.append($img);
             $li.append($a);
             
            var $button = $('<div />', { 
              class: 'pos-add-to-cart',
              'data-id': product.id,
              'data-name': product.name,
              'data-amount': product.price,
            });
            var $aButton = $('<a />', {
              class: 'add-to-cart',
              text: 'Add to Cart',
            });
            //$aButton.href = product.url;
             var $imgButton = $('<img />', {
               src: 'img/cart_1.png',
             });
             $aButton.append($imgButton);
             $button.append($aButton);
            $li.append($button);
            $ul.append($li);
          });
          $('#products').append($ul);
        }
      });
    }

    function renderCart() {
      $('#cart').empty();
      $.ajax({
        url: 'http://localhost:3000/cart',
        type: 'GET',
        success: function (products) {
          var $ul = $('<ul />');
          var total = 0;

          products.forEach(function (product) {
            var $li = $('<li />', {
              text: product.name + ' (' + product.quantity + ')',
            });
            var $button = $('<button />', {
              text: 'Remove',
              class: 'removeButton',
              'data-id': product.id,
              'data-name': product.name,
              'data-amount': product.price,
              'data-quantity': product.quantity,
            });
            total += product.price * product.quantity;
            $li.append($button);
            $ul.append($li);
          });
          $('#cart').append($ul);
          $('#cart').append($('<span />', {
            text: 'Total: ' + total + ' rub.'
          }));
          $('#cart').append(
            $('<button />', {
              text: 'Clear',
              class: 'clearButton',
            }),
          );
        }
      });
    }

    (function ($) {
      $(function() {   
        renderGoodList();
        renderCart();

        $('#cart').on('click', '.clearButton', function () {
          $('#cart .removeButton').each(function (idx, value) {
            var product = $(value).data();
            $.ajax({
              url: 'http://localhost:3000/cart/' + product.id,
              type: 'DELETE',
            });
            $('#cart').empty();
          });
        });

        $('#cart').on('click', '.removeButton', function () {
          var product = $(this).data();

          if (+product.quantity === 1) {
            $.ajax({
              url: 'http://localhost:3000/cart/' + product.id,
              type: 'DELETE',
              success: function () {
                renderCart();
              }
            })
          } else {
            var productFromCart = $('#cart .remove[data-id="' + product.id + '"]').data();
            $.ajax({
              url: 'http://localhost:3000/cart/' + product.id,
              type: 'PATCH',
              data: {
                quantity: +productFromCart.quantity - 1
              },
              success: function () {
                renderCart();
              }
            })
          }
        });

        $('#products').on('click', '.pos-add-to-cart', function () {
          var product = $(this).data();
          product.quantity = 1;
          if ($('#cart .removeButton[data-id="' + product.id + '"]').length) {
            var productFromCart = $('#cart .removeButton[data-id="' + product.id + '"]').data();
            $.ajax({
              url: 'http://localhost:3000/cart/' + product.id,
              type: 'PATCH',
              data: {
                quantity: +productFromCart.quantity + 1
              },
              success: function () {
                renderCart();
              }
            })
          } else {
            $.ajax({
              url: 'http://localhost:3000/cart',
              type: 'POST',
              data: product,
              success: function () {
                renderCart();
              }
            });
          }
        });
      });
    })(jQuery);


 

