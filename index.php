<?php
#Defino mis constantes
$x = 2;
$y = 3;

echo "Antes del intercambio: x = $x, y = $y\n";

// Paso 1: Suma los valores de las variables
$x = $x + $y; // $x = 5 (2 + 3)
$y = $x - $y; // $y = 2 (5 - 3)

// Paso 2: Resta los valores para obtener el valor original de la otra variable
$x = $x - $y; // $x = 3 (5 - 2)

echo "Después del intercambio: x = $x, y = $y\n";
