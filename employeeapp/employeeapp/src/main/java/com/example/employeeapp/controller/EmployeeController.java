package com.example.employeeapp.controller;

import com.example.employeeapp.entity.Employee;
import com.example.employeeapp.repository.EmployeeRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/employees")
@CrossOrigin(origins = "*")
public class EmployeeController {

    private final EmployeeRepository repository;

    public EmployeeController(EmployeeRepository repository) {
        this.repository = repository;
    }

    // POST - Add Employee
    @PostMapping
    public Employee addEmployee(@RequestBody Employee employee) {
        return repository.save(employee);
    }

    // GET - Get All Employees
    @GetMapping
    public List<Employee> getAllEmployees() {
        return repository.findAll();
    }

    // PUT - Update Employee
    @PutMapping("/{id}")
    public Employee updateEmployee(@PathVariable Long id,
                                   @RequestBody Employee employee) {

        Employee existing = repository.findById(id).orElseThrow();
        existing.setName(employee.getName());
        existing.setDepartment(employee.getDepartment());
        return repository.save(existing);
    }

    // DELETE - Delete Employee
    @DeleteMapping("/{id}")
    public String deleteEmployee(@PathVariable Long id) {
        repository.deleteById(id);
        return "Employee deleted successfully";
    }
}
