package tosd.dto;

public class AcceptInviteRequest {
    private int id;
    private String token;
    private int rsvpCount;

    public AcceptInviteRequest() {}
    public AcceptInviteRequest(int id, String token, int rsvpCount) {
        this.id = id;
        this.token = token;
        this.rsvpCount = rsvpCount;
    }

    public int getId() { return id; }
    public String getToken() { return token; }
    public int getRsvpCount() { return rsvpCount; }
}
