package com.miguelsodre.paymentgateway.domain.order;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "categories")
@Getter
@Setter
@NoArgsConstructor
public class Order {
    @Id
    private String id;
    private String title;
    private String description;
    private  String ownerId;

    public Order(OrderDTO orderDTO){
        this.title = orderDTO.title();
        this.description = orderDTO.description();
        this.ownerId = orderDTO.ownerId();
    }
}
