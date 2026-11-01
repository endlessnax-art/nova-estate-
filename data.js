/**
 * NOVA ESTATES - Centralized Data Store & Configuration
 * 
 * Fictional Demo Real Estate Portal for Mahbubnagar, Telangana, India.
 * All properties, pricing, layouts, and contact records are illustrative demo data.
 */

// 1. CONFIGURATION
const NOVA_CONFIG = {
  companyName: "NOVA ESTATES",
  tagline: "Building Trust. Creating Futures.",
  location: "Mahbubnagar, Telangana, India",
  address: "Plot No. 42, Near Collectorate Road, Yenugonda, Mahbubnagar, Telangana 509001",
  phoneDisplay: "+91 (Demo) 90000 00000",
  // Configurable WhatsApp Number - Demo placeholder (910000000000)
  // Users can change this in the Admin Dashboard Settings or in this config.
  whatsappNumber: "910000000000", 
  email: "contact@novaestates.example",
  officeHours: "Monday – Saturday: 9:30 AM – 7:00 PM | Sunday: By Appointment",
  isDemo: true,
  disclaimer: "Fictional Demonstration Project — NOVA ESTATES is a sample real estate website for Mahbubnagar, Telangana. All properties, prices, layout plans, and contact details are purely illustrative demo data.",
  primaryColor: "#2563EB",
  navyColor: "#142B4E"
};

