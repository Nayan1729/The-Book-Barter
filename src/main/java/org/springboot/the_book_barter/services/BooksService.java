package org.springboot.the_book_barter.services;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springboot.the_book_barter.dtos.BookPageResponseDTO;
import org.springboot.the_book_barter.dtos.BooksListedDTO;
import org.springboot.the_book_barter.dtos.BooksRegisterDTO;
import org.springboot.the_book_barter.entities.Books;
import org.springboot.the_book_barter.entities.User;
import org.springboot.the_book_barter.repositories.BooksRepository;
import org.springboot.the_book_barter.utilities.ApiException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import java.time.Instant;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BooksService {
    private final BooksRepository booksRepository;
    private final ModelMapper modelMapper;
    private final UserService userService;
    private final AwsService awsService;
    private final GeoCodeService geoCodeService;

    public BooksListedDTO listBook(BooksRegisterDTO booksRegisterDTO) throws ApiException {
        User currentUser = this.userService.getLoggedInUser();
        Books book = this.modelMapper.map(booksRegisterDTO, Books.class);
        book.setOwner(currentUser);
        book.setListedDate(LocalDate.now());
        List<String> imageUrls = new ArrayList<>();
//         Multipart images save to aws .
            booksRegisterDTO.getImages().forEach(image -> {
                String imageUrl = this.awsService.getImageUrl(this.awsService.saveImageToS3(image));
                imageUrls.add(imageUrl);
            });
            book.setImageUrls(imageUrls);
        // If location is given convert it to coordinates and if coordinates then location

        if (booksRegisterDTO.getLatitude()!=null && booksRegisterDTO.getLongitude()!=null) {
            book.setLocation(this.geoCodeService.getLocationFromCoordinated(booksRegisterDTO.getLatitude(), booksRegisterDTO.getLongitude()));
        }else{
            // Location is entered so perform forward geoCoding
            List<Double> coordinates = this.geoCodeService.getCoordinatesFromLocation(booksRegisterDTO.getLocation());
            book.setLatitude(coordinates.get(0));
            book.setLongitude(coordinates.get(1));
        }
        // But always return the location only no matter what
        Books savedBook = this.booksRepository.save(book);
        BooksListedDTO booksListedDTO = this.modelMapper.map(savedBook, BooksListedDTO.class);
        booksListedDTO.setUserId(currentUser.getId());
        booksListedDTO.setUserName(currentUser.getName());
        booksListedDTO.setEmail(currentUser.getEmail());
        booksListedDTO.setPhoneNumber(currentUser.getPhoneNumber());
        // Also set the actual images as urls after getting it from aws
        booksListedDTO.setImageUrls(savedBook.getImageUrls().stream().map(imageUrl->this.awsService.getImageUrl(imageUrl)).collect(Collectors.toList()));
        return booksListedDTO;
    }

    public BookPageResponseDTO getAllBooks(int pageNo , int pageSize , String sortBy , String sortDir) throws ApiException {
        Sort sort = null;
        sort = sortDir.startsWith("des") ?  Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
        Pageable pageable =  PageRequest.of(pageNo,pageSize,sort);
        Page<Books> pageBooks = this.booksRepository.findAll(pageable);
        List<Books> bookList = pageBooks.getContent();
        List<BooksListedDTO> booksListedDTOS = bookList.stream().map(book->{
            BooksListedDTO booksListedDTO = this.modelMapper.map(book, BooksListedDTO.class);
            User owner = book.getOwner();
            booksListedDTO.setUserId(owner.getId());
            booksListedDTO.setUserName(owner.getName());
            booksListedDTO.setEmail(owner.getEmail());
            booksListedDTO.setPhoneNumber(owner.getPhoneNumber());
            return booksListedDTO;
        }).collect(Collectors.toList());
        BookPageResponseDTO bookPageResponseDTO = new BookPageResponseDTO();

        bookPageResponseDTO.setBooksListedDTOS(booksListedDTOS);
        bookPageResponseDTO.setPageNo(pageBooks.getNumber());
        bookPageResponseDTO.setPageSize(pageBooks.getSize());
        bookPageResponseDTO.setTotalPages(pageBooks.getTotalPages());
        // getTotalElements returns    -> total books in the db
        // getNumberOfElements returns -> books in the particular page
        bookPageResponseDTO.setTotalBooks(pageBooks.getTotalElements());
        bookPageResponseDTO.setLastPage(pageBooks.isLast());

        return bookPageResponseDTO;
    }
}
