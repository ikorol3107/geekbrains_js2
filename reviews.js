

    function renderReviewsList() {
      $('#reviewsList').empty();
      $.ajax({
        url: 'http://localhost:3000/reviews',
        type: 'GET',
        success: function (reviews) {
          var $ul = $('<ul />');

          reviews.forEach(function(review) {
            var $li = $('<li />', {
              text: review.name + ' :' + review.message,
            });
            var $post = $('<button />', {
              text: 'Post',
              class: 'post',
              'data-id': review.id,
              'data-name': review.name,
              'data-message': review.message,
            });
            $li.append($post);
            $ul.append($li);
          });
          $('#reviewsList').append($ul);
          
        }
      });
    }

function renderReviews() {
      $('#reviews').empty();
      $.ajax({
        url: 'http://localhost:3000/post',
        type: 'GET',
        success: function (reviews) {
          var $ul = $('<ul />');

          reviews.forEach(function (review) {
            var $li = $('<li />', {
              text: review.name + ':' + review.message ,
            });

            var $buttonRemove = $('<button />', {
              text: 'Remove',
              class: 'remove',
              'data-id': review.id,
              'data-name': review.name,
            });
            var $buttonApproved = $('<button />', {
              text: 'Approved',
              class: 'approved',
              'data-id': review.id,
              'data-approved': review.approved,
              'data-name': review.name,
              'data-message': review.message,
            });
            $li.append($buttonRemove);
            $li.append($buttonApproved);
            $ul.append($li);
          });
          $('#reviews').append($ul);
        },
      });
    }




    (function ($) {
      $(function() {
        renderReviewsList();
        renderReviews();

        $('#reviewsList').on('click', '.post', function() {
          var review = $(this).data();
          review.rate = 0;
          review.approved = 0;
            $.ajax({
              url: 'http://localhost:3000/post',
              type: 'POST',
              data: review,
              success: function () {
                renderReviews();
              }
            });
          });

           $('#reviews').on('click', '.remove', function() {
            var review = $(this).data();
            $.ajax({
            url: 'http://localhost:3000/post/' + review.id,
            type: 'DELETE',
            success: function () {
              renderReviews();
            }
          })
           });

           $('#reviews').on('click', '.approved', function() {
            var review = $(this).data();
            $.ajax({
            url: 'http://localhost:3000/post/' + review.id,
            type: 'PATCH',
            data: {
              approved: 1 ,
            },
            success: function () {
              renderReviews();
             
              $(/*???*/).css('color' , 'red');
            }
          })
           });
      });
    })(jQuery);

