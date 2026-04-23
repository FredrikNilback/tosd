<?php
    session_start();
    if (!isset($_SESSION['company_id'])) {
        header('Location: index.php');
    }
    $activePage = 'schedule';
    $secrets = json_decode(file_get_contents('../secrets.json'));
?>

<?php include 'includes/head.php' ?>

<div class='page-content'>
    <div class="hero">
        <span><?= $secrets->wedding_date ?> &#11038 <?= $secrets->wedding_month ?> &#11038 <?= $secrets->wedding_year ?></span>
    </div>
    <main>
        <div id="card-container">
            <div class='paragraph-image'>
                <div class='paragraph-image-text-div'>
                    <h3>Some Title</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam est felis, faucibus vel rutrum in, elementum vel orci. Vestibulum fringilla est ut dictum pulvinar. Vestibulum sem massa, porttitor nec tortor ac, viverra pulvinar dolor. Nulla facilisi. Morbi sagittis finibus facilisis. Donec venenatis justo elementum purus aliquet, ut condimentum ex bibendum. Phasellus augue leo, volutpat in imperdiet non, pellentesque id magna. Aliquam erat volutpat. Donec pulvinar sapien vitae diam accumsan tincidunt. </p>
                </div>
                <img src='images/schedule/couple1.webp' alt='couple'>
            </div>
            <div class='image-paragraph'>
                <img src='images/schedule/castle1.webp' alt='couple'>
                <div class='image-paragraph-text-div'>
                    <h3>Some Other Title</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam est felis, faucibus vel rutrum in, elementum vel orci. Vestibulum fringilla est ut dictum pulvinar. Vestibulum sem massa, porttitor nec tortor ac, viverra pulvinar dolor. Nulla facilisi. Morbi sagittis finibus facilisis. Donec venenatis justo elementum purus aliquet, ut condimentum ex bibendum. Phasellus augue leo, volutpat in imperdiet non, pellentesque id magna. Aliquam erat volutpat. Donec pulvinar sapien vitae diam accumsan tincidunt. </p>
                </div>
            </div>
            <div class='paragraph-image'>
                <div class='paragraph-image-text-div'>
                    <h3>A longer 3rd title that is longer for reasons</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam est felis, faucibus vel rutrum in, elementum vel orci. Vestibulum fringilla est ut dictum pulvinar. Vestibulum sem massa, porttitor nec tortor ac, viverra pulvinar dolor. Nulla facilisi. Morbi sagittis finibus facilisis. Donec venenatis justo elementum purus aliquet, ut condimentum ex bibendum. Phasellus augue leo, volutpat in imperdiet non, pellentesque id magna. Aliquam erat volutpat. Donec pulvinar sapien vitae diam accumsan tincidunt. </p>
                </div>
                <img src='images/schedule/couple2.webp' alt='couple'>
            </div>
            <div class='image-paragraph'>
                <img src='images/schedule/castle1.webp' alt='couple'>
                <div class='image-paragraph-text-div'>
                    <h3>Some Other Title</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam est felis, faucibus vel rutrum in, elementum vel orci. Vestibulum fringilla est ut dictum pulvinar. Vestibulum sem massa, porttitor nec tortor ac, viverra pulvinar dolor. Nulla facilisi. Morbi sagittis finibus facilisis. Donec venenatis justo elementum purus aliquet, ut condimentum ex bibendum. Phasellus augue leo, volutpat in imperdiet non, pellentesque id magna. Aliquam erat volutpat. Donec pulvinar sapien vitae diam accumsan tincidunt. </p>
                </div>
            </div>
        </div>
    </main>
</div>
<?php include 'includes/footer.php' ?>