<?php
    session_start();
    if (!isset($_SESSION['company_id'])) {
        header('Location: index.php');
    }
    $activePage = 'homepage';

    $guestsToGreet = '';
    $guestCount = count($_SESSION['guests']);

    for ($i = 0; $i < $guestCount - 2; $i++) {
        $guest = $_SESSION['guests'][$i];
        $guestName = htmlspecialchars($guest['guest_name']);
        $guestsToGreet .= $guestName . ', ';
    }
    
    if ($guestCount >= 2) {
        $guest = $_SESSION['guests'][$guestCount - 2];
        $guestName = htmlspecialchars($guest['guest_name']);
        $guestsToGreet .= $guestName . " & ";
    }

    $guest = $_SESSION['guests'][$guestCount - 1];
    $guestName = htmlspecialchars($guest['guest_name']);
    $guestsToGreet .= $guestName . "!";

    $secrets = json_decode(file_get_contents('../secrets.json'));
?>

<?php include 'includes/head.php' ?>
   <div class='page-content'>
        <div class="hero">
            <span><?= $guestsToGreet ?></span>
        </div>
       <main>
            <div id='introduction-div'>
                <h1>Varmt <?php if ($guestCount > 1) {echo 'välkomna';} else {echo 'välkommen';} ?> till vår bröllopshemsida!</h1>
                <p>Här kan <?php if ($guestCount > 1) {echo 'ni';} else {echo 'du';} ?> ta del av all information om bröllopet, hitta kontaktuppgifter till oss, se nedräkningen till den stora dagen och <strong>viktigast</strong> av allt <a href="rsvp.php"><i>O.S.A</i></a></p>
            </div>
            <div id='timeline-div'>
                <h1>Vår tidslinje</h1>
                <div class='timeline-left'>
                    <h2>Tinder</h2>
                    <h3><?= $secrets->matched ?></h3>
                    <p>Som så många andra par idag, och speciellt under pandemin, så matchade även vi på tinder.</p>
                    <img src="" alt="first message">
                </div>
                <div class='timeline-right'>
                    <h2>Första träffen</h2>
                    <h3><?= $secrets->first_met ?></h3>
                    <p>Vi träffades för första gången i <?= $secrets->city ?>.<br>Utanför det hus vi senare kom att bygga nästan hela vårt förhållande i.</p>
                    <img src="" alt="house">
                </div>
            </div>
       </main>
   </div>
<?php include 'includes/footer.php' ?>