// 2. DEFAULT INITIAL PROPERTIES (Realistic Mahbubnagar Localities)
const DEFAULT_PROPERTIES = [
  {
    id: 1,
    refCode: "NE-P101",
    name: "NOVA Green County Residential Plot",
    type: "Plot",
    loc: "Jadcherla Road",
    price: 1850000,
    priceLabel: "₹18.5 Lakhs",
    area: "200 sq. yd.",
    areaSqFt: 1800,
    facing: "East Facing",
    status: "Available", // Available | Under Offer | Sold
    featured: true,
    beds: null,
    baths: null,
    img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1628624747186-a941c476b7ef?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "NOVA Green County offers well-demarcated residential plots situated along the rapidly emerging Jadcherla Road growth corridor in Mahbubnagar. Designed with wide 40-foot internal blacktop roads, underground drainage, avenue plantations, and dedicated transformer lines, this venture represents an ideal canvas to build your independent family home.",
    features: [
      "Clear Plot Demarcation & Boundary Stones",
      "40ft & 33ft Wide Blacktop Roads",
      "Underground Drainage & Electricity Cabling",
      "Overhead Water Storage Tank",
      "Avenue Plantation & Compound Fencing",
      "Illustrative Layout Sanction (Demo Showcase)"
    ],
    landmarks: [
      { name: "Jadcherla NH-44 Junction", distance: "8 mins" },
      { name: "Mahbubnagar Town Center", distance: "12 mins" },
      { name: "District Collectorate", distance: "10 mins" },
      { name: "Upcoming IT & Industrial Hub", distance: "15 mins" }
    ]
  },
  {
    id: 2,
    refCode: "NE-A102",
    name: "The Bluebell Luxury Apartments",
    type: "Apartment",
    loc: "New Town",
    price: 4250000,
    priceLabel: "₹42.5 Lakhs",
    area: "1,250 sq. ft.",
    areaSqFt: 1250,
    facing: "North-East",
    status: "Available",
    featured: true,
    beds: 2,
    baths: 2,
    img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "The Bluebell Apartments offers an elevated living experience in the heart of New Town, Mahbubnagar. These spacious 2 BHK flats feature cross-ventilation, premium vitrified tile flooring, modular electrical provisions, dedicated covered car parking, and an automatic passenger elevator with full power backup.",
    features: [
      "2 Spacious Bedrooms with Attached Bathrooms",
      "Covered Stilt Car Parking",
      "8-Passenger High-Speed Elevator with Backup",
      "24/7 CCTV Surveillance & Intercom Facility",
      "Solar Water Heating Provision on Terrace",
      "Rainwater Harvesting System"
    ],
    landmarks: [
      { name: "New Town Commercial Center", distance: "3 mins walk" },
      { name: "Government Medical College", distance: "7 mins" },
      { name: "Mahbubnagar Railway Station", distance: "9 mins" },
      { name: "State Bank & Financial Branch", distance: "4 mins" }
    ]
  },
  {
    id: 3,
    refCode: "NE-V103",
    name: "NOVA Signature Royal Villa",
    type: "Villa",
    loc: "Yenugonda",
    price: 8900000,
    priceLabel: "₹89 Lakhs",
    area: "2,100 sq. ft.",
    areaSqFt: 2100,
    facing: "East Facing",
    status: "Available",
    featured: true,
    beds: 3,
    baths: 3,
    img: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "An architectural masterpiece in Yenugonda, NOVA Signature Villa represents the epitome of private luxury. This G+1 duplex villa features expansive double-height living spaces, imported bathroom fixtures, a landscaped private front lawn, private terrace lounge, and an EV charging station in your portico.",
    features: [
      "3 Luxury En-Suite Bedrooms with Walk-in Wardrobes",
      "Private Front Lawn & Landscaped Garden",
      "Rooftop Stargazing Terrace with Pergola",
      "Home Automation & Video Doorbell System",
      "EV Car Charging Port in Covered Portico",
      "24/7 Gated Security with Boom Barrier"
    ],
    landmarks: [
      { name: "Collectorate Complex Yenugonda", distance: "5 mins" },
      { name: "Kendriya Vidyalaya & Schools", distance: "6 mins" },
      { name: "Hyderabad-Mahbubnagar Highway", distance: "7 mins" },
      { name: "Multi-Speciality Hospital", distance: "8 mins" }
    ]
  },
  {
    id: 4,
    refCode: "NE-P104",
    name: "Green Meadows Plotted Layout",
    type: "Plot",
    loc: "Yenugonda",
    price: 1250000,
    priceLabel: "₹12.5 Lakhs",
    area: "150 sq. yd.",
    areaSqFt: 1350,
    facing: "North Facing",
    status: "Available",
    featured: false,
    beds: null,
    baths: null,
    img: "https://images.unsplash.com/photo-1524813686514-a57563d77d66?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1524813686514-a57563d77d66?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Affordable 150 sq.yd. residential plots located in Yenugonda's fast-developing residential sector. Excellent natural elevation with scenic hill views, clear internal demarcation, and immediate water and power connections available nearby.",
    features: [
      "100% Vastu Compliant North Facing Orientation",
      "Immediate Registration & Mutation Assistance",
      "33ft Wide Blacktop Roads",
      "Direct Road Connectivity to Yenugonda Main Road",
      "Peaceful Residential Neighborhood with Green Belts"
    ],
    landmarks: [
      { name: "Yenugonda Junction", distance: "4 mins" },
      { name: "Government General Hospital", distance: "8 mins" },
      { name: "District Sports Stadium", distance: "10 mins" }
    ]
  },
  {
    id: 5,
    refCode: "NE-A105",
    name: "Skyline Heights Premium Residency",
    type: "Apartment",
    loc: "New Town",
    price: 5600000,
    priceLabel: "₹56 Lakhs",
    area: "1,550 sq. ft.",
    areaSqFt: 1550,
    facing: "East Facing",
    status: "Available",
    featured: true,
    beds: 3,
    baths: 3,
    img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Premium 3 BHK corner apartment at Skyline Heights with abundant sunlight and dual cross balconies overlooking the New Town skyline. Includes false ceiling in the living area, Italian finish floor tiles, and access to the rooftop fitness center.",
    features: [
      "3 Large Bedrooms + 3 Bathrooms + Utility Balcony",
      "Rooftop Clubhouse & Resident Fitness Gym",
      "Dedicated Covered 2-Car Parking Slot",
      "100% DG Power Backup for All Common Areas & Lifts",
      "Fire Safety Compliant with Hydrant Network"
    ],
    landmarks: [
      { name: "New Town Clock Tower", distance: "5 mins" },
      { name: "Mahbubnagar Bus Terminal", distance: "8 mins" },
      { name: "Palamuru University Campus", distance: "14 mins" }
    ]
  },
  {
    id: 6,
    refCode: "NE-V106",
    name: "Palm Grove Gated Villa",
    type: "Villa",
    loc: "Jadcherla Road",
    price: 7600000,
    priceLabel: "₹76 Lakhs",
    area: "1,900 sq. ft.",
    areaSqFt: 1900,
    facing: "West Facing",
    status: "Under Offer",
    featured: false,
    beds: 3,
    baths: 3,
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Elegant 3 BHK contemporary villa located within the Palm Grove gated enclave. Offers a blend of suburban peace and immediate highway access. Currently under offer for registration.",
    features: [
      "Gated Community with 24/7 Security Booth",
      "Children's Play Park & Walking Jogging Track",
      "Solar Street Lighting",
      "Individual Sump & Overhead Water Tank"
    ],
    landmarks: [
      { name: "NH-44 Bypass Junction", distance: "6 mins" },
      { name: "Collectorate Center", distance: "11 mins" }
    ]
  },
  {
    id: 7,
    refCode: "NE-P107",
    name: "Heritage Valley Premium Plot",
    type: "Plot",
    loc: "Station Road",
    price: 2400000,
    priceLabel: "₹24 Lakhs",
    area: "240 sq. yd.",
    areaSqFt: 2160,
    facing: "North-East",
    status: "Available",
    featured: false,
    beds: null,
    baths: null,
    img: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Prime corner residential plot measuring 240 square yards situated off Station Road. High appreciation potential with 50-foot approach road and immediate proximity to Mahbubnagar Railway Station and central markets.",
    features: [
      "Corner Plot with Double Road Facing (50ft & 33ft)",
      "High Commercial & Residential Appreciation",
      "Ready for Immediate Ground Breaking & Construction",
      "Underground Municipal Water Supply Point"
    ],
    landmarks: [
      { name: "Mahbubnagar Railway Station", distance: "4 mins" },
      { name: "Old Ganj Commercial Market", distance: "6 mins" }
    ]
  },
  {
    id: 8,
    refCode: "NE-A108",
    name: "Grand Royale Executive Enclave",
    type: "Apartment",
    loc: "Collectorate Area",
    price: 6800000,
    priceLabel: "₹68 Lakhs",
    area: "1,800 sq. ft.",
    areaSqFt: 1800,
    facing: "East Facing",
    status: "Sold",
    featured: false,
    beds: 3,
    baths: 3,
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Ultra-luxury 3 BHK apartment in the prestigious Collectorate residential belt. Fully sold out demo listing representing Nova Estates' high standard of construction and interior finishes.",
    features: [
      "Italian Marble Flooring Throughout",
      "2 Covered Reserved Car Parks",
      "Clubhouse with Indoor Games Room",
      "Full Solar Backup for Common Amenities"
    ],
    landmarks: [
      { name: "Collectorate Office", distance: "2 mins walk" },
      { name: "Palamuru Bhavan", distance: "5 mins" }
    ]
  },
  {
    id: 9,
    refCode: "NE-V109",
    name: "Serene Woods Eco Luxury Villa",
    type: "Villa",
    loc: "Yenugonda",
    price: 11500000,
    priceLabel: "₹1.15 Crore",
    area: "2,800 sq. ft.",
    areaSqFt: 2800,
    facing: "East Facing",
    status: "Available",
    featured: true,
    beds: 4,
    baths: 4,
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Serene Woods presents a 4 BHK Triplex Villa overlooking the scenic Yenugonda Hills. Features private plunge pool provision, home theater room, rooftop terrace garden, and sustainable solar power generation.",
    features: [
      "4 Spacious Master Suites with Balconies",
      "Dedicated Home Cinema / Entertainment Lounge",
      "Private Plunge Pool & Deck",
      "5kW Grid-Tied Rooftop Solar System",
      "Gated Community with 24/7 Security & CCTV"
    ],
    landmarks: [
      { name: "Yenugonda Hill View Point", distance: "3 mins" },
      { name: "Collectorate Road", distance: "7 mins" },
      { name: "National Highway 44 Junction", distance: "9 mins" }
    ]
  }
];

