/* =====================
   FINTRACK AI - SHARED JS
   ===================== */

// ===================== SIDEBAR ACTIVE STATE =====================
function setActiveNav() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.sidebar nav a').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === page) {
      link.classList.add('active');
    }
  });
}

// ===================== TOAST NOTIFICATIONS =====================
function showToast(message, type = 'success') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const icons = { success: '✅', error: '❌', info: 'ℹ️' };
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${icons[type] || '✅'}</span> ${message}`;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
    toast.style.transition = 'all 0.3s';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ===================== MODAL =====================
function openModal(id) {
  const overlay = document.getElementById(id);
  if (overlay) overlay.classList.add('open');
}

function closeModal(id) {
  const overlay = document.getElementById(id);
  if (overlay) overlay.classList.remove('open');
}

// Close modal on overlay click
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('open');
  }
});

// ===================== LOCAL STORAGE HELPERS =====================
const Store = {
  get(key, fallback = null) {
    try {
      const data = localStorage.getItem('fintrack_' + key);
      return data ? JSON.parse(data) : fallback;
    } catch { return fallback; }
  },
  set(key, value) {
    localStorage.setItem('fintrack_' + key, JSON.stringify(value));
  }
};

// ===================== DEFAULT DATA =====================
function initData() {
  if (!Store.get('transactions')) {
    Store.set('transactions', [
      { id: 1, name: 'Pocket Money', category: 'income', amount: 8000, date: '2024-09-01', emoji: '💰' },
      { id: 2, name: 'Canteen Lunch', category: 'food', amount: -120, date: '2024-09-02', emoji: '🍔' },
      { id: 3, name: 'AutoRickshaw', category: 'travel', amount: -80, date: '2024-09-03', emoji: '🛺' },
      { id: 4, name: 'Physics Book', category: 'education', amount: -650, date: '2024-09-04', emoji: '📚' },
      { id: 5, name: 'Zomato Order', category: 'food', amount: -340, date: '2024-09-05', emoji: '🍕' },
      { id: 6, name: 'Netflix Split', category: 'subscription', amount: -199, date: '2024-09-05', emoji: '🎬' },
      { id: 7, name: 'Bus Pass', category: 'travel', amount: -300, date: '2024-09-06', emoji: '🚌' },
      { id: 8, name: 'Gaming Cafe', category: 'fun', amount: -250, date: '2024-09-07', emoji: '🎮' },
      { id: 9, name: 'Stationery', category: 'education', amount: -180, date: '2024-09-07', emoji: '✏️' },
      { id: 10, name: 'Canteen Tea', category: 'food', amount: -20, date: '2024-09-08', emoji: '☕' }
    ]);
  }

  if (!Store.get('goals')) {
    Store.set('goals', [
      { id: 1, name: 'Gaming Mouse', emoji: '🖱️', target: 3500, saved: 1200, color: 'blue', deadline: '2024-12-01' },
      { id: 2, name: 'Laptop Bag', emoji: '🎒', target: 1500, saved: 900, color: 'green', deadline: '2024-10-15' },
      { id: 3, name: 'Goa Trip', emoji: '🏖️', target: 8000, saved: 2500, color: 'purple', deadline: '2025-01-01' },
      { id: 4, name: 'Mechanical Keyboard', emoji: '⌨️', target: 5000, saved: 500, color: 'orange', deadline: '2025-02-01' }
    ]);
  }

  if (!Store.get('budgets')) {
    Store.set('budgets', {
      food: { limit: 2000, spent: 480 },
      travel: { limit: 1000, spent: 380 },
      education: { limit: 1500, spent: 830 },
      fun: { limit: 800, spent: 250 },
      subscription: { limit: 500, spent: 199 },
      other: { limit: 500, spent: 0 }
    });
  }

  if (!Store.get('profile')) {
    Store.set('profile', {
      name: 'Dhruv Sharma',
      course: 'B.Tech CSE',
      college: 'SGVU Jaipur',
      year: '2nd Year',
      income: 8000,
      avatar: 'https://i.pravatar.cc/150?img=12'
    });
  }
}

// ===================== COMPUTED STATS =====================
function getStats() {
  const txns = Store.get('transactions', []);
  const income = txns.filter(t => t.amount > 0).reduce((s, t) => s + t.amount, 0);
  const expense = txns.filter(t => t.amount < 0).reduce((s, t) => s + Math.abs(t.amount), 0);
  const balance = income - expense;
  const ratio = income > 0 ? (balance / income) * 100 : 50;
  const score = Math.min(100, Math.round(50 + ratio * 0.5));
  return { income, expense, balance, score };
}

// ===================== RENDER SIDEBAR =====================
function renderSidebar() {
  const profile = Store.get('profile', {});
  const page = window.location.pathname.split('/').pop() || 'index.html';

  const navItems = [
    { href: 'index.html', icon: '📊', label: 'Dashboard' },
    { href: 'analytics.html', icon: '📈', label: 'Analytics' },
    { href: 'budget.html', icon: '💼', label: 'Budget' },
    { href: 'goals.html', icon: '🎯', label: 'Goals' },
    { href: 'ai-chat.html', icon: '🤖', label: 'AI Coach' },
    { href: 'profile.html', icon: '👤', label: 'Profile' }
  ];

  const sidebarHTML = `
    <div class="sidebar-logo">
      <div class="logo-icon">💰</div>
      <div>
        <h2>FinTrack</h2>
        <span>AI Student Finance</span>
      </div>
    </div>
    <nav>
      <div class="nav-label">Main Menu</div>
      ${navItems.map(item => `
        <a href="${item.href}" class="${item.href === page ? 'active' : ''}">
          <span class="icon">${item.icon}</span>
          ${item.label}
        </a>
      `).join('')}
    </nav>
    <div class="sidebar-footer">
      <img src="${profile.avatar || 'https://i.pravatar.cc/150?img=12'}" alt="Avatar">
      <div class="user-info">
        <p>${profile.name || 'Dhruv Sharma'}</p>
        <span>${profile.course || 'B.Tech CSE'}</span>
      </div>
    </div>
  `;

  const sidebar = document.querySelector('.sidebar');
  if (sidebar) sidebar.innerHTML = sidebarHTML;
}

// ===================== DASHBOARD PAGE =====================
function initDashboard() {
  const stats = getStats();
  const txns = Store.get('transactions', []);
  const profile = Store.get('profile', {});

  // Update header
  const nameEl = document.getElementById('welcome-name');
  if (nameEl) nameEl.textContent = `Hello, ${profile.name?.split(' ')[0] || 'Dhruv'} 👋`;

  // Update stat cards
  const els = {
    income: document.getElementById('stat-income'),
    expense: document.getElementById('stat-expense'),
    balance: document.getElementById('stat-balance'),
    score: document.getElementById('stat-score')
  };
  if (els.income) els.income.textContent = '₹' + stats.income.toLocaleString('en-IN');
  if (els.expense) els.expense.textContent = '₹' + stats.expense.toLocaleString('en-IN');
  if (els.balance) els.balance.textContent = '₹' + stats.balance.toLocaleString('en-IN');
  if (els.score) els.score.textContent = stats.score + '/100';

  // Update health circle
  const circle = document.querySelector('.health-circle');
  if (circle) {
    circle.style.background = `conic-gradient(var(--green) ${stats.score}%, #1a2f45 0)`;
    document.querySelector('.health-circle-val').textContent = stats.score;
  }

  const scoreLabel = document.querySelector('.health-label');
  if (scoreLabel) {
    scoreLabel.textContent = stats.score >= 80 ? '🔥 Excellent!' : stats.score >= 60 ? '👍 Good' : '⚠️ Needs Attention';
  }

  // Render recent transactions
  const tbody = document.getElementById('txn-tbody');
  if (tbody) {
    const recent = [...txns].reverse().slice(0, 6);
    tbody.innerHTML = recent.map(t => {
      const badgeClass = {
        food: 'badge-food', travel: 'badge-travel', subscription: 'badge-sub',
        income: 'badge-income', education: 'badge-edu', fun: 'badge-fun'
      }[t.category] || 'badge-food';
      return `
        <tr>
          <td>
            <div class="txn-name">
              <div class="txn-emoji">${t.emoji || '💸'}</div>
              <div>
                <div class="txn-title">${t.name}</div>
                <div class="txn-date">${t.date}</div>
              </div>
            </div>
          </td>
          <td><span class="badge ${badgeClass}">${t.category}</span></td>
          <td class="${t.amount > 0 ? 'amount-green' : 'amount-red'}">
            ${t.amount > 0 ? '+' : ''}₹${Math.abs(t.amount)}
          </td>
        </tr>`;
    }).join('');
  }

  // Chart
  initDashboardChart(txns);
}

