package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
public class CityController
{
    @Autowired
    private CityRepository repository;

    @GetMapping("/cities")
    public List<City> getCities()
    {
        return repository.findAll();
    }

    @GetMapping("/towns/{name}")
    public List<City> getTowns(@PathVariable String name)
    {
        return repository.findByName(name);
    }

    @PostMapping("/addcity")
    public String saveCity(@RequestBody City city)
    {
        repository.save(city);
        return "Saved city with id:" + city.getId();
    }

    @RequestMapping(method= RequestMethod.PUT, value="/editcity")
    public String editCity(@RequestBody City city)
    {
        repository.save(city);
        return city.getId() + " is edited";
    }

    @RequestMapping(method=RequestMethod.DELETE,value="/deletecity/{id}")
    public String deleteCity(@PathVariable String id)
    {
        repository.deleteById(id);
        return id + " is deleted";
    }
}