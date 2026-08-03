/**
 * URBAN PULSE - FESTIVAL INTERACTIVE ENGINE
 * Member 2 Responsibility
 * jQuery Interactivity, Stage Animations, Dynamic Artist Loader, Map Pins
 */

$(document).ready(function () {
  'use strict';

  /* 1. Artist Database */
  const artistData = {
    'the-synthetix': {
      name: 'The Synthetix',
      time: '18:00 - 19:30',
      stage: 'Pulse Main Stage',
      genre: 'Synthwave / Electronic',
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80',
      bio: 'Pioneers of analog retro-futurism blending analog synthesizers with live acoustic drums.',
      fact: 'Constructed their synth rig from modified 1980s telephone exchanges.',
      tickets: 'High Demand (80% Sold)'
    },
    'lunar-echoes': {
      name: 'Lunar Echoes',
      time: '20:00 - 21:30',
      stage: 'Pulse Main Stage',
      genre: 'Indie Rock / Ambient',
      image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80',
      bio: 'Atmospheric four-piece band known for ethereal guitar reverb and celestial light projections.',
      fact: 'Recorded their latest studio album inside a disused cathedral.',
      tickets: 'Available'
    },
    'cyber-pulse': {
      name: 'Cyber Pulse Headliner',
      time: '22:00 - 23:30',
      stage: 'Pulse Main Stage',
      genre: 'Cyberpunk / EDM',
      image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=600&q=80',
      bio: 'High-energy headliner delivering massive bass drops, laser choreographies, and live vocals.',
      fact: 'Uses real-time brainwave sensors to alter concert lighting colors.',
      tickets: 'Selling Fast'
    },
    'maya-sol': {
      name: 'Maya Sol',
      time: '17:00 - 18:15',
      stage: 'Solar Acoustic Grove',
      genre: 'Acoustic / Neo-Soul',
      image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=600&q=80',
      bio: 'Soul-stirring vocalist and classical guitarist creating intimate acoustic melodies.',
      fact: 'Performed live in over 30 countries as a street busker before signing a record deal.',
      tickets: 'Available'
    },
    'groove-bohemian': {
      name: 'Groove Bohemian',
      time: '19:00 - 20:30',
      stage: 'Solar Acoustic Grove',
      genre: 'Folk Fusion',
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80',
      bio: 'Energetic collective blending brass, accordion, and acoustic percussion.',
      fact: 'All instruments are crafted from recycled urban timber.',
      tickets: 'Limited Seats'
    }
  };

  /* 2. Timeslot Interaction (jQuery Slide/Fade Panel) */
  $('.timeslot-btn').on('click', function () {
    const artistKey = $(this).attr('data-artist');
    const data = artistData[artistKey];

    if (!data) return;

    // Highlight active slot
    $('.timeslot-btn').removeClass('active');
    $(this).addClass('active');

    // jQuery Slide & Fade Transitions
    $('#default-panel-notice').slideUp(300);
    
    $('#artist-detail-panel').fadeOut(200, function () {
      $('#artist-img').attr('src', data.image).attr('alt', data.name);
      $('#artist-genre-badge').text(data.genre);
      $('#artist-name').text(data.name);
      $('#artist-time').text(data.time);
      $('#artist-stage').text(data.stage);
      $('#artist-bio').text(data.bio);
      $('#artist-fact').text(data.fact);
      $('#artist-tickets').text(data.tickets);

      $(this).removeClass('hidden').fadeIn(300);
    });
  });

  /* 3. Interactive Map Pins */
  $('.map-pin').on('click', function () {
    const title = $(this).attr('data-location');
    const desc = $(this).attr('data-desc');

    $('#map-info-box').slideUp(150, function () {
      $('#map-location-title').text(title);
      $('#map-location-desc').text(desc);
      $(this).removeClass('hidden').slideDown(250);
    });
  });

  /* 4. Festival Countdown Timer */
  function updateTimer() {
    const targetDate = new Date('August 14, 2026 12:00:00 BST').getTime();
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      $('#timer-days').text(days < 10 ? '0' + days : days);
      $('#timer-hours').text(hours < 10 ? '0' + hours : hours);
      $('#timer-mins').text(minutes < 10 ? '0' + minutes : minutes);
      $('#timer-secs').text(seconds < 10 ? '0' + seconds : seconds);
    }
  }

  if ($('#festival-timer').length) {
    setInterval(updateTimer, 1000);
    updateTimer();
  }
});