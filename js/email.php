<?php
    header('Location: http://www.worxauto.com.au/contact/success/');
    require '../vendor/phpmailer/phpmailer/PHPMailerAutoload.php';

    $name = $_POST["name"];
    $email = $_POST["email"];
    $subject = $_POST["subject"];
    $make = $_POST["make"];
    $model = $_POST["model"];
    $registration = $_POST["registration"];
    $message = $_POST["message"];

    $mail = new PHPMailer;

    $mail->SMTPDebug = 3;                               // Enable verbose debug output

    $mail->isSMTP();                                      // Set mailer to use SMTP
    $mail->Host = 'laferrari.turboservers.com.au';       // Specify main and backup SMTP servers
    $mail->SMTPAuth = true;                               // Enable SMTP authentication
    $mail->Username = '****';        // SMTP username
    $mail->Password = '****';                  // SMTP password
    $mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
    $mail->Port = 465;                                    // TCP port to connect to

    $mail->setFrom('service@worxauto.com.au', 'WorxAuto Booking Form');
    $mail->addAddress('service@worxauto.com.au', $name);     // Add a recipient
    $mail->addReplyTo('service@worxauto.com.au', 'WorxAuto');

    $mail->isHTML(true);                                  // Set email format to HTML

    $mail->Subject = $subject;
    $mail->Body    = '<b>WorxAuto Booking Form</b><br><br>'
                    . $message . '<br><br>'
                    . '<b>Name:</b> ' . $name . '<br><br>'
                    . '<b>Return Email:</b> ' . $email . '<br><br>'
                    . '<b>Car Make:</b> ' . $make . '<br><br>'
                    . '<b>Car Model:</b> ' . $model . '<br><br>'
                    . '<b>Car Registration:</b> ' . $registration;

    if(!$mail->send()) {
        echo 'Message could not be sent.';
        echo 'Mailer Error: ' . $mail->ErrorInfo;
    } else {
        echo 'Message has been sent';
    }

?>
