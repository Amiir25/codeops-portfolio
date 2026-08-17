// STATE OBJECT - holds all application data
const state = {
    rates: {},           // exchange rates from API
    selectedCurrency: '', // currently selected currency code (usd, euro)
    amount: 0,           // amount in ETB
    result: '',          // conversion result text
    watchlist: [],       // array of currency codes to watch
    status: 'idle'       // idle, loading, success, error
};

// DOM REFERENCES - cache elements for better performance
const dom = {
    etbInput: document.getElementById('etb-input'),
    currencySelect: document.getElementById('currency'),
    outputArea: document.querySelector('.output-area'),
    watchlistSection: document.querySelector('.watchlist'),
    header: document.querySelector('header')
};

// 1. FETCH RATES FROM API
async function fetchRates() {
    updateStatus('loading', 'Loading exchange rates...');
    
    try {
        const response = await fetch('https://open.er-api.com/v6/latest/ETB');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data && data.rates) {
            state.rates = data.rates;
            updateStatus('success', 'Rates loaded successfully!');
            populateCurrencyDropdown();
            renderWatchlist();
            // If there's a saved currency, select it
            if (state.selectedCurrency) {
                dom.currencySelect.value = state.selectedCurrency;
            }
        } else {
            throw new Error('Invalid data structure from API');
        }
    } catch (error) {
        console.error('Fetch error:', error);
        updateStatus('error', `Failed to load rates: ${error.message}`);
        // Use fallback rates so app still works
        state.rates = {
            USD: 0.017,    // approximate fallback rate
            EUR: 0.016
        };
        populateCurrencyDropdown();
    }
}

// 2. STATUS LINE UPDATES
function updateStatus(type, message) {
    state.status = type;
    
    // Remove existing status line if any
    const existingStatus = document.querySelector('.status-line');
    if (existingStatus) {
        existingStatus.remove();
    }
    
    // Create new status line
    const statusDiv = document.createElement('div');
    statusDiv.className = `status-line status-${type}`;
    statusDiv.textContent = message;
    
    // Insert after header
    dom.header.insertAdjacentElement('afterend', statusDiv);
    
    // Auto-remove success messages after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            const status = document.querySelector('.status-line');
            if (status) status.remove();
        }, 5000);
    }
}

// 3. POPULATE CURRENCY DROPDOWN
function populateCurrencyDropdown() {
    // Clear existing options (keep the first "Select Currency" option)
    dom.currencySelect.innerHTML = '';
    
    // Add default option
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Select Currency';
    dom.currencySelect.appendChild(defaultOption);
    
    // Get available currencies from rates
    const currencies = Object.keys(state.rates);
    
    // Add each currency as an option
    currencies.forEach(code => {
        const option = document.createElement('option');
        option.value = code;
        // Display currency code and rate
        const rate = state.rates[code];
        option.textContent = `${code} (1 ETB = ${rate.toFixed(4)} ${code})`;
        dom.currencySelect.appendChild(option);
    });
}

// 4. CONVERT CURRENCY
function convertCurrency() {
    // Get amount
    const amountValue = dom.etbInput.value.trim();
    if (amountValue === '') {
        dom.outputArea.innerHTML = '<p class="error">Please enter an amount</p>';
        return;
    }
    
    const amount = parseFloat(amountValue);
    if (isNaN(amount) || amount <= 0) {
        dom.outputArea.innerHTML = '<p class="error">Please enter a valid positive number</p>';
        return;
    }
    
    // Get selected currency
    const currencyCode = dom.currencySelect.value;
    if (!currencyCode) {
        dom.outputArea.innerHTML = '<p class="error">Please select a currency</p>';
        return;
    }
    
    // Check if rate exists
    if (!state.rates[currencyCode]) {
        dom.outputArea.innerHTML = `<p class="error">Rate for ${currencyCode} not available</p>`;
        return;
    }
    
    // Perform conversion
    const rate = state.rates[currencyCode];
    const convertedAmount = amount * rate;
    
    // Store in state
    state.amount = amount;
    state.selectedCurrency = currencyCode;
    state.result = convertedAmount;
    
    // Display result
    dom.outputArea.innerHTML = `
        <div class="conversion-result">
            <p><strong>${amount.toFixed(2)} ETB</strong> = 
            <strong>${convertedAmount.toFixed(4)} ${currencyCode}</strong></p>
            <p class="rate-info">Exchange rate: 1 ETB = ${rate.toFixed(6)} ${currencyCode}</p>
        </div>
    `;
    
    // Save state to localStorage
    saveToLocalStorage();
}

