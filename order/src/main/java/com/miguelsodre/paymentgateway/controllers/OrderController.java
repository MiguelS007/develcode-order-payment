package com.miguelsodre.paymentgateway.controllers;

import com.miguelsodre.paymentgateway.domain.order.Order;
import com.miguelsodre.paymentgateway.domain.order.OrderDTO;
import com.miguelsodre.paymentgateway.services.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/order")
public class OrderController {
    private OrderService service;

    public OrderController(OrderService service){
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Order> insert(@RequestBody OrderDTO orderData){
        Order newOrder = this.service.insert(orderData);
        return ResponseEntity.ok().body(newOrder);
    }

    @GetMapping
    public ResponseEntity<List<Order>> getAll(){
        List<Order> orders = this.service.getAll();
        return ResponseEntity.ok().body(orders);
    }


    @PutMapping("/{id}")
    public ResponseEntity<Order> update(@PathVariable("id") String id, @RequestBody OrderDTO orderData){
        Order updatedOrder = this.service.update(id, orderData);
        return ResponseEntity.ok().body(updatedOrder);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Order> delete(@PathVariable("id") String id){
        this.service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
