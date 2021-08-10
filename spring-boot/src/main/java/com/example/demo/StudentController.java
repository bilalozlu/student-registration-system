package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
public class StudentController
{
    @Autowired
    private StudentRepository repository;

    @RequestMapping("/")
    public String main()
    {
        return "main page";
    }

    @GetMapping("/students")
    public List<Student> getStudents()
    {
        return repository.findAll();
    }

    @PostMapping("/addstudent")
    public String saveStudent(@RequestBody Student student)
    {
        repository.save(student);
        return "student saved with id:" + student.getId();
    }

    @RequestMapping(method= RequestMethod.PUT, value="/editstudent")
    public String editStudent(@RequestBody Student student)
    {
        repository.save(student);
        return student.getId() + " is edited";
    }

   @RequestMapping(method=RequestMethod.DELETE,value="/deletestudent/{id}")
    public String deleteStudent(@PathVariable String id)
    {
        repository.deleteById(id);
        return id + " is deleted";
    }
}