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

    // Generate Evidence Pack Function
    function generateEvidencePack() {
        // Get form data
        const formData = {
            orderId: document.getElementById('orderId').value,
            orderDate: document.getElementById('orderDate').value,
            orderAmount: document.getElementById('orderAmount').value,
            platform: document.getElementById('platform').value,
            customerName: document.getElementById('customerName').value,
            customerEmail: document.getElementById('customerEmail').value,
            shippingAddress: document.getElementById('shippingAddress').value,
            trackingNumber: document.getElementById('trackingNumber').value,
            deliveryDate: document.getElementById('deliveryDate').value,
            productDescription: document.getElementById('productDescription').value,
            customerCommunication: document.getElementById('customerCommunication').value,
            refundPolicy: document.getElementById('refundPolicy').value
        };

        // Generate PDF using jsPDF
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        // Set up document
        let yPosition = 20;
        const lineHeight = 7;
        const pageWidth = doc.internal.pageSize.width;
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
        yPosition = addSectionHeader('ORDER INFORMATION', yPosition);
        yPosition = addWrappedText(`Order ID: ${formData.orderId}`, margin, yPosition, contentWidth);
        yPosition = addWrappedText(`Order Date: ${formData.orderDate}`, margin, yPosition, contentWidth);
        yPosition = addWrappedText(`Order Amount: $${formData.orderAmount}`, margin, yPosition, contentWidth);
        yPosition = addWrappedText(`Platform: ${formData.platform}`, margin, yPosition, contentWidth);
        yPosition += 10;

        // Customer Information Section
        yPosition = addSectionHeader('CUSTOMER INFORMATION', yPosition);
        yPosition = addWrappedText(`Customer Name: ${formData.customerName}`, margin, yPosition, contentWidth);
        yPosition = addWrappedText(`Customer Email: ${formData.customerEmail}`, margin, yPosition, contentWidth);
        yPosition += 10;

        // Shipping Information Section
        yPosition = addSectionHeader('SHIPPING INFORMATION', yPosition);
        yPosition = addWrappedText(`Shipping Address: ${formData.shippingAddress}`, margin, yPosition, contentWidth);
        if (formData.trackingNumber) {
            yPosition = addWrappedText(`Tracking Number: ${formData.trackingNumber}`, margin, yPosition, contentWidth);
        }
        if (formData.deliveryDate) {
            yPosition = addWrappedText(`Delivery Date: ${formData.deliveryDate}`, margin, yPosition, contentWidth);
        }
        yPosition += 10;

        // Product Information Section
        yPosition = addSectionHeader('PRODUCT INFORMATION', yPosition);
        yPosition = addWrappedText(`Product Description: ${formData.productDescription}`, margin, yPosition, contentWidth);
        yPosition += 10;

        // Check if we need a new page
        if (yPosition > 250) {
            doc.addPage();
            yPosition = 20;
        }

        // Customer Communication Section
        if (formData.customerCommunication) {
            yPosition = addSectionHeader('CUSTOMER COMMUNICATION', yPosition);
            yPosition = addWrappedText(formData.customerCommunication, margin, yPosition, contentWidth);
            yPosition += 10;
        }

        // Refund Policy Section
        if (formData.refundPolicy) {
            // Check if we need a new page
            if (yPosition > 200) {
                doc.addPage();
                yPosition = 20;
            }
            yPosition = addSectionHeader('REFUND/RETURN POLICY', yPosition);
            yPosition = addWrappedText(formData.refundPolicy, margin, yPosition, contentWidth);
            yPosition += 10;
        }

        // Evidence Summary Section
        if (yPosition > 220) {
            doc.addPage();
            yPosition = 20;
        }
        yPosition = addSectionHeader('EVIDENCE SUMMARY', yPosition);
        
        const evidenceSummary = `
This evidence pack contains comprehensive documentation for Order ${formData.orderId} placed on ${formData.orderDate} for $${formData.orderAmount}.

Key Evidence Points:
• Valid order with complete customer and shipping information
• Product delivered to the address provided by the customer
${formData.trackingNumber ? '• Tracking information available showing delivery confirmation' : ''}
${formData.customerCommunication ? '• Customer communication logs included' : ''}
• Clear refund/return policy was in effect at time of purchase

This transaction was legitimate and fulfilled according to our terms of service. The customer received the product(s) as ordered and described.
        `;
        
        yPosition = addWrappedText(evidenceSummary.trim(), margin, yPosition, contentWidth);

        // Footer
        doc.setFontSize(10);
        doc.setTextColor(108, 117, 125); // Muted color
        doc.text('Generated by Chargeback Evidence Pack Generator', margin, doc.internal.pageSize.height - 10);

        // Save the PDF
        const fileName = `Chargeback_Evidence_${formData.orderId}_${new Date().toISOString().split('T')[0]}.pdf`;
        doc.save(fileName);

        // Show success message
        showSuccessMessage();
    }

    // Success message function
    function showSuccessMessage() {
        // Create and show success alert
        const alertDiv = document.createElement('div');
        alertDiv.className = 'alert alert-success alert-dismissible fade show position-fixed';
        alertDiv.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
        alertDiv.innerHTML = `
            <i class="fas fa-check-circle me-2"></i>
            <strong>Success!</strong> Your evidence pack has been generated and downloaded.
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
    document.querySelector('.demo-video-placeholder').addEventListener('click', function() {
        // In a real implementation, this would open a video modal or redirect to a video
        alert('Demo video would play here. In the real version, this would show a 45-second Loom video demonstrating the tool.');
    });

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
            // In a real implementation, you might show an additional input field
            console.log('Other platform selected - could show additional input field');
        }
    });
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
