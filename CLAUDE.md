# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a web-based LLM API cost calculator that compares pricing across different language model providers. It's a client-side application that fetches real-time pricing data from LiteLLM's public API and provides an interactive dashboard for cost analysis.

## Key Architecture

**Frontend-Only Application**: Pure HTML/CSS/JavaScript with no backend or build process required. Simply open `index.html` in a browser.

**Core Files**:
- `index.html` - Main application interface with analysis dashboard
- `calculator-litellm.js` - Primary calculation engine with live LiteLLM data integration
- Other `calculator-*.js` files are legacy/alternative implementations

**Data Flow**:
1. Fetches live pricing data from LiteLLM GitHub API at startup
2. Falls back to static pricing data if API fails
3. Dynamically populates model selector organized by provider
4. Calculates costs for selected models and generates interactive charts using Chart.js

## Model Selection System

The application uses a checkbox-based model selection system organized by provider. Models are filtered by the `litellm_provider` field and only include chat models with both input/output pricing. The `selectedModels` Set tracks user selections.

## Cost Calculation Logic

**Base LLM Costs:**
- Input cost per query = (inputTokens / 1,000,000) × model.inputCost
- Output cost per query = (outputTokens / 1,000,000) × model.outputCost
- LLM cost per query = input cost + output cost

**External Services Costs:**
- External service cost per query = (serviceCost / 1,000)
- Total external services cost = sum of all enabled services × queries

**Total Cost Formula:**
- Total cost = (LLM cost per query + external services cost per query) × queries × timeframe multiplier

Timeframe multipliers: daily=1, monthly=30, yearly=365, single=1

## UI Components

**Analysis Dashboard**: Two-panel layout with recommendations (best options) and cost comparison chart (stacked horizontal bar chart)
**Model Selector**: Scrollable checkbox grid organized by provider with bulk select/deselect actions
**Parameter Form**: Input fields for queries, tokens, timeframe, and usage scenarios with preset configurations
**External Services**: Optional section to configure additional service costs (Web Search, Image Generation, Custom Services)

## External Services Feature

**Configuration Options:**
- **Web Search** (e.g., Linkup): Default 5€/1000 queries
- **Image Generation**: Default 10€/1000 queries
- **Custom Service**: User-defined name and cost per 1000 queries

**Visual Representation:**
- Stacked bar chart with 3 layers: Input Cost (gray), Output Cost (blue), External Services (orange)
- Enhanced tooltips showing service-by-service cost breakdown
- CSV export includes external services costs and details

**Cost Integration:**
- External services costs are calculated per query and scaled by timeframe
- Added to total cost calculations across all analysis modes
- Included in budget mode capacity calculations

## Development Commands

No build process required. For development:
- Open `index.html` directly in browser
- Use browser dev tools for debugging  
- Check console for LiteLLM API loading status

## Testing

Use `test.html` for manual testing scenarios. The file contains specific test cases for single model calculations and model comparisons with expected results.