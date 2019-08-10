<?php
$servername = "localhost";
$username = "root";
// your password:
$password = "";
//your database name:
$db = "screensite_database";
$name = $_POST['name'];
$email = $_POST['email'];
$address = $_POST['address'];
$tel = $_POST['tel'];
$message = $_POST['message'];
$order_str = $_POST['order_str'];
$conn = new mysqli($servername, $username, $password, $db);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
$sql = "SELECT id FROM customers c WHERE c.name = '$name' AND c.email = '$email' AND c.address = '$address' AND c.phone = '$tel'";
$result = mysqli_query($conn, $sql) OR die(mysqli_error($conn));
$customer_id = (mysqli_fetch_assoc($result)["id"]);
$date = date("Y-m-d H:i:s");
$sql = "INSERT INTO orders (customer_id, customer_name, date, message, order_str) VALUES ('$customer_id', '$name', '$date', '$message', '$order_str')";
mysqli_query($conn, $sql) OR die(mysqli_error($conn));
mysqli_close($conn);
