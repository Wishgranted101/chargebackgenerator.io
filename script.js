// Chargeback Evidence Generator MVP - JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('evidenceForm');
    const loadingModal = new bootstrap.Modal(document.getElementById('loadingModal'));

    // Form submission handler
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading modal
        loadingModal.show();
        
        // Simulate processing time
        setTimeout(() => {
            generateEvidencePack();
            loadingModal.hide();
        }, 2000);
    });

    // Check if user has already generated a free PDF
function checkFreeUsageLimit() {
    const usageKey = 'evidencePackGenerated';
    const hasGenerated = localStorage.getItem(usageKey);
    
    if (hasGenerated === 'true') {
        // User has already generated one
        return false;
    }
    return true;
}

// Mark that user has generated a PDF
function markPDFGenerated() {
    localStorage.setItem('evidencePackGenerated', 'true');
    localStorage.setItem('generatedDate', new Date().toISOString());
}

// Add this check in your form submission handler
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
            'Email: wichlyc@gmail.com'
        );
        return;
    }
    
    // Show loading modal
    loadingModal.show();
    
    // Simulate processing time
    setTimeout(() => {
        generateEvidencePack();
        markPDFGenerated(); // Mark as generated
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

        // Generate PDF using jsPDF
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        // Set up document
        let yPosition = 20;
        const lineHeight = 7;
        const pageWidth = doc.internal.pageSize.width;
        const pageHeight = doc.internal.pageSize.height;
        const margin = 20;
        const contentWidth = pageWidth - (margin * 2);

        // Helper function to add text with word wrapping
        function addWrappedText(text, x, y, maxWidth, fontSize = 12) {
            doc.setFontSize(fontSize);
            const lines = doc.splitTextToSize(text, maxWidth);
            doc.text(lines, x, y);
            return y + (lines.length * lineHeight);
        }

        // Helper function to add section header
        function addSectionHeader(title, y) {
            doc.setFontSize(14);
            doc.setFont(undefined, 'bold');
            doc.setTextColor(13, 110, 253); // Primary blue color
            doc.text(title, margin, y);
            doc.setTextColor(0, 0, 0); // Reset to black
            doc.setFont(undefined, 'normal');
            return y + 10;
        }

        // Helper function to check for page break
        function checkPageBreak(currentY, neededSpace = 40) {
            if (currentY > pageHeight - neededSpace) {
                doc.addPage();
                return 20;
            }
            return currentY;
        }

        // Document Header
        doc.setFontSize(20);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(13, 110, 253);
        yPosition = addWrappedText('CHARGEBACK EVIDENCE PACK', margin, yPosition, contentWidth, 20);
        
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.setFont(undefined, 'normal');
        yPosition = addWrappedText(`Generated on: ${new Date().toLocaleDateString()}`, margin, yPosition + 5, contentWidth);
        yPosition += 15;

        // Order Information Section
        yPosition = checkPageBreak(yPosition);
        yPosition = addSectionHeader('ORDER INFORMATION', yPosition);
        yPosition = addWrappedText(`Order ID: ${formData.orderId}`, margin, yPosition, contentWidth);
        yPosition = addWrappedText(`Order Date: ${formData.orderDate}`, margin, yPosition, contentWidth);
        yPosition = addWrappedText(`Order Amount: $${formData.orderAmount}`, margin, yPosition, contentWidth);
        yPosition = addWrappedText(`Platform: ${formData.platform}`, margin, yPosition, contentWidth);
        yPosition += 10;

        // Merchant & Customer Information Section
        yPosition = checkPageBreak(yPosition);
        yPosition = addSectionHeader('MERCHANT & CUSTOMER INFORMATION', yPosition);
        yPosition = addWrappedText(`Business Name: ${formData.businessName}`, margin, yPosition, contentWidth);
        yPosition = addWrappedText(`Business Contact: ${formData.businessContact}`, margin, yPosition, contentWidth);
        yPosition = addWrappedText(`Customer Name: ${formData.customerName}`, margin, yPosition, contentWidth);
        yPosition = addWrappedText(`Customer Email: ${formData.customerEmail}`, margin, yPosition, contentWidth);
        yPosition += 3;
        yPosition = addWrappedText('Billing/Shipping Address:', margin, yPosition, contentWidth);
        yPosition = addWrappedText(formData.billingShippingAddress, margin, yPosition, contentWidth);
        yPosition += 10;

        // Order Details Section
        yPosition = checkPageBreak(yPosition);
        yPosition = addSectionHeader('ORDER DETAILS', yPosition);
        yPosition = addWrappedText(formData.orderSummary, margin, yPosition, contentWidth);
        yPosition += 10;

        // Shipping Information Section
        yPosition = checkPageBreak(yPosition);
        yPosition = addSectionHeader('SHIPPING & DELIVERY PROOF', yPosition);
        yPosition = addWrappedText('Shipping Address:', margin, yPosition, contentWidth);
        yPosition = addWrappedText(formData.shippingAddress, margin, yPosition, contentWidth);
        if (formData.trackingNumber) {
            yPosition = addWrappedText(`Tracking Number: ${formData.trackingNumber}`, margin, yPosition, contentWidth);
        }
        if (formData.deliveryDate) {
            yPosition = addWrappedText(`Delivery Date: ${formData.deliveryDate}`, margin, yPosition, contentWidth);
        }
        yPosition += 10;

        // Customer Communication Section
        if (formData.customerCommunication) {
            yPosition = checkPageBreak(yPosition, 60);
            yPosition = addSectionHeader('COMMUNICATION HISTORY', yPosition);
            yPosition = addWrappedText(formData.customerCommunication, margin, yPosition, contentWidth);
            yPosition += 10;
        }

        // Refund Policy Section
        if (formData.refundPolicy) {
            yPosition = checkPageBreak(yPosition, 60);
            yPosition = addSectionHeader('REFUND/TERMS OF SERVICE POLICY', yPosition);
            yPosition = addWrappedText(formData.refundPolicy, margin, yPosition, contentWidth);
            yPosition += 10;
        }

        // Rebuttal Memo Section
        if (formData.rebuttalMemo) {
            yPosition = checkPageBreak(yPosition, 80);
            yPosition = addSectionHeader('REBUTTAL MEMO', yPosition);
            yPosition = addWrappedText(formData.rebuttalMemo, margin, yPosition, contentWidth);
            yPosition += 10;
        }

        // Evidence Summary Section
        yPosition = checkPageBreak(yPosition, 80);
        yPosition = addSectionHeader('EVIDENCE SUMMARY', yPosition);
        
        const evidenceSummary = `This evidence pack contains comprehensive documentation for Order ${formData.orderId} placed on ${formData.orderDate} for $${formData.orderAmount}.

Key Evidence Points:
• Valid order with complete customer and shipping information
• Product delivered to the address provided by the customer
${formData.trackingNumber ? '• Tracking information available showing delivery confirmation' : ''}
${formData.customerCommunication ? '• Customer communication logs included' : ''}
• Clear refund/return policy was in effect at time of purchase

This transaction was legitimate and fulfilled according to our terms of service. The customer received the product(s) as ordered and described.`;
        
        yPosition = addWrappedText(evidenceSummary.trim(), margin, yPosition, contentWidth);

        // Footer
        doc.setFontSize(10);
        doc.setTextColor(108, 117, 125); // Muted color
        doc.text('Generated by Chargeback Evidence Pack Generator', margin, pageHeight - 10);

        // Save the PDF
        const fileName = `Chargeback_Evidence_${formData.orderId}_${new Date().toISOString().split('T')[0]}.pdf`;
        doc.save(fileName);

        // Show success message
        showSuccessMessage('Your evidence pack has been generated and downloaded.');
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
    function showSuccessMessage(message = 'Your evidence pack has been generated and downloaded.') {
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
            // In a real implementation, this would open a video modal or redirect to a video
            alert('Demo video would play here. In the real version, this would show a 45-second Loom video demonstrating the tool.');
        });
    }

    // Form validation enhancement
    const requiredFields = form.querySelectorAll('[required]');
    requiredFields.forEach(field => {
        field.addEventListener('blur', function() {
            if (!this.value.trim()) {
                this.classList.add('is-invalid');
            } else {
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

    // Contact form handler
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
