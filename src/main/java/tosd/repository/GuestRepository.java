package tosd.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import tosd.model.Guest;

public interface GuestRepository extends JpaRepository<Guest, Integer> {
}
