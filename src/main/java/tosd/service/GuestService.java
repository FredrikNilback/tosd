package tosd.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tosd.dto.AcceptInviteRequest;
import tosd.dto.AddGuestRequest;
import tosd.dto.ValidateGuestRequest;
import tosd.model.Guest;
import tosd.repository.GuestRepository;

import java.util.List;
import java.util.Optional;

@Service
public class GuestService {
    
    @Autowired
    private GuestRepository guestRepository;

    public Guest addGuest(AddGuestRequest req) {
        Guest guest = new Guest(req.getName(), req.getNamedGuests(), req.getEmail(), req.getPlusOne(), req.getToken());
        return guestRepository.save(guest);
    }

    public Guest acceptInvite(AcceptInviteRequest req) {
        int id = req.getId();
        String token = req.getToken();
        int rsvpCount = req.getRsvpCount();

        
        Optional<Guest> guestOptional = guestRepository.findById(id);
        if (guestOptional.isPresent()) {
            Guest guest = guestOptional.get();
            if (validate(guest, token)) {
                guest.setRsvpCount(rsvpCount);
                return guestRepository.save(guest);
            } else {
                throw new RuntimeException("Token does not match");
            }
        } else {
            throw new RuntimeException("Guest not found with id: " + id);
        }
    }

    public Guest validate(ValidateGuestRequest req) {
        Optional<Guest> guestOptional = guestRepository.findById(req.getId());
        if (guestOptional.isPresent()) {
            Guest guest = guestOptional.get();
            if(guest.validate(req.getToken())) {
                return guest;
            } else {
                throw new RuntimeException("Invalid Token");
            }
        } else {
            throw new RuntimeException("Guest not found with id: " + req.getId());
        }
    }

    public List<Guest> getGuests() {
        return guestRepository.findAll();
    }

    public List<Guest> getAttendees() {
        return guestRepository.getAttendees();
    }

    private boolean validate(Guest guest, String token) {
        return guest.validate(token);
    }
}
