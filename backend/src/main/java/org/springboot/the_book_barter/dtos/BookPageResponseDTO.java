package org.springboot.the_book_barter.dtos;

import lombok.Data;

import java.util.List;

@Data
public class BookPageResponseDTO {
    private List<BooksListedDTO> booksListedDTOS;
    private int pageNo;
    private int pageSize;
    private long totalBooks;
    private int totalPages;
    private boolean isLastPage;
}
