package litloom.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import litloom.backend.model.Contact;
import litloom.backend.repository.ContactRepository;

@CrossOrigin(origins = "http://localhost:3000") // allow React frontend
@RestController
@RequestMapping("/api/contact")
public class ContactController {

    @Autowired
    private ContactRepository contactRepository;

    @PostMapping
    public Contact submitContact(@RequestBody Contact contact) {
        return contactRepository.save(contact);
    }

    @GetMapping("/all")
    public List<Contact> getAllMessages() {
        return contactRepository.findAll();
    }
}
