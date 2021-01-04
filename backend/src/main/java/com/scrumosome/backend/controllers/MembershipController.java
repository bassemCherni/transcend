package com.scrumosome.backend.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.scrumosome.backend.models.Affiliation;
import com.scrumosome.backend.models.Membership;
import com.scrumosome.backend.models.Users;
import com.scrumosome.backend.repository.AffiliationRepository;
import com.scrumosome.backend.repository.MembershipRepository;
import com.scrumosome.backend.repository.UserRepository;
import com.scrumosome.backend.utils.AssagnieeResponse;
import com.scrumosome.backend.utils.MembershipResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping("/rest/Membership")
public class MembershipController {

    @Autowired
    MembershipRepository membershipRepository;

    @Autowired
    AffiliationRepository affiliationRepository;

    @Autowired
    UserRepository userRepository;

    @GetMapping("/getAll")
    public List<Membership> getAll(){
        return membershipRepository.findAll();
    }

    @GetMapping("/getOne/{id}")
    public Optional<Membership> findById(@PathVariable  Integer id){
        return membershipRepository.findById(id);
    }

    @PostMapping("/save")
    public String save(@RequestBody Membership issue){
        membershipRepository.save(issue);
        return "success";
    }

    @GetMapping("/findSpecific/{id_account}/{id_work_space}")
    public List<MembershipResponse> findSpecific(@PathVariable  Integer id_account, @PathVariable  Integer id_work_space){

        List<Membership> memberships = membershipRepository.findSpecific(id_account);
        List<MembershipResponse> mr = new ArrayList<MembershipResponse>();
        for (Membership membership : memberships) {
            if (membership.getProject().getWorkSpace().getId_work_space() == id_work_space) {
                
                MembershipResponse membershipResponse = new MembershipResponse(membership.getId(), 
                                                                               membership.getProject(), 
                                                                               membership.getAccount().getId_account(), 
                                                                               membership.getFavorite(), 
                                                                               membership.getActive(), 
                                                                               membership.getStart_date(), 
                                                                               membership.getEnd_date());
                mr.add(membershipResponse);
            }
        }

        return mr;
    }

    @GetMapping("/favorit/{id}")
    public MembershipResponse favorit(@PathVariable  Integer id){

        Membership membership = membershipRepository.find(id);
        membership.setFavorite(!membership.getFavorite());
        membership = membershipRepository.save(membership);
                
        MembershipResponse membershipResponse = new MembershipResponse(membership.getId(), 
                                                                        membership.getProject(), 
                                                                        membership.getAccount().getId_account(), 
                                                                        membership.getFavorite(), 
                                                                        membership.getActive(), 
                                                                        membership.getStart_date(), 
                                                                        membership.getEnd_date());      

        return membershipResponse;
    }

    @GetMapping("/getMembership/{idUser}/{idProject}")
    public MembershipResponse getMembership(@PathVariable  Integer idUser, @PathVariable  Integer idProject){

        Membership membership = membershipRepository.getMembership(idUser, idProject);
        if (membership != null) {
            MembershipResponse membershipResponse = new MembershipResponse(membership.getId(), 
                                                                        membership.getProject(), 
                                                                        membership.getAccount().getId_account(), 
                                                                        membership.getFavorite(), 
                                                                        membership.getActive(), 
                                                                        membership.getStart_date(), 
                                                                        membership.getEnd_date());      

        return membershipResponse;
        }
        MembershipResponse membershipResponse = null;
        return membershipResponse;
        
    }

    @GetMapping("/archiveMembership/{id_project}/{id_account}")
    public String archiveMembership(@PathVariable  Integer id_project, @PathVariable  Integer id_account){
        membershipRepository.archiveMembership(id_project, id_account);
        return "success";
    }

    @GetMapping("/developersByProject/{id}")
    public List<AssagnieeResponse> developersByProject(@PathVariable  Integer id){
        List<Membership> memberships = membershipRepository.findSpecificProject(id);
        Affiliation affiliation;
        List<AssagnieeResponse> assagnieeResponses = new ArrayList<AssagnieeResponse>();

        for (Membership membership : memberships) {
            affiliation = affiliationRepository.findByAccountAndWs(membership.getAccount().getId_account(),
                                                                   membership.getProject().getWorkSpace().getId_work_space());
            
            Users user = userRepository.find(affiliation.getAccount().getId_account());
            String name = user.getUser_name() + " " + user.getLast_name();
            if(affiliation.getRole().equals("dev")) {
                AssagnieeResponse assagnieeResponse = new AssagnieeResponse(affiliation.getAccount().getId_account(),
                                                                            name,
                                                                            user.getProfile_pic());
                assagnieeResponses.add(assagnieeResponse);
            }
        }

        return assagnieeResponses;
    }
}