package org.springboot.the_book_barter.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
public class TradeRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    Books listedBook;

    @ManyToOne
    Books requestedBook;

    private String status;
    private LocalDateTime requestedTime;
    private LocalDateTime responseTime;

    @ManyToOne
    User listedBookOwner;
    @ManyToOne
    User requestedBookOwner;
    private String location;
}
