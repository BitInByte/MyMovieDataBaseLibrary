$(document).ready(function() { 
    
    $('.btn-watched-list-container').addClass('animate__animated animate__bounce').one("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function() {
        $(this).removeClass('animate__bounce animate__animated');
    });

    $('.form-animation').addClass('animate__animated animate__shakeX').one("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function() {
        $(this).removeClass('animate__animated animate__shakeX');
    });

    $('.message-movies-animation').addClass('animate__animated animate__backInDown').one("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function() {
        $(this).removeClass('animate__animated animate__backInDown');
    });

    $('.logo--home').click(function() {
        $('.btn-watched-list-container').addClass('animate__animated animate__bounce').one("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function() {
            $(this).removeClass('animate__bounce animate__animated');
        });

        $('.form-animation').addClass('animate__animated animate__shakeX').one("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function() {
            $(this).removeClass('animate__animated animate__shakeX');
        });

        $('.message-movies-animation').addClass('animate__animated animate__backInDown').one("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function() {
            $(this).removeClass('animate__animated animate__backInDown');
        });
        
    })

});