package tosd.dto;

public class AddGuestRequest {
    private String names;
    private String email;
    private Boolean plusOne;
    private String token;

    public AddGuestRequest() {}

    public AddGuestRequest(String names, String email, Boolean plusOne, String token) {
        this.names = names;
        this.email = email;
        this.plusOne = plusOne;
        this.token = token;
    }

    public String getNames() { return names; }
    public String getEmail() { return email; }
    public Boolean getPlusOne() { return plusOne; }
    public String getToken() { return token; }
}