// 5. WATCHLIST FUNCTIONS
function addToWatchlist() {
    const currencyCode = dom.currencySelect.value;
    
    if (!currencyCode) {
        updateStatus('error', 'Please select a currency first');
        return;
    }
    
    // Check for duplicates
    if (state.watchlist.includes(currencyCode)) {
        updateStatus('error', `${currencyCode} is already in your watchlist`);
        return;
    }
    
    // Add to watchlist
    state.watchlist.push(currencyCode);
    renderWatchlist();
    saveToLocalStorage();
    updateStatus('success', `${currencyCode} added to watchlist!`);
}

function removeFromWatchlist(currencyCode) {
    state.watchlist = state.watchlist.filter(code => code !== currencyCode);
    renderWatchlist();
    saveToLocalStorage();
    updateStatus('success', `${currencyCode} removed from watchlist`);
}

function renderWatchlist() {
    const watchlistContainer = dom.watchlistSection;
    
    if (state.watchlist.length === 0) {
        watchlistContainer.innerHTML = `
            <h3>📋 Watchlist</h3>
            <p class="empty-watchlist">No currencies in watchlist. Add one above!</p>
        `;
        return;
    }
    
    // Build watchlist HTML
    let html = '<h3>📋 Watchlist</h3><ul class="watchlist-items">';
    
    state.watchlist.forEach(code => {
        const rate = state.rates[code] || 'N/A';
        const rateDisplay = typeof rate === 'number' ? rate.toFixed(6) : rate;
        html += `
            <li class="watchlist-item">
                <span class="currency-code">${code}</span>
                <span class="currency-rate">1 ETB = ${rateDisplay} ${code}</span>
                <button class="remove-btn" data-currency="${code}">✕</button>
            </li>
        `;
    });
    
    html += '</ul>';
    watchlistContainer.innerHTML = html;
    
    // Add event listeners for remove buttons using delegation
    watchlistContainer.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const currency = this.getAttribute('data-currency');
            removeFromWatchlist(currency);
        });
    });
}

// 6. LOCALSTORAGE FUNCTIONS
function saveToLocalStorage() {
    try {
        const dataToSave = {
            watchlist: state.watchlist,
            selectedCurrency: state.selectedCurrency,
            amount: state.amount,
            result: state.result
        };
        localStorage.setItem('birrwatch_data', JSON.stringify(dataToSave));
    } catch (error) {
        console.warn('Could not save to localStorage:', error);
    }
}

function loadFromLocalStorage() {
    try {
        const savedData = localStorage.getItem('birrwatch_data');
        if (savedData) {
            const parsed = JSON.parse(savedData);
            
            if (parsed.watchlist && Array.isArray(parsed.watchlist)) {
                state.watchlist = parsed.watchlist;
            }
            
            if (parsed.selectedCurrency) {
                state.selectedCurrency = parsed.selectedCurrency;
            }
            
            if (parsed.amount) {
                state.amount = parsed.amount;
                dom.etbInput.value = parsed.amount;
            }
            
            if (parsed.result) {
                state.result = parsed.result;
            }
        }
    } catch (error) {
        console.warn('Could not load from localStorage:', error);
    }
}

// 7. EVENT LISTENERS
// Convert on button click or Enter key
dom.etbInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        convertCurrency();
    }
});

// Convert when currency changes (optional)
dom.currencySelect.addEventListener('change', function() {
    // Auto-convert if there's an amount
    if (dom.etbInput.value.trim() !== '' && this.value !== '') {
        convertCurrency();
    }
});

