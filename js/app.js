/**
 * Đây là tệp script chính chứa mã JS.
 */
(function ($) {
    // Thành phần chính
    var RESHOP = {};

    //Các biến được xác định trước
    var
        $filterGridWrapper = $('.filter__grid-wrapper'),
        $collectionOfFilterBtn = $('.filter__btn'),
        $primarySlider = $('#hero-slider'),
        $testimonialSlider = $('#testimonial-slider'),
        $collectionaClickScroll = $('[data-click-scroll]'),
        $collectionProductSlider = $('.product-slider'),
        $collectionTabSlider = $('.tab-slider'),
        $collectionInputCounter = $('.input-counter'),
        $collectionCountDown = $('[data-countdown]'),
        $collectionCartModalLink = $('[data-modal="modal"]'),
        $defaultAddressCheckbox = $('#get-address'),
        $collectionFormBill = $('[data-bill]'),
        $collectionPostGallery = $('.post-gallery'),
        $blogMasonry = $('.blog-m'),
        $collectionPostVideo = $('.post-video-block'),
        // $("iframe[src*="youtube"], iframe[src*="vimeo"]") Bộ chọn nhiều jQuery
        $collectionEmbedVideo = $('iframe[src*="youtube"]'),
        $productDetailElement = $('#pd-o-initiate'),
        $productDetailElementThumbnail = $('#pd-o-thumbnail'),
        $modalProductDetailElement = $('#js-product-detail-modal'),
        $modalProductDetailElementThumbnail = $('#js-product-detail-modal-thumbnail'),
        $shopCategoryToggleSpan = $('.shop-w__category-list .has-list > .js-shop-category-span'),// ĐỆ QUY
        $shopGridBtn = $('.js-shop-grid-target'),
        $shopListBtn = $('.js-shop-list-target'),
        $shopPerspectiveRow = $('.shop-p__collection > div'),
        $shopFilterBtn = $('.js-shop-filter-target');
        
    //THÊM STICKY HEADER
       document.addEventListener('DOMContentLoaded', function () {
        var header = document.querySelector('.header--style-1');
        var lastScrollTop = 0;

        window.onscroll = function () {
          //Lấy vị trí cuộn hiện tại
            var currentScrollTop = document.documentElement.scrollTop;

            // Kiểm tra hướng cuộn
            if (currentScrollTop > lastScrollTop) {
                // Lướt xuống - Ẩn header                
                header.classList.remove('sticky');
            } else {
                // Lướt lên - Hiển thị header sticky
                header.classList.add('sticky');
            }
            //Lưu vị trí cuộn hiện tại để so sánh với lần cuộn tiếp theo
            lastScrollTop = currentScrollTop;
        };
    });
    
    
     // sử dụng thư viện "scrollUp" để thêm chức năng cuộn lên (scroll to top) vào trang web
    RESHOP.initScrollUp = function() {
        // Sử dụng thư viện scrollUp với các cài đặt
        $.scrollUp({
            scrollName: 'topScroll', // Tên của sự kiện cuộn lên
            scrollText: '<i class="fas fa-long-arrow-alt-up"></i>', // Đoạn mã HTML hoặc văn bản hiển thị là nút cuộn lên
            easingType: 'linear', // Kiểu easing cho cuộn
            scrollSpeed: 900, // Tốc độ cuộn
            animation: 'fade', // Hiệu ứng xuất hiện của nút cuộn
            zIndex: 100 // Z-index của nút cuộn
        });
    };


   // Kích hoạt Scrollspy. một tính năng của Bootstrap, để theo dõi vị trí cuộn của trang 
   //và làm nổi bật các phần tử tương ứng trong thanh điều hướng (navigation) khi cuộn trang
    RESHOP.initScrollSpy = function() {
        // Chọn phần tử có id 'js-scrollspy-trigger'
        var $bodyScrollSpy = $('#js-scrollspy-trigger');
        // Kiểm tra xem có phần tử đó trên trang hay không
        if ($bodyScrollSpy.length) {
            // Kích hoạt Scrollspy với các cài đặt
            $bodyScrollSpy.scrollspy({
                target: '#init-scrollspy'
            });
        }
    };


   // di chuyển trơn tru (scroll) đến một phần tử cụ thể trên trang web khi một phần tử được click
    RESHOP.onClickScroll = function() {
        // Gắn sự kiện click cho các phần tử trong collectionaClickScroll
        $collectionaClickScroll.on('click', function (e) {
            // Ngăn chặn hành vi mặc định của sự kiện click
            e.preventDefault();
            // Lấy giá trị của thuộc tính data 'click-scroll' từ phần tử được click
            var target = $(this).data('click-scroll');
            // Kiểm tra xem có phần tử có id tương ứng với giá trị 'click-scroll' hay không
            if ($(target).length) {
                // Sử dụng animate để di chuyển trơn tru đến vị trí của phần tử có id tương ứng
                $('html').animate({
                    // .offset() là một hàm của jQuery, trả về đối tượng jQuery có các thuộc tính top, left, bottom,
                    // và trả về tổng khoảng cách từ phần tử đến container cha
                    scrollTop: $(target).offset().top
                }, 1000, function () {
                    // Hàm callback sau khi hoàn tất animation (có thể để trống nếu không cần)
                });
            }
        });
    };



    // gắn tooltip (chú giải) cho các phần tử có thuộc tính data-tooltip="tooltip"
    RESHOP.initTooltip = function() {
        // Chọn tất cả các phần tử có thuộc tính 'data-tooltip="tooltip"'
        $('[data-tooltip="tooltip"]').tooltip({
            // Giá trị mặc định của trigger là 'hover focus',
            // do đó tooltip sẽ ẩn hiện khi di chuột qua và tập trung vào phần tử.
            trigger : 'hover'
        });
    };


   // gắn sự kiện (event) cho việc hiển thị modal khi người dùng click vào một liên kết (anchor) có sẵn trên trang web
    RESHOP.initModal = function() {
        // Kiểm tra xem các anchor có sẵn trên trang hay không
        if ($collectionCartModalLink.length) {
            // Gắn sự kiện click cho các anchor
            $collectionCartModalLink.on('click',function () {
                // Lấy giá trị của thuộc tính data 'modal-id' từ anchor
                var getElemId = $(this).data('modal-id');
                // Hiển thị modal tương ứng với 'modal-id' đã lấy
                $(getElemId).modal({
                    backdrop: 'static', // Tùy chọn để giữ modal khi click bên ngoài modal (nền đen)
                    keyboard: false, // Tùy chọn để ngăn chặn đóng modal bằng phím Esc
                    show: true // Tùy chọn để hiển thị modal ngay khi được tạo
                });
            });
        }
    };


    // điều khiển hành vi của trang web khi người dùng thay đổi trạng thái của checkbox "Default Billing Address"
    RESHOP.defaultAddressCheckbox = function() {
        // Kiểm tra xem có checkbox 'Default Billing Address' nào trên trang hay không
        if ($defaultAddressCheckbox.length) {
            // Gắn sự kiện change cho checkbox 'Default Billing Address'
            $defaultAddressCheckbox.change(function () {
                // Kiểm tra xem checkbox có được chọn (checked) hay không
                if (this.checked) {
                    // Nếu được chọn, vô hiệu hóa các trường nhập thông tin địa chỉ billing trong form
                    $collectionFormBill.prop("disabled", true);
                    // Hủy chọn checkbox 'Make this my default billing address' (nếu có)
                    $('#make-default-address').prop("checked", false);
                } else {
                    // Nếu không được chọn, kích hoạt các trường nhập thông tin địa chỉ billing trong form
                    $collectionFormBill.prop("disabled", false);
                }
            });
        }
    };
    // Khai báo hàm reshopNavigation
    RESHOP.reshopNavigation = function() {
        // Gọi hàm shopNav() cho các phần tử có id tương ứng
        $('#navigation').shopNav();
        $('#navigation1').shopNav();
        $('#navigation2').shopNav();
        $('#navigation3').shopNav();
    };

    //xử lý sự kiện khi một tab mới được chọn trong giao diện tab
        RESHOP.onTabActiveRefreshSlider = function() {
            // Khi hiển thị một tab mới, sự kiện được kích hoạt.
            // Specificity = 2
            $('.tab-list [data-toggle="tab"]').on('shown.bs.tab', function (e) {
                // Lấy ID của tab hiện tại được chọn
                var currentID = $(e.target).attr('href');
                // Kích hoạt sự kiện `refresh` cho `tab` đang active hiện tại
                $(currentID + '.active').find('.tab-slider').trigger('refresh.owl.carousel');
            });
        };

    // sử dụng thư viện Owl Carousel để khởi tạo và cấu hình một slider chính (primary slider) trên trang web
    RESHOP.primarySlider = function() {
        // Kiểm tra xem có phần tử primary slider nào trên trang hay không
        if ($primarySlider.length) {
            // Sử dụng Owl Carousel để khởi tạo primary slider với các tùy chọn được cấu hình
            $primarySlider.owlCarousel({
                items: 1, // Số lượng items hiển thị trên mỗi slide
                autoplayTimeout: 8000, // Thời gian chờ giữa các slide khi tự động chuyển đổi (đơn vị: mili giây)
                loop: true, // Cho phép lặp vô hạn các slide
                margin: -1, // Khoảng trắng giữa các slide
                dots: false, // Ẩn hiển thị điểm chuyển đổi (dots)
                smartSpeed: 1500, // Tốc độ chuyển đổi giữa các slide (đơn vị: mili giây)
                rewind: false, // Di chuyển ngược lại khi đạt đến ranh giới của slider
                nav: false, // Ẩn hiển thị nút điều hướng (prev/next)
                responsive: {
                    992: {
                        dots: true // Hiển thị dots khi độ phân giải màn hình lớn hơn hoặc bằng 992px
                    }
                }
            });
        }
    };


    //sử dụng thư viện Owl Carousel để khởi tạo và cấu hình các slider trên trang web
    RESHOP.productSlider = function() {
        // Kiểm tra xem có phần tử slider nào trên trang hay không
        if ($collectionProductSlider.length) {
            // Gắn sự kiện initialize.owl.carousel để xóa lớp 'slider-fouc' khi slider được khởi tạo
            $collectionProductSlider.on('initialize.owl.carousel', function () {
                $(this).closest('.slider-fouc').removeAttr('class');
            }).each(function () {
                // Lặp qua từng phần tử slider
                var thisInstance = $(this);
                var itemPerLine = thisInstance.data('item');

                // Khởi tạo Owl Carousel cho từng slider
                thisInstance.owlCarousel({
                    autoplay: false,
                    loop: false,
                    dots: false,
                    rewind: true,
                    smartSpeed: 1500,
                    nav: true,
                    navElement: 'div',
                    navClass: ['p-prev', 'p-next'],
                    navText: ['<i class="fas fa-long-arrow-alt-left"></i>', '<i class="fas fa-long-arrow-alt-right"></i>'],
                    responsive: {
                        0: {
                            items: 1
                        },
                        768: {
                            items: itemPerLine - 2
                        },
                        991: {
                            items: itemPerLine - 1
                        },
                        1200: {
                            items: itemPerLine
                        }
                    }
                });
            });
        }
    };



    // sử dụng thư viện Owl Carousel để khởi tạo và cấu hình các slider trên trang web
    // Điều chỉnh như trên
    RESHOP.tabSlider = function() {
        if ($collectionTabSlider.length) {
            $collectionTabSlider.on('initialize.owl.carousel', function () {
                $(this).closest('.slider-fouc').removeAttr('class');
            }).each(function () {
                var thisInstance = $(this);
                var itemPerLine = thisInstance.data('item');
                thisInstance.owlCarousel({
                    autoplay: false,
                    loop: false,
                    dots: false,
                    rewind: true,
                    smartSpeed: 1500,
                    nav: true,
                    navElement: 'div',
                    navClass: ['t-prev', 't-next'],
                    navText: ['<i class="fas fa-long-arrow-alt-left"></i>', '<i class="fas fa-long-arrow-alt-right"></i>'],
                    responsive: {
                        0: {
                            items: 1
                        },
                        768: {
                            items: itemPerLine - 2
                        },
                        991: {
                            items: itemPerLine - 1
                        },
                        1200: {
                            items: itemPerLine
                        }
                    }
                });
            });
        }
    };

    //sử dụng thư viện Owl Carousel để khởi tạo và cấu hình một slider đặc biệt cho thương hiệu (brand slider) trên trang web
    RESHOP.brandSlider = function() {
        // Chọn phần tử có id 'brand-slider'
        var $brandSlider = $('#brand-slider');
        // Kiểm tra xem có phần tử brand slider nào trên trang hay không
        if ($brandSlider.length) {
            // Lấy giá trị của thuộc tính 'data-item' từ phần tử brand slider để xác định số lượng hiển thị items trên mỗi dòng
            var itemPerLine = $brandSlider.data('item');
            // Gắn sự kiện initialize.owl.carousel để xóa lớp 'slider-fouc' khi brand slider được khởi tạo
            $brandSlider.on('initialize.owl.carousel', function () {
                $(this).closest('.slider-fouc').removeAttr('class');
            }).owlCarousel({
                autoplay: false,
                loop: false,
                dots: false,
                rewind: true,
                nav: true,
                navElement: 'div',
                navClass: ['b-prev', 'b-next'],
                navText: ['<i class="fas fa-angle-left"></i>', '<i class="fas fa-angle-right"></i>'],
                responsive: {
                    0: {
                        items: 1
                    },
                    768: {
                        items: 3,
                    },
                    991: {
                        items: itemPerLine
                    },
                    1200: {
                        items: itemPerLine
                    }
                }

            });
        }
    };

    //SỬA Testimonial Slider
    // RESHOP.testimonialSlider = function() {
    //     // Check if Testimonial-Slider on the page
    //     if ($testimonialSlider.length) {
    //         $testimonialSlider.on('initialize.owl.carousel', function () {
    //             $(this).closest('.slider-fouc').removeAttr('class');
    //         }).owlCarousel({
    //             items:1,
    //             autoplayTimeout: 8000,
    //             loop: true,
    //             autoplay: false,
    //             loop: false,
    //             dots: true,
    //             rewind: false,
    //             smartSpeed: 1500,
    //             nav: false
    //         });
    //     }
    // };
    RESHOP.testimonialSlider = function() {
        // Kiểm tra Testimontial-Slider trên trang
        if ($testimonialSlider.length) {
            $testimonialSlider.on('initialize.owl.carousel', function () {
                $(this).closest('.slider-fouc').removeAttr('class');
            }).owlCarousel({
                items: 1,
                autoplayTimeout: 8000,
                loop: true,
                autoplay: false,
                dots: false, // Tắt chấm
                rewind: false,
                smartSpeed: 1500,
                nav: true, // Bật mũi tên chuyển đổi
                navText: ['<i class="fas fa-chevron-left"></i>', '<i class="fas fa-chevron-right"></i>'], // Mũi tên chuyển đổi tùy chỉnh
            });
        }
    };

    // loại bỏ tất cả các lớp (class) khỏi phần tử <body> trong trang web và loại bỏ lớp 'is-active' khỏi phần tử có class 'preloader'
    RESHOP.appConfiguration = function() {
        // Loại bỏ tất cả các lớp (class) từ phần tử body
        $('body').removeAttr('class');
        // Loại bỏ lớp 'is-active' từ phần tử có class 'preloader'
        $('.preloader').removeClass('is-active');
    };

    // plugin Isotope để thực hiện bộ lọc (filter) cho các phần tử trên trang web
    RESHOP.isotopeFilter = function() {

        // Kiểm tra xem có phần tử filter grid wrapper trên trang hay không
        if ($filterGridWrapper.length) {
            // Sử dụng plugin Isotope cho phần tử wrapper của grid
            $filterGridWrapper.isotope({
                itemSelector: '.filter__item',
                filter: '*'
            });
        }

        // Kiểm tra xem có các nút filter trên trang hay không, sau đó gắn sự kiện click
        if ($collectionOfFilterBtn.length) {
            // Gắn sự kiện click cho các nút filter
            $collectionOfFilterBtn.on('click', function () {
                // Lấy giá trị của thuộc tính data-filter
                var selectorValue = $(this).attr('data-filter');
                // Khởi tạo lại plugin Isotope với bộ lọc mới
                $filterGridWrapper.isotope({
                    filter: selectorValue
                });
                // Loại bỏ lớp 'js-checked' từ các nút filter khác và thêm vào nút đang được click
                $(this).closest('.filter-category-container').find('.js-checked').removeClass('js-checked');
                $(this).addClass('js-checked');
            });
        }
    };

    //plugin countdown để hiển thị đếm ngược trên trang web
    RESHOP.timerCountDown = function() {
            // Kiểm tra xem có phần tử countdown trên trang hay không
        if ($collectionCountDown.length) {
             // Duyệt qua từng phần tử countdown
            $collectionCountDown.each(function () {
                var $this = $(this),
                    finalDate = $(this).data('countdown');
                    // Sử dụng plugin countdown cho phần tử hiện tại
                $this.countdown(finalDate, function (event) {
                    // Hiển thị định dạng thời gian còn lại
                      $this.html(event.strftime('<div class="countdown__content"><div><span class="countdown__value">%D</span><span class="countdown__key">Ngày</span></div></div><div class="countdown__content"><div><span class="countdown__value">%H</span><span class="countdown__key">Giờ</span></div></div><div class="countdown__content"><div><span class="countdown__value">%M</span><span class="countdown__key">Phút</span></div></div><div class="countdown__content"><div><span class="countdown__value">%S</span><span class="countdown__key">Giây</span></div></div>'));
                });
            });
        }

    };

    //  quản lý đối tượng đếm (counter) cho các trường input trên trang web.
    RESHOP.initInputCounter = function() {
        // Kiểm tra xem có trường input counter trên trang hay không
        if ($collectionInputCounter.length) {
            // Gắn sự kiện Click cho nút tăng giá trị
            $collectionInputCounter.find('.input-counter__plus').on('click',function () {
                var $input = $(this).parent().find('input');
                var count = parseInt($input.val()) + 1; // Giá trị hiện tại + 1
                $input.val(count).change();
            });
            // Gắn sự kiện Click cho nút giảm giá trị
            $collectionInputCounter.find('.input-counter__minus').on('click',function () {
                var $input = $(this).parent().find('input');
                var count = parseInt($input.val()) - 1; // Giá trị hiện tại - 1
                $input.val(count).change();
            });
            // Sự kiện xảy ra khi giá trị của trường input thay đổi
            $collectionInputCounter.find('input').change(function () {
                var $this = $(this);
                var min = $this.data('min');
                var max = $this.data('max');
                var val = parseInt($this.val()); // Giá trị hiện tại
                // Kiểm tra ràng buộc giá trị
                if (!val) {
                val = 1;
                }
                // Giới hạn giá trị tối đa
                val = Math.min(val, max);
                // Giới hạn giá trị tối thiểu
                val = Math.max(val, min);
                // Đặt giá trị mới cho trường input
                $this.val(val);
            });
        }
    };



    // xử lý hiển thị ảnh trong bài đăng trên trang blog sử dụng plugin Owl Carousel
    RESHOP.blogPostGallery = function() {
        // Kiểm tra xem có phần tử chứa ảnh trong bài đăng hay không
        if ($collectionPostGallery.length) {
            $collectionPostGallery.on('initialize.owl.carousel', function () {
                // Sự kiện được kích hoạt khi Owl Carousel được khởi tạo,
                // loại bỏ lớp 'slider-fouc' để tránh hiển thị không đúng
                $(this).closest('.slider-fouc').removeAttr('class');
            }).each(function () {
                // Khởi tạo Owl Carousel cho từng phần tử chứa ảnh
                $(this).owlCarousel({
                    items: 1,
                    autoplay: false,
                    loop: false,
                    dots: false,
                    rewind: true,
                    smartSpeed: 1500,
                    nav: true,
                    navElement: 'div',
                    navClass: ['post-prev', 'post-next'],
                    navText: ['<i class="fas fa-long-arrow-alt-left"></i>', '<i class="fas fa-long-arrow-alt-right"></i>'],
                });
            });
        }
    };


    // Bài đăng kiểu Masonry
    RESHOP.blogPostMasonry = function() {
        // Kiểm tra xem có phần tử chứa bài đăng trong kiểu Masonry hay không
        if ($blogMasonry.length) {
            // Sử dụng plugin Isotope để tạo kiểu Masonry
            $blogMasonry.find('.blog-m-init').isotope({
                itemSelector: '.blog-m__element', // Chọn phần tử bài đăng
                layoutMode: 'masonry'              // Chọn kiểu layout là Masonry
            });
        }
    };

    // Video bài viết
    RESHOP.blogPostVideo = function() {
        // Kiểm tra xem có phần tử chứa video trong bài đăng hay không
        if ($collectionPostVideo.length) {
            // Gắn sự kiện 'click' cho phần tử chứa video
            $collectionPostVideo.on('click',function (e) {
                e.preventDefault();
                var $this = $(this);
                // Tìm phần tử con ngay lập tức có class .bp__video
                var myVideo = $this.find('.post-video')[0];
                // Thêm sự kiện 'ended' (khi video đã phát xong)
                $(myVideo).on('ended',function () {
                    $this.removeClass('process'); // Thêm biểu tượng play
                });
                // Mặc định là tạm dừng
                if (myVideo.paused) {
                    // Phát Video
                    myVideo.play();
                    $(this).addClass('process');
                    if ($(this).hasClass('pause')) {
                        $(this).removeClass('pause');
                    }
                } 
                // Nếu người dùng nhấn lại vào khối đó, chỉ tạm dừng video và thêm biểu tượng
                else {
                    myVideo.pause();
                    $(this).addClass('pause');
                }
            });
        }
    };

    

    // Video trong bài viết
    RESHOP.blogPostEmbedVideo = function() {
        // Kiểm tra xem có phần tử chứa video nhúng trong bài đăng hay không
        if ($collectionEmbedVideo.length) {
            // Sử dụng plugin fitVids để làm cho video nhúng có kích thước phù hợp
            $collectionEmbedVideo.parent().fitVids();
        }
    };




    // Hàm khởi tạo chi tiết sản phẩm
    RESHOP.productDetailInit = function() {
        // Kiểm tra xem có phần tử chi tiết sản phẩm và hình ảnh thu nhỏ của chi tiết sản phẩm hay không
      if ($productDetailElement.length && $productDetailElementThumbnail.length) {
        // Cấu hình cho plugin Elevate Zoom
          var ELEVATE_ZOOM_OBJ = {
              borderSize: 1,
              autoWidth:true,
              zoomWindowWidth: 540,
              zoomWindowHeight: 540,
              zoomWindowOffetx: 10,
              borderColour: '#e9e9e9',
              cursor: 'pointer'
          };
             // Sự kiện 'init' được kích hoạt sau khi slick (carousel) của chi tiết sản phẩm được khởi tạo
          $productDetailElement.on('init', function () {
              $(this).closest('.slider-fouc').removeClass('slider-fouc');
          });
          // Khởi tạo carousel (Slick) cho phần tử chi tiết sản phẩm
          $productDetailElement.slick({
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite:false,
              arrows: false,
              dots: false,
              fade: true,
              asNavFor: $productDetailElementThumbnail
          });
          // Khởi tạo plugin Elevate Zoom cho ảnh đầu tiên trong carousel
          $('#pd-o-initiate .slick-current img').elevateZoom(ELEVATE_ZOOM_OBJ);

          // Sự kiện 'beforeChange' được kích hoạt trước khi slide thay đổi
          $productDetailElement.on('beforeChange', function(event, slick, currentSlide, nextSlide){
              // Lấy ảnh của slide tiếp theo
              var $img = $(slick.$slides[nextSlide]).find('img');
            // Xóa các phần tử zoom cũ
              $('.zoomWindowContainer,.zoomContainer').remove();
              // Khởi tạo lại plugin Elevate Zoom cho ảnh của slide tiếp theo
              $($img).elevateZoom(ELEVATE_ZOOM_OBJ);
          });

          // Khởi tạo plugin LightGallery
          $productDetailElement.lightGallery({
            selector: '.pd-o-img-wrap',       // Chọn ảnh trong phần tử $productDetailElement
            download: false,                   // Tắt nút tải xuống
            thumbnail: false,                  // Tắt hiển thị hình ảnh thu nhỏ
            autoplayControls: false,           // Tắt điều khiển tự động chuyển ảnh
            actualSize: false,                 // Tắt hiển thị biểu tượng kích thước thực (phóng to)
            hash: false,                       // Tắt plugin hash
            share: false                       // Tắt plugin chia sẻ
          });
          // Sự kiện 'init' được kích hoạt sau khi slick (carousel) của hình ảnh thu nhỏ được khởi tạo
          $productDetailElementThumbnail.on('init', function () {
              $(this).closest('.slider-fouc').removeAttr('class');
          });
          // Khởi tạo carousel (Slick) cho hình ảnh thu nhỏ của chi tiết sản phẩm
          $productDetailElementThumbnail.slick({
              slidesToShow: 4,
              slidesToScroll: 1,
              infinite:false,
              arrows: true,
              dots: false,
              focusOnSelect: true,
              asNavFor: $productDetailElement,
              prevArrow:'<div class="pt-prev"><i class="fas fa-angle-left"></i>',
              nextArrow:'<div class="pt-next"><i class="fas fa-angle-right"></i>',
              responsive: [
                  {
                      breakpoint: 1200,
                      settings: {
                          slidesToShow: 4
                      }
                  },
                  {
                      breakpoint: 992,
                      settings: {
                          slidesToShow: 3
                      }
                  },
                  {
                      breakpoint: 576,
                      settings: {
                          slidesToShow: 2
                      }
                  }
              ]
          });
      }
    };

    // Hàm khởi tạo modal chi tiết sản phẩm
    RESHOP.modalProductDetailInit = function() {
        // Kiểm tra xem có phần tử modal chi tiết sản phẩm và hình ảnh thu nhỏ của modal hay không
        if ($modalProductDetailElement.length && $modalProductDetailElementThumbnail.length) {
             // Khởi tạo carousel (Slick) cho phần tử modal chi tiết sản phẩm
            $modalProductDetailElement.slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite:false,
                arrows: false,
                dots: false,
                fade: true,
                asNavFor: $modalProductDetailElementThumbnail
            });
            // Khởi tạo carousel (Slick) cho hình ảnh thu nhỏ của modal
            $modalProductDetailElementThumbnail.slick({
                slidesToShow: 4,
                slidesToScroll: 1,
                infinite:false,
                arrows: true,
                dots: false,
                focusOnSelect: true,
                asNavFor: $modalProductDetailElement,
                prevArrow:'<div class="pt-prev"><i class="fas fa-angle-left"></i>',
                nextArrow:'<div class="pt-next"><i class="fas fa-angle-right"></i>',
                responsive: [
                    {
                        breakpoint: 1200,
                        settings: {
                            slidesToShow: 4
                        }
                    },
                    {
                        breakpoint: 992,
                        settings: {
                            slidesToShow: 3
                        }
                    },
                    {
                        breakpoint: 576,
                        settings: {
                            slidesToShow: 2
                        }
                    }
                ]
            });
           // Hook vào sự kiện 'shown.bs.modal' của Bootstrap và gọi sự kiện 'resize'
        // để Slick tính lại kích thước các phần tử khi modal được hiển thị
            $('#quick-look').on('shown.bs.modal', function () {
                $modalProductDetailElement.resize();
            });
        }
    };
    // Hàm chức năng mở rộng  danh mục cửa hàng
    RESHOP.shopCategoryToggle = function() {
        // Kiểm tra xem có phần tử span chuyển đổi danh mục cửa hàng hay không
        if ($shopCategoryToggleSpan.length) {
            // Gắn sự kiện 'click' cho phần tử span chuyển đổi danh mục cửa hàng
            $shopCategoryToggleSpan.on('click', function () {
                // Thêm hoặc loại bỏ lớp 'is-expanded' để tạo hiệu ứng giao diện
                $(this).toggleClass('is-expanded');
                // Lấy phần tử ul (danh sách) kế tiếp và thực hiện hiệu ứng slideToggle
                $(this).next('ul').stop(true, true).slideToggle();
            });
        }
    };



    // // Hàm thay đổi bố cục hiển thị của  trang cửa hàng
    RESHOP.shopPerspectiveChange = function() {
        // Kiểm tra xem có phần tử nút chuyển đổi xem lưới và xem danh sách hay không
          if ($shopGridBtn.length && $shopListBtn.length)   {
            // Gắn sự kiện 'click' cho nút chuyển đổi xem lưới
              $shopGridBtn.on('click',function () {
                // Thêm lớp 'is-active' cho nút xem lưới
                  $(this).addClass('is-active');
                  // Loại bỏ lớp 'is-active' từ nút xem danh sách
                  $shopListBtn.removeClass('is-active');
                  // Loại bỏ lớp 'is-list-active' và thêm lớp 'is-grid-active' cho hàng chứa sản phẩm
                  $shopPerspectiveRow.removeClass('is-list-active');
                  $shopPerspectiveRow.addClass('is-grid-active');
              });
              // Chỉnh tương tự bên trên
              $shopListBtn.on('click',function () {
                  $(this).addClass('is-active');
                  $shopGridBtn.removeClass('is-active');
                  $shopPerspectiveRow.removeClass('is-grid-active');
                  $shopPerspectiveRow.addClass('is-list-active');
              });
          }
    };
    // Hàm cấu hình bộ lọc bên cửa hàng
    RESHOP.shopSideFilter = function() {
        // Kiểm tra xem có phần tử nút bộ lọc cửa hàng hay không
        if ($shopFilterBtn.length) {
            // Gắn sự kiện 'click' cho các nút bộ lọc
            $shopFilterBtn.on('click',function () {
                // Thêm hoặc loại bỏ lớp 'is-active' để tạo hiệu ứng giao diện cho nút
                $(this).toggleClass('is-active');
                // Lấy giá trị của thuộc tính 'data-side'
                var target = $(this).attr('data-side');
                 // Mở hoặc đóng phần tử có id là target (được lấy từ thuộc tính 'data-side')
                $(target).toggleClass('is-open');
            });
        }
    };

   // Hàm hiển thị modal của Newsletter - popup ở trang chủ
    RESHOP.showNewsletterModal = function() {
        // Kiểm tra xem có phần tử modal có id là 'newsletter-modal' hay không
        if ($('#newsletter-modal').length) {
            // Đặt một hẹn giờ (5 giây) trước khi thực hiện hành động tiếp theo
            setTimeout(function () {
                // Mở modal bằng cách thủ công
                $('#newsletter-modal').modal({
                    backdrop: 'static', // Ngăn chặn việc đóng modal khi nhấp bên ngoài nó
                    keyboard: false, // Ngăn chặn việc đóng modal khi nhấn phím ESC
                    show: true // Hiển thị modal
                });
            }, 5000);  // Hẹn giờ 5 giây
        }
    };

    // Khi trang web hoàn toàn tải xong (bao gồm cả các phần tử DOM và hình ảnh)
    $(window).on('load',function () {
        // Hiển thị modal của newsletter
        RESHOP.showNewsletterModal();
        // Kiểm tra xem có phần tử slider chính không
        if ($primarySlider.length) {
             // Bật chế độ tự động chạy slider khi mọi thứ đã tải xong
             // Ở đây, giả sử $primarySlider là một đối tượng Owl Carousel
             // và options.autoplay là thuộc tính cấu hình để tự động chạy slider
            $primarySlider.data('owl.carousel').options.autoplay = true;
            // Kích hoạt sự kiện 'refresh.owl.carousel' để cập nhật lại slider
            $primarySlider.trigger('refresh.owl.carousel');
        }
    });
    
    // Nút sticky add to cart ở dưới cùng 
