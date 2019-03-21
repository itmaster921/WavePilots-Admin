/*!

 =========================================================
 * Material Dashboard Angular 2 - V1.1.0.0
 =========================================================

 * Product Page: https://www.creative-tim.com/product/material-dashboard-angular2
 * Copyright 2017 Creative Tim (https://www.creative-tim.com)
 * Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-angular/blob/master/LICENSE.md)

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 */

var searchVisible = 0;
var transparent = true;

var transparentDemo = true;
var fixedTop = false;

var seq = 0, delays = 80, durations = 500;
var seq2 = 0, delays2 = 80, durations2 = 500;

var mobile_menu_visible = 0,
    mobile_menu_initialized = false,
    toggle_initialized = false,
    bootstrap_nav_initialized = false;

$(document).ready(function(){

    $sidebar = $('.sidebar');

    /** sidebar animation */
    $moving_tab = $('<div class="moving-tab"/>');
    $('.sidebar .nav-container').append($moving_tab);

    $this = $('.sidebar .nav').find('li.active a');
    
    
    var path = window.location.href;
    
    if(path.split('/').length >= 6 ) {
        path = path.split('/')[5].split('-')[0] || path.split('/')[5].split('-');
        if (path) {
            var t = $('.sidebar .nav').find('li a');
            for (i=0; i<t.length; i++) {
                if($(t[i]).attr('class').indexOf(path) > -1) {
                    $this = $(t[i]);
                    animationSidebar($this, false);
                    break;
                }   
            }
        }
    }

    $('div').removeClass('.moving-tab');
    if (window.history && window.history.pushState) {

        // console.log('sunt in window.history');
        $(window).on('popstate', function() {

            // console.log('am apasat pe back, locatia noua: ', window.location.pathname);

            setTimeout(function(){
                // console.log('incep animatia cu 1ms delay');
                $this = $('.sidebar .nav').find('li.active a');
                if ($this.length)
                    animationSidebar($this,true);
            },1);

        });

    }

    $.material.init();

    window_width = $(window).width();
    // check if there is an image set for the sidebar's background
    //  Activate the tooltips
    $('[rel="tooltip"]').tooltip();
    
    $('.form-control').on("focus", function(){
        $(this).parent('.input-group').addClass("input-group-focus");
    }).on("blur", function(){
        $(this).parent(".input-group").removeClass("input-group-focus");
    });

    /**
     * init menu
     */
    mda.initSidebarCheck();
});

// activate collapse right menu when the windows is resized
$(window).resize(function(){
    // reset the seq for charts drawing animations
    seq = seq2 = 0;

    mda.initSidebarCheck();
});

md = {
    misc:{
        navbar_menu_visible: 0,
        active_collapse: true,
        disabled_collapse_init: 0,
    },


    checkScrollForTransparentNavbar: debounce(function() {
            if($(document).scrollTop() > 381 ) {
                if(transparent) {
                    transparent = false;
                    $('.navbar-color-on-scroll').removeClass('navbar-transparent');
                    $('.navbar-title').removeClass('hidden');
                }
            } else {
                if( !transparent ) {
                    transparent = true;
                    $('.navbar-color-on-scroll').addClass('navbar-transparent');
                    $('.navbar-title').addClass('hidden');
                }
            }
    }, 17)
}

