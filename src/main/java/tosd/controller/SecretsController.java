package tosd.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import tosd.dto.GetImageRequest;
import tosd.dto.ValidateGuestRequest;
import tosd.service.GuestService;

@RestController
@RequestMapping("/secrets")
public class SecretsController {

    @Autowired
    private GuestService guestService;

    private String getPasswordFromJson() throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        JsonNode root = mapper.readTree(new File("src/main/resources/secrets.json"));
        return root.get("imagePassword").asText();
    }

    @CrossOrigin(origins = "http://127.0.0.1:5500")
    @PostMapping("getSecrets")
    public ResponseEntity<?> getSecrets(@RequestBody ValidateGuestRequest req) {
        try {
            guestService.validate(req);
            try {
                String path = "src/main/resources/websecrets.json";
                String jsonContent = new String(Files.readAllBytes(Paths.get(path)));
                ObjectMapper objectMapper = new ObjectMapper();
                Object secrets = objectMapper.readTree(jsonContent);

                return new ResponseEntity<>(secrets, HttpStatus.OK);
            } catch (IOException e) {
                e.printStackTrace();
                return new ResponseEntity<>("Error fetching secrets", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } catch (Exception e) {
            return new ResponseEntity<>("Error fetching secrets", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @CrossOrigin(origins = "http://127.0.0.1:5500")
    @PostMapping("getImage")
    public ResponseEntity<?> getSecretImage(@RequestBody GetImageRequest req) {
        
        try {
            String backendPassword = getPasswordFromJson();
            if (!backendPassword.equals(req.getPassword())) {
                return ResponseEntity.status(403).build();
            }
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>("Error fetching secrets", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        try {
            Path imagePath = Paths.get("src/main/resources/images/secretImage2.png");
            Resource imageResource = new UrlResource(imagePath.toUri());
            if (!imageResource.exists()) {
                return ResponseEntity.notFound().build();
            }
            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.CONTENT_TYPE, "image/png");

            return ResponseEntity.ok().headers(headers).body(imageResource);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }
}
