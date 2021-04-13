# Bilard-website
This website is about bilard. I created it to learn programming more. Website has 8 subpages:<br>
<b>Strona Główna, Najnowsze Informacje, Turnieje, Kontakt, Panel(admin only), Logowanie, Rejestracja, Wyloguj</b>

Technologies used in project: <b>html, css, js, ejs, nodejs, express, json, nosql</b>

<h3>1. Strona Głowna</h3>

![img](https://github.com/Mitopek1996/Bilard-website/blob/master/images%20of%20project/stronaglowna.png)

<h3>2. Najnowsze informacje</h3> 

<b>Description:</b> All news on this page are load from database. Admin can add news in his panel.

![img](https://github.com/Mitopek1996/Bilard-website/blob/master/images%20of%20project/najnowszeinformacje.png)

<h3>3. Turnieje</h3>

<b>Description:</b> All tournaments are load from database. Admin can add news in his panel. Users (only logged in) can join to tournament by clicking button next to 
suitable tournament. If admin overview this page, he see all usersname who joined to tournaments. 

![img](https://github.com/Mitopek1996/Bilard-website/blob/master/images%20of%20project/turnieje.png)

<h3>4. Kontakt</h3>

![img](https://github.com/Mitopek1996/Bilard-website/blob/master/images%20of%20project/kontakt.png)

<h3>5. Panel</h3>

<b>Description:</b> This subpage is only for users with admins flag. Admin can add new tournaments and news here.

![img](https://github.com/Mitopek1996/Bilard-website/blob/master/images%20of%20project/panel.png)

<h3>6. Logowanie</h3>

<b>Description:</b> After click "zaloguj" button scripts in backend try to find user with this username and password in database. 

![img](https://github.com/Mitopek1996/Bilard-website/blob/master/images%20of%20project/logowanie.png)

<h3>7. Rejestracja</h3>

<b>Description:</b> If any input field has been changed, js script check the following conditions:<br>
-username 5-32 letters,<br>
-password 5-32 letters,<br>
-password min 1 number,<br>
-second password is the same<br><br>

When all this conditions are met, scripts in backend try to create new acount. If user with this username not exist, account will be created

![img](https://github.com/Mitopek1996/Bilard-website/blob/master/images%20of%20project/rejestracja.png)
