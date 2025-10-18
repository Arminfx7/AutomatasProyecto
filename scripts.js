
const FIXED_REGEX = "^((0|1|2|3|4|5|6|7|8|9)(0|1|2|3|4|5|6|7|8|9)*\\.|((B|C|D|F|G|H|I|J|K|L|Ll|M|N|Ñ|P|Q|R|S|T|U|V|W|X|Y|Z)(a|e|i|o|u|,|;|:|b|c|d|e|f|g|h|j|k|l|m|n|ñ|o|p|q|r|s|t|v|w|x|y|z)|(E|O)(a|b|c|d|e|f|g|h|i|j|k|l|m|n|ñ|o|p|q|r|s|t|u|v|w|x|y|z|,|;|:)|A(u|i)|I(a|u)|U(a|i)|U|A|I)((b|c|d|e|f|g|h|j|k|l|m|n|ñ|o|p|q|r|s|t|v|w|x|y|z|,|;|:)(a|e|i|o|u|,|;|:)|(ua|ui|au|ai|ia|iu|b|c|d|e|f|g|h|j|k|l|m|n|ñ|o|p|q|r|s|t|v|w|x|y|z|,|;|:))*\\.)$";


let validationHistory = [];
let acceptedCount = 0;
let rejectedCount = 0;




document.getElementById('inputString').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        validateInput();
    }
});

// Enfocar el input al cargar
window.onload = function() {
    document.getElementById('inputString').focus();
};



function validateInput() {
    const input = document.getElementById('inputString').value;
    
    if (input.trim() === '') {
        return;
    }

    try {
        const regex = new RegExp(FIXED_REGEX);
        const isMatch = regex.test(input);
        
        addToHistory(input, isMatch);
        updateStats();
        
        // Limpiar input después de validar
        document.getElementById('inputString').value = '';
        document.getElementById('inputString').focus();
    } catch (e) {
        console.error('Error en la expresión regular:', e);
    }
}

function addToHistory(input, accepted) {
    validationHistory.unshift({ input, accepted });
    
    if (accepted) {
        acceptedCount++;
    } else {
        rejectedCount++;
    }
    
    renderHistory();
}

function renderHistory() {
    const resultsSection = document.getElementById('resultsSection');
    
    if (validationHistory.length === 0) {
        resultsSection.innerHTML = '<div class="no-results">Sin resultados aún...</div>';
        return;
    }
    
    resultsSection.innerHTML = validationHistory.map(item => `
        <div class="result-item ${item.accepted ? 'accepted' : 'rejected'}">
            <div class="result-input">${escapeHtml(item.input)}</div>
            <div class="result-status ${item.accepted ? 'accepted' : 'rejected'}">
                ${item.accepted ? '✓ Accept' : '✗ Reject'}
            </div>
        </div>
    `).join('');
}

function updateStats() {
    document.getElementById('totalCount').textContent = validationHistory.length;
    document.getElementById('acceptedCount').textContent = acceptedCount;
    document.getElementById('rejectedCount').textContent = rejectedCount;
}



function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function clearInput() {
    document.getElementById('inputString').value = '';
    document.getElementById('inputString').focus();
}

function clearHistory() {
    validationHistory = [];
    acceptedCount = 0;
    rejectedCount = 0;
    renderHistory();
    updateStats();
}
