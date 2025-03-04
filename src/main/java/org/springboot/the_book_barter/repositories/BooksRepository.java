package org.springboot.the_book_barter.repositories;

import org.springboot.the_book_barter.entities.Books;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BooksRepository extends JpaRepository<Books, Integer> {
}
