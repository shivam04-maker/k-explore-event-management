# K Explore — Event Management Website

A responsive event discovery and registration website built with **HTML5, CSS3 and vanilla JavaScript**, following the K Explore web-design assignment.

## Features
- Responsive layout for mobile, tablet and desktop.
- Hero section, event cards, about section and registration section.
- Search events by title, category, venue or description.
- Category filters: Music, Technology, Art and Wellness.
- Event detail dialog with date, time, venue, price and description.
- Registration form with JavaScript validation for name, email, Indian mobile number, event selection and consent.
- Successful-registration confirmation.
- Registration data saved in browser Local Storage (`kExploreRegistrations`).
- Dark/light theme saved in Local Storage.
- Countdown to the next upcoming event.
- Mobile navigation and reduced-motion support.

## Run locally
No framework or package installation is needed.

1. Download or clone this repository.
2. Open `index.html` in a browser, or use VS Code Live Server.
3. The event images are loaded from Unsplash, so an internet connection is needed for those images and Google Fonts.

## Customize events
Edit the `events` array near the top of `script.js`. Each event has:
- `id`, `title`, `category`
- `date` in `YYYY-MM-DD` format
- `time`, `venue`, `price`, `description`, `image`

The countdown automatically selects the next future event based on its date.

## Registration data
This is a front-end demonstration. Registrations are stored only in the current browser and device using Local Storage. They are **not** sent to a server, and users cannot see registrations made on another device. For a production website, connect a secure backend and database.

To inspect saved registrations, open browser Developer Tools → Application/Storage → Local Storage → `kExploreRegistrations`.

## Deploy
### GitHub Pages
1. Create a GitHub repository and upload `index.html`, `style.css`, `script.js` and `README.md`.
2. Open repository **Settings → Pages**.
3. Under Build and deployment, choose **Deploy from a branch**.
4. Select `main` and `/ (root)`, then Save.
5. GitHub Pages will provide the deployed website URL.

### Netlify
1. Sign in to Netlify and choose **Add new site → Deploy manually**.
2. Drag the project folder into the deploy area, or connect the GitHub repository.
3. Netlify will generate a public URL.

### Vercel
1. Import the GitHub repository into Vercel.
2. Choose the project root. No build command is required.
3. Deploy.

## Suggested submission checklist
- [ ] Test search and every category filter.
- [ ] Open every event detail and test its registration shortcut.
- [ ] Test empty and invalid form submissions.
- [ ] Submit a valid registration and check Local Storage.
- [ ] Test light/dark mode and refresh the page.
- [ ] Test the navigation and layout at mobile width.
- [ ] Add your own event details and images.
- [ ] Add the GitHub repository URL and deployed URL to your submission.
