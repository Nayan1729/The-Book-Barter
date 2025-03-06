package org.springboot.the_book_barter.controllers;

import lombok.RequiredArgsConstructor;
import org.springboot.the_book_barter.dtos.BookPageResponseDTO;
import org.springboot.the_book_barter.dtos.BooksListedDTO;
import org.springboot.the_book_barter.dtos.BooksRegisterDTO;
import org.springboot.the_book_barter.services.BooksService;
import org.springboot.the_book_barter.utilities.ApiException;
import org.springboot.the_book_barter.utilities.ApiResponse;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/books")
@RequiredArgsConstructor
public class BooksController {
    private final BooksService booksService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse> listBook(@ModelAttribute BooksRegisterDTO book) {
        try {
            BooksListedDTO booksListedDTO = this.booksService.listBook(book);
            return ResponseEntity.status(201).body(new ApiResponse(201,booksListedDTO,"Books Listed Successfully"));
        }catch (ApiException e) {
            return ResponseEntity.status(e.getStatusCode()).body(new ApiResponse(e.getStatusCode(), null, e.getMessage()));
        }
    }

    @GetMapping
    public ResponseEntity<ApiResponse> getBooks(
            @RequestParam(required = false) Double latitude,
            @RequestParam(required = false) Double longitude,
            @RequestParam(required = false) String filterType,
            @RequestParam(required = false) String filterQuery,
            @RequestParam(required = false) String location,
            @RequestParam(defaultValue = "10") double radius,
            @RequestParam( defaultValue = "0" , required = false) Integer pageNo ,
            @RequestParam( defaultValue = "2" , required = false) Integer pageSize,
            @RequestParam( defaultValue = "listedDateTime" , required = false) String sortBy,
            @RequestParam( defaultValue = "desc" , required = false) String sortDir
    ) throws ApiException {
        try{
            System.out.println("Location"+location);
            BookPageResponseDTO books = this.booksService.getAllBooks(latitude,longitude,radius,location,filterType,filterQuery,pageNo,pageSize , sortBy, sortDir);
            return ResponseEntity.status(200).body(new ApiResponse(200,books,"Books fetched Successfully"));
        }catch (ApiException e) {
            return ResponseEntity.status(e.getStatusCode()).body(new ApiResponse(e.getStatusCode(), null, e.getMessage()));
        }
    }

}
