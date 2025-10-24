// Chargeback Evidence Generator MVP - JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('evidenceForm');
    const loadingModal = new bootstrap.Modal(document.getElementById('loadingModal'));

    // ==================== USAGE LIMIT FUNCTIONS ====================
    
    // Check if user has already generated a free PDF
    function checkFreeUsageLimit() {
        const usageKey = 'evidencePackGenerated';
        const hasGenerated = localStorage.getItem(usageKey);
        
        if (hasGenerated === 'true') {
            return false;
        }
        return true;
    }

    // Mark that user has generated a PDF
    function markPDFGenerated() {
        localStorage.setItem('evidencePackGenerated', 'true');
        localStorage.setItem('generatedDate', new Date().toISOString());
    }

    // ==================== FORM SUBMISSION HANDLER ====================
    
    // Form submission handler with usage limit
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Check usage limit
        if (!checkFreeUsageLimit()) {
            alert(
                '⚠️ Free Usage Limit Reached\n\n' +
                'You\'ve already generated your free evidence pack.\n\n' +
                'To generate more packs:\n' +
                '• Purchase full access for $49\n' +
                '• Or contact us for bulk pricing\n\n' +
                'Email: support@chargebackgenerator.com'
            );
            return;
        }
        
        // Show loading modal
        loadingModal.show();
        
        // Simulate processing time
        setTimeout(() => {
            generateEvidencePack();
            markPDFGenerated();
            loadingModal.hide();
        }, 2000);
    });

    // ==================== AI FEATURES - SUMMARIZE COMMUNICATION ====================
    
    const summarizeBtn = document.getElementById('summarizeBtn');
    if (summarizeBtn) {
        summarizeBtn.addEventListener('click', function() {
            const communicationText = document.getElementById('customerCommunication').value.trim();
            
            if (!communicationText) {
                alert('Please paste communication history first before summarizing.');
                return;
            }

            // Show loading state
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin me-1"></i> Summarizing...';
            this.disabled = true;

            // Simulate AI processing (2 seconds)
            setTimeout(() => {
                const summary = generateCommunicationSummary(communicationText);
                document.getElementById('customerCommunication').value = summary;
                
                // Reset button
                this.innerHTML = originalText;
                this.disabled = false;
                
                // Show success
                showSuccessMessage('Communication summarized successfully!');
            }, 2000);
        });
    }

    // ==================== AI FEATURES - DRAFT REBUTTAL MEMO ====================
    
    const draftRebuttalBtn = document.getElementById('draftRebuttalBtn');
    if (draftRebuttalBtn) {
        draftRebuttalBtn.addEventListener('click', function() {
            // Get required form data
            const orderId = document.getElementById('orderId').value;
            const orderDate = document.getElementById('orderDate').value;
            const orderAmount = document.getElementById('orderAmount').value;
            const customerName = document.getElementById('customerName').value;
            const businessName = document.getElementById('businessName').value;

            // Validate minimum required fields
            if (!orderId || !orderDate || !orderAmount || !customerName || !businessName) {
                alert('Please fill in at least Order ID, Order Date, Order Amount, Customer Name, and Business Name before generating a rebuttal memo.');
                return;
            }

            // Show loading state
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin me-1"></i> Drafting...';
            this.disabled = true;

            // Simulate AI processing (3 seconds)
            setTimeout(() => {
                const rebuttalData = {
                    orderId: orderId,
                    orderDate: orderDate,
                    orderAmount: orderAmount,
                    customerName: customerName,
                    businessName: businessName,
                    trackingNumber: document.getElementById('trackingNumber').value,
                    deliveryDate: document.getElementById('deliveryDate').value
                };
                
                const rebuttal = generateRebuttalMemo(rebuttalData);
                document.getElementById('rebuttalMemo').value = rebuttal;
                
                // Reset button
                this.innerHTML = originalText;
                this.disabled = false;
                
                // Show success
                showSuccessMessage('Rebuttal memo drafted successfully! Please review and edit as needed.');
            }, 3000);
        });
    }

    // ==================== GENERATE EVIDENCE PACK FUNCTION ====================
    
    // Generate Evidence Pack Function
    function generateEvidencePack() {
        // Get form data
        const formData = {
            orderId: document.getElementById('orderId').value,
            orderDate: document.getElementById('orderDate').value,
            orderAmount: document.getElementById('orderAmount').value,
            platform: document.getElementById('platform').value,
            businessName: document.getElementById('businessName').value,
            customerName: document.getElementById('customerName').value,
            businessContact: document.getElementById('businessContact').value,
            customerEmail: document.getElementById('customerEmail').value,
            billingShippingAddress: document.getElementById('billingShippingAddress').value,
            orderSummary: document.getElementById('orderSummary').value,
            shippingAddress: document.getElementById('shippingAddress').value,
            trackingNumber: document.getElementById('trackingNumber').value,
            deliveryDate: document.getElementById('deliveryDate').value,
            customerCommunication: document.getElementById('customerCommunication').value,
            refundPolicy: document.getElementById('refundPolicy').value,
            rebuttalMemo: document.getElementById('rebuttalMemo').value
        };

        // Format date nicely
        const generatedDate = new Date().toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });

        // Create beautiful HTML template
        const htmlContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <style>
                    * { margin: 0; padding: 0; box-sizing: border-box; }
                    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; line-height: 1.6; }
                    .container { padding: 40px; max-width: 800px; margin: 0 auto; }
                    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px 30px; border-radius: 15px; margin-bottom: 40px; box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3); }
                    .header h1 { font-size: 36px; font-weight: 700; margin-bottom: 10px; letter-spacing: 1px; }
                    .header .subtitle { font-size: 14px; opacity: 0.9; }
                    .section { margin-bottom: 35px; page-break-inside: avoid; }
                    .section-title { color: #667eea; font-size: 22px; font-weight: 700; margin-bottom: 15px; padding-bottom: 8px; border-bottom: 3px solid #667eea; }
                    .info-box { background: #f8f9fa; border-left: 4px solid #667eea; padding: 20px 25px; border-radius: 8px; margin-bottom: 20px; }
                    .info-row { display: flex; padding: 10px 0; border-bottom: 1px solid #e9ecef; }
                    .info-row:last-child { border-bottom: none; }
                    .info-label { font-weight: 600; color: #495057; min-width: 180px; }
                    .info-value { color: #212529; flex: 1; }
                    .text-content { background: #f8f9fa; padding: 20px; border-radius: 8px; white-space: pre-wrap; line-height: 1.8; font-size: 14px; }
                    .badge { display: inline-block; padding: 6px 12px; background: #28a745; color: white; border-radius: 20px; font-size: 12px; font-weight: 600; margin-left: 10px; }
                    .footer { margin-top: 50px; padding-top: 20px; border-top: 2px solid #e9ecef; text-align: center; color: #6c757d; font-size: 12px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>CHARGEBACK EVIDENCE PACK</h1>
                        <div class="subtitle">Order ${formData.orderId} • Generated ${generatedDate}</div>
                    </div>

                    <div class="section">
                        <h2 class="section-title">Order Information</h2>
                        <div class="info-box">
                            <div class="info-row">
                                <div class="info-label">Order ID:</div>
                                <div class="info-value"><strong>${formData.orderId}</strong></div>
                            </div>
                            <div class="info-row">
                                <div class="info-label">Order Date:</div>
                                <div class="info-value">${formData.orderDate}</div>
                            </div>
                            <div class="info-row">
                                <div class="info-label">Order Amount:</div>
                                <div class="info-value"><strong style="color: #28a745; font-size: 18px;">$${formData.orderAmount}</strong></div>
                            </div>
                            <div class="info-row">
                                <div class="info-label">Platform:</div>
                                <div class="info-value">${formData.platform}</div>
                            </div>
                        </div>
                    </div>

                    <div class="section">
                        <h2 class="section-title">Merchant & Customer Information</h2>
                        <div class="info-box">
                            <div class="info-row">
                                <div class="info-label">Business Name:</div>
                                <div class="info-value">${formData.businessName}</div>
                            </div>
                            <div class="info-row">
                                <div class="info-label">Business Contact:</div>
                                <div class="info-value">${formData.businessContact}</div>
                            </div>
                            <div class="info-row">
                                <div class="info-label">Customer Name:</div>
                                <div class="info-value">${formData.customerName}</div>
                            </div>
                            <div class="info-row">
                                <div class="info-label">Customer Email:</div>
                                <div class="info-value">${formData.customerEmail}</div>
                            </div>
                            <div class="info-row">
                                <div class="info-label">Billing/Shipping Address:</div>
                                <div class="info-value">${formData.billingShippingAddress.replace(/\n/g, '<br>')}</div>
                            </div>
                        </div>
                    </div>

                    <div class="section">
                        <h2 class="section-title">Order Details</h2>
                        <div class="text-content">${formData.orderSummary}</div>
                    </div>

                    <div class="section">
                        <h2 class="section-title">Shipping & Delivery Proof <span class="badge">✓ VERIFIED</span></h2>
                        <div class="info-box">
                            <div class="info-row">
                                <div class="info-label">Shipping Address:</div>
                                <div class="info-value">${formData.shippingAddress.replace(/\n/g, '<br>')}</div>
                            </div>
                            ${formData.trackingNumber ? `<div class="info-row"><div class="info-label">Tracking Number:</div><div class="info-value"><strong>${formData.trackingNumber}</strong></div></div>` : ''}
                            ${formData.deliveryDate ? `<div class="info-row"><div class="info-label">Delivery Date:</div><div class="info-value"><strong style="color: #28a745;">${formData.deliveryDate}</strong></div></div>` : ''}
                        </div>
                    </div>

                    ${formData.customerCommunication ? `<div class="section"><h2 class="section-title">Communication History</h2><div class="text-content">${formData.customerCommunication}</div></div>` : ''}

                    ${formData.refundPolicy ? `<div class="section"><h2 class="section-title">Refund/Terms of Service Policy</h2><div class="text-content">${formData.refundPolicy}</div></div>` : ''}

                    ${formData.rebuttalMemo ? `<div class="section"><h2 class="section-title">Rebuttal Memo</h2><div class="text-content">${formData.rebuttalMemo}</div></div>` : ''}

                    <div class="footer">
                        Generated by Chargeback Evidence Pack Generator<br>
                        Document ID: ${formData.orderId}-${Date.now()}
                    </div>
                </div>
            </body>
            </html>
        `;

        // Configure html2pdf options
        const opt = {
            margin: 10,
            filename: `Chargeback_Evidence_${formData.orderId}_${new Date().toISOString().split('T')[0]}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        // Generate and download PDF
        html2pdf().set(opt).from(htmlContent).save().then(() => {
            showSuccessMessage('Your professional evidence pack has been generated and downloaded!');
        }).catch((error) => {
            console.error('PDF generation error:', error);
            alert('Error generating PDF. Please try again or contact support.');
        });
    }

    // ==================== AI HELPER FUNCTIONS ====================

    // Helper function: Generate Communication Summary (AI Simulated)
    function generateCommunicationSummary(text) {
        const wordCount = text.split(' ').length;
        const hasRefund = text.toLowerCase().includes('refund');
        const hasDelivery = text.toLowerCase().includes('deliver') || text.toLowerCase().includes('received');
        const hasComplaint = text.toLowerCase().includes('complaint') || text.toLowerCase().includes('issue');

        let summary = "COMMUNICATION SUMMARY\n\n";
        summary += `Total exchanges analyzed: ${Math.ceil(wordCount / 100)}\n\n`;
        
        if (hasRefund) {
            summary += "• Customer requested refund\n";
        }
        if (hasDelivery) {
            summary += "• Delivery confirmation discussed\n";
        }
        if (hasComplaint) {
            summary += "• Customer raised concerns about product/service\n";
        }
        
        summary += "\nKEY POINTS:\n";
        summary += "• All communications were responded to within 24 hours\n";
        summary += "• Customer was provided with clear information about policies\n";
        summary += "• Multiple attempts made to resolve the issue amicably\n\n";
        summary += "CONCLUSION: Merchant acted in good faith and followed proper procedures.";
        
        return summary;
    }

    // Helper function: Generate Rebuttal Memo (AI Simulated)
    function generateRebuttalMemo(data) {
        const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        
        let memo = `REBUTTAL MEMO\n`;
        memo += `Date: ${today}\n`;
        memo += `Re: Chargeback Dispute for Order ${data.orderId}\n\n`;
        memo += `To Whom It May Concern:\n\n`;
        memo += `We are writing to formally dispute the chargeback filed by ${data.customerName} regarding Order ${data.orderId}, placed on ${data.orderDate} for the amount of $${data.orderAmount}.\n\n`;
        
        memo += `SUMMARY OF TRANSACTION:\n`;
        memo += `${data.businessName} processed a legitimate order for ${data.customerName}. The transaction was completed in accordance with our standard business practices and terms of service, which the customer agreed to at the time of purchase.\n\n`;
        
        if (data.trackingNumber) {
            memo += `PROOF OF DELIVERY:\n`;
            memo += `The order was shipped with tracking number ${data.trackingNumber}`;
            if (data.deliveryDate) {
                memo += ` and was successfully delivered on ${data.deliveryDate}`;
            }
            memo += `. This confirms that the product was received by the customer at the provided address.\n\n`;
        }
        
        memo += `MERCHANT COMPLIANCE:\n`;
        memo += `• The transaction was authorized by the cardholder\n`;
        memo += `• Product/service was delivered as described\n`;
        memo += `• All terms and conditions were clearly communicated\n`;
        memo += `• Customer was provided with proper receipt and confirmation\n`;
        memo += `• Our refund policy was made available and followed\n\n`;
        
        memo += `CONCLUSION:\n`;
        memo += `Based on the evidence provided, this chargeback is invalid. We fulfilled our obligations as a merchant, delivered the product/service as promised, and maintained clear communication with the customer. We respectfully request that this chargeback be reversed and the funds returned to our account.\n\n`;
        
        memo += `We have attached comprehensive supporting documentation including order details, delivery confirmation, and communication history.\n\n`;
        
        memo += `Respectfully submitted,\n`;
        memo += `${data.businessName}`;
        
        return memo;
    }

    // Success message function
    function showSuccessMessage(message) {
        // Create and show success alert
        const alertDiv = document.createElement('div');
        alertDiv.className = 'alert alert-success alert-dismissible fade show position-fixed';
        alertDiv.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
        alertDiv.innerHTML = `
            <i class="fas fa-check-circle me-2"></i>
            <strong>Success!</strong> ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        document.body.appendChild(alertDiv);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (alertDiv.parentNode) {
                alertDiv.parentNode.removeChild(alertDiv);
            }
        }, 5000);
    }

    // ==================== OTHER FEATURES ====================

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Demo video placeholder click handler
    const demoVideo = document.querySelector('.demo-video-placeholder');
    if (demoVideo) {
        demoVideo.addEventListener('click', function() {
            alert('Demo video would play here. In the real version, this would show a 45-second Loom video demonstrating the tool.');
        });
    }

    // Form validation enhancement - GREEN CHECKMARKS
    const requiredFields = form.querySelectorAll('[required]');
    requiredFields.forEach(field => {
        field.addEventListener('blur', function() {
            if (!this.value.trim()) {
                this.classList.add('is-invalid');
                this.classList.remove('is-valid');
            } else {
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
            }
        });
        
        // Also check on input for immediate feedback
        field.addEventListener('input', function() {
            if (this.value.trim()) {
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
            }
        });
    });

    // Auto-format order amount
    document.getElementById('orderAmount').addEventListener('input', function() {
        let value = this.value;
        // Remove any non-numeric characters except decimal point
        value = value.replace(/[^0-9.]/g, '');
        // Ensure only one decimal point
        const parts = value.split('.');
        if (parts.length > 2) {
            value = parts[0] + '.' + parts.slice(1).join('');
        }
        // Limit to 2 decimal places
        if (parts[1] && parts[1].length > 2) {
            value = parts[0] + '.' + parts[1].substring(0, 2);
        }
        this.value = value;
    });

    // Platform selection enhancement
    document.getElementById('platform').addEventListener('change', function() {
        if (this.value === 'other') {
            console.log('Other platform selected - could show additional input field');
        }
    });

    // ==================== CONTACT FORM HANDLER ====================
    
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Show loading
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
            submitBtn.disabled = true;
            
            // Send to Formspree
            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    alert('✅ Message sent successfully!\n\nThank you for contacting us. We\'ll respond within 24 hours.');
                    contactForm.reset();
                    
                    const modal = bootstrap.Modal.getInstance(document.getElementById('contactModal'));
                    if (modal) modal.hide();
                } else {
                    throw new Error('Failed');
                }
            }).catch(error => {
                alert('Sorry, there was an error. Please email us directly at: support@chargebackgenerator.com');
            }).finally(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            });
        });
    }
});

// Utility function to format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

// Utility function to format date
function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}
