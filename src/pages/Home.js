import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Wait for DOM and scripts to be ready
    const initializePlugins = () => {
      if (typeof window.jQuery === 'undefined') {
        setTimeout(initializePlugins, 100);
        return;
      }
      
      const $ = window.jQuery;
      // Multi level dropdown menu
      $('.dropdown-menu a.dropdown-toggle').on('click', function (e) {
        if (!$(this).next().hasClass('show')) {
          $(this).parents('.dropdown-menu').first().find('.show').removeClass('show');
        }
        var $subMenu = $(this).next('.dropdown-menu');
        $subMenu.toggleClass('show');
        $(this).parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function (e) {
          $('.dropdown-submenu .show').removeClass('show');
        });
        return false;
      });

      // Header Search
      if ($('.search-box-outer').length) {
        $('.search-box-outer').on('click', function () {
          $('body').addClass('search-active');
        });
        $('.close-search').on('click', function () {
          $('body').removeClass('search-active');
        });
      }

      // data-background
      $("[data-background]").each(function () {
        $(this).css("background-image", "url(" + $(this).attr("data-background") + ")");
      });

      // Sidebar popup
      $('.sidebar-btn').on('click', function() {
        $('.sidebar-popup').addClass('open');
        $('.sidebar-wrapper').addClass('open');
      });
      $('.close-sidebar-popup, .sidebar-popup').on('click', function() {
        $('.sidebar-popup').removeClass('open');
        $('.sidebar-wrapper').removeClass('open');
      });

      // WOW init
      if (window.WOW) {
        new window.WOW().init();
      }

      // Hero slider
      $('.hero-slider').owlCarousel({
        loop: true,
        nav: true,
        dots: true,
        margin: 0,
        autoplay: true,
        autoplayHoverPause: true,
        autoplayTimeout: 5000,
        items: 1,
        navText: [
          "<i class='far fa-long-arrow-left'></i>",
          "<i class='far fa-long-arrow-right'></i>"
        ],
        onInitialized: function(event) {
          var $firstAnimatingElements = $('.owl-item').eq(event.item.index).find("[data-animation]");
          doAnimations($firstAnimatingElements);
        },
        onChanged: function(event){
          var $firstAnimatingElements = $('.owl-item').eq(event.item.index).find("[data-animation]");
          doAnimations($firstAnimatingElements);
        }
      });

      // Hero slider do animations
      function doAnimations(elements) {
        var animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        elements.each(function () {
          var $this = $(this);
          var $animationDelay = $this.data('delay');
          var $animationDuration = $this.data('duration');
          var $animationType = 'animated ' + $this.data('animation');
          $this.css({
            'animation-delay': $animationDelay,
            '-webkit-animation-delay': $animationDelay,
            'animation-duration': $animationDuration,
            '-webkit-animation-duration': $animationDuration,
          });
          $this.addClass($animationType).one(animationEndEvents, function () {
            $this.removeClass($animationType);
          });
        });
      }

      // Service slider
      $('.service-slider').owlCarousel({
        loop: true,
        margin: 15,
        nav: true,
        dots: false,
        autoplay: false,
        navText: [
          "<i class='far fa-arrow-left'></i>",
          "<i class='far fa-arrow-right'></i>"
        ],
        responsive: {
          0: {
            items: 1
          },
          600: {
            items: 2
          },
          1000: {
            items: 3
          },
          1100: {
            items: 4
          }
        }
      });

      // Testimonial slider
      $('.testimonial-slider').owlCarousel({
        loop: true,
        margin: 30,
        nav: false,
        dots: true,
        autoplay: true,
        responsive: {
          0: {
            items: 1
          },
          600: {
            items: 2
          },
          1000: {
            items: 2
          }
        }
      });

      // Partner slider
      $('.partner-slider').owlCarousel({
        loop: true,
        margin: 30,
        nav: false,
        navText: [
          "<i class='icofont-long-arrow-left'></i>",
          "<i class='icofont-long-arrow-right'></i>"
        ],
        dots: false,
        autoplay: true,
        responsive: {
          0: {
            items: 2
          },
          600: {
            items: 3
          },
          1000: {
            items: 6
          }
        }
      });

      // Preloader
      $(".preloader").fadeOut("slow");

      // Fun fact counter
      $('.counter').countTo();
      $('.counter-box').appear(function () {
        $('.counter').countTo();
      }, {
        accY: -100
      });

      // Magnific popup init
      $(".popup-gallery").magnificPopup({
        delegate: '.popup-img',
        type: 'image',
        gallery: {
          enabled: true
        },
      });

      $(".popup-youtube, .popup-vimeo, .popup-gmaps").magnificPopup({
        type: "iframe",
        mainClass: "mfp-fade",
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false
      });

      // Scroll to top
      $(window).scroll(function () {
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
          $("#scroll-top").addClass('active');
        } else {
          $("#scroll-top").removeClass('active');
        }
      });

      $("#scroll-top").on('click', function () {
        $("html, body").animate({ scrollTop: 0 }, 1500);
        return false;
      });

      // Navbar fixed top
      $(window).scroll(function () {
        if ($(this).scrollTop() > 50) {
          $('.navbar').addClass("fixed-top");
        } else {
          $('.navbar').removeClass("fixed-top");
        }
      });

      // Copyright date
      let date = new Date().getFullYear();
      $("#date").html(date);

      // Nice select
      $('.select').niceSelect();
    };

    // Initialize after a short delay to ensure DOM is ready
    setTimeout(() => {
      initializePlugins();
    }, 500);

    return () => {
      // Cleanup: destroy carousels and remove event listeners
      if (typeof window.jQuery !== 'undefined') {
        const $ = window.jQuery;
        $('.hero-slider, .service-slider, .testimonial-slider, .partner-slider').trigger('destroy.owl.carousel');
      }
    };
  }, []);

  return (
    <div className="App">
      {/* Preloader */}
      <div className="preloader">
        <div className="loader-ripple">
          <div></div>
          <div></div>
        </div>
      </div>

      {/* Header Area */}
      <header className="header">
        {/* Header Top */}
        <div className="header-top">
          <div className="container">
            <div className="header-top-wrap">
              <div className="header-top-left">
                <div className="header-top-list">
                  <ul>
                    <li><a href="mailto:jobshop@247cutbend.in"><i className="far fa-envelopes"></i>
                      <span className="__cf_email__">jobshop@247cutbend.in</span></a></li>
                    <li><a href="tel:+91 95120 41116"><i className="far fa-phone-volume"></i> +91 95120 41116</a></li>
                  </ul>
                </div>
              </div>
              <div className="header-top-right">
                <div className="header-top-list"></div>
                <div className="header-top-social">
                  <span>Follow Us: </span>
                  <a href="#"><i className="fab fa-facebook"></i></a>
                  <a href="#"><i className="fab fa-x-twitter"></i></a>
                  <a href="#"><i className="fab fa-instagram"></i></a>
                  <a href="#"><i className="fab fa-linkedin-in"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navbar */}
        <div className="main-navigation">
          <nav className="navbar navbar-expand-lg">
            <div className="container position-relative">
              <a className="navbar-brand" href="/">
                {/* <img src="https://www.247cutbend.in/assets/img/logo%20(2).png" alt="logo" /> */}
                <img src="/assets/img/Cutbend_Footer_LOGO.png" alt="" />

              </a>

              <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasNavbar"
                aria-labelledby="offcanvasNavbarLabel">
                <div className="offcanvas-header">
                  <a href="/" className="offcanvas-brand" id="offcanvasNavbarLabel">
                    {/* <img src="https://www.247cutbend.in/assets/img/logo%20(2).png" alt="" /> */}
                    <img src="/assets/img/Cutbend_Footer_LOGO.png" alt="" />

                  </a>
                  <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close">
                    <i className="far fa-xmark"></i>
                  </button>
                </div>
                <div className="offcanvas-body gap-xl-4">
                  <ul className="navbar-nav justify-content-end flex-grow-1">
                    <li className="nav-item"><a className="nav-link" href="/">Home</a></li>
                    <li className="nav-item"><a className="nav-link" href="#about-area">About Us</a></li>
                    <li className="nav-item"><a className="nav-link" href="#service-area">Capabilities</a></li>
                    <li className="nav-item"><a className="nav-link" href="#quote-area">Contact Us</a></li>
                  </ul>
                  <div className="nav-right">
                    <div className="nav-btn">
                      <a href="/signup" onClick={(e) => { e.preventDefault(); navigate('/signup'); }} className="theme-btn">Login<i className="fas fa-arrow-right"></i></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </header>

      {/* Popup Search */}
      <div className="search-popup">
        <button className="close-search"><span className="far fa-times"></span></button>
        <form action="#">
          <div className="form-group">
            <input type="search" name="search-field" className="form-control" placeholder="Search Here..." required />
            <button type="submit"><i className="far fa-search"></i></button>
          </div>
        </form>
      </div>

      {/* Sidebar Popup */}
      <div className="sidebar-popup offcanvas offcanvas-end" tabIndex="-1" id="sidebarPopup">
        <div className="offcanvas-header">
          <a href="/" className="sidebar-popup-logo">
            <img src="https://www.247cutbend.in/assets/img/logo%20(2).png" alt="" />
          </a>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close">
            <i className="far fa-xmark"></i>
          </button>
        </div>
        <div className="sidebar-popup-wrap offcanvas-body">
          <div className="sidebar-popup-content">
            <div className="sidebar-popup-about">
              <h4>About Us</h4>
              <p>247CutBend, your trusted partner for precision cutting, bending, and metal fabrication services. With advanced technology and a commitment to quality,</p>
            </div>
            <div className="sidebar-popup-contact">
              <h4>Contact Info</h4>
              <ul>
                <li>
                  <div className="icon">
                    <i className="far fa-envelope"></i>
                  </div>
                  <div className="content">
                    <h6>Email</h6>
                    <a href="#"><span className="__cf_email__">support@247cutbend.in</span></a>
                  </div>
                </li>
                <li>
                  <div className="icon">
                    <i className="far fa-phone"></i>
                  </div>
                  <div className="content">
                    <h6>Phone</h6>
                    <a href="tel:+21236547898">+91 99300 04026</a>
                  </div>
                </li>
                <li>
                  <div className="icon">
                    <i className="far fa-location-dot"></i>
                  </div>
                  <div className="content">
                    <h6>Address</h6>
                    <a href="#">578-587 Savli GIDC Rd, Vadodara, Manjusar, Gujarat 391770, India</a>
                  </div>
                </li>
              </ul>
            </div>
            <div className="sidebar-popup-social">
              <h4>Follow Us</h4>
              <a href="#"><i className="fab fa-facebook"></i></a>
              <a href="#"><i className="fab fa-x-twitter"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </div>
        </div>
      </div>

      <main className="main">
        {/* Hero Area */}
        <div className="hero-section">
          <div className="hero-slider owl-carousel">
            <div className="hero-single">
              <video muted loop autoPlay>
                <source src="/assets/img/cns.mp4" type="video/mp4" />
              </video>
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-md-12 col-lg-8">
                    <div className="hero-content">
                      <h6 className="hero-sub-title" data-animation="fadeInUp" data-delay=".25s">
                        Laser cutting & Bending - 24x7 ONLINE
                      </h6>
                      <h1 className="hero-title" data-animation="fadeInRight" data-delay=".50s">
                        Instant quote <br/> Fastest delivery <br/> best price
                      </h1>
                      {/* <div className="hero-btn" data-animation="fadeInUp" data-delay="1s">
                        <a href="https://workdrive.zohopublic.in/collection/pgd574e5ce61888a2407c93078e287e399d18/external" target="_blank" rel="noopener noreferrer" className="theme-btn">Upload Files<i className="fas fa-arrow-right"></i></a>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Partner Area */}
        <div className="partner-area pt-negative">
          <div className="container-fluid">
            <div className="col-lg-8">
              <div className="partner-wrap">
                <div className="partner-wrapper partner-slider owl-carousel owl-theme">
                  <img className="partner-wrapper-img" src="/assets/img/partner/01.jpg" alt="thumb" />
                  <img className="partner-wrapper-img" src="/assets/img/partner/02.jpg" alt="thumb" />
                  <img className="partner-wrapper-img" src="/assets/img/partner/03.jpg" alt="thumb" />
                  <img className="partner-wrapper-img" src="/assets/img/partner/04.jpg" alt="thumb" />
                  <img className="partner-wrapper-img" src="/assets/img/partner/05.jpg" alt="thumb" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Process Area */}
        <div className="process-area py-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 mx-auto">
                <div className="site-heading text-center wow fadeInDown" data-wow-delay=".25s">
                  {/* <h2 className="site-title">Easy steps for <span>Upload Designs</span></h2> */}
                  <div className="heading-divider"></div>
                </div>
              </div>
            </div>
            <div className="process-wrap mt-3 wow fadeInUp" data-wow-delay=".25s">
              <div className="row g-4">
                <div className="col-md-6 col-lg-4 col-xl-3">
                  <div className="process-item">
                    <span className="count">01</span>
                    <div className="icon">
                      <img src="/assets/img/1.png" alt="" />
                    </div>
                    <div className="content">
                      <h4>Upload Your Files</h4>
                      <p>We accept dwg,dxf,step, jpg, hand sketches etc.</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-4 col-xl-3">
                  <div className="process-item">
                    <span className="count">02</span>
                    <div className="icon">
                      <img src="/assets/img/2.png" alt="" />
                    </div>
                    <div className="content">
                      <h4> Get a Quote in 2 Hours</h4>
                      <p> As low as RS. 65/Kg * We save OUR material for you.</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-4 col-xl-3">
                  <div className="process-item">
                    <span className="count">03</span>
                    <div className="icon">
                      <img src="/assets/img/3.png" alt="" />
                    </div>
                    <div className="content">
                      <h4>Confirm Your Order</h4>
                      <p>Your order history remains to your account</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-4 col-xl-3">
                  <div className="process-item last-item">
                    <span className="count">04</span>
                    <div className="icon">
                      <img src="/assets/img/5.png" alt="" />
                    </div>
                    <div className="content">
                      <h4>Dispatched in 48 Hours</h4>
                      <p>Guaranteed delivery at your door step</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="mt-4 d-flex justify-content-sm-around">
              <a href="#" className="theme-btn">Upload Design<i className="fas fa-arrow-right"></i></a>
            </div> */}
          </div>
        </div>

        {/* Counter Area */}
        <div className="counter-area pt-40 pb-40">
          <div className="container">
            <div className="row g-4 justify-content-center">
              <div className="col-md-6 col-lg-4 col-xl-3">
                <div className="counter-item wow fadeInUp" data-wow-delay=".25s">
                  <div className="icon">
                    <img src="/assets/img/icon/construction.svg" alt="" />
                  </div>
                  <div className="content">
                    <div className="info">
                      <span className="counter" data-count="+" data-to="150" data-speed="3000">400</span>
                      <span className="unit">+</span>
                    </div>
                    <h6 className="title">Employees</h6>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-4 col-xl-3">
                <div className="counter-item wow fadeInDown" data-wow-delay=".25s">
                  <div className="icon">
                    <img src="/assets/img/icon/happy.svg" alt="" />
                  </div>
                  <div className="content">
                    <div className="info">
                      <span className="counter" data-count="+" data-to="25" data-speed="3000">50</span>
                      <span className="unit">+</span>
                    </div>
                    <h6 className="title">Laser Machines</h6>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-4 col-xl-3">
                <div className="counter-item wow fadeInUp" data-wow-delay=".25s">
                  <div className="icon">
                    <img src="/assets/img/icon/team-2.svg" alt="" />
                  </div>
                  <div className="content">
                    <div className="info">
                      <span className="counter" data-count="+" data-to="120" data-speed="3000">75</span>
                      <span className="unit">+</span>
                    </div>
                    <h6 className="title">Press Brakes</h6>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-4 col-xl-3">
                <div className="counter-item wow fadeInDown" data-wow-delay=".25s">
                  <div className="icon">
                    <img src="/assets/img/icon/award.svg" alt="" />
                  </div>
                  <div className="content">
                    <div className="info">
                      <span className="counter" data-count="+" data-to="50" data-speed="3000">1000</span>
                      <span className="unit">+</span>
                    </div>
                    <h6 className="title">Ton Processing capacity</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* About Area */}
        <div className="about-area py-120" id="about-area">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="about-left wow fadeInLeft" data-wow-delay=".25s">
                  <div className="about-img">
                    <img className="img-1" src="/assets/img/cutting-tool.jpg" alt="" />
                    <img className="img-2" src="/assets/img/laserrr.jpg" alt="" />
                  </div>
                  <div className="about-experience">
                    <h5>30<span>+</span></h5>
                    <p>Years Of Experience</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="about-right wow fadeInUp" data-wow-delay=".25s">
                  <div className="site-heading mb-3">
                    <h2 className="site-title">We Are The <span>Best and Expert</span> For 247CutBend</h2>
                  </div>
                  <p className="about-text">247CutBend, your trusted partner for precision cutting, bending, and metal fabrication services. With advanced technology and a commitment to quality, we provide a comprehensive range of services, including laser cutting, bending, welding, punching, and design & development, tailored to meet each client's unique requirements. Operating in major cities across India—Bangalore, Delhi NCR, Chennai, and more—we bring top-tier fabrication solutions closer to you.</p>
                  <div className="about-content">
                    <div className="row g-3">
                      <div className="col-md-12">
                        <div className="about-item border-bottom pe-2">
                          <div className="icon">
                            <img src="/assets/img/icon/team-2.svg" alt="" />
                          </div>
                          <div className="content">
                            <h6>Cutting</h6>
                            <p>We provide precise laser cutting services for intricate designs and large-scale projects, ensuring clean, accurate results every time.</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="about-item">
                          <div className="icon">
                            <img src="/assets/img/icon/material.svg" alt="" />
                          </div>
                          <div className="content">
                            <h6>Bending</h6>
                            <p>Our advanced bending services deliver exact angles and curves, shaping materials to meet complex design specifications with precision.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Service Area */}
        <div className="service-area bg py-40" id="service-area">
          <div className="container">
            <div className="row g-4 align-items-center">
              <div className="col-lg-6">
                <div className="site-heading mb-0">
                  <h2 className="site-title">Our <span>Capabilities </span></h2>
                </div>
              </div>
              <div className="col-lg-6">
                <p>
                  There are many variations of passages available but the majority have suffered alteration in
                  some form by injected humour slightly believable.
                </p>
              </div>
            </div>
            <div className="service-slider owl-carousel mt-4">
              <div className="service-item">
                <span className="count">01</span>
                <div className="service-img">
                  <img src="/assets/img/Machine1.png" alt="" />
                </div>
                <div className="service-content">
                  <h4 className="service-title">
                    <a href="#">The GN Laser Cutting Machine</a>
                  </h4>
                  <p className="service-text">
                    The GN Laser Cutting Machine (Model GN NCF3015-E, 2017) is a high-precision industrial laser cutter with 2.2KW laser power and a 3x1.5m working area, featuring Cypcut control for automation. It is widely used in automotive, aerospace, construction, metal fabrication, and electronics industries for precision cutting. Key features include high-speed cutting, minimal material waste, and an included chiller for cooling.
                  </p>
                  <a href="#" className="theme-btn">Learn More<i className="fas fa-arrow-right"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial Area */}
        <div className="testimonial-area ts-bg pt-90 pb-40">
          <div className="container">
            <div className="row">
              <div className="col-lg-4">
                <div className="site-heading wow fadeInDown" data-wow-delay=".25s">
                  <h2 className="site-title text-white">What Our Client <span>Say's</span> about us</h2>
                  <p className="text-white">
                    It is a long established fact that a reader will be distracted by the readable content
                    of a page when Internet tend to repeat predefined chunks.
                  </p>
                  <a href="#" className="theme-btn mt-30">Know More <i className="fas fa-arrow-right"></i></a>
                </div>
              </div>
              <div className="col-lg-8">
                <div className="testimonial-slider owl-carousel owl-theme wow fadeInUp" data-wow-delay=".25s">
                  <div className="testimonial-item">
                    <div className="testimonial-content">
                      <div className="testimonial-author-img">
                        <img src="/assets/img/testimonial/NoPhofile.png" alt="" />
                      </div>
                      <div className="testimonial-author-info">
                        <h4>Niesha Phips</h4>
                        <p>Customer</p>
                        <div className="testimonial-rate">
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                        </div>
                      </div>
                    </div>
                    <div className="testimonial-quote">
                      <div className="testimonial-quote-icon">
                        <img src="/assets/img/icon/quote.svg" alt="" />
                      </div>
                      <p>
                        There are many variations passage available the majority have suffered of alteration in some form by the injected humour or randomised words which look even slightly believable.
                      </p>
                    </div>
                  </div>
                  <div className="testimonial-item">
                    <div className="testimonial-content">
                      <div className="testimonial-author-img">
                        <img src="/assets/img/testimonial/NoPhofile.png" alt="" />
                      </div>
                      <div className="testimonial-author-info">
                        <h4>Daniel Porter</h4>
                        <p>Customer</p>
                        <div className="testimonial-rate">
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                        </div>
                      </div>
                    </div>
                    <div className="testimonial-quote">
                      <div className="testimonial-quote-icon">
                        <img src="/assets/img/icon/quote.svg" alt="" />
                      </div>
                      <p>
                        There are many variations passage available the majority have suffered of alteration in some form by the injected humour or randomised words which look even slightly believable.
                      </p>
                    </div>
                  </div>
                  <div className="testimonial-item">
                    <div className="testimonial-content">
                      <div className="testimonial-author-img">
                        <img src="/assets/img/testimonial/NoPhofile.png" alt="" />
                      </div>
                      <div className="testimonial-author-info">
                        <h4>Ebony Swihart</h4>
                        <p>Customer</p>
                        <div className="testimonial-rate">
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                        </div>
                      </div>
                    </div>
                    <div className="testimonial-quote">
                      <div className="testimonial-quote-icon">
                        <img src="/assets/img/icon/quote.svg" alt="" />
                      </div>
                      <p>
                        There are many variations passage available the majority have suffered of alteration in some form by the injected humour or randomised words which look even slightly believable.
                      </p>
                    </div>
                  </div>
                  <div className="testimonial-item">
                    <div className="testimonial-content">
                      <div className="testimonial-author-img">
                        <img src="/assets/img/testimonial/NoPhofile.png" alt="" />
                      </div>
                      <div className="testimonial-author-info">
                        <h4>Loreta Jones</h4>
                        <p>Customer</p>
                        <div className="testimonial-rate">
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                        </div>
                      </div>
                    </div>
                    <div className="testimonial-quote">
                      <div className="testimonial-quote-icon">
                        <img src="/assets/img/icon/quote.svg" alt="" />
                      </div>
                      <p>
                        There are many variations passage available the majority have suffered of alteration in some form by the injected humour or randomised words which look even slightly believable.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Choose Area */}
        <div className="choose-area bg py-20">
          <div className="container">
            <div className="row g-4 align-items-center justify-content-between">
              <div className="col-lg-6">
                <div className="site-heading mb-0">
                  <h2 className="site-title text-center">Why <span>Choose</span> 247Cutbend?</h2>
                </div>
                <p className="text-center mt-4"><b>1200+</b> Ton per Month of Laser cutting capacity</p>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 d-flex justify-content-center flex-column align-items-center">
                <div className="choose-content wow fadeInUp" data-wow-delay=".25s">
                  <div className="choose-content-wrap">
                    <div className="choose-item">
                      <div className="choose-item-icon">
                        <img src="/assets/img/icon/money.svg" alt="" />
                      </div>
                      <div className="choose-item-info">
                        <h4> Save Time, Get Instant Estimates</h4>
                        <p>No more waiting for quotes—get your estimates in minutes, not days.</p>
                      </div>
                    </div>
                    <div className="choose-item">
                      <div className="choose-item-icon">
                        <img src="/assets/img/icon/team.svg" alt="" />
                      </div>
                      <div className="choose-item-info">
                        <h4>Skip the Hassle of Material Management</h4>
                        <p>Forget sourcing, loading, unloading, and outsourcing. We handle it all for you.</p>
                      </div>
                    </div>
                    <div className="choose-item">
                      <div className="choose-item-icon">
                        <img src="/assets/img/icon/certified.svg" alt="" />
                      </div>
                      <div className="choose-item-info">
                        <h4>Consolidate Your Vendors</h4>
                        <p>Why deal with multiple suppliers for your cutting and bending needs? With us, one partner does it all.</p>
                      </div>
                    </div>
                    <div className="choose-item">
                      <div className="choose-item-icon">
                        <img src="/assets/img/icon/certified.svg" alt="" />
                      </div>
                      <div className="choose-item-info">
                        <h4>Unmatched Capacity and Precision</h4>
                        <p>With 15 state-of-the-art laser cutting machines and 9 advanced press brakes, paired with a large selection of tools, we ensure your projects are completed with speed, precision, and quality.</p>
                      </div>
                    </div>
                    <div className="choose-item">
                      <div className="choose-item-icon">
                        <img src="/assets/img/icon/certified.svg" alt="" />
                      </div>
                      <div className="choose-item-info">
                        <h4>247Cutbend</h4>
                        <p>Your trusted, one-stop solution for all laser cutting and bending needs. Let's simplify your workflow!.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="choose-img">
                  <img src="/assets/img/cutting-tool.jpg" alt="" />
                </div>
              </div>
              <div className="col-lg-12 mt-3 text-center">
                <p>You have purchased <b>@ Rs. 53/kg material + Loading charges + Transport + You nest it + You added Transportation + Again loaded
                  !!!!!</b></p>
                <p>Turnout price - <b>Rs. 62 / Kg</b></p>
              </div>
            </div>
          </div>
        </div>

        {/* Quote Area */}
        <div className="quote-area" style={{backgroundImage: 'url(/assets/img/1.jpg)'}} id="quote-area">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 ms-auto">
                <div className="quote-content">
                  <div className="quote-head">
                    <h3 className='font-extrabold text-2xl  Poppins sans-serif'>Request A Quote</h3>
                    <p>It is a long established fact that a reader will be distracted by the
                      readable content of majority have suffered alteration page when looking at its layout.</p>
                  </div>
                  <div className="quote-form">
                    <form action="#">
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="form-group">
                            <div className="form-icon">
                              <i className="far fa-user-tie"></i>
                              <input type="text" className="form-control" placeholder="Your Name" />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <div className="form-icon">
                              <i className="far fa-envelope"></i>
                              <input type="email" className="form-control" placeholder="Your Email" />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <div className="form-icon">
                              <i className="far fa-phone"></i>
                              <input type="text" className="form-control" placeholder="Your Phone" />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <div className="form-check">
                              <input className="form-check-input" type="checkbox" value="" id="flexCheckDefaultCutting" />
                              <label className="form-check-label" htmlFor="flexCheckDefaultCutting"> Cutting </label>
                            </div>
                            <div className="form-check">
                              <input className="form-check-input" type="checkbox" value="" id="flexCheckDefaultCutting&Bending" />
                              <label className="form-check-label" htmlFor="flexCheckDefaultCutting&Bending"> Cutting & Bending </label>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="form-group">
                            <div className="form-icon">
                              <i className="far fa-comment-lines"></i>
                              <textarea className="form-control" cols="30" rows="4" placeholder="Your Message"></textarea>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <button type="submit" className="theme-btn">Register Now<i className="fas fa-arrow-right"></i></button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Area */}
        <div className="faq-area py-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="faq-content wow fadeInUp" data-wow-delay=".25s">
                  <div className="site-heading mb-3">
                    <h2 className="site-title my-3">General <span>frequently</span> asked questions</h2>
                  </div>
                  <p className="mb-3">There are many variations of passages of Lorem Ipsum available,
                    but the majority have suffered alteration in some form, by injected humour, or
                    randomised words which don't look even.</p>
                  <p className="mb-4">
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
                    totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta
                    sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.
                  </p>
                  <a href="#" className="theme-btn mt-2">Have Any Question ?</a>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="accordion wow fadeInRight" data-wow-delay=".25s" id="accordionExample">
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                      <button className="accordion-button" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        <span><i className="far fa-question"></i></span> How Long Does A Service Take ?
                      </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse show"
                      aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        We denounce with righteous indignation and dislike men who
                        are so beguiled and demoralized by the charms of pleasure of the moment so
                        blinded by desire ante odio dignissim quam vitae pulvinar turpis.
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingTwo">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                        <span><i className="far fa-question"></i></span> How Can I Become A Member ?
                      </button>
                    </h2>
                    <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo"
                      data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        We denounce with righteous indignation and dislike men who
                        are so beguiled and demoralized by the charms of pleasure of the moment so
                        blinded by desire ante odio dignissim quam vitae pulvinar turpis.
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingThree">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseThree" aria-expanded="false"
                        aria-controls="collapseThree">
                        <span><i className="far fa-question"></i></span> What Payment Gateway You Support ?
                      </button>
                    </h2>
                    <div id="collapseThree" className="accordion-collapse collapse"
                      aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        We denounce with righteous indignation and dislike men who
                        are so beguiled and demoralized by the charms of pleasure of the moment so
                        blinded by desire ante odio dignissim quam vitae pulvinar turpis.
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingFour">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseFour" aria-expanded="false"
                        aria-controls="collapseFour">
                        <span><i className="far fa-question"></i></span> How Can I Cancel My Request ?
                      </button>
                    </h2>
                    <div id="collapseFour" className="accordion-collapse collapse"
                      aria-labelledby="headingFour" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        We denounce with righteous indignation and dislike men who
                        are so beguiled and demoralized by the charms of pleasure of the moment so
                        blinded by desire ante odio dignissim quam vitae pulvinar turpis.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Area */}
        <div className="blog-area py-100 bg">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 mx-auto">
                <div className="site-heading text-center wow fadeInDown" data-wow-delay=".25s">
                  <h2 className="site-title">Our Latest News & <span>Blog</span></h2>
                  <div className="heading-divider"></div>
                </div>
              </div>
            </div>
            <div className="row g-4">
              <div className="col-md-6 col-lg-4">
                <div className="blog-item wow fadeInUp" data-wow-delay=".25s">
                  <div className="blog-item-img">
                    <img src="/assets/img/cnc-cut.jpg" alt="Thumb" />
                    <div className="blog-date">
                      <strong>20</strong>
                      <span>Nov</span>
                    </div>
                  </div>
                  <div className="blog-item-info">
                    <div className="blog-item-meta">
                      <ul>
                        <li><a href="#"><i className="far fa-user-circle"></i> By Alicia Davis</a></li>
                        <li><a href="#"><i className="far fa-comments"></i> 2.5k Comments</a></li>
                      </ul>
                    </div>
                    <h4 className="blog-title">
                      <a href="#">There are many variations of passages orem available.</a>
                    </h4>
                    <p>
                      It is a long established fact that a reader will majority have suffered distracted readable.
                    </p>
                    <a className="theme-btn" href="#">Read More<i className="fas fa-arrow-right"></i></a>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className="blog-item wow fadeInDown" data-wow-delay=".25s">
                  <div className="blog-item-img">
                    <img src="/assets/img/cutting.jpg" alt="Thumb" />
                    <div className="blog-date">
                      <strong>25</strong>
                      <span>Nov</span>
                    </div>
                  </div>
                  <div className="blog-item-info">
                    <div className="blog-item-meta">
                      <ul>
                        <li><a href="#"><i className="far fa-user-circle"></i> By Alicia Davis</a></li>
                        <li><a href="#"><i className="far fa-comments"></i> 1.2k Comments</a></li>
                      </ul>
                    </div>
                    <h4 className="blog-title">
                      <a href="#">Generator internet repeat tend word chunk  necessary.</a>
                    </h4>
                    <p>
                      It is a long established fact that a reader will majority have suffered distracted readable.
                    </p>
                    <a className="theme-btn" href="#">Read More<i className="fas fa-arrow-right"></i></a>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className="blog-item wow fadeInUp" data-wow-delay=".25s">
                  <div className="blog-item-img">
                    <img src="/assets/img/cnc-cut.jpg" alt="Thumb" />
                    <div className="blog-date">
                      <strong>28</strong>
                      <span>Nov</span>
                    </div>
                  </div>
                  <div className="blog-item-info">
                    <div className="blog-item-meta">
                      <ul>
                        <li><a href="#"><i className="far fa-user-circle"></i> By Alicia Davis</a></li>
                        <li><a href="#"><i className="far fa-comments"></i> 2.8k Comments</a></li>
                      </ul>
                    </div>
                    <h4 className="blog-title">
                      <a href="#">Survived only five centuries but also the leap into.</a>
                    </h4>
                    <p>
                      It is a long established fact that a reader will majority have suffered distracted readable.
                    </p>
                    <a className="theme-btn" href="#">Read More<i className="fas fa-arrow-right"></i></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Area */}
      <footer className="footer-area">
        <div className="footer-shape" style={{backgroundImage: 'url(/assets/img/shape/01.png)'}}></div>
        <div className="footer-widget">
          <div className="container">
            <div className="footer-widget-wrap pt-100 pb-80">
              <div className="row g-4">
                <div className="col-lg-5">
                  <div className="footer-widget-box about-us">
                    <a href="#" className="footer-logo">
                      <img src="/assets/img/Cutbend_Footer_LOGO.png" alt="" />
                    </a>
                    <p className="mb-4">
                      247CutBend, your trusted partner for precision cutting, bending, and metal fabrication services. With advanced technology and a commitment to quality,
                    </p>
                    <div className="footer-newsletter">
                      <h6>Subscribe Our Newsletter</h6>
                      <div className="newsletter-form">
                        <form action="#">
                          <div className="form-group">
                            <div className="form-icon">
                              <i className="far fa-envelopes"></i>
                              <input type="email" className="form-control" placeholder="Your Email" />
                              <button className="theme-btn" type="submit">
                                Subscribe <span className="far fa-paper-plane"></span>
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-6 col-lg-3">
                  <div className="footer-widget-box list">
                    <h4 className="footer-widget-title">Quick Link</h4>
                    <ul className="footer-list">
                      <li><a href="#"><i className="far fa-angle-double-right"></i>About Us</a></li>
                      <li><a href="#"><i className="far fa-angle-double-right"></i>Blogs </a></li>
                      <li><a href="#"><i className="far fa-angle-double-right"></i>Faqs</a></li>
                      <li><a href="#"><i className="far fa-angle-double-right"></i>Terms & Conditions</a></li>
                      <li><a href="#"><i className="far fa-angle-double-right"></i>Privacy Policy</a></li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="footer-widget-box">
                    <h4 className="footer-widget-title">Get In Touch</h4>
                    <ul className="footer-contact">
                      <li>
                        <div className="icon">
                          <i className="far fa-location-dot"></i>
                        </div>
                        <div className="content">
                          <h6>Our Address</h6>
                          <p>578-587 Savli GIDC Rd, Vadodara, Manjusar, Gujarat 391770, India</p>
                        </div>
                      </li>
                      <li>
                        <div className="icon">
                          <i className="far fa-phone"></i>
                        </div>
                        <div className="content">
                          <h6>Call Us</h6>
                          <a href="tel:+91 95120 41116">+91 95120 41116</a>
                        </div>
                      </li>
                      <li>
                        <div className="icon">
                          <i className="far fa-envelope"></i>
                        </div>
                        <div className="content">
                          <h6>Mail Us</h6>
                          <a href="mailto:jobshop@247cutbend.in"><span className="__cf_email__">jobshop@247cutbend.in</span></a>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="copyright">
            <div className="row">
              <div className="col-md-6 align-self-center">
                <p className="copyright-text">
                  &copy; Copyright <span id="date"></span> <a href="#"> Cutbend </a> All Rights Reserved.
                </p>
              </div>
              <div className="col-md-6 align-self-center">
                <ul className="footer-social">
                  <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                  <li><a href="#"><i className="fab fa-x-twitter"></i></a></li>
                  <li><a href="#"><i className="fab fa-linkedin-in"></i></a></li>
                  <li><a href="#"><i className="fab fa-youtube"></i></a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <a href="https://api.whatsapp.com/send?phone=919512041116" className="whatsapp-btn" target="_blank" rel="noopener noreferrer">
        <span><i className="fab fa-whatsapp" aria-hidden="true"></i></span>
      </a>

      {/* Scroll Top */}
      <a href="#top" id="scroll-top"><i className="far fa-arrow-up"></i></a>
    </div>
  );
}

export default Home;
 