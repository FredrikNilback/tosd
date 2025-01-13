package tosd.dto;

public class ValidateGuestRequest {
    private int id;
    private String token;

    public ValidateGuestRequest() {}
    public ValidateGuestRequest(int id, String token) {
        this.id = id;
        this.token = token;
    }

    public int getId() { return id; }
    public String getToken() { return token; }
}
