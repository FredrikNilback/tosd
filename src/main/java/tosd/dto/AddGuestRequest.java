package tosd.dto;

public class AddGuestRequest {
    private String name;
    private String email;
    private Integer namedGuests;
    private Boolean plusOne;
    private String token;

    public AddGuestRequest() {}

    public AddGuestRequest(String name, String email, Integer namedGuests, Boolean plusOne, String token) {
        this.name = name;
        this.email = email;
        this.namedGuests = namedGuests;
        this.plusOne = plusOne;
        this.token = token;
    }

    public String getName() { return name; }
    public String getEmail() { return email; }
    public Integer getNamedGuests() { return namedGuests; }
    public Boolean getPlusOne() { return plusOne; }
    public String getToken() { return token; }
}
