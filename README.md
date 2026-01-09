LegacyPi - Humanitarian Treasury Fund
Opis Projekta
LegacyPi je decentralizirani fond za likvidnost i humanitarnu pomoć u Pi ekosustavu, upravljan isključivo voljom zajednice putem pametnih ugovora (Smart Contracts).

Tehnološki Stack
Frontend
React.js - Moderno korisničko sučelje
Next.js - Server-side rendering i routing
Tailwind CSS - Responsive dizajn
Emotional Minimalism - Dizajn filozofija
Backend
Node.js - Server logika
MongoDB - Baza podataka za korisničke priče i bedževe
Pi Network SDK - Blockchain integracija
Blockchain
Pi Network Smart Contracts - Time-locked treasury
Immutable Lock Date - 2030-01-01 (ne može se promijeniti)
Sigurnosne Značajke
1. Time-Lock Mehanizam
// Hard-coded unlock date - CANNOT be changed
private readonly UNLOCK_DATE = new Date("2030-01-01T00:00:00Z")
Datum otključavanja je zakodiran u smart contract
Ni admin ne može promijeniti datum
Sve isplate prije 2030 su automatski odbijene
2. Community Governance
Nakon 2030, zajednica glasa o raspodjeli sredstava
Smart contract izvršava odluke zajednice
Transparentnost svih transakcija
3. Blockchain Verifikacija
Sve donacije zapisane na Pi Network blockchainu
Nepromjenjivi zapis svih transakcija
Javna provjera stanja trezora
Dizajn Filozofija: "Emotional Minimalism"
Vizualni Elementi
Tamno ljubičasta pozadina (Pi Brand boja)
Zlatne čestice koje plutaju prema gore (simboliziraju nadu)
"Srce Trezora" - animirani krug koji "diše"
Slide to Pledge - korisnik klizne prstom za donaciju
Humanitarni Fokus
Umjesto "$" vrijednosti: "Potencijal za pomoć: Ogroman"
Poruka nakon donacije: "Hvala što gradiš budućnost"
Fokus na zajednicu, ne profit
API Endpoints
GET /api/treasury
Vraća trenutno stanje trezora

{
  "totalPi": 125847.32,
  "lockDate": "2030-01-01T00:00:00Z",
  "communityMembers": 8432,
  "projectsSupported": 47
}
POST /api/treasury
Kreira novu donaciju

{
  "amount": 100,
  "walletAddress": "pi_wallet_xxx"
}
POST /api/treasury/validate-unlock
Provjerava da li je dozvoljeno otključavanje

{
  "allowed": false,
  "message": "Treasury je zakljucan do 2030"
}
Kako Pokrenuti Projekt
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
Pi Network Integracija
// Initialize Pi SDK
await piNetwork.initialize()

// Authenticate user
const user = await piNetwork.authenticate()

// Create payment
const paymentId = await piNetwork.createPayment({
  amount: 100,
  memo: "LegacyPi Donation",
  metadata: { purpose: "humanitarian_aid" }
})
Sigurnost i Transparentnost
✅ Time-locked do 2030
✅ Community governance
✅ Blockchain verifikacija
✅ Open-source kod
✅ Javna dokumentacija
LegacyPi - Gradimo budućnost zajedno 🌟

About
legacy-pi.vercel.app
Resources
 Readme
 Activity
Stars
 1 star
Watchers
 0 watching
Forks
 0 forks
Releases
No releases published
Create a new release
Packages
No packages published
Publish your first package
Contributors
2
@Muradifs
Muradifs Muradif Smajlović
@vercel[bot]
vercel[bot]
Deployments
75
 Production
 Preview 2 days ago
+ 73 deployments
Languages
TypeScript
95.5%
 
CSS
4.3%
 
JavaScript
0.2%
Suggested workflows
Based on your tech stack
Webpack logo
Webpack
Build a NodeJS project with npm and webpack.
SLSA Generic generator logo
SLSA Generic generator
Generate SLSA3 provenance for your existing release workflows
Deno logo
Deno
Test your Deno project
More workflows
Footer
