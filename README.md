# CodersCamp2020.Hackathon.Starter

<p align="center">
  <img src="https://user-images.githubusercontent.com/56504859/115958721-cfd38780-a508-11eb-8c79-b3f33ccb42bb.png" alt="image" />
</p>


## Zespół projektowy

Zespół pracował w ramach kursu [CodersCamp](https://coderscamp.pl/).
Aplikację wykonali uczestnicy przy pomocy mentora.
Zachęcamy do odwiedzenia profili członków zespołu, w celu zapoznania się z ich portfolio.

**Mentor**: [Hubert Kawałek](https://github.com/htk4)

**Uczestnicy**:

-   [Anna Marszałek](https://github.com/Ania-Em)
-   [Mateusz Baciak](https://github.com/bat098)
-   [Mateusz Król](https://github.com/KrolMateusz)
-   [Mateusz Kmieć](https://github.com/Haivex)
-   [Tomasz Dudek](https://github.com/dudeek)
-   [Weronika Dziedzic](https://github.com/blackrabbit2)

**CodersCamp (coderscamp.edu.pl) - Największy otwarty kurs programowania webowego** 

### Demo

Wersja demonstracyjna aplikacji jest dostępna [TUTAJ](https://coders-camp-hackathon.herokuapp.com/).

Front-end aplikacji znajduje się tutaj: [TUTAJ](https://github.com/CodersCamp2020-HK/CodersCamp2020.Project.FullStack-Node-React/tree/master/src/presentation/web).

Aplikacja została wykonana wg dostarczonych przez organizatorów CodersCamp wymagań.

### Cel projektu

Celem projektu było napisanie aplikacji wykorzystującej dotychczas nabytą wiedzę z następujących technologi: html, css, javascript, typescript, react, restful api.
Tematem przewodnim było przygotowanie przez uczestników aplikacje usprawniająca codzienną pracę zespołów online. 

Aplikacja została wykonana wg dostarczonych przez organizatorów CodersCamp wymagań.

Zespół projektowy zdecydował się na stworzenie aplikacji umożliwiającej rozmowy dla zespołów online. Dużym atutem aplikacji jest zapewnienie rozrywki dla użytkownika oraz dodanie funkcjonalności brakujących w obecnych komunikatorach umożliwiających konferencje. Nasza aplikacja umożliwia przełamanie rutyny codziennych.

### Działanie aplikacji

#### Główne funkcjonalności

- Umożliwienie kontaktu wielu użytkowników za pomocą linku
- Możliwość rozmowy glosowej
- Możliwość wideorozmowy
- Minutnik odliczający koniec spotkania
- Możliwość poproszenia o przerwe w trakcie spotkania
- Możliwość wykonania treningu fitness w trakcie spotkania
- Możliwość zrobienia własnych notatek w trakcie spotkania i wyeksportowanie ich w formacie PDF

#### Szablon aplikacji

Utowrzony został szablon graficzny aplikacji w programie Figma. 

[Link do Figmy](https://www.figma.com/file/uyo1LnXStVzBgkc0gnczkT/Hackaton?node-id=7756%3A27877)

## Wymagania funkcjonalne (szczegółowo):

### Rozmowa użytkownika: 

1. Użytkownik ma możliwość rozmowy glosowej
2. Użytkownik ma możliwość wyciszenia mikrofonu
3. Użytkownik ma możliwość wideorozmowy
4. Użytkownik ma możliwość wyłączenie kamery
5. Użytkownik ma możliwość poproszenie o przerwe w trakcie spotkania
6. Użytkownik ma możliwość zaproponowania przerwy fitness
7. Użytkownik ma możliwość udostępnienia sptokania za pośrednictwem linku
8. Użytkownik ma możliwość przedłużenia spotkania o 15min
9. Użytkownik ma możliwość wyboru długości spotkania na początku spotkania
10. Użytkownik ma możliwość wybrania godziny spotkania z wyprzedeniem
11. Użytkownik ma możliwość grania w gry w trakcie spotkania 
12. Użytkownik ma możliwość aktynwego przerywnika w trakcie spotkania w celu podnienie koncentracji rozmówców.

## Wykorzystywane technologie

W trakcie developmentu wykorzystujemy:

-   Docker
-   Heroku
-   TypeORM
-   GitHub workflow
-   React JS
-   Restful React
-   React Hook Form
-   Material UI
-   Figma


### Przykładowa funkcjonalność bazy danych aplikacji

![apiheroku](https://user-images.githubusercontent.com/56504859/112295862-9f43c800-8c94-11eb-94a5-1d25bc7a737d.gif)

### Uruchomienie projektu

Aby uruchomić aplikację na lokalnej maszynie, wykonaj następujące kroki:

1. Zainstaluj zależności za pomocą komendy: `npm ci`
2. Postaw build aplikacji: `npm run build`
3. Uruchom kontenery z bazą danych oraz narzędziem pgAdmin: `docker-compose up`
4. Wystartuj serwer developerski `npm run start`

Aplikacja będzie dostępna pod adresem [localhost:3000/](http://localhost:3000).
Kod produkcyjny aplikacji umieszczamy w katalogu `build`.

### Uruchomienie testów

Aby uruchomić testy aplikacji, wykonaj następujące kroki:

1. Zainstaluj zależności za pomocą komendy: `npm ci` (jeśli nie zrobiłeś już tego wcześniej).
2. Uruchom wszystkie testy, wykonując komendę: `npm run test`.

Dostępne są także testy tylko dla serwera `npm run test:server` oraz dla testów po stronie klienckiej `npm run test:client`.



#### Sterowanie

<p align="center">
  <img src="GIF" alt="gif" />
</p>




### Zmiany wprowadzone w wymaganiach

Projekt został przygotowany w oparciu o projekt przygotowany przez naszego grafika. Szablon graficzny powstał w programie Figma.

### Organizacja pracy

Praca zespołu była organizowana przy użyciu narzędzi dostarczanych przez GitHub.
Zadania opisywaliśmy za pomocą GitHub Issues.
