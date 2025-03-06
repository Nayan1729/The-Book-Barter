package org.springboot.the_book_barter.controllers;

import lombok.RequiredArgsConstructor;
import org.springboot.the_book_barter.dtos.TradeRequestDTO;
import org.springboot.the_book_barter.entities.TradeRequest;
import org.springboot.the_book_barter.services.TradeRequestService;
import org.springboot.the_book_barter.utilities.ApiException;
import org.springboot.the_book_barter.utilities.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/trade-requests")
@RequiredArgsConstructor
public class TradeRequestController {
    private final TradeRequestService tradeRequestService;

    @PostMapping
    public ResponseEntity<ApiResponse> createTradeRequest(@RequestBody TradeRequestDTO tradeRequest) throws ApiException {
        try {
            boolean success = tradeRequestService.createTradeRequest(tradeRequest.getBookListedId(), tradeRequest.getBookTradedId(),tradeRequest.getLocation());
            return ResponseEntity.status(201).body(new ApiResponse(201,true,"Successfully created a new tradeRequest " ));
        }catch (ApiException e){
            return ResponseEntity.status(e.getStatusCode()).body(new ApiResponse(e.getStatusCode(),false,e.getMessage()));
        }
    }
}
