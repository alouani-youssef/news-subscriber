import {
    Exclude,
    Expose,
    instanceToPlain,
    plainToInstance,
} from "class-transformer";
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    Index,
    Unique,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity({ name: "users" })
@Unique(['username', 'phone_number', 'email'])
export class User extends BaseEntity {

    @Expose()
    @PrimaryGeneratedColumn()
    id: number;

    @Expose()
    @Index({ unique: true })
    @Column()
    username: string;

    @Expose()
    @Index({ unique: true })
    @Column()
    email: string;

    @Expose()
    @Index({ unique: true })
    @Column({ nullable: true })
    phone_number?: string;


    @Expose()
    @Column()
    birth_date: Date;

    @Expose()
    @Column()
    first_name: string;

    @Expose()
    @Column()
    last_name: string;

    @Expose()
    @Column()
    country: string;

    @Expose()
    @Column()
    city?: string;

    @Expose()
    @Column()
    hash: string;

    @Expose()
    @Column()
    salt: string;

    @Expose()
    @Column()
    is_email_confirmed: boolean;


    @Expose()
    @Column()
    max_subscribtion: number;

    @Expose()
    @Column()
    subscribtion_topics_number: number;

    @Expose()
    @Column()
    is_active: boolean;

    @Expose()
    @Column()
    is_deleted: boolean;

    @Exclude()
    @CreateDateColumn()
    created_at: Date;

    @Exclude()
    @UpdateDateColumn()
    updated_at: Date;

    @Exclude()
    @DeleteDateColumn()
    deletedAt?: Date;

    static fromJson(json: Record<string, any>): User {
        return plainToInstance(User, json);
    }

    toJson(): Record<string, any> {
        return instanceToPlain(this, { excludeExtraneousValues: true });
    }
}
