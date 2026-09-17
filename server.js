const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend static files directly
app.use(express.static(path.join(__dirname)));

const MENU_FILE = path.join(__dirname, 'data', 'menu.json');
const RESERVATIONS_FILE = path.join(__dirname, 'data', 'reservations.json');

// Helper to load JSON
function loadData(file) {
  try {
    if (fs.existsSync(file)) {
      return JSON.parse(fs.readFileSync(file, 'utf8'));
    }
  } catch (err) {
    console.error(`Error reading ${file}:`, err);
  }
  return [];
}

// Helper to save JSON
function saveData(file, data) {
  try {
    const dir = path.dirname(file);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error(`Error writing ${file}:`, err);
  }
}

// --- API ROUTES ---

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    restaurant: 'Sajjad Restaurant — Do Darya, Karachi',
    uptime: process.uptime()
  });
});

// Restaurant Contact Info & Hours
app.get('/api/info', (req, res) => {
  res.json({
    name: 'Sajjad Restaurant',
    location: 'Beach Avenue, Do Darya, Sea View Road, DHA Phase 8 Zone C, Karachi 75500',
    phoneDisplay: '0333 2228111',
    phoneIntl: '923332228111',
    hours: 'Open daily from 5:00 PM till late',
    cuisine: ['Pakistani', 'Barbecue', 'Chinese', 'Seafood', 'Continental']
  });
});

// Get Menu Items (with optional category query ?cat=BBQ)
app.get('/api/menu', (req, res) => {
  let menu = loadData(MENU_FILE);
  const { cat, search } = req.query;

  if (cat && cat !== 'All') {
    menu = menu.filter(item => item.cat.toLowerCase() === cat.toLowerCase());
  }

  if (search) {
    const query = search.toLowerCase();
    menu = menu.filter(item => 
      item.name.toLowerCase().includes(query) || 
      item.desc.toLowerCase().includes(query)
    );
  }

  res.json(menu);
});

// Get Menu Categories
app.get('/api/menu/categories', (req, res) => {
  const menu = loadData(MENU_FILE);
  const categories = ['All', ...new Set(menu.map(item => item.cat))];
  res.json(categories);
});

// Submit Table Reservation
app.post('/api/reservations', (req, res) => {
  const { name, phone, date, time, guests, message } = req.body;

  if (!name || !phone || !date || !time) {
    return res.status(400).json({ error: 'Name, phone, date, and time are required.' });
  }

  const reservations = loadData(RESERVATIONS_FILE);
  const newReservation = {
    id: Date.now(),
    name: name.trim(),
    phone: phone.trim(),
    date,
    time,
    guests: parseInt(guests, 10) || 1,
    message: message ? message.trim() : '',
    createdAt: new Date().toISOString()
  };

  reservations.push(newReservation);
  saveData(RESERVATIONS_FILE, reservations);

  console.log(`[RESERVATION] New booking from ${newReservation.name} (${newReservation.phone}) for ${newReservation.guests} guests on ${newReservation.date} at ${newReservation.time}`);

  res.status(201).json({
    success: true,
    message: 'Table reservation recorded successfully.',
    reservation: newReservation
  });
});

// Get All Reservations (Admin)
app.get('/api/reservations', (req, res) => {
  const reservations = loadData(RESERVATIONS_FILE);
  res.json(reservations);
});

// Fallback to index.html for single-page app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`  Sajjad Restaurant Backend Server Running          `);
  console.log(`  Local URL: http://localhost:${PORT}             `);
  console.log(`  API Menu:  http://localhost:${PORT}/api/menu        `);
  console.log(`  API Health:http://localhost:${PORT}/api/health      `);
  console.log(`====================================================`);
});
