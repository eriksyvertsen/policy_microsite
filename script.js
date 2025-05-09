
document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('.signup-form');
    
    forms.forEach(form => {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const emailInput = form.querySelector('input[type="email"]');
            const submitButton = form.querySelector('button');
            const originalButtonText = submitButton.textContent;
            
            try {
                submitButton.textContent = 'Subscribing...';
                submitButton.disabled = true;
                
                const response = await fetch('/subscribe', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: emailInput.value })
                });
                
                const data = await response.json();
                
                if (response.ok) {
                    emailInput.value = '';
                    alert('Thank you for subscribing!');
                } else {
                    throw new Error(data.error || 'Subscription failed');
                }
            } catch (error) {
                alert('Error: ' + error.message);
            } finally {
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
            }
        });
    });
});
