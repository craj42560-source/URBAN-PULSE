/**
 * URBAN PULSE - MAIN JAVASCRIPT
 * Member 1 & 4 Responsibility
 * General UI Logic, Theme Toggle, Sticky Nav, Back to Top, Animated Counter
 */

$(document).ready(function () {
  'use strict';

  /* 1. Mobile Menu Toggle */
  $('.mobile-toggle').on('click', function () {
    const isExpanded = $(this).attr('aria-expanded') === 'true';
    $(this).attr('aria-expanded', !isExpanded);
    $('#primary-navigation').toggleClass('active');
  });

  /* 2. Theme Toggle (Dark/Light Mode) */
  $('#theme-toggle').on('click', function () {
    const currentTheme = $('body').attr('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    $('body').attr('data-theme', newTheme);
    $(this).find('.theme-icon').text(newTheme === 'dark' ? '☀️' : '🌙');
    
    // Save preference to localStorage
    localStorage.setItem('pulse_theme', newTheme);
  });

  // Load saved theme
  const savedTheme = localStorage.getItem('pulse_theme');
  if (savedTheme) {
    $('body').attr('data-theme', savedTheme);
    $('#theme-toggle .theme-icon').text(savedTheme === 'dark' ? '☀️' : '🌙');
  }

  /* 3. Back To Top Button */
  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 300) {
      $('#back-to-top').addClass('visible');
    } else {
      $('#back-to-top').removeClass('visible');
    }
  });

  $('#back-to-top').on('click', function () {
    $('html, body').animate({ scrollTop: 0 }, 500);
  });

  /* 4. Animated Counters (Hero Section) */
  function animateCounters() {
    $('.stat-number').each(function () {
      const $this = $(this);
      const countTo = parseInt($this.attr('data-count'), 10);
      
      $({ countNum: 0 }).animate({ countNum: countTo }, {
        duration: 2000,
        easing: 'swing',
        step: function () {
          $this.text(Math.floor(this.countNum));
        },
        complete: function () {
          $this.text(this.countNum);
        }
      });
    });
  }

  if ($('.stat-number').length) {
    animateCounters();
  }

  /* 5. Live Search & Filter on Discover Page */
  $('#event-search, #category-filter').on('input change', function () {
    const query = $('#event-search').val().toLowerCase().trim();
    const category = $('#category-filter').val();
    let visibleCount = 0;

    $('.event-card').each(function () {
      const cardCategory = $(this).attr('data-category');
      const cardTitle = $(this).attr('data-title').toLowerCase();

      const matchesCat = (category === 'all' || cardCategory === category);
      const matchesSearch = (cardTitle.indexOf(query) !== -1);

      if (matchesCat && matchesSearch) {
        $(this).fadeIn(300);
        visibleCount++;
      } else {
        $(this).fadeOut(200);
      }
    });

    if (visibleCount === 0) {
      $('#no-results').removeClass('hidden');
    } else {
      $('#no-results').addClass('hidden');
    }
  });
});