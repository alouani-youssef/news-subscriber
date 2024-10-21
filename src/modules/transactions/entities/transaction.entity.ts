import {
    Exclude,
    Expose,
    instanceToPlain,
    plainToInstance,
} from "class-transformer";
import { TransactionTypes } from "src/common/types";
import { User } from "src/modules/users/entities";
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    Index,
    Unique,
} from "typeorm";

@Entity({ name: "transactions" })
export class Transaction extends BaseEntity {

    @Expose()
    @PrimaryGeneratedColumn()
    id: number;

    @Expose({ name: 'user_id' })
    @ManyToOne(() => User, { nullable: false })
    @JoinColumn({ name: "user_id" })
    user: User;

    @Expose()
    @Column({ enum: TransactionTypes, nullable: false })
    type: TransactionTypes


    @Expose()
    @Column({ nullable: false })
    address_ip: string

    @Expose()
    @Column({ nullable: false })

    user_agent: string

    @Expose()
    @Column({ nullable: false })
    city: string


    @Expose()
    @Column({ nullable: false })
    region: string


    @Expose()
    @Column({ nullable: false })
    country: string

    @Exclude()
    @CreateDateColumn()
    created_at: Date;



    static fromJson(json: Record<string, any>): Transaction {
        return plainToInstance(Transaction, json);
    }

    toJson(): Record<string, any> {
        return instanceToPlain(this, { excludeExtraneousValues: true });
    }
}
