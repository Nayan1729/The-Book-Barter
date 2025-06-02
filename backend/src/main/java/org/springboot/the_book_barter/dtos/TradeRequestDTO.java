package org.springboot.the_book_barter.dtos;

import lombok.Data;

@Data
public class TradeRequestDTO {
    private int bookListedId;
    private int bookTradedId;
    private String location;
}
