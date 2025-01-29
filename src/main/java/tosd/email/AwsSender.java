package tosd.email;

import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.ses.SesClient;
import software.amazon.awssdk.services.ses.model.Body;
import software.amazon.awssdk.services.ses.model.Content;
import software.amazon.awssdk.services.ses.model.Destination;
import software.amazon.awssdk.services.ses.model.Message;
import software.amazon.awssdk.services.ses.model.SendEmailRequest;

public class AwsSender {
    private String sender;
    private String recipient;
    private String subject;
    private String body;
    private SesClient sesClient = SesClient.builder().region(Region.EU_NORTH_1).build();

    public AwsSender(String sender, String recipient, String subject, String body) {
        this.sender = sender;
        this.recipient = recipient;
        this.subject = subject;
        this.body = body;
        sendEmail();
    }

    private void sendEmail() {
        try {
            SendEmailRequest request = SendEmailRequest.builder()
            .destination(Destination.builder()
                .toAddresses(this.recipient).build())
            .message(Message.builder()
                .subject(Content.builder()
                    .data(subject).build())
                .body(Body.builder()
                    .text(Content.builder()
                        .data(this.body).build()).build()).build())
            .source(sender).build();

            this.sesClient.sendEmail(request);
            
        } catch (Exception e) {
            System.out.println(e);
        } finally {
            this.sesClient.close();
        }
    }
}
