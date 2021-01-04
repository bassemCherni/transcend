package com.scrumosome.backend.repository;

import java.util.List;

import com.scrumosome.backend.models.Account;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface AccountRepository extends JpaRepository<Account, Integer> {

    Account findByEmail(String email);


    List<Account> findByStatus(String status);

    Account findByEmailAndStatus(String email, String status);

    @Query(value = "select * from Account a where a.id_account = :id and a.status= 'active' ", nativeQuery = true)
    Account findbyIdandStatus(@Param("id") Integer id);

    @Query(value = "SELECT DISTINCT account.id_account, account.id_user, account.email, account.password, account.status, account.admin FROM `account`, users, affiliation, membership, project WHERE account.id_user = users.id_user and account.id_account = membership.id_account and membership.id_project = project.id_project   and affiliation.id_account = account.id_account and affiliation.id_work_space = project.id_work_space and affiliation.role = 'dev' and project.id_project = :id and (account.email COLLATE 'utf8_general_ci' like %:serach% OR users.user_name COLLATE 'utf8_general_ci' like %:serach%) and account.status = 'active'", nativeQuery = true)
    List<Account> searchAccount(@Param("id") Integer id, @Param("serach") String search);

    @Query(value = "SELECT DISTINCT account.id_account, account.id_user, account.email, account.password, account.status, account.admin FROM account , affiliation , users  WHERE account.id_user = users.id_user and (account.email COLLATE 'utf8_general_ci' like %:serach% or users.user_name COLLATE 'utf8_general_ci' like %:serach% or users.last_name COLLATE 'utf8_general_ci' like %:serach%) and (SELECT COUNT(id_account) from affiliation WHERE id_account = account.id_account and id_work_space = :id) = 0 and account.status = 'active'", nativeQuery = true)
    List<Account> searchToAddToWs(@Param("id") Integer id, @Param("serach") String search);

    @Modifying(clearAutomatically = true)
    @Transactional
    @Query("UPDATE Account SET status='archived' WHERE id_account =:id ")
    void archiveAccount(@Param("id") Integer id);

}