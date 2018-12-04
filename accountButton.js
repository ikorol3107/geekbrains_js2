(function ($) {
    $(document).ready(function () {
        $('.header-button-my_account').on('click', function () {
            $.ajax({
                url: 'http://localhost:3000/interAccounts',
                type: 'GET',
                success: function (interAccounts) {
                    $('#accountPanel').empty(); 
                    var $ul = $('<ul />');
                    interAccounts.forEach(function(interAccount) {
                        var $li = $('<li />')
                        var $a = $('<a />', {
                        text: interAccount.Name,
                        class: 'interAccountLi',
                        href: interAccount.url,
                        });
                        $li.append($a);
                        $ul.append($li);
                    });
                    $('#accountPanel').append($ul);
                    if ($('#accountPanel').is(':hidden')) {
                        $('#accountPanel').slideDown();
                    } else {
                        $('#accountPanel').hide();
                    };
                }
            });
        });      
          });    
})(jQuery);