function initDashboardChart(txns) {
  const ctx = document.getElementById('expenseChart');
  if (!ctx) return;

  const categories = ['food', 'travel', 'education', 'fun', 'subscription'];
  const labels = ['🍔 Food', '🚌 Travel', '📚 Books', '🎮 Fun', '📺 Subs'];
  const data = categories.map(cat =>
    txns.filter(t => t.category === cat).reduce((s, t) => s + Math.abs(t.amount), 0)
  );

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        data,
        backgroundColor: ['#00e676', '#38bdf8', '#8b5cf6', '#f59e0b', '#ff5252'],
        borderRadius: 10,
        borderSkipped: false
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { ticks: { color: '#7a96b0', font: { family: 'Poppins', size: 12 } }, grid: { display: false }, border: { display: false } },
        y: { ticks: { color: '#7a96b0', callback: v => '₹' + v, font: { family: 'Poppins', size: 11 } }, grid: { color: 'rgba(255,255,255,0.04)' }, border: { display: false } }
      }
    }
  });
}

// ===================== ADD TRANSACTION =====================
function addTransaction(e) {
  e.preventDefault();
  const name = document.getElementById('txn-name-input').value.trim();
  const amount = parseFloat(document.getElementById('txn-amount').value);
  const category = document.getElementById('txn-category').value;
  const type = document.getElementById('txn-type').value;
  const date = document.getElementById('txn-date').value;

  if (!name || !amount || !category || !date) {
    showToast('Please fill all fields!', 'error');
    return;
  }

  const emojis = { food: '🍔', travel: '🚌', education: '📚', fun: '🎮', subscription: '📺', income: '💰', other: '💸' };
  const txns = Store.get('transactions', []);
  const newTxn = {
    id: Date.now(),
    name,
    category: type === 'income' ? 'income' : category,
    amount: type === 'income' ? Math.abs(amount) : -Math.abs(amount),
    date,
    emoji: emojis[type === 'income' ? 'income' : category] || '💸'
  };

  txns.push(newTxn);
  Store.set('transactions', txns);

  // Update budget spending
  if (type === 'expense') {
    const budgets = Store.get('budgets', {});
    if (budgets[category]) {
      budgets[category].spent += Math.abs(amount);
      Store.set('budgets', budgets);
    }
  }

  closeModal('add-txn-modal');
  showToast(`Transaction "${name}" added!`);
  setTimeout(() => initDashboard(), 300);
}

