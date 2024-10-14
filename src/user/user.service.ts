/**
 * @file user.service.ts
 * @module user/UserService
 * 
 * @description The module that represents the service class for the user
 * entity. It provides methods for creating, finding, updating, and removing
 * users. 
 * 
 * @author David Song <deokwons9004dev@gmail.com>
 * @version 1.0.0
 */

import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './user.entity';

/**
 * @class UserService
 * 
 * The user service class.
 * Responsible for handling user-related operations, such as creating, finding,
 * updating, and removing users.
 */
@Injectable()
export class UserService {

    /**
     * Initializes the user service using the user repository injected by the 
     * TypeORM module.
     * 
     * @param {Repository<User>} repo The user repository.
     */
    constructor(
        @InjectRepository(User) private repo: Repository<User>,
    ) {}

    /**
     * Creates a new user.
     *
     * @param   {string}         email     The email of the user.
     * @param   {string}         password  The hashed password of the user.
     * @param   {string<User>}   role      Specifies the role of the user.
     *
     * @return  {Promise<User>}            Returns the newly created user.
     */
    createUser(email: string, password: string, role: string): Promise<User> {
        const user = this.repo.create({ email, password, role });
        return this.repo.save(user);
    }

    /**
     * Retrieves a user by their id.
     *
     * @param   {number}         id  The id of the user.
     *
     * @return  {Promise<?User>}      Returns the user with the specified id. If
     * no user is found, returns null. 
     */
    findUserById(id: number): Promise<User> {
        if (!id) return null;
        return this.repo.findOneBy({ id });
    }

    /**
     * Retrieves a user by their email.
     *
     * @param   {string}         email  The email of the user.
     *
     * @return  {Promise<?User>}         Returns the user with the specified
     * email. If no user is found, returns null.
     */
    findUserByEmail(email: string): Promise<User> {
        if (!email) return null;
        return this.repo.findOneBy({ email });
    }

    /**
     * @async
     * Updates a user by their id.
     *
     * @param   {number}       id    The id of the user.
     * @param   {Partial<User>} attrs The attributes to update.
     * 
     * @return  {Promise<User>}       Returns the updated user.
     * 
     * @throws  {NotFoundException}   Throws an exception if the user is not
     * found. 
     */
    async updateUser(id: number, attrs: Partial<User>): Promise<User> {
        const user = await this.findUserById(id);
        if (!user) throw new NotFoundException('User not found');
        Object.assign(user, attrs);
        return this.repo.save(user);
    }

    /**
     * @async
     * Removes a user by their id.
     *
     * @param   {number}       id  The id of the user.
     * 
     * @return  {Promise<boolean>} Returns true if the user is removed.
     * 
     * @throws  {NotFoundException} Throws an exception if the user is not
     * found.
     */
    async removeUser(id: number): Promise<boolean> {
        const user = await this.findUserById(id);
        if (!user) throw new NotFoundException('User not found');
        await this.repo.remove(user);
        return true;
    }
}
