$().ready(function() {
        // Code for the Validator
        var $validator = $('.wizard-card form').validate({
            rules: {
                //client_register
                client_first_name: {
                    required: true,
                    minlength: 3
                },
                client_last_name: {
                    required: true,
                    minlength: 3
                },
                client_tel: {
                    required: true,
                    minlength: 14,
                },
                client_birth:{
                    maxlength:10,
                },
                //professional_register
                professional_first_name: {
                    required: true,
                    minlength: 3
                },
                professional_last_name: {
                    required: true,
                    minlength: 3
                },
                professional_email: {
                    required: true,
                    minlength: 3,
                },
                professional_username: {
                    required: true,
                    minlength: 3
                },
                professional_password: {
                    required: true,
                    minlength: 8,
                },
                
                //service_register
                service_name: {
                    required: true
                },
                // service_category: {
                //     required: true
                // },
                service_type: {
                    required: true
                },
                service_product_cost: {
                    required: true
                },
                service_sell_price: {
                    required: true
                },
                
                //product_register
                product_name: {
                    required: true
                },
                // product_category: {
                //     required: true
                // },
                cost_product_prices: {
                    required: true
                },
                product_sell_price: {
                    required: true
                },
                //provider_register
                provider_name: {
                    required: true,
                    minlength: 3
                },
                provider_tel: {
                    required: true,
                    minlength: 14
                },
                provider_email: {
                    required: true,
                    minlength: 3
                },
                provider_contact_name:{
                  required: true,  
                },
                //payment_way
                payment_name: {
                    required: true,
                    minlength: 3
                },
                payment_tax: {
                    required: true
                },
                //category
                category_name:{
                    required: true
                },
                type_category:{
                    required: true
                },
                type_subcategory_product: {
                    required: true
                },
                type_subcategory_service: {
                    required: true
                },
            },

            errorPlacement: function(error, element) {
                $(element).parent('div').addClass('has-error');
            }
        });
        

        // Wizard Initialization
        $('.wizard-card').bootstrapWizard({
            'tabClass': 'nav nav-pills',
            'nextSelector': '.btn-next',
            'previousSelector': '.btn-previous',

            onNext: function(tab, navigation, index) {
                var $valid = $('.wizard-card form').valid();
                if (!$valid) {
                    $validator.focusInvalid();
                    return false;
                }
            },

            onInit: function(tab, navigation, index) {
                //check number of tabs and fill the entire row
                var $total = navigation.find('li').length;
                var $wizard = navigation.closest('.wizard-card');

                $first_li = navigation.find('li:first-child a').html();
                $moving_div = $('<div class="moving-tab">' + $first_li + '</div>');
                $('.wizard-card .wizard-navigation').append($moving_div);

                refreshAnimation($wizard, index);

                $('.moving-tab').css('transition', 'transform 0s');
            },

            onTabClick: function(tab, navigation, index) {
                var $valid = $('.wizard-card form').valid();

                if (!$valid) {
                    return false;
                } else {
                    return true;
                }
            },

            onTabShow: function(tab, navigation, index) {
                var $total = navigation.find('li').length;
                var $current = index + 1;

                var $wizard = navigation.closest('.wizard-card');

                // If it's the last tab then hide the last button and show the finish instead
                if ($current >= $total) {
                    $($wizard).find('.btn-next').hide();
                    $($wizard).find('.btn-finish').show();
                } else {
                    $($wizard).find('.btn-next').show();
                    $($wizard).find('.btn-finish').hide();
                }

                button_text = navigation.find('li:nth-child(' + $current + ') a').html();

                setTimeout(function() {
                    $('.moving-tab').text(button_text);
                }, 150);

                var checkbox = $('.footer-checkbox');

                if (!index == 0) {
                    $(checkbox).css({
                        'opacity': '0',
                        'visibility': 'hidden',
                        'position': 'absolute'
                    });
                } else {
                    $(checkbox).css({
                        'opacity': '1',
                        'visibility': 'visible'
                    });
                }

                refreshAnimation($wizard, index);
                
                
            }
        });


        // Prepare the preview for profile picture
        $("#wizard-picture").change(function() {
            readURL(this);
        });

        $('[data-toggle="wizard-radio"]').click(function() {
            wizard = $(this).closest('.wizard-card');
            wizard.find('[data-toggle="wizard-radio"]').removeClass('active');
            $(this).addClass('active');
            $(wizard).find('[type="radio"]').removeAttr('checked');
            $(this).find('[type="radio"]').attr('checked', 'true');
        });

        $('[data-toggle="wizard-checkbox"]').click(function() {
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
                $(this).find('[type="checkbox"]').removeAttr('checked');
            } else {
                $(this).addClass('active');
                $(this).find('[type="checkbox"]').attr('checked', 'true');
            }
        });

        $('.set-full-height').css('height', 'auto');

        //Function to show image before upload

        function readURL(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();

                reader.onload = function(e) {
                    $('#wizardPicturePreview').attr('src', e.target.result).fadeIn('slow');
                }
                reader.readAsDataURL(input.files[0]);
            }
        }

        $(window).resize(function() {
            $('.wizard-card').each(function() {
                $wizard = $(this);

                index = $wizard.bootstrapWizard('currentIndex');
                refreshAnimation($wizard, index);

                $('.moving-tab').css({
                    'transition': 'transform 0s'
                });
            });
        });

        function refreshAnimation($wizard, index) {
            $total = $wizard.find('.nav li').length;
            $li_width = 100 / $total;

            total_steps = $wizard.find('.nav li').length;
            move_distance = $wizard.width() / total_steps;
            index_temp = index;
            vertical_level = 0;

            mobile_device = $(document).width() < 600 && $total > 3;

            if (mobile_device) {
                move_distance = $wizard.width() / 2;
                index_temp = index % 2;
                $li_width = 50;
            }

            $wizard.find('.nav li').css('width', $li_width + '%');

            step_width = move_distance;
            move_distance = move_distance * index_temp;

            $current = index + 1;

            if ($current == 1 || (mobile_device == true && (index % 2 == 0))) {
                move_distance -= 8;
            } else if ($current == total_steps || (mobile_device == true && (index % 2 == 1))) {
                move_distance += 8;
            }

            if (mobile_device) {
                vertical_level = parseInt(index / 2);
                vertical_level = vertical_level * 38;
            }

            $wizard.find('.moving-tab').css('width', step_width);
            $('.moving-tab').css({
                'transform': 'translate3d(' + move_distance + 'px, ' + vertical_level + 'px, 0)',
                'transition': 'all 0.5s cubic-bezier(0.29, 1.42, 0.79, 1)'

            });
        }
        
        $('.cel').mask('(00) 00000-0000');
        
     
        if($('#alert').hasClass('success')){
            swal({
                title: "Cadastro efetuado com sucesso.",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-success",
                type: "success"
            });

        } else if ($('#alert').hasClass('warning')) {
            swal({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonClass: 'btn btn-success',
                cancelButtonClass: 'btn btn-danger',
                confirmButtonText: 'Yes, delete it!',
                buttonsStyling: false
            }).then(function() {
                swal({
                    title: 'Deleted!',
                    text: 'Your file has been deleted.',
                    type: 'success',
                    confirmButtonClass: "btn btn-success",
                    buttonsStyling: false
                })
            });

        } else if ($('#alert').hasClass('error')) {
            swal({
                        title: 'Algo deu errado.',
                        text: 'Contate o desenvolvedor :) ',
                        type: 'error',
                        confirmButtonClass: "btn btn-error",
                        buttonsStyling: false
                    })

        }
        
        
 
 
        $('.money').maskMoney({prefix:'R$ ', allowNegative: true, thousands:'.', decimal:',', affixesStay: false});
        
        $('.percentage').mask('##0,00%', {reverse : true});
        
});


    
