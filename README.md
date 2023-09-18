# Chat-React-Native
## Creazione Progetto
Di seguito verrà illustrata la procedura che ho seguito per la creazione del mio progetto, così da poterla replicare.
Per iniziare, è necessario installare Node.js nel sistema. Successivamente, tramite la shell di Visual Studio Code, viene eseguito il seguente comando:
```bash
npx create-expo-app --template
```
Questo comando avvierà la procedura di creazione di un progetto React Native con Expo. È importante notare che questo comando installerà automaticamente le dipendenze necessarie per l'utilizzo di Expo.
Se, invece, si preferisce non utilizzare Expo e si desidera creare un progetto React Native puro, è possibile farlo con il seguente comando:
```bash
npx react-native init NomeDelTuoProgetto
```
Questo comando genererà una cartella con tutte le dipendenze necessarie per un progetto React Native nativo. Successivamente, ho raggruppato tutte le dipendenze del mio progetto utilizzando il seguente comando:
```bash
npm install @react-navigation/native @react-navigation/stack react-native-gifted-chat @react-native-async-storage/async-storage firebase expo-constants dotenv react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view uuid react-native-get-random-values
```
È importante notare che quando si utilizza questo comando, Node.js tende a installare automaticamente le versioni più recenti delle librerie. Per evitare eventuali problemi di compatibilità, è possibile specificare le versioni desiderate delle librerie nel file package.json del progetto oppure eseguire questo comando in sostituzione del precedente
```bash
npm install
```
Con questo comando node.js va a vedere le librerie usate nel progetto attraverso package.json e scarica la versione specificata nel package.
Infine, se si sta utilizzando Expo, è consigliabile eseguire il seguente comando:
```bash
npx expo install --fix
```
Questo comando verifica la compatibilità delle versioni di tutte le librerie installate e, se necessario, aggiorna automaticamente le librerie a versioni compatibili con Expo.
Infine per avviare la routine di sviluppo che permetterà di testare l'app su un dispositivo target, bisogna lanciare questo comando:
```bash
 npm start --reset-cache
```
L'opzione --resete-cache è opzionale ed è stata aggiunta per prevenire eventuali errori dovuti al precaricamento delle variabili locali
## Installazione
Per avviare il progetto, segui i seguenti passaggi:

1. **Clona il repository:**
   ```bash
   git clone https://github.com/tuoutonomerepo/tuoprogetto.git
   ```
2. **Creare un proprio account firebase.**
3. **Creare un file .env all'interno della cartella principale del progetto. Questo .env dovrà avere la seguente struttura**
```bash
API_KEY=""
AUTH_DOMAIN=""
PROJECT_ID=""
STORAGE_BUCKET=""
MESSAGING_SENDER_ID=""
APP_ID=""
   ```
Bisogna sostituire i propri parametri di firebase all'interno dei doppi apici
## Generazione Eseguibile
Creare un account sul sito di expo al seguente link:
  ```bash
   https://expo.dev
   ```
 Aggiungere una libreria di expo che si chiama eas. Viene installata con il seguente comando:
 ```bash
   npm install --global eas-cli
   ```
Fare il login di expo nel progetto lanciando il seguente comando:
 ```bash
   eas login
   ```
Nel caso di android bisogna specificare il path di installazione dell'app. Bisogna aggiungere la seguente riga nel app.config.js nell parte relativa ad android:
 ```bash
 "package": "com.yourcompany.yourappname"
   ```
Nel caso di ios bisogna specificare il path di installazione dell'app. Bisogna aggiungere la seguente riga nel app.config.js nell parte relativa ad ios:
 ```bash
"bundleIdentifier": "com.yourcompany.yourappname"
   ```
Lanciare il seguente comando per generare l'eseguibile:
 ```bash
  eas build -p android
   ```
Nel caso si voglia generare un eseguibile per ios bisogna sostituire nell'istruzione ios con android. Il comando farà partire una routine dove verrà chiesto di creare un progetto nell'account di expo. A questo punto la routine lancerà un errore, poichè non riuscirà ad aggiornare automaticamente app.config.js. Nell'errore verrà indicata la riga da aggiungere in questo file. Una volta aggiunta la riga, il comando genererà un altro errore. Questo sarà dovuto all'uso delle variabili locali. In questo caso nel errore generato ci sarà un link di expo dove è presente tutta la documentazione che spiega come integrare le variabili locali in eas. Una volta risolto questi due errori, rilanciando il comando, verrà richiesto di generare una chiave. Nel caso in cui si dispone di un proprio account sullo store di riferimento si risponde di no e si inserisce il path di questa chiave. Altrimenti si può rispondere di si e eas genererà una chiave digitale fittizia che permetterà di creare l'eseguibile. La creazione dell'eseguibile non sarà instantanea, si possono apprezzare gli avanzamenti nel proprio account di expo, dove una volta finita la procedura sarà possibile scaricare l'eseguibile.
