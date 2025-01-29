package tosd.model;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Random;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

@Entity
public class Guest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "names", nullable = false)
    private String names;

    @Column(name = "email")
    private String email = null;

    @Column(name = "plus_one", nullable = false)
    private Boolean plusOne = false;

    @JsonIgnore
    @Column(name = "hashed_password", nullable = false)
    private String hashedPassword;

    @JsonIgnore
    @Column(name = "salt", nullable = false)
    private String salt;
    
    public Guest() {}
    public Guest(String names, String email, Boolean plusOne, String token) {
        this.names = names;
        this.email = email;
        this.plusOne = plusOne;
        this.salt = generateRandomString();
        this.hashedPassword = hash(token + salt);
    }

    public boolean validate(String token) {
        String hashedToken = hash(token + this.salt);
        return this.hashedPassword.equals(hashedToken);
    }

    private String hash(String input) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hashBytes = digest.digest(input.getBytes());
            StringBuilder hexString = new StringBuilder();
            for (byte b : hashBytes) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) hexString.append('0');
                hexString.append(hex);
            }
            return hexString.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
    }

    private String generateRandomString() {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789/&%$#?[](){}";
        Random random = new Random();
        StringBuilder result = new StringBuilder();
        for (int i = 0; i < 10; i++) {
            result.append(characters.charAt(random.nextInt(characters.length())));
        }
        return result.toString();
    }

    // Getters & Setters
    public int getId() { return id; }
    public String getNames() { return names;}
    public void setNames(String names) { this.names = names;}
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public Boolean getPlusOne() { return plusOne; }
    public void setPlusOne(Boolean plusOne) { this.plusOne = plusOne; }
}