// ===================== ANALYTICS PAGE =====================
function initAnalytics() {
  const txns = Store.get('transactions', []);
  const stats = getStats();

  // Mini stats
  const miniStats = {
    'mini-income': stats.income,
    'mini-expense': stats.expense,
    'mini-balance': stats.balance
  };
  Object.entries(miniStats).forEach(([id, val]) => {
    const el = document.getElementById(id);
    if (el) el.textContent = '₹' + val.toLocaleString('en-IN');
  });

  // Doughnut chart
  const dCtx = document.getElementById('doughnutChart');
  if (dCtx) {
    const categories = ['food', 'travel', 'education', 'fun', 'subscription'];
    const labels = ['Food', 'Travel', 'Books', 'Fun', 'Subscriptions'];
    const data = categories.map(cat =>
      txns.filter(t => t.category === cat).reduce((s, t) => s + Math.abs(t.amount), 0)
    );
    new Chart(dCtx, {
      type: 'doughnut',
      data: {
        labels,
        datasets: [{ data, backgroundColor: ['#00e676', '#38bdf8', '#8b5cf6', '#f59e0b', '#ff5252'], borderWidth: 0, hoverOffset: 8 }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom', labels: { color: '#7a96b0', font: { family: 'Poppins', size: 12 }, padding: 16, usePointStyle: true } }
        },
        cutout: '70%'
      }
    });
  }

  // Trend line chart
  const lCtx = document.getElementById('lineChart');
  if (lCtx) {
    new Chart(lCtx, {
      type: 'line',
      data: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [
          {
            label: 'Spending',
            data: [850, 1200, 980, 1420],
            borderColor: '#ff5252',
            backgroundColor: 'rgba(255,82,82,0.08)',
            borderWidth: 2.5,
            pointRadius: 5,
            pointBackgroundColor: '#ff5252',
            fill: true,
            tension: 0.4
          },
          {
            label: 'Budget',
            data: [2000, 2000, 2000, 2000],
            borderColor: '#38bdf8',
            borderDash: [6, 4],
            borderWidth: 2,
            pointRadius: 0,
            fill: false,
            tension: 0
          }
        ]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { labels: { color: '#7a96b0', font: { family: 'Poppins', size: 12 }, usePointStyle: true } } },
        scales: {
          x: { ticks: { color: '#7a96b0', font: { family: 'Poppins' } }, grid: { color: 'rgba(255,255,255,0.04)' }, border: { display: false } },
          y: { ticks: { color: '#7a96b0', callback: v => '₹' + v, font: { family: 'Poppins' } }, grid: { color: 'rgba(255,255,255,0.04)' }, border: { display: false } }
        }
      }
    });
  }
}

