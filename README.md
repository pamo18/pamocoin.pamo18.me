## jsramverk, PamoCoin

## Badges

[![Build Status](https://travis-ci.org/pamo18/pamocoin.pamo18.me.svg?branch=master)](https://travis-ci.org/pamo18/pamocoin.pamo18.me)



[![Build Status](https://scrutinizer-ci.com/g/pamo18/pamocoin.pamo18.me/badges/build.png?b=master)](https://scrutinizer-ci.com/g/pamo18/pamocoin.pamo18.me/build-status/master)
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/pamo18/pamocoin.pamo18.me/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/pamo18/pamocoin.pamo18.me/?branch=master)

## Frontend

Denna klient är Frontend till Trading Plattformen Pamocoin Pro deployed at [https://pamocoin.pamo18.me](https:pamocoin.pamo18.me/).

Klienten är byggt med React, vilket ibland klassificeras som ett JavaScript ramverk eller ett bibliotek.  Klienten jobbar mot servern som användargränssnitt samt för att visuellt presentera trading plattformens funktionalitet.  React erbjuder ett smart och effektivt sätt att bygga Single Page Applications, SPA, där sidan uppdateras utan att den behöver laddas om.  En React applikation är uppbyggt av många återanvändbara komponenter, likt moduler, där komponentens State bestämmer när saker ska uppdateras.  React erbjuder då ett effektivt och snabbt sätt att bygga applikationer med.

Trading plattformen är strukturerat runt tre huvudkomponenter, en Header, Main innehåll samt en Footer.  En router används för att visa applikationens olika innehåll beroende på den aktuella URL, som hanteras genom navigationsmenyn som finns i Headern, eller Footern beroende på skärmstorleken.  Klienten kopplar upp sig mot serverns API genom Fetch, en annan API som används för att skicka requests och ta emot svar till och från en server.  För att kunna handla samt ha åtkomst till användarens specifika detaljer måste en token verifieras mot servern med godkänt resultat annars visas enbart en begränsad vy.  För att få en token måste användaren registrera sig samt logga in.  Token verifieringen erbjuder ett säkert och effektivt sätt att kontrollera vilka sidor och funktionalitet som ska vara tillgängliga.

På Trade sidan när man är inloggad kan användaren köpa två olika digitala valutor mot kronor.  Man kan också handla mellan de två digitala valutorna.  Användaren kan också sälja dessa köpta valutor mot kronor.  När inloggad kan användare se sin plånbok som innehåller köpta digitala valutor samt kronor.  Det finns även möjligheten att kunna fylla på plånboken med kronor för att handla med.  En orderhistorik visar detaljer av användarens trading aktivitet.

Denna React klient är responsivt designat för att kunna användas på enheter av olika storlekar.  På Trading sidan används det två kolumner, Order form samt Price Charts, som visas bredvid varandra på större skärmar och staplade på mindre skärmar.  Navigationsmenyn visas överst i Header delen på större skärmar och på mindre skärmar visas den i Footer delen, fast positionerat längst ned för enkel tillgänglighet på mobila enheter.  Tabeller på orderhistorik sidan är också responsiva för bättre läsning på mindre skärmar.  Det finns två bryt punkter, en på 930px där mycket är anpassat till mindre skärmar och en till på 500px där specifika fontstorlekar minskar för riktig mindre skärmar.

## Testning

Testningar till min Frontend består av 7st Selenium tester, där jag förklarar 5st use-cases nedan:

1. Användare ska från förstasidan klicka på About i navigationsmeny för att bli presenterat med detaljer om Trading Plattformen.

2.	Användare ska från förstasidan klicka på Register i navigationsmeny för att bli presenterat med ett registreringsformulär.

3.	Användare ska från första sidan klicka på Login i navigationsmenyn för att komma till inloggningssidan.  Sedan skriver användaren in sin använder namn ihop med lösenord och klickar på knappen Login.  Efter inloggningen är användaren omdirigerade till Trade sidan.

4.	Användare ska från första sidan klicka på Login i navigationsmenyn för att komma till inloggningssidan.  Sedan skriver användaren in sin använder namn ihop med lösenord och klickar på knappen Login.  Efter inloggningen är användaren omdirigerade till Trade sidan och klickar sedan på My Wallet för att bli presenterade med sin aktuella tradingplånbok.

5.	Användare ska från första sidan klicka på Login i navigationsmenyn för att komma till inloggningssidan.  Sedan skriver användaren in sin använder namn ihop med lösenord och klickar på knappen Login.  Efter inloggningen är användaren omdirigerade till Trade sidan och klickar sedan på My Profile för att bli presenterade med sina personliga detaljer.
