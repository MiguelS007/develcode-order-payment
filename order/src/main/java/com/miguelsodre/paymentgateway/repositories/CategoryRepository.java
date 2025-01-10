package com.miguelsodre.paymentgateway.repositories;

import com.miguelsodre.paymentgateway.domain.category.Category;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends MongoRepository<Category, String> {

}
