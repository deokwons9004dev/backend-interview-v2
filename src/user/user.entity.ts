import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    AfterInsert,
    AfterUpdate,
    AfterRemove,
    OneToMany,
} from 'typeorm';
import { Review } from '../review/review.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    // Role: Either 'admin', 'user', 'guest', 'banned', etc.
    @Column()
    role: string;

    @OneToMany(() => Review, review => review.user)
    reviews: Review[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    // TODO: Add functionality to these hooks if needed.
    
    @AfterInsert()
    afterInsertHook() {
        console.log(`Inserted user with id: ${this.id}`);
    }

    @AfterUpdate()
    afterUpdateHook() {
        console.log(`Updated user with id: ${this.id}`);
    }

    @AfterRemove()
    afterRemoveHook() {
        console.log(`Removed user with id: ${this.id}`);
    }
}