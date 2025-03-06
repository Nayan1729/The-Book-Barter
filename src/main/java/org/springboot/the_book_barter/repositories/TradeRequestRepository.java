package org.springboot.the_book_barter.repositories;

import org.springboot.the_book_barter.entities.TradeRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TradeRequestRepository extends JpaRepository<TradeRequest, Integer> {
}
