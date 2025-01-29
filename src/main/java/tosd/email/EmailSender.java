package tosd.email;

public class EmailSender {
    public static enum STRATEGY {
        AWS,
        GMAIL,
        SMTP
    }
    private STRATEGY strategy;
    private String sender = "fredrik.nilback+tosd@gmail.com"; // change to secrets!!

    public EmailSender(STRATEGY strategy) {
        this.strategy = strategy;
    }

    public void send(String recipient, String subject, String body) {
        switch (this.strategy) {
            case AWS:
                new AwsSender(this.sender, recipient, subject, body);
                break;
            default:
                break;
        }  
    }

    public void send(String recipient, String subject, String body, String sender) {
        new AwsSender(sender, recipient, subject, body);
    }
}
