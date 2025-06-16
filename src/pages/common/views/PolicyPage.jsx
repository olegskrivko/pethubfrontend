import React, { useRef } from 'react';
import { Grid, Container, Typography, Box, Stack, Link } from '@mui/material';

const PolicyPage = () => {
  const paragraphRefs = useRef([]);

  const scrollToParagraph = (index) => {
    if (paragraphRefs.current[index]) {
      paragraphRefs.current[index].scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const sectionTitles = [
    'Privātuma politika',
    'Sīkdatņu politika',
    'Pakalpojumu noteikumi',
    'Datu aizsardzības politika',
    'Atruna',
    'Kopienas vadlīnijas',
  ];

  return (
    <Container component="main" maxWidth="lg">
      <Typography
        variant="h4"
        align="center"
        sx={{
          mb: 5,
          fontWeight: 800,
          background: 'linear-gradient(60deg, #16477c 0%, #00b5ad 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Privātuma, sīkdatņu politika un pakalpojumu noteikumi
      </Typography>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, color: '#16477c' }}>
          Saturs
        </Typography>
        <Stack spacing={1} mt={1}>
          {sectionTitles.map((title, i) => (
            <Typography key={i} variant="body1">
              <Link
                component="button"
                onClick={() => scrollToParagraph(i)}
                sx={{
                  textDecoration: 'none',
                  color: '#1976d2',
                  '&:visited': { color: '#1976d2' },
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                {i + 1}. {title}
              </Link>
            </Typography>
          ))}
        </Stack>
      </Box>

      {/* Privacy Policy Section */}
      <Box id="privacy-policy" ref={(el) => (paragraphRefs.current[0] = el)} sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, color: '#16477c' }}>
          1. Privātuma politika
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box sx={{ mb: 3 }}>
              <Typography paragraph sx={{ fontSize: '1rem', lineHeight: 1.6 }}>
                Mēs ("mēs", "mūs" vai "mūsu") pārvaldām tīmekļa lietotni (turpmāk "Lietotne"). Šī Privātuma politika
                apraksta mūsu praksi attiecībā uz personiskās informācijas vākšanu, izmantošanu un izpaušanu, ko sniedz
                Lietotnes lietotāji.
              </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                Informācija, ko mēs vācām
              </Typography>
              <Typography paragraph sx={{ fontSize: '1rem', lineHeight: 1.6 }}>
                Personīgā informācija: mēs varam vākt personīgu informāciju, piemēram, vārdu, uzvārdu, e-pasta adresi,
                tālruņa numuru, saglabātās vietas, mājdzīvnieku datus, valsti un vēlamo valodu.
              </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                Kā mēs izmantojam jūsu informāciju
              </Typography>
              <Typography paragraph sx={{ fontSize: '1rem', lineHeight: 1.6 }}>
                Mēs izmantojam savākto informāciju, lai nodrošinātu un uzlabotu mūsu pakalpojumus, tostarp atvieglotu
                mājdzīvnieku atgriešanos, personalizētu lietotāja pieredzi un sazinātos ar lietotājiem. Jūsu personīgā
                informācija var tikt izmantota, lai atbildētu uz pieprasījumiem, sniegtu tehnisko atbalstu un sūtītu
                paziņojumus, kas saistīti ar Lietotni.
              </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                Datu drošība
              </Typography>
              <Typography paragraph sx={{ fontSize: '1rem', lineHeight: 1.6 }}>
                Mēs īstenojam atbilstošus drošības pasākumus, lai aizsargātu jūsu personīgo informāciju no
                nesankcionētas piekļuves, izpaušanas, izmaiņām vai iznīcināšanas. Lietotāju paroles ir šifrētas, lai
                nodrošinātu drošību.
              </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                Datu saglabāšana un dzēšana
              </Typography>
              <Typography paragraph sx={{ fontSize: '1rem', lineHeight: 1.6 }}>
                Lietotājiem ir tiesības piekļūt, atjaunināt vai dzēst savu personīgo informāciju, kas uzglabāta
                Lietotnē. Pēc pieprasījuma mēs dzēsīsim lietotāja datus, tostarp personīgo informāciju, ziņas un citus
                saistītus datus.
              </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                Informācijas izpaušana trešajām personām
              </Typography>
              <Typography paragraph sx={{ fontSize: '1rem', lineHeight: 1.6 }}>
                Mēs nepārdodam, nenododam un nepārvedam jūsu personīgo informāciju trešajām personām bez jūsu
                piekrišanas, izņemot gadījumus, kad to prasa likums vai lai atvieglotu Lietotnes nodrošinātos
                pakalpojumus.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Cookie Policy Section */}
      <Box id="privacy-policy" ref={(el) => (paragraphRefs.current[1] = el)} sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, color: '#16477c' }}>
          2. Sīkdatņu politika
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box sx={{ mb: 3 }}>
              <Typography paragraph sx={{ fontSize: '1rem', lineHeight: 1.6 }}>
                Šī sīkdatņu politika izskaidro, kā mēs izmantojam sīkdatnes un līdzīgas izsekošanas tehnoloģijas mūsu
                tīmekļa vietnē un mobilajā lietotnē (kopīgi sauktas par "Lietotni").
              </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                Kas ir sīkdatnes?
              </Typography>
              <Typography paragraph sx={{ fontSize: '1rem', lineHeight: 1.6 }}>
                Sīkdatnes ir mazi teksta faili, kas tiek saglabāti jūsu ierīcē, kad apmeklējat tīmekļa vietni vai
                izmantojat mobilo lietotni. Tās ļauj tīmekļa vietnei vai lietotnei atcerēties jūsu darbības un
                iestatījumus laika gaitā.
              </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                Kā mēs izmantojam sīkdatnes
              </Typography>
              <Typography paragraph sx={{ fontSize: '1rem', lineHeight: 1.6 }}>
                Mēs izmantojam sīkdatnes un līdzīgas izsekošanas tehnoloģijas šādiem mērķiem:
              </Typography>
              <ul>
                <li>
                  <Typography sx={{ fontSize: '1rem', lineHeight: 1.6 }}>
                    Nepieciešamās sīkdatnes - Šīs sīkdatnes ir nepieciešamas Lietotnes darbībai un pamata
                    funkcionalitātes nodrošināšanai.
                  </Typography>
                </li>
                <li>
                  <Typography sx={{ fontSize: '1rem', lineHeight: 1.6 }}>
                    Veiktspējas un analītiskās sīkdatnes - Šīs sīkdatnes palīdz mums analizēt, kā lietotāji
                    mijiedarbojas ar Lietotni, ļaujot uzlabot tās veiktspēju un lietotāja pieredzi.
                  </Typography>
                </li>
                <li>
                  <Typography sx={{ fontSize: '1rem', lineHeight: 1.6 }}>
                    Funkcionalitātes sīkdatnes - Šīs sīkdatnes aktivizē noteiktas Lietotnes funkcijas, piemēram,
                    personalizāciju un valodas iestatījumus.
                  </Typography>
                </li>
                <li>
                  <Typography sx={{ fontSize: '1rem', lineHeight: 1.6 }}>
                    Reklāmas sīkdatnes - Mēs varam izmantot trešo pušu reklāmas sīkdatnes, lai rādītu personalizētas
                    reklāmas, pamatojoties uz jūsu pārlūkošanas uzvedību.
                  </Typography>
                </li>
              </ul>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                Jūsu izvēles attiecībā uz sīkdatnēm
              </Typography>
              <Typography paragraph sx={{ fontSize: '1rem', lineHeight: 1.6 }}>
                Jums ir iespēja pieņemt vai atteikt sīkdatnes. Lielākā daļa tīmekļa pārlūku automātiski pieņem
                sīkdatnes, taču jūs parasti varat mainīt pārlūka iestatījumus, lai atteiktos no sīkdatnēm, ja vēlaties.
                Tomēr tas var liegt jums piekļūt dažām Lietotnes funkcijām.
              </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                Trešo pušu sīkdatnes
              </Typography>
              <Typography paragraph sx={{ fontSize: '1rem', lineHeight: 1.6 }}>
                Mēs varam atļaut trešo pušu pakalpojumu sniedzējiem novietot sīkdatnes uz Lietotnes, lai sniegtu mums
                analītiskos un reklāmas pakalpojumus. Šīs sīkdatnes ir pakļautas attiecīgo trešo pušu konfidencialitātes
                politikām.
              </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                Šīs politikas atjauninājumi
              </Typography>
              <Typography paragraph sx={{ fontSize: '1rem', lineHeight: 1.6 }}>
                Mēs periodiski atjaunināsim šo privātuma un sīkdatņu politiku, lai atspoguļotu izmaiņas mūsu praksē vai
                juridiskajās prasībās. Aicinām jūs regulāri pārskatīt šo politiku, lai būtu informēti par jebkādām
                izmaiņām.
              </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                Sazinieties ar mums
              </Typography>
              <Typography paragraph sx={{ fontSize: '1rem', lineHeight: 1.6 }}>
                Ja jums ir jautājumi vai bažas par šo Privātuma politiku, Sīkdatņu politiku vai mūsu datu praksi, lūdzu,
                sazinieties ar mums, izmantojot informāciju, kas sniegta mūsu kontaktu lapā.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Terms of Service Section */}
      <Box id="terms-of-service" ref={(el) => (paragraphRefs.current[2] = el)} sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, color: '#16477c' }}>
          3. Pakalpojumu noteikumi
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Typography paragraph>
              Šie Pakalpojumu sniegšanas noteikumi ("Noteikumi") regulē jūsu lietotnes ("Lietotne"), ko pārvalda mūsu
              komanda ("mēs", "mūsu" vai "mūsējo"), izmantošanu.
            </Typography>

            <Typography variant="h5" sx={{ fontWeight: 500, mt: 3 }}>
              Piekrišana noteikumiem
            </Typography>
            <Typography paragraph>
              Piekļūstot vai izmantojot Lietotni, jūs piekrītat būt saistīts ar šiem Noteikumiem. Ja jūs nepiekrītat
              kādai no Noteikumu daļām, tad jums nav tiesību piekļūt Lietotnei.
            </Typography>

            <Typography variant="h5" sx={{ fontWeight: 500, mt: 3 }}>
              Izmaiņas noteikumos
            </Typography>
            <Typography paragraph>
              Mēs paturam tiesības atjaunināt vai mainīt šos Noteikumus jebkurā laikā bez iepriekšēja brīdinājuma.
              Izmaiņas stājas spēkā uzreiz pēc to publicēšanas Lietotnē. Jūsu turpmāka Lietotnes izmantošana pēc
              izmaiņām nozīmē, ka jūs piekrītat izmainītajiem Noteikumiem.
            </Typography>

            <Typography variant="h5" sx={{ fontWeight: 500, mt: 3 }}>
              Atbildības atruna
            </Typography>
            <Typography paragraph>
              Lietotne un tās saturs tiek nodrošināti "kā ir" un "kā pieejams". Mēs nesniedzam nekādas garantijas,
              izteiktas vai netiešas, par informācijas precizitāti, pietiekamību, uzticamību vai pilnību Lietotnē. Mēs
              atsakāmies no jebkādas atbildības par jebkādām kļūdām vai izlaidumiem saturā vai par jebkādiem zaudējumiem
              vai bojājumiem, kas izriet no Lietotnes izmantošanas vai paļaušanās uz tās saturu.
            </Typography>

            <Typography variant="h5" sx={{ fontWeight: 500, mt: 3 }}>
              Lietotāja atbildība un drošība
            </Typography>
            <Typography paragraph>
              Lietotāji ir atbildīgi par sava konta piekļuves datu, tostarp paroli, konfidencialitāti un drošību. Mēs
              iesakām lietotājiem izveidot spēcīgas, unikālas paroles un izvairīties no vienas un tās pašas paroles
              izmantošanas vairākiem kontiem.
            </Typography>
            <Typography paragraph>
              Lai gan mēs īstenojam drošības pasākumus, lai aizsargātu lietotāju datus, tostarp paroļu šifrēšanu, mēs
              nevaram garantēt lietotāju informācijas absolūtu drošību. Lietotāji apzinās un pieņem ar informācijas
              pārsūtīšanu internetā un tiešsaistes pakalpojumu izmantošanu saistītos riskus.
            </Typography>
            <Typography paragraph>
              Gadījumā, ja notiek drošības pārkāpums vai nesankcionēta piekļuve lietotāju kontiem, mēs nekavējoties
              informēsim skartos lietotājus un veiksim atbilstošus pasākumus, lai mazinātu pārkāpuma sekas. Tomēr mēs
              atsakāmies no jebkādas atbildības par jebkādiem zaudējumiem vai bojājumiem, kas radušies nesankcionētas
              piekļuves lietotāju kontiem dēļ, tostarp, bet ne tikai, datu pārkāpumiem vai nesankcionētai konta
              piekļuves datu izmantošanai.
            </Typography>

            <Typography variant="h5" sx={{ fontWeight: 500, mt: 3 }}>
              Intelektuālā īpašuma tiesības
            </Typography>
            <Typography paragraph>
              Lietotnes saturs un materiāli, tostarp, bet neaprobežojoties ar tekstu, attēliem, logotipiem un preču
              zīmēm, pieder mums vai ir licencēti un ir aizsargāti ar intelektuālā īpašuma likumiem. Jūs nedrīkstat
              izmantot, reproducēt vai izplatīt jebkādu Lietotnes saturu bez mūsu iepriekšējas rakstiskas piekrišanas.
            </Typography>

            <Typography variant="h5" sx={{ fontWeight: 500, mt: 3 }}>
              Lietotāja uzvedība
            </Typography>
            <Typography paragraph>
              Lietotāji piekrīt neveikt nekādas darbības, kas varētu traucēt vai traucēt Lietotnes vai tās pakalpojumu
              darbību. Aizliegtas darbības ietver, bet neaprobežojas ar, ļaunprātīgu uzvedību, surogātpasta sūtīšanu,
              nesankcionētu piekļuvi vai nelikumīgām darbībām.
            </Typography>

            <Typography variant="h5" sx={{ fontWeight: 500, mt: 3 }}>
              Kontu izbeigšana
            </Typography>
            <Typography paragraph>
              Mēs paturam tiesības izbeigt vai apturēt lietotāju kontus pēc mūsu ieskatiem jebkura iemesla dēļ, tostarp,
              bet ne tikai, Noteikumu pārkāpumu vai Lietotnes ļaunprātīgas izmantošanas gadījumā.
            </Typography>

            <Typography variant="h5" sx={{ fontWeight: 500, mt: 3 }}>
              Atlīdzināšana
            </Typography>
            <Typography paragraph>
              Lietotāji piekrīt atlīdzināt un aizsargāt mūs no jebkādām prasībām, zaudējumiem vai bojājumiem, kas izriet
              no Lietotnes izmantošanas vai šo Noteikumu pārkāpumiem.
            </Typography>

            <Typography variant="h5" sx={{ fontWeight: 500, mt: 3 }}>
              Governing Law
            </Typography>
            <Typography paragraph>
              Šie Noteikumi tiek regulēti un interpretēti saskaņā ar Latvijas likumiem, neņemot vērā tās tiesību
              kolīziju principus.
            </Typography>

            <Typography variant="h5" sx={{ fontWeight: 500, mt: 3 }}>
              Sazinieties ar mums
            </Typography>
            <Typography paragraph>
              Ja jums ir kādi jautājumi vai bažas par šiem Noteikumiem, lūdzu, sazinieties ar mums, izmantojot
              kontaktinformāciju, kas norādīta mūsu kontaktu lapā.
            </Typography>
          </Grid>
        </Grid>
      </Box>

      {/* Data Protection Policy Section */}
      <Box id="data-protection-policy" ref={(el) => (paragraphRefs.current[3] = el)} sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, color: '#16477c' }}>
          4. Datu aizsardzības politika
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box sx={{ mb: 3 }}>
              <Typography paragraph sx={{ fontSize: '1rem', lineHeight: 1.6 }}>
                Šī datu aizsardzības politika izskaidro, kā mēs aizsargājam lietotāju personīgo informāciju, kas tiek
                ievākta caur mūsu tīmekļa vietni un mobilo lietotni (kopīgi sauktas par "Lietotni").
              </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 500 }}>
                Informācija, ko mēs vācam
              </Typography>
              <Typography paragraph sx={{ fontSize: '1rem', lineHeight: 1.6 }}>
                Mēs varam vākt personīgo informāciju no lietotājiem, tostarp, bet ne tikai:
              </Typography>
              <ul>
                <li>Lietotājvārds</li>
                <li>Vārds</li>
                <li>Uzvārds</li>
                <li>E-pasta adrese</li>
                <li>Tālruņa numurs</li>
                <li>Valsts kods</li>
                <li>Adrese (pilsēta, valsts)</li>
                <li>Valoda</li>
                <li>Valsts</li>
                <li>Parole (uzglabāta droši šifrētā formātā)</li>
                <li>Saglabātie sludinājumi</li>
                <li>Piederīgie mājdzīvnieki</li>
                <li>Komentāri</li>
                <li>Noklusējuma atrašanās vieta (ģeogrāfiskās koordinātas)</li>
                <li>Lietotnes izskats (gaišs vai tumšs režīms)</li>
                <li>Lietotāja loma (lietotājs vai administrators)</li>
                <li>Paziņojumu iestatījumi</li>
                <li>Abonēšanas statuss</li>
                <li>Verifikācijas un atjaunošanas tokens</li>
              </ul>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 500 }}>
                Kā mēs izmantojam jūsu informāciju
              </Typography>
              <Typography paragraph sx={{ fontSize: '1rem', lineHeight: 1.6 }}>
                Mēs izmantojam ievākto informāciju, lai:
              </Typography>
              <ul>
                <li>sniedzam un uzlabojam mūsu pakalpojumus,</li>
                <li>personalizējam lietotāja pieredzi,</li>
                <li>atbildētu uz pieprasījumiem un nodrošinātu atbalstu,</li>
                <li>pildītu juridiskas saistības.</li>
              </ul>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 500 }}>
                Datu drošība
              </Typography>
              <Typography paragraph sx={{ fontSize: '1rem', lineHeight: 1.6 }}>
                Mēs īstenojam drošības pasākumus, lai aizsargātu jūsu informāciju no nesankcionētas piekļuves,
                izpaušanas vai izmaiņām. Paroles tiek šifrētas un uzglabātas drošā veidā.
              </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 500 }}>
                Datu glabāšana un dzēšana
              </Typography>
              <Typography paragraph sx={{ fontSize: '1rem', lineHeight: 1.6 }}>
                Lietotāji var pieprasīt savas informācijas labošanu vai dzēšanu jebkurā laikā. Pēc pieprasījuma dati
                tiek neatgriezeniski dzēsti.
              </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 500 }}>
                Trešo pušu atklāšana
              </Typography>
              <Typography paragraph sx={{ fontSize: '1rem', lineHeight: 1.6 }}>
                Mēs neizpaužam personas datus trešajām pusēm bez jūsu piekrišanas, izņemot gadījumus, kad tas
                nepieciešams juridisku prasību izpildei vai pakalpojumu nodrošināšanai.
              </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 500 }}>
                Atbilstība likumiem
              </Typography>
              <Typography paragraph sx={{ fontSize: '1rem', lineHeight: 1.6 }}>
                Mēs ievērojam Vispārīgo datu aizsardzības regulu (GDPR), CCPA un citus piemērojamos likumus un
                noteikumus.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Disclaimer Section */}
      <Box id="disclaimer" ref={(el) => (paragraphRefs.current[4] = el)} sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, color: '#16477c' }}>
          5. Atruna
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Typography paragraph>
              Informācija, kas tiek sniegta tīmekļa lietotnē, ir paredzēta tikai vispārīgiem informatīviem nolūkiem. Lai
              gan mēs cenšamies uzturēt informāciju aktuālu un precīzu, mēs nesniedzam nekādas garantijas, izteiktas vai
              netiešas, par tīmekļa lietotnes vai tajā esošās informācijas, produktu, pakalpojumu vai saistīto grafiku
              pilnīgumu, precizitāti, uzticamību, piemērotību vai pieejamību jebkuram mērķim.
            </Typography>

            <Typography paragraph>
              Jebkāda paļaušanās uz šādu informāciju ir tikai jūsu pašu risks. Mēs neuzņemamies atbildību par jebkādiem
              zaudējumiem vai bojājumiem, tostarp, bez ierobežojumiem, netiešiem vai izrietošiem zaudējumiem vai
              bojājumiem, vai jebkādiem zaudējumiem vai bojājumiem, kas radušies datu vai peļņas zaudēšanas rezultātā,
              kas izriet no tīmekļa lietotnes izmantošanas vai saistībā ar to.
            </Typography>

            <Typography paragraph>
              Caur šo tīmekļa lietotni jūs varat izveidot saites uz citām tīmekļa vietnēm, kuras nav mūsu kontrolē. Mēs
              nekontrolējam šo vietņu dabu, saturu un pieejamību. Jebkuru saišu iekļaušana ne vienmēr nozīmē, ka mēs tās
              iesakām vai atbalstām tajās izteiktos viedokļus.
            </Typography>

            <Typography paragraph>
              Mēs darām visu iespējamo, lai tīmekļa lietotne darbotos nevainojami. Tomēr mēs neuzņemamies atbildību par
              to, ja tīmekļa vietne vai lietotne īslaicīgi nav pieejama tehnisku problēmu dēļ, kas ir ārpus mūsu
              kontroles.
            </Typography>
          </Grid>
        </Grid>
      </Box>

      {/* Community Guidelines Section */}
      <Box id="community-guidelines" ref={(el) => (paragraphRefs.current[5] = el)} sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, color: '#16477c' }}>
          6. Kopienas vadlīnijas
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography paragraph sx={{ fontSize: '1rem', lineHeight: 1.6 }}>
              Laipni lūdzam kopienā! Lai nodrošinātu pozitīvu un patīkamu pieredzi visiem lietotājiem, mēs esam
              izveidojuši šādus noteikumus dalībai:
            </Typography>

            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 500 }}>
                Cieniet citus
              </Typography>
              <Typography paragraph sx={{ fontSize: '1rem', lineHeight: 1.6 }}>
                Izrādiet laipnību, empātiju un cieņu pret citiem kopienas dalībniekiem. Izvairieties no aizskarošas
                valodas, vajāšanas, diskriminācijas un personīgiem uzbrukumiem. Atcerieties, ka dažādi viedokļi un
                perspektīvas ir apsveicami, bet naidīgi vai aizskaroši komentāri netiks pieļauti.
              </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 500 }}>
                Esiet konstruktīvi
              </Typography>
              <Typography paragraph sx={{ fontSize: '1rem', lineHeight: 1.6 }}>
                Dalieties ar konstruktīvu atgriezenisko saiti un sniedziet nozīmīgu ieguldījumu diskusijās. Izvairieties
                no surogātpasta, troļļošanas un nepiemērota satura ievietošanas. Koncentrējieties uz atbalstošas un
                izglītojošas vides veidošanu, kurā ikviens var mācīties un attīstīties.
              </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 500 }}>
                Cieniet privātumu
              </Typography>
              <Typography paragraph sx={{ fontSize: '1rem', lineHeight: 1.6 }}>
                Aizsargājiet citu privātumu un neizpaudiet personīgu vai sensitīvu informāciju bez piekrišanas. Cieniet
                lietotāju konfidencialitāti un izvairieties no privātu lietu apspriešanas publiskos forumos.
              </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 500 }}>
                Ievērojiet lietotnes noteikumus
              </Typography>
              <Typography paragraph sx={{ fontSize: '1rem', lineHeight: 1.6 }}>
                Ievērojiet platformas noteikumus, konfidencialitātes politiku un citus noteikumus. Ziņojiet lietotnes
                administratoriem par jebkādiem pārkāpumiem vai nepiemērotu uzvedību, lai tos izskatītu un veiktu
                atbilstošas darbības.
              </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 500 }}>
                Esiet atbildīgi
              </Typography>
              <Typography paragraph sx={{ fontSize: '1rem', lineHeight: 1.6 }}>
                Uzņemieties atbildību par savām darbībām un ieguldījumu kopienā. Palīdziet uzturēt pozitīvu un
                viesmīlīgu atmosfēru, ievērojot šos noteikumus un iedrošinot citus darīt to pašu.
              </Typography>
            </Box>

            <Typography paragraph sx={{ fontSize: '1rem', lineHeight: 1.6 }}>
              Piedaloties šajā kopienā, jūs piekrītat ievērot šos noteikumus un veicināt drošas, iekļaujošas un
              atbalstošas vides veidošanu visiem dalībniekiem. Paldies par jūsu sadarbību un apņemšanos veicināt
              kopienas attīstību!
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default PolicyPage;