// ===================== BUDGET PAGE =====================
function initBudget() {
  const budgets = Store.get('budgets', {});
  const container = document.getElementById('budget-bars');
  if (!container) return;

  const icons = { food: '🍔', travel: '🚌', education: '📚', fun: '🎮', subscription: '📺', other: '💸' };
  const colors = { food: '#00e676', travel: '#38bdf8', education: '#8b5cf6', fun: '#f59e0b', subscription: '#ff5252', other: '#7a96b0' };

  container.innerHTML = Object.entries(budgets).map(([cat, b]) => {
    const pct = Math.min(100, (b.spent / b.limit) * 100);
    const over = b.spent > b.limit;
    return `
      <div class="budget-bar-item">
        <div class="budget-bar-header">
          <span class="cat">${icons[cat] || '💸'} ${cat.charAt(0).toUpperCase() + cat.slice(1)}</span>
          <span class="${over ? 'over' : 'vals'}">₹${b.spent} / ₹${b.limit} ${over ? '⚠️ Over!' : ''}</span>
        </div>
        <div class="budget-track">
          <div class="budget-fill" style="width:${pct}%; background:${over ? '#ff5252' : colors[cat]}"></div>
        </div>
      </div>`;
  }).join('');
}

function saveBudgetLimits(e) {
  e.preventDefault();
  const budgets = Store.get('budgets', {});
  ['food', 'travel', 'education', 'fun', 'subscription', 'other'].forEach(cat => {
    const el = document.getElementById('budget-' + cat);
    if (el && el.value) {
      budgets[cat].limit = parseFloat(el.value);
    }
  });
  Store.set('budgets', budgets);
  closeModal('budget-modal');
  initBudget();
  showToast('Budget limits updated!');
}

// ===================== GOALS PAGE =====================
function initGoals() {
  const goals = Store.get('goals', []);
  const container = document.getElementById('goals-container');
  if (!container) return;

  container.innerHTML = goals.map(g => {
    const pct = Math.min(100, Math.round((g.saved / g.target) * 100));
    return `
      <div class="goal-card ${g.color}">
        <span class="goal-emoji">${g.emoji}</span>
        <div class="goal-name">${g.name}</div>
        <div class="goal-target">🎯 Target: ₹${g.target.toLocaleString('en-IN')} · 📅 ${g.deadline}</div>
        <div class="goal-amount" style="color:var(--${g.color === 'blue' ? 'blue' : g.color === 'green' ? 'green' : g.color === 'purple' ? 'purple' : 'orange'})">₹${g.saved.toLocaleString('en-IN')}</div>
        <div class="goal-percent">${pct}% complete</div>
        <div class="progress-track" style="margin-bottom:16px">
          <div class="progress-fill" style="width:${pct}%; background:${g.color === 'blue' ? 'var(--blue)' : g.color === 'green' ? 'var(--green)' : g.color === 'purple' ? 'var(--purple)' : 'var(--orange)'}"></div>
        </div>
        <button class="btn btn-ghost" style="width:100%; justify-content:center" onclick="addToGoal(${g.id})">+ Add Savings</button>
      </div>`;
  }).join('');
}

