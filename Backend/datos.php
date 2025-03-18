<?php
header('Content-Type: application/json');
$datos = [
    'fechas' => ["2024-02-01", "2024-02-02", "2024-02-03"],
    'niveles' => [30, 28, 32],
    'cantidades' => [500, 520, 480]
];
echo json_encode($datos);
?>