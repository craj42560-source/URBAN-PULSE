/**
 * URBAN PULSE - CLIENT-SIDE SESSION STORAGE MODULE
 * Member 3 & 4 Responsibility
 * Saves, renders, and resets Session Storage data for active ticket reservations
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'pulse_active_reservation';

  window.PulseStorage = {
    saveReservation: function (data) {
      try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        this.renderStoredData();
      } catch (e) {
        console.error('SessionStorage error:', e);
      }
    },

    getReservation: function () {
      try {
        const data = sessionStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : null;
      } catch (e) {
        return null;
      }
    },

    clearReservation: function () {
      try {
        sessionStorage.removeItem(STORAGE_KEY);
        this.renderStoredData();
      } catch (e) {
        console.error('SessionStorage clear error:', e);
      }
    },

    renderStoredData: function () {
      const data = this.getReservation();
      const $box = $('#stored-reservation-box');
      const $container = $('#stored-details');

      if (data && $box.length) {
        $container.html(`
          <p><strong>Customer:</strong> ${data.customer}</p>
          <p><strong>Event:</strong> ${data.event}</p>
          <p><strong>Quantity:</strong> ${data.quantity} ticket(s)</p>
          <p><strong>Total Paid:</strong> £${data.total}</p>
          <p class="small-text">Saved at ${data.timestamp}</p>
        `);
        $box.removeClass('hidden');
      } else if ($box.length) {
        $box.addClass('hidden');
      }
    }
  };

  $(document).ready(function () {
    window.PulseStorage.renderStoredData();

    $('#clear-storage-btn').on('click', function () {
      window.PulseStorage.clearReservation();
      alert('Active reservation cleared from Session Storage.');
    });
  });
})();