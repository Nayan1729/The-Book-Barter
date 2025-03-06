package org.springboot.the_book_barter.dtos;

import jakarta.persistence.*;
import lombok.Data;
import org.springboot.the_book_barter.entities.User;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class BooksListedDTO {
    private int id;
    private String title;
    private String author;
    private String publisher;
    private String description;
    private int userId;
    private String userName;
    private String email;
    private String phoneNumber;

    private String bookcondition;
    private LocalDateTime listedDateTime;
    private String status;

    private String genre;

    private String language;
    List<String> imageUrls;
    private String location;
    private Double latitude;  // Geolocation - latitude
    private Double longitude; // Geolocation - longitude
}
