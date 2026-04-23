<!DOCTYPE html>

<html>

<head>
    <meta charset='utf-8'>
    <title>Hannah & Fredriks bröllopshemsida</title>
    <link rel='stylesheet' href='css/font_face.css'>
    <link rel='stylesheet' href='css/static.css'>
    <link rel='stylesheet' href='css/<?=$activePage?>.css'>
</head>

<body>
    <?php if($activePage != 'index'): ?>
    <header>
        <img src='images/logo.webp' alt='Logo' id='logo'>
        <nav>
            <ul>
                <li class="<?= ($activePage == 'homepage') ? 'selected-tab' : '' ?>">
                    <a href='./homepage.php'>Välkommen</a>
                </li>
                <li class="<?= ($activePage == 'rsvp') ? 'selected-tab' : '' ?>">
                    <a href='./rsvp.php'>O.S.A</a>
                </li>
                <li class="<?= ($activePage == 'schedule') ? 'selected-tab' : '' ?>">
                    <a href='./schedule.php'>Bröllopsdagen</a>
                </li>
                <li class="<?= ($activePage == 'information') ? 'selected-tab' : '' ?>">
                    <a href='./information.php'>Information</a>
                </li>
            </ul>
        </nav>
    </header>
    <?php else: ?>
    <header>
        <img src='images/logo.webp' alt='Logo' id='logo'>
    </header>
    <?php endif; ?>