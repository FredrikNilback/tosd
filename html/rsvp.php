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
            <h3><?= $fullName ?></h3>
            <form method="POST">
                <input type="hidden" value="<?= $guest['guest_id'] ?>">
                
            </form>
        <?php endforeach; ?>
    </main>
</div>
<?php include 'includes/footer.php' ?>