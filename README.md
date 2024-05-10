Aplicație de manageriat timpul
-To do List-

Link Video:  https://www.youtube.com/watch?v=v1LJcDDSNls&ab_channel=GeorgianaLUNGU

Link publicare: https://cloud-computing-lovat.vercel.app/

Link github: https://github.com/LunguGeo/CloudComputing

Introducere

Aplicația de Todo List este o platformă digitală care oferă utilizatorilor posibilitatea de a-și organiza și gestiona sarcinile zilnice într-un mod eficient și simplu. Cu un design intuitiv și funcționalități avansate, această aplicație își propune să faciliteze procesul de planificare și prioritizare a activităților zilnice pentru o productivitate sporită.

Descriere a problemei

În era digitală agitată în care trăim, gestionarea eficientă a sarcinilor și prioritizarea activităților devin din ce în ce mai importante. Cu atât de multe lucruri de făcut și termene limită strânse, devine dificil să ținem evidența tuturor sarcinilor și să ne asigurăm că nu pierdem nimic din vedere. Adesea, notițele de hârtie sau listele de sarcini vechi nu sunt suficiente pentru a gestiona sarcinile în mod eficient.
Aici intervine aplicația Todo List, oferind o soluție digitală modernă și practică pentru gestionarea sarcinilor zilnice. Cu ajutorul acestei aplicații, utilizatorii pot să-și creeze liste de sarcini personalizate, să adauge, să editeze și să șteargă sarcini în mod flexibil, și să primească notificări și alerte pentru sarcinile cu termene limită apropiate.
Problema pe care o abordează această aplicație constă în lipsa unei soluții eficiente și centralizate pentru gestionarea sarcinilor zilnice într-un mod organizat și accesibil.

Servicii Cloud folosite:

•	MongoDB Atlas este serviciul cloud oficial oferit de MongoDB pentru gestionarea și scalarea bazelor de date MongoDB. Acest serviciu oferă o infrastructură scalabilă și sigură pentru stocarea și gestionarea datelor tale. Acesta ofera scalabilitate automată, backup automat si securitate, chiar și în planul ”free”, motivul pentru care am aples să îl folosesc.

•	SendGrid este un serviciu cloud de trimitere a e-mailurilor, utilizat pentru a trimite e-mailuri în mod eficient și fiabil către destinatari. Acest serviciu oferă un API puternic și instrumente de analiză pentru gestionarea și monitorizarea campaniilor de e-mail. Acesta are următoarele caracteristicii: trimitere fiabilă, personalizare, analize și rapoarte. În această aplicație este folosit pentru a trimite e-mail-uri de către utilizatori, fiind un program care nu are o limită destul de mare de e-mail-uri permise să fie trimise si prin planul ”free”.

Descriere a API-ului și fluxului de date

1.Trimiterea de e-mailuri

•	POST 
Descriere: Această rută primește un request care conține informații despre destinatarul e-mailului (nume, adresă de e-mail și mesaj). Apoi, folosește serviciul SendGrid pentru a trimite e-mailul către destinatar.
o	Fluxul de date:
	Request: Un obiect JSON care conține informațiile despre destinatarul e-mailului.
	Response: Returnează un obiect JSON cu o proprietate "success" care indică dacă trimiterea e-mailului a avut succes sau nu.

2.Gestionarea listei de todo-uri

•	GET 
Descriere: Această rută returnează toate elementele din colecția "todos".
o	Fluxul de date:
	Request: Nu necesită date suplimentare.
	Response: Returnează un array de obiecte JSON, fiecare reprezentând o sarcină din lista de todo-uri.

o	POST 
Descriere: Această rută adaugă un nou element în colecția "todos".
o	Fluxul de date:
	Request: Primește un obiect JSON cu proprietatea "text" care reprezintă textul noii sarcini.
	Response: Returnează un obiect JSON care reprezintă sarcina adăugată, împreună cu un cod de stare HTTP 201 (Created).

•	PUT 
Descriere: Această rută actualizează o sarcină existentă din colecția "todos".
•	Fluxul de date:
o	Request: Primește un obiect JSON cu proprietățile "id", "text" și "completed" pentru actualizarea unei sarcini existente.
o	Response: Returnează un mesaj de confirmare și un cod de stare HTTP 200 (OK).

•	DELETE 
Descriere: Această rută șterge o sarcină existentă din colecția "todos".
o	Fluxul de date:
	Request: Primește un obiect JSON cu proprietatea "id" pentru identificarea sarcinii de șters.
	Response: Returnează un mesaj de confirmare și un cod de stare HTTP 200 (OK).
 
 
 
Referințe:
https://nextjs.org/docs
https://www.typescriptlang.org/docs/
https://www.mongodb.com/docs/
https://docs.sendgrid.com/api-reference/mail-send/mail-send