// 3. DEFAULT PROJECTS DATA
const DEFAULT_PROJECTS = [
  {
    id: "proj-1",
    title: "NOVA Green County",
    category: "Residential Plotted Venture",
    location: "Jadcherla Road, Mahbubnagar",
    status: "Ready for Registration",
    progress: 95,
    heroImg: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=80",
    badge: "Plots Available",
    overview: "A master-planned residential plotted community across 18 acres with avenue trees, wide blacktop roads, dedicated electricity transformer, and children's park.",
    units: "120 Total Plots (150 to 300 sq. yds.)",
    amenities: ["40ft & 33ft BT Roads", "Underground Drainage", "Electricity with Transformers", "Children Play Area", "Overhead Water Tank", "Round-the-clock Security"]
  },
  {
    id: "proj-2",
    title: "NOVA Heights Towers",
    category: "Gated Apartment Community",
    location: "New Town, Mahbubnagar",
    status: "Under Construction",
    progress: 70,
    heroImg: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=900&q=80",
    badge: "2 & 3 BHK Flats",
    overview: "G+5 contemporary residential towers designed for urban families seeking modern comforts, high security, and walking distance to central New Town conveniences.",
    units: "48 Premium Apartments (1,250 – 1,600 sq. ft.)",
    amenities: ["Automatic 8-Passenger Lifts", "Covered Stilt Parking", "100% DG Power Backup", "Gymnasium & Yoga Deck", "Intercom System", "Rainwater Harvesting"]
  },
  {
    id: "proj-3",
    title: "NOVA Palm Meadows",
    category: "Luxury Gated Villa Enclave",
    location: "Yenugonda, Mahbubnagar",
    status: "Phase 1 Handover in Progress",
    progress: 85,
    heroImg: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
    badge: "Limited Villas",
    overview: "Exclusive 3 & 4 BHK duplex and triplex villas nestled against the tranquil Yenugonda hillside. Features private lawns, solar-ready roofs, and a residents' clubhouse.",
    units: "24 Luxury Duplex Villas (1,900 – 2,800 sq. ft.)",
    amenities: ["Clubhouse & Lounge", "Private Portico Parking", "Landscaped Central Park", "EV Charging Station", "CCTV & Security Booth", "Underground Cabling"]
  }
];