mda = {
    initSidebarCheck: function(){
        if($(window).width() <= 991){
            if($sidebar.length != 0){
                mda.initRightMenu();
            } else{
                mda.initBootstrapNavbarMenu();
            }
        }
    },
    initRightMenu: debounce(function(){
        $sidebar_wrapper = $('.sidebar-wrapper');

        if(!mobile_menu_initialized){

            $navbar = $('nav').find('.navbar-collapse').first().clone(true);

            nav_content = '';
            mobile_menu_content = '';

            $navbar.children('ul').each(function(){

                content_buff = $(this).html();
                nav_content = nav_content + content_buff;
            });

            nav_content = '<ul class="nav nav-mobile-menu">' + nav_content + '</ul>';

            $navbar_form = $('nav').find('.navbar-form').clone(true);

            $sidebar_nav = $sidebar_wrapper.find('.nav-container');

            // insert the navbar form before the sidebar list
            $nav_content = $(nav_content);
            $nav_content.insertBefore($sidebar_nav);
            $navbar_form.insertBefore($nav_content);


            $(".sidebar-wrapper .dropdown .dropdown-menu > li > a").click(function(event) {
                event.stopPropagation();

            });
            mobile_menu_initialized = true;

        } else {
            if($(window).width() > 991){
                // reset all the additions that we made for the sidebar wrapper only if the screen is bigger than 991px
                $sidebar_wrapper.find('.navbar-form').remove();
                $sidebar_wrapper.find('.nav-mobile-menu').remove();
                mobile_menu_initialized = false;
            }
        }

        if(!toggle_initialized){
            $toggle = $('.navbar-toggle');

            $toggle.click(function (){

                if(mobile_menu_visible == 1) {
                    $('html').removeClass('nav-open');

                    $('.close-layer').remove();
                    setTimeout(function(){
                        $toggle.removeClass('toggled');
                    }, 400);

                    mobile_menu_visible = 0;;
                } else {
                    setTimeout(function(){
                        $toggle.addClass('toggled');
                    }, 430);


                    $layer = $('<div class="close-layer"></div>');
                    $layer.appendTo(".wrapper");

                    setTimeout(function(){
                        $layer.addClass('visible');
                    }, 100);

                    $layer.click(function() {
                        $('html').removeClass('nav-open');
                        mobile_menu_visible = 0;

                        $layer.removeClass('visible');

                         setTimeout(function(){
                            $layer.remove();
                            $toggle.removeClass('toggled');

                         }, 400);
                    });

                    $('html').addClass('nav-open');
                    mobile_menu_visible = 1;
                }
            });
            toggle_initialized = true;
        }
    },200),


    initBootstrapNavbarMenu: debounce(function(){
        if(!bootstrap_nav_initialized){
            $navbar = $('nav').find('.navbar-collapse').first().clone(true);

            nav_content = '';
            mobile_menu_content = '';
            //add the content from the regular header to the mobile menu
            $navbar.children('ul').each(function(){
                content_buff = $(this).html();
                nav_content = nav_content + content_buff;
            });

            nav_content = '<ul class="nav nav-mobile-menu">' + nav_content + '</ul>';
            $navbar.html(nav_content);
            $navbar.addClass('bootstrap-navbar');

            // append it to the body, so it will come from the right side of the screen
            $('body').append($navbar);
            $toggle = $('.navbar-toggle');
            $navbar.find('a').removeClass('btn btn-round btn-default');
            $navbar.find('button').removeClass('btn-round btn-fill btn-info btn-primary btn-success btn-danger btn-warning btn-neutral');
            $navbar.find('button').addClass('btn-simple btn-block');

            $toggle.click(function (){
                if(mobile_menu_visible == 1) {
                    $('html').removeClass('nav-open');
                    $('.close-layer').remove();

                    setTimeout(function(){
                        $toggle.removeClass('toggled');
                    }, 400);
                    mobile_menu_visible = 0;
                } else {
                    setTimeout(function(){
                        $toggle.addClass('toggled');
                    }, 430);

                    $layer = $('<div class="close-layer"></div>');
                    $layer.appendTo(".wrapper-full-page");

                    setTimeout(function(){
                        $layer.addClass('visible');
                    }, 100);

                    $layer.click(function() {
                        $('html').removeClass('nav-open');

                        mobile_menu_visible = 0;
                        $layer.removeClass('visible');

                        setTimeout(function(){
                            $layer.remove();
                            $toggle.removeClass('toggled');
                        }, 400);
                    });

                    $('html').addClass('nav-open');
                    mobile_menu_visible = 1;
                }
            });

            bootstrap_nav_initialized = true;
        }
    }, 500),
}

$('.sidebar .nav > li > a').click(function(){
    $this = $(this);
    animationSidebar($this, true);
});

function animationSidebar($this, animate){
    // console.log('incep animatia si butonul pe care sunt acum este:', $this[0].href );
    // return;
    // if (!$this.parent('li').position())
    //     return;
    $current_li_distance = $this.parent('li').position().top - 10;

    button_text = $this.html();

    $(".moving-tab").css("width", 230 + "px");

    if(animate){
        $('.moving-tab').css({
            'transform':'translate3d(0,' + $current_li_distance + 'px, 0)',
            'transition': 'all 0.5s cubic-bezier(0.29, 1.42, 0.79, 1)'
        });
    }else{
        $('.moving-tab').css({
            'transform':'translate3d(0,' + $current_li_distance + 'px, 0)'
        });
    }

    setTimeout(function(){
        $('.moving-tab').html(button_text);
    }, 100);
}


// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.

function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		clearTimeout(timeout);
		timeout = setTimeout(function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		}, wait);
		if (immediate && !timeout) func.apply(context, args);
	};
};
