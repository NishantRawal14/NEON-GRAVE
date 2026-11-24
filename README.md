# 2AM SOCIETY — NEON GRAVE

Static landing page and ticket checkout UI for NEON GRAVE, 5 December 2026 at R Cube Resort near Chokhi Dhani.

## Run locally
Open `index.html` in a browser.

## Included
- Responsive editorial landing page
- Event detail / early-bird ticket prices
- Checkout form with name, email, phone, WhatsApp, pass quantities and payment choice
- UPI QR payment display (`assets/payment-qr.png`)
- WhatsApp order handoff to 2AM Society ticket contact
- Compact expandable terms and conditions

## Early-bird pricing
- Male stag: ₹999 (regular ₹1,499)
- Female stag: ₹999 (regular ₹1,499)
- Couple pass: ₹1,199 (regular ₹2,199)
Offer closes 2 December 2026.

## Important production note
This is a static front-end demo. It does not verify UPI payments or automatically send ticket PDFs/passes. To fulfill tickets automatically within 2 minutes, connect a payment gateway/webhook and a ticket/WhatsApp/email delivery backend. The checkout currently hands the customer order details to the organizer on WhatsApp.
