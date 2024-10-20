# identity_verification_scraper
A simple web scraper to verify the validity of a user's Identification Card Number (IC) by scraping the Suruhanjaya Pilihan Raya (SPR) portal. The scraper should send the IC number to the portal, extract the relevant data, and determine if the IC number is valid for client onboarding (for example).

How to start?
```
# Build images
docker-compose build

# Build CSS
docker-compose run app npm run build:css

# Start
docker-compose up
```