$(document).ready(function() {
    $(window).on('scroll', function() {
      stickyAddToCart();
    });

    const $primaryBuyButton = $("#primary-add-to-cart");
    const $stickyBar = $(".pd-stickyBuyNow");

    const stickyAddToCart = () => {
        // Vị trí phía dưới của nút "Mua ngay" chính = vị trí  của nó so với đầu trang + chiều cao của nó
      const primaryBuyButtonOffset = $primaryBuyButton.offset().top + $primaryBuyButton.outerHeight();
      // Vị trí hiện tại = với vị trí cuộn cửa sổ
      const scrollPosition = $(window).scrollTop();
      //Nếu vị trí hiện tại > vị trí phía dưới nút "Mua ngay" chính thì hiện thanh "mua ngay" phụ và ngược lại
      if (scrollPosition > primaryBuyButtonOffset) {
        $stickyBar.show();}
        else {
        $stickyBar.hide();
      }
    };
  });


    
        
        RESHOP.initScrollUp();
        RESHOP.initTooltip();
        RESHOP.initModal();
        RESHOP.defaultAddressCheckbox();
        RESHOP.initScrollSpy();
        RESHOP.onClickScroll();
        RESHOP.reshopNavigation();
        RESHOP.primarySlider();
        RESHOP.productSlider();
        RESHOP.tabSlider();
        RESHOP.onTabActiveRefreshSlider();
        RESHOP.brandSlider();
        RESHOP.testimonialSlider();
        RESHOP.appConfiguration();
        RESHOP.isotopeFilter();
        RESHOP.timerCountDown();
        RESHOP.initInputCounter();
        RESHOP.blogPostGallery();
        RESHOP.blogPostVideo();
        RESHOP.blogPostEmbedVideo();
        RESHOP.blogPostMasonry();
        RESHOP.productDetailInit();
        RESHOP.modalProductDetailInit();
        RESHOP.shopCategoryToggle();
        RESHOP.shopPerspectiveChange();
        RESHOP.shopSideFilter();
})(jQuery);