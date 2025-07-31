# Deployment Guide

## Quick Deployment Options

### 1. GitHub Pages (Recommended - Free)

#### Step-by-step:
```bash
# 1. Create GitHub repository
# Go to github.com and create a new repository named "llm-cost-calculator"

# 2. Initialize and push your code
git init
git add .
git commit -m "Add LLM Cost Calculator with Budget Mode"
git branch -M main
git remote add origin https://github.com/YOURUSERNAME/llm-cost-calculator.git
git push -u origin main

# 3. Enable GitHub Pages
# Go to repository Settings > Pages
# Source: Deploy from a branch
# Branch: main / (root)
# Click Save
```

**Your calculator will be available at:**
`https://YOURUSERNAME.github.io/llm-cost-calculator`

### 2. Netlify (Alternative - Free)

1. Visit [netlify.com](https://netlify.com)
2. Sign up for free account
3. Drag and drop your project folder
4. Get instant public URL
5. Optional: Set custom domain

### 3. Vercel (Alternative - Free)

1. Visit [vercel.com](https://vercel.com)  
2. Connect GitHub repository
3. Auto-deploy on every push
4. Get instant public URL

## Sharing Options

### For Non-Technical Users
- **Share URL**: Just share the GitHub Pages/Netlify URL
- **No installation**: Users access directly in browser
- **Mobile friendly**: Works on all devices

### For Technical Users
- **GitHub repo**: Share repository link for cloning
- **ZIP download**: Package files for direct download
- **Documentation**: Point to README.md for setup

## Custom Domain (Optional)

### GitHub Pages Custom Domain
1. Buy domain from registrar
2. Add CNAME file with your domain
3. Configure DNS settings
4. Enable HTTPS in repository settings

### Example Files Structure for Deployment
```
llm-cost-calculator/
├── index.html
├── calculator-litellm.js  
├── README.md
├── CLAUDE.md
├── test.html
├── .gitignore
└── DEPLOY.md (this file)
```

## Troubleshooting

### GitHub Pages Not Working
- Check repository is public
- Verify Pages is enabled in Settings
- Wait 5-10 minutes for deployment
- Check Actions tab for build status

### CORS Issues (Rare)
- LiteLLM API should work from any domain
- If issues, the app falls back to static data
- Test locally with `python -m http.server`

## Updates

### Adding New Features
1. Make changes locally
2. Test in browser
3. Commit and push to GitHub
4. Changes auto-deploy to GitHub Pages

### Updating Pricing Data
- App automatically fetches from LiteLLM API
- No manual updates needed
- Fallback data in calculator-litellm.js if needed

## Performance

### Optimization Tips
- App loads fast (pure HTML/CSS/JS)
- Charts render client-side
- API calls are cached by browser
- No server requirements

### Analytics (Optional)
Add Google Analytics by inserting tracking code in `index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

## Security

- **Client-side only**: No server vulnerabilities
- **No user data stored**: All calculations done locally
- **HTTPS enabled**: Secure data transmission
- **No authentication**: Public access by design