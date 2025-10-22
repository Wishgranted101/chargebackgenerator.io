# chargebackgenerator.io
Chargebackgenerator.io | Generate professional chargeback evidence packs in 60 seconds

# Chargeback Evidence Pack Generator MVP

A simple, standalone web application that generates professional chargeback evidence packs for e-commerce businesses. No coding experience required to customize or deploy.

## Features

- **Platform Agnostic**: Works with any e-commerce platform (Shopify, eBay, Amazon, Etsy, WooCommerce, etc.)
- **No Integrations**: Standalone tool that doesn't require API connections
- **Instant PDF Generation**: Creates professional evidence packs in seconds
- **Mobile Responsive**: Works on desktop, tablet, and mobile devices
- **Zero Budget**: Uses only free, CDN-hosted libraries

## What's Included

- `index.html` - Main application page with form and interface
- `styles.css` - Custom styling and responsive design
- `script.js` - JavaScript functionality for PDF generation
- `README.md` - This documentation file

## How to Use

### For End Users:
1. Open `index.html` in any web browser
2. Fill out the order information form
3. Add any additional evidence (communication logs, policies, etc.)
4. Click "Generate Evidence Pack"
5. Download the professional PDF evidence pack

### For Customization (No Coding Required):

#### Changing Colors/Branding:
1. Open `styles.css` in any text editor
2. Look for the `:root` section at the top
3. Change the color values:
   - `--primary-color`: Main brand color (currently blue)
   - `--success-color`: Success/confirmation color (currently green)

#### Updating Text Content:
1. Open `index.html` in any text editor
2. Find the text you want to change and replace it
3. Common areas to customize:
   - Company name in the header
   - Pricing information
   - Feature descriptions
   - Contact information in the footer

#### Modifying Form Fields:
1. Open `index.html` in any text editor
2. Find the form section (look for `<form id="evidenceForm">`)
3. Add, remove, or modify input fields as needed
4. Each field follows this pattern:
   ```html
   <div class="col-md-6">
       <label for="fieldName" class="form-label">Field Label</label>
       <input type="text" class="form-control" id="fieldName" placeholder="Placeholder text">
   </div>
   ```

## Deployment Options

### Option 1: Free Static Hosting
1. **Netlify** (Recommended for beginners):
   - Go to netlify.com
   - Drag and drop the entire folder
   - Get instant live URL

2. **Vercel**:
   - Go to vercel.com
   - Import the project
   - Deploy with one click

3. **GitHub Pages**:
   - Upload files to a GitHub repository
   - Enable GitHub Pages in settings

### Option 2: Traditional Web Hosting
1. Upload all files to your web hosting provider
2. Access via your domain name

### Option 3: Local Testing
1. Simply open `index.html` in any web browser
2. No server required for basic functionality

## Technical Details

### Libraries Used (All Free CDN):
- **Bootstrap 5.3.0**: UI framework for responsive design
- **Font Awesome 6.0.0**: Icons
- **jsPDF 2.5.1**: Client-side PDF generation

### Browser Compatibility:
- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

### File Structure:
```
chargeback-evidence-generator-mvp/
├── index.html          # Main application
├── styles.css          # Custom styling
├── script.js           # JavaScript functionality
└── README.md           # Documentation
```

## Customization Examples

### Change Primary Color to Red:
In `styles.css`, change:
```css
--primary-color: #dc3545;
```

### Add Your Company Name:
In `index.html`, find:
```html
<a class="navbar-brand fw-bold" href="#">
    <i class="fas fa-shield-alt me-2"></i>
    Your Company Name Here
</a>
```

### Modify Pricing:
In `index.html`, find the pricing section and update the amounts and descriptions.

## Future Enhancements

This MVP can be enhanced with:
- Payment processing integration (Stripe, PayPal)
- User accounts and saved templates
- Email delivery of evidence packs
- Advanced PDF customization
- Analytics and usage tracking

## Support

This is a bootstrap MVP designed for:
- Solo entrepreneurs
- Small e-commerce businesses
- Anyone needing a simple chargeback evidence solution

The code is intentionally simple and well-commented for easy modification without programming experience.

## License

This MVP is provided as-is for educational and commercial use. Feel free to modify and distribute as needed for your business.
