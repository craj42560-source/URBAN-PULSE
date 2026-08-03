/**
 * URBAN PULSE - BOOKING FORM & DYNAMIC PRICING ENGINE
 * Member 3 Responsibility
 * Validation, Regex, Real-time Pricing, Promo Codes, Session Storage Integration
 */

$(document).ready(function () {
  'use strict';

  // Dynamic state values
  let currentDiscountPercent = 0;

  /* 1. Real-time Calculation Engine */
  function calculateTotal() {
    const selectedEvent = $('#event-select').val() || 'None selected';
    const ticketOption = $('#ticket-type option:selected');
    const basePrice = parseFloat(ticketOption.attr('data-price')) || 35;
    const qty = parseInt($('#quantity').val(), 10) || 1;
    const isVipLounge = $('#vip-lounge').is(':checked');

    const loungeAddonPrice = isVipLounge ? 25 : 0;
    const subtotal = (basePrice + loungeAddonPrice) * qty;
    const discountAmount = subtotal * (currentDiscountPercent / 100);
    const finalTotal = subtotal - discountAmount;

    // DOM Updates
    $('#summary-event').text(selectedEvent);
    $('#summary-tier').text(ticketOption.text());
    $('#summary-base').text('£' + basePrice.toFixed(2));
    $('#summary-qty').text(qty);
    $('#summary-addon').text('£' + (loungeAddonPrice * qty).toFixed(2));
    $('#summary-discount').text('-£' + discountAmount.toFixed(2));
    $('#summary-total').text('£' + finalTotal.toFixed(2));

    return {
      event: selectedEvent,
      tier: ticketOption.text(),
      quantity: qty,
      totalPrice: finalTotal.toFixed(2)
    };
  }

  /* Listeners for live price update */
  $('#event-select, #ticket-type, #quantity, #vip-lounge').on('change input', function () {
    calculateTotal();
  });

  /* 2. Promo Code Engine */
  $('#apply-promo-btn').on('click', function () {
    const code = $('#promo-code').val().trim().toUpperCase();
    $('#err-promo-code').text('');
    $('#succ-promo-code').text('');

    if (code === 'URBAN10') {
      currentDiscountPercent = 10;
      $('#succ-promo-code').text('10% Discount Applied!');
    } else if (code === 'SAVE20') {
      currentDiscountPercent = 20;
      $('#succ-promo-code').text('20% Discount Applied!');
    } else if (code === 'VIP15') {
      currentDiscountPercent = 15;
      $('#succ-promo-code').text('15% Discount Applied!');
    } else if (code === '') {
      currentDiscountPercent = 0;
      $('#err-promo-code').text('Please enter a code.');
    } else {
      currentDiscountPercent = 0;
      $('#err-promo-code').text('Invalid Promo Code.');
    }

    calculateTotal();
  });

  /* 3. Form Validation with Regex */
  function validateForm() {
    let isValid = true;
    $('.error-msg').text('');

    const fullName = $('#full-name').val().trim();
    const email = $('#email').val().trim();
    const phone = $('#phone').val().trim();
    const eventSelect = $('#event-select').val();
    const quantity = parseInt($('#quantity').val(), 10);
    const termsCheck = $('#terms-check').is(':checked');

    // Name Validation
    if (fullName.length < 3) {
      $('#err-full-name').text('Full name must be at least 3 characters.');
      isValid = false;
    }

    // Email Regex Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      $('#err-email').text('Please enter a valid email address.');
      isValid = false;
    }

    // Phone Regex Validation (UK / General International)
    const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
    if (!phoneRegex.test(phone)) {
      $('#err-phone').text('Please enter a valid phone number.');
      isValid = false;
    }

    // Event Selection
    if (!eventSelect) {
      $('#err-event-select').text('Please select an event.');
      isValid = false;
    }

    // Quantity Range
    if (isNaN(quantity) || quantity < 1 || quantity > 10) {
      $('#err-quantity').text('Quantity must be between 1 and 10.');
      isValid = false;
    }

    // Terms Checkbox
    if (!termsCheck) {
      $('#err-terms-check').text('You must accept the terms.');
      isValid = false;
    }

    return isValid;
  }

  /* 4. Submission Handler */
  $('#ticket-booking-form').on('submit', function (e) {
    e.preventDefault();

    if (validateForm()) {
      const currentBooking = calculateTotal();
      const customerName = $('#full-name').val().trim();

      const reservationPayload = {
        customer: customerName,
        email: $('#email').val().trim(),
        event: currentBooking.event,
        tier: currentBooking.tier,
        quantity: currentBooking.quantity,
        total: currentBooking.totalPrice,
        timestamp: new Date().toLocaleTimeString()
      };

      // Save to Session Storage using storage module
      if (window.PulseStorage) {
        window.PulseStorage.saveReservation(reservationPayload);
      }

      alert('🎉 Reservation Confirmed! Details saved to Session Storage.');
    }
  });

  // URL Query Pre-selection
  const urlParams = new URLSearchParams(window.location.search);
  const preSelectedEvent = urlParams.get('event');
  if (preSelectedEvent) {
    $('#event-select option').each(function () {
      if ($(this).val().toLowerCase().includes(preSelectedEvent.toLowerCase())) {
        $(this).prop('selected', true);
      }
    });
  }

  calculateTotal();
});