function addToGoal(id) {
  const amount = parseFloat(prompt('How much to add to savings? (₹)'));
  if (!amount || isNaN(amount)) return;
  const goals = Store.get('goals', []);
  const goal = goals.find(g => g.id === id);
  if (goal) {
    goal.saved = Math.min(goal.target, goal.saved + amount);
    Store.set('goals', goals);
    initGoals();
    showToast(`₹${amount} added to ${goal.name}!`);
  }
}

function saveGoal(e) {
  e.preventDefault();
  const name = document.getElementById('goal-name').value;
  const emoji = document.getElementById('goal-emoji').value || '🎯';
  const target = parseFloat(document.getElementById('goal-target').value);
  const deadline = document.getElementById('goal-deadline').value;
  const color = document.getElementById('goal-color').value;

  if (!name || !target || !deadline) {
    showToast('Fill all fields!', 'error');
    return;
  }

  const goals = Store.get('goals', []);
  goals.push({ id: Date.now(), name, emoji, target, saved: 0, color, deadline });
  Store.set('goals', goals);
  closeModal('goal-modal');
  initGoals();
  showToast(`Goal "${name}" created!`);
}

// ===================== AI CHAT =====================
const aiResponses = {
  'budget': '📊 Based on your spending, you have ₹4,550 remaining this month. You\'re spending ₹480 on food which is 24% of your ₹2,000 food budget. You\'re doing great! 🎉',
  'food': '🍔 This week you spent ₹480 on food. Your daily average is ₹68. To save more, try limiting Zomato orders to once a week — that alone can save ₹300/month!',
  'save': '💰 You can save faster! Set aside ₹200/day from pocket money. In 30 days, you\'ll save ₹6,000. Avoid impulse canteen buys and cut one Zomato order weekly.',
  'goal': '🎯 Your closest goal is "Laptop Bag" at 60% complete! You need just ₹600 more. At your current savings rate, you\'ll reach it in 18 days.',
  'subscription': '📺 You\'re spending ₹199 on Netflix (split). Check if you can further split it 3-way to bring it down to ₹133/month. That saves ₹66/month = ₹792/year!',
  'travel': '🚌 Your travel spend is ₹380 this month. If you have a bus pass, renew it early — semester passes are 40% cheaper than daily tickets.',
  'pizza': '🍕 Should you order pizza? Your food budget still has ₹1,520 remaining this month. One pizza order (~₹300) is fine, but try to balance with homemade/canteen meals tomorrow!',
  'exam': '📚 Exam mode activated! During exam week, reduce food delivery and fun spending. Allocate more for stationery and printing. You can save ₹800-1200 more this week.',
  'default': '🤖 I understand your question! Based on your financial data: income ₹8,000, expenses ₹3,450, balance ₹4,550, health score 88/100. You\'re doing excellently! Ask me about budget, food, savings, goals, or subscriptions for specific advice.'
};

function getAIResponse(msg) {
  const lower = msg.toLowerCase();
  if (lower.includes('budget') || lower.includes('limit')) return aiResponses.budget;
  if (lower.includes('food') || lower.includes('eat') || lower.includes('canteen')) return aiResponses.food;
  if (lower.includes('save') || lower.includes('saving')) return aiResponses.save;
  if (lower.includes('goal') || lower.includes('laptop') || lower.includes('target')) return aiResponses.goal;
  if (lower.includes('netflix') || lower.includes('subscription') || lower.includes('spotify')) return aiResponses.subscription;
  if (lower.includes('travel') || lower.includes('bus') || lower.includes('auto')) return aiResponses.travel;
  if (lower.includes('pizza') || lower.includes('afford') || lower.includes('order')) return aiResponses.pizza;
  if (lower.includes('exam') || lower.includes('test') || lower.includes('study')) return aiResponses.exam;
  return aiResponses.default;
}

