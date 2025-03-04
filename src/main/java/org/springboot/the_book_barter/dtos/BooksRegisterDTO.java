package org.springboot.the_book_barter.dtos;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;

@Data
public class BooksRegisterDTO {

    private String title;
    private String author;
    private String publisher;
    private String description;

    private String bookcondition;
    private LocalDate listedDate;
    private String status;

    private String genre;

    private String language;

    private List<MultipartFile> images;
    private String location;
    private Double latitude;  // Geolocation - latitude
    private Double longitude; // Geolocation - longitude
}
