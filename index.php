<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include 'connection.php';

$objDb = new DbConnect;
$conn = $objDb->connect();

$method = $_SERVER['REQUEST_METHOD'];
switch($method){

case "GET":
    $path = explode('/', $_SERVER['REQUEST_URI']);
    $id = $path[2];
    if(is_numeric($id)){
        $sql = "SELECT * FROM react WHERE id = :id";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        $user = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($user);
    } else {
        $sql = "SELECT * FROM react";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($users);
    }
    break;

    case "POST":
        // $user = json_decode(file_get_contents('php://input'));
        $name = $_POST['name'];
        $username = $_POST['username'];
        $password = $_POST['password'];
        $image = $_FILES['image'];
        $target_dir = "images/";
        $target_file = $target_dir . basename($image["name"]);
        move_uploaded_file($image["tmp_name"], $target_file);
        
        // Insert data into database
        $sql = "INSERT INTO react(name, username, password, image) VALUES (:name, :username, :password, :image)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':name',$name);
        $stmt->bindParam(':username', $username);
        $stmt->bindParam(':password',$password);
        $stmt->bindParam(':image', $target_file); 
        if($stmt->execute()){
            $res = ['status' => 1, 'message' => "Record created successfully"];
        } else{
            $res = ['status' => 0, 'message' => "Fail to create record"];
        }
        echo json_encode($res);
        break;
    
    
        case "PUT":
            $user = json_decode(file_get_contents('php://input'));
            $sql = "UPDATE react SET name = :name, username = :username, password = :password, updateTime = :updateTime WHERE id = :id";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $user->id);
            $stmt->bindParam(':name', $user->name);
            $stmt->bindParam(':username', $user->username);
            $stmt->bindParam(':password', $user->password);
            $stmt->bindParam(':updateTime', $user->updateTime);
            if($stmt->execute()){
                $res = ['status' => 1, 'message' => "Record Updated successfully"];
            } else{
                $res = ['status' => 0, 'message' => "Fail to update record"];
            }
            echo json_encode($res);
            break;

    case "DELETE":
        $sql = "DELETE FROM react WHERE id = :id";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id', $path[2]);

        if($stmt->execute()){
            $res = ['status' => 1,'message' => "Record deleted successfully"];
        }else{
            $res = ['status' => 0,'message' => "Fail to delete record"];
        }

        break;
}
