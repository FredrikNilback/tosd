<?php
    session_start();
    $activePage = 'index';
    require_once '../app/db.php';

    $error = NULL;

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $password = trim($_POST['password']) ?? '';

        if (!$password) {
            $error = 'Ange en åtkomstkod!';
        } else {
            $data = login($password);

            if ($data) {
                session_regenerate_id(true);
                $_SESSION['company_id'] = $data['company_id'];
                $_SESSION['guests'] = $data['guests'];

                header('Location: homepage.php');
                exit();

            } else {
                $error = 'Felaktig åtkomstkod!';
            }
        }
    }
?>

<!DOCTYPE html>

<html>

<?php include 'includes/head.php' ?>
<div class='page-content'>
    <main>
        <div id='login-div'>
            <h2>&nbsp;&nbsp;Inlogg&nbsp;&nbsp;</h2>
            <h3>Åtkomstkod</h3>
            <form method='POST'>
                <div id='code-input-wrapper'>
                    <input id='code-input' name='password' type='text' placeholder='Skriv in din kod...' required>
                    <span class='tooltip'>
                        <span class='tooltip-marker'>?</span>
                        <span class='tooltip-text'>
                            Du hittar koden i din inbjudan!
                        </span>
                    </span>
                </div>
                <button id='login-btn' name='login-btn' type='submit'>Logga in</button>
            </form>
            <?php if ($error): ?>
                <span id='error'><?= $error ?></span>
            <?php endif; ?>
        </div>
    </main>
</div>
<?php include 'includes/footer.php' ?>
