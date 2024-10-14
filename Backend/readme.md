# **Boiler Room: Email Marknadsföringsplattform**

# Projektöversikt

Målet är att skapa grunden till en email-marknadsföringsplattform med möjlighet för framtida AI-integration. Plattformen ska hantera användarautentisering och låta användare skapa marknadsföringskampanjer och hantera AI genererade emails kopplade till dessa kampanjer.

# Visuell Översikt och Struktur

Här har ni en Wireframe och en sitemap. Logga in och aktivera dark mode. Dark mode är nödvändigt för korrekt visning, annars blir designen oläslig. Wireframen är skapad med vita element som blir svarta i light mode. Detta är endast en wireframe så både utseende och funktioner är förslag.

# Tekniska krav

- Express.js för server
- Prisma ORM för databashantering
- PostgreSQL som databas
- Passport.js för autentisering (valfri strategi: Local eller OAuth)
- OpenAI API för framtida AI-integration
- Resend för email-utskick
- Frontend med React

# Steg-för-Steg Implementering

1. Användarhantering Mål: Låta användare registrera sig och logga in på plattformen. Implementering:

**1.Använd Passport.js för att hantera användarautentisering** ~ OAuth Strategy (t.ex. Google OAuth) ~

2. Skapa nödvändiga routes:

- [X] Registrering (för local strategy) eller OAuth-initiering
- [X] Inloggning
- [X] Callback-hantering (för OAuth)

3. [X] Spara användarinformation i User-modellen med hjälp av Prisma.
4. [ ] Implementera grundläggande felhantering och validering för användarinput Hur det hänger ihop:

- Användarautentisering är grunden för hela plattformen. Det säkerställer att kampanjer och AI genererade emails är kopplade till rätt användare.

2. Kampanjhantering Mål: Låta användare skapa och hantera marknadsföringskampanjer. Implementering:
3. Skapa CRUD-routes för Campaign-modellen:

- [X] POST /campaigns (skapa ny kampanj)
- [X] GET /campaigns (lista användarens kampanjer)
- [X] GET /campaigns/:id (visa specifik kampanj)

2. I Campaign-modellen, inkludera fält för:

- [X] campaignName
- [X] companyName
- [X] companyDescription
- [X] productDescription
- [X] targetAudience
- [X] har vi migrerat?🐌

# Hur det hänger ihop:

- Kampanjer är kopplade till den inloggade användaren via userId-fältet.
- Varje kampanj fungerar som en container för relaterade emails.

**3. GeneratedEmail-hantering**Mål: Möjliggöra skapande och hantering av emails kopplade till kampanjer, med förberedelse för framtida AI-integration. Implementering:

1. Skapa CRUD-routes för GeneratedEmail-modellen:

- [X] POST /campaigns/:campaignId/generate-email (skapa nytt email)
- [X] GET /campaigns/:campaignId/generated-emails (lista emails för en kampanj)
- [X] GET /campaigns/:campaignId/emails/:generatedEmailId (visa specifikt email)

2. I GeneratedEmail-modellen, inkludera fält för:

- [X] subject
- [X] content
- [X] recipients (Mottagare: array av email-adresser) Hur det hänger ihop:

- Emails är kopplade till en specifik kampanj via campaignId-fältet.
- Förberedelsen för AI-integration lägger grunden för framtida automatiserad innehållsgenerering.

4. GeneratedEmail-Utskick (Extra Uppgift) Mål: Implementera faktiskt email-utskick med Resend. Följ Resend Dokumentation Implementering:
5. I dokumentationen kommer ni se ett exempel där man använder “onboarding@resend.dev” som avsändare, det går bra att använda denna email som avsändare funkar för testning.
6. Installera Resend npm-paket.
7. Skapa en ny route för email-utskick: -[ ] POST /campaigns/:campaignId/emails/:emailId/send
8. Implementera logik för att hämta email-information och skicka via Resend API. Hur det hänger ihop:

- Denna funktionalitet använder data från GeneratedEmail-modellen för att skicka faktiska emails.
- Det kopplar ihop vårt system med verklig email-funktionalitet. Sammanfattning av Dataflöde

1. Användare registrerar/loggar in → User-modell
2. Användare skapar kampanj → Campaign-modell (kopplad till User)
3. Användare skapar AI genererat email för kampanj → GeneratedEmail-modell (kopplad till Campaign)
4. I framtiden: AI genererar innehåll baserat på kampanjinfo → sparas direkt i GeneratedEmail-modell
5. Användare redigerar/formaterar email-innehåll → uppdateras i GeneratedEmail-modell
6. GeneratedEmail skickas ut via Resend → använder data från GeneratedEmail-modell Framtidsplan: I en framtida version kommer steg 3 att automatiseras så att när en användare initierar email-skapande, genereras innehållet automatiskt av AI baserat på kampanj-informationen, och sparas direkt i GeneratedEmail-modellen. Användaren kan sedan redigera detta AI-genererade innehåll vid behov. Minimum Core Features
7. Användarhantering

- [ ] Registrering och inloggning med Passport.js (valfri strategi)

2. Kampanjhantering

- [ ] Skapa nya kampanjer
- [ ] Lista alla kampanjer för en användare
- [ ] Ta bort kampanjer

3. GeneratedEmail-hantering

- [ ] Skapa emails kopplade till kampanjer

4. AI-driven Innehållsgenerering (Implementeras under AI kursen)

- [ ] AI-genererat email-innehåll baserat på kampanjinformation Optional Features

1. Validering
2. Redigera befintliga kampanjer
3. Utskickshantering a. Integrera med Resend för email-utskick b. Spåra utskicksstatus (skickat datum/tid)
4. Grundläggande Rapportering a. Visa antal mottagare per email b. Visa utskicksdatum för emails
5. Utloggning
6. Implementera en av följande alternativ för email-innehållsredigering: a) Enkel texteditor b) Email-mall med platshållare c) Avancerad WYSIWYG-editor PUT /campaigns/:campaignId/emails/:emailId (uppdatera email) DELETE /campaigns/:campaignId/emails/:emailId (ta bort email)
7. Glömt lösenord för Local Strategy (med Resend)

## Några av dessa features kan täckas under framtida kurser

1. Testautomatisering
2. Continuous Integration (CI): Automatisering av integration och testning av kodändringar så ofta som möjligt.
3. Continuous Deployment (CD): Automatiserad distribution av applikationen efter att den passerat testerna i CI-processen
4. Deployment to cloud
5. Deployment with Docker
