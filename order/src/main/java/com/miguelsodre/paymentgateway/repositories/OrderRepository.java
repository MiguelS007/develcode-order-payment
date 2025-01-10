package com.miguelsodre.paymentgateway.repositories;

import com.miguelsodre.paymentgateway.domain.order.Order;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends MongoRepository<Product, String> {
}
