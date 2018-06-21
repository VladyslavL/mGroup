<?php
header("X-XSS-Protection: 0"); 

$to = 'vladyslavliashenko@gmail.com, yananaidiuk@gmail.com';

$name  = $_POST['name'];
// $phone = $_POST['phone'];
$email   = $_POST['email'];
// $company = $_POST['company'];
$message = $_POST['msg'];


// if ( !empty( $_FILES['file']['tmp_name'] ) and $_FILES['file']['error'] == 0 ) {
//   $filepath = $_FILES['file']['tmp_name'];
//   $filename = $_FILES['file']['name'];
// } else {
//   $filepath = '';
//   $filename = '';
// }

$body = "Name:\r\n ".$name."\r\n\r\n";
// $body .= "Phone number/Skype id:\r\n".$phone."\r\n\r\n";
$body .= "Email:\r\n".$email."\r\n\r\n";
// $body .= "Company:\r\n".$company."\r\n\r\n";
$body .= "Message:\r\n".$message;

send_mail($to, $body, $email, $filepath, $filename);




// Вспомогательная функция для отправки почтового сообщения с вложением
function send_mail($to, $body, $email, $filepath, $filename)
{
  $subject = 'Contact form';
  $boundary = "--".md5(uniqid(time())); // генерируем разделитель
  $headers = "From: .mGroup \r\n";   
  $headers .= "MIME-Version: 1.0\r\n";
  $headers .="Content-Type: multipart/mixed; boundary=\"".$boundary."\"\r\n";
  $multipart = "--".$boundary."\r\n";
  $multipart .= "Content-type: text/plain; charset=\"utf-8\"\r\n";
  $multipart .= "Content-Transfer-Encoding: quoted-printable\r\n\r\n";

  $body = $body."\r\n\r\n";
 
  $multipart .= $body;
 
  $file = '';
  if ( !empty( $filepath ) ) {
    $fp = fopen($filepath, "r");
    if ( $fp ) {
      $content = fread($fp, filesize($filepath));
      fclose($fp);
      $file .= "--".$boundary."\r\n";
      $file .= "Content-Type: application/octet-stream\r\n";
      $file .= "Content-Transfer-Encoding: base64\r\n";
      $file .= "Content-Disposition: attachment; filename=\"".$filename."\"\r\n\r\n";
      $file .= chunk_split(base64_encode($content))."\r\n";
    }
  }
  $multipart .= $file."--".$boundary."--\r\n";
  mail($to, $subject, $multipart, $headers);

  if (mail($to, $subject, $multipart, $headers))
  {
    // $_SESSION['success'] = true;
    header('Location: http://mgroup.studio');
  }
}
?>