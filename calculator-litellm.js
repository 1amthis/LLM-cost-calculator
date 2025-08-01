// LiteLLM Model Pricing Data - Comprehensive model support
let modelPricing = {};
let isDataLoaded = false;

// Provider information database - Updated January 2025
const providerInfo = {
    'OpenAI': {
        website: 'https://openai.com',
        description: 'Leading AI research company developing advanced language models with dual paradigms: pre-training (GPT series) and reasoning (O-series), pushing the boundaries of AI capabilities.',
        specialties: ['Advanced Reasoning', 'Code Generation', 'Multimodal AI', 'API Services'],
        founded: '2015',
        keyModels: ['GPT-4.1', 'GPT-4.5', 'GPT-4o', 'O3-Pro', 'O4-Mini']
    },
    'Anthropic': {
        website: 'https://anthropic.com',
        description: 'AI safety company building responsible AI systems focused on humanity\'s long-term well-being, with emphasis on transparency and ethical development.',
        specialties: ['AI Safety', 'Responsible AI', 'Long Context', 'Enterprise Solutions'],
        founded: '2021',
        keyModels: ['Claude Opus 4', 'Claude Sonnet 4', 'Claude Haiku 3.5']
    },
    'Google': {
        website: 'https://ai.google',
        description: 'Google\'s AI division focused on making AI helpful for everyone through multimodal models and responsible development across products, research, and enterprise tools.',
        specialties: ['Multimodal AI', 'Search Integration', 'Scientific Research', 'Productivity Tools'],
        founded: '1998',
        keyModels: ['Gemini 2.5 Pro', 'Gemini 2.5 Flash', 'Gemini 2.0 Flash', 'Gemma', 'Veo']
    },
    'Google Vertex': {
        website: 'https://cloud.google.com/vertex-ai',
        description: 'Google Cloud\'s comprehensive AI platform providing enterprise-grade infrastructure for AI model development, deployment, and management with MLOps capabilities.',
        specialties: ['Enterprise AI', 'MLOps', 'Custom Training', 'AI Development Platform'],
        founded: '2021',
        keyModels: ['Gemini Pro', 'Gemini Flash', 'Text Bison', 'PaLM 2']
    },
    'Azure': {
        website: 'https://azure.microsoft.com/en-us/products/ai-services/openai-service',
        description: 'Microsoft\'s cloud platform offering OpenAI models with enterprise security, 100+ compliance certifications, and responsible AI safeguards for business applications.',
        specialties: ['Enterprise Security', 'Compliance', 'Responsible AI', 'Business Integration'],
        founded: '2010',
        keyModels: ['GPT-4', 'GPT-4 Turbo', 'GPT-3.5', 'DALL-E', 'Whisper']
    },
    'AWS Bedrock': {
        website: 'https://aws.amazon.com/bedrock',
        description: 'Amazon\'s fully managed generative AI service providing access to 100+ foundation models from leading AI companies with enterprise security and cost optimization.',
        specialties: ['Multi-Provider Models', 'Enterprise Security', 'Cost Optimization', 'Managed AI Service'],
        founded: '2023',
        keyModels: ['Claude', 'Llama', 'Titan', 'Jurassic', 'Mistral']
    },
    'Mistral': {
        website: 'https://mistral.ai',
        description: 'European AI company developing frontier AI with focus on digital sovereignty, privacy-first approach, and customizable models deployable across various environments.',
        specialties: ['Digital Sovereignty', 'Privacy-First', 'Customizable AI', 'European AI'],
        founded: '2023',
        keyModels: ['Mistral Large', 'Mistral Small', 'Codestral', 'Le Chat']
    },
    'Cohere': {
        website: 'https://cohere.com',
        description: 'Enterprise AI platform providing secure, customizable language models optimized for business applications with strong RAG capabilities and multilingual support.',
        specialties: ['Enterprise AI', 'RAG Systems', 'Multilingual Models', 'Custom Fine-tuning'],
        founded: '2019',
        keyModels: ['Command R+', 'Command R', 'Aya Expanse', 'Embed', 'Rerank']
    },
    'Together AI': {
        website: 'https://together.ai',
        description: 'AI acceleration cloud platform providing comprehensive generative AI infrastructure with 200+ open-source models, custom inference optimizations, and cost-effective solutions.',
        specialties: ['Open Source Models', 'Custom Inference', 'GPU Clusters', 'Cost-Effective AI'],
        founded: '2022',
        keyModels: ['Llama 3', 'Mixtral', 'Code Llama', 'Qwen', 'RedPajama']
    },
    'Groq': {
        website: 'https://groq.com',
        description: 'AI inference company with custom LPU™ (Linear Processing Unit) hardware delivering ultra-fast, sub-millisecond latency AI inference with consistent performance at scale.',
        specialties: ['Ultra-Fast Inference', 'Custom Hardware (LPU™)', 'Low Latency', 'Consistent Performance'],
        founded: '2016',
        keyModels: ['Llama 3', 'Mixtral', 'Gemma', 'CodeLlama']
    },
    'Hugging Face': {
        website: 'https://huggingface.co',
        description: 'The AI community platform building the future with 1M+ models, 250K+ datasets, collaborative tools, and open-source libraries for democratizing machine learning.',
        specialties: ['Open Source Community', 'Model Hub', 'Collaborative Platform', 'ML Libraries'],
        founded: '2016',
        keyModels: ['Transformers', 'Diffusers', 'Community Models', 'BLOOM']
    },
    'Replicate': {
        website: 'https://replicate.com',
        description: 'AI platform enabling developers to run, fine-tune, and deploy ML models through simple APIs with automatic scaling and granular pay-per-second billing.',
        specialties: ['Simple APIs', 'Auto-scaling', 'Pay-per-second', 'Easy Deployment'],
        founded: '2019',
        keyModels: ['Community Models', 'Stable Diffusion', 'Llama', 'Custom Models']
    },
    'Fireworks': {
        website: 'https://fireworks.ai',
        description: 'Generative AI platform delivering industry-leading inference speed with real-time performance, global deployment across 15+ regions, and enterprise-grade security.',
        specialties: ['Fastest Inference', 'Real-time Performance', 'Global Deployment', 'Model Customization'],
        founded: '2022',
        keyModels: ['DeepSeek', 'Llama', 'Qwen', 'Mistral', 'Custom Models']
    },
    'DeepInfra': {
        website: 'https://deepinfra.com',
        description: 'Serverless AI inference cloud providing cost-effective, auto-scaling deployment of 100+ ML models with H100/A100 GPU optimization and pay-per-use pricing.',
        specialties: ['Serverless Inference', 'Auto-scaling', 'Cost-Effective', 'GPU Optimized'],
        founded: '2021',
        keyModels: ['Llama 3', 'Mixtral', 'Code Llama', '100+ ML Models']
    },
    'Anyscale': {
        website: 'https://anyscale.com',
        description: 'Scalable AI platform built by Ray creators, enabling distributed computing from laptop to thousands of nodes with end-to-end ML workflows and cost optimization.',
        specialties: ['Distributed Computing', 'Ray Platform', 'Scalable ML', 'End-to-end Workflows'],
        founded: '2019',
        keyModels: ['Llama 2', 'Mistral', 'Code Llama', 'Custom Models']
    },
    'Perplexity': {
        website: 'https://www.perplexity.ai',
        description: 'AI-powered search engine serving curiosity with synthesized answers, real-time information, and citations. Processing 780M+ queries monthly with advanced reasoning models.',
        specialties: ['AI Search', 'Real-time Information', 'Citations', 'Advanced Reasoning'],
        founded: '2022',
        keyModels: ['Perplexity Pro', 'GPT-4o', 'Claude', 'Gemini', 'DeepSeek-R1']
    },
    'xAI': {
        website: 'https://x.ai',
        description: 'Elon Musk\'s AI company accelerating human scientific discovery with Grok models. Built world\'s largest supercomputer "Colossus" and raised $12B+ funding by 2025.',
        specialties: ['Scientific Discovery', 'Real-time Information', 'Government Contracts', 'Supercomputing'],
        founded: '2023',
        keyModels: ['Grok-4', 'Grok Heavy', 'Grok-3', 'Grok-2']
    },
    'DeepSeek': {
        website: 'https://www.deepseek.com',
        description: 'Chinese AI company founded by hedge fund High-Flyer, developing efficient reasoning models that cost 98% less to train than GPT-4. Topped iOS App Store in 2025.',
        specialties: ['Cost-Efficient Training', 'Advanced Reasoning', 'Mathematics', 'Open Source'],
        founded: '2023',
        keyModels: ['DeepSeek-R1-0528', 'DeepSeek-R1', 'DeepSeek-V3', 'DeepSeek-Coder']
    },
    'OpenRouter': {
        website: 'https://openrouter.ai',
        description: 'AI marketplace by OpenSea co-founder Alex Atallah, providing unified API access to 400+ models. Valued at $500M with $100M annual revenue in 2025.',
        specialties: ['API Marketplace', 'Model Routing', 'Developer Platform', 'Multi-Provider'],
        founded: '2023',
        keyModels: ['400+ Models', 'GPT-4', 'Claude', 'Gemini', 'DeepSeek']
    },
    'Ollama': {
        website: 'https://ollama.com',
        description: 'Y Combinator-backed platform for running LLMs locally on macOS, Windows, and Linux. Offers complete privacy with models running entirely on user hardware.',
        specialties: ['Local Deployment', 'Privacy-First', 'Cross-Platform', 'Multimodal Support'],
        founded: '2021',
        keyModels: ['Llama 3.3', 'DeepSeek-R1', 'Phi-4', 'Gemma 3', 'Mistral Small 3.1']
    },
    'Databricks': {
        website: 'https://databricks.com',
        description: 'Data and AI platform providing foundation models and MLOps capabilities for enterprise data teams with focus on data lakehouse architecture.',
        specialties: ['Enterprise Data', 'MLOps', 'Data Lakehouse', 'Foundation Models'],
        founded: '2013',
        keyModels: ['DBRX', 'Dolly', 'Foundation Models', 'Custom Models']
    },
    'Cloudflare Workers AI': {
        website: 'https://developers.cloudflare.com/workers-ai',
        description: 'Serverless AI inference platform running on Cloudflare\'s global network, providing fast, cost-effective access to various AI models.',
        specialties: ['Serverless AI', 'Global Network', 'Edge Computing', 'Low Latency'],
        founded: '2023',
        keyModels: ['Llama 2', 'Mistral', 'CodeLlama', 'Whisper']
    },
    'Cerebras': {
        website: 'https://cerebras.net',
        description: 'AI computing company with wafer-scale processors delivering exceptional performance for training and inference of large language models.',
        specialties: ['Wafer-Scale Computing', 'High Performance', 'AI Training', 'Fast Inference'],
        founded: '2016',
        keyModels: ['Llama 3', 'Mistral', 'Custom Models']
    },
    'Nvidia NIM': {
        website: 'https://developer.nvidia.com/nim',
        description: 'NVIDIA\'s inference microservices providing optimized deployment of AI models with enterprise-grade security and performance.',
        specialties: ['Optimized Inference', 'Enterprise Security', 'Microservices', 'GPU Acceleration'],
        founded: '2024',
        keyModels: ['Llama 3', 'Mistral', 'Nemotron', 'Various Models']
    },
    'Moonshot AI': {
        website: 'https://moonshot.cn',
        description: 'Chinese AI company developing Kimi models with ultra-long context capabilities and multimodal understanding for Chinese and English languages.',
        specialties: ['Ultra-Long Context', 'Multimodal', 'Chinese Language', 'Kimi Assistant'],
        founded: '2023',
        keyModels: ['Kimi', 'Moonshot-v1', 'Long Context Models']
    },
    'Novita AI': {
        website: 'https://novita.ai',
        description: 'Cloud-based AI platform providing GPU infrastructure and model hosting services with focus on image generation and LLM inference.',
        specialties: ['GPU Cloud', 'Image Generation', 'Model Hosting', 'API Services'],
        founded: '2023',
        keyModels: ['Stable Diffusion', 'Llama', 'Various Models']
    },
    'Predibase': {
        website: 'https://predibase.com',
        description: 'ML platform focused on fine-tuning and serving custom models with LoRA adapters, providing cost-effective model customization.',
        specialties: ['Model Fine-tuning', 'LoRA Adapters', 'Custom Models', 'Cost-Effective'],
        founded: '2022',
        keyModels: ['Custom Fine-tuned Models', 'Llama', 'Mistral']
    },
    'Dashscope': {
        website: 'https://dashscope.aliyun.com',
        description: 'Alibaba Cloud\'s AI model service providing access to Qwen models and other AI capabilities with focus on Chinese language processing.',
        specialties: ['Chinese Language', 'Alibaba Ecosystem', 'Qwen Models', 'Cloud Services'],
        founded: '2023',
        keyModels: ['Qwen-Turbo', 'Qwen-Plus', 'Qwen-Max', 'Various Qwen Models']
    },
    'vLLM': {
        website: 'https://vllm.readthedocs.io',
        description: 'High-throughput serving engine for large language models with memory-efficient attention and optimized inference performance.',
        specialties: ['High Throughput', 'Memory Efficient', 'Optimized Inference', 'Open Source'],
        founded: '2023',
        keyModels: ['Various Open Source Models', 'Llama', 'Mistral', 'Custom Models']
    },
    'Voyage AI': {
        website: 'https://www.voyageai.com',
        description: 'AI company specializing in embedding models and retrieval systems, providing high-quality embeddings for various domains and languages.',
        specialties: ['Embeddings', 'Retrieval Systems', 'Domain-Specific', 'Multilingual'],
        founded: '2023',
        keyModels: ['Voyage-Large', 'Voyage-Code', 'Voyage-Lite', 'Domain Embeddings']
    },
    'Jina AI': {
        website: 'https://jina.ai',
        description: 'Neural search company providing embedding models, reranking, and multimodal AI solutions for search and recommendation systems.',
        specialties: ['Neural Search', 'Embeddings', 'Multimodal AI', 'Reranking'],
        founded: '2020',
        keyModels: ['Jina Embeddings', 'Jina Reranker', 'CLIP Models', 'Reader API']
    }
};

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
                    'replicate': 'Replicate',
                    'xai': 'xAI',
                    'deepseek': 'DeepSeek',
                    'openrouter': 'OpenRouter',
                    'ollama': 'Ollama',
                    'databricks': 'Databricks',
                    'cloudflare': 'Cloudflare Workers AI',
                    'cerebras': 'Cerebras',
                    'nvidia_nim': 'Nvidia NIM',
                    'moonshot': 'Moonshot AI',
                    'novita': 'Novita AI',
                    'predibase': 'Predibase',
                    'dashscope': 'Dashscope',
                    'vllm': 'vLLM',
                    'voyage': 'Voyage AI',
                    'jina': 'Jina AI'
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
        recommendationsTitle.textContent = '📋 Model Rankings (by Capacity)';
    } else {
        // Switch to Standard mode
        calculatorPanel.classList.remove('budget-mode');
        budgetLabel.classList.remove('active');
        standardLabel.classList.add('active');
        panelTitle.textContent = 'Query Parameters';
        queriesLabel.textContent = 'Queries:';
        chartTitle.textContent = '📊 Cost Analysis';
        recommendationsTitle.textContent = '📋 Model Rankings (by Cost)';
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
// Enhanced search parser for complex queries
function parseSearchQuery(searchTerm) {
    if (!searchTerm) return null;
    
    const query = {
        providers: [],
        models: [],
        general: []
    };
    
    // Split by commas first for list support
    const parts = searchTerm.split(',').map(part => part.trim().toLowerCase());
    
    parts.forEach(part => {
        // Check for field-specific syntax (provider:value, model:value)
        if (part.includes(':')) {
            const [field, value] = part.split(':', 2);
            const fieldName = field.trim();
            const fieldValue = value.trim();
            
            if (fieldName === 'provider' || fieldName === 'p') {
                query.providers.push(fieldValue);
            } else if (fieldName === 'model' || fieldName === 'm') {
                query.models.push(fieldValue);
            } else {
                // Unknown field, treat as general search
                query.general.push(part);
            }
        } else {
            // No field specified, treat as general search
            query.general.push(part);
        }
    });
    
    return query;
}

// Enhanced search matching function
function matchesSearchQuery(model, modelId, searchQuery) {
    if (!searchQuery) return true;
    
    const modelName = model.name.toLowerCase();
    const providerId = model.provider.toLowerCase();
    const id = modelId.toLowerCase();
    
    // Check provider-specific filters
    if (searchQuery.providers.length > 0) {
        const providerMatch = searchQuery.providers.some(provider => 
            providerId.includes(provider) || provider.includes(providerId)
        );
        if (!providerMatch) return false;
    }
    
    // Check model-specific filters
    if (searchQuery.models.length > 0) {
        const modelMatch = searchQuery.models.some(modelSearch => 
            modelName.includes(modelSearch) || id.includes(modelSearch)
        );
        if (!modelMatch) return false;
    }
    
    // Check general search terms (must match at least one if present)
    if (searchQuery.general.length > 0) {
        const generalMatch = searchQuery.general.some(term => 
            modelName.includes(term) || id.includes(term) || providerId.includes(term)
        );
        if (!generalMatch) return false;
    }
    
    return true;
}

function generateModelSelector(searchTerm = '') {
    const filteredModels = getFilteredModels();
    const modelsByProvider = {};
    const searchQuery = parseSearchQuery(searchTerm);
    
    // Group models by provider and apply enhanced search filter
    Object.entries(filteredModels).forEach(([id, model]) => {
        // Apply enhanced search filter
        if (!matchesSearchQuery(model, id, searchQuery)) {
            return;
        }
        
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
            <div class="provider-header">
                ${provider}
                ${providerInfo[provider] ? `<button class="provider-info-btn" onclick="showProviderInfo('${provider}')" title="Learn more about ${provider}">ℹ️</button>` : ''}
            </div>
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
                    label: 'Queries Possible',
                    data: sortedModels.map(m => m.maxQueries),
                    backgroundColor: (ctx) => {
                        const gradient = ctx.chart.ctx.createLinearGradient(0, 0, ctx.chart.width, 0);
                        gradient.addColorStop(0, '#22c55e');
                        gradient.addColorStop(1, '#16a34a');
                        return gradient;
                    },
                    borderColor: 'transparent',
                    borderWidth: 0,
                    borderRadius: {
                        topLeft: 0,
                        topRight: 8,
                        bottomLeft: 0,
                        bottomRight: 8
                    },
                    borderSkipped: false,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: 'y',
                plugins: {
                    legend: {
                        position: 'top',
                        labels: { 
                            font: { size: 12, weight: '600' },
                            color: '#374151',
                            usePointStyle: true,
                            pointStyle: 'rectRounded'
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        titleColor: '#111827',
                        bodyColor: '#374151',
                        borderColor: '#e5e7eb',
                        borderWidth: 1,
                        cornerRadius: 8,
                        displayColors: false,
                        callbacks: {
                            label: function(context) {
                                const model = sortedModels[context.dataIndex];
                                return [
                                    `Queries: ${formatNumber(context.parsed.x)}`,
                                    `Cost: ${formatCurrency(model.actualTotalCost)}`,
                                    `Budget Remaining: ${formatCurrency(model.remainingBudget)}`
                                ];
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        grid: {
                            color: '#f3f4f6',
                            drawBorder: false
                        },
                        ticks: {
                            color: '#6b7280',
                            font: { size: 11 },
                            callback: function(value) {
                                return formatNumber(value);
                            }
                        }
                    },
                    y: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            font: { size: 10, weight: '500' },
                            color: '#374151'
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
                    backgroundColor: (ctx) => {
                        const gradient = ctx.chart.ctx.createLinearGradient(0, 0, ctx.chart.width, 0);
                        gradient.addColorStop(0, '#64748b');
                        gradient.addColorStop(1, '#475569');
                        return gradient;
                    },
                    borderColor: 'transparent',
                    borderWidth: 0,
                    borderRadius: function(ctx) {
                        const dataIndex = ctx.dataIndex;
                        const datasets = ctx.chart.data.datasets;
                        const hasOutputCost = datasets[1].data[dataIndex] > 0;
                        
                        // If there's output cost, don't round this segment
                        if (hasOutputCost) {
                            return 0;
                        }
                        // If no output cost, round the right side only
                        return {
                            topLeft: 0,
                            topRight: 8,
                            bottomLeft: 0,
                            bottomRight: 8
                        };
                    },
                    borderSkipped: false,
                    stack: 'cost'
                }, {
                    label: 'Output Cost', 
                    data: sortedModels.map(m => m.totalOutputCost),
                    backgroundColor: (ctx) => {
                        const gradient = ctx.chart.ctx.createLinearGradient(0, 0, ctx.chart.width, 0);
                        gradient.addColorStop(0, '#0ea5e9');
                        gradient.addColorStop(1, '#0284c7');
                        return gradient;
                    },
                    borderColor: 'transparent',
                    borderWidth: 0,
                    borderRadius: {
                        topLeft: 0,
                        topRight: 8,
                        bottomLeft: 0,
                        bottomRight: 8
                    },
                    borderSkipped: false,
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
                        labels: { 
                            font: { size: 12, weight: '600' },
                            color: '#374151',
                            usePointStyle: true,
                            pointStyle: 'rectRounded'
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        titleColor: '#111827',
                        bodyColor: '#374151',
                        borderColor: '#e5e7eb',
                        borderWidth: 1,
                        cornerRadius: 8,
                        displayColors: true,
                        callbacks: {
                            label: function(context) {
                                return `${context.dataset.label}: ${formatCurrency(context.parsed.x)}`;
                            },
                            afterBody: function(context) {
                                const dataIndex = context[0].dataIndex;
                                const model = sortedModels[dataIndex];
                                return `Total: ${formatCurrency(model.totalCost)}`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        stacked: true,
                        grid: {
                            color: '#f3f4f6',
                            drawBorder: false
                        },
                        ticks: {
                            color: '#6b7280',
                            font: { size: 11 },
                            callback: function(value) {
                                return formatCurrency(value);
                            }
                        }
                    },
                    y: {
                        stacked: true,
                        grid: {
                            display: false
                        },
                        ticks: {
                            font: { size: 10, weight: '500' },
                            color: '#374151'
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
        // Budget mode: Show ranked list by capacity (max queries)
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
        
        // Sort by max queries (descending - highest capacity first)
        results.sort((a, b) => b.maxQueries - a.maxQueries);
        
        recommendationsContainer.innerHTML = results.map((result, index) => `
            <div class="recommendation-item ${index === 0 ? 'best' : ''}">
                <div>
                    <div class="recommendation-label">${index + 1}. ${result.model}</div>
                    <div class="recommendation-model">${result.provider}</div>
                </div>
                <div>
                    <div class="recommendation-cost">${formatNumber(result.maxQueries)} queries</div>
                    <div class="recommendation-savings">${formatCurrency(result.actualTotalCost)} cost</div>
                </div>
            </div>
        `).join('');
        
    } else {
        // Standard mode: Show ranked list by cost (cheapest to most expensive)
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
        
        // Sort by total cost (ascending - cheapest first)
        results.sort((a, b) => a.totalCost - b.totalCost);
        
        recommendationsContainer.innerHTML = results.map((result, index) => `
            <div class="recommendation-item ${index === 0 ? 'best' : ''}">
                <div>
                    <div class="recommendation-label">${index + 1}. ${result.model}</div>
                    <div class="recommendation-model">${result.provider}</div>
                </div>
                <div>
                    <div class="recommendation-cost">${formatCurrency(result.totalCost)}</div>
                </div>
            </div>
        `).join('');
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
    
    // Clear current selections and regenerate model selector with current search term
    selectedModels.clear();
    const searchTerm = document.getElementById('modelSearch').value.trim();
    generateModelSelector(searchTerm);
    updateAnalysis();
}

// Event listeners
document.addEventListener('DOMContentLoaded', async function() {
    // Show enhanced loading message
    const loadingMsg = document.createElement('div');
    loadingMsg.id = 'loadingMsg';
    loadingMsg.style.cssText = `
        position: fixed; 
        top: 50%; 
        left: 50%; 
        transform: translate(-50%, -50%); 
        background: white; 
        padding: 2rem; 
        border: 1px solid var(--gray-200); 
        border-radius: 1rem; 
        z-index: 1000;
        box-shadow: var(--shadow-xl);
        text-align: center;
        min-width: 320px;
    `;
    
    loadingMsg.innerHTML = `
        <div style="display: flex; flex-direction: column; align-items: center; gap: 1rem;">
            <div style="width: 40px; height: 40px; border: 3px solid var(--gray-200); border-top: 3px solid var(--primary-500); border-radius: 50%; animation: spin 1s linear infinite;"></div>
            <div style="color: var(--gray-900); font-weight: 600; font-size: 1.1rem;">Loading Model Data</div>
            <div style="color: var(--gray-600); font-size: 0.9rem; line-height: 1.4;">
                Fetching comprehensive pricing data from LiteLLM<br>
                <small style="color: var(--gray-500);">Hundreds of models from multiple providers</small>
            </div>
        </div>
    `;
    
    // Add spinner animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
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
    
    // Model search functionality
    document.getElementById('modelSearch').addEventListener('input', function(e) {
        const searchTerm = e.target.value.trim();
        generateModelSelector(searchTerm);
    });
    
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

// Show provider information in a modal
function showProviderInfo(providerName) {
    const provider = providerInfo[providerName];
    if (!provider) return;
    
    // Create modal backdrop
    const modalBackdrop = document.createElement('div');
    modalBackdrop.className = 'provider-modal-backdrop';
    modalBackdrop.onclick = () => document.body.removeChild(modalBackdrop);
    
    // Create modal content
    modalBackdrop.innerHTML = `
        <div class="provider-modal" onclick="event.stopPropagation()">
            <div class="provider-modal-header">
                <h2>${providerName}</h2>
                <button class="provider-modal-close" onclick="document.body.removeChild(this.closest('.provider-modal-backdrop'))">&times;</button>
            </div>
            <div class="provider-modal-content">
                <div class="provider-description">
                    <p>${provider.description}</p>
                </div>
                
                <div class="provider-details">
                    <div class="provider-detail-item">
                        <strong>Founded:</strong> ${provider.founded}
                    </div>
                    <div class="provider-detail-item">
                        <strong>Specialties:</strong>
                        <div class="provider-specialties">
                            ${provider.specialties.map(specialty => `<span class="specialty-tag">${specialty}</span>`).join('')}
                        </div>
                    </div>
                    <div class="provider-detail-item">
                        <strong>Key Models:</strong>
                        <div class="provider-models">
                            ${provider.keyModels.map(model => `<span class="model-tag">${model}</span>`).join('')}
                        </div>
                    </div>
                </div>
                
                <div class="provider-actions">
                    <a href="${provider.website}" target="_blank" rel="noopener noreferrer" class="provider-website-btn">
                        🌐 Visit Website
                    </a>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modalBackdrop);
}

// Global functions for HTML onclick handlers
window.toggleModelSelection = toggleModelSelection;
window.toggleCalculationMode = toggleCalculationMode;
window.showProviderInfo = showProviderInfo;