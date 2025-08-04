// Sample Tools Data
const tools = [
  {
    id: 1,
    name: "Blog Post Generator",
    category: "writing",
    description: "Create SEO-friendly blog posts in seconds",
    icon: "fa-blog"
  },
  {
    id: 2,
    name: "Instagram Captions",
    category: "social",
    description: "Generate catchy captions for your posts",
    icon: "fa-instagram"
  },
  // Add more tools...
];

// DOM Elements
const toolsContainer = document.querySelector('.tools-container');
const categoryBtns = document.querySelectorAll('.category-btn');
const modal = document.getElementById('toolModal');
const closeBtn = document.querySelector('.close');
const generateBtn = document.getElementById('generateBtn');
const userInput = document.getElementById('userInput');
const outputContainer = document.getElementById('outputContainer');

// Initialize the page
function init() {
  renderTools('all');
  setupEventListeners();
}

// Render tools based on category
function renderTools(category) {
  toolsContainer.innerHTML = '';
  
  const filteredTools = category === 'all' 
    ? tools 
    : tools.filter(tool => tool.category === category);
  
  filteredTools.forEach(tool => {
    const toolCard = document.createElement('div');
    toolCard.className = 'tool-card';
    toolCard.innerHTML = `
      <i class="fas ${tool.icon}"></i>
      <h3>${tool.name}</h3>
      <p>${tool.description}</p>
    `;
    toolCard.addEventListener('click', () => openToolModal(tool));
    toolsContainer.appendChild(toolCard);
  });
}

// Open modal with selected tool
function openToolModal(tool) {
  document.getElementById('modalTitle').textContent = tool.name;
  modal.style.display = 'block';
}

// Close modal
function closeModal() {
  modal.style.display = 'none';
  userInput.value = '';
  outputContainer.innerHTML = '';
}

// Simulate AI generation (in a real app, you'd call an API)
function generateContent() {
  const prompt = userInput.value;
  if (!prompt) return;
  
  outputContainer.innerHTML = '<p>Generating... <i class="fas fa-spinner fa-spin"></i></p>';
  
  // Simulate API delay
  setTimeout(() => {
    // This is where you'd normally call OpenAI API
    const generatedText = `
      <h3>Generated ${document.getElementById('modalTitle').textContent}</h3>
      <p>Here is your content about: <strong>${prompt}</strong></p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris...</p>
    `;
    outputContainer.innerHTML = generatedText;
  }, 2000);
}

// Event listeners
function setupEventListeners() {
  // Category filters
  categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      categoryBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderTools(btn.dataset.category);
    });
  });
  
  // Modal controls
  closeBtn.addEventListener('click', closeModal);
  window.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  
  // Generate button
  generateBtn.addEventListener('click', generateContent);
}

// Initialize the app
document.addEventListener('DOMContentLoaded', init);