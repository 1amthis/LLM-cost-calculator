// LiteLLM Model Pricing Data - Comprehensive model support
let modelPricing = {};
let isDataLoaded = false;

// Load pricing data from LiteLLM
async function loadPricingData() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/BerriAI/litellm/main/model_prices_and_context_window.json');
        const data = await response.json();
        
        // Parse and filter the data for chat models only
        modelPricing = {};
        
        Object.entries(data).forEach(([modelId, modelData]) => {
            // Only include models with both input and output pricing (chat models)
            if (modelData.input_cost_per_token && modelData.output_cost_per_token && 
                modelData.mode === 'chat') { // Only chat models
                
                // Use litellm_provider field for accurate provider detection
                let provider = 'Unknown';
                const litellmProvider = modelData.litellm_provider?.toLowerCase() || '';
                
                // Map LiteLLM providers to display names
                const providerMap = {
                    'openai': 'OpenAI',
                    'anthropic': 'Anthropic', 
                    'azure': 'Azure',
                    'google': 'Google',
                    'cohere': 'Cohere',
                    'mistral': 'Mistral',
                    'bedrock': 'AWS Bedrock',
                    'vertex_ai': 'Google Vertex',
                    'huggingface': 'Hugging Face',
                    'together_ai': 'Together AI',
                    'groq': 'Groq',
                    'deepinfra': 'DeepInfra',
                    'anyscale': 'Anyscale',
                    'perplexity': 'Perplexity',
                    'fireworks_ai': 'Fireworks',
                    'replicate': 'Replicate'
                };
                
                provider = providerMap[litellmProvider] || 
                          (litellmProvider ? litellmProvider.charAt(0).toUpperCase() + litellmProvider.slice(1) : 'Unknown');
                
                // Convert scientific notation to dollar per million tokens
                const inputCostPer1M = modelData.input_cost_per_token * 1000000;
                const outputCostPer1M = modelData.output_cost_per_token * 1000000;
                
                // Clean up model name
                let displayName = modelId
                    .replace(/^(openai\/|anthropic\/|google\/|cohere\/|mistral\/|azure\/|bedrock\/)/, '')
                    .replace(/-/g, ' ')
                    .replace(/\b\w/g, l => l.toUpperCase());
                
                modelPricing[modelId] = {
                    name: displayName,
                    inputCost: inputCostPer1M,
                    outputCost: outputCostPer1M,
                    provider: provider,
                    maxTokens: modelData.max_tokens || 0,
                    maxInputTokens: modelData.max_input_tokens || modelData.max_tokens || 0,
                    maxOutputTokens: modelData.max_output_tokens || 4096
                };
            }
        });
        
        isDataLoaded = true;
        console.log(`Loaded ${Object.keys(modelPricing).length} models from LiteLLM`);
        
        // Refresh UI after data loads
        if (typeof updateProviderOptions === 'function') {
            updateProviderOptions();
        }
        
    } catch (error) {
        console.error('Failed to load LiteLLM pricing data:', error);
        // Fallback to static data
        loadStaticData();
    }
}

// Fallback static data
function loadStaticData() {
    modelPricing = {
        'gpt-4-turbo': {
            name: 'GPT-4 Turbo',
            inputCost: 10.00,
            outputCost: 30.00,
            provider: 'OpenAI',
            maxTokens: 128000
        },
        'gpt-4o': {
            name: 'GPT-4o',
            inputCost: 3.00,
            outputCost: 10.00,
            provider: 'OpenAI',
            maxTokens: 128000
        },
        'gpt-4o-mini': {
            name: 'GPT-4o Mini',
            inputCost: 0.15,
            outputCost: 0.60,
            provider: 'OpenAI',
            maxTokens: 128000
        },
        'claude-3-5-sonnet-20241022': {
            name: 'Claude 3.5 Sonnet',
            inputCost: 3.00,
            outputCost: 15.00,
            provider: 'Anthropic',
            maxTokens: 200000
        },
        'claude-3-haiku-20240307': {
            name: 'Claude 3 Haiku',
            inputCost: 0.25,
            outputCost: 1.25,
            provider: 'Anthropic',
            maxTokens: 200000
        }
    };
    isDataLoaded = true;
}

