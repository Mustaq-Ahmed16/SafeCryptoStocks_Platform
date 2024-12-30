package in.projectjwt.main.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.internet.MimeMessage;


@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmailId;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendOtpEmail(String toEmail, String otp) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            
            helper.setFrom(fromEmailId);
            helper.setTo(toEmail);
            helper.setSubject("Your OTP Code");

            String htmlContent = "<html><body style='font-family: Arial, sans-serif; color: #333;'>"
                    + "<h2 style='color: #4CAF50;'>Your OTP Code</h2>"
                    + "<p style='font-size: 16px;'>Hello,</p>"
                    + "<p style='font-size: 16px;'>Your OTP code is: <b style='font-size: 20px; color: #FF5733;'>" + otp + "</b></p>"
                    + "<p style='font-size: 14px;'>Thank you for using our service.</p>"
                    + "<footer style='font-size: 12px; color: #888;'>SafeCryptoStocks</footer>"
                    + "</body></html>";

            helper.setText(htmlContent, true);
            mailSender.send(message);
            System.out.println("Email sent successfully to " + toEmail);

        } catch (Exception e) {
            System.out.println("Error in sending email: " + e.getMessage());
            e.printStackTrace();
        }
    }

    public void sendStockPurchaseEmail(String toEmail, String userName, String stockSymbol, int noOfShares, double purchasePrice) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setFrom("no-reply@SafeCryptoStocks.com");
            helper.setTo(toEmail);
            helper.setSubject("Stock Purchase Confirmation");

            String htmlContent = "<html><body style='font-family: Arial, sans-serif; color: #333;'>"
                    + "<h2 style='color: #4CAF50;'>Your Stock Purchase Confirmation</h2>"
                    + "<p style='font-size: 16px;'>Hello <b>" + userName + "</b>,</p>"
                    + "<p style='font-size: 16px;'>Your stock purchase was successful!</p>"
                    + "<table style='font-size: 16px; margin-top: 20px;'>"
                    + "<tr><td><b>Stock:</b></td><td>" + stockSymbol + "</td></tr>"
                    + "<tr><td><b>Number of Shares:</b></td><td>" + noOfShares + "</td></tr>"
                    + "<tr><td><b>Total Purchase Price:</b></td><td>$" + String.format("%.2f", purchasePrice) + "</td></tr>"
                    + "</table>"
                    + "<p style='font-size: 14px; margin-top: 20px;'>Thank you for using our service.</p>"
                    + "<footer style='font-size: 12px; color: #888;'>SafeCryptoStocks</footer>"
                    + "</body></html>";

            helper.setText(htmlContent, true);
            mailSender.send(message);
            System.out.println("Stock purchase email sent successfully to " + toEmail);

        } catch (Exception e) {
            System.out.println("Error in sending stock purchase email: " + e.getMessage());
            e.printStackTrace();
        }
    }

    public void sendStockSaleEmail(String toEmail, String userName, String stockSymbol, int quantitySell, double saleValue, double profitOrLoss) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setFrom("no-reply@SafeCryptoStocks.com");
            helper.setTo(toEmail);
            helper.setSubject("Stock Sale Confirmation");

            String htmlContent = "<html><body style='font-family: Arial, sans-serif; color: #333;'>"
                    + "<h2 style='color: #4CAF50;'>Your Stock Sale Confirmation</h2>"
                    + "<p style='font-size: 16px;'>Hello <b>" + userName + "</b>,</p>"
                    + "<p style='font-size: 16px;'>Your stock sale was successful!</p>"
                    + "<table style='font-size: 16px; margin-top: 20px;'>"
                    + "<tr><td><b>Stock:</b></td><td>" + stockSymbol + "</td></tr>"
                    + "<tr><td><b>Number of Shares Sold:</b></td><td>" + quantitySell + "</td></tr>"
                    + "<tr><td><b>Total Sale Value:</b></td><td>$" + String.format("%.2f", saleValue) + "</td></tr>"
                    + "<tr><td><b>Profit/Loss from Sale:</b></td><td style='color: " + (profitOrLoss >= 0 ? "green" : "red") + ";'>" + String.format("%.2f", profitOrLoss) + "</td></tr>"
                    + "</table>"
                    + "<p style='font-size: 14px; margin-top: 20px;'>Thank you for using our service.</p>"
                    + "<footer style='font-size: 12px; color: #888;'>SafeCryptoStocks</footer>"
                    + "</body></html>";

            helper.setText(htmlContent, true);
            mailSender.send(message);
            System.out.println("Stock sale email sent successfully to " + toEmail);

        } catch (Exception e) {
            System.out.println("Error in sending stock sale email: " + e.getMessage());
            e.printStackTrace();
        }
    }
}




//@Service
//public class EmailService {
//	
//	@Autowired
//    private JavaMailSender mailSender;
//	
//	@Value("${spring.mail.username")
//	private String fromEmailId;
//
//    public EmailService(JavaMailSender mailSender) {
//        this.mailSender = mailSender;
//    }
//
//
//
//	public void sendOtpEmail(String toEmail, String otp) {
//		// TODO Auto-generated method stub
//		try {
//			SimpleMailMessage message = new SimpleMailMessage();
//			message.setFrom(fromEmailId);
//	        message.setTo(toEmail);
//	        message.setSubject("Your OTP Code");
//	        message.setText("Your OTP code is: " + otp);
//	        mailSender.send(message);
//	        System.out.println("Email sent successfully to " + toEmail);
//			
//		}
//		catch(Exception e) {
//			System.out.println("Error in sending email: " + e.getMessage());
//            e.printStackTrace();
//			
//		}
//		
//	}
//	
//	public void sendStockPurchaseEmail(String toEmail, String userName, String stockSymbol, int noOfShares, double purchasePrice) {
//        SimpleMailMessage message = new SimpleMailMessage();
//        message.setFrom("no-reply@SafeCryptoStocks.com");
//        message.setTo(toEmail);
//        message.setSubject("Stock Purchase Confirmation");
//
//        String text = String.format("Hello %s,\n\n" +
//                                    "Your stock purchase was successful!\n\n" +
//                                    "Stock: %s\n" +
//                                    "Number of Shares: %d\n" +
//                                    "Total Purchase Price: $%.2f\n\n" +
//                                    "Thank you for using our service.\n\n" +
//                                    "Best regards,\n" +
//                                    "SafeCryptoStocks", userName, stockSymbol, noOfShares, purchasePrice);
//        
//        message.setText(text);
//        
//        mailSender.send(message);
//    }
//	 // New method for sending stock sale email notification
//    public void sendStockSaleEmail(String toEmail, String userName, String stockSymbol, int quantitySell, double saleValue, double profitOrLoss) {
//        SimpleMailMessage message = new SimpleMailMessage();
//        message.setFrom("no-reply@SafeCryptoStocks.com");
//        message.setTo(toEmail);
//        message.setSubject("Stock Sale Confirmation");
//
//        String text = String.format("Hello %s,\n\n" +
//                                    "Your stock sale was successful!\n\n" +
//                                    "Stock: %s\n" +
//                                    "Number of Shares Sold: %d\n" +
//                                    "Total Sale Value: $%.2f\n" +
//                                    "Profit/Loss from Sale: $%.2f\n\n" +
//                                    "Thank you for using our service.\n\n" +
//                                    "Best regards,\n" +
//                                    "SafeCryptoStocks", userName, stockSymbol, quantitySell, saleValue, profitOrLoss);
//        
//        message.setText(text);
//        
//        mailSender.send(message);
//    }
//
//}
