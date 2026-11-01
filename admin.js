/**
 * NOVA ESTATES - Admin Dashboard Controller
 * 
 * Manages Property CRUD operations, Lead pipeline management,
 * CSV export, filter state, and localStorage synchronization.
 */

(function () {
  'use strict';

  // State
  let currentTab = 'properties';
  let propFilter = { query: '', type: '', status: '' };
  let leadFilter = { query: '', status: '' };
  let editingPropId = null;

  // DOM elements
  const $ = (id) => document.getElementById(id);

  document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    initPropertyFilters();
    initLeadFilters();
    initSettingsForm();
    renderAll();
  });

  /* ==========================================================================
     1. Tabs Controller
     ========================================================================== */
  function initTabs() {
    const tabBtns = document.querySelectorAll('.admin-tab-btn');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const target = btn.getAttribute('data-tab');
        currentTab = target;

        $('tabProperties').style.display = target === 'properties' ? 'block' : 'none';
        $('tabLeads').style.display = target === 'leads' ? 'block' : 'none';
        $('tabSettings').style.display = target === 'settings' ? 'block' : 'none';

        renderAll();
      });
    });
  }

  function renderAll() {
    renderKPIs();
    renderPropertiesTable();
    renderLeadsTable();
  }

  /* ==========================================================================
     2. KPI Cards Overview
     ========================================================================== */
  function renderKPIs() {
    if (!window.NovaStore) return;

    const properties = window.NovaStore.getProperties();
    const leads = window.NovaStore.getLeads();

    const totalProps = properties.length;
    const availableProps = properties.filter(p => p.status === 'Available').length;
    const underOfferOrSold = properties.filter(p => p.status !== 'Available').length;

    const totalLeads = leads.length;
    const newLeads = leads.filter(l => l.status === 'New').length;

    // Pipeline sum
    const totalPipelineValue = properties
      .filter(p => p.status === 'Available')
      .reduce((sum, p) => sum + (Number(p.price) || 0), 0);

    if ($('kpiTotalProps')) $('kpiTotalProps').textContent = totalProps;
    if ($('kpiActiveProps')) $('kpiActiveProps').textContent = availableProps;
    if ($('kpiSoldProps')) $('kpiSoldProps').textContent = underOfferOrSold;
    if ($('kpiTotalLeads')) $('kpiTotalLeads').textContent = totalLeads;
    if ($('kpiNewLeads')) $('kpiNewLeads').textContent = newLeads;
    if ($('kpiPipelineValue')) $('kpiPipelineValue').textContent = window.NovaStore.formatINR(totalPipelineValue);
  }

  /* ==========================================================================
     3. Property Management (CRUD)
     ========================================================================== */
  function initPropertyFilters() {
    const q = $('adminPropSearch');
    const t = $('adminPropTypeFilter');
    const s = $('adminPropStatusFilter');

    if (q) q.addEventListener('input', (e) => { propFilter.query = e.target.value.toLowerCase(); renderPropertiesTable(); });
    if (t) t.addEventListener('change', (e) => { propFilter.type = e.target.value; renderPropertiesTable(); });
    if (s) s.addEventListener('change', (e) => { propFilter.status = e.target.value; renderPropertiesTable(); });
  }

  function renderPropertiesTable() {
    const tbody = $('propertiesTableBody');
    if (!tbody || !window.NovaStore) return;

    const allProps = window.NovaStore.getProperties();

    const filtered = allProps.filter(p => {
      if (propFilter.query) {
        const pool = `${p.name} ${p.loc} ${p.refCode || ''} ${p.type}`.toLowerCase();
        if (!pool.includes(propFilter.query)) return false;
      }
      if (propFilter.type && p.type !== propFilter.type) return false;
      if (propFilter.status && p.status !== propFilter.status) return false;
      return true;
    });

    if (filtered.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" style="text-align:center; padding:40px; color:var(--slate-500);">
            No properties found matching current criteria.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = filtered.map(p => {
      const typeBadgeClass = p.type === 'Plot' ? 'badge-plot' : p.type === 'Villa' ? 'badge-villa' : 'badge-apartment';

      return `
        <tr>
          <td style="width:60px;">
            <img class="table-thumb" src="${p.img}" alt="${safe(p.name)}" onerror="this.src='https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=150&q=80'">
          </td>
          <td>
            <div class="table-prop-info">
              <span class="table-prop-title">${safe(p.name)}</span>
              <span class="table-prop-loc">${safe(p.loc)}, Mahbubnagar · <code style="color:var(--primary);">${p.refCode || '#' + p.id}</code></span>
            </div>
          </td>
          <td>
            <span class="badge ${typeBadgeClass}">${p.type}</span>
          </td>
          <td>
            <strong>${p.priceLabel || window.NovaStore.formatINR(p.price)}</strong>
          </td>
          <td>
            ${safe(p.area)}
          </td>
          <td>
            <select class="status-select-badge" onchange="changePropertyStatus(${p.id}, this.value)" style="border-color:${p.status === 'Available' ? '#10B981' : p.status === 'Under Offer' ? '#F59E0B' : '#64748B'}; color:${p.status === 'Available' ? '#065F46' : p.status === 'Under Offer' ? '#92400E' : '#334155'};">
              <option value="Available" ${p.status === 'Available' ? 'selected' : ''}>Available</option>
              <option value="Under Offer" ${p.status === 'Under Offer' ? 'selected' : ''}>Under Offer</option>
              <option value="Sold" ${p.status === 'Sold' ? 'selected' : ''}>Sold</option>
            </select>
          </td>
          <td>
            <div class="action-btns-group">
              <button class="btn btn-secondary btn-sm" onclick="openEditPropertyModal(${p.id})" title="Edit Property">
                ✏️ Edit
              </button>
              <a class="btn btn-secondary btn-sm" href="property.html?id=${p.id}" target="_blank" title="View on site">
                👁️ View
              </a>
              <button class="btn btn-secondary btn-sm" style="color:var(--danger);" onclick="deletePropertyConfirm(${p.id}, '${safe(p.name)}')" title="Delete">
                🗑️
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }

  window.changePropertyStatus = function (id, newStatus) {
    if (window.NovaStore) {
      window.NovaStore.togglePropertyStatus(id, newStatus);
      renderKPIs();
      showToast(`Property status updated to "${newStatus}".`);
    }
  };

  window.openAddPropertyModal = function () {
    editingPropId = null;
    $('propModalTitle').textContent = 'Add New Property (Mahbubnagar)';
    $('propertyForm').reset();
    $('propIdHidden').value = '';
    $('propImgPreset').value = 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80';
    $('propImgPreview').src = $('propImgPreset').value;
    openModal('propertyModal');
  };

  window.openEditPropertyModal = function (id) {
    const prop = window.NovaStore.getPropertyById(id);
    if (!prop) return;

    editingPropId = id;
    $('propModalTitle').textContent = `Edit Property: ${prop.name}`;
    $('propIdHidden').value = prop.id;
    $('propName').value = prop.name;
    $('propType').value = prop.type;
    $('propLoc').value = prop.loc;
    $('propPrice').value = prop.price;
    $('propArea').value = prop.area;
    $('propFacing').value = prop.facing || 'East Facing';
    $('propStatus').value = prop.status || 'Available';
    $('propBeds').value = prop.beds || '';
    $('propBaths').value = prop.baths || '';
    $('propDesc').value = prop.description || '';
    $('propFeatures').value = (prop.features || []).join(', ');
    $('propImgPreset').value = prop.img || '';
    $('propImgPreview').src = prop.img || '';

    openModal('propertyModal');
  };

  window.onPresetImgChange = function (val) {
    $('propImgPreview').src = val;
  };

  window.savePropertyForm = function (e) {
    e.preventDefault();
    const form = e.target;

    const name = form.elements['name'].value.trim();
    const type = form.elements['type'].value;
    const loc = form.elements['loc'].value;
    const price = Number(form.elements['price'].value) || 0;
    const area = form.elements['area'].value.trim();
    const facing = form.elements['facing'].value.trim();
    const status = form.elements['status'].value;
    const beds = form.elements['beds'].value ? Number(form.elements['beds'].value) : null;
    const baths = form.elements['baths'].value ? Number(form.elements['baths'].value) : null;
    const description = form.elements['description'].value.trim();
    const img = form.elements['img'].value.trim() || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80';
    const featuresRaw = form.elements['features'].value.trim();
    const features = featuresRaw ? featuresRaw.split(',').map(s => s.trim()).filter(Boolean) : [];

    if (!name || price <= 0 || !area) {
      showToast('Please fill out all required fields.');
      return;
    }

    const payload = {
      name,
      type,
      loc,
      price,
      priceLabel: window.NovaStore.formatINR(price),
      area,
      facing,
      status,
      beds,
      baths,
      description,
      img,
      gallery: [img],
      features
    };

    if (editingPropId) {
      payload.id = editingPropId;
    }

    window.NovaStore.saveProperty(payload);
    closeModal('propertyModal');
    renderAll();
    showToast(editingPropId ? 'Property updated successfully!' : 'New property added to local storage!');
  };

  window.deletePropertyConfirm = function (id, name) {
    if (confirm(`Are you sure you want to delete "${name}" from demo properties?`)) {
      window.NovaStore.deleteProperty(id);
      renderAll();
      showToast(`Property "${name}" deleted.`);
    }
  };

  window.restoreDefaultProperties = function () {
    if (confirm('Reset properties to the original 9 curated Mahbubnagar demo listings?')) {
      window.NovaStore.resetProperties();
      renderAll();
      showToast('Default demo properties restored!');
    }
  };

  /* ==========================================================================
     4. Lead Management (Pipeline & Notes)
     ========================================================================== */
  function initLeadFilters() {
    const q = $('adminLeadSearch');
    const s = $('adminLeadStatusFilter');

    if (q) q.addEventListener('input', (e) => { leadFilter.query = e.target.value.toLowerCase(); renderLeadsTable(); });
    if (s) s.addEventListener('change', (e) => { leadFilter.status = e.target.value; renderLeadsTable(); });
  }

  function renderLeadsTable() {
    const tbody = $('leadsTableBody');
    if (!tbody || !window.NovaStore) return;

    const allLeads = window.NovaStore.getLeads();

    const filtered = allLeads.filter(l => {
      if (leadFilter.query) {
        const pool = `${l.name} ${l.phone} ${l.email || ''} ${l.interest || ''} ${l.message || ''}`.toLowerCase();
        if (!pool.includes(leadFilter.query)) return false;
      }
      if (leadFilter.status && l.status !== leadFilter.status) return false;
      return true;
    });

    if (filtered.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="6" style="text-align:center; padding:40px; color:var(--slate-500);">
            No enquiries or leads found.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = filtered.map(l => {
      const statusColors = {
        'New': { bg: '#EFF6FF', text: '#1D4ED8', border: '#93C5FD' },
        'Contacted': { bg: '#FEF3C7', text: '#92400E', border: '#FCD34D' },
        'Site Visit Scheduled': { bg: '#F3E8FF', text: '#6B21A8', border: '#D8B4FE' },
        'Converted': { bg: '#DCFCE7', text: '#166534', border: '#86EFAC' },
        'Closed': { bg: '#F1F5F9', text: '#475569', border: '#CBD5E1' }
      };

      const c = statusColors[l.status] || statusColors['New'];
      const rawPhone = (l.phone || '').replace(/[^0-9]/g, '');
      const waLink = rawPhone ? `https://wa.me/${rawPhone}?text=Hello%20${encodeURIComponent(l.name)}%2C%20following%20up%20on%20your%20NOVA%20ESTATES%20enquiry.` : '#';

      return `
        <tr>
          <td>
            <div style="font-weight:700; color:var(--navy); font-size:12.5px;">${l.id || 'LEAD'}</div>
            <div style="font-size:11.5px; color:var(--slate-400);">${safe(l.date)}</div>
          </td>
          <td>
            <div style="font-weight:700; color:var(--navy);">${safe(l.name)}</div>
            <div style="font-size:12px; color:var(--slate-500);">${safe(l.phone)}</div>
            ${l.email ? `<div style="font-size:11.5px; color:var(--slate-400);">${safe(l.email)}</div>` : ''}
          </td>
          <td>
            <span style="font-weight:600; color:var(--slate-700);">${safe(l.interest || 'General Enquiry')}</span>
            ${l.message ? `<div style="font-size:12px; color:var(--slate-500); max-width:240px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">"${safe(l.message)}"</div>` : ''}
          </td>
          <td>
            <select class="status-select-badge" onchange="changeLeadStatus('${l.id}', this.value)" style="background:${c.bg}; color:${c.text}; border-color:${c.border}; font-weight:700;">
              <option value="New" ${l.status === 'New' ? 'selected' : ''}>New</option>
              <option value="Contacted" ${l.status === 'Contacted' ? 'selected' : ''}>Contacted</option>
              <option value="Site Visit Scheduled" ${l.status === 'Site Visit Scheduled' ? 'selected' : ''}>Site Visit Scheduled</option>
              <option value="Converted" ${l.status === 'Converted' ? 'selected' : ''}>Converted</option>
              <option value="Closed" ${l.status === 'Closed' ? 'selected' : ''}>Closed</option>
            </select>
          </td>
          <td>
            <div class="action-btns-group">
              <button class="btn btn-secondary btn-sm" onclick="openLeadModal('${l.id}')" title="View details and notes">
                📝 Details
              </button>
              <a class="btn btn-whatsapp btn-sm" href="${waLink}" target="_blank" rel="noopener noreferrer" title="Chat on WhatsApp">
                WA
              </a>
              <button class="btn btn-secondary btn-sm" style="color:var(--danger);" onclick="deleteLeadConfirm('${l.id}')" title="Delete lead">
                🗑️
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }

  window.changeLeadStatus = function (leadId, newStatus) {
    if (window.NovaStore) {
      window.NovaStore.updateLeadStatus(leadId, newStatus);
      renderKPIs();
      showToast(`Lead status updated to "${newStatus}".`);
    }
  };

  window.openLeadModal = function (leadId) {
    const leads = window.NovaStore.getLeads();
    const lead = leads.find(l => String(l.id) === String(leadId));
    if (!lead) return;

    $('leadModalId').textContent = lead.id;
    $('leadModalName').textContent = lead.name;
    $('leadModalPhone').textContent = lead.phone;
    $('leadModalEmail').textContent = lead.email || 'None';
    $('leadModalDate').textContent = lead.date;
    $('leadModalInterest').textContent = lead.interest;
    $('leadModalMsg').textContent = lead.message || 'No specific message entered.';
    $('leadModalNotes').value = lead.notes || '';
    $('leadModalStatus').value = lead.status;

    $('leadModalSaveBtn').onclick = () => {
      const notesVal = $('leadModalNotes').value;
      const statusVal = $('leadModalStatus').value;
      window.NovaStore.updateLeadStatus(lead.id, statusVal, notesVal);
      closeModal('leadModal');
      renderAll();
      showToast('Lead details and internal notes saved!');
    };

    openModal('leadModal');
  };

  window.deleteLeadConfirm = function (leadId) {
    if (confirm('Delete this demo enquiry from local storage?')) {
      window.NovaStore.deleteLead(leadId);
      renderAll();
      showToast('Enquiry removed.');
    }
  };

  window.clearAllLeads = function () {
    if (confirm('Clear all demo inquiries? This will empty the demo leads table.')) {
      window.NovaStore.clearLeads();
      renderAll();
      showToast('All demo enquiries cleared.');
    }
  };

  window.addTestLead = function () {
    const sampleNames = ['Venkatesh Goud', 'Ananya Sharma', 'Srinivas Reddy', 'Priya Deshmukh', 'K. Balakrishna'];
    const sampleInterests = ['NOVA Green County Residential Plot', 'The Bluebell Luxury Apartments', 'NOVA Signature Royal Villa', 'General Plotted Inquiry'];
    const randomName = sampleNames[Math.floor(Math.random() * sampleNames.length)];
    const randomInterest = sampleInterests[Math.floor(Math.random() * sampleInterests.length)];

    window.NovaStore.addLead({
      name: randomName,
      phone: `+91 ${Math.floor(9000000000 + Math.random() * 900000000)}`,
      email: `${randomName.toLowerCase().replace(/[^a-z]/g, '')}@example.com`,
      interest: randomInterest,
      message: 'Generated demo inquiry for testing dashboard pipeline functions.'
    });

    renderAll();
    showToast(`Test lead for "${randomName}" generated!`);
  };

  // Export Leads to CSV
  window.exportLeadsCSV = function () {
    const leads = window.NovaStore.getLeads();
    if (!leads.length) {
      showToast('No leads to export.');
      return;
    }

    const headers = ['Lead ID', 'Date', 'Full Name', 'Phone', 'Email', 'Interest', 'Status', 'Message', 'Notes'];
    const rows = leads.map(l => [
      l.id || '',
      `"${(l.date || '').replace(/"/g, '""')}"`,
      `"${(l.name || '').replace(/"/g, '""')}"`,
      `"${(l.phone || '').replace(/"/g, '""')}"`,
      `"${(l.email || '').replace(/"/g, '""')}"`,
      `"${(l.interest || '').replace(/"/g, '""')}"`,
      `"${(l.status || '').replace(/"/g, '""')}"`,
      `"${(l.message || '').replace(/"/g, '""')}"`,
      `"${(l.notes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `nova_estates_leads_${Date.now()}.csv`;
    link.click();
    showToast('Leads exported to CSV file.');
  };

  /* ==========================================================================
     5. Settings & Config Tab
     ========================================================================== */
  function initSettingsForm() {
    const form = $('settingsForm');
    if (!form || !window.NovaStore) return;

    const config = window.NovaStore.getConfig();
    form.elements['companyName'].value = config.companyName || '';
    form.elements['tagline'].value = config.tagline || '';
    form.elements['location'].value = config.location || '';
    form.elements['address'].value = config.address || '';
    form.elements['whatsappNumber'].value = config.whatsappNumber || '';
    form.elements['email'].value = config.email || '';

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const updated = {
        companyName: form.elements['companyName'].value.trim(),
        tagline: form.elements['tagline'].value.trim(),
        location: form.elements['location'].value.trim(),
        address: form.elements['address'].value.trim(),
        whatsappNumber: form.elements['whatsappNumber'].value.trim(),
        email: form.elements['email'].value.trim()
      };

      window.NovaStore.saveConfig(updated);
      showToast('Configuration settings updated in local storage!');
    });
  }

  window.resetEverythingConfirm = function () {
    if (confirm('CAUTION: Reset both properties and leads to factory demo defaults?')) {
      window.NovaStore.resetProperties();
      window.NovaStore.clearLeads();
      // Reseed demo leads
      window.NovaStore.getLeads();
      renderAll();
      showToast('System data reset to default demo state!');
    }
  };

  /* ==========================================================================
     6. UI Helper Functions
     ========================================================================== */
  function openModal(id) {
    const modal = $(id);
    if (modal) modal.classList.add('active');
  }
  window.openModal = openModal;

  function closeModal(id) {
    const modal = $(id);
    if (modal) modal.classList.remove('active');
  }
  window.closeModal = closeModal;

  function showToast(msg) {
    let container = $('toastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toastContainer';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>${safe(msg)}</span>`;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 4000);
  }
  window.showToast = showToast;

  function safe(s) {
    return String(s || '').replace(/[&<>"']/g, c => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[c]));
  }
  window.safe = safe;

})();
