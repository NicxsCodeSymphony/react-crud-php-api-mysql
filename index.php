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
        $sql = "SELECT * FROM react";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        // print_r($path);
        if(isset($path[3]) && is_numeric($path[3])){
            $sql .= " WHERE id = :id";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $path[3]);
            $stmt->execute();
            $user = $stmt->fetchAll(PDO::FETCH_ASSOC);
        } else{
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($users);
        }
        break;

    case "POST":
        $user = json_decode(file_get_contents('php://input'));
        $sql = "INSERT INTO react(name, username, password, created_at, updateTime) VALUES (:name, :username, :password, :created_at, :updateTime)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':name', $user->name);
        $stmt->bindParam(':username', $user->username);
        $stmt->bindParam(':password', $user->password);
        $stmt->bindParam(':created_at', $user->created_at);
        $stmt->bindParam(':updateTime', $user->updateTime);
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
