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
$conn = new mysqli($servername, $username, $password, $db);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
$sql_to_check = "SELECT * FROM customers WHERE customers.name = '$name' AND customers.email = '$email' AND customers.address = '$address' AND customers.phone = '$tel'";
$result = mysqli_query($conn, $sql_to_check) OR die(mysqli_error($conn));
if (mysqli_num_rows($result) > 0) {
    echo 'row already exists';
} else {
    $sql = "INSERT INTO customers (name, email, address, phone)
VALUES ('$name', '$email', '$address', '$tel')";
    mysqli_query($conn, $sql);
}
mysqli_close($conn);