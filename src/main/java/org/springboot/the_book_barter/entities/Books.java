package org.springboot.the_book_barter.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Entity
@Data
@Table(name = "books")
public class Books {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String title;
    private String author;
    private String publisher;
    private String description;

    @ManyToOne
    private User owner;

    private String bookcondition; // Old , new , etc
    private LocalDate listedDate;
    private String status; // Exchanged , Listed for trade etc

    // As we can't make the List of basic datatypes
    private String genre;

    private String language;

    @ElementCollection
    @CollectionTable(name = "book_imageUrls", joinColumns = @JoinColumn(name = "book_id"))
    @Column(name = "images",length=1000)
    private List<String> imageUrls;

    private String location;
    private Double latitude;  // Geolocation - latitude
    private Double longitude; // Geolocation - longitude
}
