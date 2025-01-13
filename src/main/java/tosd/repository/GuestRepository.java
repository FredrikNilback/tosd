package tosd.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import tosd.model.Guest;

public interface GuestRepository extends JpaRepository<Guest, Integer> {
    @Query("SELECT g FROM Guest g WHERE g.rsvpCount >= 1")
    public List<Guest> getAttendees();
}