let mainChart = null;
let currentProviderFilter = 'all';
let selectedModels = new Set();
let isBudgetMode = false;

// Utility functions
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 6
    }).format(amount);
}

function formatNumber(number) {
    return new Intl.NumberFormat('en-US').format(number);
}

// Get unique providers
function getProviders() {
    const providers = new Set();
    Object.values(modelPricing).forEach(model => providers.add(model.provider));
    return Array.from(providers).sort();
}

// Toggle between Standard and Budget calculation modes
function toggleCalculationMode() {
    const toggle = document.getElementById('modeToggle');
    const standardLabel = document.getElementById('standardModeLabel');
    const budgetLabel = document.getElementById('budgetModeLabel');
    const panelTitle = document.getElementById('panelTitle'); 
    const calculatorPanel = document.querySelector('.calculator-panel');
    const queriesLabel = document.getElementById('queriesLabel');
    const chartTitle = document.getElementById('chartTitle');
    const recommendationsTitle = document.getElementById('recommendationsTitle');
    
    isBudgetMode = toggle.checked;
    
    if (isBudgetMode) {
        // Switch to Budget mode
        calculatorPanel.classList.add('budget-mode');
        standardLabel.classList.remove('active');
        budgetLabel.classList.add('active');
        panelTitle.textContent = 'Budget Parameters';
        queriesLabel.textContent = 'Max Queries (optional):';
        chartTitle.textContent = '📊 Capacity Analysis';
        recommendationsTitle.textContent = '💡 Best Capacity Options';
    } else {
        // Switch to Standard mode
        calculatorPanel.classList.remove('budget-mode');
        budgetLabel.classList.remove('active');
        standardLabel.classList.add('active');
        panelTitle.textContent = 'Query Parameters';
        queriesLabel.textContent = 'Queries:';
        chartTitle.textContent = '📊 Cost Analysis';
        recommendationsTitle.textContent = '💡 Best Options for You';
    }
    
    // Refresh analysis with new mode
    updateAnalysis();
}

// Calculate cost for a single model
function calculateCost(modelId, queries, inputTokens, outputTokens, timeframe) {
    const model = modelPricing[modelId];
    if (!model) {
        throw new Error('Model not found');
    }

    // Calculate cost per query
    const inputCostPerQuery = (inputTokens / 1000000) * model.inputCost;
    const outputCostPerQuery = (outputTokens / 1000000) * model.outputCost;
    const totalCostPerQuery = inputCostPerQuery + outputCostPerQuery;

    // Calculate total queries based on timeframe
    let totalQueries = queries;
    let timeMultiplier = 1;
    
    switch (timeframe) {
        case 'daily':
            timeMultiplier = 1;
            break;
        case 'monthly':
            timeMultiplier = 30;
            break;
        case 'yearly':
            timeMultiplier = 365;
            break;
        case 'single':
        default:
            timeMultiplier = 1;
            break;
    }

    if (timeframe !== 'single') {
        totalQueries = queries * timeMultiplier;
    }

    // Calculate total costs
    const totalInputCost = inputCostPerQuery * totalQueries;
    const totalOutputCost = outputCostPerQuery * totalQueries;
    const totalCost = totalInputCost + totalOutputCost;

    return {
        modelId,
        model: model.name,
        provider: model.provider,
        inputCostPerQuery,
        outputCostPerQuery,
        totalCostPerQuery,
        totalQueries,
        totalInputCost,
        totalOutputCost,
        totalCost,
        totalInputTokens: inputTokens * totalQueries,
        totalOutputTokens: outputTokens * totalQueries,
        timeframe,
        maxTokens: model.maxTokens
    };
}

