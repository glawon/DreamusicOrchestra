# Dreamusic Orchestra
Dreamusic Orchestra è un sito web per prenotare biglietti per eventi dell'orchestra Dreamusic e gestire le prenotazioni tramite un'area personale. 

![Stato del Progetto](https://img.shields.io/badge/Stato-In_sviluppo-blue)
## Dettagli
Ogni utente possiede un ruolo che può essere di tipo *admin* o *user*, in base a questo vengono stabiliti dei privilegi.

Tutti gli utenti possono navigare nel sito una volta loggati ma si distinguono due casi:

* ruolo **user**, l'utente può avere accesso ad un'<ins>area personale</ins> dove può vedere le sue credenziali, eliminare il suo account e visualizzare ed eventualmente eliminare i biglietti prenotati.
* ruolo **admin**, l'utente può avere accesso ad una <ins>dashboard</ins> dove può gestire inserimento, modifica e cancellazione di musicisti ed eventi, e visualizzare la lista di utenti registrati e biglietti prenotati.

Il ruolo è possibile impostarlo dai seeder di Laravel, poichè alla registrazione ci si può solamente registrare come normali user.

#### Tecnologie

Per questo progetto è stato utilizzato **React JS** per implementare il front-end del sito, e **Laravel** per realizzare il back-end.

## Installazione

Per installare il progetto, dopo aver clonato questa repository, bisogna modificare il file `.env` e inserire i propri parametri di ambiente locale:

```
11    DB_CONNECTION=mysql
12    DB_HOST=127.0.0.1
13    DB_PORT=3306
14    DB_DATABASE=*your_database*
15    DB_USERNAME=*your_username*
16    DB_PASSWORD=*your_password*
```
il database utilizza `mysql` e l'unica operazione preliminare d'installazione da fare è la <ins>creazione di un database vuoto</ins>.

Per poter runnare il server, bisogna aver installato l'ambiente Laravel, e poter utilizzare il comando `php artisan`.
Eseguire `composer install` per installare tutte le dipendenze necessarie.

Per quanto riguarda il lato client, bisogna installare React JS ed eseguire `npm install` per ottenere tutte le dipendenze necessarie.

## Utilizzo

Prima di avviare il server, eseguire il comando `php artisan migrate:fresh --seed` per popolare il database con i dati nei seeder.
Dopodichè si può procedere con l'avvio del server Laravel con `php artisan serve`, aprire il browser e collegarsi all'indirizzo [http://localhost:8000](http://localhost:8000) .
