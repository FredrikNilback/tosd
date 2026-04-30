<?php

function getDatabase() {
    $secretsPath = __DIR__ . '/../secrets.json';
    $secrets = json_decode(file_get_contents($secretsPath));

    $host = $secrets->db_host;
    $database = $secrets->db_name;
    $username = $secrets->db_usr;
    $password = $secrets->db_pwd; 
    $mysqli = new mysqli($host, $username, $password, $database);
    
    if ($mysqli->connect_error) {
        die('Could not establish database connection');
    }
    
    $mysqli->query("SET time_zone = '+00:00'");
    return $mysqli;
}

function createCompany($password, $mysqli = NULL) {
    if (!$mysqli) {
        $mysqli = getDatabase();
    }
    
    $passwordHash = password_hash($password, PASSWORD_DEFAULT);
    
    $stmt = $mysqli->prepare(
        "INSERT INTO company (password_hash)
        VALUES (?);"
    );
    $stmt->bind_param('s', $passwordHash);
    $stmt->execute();
    
    $generatedId = $mysqli->insert_id;
    
    $stmt->close();
    $mysqli->close();
    
    return $generatedId;
}

function login($password, $mysqli = NULL) {
    if (!$mysqli) {
        $mysqli = getDatabase();
    }

    $result = $mysqli->query("SELECT company_id, password_hash FROM company;");
    $companies = $result->fetch_all(MYSQLI_ASSOC);
    $matchedId = NULL;

    foreach ($companies as $company) {
        if (password_verify($password, $company['password_hash'])) {
            $matchedId = (int)$company['company_id'];
            break;
        }
    }

    if (!$matchedId) {
        return false;
    }

    $query = $mysqli->query(
        "SELECT guest.* 
         FROM company
         JOIN guest_company ON company.company_id=guest_company.company_id
         JOIN guest ON guest_company.guest_id=guest.guest_id
         WHERE company.company_id = $matchedId"
    );
    $fullCompany = $query->fetch_all(MYSQLI_ASSOC);

    $mysqli->query(
        "UPDATE company
         SET last_login = NOW()
         WHERE company_id = $matchedId"
    );
    $mysqli->close();
    
    return [
        "company_id" => $matchedId,
        "guests" => $fullCompany
    ];
}
?>