// 4. DEFAULT INITIAL LEADS (Sample data for Admin Dashboard preview)
const DEFAULT_LEADS = [
  {
    id: "lead-1001",
    name: "Ramesh Reddy",
    phone: "+91 98480 12345",
    email: "ramesh.reddy@example.com",
    interest: "NOVA Green County Residential Plot",
    propertyRef: "NE-P101",
    status: "New", // New | Contacted | Site Visit | Converted | Closed
    date: "2026-11-01 10:15 AM",
    message: "Interested in visiting the 200 sq. yd. East-facing plot this Sunday morning.",
    notes: "Assigned to Mahbubnagar sales desk. Initial WhatsApp greeting pending."
  },
  {
    id: "lead-1002",
    name: "Sunitha Rao",
    phone: "+91 94401 67890",
    email: "sunitha.rao@example.com",
    interest: "The Bluebell Luxury Apartments",
    propertyRef: "NE-A102",
    status: "Site Visit Scheduled",
    date: "2026-10-31 03:45 PM",
    message: "Looking for 2 BHK flat with covered parking. Need loan eligibility guidance.",
    notes: "Site visit confirmed for Saturday 4 PM at New Town. Sent digital brochure."
  },
  {
    id: "lead-1003",
    name: "Mohammed Farooq",
    phone: "+91 99890 54321",
    email: "m.farooq@example.com",
    interest: "NOVA Signature Royal Villa",
    propertyRef: "NE-V103",
    status: "Contacted",
    date: "2026-10-30 11:20 AM",
    message: "Please share price negotiation options and floor plans for Yenugonda villa.",
    notes: "Discussed on phone. Customer requested payment milestone schedule."
  }
];

