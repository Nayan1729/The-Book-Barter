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
import java.util.List;
import java.awt.print.Book;

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
            @RequestParam( defaultValue = "0" , required = false) Integer pageNo ,
            @RequestParam( defaultValue = "5" , required = false) Integer pageSize,
            @RequestParam( defaultValue = "listedDate" , required = false) String sortBy,
            @RequestParam( defaultValue = "desc" , required = false) String sortDir
    ) throws ApiException {
        try{
            BookPageResponseDTO books = this.booksService.getAllBooks(pageNo,pageSize , sortBy, sortDir);
            return ResponseEntity.status(200).body(new ApiResponse(200,books,"Books fetched Successfully"));
        }catch (ApiException e) {
            return ResponseEntity.status(e.getStatusCode()).body(new ApiResponse(e.getStatusCode(), null, e.getMessage()));
        }
    }

}
