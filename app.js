/**
 * NOVA ESTATES - Main Application Script
 * 
 * Handles property filtering, search, sorting, mobile drawer,
 * contact form validation, WhatsApp link generation, and modals.
 */

(function () {
  'use strict';

  // Helper DOM selector
  const $ = (id) => document.getElementById(id);
  const $$ = (sel) => document.querySelectorAll(sel);

  // Active filters state
  const filterState = {
    query: '',
    type: '',
    loc: '',
    budget: '',
    status: '',
    sort: 'featured'
  };

  /**
   * Initialize on DOM Content Loaded
   */
  document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initQuickSearch();
    initFilters();
    initContactForm();
    initModals();
    initWhatsAppButtons();
    renderProperties();
    populateInterestDropdown();
  });

  /* ==========================================================================
     1. Navigation & Mobile Drawer
     ========================================================================== */
  function initNavigation() {
    const mobileToggle = $('mobileNavToggle');
    const mobileDrawer = $('mobileDrawer');
    const drawerBackdrop = $('drawerBackdrop');
    const drawerClose = $('drawerClose');
    const drawerLinks = $$('.mobile-nav-link');

    function openDrawer() {
      if (mobileDrawer) mobileDrawer.classList.add('open');
      if (drawerBackdrop) drawerBackdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
      if (mobileDrawer) mobileDrawer.classList.remove('open');
      if (drawerBackdrop) drawerBackdrop.classList.remove('active');
      document.body.style.overflow = '';
    }

    if (mobileToggle) mobileToggle.addEventListener('click', openDrawer);
    if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
    if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);

    drawerLinks.forEach(link => {
      link.addEventListener('click', closeDrawer);
    });

    // Update active nav link on scroll
    window.addEventListener('scroll', () => {
      const sections = ['home', 'properties', 'projects', 'about', 'contact'];
      const scrollPos = window.scrollY + 120;

      sections.forEach(secId => {
        const sec = $(secId);
        const navLink = document.querySelector(`.desktop-nav a[href="#${secId}"]`);
        if (sec && navLink) {
          const top = sec.offsetTop;
          const height = sec.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            $$('.desktop-nav .nav-link').forEach(l => l.classList.remove('active'));
            navLink.classList.add('active');
          }
        }
      });
    });
  }

  /* ==========================================================================
     2. Quick Search Component (Hero)
     ========================================================================== */
  function initQuickSearch() {
    const quickTabs = $$('.search-tab-btn');
    quickTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        quickTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const selectedType = tab.getAttribute('data-type') || '';
        const quickTypeSelect = $('quickType');
        if (quickTypeSelect) quickTypeSelect.value = selectedType;
      });
    });
  }

  window.applyQuick = function () {
    const quickType = $('quickType') ? $('quickType').value : '';
    const quickLoc = $('quickLoc') ? $('quickLoc').value : '';
    const quickBudget = $('quickBudget') ? $('quickBudget').value : '';

    filterState.type = quickType;
    filterState.loc = quickLoc;
    filterState.budget = quickBudget;

    // Sync main filter inputs if present
    if ($('type')) $('type').value = quickType;
    if ($('loc')) $('loc').value = quickLoc;
    if ($('budget')) $('budget').value = quickBudget;

    renderProperties();

    const propSec = $('properties');
    if (propSec) {
      propSec.scrollIntoView({ behavior: 'smooth' });
    }
  };

  /* ==========================================================================
     3. Property Search, Filter & Sorting Logic
     ========================================================================== */
  function initFilters() {
    const filterInputs = [
      { id: 'q', prop: 'query', event: 'input' },
      { id: 'type', prop: 'type', event: 'change' },
      { id: 'loc', prop: 'loc', event: 'change' },
      { id: 'budget', prop: 'budget', event: 'change' },
      { id: 'status', prop: 'status', event: 'change' },
      { id: 'sort', prop: 'sort', event: 'change' }
    ];

    filterInputs.forEach(({ id, prop, event }) => {
      const el = $(id);
      if (el) {
        el.addEventListener(event, (e) => {
          filterState[prop] = e.target.value.trim();
          renderProperties();
        });
      }
    });

    const clearBtn = $('clearFiltersBtn');
    if (clearBtn) {
      clearBtn.addEventListener('click', resetAllFilters);
    }
  }

  function resetAllFilters() {
    filterState.query = '';
    filterState.type = '';
    filterState.loc = '';
    filterState.budget = '';
    filterState.status = '';
    filterState.sort = 'featured';

    // Reset controls
    if ($('q')) $('q').value = '';
    if ($('type')) $('type').value = '';
    if ($('loc')) $('loc').value = '';
    if ($('budget')) $('budget').value = '';
    if ($('status')) $('status').value = '';
    if ($('sort')) $('sort').value = 'featured';
    if ($('quickType')) $('quickType').value = '';
    if ($('quickLoc')) $('quickLoc').value = '';
    if ($('quickBudget')) $('quickBudget').value = '';

    $$('.search-tab-btn').forEach(t => {
      if (t.getAttribute('data-type') === '') t.classList.add('active');
      else t.classList.remove('active');
    });

    renderProperties();
    showToast('Filters have been cleared.');
  }
  window.resetAllFilters = resetAllFilters;

  function renderProperties() {
    const cardsContainer = $('cards');
    const emptyState = $('empty');
    const resultsCountEl = $('resultsCount');
    const activeChipsContainer = $('activeChips');

    if (!cardsContainer) return;

    // Fetch up-to-date properties from NovaStore
    const allProperties = window.NovaStore ? window.NovaStore.getProperties() : [];

    // Filter properties
    let filtered = allProperties.filter(p => {
      // 1. Text Query (Search in title, locality, refCode, description)
      if (filterState.query) {
        const q = filterState.query.toLowerCase();
        const searchPool = `${p.name} ${p.loc} ${p.refCode || ''} ${p.type} ${p.description || ''}`.toLowerCase();
        if (!searchPool.includes(q)) return false;
      }

      // 2. Type Filter
      if (filterState.type && p.type.toLowerCase() !== filterState.type.toLowerCase()) {
        return false;
      }

      // 3. Location Filter
      if (filterState.loc && p.loc.toLowerCase() !== filterState.loc.toLowerCase()) {
        return false;
      }

      // 4. Status Filter
      if (filterState.status && p.status.toLowerCase() !== filterState.status.toLowerCase()) {
        return false;
      }

      // 5. Budget Filter
      if (filterState.budget) {
        const price = Number(p.price) || 0;
        if (filterState.budget === 'under25' && price > 2500000) return false;
        if (filterState.budget === '25to50' && (price < 2500000 || price > 5000000)) return false;
        if (filterState.budget === '50to100' && (price < 5000000 || price > 10000000)) return false;
        if (filterState.budget === 'above100' && price < 10000000) return false;
      }

      return true;
    });

    // Sort properties
    if (filterState.sort === 'low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (filterState.sort === 'high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (filterState.sort === 'area-low') {
      filtered.sort((a, b) => (a.areaSqFt || 0) - (b.areaSqFt || 0));
    } else if (filterState.sort === 'area-high') {
      filtered.sort((a, b) => (b.areaSqFt || 0) - (a.areaSqFt || 0));
    } else {
      // 'featured': featured first, then by id descending
      filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || b.id - a.id);
    }

    // Render results counter
    if (resultsCountEl) {
      resultsCountEl.textContent = `Showing ${filtered.length} of ${allProperties.length} properties`;
    }

    // Render active filter chips
    renderActiveFilterChips(activeChipsContainer);

    // Empty state management
    if (filtered.length === 0) {
      cardsContainer.innerHTML = '';
      if (emptyState) emptyState.hidden = false;
      return;
    }

    if (emptyState) emptyState.hidden = true;

    // Render Property Cards
    cardsContainer.innerHTML = filtered.map(p => {
      const typeBadgeClass = p.type === 'Plot' ? 'badge-plot' : p.type === 'Villa' ? 'badge-villa' : 'badge-apartment';
      const statusBadgeClass = p.status === 'Available' ? 'badge-status-available' : p.status === 'Under Offer' ? 'badge-status-under-offer' : 'badge-status-sold';
      
      const whatsappUrl = window.NovaStore ? window.NovaStore.getPropertyWhatsAppUrl(p) : '#';

      // Specs summary
      let specsHtml = `<span class="spec-item"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3h18v18H3zM9 3v18M3 9h18"/></svg> ${p.area}</span>`;
      if (p.beds) {
        specsHtml += `<span class="spec-item"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 19h20M2 8v11M22 8v11M4 8h16a2 2 0 0 1 2 2v4H2v-4a2 2 0 0 1 2-2z"/></svg> ${p.beds} BHK</span>`;
      }
      if (p.facing) {
        specsHtml += `<span class="spec-item"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polygon points="12 8 8 12 12 16 16 12 12 8"/></svg> ${p.facing}</span>`;
      }

      return `
        <article class="property-card" data-id="${p.id}">
          <div class="card-media">
            <img class="card-img" src="${p.img}" alt="${safe(p.name)}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80'">
            <div class="card-badge-layer">
              <span class="badge ${typeBadgeClass}">${p.type}</span>
              <span class="badge ${statusBadgeClass}">${p.status}</span>
            </div>
            <span class="card-ref-badge">${p.refCode || '#' + p.id}</span>
          </div>
          <div class="card-body">
            <div class="card-price-row">
              <span class="card-price">${p.priceLabel}</span>
              <span class="card-price-unit">${p.type === 'Plot' ? 'Ready for Registration' : 'Inclusive Price'}</span>
            </div>
            <h3 class="card-title">
              <a href="property.html?id=${p.id}">${safe(p.name)}</a>
            </h3>
            <div class="card-location">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span>${safe(p.loc)}, Mahbubnagar</span>
            </div>
            <div class="card-specs">
              ${specsHtml}
            </div>
            <div class="card-actions">
              <a class="btn btn-secondary btn-sm" href="property.html?id=${p.id}">
                View Details →
              </a>
              <a class="btn btn-whatsapp btn-sm" href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" title="Chat on WhatsApp (Demo)">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.301-.15-1.782-.879-2.057-.98-.276-.1-.476-.15-.676.15-.2.301-.776.98-.952 1.18-.176.2-.351.226-.652.076-.3-.15-1.268-.468-2.416-1.492-.894-.798-1.498-1.784-1.674-2.085-.176-.3-.019-.462.132-.612.136-.135.301-.35.452-.526.15-.175.2-.3.301-.501.101-.2.05-.375-.025-.525-.075-.15-.676-1.63-.926-2.233-.243-.587-.49-.507-.676-.516l-.576-.01c-.2 0-.526.075-.802.375s-1.052 1.028-1.052 2.508 1.077 2.908 1.228 3.109c.15.2 2.119 3.235 5.132 4.538.717.31 1.278.496 1.716.634.72.228 1.375.196 1.893.118.577-.087 1.782-.728 2.033-1.431.25-.702.25-1.303.175-1.431-.075-.128-.276-.203-.576-.353z"/><path d="M12 2C6.477 2 2 6.477 2 12c0 1.892.524 3.662 1.434 5.176L2 22l4.982-1.393A9.957 9.957 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.2c-1.63 0-3.14-.49-4.4-1.33l-.315-.208-2.955.826.84-2.87-.215-.327A8.163 8.163 0 0 1 3.8 12c0-4.521 3.679-8.2 8.2-8.2 4.522 0 8.2 3.679 8.2 8.2 0 4.522-3.678 8.2-8.2 8.2z"/></svg>
                WhatsApp
              </a>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  function renderActiveFilterChips(container) {
    if (!container) return;
    const chips = [];

    if (filterState.query) chips.push({ label: `"${filterState.query}"`, key: 'query' });
    if (filterState.type) chips.push({ label: `Type: ${filterState.type}`, key: 'type' });
    if (filterState.loc) chips.push({ label: `Loc: ${filterState.loc}`, key: 'loc' });
    if (filterState.budget) {
      const budgetMap = { under25: '< ₹25L', '25to50': '₹25L-50L', '50to100': '₹50L-1Cr', above100: '> ₹1Cr' };
      chips.push({ label: `Budget: ${budgetMap[filterState.budget] || filterState.budget}`, key: 'budget' });
    }
    if (filterState.status) chips.push({ label: `Status: ${filterState.status}`, key: 'status' });

    if (chips.length === 0) {
      container.innerHTML = '';
      return;
    }

    container.innerHTML = chips.map(c => `
      <span class="filter-chip">
        ${c.label}
        <button type="button" onclick="removeFilter('${c.key}')" aria-label="Remove filter">&times;</button>
      </span>
    `).join('');
  }

  window.removeFilter = function (key) {
    filterState[key] = '';
    const el = $(key);
    if (el) el.value = '';
    renderProperties();
  };

  /* ==========================================================================
     4. Contact & Enquiry Form Validation & Submission
     ========================================================================== */
  function initContactForm() {
    const form = $('form');
    if (!form) return;

    const nameInput = form.elements['name'];
    const phoneInput = form.elements['phone'];
    const emailInput = form.elements['email'];
    const statusMsg = $('msg');
    const submitBtn = form.querySelector('button[type="submit"]');

    // Real-time validation feedback
    if (nameInput) {
      nameInput.addEventListener('input', () => {
        if (nameInput.value.trim().length >= 3) {
          nameInput.classList.remove('is-invalid');
          nameInput.classList.add('is-valid');
        } else {
          nameInput.classList.remove('is-valid');
        }
      });
    }

    if (phoneInput) {
      phoneInput.addEventListener('input', () => {
        const cleaned = phoneInput.value.replace(/[^0-9+\s-]/g, '');
        if (/^[0-9+\-\s]{8,16}$/.test(cleaned)) {
          phoneInput.classList.remove('is-invalid');
          phoneInput.classList.add('is-valid');
        } else {
          phoneInput.classList.remove('is-valid');
        }
      });
    }

    if (emailInput) {
      emailInput.addEventListener('input', () => {
        if (!emailInput.value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
          emailInput.classList.remove('is-invalid');
          if (emailInput.value) emailInput.classList.add('is-valid');
        } else {
          emailInput.classList.remove('is-valid');
        }
      });
    }

    // Submit handler
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameVal = nameInput ? nameInput.value.trim() : '';
      const phoneVal = phoneInput ? phoneInput.value.trim() : '';
      const emailVal = emailInput ? emailInput.value.trim() : '';
      const interestVal = form.elements['interest'] ? form.elements['interest'].value : 'General Enquiry';
      const messageVal = form.elements['message'] ? form.elements['message'].value.trim() : '';

      let hasError = false;

      // Validate Name
      if (nameVal.length < 3) {
        if (nameInput) nameInput.classList.add('is-invalid');
        hasError = true;
      }

      // Validate Phone (Indian standard 10 digits or 8-16 with country code)
      if (!/^[0-9+\-\s]{8,16}$/.test(phoneVal)) {
        if (phoneInput) phoneInput.classList.add('is-invalid');
        hasError = true;
      }

      // Validate Email (if provided)
      if (emailVal && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
        if (emailInput) emailInput.classList.add('is-invalid');
        hasError = true;
      }

      if (hasError) {
        if (statusMsg) {
          statusMsg.className = 'form-status-alert error';
          statusMsg.textContent = 'Please correct the highlighted fields before submitting.';
        }
        return;
      }

      // Button loading state
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <svg class="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;"><circle cx="12" cy="12" r="10" stroke-opacity="0.25"/><path d="M12 2a10 10 0 0 1 10 10"/></svg>
          Submitting Enquiry...
        `;
      }

      setTimeout(() => {
        // Save to NovaStore
        if (window.NovaStore) {
          window.NovaStore.addLead({
            name: nameVal,
            phone: phoneVal,
            email: emailVal,
            interest: interestVal,
            message: messageVal
          });
        }

        // Reset UI
        form.reset();
        $$('.form-control').forEach(el => el.classList.remove('is-valid', 'is-invalid'));

        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = 'Submit Enquiry →';
        }

        if (statusMsg) {
          statusMsg.className = 'form-status-alert success';
          statusMsg.innerHTML = `
            <strong>Enquiry Received!</strong> Thank you, ${safe(nameVal)}. Your demo request has been saved in this browser's local store. You can review it in the <a href="admin.html" style="text-decoration:underline; font-weight:bold;">Admin Dashboard</a>.
          `;
        }

        showToast('Enquiry saved successfully in demo storage!');
      }, 600);
    });
  }

  // Pre-fill enquiry from property card or projects
  window.enquire = function (propertyName, propertyRef) {
    const form = $('form');
    if (!form) return;

    if (form.elements['interest']) {
      form.elements['interest'].value = propertyName;
    }
    if (form.elements['message']) {
      form.elements['message'].value = `Hello, I am interested in ${propertyName} (${propertyRef || 'Ref Mahbubnagar'}). Please share the complete pricing breakdown, layout copy, and coordinate a site visit.`;
    }

    const contactSec = $('contact');
    if (contactSec) {
      contactSec.scrollIntoView({ behavior: 'smooth' });
    }
  };

  function populateInterestDropdown() {
    const select = document.querySelector('select[name="interest"]');
    if (!select || !window.NovaStore) return;

    const properties = window.NovaStore.getProperties();
    const existingValues = Array.from(select.options).map(o => o.value);

    // Group properties by type
    const optGroup = document.createElement('optgroup');
    optGroup.label = 'Specific Properties';

    properties.forEach(p => {
      if (!existingValues.includes(p.name)) {
        const opt = document.createElement('option');
        opt.value = p.name;
        opt.textContent = `${p.name} (${p.priceLabel})`;
        optGroup.appendChild(opt);
      }
    });

    if (optGroup.children.length > 0) {
      select.appendChild(optGroup);
    }
  }

  /* ==========================================================================
     5. WhatsApp Enquiry Integration
     ========================================================================== */
  function initWhatsAppButtons() {
    // Dynamic WhatsApp links
    const floatingBtn = $('floatingWhatsapp');
    if (floatingBtn && window.NovaStore) {
      floatingBtn.href = window.NovaStore.getWhatsAppUrl("Hello NOVA ESTATES, I would like to enquire about residential properties in Mahbubnagar.");
    }
  }

  /* ==========================================================================
     6. Modals & Toast Utilities
     ========================================================================== */
  function initModals() {
    // Generic modal close handlers
    $$('.modal-close-btn, .modal-backdrop-close').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const modal = e.target.closest('.modal-overlay');
        if (modal) closeModal(modal.id);
      });
    });

    // ESC key closes any open modal
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        $$('.modal-overlay.active').forEach(m => m.classList.remove('active'));
        document.body.style.overflow = '';
      }
    });
  }

  window.openModal = function (modalId) {
    const modal = $(modalId);
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  window.closeModal = function (modalId) {
    const modal = $(modalId);
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  window.requestBrochure = function (projectName) {
    const brochureModal = $('brochureModal');
    if (brochureModal) {
      const projNameEl = $('brochureProjectName');
      if (projNameEl) projNameEl.textContent = projectName;
      openModal('brochureModal');
    }
  };

  window.submitBrochureRequest = function (e) {
    e.preventDefault();
    const phoneInput = $('brochurePhone');
    const phoneVal = phoneInput ? phoneInput.value.trim() : '';

    if (!/^[0-9+\-\s]{8,16}$/.test(phoneVal)) {
      showToast('Please enter a valid phone number.');
      return;
    }

    const projName = $('brochureProjectName') ? $('brochureProjectName').textContent : 'Project';
    if (window.NovaStore) {
      window.NovaStore.addLead({
        name: 'Brochure Requester',
        phone: phoneVal,
        interest: `Digital Brochure: ${projName}`,
        message: `Requested digital brochure download for ${projName}`
      });
    }

    closeModal('brochureModal');
    showToast(`Brochure link simulated for ${projName}! Lead recorded.`);
  };

  // Toast notification
  window.showToast = function (message) {
    let container = $('toastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toastContainer';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
      <span>${safe(message)}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  };

  // Safe HTML string escape
  function safe(str) {
    return String(str || '').replace(/[&<>"']/g, c => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[c]));
  }
  window.safe = safe;

})();
