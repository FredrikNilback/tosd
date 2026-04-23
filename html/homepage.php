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
?>

<?php include 'includes/head.php' ?>
   <div class='page-content'>
        <div class="hero">
            <span><?php if ($guestCount > 1) {echo 'Välkomna';} else {echo 'Välkommen';} ?> <br> <?= $guestsToGreet ?></span>
        </div>
       <main>

       </main>
   </div>
<?php include 'includes/footer.php' ?>
