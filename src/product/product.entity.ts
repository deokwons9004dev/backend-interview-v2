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
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    brand: string;

    @Column()
    price: number;

    @Column()
    size: string;

    @Column()
    color: string;

    @OneToMany(() => Review, review => review.product)
    reviews: Review[];
    
    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;



    // TODO: Add functionality to these hooks if needed.

    @AfterInsert()
    afterInsertHook() {
        console.log(`Inserted product with id: ${this.id}`);
    }

    @AfterUpdate()
    afterUpdateHook() {
        console.log(`Updated product with id: ${this.id}`);
    }

    @AfterRemove()
    afterRemoveHook() {
        console.log(`Removed product with id: ${this.id}`);
    }
}