// Add watchlist button (created dynamically)
function createWatchlistControls() {
    const inputArea = document.querySelector('.input-area');
    
    // Create watchlist button
    const watchlistBtn = document.createElement('button');
    watchlistBtn.id = 'add-watchlist-btn';
    watchlistBtn.textContent = '⭐ Add to Watchlist';
    watchlistBtn.className = 'watchlist-btn';
    watchlistBtn.addEventListener('click', addToWatchlist);
    
    // Create convert button if it doesn't exist
    if (!document.getElementById('convert-btn')) {
        const convertBtn = document.createElement('button');
        convertBtn.id = 'convert-btn';
        convertBtn.textContent = '🔄 Convert';
        convertBtn.className = 'convert-btn';
        convertBtn.addEventListener('click', convertCurrency);
        
        // Add buttons to input area
        const btnContainer = document.createElement('div');
        btnContainer.className = 'button-container';
        btnContainer.appendChild(convertBtn);
        btnContainer.appendChild(watchlistBtn);
        inputArea.appendChild(btnContainer);
    } else {
        // If convert button exists, just add watchlist button next to it
        const convertBtn = document.getElementById('convert-btn');
        convertBtn.parentNode.appendChild(watchlistBtn);
    }
}

// 8. INITIALIZATION - START THE APP
async function init() {
    console.log('🚀 BirrWatch starting up...');
    
    // Load saved data from localStorage
    loadFromLocalStorage();
    
    // Create control buttons
    createWatchlistControls();
    
    // Fetch rates from API
    await fetchRates();
    
    // If there was a saved currency and amount, perform conversion
    if (state.selectedCurrency && state.amount) {
        dom.currencySelect.value = state.selectedCurrency;
        // Small delay to ensure DOM is ready
        setTimeout(convertCurrency, 100);
    }
    
    console.log('✅ BirrWatch ready!');
}

// Start the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);


// dynamic style
function injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .status-line {
            padding: 10px;
            margin: 10px 0;
            border-radius: 5px;
            text-align: center;
            font-weight: bold;
        }
        .status-loading { background: #fff3cd; color: #856404; }
        .status-success { background: #d4edda; color: #155724; }
        .status-error { background: #f8d7da; color: #721c24; }
        .output-area {
            min-height: 60px;
            padding: 10px;
            margin: 10px 0;
        }
        .conversion-result {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 5px;
            border-left: 4px solid #007bff;
        }
        .conversion-result p { margin: 5px 0; }
        .rate-info { font-size: 0.9em; color: #6c757d; }
        .error { color: #dc3545; font-weight: bold; }
        .watchlist-items {
            list-style: none;
            padding: 0;
        }
        .watchlist-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px;
            margin: 5px 0;
            background: #f8f9fa;
            border-radius: 5px;
            border: 1px solid #e9ecef;
        }
        .watchlist-item .currency-code {
            font-weight: bold;
            min-width: 50px;
        }
        .watchlist-item .currency-rate {
            flex: 1;
            margin: 0 10px;
        }
        .remove-btn {
            background: #dc3545;
            color: white;
            border: none;
            border-radius: 50%;
            width: 25px;
            height: 25px;
            cursor: pointer;
            font-size: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .remove-btn:hover {
            background: #c82333;
        }
        .empty-watchlist {
            color: #6c757d;
            font-style: italic;
            padding: 10px;
        }
        .button-container {
            display: flex;
            gap: 10px;
            margin-top: 10px;
        }
        .convert-btn, .watchlist-btn {
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-weight: bold;
            transition: all 0.3s;
        }
        .convert-btn {
            background: #007bff;
            color: white;
        }
        .convert-btn:hover {
            background: #0056b3;
        }
        .watchlist-btn {
            background: #ffc107;
            color: #212529;
        }
        .watchlist-btn:hover {
            background: #e0a800;
        }
        .input-area {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            margin: 10px 0;
        }
        .input-area label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
        }
        .input-area input, .input-area select {
            width: 100%;
            padding: 8px;
            border: 1px solid #ced4da;
            border-radius: 4px;
            margin-bottom: 10px;
        }
        .etb, .other-currency {
            margin-bottom: 10px;
        }
        .watchlist {
            margin-top: 20px;
            padding: 15px;
            background: white;
            border-radius: 8px;
            border: 1px solid #dee2e6;
        }
        .watchlist h3 {
            margin-top: 0;
            color: #343a40;
            border-bottom: 2px solid #e9ecef;
            padding-bottom: 10px;
        }
    `;
    document.head.appendChild(style);
}

// Inject styles when DOM loads
document.addEventListener('DOMContentLoaded', injectStyles);
