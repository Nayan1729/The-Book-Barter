package org.springboot.the_book_barter.services;

import lombok.RequiredArgsConstructor;
import org.springboot.the_book_barter.dtos.TradeRequestDTO;
import org.springboot.the_book_barter.utilities.ApiException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

private final JavaMailSender mailSender;

//    public
    @Value("${mail.email}")
    private String setFromEmail;

    public void sendTradeRequestEmail(String username){

        String subject = "Trade Request";
        String message = "Subject: New Trade Request for Your Listed Book!\n" +
                "\n" +
                "Hi"+username+ ",\n" +
                "\n" +
                "We hope you’re doing well! We’re excited to let you know that someone is interested in trading with you on The Book Barter.\n" +
                "\n" +
                "Trade Request Details:\n" +
                "\n" +
                "Book Requested: [Requested Book Title]\n" +
                "Requested By: [Requestor Name]\n" +
                "Contact: [Requestor Email/Phone]\n" +
                "Message: “[Optional message from the requestor]”\n" +
                "You can view the full details of the trade request by logging into your account here: [Link to Trade Request Page].\n" +
                "\n" +
                "If you’re interested in proceeding with the trade, please review the request and respond at your earliest convenience. If you have any questions or need assistance, feel free to contact our support team at [Support Email].\n" +
                "\n" +
                "Happy Trading!\n" +
                "\n" +
                "Best regards,\n" +
                "The Book Barter Team";
        SimpleMailMessage emailMessage = new SimpleMailMessage();
        emailMessage.setTo(username);
        emailMessage.setFrom(setFromEmail);
        emailMessage.setSubject(subject);
        emailMessage.setText(message);
        try{
            mailSender.send(emailMessage);
        }catch (Exception e){
            System.out.println(e.getMessage());
            throw new ApiException("Error while sending email",500);
        }
    }
}
