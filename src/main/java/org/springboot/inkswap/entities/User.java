package org.springboot.inkswap.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private String password;
    private String email;
    @Column(length = 10000)
    private String bio;
    private String phoneNumber;
    private String imageUrl;
    private String location;
    private double latitude;
    private double longitude;
    @OneToMany(mappedBy = "owner",cascade = CascadeType.ALL)
    private List<Books> booksLists;
//    @Enumerated(EnumType.STRING) ensures the role is stored as a string in the database.
    @Enumerated(EnumType.STRING)
    private Role role;
}
