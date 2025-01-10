package com.miguelsodre.paymentgateway.services;

import com.miguelsodre.paymentgateway.domain.product.exceptions.ProductNotFoundException;
import com.miguelsodre.paymentgateway.domain.order.Order;
import com.miguelsodre.paymentgateway.domain.order.OrderDTO;
import com.miguelsodre.paymentgateway.domain.order.exceptions.OrderNotFoundException;
import com.miguelsodre.paymentgateway.repositories.OrderRepository;
import com.miguelsodre.paymentgateway.services.aws.AwsSnsService;
import com.miguelsodre.paymentgateway.services.aws.MessageDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {
    private final ProductService productService;
    private final OrderRepository repository;
    private final AwsSnsService snsService;

    public OrderService(ProductService productService, OrderRepository orderRepository,  AwsSnsService snsService){
        this.productService = productService;
        this.repository = orderRepository;
        this.snsService = snsService;
    }

    public Order insert(OrderDTO orderData){
        this.productService.getById(orderData.categoryId())
                .orElseThrow(ProductNotFoundException::new);
        Order newOrder = new Order(orderData);

        this.repository.save(newOrder);

        this.snsService.publish(new MessageDTO(newOrder.toString()));

        return newOrder;
    }

    public Order update(String id, OrderDTO orderData){
        Order order = this.repository.findById(id)
                .orElseThrow(OrderNotFoundException::new);

        this.productService.getById(orderData.categoryId())
                .orElseThrow(ProductNotFoundException::new);

        if(!orderData.title().isEmpty()) order.setTitle(orderData.title());
        if(!orderData.description().isEmpty()) order.setDescription(orderData.description());
        if(!(orderData.price() == null)) order.setPrice(orderData.price());
        if(!(orderData.categoryId() == null)) order.setCategory(orderData.categoryId());

        this.repository.save(order);

        this.snsService.publish(new MessageDTO(order.toString()));

        return order;
    }

    public void delete(String id){
        Order order = this.repository.findById(id)
                .orElseThrow(OrderNotFoundException::new);

        this.repository.delete(order);
    }

    public List<Order> getAll(){
        return this.repository.findAll();
    }
}
