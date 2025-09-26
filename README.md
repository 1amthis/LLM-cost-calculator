# LLM API Cost Calculator

A professional web-based calculator to estimate and compare costs across different LLM API providers with real-time pricing data from LiteLLM.

## 🆕 New Features

### Dual-Mode Calculator
- **Standard Mode**: Calculate costs from usage parameters (queries, tokens)
- **Budget Mode**: Calculate capacity from budget constraints (reverse calculation)

### Real-Time Pricing
- Live data from LiteLLM GitHub API (hundreds of models)
- Automatic fallback to static pricing if API unavailable
- Organized by provider with accurate cost information

## Features

### 💰 Standard Mode (Cost Calculation)
- Input queries, tokens, and timeframe
- Calculate total costs for selected models
- Compare pricing across providers
- Visual cost breakdown charts

### 💼 Budget Mode (Capacity Planning)
- Set your budget limit (e.g., $20)
- Calculate maximum queries possible per model
- Optimize usage within budget constraints
- Compare capacity across different models

### 📊 Analysis Dashboard
- **Interactive Model Selection**: Checkbox-based selection organized by provider
- **Smart Recommendations**: Best options based on your criteria
- **Visual Charts**: Horizontal bar charts for easy comparison
- **Bulk Actions**: Select/deselect all models at once

### 🔧 Advanced Features
- **Live Data Integration**: Real-time pricing from LiteLLM
- **Provider Filtering**: Focus on specific providers
- **Usage Scenarios**: Presets for chatbot, content generation, code assistance
- **Wikit License Presets**: Quick configuration for Wikit Semantics platform tiers
- **External Services**: Cost calculation for additional services (Web Search, Image Generation)
- **Responsive Design**: Works on desktop and mobile

## Usage

### Quick Start
1. Open `index.html` in your web browser
2. Choose between Standard or Budget mode using the toggle
3. Select models you want to compare
4. Enter your parameters
5. View results and recommendations

### Standard Mode
1. **Set Parameters**: Enter queries, input/output tokens, timeframe
2. **Select Models**: Choose models to compare using checkboxes
3. **View Results**: See cost breakdown and recommendations
4. **Compare**: Visual charts show cost differences

### Budget Mode
1. **Toggle Mode**: Switch to Budget mode
2. **Set Budget**: Enter your maximum budget (e.g., $20.00)
3. **Configure Tokens**: Set tokens per query
4. **Select Models**: Choose models to analyze
5. **View Capacity**: See how many queries you can afford

## Model Coverage

The calculator includes **hundreds of models** from major providers:

- **OpenAI**: GPT-4o, GPT-4 Turbo, GPT-3.5 Turbo variants
- **Anthropic**: Claude 3.5 Sonnet, Claude 3 Haiku variants
- **Google**: Gemini Pro, Gemini Flash variants
- **AWS Bedrock**: Various foundation models
- **Azure**: OpenAI models via Azure
- **Cohere**: Command models
- **Mistral**: Various model sizes
- **And many more**: Groq, Together AI, DeepInfra, etc.

*Pricing data is fetched live from [LiteLLM's model database](https://github.com/BerriAI/litellm/blob/main/model_prices_and_context_window.json)*

## Example Use Cases

### Budget Planning
**Scenario**: "I have $20/month budget for an AI chatbot"
- Switch to Budget mode
- Set budget: $20.00
- Set tokens: 1000 input, 1000 output (typical chat)
- Result: See exactly how many conversations you can have per model

### Cost Optimization
**Scenario**: "Compare costs for content generation workload"
- Select usage scenario: "Content Generation"
- Compare models across providers
- Find the most cost-effective option for your needs

### Provider Comparison
**Scenario**: "Compare OpenAI vs Anthropic for my use case"
- Filter by provider
- Compare similar models
- Make informed decision based on cost and capability

### Wikit License Optimization
**Scenario**: "I have Wikit Enterprise Standard license, which external LLMs fit my budget?"
- Enable Wikit License Presets
- Select "Enterprise Standard (100K req/month - 1250€/month)"
- Calculator automatically sets budget mode with 100,000 queries and 1,250€ budget
- See which external LLM models fit within your Wikit subscription limits

## Technical Details

- **Frontend**: Pure HTML/CSS/JavaScript (no build process)
- **Charts**: Chart.js for interactive visualizations
- **Data Source**: LiteLLM GitHub API with static fallback
- **Browser Support**: Modern browsers (Chrome, Firefox, Safari, Edge)
- **No Server Required**: Runs entirely client-side

## Files Structure

```
dashboard_llm/
├── index.html              # Main application interface
├── calculator-litellm.js   # Core calculation engine with live data
├── README.md              # This documentation
├── CLAUDE.md             # Development instructions
└── test.html            # Manual testing scenarios
```

## Deployment Options

### 1. GitHub Pages (Recommended)
```bash
# Create repository and push files
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/llm-cost-calculator.git
git push -u origin main

# Enable GitHub Pages in repository settings
# Your calculator will be available at: yourusername.github.io/llm-cost-calculator
```

### 2. Netlify
- Drag and drop the project folder to [Netlify](https://app.netlify.com)
- Get instant public URL with custom domain support

### 3. Local Usage
```bash
# Simply open in browser
open index.html
# or
python -m http.server 8000  # Then visit localhost:8000
```

## Sharing Your Calculator

### For End Users
1. **Public URL**: Share the GitHub Pages or Netlify URL
2. **Direct Access**: Users just visit the URL - no installation needed
3. **Mobile Friendly**: Works on phones and tablets

### For Developers
1. **Clone/Download**: Provide GitHub repository link
2. **Local Setup**: Just open `index.html` in browser
3. **Customization**: Easy to modify pricing or add features

## Development

### Adding New Models
Models are automatically loaded from LiteLLM's API. For custom models, modify the fallback data in `calculator-litellm.js`.

### Customizing UI
- Modify `index.html` for layout changes
- Update CSS in the `<style>` section for styling
- Extend JavaScript in `calculator-litellm.js` for functionality

### Testing
Open `test.html` for predefined test scenarios to verify calculations.

## Contributing

1. Fork the repository
2. Make your improvements
3. Test thoroughly with both modes
4. Submit a pull request

## License

MIT License - Feel free to use, modify, and distribute!

---

## Quick Links
- 🚀 **[Live Demo](https://yourusername.github.io/llm-cost-calculator)** *(Update with your URL)*
- 📖 **[Usage Guide](#usage)**
- 🔧 **[Development Setup](#development)**
- 💬 **[Issues & Support](https://github.com/yourusername/llm-cost-calculator/issues)**