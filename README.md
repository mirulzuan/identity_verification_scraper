# identity_verification_scraper
A simple web scraper to verify the validity of a user's Identification Card Number (IC) by scraping the Suruhanjaya Pilihan Raya (SPR) portal. Use case: To check if IC and name are matched (of course, we can fetch more data from the portal if needed 😉).

### Written with ExpressJS.

How to start?
```
# Build images
docker-compose build

# Build CSS
docker-compose run app npm run build:css

# Start
docker-compose up
```
How to use?
1. Enter MyKad number
  <img width="1440" alt="Screenshot 2024-10-20 at 11 09 40 PM" src="https://github.com/user-attachments/assets/be6d89b8-caaa-4357-a1e9-1598d1b0e082">

2. Enter stored Captcha
  <img width="1440" alt="Screenshot 2024-10-20 at 11 10 24 PM" src="https://github.com/user-attachments/assets/3d15cd07-faa1-490a-bb98-7312ca9b113b">

3. Verify result
  <img width="1440" alt="Screenshot 2024-10-20 at 11 11 21 PM" src="https://github.com/user-attachments/assets/7b08684b-8f38-4e1e-bd8a-69cda2798a8a">