// Calculate capacity for a single model based on budget (inverse calculation)
function calculateCapacity(modelId, budget, inputTokens, outputTokens, timeframe, maxQueries = null) {
    const model = modelPricing[modelId];
    if (!model) {
        throw new Error('Model not found');
    }

    // Calculate cost per query
    const inputCostPerQuery = (inputTokens / 1000000) * model.inputCost;
    const outputCostPerQuery = (outputTokens / 1000000) * model.outputCost;
    const totalCostPerQuery = inputCostPerQuery + outputCostPerQuery;

    // Get time multiplier
    let timeMultiplier = 1;
    switch (timeframe) {
        case 'daily':
            timeMultiplier = 1;
            break;
        case 'monthly':
            timeMultiplier = 30;
            break;
        case 'yearly':
            timeMultiplier = 365;
            break;
        case 'single':
        default:
            timeMultiplier = 1;
            break;
    }

    // Calculate maximum queries possible with budget
    let maxQueriesWithBudget = Math.floor(budget / totalCostPerQuery);
    
    // If timeframe is not single, divide by time multiplier to get queries per period
    if (timeframe !== 'single') {
        maxQueriesWithBudget = Math.floor(maxQueriesWithBudget / timeMultiplier);
    }
    
    // Apply constraint if maxQueries is specified
    if (maxQueries && maxQueries > 0) {
        maxQueriesWithBudget = Math.min(maxQueriesWithBudget, maxQueries);
    }

    // Calculate actual costs based on the final query count
    let finalTotalQueries = maxQueriesWithBudget;
    if (timeframe !== 'single') {
        finalTotalQueries = maxQueriesWithBudget * timeMultiplier;
    }

    const actualTotalCost = totalCostPerQuery * finalTotalQueries;
    const remainingBudget = budget - actualTotalCost;

    return {
        modelId,
        model: model.name,
        provider: model.provider,
        inputCostPerQuery,
        outputCostPerQuery,
        totalCostPerQuery,
        maxQueries: maxQueriesWithBudget,
        totalQueries: finalTotalQueries,
        actualTotalCost,
        remainingBudget,
        totalInputTokens: inputTokens * finalTotalQueries,
        totalOutputTokens: outputTokens * finalTotalQueries,
        timeframe,
        maxTokens: model.maxTokens,
        budgetUtilization: (actualTotalCost / budget) * 100
    };
}


// Initialize provider filter dropdown
function initializeProviderFilter() {
    const providers = getProviders();
    const providerSelect = document.getElementById('providerFilter');
    
    // Clear existing options except "All Providers"
    providerSelect.innerHTML = '<option value="all">All Providers</option>';
    
    providers.forEach(provider => {
        const option = document.createElement('option');
        option.value = provider;
        option.textContent = provider;
        providerSelect.appendChild(option);
    });
}

// Get filtered models based on current provider filter
function getFilteredModels() {
    if (currentProviderFilter === 'all') {
        return modelPricing;
    }
    
    const filtered = {};
    Object.entries(modelPricing).forEach(([id, model]) => {
        if (model.provider === currentProviderFilter) {
            filtered[id] = model;
        }
    });
    return filtered;
}

// Generate model selector with checkboxes organized by provider
function generateModelSelector() {
    const filteredModels = getFilteredModels();
    const modelsByProvider = {};
    
    // Group models by provider
    Object.entries(filteredModels).forEach(([id, model]) => {
        if (!modelsByProvider[model.provider]) {
            modelsByProvider[model.provider] = [];
        }
        modelsByProvider[model.provider].push({ id, ...model });
    });
    
    const modelSelector = document.getElementById('modelSelector');
    modelSelector.innerHTML = '';
    
    // Create sections for each provider
    Object.entries(modelsByProvider).forEach(([provider, models]) => {
        const providerSection = document.createElement('div');
        providerSection.className = 'provider-section';
        
        // Sort models by total cost
        models.sort((a, b) => (a.inputCost + a.outputCost) - (b.inputCost + b.outputCost));
        
        providerSection.innerHTML = `
            <div class="provider-header">${provider}</div>
            ${models.map(model => `
                <label class="model-checkbox">
                    <input type="checkbox" 
                           value="${model.id}" 
                           onchange="toggleModelSelection('${model.id}')"
                           ${selectedModels.has(model.id) ? 'checked' : ''}>
                    <div class="model-info">
                        <div class="model-name">${model.name}</div>
                        <div class="model-cost">
                            $${model.inputCost.toFixed(2)}/1M in • $${model.outputCost.toFixed(2)}/1M out
                        </div>
                    </div>
                </label>
            `).join('')}
        `;
        
        modelSelector.appendChild(providerSection);
    });
    
    updateSelectedCount();
}

