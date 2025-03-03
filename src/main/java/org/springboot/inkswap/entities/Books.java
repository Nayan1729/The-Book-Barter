package org.springboot.inkswap.entities;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

import java.time.LocalDate;
import java.util.List;

@Entity
public class Books {
    @Id
    private int id;
    private String title;
    private String author;
    private String publisher;
    private String description;
    @ManyToOne
    private User owner;
    private String condition; // Old , new , etc
    private LocalDate listedDate;
    private String status; // Exchanged , Listed for trade etc
//    private List<String> genres;
}
