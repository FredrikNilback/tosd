package tosd.dto;

public class GetImageRequest {
    private String password;

    public GetImageRequest() {}

    public GetImageRequest(String password) {
        this.password = password;
    }

    public String getPassword() { return password; }
}