function sendMessage() {
  const input = document.getElementById('chat-input');
  const msg = input?.value.trim();
  if (!msg) return;

  appendMessage(msg, 'user');
  input.value = '';

  setTimeout(() => {
    const response = getAIResponse(msg);
    appendMessage(response, 'bot');
  }, 600);
}

function appendMessage(text, sender) {
  const container = document.getElementById('chat-messages');
  if (!container) return;

  const now = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  const div = document.createElement('div');
  div.className = `msg ${sender === 'user' ? 'user-msg' : 'bot-msg'} fade-in`;
  div.innerHTML = `
    <div class="msg-avatar ${sender === 'user' ? 'usr-avatar' : 'bot-avatar'}">${sender === 'user' ? '👤' : '🤖'}</div>
    <div>
      <div class="msg-bubble">${text}</div>
      <div class="msg-time">${now}</div>
    </div>`;
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

function sendQuickPrompt(msg) {
  const input = document.getElementById('chat-input');
  if (input) { input.value = msg; sendMessage(); }
}

// ===================== LOGIN =====================
function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('login-email')?.value;
  const pass = document.getElementById('login-pass')?.value;

  if (!email || !pass) {
    showToast('Please enter credentials!', 'error');
    return;
  }

  const btn = document.querySelector('.login-btn');
  if (btn) {
    btn.textContent = '⏳ Logging in...';
    btn.disabled = true;
  }

  setTimeout(() => {
    showToast('Welcome to FinTrack AI! 🎉');
    setTimeout(() => window.location.href = 'index.html', 800);
  }, 1200);
}

// ===================== PROFILE =====================
function initProfile() {
  const profile = Store.get('profile', {});
  const stats = getStats();
  const goals = Store.get('goals', []);

  const fields = {
    'profile-name-display': profile.name,
    'profile-tag': profile.course,
    'profile-college': profile.college,
    'profile-year': profile.year,
    'profile-income-stat': '₹' + stats.income.toLocaleString('en-IN'),
    'profile-goals-stat': goals.length,
    'profile-score-stat': stats.score
  };

  Object.entries(fields).forEach(([id, val]) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  });

  const img = document.getElementById('profile-avatar-img');
  if (img) img.src = profile.avatar || 'https://i.pravatar.cc/150?img=12';

  // Fill form
  ['name', 'course', 'college', 'year', 'income'].forEach(field => {
    const el = document.getElementById('edit-' + field);
    if (el) el.value = profile[field] || '';
  });
}

function saveProfile(e) {
  e.preventDefault();
  const profile = Store.get('profile', {});
  ['name', 'course', 'college', 'year', 'income'].forEach(field => {
    const el = document.getElementById('edit-' + field);
    if (el) profile[field] = el.value;
  });
  Store.set('profile', profile);
  initProfile();
  renderSidebar();
  showToast('Profile updated!');
}

// ===================== INIT =====================
document.addEventListener('DOMContentLoaded', () => {
  initData();
  renderSidebar();

  const page = window.location.pathname.split('/').pop() || 'index.html';

  if (page === 'index.html' || page === '') initDashboard();
  else if (page === 'analytics.html') initAnalytics();
  else if (page === 'budget.html') initBudget();
  else if (page === 'goals.html') initGoals();
  else if (page === 'profile.html') initProfile();

  // Chat enter key
  const chatInput = document.getElementById('chat-input');
  if (chatInput) {
    chatInput.addEventListener('keydown', e => {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
    });
  }

  // Login form
  const loginForm = document.getElementById('login-form');
  if (loginForm) loginForm.addEventListener('submit', handleLogin);

  // Add txn form
  const txnForm = document.getElementById('txn-form');
  if (txnForm) txnForm.addEventListener('submit', addTransaction);

  // Budget form
  const budgetForm = document.getElementById('budget-form');
  if (budgetForm) budgetForm.addEventListener('submit', saveBudgetLimits);

  // Goal form
  const goalForm = document.getElementById('goal-form');
  if (goalForm) goalForm.addEventListener('submit', saveGoal);

  // Profile form
  const profileForm = document.getElementById('profile-form');
  if (profileForm) profileForm.addEventListener('submit', saveProfile);
});