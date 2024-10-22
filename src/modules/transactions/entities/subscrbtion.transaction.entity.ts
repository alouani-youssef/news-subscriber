import {
    Exclude,
    Expose,
    instanceToPlain,
    plainToInstance,
} from "class-transformer";
import { SubscrbtionOperationTypes } from "src/common/types";
import { Subscribtions } from "src/modules/subscribtions/entities";
import { User } from "src/modules/users/entities";
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
} from "typeorm";

@Entity({ name: "subscrbtion_transactions" })
export class SubscrbtionTransaction extends BaseEntity {

    @Expose()
    @PrimaryGeneratedColumn()
    id: number;

    @Expose({ name: 'user_id' })
    @ManyToOne(() => User, { nullable: false })
    @JoinColumn({ name: "user_id" })
    user: User;

    @Expose({ name: 'subscribtion_id' })
    @ManyToOne(() => User, { nullable: false })
    @JoinColumn({ name: "subscribtion_id" })
    subscribtion: Subscribtions;


    @Expose()
    @Column({ nullable: false })
    topic: string


    @Expose()
    @Column({ enum: SubscrbtionOperationTypes, nullable: false })
    type: SubscrbtionOperationTypes


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



    static fromJson(json: Record<string, any>): SubscrbtionTransaction {
        return plainToInstance(SubscrbtionTransaction, json);
    }

    toJson(): Record<string, any> {
        return instanceToPlain(this, { excludeExtraneousValues: true });
    }
}
