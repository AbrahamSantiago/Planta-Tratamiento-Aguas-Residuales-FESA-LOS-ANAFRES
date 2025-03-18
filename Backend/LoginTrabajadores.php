<?php
session_start();

// Conexión a la base de datos
$host = "localhost";
$port = "5432";  // Puerto por defecto de PostgreSQL
$usuario = "JoseOnofre";
$contraseña = "2243";
$base_datos = "PTAR";

// Conexión a PostgreSQL
$conn = pg_connect("host=$host port=$port dbname=$base_datos user=$usuario password=$contraseña");

// Verificar conexión
if (!$conn) {
    die("Error de conexión: " . pg_last_error());
}

// Procesar el formulario
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Consulta SQL para verificar usuario
    $query = "SELECT * FROM Usuarios WHERE username = $1 AND password = $2";
    $result = pg_query_params($conn, $query, array($username, $password));

    if (pg_num_rows($result) === 1) {
        $_SESSION['usuario'] = $username;
        header("Location: dashboard.php");
        exit();
    } else {
        header("Location: login.html?error=Usuario o contraseña incorrectos");
        exit();
    }
}
?>