// 5. DATA STORE HELPER (Local Storage Management)
const NovaStore = {
  // Storage Keys
  PROPERTIES_KEY: "novaProperties_v2",
  LEADS_KEY: "novaLeads",
  CONFIG_KEY: "novaConfig_v2",

  // Initialize or fetch Config
  getConfig() {
    try {
      const saved = localStorage.getItem(this.CONFIG_KEY);
      if (saved) {
        return { ...NOVA_CONFIG, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn("Could not load config from localStorage", e);
    }
    return { ...NOVA_CONFIG };
  },

  saveConfig(newConfig) {
    try {
      const current = this.getConfig();
      const updated = { ...current, ...newConfig };
      localStorage.setItem(this.CONFIG_KEY, JSON.stringify(updated));
      return updated;
    } catch (e) {
      console.error("Error saving config", e);
      return NOVA_CONFIG;
    }
  },

  // Initialize or fetch Properties
  getProperties() {
    try {
      const saved = localStorage.getItem(this.PROPERTIES_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn("Could not load properties from localStorage", e);
    }
    // Seed default properties if not present
    this.resetProperties();
    return DEFAULT_PROPERTIES;
  },

  getPropertyById(id) {
    const list = this.getProperties();
    return list.find(p => String(p.id) === String(id) || p.refCode === String(id)) || null;
  },

  saveProperty(prop) {
    const list = this.getProperties();
    if (prop.id) {
      // Update existing
      const index = list.findIndex(p => String(p.id) === String(prop.id));
      if (index !== -1) {
        list[index] = { ...list[index], ...prop };
      } else {
        list.push(prop);
      }
    } else {
      // Add new
      const maxId = list.reduce((max, p) => Math.max(max, Number(p.id) || 0), 0);
      const newId = maxId + 1;
      const typeCode = prop.type === "Plot" ? "P" : prop.type === "Villa" ? "V" : "A";
      const refCode = `NE-${typeCode}${100 + newId}`;
      const newProp = {
        ...prop,
        id: newId,
        refCode: prop.refCode || refCode,
        priceLabel: prop.priceLabel || this.formatINR(prop.price),
        gallery: prop.gallery && prop.gallery.length ? prop.gallery : [prop.img || DEFAULT_PROPERTIES[0].img]
      };
      list.unshift(newProp);
    }
    localStorage.setItem(this.PROPERTIES_KEY, JSON.stringify(list));
    return list;
  },

  deleteProperty(id) {
    let list = this.getProperties();
    list = list.filter(p => String(p.id) !== String(id));
    localStorage.setItem(this.PROPERTIES_KEY, JSON.stringify(list));
    return list;
  },

  togglePropertyStatus(id, newStatus) {
    const list = this.getProperties();
    const prop = list.find(p => String(p.id) === String(id));
    if (prop) {
      prop.status = newStatus;
      localStorage.setItem(this.PROPERTIES_KEY, JSON.stringify(list));
    }
    return list;
  },

  resetProperties() {
    try {
      localStorage.setItem(this.PROPERTIES_KEY, JSON.stringify(DEFAULT_PROPERTIES));
    } catch (e) {
      console.error("Failed to seed properties", e);
    }
    return DEFAULT_PROPERTIES;
  },

  // Initialize or fetch Projects
  getProjects() {
    return DEFAULT_PROJECTS;
  },

  // Initialize or fetch Leads
  getLeads() {
    try {
      const saved = localStorage.getItem(this.LEADS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn("Could not load leads from localStorage", e);
    }
    // Seed default demo leads
    localStorage.setItem(this.LEADS_KEY, JSON.stringify(DEFAULT_LEADS));
    return DEFAULT_LEADS;
  },

  addLead(leadData) {
    const leads = this.getLeads();
    const newLead = {
      id: "lead-" + Date.now().toString().slice(-6),
      name: leadData.name || "Anonymous",
      phone: leadData.phone || "",
      email: leadData.email || "",
      interest: leadData.interest || "General Enquiry",
      propertyRef: leadData.propertyRef || "",
      status: "New",
      date: new Date().toLocaleString("en-IN", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      }),
      message: leadData.message || "",
      notes: "Submitted via website enquiry form."
    };
    leads.unshift(newLead);
    localStorage.setItem(this.LEADS_KEY, JSON.stringify(leads));
    return newLead;
  },

  updateLeadStatus(id, status, notes) {
    const leads = this.getLeads();
    const lead = leads.find(l => String(l.id) === String(id));
    if (lead) {
      lead.status = status;
      if (notes !== undefined) lead.notes = notes;
      localStorage.setItem(this.LEADS_KEY, JSON.stringify(leads));
    }
    return leads;
  },

  deleteLead(id) {
    let leads = this.getLeads();
    leads = leads.filter(l => String(l.id) !== String(id));
    localStorage.setItem(this.LEADS_KEY, JSON.stringify(leads));
    return leads;
  },

  clearLeads() {
    localStorage.removeItem(this.LEADS_KEY);
    return [];
  },

  // Formatting Utilities
  formatINR(amount) {
    const num = Number(amount) || 0;
    if (num >= 10000000) {
      const cr = (num / 10000000).toFixed(2);
      return `₹${cr.replace(/\.00$/, "")} Crore`;
    }
    if (num >= 100000) {
      const lk = (num / 100000).toFixed(2);
      return `₹${lk.replace(/\.00$/, "")} Lakhs`;
    }
    return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(num);
  },

  // Configurable WhatsApp Link Builder
  getWhatsAppUrl(customMessage = "") {
    const config = this.getConfig();
    const phone = config.whatsappNumber.replace(/[^0-9]/g, "");
    const defaultMsg = `Hello NOVA ESTATES, I would like to enquire about properties in Mahbubnagar.`;
    const msg = customMessage || defaultMsg;
    return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
  },

  getPropertyWhatsAppUrl(property) {
    const config = this.getConfig();
    const phone = config.whatsappNumber.replace(/[^0-9]/g, "");
    const msg = `Hello NOVA ESTATES, I am interested in ${property.name} (Ref: ${property.refCode || '#' + property.id}, ${property.priceLabel}) in ${property.loc}, Mahbubnagar. Please share more details and arrange a site visit.`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
  }
};

// Export to window
if (typeof window !== "undefined") {
  window.NOVA_CONFIG = NOVA_CONFIG;
  window.NovaStore = NovaStore;
}
