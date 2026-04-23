<?php
    session_start();
    if (!isset($_SESSION['company_id'])) {
        header('Location: index.php');
    }
    $activePage = 'information';
?>

<?php include 'includes/head.php' ?>
<div class='page-content'>
    <div class="hero"></div>
    <main>

    </main>
</div>
  
<?php include 'includes/footer.php' ?>