import { join } from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'
import { 
    AuthModule,
    UserModule,
    ClientModule,
    ProfessionalModule,
    CommonModule,
    ClienthasprofessionalModule,
    CompanyModule
} from './modules';

@Module({
    imports: [
        ConfigModule.forRoot(),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
            playground: false,
            plugins: [
                ApolloServerPluginLandingPageLocalDefault(), 
            ],
        }),
        AuthModule,
        UserModule,
        ClientModule,
        ProfessionalModule,
        CommonModule,
        ClienthasprofessionalModule,
        CompanyModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