// Toggle model selection
function toggleModelSelection(modelId) {
    if (selectedModels.has(modelId)) {
        selectedModels.delete(modelId);
    } else {
        selectedModels.add(modelId);
    }
    
    updateSelectedCount();
    updateAnalysis();
}

// Update selected models count display
function updateSelectedCount() {
    document.getElementById('selectedCount').textContent = selectedModels.size;
}

// Select all visible models
function selectAllModels() {
    const filteredModels = getFilteredModels();
    Object.keys(filteredModels).forEach(modelId => {
        selectedModels.add(modelId);
    });
    
    // Update checkboxes UI
    document.querySelectorAll('#modelSelector input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = true;
    });
    
    updateSelectedCount();
    updateAnalysis();
}

// Clear all selected models
function selectNoneModels() {
    selectedModels.clear();
    
    // Update checkboxes UI
    document.querySelectorAll('#modelSelector input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
    });
    
    updateSelectedCount();
    updateAnalysis();
}

// Create main analysis chart
function createMainChart() {
    const ctx = document.getElementById('mainChart').getContext('2d');
    
    if (mainChart) {
        mainChart.destroy();
    }
    
    if (selectedModels.size === 0) {
        // Clear chart if no models selected
        return;
    }
    
    const queries = parseInt(document.getElementById('queries').value) || 100;
    const inputTokens = parseInt(document.getElementById('inputTokens').value) || 1000;
    const outputTokens = parseInt(document.getElementById('outputTokens').value) || 100;
    const timeframe = document.getElementById('timeframe').value || 'monthly';
    const budget = parseFloat(document.getElementById('budget').value) || 20.00;
    
    let modelResults = [];
    
    if (isBudgetMode) {
        // Budget mode: Calculate capacities
        const maxQueries = queries > 0 ? queries : null; // Use as constraint if provided
        
        modelResults = Array.from(selectedModels).map(modelId => {
            try {
                const result = calculateCapacity(modelId, budget, inputTokens, outputTokens, timeframe, maxQueries);
                return result;
            } catch (error) {
                return null;
            }
        }).filter(r => r !== null);
        
        if (modelResults.length === 0) return;
        
        // Sort by max queries (descending - most queries first)
        const sortedModels = modelResults.sort((a, b) => b.maxQueries - a.maxQueries);
        
        mainChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: sortedModels.map(m => `${m.model} (${m.provider})`),
                datasets: [{
                    label: 'Requêtes possibles',
                    data: sortedModels.map(m => m.maxQueries),
                    backgroundColor: '#28a745',
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: 'y',
                plugins: {
                    legend: {
                        position: 'top',
                        labels: { font: { size: 11 } }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const model = sortedModels[context.dataIndex];
                                return [
                                    `Requêtes: ${formatNumber(context.parsed.x)}`,
                                    `Coût: ${formatCurrency(model.actualTotalCost)}`,
                                    `Budget restant: ${formatCurrency(model.remainingBudget)}`
                                ];
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return formatNumber(value);
                            }
                        }
                    },
                    y: {
                        ticks: {
                            font: { size: 10 }
                        }
                    }
                }
            }
        });
        
    } else {
        // Standard mode: Calculate costs (original logic)
        modelResults = Array.from(selectedModels).map(modelId => {
            try {
                const result = calculateCost(modelId, queries, inputTokens, outputTokens, timeframe);
                return result;
            } catch (error) {
                return null;
            }
        }).filter(r => r !== null);
        
        if (modelResults.length === 0) return;
        
        // Sort by total cost
        const sortedModels = modelResults.sort((a, b) => a.totalCost - b.totalCost);
        
        mainChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: sortedModels.map(m => `${m.model} (${m.provider})`),
                datasets: [{
                    label: 'Input Cost',
                    data: sortedModels.map(m => m.totalInputCost),
                    backgroundColor: '#6c757d',
                    stack: 'cost'
                }, {
                    label: 'Output Cost', 
                    data: sortedModels.map(m => m.totalOutputCost),
                    backgroundColor: '#495057',
                    stack: 'cost'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: 'y',
                plugins: {
                    legend: {
                        position: 'top',
                        labels: { font: { size: 11 } }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.dataset.label}: ${formatCurrency(context.parsed.x)}`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        stacked: true,
                        ticks: {
                            callback: function(value) {
                                return formatCurrency(value);
                            }
                        }
                    },
                    y: {
                        stacked: true,
                        ticks: {
                            font: { size: 10 }
                        }
                    }
                }
            }
        });
    }
}

// Generate smart recommendations
function generateRecommendations() {
    if (selectedModels.size === 0) {
        document.getElementById('recommendationsContent').innerHTML = '<p>Select some models above to see recommendations.</p>';
        return;
    }
    
    const queries = parseInt(document.getElementById('queries').value) || 100;
    const inputTokens = parseInt(document.getElementById('inputTokens').value) || 1000;
    const outputTokens = parseInt(document.getElementById('outputTokens').value) || 100;
    const timeframe = document.getElementById('timeframe').value || 'monthly';
    const budget = parseFloat(document.getElementById('budget').value) || 20.00;
    
    const recommendationsContainer = document.getElementById('recommendationsContent');
    
    if (isBudgetMode) {
        // Budget mode: Recommend models with highest capacity
        const maxQueries = queries > 0 ? queries : null;
        
        const results = Array.from(selectedModels).map(modelId => {
            try {
                return calculateCapacity(modelId, budget, inputTokens, outputTokens, timeframe, maxQueries);
            } catch (error) {
                return null;
            }
        }).filter(r => r !== null);
        
        if (results.length === 0) {
            recommendationsContainer.innerHTML = '<p>No valid models selected.</p>';
            return;
        }
        
        // Sort by max queries (descending)
        results.sort((a, b) => b.maxQueries - a.maxQueries);
        
        const bestCapacity = results[0];
        const topProviders = {};
        
        // Find best model per provider
        results.forEach(result => {
            if (!topProviders[result.provider] || 
                result.maxQueries > topProviders[result.provider].maxQueries) {
                topProviders[result.provider] = result;
            }
        });
        
        recommendationsContainer.innerHTML = `
            <div class="recommendation-item best">
                <div>
                    <div class="recommendation-label">🚀 Meilleure Capacité</div>
                    <div class="recommendation-model">${bestCapacity.model} (${bestCapacity.provider})</div>
                </div>
                <div>
                    <div class="recommendation-cost">${formatNumber(bestCapacity.maxQueries)} requêtes</div>
                    <div class="recommendation-savings">${formatCurrency(bestCapacity.actualTotalCost)} utilisé</div>
                </div>
            </div>
            
            ${Object.values(topProviders).slice(0, 4).map((result, index) => `
                <div class="recommendation-item">
                    <div>
                        <div class="recommendation-label">${index === 0 ? '🥈' : index === 1 ? '🥉' : '📍'} ${result.provider}</div>
                        <div class="recommendation-model">${result.model}</div>
                    </div>
                    <div>
                        <div class="recommendation-cost">${formatNumber(result.maxQueries)} requêtes</div>
                        ${result !== bestCapacity ? `<div class="recommendation-savings">-${formatNumber(bestCapacity.maxQueries - result.maxQueries)} requêtes</div>` : ''}
                    </div>
                </div>
            `).join('')}
        `;
        
    } else {
        // Standard mode: Recommend cheapest models (original logic)
        const results = Array.from(selectedModels).map(modelId => {
            try {
                return calculateCost(modelId, queries, inputTokens, outputTokens, timeframe);
            } catch (error) {
                return null;
            }
        }).filter(r => r !== null);
        
        if (results.length === 0) {
            recommendationsContainer.innerHTML = '<p>No valid models selected.</p>';
            return;
        }
        
        // Sort by total cost
        results.sort((a, b) => a.totalCost - b.totalCost);
        
        const cheapest = results[0];
        const topProviders = {};
        
        // Find best model per provider
        results.forEach(result => {
            if (!topProviders[result.provider] || 
                result.totalCost < topProviders[result.provider].totalCost) {
                topProviders[result.provider] = result;
            }
        });
        
        recommendationsContainer.innerHTML = `
            <div class="recommendation-item best">
                <div>
                    <div class="recommendation-label">🥇 Cheapest Option</div>
                    <div class="recommendation-model">${cheapest.model} (${cheapest.provider})</div>
                </div>
                <div>
                    <div class="recommendation-cost">${formatCurrency(cheapest.totalCost)}</div>
                </div>
            </div>
            
            ${Object.values(topProviders).slice(0, 4).map((result, index) => `
                <div class="recommendation-item">
                    <div>
                        <div class="recommendation-label">${index === 0 ? '🥈' : index === 1 ? '🥉' : '📍'} ${result.provider}</div>
                        <div class="recommendation-model">${result.model}</div>
                    </div>
                    <div>
                        <div class="recommendation-cost">${formatCurrency(result.totalCost)}</div>
                        ${result !== cheapest ? `<div class="recommendation-savings">+${formatCurrency(result.totalCost - cheapest.totalCost)}</div>` : ''}
                    </div>
                </div>
            `).join('')}
        `;
    }
}

// Update analysis when filters change
function updateAnalysis() {
    createMainChart();
    generateRecommendations();
}

// Handle usage scenario changes
function handleUsageScenarioChange() {
    const scenario = document.getElementById('usageScenario').value;
    const inputTokensField = document.getElementById('inputTokens');
    const outputTokensField = document.getElementById('outputTokens');
    
    switch (scenario) {
        case 'chatbot':
            inputTokensField.value = 1000;
            outputTokensField.value = 1000;
            break;
        case 'content':
            inputTokensField.value = 500;
            outputTokensField.value = 1500;
            break;
        case 'code':
            inputTokensField.value = 1500;
            outputTokensField.value = 500;
            break;
        default:
            // Keep current values for custom
            break;
    }
    
    updateAnalysis();
}

// Handle provider filter change
function handleProviderFilterChange() {
    currentProviderFilter = document.getElementById('providerFilter').value;
    
    // Clear current selections and regenerate model selector
    selectedModels.clear();
    generateModelSelector();
    updateAnalysis();
}

// Event listeners
document.addEventListener('DOMContentLoaded', async function() {
    // Show loading message
    const loadingMsg = document.createElement('div');
    loadingMsg.id = 'loadingMsg';
    loadingMsg.style.cssText = 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; padding: 20px; border: 1px solid #ccc; border-radius: 4px; z-index: 1000;';
    loadingMsg.innerHTML = '<div style="text-align: center;">Loading comprehensive model data from LiteLLM...<br><small>This includes hundreds of models from multiple providers</small></div>';
    document.body.appendChild(loadingMsg);
    
    // Load pricing data
    await loadPricingData();
    
    // Remove loading message
    document.body.removeChild(loadingMsg);
    
    // Initialize simplified interface
    initializeProviderFilter();
    generateModelSelector();
    
    // Initialize analysis dashboard
    updateAnalysis();
    
    // Parameters form submission
    document.getElementById('parametersForm').addEventListener('submit', function(e) {
        e.preventDefault();
        updateAnalysis();
    });
    
    // Analysis filters change handlers
    document.getElementById('usageScenario').addEventListener('change', handleUsageScenarioChange);
    document.getElementById('providerFilter').addEventListener('change', handleProviderFilterChange);
    
    // Bulk selection buttons
    document.getElementById('selectAllBtn').addEventListener('click', selectAllModels);
    document.getElementById('selectNoneBtn').addEventListener('click', selectNoneModels);
    
    // Auto-update analysis when parameters change
    ['queries', 'inputTokens', 'outputTokens', 'timeframe', 'budget'].forEach(id => {
        document.getElementById(id).addEventListener('change', updateAnalysis);
    });
});

// Window resize handler
window.addEventListener('resize', function() {
    if (mainChart) {
        mainChart.resize();
    }
});

// Global functions for HTML onclick handlers
window.toggleModelSelection = toggleModelSelection;
window.toggleCalculationMode = toggleCalculationMode;