import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    AfterInsert,
    AfterUpdate,
    AfterRemove,
    ManyToOne,
} from 'typeorm';
import { Product } from '../product/product.entity';
import { User } from '../user/user.entity';

@Entity()
export class Review {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    rating: number;

    @Column()
    comment: string;

    @ManyToOne(() => Product, product => product.reviews)
    product: Product;

    @ManyToOne(() => User, user => user.reviews)
    user: User;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    // TODO: Add functionality to these hooks if needed.

    @AfterInsert()
    afterInsertHook() {
        console.log(`Inserted review with id: ${this.id}`);
    }

    @AfterUpdate()
    afterUpdateHook() {
        console.log(`Updated review with id: ${this.id}`);
    }

    @AfterRemove()
    afterRemoveHook() {
        console.log(`Removed review with id: ${this.id}`);
    }
}