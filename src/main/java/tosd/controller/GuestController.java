package tosd.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import tosd.dto.AcceptInviteRequest;
import tosd.dto.AddGuestRequest;
import tosd.dto.ValidateGuestRequest;
import tosd.model.Guest;
import tosd.service.GuestService;


@RestController
@RequestMapping("/guest")
public class GuestController {

    @Autowired
    private GuestService guestService;

    @PostMapping("addGuest")
    public Guest addGuest(@RequestBody AddGuestRequest req) {
        return guestService.addGuest(req);
    }

    @CrossOrigin(origins = "http://127.0.0.1:5500")
    @PostMapping("validate")
    public Guest validate(@RequestBody ValidateGuestRequest req) {
        return guestService.validate(req);
    }


    @CrossOrigin(origins = "http://127.0.0.1:5500")
    @PostMapping("accept")
    public Guest acceptInvite(@RequestBody AcceptInviteRequest req) {
        return guestService.acceptInvite(req);
    }
}
