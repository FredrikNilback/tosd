<?php
    session_start();
    if (!isset($_SESSION['company_id'])) {
        header('Location: index.php');
    }
    $activePage = 'rsvp';
    $secrets = json_decode(file_get_contents('../secrets.json'));
?>

<?php include 'includes/head.php' ?>
<div class='page-content'>
    <div class='hero'>
        <span>O.S.A <u>senast</u><br><?= $secrets->wedding_date ?>/<?= (int)$secrets->wedding_month - 2 ?> - <?= $secrets->wedding_year ?></span>
    </div>
    <main>
        <?php foreach ($_SESSION['guests'] as $guest):?>
            <?php $fullName = $guest['guest_name'] . ' ' . $guest['guest_lastname']; ?>
            <div class='rsvp-card'>
                <h3><?= $fullName ?></h3>
                <form method="POST">
                    <input type="hidden" value="<?= $guest['guest_id'] ?>">
                    <select name="rsvp" class="rsvp-select">
                        <option value='' <?php if ($guest['rsvp'] === NULL) {echo 'selected="selected"';} ?>>O.S.A</option>
                        <option value='accept' <?php if ($guest['rsvp'] === TRUE) {echo 'selected="selected"';} ?>>Klart jag kommer!</option>
                        <option value='decline' <?php if ($guest['rsvp'] === FALSE) {echo 'selected="selected"';} ?>>Jag kan tyvärr inte :\</option>
                    </select>
                    <select name="room" class="room-select">
                        <option value='' <?php if ($guest['room'] === NULL) {echo 'selected="selected"';} ?>>Välj...</option>
                        <option value='stay' <?php if ($guest['room'] === TRUE) {echo 'selected="selected"';} ?>>Jag vill sova över!</option>
                        <option value='leave' <?php if ($guest['room'] === FALSE) {echo 'selected="selected"';} ?>>Jag åker hem.</option>
                    </select>
                    <?php if (($guest['alcohol'] ) != 'underage'): ?>
                    <select name="alcohol" class="alcohol-select">
                        <option value="" <?php if ($guest['alcohol'] === NULL) {echo 'selected="selected"';} ?>>Välj...</option>
                        <option value="drink" <?php if ($guest['alcohol'] === TRUE) {echo 'selected="selected"';} ?>>Jag önskar alkohol</option>
                        <option value="abstain" <?php if ($guest['alcohol'] === FALSE) {echo 'selected="selected"';}?>>Jag avstår!</option>
                    </select>
                    <?php endif; ?>
                    <label for="vegetarian">Jag önskar vegetarisk mat</label>
                    <input type='checkbox' class='vegetarian-checkbox' name='vegetarian' value='TRUE' <?php if ($guest['vegetarian'] === TRUE) {echo 'selected="selected"';} ?>>

                </form>
            </div>
        <?php endforeach; ?>
    </main>
</div>
<?php include 'includes/footer.php' ?>