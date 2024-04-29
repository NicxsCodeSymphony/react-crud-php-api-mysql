<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "react_crud";
    
try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $name = $_POST['name'];
    $image = $_FILES['image']['name'];
    $image_temp = $_FILES['image']['tmp_name'];
    $target_path = "images/" . $image;
    move_uploaded_file($image_temp, $target_path);

    // Insert data into database
    $stmt = $conn->prepare("INSERT INTO picture (name, photo) VALUES (:name, :image)");
    $stmt->bindParam(':name', $name);
    $stmt->bindParam(':image', $image);
    $stmt->execute();

    echo "New record created successfully";
} catch(PDOException $e) {
    echo "Error: " . $e->getMessage();
}

$conn = null;
?>
