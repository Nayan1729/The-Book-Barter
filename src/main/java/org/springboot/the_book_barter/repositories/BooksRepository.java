package org.springboot.the_book_barter.repositories;

import org.springboot.the_book_barter.entities.Books;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface BooksRepository extends JpaRepository<Books, Integer> {

    @Query("SELECT b FROM Books b " +
            "WHERE ( (:latitude IS NULL OR :longitude IS NULL) OR " +
            "      (6371 * acos( cos(radians(:latitude)) * cos(radians(b.latitude)) * " +
            "                   cos(radians(b.longitude) - radians(:longitude)) + " +
            "                   sin(radians(:latitude)) * sin(radians(b.latitude)) ) < :radius ) ) " +
            "AND ((:filterQuery IS NULL) OR " +
            "     LOWER(CASE WHEN :filterType = 'title' THEN b.title " +
            "                WHEN :filterType = 'genre' THEN b.genre " +
            "                WHEN :filterType = 'author' THEN b.author END) " +
            "     LIKE LOWER(CONCAT('%', :filterQuery, '%')))" )
    Page<Books> findBooksNearbyAndFiltered(@Param(value = "latitude") Double latitude,
                                           @Param("longitude") Double longitude,
                                           @Param("radius") Double radius,
                                           @Param("filterType") String filterType,
                                           @Param("filterQuery") String filterQuery,
                                           Pageable pageable
                                           );

    Optional<Books> findBooksById(int id);
}