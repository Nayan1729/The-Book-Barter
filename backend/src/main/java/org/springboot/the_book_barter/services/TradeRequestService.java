package org.springboot.the_book_barter.services;

import lombok.RequiredArgsConstructor;
import org.springboot.the_book_barter.entities.Books;
import org.springboot.the_book_barter.entities.TradeRequest;
import org.springboot.the_book_barter.entities.User;
import org.springboot.the_book_barter.repositories.TradeRequestRepository;
import org.springboot.the_book_barter.utilities.ApiException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class TradeRequestService {
    private final TradeRequestRepository tradeRequestRepository;
    private final UserService userService;
    private final BooksService booksService;
    private final EmailService emailService;

    public boolean createTradeRequest(int bookListedId , int bookToTradeId , String location) throws ApiException {
        Books listedBook  = this.booksService.getBookById(bookListedId);
        Books bookToTrade  = this.booksService.getBookById(bookToTradeId);
        User currentUser = this.userService.getLoggedInUser();
        System.out.println(currentUser.getEmail());
        if(currentUser.getId() != bookToTrade.getOwner().getId()){
            throw new ApiException("Unauthorized access!!",401);
        }
        if(listedBook.getStatus().equals("TRADED")){
            throw new   ApiException("Listed Book already trade ",400);
        }
        if (bookToTrade.getStatus().equals("TRADED")) {
            throw new ApiException("Can't trade a traded book",400);
        }
        if(bookToTrade.getOwner().getId() == listedBook.getOwner().getId()){
            throw new ApiException("Can't trade book with yourself",400);
        }
        TradeRequest tradeRequest = new TradeRequest();
        tradeRequest.setListedBook(listedBook);
        tradeRequest.setRequestedBook(bookToTrade);
        tradeRequest.setRequestedTime(LocalDateTime.now());
        tradeRequest.setListedBookOwner(listedBook.getOwner());
        tradeRequest.setRequestedBookOwner(bookToTrade.getOwner());
        tradeRequest.setStatus("PENDING");
        tradeRequest.setLocation(location);
        TradeRequest tradeRequest1 = this.tradeRequestRepository.save(tradeRequest);
        // Send email to both the users
        this.emailService.sendTradeRequestEmail(listedBook.getOwner().getEmail());
        return true;
    }
}
