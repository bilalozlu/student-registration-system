package com.example.demo;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "city")
public class City {
    @Id
    private String id;
    private String name;
    private List<String> towns;

    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public List<String> getTowns() {
        return towns;
    }
   public void setTowns(List<String> towns) {
        this.towns = towns;
    }
}

