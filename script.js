// Dummy data for demonstration
let tankLevel = 70; // percent
let plants = [
  { id: 1, name: "Tree 1", moisture: 45 },
  { id: 2, name: "Tree 2", moisture: 80 }
];
let notifications = [
  "Low tank water level detected!",
  "Automatic watering started for Tree 1.",
  "Maintenance: Sensor disconnected on Tree 2."
];

// Update tank level UI
function updateTankLevel(level) {
  document.querySelector('.tank-fill').style.width = level + '%';
  document.querySelector('.tank-label').textContent = level + '% Full';
}

// Update plant cards UI
function updatePlants() {
  const plantList = document.querySelector('.plant-list');
  plantList.innerHTML = '';
  plants.forEach(plant => {
    const card = document.createElement('div');
    card.className = 'plant-card';
    card.innerHTML = `
      <h3>${plant.name}</h3>
      <div class="moisture-bar">
        <div class="moisture-fill" style="width: ${plant.moisture}%"></div>
      </div>
      <span class="moisture-label">${plant.moisture}% Moisture</span>
      <button class="water-btn" data-id="${plant.id}">Water Now</button>
    `;
    plantList.appendChild(card);
  });
}

// Handle manual watering
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('water-btn')) {
    const plantId = e.target.getAttribute('data-id');
    sendWateringCommand(plantId);
  }
  if (e.target.id === 'manualWaterBtn') {
    alert('Manual watering started for all plants!');
    addNotification('Manual watering started for all plants.');
  }
});

// Simulate watering command
function sendWateringCommand(plantId) {
  const plant = plants.find(p => p.id == plantId);
  if (plant) {
    addNotification(`Manual watering started for ${plant.name}.`);
    plant.moisture = Math.min(plant.moisture + 30, 100); // Simulate moisture increase
    updatePlants();
  }
}

// Update notifications UI
function updateNotifications() {
  const notifList = document.querySelector('.notifications ul');
  notifList.innerHTML = '';
  notifications.forEach(msg => {
    const li = document.createElement('li');
    li.textContent = msg;
    notifList.appendChild(li);
  });
}

// Add notification
function addNotification(msg) {
  notifications.unshift(msg);
  if (notifications.length > 5) notifications.pop();
  updateNotifications();
}

// Initial UI setup
document.addEventListener('DOMContentLoaded', function() {
  updateTankLevel(tankLevel);
  updatePlants();
  updateNotifications();
});